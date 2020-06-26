using IDSLogs.Enum;
using MT;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.TestModule
{
    public class Test_Metrans
    {
        public Test_Metrans() { 
        
        }

        #region MTTransfer

        public void MTTransfer_TransferApproaches()
        {
            MTTransfer mtt = new MTTransfer();
            mtt.FromPath = @"D:\txt_new";
            mtt.DeleteFile = true;
            int res_transfer = mtt.TransferApproaches();
        }

        public void MTTransfer_TransferArrival()
        {
            MTTransfer mtt = new MTTransfer();
            mtt.DayRangeArrivalCars = 10; 
            mtt.ArrivalToRailWay = false;        
            mtt.FromPath = @"D:\xlm_new";
            mtt.DeleteFile = true;
            int res_transfer = mtt.TransferArrival();
        }

        public void MTTransfer_WebApiClientMT()
        {
            WebApiClientMT clientMT = new WebApiClientMT(service.Null);
            //Console.WriteLine(clientMT.wapi.to);
            //EFMetallurgTrans efmt = new EFMetallurgTrans();
            Console.WriteLine("Запрос....");
            //List<WagonsTrackingMT> list1 =  clientMT.GetWagonsTracking();
            List<WagonsTrackingMT> list2 = clientMT.GetWagonsTracking(63532220);
            WagonsTrackingMT last = list2.OrderByDescending(d => d.dt).FirstOrDefault();
            ////List<WagonsTrackingMT> list3 = clientMT.GetWagonsTracking(56858111, DateTime.Now.AddMonths(-1));
            ////List<WagonsTrackingMT> list4 = clientMT.GetWagonsTracking(56858111, DateTime.Now.AddDays(-15), DateTime.Now.AddDays(-5));
            //foreach (WagonsTrackingMT wt in list1)
            //{
            //    Console.WriteLine(wt.nvagon);
            //    //efmt.SaveWagonsTracking(wt);
            //}
        }
        /// <summary>
        /// Перенести состав в систему IDS
        /// </summary>
        public void MTTransfer_InsertIDSArrivalSostav()
        {
            MTTransfer mtt = new MTTransfer();
            mtt.InsertIDSArrivalSostav(5620);
            mtt.InsertIDSArrivalSostav(5621);
        }

        public void MTTransfer_TransferWagonsMotionSignals()
        {
            MTTransfer mtt = new MTTransfer();
            mtt.TransferWagonsMotionSignals();
        }

        public void MTTransfer_TransferWagonsMotionSignalsOfNum()
        {

            MTTransfer mtt = new MTTransfer();
            int result = mtt.TransferWagonsMotionSignals(63532220);
        }


        #endregion

        #region MTThread
        public void MTThread_SFTPTransfer()
        {
            string host = "159.224.194.27";
            int port = 222;
            string user = "arcelors";
            string psw = "$fh#ER2J63"; // Fjt8Fyeq45

            SFTPTransfer csftp = new SFTPTransfer(host, port, user, psw, service.Null);

            List<TransferProperty> listProperty = new List<TransferProperty>();

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

            List<int> count_copy = csftp.CopyToDir(listProperty);
        }

        public void MTThread_Start_TransferWT() { 
            MTThread mtt = new MTThread(service.Metrans);
            mtt.Start_TransferWT();
        
        }

        #endregion
    }
}
