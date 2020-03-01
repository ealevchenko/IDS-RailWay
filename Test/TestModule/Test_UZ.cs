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

        public void UZ_Connection()
        {
            UZ_SMS sms = new UZ_SMS();
            sms.Connection();
            sms.GetOTPR("69490431");
        }

        public void UZ_SMS_GetOTPROfXML()
        {
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load("test1.xml");
            UZ_SMS sms = new UZ_SMS();
            OTPR otpr = sms.GetOTPROfXML(xDoc.InnerXml);
        }

        //public class Serializer
        //{
        //    public T Deserialize<T>(string input) where T : class
        //    {
        //        try
        //        {
        //            System.Xml.Serialization.XmlSerializer ser = new System.Xml.Serialization.XmlSerializer(typeof(T));

        //            using (StringReader sr = new StringReader(input))
        //            {
        //                return (T)ser.Deserialize(sr);
        //            }
        //        }
        //        catch (Exception e)
        //        {
        //            return null;
        //        }


        //    }

        //    public string Serialize<T>(T ObjectToSerialize)
        //    {
        //        XmlSerializer xmlSerializer = new XmlSerializer(ObjectToSerialize.GetType());

        //        using (StringWriter textWriter = new StringWriter())
        //        {
        //            xmlSerializer.Serialize(textWriter, ObjectToSerialize);
        //            return textWriter.ToString();
        //        }
        //    }
        //}

        //public void UZ_XML1()
        //{
        //    XmlDocument xDoc = new XmlDocument();
        //    xDoc.Load("test2.xml");
        //    // получим корневой элемент
        //    Serializer ser = new Serializer();
        //    string d = File.ReadAllText("test1.xml");

        //    documentdatainfo f = new documentdatainfo();

        //    //f.ItemsElementName.SetValue(ItemsChoiceType.OTPR);

        //    //string d = xDoc.ToString();
        //    documentdatainfo customer = ser.Deserialize<documentdatainfo>(d);
        //    //xmlOutputData = ser.Serialize<consignment5>(customer);
        //}

        #endregion
    }
}
