using IDSLogs.Enum;
using System;
using System.Collections.Generic;
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

        public void UZ_XML_DOC(XmlElement xRoot)
        {
            foreach (XmlNode xnode in xRoot)
            {
                //foreach (XmlNode node_doc in xnode.ChildNodes)
                //{
                // если узел - document-data
                if (xnode.Name == "document-data")
                {
                    foreach (XmlNode child_node_doc in xnode.ChildNodes)
                    {
                        // если узел - document-data
                        if (child_node_doc.Name == "uz-rwc-doc")
                        {
                            UZ_XML_DOC((XmlElement)child_node_doc);
                        }
                        // если узел - document-data
                        if (child_node_doc.Name == "OTPR")
                        {
                            //
                        }
                    }
                }
                // если узел - changes
                if (xnode.Name == "signature")
                {
                    foreach (XmlNode childnode in xnode.ChildNodes)
                    {

                    }
                }
                //}
            }
        }

        public void UZ_XML()
        {
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load("test1.xml");
            // получим корневой элемент
            XmlElement xRoot = xDoc.DocumentElement;
            string d = xRoot.Name; // uz-rwc-doc
            UZ_XML_DOC(xRoot);
            // обход всех узлов в корневом элементе
            foreach (XmlNode xnode in xRoot)
            {
                // если узел - company
                if (xnode.Name == "company")
                {
                    Console.WriteLine("Компания: {childnode.InnerText}");
                }
                
                //foreach (XmlNode childnode in xnode.ChildNodes)
                //{
                //    // если узел - company
                //    if (childnode.Name == "company")
                //    {
                //        Console.WriteLine("Компания: {childnode.InnerText}");
                //    }
                //    // если узел age
                //    if (childnode.Name == "age")
                //    {
                //        Console.WriteLine("Возраст: {childnode.InnerText}");
                //    }
                //}
                
                //uz-rwc-doc
                    //document-data
                        //uz-rwc-doc
                            //document-data
                                //<OTPR 
                            //signature
                        //changes
                    //signature
                //?changes


                //// получаем атрибут name
                //if (xnode.Attributes.Count > 0)
                //{
                //    XmlNode attr = xnode.Attributes.GetNamedItem("name");
                //    if (attr != null)
                //        Console.WriteLine(attr.Value);
                //}
                //// обходим все дочерние узлы элемента user
                //foreach (XmlNode childnode in xnode.ChildNodes)
                //{
                //    // если узел - company
                //    if (childnode.Name == "company")
                //    {
                //        Console.WriteLine("Компания: {childnode.InnerText}");
                //    }
                //    // если узел age
                //    if (childnode.Name == "age")
                //    {
                //        Console.WriteLine("Возраст: {childnode.InnerText}");
                //    }
                //}
                //Console.WriteLine();
            }
            Console.Read();

        }


        public class Serializer
        {
            public T Deserialize<T>(string input) where T : class
            {
                try
                {
                    System.Xml.Serialization.XmlSerializer ser = new System.Xml.Serialization.XmlSerializer(typeof(T));

                    using (StringReader sr = new StringReader(input))
                    {
                        return (T)ser.Deserialize(sr);
                    }
                }
                catch (Exception e)
                {
                    return null;
                }
                

            }

            public string Serialize<T>(T ObjectToSerialize)
            {
                XmlSerializer xmlSerializer = new XmlSerializer(ObjectToSerialize.GetType());

                using (StringWriter textWriter = new StringWriter())
                {
                    xmlSerializer.Serialize(textWriter, ObjectToSerialize);
                    return textWriter.ToString();
                }
            }
        }


        public void UZ_XML1()
        {
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load("test2.xml");
            // получим корневой элемент
            Serializer ser = new Serializer();
            string d = File.ReadAllText("test1.xml");

            documentdatainfo f = new documentdatainfo();

            f.ItemsElementName.SetValue(ItemsChoiceType.OTPR);

            //string d = xDoc.ToString();
            documentdatainfo customer = ser.Deserialize<documentdatainfo>(d);
            //xmlOutputData = ser.Serialize<consignment5>(customer);
        }

        #endregion
    }
}
