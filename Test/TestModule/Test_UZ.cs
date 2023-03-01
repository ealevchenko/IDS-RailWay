using EFIDS_Arhiv.Concrete;
using EFIDS_Arhiv.Entities;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using TMSoft.Gohub.Client;
using UZ;

namespace Test.TestModule
{


    public class Test_UZ
    {
        public Test_UZ()
        {

        }

        #region UZ
        /// <summary>
        /// !тест старого запроса вагоны по уз (Удалить)
        /// </summary>
        //public void UZ_WebApiClientUZWagon() 
        //{
        //    WebAPIClientUZ client = new WebAPIClientUZ(service.Null);
        //    Console.WriteLine("Запрос....");
        //    //List<string> list2 = client.GetInfoWagon(58647785);
        //    UZWagonInfo info = client.GetInfoWagonOfNum(62079280);
        //}
        /// <summary>
        /// Тест нового запроса вагоны по уз
        /// </summary>
        public void UZ_WebAPIClientUZ_GOV_Wagon()
        {
            WebAPIClientUZ_GOV client = new WebAPIClientUZ_GOV(service.Null);
            Console.WriteLine("Запрос....");
            //List<string> list2 = client.GetInfoWagon(58647785);
            UZWagonInfo info = client.GetInfoWagonOfNum(55590509);
        }
        /// <summary>
        /// Тест нового запроса по коду станции
        /// </summary>
        public void UZ_WebAPIClientUZ_GOV_Station()
        {
            WebAPIClientUZ_GOV client = new WebAPIClientUZ_GOV(service.Null);
            Console.WriteLine("Запрос....");
            List<UZStationInfo> list2 = client.GetInfoStationOfCode(454606);
            //UZWagonInfo info = client.GetInfoStation(454606);
        }

        public void UZ_XML()
        {
            //XmlDocument xDoc = new XmlDocument();
            //xDoc.Load("test1.xml");
            //UZ_SMS sms = new UZ_SMS();
            //OTPR otpr = sms.GetECD_OTPR(xDoc.InnerXml);
        }

        public void UZ_SMS_GetOTPR()
        {
            UZ_SMS sms = new UZ_SMS();
            sms.Connection();
            OTPR otpr = sms.GetOTPR("70358690");
            //OTPR otpr1 = sms.GetOTPR("43000000000518178624");
            //OTPR otpr2 = sms.GetOTPR("43000000000518166808");
        }

        public void UZ_SMS_GetUZ_DOC_Of_NumDoc()
        {
            UZ_SMS sms = new UZ_SMS();
            sms.Connection();
            // List<UZ_DOC> list = sms.GetUZ_DOC_Of_NumDoc("74089598");


        }
        public void UZ_SMS_GetDocument_of_id_doc()
        {
            UZ_SMS sms = new UZ_SMS();
            string doc_id = "86854766";
            sms.Connection();
            byte[] doc = sms.GetUZ_Document_Of_doc_id(doc_id);
            File.WriteAllBytes(@"d:\" + doc_id + ".pdf", doc);
        }
        public void UZ_SMS_GetDocument_of_db_id_doc()
        {
            Byte[] pdf = null;
            EFUZ_DOC_PDF ef_ids_arhiv = new EFUZ_DOC_PDF(new EFDbContext());
            UZ_DOC_PDF docs = ef_ids_arhiv.Context.Where(s => s.num_doc == "86854766").FirstOrDefault();
            if (docs != null)
            {
                pdf = docs.pdf_doc;
                File.WriteAllBytes(@"d:\" + "test" + ".pdf", pdf);
            }

        }

        // Поиск по номеру вагона
        public void UZ_SMS_GetUZ_DOC_Of_NumWagons()
        {
            UZ_SMS sms = new UZ_SMS();
            sms.Connection();
            //List<UZ_DOC_FULL> docs = sms.Get_UZ_DOC_SMS_Of_NumWagon("62976527,60300357"); //num_doc;60300357;63260020
        }
        public void UZ_SMS_GetOTPROfXML()
        {
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load("test1.xml");
            UZ_SMS sms = new UZ_SMS();
            OTPR otpr = sms.GetOTPROfXML(xDoc.InnerXml);
        }
        //TODO: !!! Убрал использую Get_UZ_DOC_SDB_Of_Num(int num)
        //public void UZ_SMS_GetDocumentOfDB_Num()
        //{
        //    UZ_SMS sms = new UZ_SMS();
        //    UZ_DOC doc = sms.GetDocumentOfDB_Num(55120554);
        //}

        public void UZ_SMS_GetArrivalDocumentOfDB_Num()
        {
            UZ_SMS sms = new UZ_SMS();
            UZ_DOC doc = sms.GetDocumentOfDB_NumConsigneesStations(63360465, new int[] { 7932, 6302, 659 }, new int[] { 457905, 466904, 466923, 467004, 467108, 467201 }, DateTime.Now);
        }
        /// <summary>
        ///  Получить ЭПД из промежуточной базы на вагон который отправили
        /// </summary>
        public void UZ_SMS_GetOutgoingDocumentOfDB_NumShipper()
        {
            UZ_SMS sms = new UZ_SMS();
            UZ_DOC doc = sms.GetDocumentOfDB_NumShipper(55120554, new int[] { 7932 }, new DateTime(2021, 04, 13, 2, 15, 00));
        }

        public void UZ_SMS_GetDocumentOfDB_NumConsignees()
        {
            UZ_SMS sms = new UZ_SMS();
            List<UZ_DOC> docs = sms.GetDocumentOfDB_NumConsignees(67860718, new int[] { 7932, 6302, 659 }, 15);
        }

        public void UZ_SMS_GetLastDTOfUZ_Data()
        {
            UZ_SMS sms = new UZ_SMS();
            DateTime? ве = sms.GetLastDT_UZ_DOC();
        }


        #endregion
    }
}
