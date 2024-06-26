﻿using EFMT.Concrete;
using EFMT.Entities;
using IDS;
using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using UZ;

namespace MT
{
    public enum mtOperation : int { not = 0, coming = 1, tsp = 2 }
    /// <summary>
    /// Коды ошибок операций переноса вагонов
    /// </summary>
    public enum mtt_err : int
    {
        global_error = -1,
        not_fromPath = -2,
        not_listApproachesCars = -3,
        not_listArrivalCars = -4,
        file_error = -5,
        not_listWagonsTracking = -6
        //not_listStartArrivalSostav = -5,
    }

    public enum mtt_err_arrival : int
    {
        close_car = 0,
        close_manual = -1,
        close_new_route = -2,
        close_timeout = -3,
        close_different_cargo = -4,
        close_arrival_uz = -5,
        close_arrival_station_on = -6,
    }

    [Serializable()]
    public class FileApproachesSostav
    {
        public string Index
        {
            get;
            set;
        }
        public DateTime Date
        {
            get;
            set;
        }
        public string File
        {
            get;
            set;
        }
    }

    [Serializable()]
    public class FileArrivalSostav
    {
        public string Index
        {
            get;
            set;
        }
        public DateTime Date
        {
            get;
            set;
        }
        public int Operation
        {
            get;
            set;
        }
        public string File
        {
            get;
            set;
        }

    }

    #region Перенос вагонов из api mt
    public class SostavArrivalMT
    {
        public string composition_index { get; set; }
        public DateTime date_operation { get; set; }
        public string operation { get; set; }
        public List<WagonsArrivalMT> wagons { get; set; }
    }
    #endregion

    public class MTTransfer
    {
        private eventID eventID = eventID.MT_MTTransfer;
        protected service servece_owner = service.Null;

        private string fromPath;
        public string FromPath { get { return this.fromPath; } set { this.fromPath = value; } }
        private bool delete_file = false;
        public bool DeleteFile { get { return this.delete_file; } set { this.delete_file = value; } }

        private int day_range_approaches_cars = 30; // тайм аут по времени для вагонов на подходе
        public int DayRangeApproachesCars { get { return this.day_range_approaches_cars; } set { this.day_range_approaches_cars = value; } }


        private int day_range_arrival_cars = 5; // тайм аут по времени для вагонов прибывших на УЗ
        public int DayRangeArrivalCars { get { return this.day_range_arrival_cars; } set { this.day_range_arrival_cars = value; } }

        private bool arrival_to_railway = true;  // Признак переносить вагоны в прибытие АМКР 
        public bool ArrivalToRailWay { get { return this.arrival_to_railway; } set { this.arrival_to_railway = value; } }
        // TransferWagonsTracking
        private DateTime datetime_start_new_tracking = new DateTime(2018, 01, 01, 0, 0, 0); // Время начала запроса информации по вагону которого нет в базе АМКР
        public DateTime DateTimeStartNewTracking { get { return this.datetime_start_new_tracking; } set { this.datetime_start_new_tracking = value; } }
        private string url_wagons_tracking;
        public string URLWagonsTracking { get { return this.url_wagons_tracking; } set { this.url_wagons_tracking = value; } }
        private string user_wagons_tracking;
        public string UserWagonsTracking { get { return this.user_wagons_tracking; } set { this.user_wagons_tracking = value; } }
        private string psw_wagons_tracking;
        public string PSWWagonsTracking { get { return this.psw_wagons_tracking; } set { this.psw_wagons_tracking = value; } }
        private string api_wagons_tracking;
        public string APIWagonsTracking { get { return this.api_wagons_tracking; } set { this.api_wagons_tracking = value; } }
        private string api_wagons_arrival;
        public string APIWagonsArrival { get { return this.api_wagons_arrival; } set { this.api_wagons_arrival = value; } }

        public MTTransfer()
        {

        }

        public MTTransfer(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }

        #region TransferApproaches Перенос составов на подходах

