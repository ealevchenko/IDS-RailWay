using IDSLogs.Enum;
using IDSLogs;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using IDS;

namespace IDSService
{
    public enum ServiceState
    {
        SERVICE_STOPPED = 0x00000001,
        SERVICE_START_PENDING = 0x00000002,
        SERVICE_STOP_PENDING = 0x00000003,
        SERVICE_RUNNING = 0x00000004,
        SERVICE_CONTINUE_PENDING = 0x00000005,
        SERVICE_PAUSE_PENDING = 0x00000006,
        SERVICE_PAUSED = 0x00000007,
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct ServiceStatus
    {
        public int dwServiceType;
        public ServiceState dwCurrentState;
        public int dwControlsAccepted;
        public int dwWin32ExitCode;
        public int dwServiceSpecificExitCode;
        public int dwCheckPoint;
        public int dwWaitHint;
    };

    public partial class IDSService : ServiceBase
    {
        private eventID eventID = eventID.IDS;
        private service servece_name = service.IDS;

        private service thread_update_incoming_supply = service.IDS_UpdateIncomingSupply;
        private service thread_update_outgoing_supply = service.IDS_UpdateOutgoingSupply;
        private service thread_update_arrival_epd = service.IDS_UpdateArrivalEPD;
        private service thread_update_sending_epd = service.IDS_UpdateSendingEPD;


        private int interval_update_incoming_supply = 3600; //  1раз в час
        private int interval_update_outgoing_supply = 3600; //  1раз в час
        private int interval_update_arrival_epd = 3600; //  1раз в час
        private int interval_update_sending_epd = 3600; //  1раз в час


        bool active_update_incoming_supply = true;
        bool active_update_outgoing_supply = true;
        bool active_update_arrival_epd = true;
        bool active_update_sending_epd = true;

        //System.Timers.Timer timer_services = new System.Timers.Timer();

        System.Timers.Timer timer_services_update_incoming_supply = new System.Timers.Timer();
        System.Timers.Timer timer_services_update_outgoing_supply = new System.Timers.Timer();
        System.Timers.Timer timer_services_update_arrival_epd = new System.Timers.Timer();
        System.Timers.Timer timer_services_update_sending_epd = new System.Timers.Timer();

        private IDSThread ids_th = new IDSThread(service.IDS);

        [DllImport("advapi32.dll", SetLastError = true)]
        private static extern bool SetServiceStatus(System.IntPtr handle, ref ServiceStatus serviceStatus);

        public IDSService()
        {
            InitializeComponent();
            InitializeService();
        }

        #region Управление службой

        private void InitializeService()
        {
            try
            {
                // интервалы
                this.interval_update_incoming_supply = int.Parse(ConfigurationManager.AppSettings["IntervalUpdateIncomingSupply"].ToString());
                this.interval_update_outgoing_supply = int.Parse(ConfigurationManager.AppSettings["IntervalUpdateOutgoingSupply"].ToString());
                this.interval_update_arrival_epd = int.Parse(ConfigurationManager.AppSettings["IntervalUpdateArrivalEPD"].ToString());
                this.interval_update_sending_epd = int.Parse(ConfigurationManager.AppSettings["IntervalUpdateSendingEPD"].ToString());
                // состояние активности
                this.active_update_incoming_supply = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateIncomingSupply"].ToString());
                this.active_update_outgoing_supply = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateOutgoingSupply"].ToString());
                this.active_update_arrival_epd = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateArrivalEPD"].ToString());
                this.active_update_sending_epd = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateSendingEPD"].ToString());


                //this.active_close_approaches = RWSetting.GetDB_Config_DefaultSetting("ActiveCloseApproachesCars", this.thread_close_approaches, this.active_close_approaches, true);

                // Настроем таймер контроля выполнения сервиса
                //timer_services.Interval = 30000;
                //timer_services.Elapsed += new System.Timers.ElapsedEventHandler(this.OnTimerServices);

                timer_services_update_incoming_supply.Interval = this.interval_update_incoming_supply * 1000;
                timer_services_update_incoming_supply.Elapsed += new System.Timers.ElapsedEventHandler(this.OnTimerServices_UpdateIncomingSupply);

                timer_services_update_outgoing_supply.Interval = this.interval_update_outgoing_supply * 1000;
                timer_services_update_outgoing_supply.Elapsed += new System.Timers.ElapsedEventHandler(this.OnTimerServices_UpdateOutgoingSupply);

                timer_services_update_arrival_epd.Interval = this.interval_update_arrival_epd * 1000;
                timer_services_update_arrival_epd.Elapsed += new System.Timers.ElapsedEventHandler(this.OnTimerServices_UpdateArrivalEPD);

                timer_services_update_sending_epd.Interval = this.interval_update_sending_epd * 1000;
                timer_services_update_sending_epd.Elapsed += new System.Timers.ElapsedEventHandler(this.OnTimerServices_UpdateSendingEPD);
                //Добавить инициализацию других таймеров
                //...............
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("InitializeService()"), this.servece_name, eventID);
                return;
            }
        }

