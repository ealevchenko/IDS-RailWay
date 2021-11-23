using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace IDS
{

    /// <summary>
    /// Класс описание документа по прибытию
    /// </summary>
    public class UZ_DOC_Arrival
    {
        public string num_doc { get; set; }
        public int revision { get; set; }
        public int? status { get; set; }
        public int? num_uz { get; set; }
        public string code_from { get; set; }
        public string code_on { get; set; }
        public DateTime? dt { get; set; }
        public DateTime? close { get; set; }
        public string close_message { get; set; }
    }

    public class ThreadWithState
    {
        // State information used in the task.
        private string num_doc_;
        private EFIDS.Concrete.EFDbContext content_;


        // The constructor obtains the state information.
        public ThreadWithState(string num_doc, EFIDS.Concrete.EFDbContext content)
        {
            num_doc_ = num_doc;
            content_ = content;
        }

        // The thread procedure performs the task, such as formatting
        // and printing a document.
        public void ThreadProc()
        {
            UZ.UZ_SMS uz_sms = new UZ.UZ_SMS();
            List<UZ.UZ_DOC> uz_doc_sms = uz_sms.GetUZ_DOC_Of_NumDoc(num_doc_);
            if (uz_doc_sms != null && uz_doc_sms.Count() > 0)
            {
                Console.WriteLine("Номер документа {0}, найдено документов {1}", num_doc_, uz_doc_sms.Count());
            }
            else
            {
                Console.WriteLine("Номер документа {0}, документов не найдено", num_doc_);
            }
        }
    }

    public class IDS_EPD : IDS_Base
    {
        private eventID eventID = eventID.IDS_IDSEPD;
        private int day_arhive_epd = 90; // Количество дней хранения ЭПД на сервере УЗ (3 месяца)
        public int Day_arhive_epd { get { return this.day_arhive_epd; } set { this.day_arhive_epd = value; } }
        private bool search_in_sms = false; // Количество дней хранения ЭПД на сервере УЗ (3 месяца)
        public bool Search_in_sms { get { return this.search_in_sms; } set { this.search_in_sms = value; } }

        public IDS_EPD()
            : base()
        {

        }

        public IDS_EPD(service servece_owner)
            : base(servece_owner)
        {

        }

        #region ДОКУМЕНТЫ ПО ПРИБЫТИЮ
        /// <summary>
        /// Получить последний документ на промежуточном сервере и сервере SMS если установлен бит
        /// </summary>
        /// <param name="id_doc"></param>
        /// <param name="num_doc"></param>
        /// <returns></returns>
        public UZ.UZ_DOC getUpdate_UZ_DOC(string id_doc, string num_doc)
        {
            try
            {
                UZ.UZ_DOC uz_doc = null;
                List<UZ.UZ_DOC> result_uz_doc = new List<UZ.UZ_DOC>();


                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS();
                // Проверим по промежуточной базе
                UZ.UZ_DOC uz_doc_db = uz_sms.GetDocumentOfDB_NumDoc(id_doc);
                if (uz_doc_db != null) result_uz_doc.Add(uz_doc_db); // если есть добавим в список результатов

                // Проверим по sms УЗ (если признак искать в SMS - true)
                if (this.search_in_sms && !String.IsNullOrWhiteSpace(num_doc))
                {
                    List<UZ.UZ_DOC> list_uz_doc_sms = uz_sms.GetUZ_DOC_Of_NumDoc(num_doc);
                    if (list_uz_doc_sms != null && list_uz_doc_sms.Count() > 0)
                    {
                        result_uz_doc.Add(list_uz_doc_sms.Where(d => d.id_doc == id_doc).OrderByDescending(c => c.revision).FirstOrDefault());
                    }
                }
                uz_doc = result_uz_doc.OrderByDescending(v => v.revision).FirstOrDefault();
                return uz_doc;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("getUpdate_UZ_DOC(id_doc = {0}, num_doc = {1})", id_doc, num_doc), servece_owner, eventID);
                return null;// Ошибка
            }
        }

        public UZ.UZ_DOC getUpdateSMS_UZ_DOC(string id_doc, string num_doc)
        {
            try
            {
                UZ.UZ_DOC uz_doc = null;
                List<UZ.UZ_DOC> result_uz_doc = new List<UZ.UZ_DOC>();


                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS();

                // Проверим по sms УЗ (если признак искать в SMS - true)
                if (!String.IsNullOrWhiteSpace(num_doc))
                {
                    List<UZ.UZ_DOC> list_uz_doc_sms = uz_sms.GetUZ_DOC_Of_NumDoc(num_doc);
                    if (list_uz_doc_sms != null && list_uz_doc_sms.Count() > 0)
                    {
                        result_uz_doc.Add(list_uz_doc_sms.Where(d => d.id_doc == id_doc).OrderByDescending(c => c.revision).FirstOrDefault());
                    }
                }
                uz_doc = result_uz_doc.OrderByDescending(v => v.revision).FirstOrDefault();
                return uz_doc;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("getUpdateSMS_UZ_DOC(id_doc = {0}, num_doc = {1})", id_doc, num_doc), servece_owner, eventID);
                return null;// Ошибка
            }
        }

        public int Update_UZ_DOC(ref EFIDS.Concrete.EFDbContext context, UZ_DOC_Arrival doc, UZ.UZ_DOC new_doc, DateTime? close, string close_message)
        {
            try
            {
                if (context == null)
                {
                    context = new EFIDS.Concrete.EFDbContext();
                }
                EFIDS.Concrete.EFUZ_DOC ef_uz_doc = new EFIDS.Concrete.EFUZ_DOC(context);
                EFIDS.Entities.UZ_DOC uz_doc = ef_uz_doc.Context.Where(d => d.num_doc == doc.num_doc).FirstOrDefault();
                if (uz_doc != null)
                {
                    // Ревизия документа выше чем ревизия сохраненного документа
                    if (uz_doc.revision <= new_doc.revision)
                    {
                        string code_from = new_doc.sender_code != null ? new_doc.sender_code : "0";

                        uz_doc.num_doc = new_doc.id_doc;
                        uz_doc.revision = new_doc.revision;
                        uz_doc.num_uz = new_doc.otpr != null ? new_doc.otpr.nom_doc : null;
                        uz_doc.status = (int)new_doc.status;
                        uz_doc.code_from = code_from;
                        uz_doc.code_on = new_doc.recipient_code;
                        uz_doc.dt = new_doc.dt;
                        uz_doc.xml_doc = new_doc.xml;
                        uz_doc.close = close;
                        uz_doc.close_message = close_message;
                        ef_uz_doc.Update(uz_doc);
                        return 1;
                    }
                    else return 0; // пропущен
                }
                else return (int)errors_base.not_epd_document; // Нет ЭПД
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Update_UZ_DOC()"), servece_owner, eventID);
                return (int)errors_base.global;// Ошибка
            }
        }

        public int Close_UZ_DOC(ref EFIDS.Concrete.EFDbContext context, UZ_DOC_Arrival doc, DateTime? close, string close_message)
        {
            try
            {
                if (context == null)
                {
                    context = new EFIDS.Concrete.EFDbContext();
                }
                EFIDS.Concrete.EFUZ_DOC ef_uz_doc = new EFIDS.Concrete.EFUZ_DOC(context);
                EFIDS.Entities.UZ_DOC uz_doc = ef_uz_doc.Context.Where(d => d.num_doc == doc.num_doc).FirstOrDefault();
                if (uz_doc != null)
                {
                    uz_doc.close = close;
                    uz_doc.close_message = close_message;
                    ef_uz_doc.Update(uz_doc);
                    return 1;

                }
                else return (int)errors_base.not_epd_document; // Нет ЭПД
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Update_UZ_DOC()"), servece_owner, eventID);
                return (int)errors_base.global;// Ошибка
            }
        }

        public int UpdateArrivalEPD(string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                ResultUpdateStringID res = new ResultUpdateStringID(0);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);

                EFIDS.Concrete.EFDbContext context_ids = new EFIDS.Concrete.EFDbContext();
                //EFIDS.Concrete.EFUZ_DOC ef_uz_doc_ids = new EFIDS.Concrete.EFUZ_DOC(context_ids);

                //List<UZ_DOC_Arrival> list = new List<UZ_DOC_Arrival>();

                // Выполним запрос и получим все ЭПД с признапком не закрыт
                string sql = "select * from [IDS].[get_view_uz_doc_arrival]() where [close] is null";
                List<UZ_DOC_Arrival> list_uz_doc = context_ids.Database.SqlQuery<UZ_DOC_Arrival>(sql).ToList();
                res.count = list_uz_doc != null ? list_uz_doc.Count() : 0;
                List<UZ_DOC_Arrival> uz_doc_ids_uncredited = new List<UZ_DOC_Arrival>();
                List<UZ_DOC_Arrival> uz_doc_ids_open = new List<UZ_DOC_Arrival>();
                // Проверим список получен?
                if (list_uz_doc != null && list_uz_doc.Count() > 0)
                {
                    // Да список получен, продолжим обработку.
                    uz_doc_ids_uncredited = list_uz_doc.Where(d => d.status == 8).ToList(); // выбрать раскредитованых
                    uz_doc_ids_open = list_uz_doc.Where(d => d.status < 8).ToList(); // выбрать не раскредитованые

                    // Начнем обработку раскредитованых
                    if (uz_doc_ids_uncredited != null && uz_doc_ids_uncredited.Count() > 0)
                    {
                        List<UZ_DOC_Arrival> uz_doc_ids_uncredited_null = uz_doc_ids_uncredited.Where(d => d.dt == null).ToList(); // выбрать раскредитованых с датой обновления пусто
                        DateTime date_exceeded = DateTime.Now.AddDays(-1 * this.day_arhive_epd);
                        List<UZ_DOC_Arrival> uz_doc_ids_uncredited_exceeded = uz_doc_ids_uncredited.Where(d => d.dt < date_exceeded).ToList(); // выбрать раскредитованых с датой обновления ниже мак даты хранения на сервере
                        List<UZ_DOC_Arrival> uz_doc_ids_uncredited_not_reached = uz_doc_ids_uncredited.Where(d => d.dt >= date_exceeded).ToList(); // выбрать раскредитованых с датой обновления в диапазоне периода хранения данных на сервере.
                        // -----------------------------------------------------------------------------------------
                        // Начнем обработку раскредитованых с датой обновления пусто
                        foreach (UZ_DOC_Arrival doc in uz_doc_ids_uncredited_null)
                        {
                            Console.WriteLine("ID документа {0}, № документа {1}", doc.num_doc, doc.num_uz);
                            // Получим документ
                            UZ.UZ_DOC upd_doc_uz = getUpdate_UZ_DOC(doc.num_doc, doc.num_uz.ToString());
                            if (upd_doc_uz != null)
                            {
                                int res_upd = Update_UZ_DOC(ref context_ids, doc, upd_doc_uz, DateTime.Now, "ЭПД(uncredited) - обновлен и закрыт");
                                res.SetCloseResult(res_upd, doc.num_doc);
                                Console.WriteLine("ID документа {0}, № документа {1} - Найден и обновлен, код {2}", doc.num_doc, doc.num_uz, res_upd);
                            }
                            else
                            {
                                int res_upd = Close_UZ_DOC(ref context_ids, doc, DateTime.Now, "ЭПД(uncredited) - не найден и закрыт");
                                res.SetCloseResult(res_upd, doc.num_doc);
                                Console.WriteLine("ID документа {0}, № документа {1} - !не найден и закрыт  ", doc.num_doc, doc.num_uz);
                            }
                        }
                        // -----------------------------------------------------------------------------------------
                        // Начнем обработку раскредитованых с датой ниже мак даты хранения на сервере
                        foreach (UZ_DOC_Arrival doc in uz_doc_ids_uncredited_exceeded)
                        {
                            Console.WriteLine("ID документа {0}, № документа {1}", doc.num_doc, doc.num_uz);
                            // Получим документ
                            UZ.UZ_DOC upd_doc_uz = getUpdate_UZ_DOC(doc.num_doc, doc.num_uz.ToString());
                            if (upd_doc_uz != null)
                            {
                                int res_upd = Update_UZ_DOC(ref context_ids, doc, upd_doc_uz, DateTime.Now, "ЭПД(uncredited) - обновлен и закрыт");
                                res.SetCloseResult(res_upd, doc.num_doc);
                                Console.WriteLine("ID документа {0}, № документа {1} - Найден и обновлен, код {2}", doc.num_doc, doc.num_uz, res_upd);
                            }
                            else
                            {
                                int res_upd = Close_UZ_DOC(ref context_ids, doc, DateTime.Now, "ЭПД(uncredited) - не найден и закрыт");
                                res.SetCloseResult(res_upd, doc.num_doc);
                                Console.WriteLine("ID документа {0}, № документа {1} - !не найден и закрыт  ", doc.num_doc, doc.num_uz);
                            }
                        }
                        // -----------------------------------------------------------------------------------------
                        // Начнем обработку раскредитованых с датой обновления в диапазоне периода хранения данных на сервере
                        foreach (UZ_DOC_Arrival doc in uz_doc_ids_uncredited_not_reached)
                        {
                            Console.WriteLine("ID документа {0}, № документа {1}", doc.num_doc, doc.num_uz);
                            // Получим документ
                            UZ.UZ_DOC upd_doc_uz = getUpdate_UZ_DOC(doc.num_doc, doc.num_uz.ToString());
                            if (upd_doc_uz != null)
                            {
                                int res_upd = Update_UZ_DOC(ref context_ids, doc, upd_doc_uz, DateTime.Now, "ЭПД(uncredited) - обновлен и закрыт");
                                res.SetCloseResult(res_upd, doc.num_doc);
                                Console.WriteLine("ID документа {0}, № документа {1} - Найден и обновлен, код {2}", doc.num_doc, doc.num_uz, res_upd);
                                if (upd_doc_uz.revision > doc.revision)
                                {

                                }
                            }
                            else
                            {
                                // Поиск на сервере УЗ 
                                UZ.UZ_DOC sms_doc_uz = getUpdateSMS_UZ_DOC(doc.num_doc, doc.num_uz.ToString());
                                if (sms_doc_uz != null)
                                {
                                    int res_upd = Update_UZ_DOC(ref context_ids, doc, sms_doc_uz, DateTime.Now, "ЭПД(uncredited) - обновлен(УЗ) и закрыт");
                                    res.SetCloseResult(res_upd, doc.num_doc);
                                    Console.WriteLine("ID документа {0}, № документа {1} - Найден и обновлен, код {2}", doc.num_doc, doc.num_uz, res_upd);
                                    if (sms_doc_uz.revision > doc.revision)
                                    {

                                    }
                                }
                                else
                                {
                                    int res_upd = Close_UZ_DOC(ref context_ids, doc, DateTime.Now, "ЭПД(uncredited) - не найден и закрыт");
                                    res.SetCloseResult(res_upd, doc.num_doc);
                                    Console.WriteLine("ID документа {0}, № документа {1} - !не найден и закрыт  ", doc.num_doc, doc.num_uz);
                                }
                            }
                        }

                    }
                }

                // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                if (res.error == 0)
                {
                    res.SetResult(context_ids.SaveChanges());
                }
                string mess = String.Format("Операция обновления ЭПД по прибытию. Код выполнения = {0}. Результат обновления [определено {1} документов (из них раскредетовано но не закрыто : {2}, не раскредетовано : {3} ), обновлено {4}, пропущено {5}, закрыто {6}, ошибок обновления {7}].",
                    res.result, res.count, uz_doc_ids_uncredited.Count(), uz_doc_ids_open.Count(), res.update, res.skip, res.close, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция обновления ЭПД по прибытию"), start, stop, res.result);
                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrivalEPD()"), servece_owner, eventID);
                return (int)errors_base.global;// Ошибка
            }

            #endregion
        }
    }
}




