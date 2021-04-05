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
        //private service thread_transfer_outgoing_kis = service.IDS_TransferOutgoingOfKIS;
        private service thread_update_incoming_supply = service.IDS_UpdateIncomingSupply;

        //private int interval_transfer_outgoing_kis = 3600; //  1раз в час
        private int interval_update_incoming_supply = 3600; //  1раз в час

        //bool active_transfer_outgoing_kis = true;
        bool active_update_incoming_supply = true;

        //System.Timers.Timer timer_services = new System.Timers.Timer();
        //System.Timers.Timer timer_services_outgoing_kis = new System.Timers.Timer();
        System.Timers.Timer timer_services_update_incoming_supply = new System.Timers.Timer();


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
                //this.interval_transfer_outgoing_kis = int.Parse(ConfigurationManager.AppSettings["IntervalTransferOutgoingOfKIS"].ToString());
                this.interval_update_incoming_supply = int.Parse(ConfigurationManager.AppSettings["IntervalUpdateIncomingSupply"].ToString());
                // состояние активности
                //this.active_transfer_outgoing_kis = bool.Parse(ConfigurationManager.AppSettings["ActiveTransferOutgoingOfKIS"].ToString());
                this.active_update_incoming_supply = bool.Parse(ConfigurationManager.AppSettings["ActiveUpdateIncomingSupply"].ToString());
                //this.active_close_approaches = RWSetting.GetDB_Config_DefaultSetting("ActiveCloseApproachesCars", this.thread_close_approaches, this.active_close_approaches, true);

                // Настроем таймер контроля выполнения сервиса
                //timer_services.Interval = 30000;
                //timer_services.Elapsed += new System.Timers.ElapsedEventHandler(this.OnTimerServices);

                //timer_services_outgoing_kis.Interval = this.interval_transfer_outgoing_kis * 1000;
                //timer_services_outgoing_kis.Elapsed += new System.Timers.ElapsedEventHandler(this.OnTimerServices_TransferOutgoingOfKIS);

                timer_services_update_incoming_supply.Interval = this.interval_update_incoming_supply * 1000;
                timer_services_update_incoming_supply.Elapsed += new System.Timers.ElapsedEventHandler(this.OnTimerServices_UpdateIncomingSupply);
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
            //RunTimer_TransferOutgoingOfKIS();
            RunTimer_UpdateIncomingSupply();
            //RunTimerCloseApproachesCars();
            //TODO: Добавить запуск других таймеров
            //...............


            // Update the service state to Running.
            serviceStatus.dwCurrentState = ServiceState.SERVICE_RUNNING;
            SetServiceStatus(this.ServiceHandle, ref serviceStatus);

            // Отправить сообщение
            string message = String.Format("Сервис : {0} - запущен.", this.servece_name);
            message.WarningLog(servece_name, eventID);message.EventLog(EventStatus.Ok, servece_name, eventID);
            //message = String.Format("Интервал выполнения сервиса {0}-{1} сек.", this.thread_transfer_outgoing_kis, this.interval_transfer_outgoing_kis);
            //message.WarningLog(servece_name, eventID);message.EventLog(EventStatus.Ok, servece_name, eventID);
            message = String.Format("Интервал выполнения сервиса {0}-{1} сек.", this.thread_update_incoming_supply, this.interval_update_incoming_supply);
            message.WarningLog(servece_name, eventID);message.EventLog(EventStatus.Ok, servece_name, eventID);

            //String.Format(" сервиса {0}-{1} сек.,", this.thread_close_approaches, this.interval_close_approaches);
            // лог запуска
            //this.thread_host.WriteLogStatusServices();
            //this.thread_approaches.WriteLogStatusServices();
            //this.thread_arrival.WriteLogStatusServices();
            //this.thread_tracking.WriteLogStatusServices();
            //this.thread_close_approaches.WriteLogStatusServices();


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

        #region IDS_TransferOutgoingOfKIS
        //protected void Start_TransferOutgoingOfKIS(bool active)
        //{
        //    if (active)
        //    {
        //        ids_th.Start_TransferOutgoingOfKIS();
        //    }
        //}

        //protected void Start_TransferOutgoingOfKIS()
        //{
        //    bool active = bool.Parse(ConfigurationManager.AppSettings["ActiveTransferOutgoingOfKIS"].ToString());
        //    Start_TransferOutgoingOfKIS(active);
        //}

        //protected void RunTimer_TransferOutgoingOfKIS()
        //{
        //    Start_TransferOutgoingOfKIS();
        //    timer_services_outgoing_kis.Start();
        //}

        //private void OnTimerServices_TransferOutgoingOfKIS(object sender, System.Timers.ElapsedEventArgs args)
        //{
        //    //String.Format("Сервис : {0} сработал таймер OnTimerServicesArrival.", this.servece_name).WriteInformation(servece_name, eventID);
        //    try
        //    {
        //        bool active = bool.Parse(ConfigurationManager.AppSettings["ActiveTransferOutgoingOfKIS"].ToString());
        //        Start_TransferOutgoingOfKIS(active);
        //        if (active != this.active_transfer_outgoing_kis)
        //        {
        //            this.active_transfer_outgoing_kis = active;
        //            string mes_service_start = String.Format("Сервис : {0}, выполнение потока {1} - {2}", this.servece_name, this.thread_transfer_outgoing_kis, active ? "возабновленно" : "остановленно");
        //            mes_service_start.EventLog(EventStatus.Ok, servece_name, eventID);
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionLog(String.Format("OnTimerServices_TransferOutgoingOfKIS(sender={0}, args={1})", sender, args.ToString()), this.servece_name, eventID);
        //    }
        //}
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

    }
}
