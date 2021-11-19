using EFIDS.Concrete;
using EFIDS.Entities;
using IDSLogs;
using IDSLogs.Enum;
using IDS.Helper;
using KIS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

    public class IDSTransfer : IDS_Base
    {
        private eventID eventID = eventID.IDS_IDSTransfer;
        //protected service servece_owner = service.Null;

        private int transfer_control_time_interval_kis = 12; // Интервал часов контроля до и после текущего времени при переное данных из КИС
        public int TransferControlTimeIntervalKIS { get { return this.transfer_control_time_interval_kis; } set { this.transfer_control_time_interval_kis = value; } }
        private bool transfer_set_outgoing_wagon_of_kis = true; // Признак здавать вагоны на УЗ по данным КИС
        public bool TransferSetOutgoingWagonOfKis { get { return this.transfer_set_outgoing_wagon_of_kis; } set { this.transfer_set_outgoing_wagon_of_kis = value; } }

        public IDSTransfer()
            : base()
        {

        }

        public IDSTransfer(service servece_owner)
            : base(servece_owner)
        {

        }

        #region ArrivalSostav
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
        #endregion

        #region ArrivalCars
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


        #endregion

        #region UZ_DOC
        /// <summary>
        /// Получить последнюю дату записи в промежуточную базу
        /// </summary>
        /// <returns></returns>
        public DateTime? GetLastDT_UZ_DOC_DB()
        {
            try
            {
                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);
                DateTime? last_data = uz_sms.GetLastDT_UZ_DOC();
                return last_data;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetLastDT_UZ_DOC_DB()"), servece_owner, eventID);
                return null;// Ошибка
            }
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
                UZ.UZ_DOC uz_doc = uz_sms.GetDocumentOfDB_NumConsigneesStations(num_car, new int[] { 7932, 6302, 659 }, new int[] { 457905, 466904, 466923, 467004, 467108, 467201, 466603, 457708 }, dt_arrival);
                return uz_doc;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetUZ_DOC_DB_UZ_OfNum(num_car={0})", num_car), servece_owner, eventID);
                return null;// Ошибка
            }
        }
        /// <summary>
        /// Получить документы из промежуточной базы данных по номеру вагона за указаный период
        /// </summary>
        /// <param name="num_car"></param>
        /// <param name="day"></param>
        /// <returns></returns>
        public List<UZ.UZ_DOC> GetUZ_DOC_DB_UZ_OfNum(int num_car, int day)
        {
            try
            {
                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);
                List<UZ.UZ_DOC> list = uz_sms.GetDocumentOfDB_NumConsignees(num_car, new int[] { 7932, 6302, 659 }, day);
                return list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetUZ_DOC_DB_UZ_OfNum(num_car={0}, day={1})", num_car, day), servece_owner, eventID);
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
                            close = null, 
                            close_message = null
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
                            string code_from = uz_doc.sender_code != null ? uz_doc.sender_code : "0";

                            doc.num_doc = uz_doc.id_doc;
                            doc.revision = uz_doc.revision;
                            doc.num_uz = uz_doc.otpr != null ? uz_doc.otpr.nom_doc : null;
                            doc.status = (int)uz_doc.status;
                            doc.code_from = code_from;
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
        #endregion

        #region UZ_DOC_OUT

        /// <summary>
        /// Добавить новый ЭПД по отправлению , найденый по номеру документа начиная с указаной даты (список грузоотправителей { 7932 })
        /// </summary>
        /// <param name="num"></param>
        /// <param name="start_date"></param>
        /// <returns></returns>
        public string AddUZ_DOC_OUT_To_DB_IDS(int num, DateTime? start_date)
        {
            try
            {
                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);
                UZ.UZ_DOC uz_doc = uz_sms.GetDocumentOfDB_NumShipper(num, new int[] { 7932 }, start_date);
                if (uz_doc != null)
                {
                    return AddUpdateUZ_DOC_OUT_To_DB_IDS(uz_doc);

                }
                return null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("AddUZ_DOC_OUT_To_DB_IDS(num={0}, start_date={1})", num, start_date), servece_owner, eventID);
                return null;// Ошибка
            }
        }
        /// <summary>
        /// обновить ЭПД по отправлению по id_doc
        /// </summary>
        /// <param name="num_doc"></param>
        /// <returns></returns>
        public string UpdateUZ_DOC_OUT_To_DB_IDS(string num_doc)
        {
            try
            {
                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);
                UZ.UZ_DOC uz_doc = uz_sms.GetDocumentOfDB_NumDoc(num_doc);
                if (uz_doc != null)
                {
                    return AddUpdateUZ_DOC_OUT_To_DB_IDS(uz_doc);

                }
                return null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateUZ_DOC_OUT_To_DB_IDS(num_doc={0})", num_doc), servece_owner, eventID);
                return null;// Ошибка
            }
        }

        /// <summary>
        /// Добавить или обновить ЭПД по отправлению
        /// </summary>
        /// <param name="uz_doc"></param>
        /// <returns></returns>
        public string AddUpdateUZ_DOC_OUT_To_DB_IDS(UZ.UZ_DOC uz_doc)
        {
            try
            {
                EFUZ_DOC_OUT ef_uzdoc = new EFUZ_DOC_OUT(new EFDbContext());

                if (uz_doc != null)
                {
                    int result = 0;
                    UZ_DOC_OUT doc = ef_uzdoc.Get(uz_doc.id_doc);
                    if (doc == null)
                    {

                        string code_from = uz_doc.sender_code != null ? uz_doc.sender_code : "0";

                        doc = new UZ_DOC_OUT()
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
                            String.Format("Добавление перевозочного документа в БД IDS.Outgoing - ВЫПОЛНЕНО. (IDS.UZ_DOC.num_doc={0}).", doc.num_doc).InformationLog(servece_owner, this.eventID);
                        }
                        else
                        {
                            String.Format("Добавление перевозочного документа в БД IDS.Outgoing - НЕ ВЫПОЛНЕНО. (Номер документа={0}, Код выполнения:{1}).", uz_doc.id_doc, result).ErrorLog(servece_owner, this.eventID);
                        }
                    }
                    else
                    {
                        // Ревизия документа выше чем ревизия сохраненного документа
                        if (doc.revision < uz_doc.revision)
                        {
                            string code_from = uz_doc.sender_code != null ? uz_doc.sender_code : "0";

                            doc.num_doc = uz_doc.id_doc;
                            doc.revision = uz_doc.revision;
                            doc.num_uz = uz_doc.otpr != null ? uz_doc.otpr.nom_doc : null;
                            doc.status = (int)uz_doc.status;
                            doc.code_from = code_from;
                            doc.code_on = uz_doc.recipient_code;
                            doc.dt = uz_doc.dt;
                            doc.xml_doc = uz_doc.xml;
                            ef_uzdoc.Update(doc);
                            result = ef_uzdoc.Save();
                            // Сформируем сообщение и сохраним в логе
                            if (result > 0)
                            {
                                String.Format("Обновление перевозочного документа в БД IDS.Outgoing - ВЫПОЛНЕНО. (IDS.UZ_DOC.num_doc={0}).", doc.num_doc).InformationLog(servece_owner, this.eventID);
                            }
                            else
                            {
                                String.Format("Обновление перевозочного документа в БД IDS.Outgoing - НЕ ВЫПОЛНЕНО. (IDS.UZ_DOC.num_doc={0}, Код выполнения:{1}).", uz_doc.id_doc, result).ErrorLog(servece_owner, this.eventID);
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
                e.ExceptionMethodLog(String.Format("AddUpdateUZ_DOC_OUT_To_DB_IDS(uz_doc={0})", uz_doc), servece_owner, eventID);
                return null;// Ошибка
            }
        }
        #endregion

        #region OutgoingSostav

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //public int GetIDStationIDSOfIDKis(int? id)
        //{
        //    switch (id)
        //    {
        //        case 1: return 6;
        //        case 29: return 16;
        //        case 18: return 27;
        //        case 23: return 19;
        //        case 28: return 14;
        //        case 30: return 15;
        //        case 31: return 3;
        //        case 36: return 18;
        //        case 39: return 29;
        //        default: return 0;
        //    }
        //}
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //public int GetIDWayIDSOfIDKis(int? id)
        //{
        //    switch (id)
        //    {
        //        case 1: return 114;
        //        case 18: return 778;
        //        case 23: return 475;
        //        default: return 114;
        //    }
        //}

        /// <summary>
        /// Создать состав для отправки
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station_from"></param>
        /// <param name="id_way_from"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OutgoingSostav CreateOutgoingSostav(ref EFDbContext context, int id_station_from, int id_way_from, DateTime lead_time, string user)
        {
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                DateTime start_date = new DateTime(DateTime.Now.Year, 1, 1, 0, 0, 0);
                OutgoingSostav sostav = context.OutgoingSostav.Where(s => s.id_station_from == id_station_from && s.date_readiness_amkr >= start_date).OrderByDescending(c => c.num_doc).FirstOrDefault();
                int num_doc = sostav != null ? sostav.num_doc + 1 : 1;

                OutgoingSostav new_out_sostav = context.OutgoingSostav.Where(s => s.id_station_from == id_station_from && s.id_way_from == id_way_from && s.date_readiness_amkr == lead_time && s.id_station_on == null).OrderByDescending(c => c.num_doc).FirstOrDefault();

                if (new_out_sostav == null)
                {
                    // Создадим запись состав для отправки OutgoingSostav
                    new_out_sostav = new OutgoingSostav()
                    {
                        id = 0,
                        num_doc = num_doc,
                        id_station_from = id_station_from,
                        id_way_from = id_way_from,
                        id_station_on = null,
                        date_readiness_amkr = lead_time,
                        date_end_inspection_acceptance_delivery = null,
                        date_end_inspection_loader = null,
                        date_end_inspection_vagonnik = null,
                        date_show_wagons = null,
                        date_readiness_uz = null,
                        date_outgoing = null,
                        date_outgoing_act = null,
                        date_departure_amkr = null,
                        composition_index = null,
                        status = 0,
                        note = null,
                        create = DateTime.Now,
                        create_user = user,
                    };
                }

                return new_out_sostav;
            }
            catch (Exception e)
            {
                //e.ExceptionMethodLog(String.Format("InsertOutgoingSostav(id_way={0}, list_provide={1}, lead_time={2}, user={3})",
                //    id_way, list_provide, lead_time, user), servece_owner, eventID);
                return null;
            }
        }

        public OutgoingCars CreateOutgoingCars(ref EFDbContext context, int num, int position, string user)
        {
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                OutgoingCars car = new OutgoingCars()
                {
                    id = 0,
                    //id_outgoing = 0,
                    num = num,
                    position = position,
                    position_outgoing = null,
                    num_doc = null,
                    note = null,
                    date_outgoing_act = null,
                    outgoing = null,
                    outgoing_user = null,
                    create = DateTime.Now,
                    create_user = user,
                    id_outgoing_uz_vagon = null,
                    id_outgoing_detention = null,
                    id_reason_discrepancy_amkr = null,
                    id_reason_discrepancy_uz = null,
                    id_outgoing_return_start = null,
                    id_outgoing_return_stop = null,
                    parent_wir_id = null,
                };
                return car;
            }
            catch (Exception e)
            {
                //e.ExceptionMethodLog(String.Format("InsertOutgoingSostav(id_way={0}, list_provide={1}, lead_time={2}, user={3})",
                //    id_way, list_provide, lead_time, user), servece_owner, eventID);
                return null;
            }
        }

        public int InsertOutgoingCars(ref EFDbContext context, OutgoingSostav out_sostav, int id_way, int position, WagonInternalRoutes wagon, DateTime lead_time, string user)
        {
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                if (wagon == null) return (int)errors_base.not_wir_db;
                // Определим станцию и путь приема
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way).FirstOrDefault();
                if (way == null) return (int)errors_base.not_dir_way_of_db;                        // Нет пути
                if (way.crossing_uz != true) return (int)errors_base.way_not_crossing_uz;       // Путь без выхода на уз


                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_wim_db;
                // Определим станцию на которой стоит вагон
                Directory_Ways way_wagon = context.Directory_Ways.Where(w => w.id == wim.id_way).FirstOrDefault();
                if (way_wagon == null) return (int)errors_base.not_dir_way_of_db;                        // Нет пути
                if (way_wagon.crossing_uz != true) return (int)errors_base.way_not_crossing_uz;       // Путь без выхода на уз

                WagonInternalOperation wio = wagon.GetLastOperation();
                if (wio == null) return (int)errors_base.not_wio_db;
                if (wio.id_operation == 9) return (int)errors_base.look_operation;                      // Операция над вагонами заблокирована (Вагон предъявлен на УЗ)

                // Проверка пройдена -------------
                // Создать вагон
                OutgoingCars out_car = CreateOutgoingCars(ref context, wagon.num, position, user);
                // Добавим в состав
                out_sostav.OutgoingCars.Add(out_car);
                string note = null;
                // Добавим сылку на выходной вагон
                wagon.OutgoingCars = out_car;
                // Откроем операцию предявить на уз 
                wagon.SetOpenOperation(9, lead_time, null, null, null, null, note, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("InsertOutgoingCars(context={0}, id_way={1}, position={2}, wagon={3}, lead_time={4}, user={5})",
                    context, id_way, position, wagon, lead_time, user), servece_owner, eventID);
                return (int)errors_base.global;
            }
        }
        /// <summary>
        /// Создать состав и перенести вагоны в окно для здачи на УЗ
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station_from"></param>
        /// <param name="id_way_from"></param>
        /// <param name="position"></param>
        /// <param name="lead_time"></param>
        /// <param name="list"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer InsertOutgoingSostav(ref EFDbContext context, int id_station_from, int id_way_from, int position, DateTime lead_time, List<long> list, string user)
        {
            ResultTransfer res = new ResultTransfer(list.Count());
            try
            {
                EFOutgoingSostav ef_out_sos = new EFOutgoingSostav(context);

                OutgoingSostav new_sostav = CreateOutgoingSostav(ref context, id_station_from, id_way_from, lead_time, user);

                //int position = 0;
                foreach (long id_wir in list.ToList())
                {
                    position++;
                    WagonInternalRoutes wir = context.WagonInternalRoutes.Where(r => r.id == id_wir).FirstOrDefault();
                    int result = 0;
                    if (wir != null)
                    {
                        if (wir.id_outgoing_car == null)
                        {
                            result = InsertOutgoingCars(ref context, new_sostav, id_way_from, position, wir, lead_time, user); // Получим результат выполнения операции
                        }
                        else
                        {
                            result = (int)errors_base.outgoing_cars_wir; // Записи по WagonInternalRoutes - уже имеет ссылку на отправку
                        }
                    }
                    else
                    {
                        result = (int)errors_base.not_wir_db; // В базе данных нет записи по WagonInternalRoutes (Внутренее перемещение вагонов)
                    }
                    // Сохраним рзультат выполнения
                    res.SetMovedResult(result, wir.num);
                }
                ef_out_sos.AddOrUpdate(new_sostav);
                // Если нет ошибок, сохраним изменения в базе
                if (res.error == 0)
                {
                    res.SetResult(context.SaveChanges());
                }
                else
                {
                    res.SetResult((int)errors_base.cancel_save_changes);
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("InsertOutgoingSostav(context={0}, id_station_from={1}, id_way_from={2}, position={3}, lead_time={4}, list={5}, user={6})",
                    context, id_station_from, id_way_from, position, lead_time, list, user), servece_owner, eventID);
                res.SetResult((int)errors_base.global); // Глобальная ошибка
            }
            return res;
        }

        /// <summary>
        /// Перенос составов на отправление УЗ по данным КИС
        /// </summary>
        /// <returns></returns>
        //public int InsertOutgoingSostavOfKis()
        //{
        //    try
        //    {

        //        string user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        EFOutgoingSostav ef_sostav = new EFOutgoingSostav(new EFDbContext());
        //        EFOutgoingCars ef_car = new EFOutgoingCars(new EFDbContext());
        //        KISWagon kis_wagon = new KISWagon(this.servece_owner);

        //        int add_sostav = 0;
        //        int skip_sostav = 0;
        //        int err_sostav = 0;

        //        // Определим время начало и конца выборки для переноса
        //        DateTime td_start = DateTime.Now.AddHours(-1 * this.transfer_control_time_interval_kis);
        //        DateTime td_stop = DateTime.Now;
        //        // Определим последнюю запись в ИДС и уточним начало выборки
        //        OutgoingSostav outgoing = ef_sostav.Context.OrderByDescending(s => s.date_readiness_amkr).FirstOrDefault();
        //        if (outgoing != null && outgoing.date_readiness_amkr != null)
        //        {
        //            td_start = ((DateTime)outgoing.date_readiness_amkr).AddHours(-1 * this.transfer_control_time_interval_kis);

        //        }
        //        // Получим вагоны из КИС
        //        List<PROM_SOSTAV> out_sostav = kis_wagon.GetOutSostavOfKis(td_start, td_stop);
        //        // Получим вагоны которые уже перенесеры
        //        List<OutgoingSostav> list_ids_sostav = ef_sostav.Context.OrderByDescending(s => s.date_readiness_amkr >= td_start & s.date_readiness_amkr <= td_stop).ToList();
        //        // Перенесем в ИДС
        //        foreach (PROM_SOSTAV sostav in out_sostav)
        //        {
        //            if (sostav.D_DD != null && sostav.D_MM != null && sostav.D_YY != null && sostav.T_HH != null && sostav.T_MI != null)
        //            {
        //                List<PROM_NATHIST> list_car_nh = kis_wagon.GetOutProm_NatHistOfNaturDateTime(sostav.N_NATUR, (int)sostav.D_DD, (int)sostav.D_MM, (int)sostav.D_YY, (int)sostav.T_HH, (int)sostav.T_MI, false);
        //                int res;
        //                //DateTime date_outgoing = sostav.DT;
        //                // Дата и время заолнены можно получить перечень вагонов
        //                // Определим состав с такой натуркой есть ?
        //                OutgoingSostav ids_sostav = list_ids_sostav.Where(s => s.num_doc == sostav.N_NATUR).FirstOrDefault();
        //                List<OutgoingCars> list_cars = new List<OutgoingCars>();
        //                // Проверим состав в ИДС есть
        //                // Если нет добавим и добавим вагоны
        //                // Если есть проверим на кол вагонов, если =0, тогда добавим вагоны
        //                if ((ids_sostav == null && (list_car_nh != null && list_car_nh.Count() > 0)) || (ids_sostav != null && ids_sostav.OutgoingCars.Count() == 0) && (list_car_nh != null && list_car_nh.Count() > 0))
        //                {
        //                    if (ids_sostav == null)
        //                    {
        //                        // состава нет добавим
        //                        ids_sostav = new OutgoingSostav()
        //                        {
        //                            id = 0,
        //                            num_doc = sostav.N_NATUR,
        //                            id_station_from = GetIDStationIDSOfIDKis(sostav.K_ST),
        //                            id_way_from = GetIDWayIDSOfIDKis(sostav.K_ST),
        //                            id_station_on = sostav.K_ST_PR != null ? (int?)GetIDStationIDSOfIDKis(sostav.K_ST_PR) : null,
        //                            date_readiness_amkr = sostav.DT_PR,
        //                            date_show_wagons = null,
        //                            date_readiness_uz = this.transfer_set_outgoing_wagon_of_kis == true ? (DateTime?)sostav.DT : null,
        //                            date_outgoing = this.transfer_set_outgoing_wagon_of_kis == true ? (DateTime?)sostav.DT : null,
        //                            date_departure_amkr = this.transfer_set_outgoing_wagon_of_kis == true ? (DateTime?)sostav.DT : null,
        //                            date_outgoing_act = null,
        //                            composition_index = null,
        //                            status = this.transfer_set_outgoing_wagon_of_kis == true ? 2 : 0,
        //                            note = "Перенесен по данным КИС" + (this.transfer_set_outgoing_wagon_of_kis == true ? "(и сдан на УЗ автоматически)" : ""),
        //                            create = sostav.DAT_VVOD != null ? (DateTime)sostav.DAT_VVOD : DateTime.Now,
        //                            create_user = user, 
        //                        };
        //                        ef_sostav.Add(ids_sostav);
        //                        res = ef_sostav.Save();
        //                    }
        //                    else
        //                    {
        //                        res = 1; // Состав добавлен ранее
        //                    }
        //                    if (res > 0)
        //                    {
        //                        try
        //                        {
        //                            // Теперь добавим вагоны
        //                            //List<PROM_NATHIST> list_car = kis_wagon.GetOutProm_NatHistOfNaturDateTime(sostav.N_NATUR, (int)sostav.D_DD, (int)sostav.D_MM, (int)sostav.D_YY, (int)sostav.T_HH, (int)sostav.T_MI, false);
        //                            if (list_car_nh != null && list_car_nh.Count() > 0)
        //                            {
        //                                foreach (PROM_NATHIST pnh in list_car_nh)
        //                                {
        //                                    OutgoingCars car = new OutgoingCars()
        //                                    {
        //                                        id = 0,
        //                                        id_outgoing = ids_sostav.id,
        //                                        num = pnh.N_VAG,
        //                                        position = pnh.NPP != null ? (int)pnh.NPP : 0,
        //                                        position_outgoing = this.transfer_set_outgoing_wagon_of_kis == true ? (pnh.NPP != null ? (int)pnh.NPP : 0) : 0,
        //                                        UZ_DOC_OUT = null,
        //                                        note = "Перенесен по данным КИС" + (this.transfer_set_outgoing_wagon_of_kis == true ? "(и сдан на УЗ автоматически)" : ""),
        //                                        date_outgoing_act = null,
        //                                        outgoing = this.transfer_set_outgoing_wagon_of_kis == true ? (DateTime?)sostav.DT : null,
        //                                        outgoing_user = this.transfer_set_outgoing_wagon_of_kis == true ? user : null,
        //                                        create = sostav.DAT_VVOD != null ? (DateTime)sostav.DAT_VVOD : DateTime.Now,
        //                                        create_user = user,
        //                                        id_outgoing_uz_vagon = null,
        //                                        id_outgoing_detention = null,
        //                                        id_reason_discrepancy_amkr = null,
        //                                        id_reason_discrepancy_uz = null,
        //                                        id_outgoing_return_start = null,
        //                                        id_outgoing_return_stop = null,
        //                                        parent_wir_id = null,
        //                                    };
        //                                    list_cars.Add(car);
        //                                }
        //                                ef_car.Add(list_cars);
        //                                int res_car = ef_car.Save();
        //                                if (res_car >= 0)
        //                                {
        //                                    add_sostav++;
        //                                    // Поставить вагоны та путь
        //                                    int result_set = SetStationOutgoingWagonsOfKIS(ids_sostav.id, user);
        //                                    // Проверим вагоны перенесены на станцию отправки и бит закрывать автоматом = true, тогда закроем
        //                                    if (result_set > 0 && this.transfer_set_outgoing_wagon_of_kis == true)
        //                                    {
        //                                        int result_sending = SendingOutgoingSostav(ids_sostav.id, user);
        //                                    }

        //                                }
        //                            }
        //                            else
        //                            {
        //                                String.Format("Метод InsertOutgoingSostavOfKis(), ошибка добавления вагонов состава id={0}, По натурке №{1} за {2} - отсутсвует информация о вагонах!", ids_sostav.id, sostav.N_NATUR, sostav.DT).ErrorLog(servece_owner, this.eventID);
        //                                // Счетчик ошибок
        //                                err_sostav++;
        //                            }
        //                        }
        //                        catch (Exception e)
        //                        {
        //                            String.Format("Метод InsertOutgoingSostavOfKis(), ошибка добавления вагонов состава id={0}, Натурка:{1}, Дата={2}", ids_sostav.id, sostav.N_NATUR, sostav.DT).ErrorLog(servece_owner, this.eventID);
        //                            // Счетчик ошибок
        //                            err_sostav++;
        //                        }
        //                    }
        //                    else
        //                    {
        //                        // Счетчик ошибок
        //                        err_sostav++;
        //                        String.Format("Метод InsertOutgoingSostavOfKis(), ошибка переноса состава в ИДС Натурка:{0}, Дата={1}, Код ошибки={2}", sostav.N_NATUR, sostav.DT, res).ErrorLog(servece_owner, this.eventID);
        //                    }
        //                }
        //                else
        //                {
        //                    // Счетчик пропущеных
        //                    skip_sostav++;
        //                }
        //            }
        //            else
        //            {
        //                // Дата и время не заполнены не могу получить вагоны
        //                err_sostav++;
        //                String.Format("Метод InsertOutgoingSostavOfKis(), ошибка определения даты и времени Натурка:{0}, D_DD={1},D_MM={2},D_YY={3},T_HH={4},T_MI={5}",
        //                  sostav.N_NATUR, sostav.D_DD, sostav.D_MM, sostav.D_YY, sostav.T_HH, sostav.T_MI).ErrorLog(servece_owner, this.eventID);
        //            }
        //        }
        //        String.Format("Перенос составов из системы КИС «Транспорт», определено для переноса: {0} составов, перенесено: {1} , пропущено: {2} , ошибок переноса:{3}.",
        //            out_sostav.Count(), add_sostav, skip_sostav, err_sostav).InformationLog(servece_owner, this.eventID);
        //        return add_sostav;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("InsertOutgoingSostavOfKis()"), servece_owner, eventID);
        //        return -1;// Возвращаем id=-1 , Ошибка
        //    }
        //}

        #endregion

        #region IncomingArrivalSostav
        /// <summary>
        /// Принять состав на станцию АМКР примыкающую с УЗ 
        /// </summary>
        /// <param name="id_arrival"></param>
        /// <returns></returns>
        public int IncomingArrivalSostav(long id_arrival, List<int> nums, string user)
        {
            try
            {
                DateTime start = DateTime.Now;

                ResultTransfer res = new ResultTransfer(0);

                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFArrivalSostav ef_sostav = new EFArrivalSostav(new EFDbContext());
                EFArrivalCars ef_car = new EFArrivalCars(new EFDbContext());

                ArrivalSostav sostav = ef_sostav.Context.Where(s => s.id == id_arrival).FirstOrDefault();

                if (sostav != null && sostav.date_adoption != null && (sostav.ArrivalCars != null && sostav.ArrivalCars.Count() > 0))
                {
                    List<ArrivalCars> list_wagon = sostav.ArrivalCars.Where(c => c.position_arrival != null).ToList();
                    List<ArrivalCars> list_wagon_inc = new List<ArrivalCars>();
                    // Проверим на выбранные номера
                    if (nums != null && nums.Count() > 0)
                    {
                        foreach (ArrivalCars car in list_wagon.ToList())
                        {
                            // Выберем только нужные
                            int num = nums.Find(n => n == car.num);
                            if (num > 0)
                            {
                                list_wagon_inc.Add(car);
                            }
                        }
                    }
                    else
                    {
                        // Оставим как есть
                        list_wagon_inc = list_wagon;
                    }
                    if (list_wagon_inc != null && list_wagon_inc.Count() > 0)
                    {
                        // Переносим 
                        // Состав определен, принятые вагоны определены
                        int id_station = (int)sostav.id_station_on;
                        int id_way = (int)sostav.id_way;
                        DateTime date_arrival = sostav.date_arrival;

                        EFDbContext curent = new EFDbContext();
                        //EFDbContext curent = null;
                        IDS_WIR wir = new IDS_WIR(this.servece_owner);
                        res = wir.IncomingWagons(ref curent, id_station, id_way, date_arrival, list_wagon_inc, (bool)sostav.numeration, user);

                    }
                    else
                    {
                        res.SetResult((int)errors_base.not_arrival_cars_db);
                    }
                }
                else
                {
                    res.SetResult((int)errors_base.not_arrival_sostav_db);
                }

                string mess = String.Format("Операция переноса прибывшего с УЗ состава на станцию АМКР. Код выполнения = {0}. Состав [id = {1}, Индекс поезда = {2}, прибыл = {3}, станция отправитель = {4}, станция прибытия = {5}, количество вагонов = {6}]. Результат переноса [выбрано для переноса = {7}, перенесено = {8}, пропущено = {9}, ошибок переноса = {10}].",
                    res.result, id_arrival, sostav.composition_index, sostav.date_arrival, (sostav.Directory_Station != null ? sostav.Directory_Station.station_name_ru : null), (sostav.Directory_Station1 != null ? sostav.Directory_Station1.station_name_ru : null), res.count,
                    res.count, res.moved, res.skip, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Перенос состава на ст АМКР, id={0} - перенесен.", id_arrival), start, stop, res.result);

                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("IncomingArrivalSostav(id_arrival={0}, user={1})", id_arrival, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Принять все принятые составы оператором на АМКР
        /// </summary>
        /// <returns></returns>
        public int IncomingArrivalSostav()
        {
            try
            {
                EFArrivalSostav ef_sostav = new EFArrivalSostav(new EFDbContext());
                DateTime dt_start = new DateTime(2020, 9, 15, 0, 0, 0);
                List<ArrivalSostav> sostav_list = ef_sostav.Context.Where(s => s.date_adoption != null && s.date_adoption >= dt_start).OrderBy(c => c.date_adoption).ToList();
                int moving = 0;
                int error = 0;
                int skip = 0;
                Console.WriteLine(String.Format("Определено для переноса {0} составов", sostav_list.Count()));
                foreach (ArrivalSostav sost in sostav_list)
                {

                    Console.WriteLine(String.Format("Переношу состав id={0}, осталось {1}, Ошибок переноса {2}, пропущено {3}", sost.id, (sostav_list.Count() - moving), error, skip));
                    int res = IncomingArrivalSostav(sost.id, null, null);
                    if (res < 0)
                    {
                        error++;
                    }
                    if (res == 0) { skip++; }
                    moving++;

                }
                return 0;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("IncomingArrivalSostav()"), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        #endregion

        #region SendingOutgoingSostav
        /// <summary>
        /// Перенести все вагоны состава принятого по КИС (сдача на УЗ) на станцию и путь отправки АМКР (! временная работает по отпраке КИС)
        /// </summary>
        /// <param name="id_outgoing"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        //public int SetStationOutgoingWagonsOfKIS(long id_outgoing, string user)
        //{
        //    try
        //    {
        //        DateTime start = DateTime.Now;

        //        ResultTransfer res = new ResultTransfer(0);

        //        // Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }

        //        EFOutgoingSostav ef_sostav = new EFOutgoingSostav(new EFDbContext());
        //        EFOutgoingCars ef_car = new EFOutgoingCars(new EFDbContext());

        //        OutgoingSostav sostav = ef_sostav.Context.Where(s => s.id == id_outgoing).FirstOrDefault();

        //        if (sostav != null && sostav.date_outgoing != null && (sostav.OutgoingCars != null && sostav.OutgoingCars.Count() > 0))
        //        {
        //            List<OutgoingCars> list_wagon = sostav.OutgoingCars.Where(c => c.position_outgoing != null).ToList();
        //            if (list_wagon != null && list_wagon.Count() > 0)
        //            {
        //                // Переносим 
        //                // Состав определен, принятые вагоны определены

        //                int id_station = (int)sostav.id_station_from;
        //                int id_way = (int)sostav.id_way_from;
        //                DateTime date_arrival = sostav.date_readiness_amkr;

        //                EFDbContext curent = new EFDbContext();
        //                IDS_WIR wir = new IDS_WIR(this.servece_owner);
        //                res = wir.SetStationOutgoingWagonsOfKIS(ref curent, id_station, id_way, date_arrival, list_wagon, false, user);
        //            }
        //            else
        //            {
        //                res.SetResult((int)errors_wir.not_wagon);
        //            }
        //        }
        //        else
        //        {
        //            res.SetResult((int)errors_wir.not_sostav);
        //        }

        //        string mess = String.Format("Операция переноса вагонов в составе (отправляемого на УЗ) на станцию и путь отправки АМКР. Код выполнения = {0}. Состав [id = {1}, готовность АМКР = {2}, станция отправитель АМКР = {3}, станция УЗ = {4}, количество вагонов = {5}]. Результат переноса [выбрано для переноса = {6}, перенесено = {7}, пропущено = {8}, ошибок переноса = {9}].",
        //            res.result, id_outgoing, sostav.date_readiness_amkr, (sostav.Directory_Station != null ? sostav.Directory_Station.station_name_ru : null), (sostav.Directory_Station1 != null ? sostav.Directory_Station1.station_name_ru : null), res.count,
        //            res.count, res.moved, res.skip, res.error);
        //        mess.WarningLog(servece_owner, eventID);
        //        mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
        //        DateTime stop = DateTime.Now;
        //        servece_owner.ServicesToLog(eventID, String.Format("Перенос состава на ст АМКР для отправки на УЗ, id={0} - перенесен.", id_outgoing), start, stop, res.result);

        //        return res.result;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("OutgoingArrivalSostav(id_outgoing={0}, user={1})", id_outgoing, user), servece_owner, eventID);
        //        return -1;// Возвращаем id=-1 , Ошибка
        //    }
        //}
        /// <summary>
        /// Отправить состав на УЗ, закрыть WIR по вагонам.
        /// </summary>
        /// <param name="id_outgoing"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        //public int SendingOutgoingSostav(long id_outgoing, string user)
        //{
        //    try
        //    {
        //        DateTime start = DateTime.Now;

        //        ResultTransfer res = new ResultTransfer(0);

        //        // Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }

        //        EFOutgoingSostav ef_sostav = new EFOutgoingSostav(new EFDbContext());
        //        EFOutgoingCars ef_car = new EFOutgoingCars(new EFDbContext());

        //        OutgoingSostav sostav = ef_sostav.Context.Where(s => s.id == id_outgoing).FirstOrDefault();

        //        if (sostav != null && sostav.date_outgoing != null && (sostav.OutgoingCars != null && sostav.OutgoingCars.Count() > 0))
        //        {
        //            List<OutgoingCars> list_wagon = sostav.OutgoingCars.Where(c => c.position_outgoing != null).ToList();
        //            if (list_wagon != null && list_wagon.Count() > 0)
        //            {
        //                // Переносим 
        //                // Состав определен, принятые вагоны определены

        //                int id_station = (int)sostav.id_station_from;
        //                int id_way = (int)sostav.id_way_from;
        //                DateTime date_arrival = (DateTime)sostav.date_outgoing;

        //                EFDbContext curent = new EFDbContext();
        //                //EFDbContext curent = null;
        //                IDS_WIR wir = new IDS_WIR(this.servece_owner);
        //                res = wir.OutgoingWagons(ref curent, id_station, id_way, date_arrival, list_wagon, false, user);

        //            }
        //            else
        //            {
        //                res.SetResult((int)errors_wir.not_wagon);
        //            }
        //        }
        //        else
        //        {
        //            res.SetResult((int)errors_wir.not_sostav);
        //        }

        //        string mess = String.Format("Операция закрытия отправляемых на УЗ составов. Код выполнения = {0}. Состав [id = {1}, готовность АМКР = {2}, отправлен = {3}, станция отправитель АМКР = {4}, станция УЗ = {5}, количество вагонов = {6}]. Результат переноса [выбрано для переноса = {7}, перенесено = {8}, пропущено = {9}, ошибок переноса = {10}].",
        //            res.result, id_outgoing, sostav.date_readiness_amkr, sostav.date_outgoing, (sostav.Directory_Station != null ? sostav.Directory_Station.station_name_ru : null), (sostav.Directory_Station1 != null ? sostav.Directory_Station1.station_name_ru : null), res.count,
        //            res.count, res.moved, res.skip, res.error);
        //        mess.WarningLog(servece_owner, eventID);
        //        mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
        //        DateTime stop = DateTime.Now;
        //        servece_owner.ServicesToLog(eventID, String.Format("Перенос состава на ст УЗ, id={0} - перенесен.", id_outgoing), start, stop, res.result);

        //        return res.result;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("OutgoingArrivalSostav(id_outgoing={0}, user={1})", id_outgoing, user), servece_owner, eventID);
        //        return -1;// Возвращаем id=-1 , Ошибка
        //    }
        //}




        #endregion



    }
}
