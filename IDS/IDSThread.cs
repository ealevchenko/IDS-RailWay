using IDSLogs.Enum;
using IDSLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Configuration;

namespace IDS
{
    public class IDSThread
    {
        private static eventID eventID = eventID.IDS_IDSThread;
        protected static service servece_owner = service.Null;

        protected static object locker_db_outgoing = new object();
        protected static object locker_sap_is = new object();
        protected static object locker_sap_os = new object();
        protected static object locker_epd_arrival = new object();
        protected static object locker_epd_sending = new object();


        protected Thread thUpdateIncomingSupply = null;
        public bool statusUpdateIncomingSupply { get { return thUpdateIncomingSupply.IsAlive; } }

        protected Thread thUpdateOutgoingSupply = null;
        public bool statusUpdateOutgoingSupply { get { return thUpdateOutgoingSupply.IsAlive; } }

        protected Thread thUpdateArrivalEPD = null;
        public bool statusUpdateArrivalEPD { get { return thUpdateArrivalEPD.IsAlive; } }

        protected Thread thUpdateSendingEPD = null;
        public bool statusUpdateSendingEPD { get { return thUpdateSendingEPD.IsAlive; } }

        public IDSThread()
        {

        }

        public IDSThread(service servece_name)
        {
            servece_owner = servece_name;
        }