        /// <summary>
        /// Получить parent_id
        /// </summary>
        /// <param name="car"></param>
        /// <returns></returns>
        public long? GetParentID(ApproachesCars car, int day_range)
        {
            try
            {
                long? parentid = null;
                EFApproachesCars ef_app_cars = new EFApproachesCars(new EFDbContext());
                ApproachesCars old_car = ef_app_cars.Context.Where(c => c.num == car.num).OrderByDescending(c => c.id).FirstOrDefault();
                if (old_car == null) return null; // нет историии движения, первая операция над вагоном
                if (old_car.arrived != null) return null; // история закрыта, первая операция над вагоном 

                if (old_car.cargo_code == car.cargo_code)
                {
                    // входит в диапазон времени
                    if (old_car.date_operation.Date.AddDays(day_range) > car.date_operation)
                    {
                        old_car.num_doc_arrived = (int)mtt_err_arrival.close_car;
                        // предыдущий состав не прибыл на станцию назначения
                        if (old_car.code_station_on != old_car.code_station_current)
                        {
                            parentid = old_car.id;
                        }
                        else
                        {
                            // новый состав стоит еще на станции что и предыдущий
                            if (old_car.code_station_current == car.code_station_current)
                            {
                                parentid = old_car.id;
                            }
                            else
                            {
                                // вагон начал движение по новому маршруту
                                old_car.num_doc_arrived = (int)mtt_err_arrival.close_new_route;
                            }
                        }
                    }
                    else
                    {
                        // больше допустимого интервала
                        old_car.num_doc_arrived = (int)mtt_err_arrival.close_timeout;
                    }
                }
                else
                {
                    // грузы в вагонах разные
                    old_car.num_doc_arrived = (int)mtt_err_arrival.close_different_cargo;
                }
                // закрываем старый вагон
                old_car.arrived = car.date_operation;
                ef_app_cars.Update(old_car);
                ef_app_cars.Save(); // сохранить изменение
                return parentid;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetParentID(car={0}, day_range={1})", car, day_range), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Получает список вагонов из txt-файла
        /// </summary>
        /// <param name="file"></param>
        /// <param name="id_sostav"></param>
        /// <returns></returns>
        public List<ApproachesCars> TransferTXTToListApproachesCars(string file, long id_sostav)
        {
            List<ApproachesCars> list = new List<ApproachesCars>();
            int count = 0;
            int error = 0;
            try
            {
                UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ
                StreamReader sr = new StreamReader(file, System.Text.Encoding.Default);
                string input = null;
                //DateTime start = DateTime.Now;
                while ((input = sr.ReadLine()) != null)
                {
                    count++;
                    try
                    {
                        string[] array = input.Split(';');
                        if (array.Count() >= 14)
                        {
                            int code_cargo = -1;
                            int code_station_from = -1;
                            int code_station_on = -1;
                            if (!String.IsNullOrWhiteSpace(array[3]))
                            {
                                //DateTime start0 = DateTime.Now;                                
                                code_cargo = uz_directory.GetCodeCorrectCargo(int.Parse(array[3]));
                                //DateTime stop0 = DateTime.Now;
                                //servece_owner.ServicesToLog(eventID, "Метод code_cargo", start0, stop0, code_cargo);
                            }
                            if (!String.IsNullOrWhiteSpace(array[4]))
                            {


                                int codefrom = int.Parse(array[4].Substring(0, 4));
                                int codeon = int.Parse(array[4].Substring(9, 4));
                                //DateTime start1 = DateTime.Now;
                                code_station_from = uz_directory.GetCodeCorrectStations(codefrom, false);
                                //DateTime stop1 = DateTime.Now;
                                //servece_owner.ServicesToLog(eventID, "Метод code_station_from", start1, stop1, code_station_from);
                                //DateTime start2 = DateTime.Now;
                                code_station_on = uz_directory.GetCodeCorrectStations(codeon, false);
                                //DateTime stop2 = DateTime.Now;
                                //servece_owner.ServicesToLog(eventID, "Метод code_station_on", start2, stop2, code_station_on);

                            }
                            ApproachesCars new_wag = new ApproachesCars()
                            {
                                id = 0,
                                id_sostav = id_sostav,
                                composition_index = array[4].ToString(),
                                num = !String.IsNullOrWhiteSpace(array[0]) ? int.Parse(array[0]) : -1,
                                country_code = !String.IsNullOrWhiteSpace(array[1]) ? int.Parse(array[1].Substring(0, 2)) : -1, // Подрезка кода страны в фале 3 цифры переводим в 2 цифры
                                weight = !String.IsNullOrWhiteSpace(array[2]) ? int.Parse(array[2]) : -1,
                                cargo_code = code_cargo, // скорректируем код
                                train_number = !String.IsNullOrWhiteSpace(array[5]) ? int.Parse(array[5]) : -1,
                                operation = array[6].ToString(),
                                date_operation = !String.IsNullOrWhiteSpace(array[7]) ? DateTime.Parse(array[7], CultureInfo.CreateSpecificCulture("ru-RU")) : DateTime.Now,
                                code_station_from = code_station_from,
                                code_station_on = code_station_on,
                                code_station_current = !String.IsNullOrWhiteSpace(array[8]) ? int.Parse(array[8]) : -1,
                                count_wagons = !String.IsNullOrWhiteSpace(array[9]) ? int.Parse(array[9]) : -1,
                                sum_weight = !String.IsNullOrWhiteSpace(array[10]) ? int.Parse(array[10]) : -1,
                                flag_cargo = !String.IsNullOrWhiteSpace(array[11]) ? int.Parse(array[11]) : -1,
                                route = !String.IsNullOrWhiteSpace(array[12]) ? int.Parse(array[12]) : -1,
                                owner = !String.IsNullOrWhiteSpace(array[13]) ? int.Parse(array[13]) : -1,
                            };
                            // Получить parent_id
                            new_wag.parent_id = GetParentID(new_wag, this.day_range_approaches_cars);
                            list.Add(new_wag);
                        }
                        else
                        {
                            error++;
                        }
                    }
                    catch (Exception e)
                    {
                        e.ExceptionMethodLog(String.Format("Ошибка выполнения переноса вагона метода:TransferTXTToMTApproachesWagons, файл:{0}, строка:{1}", file, input), servece_owner, eventID);
                        error++;
                    }
                }
                //DateTime stop = DateTime.Now;
                //servece_owner.ServicesToLog(eventID, "Метод TransferTXTToListApproachesCars", start, stop, list.Count());
                sr.Close();
                string mess = String.Format("В файле {0} определенно: {1} вагонов, добавлено в список : {2}, пропущено по ошибке : {3}", file, count, list.Count(), error);
                mess.InformationLog(servece_owner, eventID);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("TransferTXTToMTApproachesWagons(file={0}, id_sostav={1}), файл:{0})", file, id_sostav), servece_owner, eventID);
                return null;
            }
            return list;
        }
        /// <summary>
        /// Перенос списка вагонов в БД MTApproaches
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public int TransferListApproachesCarsToDB(List<ApproachesCars> list)
        {
            EFApproachesCars ef_app_cars = new EFApproachesCars(new EFDbContext());
            if (list == null) return this.eventID.GetEventIDErrorCode((int)mtt_err.not_listApproachesCars);
            try
            {
                int error = 0;
                int trans = 0;
                string trans_id = "";

                if (list.Count() > 0)
                {
                    foreach (ApproachesCars apc in list)
                    {
                        ef_app_cars.Add(apc);
                        ef_app_cars.Save();
                        long res = ef_app_cars.Refresh(apc).id;

                        if (res > 0) { trans++; }
                        if (res < 0) { error++; }
                        trans_id = trans_id + res.ToString() + "; ";
                    }
                    string mess = String.Format("В списке определенно: {0} вагонов, перенесено в БД METRANS.Approaches : {1}, пропущено по ошибке : {2}", list.Count(), trans, error);
                    mess.InformationLog(servece_owner, this.eventID);
                    if (list.Count() > 0) { mess.EventLog(trans_id, servece_owner, eventID); }
                    return trans;
                }
                else return 0;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("TransferListApproachesCarsToDB(list={0})", list), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Перенести в БД Approaches вагоны состава из файла txt.
        /// </summary>
        /// <param name="new_id"></param>
        /// <param name="file"></param>
        /// <param name="countCopy"></param>
        /// <param name="countError"></param>
        /// <returns></returns>
        protected bool SaveApproachesWagons(long new_id, string file, ref int countCopy, ref int countError)
        {
            try
            {
                int count_wagons = 0;
                if (new_id > 0)
                {
                    // Переносим вагоны
                    count_wagons = TransferListApproachesCarsToDB(TransferTXTToListApproachesCars(file, new_id));
                    if (count_wagons > 0) { countCopy++; }
                    if (count_wagons < 0) { countError++; } // Счетчик ошибок при переносе
                }
                if (new_id < 0) { countError++; } // Счетчик ошибок при переносе
                if (count_wagons > 0 & new_id > 0)
                {
                    return true;
                }
            }
            catch (Exception e)
            {
                e.ExceptionLog(String.Format("Ошибка операции добавления вагонов в БД METRANS.Approaches, сотава на подходе :{0}", new_id), servece_owner, eventID);
            }
            return false;
        }

        protected List<FileApproachesSostav> GetFileApproachesSostav(string[] files)
        {
            List<FileApproachesSostav> listfs = new List<FileApproachesSostav>();
            foreach (string file in files)
            {
                try
                {
                    if (!String.IsNullOrEmpty(file))
                    {
                        FileInfo fi = new FileInfo(file);
                        string index = fi.Name.Substring(5, 13);
                        DateTime date = DateTime.Parse(fi.Name.Substring(19, 4) + "-" + fi.Name.Substring(23, 2) + "-" + fi.Name.Substring(25, 2) + " " + fi.Name.Substring(27, 2) + ":" + fi.Name.Substring(29, 2) + ":00");
                        // Добавим строку
                        listfs.Add(new FileApproachesSostav()
                        {
                            Index = index,
                            Date = date,
                            File = file
                        });
                    }
                }
                catch (Exception e)
                {
                    e.ExceptionLog(String.Format("Ошибка формирования строки списка файлов состава List<FileApproachesSostav>, файл:{0}", file), servece_owner, eventID);
                }
            }
            return listfs;
        }

        public int TransferApproaches(string fromPath, bool delete_file)
        {
            try
            {
                if (!Directory.Exists(fromPath))
                {
                    String.Format("Указанного пути {0} с txt-файлами для переноса в БД METRANS.Approaches.. не существует.", fromPath).ErrorLog(servece_owner, this.eventID);
                    return this.eventID.GetEventIDErrorCode((int)mtt_err.not_fromPath);
                }
                int countCopy = 0;
                int countExist = 0;
                int countError = 0;
                int countDelete = 0;
                string[] files = Directory.GetFiles(fromPath, "*.txt");
                if (files == null | files.Count() == 0) { return 0; }
                String.Format("Определенно {0} txt-файлов для копирования", files.Count()).InformationLog(servece_owner, this.eventID);
                List<FileApproachesSostav> list_sostav = GetFileApproachesSostav(files);
                var listFileSostavs = from c in list_sostav.OrderBy(c => c.Date).ThenBy(c => c.Index)
                                      select new { c.Index, c.Date, c.File };

                EFApproachesCars ef_app_cars = new EFApproachesCars(new EFDbContext());
                EFApproachesSostav ef_app_sostav = new EFApproachesSostav(new EFDbContext());

                // Пройдемся по списку
                foreach (var fs in listFileSostavs)
                {
                    try
                    {
                        Console.WriteLine("Переносим файл {0}", fs.File);
                        DateTime start = DateTime.Now;
                        // защита от записи повторов
                        FileInfo fi = new FileInfo(fs.File);
                        ApproachesSostav exs_sostav = ef_app_sostav.Context.Where(s => s.file_name == fi.Name).FirstOrDefault();
                        if (exs_sostav == null)
                        {
                            long? ParentIDSostav = null;
                            // получить не закрытый состав
                            ApproachesSostav no_close_sostav = ef_app_sostav.Context.Where(s => s.composition_index == fs.Index & s.close == null & s.approaches == null & s.date_time <= fs.Date).OrderByDescending(s => s.date_time).FirstOrDefault();
                            if (no_close_sostav != null)
                            {
                                ParentIDSostav = no_close_sostav.id;
                                // Закрыть состав
                                no_close_sostav.close = DateTime.Now;
                                ef_app_sostav.Update(no_close_sostav);
                                ef_app_sostav.Save();
                            }
                            ApproachesSostav new_sostav = new ApproachesSostav()
                            {
                                id = 0,
                                file_name = fi.Name,
                                composition_index = fs.Index,
                                date_time = fs.Date,
                                create = DateTime.Now,
                                close = null,
                                approaches = null,
                                parent_id = ParentIDSostav
                            };

                            ef_app_sostav.Add(new_sostav);
                            ef_app_sostav.Save();
                            new_sostav = ef_app_sostav.Refresh(new_sostav);

                            long new_id = new_sostav.id;
                            if (delete_file & SaveApproachesWagons(new_id, fs.File, ref countCopy, ref countError))
                            {
                                File.Delete(fs.File);
                                countDelete++;
                            }
                        }
                        else
                        {
                            // Проверка сравниваем количество если совподает удаляем файл, иначе добавляем новые вагоны и удаляем файл
                            List<ApproachesCars> list = TransferTXTToListApproachesCars(fs.File, exs_sostav.id);
                            List<ApproachesCars> listdb = ef_app_cars.Context.Where(c => c.id_sostav == exs_sostav.id).ToList();
                            if (list != null && listdb != null)
                            {
                                if (list.Count() != listdb.Count())
                                {
                                    // Количество не совпадает удаляем старые вагоны добавляем новые
                                    SqlParameter IDSostav = new SqlParameter("@IDSostav", exs_sostav.id);
                                    ef_app_cars.Database.ExecuteSqlCommand("DELETE FROM METRANS.ApproachesCars WHERE id_sostav = @IDSostav", IDSostav);
                                    if (delete_file & SaveApproachesWagons(exs_sostav.id, fs.File, ref countCopy, ref countError))
                                    {
                                        File.Delete(fs.File);
                                        countDelete++;
                                    }
                                }
                                else
                                {
                                    // Файл перенесен ранеее, удалим его если это требуется
                                    if (delete_file)
                                    {
                                        File.Delete(fs.File);
                                        countDelete++;
                                    }
                                }
                                countExist++;
                            }
                        }
                        DateTime stop = DateTime.Now;
                        servece_owner.ServicesToLog(eventID, String.Format("Файл {0} - перенесен.", fs.File), start, stop, countCopy);
                    }
                    catch (Exception e)
                    {
                        e.ExceptionLog(String.Format("Ошибка переноса txt-файла в БД METRANS.Approaches, файл {0}", fs.File), servece_owner, eventID);
                        countError++;
                    }
                }
                string mess = String.Format("Перенос txt-файлов в БД METRANS.Approaches выполнен, определено для переноса {0} txt-файлов, перенесено {1}, были перенесены ранее {2}, ошибки при переносе {3}, удаленно {4}.", files.Count(), countCopy, countExist, countError, countDelete);
                mess.InformationLog(servece_owner, this.eventID);
                if (files != null && files.Count() > 0) { mess.EventLog(countError > 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID); }
                return files.Count();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("TransferApproaches(fromPath={0}, delete_file={1})", fromPath, delete_file), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Перености txt-файлы из папки по умолчанию в таблицы MTApproaches
        /// </summary>
        /// <returns></returns>
        public int TransferApproaches()
        {
            return TransferApproaches(this.fromPath, this.delete_file);
        }

        #endregion

        #region TransferArrival Перенос составов на станциях УЗ

        public long? GetParentID(ArrivalCars car, int day_range)
        {
            try
            {
                long? parentid = null;
                EFArrivalCars ef_arr_cars = new EFArrivalCars(new EFDbContext());
                EFConsignee ef_consignee = new EFConsignee(new EFDbContext());
                ArrivalCars old_car = ef_arr_cars.Context.Where(c => c.num == car.num).OrderByDescending(c => c.id).FirstOrDefault();
                if (old_car == null) return null; // нет историии движения, первая операция над вагоном
                if (old_car.arrived != null) return null; // история закрыта, первая операция над вагоном 

                if (old_car.cargo_code == car.cargo_code)
                {
                    if (old_car.date_operation.Date.AddDays(day_range) > car.date_operation)
                    {

                        if (old_car.composition_index == car.composition_index |
                                (old_car.composition_index != car.composition_index &
                                ef_consignee.IsConsigneeSend(false, old_car.consignee, mtConsignee.AMKR) &
                                ef_consignee.IsConsigneeSend(true, car.consignee, mtConsignee.AMKR)))
                        { // Продолжаем цепочку вагонов если равны CompositionIndex или (CompositionIndex не равны но следующий код досылки и входит в диапазон времени)
                            parentid = old_car.id;
                            old_car.num_doc_arrived = (int)mtt_err_arrival.close_car;
                            old_car.arrived = car.date_operation;
                        }
                        else
                        {
                            // вагон начал движение по новому маршруту
                            old_car.num_doc_arrived = (int)mtt_err_arrival.close_new_route;
                            old_car.arrived = car.date_operation;
                        }
                    }
                    else
                    {
                        // больше допустимого интервала
                        old_car.num_doc_arrived = (int)mtt_err_arrival.close_timeout;
                        old_car.arrived = DateTime.Now;
                    }
                }
                else
                {
                    // грузы в вагонах разные
                    old_car.num_doc_arrived = (int)mtt_err_arrival.close_different_cargo;
                    old_car.arrived = car.date_operation;
                }
                // закрываем старый вагон
                old_car.arrived = car.date_operation;
                ef_arr_cars.Update(old_car);
                ef_arr_cars.Save(); // сохранить изменение
                return parentid;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetParentID(car={0}, day_range={1})", car, day_range), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Получить тип операции над составом
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        protected int GetOperationToXml(string file)
        {
            try
            {
                XDocument doc;
                try
                {
                    doc = XDocument.Load(file);
                }
                catch (Exception e)
                {
                    e.ExceptionLog(String.Format("Ошибка считывания файла:{0}", file), servece_owner, eventID);
                    return (int)mtt_err.file_error;
                }

                foreach (XElement element in doc.Element("NewDataSet").Elements("Table"))
                {
                    string opr = (string)element.Element("Operation");
                    if (String.IsNullOrEmpty(opr)) return (int)mtOperation.not;
                    if (opr.Trim().ToUpper() == "ПРИБ") return (int)mtOperation.coming;
                    if (opr.Trim().ToUpper() == "ТСП") return (int)mtOperation.tsp;
                }
            }
            catch (Exception e)
            {
                e.ExceptionLog(String.Format("Ошибка определения операции файл:{0}", file), servece_owner, eventID);
            }
            return (int)mtOperation.not;

        }
        /// <summary>
        /// Возвращает список вагонов из xml-файла
        /// </summary>
        /// <param name="file"></param>
        /// <param name="id_sostav"></param>
        /// <returns></returns>
        public List<ArrivalCars> TransferXMLToListArrivalCars(string file, long id_sostav)
        {
            List<ArrivalCars> list = new List<ArrivalCars>();
            int count = 0;
            int error = 0;
            try
            {
                //Reference api_reference = new Reference();
                UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ
                XDocument doc;
                try
                {
                    doc = XDocument.Load(file);
                }
                catch (Exception e)
                {
                    e.ExceptionLog(String.Format("Ошибка считывания файла:{0}", file), servece_owner, eventID);
                    return null;
                }
                foreach (XElement element in doc.Element("NewDataSet").Elements("Table"))
                {
                    try
                    {
                        int code_cargo = -1;
                        if (!String.IsNullOrWhiteSpace((string)element.Element("IDCargo")))
                        {
                            code_cargo = uz_directory.GetCodeCargoOfCodeETSNG((int)element.Element("IDCargo"));
                        }
                        ArrivalCars mtarr = new ArrivalCars()
                        {
                            id = 0,
                            id_sostav = id_sostav,
                            position = !String.IsNullOrWhiteSpace((string)element.Element("Position")) ? (int)element.Element("Position") : -1,
                            num = !String.IsNullOrWhiteSpace((string)element.Element("CarriageNumber")) ? (int)element.Element("CarriageNumber") : -1,
                            country_code = !String.IsNullOrWhiteSpace((string)element.Element("CountryCode"))
                             ? ((string)element.Element("CountryCode")).Length >= 2 ? int.Parse(((string)element.Element("CountryCode")).Substring(0, 2)) : (int)element.Element("CountryCode") : -1, // Подрезка кода страны в фале 3 цифры переводим в 2 цифры 
                            wight = !String.IsNullOrWhiteSpace((string)element.Element("Weight")) ? (int)element.Element("Weight") : -1,
                            cargo_code = code_cargo,
                            cargo = !String.IsNullOrWhiteSpace((string)element.Element("Cargo")) ? (string)element.Element("Cargo") : "?",
                            station_code = !String.IsNullOrWhiteSpace((string)element.Element("IDStation")) ? (int)element.Element("IDStation") : -1,
                            station = !String.IsNullOrWhiteSpace((string)element.Element("Station")) ? (string)element.Element("Station") : "?",
                            consignee = !String.IsNullOrWhiteSpace((string)element.Element("Consignee")) ? (int)element.Element("Consignee") : -1,
                            operation = !String.IsNullOrWhiteSpace((string)element.Element("Operation")) ? (string)element.Element("Operation") : "?",
                            composition_index = !String.IsNullOrWhiteSpace((string)element.Element("CompositionIndex")) ? (string)element.Element("CompositionIndex") : "?",
                            date_operation = !String.IsNullOrWhiteSpace((string)element.Element("DateOperation")) ? DateTime.Parse((string)element.Element("DateOperation"), CultureInfo.CreateSpecificCulture("ru-RU")) : DateTime.Now,
                            train = !String.IsNullOrWhiteSpace((string)element.Element("TrainNumber")) ? (int)element.Element("TrainNumber") : -1,
                        };
                        // Получить parent_id
                        mtarr.parent_id = GetParentID(mtarr, this.day_range_arrival_cars);
                        list.Add(mtarr);
                    }
                    catch (Exception e)
                    {
                        e.ExceptionMethodLog(String.Format("TransferXMLToListArrivalCars, файл:{0}, вагон:{1}", file, element.Element("CarriageNumber")), servece_owner, eventID);
                        error++;
                    }
                }
                string mess = String.Format("В файле {0} определенно: {1} вагонов, добавлено в список : {2}, пропущено по ошибке : {3}", file, count, list.Count(), error);
                mess.InformationLog(servece_owner, eventID);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("TransferXMLToListArrivalCars(file={0}, id_sostav={1}), файл:{0})", file, id_sostav), servece_owner, eventID);
                return null;
            }
            return list;
        }
        /// <summary>
        /// Перенос списка вагонов в БД Arrival
        /// </summary>
        /// <param name="list"></param>
        /// <param name="set_arrival"></param>
        /// <returns></returns>
        public int TransferListArrivalCarsToDB(List<ArrivalCars> list)
        {

            EFArrivalCars ef_arr_cars = new EFArrivalCars(new EFDbContext());
            if (list == null) return this.eventID.GetEventIDErrorCode((int)mtt_err.not_listArrivalCars);
            try
            {
                int error = 0;
                int trans = 0;
                string trans_id = "";

                if (list.Count() > 0)
                {
                    foreach (ArrivalCars apc in list)
                    {
                        ef_arr_cars.Add(apc);
                        ef_arr_cars.Save();
                        long res = ef_arr_cars.Refresh(apc).id;
                        if (res > 0) { trans++; }
                        if (res < 0) { error++; }
                        trans_id = trans_id + res.ToString() + "; ";

                    }
                    string mess = String.Format("В списке определенно: {0} вагонов, перенесено в БД METRANS.Arrival : {1}, пропущено по ошибке : {2}", list.Count(), trans, error);
                    mess.InformationLog(servece_owner, this.eventID);
                    if (list.Count() > 0) { mess.EventLog(trans_id, servece_owner, eventID); }
                    return trans;
                }
                else return 0;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("TransferListArrivalCarsToDB(list={0})", list), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Перенести БД Arrival вагоны состава из файла xml.
        /// </summary>
        /// <param name="new_id"></param>
        /// <param name="file"></param>
        /// <param name="countCopy"></param>
        /// <param name="countError"></param>
        /// <returns></returns>
        protected bool SaveArrivalWagons(long new_id, string file, ref int countCopy, ref int countError)
        {
            try
            {
                int count_wagons = 0;
                if (new_id > 0)
                {
                    // Переносим вагоны
                    count_wagons = TransferListArrivalCarsToDB(TransferXMLToListArrivalCars(file, new_id));
                    if (count_wagons > 0) { countCopy++; }
                    if (count_wagons < 0) { countError++; } // Счетчик ошибок при переносе
                }
                if (new_id < 0) { countError++; } // Счетчик ошибок при переносе
                if (count_wagons > 0 & new_id > 0)
                {
                    if (arrival_to_railway)
                    {
                        // Перенесем вагоны в прибытие
                        int res = InsertIDSArrivalSostav(new_id);
                    }
                    return true;
                }
            }
            catch (Exception e)
            {
                e.ExceptionLog(String.Format("Ошибка операции добавления вагонов в БД METRANS.Arrival, сотава на станции УЗ КР :{0}", new_id), servece_owner, eventID);
            }
            return false;
        }
        /// <summary>
        /// Получить список FileArrivalSostav
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        protected List<FileArrivalSostav> GetFileArrivalSostav(string[] files)
        {
            List<FileArrivalSostav> listfs = new List<FileArrivalSostav>();
            foreach (string file in files)
            {
                try
                {
                    if (!String.IsNullOrEmpty(file))
                    {
                        FileInfo fi = new FileInfo(file);
                        string index = fi.Name.Substring(5, 13);
                        DateTime date = DateTime.Parse(fi.Name.Substring(19, 4) + "-" + fi.Name.Substring(23, 2) + "-" + fi.Name.Substring(25, 2) + " " + fi.Name.Substring(27, 2) + ":" + fi.Name.Substring(29, 2) + ":00");
                        int operation = GetOperationToXml(file);
                        // Добавим строку если определилась операция
                        listfs.Add(new FileArrivalSostav()
                        {
                            Index = index,
                            Date = date,
                            Operation = operation,
                            File = file
                        });

                    }
                }
                catch (Exception e)
                {
                    e.ExceptionLog(String.Format("Ошибка формирования строки списка файлов состава List<FileArrivalSostav>, файл:{0}", file), servece_owner, eventID);
                }
            }
            return listfs;
        }
        /// <summary>
        /// Перености xml-файлы из указанной папки  в таблицы Arrival
        /// </summary>
        /// <param name="fromPath"></param>
        /// <param name="delete_file"></param>
        /// <returns></returns>
        public int TransferArrival(string fromPath, bool delete_file)
        {
            try
            {
                if (!Directory.Exists(fromPath))
                {
                    String.Format("Указанного пути {0} с xml-файлами для переноса в БД METRANS.Arrival.. не существует.", fromPath).ErrorLog(servece_owner, this.eventID);
                    return this.eventID.GetEventIDErrorCode((int)mtt_err.not_fromPath);
                }
                int countCopy = 0;
                int countExist = 0;
                int countError = 0;
                int countDelete = 0;
                string[] files = Directory.GetFiles(fromPath, "*.xml");
                if (files == null | files.Count() == 0) { return 0; }
                String.Format("Определенно {0} xml-файлов для копирования", files.Count()).InformationLog(servece_owner, this.eventID);
                List<FileArrivalSostav> list_sostav = GetFileArrivalSostav(files);
                var listFileSostavs = from c in list_sostav.OrderBy(c => c.Date).ThenBy(c => c.Index).ThenBy(c => c.Operation)
                                      select new { c.Index, c.Date, c.Operation, c.File };
                EFArrivalCars ef_arr_cars = new EFArrivalCars(new EFDbContext());
                EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(new EFDbContext());
                // Пройдемся по списку
                foreach (var fs in listFileSostavs)
                {
                    try
                    {
                        Console.WriteLine("Переносим файл {0}", fs.File);
                        DateTime start = DateTime.Now;
                        XDocument doc = XDocument.Load(fs.File);
                        // защита от записи повторов
                        FileInfo fi = new FileInfo(fs.File);
                        ArrivalSostav exs_sostav = ef_arr_sostav.Context.Where(s => s.file_name == fi.Name).FirstOrDefault();
                        if (exs_sostav == null)
                        {
                            long? ParentIDSostav = null;
                            long? id_arrived = ef_arr_sostav.Database.SqlQuery<long?>("SELECT max([id_arrived]) FROM [METRANS].[ArrivalSostav]").FirstOrDefault();//    .GetNextIDArrival();//SELECT max([id_arrived]) FROM [METRANS].[ArrivalSostav]
                            id_arrived = id_arrived != null ? id_arrived + 1 : 0; // Проверка и инкримент
                            // получить не закрытый состав
                            ArrivalSostav no_close_sostav = ef_arr_sostav.GetNoCloseArrivalSostav(fs.Index, fs.Date, this.day_range_arrival_cars);

                            if (no_close_sostav != null)
                            {
                                ParentIDSostav = no_close_sostav.id;
                                id_arrived = no_close_sostav.id_arrived;
                                // Закрыть состав
                                no_close_sostav.close = DateTime.Now;
                                ef_arr_sostav.Update(no_close_sostav);
                                ef_arr_sostav.Save();
                            }
                            ArrivalSostav new_sostav = new ArrivalSostav()
                            {
                                id = 0,
                                id_arrived = (int)id_arrived,
                                file_name = fi.Name,
                                composition_index = fs.Index,
                                date_time = fs.Date,
                                create = DateTime.Now,
                                close = null,
                                arrived = null,
                                Parent_id = ParentIDSostav,
                                operation = fs.Operation,

                            };
                            ef_arr_sostav.Add(new_sostav);
                            ef_arr_sostav.Save();
                            new_sostav = ef_arr_sostav.Refresh(new_sostav);
                            long new_id = new_sostav.id;


                            if (delete_file & SaveArrivalWagons(new_id, fs.File, ref countCopy, ref countError))
                            {
                                File.Delete(fs.File);
                                countDelete++;
                            }
                        }
                        else
                        {
                            // Проверка сравниваем количество если совподает удаляем файл, иначе добавляем новые вагоны и удаляем файл
                            List<ArrivalCars> list = TransferXMLToListArrivalCars(fs.File, exs_sostav.id);
                            List<ArrivalCars> listdb = ef_arr_cars.Context.Where(c => c.id_sostav == exs_sostav.id).ToList();
                            if (list != null && listdb != null)
                            {
                                if (list.Count() != listdb.Count())
                                {
                                    SqlParameter IDSostav = new SqlParameter("@IDSostav", exs_sostav.id);
                                    ef_arr_sostav.Database.ExecuteSqlCommand("DELETE FROM [METRANS].[ArrivalCars] WHERE [id_sostav] = @IDSostav", IDSostav);
                                    if (delete_file & SaveArrivalWagons(exs_sostav.id, fs.File, ref countCopy, ref countError))
                                    {
                                        File.Delete(fs.File);
                                        countDelete++;
                                    }
                                }
                                else
                                {
                                    // Файл перенесен ранеее, удалим его если это требуется
                                    if (delete_file)
                                    {
                                        File.Delete(fs.File);
                                        countDelete++;
                                    }
                                }
                                countExist++;
                            }
                        }
                        DateTime stop = DateTime.Now;
                        servece_owner.ServicesToLog(eventID, String.Format("Файл {0} - перенесен.", fs.File), start, stop, countCopy);
                    }
                    catch (Exception e)
                    {
                        e.ExceptionLog(String.Format("Ошибка переноса xml-файла в БД METRANS.Arrival, файл {0}", fs.File), servece_owner, eventID);
                        countError++;
                    }
                }
                string mess = String.Format("Перенос xml-файлов в БД METRANS.Arrival выполнен, определено для переноса {0} xml-файлов, перенесено {1}, были перенесены ранее {2}, ошибки при переносе {3}, удаленно {4}.", files.Count(), countCopy, countExist, countError, countDelete);
                mess.InformationLog(servece_owner, this.eventID);
                if (files != null && files.Count() > 0) { mess.EventLog(countError > 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID); }
                return files.Count();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("TransferArrival(fromPath={0}, delete_file={1})", fromPath, delete_file), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Перености xml-файлы из папки по умолчанию  в таблицы Arrival
        /// </summary>
        /// <returns></returns>
        public int TransferArrival()
        {
            return TransferArrival(this.fromPath, this.delete_file);
        }
        /// <summary>
        /// Добавить прибывший состав в систему IDS
        /// </summary>
        /// <param name="id_sostav"></param>
        /// <returns></returns>
        public int InsertIDSArrivalSostav(long id_sostav)
        {
            try
            {
                EFArrivalCars ef_cars = new EFArrivalCars(new EFDbContext());
                EFArrivalSostav ef_sostav = new EFArrivalSostav(new EFDbContext());

                IDSTransfer ids = new IDSTransfer(this.servece_owner);
                // Получим состав b вагоны
                ArrivalSostav sostav = ef_sostav.Get(id_sostav);
                List<ArrivalCars> cars = ef_cars.Context.Where(c => c.id_sostav == id_sostav).OrderBy(c => c.position).ToList();

                int count = 0;      // Количество перенесеных вагонов
                string mess = null; // Сообщения
                // Проверим состав и вагоны
                if (sostav != null && cars != null && cars.Count() > 0)
                {
                    int train = cars[0].train;
                    long id_arrival = ids.InsertArrivalSostav(sostav.id_arrived, sostav.id, train, sostav.composition_index, sostav.date_time);
                    // Требуется обновить вагоны
                    if (id_arrival > 0)
                    {
                        List<ArrCar> arrival_cars = new List<ArrCar>();
                        arrival_cars = cars.Select(c => new ArrCar() { num = c.num, position = c.position, consignee = c.consignee, dt = sostav.date_time }).ToList();
                        count = ids.InsertArrivalCars(id_arrival, arrival_cars);
                    }
                    // Сформируем сообщение и сохраним в логе
                    mess = String.Format("Перенос состава из БД METRANS.Arrival -> БД IDS.Arrival - ВЫПОЛНЕН (METRANS.Arrival.id={0}, перенесено {1} вагона(ов)).", id_sostav, count);
                    mess.InformationLog(servece_owner, this.eventID);
                    mess.EventLog(count < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                    return count;
                }
                // Сформируем сообщение и сохраним в логе
                mess = String.Format("В БД METRANS.Arrival строка METRANS.Arrival.id={0} - НЕ НАЙДЕНА", id_sostav);
                mess.ErrorLog(servece_owner, this.eventID);
                mess.EventLog(EventStatus.Error, servece_owner, eventID);
                return -1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("InsertIDSArrivalSostav(id_sostav={0})", id_sostav), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        #endregion

        #region TransferArrivalAPI Перенос вагонов из api mt
        /// <summary>
        /// Вурнуть отсортированый резульат по составам и операциям
        /// </summary>
        /// <param name="list_wagon"></param>
        /// <returns></returns>
        public List<SostavArrivalMT> SortSostavRequest(List<WagonsArrivalMT> list_wagon)
        {
            try
            {
                List<SostavArrivalMT> list_result = new List<SostavArrivalMT>();

                // Сгруппируем по индексу поезда
                List<IGrouping<string, WagonsArrivalMT>> reg_mt_gr = list_wagon
                                .ToList()
                                .GroupBy(w => w.composition_index)
                                .ToList();

                // Пройдемся по индексу поезда
                foreach (IGrouping<string, WagonsArrivalMT> gr_sostav in reg_mt_gr.ToList())
                {
                    string composition_index = gr_sostav.Key;

                    // Группируем по времени
                    List<IGrouping<DateTime, WagonsArrivalMT>> sostav_operation_data = gr_sostav
                        .OrderByDescending(w => w.date_operation)
                    .ToList()
                    .GroupBy(w => w.date_operation)
                    .ToList();
                    // Пройдемся по времени
                    foreach (IGrouping<DateTime, WagonsArrivalMT> operation_data in sostav_operation_data.ToList())
                    {
                        DateTime date_operation = operation_data.Key;
                        // Группируем по операциям
                        List<IGrouping<string, WagonsArrivalMT>> sostav_operation = operation_data
                        .ToList()
                        .GroupBy(w => w.operation)
                        .ToList();
                        // Пройдемся по операциям
                        foreach (IGrouping<string, WagonsArrivalMT> operation in sostav_operation.ToList())
                        {
                            string oper = operation.Key;
                            List<WagonsArrivalMT> list = new List<WagonsArrivalMT>();
                            // Коррекция - убираю повторы
                            int position = 0;
                            foreach (WagonsArrivalMT wamt in operation.OrderBy(c => c.position).ToList())
                            {
                                if (position != wamt.position)
                                {
                                    list.Add(wamt);
                                    position = wamt.position;
                                }
                            }
                            // Добавим результат
                            list_result.Add(new SostavArrivalMT()
                            {
                                composition_index = composition_index,
                                date_operation = date_operation,
                                operation = oper,
                                wagons = list.OrderBy(w => w.position).ToList()
                            });
                        }
                    }
                }
                return list_result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SortSostavRequest(list_wagon={0})", list_wagon), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Получить ссылку на старую запись вагона (с коррекцией истории)
        /// </summary>
        /// <param name="context"></param>
        /// <param name="car"></param>
        /// <param name="day_range"></param>
        /// <returns></returns>
        public long? GetParentID(ref EFDbContext context, ArrivalCars car, int day_range)
        {
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }

                long? parentid = null;
                EFArrivalCars ef_arr_cars = new EFArrivalCars(context);
                EFConsignee ef_consignee = new EFConsignee(context);
                ArrivalCars old_car = ef_arr_cars.Context.Where(c => c.num == car.num).OrderByDescending(c => c.id).FirstOrDefault();
                if (old_car == null) return null; // нет историии движения, первая операция над вагоном
                if (old_car.arrived != null) return null; // история закрыта, первая операция над вагоном 

                if (old_car.cargo_code == car.cargo_code)
                {
                    if (old_car.date_operation.Date.AddDays(day_range) > car.date_operation)
                    {

                        if (old_car.composition_index == car.composition_index |
                                (old_car.composition_index != car.composition_index &
                                ef_consignee.IsConsigneeSend(false, old_car.consignee, mtConsignee.AMKR) &
                                ef_consignee.IsConsigneeSend(true, car.consignee, mtConsignee.AMKR)))
                        { // Продолжаем цепочку вагонов если равны CompositionIndex или (CompositionIndex не равны но следующий код досылки и входит в диапазон времени)
                            parentid = old_car.id;
                            old_car.num_doc_arrived = (int)mtt_err_arrival.close_car;
                            old_car.arrived = car.date_operation;
                        }
                        else
                        {
                            // вагон начал движение по новому маршруту
                            old_car.num_doc_arrived = (int)mtt_err_arrival.close_new_route;
                            old_car.arrived = car.date_operation;
                        }
                    }
                    else
                    {
                        // больше допустимого интервала
                        old_car.num_doc_arrived = (int)mtt_err_arrival.close_timeout;
                        old_car.arrived = DateTime.Now;
                    }
                }
                else
                {
                    // грузы в вагонах разные
                    old_car.num_doc_arrived = (int)mtt_err_arrival.close_different_cargo;
                    old_car.arrived = car.date_operation;
                }
                // закрываем старый вагон
                old_car.arrived = car.date_operation;
                ef_arr_cars.Update(old_car);
                //ef_arr_cars.Save(); // сохранить изменение
                return parentid;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetParentID(context={0}, car={1}, day_range={2})", context, car, day_range), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Добавить список вагонов
        /// </summary>
        /// <param name="context"></param>
        /// <param name="wagons"></param>
        /// <returns></returns>
        public List<ArrivalCars> AddWagon(ref EFDbContext context, List<WagonsArrivalMT> wagons)
        {
            try
            {
                // Добавим вагоны
                List<ArrivalCars> result_wagons = new List<ArrivalCars>();
                int position = 0;
                foreach (WagonsArrivalMT wag_mt in wagons.OrderBy(w => w.position).ToList())
                {
                    // Проверка на повторяющиеся вагоны
                    if (wag_mt.position != position)
                    {
                        string cargo = "?";
                        if (!String.IsNullOrWhiteSpace(wag_mt.cargo))
                        {
                            cargo = wag_mt.cargo.Length > 50 ? wag_mt.cargo.Substring(0, 49) : wag_mt.cargo;
                        }

                        // Получим вагон
                        ArrivalCars wag = new ArrivalCars()
                        {
                            id = 0,
                            id_sostav = 0,
                            position = wag_mt.position,
                            num = wag_mt.num,
                            country_code = wag_mt.country_code >= 100 ? int.Parse(wag_mt.country_code.ToString().Substring(0, 2)) : 0,
                            wight = (float)wag_mt.wight,
                            cargo_code = wag_mt.cargo_code,
                            cargo = cargo,
                            station_code = wag_mt.station_code,
                            station = wag_mt.station,
                            consignee = wag_mt.consignee,
                            operation = wag_mt.operation,
                            composition_index = wag_mt.composition_index,
                            date_operation = wag_mt.date_operation,
                            train = wag_mt.train,
                            num_doc_arrived = null,
                            arrived = null,
                            parent_id = null,
                            user_name = null,
                        };
                        wag.parent_id = GetParentID(ref context, wag, this.day_range_arrival_cars);
                        result_wagons.Add(wag);
                        // запомним позицию
                        position = wag_mt.position;
                    }
                    else
                    {
                        // Позиция повторяется
                        Console.WriteLine("Вагон {0}, с позицией {1} был добавлен в состав {2}", wag_mt.num, wag_mt.position, wag_mt.composition_index);
                    }
                }
                return result_wagons;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("AddWagon(context={0}, wagons={1})", context, wagons), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Перенести натурные листы по прибытию
        /// </summary>
        /// <returns></returns>
        public int TransferArrivalAPI(string url, string user, string psw, string api)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                List<SostavArrivalMT> sostav_result = null;
                WebApiClientMT client_arr = new WebApiClientMT(url, user, psw, api, this.servece_owner);
                RequestArrivalMT request = client_arr.GetArrival();
                if (request == null) return -1;
                String.Format("Получен ответ на запрос id = {0}, получено вагонов {1}", request.id, request.wagons.Count()).InformationLog(servece_owner, this.eventID);
                if (request != null && request.wagons != null && request.wagons.Count > 0)
                {
                    // Есть ответ с вагонами
                    sostav_result = SortSostavRequest(request.wagons.ToList());
                    // Отсортируем по индексу
                    List<IGrouping<string, SostavArrivalMT>> sostav_ci = sostav_result
                        .ToList()
                        .GroupBy(w => w.composition_index)
                        .ToList();
                    String.Format("Определенно {0} составов для копирования", sostav_result.Count()).InformationLog(servece_owner, this.eventID);
                    EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);
                    EFArrivalCars ef_arr_cars = new EFArrivalCars(context);
                    int add = 0;
                    int error_add = 0;
                    int update = 0;
                    int error_update = 0;
                    int skip = 0;
                    // Пройдемся по сгруппированным составам
                    foreach (IGrouping<string, SostavArrivalMT> ci in sostav_ci)
                    {
                        // Пройдемся по составам
                        foreach (SostavArrivalMT st_ci in ci.OrderBy(w => w.date_operation).ThenBy(c => c.operation).ToList())
                        {
                            int count_wagon = 0;
                            // Обработаем текущий состав
                            Console.WriteLine("Переносим состав с индексом {0}, дата операции {1}", st_ci.composition_index, st_ci.date_operation);
                            string message = String.Format("Cостав [Индекс : {0}, операция : {1}, дата : {2}]", st_ci.composition_index, st_ci.operation, st_ci.date_operation);
                            DateTime start = DateTime.Now;
                            // Поиск состава в системе по имени (индекс + дата и ремя + операция).
                            string file_name_en = "api:" + st_ci.composition_index + "_" + st_ci.date_operation.ToString(CultureInfo.CreateSpecificCulture("en-US")) + "_" + st_ci.operation;
                            string file_name_ru = "api:" + st_ci.composition_index + "_" + st_ci.date_operation.ToString() + "_" + st_ci.operation;
                            ArrivalSostav old_sostav = ef_arr_sostav.Context.Where(s => s.file_name == file_name_en).OrderByDescending(c => c.date_time).FirstOrDefault();
                            if (old_sostav == null)
                            {
                                old_sostav = ef_arr_sostav.Context.Where(s => s.file_name == file_name_ru).OrderByDescending(c => c.date_time).FirstOrDefault();
                            }
                            if (old_sostav == null)
                            {
                                // Сотава в системе нет
                                ArrivalSostav exs_sostav = ef_arr_sostav.Context.Where(s => s.composition_index == st_ci.composition_index).OrderByDescending(c => c.date_time).FirstOrDefault();
                                // Нет информации по саставу
                                long? ParentIDSostav = null;
                                long? id_arrived = ef_arr_sostav.Database.SqlQuery<long?>("SELECT max([id_arrived]) FROM [METRANS].[ArrivalSostav]").FirstOrDefault();//    .GetNextIDArrival();//SELECT max([id_arrived]) FROM [METRANS].[ArrivalSostav]
                                id_arrived = id_arrived != null ? id_arrived + 1 : 0; // Проверка и инкримент

                                // получить не закрытый состав
                                if ((exs_sostav==null) || (exs_sostav != null && exs_sostav.date_time < st_ci.date_operation))
                                {
                                    // Время актуальное
                                    if (exs_sostav != null)
                                    {
                                        System.TimeSpan diff_operation = st_ci.date_operation.Subtract(exs_sostav.date_time);
                                        if (diff_operation.TotalDays < this.day_range_arrival_cars)
                                        {
                                            ParentIDSostav = exs_sostav.id;
                                            id_arrived = exs_sostav.id_arrived;
                                            // Закрыть состав
                                            exs_sostav.close = DateTime.Now;
                                            ef_arr_sostav.Update(exs_sostav); // Обновление
                                        }
                                    }
                                    ArrivalSostav new_sostav = new ArrivalSostav()
                                    {
                                        id = 0,
                                        id_arrived = (int)id_arrived,
                                        file_name = "api:" + st_ci.composition_index + "_" + st_ci.date_operation.ToString(CultureInfo.CreateSpecificCulture("en-US")) + "_" + st_ci.operation,
                                        composition_index = st_ci.composition_index,
                                        date_time = st_ci.date_operation,
                                        create = DateTime.Now,
                                        close = null,
                                        arrived = null,
                                        Parent_id = ParentIDSostav,
                                        operation = st_ci.operation == "ПРИБ" ? 1 : 2,

                                    };
                                    // Получим и добавим вагоны
                                    foreach (ArrivalCars car in AddWagon(ref context, st_ci.wagons))
                                    {
                                        new_sostav.ArrivalCars.Add(car);
                                    };
                                    count_wagon = new_sostav.ArrivalCars.Count();
                                    // Добавим новый состав
                                    ef_arr_sostav.Add(new_sostav);
                                    // Добавим
                                    int result_add = context.SaveChanges();
                                    if (result_add > 0)
                                    {
                                        add++;
                                        if (arrival_to_railway)
                                        {
                                            // Перенесем вагоны в прибытие
                                            int res = InsertIDSArrivalSostav(new_sostav.id);
                                        }
                                    }
                                    else
                                    {
                                        error_add++;
                                    }
                                    message += " - добавлен, код вып. = " + result_add.ToString();
                                }
                                else
                                {
                                    // Время старое, 
                                    if (exs_sostav != null)
                                    {
                                        Console.WriteLine("Состав {0} пропущен по времени, время текущее {1} < времени в базе {2}.", st_ci.composition_index, st_ci.date_operation, exs_sostav.date_time);
                                    }
                                    else { 
                                    
                                    }

                                    skip++;
                                    message += " - пропущен.";
                                }

                            }
                            else
                            {
                                // Состав уже есть, и количество вагонов разное
                                if (old_sostav.ArrivalCars.Count() != st_ci.wagons.Count())
                                {
                                    //// Удалим вагоны
                                    //List<long> ids = old_sostav.ArrivalCars.Where(w=>w.parent_id==null).Select(c => c.id).ToList();
                                    //ef_arr_cars.Delete(ids);
                                    //int del = ef_arr_cars.Save();
                                    //ids = old_sostav.ArrivalCars.Where(w=>w.parent_id!=null).Select(c => c.id).ToList();
                                    //ef_arr_cars.Delete(ids);
                                    //del = ef_arr_cars.Save();
                                    ////old_sostav.ArrivalCars.Clear();
                                    //// Добавим новые
                                    //foreach (ArrivalCars car in AddWagon(ref context, st_ci.wagons))
                                    //{
                                    //    old_sostav.ArrivalCars.Add(car);
                                    //};
                                    //count_wagon = old_sostav.ArrivalCars.Count();
                                    //ef_arr_sostav.Update(old_sostav);
                                    //int result_upd = context.SaveChanges();
                                    //if (result_upd > 0)
                                    //{
                                    //    update++;
                                    //    if (arrival_to_railway)
                                    //    {
                                    //        //Перенесем вагоны в прибытие
                                    //        int res = InsertIDSArrivalSostav(old_sostav.id);
                                    //    }
                                    //}
                                    //else
                                    //{
                                    //    error_update++;
                                    //}
                                    //message += " - обновлен, код вып. = " + result_upd.ToString();
                                    Console.WriteLine("Состав {0}, но есть разница в кол. вагонов, текущее {1} < в базе {2}.", st_ci.composition_index, st_ci.wagons.Count(), old_sostav.ArrivalCars.Count());
                                    skip++;
                                    message += " - пропущен.";
                                }
                                else
                                {
                                    skip++;
                                    message += " - пропущен.";
                                }

                            }
                            DateTime stop = DateTime.Now;
                            servece_owner.ServicesToLog(eventID, message, start, stop, count_wagon);
                        };
                    }

                    if (error_update == 0 && error_add == 0 && sostav_result.Count() == add + update + skip)
                    {
                        string post_res = client_arr.PostArrival(request.id);
                    }
                    string mess = String.Format("Перенос натурных листов вагонов по прибытию в БД METRANS.Arrival выполнен id запроса [{0}], определено для переноса {1} составов, обнавлено {2}, добавлено {3}, пропущено {4}, ошибок обновления {5}, ошибок добавления {6}.",
                        request.id, sostav_result.Count(), update, add, skip, error_update, error_add);
                    mess.InformationLog(servece_owner, this.eventID);
                    if (sostav_result != null && sostav_result.Count() > 0) { mess.EventLog(error_update > 0 || error_add > 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID); }

                    return error_update > 0 || error_add > 0 ? error_update + error_add : add + update + skip;
                }
                else return 0;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("TransferArrivalAPI(url={0}, user={1}, psw={2}, api={3})", url, user, psw, api), servece_owner, eventID);
                return -1;
            }
        }
        #endregion


        #region TransferWagonsTracking Перенос вагонов из Web.Api МетТранса
        /// <summary>
        /// Добавить список изменений по вагону
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public int TransferWagonsTracking(List<WagonsTrackingMT> list)
        {
            if (list == null || list.Count() == 0) return 0;
            UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ

            EFWagonsTracking ef_wt = new EFWagonsTracking(new EFDbContext());
            int countCopy = 0;
            int countError = 0;
            int res = 0;
            //string trans_id = "";
            try
            {
                foreach (WagonsTrackingMT wt in list.OrderBy(l => l.dt))
                {
                    try
                    {
                        int id_cargo = 0;
                        if (wt.kgr != null && wt.kgr > 0)
                        {
                            id_cargo = 0;//TODO: Доработать внутрений справочник uz_directory.GetIDReferenceCargoOfCorrectCodeETSNG((int)wt.kgr);
                        }
                        WagonsTracking new_wt = new WagonsTracking()
                        {
                            id = 0,
                            nvagon = wt.nvagon,
                            st_disl = wt.st_disl,
                            nst_disl = wt.nst_disl,
                            kodop = wt.kodop,
                            nameop = wt.nameop,
                            full_nameop = wt.full_nameop,
                            dt = wt.dt,
                            st_form = wt.st_form,
                            nst_form = wt.nst_form,
                            idsost = wt.idsost,
                            nsost = wt.nsost,
                            st_nazn = wt.st_nazn,
                            nst_nazn = wt.nst_nazn,
                            ntrain = wt.ntrain,
                            st_end = wt.st_end,
                            nst_end = wt.nst_end,
                            kgr = wt.kgr,
                            nkgr = wt.nkgr,
                            id_cargo = id_cargo,
                            kgrp = wt.kgrp,
                            ves = wt.ves,
                            updated = wt.updated,
                            kgro = wt.kgro,
                            km = wt.km,
                        };
                        ef_wt.Add(new_wt);
                        res = ef_wt.Save();
                        if (res >= 0)
                        {
                            countCopy++;
                        }
                        else
                        {
                            countError++;
                        }
                    }
                    catch (Exception e)
                    {
                        e.ExceptionLog(String.Format("Ошибка переноса информации по вагону {0} дата операции {1} в БД METRANS.WagonsTracking", wt.nvagon, wt.dt), servece_owner, eventID);
                        countError++;
                    }
                }
                string mess = String.Format("Вагон №{0}, Определенно: {1} новых операций, перенесено в БД METRANS.WagonsTracking : {2}, пропущено по ошибке : {3}", (list != null && list.Count() > 0 ? list[0].nvagon : -1), list.Count(), countCopy, countError);
                mess.InformationLog(servece_owner, this.eventID);
                if (list != null && list.Count() > 0) { mess.EventLog(countError > 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID); }
                return countError == 0 ? countCopy : -1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("TransferWagonsTracking(list={0})", list), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Перенести информацию слежения за вагонами
        /// </summary>
        /// <returns></returns>
        public int TransferWagonsTracking(DateTime datetime_start_new_tracking, string url, string user, string psw, string api)
        {
            int countCopy = 0;
            int countSkip = 0;
            int countError = 0;
            int res = 0;
            EFWagonsTracking ef_wt = new EFWagonsTracking(new EFDbContext());
            try
            {
                WebApiClientMT client = new WebApiClientMT(url, user, psw, api, this.servece_owner);
                List<WagonsTrackingMT> list_tracking = client.GetWagonsTracking();
                if (list_tracking == null) return (int)mtt_err.not_listWagonsTracking;
                foreach (WagonsTrackingMT wt in list_tracking)
                {
                    try
                    {
                        List<WagonsTracking> list = ef_wt.Context.Where(t => t.nvagon == wt.nvagon).ToList(); // GetWagonsTrackingOfNumCars(wt.nvagon).ToList();
                        WagonsTracking wt_old = list.OrderByDescending(t => t.dt).FirstOrDefault();
                        if (wt_old == null)
                        {
                            // Обновляем информацию переносим все
                            List<WagonsTrackingMT> list_new = client.GetWagonsTracking(wt.nvagon, datetime_start_new_tracking);
                            if (list_new == null || list_new.Count() == 0)
                            {
                                list_new.Add(wt);
                            }
                            res = TransferWagonsTracking(list_new);
                            if (res >= 0)
                            {
                                countCopy++;
                            }
                            else
                            {
                                countError++;
                            }
                        }
                        else
                        {
                            if (wt_old.dt != wt.dt)
                            {
                                // Обновляем информацию добавим новое
                                List<WagonsTrackingMT> list_new = client.GetWagonsTracking(wt.nvagon, ((DateTime)wt_old.dt).AddSeconds(1));
                                res = TransferWagonsTracking(list_new);
                                if (res >= 0)
                                {
                                    countCopy++;
                                }
                                else
                                {
                                    countError++;
                                }
                            }
                            else
                            {
                                countSkip++;
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        e.ExceptionLog(String.Format("Ошибка переноса информации по вагону {0} дата операции {1} в БД METRANS.WagonsTracking", wt.nvagon, wt.dt), servece_owner, eventID);
                        countError++;
                    }
                }
                string mess = String.Format("Перенос информации о слежении за вагонами в БД MT.WagonsTracking выполнен, доступна информация о {0} вагонах, перенесено новых данных {1}, пропущено {2}, ошибки при переносе {3}."
                    , list_tracking.Count(), countCopy, countSkip, countError);
                mess.InformationLog(servece_owner, this.eventID);
                if (list_tracking != null && list_tracking.Count() > 0) { mess.EventLog(countError > 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID); }
                return list_tracking.Count();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("TransferWagonsTracking()"), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Перенести информацию слежения за вагонами
        /// </summary>
        /// <returns></returns>
        public int TransferWagonsTracking()
        {
            return TransferWagonsTracking(this.datetime_start_new_tracking, this.url_wagons_tracking, this.user_wagons_tracking, this.psw_wagons_tracking, this.api_wagons_tracking);
        }
        #endregion

        #region WagonsTracking_MotionSignals Построение сигналов движения вагона на внешней сети из Web.Api МетТранса
        /// <summary>
        /// Перенести данные и построить сигналы движения всех вагонов
        /// </summary>
        /// <returns></returns>
        public int TransferWagonsMotionSignals()
        {
            try
            {
                int add = 0;
                int error = 0;
                int skip = 0;
                IDSMORS mors = new IDSMORS(this.servece_owner);
                List<int> nums = mors.GetNumCarsOfAMKR();
                if (nums != null)
                {
                    foreach (int num in nums)
                    {
                        int result = TransferWagonsMotionSignals(num);
                        if (result > 0) { add++; }
                        if (result < 0) { error++; }
                        if (result == 0) { skip++; }
                    }
                    // Сформируем сообщение и сохраним в логе
                    string mess = String.Format("Построение сигналов и перенос сотояния движения вагонов из БД METRANS.WagonsTracking -> БД IDS.MORS - ВЫПОЛНЕН (Общее количество вагонов={0}, перенесено={1}, пропущено={2}, ошибок переноса={3}).", nums.Count(), add, skip, error);
                    mess.InformationLog(servece_owner, this.eventID);
                    mess.EventLog(error > 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                    return error > 0 ? error : nums.Count();
                }
                return 0;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("TransferWagonsMotionSignals()"), servece_owner, eventID);
                return -1;
            }
        }

        /// <summary>
        /// Прибыл на АМКР
        /// </summary>
        /// <param name="car"></param>
        /// <param name="route"></param>
        /// <param name="station_end"></param>
        /// <param name="station_from"></param>
        public void ArrivalAMKR(WTMotionSignals car, ref ids_route route, ref int station_end, ref int station_from, ref DateTime? start_flight, ref DateTime? start_turnover, ref ids_type_flight_wagon type_flight)
        {
            // Прибыл на АМКР (считаем время прибытия)
            if (route == ids_route.ret | route == ids_route.not)
            {
                // Прибыл новый цикл
                route = ids_route.amkr;
                start_flight = car.dt;
                start_turnover = car.dt;
                station_from = (int)car.st_disl;
                station_end = (int)car.st_end;
                type_flight = car.ves > 0 ? ids_type_flight_wagon.unloading : ids_type_flight_wagon.loading;
            }
            else
            {
                // Алгоритм неопределил "вагон возвращается"  
                if (route == ids_route.client)
                {
                    route = ids_route.amkr;
                    start_flight = car.dt;
                    start_turnover = car.dt;
                    station_from = (int)car.st_disl;
                    station_end = (int)car.st_end;
                    type_flight = car.ves > 0 ? ids_type_flight_wagon.unloading : ids_type_flight_wagon.loading;
                }
                // Вагон возращается на АМКР (цикл не меняем)
                if (route == ids_route.send)
                {

                    route = ids_route.amkr;
                    start_flight = car.dt;
                    start_turnover = car.dt;
                    station_from = (int)car.st_disl;
                    station_end = (int)car.st_end;
                    type_flight = car.ves > 0 ? ids_type_flight_wagon.unloading : ids_type_flight_wagon.loading;
                }
                // Сообщение "Вагон прибыл на АМКР а route != ids_route.ret"
            }

        }
        /// <summary>
        /// Возвращается на АМКР
        /// </summary>
        /// <param name="car"></param>
        /// <param name="route"></param>
        /// <param name="station_end"></param>
        /// <param name="station_from"></param>
        public void ReturnAMKR(WTMotionSignals car, ref ids_route route, ref int station_end, ref int station_from, ref DateTime? start_flight, ref ids_type_flight_wagon type_flight)
        {
            // Отправлен на АМКР (считаем время отправки)
            if (route == ids_route.client || route == ids_route.not)
            {
                // возврат
                route = ids_route.ret;
                start_flight = car.dt;
                station_from = (int)car.st_disl;
                station_end = (int)car.st_end;
                type_flight = car.ves > 0 ? ids_type_flight_wagon.loaded_flight : ids_type_flight_wagon.empty_flight;
            }
            else
            {
                // Алгоритм неопределил "вагон у клиента"  
                if (route == ids_route.send)
                {
                    // возврат
                    route = ids_route.ret;
                    start_flight = car.dt;
                    station_from = (int)car.st_disl;
                    station_end = (int)car.st_end;
                    type_flight = car.ves > 0 ? ids_type_flight_wagon.loaded_flight : ids_type_flight_wagon.empty_flight;

                }
                // Сообщение "Возврат вагона на АМКР а route != ids_route.client"
            } // {end Отправлен на АМКР}
        }
        /// <summary>
        /// Вагон прибыл клиенту
        /// </summary>
        /// <param name="car"></param>
        /// <param name="route"></param>
        /// <param name="station_end"></param>
        /// <param name="station_from"></param>
        public void ArrivalClient(WTMotionSignals car, ref ids_route route, ref int station_end, ref int station_from, ref DateTime? start_flight, ref ids_type_flight_wagon type_flight)
        {
            // Вагон прибыл к клиенту
            if (route == ids_route.send || route == ids_route.not)
            {
                // прибыл клиенту
                route = ids_route.client;
                start_flight = car.dt;
                station_from = (int)car.st_disl;
                station_end = (int)car.st_end;
                type_flight = car.ves > 0 ? ids_type_flight_wagon.unloading : ids_type_flight_wagon.loading;
            }
            else
            {
                // Алгоритм неопределил "вагон направлен клиенту" 
                if (route == ids_route.amkr)
                {
                    route = ids_route.client;
                    start_flight = car.dt;
                    station_from = (int)car.st_disl;
                    station_end = (int)car.st_end;
                    type_flight = car.ves > 0 ? ids_type_flight_wagon.unloading : ids_type_flight_wagon.loading;
                }
                // Если ids_route.client пропускаем (за ОТОТ может прийти ВЫГРН)
                // Сообщение "Вагон прибыл к клиенту а route != ids_route.send"
            }
        }
        /// <summary>
        /// Вагон движится к клиенту
        /// </summary>
        /// <param name="car"></param>
        /// <param name="route"></param>
        /// <param name="station_end"></param>
        /// <param name="station_from"></param>
        public void SendClient(WTMotionSignals car, ref ids_route route, ref int station_end, ref int station_from, ref DateTime? start_flight, ref ids_type_flight_wagon type_flight)
        {
            // Вагон движется к клиенту
            // Откуда движется вагон от АМКР или Клиента
            if (car.st_disl == 46700 || car.st_disl == 46720)
            {
                // Вагон движется к клиенту от АМКР (считаем время отправки)
                if (route == ids_route.amkr || route == ids_route.not)
                {
                    // отправка клиенту
                    route = ids_route.send;
                    start_flight = car.dt;
                    station_from = (int)car.st_disl;
                    station_end = (int)car.st_end;
                    type_flight = car.ves > 0 ? ids_type_flight_wagon.loaded_flight : ids_type_flight_wagon.empty_flight;
                }
                else
                {
                    // Алгоритм неопределил "вагон на АМКР" 
                    if (route == ids_route.ret)
                    {
                        route = ids_route.send;
                        start_flight = car.dt;
                        station_from = (int)car.st_disl;
                        station_end = (int)car.st_end;
                        type_flight = car.ves > 0 ? ids_type_flight_wagon.loaded_flight : ids_type_flight_wagon.empty_flight;
                    }
                    // Сообщение "Отправка клиенту из АМКР а route != ids_route.amkr"
                }
            }
            else
            {
                // Вагон движется к клиенту от клиента (считаем время отправки)                                
                if (route == ids_route.client || route == ids_route.not)
                {
                    // отправка опять клиенту
                    route = ids_route.send;
                    start_flight = car.dt;
                    station_from = (int)car.st_disl;
                    station_end = (int)car.st_end;
                    type_flight = car.ves > 0 ? ids_type_flight_wagon.loaded_flight : ids_type_flight_wagon.empty_flight;
                }
                else
                {
                    // Алгоритм неопределил "вагон у клиента" 
                    if (route == ids_route.send)
                    {
                        start_flight = car.dt;
                        station_from = (int)car.st_disl;
                        station_end = (int)car.st_end;
                        type_flight = car.ves > 0 ? ids_type_flight_wagon.loaded_flight : ids_type_flight_wagon.empty_flight;
                    }

                    // Сообщение "Отправка клиенту другому клиенту а route != ids_route.client"
                }

            }
        }
        /// <summary>
        /// Перенести данные и построить сигналы движения указанного вагона
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public int TransferWagonsMotionSignals(int num)
        {
            try
            {
                IDSMORS mors = new IDSMORS(this.servece_owner);

                EFWagonsTracking ef_wt = new EFWagonsTracking(new EFDbContext());
                List<WTMotionSignals> list_wt = new List<WTMotionSignals>();

                WTMotionSignals last_wtms = mors.GetLastWTMotionSignals(num);

                int result = 0;

                ids_route route = ids_route.not;
                ids_type_flight_wagon type_flight = ids_type_flight_wagon.not;
                int station_end = 0;
                int station_from = 0;
                int shipper = 0;
                int consignee = 0;
                int kode_cargo_consignee = 0; // Код грузополучатель
                int kode_cargo_shipper = 0; // Код грузоотправитель
                DateTime? start_flight = null; // Начало рейса
                DateTime? start_turnover = null; // Начало маршрута
                string note = null;

                if (last_wtms == null)
                {
                    // Таблица пуста обрабатываем все записи
                    list_wt = ef_wt
                        .Context
                        .Where(w => w.nvagon == num)
                        .OrderBy(c => c.dt).Select(w => new WTMotionSignals
                        {
                            id_wt = w.id,
                            nvagon = w.nvagon,
                            st_disl = w.st_disl,
                            nst_disl = w.nst_disl,
                            kodop = w.kodop,
                            nameop = w.nameop,
                            full_nameop = w.full_nameop,
                            dt = w.dt,
                            st_form = w.st_form,
                            nst_form = w.nst_form,
                            idsost = w.idsost,
                            nsost = w.nsost,
                            st_nazn = w.st_nazn,
                            nst_nazn = w.nst_nazn,
                            ntrain = w.ntrain,
                            st_end = w.st_end,
                            nst_end = w.nst_end,
                            kgr = w.kgr,
                            nkgr = w.nkgr,
                            id_cargo = w.id_cargo,
                            kgrp = w.kgrp,
                            ves = w.ves,
                            updated = w.updated,
                            kgro = w.kgro,
                            km = w.km,
                        }).ToList();
                }
                else
                {
                    // Таблица не пуста обрабатываем все записи начинающиеся после last_idwt
                    list_wt = ef_wt
                        .Context
                        .Where(w => w.nvagon == num & w.id > last_wtms.id_wt)
                        .OrderBy(c => c.dt).Select(w => new WTMotionSignals
                        {
                            id_wt = w.id,
                            nvagon = w.nvagon,
                            st_disl = w.st_disl,
                            nst_disl = w.nst_disl,
                            kodop = w.kodop,
                            nameop = w.nameop,
                            full_nameop = w.full_nameop,
                            dt = w.dt,
                            st_form = w.st_form,
                            nst_form = w.nst_form,
                            idsost = w.idsost,
                            nsost = w.nsost,
                            st_nazn = w.st_nazn,
                            nst_nazn = w.nst_nazn,
                            ntrain = w.ntrain,
                            st_end = w.st_end,
                            nst_end = w.nst_end,
                            kgr = w.kgr,
                            nkgr = w.nkgr,
                            id_cargo = w.id_cargo,
                            kgrp = w.kgrp,
                            ves = w.ves,
                            updated = w.updated,
                            kgro = w.kgro,
                            km = w.km,
                        }).ToList();
                    station_end = last_wtms.station_end;
                    station_from = last_wtms.station_from;
                    route = (ids_route)last_wtms.route;
                    type_flight = (ids_type_flight_wagon)last_wtms.type_flight;
                    shipper = last_wtms.shipper != null ? (int)last_wtms.shipper : 0;
                    consignee = last_wtms.consignee != null ? (int)last_wtms.consignee : 0;
                    kode_cargo_consignee = last_wtms.kgrp != null ? (int)last_wtms.kgrp : 0;
                    kode_cargo_shipper = last_wtms.kgro != null ? (int)last_wtms.kgro : 0;
                    start_flight = last_wtms.start_flight; // Начало рейса
                    start_turnover = last_wtms.start_turnover; // Начало маршрута
                    note = last_wtms.note; // 

                }
                // Обрабатываем полученные данные
                if (list_wt != null && list_wt.Count() > 0)
                {
                    foreach (WTMotionSignals wtms in list_wt)
                    {
                        // Определим цепочку следования грузополучатель грузоприемник
                        kode_cargo_consignee = wtms.kgrp > 0 ? (int)wtms.kgrp : kode_cargo_consignee;
                        kode_cargo_shipper = wtms.kgro > 0 ? (int)wtms.kgro : kode_cargo_shipper;

                        // Конечная станция не равна null и "в регулировании"
                        if (wtms.st_end > 0)
                        {
                            if (wtms.st_end == 46700 || wtms.st_end == 46720)
                            {
                                // Конечная станция Кривой Рог
                                switch (wtms.nameop)
                                {
                                    // Прибыли
                                    case "ОТОТ": ArrivalAMKR(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref start_turnover, ref type_flight); break;
                                    case "ВЫГ2": ArrivalAMKR(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref start_turnover, ref type_flight); break;
                                    case "ВЫГРН": ArrivalAMKR(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref start_turnover, ref type_flight); break;
                                    // Движутся
                                    case "ОДПВ": ReturnAMKR(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref type_flight); break;
                                    case "ПГР2": ReturnAMKR(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref type_flight); break;
                                    case "ПОГРН": ReturnAMKR(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref type_flight); break;
                                    // Проверим на смену маршрута
                                    default:
                                        if (wtms.st_end != station_end)
                                            // Маршрут поменялся вагон движется назад
                                            ReturnAMKR(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref type_flight);
                                        break;
                                }
                            }
                            else
                            {
                                // Конечная станция Клиент
                                switch (wtms.nameop)
                                {
                                    // Прибыл
                                    case "ОТОТ": ArrivalClient(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref type_flight); break;
                                    case "ВЫГРН": ArrivalClient(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref type_flight); break;
                                    // Движутся
                                    case "ОДПВ": SendClient(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref type_flight); break;
                                    case "ПГР2": SendClient(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref type_flight); break;
                                    case "ПОГРН": SendClient(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref type_flight); break;
                                    // Проверим на смену маршрута
                                    default:
                                        if (wtms.st_end != station_end)
                                            // Маршрут поменялся вагон движется к клиенту
                                            SendClient(wtms, ref route, ref station_end, ref station_from, ref start_flight, ref type_flight);
                                        break;
                                }
                            }
                        }
                        else
                        {
                            // Обработать эти операции
                            //ВЫГРН,РАСФ,ТСП,ВЫГРО,ОКОТ,ПРМ,ФОРМ,-НЕИС,ОСВ,ВУ36
                        }
                        // Скорректируем дополнительные данные
                        wtms.station_end = station_end;
                        wtms.station_from = station_from;
                        wtms.shipper = kode_cargo_shipper;
                        wtms.consignee = kode_cargo_consignee;
                        wtms.route = (int)route;
                        wtms.location = route == ids_route.amkr || route == ids_route.client ? (int)ids_location_wagon.loading_unloading : (int)ids_location_wagon.moves;
                        wtms.condition = wtms.ves > 0 ? (int)ids_condition_wagon.loaded : (int)ids_condition_wagon.empty;
                        wtms.type_flight = (int)type_flight;
                        wtms.start_flight = start_flight;
                        wtms.start_turnover = start_turnover;
                        TimeSpan? ts_duration_flight = start_flight != null && wtms.dt != null ? (TimeSpan?)((DateTime)wtms.dt - (DateTime)start_flight) : null;
                        TimeSpan? ts_duration_turnover = start_turnover != null && wtms.dt != null ? (TimeSpan?)((DateTime)wtms.dt - (DateTime)start_turnover) : null;
                        wtms.duration_flight = ts_duration_flight != null ? (int?)((TimeSpan)ts_duration_flight).TotalMinutes : null;
                        wtms.duration_turnover = ts_duration_turnover != null ? (int?)((TimeSpan)ts_duration_turnover).TotalMinutes : null;
                        wtms.note = note;
                    }
                    List<WTMotionSignals> list_result = list_wt.Where(w => w.start_turnover != null).ToList();
                    // Сохранить все
                    result = mors.SetWagonsMotionSignals(list_result);
                    if (result >= 0)
                    {
                        String.Format("Построение сигналов и перенос сотояния движения вагона №{0} в БД IDS.MORS - ВЫПОЛНЕНО. (Перенесено:{1} состояний).", num, result).InformationLog(servece_owner, this.eventID);
                    }
                    else
                    {
                        String.Format("Построение сигналов и перенос сотояния движения вагона №{0} в БД IDS.MORS - НЕ ВЫПОЛНЕНО. (Код ошибки:{1} состояний).", num, result).ErrorLog(servece_owner, this.eventID);
                    }
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("TransferWagonsMotionSignals(num={0})", num), servece_owner, eventID);
                return -1;
            }
        }

        #endregion
    }
}
