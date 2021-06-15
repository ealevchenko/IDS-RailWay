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
        public Test_Metrans()
        {

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

        public void MTTransfer_TransferArrivalAPI()
        {
            MTTransfer mtt = new MTTransfer(service.Test);
            //mtt.DayRangeArrivalCars = 10;
            //mtt.ArrivalToRailWay = false;
            //mtt.FromPath = @"D:\xlm_new";
            //mtt.DeleteFile = true;
            int res_transfer = mtt.TransferArrivalAPI("https://inform.umtrans.com.ua", "Arcelor1","12345678-","/api/TrainNaturList");
        }

        public void MTTransfer_WebApiClientMT()
        {
            WebApiClientMT clientMT = new WebApiClientMT(service.Null);
            //Console.WriteLine(clientMT.wapi.to);
            //EFMetallurgTrans efmt = new EFMetallurgTrans();
            Console.WriteLine("Запрос....");
            //List<WagonsTrackingMT> list1 =  clientMT.GetWagonsTracking();
            //List<WagonsTrackingMT> list2 = clientMT.GetWagonsTracking(63532220);
            //WagonsTrackingMT last = list2.OrderByDescending(d => d.dt).FirstOrDefault();
            ////List<WagonsTrackingMT> list3 = clientMT.GetWagonsTracking(56858111, DateTime.Now.AddMonths(-1));
            ////List<WagonsTrackingMT> list4 = clientMT.GetWagonsTracking(56858111, DateTime.Now.AddDays(-15), DateTime.Now.AddDays(-5));
            //foreach (WagonsTrackingMT wt in list1)
            //{
            //    Console.WriteLine(wt.nvagon);
            //    //efmt.SaveWagonsTracking(wt);
            //}

            RequestArrivalMT reg_mt = clientMT.GetArrival();

            //List<SostavArrivalMT> list_reg_mt = new List<SostavArrivalMT>();

            //// Сгруппируем по индексу поезда
            //List<IGrouping<string, WagonsArrivalMT>> reg_mt_gr = reg_mt.wagons
            //                .ToList()
            //                .GroupBy(w => w.composition_index)
            //                .ToList();

            //// Пройдемся по путям роспуска
            //foreach (IGrouping<string, WagonsArrivalMT> gr_sostav in reg_mt_gr.ToList())
            //{
            //    string composition_index = gr_sostav.Key;

            //    // Группируем по времени
            //    List<IGrouping<DateTime, WagonsArrivalMT>> sostav_operation_data = gr_sostav
            //        .OrderByDescending(w => w.date_operation)
            //    .ToList()
            //    .GroupBy(w => w.date_operation)
            //    .ToList();

            //    foreach (IGrouping<DateTime, WagonsArrivalMT> operation_data in sostav_operation_data.ToList())
            //    {
            //        DateTime date_operation = operation_data.Key;
            //        // Группируем по операциям
            //        List<IGrouping<string, WagonsArrivalMT>> sostav_operation = operation_data
            //        .ToList()
            //        .GroupBy(w => w.operation)
            //        .ToList();
            //        foreach (IGrouping<string, WagonsArrivalMT> operation in sostav_operation.ToList())
            //        {
            //            string oper = operation.Key;
            //            List<WagonsArrivalMT> list = operation.ToList();

            //            list_reg_mt.Add(new SostavArrivalMT()
            //            {
            //                composition_index = composition_index,
            //                date_operation = date_operation,
            //                operation = oper,
            //                wagons = list.OrderBy(w => w.position).ToList()
            //            });

            //        }
            //    }

            //    //List<WagonsArrivalMT> list_dw = gr_sostav.OrderByDescending(w => w.date_operation).ToList();
            //}


        }
        /// <summary>
        /// Перенести состав в систему IDS
        /// </summary>
        public void MTTransfer_InsertIDSArrivalSostav()
        {
            MTTransfer mtt = new MTTransfer();
            mtt.InsertIDSArrivalSostav(19587);
            mtt.InsertIDSArrivalSostav(19588);
        }

        public void MTTransfer_TransferWagonsMotionSignals()
        {
            MTTransfer mtt = new MTTransfer();
            mtt.TransferWagonsMotionSignals();
        }

        public void MTTransfer_TransferWagonsMotionSignalsOfNum()
        {

            MTTransfer mtt = new MTTransfer();
            int result = mtt.TransferWagonsMotionSignals(63664585);
        }
        /// <summary>
        /// Переписать в прибытие системы ИДС составы и вагоны старт с id_arrived
        /// </summary>
        public void MTTransfer_RewriteIDSArrivalSostav()
        {
            MTTransfer mtt = new MTTransfer();

            long id_arrived_start = 3124;

            EFMT.Concrete.EFArrivalSostav ef_as = new EFMT.Concrete.EFArrivalSostav(new EFMT.Concrete.EFDbContext());
            EFIDS.Concrete.EFArrivalSostav ef_ids_as = new EFIDS.Concrete.EFArrivalSostav(new EFIDS.Concrete.EFDbContext());
            EFIDS.Concrete.EFArrivalCars ef_ids_ac = new EFIDS.Concrete.EFArrivalCars(new EFIDS.Concrete.EFDbContext());


            List<EFMT.Entities.ArrivalSostav> list = ef_as.Context.Where(s => s.id_arrived >= id_arrived_start && s.close == null).OrderBy(c => c.id_arrived).ToList();
            // Удалим сотавы и вагоны
            foreach (EFMT.Entities.ArrivalSostav mt_sost in list)
            {

                EFIDS.Entities.ArrivalSostav ids_st = ef_ids_as.Context.Where(s => s.id_sostav == mt_sost.id).FirstOrDefault();
                if (ids_st != null)
                {
                    List<EFIDS.Entities.ArrivalCars> list_ids_car = ef_ids_ac.Context.Where(c => c.id_arrival == ids_st.id).ToList();

                    List<long> list_id_car = list_ids_car.Select(c => c.id).ToList();

                    ef_ids_ac.Delete(list_id_car);
                    int res_del_cars = ef_ids_ac.Save();
                    ef_ids_as.Delete(ids_st.id);
                    int res_del_sost = ef_ids_as.Save();
                    Console.WriteLine("Удалил вагоны {0}, удалил состав {1}", res_del_cars, res_del_sost);
                }
                else
                {
                    Console.WriteLine("Состава {0}, нет в системе ИДС", mt_sost.id);
                }
            }

            // Перезапишим составы и вагоны 
            foreach (EFMT.Entities.ArrivalSostav mt_sost in list)
            {
                int res_rew = mtt.InsertIDSArrivalSostav(mt_sost.id);
                Console.WriteLine("Состав {0}, перезаписан в системе ИДС, результат {1}", mt_sost.id, res_rew);

            }
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

        public void MTThread_Start_TransferWT()
        {
            MTThread mtt = new MTThread(service.Metrans);
            mtt.Start_TransferWT();

        }

        #endregion
    }
}
