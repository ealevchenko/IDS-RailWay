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
using UZ;

namespace Test.TestModule
{


    public class Test_UZ
    {
        public Test_UZ()
        {

        }

        #region UZ

        public void UZ_WebApiClientUZWagon()
        {
            WebAPIClientUZ client = new WebAPIClientUZ(service.Null);
            Console.WriteLine("Запрос....");
            //List<string> list2 = client.GetInfoWagon(58647785);
            UZWagonInfo info = client.GetInfoWagonOfNum(58647782);
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
            OTPR otpr = sms.GetOTPR("69490431");
            OTPR otpr1 = sms.GetOTPR("43000000000518178624");
            OTPR otpr2 = sms.GetOTPR("43000000000518166808");
        }

        public void UZ_SMS_GetOTPROfXML()
        {
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load("test1.xml");
            UZ_SMS sms = new UZ_SMS();
            OTPR otpr = sms.GetOTPROfXML(xDoc.InnerXml);
        }

        public void UZ_SMS_GetDB_XMLOfNum()
        {
            UZ_SMS sms = new UZ_SMS();
            UZ_DOC doc = sms.GetDocumentOfDB_Num(63531479);
        }


        #endregion
    }
}
