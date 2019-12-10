using EFMT.Concrete;
using EFMT.Entities;
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
using UZ;

namespace MT
{
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

    public class MTTransfer
    {
        private eventID eventID = eventID.MT_MTTransfer;
        protected service servece_owner = service.Null;

        EFApproachesCars ef_app_cars = new EFApproachesCars(new EFDbContext());
        EFApproachesSostav ef_app_sostav = new EFApproachesSostav(new EFDbContext());
        //UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ

        private string fromPath;
        public string FromPath { get { return this.fromPath; } set { this.fromPath = value; } }
        private bool delete_file = false;
        public bool DeleteFile { get { return this.delete_file; } set { this.delete_file = value; } }

        private int day_range_approaches_cars = 30; // тайм аут по времени для вагонов на подходе
        public int DayRangeApproachesCars { get { return this.day_range_approaches_cars; } set { this.day_range_approaches_cars = value; } }

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
                //EFApproachesCars ef_app_cars = new EFApproachesCars(new EFDbContext());
                ApproachesCars old_car = ef_app_cars.Get().Where(c => c.num == car.num).OrderByDescending(c => c.id).FirstOrDefault();
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
                //ef_app_cars.SaveApproachesCars(old_car); // сохранить изменение
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
                DateTime start = DateTime.Now;
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
                                DateTime start0 = DateTime.Now;                                
                                code_cargo = uz_directory.GetCodeCorrectCargo(int.Parse(array[3]));
                                DateTime stop0 = DateTime.Now;
                                servece_owner.ServicesToLog(eventID, "Метод code_cargo", start0, stop0, code_cargo);
                            }
                            if (!String.IsNullOrWhiteSpace(array[4]))
                            {


                                int codefrom = int.Parse(array[4].Substring(0, 4));
                                int codeon = int.Parse(array[4].Substring(9, 4));
                                DateTime start1 = DateTime.Now;
                                code_station_from = uz_directory.GetCodeCorrectStations(codefrom, false);
                                DateTime stop1 = DateTime.Now;
                                servece_owner.ServicesToLog(eventID, "Метод code_station_from", start1, stop1, code_station_from);
                                DateTime start2 = DateTime.Now;
                                code_station_on = uz_directory.GetCodeCorrectStations(codeon, false);
                                DateTime stop2 = DateTime.Now;
                                servece_owner.ServicesToLog(eventID, "Метод code_station_on", start2, stop2, code_station_on);

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
                                //num_doc_arrived = null,
                                //arrived = null,
                                //user_name = null, 
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
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, "Метод TransferTXTToListApproachesCars", start, stop, list.Count());
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
            //EFApproachesCars ef_app_cars = new EFApproachesCars(new EFDbContext());
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

                //EFApproachesCars ef_app_cars = new EFApproachesCars(new EFDbContext());
                //EFApproachesSostav ef_app_sostav = new EFApproachesSostav(new EFDbContext());

                // Пройдемся по списку
                foreach (var fs in listFileSostavs)
                {
                    try
                    {
                        Console.WriteLine("Переносим файл {0}", fs.File);
                        // защита от записи повторов
                        FileInfo fi = new FileInfo(fs.File);
                        ApproachesSostav exs_sostav = ef_app_sostav.Get().Where(s => s.file_name == fi.Name).FirstOrDefault();
                        if (exs_sostav == null)
                        {
                            long? ParentIDSostav = null;
                            // получить не закрытый состав
                            ApproachesSostav no_close_sostav = ef_app_sostav.Get().Where(s => s.composition_index == fs.Index & s.close == null & s.approaches == null & s.date_time <= fs.Date).OrderByDescending(s => s.date_time).FirstOrDefault();
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
                            if (delete_file & SaveApproachesWagons(new_id, fs.File, ref  countCopy, ref  countError))
                            {
                                File.Delete(fs.File);
                                countDelete++;
                            }
                        }
                        else
                        {
                            // Проверка сравниваем количество если совподает удаляем файл, иначе добавляем новые вагоны и удаляем файл
                            List<ApproachesCars> list = TransferTXTToListApproachesCars(fs.File, exs_sostav.id);
                            List<ApproachesCars> listdb = ef_app_cars.Get().Where(c => c.id_sostav == exs_sostav.id).ToList();
                            if (list != null && listdb != null)
                            {
                                if (list.Count() != listdb.Count())
                                {
                                    // Количество не совпадает удаляем старые вагоны добавляем новые
                                    SqlParameter id_sostav = new SqlParameter("@IDSostav", exs_sostav.id);
                                    ef_app_cars.Database.ExecuteSqlCommand("DELETE FROM METRANS.ApproachesCars WHERE id_sostav = @IDSostav", id_sostav);
                                    if (delete_file & SaveApproachesWagons(exs_sostav.id, fs.File, ref  countCopy, ref  countError))
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
    }
}