        #region IDS_UpdateIncomingSupply
        /// <summary>
        /// Запустить поток обновления входящей поставки по вагонам
        /// </summary>
        /// <returns></returns>
        public bool Start_UpdateIncomingSupply()
        {
            service service = service.IDS_UpdateIncomingSupply;
            string mes_service_start = String.Format("Поток : {0} сервиса : {1}", service.ToString(), servece_owner);
            try
            {
                if ((thUpdateIncomingSupply == null) || (!thUpdateIncomingSupply.IsAlive && thUpdateIncomingSupply.ThreadState == ThreadState.Stopped))
                {
                    thUpdateIncomingSupply = new Thread(UpdateIncomingSupply);
                    thUpdateIncomingSupply.Name = service.ToString();
                    thUpdateIncomingSupply.Start();
                }
                return thUpdateIncomingSupply.IsAlive;
            }
            catch (Exception ex)
            {
                mes_service_start += " - ошибка запуска.";
                ex.ExceptionLog(mes_service_start, servece_owner, eventID);
                return false;
            }
        }
        /// <summary>
        /// Поток обновления входящей поставки по вагонам
        /// </summary>
        private static void UpdateIncomingSupply()
        {
            service service = service.IDS_UpdateIncomingSupply;
            DateTime dt_start = DateTime.Now;
            try
            {
                int day_approach_limit = 30;
                string exceptions_cargo = "1;3;20;37;38;40"; // Код грузов для исключения из опроса обновления по ним входящей поставки
                List<int> list_exceptions_cargo = new List<int>();
                //bool transfer_set_outgoing_wagon_of_kis = true;
                // считать настройки
                try
                {
                    // Количество дней, ожидания вагона с подходов
                    day_approach_limit = int.Parse(ConfigurationManager.AppSettings["SAP_IS_DayApproachLimit"].ToString());
                    exceptions_cargo = ConfigurationManager.AppSettings["SAP_IS_ExceptionsCargo"].ToString();
                    try
                    {
                        string[] list_str = exceptions_cargo.Split(';');
                        if (list_str != null && list_str.Length > 0)
                        {
                            foreach (string id in list_str)
                            {
                                list_exceptions_cargo.Add(int.Parse(id));
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        ex.ExceptionLog(String.Format("Ошибка преобразования массива SAP_IS_ExceptionsCargo потока {0}, сервиса {1}", service.ToString(), servece_owner), servece_owner, eventID);
                    }
                    //transfer_set_outgoing_wagon_of_kis = bool.Parse(ConfigurationManager.AppSettings["TransferSetOutgoingWagonOfKis"].ToString());
                }
                catch (Exception ex)
                {
                    ex.ExceptionLog(String.Format("Ошибка выполнения считывания настроек потока {0}, сервиса {1}", service.ToString(), servece_owner), servece_owner, eventID);
                }
                int res_update = 0;
                lock (locker_sap_is)
                {
                    IDS_SAP ids_sap = new IDS_SAP(service);
                    ids_sap.Day_approach_limit = day_approach_limit;
                    res_update = ids_sap.UpdateListIncomingSupply(list_exceptions_cargo, (System.Environment.UserDomainName + @"\" + System.Environment.UserName));
                }
                TimeSpan ts = DateTime.Now - dt_start;
                string mes_service_exec = String.Format("Поток {0} сервиса {1} - время выполнения: {2}:{3}:{4}({5}), код выполнения: res_update:{6}.", service.ToString(), servece_owner, ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds, res_update);
                mes_service_exec.InformationLog(servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - выполнен.", dt_start, DateTime.Now, res_update);
            }
            catch (ThreadAbortException exc)
            {
                String.Format("Поток {0} сервиса {1} - прерван по событию ThreadAbortException={2}", service.ToString(), servece_owner, exc).WarningLog(servece_owner, eventID);
            }
            catch (Exception ex)
            {
                ex.ExceptionLog(String.Format("Ошибка выполнения цикла обновления, потока {0} сервис {1}", service.ToString(), servece_owner), servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - завершен с ошибкой.", dt_start, DateTime.Now, -1);
            }
        }
        #endregion

        #region IDS_UpdateOutgoingSupply
        /// <summary>
        /// Запустить поток обновления исходящей поставки по вагонам
        /// </summary>
        /// <returns></returns>
        public bool Start_UpdateOutgoingSupply()
        {
            service service = service.IDS_UpdateOutgoingSupply;
            string mes_service_start = String.Format("Поток : {0} сервиса : {1}", service.ToString(), servece_owner);
            try
            {
                if ((thUpdateOutgoingSupply == null) || (!thUpdateOutgoingSupply.IsAlive && thUpdateOutgoingSupply.ThreadState == ThreadState.Stopped))
                {
                    thUpdateOutgoingSupply = new Thread(UpdateOutgoingSupply);
                    thUpdateOutgoingSupply.Name = service.ToString();
                    thUpdateOutgoingSupply.Start();
                }
                return thUpdateOutgoingSupply.IsAlive;
            }
            catch (Exception ex)
            {
                mes_service_start += " - ошибка запуска.";
                ex.ExceptionLog(mes_service_start, servece_owner, eventID);
                return false;
            }
        }
        /// <summary>
        /// Поток обновления исходящей поставки по вагонам
        /// </summary>
        private static void UpdateOutgoingSupply()
        {
            service service = service.IDS_UpdateOutgoingSupply;
            DateTime dt_start = DateTime.Now;
            try
            {
                int res_update = 0;
                lock (locker_sap_os)
                {
                    IDS_SAP ids_sap = new IDS_SAP(service);
                    res_update = ids_sap.UpdateSAPOutgoingSupply(null);
                }
                TimeSpan ts = DateTime.Now - dt_start;
                string mes_service_exec = String.Format("Поток {0} сервиса {1} - время выполнения: {2}:{3}:{4}({5}), код выполнения: res_update:{6}.", service.ToString(), servece_owner, ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds, res_update);
                mes_service_exec.InformationLog(servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - выполнен.", dt_start, DateTime.Now, res_update);
            }
            catch (ThreadAbortException exc)
            {
                String.Format("Поток {0} сервиса {1} - прерван по событию ThreadAbortException={2}", service.ToString(), servece_owner, exc).WarningLog(servece_owner, eventID);
            }
            catch (Exception ex)
            {
                ex.ExceptionLog(String.Format("Ошибка выполнения цикла обновления, потока {0} сервис {1}", service.ToString(), servece_owner), servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - завершен с ошибкой.", dt_start, DateTime.Now, -1);
            }
        }
        #endregion

        #region IDS_UpdateArrivalEPD

        public bool Start_UpdateArrivalEPD()
        {
            service service = service.IDS_UpdateArrivalEPD;
            string mes_service_start = String.Format("Поток : {0} сервиса : {1}", service.ToString(), servece_owner);
            try
            {
                if ((thUpdateArrivalEPD == null) || (!thUpdateArrivalEPD.IsAlive && thUpdateArrivalEPD.ThreadState == ThreadState.Stopped))
                {
                    thUpdateArrivalEPD = new Thread(UpdateArrivalEPD);
                    thUpdateArrivalEPD.Name = service.ToString();
                    thUpdateArrivalEPD.Start();
                }
                return thUpdateArrivalEPD.IsAlive;
            }
            catch (Exception ex)
            {
                mes_service_start += " - ошибка запуска.";
                ex.ExceptionLog(mes_service_start, servece_owner, eventID);
                return false;
            }
        }

        private static void UpdateArrivalEPD()
        {
            service service = service.IDS_UpdateArrivalEPD;
            DateTime dt_start = DateTime.Now;
            try
            {
                int day_arhive_epd = 90; // Количество дней хранения ЭПД на сервере УЗ (3 месяца)
                bool searsh_in_sms = false; // Бит включить поиск в базе даных УЗ

                // считать настройки
                try
                {
                    // Количество дней, ожидания вагона с подходов
                    day_arhive_epd = int.Parse(ConfigurationManager.AppSettings["EPD_DayArhiveArrival"].ToString());
                    searsh_in_sms = bool.Parse(ConfigurationManager.AppSettings["EPD_SearshArrival"].ToString());

                }
                catch (Exception ex)
                {
                    ex.ExceptionLog(String.Format("Ошибка выполнения считывания настроек потока {0}, сервиса {1}", service.ToString(), servece_owner), servece_owner, eventID);
                }
                int res_update = 0;
                ResultUpdateID result = null;
                lock (locker_epd_arrival)
                {
                    IDS_WIR ids_epd = new IDS_WIR(service);
                    ids_epd.Day_arhive_epd_arrival = day_arhive_epd;
                    ids_epd.Searsh_in_sms_arrival = searsh_in_sms;
                    res_update = ids_epd.UpdateArrivalEPD();
                    result = ids_epd.UpdateArrival_UZ_Documents(null); // обновим Род и администрацию

                }
                TimeSpan ts = DateTime.Now - dt_start;
                string mes_service_exec = String.Format("Поток {0} сервиса {1} - время выполнения: {2}:{3}:{4}({5}), код выполнения обновлений ЭПД: res_update:{6}, обновлений по картачкам вагонам:{7}", service.ToString(), servece_owner, ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds, res_update, result.result);
                mes_service_exec.InformationLog(servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - выполнен.", dt_start, DateTime.Now, res_update + result.result);
            }
            catch (ThreadAbortException exc)
            {
                String.Format("Поток {0} сервиса {1} - прерван по событию ThreadAbortException={2}", service.ToString(), servece_owner, exc).WarningLog(servece_owner, eventID);
            }
            catch (Exception ex)
            {
                ex.ExceptionLog(String.Format("Ошибка выполнения цикла обновления, потока {0} сервис {1}", service.ToString(), servece_owner), servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - завершен с ошибкой.", dt_start, DateTime.Now, -1);
            }
        }

        #endregion

        #region IDS_UpdateSendingEPD

        public bool Start_UpdateSendingEPD()
        {
            service service = service.IDS_UpdateSendingEPD;
            string mes_service_start = String.Format("Поток : {0} сервиса : {1}", service.ToString(), servece_owner);
            try
            {
                if ((thUpdateSendingEPD == null) || (!thUpdateSendingEPD.IsAlive && thUpdateSendingEPD.ThreadState == ThreadState.Stopped))
                {
                    thUpdateSendingEPD = new Thread(UpdateSendingEPD);
                    thUpdateSendingEPD.Name = service.ToString();
                    thUpdateSendingEPD.Start();
                }
                return thUpdateSendingEPD.IsAlive;
            }
            catch (Exception ex)
            {
                mes_service_start += " - ошибка запуска.";
                ex.ExceptionLog(mes_service_start, servece_owner, eventID);
                return false;
            }
        }

        private static void UpdateSendingEPD()
        {
            service service = service.IDS_UpdateSendingEPD;
            DateTime dt_start = DateTime.Now;
            try
            {
                int day_arhive_epd = 90; // Количество дней хранения ЭПД на сервере УЗ (3 месяца)
                // считать настройки
                try
                {
                    // Количество дней, ожидания вагона с подходов
                    day_arhive_epd = int.Parse(ConfigurationManager.AppSettings["EPD_DayArhiveSending"].ToString());

                }
                catch (Exception ex)
                {
                    ex.ExceptionLog(String.Format("Ошибка выполнения считывания настроек потока {0}, сервиса {1}", service.ToString(), servece_owner), servece_owner, eventID);
                }
                int res_update = 0;
                ResultUpdateID result = null;
                lock (locker_epd_sending)
                {
                    IDS_WIR ids_epd = new IDS_WIR(service);
                    ids_epd.Day_arhive_epd_sending = day_arhive_epd;
                    res_update = ids_epd.UpdateSendingEPD(null);
                    result = ids_epd.UpdateOutgoing_UZ_Document(null); // обновим Род и администрацию
                }
                TimeSpan ts = DateTime.Now - dt_start;
                string mes_service_exec = String.Format("Поток {0} сервиса {1} - время выполнения: {2}:{3}:{4}({5}), код выполнения: res_update:{6}.", service.ToString(), servece_owner, ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds, res_update);
                mes_service_exec.InformationLog(servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - выполнен.", dt_start, DateTime.Now, res_update);
            }
            catch (ThreadAbortException exc)
            {
                String.Format("Поток {0} сервиса {1} - прерван по событию ThreadAbortException={2}", service.ToString(), servece_owner, exc).WarningLog(servece_owner, eventID);
            }
            catch (Exception ex)
            {
                ex.ExceptionLog(String.Format("Ошибка выполнения цикла обновления, потока {0} сервис {1}", service.ToString(), servece_owner), servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - завершен с ошибкой.", dt_start, DateTime.Now, -1);
            }
        }

        #endregion
    }
}
