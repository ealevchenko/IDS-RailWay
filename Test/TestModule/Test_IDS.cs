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
            List<int> list = new List<int>() { 289251, 290035, 290023, 290024, 290890, 290889, 286378, 284115, 279336, 291623, 290319, 285919, 293826, 293182, 284123, 292433, 286760, 286761, 286762, 290903, 290042, 290043, 290044, 285384, 293630, 291769, 291770, 290923, 290922, 290921, 290920, 290915, 292627, 292839, 292489, 293242, 294283, 291772, 288901, 288886, 288887, 294411, 294412, 294416, 294417, 291779, 291963, 292224, 290908, 293831, 294413, 291774, 291776, 290888, 294174, 294173, 292553, 292554, 292544, 292545, 290045, 290046, 290047, 290048, 290050, 290051, 293613, 291747, 291748, 291749, 291750, 290880, 293379, 290917, 291297, 292225, 292557, 293267, 293278, 292546, 292549, 290886, 293755, 294398, 292547, 292550, 290013, 290932, 291759, 290891, 290885, 290887, 291758, 291736, 291745, 295661, 295662, 295663, 295664, 295067, 295079, 295438, 295081, 294652, 294172, 293214, 290918, 293206, 295656, 293157, 295657, 293868, 295658, 295660, 291743, 291744, 295632, 295633, 290884, 295083, 292913, 291756, 295084, 295100, 291757, 291752, 295101, 291753, 291754, 247393, 290916, 260660, 286140, 295421, 295422, 290003, 289217, 295424, 289216, 290029, 295425, 293412, 290900, 290899, 293413, 295634, 293414, 290041, 290004, 291762, 291755, 265064, 292366, 295118, 290027, 290028, 290040, 295638, 295652, 295654, 295624, 295655, 291737, 296031, 296033, 294513, 295726, 295744, 294509, 296192, 296193, 293408, 293409, 293410, 293411, 293987, 293969, 292608, 293185, 293957, 293988, 293989, 294001, 293977, 292748, 293400, 293401, 296233, 293402, 293397, 293389, 293390, 293403, 293404, 293396, 295188, 296405, 293395, 293406, 293407, 295653, 293276, 291771, 291763, 291761, 291760, 290914, 290931, 290929, 290928, 290927, 290925, 290930, 291738, 291746, 296993, 296994, 296316, 296314, 297010, 296151, 296152, 296321, 296328, 296336, 296337, 296673, 296674, 290898, 290897, 296675, 296697, 290896, 296698, 294970, 294969, 296704, 296705, 293873, 291569, 296706, 291568, 290924, 282643, 293384, 296221, 293388, 294534, 296414, 293370, 293371, 293372, 296660, 296672, 296682, 296686, 295129, 295142, 296990, 296991, 295141, 296139, 297011, 296155, 296156, 296163, 296184, 296185, 297004, 296410, 297005, 297006, 297007, 297008, 296969, 296989, 296992, 296198, 297623, 297624, 297609, 297610, 293243, 294559, 293955, 296195, 296199, 296202, 295763, 296203, 296204, 296492, 296212, 294996, 296144, 295004, 295002, 296323, 296324, 296325, 296326, 296327, 296329, 296968, 293694, 296345, 296346, 296347, 290892, 295610, 292521, 295613, 294541, 291751, 293386, 291777, 291742, 295024, 293757, 293369, 293399, 291815, 286731, 294995, 294994, 296687, 296688, 286734, 289413, 299453, 294547, 299706, 299707, 299709, 299710, 299711, 299712, 299457, 299458, 298605, 299200, 298386, 299454, 298191, 298194, 299208, 299209, 299191, 299192, 299193, 299194, 299195, 299186, 299187, 297310, 298217, 296834, 299102, 298448, 298450, 298451, 298452, 293760, 298494, 298496, 298483, 299440, 299217, 298856, 298857, 298820, 298823, 298824, 299445, 299446, 299448, 299451, 299452, 299460, 299427, 300299, 300300, 300302, 300742, 301552, 301553, 301554, 301556, 301557, 301393, 301394, 301302, 301307, 301313, 301623, 301720, 301715, 300275, 300276, 300277, 301566, 301567, 301568, 301569, 299900 };
            int res = ids.CloseWir(list, DateTime.Now, "Запись закрыта принудительно (очистка согласно положению парка)", @"EUROPE\ealevchenko");
        }
        /// <summary>
        /// Тест административной функции убрать дубликаты
        /// </summary>
        public void IDS_WIR_DeleteDoubleWir()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> list = new List<int>() { 302760, 302762, 302777, 302779, 302726, 302728, 302743, 302745, 302747, 302756, 302758, 302781, 302730, 302741, 302755, 302766, 302773, 302780, 302734, 302737, 302769, 302770, 302725, 302732, 302739, 302757, 302764, 302775, 302735, 302736, 302754, 302768, 302771, 302731, 302733, 302738, 302740, 302742, 302765, 302767, 302772, 302774, 302727, 302729, 302744, 302746, 302759, 302761, 302763, 302776, 302778 };
            int res = ids.DeleteDoubleWir(list);
        }
        /// <summary>
        /// Административная функция вернуть вагон из отправки
        /// </summary>
        public void IDS_WIR_ReturnWagons()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> list = new List<int>() { 63532501 };
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
            foreach (long id in list) {
                OperationResultID rt = ids.OperationUpdateEPDSendingSostav(id, @"EUROPE\ealevchenko");
                count++;
                Console.WriteLine("Обновление документов по составу id = {0}, результат обновления = {1}, осталось {2}", id, rt.result, list.Count()-count);
            }
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
