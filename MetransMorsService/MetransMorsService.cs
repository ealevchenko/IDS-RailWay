﻿using IDSLogs.Enum;
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
using MT;
using System.Configuration;

namespace MetransMorsService
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
    
    public partial class MetransMorsService : ServiceBase
    {
        private eventID eventID = eventID.Metrans;
        private service servece_name = service.Metrans;
        private service thread_tracking = service.Metrans_TransferWT;

        private int interval_transfer_tracking = 600; // секунд
        //private int interval_close_approaches = 3600; // 1раз в час

        bool active_transfer_tracking = true;
        //bool active_close_approaches = true;

        System.Timers.Timer timer_services_tracking = new System.Timers.Timer();
        //System.Timers.Timer timer_services_close_approaches = new System.Timers.Timer();

        private MTThread mtt = new MTThread(service.Metrans);

        
        
        [DllImport("advapi32.dll", SetLastError = true)]
        private static extern bool SetServiceStatus(System.IntPtr handle, ref ServiceStatus serviceStatus);
        
        public MetransMorsService()
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
                this.interval_transfer_tracking = int.Parse(ConfigurationManager.AppSettings["IntervalTransferWT"].ToString());
                //this.interval_close_approaches = RWSetting.GetDB_Config_DefaultSetting("IntervalCloseApproachesCars", this.thread_close_approaches, this.interval_close_approaches, true);

                // состояние активности
                this.active_transfer_tracking = bool.Parse(ConfigurationManager.AppSettings["ActiveTransferWT"].ToString());
                //this.active_close_approaches = RWSetting.GetDB_Config_DefaultSetting("ActiveCloseApproachesCars", this.thread_close_approaches, this.active_close_approaches, true);

                // Настроем таймер контроля выполнения сервиса
                //timer_services.Interval = 30000;

                timer_services_tracking.Interval = this.interval_transfer_tracking * 1000;
                timer_services_tracking.Elapsed += new System.Timers.ElapsedEventHandler(this.OnTimerServices_TransferWT);

                //timer_services_close_approaches.Interval = this.interval_close_approaches * 1000;
                //timer_services_close_approaches.Elapsed += new System.Timers.ElapsedEventHandler(this.OnTimerServicesCloseApproachesCars);

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
            RunTimer_TransferWT();
            //RunTimerCloseApproachesCars();
            //TODO: Добавить запуск других таймеров
            //...............


            // Update the service state to Running.
            serviceStatus.dwCurrentState = ServiceState.SERVICE_RUNNING;
            SetServiceStatus(this.ServiceHandle, ref serviceStatus);

            // Отправить сообщение
            string message = String.Format("Сервис : {0} - запущен.", this.servece_name);
            message.WarningLog(servece_name, eventID);message.EventLog(EventStatus.Ok, servece_name, eventID);
            message = String.Format("Интервал выполнения сервиса {0}-{1} сек.", this.thread_tracking, this.interval_transfer_tracking);
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

        #region Metrans_TransferWT
        protected void Start_TransferWT(bool active)
        {
            if (active)
            {
                mtt.Start_TransferWT();
            }
        }

        protected void Start_TransferWT()
        {
            bool active = bool.Parse(ConfigurationManager.AppSettings["ActiveTransferWT"].ToString());
            Start_TransferWT(active);
        }

        protected void RunTimer_TransferWT()
        {
            Start_TransferWT();
            timer_services_tracking.Start();
        }

        private void OnTimerServices_TransferWT(object sender, System.Timers.ElapsedEventArgs args)
        {
            //String.Format("Сервис : {0} сработал таймер OnTimerServicesArrival.", this.servece_name).WriteInformation(servece_name, eventID);
            try
            {
                bool active = bool.Parse(ConfigurationManager.AppSettings["ActiveTransferWT"].ToString());
                Start_TransferWT(active);
                if (active != this.active_transfer_tracking)
                {
                    this.active_transfer_tracking = active;
                    string mes_service_start = String.Format("Сервис : {0}, выполнение потока {1} - {2}", this.servece_name, this.thread_tracking, active ? "возабновленно" : "остановленно");
                    mes_service_start.EventLog(EventStatus.Ok, servece_name, eventID);
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OnTimerServicesTracking(sender={0}, args={1})", sender, args.ToString()), this.servece_name, eventID);
            }
        }
        #endregion

    }
}