//// Получить список документов со статусом uncredited = 8  (Документ розкредитовано товарним касиром) с признаком строки не закрыта
//List<UZ_DOC_Arrival> ef_uz_doc_ids_close = context_ids.Database.SqlQuery<UZ_DOC_Arrival>(sql).ToList().Where(d => d.status == 8 && d.close == null).OrderByDescending(d => d.dt).ToList();
//// Получить список документов со статусом ниже uncredited = 8  (Документ розкредитовано товарним касиром) с признаком строки не закрыта с указаным временем обновления
//List<UZ_DOC_Arrival> ef_uz_doc_ids = context_ids.Database.SqlQuery<UZ_DOC_Arrival>(sql).ToList().Where(d => d.status < 8 && d.dt != null && d.close == null).ToList();
//// Получить список документов со статусом ниже uncredited = 8  (Документ розкредитовано товарним касиром) с признаком строки не закрыта без времени обновления
//List<UZ_DOC_Arrival> ef_uz_doc_ids_null = context_ids.Database.SqlQuery<UZ_DOC_Arrival>(sql).ToList().Where(d => d.status < 8 && d.dt == null).ToList();

// Обработаем запись со статусом uncredited = 8 

//List<UZ_DOC_Arrival> new_list = new List<UZ_DOC_Arrival>();
////ef_uz_doc_ids_close;
//new_list.Add(ef_uz_doc_ids_close[0]);
//new_list.Add(ef_uz_doc_ids_close[1]);
//new_list.Add(ef_uz_doc_ids_close[2]);
//new_list.Add(ef_uz_doc_ids_close[3]);

