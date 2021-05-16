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
            List<int> list = new List<int>() { 256545, 254473, 256917, 256687, 256918, 256911, 254032, 254033, 256912, 256919, 256920, 256913, 254035, 254036, 256921, 256914, 256915, 256922, 254040, 254041, 256923, 256916, 256924, 254042, 256453, 256932, 254043, 256925, 256926, 254059, 256455, 256456, 254060, 256927, 256928, 254061, 256457, 256458, 254062, 256929, 256930, 256459, 256460, 256931, 256461, 252028, 252026, 256462, 256463, 254674, 250331, 256464, 256492, 256493, 256465, 250330, 254669, 256466, 256494, 253657, 253658, 256495, 256468, 254668, 256491, 256496, 253659, 256888, 256889, 253660, 256497, 256665, 256666, 256498, 246223, 256890, 256891, 256499, 256667, 256668, 256500, 256892, 256893, 256501, 253642, 256669, 256670, 256502, 256894, 256503, 256671, 253644, 256895, 256896, 256504, 256672, 256897, 256505, 256673, 256506, 256898, 256094, 256093, 256507, 256899, 253653, 253654, 256900, 256508, 256092, 256091, 256509, 256901, 256902, 256510, 256090, 256089, 256511, 256903, 256904, 253684, 256512, 256088, 256087, 256513, 256905, 256906, 256514, 253686, 256086, 256085, 256527, 256907, 253688, 253689, 256908, 256528, 256529, 256909, 256530, 256558, 256531, 256532, 256533, 250683, 253886, 256534, 256535, 253887, 256536, 248054, 256537, 252849, 256538, 253972, 253971, 256539, 256540, 253970, 253969, 256541, 256542, 256543, 256544, 256515, 256516, 256517, 256518, 256519, 256520, 256521, 256522, 256523, 256524, 256525, 256526, 250390, 231180, 250537, 250508, 250519, 250520, 249269, 249267, 249263, 249286, 248044, 249281, 248755, 249157, 249865, 249864, 249863, 249862, 249861, 249853, 249852, 249851, 249850, 249849, 249848, 244521, 249261, 249541, 250663, 251761, 251760, 251759, 251758, 251757, 251755, 251753, 251752, 251751, 251749, 251748, 251376, 251769, 251767, 251766, 251765, 251764, 251763, 251384, 251385, 251386, 250644, 250646, 250655, 250654, 250653, 250652, 250651, 232814, 248086, 247396, 248091, 248078, 248073, 244829, 252138, 252139, 252140, 252141, 250845, 249299, 249298, 244330, 247443, 233715, 245868, 219022, 208335, 250290, 250291, 250292, 250293, 250294, 247131, 247121, 248630, 248629, 251823, 249312, 251080, 251781, 251782, 248702, 248703, 251783, 251784, 248538, 250565, 250564, 250563, 250562, 249910, 249915, 249923, 249901, 250494, 251804, 251803, 250296, 252158, 252163, 252142, 252161, 252192, 232817, 235353, 251359, 251356, 252801, 252277, 250763, 250765, 248882, 250755, 251779, 248881, 250000, 248254, 251722, 250023, 248883, 252260, 250751, 248064, 250786, 248888, 248701, 251503, 248890, 248891, 248256, 248255, 248908, 249024, 250300, 248599, 252497, 252571, 249485, 252724, 246168, 248917, 234143, 240915, 252785, 248668, 248986, 252784, 252782, 248053, 248070, 248411, 248071, 252762, 252766, 252770, 250669, 250645, 250658, 249903, 248092, 247417, 252779, 246625, 181745, 218046, 250756, 250759, 252747, 252746, 249385, 251504, 251502, 251001, 231526, 247100, 253051, 248595, 248594, 250041, 250044, 231418, 217440, 250434, 251366, 256553, 256554, 256555, 256556, 256557, 256546, 256547, 256548, 256549, 256550, 256551, 256552, 250492, 247102, 247107, 246391, 256173, 255325, 256164, 256163, 250152, 255957, 253329, 254571, 252451, 251950, 251951, 250321, 250322, 255509, 255511, 255524, 255525, 248764, 248766, 248767, 248768, 250332, 252445, 252446, 176155, 255830, 255700, 255711, 255714, 255722, 256253, 255991, 255992, 255993, 255994, 255995, 256151, 250493, 256172, 256171, 256170, 256169, 256168, 256167, 256166, 256165, 256162, 256161, 255330, 255331, 256349, 256176, 256175, 256174 };
            int res = ids.CloseWir(list, DateTime.Now, "Запись закрыта принудительно (очистка согласно положению парка)", @"EUROPE\ealevchenko");
        }
        /// <summary>
        /// Тест административной функции убрать дубликаты
        /// </summary>
        public void IDS_WIR_DeleteDoubleWir()
        {
            IDS_WIR ids = new IDS_WIR(service.Test);
            List<int> list = new List<int>() { 250606, 250631, 250638, 250609, 250610, 250628, 250630, 250632, 250634, 250636, 250629, 250240, 250608, 250611, 250605, 250607, 250612, 250637, 250639, 250633, 250635 };
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
