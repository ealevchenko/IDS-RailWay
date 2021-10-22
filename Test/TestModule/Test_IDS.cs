using EFIDS.Concrete;
using EFIDS.Entities;
using IDS;
using IDSLogs.Enum;
using IDS.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.TestModule
{
    public class Test_IDS
    {
        public Test_IDS()
        {

        }

        #region IDSTransfer
        public void IDSTransfer_AddArrival()
        {

            IDSTransfer ids = new IDSTransfer(service.Test);
            long res = ids.InsertArrivalSostav(1608, 5620, 3609, "4577-038-4670", new DateTime(2020, 3, 5, 10, 40, 0), null);
            long res1 = ids.InsertArrivalSostav(1608, 5621, 3609, "4577-038-4670", new DateTime(2020, 3, 5, 10, 45, 0), null);
            Console.WriteLine("ID = {0}", res);
        }

        public void IDSTransfer_GetNumDoc()
        {

            IDSTransfer ids = new IDSTransfer(service.Test);
            string res = ids.AddUpdateUZ_DOC_To_DB_IDS(64566136, null);
            Console.WriteLine("num_doc = {0}", res);
        }
        /// <summary>
        /// Тест переноса составов на отправление на УЗ по данным КИС
        /// </summary>
        //public void IDSTransfer_InsertOutgoingSostavOfKis()
        //{

        //    IDSTransfer ids = new IDSTransfer(service.Test);
        //    ids.InsertOutgoingSostavOfKis();
        //}

        public void IDSTransfer_IncomingArrivalSostav()
        {

            IDSTransfer ids = new IDSTransfer(service.Test);
            int res = ids.IncomingArrivalSostav(42407, new List<int> { 63664767 }, @"EUROPE\ealevchenko");
        }

        public void IDSTransfer_IncomingArrivalSostav_All()
        {

            IDSTransfer ids = new IDSTransfer(service.Test);
            int res = ids.IncomingArrivalSostav();
        }
        //public void IDSTransfer_SetStationOutgoingWagonsOfKIS()
        //{

        //    IDSTransfer ids = new IDSTransfer(service.Test);
        //    int res = ids.SetStationOutgoingWagonsOfKIS(513, @"EUROPE\test");
        //}

        ///// <summary>
        ///// Перенос состава на УЗ и закрытие WIR
        ///// </summary>
        //public void IDSTransfer_SendingOutgoingSostav()
        //{

        //    IDSTransfer ids = new IDSTransfer(service.Test);
        //    int res = ids.SendingOutgoingSostav(499, @"EUROPE\test");
        //}
        #endregion

        #region IDS_SAP
        // чтение и обновление сап
        public void IDS_SAP_GetCurrentIncomingSupplyOfWebSAP()
        {

            IDS_SAP ids = new IDS_SAP(service.Test);

            EFSAPIncomingSupply ef_sap = new EFSAPIncomingSupply(new EFDbContext());
            //SAPIncomingSupply sap = new SAPIncomingSupply()
            //{
            //    id = 0,
            //    id_arrival_car = 0,
            //    num = 54905161,
            //    num_doc_uz = "29426762",
            //    create = DateTime.Now,
            //    create_user = "test_sap"
            //};
            SAPIncomingSupply sap = ef_sap.Context.Where(s => s.id == 141716).FirstOrDefault();
            //sap.num = 54905161;
            //sap.num_doc_uz = "29426762";
            SAPIncomingSupply res = ids.GetCurrentIncomingSupplyOfWebSAP(sap);
        }

        public void IDS_SAP_UpdateIncomingSupply()
        {

            EFDbContext context = new EFDbContext();

            IDS_SAP ids = new IDS_SAP(service.Test);
            int result = ids.UpdateListIncomingSupply(new List<int>() { 1, 3, 20, 37, 38, 40 }, @"EUROPE\ealevchenko");

        }

        #endregion

        #region IDSDirectory

        public void IDSDirectory_GetID_Directory_StationOfCodeCS()
        {

            IDSDirectory ids = new IDSDirectory(service.Test);
            int res = ids.GetID_Directory_StationOfCodeCS(873009, true);

        }
        // Тест получение текущего вагона
        public void IDSDirectory_GetCurrentDirectory_CarsOfNum()
        {

            IDSDirectory ids = new IDSDirectory(service.Test);
            //Directory_Wagons res = ids.GetDirectory_WagonsOfNum(50030584, 22,60, 4, "", true, @"EUROPE\ealevchenko", false);

        }

        public void IDSDirectory_IsCorrectNumCar()
        {

            IDSDirectory ids = new IDSDirectory(service.Test);
            bool res = ids.IsCorrectNumCar(12345678);

        }

        public void IDSDirectory_OperationAutoPositionWayOfPark()
        {

            IDSDirectory ids = new IDSDirectory(service.Test);
            EFDbContext context = new EFDbContext();
            int res = ids.OperationAutoPositionWayOfPark(ref context, 23, 161, "test_user");
        }
        public void IDSDirectory_OperationSetPositionWayOfPark()
        {

            IDSDirectory ids = new IDSDirectory(service.Test);
            EFDbContext context = new EFDbContext();
            int res = ids.OperationSetPositionWayOfPark(ref context, 599, 1, "test_user");
        }

        public void IDSDirectory_OperationDown1PositionWayOfPark()
        {

            IDSDirectory ids = new IDSDirectory(service.Test);
            EFDbContext context = new EFDbContext();
            int res = ids.OperationDown1PositionWayOfPark(ref context, 595, "test_user");
        }
        public void IDSDirectory_OperationUp1PositionWayOfPark()
        {

            IDSDirectory ids = new IDSDirectory(service.Test);
            EFDbContext context = new EFDbContext();
            int res = ids.OperationUp1PositionWayOfPark(ref context, 595, "test_user");
        }
        #endregion

        #region IDSMORS
        // Тест Вернуть последнюю обработаную запись ID nолученую их таблицы WT
        public void IDSMORS_GetLastIDWTWagonsMotionSignals()
        {

            IDSMORS ids = new IDSMORS(service.Test);
            long? res = ids.GetLastIDWTWagonsMotionSignals(63664585);

        }
        #endregion

        #region IDS_WIR
        /// <summary>
        /// Перенкмерация с указаной позиции
        /// </summary>
        public void IDS_WIR_RenumberingWagons()
        {

            IDS_WIR ids = new IDS_WIR(service.Test);

            EFDbContext context = new EFDbContext();

            int res = ids.RenumberingWagons(ref context, 111, 1);
            int res_save = context.SaveChanges();

        }
        /// <summary>
        /// операция дислокация
        /// </summary>
        public void IDS_WIR_DislocationWagons()
        {

            IDS_WIR ids = new IDS_WIR(service.Test);

            EFDbContext context = new EFDbContext();

            List<WagonInternalRoutes> wagons = new List<WagonInternalRoutes>();
            List<WagonInternalMovement> list_wim = context.WagonInternalMovement.Where(m => m.id_way == 111 && m.way_end == null).OrderBy(m => m.position).ToList();

            foreach (WagonInternalMovement wim in list_wim)
            {
                if (wim.WagonInternalRoutes.num == 58481748 || wim.WagonInternalRoutes.num == 60381712)

                    wagons.Add(wim.WagonInternalRoutes);

            }

            ResultTransfer res = new ResultTransfer(0);

            res = ids.DislocationWagons(ref context, 111, false, 115, false, DateTime.Now, wagons, "TЭM18-183", "TЭM18-184", "TEST");
            //int res_save = context.SaveChanges();

        }
        // Тест операции дислокации
        public void IDS_WIR_DislocationWagonsOfStation()
        {

            IDS_WIR ids = new IDS_WIR(service.Test);

            EFDbContext context = new EFDbContext();

            List<long> wagons = new List<long>();
            List<WagonInternalMovement> list_wim = context.WagonInternalMovement.Where(m => m.id_way == 111 && m.way_end == null).OrderBy(m => m.position).ToList();

            foreach (WagonInternalMovement wim in list_wim)
            {
                if (wim.WagonInternalRoutes.num == 58484320 || wim.WagonInternalRoutes.num == 53779476)

                    wagons.Add(wim.WagonInternalRoutes.id);

            }


            //int res = ids.DislocationWagonsOfStation(wagons, 111, false, 115, false, DateTime.Now, "TЭM18-183", "TЭM18-184", "TEST");
            //int res_save = context.SaveChanges();

        }
        // Тест операции роспуск
        public void IDS_WIR_DissolutionWagonsOfStation()
        {

            IDS_WIR ids = new IDS_WIR(service.Test);

            EFDbContext context = new EFDbContext();

            List<DissolutionWagon> list_dissolution = new List<DissolutionWagon>();
            list_dissolution.Add(new DissolutionWagon() { wir_id = 41794, position = 2, id_way_dissolution = 214 });
            list_dissolution.Add(new DissolutionWagon() { wir_id = 41795, position = 3, id_way_dissolution = 214 });
            list_dissolution.Add(new DissolutionWagon() { wir_id = 41796, position = 4, id_way_dissolution = 213 });
            list_dissolution.Add(new DissolutionWagon() { wir_id = 41797, position = 5, id_way_dissolution = 214 });
            list_dissolution.Add(new DissolutionWagon() { wir_id = 41798, position = 6, id_way_dissolution = 213 });
            list_dissolution.Add(new DissolutionWagon() { wir_id = 41799, position = 7, id_way_dissolution = 214 });
            list_dissolution.Add(new DissolutionWagon() { wir_id = 41800, position = 8, id_way_dissolution = 213 });



            int res = ids.DissolutionWagonsOfStation(105, list_dissolution, DateTime.Now.AddMinutes(-30), DateTime.Now, "TEST");
            //int res_save = context.SaveChanges();

        }
        // Тест операции отправки
        public void IDS_WIR_SendingWagonsOfStation()
        {

            IDS_WIR ids = new IDS_WIR(service.Test);

            EFDbContext context = new EFDbContext();

            List<ListOperationWagon> list_sending = new List<ListOperationWagon>();
            list_sending.Add(new ListOperationWagon() { wir_id = 45153, position = 1 });
            list_sending.Add(new ListOperationWagon() { wir_id = 45157, position = 2 });
            list_sending.Add(new ListOperationWagon() { wir_id = 45162, position = 3 });
            list_sending.Add(new ListOperationWagon() { wir_id = 45165, position = 4 });

            int res = ids.SendingWagonsOfStation(105, list_sending, 12, 123, DateTime.Now, "TЭM18-183", "TЭM18-184", "TEST");
            //int res_save = context.SaveChanges();

        }
        // Тест операции отправки
        public void IDS_WIR_ArrivalWagonsOfStation()
        {

            IDS_WIR ids = new IDS_WIR(service.Test);

            EFDbContext context = new EFDbContext();

            List<ListOperationWagon> list_sending = new List<ListOperationWagon>();
            list_sending.Add(new ListOperationWagon() { wir_id = 45152, position = 1 });
            list_sending.Add(new ListOperationWagon() { wir_id = 45154, position = 2 });
            list_sending.Add(new ListOperationWagon() { wir_id = 45156, position = 3 });

            int res = ids.ArrivalWagonsOfStation(12, true, list_sending, 494, true, DateTime.Now, "TЭM18-183", "TЭM18-184", "TEST");
            //int res_save = context.SaveChanges();

        }
        /// <summary>
        /// Тест операции вернуть пръедявленый состав
        /// </summary>
        public void IDS_WIR_OperationReturnProvideWagons()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            ResultUpdateWagon res = ids.OperationReturnProvideWagons(62606, "TEST");
        }

        // Тест операции обновления ЭПД 
        public void IDS_WIR_OperationUpdateEPDSendingSostav()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            //OperationResultID res = ids.OperationUpdateEPDSendingSostav(64117, "TEST");
            //OperationResultID res = ids.OperationUpdateEPDSendingSostav(64339, "TEST");
            //OperationResultID res = ids.OperationUpdateEPDSendingSostav(64208, "TEST");
            OperationResultID res = ids.OperationUpdateEPDSendingSostav(64487, "TEST");
        }

        /// <summary>
        /// Тест административной функции закрыть внутренее перемещение
        /// </summary>
        /// <returns></returns>
        public void IDS_WIR_CloseWir()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> list = new List<int>() { 296214 };
            int res = ids.CloseWir(list, DateTime.Now, "Запись закрыта принудительно (очистка согласно положению парка)", @"EUROPE\ealevchenko");
        }
        /// <summary>
        /// Тест административной функции убрать дубликаты
        /// </summary>
        public void IDS_WIR_DeleteDoubleWir()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> list = new List<int>() { 341621, 369293, 369292, 369291, 370859, 370857, 370856, 370852, 370850, 371243, 371244, 371245, 371246, 371247, 371248, 371249, 371250, 371251, 371252, 370949, 370950, 370951, 370954, 370955, 370956, 370964, 370965, 370960, 370961, 370200, 369322, 370985, 370988, 370990, 371280, 371281, 371282, 341621, 369293, 369292, 369291, 370859, 370857, 341621, 370856, 370852, 370850, 371243, 369293, 369292, 371244, 371245, 371246, 371247, 371248, 371249, 369291, 371250, 371251, 371252, 370949, 370950, 370951, 370954, 370955, 370956, 370964, 370965, 370960, 370961, 370200, 369322, 370985, 341621, 369293, 369292, 369291, 371283, 370962, 370966, 370973, 370975, 370979, 370980, 371002, 371004, 371294, 371295, 371296, 371297, 371298, 371299, 371300, 371302, 371303, 370948, 370952, 371322, 371336, 370859, 370857, 370856, 370852, 370850, 371243, 371244, 371245, 371246, 371247, 371248, 371249, 371250, 371251, 371252, 370949, 370950, 370951, 370954, 370955, 370956, 370964, 370965, 370960, 370961, 370200, 369322, 370985, 370988, 370990, 371280, 371281, 371282, 371283, 370962, 370966, 370973, 370975, 370979, 370980, 371002, 371004, 371294, 370988, 370990, 371280, 371281, 371282, 371283, 370962, 370966, 370973, 370975, 370979, 370980, 371002, 371004, 371294, 371295, 371296, 371297, 371298, 371299, 371300, 371302, 371303, 370948, 370952, 371322, 371336, 371295, 371296, 371297, 371298, 371299, 371300, 371302, 371303, 370948, 370952, 371322, 371336 };
            int res = ids.DeleteDoubleWir(list);
        }
        /// <summary>
        /// Административная функция вернуть вагон из отправки
        /// </summary>
        public void IDS_WIR_ReturnWagons()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> list = new List<int>() { 60897915, 54707914, 62208756 };
            int res = ids.ReturnWagons(list, "Вагон возвращен с УЗ вручную", @"EUROPE\ealevchenko");
        }
        /// <summary>
        /// Обновить ЭПД по составам (список id составов [KRR-PA-CNT-Railway].[IDS].[OutgoingSostav])
        /// </summary>
        public void IDS_WIR_Update_EPD()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<long> list = new List<long>() { 64339, 64321, 64277, 64268, 64252, 64244, 64241, 64230, 64208, 64191, 64184, 64180, 64163, 64166, 64142, 64129, 64119, 64120, 64111, 64108, 64103, 64098, 64083, 64065, 64055, 64002, 63997, 63972, 63970, 63969, 63963, 63953, 63944, 63941, 63913, 63916, 63902, 63889, 63884, 63873, 63864, 63835, 63827, 63830 };
            int count = 0;
            foreach (long id in list)
            {
                OperationResultID rt = ids.OperationUpdateEPDSendingSostav(id, @"EUROPE\ealevchenko");
                count++;
                Console.WriteLine("Обновление документов по составу id = {0}, результат обновления = {1}, осталось {2}", id, rt.result, list.Count() - count);
            }
        }
        /// <summary>
        ///  Поставить вагон в систему ИДС
        /// </summary>
        public void IDS_WIR_IncomingWagon()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            EFDbContext context = new EFDbContext();
            EFArrivalCars ef_car = new EFArrivalCars(new EFDbContext());
            ArrivalCars wagon = ef_car.Context.Where(c => c.id == 1120017).FirstOrDefault();
            int result = ids.IncomingWagon(ref context, 6, 109, new DateTime(2021,08,30,15,50,00), 113, wagon, @"EUROPE\ealevchenko");
            int res_sava = context.SaveChanges();
            //Ошибка выполнения метода IncomingWagon(context=EFIDS.Concrete.EFDbContext, id_station=6, id_way=109, date_start=30.08.2021 15:50:00, position=113, wagon=System.Data.Entity.DynamicProxies.ArrivalCars_274B60BC2D59FA04CEDD4289498D58C1EE9453D9D01127990A0A0D4D3044D283, user=EUROPE\svnovikova)
        }


        // Тест формирования отчета операции отправки (вагоны)
        public void IDS_WIR_GetWagonsOperationOfSend()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            DateTime start = new DateTime(2021, 8, 1, 0, 0, 0);
            DateTime stop = new DateTime(2021, 8, 31, 23, 59, 59);
            List<wagon_operation_send> list = ids.GetWagonsOperationOfSend(start, stop);
        }

        // Тест формирования отчета операции отправки (состав-вагоны)
        public void IDS_WIR_GetSostavWagonsOperationOfSend()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            DateTime start = new DateTime(2021, 8, 1, 0, 0, 0);
            DateTime stop = new DateTime(2021, 8, 31, 23, 59, 59);
            List<sostav_operation_send> list = ids.GetSostavWagonsOperationOfSend(start, stop);
        }


        #endregion

        #region IDSThread
        /// <summary>
        ///  Тест выполнения потока обновления информации по Вх. поставке
        /// </summary>
        public void IDSThread_Start_UpdateIncomingSupply()
        {
            IDSThread ids_th = new IDSThread(service.IDS);
            ids_th.Start_UpdateIncomingSupply();

        }

        #endregion


        public void GetActs()
        {

            UZ.UZ_Convert convert = new UZ.UZ_Convert();
            EFIDS.Concrete.EFUZ_DOC ef_uz_doc = new EFIDS.Concrete.EFUZ_DOC(new EFIDS.Concrete.EFDbContext());
            foreach (EFIDS.Entities.UZ_DOC doc in ef_uz_doc.Context.ToList())
            {
                string xml_final = convert.XMLToFinalXML(doc.xml_doc);
                UZ.OTPR otpr = convert.FinalXMLToOTPR(xml_final);
                if (otpr != null && otpr.acts != null && otpr.acts.Count() > 0)
                {
                    Console.WriteLine("num_doc = {0}", doc.num_doc);
                }
            }
        }

        public void GetDocs()
        {

            UZ.UZ_Convert convert = new UZ.UZ_Convert();
            EFIDS.Concrete.EFUZ_DOC ef_uz_doc = new EFIDS.Concrete.EFUZ_DOC(new EFIDS.Concrete.EFDbContext());
            foreach (EFIDS.Entities.UZ_DOC doc in ef_uz_doc.Context.ToList())
            {
                string xml_final = convert.XMLToFinalXML(doc.xml_doc);
                UZ.OTPR otpr = convert.FinalXMLToOTPR(xml_final);
                if (otpr != null && otpr.sender_doc != null && otpr.sender_doc.Count() > 0)
                {
                    foreach (UZ.SENDER_DOC sd in otpr.sender_doc.ToList())
                    {
                        Console.WriteLine("num_doc = {0}, сылка на документ : {1}", doc.num_doc, sd.id);
                    }
                }
            }
        }

        public void SetNum_UZ()
        {

            UZ.UZ_Convert convert = new UZ.UZ_Convert();
            EFIDS.Concrete.EFUZ_DOC ef_uz_doc = new EFIDS.Concrete.EFUZ_DOC(new EFIDS.Concrete.EFDbContext());
            List<EFIDS.Entities.UZ_DOC> list_docs = ef_uz_doc.Context.Where(d => d.num_uz == null).ToList();
            int count = list_docs.Count();
            foreach (EFIDS.Entities.UZ_DOC doc in list_docs)
            {
                count--;
                string xml_final = convert.XMLToFinalXML(doc.xml_doc);
                UZ.OTPR otpr = convert.FinalXMLToOTPR(xml_final);
                if (otpr != null && otpr.nom_doc != null)
                {
                    doc.num_uz = otpr.nom_doc;
                    int result = ef_uz_doc.Save();
                    //foreach (UZ.SENDER_DOC sd in otpr.sender_doc.ToList()) { 
                    Console.WriteLine("num_doc = {0}, результат сохранения : {1}, осталось {2}", doc.num_doc, result, count);
                    //}
                }
            }
        }

    }
}
