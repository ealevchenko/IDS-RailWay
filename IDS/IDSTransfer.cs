using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IDSLogs;
using IDSLogs.Enum;
using EFIDS.Concrete;
using EFIDS.Entities;

namespace IDS
{
    public enum ids_status : int { Not = 0, InWork = 1, Accepted = 2, Rejected = 3 }

    /// <summary>
    /// Класс описания вагона прибывшего на АМКР
    /// </summary>
    public class ArrCar
    {
        public int num { get; set; }
        public int position { get; set; }
        public DateTime? dt { get; set; }
        public int consignee { get; set; }
    }

    public class IDSTransfer
    {
        private eventID eventID = eventID.IDS_IDSTransfer;
        protected service servece_owner = service.Null;

        public IDSTransfer()
        {

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="servece_owner"></param>
        public IDSTransfer(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }
        /// <summary>
        /// Добавить новый состав находящийся на станциях УЗ Кривого Рога в систему ИДС
        /// </summary>
        /// <param name="id_arrived"></param>
        /// <param name="id_sostav"></param>
        /// <param name="train"></param>
        /// <param name="composition_index"></param>
        /// <param name="date_arrival"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public long InsertArrivalSostav(long? id_arrived, long? id_sostav, int train, string composition_index, DateTime date_arrival, string user)
        {
            try
            {
                EFArrivalSostav ef_sostav = new EFArrivalSostav(new EFDbContext());
                IDSDirectory ids_directory = new IDSDirectory(this.servece_owner);// Подключим библиотеку УЗ
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Проверим это новое прибытие
                ArrivalSostav sostav = ef_sostav.Context.Where(s => s.id_arrived == id_arrived).FirstOrDefault();
                if (sostav == null)
                {
                    // Состава с таким прибытием нет, проверим сотав вносили в ручную?
                    sostav = ef_sostav.Context.Where(s => s.id_arrived == null & s.id_sostav == null & s.train == train & s.composition_index == composition_index).FirstOrDefault();
                    if (sostav == null)
                    {
                        int code_from = int.Parse(composition_index.Substring(9, 4));
                        int id_station_from = ids_directory.GetID_Directory_StationOfCodeCorrect(code_from, true);

                        // Состава с таким прибытием нет и его не вносили в ручную?
                        sostav = new ArrivalSostav()
                        {
                            id = 0,
                            id_arrived = id_arrived,
                            id_sostav = id_sostav,
                            train = train,
                            composition_index = composition_index,
                            date_arrival = date_arrival,
                            status = (int)ids_status.Not,
                            id_station_from = id_station_from > 0 ? (int?)id_station_from : null,
                            create = DateTime.Now,
                            create_user = user,
                        };
                        ef_sostav.Add(sostav);
                        int result = ef_sostav.Save();
                        // Сформируем сообщение и сохраним в логе
                        string mess = String.Format("Создание новой строки состава в БД IDS.Arrival - ВЫПОЛНЕНО. (METRANS.ArrivalSostav.id={0}, Код выполнения:{1}).", sostav.id, result);
                        if (result > 0)
                        {
                            mess.InformationLog(servece_owner, this.eventID);
                        }
                        else
                        {
                            mess.ErrorLog(servece_owner, this.eventID);
                        }
                        return result > 0 ? sostav.id : result; // Вернем новое id или код ошибки
                    }
                }
                else
                {
                    // Состава с таким прибытием есть, проверим сотав на id_sostav
                    if (sostav.id_sostav >= id_sostav)
                    {
                        // Обновление не требуетcя 
                        String.Format("Обновление строки  состава METRANS.ArrivalSostav.id={0} в БД IDS.Arrival - ОТМЕНЕНО. (ID={1} новой строки <= ID={2} строки в базе).", sostav.id, id_sostav, sostav.id_sostav).InformationLog(servece_owner, this.eventID);
                        return 0; // Возвращаем id =0, обновление не надо
                    }
                    else
                    {
                        // Обновим время
                        //sostav.date_arrival = date_arrival; ! время должно быть только прибытия
                        sostav.id_sostav = id_sostav;
                        sostav.change = DateTime.Now;
                        sostav.change_user = user;
                        ef_sostav.Update(sostav);
                        int result = ef_sostav.Save();
                        // Сформируем сообщение и сохраним в логе
                        string mess = String.Format("Обновление строки состава METRANS.ArrivalSostav.id={0} в БД IDS.Arrival - ВЫПОЛНЕНО. (Код выполнения:{1}).", sostav.id, result);
                        if (result > 0)
                        {
                            mess.InformationLog(servece_owner, this.eventID);
                        }
                        else
                        {
                            mess.ErrorLog(servece_owner, this.eventID);
                        }
                    }
                }
                // Требуется обновить информацию о сотаве
                if (sostav.status > 0)
                {
                    // Состав взят в работу, обновление не требуетмя.
                    String.Format("Обновление строки  состава METRANS.ArrivalSostav.id={0} в БД IDS.Arrival - ОТМЕНЕНО. (Строка взята в работу, статус строки:{1}).", sostav.id, ((ids_status)sostav.status).ToString()).InformationLog(servece_owner, this.eventID);
                    return 0; // Возвращаем id=0
                }
                return sostav.id; // Возвращаем id состава для обновления
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("InsertArrivalSostav(id_arrived={0}, id_sostav={1}, train={2}, composition_index={3}, date_arrival={4}, user={5})", id_arrived, id_sostav, train, composition_index, date_arrival, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Добавить новый состав находящийся на станциях УЗ Кривого Рога в систему ИДС
        /// </summary>
        /// <param name="id_arrived"></param>
        /// <param name="id_sostav"></param>
        /// <param name="train"></param>
        /// <param name="composition_index"></param>
        /// <param name="date_arrival"></param>
        /// <returns></returns>
        public long InsertArrivalSostav(long? id_arrived, long? id_sostav, int train, string composition_index, DateTime date_arrival)
        {
            return InsertArrivalSostav(id_arrived, id_sostav, train, composition_index, date_arrival, null);
        }
        /// <summary>
        /// Добавить новые вагоны находящийся в сотаве прибывших на станциях УЗ Кривого Рога в систему ИДС
        /// </summary>
        /// <param name="id_arrival"></param>
        /// <param name="cars"></param>
        /// <returns></returns>
        public int InsertArrivalCars(long id_arrival, List<ArrCar> cars, string user)
        {
            try
            {
                int add = 0;
                int error = 0;
                EFArrivalSostav ef_sostav = new EFArrivalSostav(new EFDbContext());
                EFArrivalCars ef_car = new EFArrivalCars(new EFDbContext());
                IDSDirectory ids_directory = new IDSDirectory(this.servece_owner);// Подключим библиотеку УЗ
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                ArrivalSostav sostav = ef_sostav.Context.Where(s => s.id == id_arrival).FirstOrDefault();
                if (sostav != null && sostav.status == 0)
                {
                    List<ArrivalCars> list = ef_car.Context.Where(c => c.id_arrival == id_arrival).ToList();
                    if (list != null && list.Count() > 0)
                    {
                        // Вагоны в составе есть требуется обновление, удалим старые вагоны
                        foreach (ArrivalCars car in list)
                        {
                            ef_car.Delete(car.id);
                        }
                        int res_del = ef_car.Save();
                        // Сформируем сообщение и сохраним в логе
                        if (res_del > 0)
                        {
                            String.Format("Удаление старых строк вагонов в БД IDS.Arrival - ВЫПОЛНЕНО. (METRANS.ArrivalSostav.id={0}, Удалено:{1} вагонов).", sostav.id, res_del).InformationLog(servece_owner, this.eventID);
                        }
                        else
                        {
                            String.Format("Удаление старых строк вагонов в БД IDS.Arrival - НЕ ВЫПОЛНЕНО. (METRANS.ArrivalSostav.id={0}, Код выполнения:{1} вагонов).", sostav.id, res_del).ErrorLog(servece_owner, this.eventID);
                        }
                    }
                    // добавим новые вагоны
                    foreach (ArrCar car in cars)
                    {
                        string doc_num = null;
                        // Проверим код получателя
                        if (ids_directory.IsConsignee(false, car.consignee))
                        {
                            // Получатель АМКР
                            doc_num = AddUpdateUZ_DOC_To_DB_IDS(car.num, car.dt);
                            //int res_ins_new_car = ids_directory.InsertNewDirectory_Cars(car.num);
                            //if (res_ins_new_car != 0)
                            //{
                            //    String.Format("В справочник 'ВАГОНОВ ИДС' - добавлен новый вагон №{0}, код выполнения : {1}", car.num, res_ins_new_car).WarningLog(servece_owner, this.eventID);
                            //}
                        }
                        // Создадим новый вагон
                        ArrivalCars new_car = new ArrivalCars()
                        {
                            id = 0,
                            id_arrival = id_arrival,
                            num = car.num,
                            position = car.position,
                            position_arrival = null,
                            consignee = car.consignee,
                            num_doc = doc_num,
                            //note = ,
                            //arrival = ,
                            //arrival_user = ,
                            create = DateTime.Now,
                            create_user = user,
                            //change = ,
                            //change_user = ,

                        };
                        ef_car.Add(new_car);
                        int res_ins = ef_car.Save();
                        // Сформируем сообщение и сохраним в логе
                        if (res_ins > 0)
                        {
                            String.Format("Добавление новой строки вагона в БД IDS.Arrival - ВЫПОЛНЕНО. (METRANS.ArrivalSostav.id={0}, вагон:{1}, METRANS.ArrivalCars.id={2}).", sostav.id, new_car.num, new_car.id).InformationLog(servece_owner, this.eventID);
                        }
                        else
                        {
                            String.Format("Добавление новой строки вагона в БД IDS.Arrival - НЕ ВЫПОЛНЕНО. (METRANS.ArrivalSostav.id={0}, вагон:{1}, Код выполнения:{2} вагонов).", sostav.id, new_car.num, res_ins).ErrorLog(servece_owner, this.eventID);
                        }
                        if (res_ins > 0) { add++; } else { error++; }
                    }
                }
                return add;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("InsertArrivalCars(id_arrived={0}, cars={1}, user={2})", id_arrival, cars, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Добавить новые вагоны находящийся в сотаве прибывших на станциях УЗ Кривого Рога в систему ИДС
        /// </summary>
        /// <param name="id_arrival"></param>
        /// <param name="cars"></param>
        /// <returns></returns>
        public int InsertArrivalCars(long id_arrival, List<ArrCar> cars)
        {
            return InsertArrivalCars(id_arrival, cars, null);
        }
        /// <summary>
        /// Получить документ из промежуточной базы данных по номеру вагона добавить или обновить его в базе ИДС и вернуть id документа (УЗ)
        /// </summary>
        /// <param name="num_car"></param>
        /// <returns></returns>
        public string AddUpdateUZ_DOC_To_DB_IDS(int num_car, DateTime? dt_arrival)
        {
            try
            {
                UZ.UZ_DOC uz_doc = GetUZ_DOC_DB_UZ_OfNum(num_car, dt_arrival);
                if (uz_doc != null)
                {
                    return AddUpdateUZ_DOC_To_DB_IDS(uz_doc);
                }
                return null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("AddUpdateUZ_DOC_To_DB_IDS(num_car={0})", num_car), servece_owner, eventID);
                return null;// Ошибка
            }
        }
        /// <summary>
        /// Получить документ из промежуточной базы данных по номеру вагона добавить или обновить его в базе ИДС и вернуть id документа (УЗ)
        /// </summary>
        /// <param name="num_car"></param>
        /// <returns></returns>
        public string AddUpdateUZ_DOC_To_DB_IDS(int num_car, UZ.uz_status restriction_status, DateTime? dt_arrival)
        {
            try
            {
                UZ.UZ_DOC uz_doc = GetUZ_DOC_DB_UZ_OfNum(num_car, dt_arrival);
                if (uz_doc != null && uz_doc.status <= restriction_status)
                {
                    return AddUpdateUZ_DOC_To_DB_IDS(uz_doc);
                }
                return null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("AddUpdateUZ_DOC_To_DB_IDS(num_car={0})", num_car), servece_owner, eventID);
                return null;// Ошибка
            }
        }

        /// <summary>
        /// Получить документ из промежуточной базы данных по номеру вагона.
        /// </summary>
        /// <param name="num_car"></param>
        /// <returns></returns>
        public UZ.UZ_DOC GetUZ_DOC_DB_UZ_OfNum(int num_car, DateTime? dt_arrival)
        {
            try
            {
                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);
                UZ.UZ_DOC uz_doc = uz_sms.GetDocumentOfDB_NumConsigneesStations(num_car, new int[] { 7932, 6302, 659 }, new int[] { 457905, 466904, 466923, 467004, 467108, 467201 }, dt_arrival);
                return uz_doc;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetUZ_DOC_DB_UZ_OfNum(num_car={0})", num_car), servece_owner, eventID);
                return null;// Ошибка
            }
        }

        /// <summary>
        /// Добавим или обновим документ в таблице ЭПД принятых вагонов
        /// </summary>
        /// <param name="uz_doc"></param>
        /// <returns></returns>
        public string AddUpdateUZ_DOC_To_DB_IDS(UZ.UZ_DOC uz_doc)
        {
            try
            {
                EFUZ_DOC ef_uzdoc = new EFUZ_DOC(new EFDbContext());

                if (uz_doc != null)
                {
                    int result = 0;
                    UZ_DOC doc = ef_uzdoc.Get(uz_doc.id_doc);
                    if (doc == null)
                    {

                        string code_from = uz_doc.sender_code != null ? uz_doc.sender_code : "0";

                        doc = new UZ_DOC()
                        {
                            num_doc = uz_doc.id_doc,
                            revision = uz_doc.revision,
                            num_uz = uz_doc.otpr != null ? uz_doc.otpr.nom_doc : null,
                            status = (int)uz_doc.status,
                            code_from = code_from,
                            code_on = uz_doc.recipient_code,
                            dt = uz_doc.dt,
                            xml_doc = uz_doc.xml,
                        };
                        ef_uzdoc.Add(doc);
                        result = ef_uzdoc.Save();
                        // Сформируем сообщение и сохраним в логе
                        if (result > 0)
                        {
                            String.Format("Добавление перевозочного документа в БД IDS.Arrival - ВЫПОЛНЕНО. (IDS.UZ_DOC.num_doc={0}).", doc.num_doc).InformationLog(servece_owner, this.eventID);
                        }
                        else
                        {
                            String.Format("Добавление перевозочного документа в БД IDS.Arrival - НЕ ВЫПОЛНЕНО. (Номер документа={0}, Код выполнения:{1}).", uz_doc.id_doc, result).ErrorLog(servece_owner, this.eventID);
                        }
                    }
                    else
                    {
                        // Ревизия документа выше чем ревизия сохраненного документа
                        if (doc.revision <= uz_doc.revision)
                        {
                            doc.num_doc = uz_doc.id_doc;
                            doc.revision = uz_doc.revision;
                            doc.num_uz = uz_doc.otpr != null ? uz_doc.otpr.nom_doc : null;
                            doc.status = (int)uz_doc.status;
                            doc.code_from = uz_doc.sender_code;
                            doc.code_on = uz_doc.recipient_code;
                            doc.dt = uz_doc.dt;
                            doc.xml_doc = uz_doc.xml;
                            ef_uzdoc.Update(doc);
                            result = ef_uzdoc.Save();
                            // Сформируем сообщение и сохраним в логе
                            if (result > 0)
                            {
                                String.Format("Обновление перевозочного документа в БД IDS.Arrival - ВЫПОЛНЕНО. (IDS.UZ_DOC.num_doc={0}).", doc.num_doc).InformationLog(servece_owner, this.eventID);
                            }
                            else
                            {
                                String.Format("Обновление перевозочного документа в БД IDS.Arrival - НЕ ВЫПОЛНЕНО. (IDS.UZ_DOC.num_doc={0}, Код выполнения:{1}).", uz_doc.id_doc, result).ErrorLog(servece_owner, this.eventID);
                            }
                        }
                        else return doc.num_doc;
                    }

                    return result > 0 ? doc.num_doc : null;
                }
                return null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("AddUpdateUZ_DOC_To_DB_IDS(uz_doc={0})", uz_doc), servece_owner, eventID);
                return null;// Ошибка
            }
        }



    }
}