//foreach (UZ_DOC_Arrival uz_doc_arr in new_list.ToList()) //ef_uz_doc_ids_close.ToList()
//{

//    if (uz_doc_arr.num_uz != null)
//    {

//        ThreadWithState tws = new ThreadWithState(uz_doc_arr.num_uz.ToString(), context_ids);

//        // Create a thread to execute the task, and then
//        // start the thread.
//        Thread t = new Thread(new ThreadStart(tws.ThreadProc));
//        t.Start();
//        Console.WriteLine("Start - номер документа {0}", uz_doc_arr.num_uz.ToString());
//        //t.Join();
//        //Console.WriteLine(
//        //    "Independent task has completed; main thread ends.");

//        //List<UZ.UZ_DOC> uz_doc_sms = uz_sms.GetUZ_DOC_Of_NumDoc(uz_doc_arr.num_uz.ToString());
//        //if (uz_doc_sms != null && uz_doc_sms.Count() > 0)
//        //{
//        //    Console.WriteLine("Номер документа {0}, найдено документов {1}", uz_doc_arr.num_uz.ToString(), uz_doc_sms.Count());
//        //}
//        //else
//        //{
//        //    Console.WriteLine("Номер документа {0}, документов не найдено", uz_doc_arr.num_uz.ToString());
//        //}

//        //List<UZ.UZ_DOC> uz_doc_sms = uz_sms.GetUZ_DOC_Of_NumDoc(uz_doc_arr.num_uz.ToString());
//        //if (uz_doc_sms != null && uz_doc_sms.Count() > 0) { 

//        //}
//    }

// Проверим по промежуточной базе
//UZ.UZ_DOC uz_doc = uz_sms.GetDocumentOfDB_NumDoc(uz_doc_arr.num_doc);
//if (uz_doc != null) {
//    // Проверим в пром. базе ревизия больше
//    if (uz_doc.revision > uz_doc_arr.revision) { 
//        // В пром. базе ревизия больше, обновим документ
//    }
//}