﻿using EFIDS.Concrete;
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
            DateTime dt_arrival = new DateTime(2023, 11, 14, 16, 10, 0);
            string res = ids.AddUpdateUZ_DOC_To_DB_IDS(61337481, dt_arrival);
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
        //TODO: Удалил
        //public void IDSTransfer_IncomingArrivalSostav()
        //{

        //    IDSTransfer ids = new IDSTransfer(service.Test);
        //    int res = ids.IncomingArrivalSostav(42407, new List<int> { 63664767 }, @"EUROPE\ealevchenko");
        //}

        //public void IDSTransfer_IncomingArrivalSostav_All()
        //{

        //    IDSTransfer ids = new IDSTransfer(service.Test);
        //    int res = ids.IncomingArrivalSostav();
        //}
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

        public void IDS_SAP_UpdateSAPOutgoingSupply()
        {

            EFDbContext context = new EFDbContext();

            IDS_SAP ids = new IDS_SAP(service.Test);
            int result = ids.UpdateSAPOutgoingSupply(@"EUROPE\ealevchenko");

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

        //public void IDSDirectory_IsCorrectNumCar()
        //{

        //    IDSDirectory ids = new IDSDirectory(service.Test);
        //    bool res = ids.IsCorrectNumCar(12345678);

        //}

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

        #region IDS_Directory

        public void IDS_Directory_ClearDirectory_Cargo()
        {

            IDS_Directory ids = new IDS_Directory(service.Test);
            int res = ids.ClearDirectory_Cargo();

        }
        /// <summary>
        /// Тест считования и создания внешней станции
        /// </summary>
        public void IDS_GetDirectory_ExternalStation()
        {

            IDS_Directory ids = new IDS_Directory(service.Test);
            Directory_ExternalStation station = ids.GetDirectory_ExternalStation(887500, "АБАЗА", true, "test");

        }
        /// <summary>
        /// Тест обновления владельцев в карточке вагона по данным БД УЗ
        /// </summary>
        public void IDS_GetDirectory_UpdateOwnersWagonsOfDB_UZ()
        {
            IDS_Directory ids = new IDS_Directory(service.Test);
            ResultUpdateWagon result = ids.UpdateOwnersWagonsOfDB_UZ(@"EUROPE\ealevchenko");
        }
        /// <summary>
        /// Тест перенумерации вагона
        /// </summary>
        public void IDS_GetDirectory_ChangeNumWagon()
        {
            IDS_Directory ids = new IDS_Directory(service.Test);
            int result = ids.ChangeNumWagon(41551862, 2246, @"EUROPE\ealevchenko");
            Console.WriteLine("result = {0}", result);
        }

        public void IDS_GetDirectory_CorrectDateTime_Of_Directory_WagonsRenf()
        {
            IDS_Directory ids = new IDS_Directory(service.Test);
            int result = ids.CorrectDateTime_Of_Directory_WagonsRenf(67615401, @"EUROPE\ealevchenko");
            Console.WriteLine("result = {0}", result);
        }
        public void IDS_GetDirectory_CorrectDateTime_Of_Directory_WagonsRenf_all()
        {
            IDS_Directory ids = new IDS_Directory(service.Test);
            ResultUpdateWagon result = ids.CorrectDateTime_Of_Directory_WagonsRenf(@"EUROPE\ealevchenko");
            Console.WriteLine("result = {0}", result.result);
        }
        public void IDS_Directory_UpdateArrivalRentWagon()
        {
            //2024-01-05 00:00:00.000
            IDS_Directory ids = new IDS_Directory(service.Test);
            int result = ids.UpdateArrivalRentWagon(61138012, new DateTime(2024, 1, 5, 0, 0, 0), @"EUROPE\ealevchenko");
            Console.WriteLine("result = {0}", result);
        }

        public void IDS_Directory_UpdateArrivalRentWagons()
        {
            IDS_Directory ids = new IDS_Directory(service.Test);
            List<int> nums = new List<int>() { 56868052 };
            int result = ids.UpdateArrivalRentWagons(nums, new DateTime(2023, 3, 11, 0, 0, 0), @"EUROPE\ealevchenko");
            Console.WriteLine("result = {0}", result);
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

            res = ids.DislocationWagons(ref context, 111, false, 115, false, DateTime.Now, wagons, "TЭM18-183", "TЭM18-184", false, "TEST");
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
        // Тест операции сброса ЭПД 
        public void IDS_WIR_OperationClearEPDSendingSostav()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            OperationResultID res = ids.OperationClearEPDSendingSostav(232033, @"EUROPE\ealevchenko"); //231984
        }
        // Тест операции обновления ЭПД 
        public void IDS_WIR_OperationUpdateEPDSendingSostav()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            OperationResultID res = ids.OperationUpdateEPDSendingSostav(1157522, @"EUROPE\ealevchenko"); //231984
        }
        public void IDS_WIR_OperationUpdateEPDSendingCar()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            OperationResultID res = ids.OperationUpdateEPDSendingCar(1159925, @"EUROPE\ealevchenko"); //231984
        }

        /// <summary>
        /// Тест административной функции закрыть внутренее перемещение
        /// </summary>
        /// <returns></returns>
        public void IDS_WIR_CloseWir()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> list = new List<int>() { 957259, 957260, 957261, 957581, 957585, 957615, 957616, 957618, 957964, 957965, 957966, 957967, 957968, 958012, 958286, 958287, 958288, 958289, 958290, 958291, 958292, 958293, 958294, 958295, 958296, 958297, 958298, 958299, 958300, 958301, 958302, 958303, 958304, 958305, 958306, 958307 };
            int res = ids.CloseWir(list, DateTime.Now, "Запись закрыта принудительно (очистка согласно положению парка)", @"EUROPE\ealevchenko");
        }
        /// <summary>
        /// Тест административной функции убрать дубликаты
        /// </summary>
        public void IDS_WIR_DeleteDoubleWir()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> list = new List<int>() { 343801, 438772, 423374, 343860, 423305, 343814, 343827, 466263, 423375, 343961, 343993, 344007, 535163, 545025, 343990, 343992, 343919, 343962, 343947, 343948, 344016, 423358, 343950 };
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
        /// Административная функция исправить документ по прибытию
        /// </summary>
        //public void IDS_WIR_OperationUpdateEPDIncomingWagon()
        //{
        //    IDS_WIR ids = new IDS_WIR(service.Test);
        //    ids.OperationUpdateEPDIncomingWagon(1666409, @"EUROPE\ealevchenko");
        //}

        public void IDS_WIR_ReportBorderCrossingOfNumsEPD()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> list = new List<int>() { 851717, 851725, 851733, 851741, 851758, 852301, 852319, 852327, 852632, 43302066, 43302074, 43302082, 43302090, 43302108, 43302116, 43302124, 43302132, 43302157, 43302165, 43302173, 43302181, 43302199, 43302207, 43302215, 43302223, 43302231, 43302249, 43302256, 43302264, 43302272, 43302280, 43302298, 43302306, 43302314, 43302322, 43302330, 43302348, 43302355, 43302363, 43302371, 43302389, 43302397, 43302405, 43302413, 43302421, 43302439, 43302447, 43302454, 43302462, 43302470, 43302488, 43302496, 43302504, 43302512, 43302520, 43302538, 43302546, 43302553, 43302561, 43302579, 43302587, 43302595, 43315613, 43315621, 43315639, 43315647, 43315662, 43315670, 43315688, 43315696, 43315704, 43315712, 43315720, 43315738, 43315746, 43315753, 43315761, 43315779, 43315787, 43315795, 43315803, 43315811, 43315829, 43315837, 43315845, 43315852, 43315860, 43315878, 43315886, 43315894, 43315902, 43315910, 43315928, 43315936, 43315944, 43315951, 43315969, 43315977, 43315985, 43315993, 43316009, 43316017, 43316025, 43316033, 43316041, 43316058, 43316066, 43316074, 43316082, 43316090, 43316108, 43316116, 43316124, 43316132, 43316140, 43333913, 43333921, 43333939, 43333947, 43333954, 43333962, 43333970, 43333988, 43333996, 43334002, 43334010, 43334028, 43334036, 43334044, 43334051, 43334069, 43334077, 43334085, 43334093, 43334101, 43334119, 43334127, 43334135, 43334143, 43334150, 43334168, 43334176, 43334184, 43334192, 43334200, 43334218, 43334226, 43334234, 43334242, 43334259, 43334275, 43334283, 43334291, 43334309, 43334317, 43334325, 43334333, 43334358, 43334366, 43334374, 43334382, 43334390, 43334408, 43334416, 43334424, 43334432, 43334440, 43334457 };
            List<ReportBorderCrossing> res = ids.GetReportBorderCrossingOfNumsEPD(list);
            foreach (ReportBorderCrossing rep in res)
            {
                Console.WriteLine("{0};{1};{2};{3};{4};{5};{6}", rep.num_doc, rep.num_uz, rep.cross_time, rep.border_crossing_stn, rep.border_crossing_stn_name, rep.epd_date_otpr, rep.epd_date_pr);
            }
        }
        public void IDS_WIR_ReportBorderCrossingOfNumsEPD_DB()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> list = new List<int>() { 851717, 851725, 851733, 851741, 851758, 852301, 852319, 852327, 852632, 43302066, 43302074, 43302082, 43302090, 43302108, 43302116, 43302124, 43302132, 43302157, 43302165, 43302173, 43302181, 43302199, 43302207, 43302215, 43302223, 43302231, 43302249, 43302256, 43302264, 43302272, 43302280, 43302298, 43302306, 43302314, 43302322, 43302330, 43302348, 43302355, 43302363, 43302371, 43302389, 43302397, 43302405, 43302413, 43302421, 43302439, 43302447, 43302454, 43302462, 43302470, 43302488, 43302496, 43302504, 43302512, 43302520, 43302538, 43302546, 43302553, 43302561, 43302579, 43302587, 43302595, 43315613, 43315621, 43315639, 43315647, 43315662, 43315670, 43315688, 43315696, 43315704, 43315712, 43315720, 43315738, 43315746, 43315753, 43315761, 43315779, 43315787, 43315795, 43315803, 43315811, 43315829, 43315837, 43315845, 43315852, 43315860, 43315878, 43315886, 43315894, 43315902, 43315910, 43315928, 43315936, 43315944, 43315951, 43315969, 43315977, 43315985, 43315993, 43316009, 43316017, 43316025, 43316033, 43316041, 43316058, 43316066, 43316074, 43316082, 43316090, 43316108, 43316116, 43316124, 43316132, 43316140, 43333913, 43333921, 43333939, 43333947, 43333954, 43333962, 43333970, 43333988, 43333996, 43334002, 43334010, 43334028, 43334036, 43334044, 43334051, 43334069, 43334077, 43334085, 43334093, 43334101, 43334119, 43334127, 43334135, 43334143, 43334150, 43334168, 43334176, 43334184, 43334192, 43334200, 43334218, 43334226, 43334234, 43334242, 43334259, 43334275, 43334283, 43334291, 43334309, 43334317, 43334325, 43334333, 43334358, 43334366, 43334374, 43334382, 43334390, 43334408, 43334416, 43334424, 43334432, 43334440, 43334457 };
            DateTime dt_start = new DateTime(2023, 11, 1, 00, 00, 00);
            DateTime dt_stop = new DateTime(2024, 1, 1, 00, 00, 00);
            List<ReportBorderCrossing> res = ids.GetReportBorderCrossingOfNumsEPD_DB(list, 7932, dt_start, dt_stop);
            foreach (ReportBorderCrossing rep in res)
            {
                if (rep.num_uz != null)
                {
                    Console.WriteLine("{0};{1};{2};{3};{4}", rep.num_doc, rep.num_uz, rep.cross_time, rep.border_crossing_stn, rep.border_crossing_stn_name);

                }
            }
        }

        /// <summary>
        ///  Поставить вагон в систему ИДС
        /// </summary>
        //public void IDS_WIR_IncomingWagon()
        //{
        //    IDS_WIR ids = new IDS_WIR(service.Test);
        //    EFDbContext context = new EFDbContext();
        //    EFArrivalCars ef_car = new EFArrivalCars(new EFDbContext());
        //    ArrivalCars wagon = ef_car.Context.Where(c => c.id == 1120017).FirstOrDefault();
        //    int result = ids.IncomingWagon(ref context, 6, 109, new DateTime(2021, 08, 30, 15, 50, 00), 113, wagon, @"EUROPE\ealevchenko");
        //    int res_sava = context.SaveChanges();
        //    //Ошибка выполнения метода IncomingWagon(context=EFIDS.Concrete.EFDbContext, id_station=6, id_way=109, date_start=30.08.2021 15:50:00, position=113, wagon=System.Data.Entity.DynamicProxies.ArrivalCars_274B60BC2D59FA04CEDD4289498D58C1EE9453D9D01127990A0A0D4D3044D283, user=EUROPE\svnovikova)
        //}
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
        // Обновить документы по прибытию
        public void IDS_WIR_UpdateArrivalEPD()
        {

            IDS_WIR ids = new IDS_WIR(service.Test);
            int result = ids.UpdateArrivalEPD();

        }
        // Обновить документы по отправке по всем составам
        public void IDS_WIR_UpdateSendingEPD()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            int result = ids.UpdateSendingEPD(@"EUROPE\ealevchenko");
        }
        /// <summary>
        /// Тест переноса вагона в левую сторону
        /// </summary>
        public void IDS_WIR_OperationIncomingWagon()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            //ids.OperationIncomingWagon(1283802, 0, "675011", "31688709", "0", "7932", @"EUROPE\test");
        }
        /// <summary>
        /// Тест поиска документа по номеру накладной и номеру вагона
        /// </summary>
        public void IDS_WIR_OperationUpdateUZ_DOC1()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            ids.OperationUpdateUZ_DOC("500512", 62073481, true, true);
        }
        /// <summary>
        /// Тест поиска документа по номеру вагона грузополучателям , станциям и времени
        /// </summary>
        public void IDS_WIR_OperationUpdateUZ_DOC2()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> consignees = new List<int>() { 7932, 6302, 659 };
            List<int> stations = new List<int>() { 457905, 466904, 466923, 467004, 467108, 467201, 466603, 457708 };
            DateTime? dt_arrival = new DateTime(2023, 11, 14, 16, 00, 00);
            //2021-12-03 11:42:05.133
            //52830882
            // 2022-05-06 06:40:00
            ids.OperationUpdateUZ_DOC(61337481, consignees, stations, dt_arrival, -36, true, true);
        }
        /// <summary>
        /// Тест поиска документа по номеру вагона грузополучателям , станциям и времени
        /// </summary>
        public void IDS_WIR_OperationUpdateUZ_DOC3()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            DateTime? dt_arrival = new DateTime(2022, 5, 1, 5, 0, 0);
            //2021-12-03 11:42:05.133
            //52830882
            // 2022-05-06 06:40:00
            ids.OperationUpdateUZ_DOC(52926623, dt_arrival, true, true);
        }
        public void IDS_WIR_OperationUpdateUZ_DOC_Adp_Out()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            DateTime? dt_old_outgoing = new DateTime(2023, 09, 15, 17, 50, 00); // 2023-09-15 17:50:00.000
            DateTime dt_adoption = new DateTime(2023, 10, 28, 07, 30, 00);     // 2023-10-28 07:30:00.000
            int num = 51553246; //61337481
            ids.OperationUpdateUZ_DOC(num, dt_old_outgoing, dt_adoption, true, true);
        }

        public void IDS_WIR_OperationManualSearchIncomingWagon()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> nums = new List<int>() { 64907751, 57925752, 72851330 };
            ids.OperationManualSearchArrivalWagon(171648, true, nums, null, false, "test");

        }

        public void IDS_WIR_GetReportBorderCrossingOfNums()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> nums = new List<int>() { 64072010, 67277707, 60807781 };
            ids.GetReportBorderCrossingOfNums(nums);

        }
        /// <summary>
        /// Тест обновление принятого вагона по данным обновленного справочника
        /// </summary>
        public void IDS_WIR_UpdateArrival_UZ_Vagon_Of_CardWagon()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            int res = ids.UpdateArrival_UZ_Vagon_Of_CardWagon(55110274, "test");

        }
        /// <summary>
        /// Тест обновление документов по принятым вагонам (род, адм...) после обновления справочника
        /// </summary>
        public void IDS_WIR_UpdateArrival_UZ_Documents()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            //ResultUpdateID result = ids.UpdateArrival_UZ_Documents(@"EUROPE\ealevchenko");
            ResultUpdateID result = ids.UpdateArrival_UZ_Documents(null);
        }
        /// <summary>
        /// Обновим базу данных по входящим вагонам из ЭПД найденного по id_doc (внутренему) 
        /// </summary>
        public void IDS_WIR_Update_Arrival_UZ_Doc_Of_ID_DOC()
        {
            string id_doc = "35000000000533640749";

            IDS_WIR ids = new IDS_WIR(service.Test);
            EFIDS.Concrete.EFDbContext context = new EFIDS.Concrete.EFDbContext();
            string sql = "select * from [IDS].[get_view_uz_doc_arrival]() where num_doc =N'" + id_doc + "'";
            UZ_DOC_Arrival uz_doc = context.Database.SqlQuery<UZ_DOC_Arrival>(sql).FirstOrDefault();
            if (uz_doc == null) return;
            UZ.UZ_DOC upd_doc_uz = ids.getUpdate_UZ_DOC(uz_doc.num_doc, uz_doc.num_uz.ToString());
            if (upd_doc_uz == null)
            {
                upd_doc_uz = ids.getUpdateSMS_UZ_DOC(uz_doc.num_doc, uz_doc.num_uz.ToString());
            }
            if (upd_doc_uz == null) return;
            ResultUpdateID res = ids.Update_Arrival_UZ_Doc(ref context, upd_doc_uz, @"EUROPE\ealevchenko");
            int res_ = context.SaveChanges();
        }
        public void IDS_WIR_Update_Arrival_UZ_Doc()
        {
            try
            {
                IDS_WIR ids = new IDS_WIR(service.Test);
                EFIDS.Concrete.EFDbContext context = new EFIDS.Concrete.EFDbContext();
                EFArrival_UZ_Document ef_arr_uz_doc = new EFArrival_UZ_Document(context);
                UZ.UZ_Convert convert = new UZ.UZ_Convert(service.Test);
                EFUZ_DOC uz_doc = new EFUZ_DOC(context);

                DateTime dt = new DateTime(2023, 1, 1, 0, 0, 0);
                List<Arrival_UZ_Document> docs = ef_arr_uz_doc.Context.Where(d => d.id_doc_uz != null && d.create > dt && d.date_otpr == null).ToList();
                int count = docs.Count();
                foreach (Arrival_UZ_Document arr_uz_doc in docs)
                {

                    UZ_DOC doc = uz_doc.Context.Where(d => d.num_doc == arr_uz_doc.id_doc_uz).FirstOrDefault();
                    if (doc != null)
                    {
                        string xml_final = convert.XMLToFinalXML(doc.xml_doc);
                        UZ.OTPR otpr = convert.FinalXMLToOTPR(xml_final);
                        if (otpr != null)
                        {
                            arr_uz_doc.date_otpr = otpr.date_otpr;
                            arr_uz_doc.srok_end = otpr.srok_end;
                            arr_uz_doc.date_grpol = otpr.date_grpol;
                            arr_uz_doc.date_pr = otpr.date_pr;
                            arr_uz_doc.date_vid = otpr.date_vid;
                            ef_arr_uz_doc.Update(arr_uz_doc);
                            int res = context.SaveChanges();

                            Console.WriteLine(String.Format("Doc - {0}, Result - {1}, Count - {2} ", arr_uz_doc.id_doc_uz, res, count--));
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
        /// <summary>
        /// Тест обновление документов по отправленным вагонам (род, адм...) после обновления справочника
        /// </summary>
        public void IDS_WIR_UpdateOutgoing_UZ_Document()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            ResultUpdateID result = ids.UpdateOutgoing_UZ_Document(@"EUROPE\ealevchenko");
        }
        /// <summary>
        /// Обновить по сданному или отправленному составу оператора АМКР
        /// </summary>
        public void IDS_WIR_UpdateOperationOutgoingSostav()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            ResultUpdateWagon result = ids.UpdateOperationOutgoingSostav(210545, @"EUROPE\ealevchenko");
        }

        public void IDS_WIR_UpdateOperationOutgoingSostav_date()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            DateTime dt = new DateTime(2023, 2, 1, 0, 0, 0);
            OperationResultID result = ids.UpdateOperationOutgoingSostav(dt, @"EUROPE\ealevchenko");
        }

        //public void IDS_WIR_UpdateOutgoing_Async()
        //{
        //    IDS_WIR ids = new IDS_WIR(service.Test);
        //    ids.UpdateOutgoing_ASYNC(new int[] {63447106, 62649314, 62975651 }, @"EUROPE\ealevchenko");
        //}
        //public void IDS_WIR_UpdateOutgoing_Parallel()
        //{
        //    IDS_WIR ids = new IDS_WIR(service.Test);
        //    ids.UpdateOutgoing_Parallel(new int[] {63447106, 62649314, 62975651 }, @"EUROPE\ealevchenko");
        //}
        //public void IDS_WIR_UpdateOutgoing_Thread()
        //{
        //    IDS_WIR ids = new IDS_WIR(service.Test);
        //    ids.UpdateOutgoing_Thread(new int[] {63447106, 62649314, 62975651 }, @"EUROPE\ealevchenko");
        //}
        public void IDS_WIR_ServiceChangeUsageFeePeriod()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            DateTime start = new DateTime(2023, 1, 1, 0, 0, 0);
            DateTime stop = new DateTime(2023, 12, 31, 0, 0, 0);
            List<ListUsageFee> list_period = new List<ListUsageFee>();
            list_period.Add(new ListUsageFee() { id = 1, id_operator = 14, id_genus = 2 });
            list_period.Add(new ListUsageFee() { id = 2, id_operator = 14, id_genus = 3 });
            list_period.Add(new ListUsageFee() { id = 0, id_operator = 14, id_genus = 4 });
            int result = ids.ServiceChangeUsageFeePeriod(start, stop, true, (int?)1, (decimal?)50.0f, (int?)2, (decimal?)10.3f, (float?)0.75f, (float?)1.0f, (int?)24, (int?)36, "тест", list_period, @"EUROPE\ealevchenko");
        }
        /// <summary>
        /// Расчет платы за пользование по сданному составу
        /// </summary>
        public void IDS_WIR_CalcUsageFeeOfOutgoingSostav()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            //210779 //200473 // 210834 // 242289
            ResultUpdateIDWagon result = ids.CalcUsageFeeOfOutgoingSostav(292944, @"EUROPE\ealevchenko");
        }
        public void IDS_WIR_CalcUsageFeeOfIncomingSostav()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            //210779 //200473 // 210834
            ResultUpdateIDWagon result = ids.CalcUsageFeeOfIncomingSostav(263194, @"EUROPE\ealevchenko");
        }
        public void IDS_WIR_GetExchangeRate()
        {
            try
            {
                WebAPIClientBank client_bank = new WebAPIClientBank(service.Test);
                List<ExchangeRate> list_exchange_rate = client_bank.GetExchangeRate();
                Console.WriteLine(String.Format("Count :{0}", list_exchange_rate.Count()));
                foreach (ExchangeRate er in list_exchange_rate)
                {
                    Console.WriteLine(er.cc);
                }
            }

            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        /// <summary>
        /// Расчет платы за пользование по сданным составам за выбранный период
        /// </summary>
        public void IDS_WIR_CalcUsageFeeOfOutgoingSostavOfPeriod()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            DateTime start = new DateTime(2024, 1, 1, 0, 0, 0);
            DateTime stop = new DateTime(2024, 2, 6, 23, 59, 59);
            List<ResultUpdateIDWagon> res = ids.CalcUsageFeeOfOutgoingSostav(start, stop, @"EUROPE\ealevchenko");
        }

        #endregion

        #region IDS_Arhiv
        /// <summary>
        /// Тестируем обновление документов в архиве
        /// </summary>
        public void IDS_Arhiv_Update_UZ_DOC_PDF()
        {
            string id_doc = "86057790";

            IDS_WIR ids = new IDS_WIR(service.Test);
            IDS_Arhiv ids_arhiv = new IDS_Arhiv(service.Test);
            EFIDS.Concrete.EFDbContext context = new EFIDS.Concrete.EFDbContext();
            string sql = "select * from [IDS].[get_view_uz_doc_arrival]() where num_doc =N'" + id_doc + "'";
            UZ_DOC_Arrival uz_doc = context.Database.SqlQuery<UZ_DOC_Arrival>(sql).FirstOrDefault();
            if (uz_doc == null) return;
            UZ.UZ_DOC upd_doc_uz = ids.getUpdate_UZ_DOC(uz_doc.num_doc, uz_doc.num_uz.ToString());
            if (upd_doc_uz == null)
            {
                upd_doc_uz = ids.getUpdateSMS_UZ_DOC(uz_doc.num_doc, uz_doc.num_uz.ToString());
            }
            if (upd_doc_uz == null) return;
            int res = ids_arhiv.Update_UZ_DOC_PDF(upd_doc_uz, @"EUROPE\ealevchenko");
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