        protected override void OnStart(string[] args)
        {
            // Update the service state to Start Pending.
            ServiceStatus serviceStatus = new ServiceStatus();
            serviceStatus.dwCurrentState = ServiceState.SERVICE_START_PENDING;
            serviceStatus.dwWaitHint = 100000;
            SetServiceStatus(this.ServiceHandle, ref serviceStatus);

            // Запустить таймер контроля сервиса
            //timer_services.Start();
            // Запустить таймера потоков
            RunTimer_UpdateIncomingSupply();
            RunTimer_UpdateOutgoingSupply();
            RunTimer_UpdateArrivalEPD();
            RunTimer_UpdateSendingEPD();
            //TODO: Добавить запуск других таймеров
            //...............


            // Update the service state to Running.
            serviceStatus.dwCurrentState = ServiceState.SERVICE_RUNNING;
            SetServiceStatus(this.ServiceHandle, ref serviceStatus);

            // Отправить сообщение
            string message = String.Format("Сервис : {0} - запущен.", this.servece_name);
            message.WarningLog(servece_name, eventID); message.EventLog(EventStatus.Ok, servece_name, eventID);
            message = String.Format("Интервал выполнения сервиса {0}-{1} сек.", this.thread_update_incoming_supply, this.interval_update_incoming_supply);
            message.WarningLog(servece_name, eventID); message.EventLog(EventStatus.Ok, servece_name, eventID);
            message = String.Format("Интервал выполнения сервиса {0}-{1} сек.", this.thread_update_outgoing_supply, this.interval_update_outgoing_supply);
            message.WarningLog(servece_name, eventID); message.EventLog(EventStatus.Ok, servece_name, eventID);
            message = String.Format("Интервал выполнения сервиса {0}-{1} сек.", this.thread_update_arrival_epd, this.interval_update_arrival_epd);
            message.WarningLog(servece_name, eventID); message.EventLog(EventStatus.Ok, servece_name, eventID);
            message = String.Format("Интервал выполнения сервиса {0}-{1} сек.", this.thread_update_sending_epd, this.interval_update_sending_epd);
            message.WarningLog(servece_name, eventID); message.EventLog(EventStatus.Ok, servece_name, eventID);
        }

        protected override void OnStop()
        {


            // Update the service state to Stop Pending.
            ServiceStatus serviceStatus = new ServiceStatus();
            serviceStatus.dwCurrentState = ServiceState.SERVICE_STOP_PENDING;
            serviceStatus.dwWaitHint = 100000;
            SetServiceStatus(this.ServiceHandle, ref serviceStatus);

            // Update the service state to Stopped.
            serviceStatus.dwCurrentState = ServiceState.SERVICE_STOPPED;
            SetServiceStatus(this.ServiceHandle, ref serviceStatus);

            // Отправить сообщение
            string mes_service_stop = String.Format("Сервис : {0} - остановлен.", this.servece_name);
            mes_service_stop.EventLog(EventStatus.Ok, servece_name, eventID);

        }

        #endregion

        #region IDS_UpdateIncomingSupply
        protected void Start_UpdateIncomingSupply(bool active)
        {
            if (active)
            {
                ids_th.Start_UpdateIncomingSupply();
            }
        }

        protected void Start_UpdateIncomingSupply()
        {
            bool active = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateIncomingSupply"].ToString());
            Start_UpdateIncomingSupply(active);
        }

        protected void RunTimer_UpdateIncomingSupply()
        {
            Start_UpdateIncomingSupply();
            timer_services_update_incoming_supply.Start();
        }

        private void OnTimerServices_UpdateIncomingSupply(object sender, System.Timers.ElapsedEventArgs args)
        {
            //String.Format("Сервис : {0} сработал таймер OnTimerServicesArrival.", this.servece_name).WriteInformation(servece_name, eventID);
            try
            {
                bool active = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateIncomingSupply"].ToString());
                Start_UpdateIncomingSupply(active);
                if (active != this.active_update_incoming_supply)
                {
                    this.active_update_incoming_supply = active;
                    string mes_service_start = String.Format("Сервис : {0}, выполнение потока {1} - {2}", this.servece_name, this.thread_update_incoming_supply, active ? "возабновленно" : "остановленно");
                    mes_service_start.EventLog(EventStatus.Ok, servece_name, eventID);
                }
            }
            catch (Exception e)
            {
                e.ExceptionLog(String.Format("OnTimerServices_UpdateIncomingSupply(sender={0}, args={1})", sender, args.ToString()), this.servece_name, eventID);
            }
        }
        #endregion

