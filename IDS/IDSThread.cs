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

        protected Thread thTransferOutgoingOfKIS = null;
        public bool statusTransferOutgoingOfKIS { get { return thTransferOutgoingOfKIS.IsAlive; } }

        public IDSThread()
        {

        }

        public IDSThread(service servece_name)
        {
            servece_owner = servece_name;
        }

        #region IDS_TransferOutgoingOfKIS
        /// <summary>
        /// Запустить поток переноса вагонов по прибытию
        /// </summary>
        /// <param name="delay"></param>
        /// <returns></returns>
        public bool Start_TransferOutgoingOfKIS()
        {
            service service = service.IDS_TransferOutgoingOfKIS;
            string mes_service_start = String.Format("Поток : {0} сервиса : {1}", service.ToString(), servece_owner);
            try
            {
                if ((thTransferOutgoingOfKIS == null) || (!thTransferOutgoingOfKIS.IsAlive && thTransferOutgoingOfKIS.ThreadState == ThreadState.Stopped))
                {
                    thTransferOutgoingOfKIS = new Thread(TransferOutgoingOfKIS);
                    thTransferOutgoingOfKIS.Name = service.ToString();
                    thTransferOutgoingOfKIS.Start();
                }
                return thTransferOutgoingOfKIS.IsAlive;
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
        private static void TransferOutgoingOfKIS()
        {
            service service = service.IDS_TransferOutgoingOfKIS;
            DateTime dt_start = DateTime.Now;
            try
            {
                int transfer_control_time_interval_kis = 10;
                // считать настройки
                try
                {
                    // Интервал часов контроля до и после текущего времени при переное данных из КИС
                    transfer_control_time_interval_kis = int.Parse(ConfigurationManager.AppSettings["TransferControlTimeIntervalKIS"].ToString());
                }
                catch (Exception ex)
                {
                    ex.ExceptionLog(String.Format("Ошибка выполнения считывания настроек потока {0}, сервиса {1}", service.ToString(), servece_owner), servece_owner, eventID);
                }
                int res_transfer = 0;
                lock (locker_db_outgoing)
                {
                    IDSTransfer ids_tr = new IDSTransfer(service);
                    ids_tr.TransferControlTimeIntervalKIS = transfer_control_time_interval_kis;
                    res_transfer = ids_tr.InsertOutgoingSostavOfKis();
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
    }
}
