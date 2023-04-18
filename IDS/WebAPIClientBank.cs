using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace IDS
{
    public class ExchangeRate
    {
        public int re { get; set; }
        public string txt { get; set; }
        public decimal rate { get; set; }
        public string cc { get; set; }
        public DateTime exchangedate { get; set; }
    }
    public class WebAPIClientBank
    {
        private eventID eventID = eventID.IDS_WebApiClient;
        protected service servece_owner = service.Null;
        //public WebApiURL wapi;
        private string url_bank;

        public WebAPIClientBank(service servece_owner)
        {
            try
            {
                this.servece_owner = servece_owner;
                this.url_bank = ConfigurationManager.AppSettings["WebApi_BANK"].ToString();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("WebAPIClientBank()"), this.servece_owner, eventID);
            }
        }
        /// <summary>
        /// Выполнить запрос
        /// </summary>
        /// <param name="url"></param>
        /// <param name="url_api"></param>
        /// <param name="api_comand"></param>
        /// <param name="metod"></param>
        /// <param name="accept"></param>
        /// <param name="content_type"></param>
        /// <param name="postData"></param>
        /// <returns></returns>
        public string Select(string url, string metod, string accept, string content_type, string postData)
        {
            try
            {
                //String.Format("Выполняем запрос к WebAPI, url:{0}, api_comand {1}, metod {2}, accept {3}", url, api_comand, metod, accept).WriteInformation(eventID);

                //WebProxy myProxy = new WebProxy("10.21.1.18", 3128);
                //myProxy.Credentials = new NetworkCredential(@"krr-svc-RailWay", "B8T2OMoUyB4jZ62F49WT");


                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
                       | SecurityProtocolType.Tls11
                       | SecurityProtocolType.Tls12
                       | SecurityProtocolType.Ssl3;

                HttpWebRequest request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(url);
                //request.Proxy =  myProxy;
                request.Method = metod;
                //request.PreAuthenticate = true;
                //request.Credentials = CredentialCache.DefaultCredentials;
                request.Accept = accept;
                request.ContentType = content_type;
                if (!String.IsNullOrWhiteSpace(postData))
                {
                    Encoding encoding = Encoding.UTF8;
                    byte[] byte1 = encoding.GetBytes(postData);
                    request.ContentLength = byte1.Length;
                    Stream st = request.GetRequestStream();
                    st.Write(byte1, 0, byte1.Length);
                    st.Close();
                }
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
                            e.ExceptionLog(String.Format("Ошибка создания StreamReader ответа, команда {0}, метод {1}, accept {2}", url, metod, accept), this.eventID);
                            return null;
                        }
                    }
                }
                catch (Exception e)
                {
                    e.ExceptionLog(String.Format("Ошибка получения ответа WebResponse, команда {0}, метод {1}, accept {2}", url, metod, accept), this.eventID);
                    return null;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Select(url={0},api_comand={1},metod={2},accept={3})", url, url, metod, accept), this.eventID);
                return null;
            }
        }
        public List<ExchangeRate> GetExchangeRate()
        {
            try
            {
                List<ExchangeRate> list_result = new List<ExchangeRate>();
                string result = Select(this.url_bank, "GET", "text/html", "application/x-www-form-urlencoded", null);
                if (!String.IsNullOrWhiteSpace(result))
                {
                    XDocument doc = XDocument.Parse(result);
                    foreach (XElement element in doc.Element("exchange").Elements("currency"))
                    {
                        ExchangeRate exch_rate = new ExchangeRate()
                        { 
                            re = (int)element.Element("r030"),
                            txt = (string)element.Element("txt"),
                            rate = (decimal)element.Element("rate"),
                            cc = (string)element.Element("cc"),
                            exchangedate = DateTime.Parse((string)element.Element("exchangedate")),
                        };
                        list_result.Add(exch_rate);
                    }
                    return list_result;
                }
                return null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetExchangeRate()"), this.servece_owner, eventID);
                return null;
            }

        }
    }
}
