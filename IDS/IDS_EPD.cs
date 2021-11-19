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

        public IDS_EPD()
            : base()
        {

        }

        public IDS_EPD(service servece_owner)
            : base(servece_owner)
        {

        }

        #region ДОКУМЕНТЫ ПО ПРИБЫТИЮ
        public int UpdateArrivalEPD(string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                ResultUpdateID res = new ResultUpdateID(0);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);

                EFIDS.Concrete.EFDbContext context_ids = new EFIDS.Concrete.EFDbContext();
                //EFIDS.Concrete.EFUZ_DOC ef_uz_doc_ids = new EFIDS.Concrete.EFUZ_DOC(context_ids);

                //List<UZ_DOC_Arrival> list = new List<UZ_DOC_Arrival>();

                string sql = "select * from [IDS].[get_view_uz_doc_arrival]()";
                // Получить список документов со статусом uncredited = 8  (Документ розкредитовано товарним касиром) с признаком строки не закрыта
                List<UZ_DOC_Arrival> ef_uz_doc_ids_close = context_ids.Database.SqlQuery<UZ_DOC_Arrival>(sql).ToList().Where(d => d.status == 8 && d.close == null).OrderByDescending(d => d.dt).ToList();
                // Получить список документов со статусом ниже uncredited = 8  (Документ розкредитовано товарним касиром) с признаком строки не закрыта с указаным временем обновления
                List<UZ_DOC_Arrival> ef_uz_doc_ids = context_ids.Database.SqlQuery<UZ_DOC_Arrival>(sql).ToList().Where(d => d.status < 8 && d.dt != null && d.close == null).ToList();
                // Получить список документов со статусом ниже uncredited = 8  (Документ розкредитовано товарним касиром) с признаком строки не закрыта без времени обновления
                List<UZ_DOC_Arrival> ef_uz_doc_ids_null = context_ids.Database.SqlQuery<UZ_DOC_Arrival>(sql).ToList().Where(d => d.status < 8 && d.dt == null).ToList();

                // Обработаем запись со статусом uncredited = 8 

                List<UZ_DOC_Arrival> new_list = new List<UZ_DOC_Arrival>();
                //ef_uz_doc_ids_close;
                new_list.Add(ef_uz_doc_ids_close[0]);
                new_list.Add(ef_uz_doc_ids_close[1]);
                new_list.Add(ef_uz_doc_ids_close[2]);
                new_list.Add(ef_uz_doc_ids_close[3]);

                foreach (UZ_DOC_Arrival uz_doc_arr in new_list.ToList()) //ef_uz_doc_ids_close.ToList()
                {

                    if (uz_doc_arr.num_uz != null)
                    {

                        ThreadWithState tws = new ThreadWithState(uz_doc_arr.num_uz.ToString(), context_ids);

                        // Create a thread to execute the task, and then
                        // start the thread.
                        Thread t = new Thread(new ThreadStart(tws.ThreadProc));
                        t.Start();
                        Console.WriteLine("Start - номер документа {0}", uz_doc_arr.num_uz.ToString());
                        //t.Join();
                        //Console.WriteLine(
                        //    "Independent task has completed; main thread ends.");

                        //List<UZ.UZ_DOC> uz_doc_sms = uz_sms.GetUZ_DOC_Of_NumDoc(uz_doc_arr.num_uz.ToString());
                        //if (uz_doc_sms != null && uz_doc_sms.Count() > 0)
                        //{
                        //    Console.WriteLine("Номер документа {0}, найдено документов {1}", uz_doc_arr.num_uz.ToString(), uz_doc_sms.Count());
                        //}
                        //else
                        //{
                        //    Console.WriteLine("Номер документа {0}, документов не найдено", uz_doc_arr.num_uz.ToString());
                        //}

                        //List<UZ.UZ_DOC> uz_doc_sms = uz_sms.GetUZ_DOC_Of_NumDoc(uz_doc_arr.num_uz.ToString());
                        //if (uz_doc_sms != null && uz_doc_sms.Count() > 0) { 

                        //}
                    }

                    // Проверим по промежуточной базе
                    //UZ.UZ_DOC uz_doc = uz_sms.GetDocumentOfDB_NumDoc(uz_doc_arr.num_doc);
                    //if (uz_doc != null) {
                    //    // Проверим в пром. базе ревизия больше
                    //    if (uz_doc.revision > uz_doc_arr.revision) { 
                    //        // В пром. базе ревизия больше, обновим документ
                    //    }
                    //}
                }
                //// Перенесем вагоны 
                //res = UpdateListIncomingSupply(ref context, list_cargo, user);
                //// Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                //if (res.error == 0)
                //{
                //    res.SetResult(context.SaveChanges());
                //}
                string mess = String.Format("Операция обновления информации входящей поставки на вагоны. Код выполнения = {0}. Результат обновления [определено {1} вагонов, обновлено {2}, пропущено {3}, закрыто строк {4}, ошибок обновления {5}].",
                    res.result, res.count, res.update, res.skip, res.close, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция обновления входящей поставки"), start, stop, res.result);
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
