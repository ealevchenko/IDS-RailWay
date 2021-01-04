using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace IDS
{
    public class IncomingSupply
    {
        public string ID { get; set; }
        public string NOM_VAG { get; set; }
        public string NOM_NAKL { get; set; }
        public string DATE_NAKL { get; set; }
        public string VBELN { get; set; }
        public string PSNR { get; set; }
        public string WERKS { get; set; }
        public string LGORT { get; set; }
        public string LGOBE { get; set; }
        public string ERDAT { get; set; }
        public string ETIME { get; set; }
        public string LGORT_10 { get; set; }
        public string LGOBE_10 { get; set; }
        public string MATNR { get; set; }
        public string MAKTX { get; set; }
        public string NAME_SH { get; set; }
        public string KOD_R_10 { get; set; }
    }

    public class WebAPIClientSAP
    {
        private eventID eventID = eventID.SAP_Client;
        protected service servece_owner = service.Null;

        protected string url = null;
        protected string transaction_is = null;
        protected string login;
        protected string pass;

        public WebAPIClientSAP()
        {
            try
            {
                this.url = ConfigurationManager.AppSettings["sap_url"].ToString();
                this.transaction_is = ConfigurationManager.AppSettings["sap_transaction_is"].ToString();
                this.login = ConfigurationManager.AppSettings["sap_login"].ToString();
                this.pass = ConfigurationManager.AppSettings["sap_pass"].ToString();
            }
            catch (Exception e)
            {
                Console.WriteLine("Ошибка чтения настроек {0}", e);
            }
        }

        public WebAPIClientSAP(service servece_owner)
        {
            try
            {
                this.servece_owner = servece_owner;
                this.url = ConfigurationManager.AppSettings["sap_url"].ToString();
                this.transaction_is = ConfigurationManager.AppSettings["sap_transaction_is"].ToString();
                this.login = ConfigurationManager.AppSettings["sap_login"].ToString();
                this.pass = ConfigurationManager.AppSettings["sap_pass"].ToString();
            }
            catch (Exception e)
            {
                Console.WriteLine("Ошибка чтения настроек {0}", e);
            }
        }
        /// <summary>
        /// Запрос информации
        /// </summary>
        /// <param name="message"></param>
        /// <param name="metod"></param>
        /// <param name="accept"></param>
        /// <returns></returns>
        private string Select(string message, string metod, string accept)
        {
            try
            {
                HttpWebRequest request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(message);
                request.Method = metod;
                request.PreAuthenticate = true;
                request.Credentials = CredentialCache.DefaultCredentials;
                request.Accept = accept;
                try
                {
                    using (System.Net.WebResponse response = request.GetResponse())
                    {
                        try
                        {
                            using (System.IO.StreamReader rd = new System.IO.StreamReader(response.GetResponseStream()))
                            {
                                return rd.ReadToEnd();
                            }
                        }
                        catch (Exception e)
                        {
                            e.ExceptionLog(String.Format("Ошибка создания StreamReader ответа, message {0}, метод {1}, accept {2}", message, metod, accept), this.servece_owner, this.eventID);
                            return null;
                        }
                    }
                }
                catch (Exception e)
                {
                    e.ExceptionLog(String.Format("Ошибка получения ответа WebResponse, message {0}, метод {1}, accept {2}", message, metod, accept), this.servece_owner, this.eventID);
                    return null;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Select(message={0}, metod={1}, accept={2})", message, metod, accept), this.servece_owner, this.eventID);
                return null;
            }
        }

        public IncomingSupply GetIncomingSupply(long ID, string NOM_NAKL, string NOM_VAG)
        {
            try
            {
                string message = this.url + this.transaction_is +
                                    "&ID=" + ID.ToString() +
                                    "&NOM_NAKL=" + NOM_NAKL +
                                    "&NOM_VAG=" + NOM_VAG +
                                    "&OutputParameter=RSLT" +
                    "&XacuteLoginName=" + this.login +
                    "&XacuteLoginPassword=" + this.pass;

                string response = Select(message, "GET", "text/xml");

                //String.Format("\r\n Выполнение метода GetIncomingSupply(ID={0}, NOM_NAKL={1}, NOM_VAG={2}) \r\nurl={3} \r\nxml={4}", ID, NOM_NAKL, NOM_VAG, message, response).WarningLog();

                if (String.IsNullOrWhiteSpace(response)) return null;
                XDocument doc = XDocument.Parse(response);

                //List<IncomingSupply> list_supply = new List<IncomingSupply>();

                foreach (XElement element in doc.Element("Rowsets").Element("Rowset").Elements("Row"))
                {
                    IncomingSupply sypply = new IncomingSupply()
                    {
                        ID = (string)element.Element("ID"),
                        NOM_VAG = (string)element.Element("NOM_VAG"),
                        NOM_NAKL = (string)element.Element("NOM_NAKL"),
                        DATE_NAKL = (string)element.Element("DATE_NAKL"),
                        VBELN = (string)element.Element("VBELN"),
                        PSNR = (string)element.Element("PSNR"),
                        WERKS = (string)element.Element("WERKS"),
                        LGORT = (string)element.Element("LGORT"),
                        LGOBE = (string)element.Element("LGOBE"),
                        ERDAT = (string)element.Element("ERDAT"),
                        ETIME = (string)element.Element("ETIME"),
                        LGORT_10 = (string)element.Element("LGORT_10"),
                        LGOBE_10 = (string)element.Element("LGOBE_10"),
                        MATNR = (string)element.Element("MATNR"),
                        MAKTX = (string)element.Element("MAKTX"),
                        NAME_SH = (string)element.Element("NAME_SH"),
                        KOD_R_10 = (string)element.Element("KOD_R_10"),
                    };
                    //list_supply.Add(sypply);
                    return sypply;
                }
                return null;
                //return list_supply;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetIncomingSupply(ID={0}, NOM_NAKL={1}, NOM_VAG={2})", ID, NOM_NAKL, NOM_VAG), servece_owner, eventID);
                return null;
            }
        }
    }
}