        #region IDS_UpdateOutgoingSupply
        protected void Start_UpdateOutgoingSupply(bool active)
        {
            if (active)
            {
                ids_th.Start_UpdateOutgoingSupply();
            }
        }

        protected void Start_UpdateOutgoingSupply()
        {
            bool active = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateOutgoingSupply"].ToString());
            Start_UpdateOutgoingSupply(active);
        }

        protected void RunTimer_UpdateOutgoingSupply()
        {
            Start_UpdateOutgoingSupply();
            timer_services_update_outgoing_supply.Start();
        }

        private void OnTimerServices_UpdateOutgoingSupply(object sender, System.Timers.ElapsedEventArgs args)
        {
            //String.Format("Сервис : {0} сработал таймер OnTimerServicesArrival.", this.servece_name).WriteInformation(servece_name, eventID);
            try
            {
                bool active = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateOutgoingSupply"].ToString());
                Start_UpdateOutgoingSupply(active);
                if (active != this.active_update_outgoing_supply)
                {
                    this.active_update_outgoing_supply = active;
                    string mes_service_start = String.Format("Сервис : {0}, выполнение потока {1} - {2}", this.servece_name, this.thread_update_outgoing_supply, active ? "возабновленно" : "остановленно");
                    mes_service_start.EventLog(EventStatus.Ok, servece_name, eventID);
                }
            }
            catch (Exception e)
            {
                e.ExceptionLog(String.Format("OnTimerServices_UpdateOutgoingSupply(sender={0}, args={1})", sender, args.ToString()), this.servece_name, eventID);
            }
        }
        #endregion

        #region IDS_UpdateArrivalEPD
        protected void Start_UpdateArrivalEPD(bool active)
        {
            if (active)
            {
                ids_th.Start_UpdateArrivalEPD();
            }
        }

        protected void Start_UpdateArrivalEPD()
        {
            bool active = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateArrivalEPD"].ToString());
            Start_UpdateArrivalEPD(active);
        }

        protected void RunTimer_UpdateArrivalEPD()
        {
            Start_UpdateArrivalEPD();
            timer_services_update_arrival_epd.Start();
        }

        private void OnTimerServices_UpdateArrivalEPD(object sender, System.Timers.ElapsedEventArgs args)
        {
            //String.Format("Сервис : {0} сработал таймер OnTimerServicesArrival.", this.servece_name).WriteInformation(servece_name, eventID);
            try
            {
                bool active = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateArrivalEPD"].ToString());
                Start_UpdateArrivalEPD(active);
                if (active != this.active_update_arrival_epd)
                {
                    this.active_update_arrival_epd = active;
                    string mes_service_start = String.Format("Сервис : {0}, выполнение потока {1} - {2}", this.servece_name, this.thread_update_arrival_epd, active ? "возабновленно" : "остановленно");
                    mes_service_start.EventLog(EventStatus.Ok, servece_name, eventID);
                }
            }
            catch (Exception e)
            {
                e.ExceptionLog(String.Format("OnTimerServices_UpdateArrivalEPD(sender={0}, args={1})", sender, args.ToString()), this.servece_name, eventID);
            }
        }
        #endregion

        #region IDS_UpdateSendingEPD
        protected void Start_UpdateSendingEPD(bool active)
        {
            if (active)
            {
                ids_th.Start_UpdateSendingEPD();
            }
        }

        protected void Start_UpdateSendingEPD()
        {
            bool active = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateSendingEPD"].ToString());
            Start_UpdateSendingEPD(active);
        }

        protected void RunTimer_UpdateSendingEPD()
        {
            Start_UpdateSendingEPD();
            timer_services_update_sending_epd.Start();
        }

        private void OnTimerServices_UpdateSendingEPD(object sender, System.Timers.ElapsedEventArgs args)
        {
            //String.Format("Сервис : {0} сработал таймер OnTimerServicesSending.", this.servece_name).WriteInformation(servece_name, eventID);
            try
            {
                bool active = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateSendingEPD"].ToString());
                Start_UpdateSendingEPD(active);
                if (active != this.active_update_sending_epd)
                {
                    this.active_update_sending_epd = active;
                    string mes_service_start = String.Format("Сервис : {0}, выполнение потока {1} - {2}", this.servece_name, this.thread_update_sending_epd, active ? "возабновленно" : "остановленно");
                    mes_service_start.EventLog(EventStatus.Ok, servece_name, eventID);
                }
            }
            catch (Exception e)
            {
                e.ExceptionLog(String.Format("OnTimerServices_UpdateSendingEPD(sender={0}, args={1})", sender, args.ToString()), this.servece_name, eventID);
            }
        }
        #endregion

    }
}
