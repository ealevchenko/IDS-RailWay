using IDSLogs.Enum;
using IDSLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Configuration;

namespace MT
{
    public class MTThread
    {
        private static eventID eventID = eventID.MT_MTThread;
        protected static service servece_owner = service.Null;

        protected static object locker_xml_file = new object();
        protected static object locker_txt_file = new object();

        protected Thread thTransfer_MT_to_AMKR = null;
        public bool statusTransfer_MT_to_AMKR { get { return thTransfer_MT_to_AMKR.IsAlive; } }

        protected Thread thTransferApproaches = null;
        public bool statusTransferApproaches { get { return thTransferApproaches.IsAlive; } }

        protected Thread thTransferArrival = null;
        public bool statusTransferArrival { get { return thTransferArrival.IsAlive; } }

        protected Thread thTransferWT = null;
        public bool statusTransferWT { get { return thTransferWT.IsAlive; } }

        public MTThread()
        {

        }

        public MTThread(service servece_name)
        {
            servece_owner = servece_name;
        }

        #region Metrans_Transfer_MT_to_AMKR
        /// <summary>
        /// Запустить поток переноса вагонов на подходах
        /// </summary>
        /// <returns></returns>
        public bool Start_Transfer_MT_to_AMKR()
        {
            service service = service.Metrans_Transfer_MT_to_AMKR;
            string mes_service_start = String.Format("Поток : {0} сервиса : {1}", service.ToString(), servece_owner);
            try
            {
                if ((thTransfer_MT_to_AMKR == null) || (!thTransfer_MT_to_AMKR.IsAlive && thTransfer_MT_to_AMKR.ThreadState == ThreadState.Stopped))
                {
                    thTransfer_MT_to_AMKR = new Thread(Transfer_MT_to_AMKR);
                    thTransfer_MT_to_AMKR.Name = service.ToString();
                    thTransfer_MT_to_AMKR.Start();
                }
                return thTransfer_MT_to_AMKR.IsAlive;
            }
            catch (Exception ex)
            {
                mes_service_start += " - ошибка запуска.";
                ex.ExceptionLog(mes_service_start, servece_owner, eventID);
                return false;
            }

        }
        /// <summary>
        /// Поток переноса вагонов на подходах
        /// </summary>
        private static void Transfer_MT_to_AMKR()
        {
            service service = service.Metrans_Transfer_MT_to_AMKR;
            DateTime dt_start = DateTime.Now;
            try
            {
                string host = "159.224.194.27";
                int port = 222;
                string user = "arcelors";
                string psw = "$fh#ER2J63"; // Fjt8Fyeq45

                List<TransferProperty> listProperty = new List<TransferProperty>();
                // считать настройки
                try
                {
                    host = ConfigurationManager.AppSettings["Host"].ToString();
                    port = int.Parse(ConfigurationManager.AppSettings["Port"].ToString());
                    user = ConfigurationManager.AppSettings["User"].ToString();
                    psw = ConfigurationManager.AppSettings["PSW"].ToString();

                    listProperty.Add(new TransferProperty()
                    {
                        pathHost = ConfigurationManager.AppSettings["fromPathHostTransferApproaches"].ToString(),
                        filtrHost = ConfigurationManager.AppSettings["FileFiltrHostTransferApproaches"].ToString(),
                        pathReceiver = ConfigurationManager.AppSettings["toDirPathTransferApproaches"].ToString(),
                        pathTempReceiver = ConfigurationManager.AppSettings["toTMPDirPathTransferApproaches"].ToString(),
                        receiverDelete = bool.Parse(ConfigurationManager.AppSettings["DeleteFileHostTransferApproaches"].ToString()),
                        receiverRewrite = bool.Parse(ConfigurationManager.AppSettings["RewriteFileTransferApproaches"].ToString())
                    });
                    listProperty.Add(new TransferProperty()
                    {
                        pathHost = ConfigurationManager.AppSettings["fromPathHostTransferArrival"].ToString(),
                        filtrHost = ConfigurationManager.AppSettings["FileFiltrHostTransferArrival"].ToString(),
                        pathReceiver = ConfigurationManager.AppSettings["toDirPathTransferArrival"].ToString(),
                        pathTempReceiver = ConfigurationManager.AppSettings["toTMPDirPathTransferArrival"].ToString(),
                        receiverDelete = bool.Parse(ConfigurationManager.AppSettings["DeleteFileHostTransferArrival"].ToString()),
                        receiverRewrite = bool.Parse(ConfigurationManager.AppSettings["RewriteFileTransferArrival"].ToString())
                    });
                }
                catch (Exception ex)
                {
                    ex.ExceptionLog(String.Format("Ошибка выполнения считывания настроек потока {0}, сервиса {1}", service.ToString(), servece_owner), servece_owner, eventID);
                }
                List<int> count_copy = null;
                lock (locker_xml_file)
                {
                    lock (locker_txt_file)
                    {
                        // подключится считать и закрыть соединение
                        SFTPTransfer csftp = new SFTPTransfer(host, port, user, psw, service);
                        count_copy = csftp.CopyToDir(listProperty);
                    }
                }
                TimeSpan ts = DateTime.Now - dt_start;
                string mes_service_exec = String.Format("Поток {0} сервиса {1} - время выполнения: {2}:{3}:{4}({5}), код выполнения: count_copy:{6}", service.ToString(), servece_owner, ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds, count_copy.IntsToString(';'));
                mes_service_exec.InformationLog(servece_owner, eventID);
                int res = 0;
                if (count_copy != null)
                {
                    foreach (int result in count_copy)
                    {
                        if (result < 0) { res = result; break; }
                        if (result > 0) { res += result; }
                    }
                }
                service.ServicesToLog(service.ToString() + " - выполнен.", dt_start, DateTime.Now, res);
            }
            catch (ThreadAbortException exc)
            {
                String.Format("Поток {0} сервиса {1} - прерван по событию ThreadAbortException={2}", service.ToString(), servece_owner, exc).WarningLog(servece_owner, eventID);
            }
            catch (Exception ex)
            {
                ex.ExceptionLog(String.Format("Ошибка выполнения потока {0} сервиса {1}", service.ToString(), servece_owner), servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - завершен с ошибкой.", dt_start, DateTime.Now, -1);

            }
        }
        #endregion

        #region Metrans_TransferApproaches
        /// <summary>
        /// Запустить поток переноса вагонов на подходах
        /// </summary>
        /// <returns></returns>
        public bool Start_TransferApproaches()
        {
            service service = service.Metrans_TransferApproaches;
            string mes_service_start = String.Format("Поток : {0} сервиса : {1}", service.ToString(), servece_owner);
            try
            {
                if ((thTransferApproaches == null) || (!thTransferApproaches.IsAlive && thTransferApproaches.ThreadState == ThreadState.Stopped))
                {
                    thTransferApproaches = new Thread(TransferApproaches);
                    thTransferApproaches.Name = service.ToString();
                    thTransferApproaches.Start();
                }
                return thTransferApproaches.IsAlive;
            }
            catch (Exception ex)
            {
                mes_service_start += " - ошибка запуска.";
                ex.ExceptionLog(mes_service_start, servece_owner, eventID);
                return false;
            }

        }
        /// <summary>
        /// Поток переноса вагонов на подходах
        /// </summary>
        private static void TransferApproaches()
        {
            service service = service.Metrans_TransferApproaches;
            DateTime dt_start = DateTime.Now;
            try
            {
                string toTMPDirPath = @"C:\RailWay\temp_txt";
                bool deleteFileMT = true;
                // считать настройки
                try
                {
                    // Путь к временной папки для записи файлов из host для дальнейшей обработки
                    toTMPDirPath = ConfigurationManager.AppSettings["toTMPDirPathTransferApproaches"].ToString();
                    // Признак удалять файлы после переноса                        
                    deleteFileMT = bool.Parse(ConfigurationManager.AppSettings["DeleteFileTransferApproaches"].ToString());
                }
                catch (Exception ex)
                {
                    ex.ExceptionLog(String.Format("Ошибка выполнения считывания настроек потока {0}, сервиса {1}", service.ToString(), servece_owner), servece_owner, eventID);
                }
                int res_transfer = 0;
                lock (locker_txt_file)
                {
                    MTTransfer mtt = new MTTransfer(service);
                    mtt.FromPath = toTMPDirPath;
                    mtt.DeleteFile = deleteFileMT;
                    res_transfer = mtt.TransferApproaches();
                }
                TimeSpan ts = DateTime.Now - dt_start;
                string mes_service_exec = String.Format("Поток {0} сервиса {1} - время выполнения: {2}:{3}:{4}({5}), код выполнения: res_transfer:{6}", service.ToString(), servece_owner, ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds, res_transfer);
                mes_service_exec.InformationLog(servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - выполнен.", dt_start, DateTime.Now, res_transfer);
            }
            catch (ThreadAbortException exc)
            {
                String.Format("Поток {0} сервиса {1} - прерван по событию ThreadAbortException={2}", service.ToString(), servece_owner, exc).WarningLog(servece_owner, eventID);
            }
            catch (Exception ex)
            {
                ex.ExceptionLog(String.Format("Ошибка выполнения потока {0} сервиса {1}", service.ToString(), servece_owner), servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - завершен с ошибкой.", dt_start, DateTime.Now, -1);

            }
        }
        #endregion

        #region Metrans_TransferArrival
        /// <summary>
        /// Запустить поток переноса вагонов по прибытию
        /// </summary>
        /// <param name="delay"></param>
        /// <returns></returns>
        public bool Start_TransferArrival()
        {
            service service = service.Metrans_TransferArrival;
            string mes_service_start = String.Format("Поток : {0} сервиса : {1}", service.ToString(), servece_owner);
            try
            {
                if ((thTransferArrival == null) || (!thTransferArrival.IsAlive && thTransferArrival.ThreadState == ThreadState.Stopped))
                {
                    thTransferArrival = new Thread(TransferArrival);
                    thTransferArrival.Name = service.ToString();
                    thTransferArrival.Start();
                }
                return thTransferApproaches.IsAlive;
            }
            catch (Exception ex)
            {
                mes_service_start += " - ошибка запуска.";
                ex.ExceptionLog(mes_service_start, servece_owner, eventID);
                return false;
            }
        }
        /// <summary>
        /// Поток переноса вагонов по прибытию
        /// </summary>
        private static void TransferArrival()
        {
            service service = service.Metrans_TransferArrival;
            DateTime dt_start = DateTime.Now;
            try
            {
                bool arrivalToRailWay = true;
                string toTMPDirPath = @"C:\RailWay\temp_xml";
                bool deleteFileMT = true;
                int dayrangeArrivalCars = 10;
                // считать настройки
                try
                {
                    arrivalToRailWay = bool.Parse(ConfigurationManager.AppSettings["ArrivalToRailWay"].ToString());
                    // Путь к временной папки для записи файлов из host для дальнейшей обработки
                    toTMPDirPath = ConfigurationManager.AppSettings["toTMPDirPathTransferArrival"].ToString();
                    // Признак удалять файлы после переноса
                    deleteFileMT = bool.Parse(ConfigurationManager.AppSettings["DeleteFileTransferArrival"].ToString());
                    // Период для определения незакрытого состава и вагона 
                    dayrangeArrivalCars = int.Parse(ConfigurationManager.AppSettings["DayRangeArrivalCars"].ToString());
                }
                catch (Exception ex)
                {
                    ex.ExceptionLog(String.Format("Ошибка выполнения считывания настроек потока {0}, сервиса {1}", service.ToString(), servece_owner), servece_owner, eventID);
                }
                int res_transfer = 0;
                lock (locker_xml_file)
                {
                    MTTransfer mtt = new MTTransfer(service);
                    mtt.DayRangeArrivalCars = dayrangeArrivalCars;
                    mtt.ArrivalToRailWay = arrivalToRailWay;
                    mtt.FromPath = toTMPDirPath;
                    mtt.DeleteFile = deleteFileMT;
                    res_transfer = mtt.TransferArrival();
                }
                TimeSpan ts = DateTime.Now - dt_start;
                string mes_service_exec = String.Format("Поток {0} сервиса {1} - время выполнения: {2}:{3}:{4}({5}), код выполнения: res_transfer:{6}.", service.ToString(), servece_owner, ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds, res_transfer);
                mes_service_exec.InformationLog(servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - выполнен.", dt_start, DateTime.Now, res_transfer);
            }
            catch (ThreadAbortException exc)
            {
                String.Format("Поток {0} сервиса {1} - прерван по событию ThreadAbortException={2}", service.ToString(), servece_owner, exc).WarningLog(servece_owner, eventID);
            }
            catch (Exception ex)
            {
                ex.ExceptionLog(String.Format("Ошибка выполнения цикла переноса, потока {0} сервис {1}", service.ToString(), servece_owner), servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - завершен с ошибкой.", dt_start, DateTime.Now, -1);
            }
        }
        #endregion

        #region Metrans_TransferWT
        /// <summary>
        /// Запустить поток переноса вагонов по прибытию
        /// </summary>
        /// <param name="delay"></param>
        /// <returns></returns>
        public bool Start_TransferWT()
        {
            service service = service.Metrans_TransferWT;
            string mes_service_start = String.Format("Поток : {0} сервиса : {1}", service.ToString(), servece_owner);
            try
            {
                if ((thTransferWT == null) || (!thTransferWT.IsAlive && thTransferWT.ThreadState == ThreadState.Stopped))
                {
                    thTransferWT = new Thread(TransferWT);
                    thTransferWT.Name = service.ToString();
                    thTransferWT.Start();
                }
                return thTransferWT.IsAlive;
            }
            catch (Exception ex)
            {
                mes_service_start += " - ошибка запуска.";
                ex.ExceptionLog(mes_service_start, servece_owner, eventID);
                return false;
            }
        }
        /// <summary>
        /// Поток переноса информации об вагонах по которым установленно слижение в MT и формирование циклограммы
        /// </summary>
        private static void TransferWT()
        {
            service service = service.Metrans_TransferWT;
            DateTime dt_start = DateTime.Now;
            try
            {
                DateTime datetime_start_new_tracking = new DateTime(2019, 01, 01, 0, 0, 0);
                string url_wagons_tracking = @"https://inform.umtrans.com.ua";
                string user_wagons_tracking = "Arcelor1";
                string psw_wagons_tracking = "12345678-";
                string api_wagons_tracking = @"/api/WagonsTracking";

                // считать настройки
                try
                {
                    // Если нет перенесем настройки в БД
                    datetime_start_new_tracking = DateTime.Parse(ConfigurationManager.AppSettings["DateTimeStartNewTracking"].ToString());
                    url_wagons_tracking = ConfigurationManager.AppSettings["WebApiMTURL"].ToString();
                    user_wagons_tracking = ConfigurationManager.AppSettings["WebApiMTUser"].ToString();
                    psw_wagons_tracking = ConfigurationManager.AppSettings["WebApiMTPSW"].ToString();
                    api_wagons_tracking = ConfigurationManager.AppSettings["WebApiMTApi"].ToString();   
                }
                catch (Exception ex)
                {
                    ex.ExceptionLog(String.Format("Ошибка выполнения считывания настроек потока {0}, сервиса {1}", service.ToString(), servece_owner), servece_owner, eventID);
                }
                int res_transfer = 0;
                //int res_transfer_cycle = 0;

                MTTransfer mtt = new MTTransfer(service);
                mtt.DateTimeStartNewTracking = datetime_start_new_tracking;
                mtt.URLWagonsTracking = url_wagons_tracking;
                mtt.UserWagonsTracking = user_wagons_tracking;
                mtt.PSWWagonsTracking = psw_wagons_tracking;
                mtt.APIWagonsTracking = api_wagons_tracking;
                res_transfer = mtt.TransferWagonsTracking();        // Перенос данных
                //res_transfer_cycle = mtt.TransferWTCycle();     // TODO: Добавить Формироание циклограмм
                TimeSpan ts = DateTime.Now - dt_start;
                string mes_service_exec = String.Format("Поток {0} сервиса {1} - время выполнения: {2}:{3}:{4}({5}), код выполнения: res_transfer:{6}, res_transfer_cycle:{7}.", service.ToString(), servece_owner, ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds, res_transfer, 0);
                mes_service_exec.InformationLog(servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - выполнен.", dt_start, DateTime.Now, res_transfer);
            }
            catch (ThreadAbortException exc)
            {
                String.Format("Поток {0} сервиса {1} - прерван по событию ThreadAbortException={2}", service.ToString(), servece_owner, exc).WarningLog(servece_owner, eventID);
            }
            catch (Exception ex)
            {
                ex.ExceptionLog(String.Format("Ошибка выполнения цикла переноса, потока {0} сервис {1}", service.ToString(), servece_owner), servece_owner, eventID);
                service.ServicesToLog(service.ToString() + " - завершен с ошибкой.", dt_start, DateTime.Now, -1);
            }
        }
        #endregion



    }
}
