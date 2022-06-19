using IDSLogs.Enum;
using IDSLogs;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApiClient;
using HtmlAgilityPack;
using System.Globalization;
using System.Net;
using System.IO;

namespace UZ
{
    public class UZWagonInfo
    {
        public int num { get; set; }
        public string admin { get; set; }
        public string owner { get; set; }
        public string tenant_admin { get; set; }
        public string tenant { get; set; }
        public string operat { get; set; }
        public float? tara { get; set; }
        public float? carrying_capacity { get; set; }
        public string resource { get; set; }
        public DateTime? repair_date { get; set; }
        public string baseness { get; set; }
        public string rtp { get; set; }
        public string new_construction { get; set; }
        public string closed_route { get; set; }
        public string exit_ban { get; set; }
        public string other_bans { get; set; }
    }

    public class UZStationInfo
    {
        public int code { get; set; }
        public string name { get; set; }
        public string name_uk { get; set; }
        public string admin { get; set; }
        public string ir { get; set; }
        public string node { get; set; }
    }
    //TODO:Удалить перенес в WebAPIClientUZ_GOV
    //public class WebAPIClientUZ
    //{
    //    private eventID eventID = eventID.MT_WebApiClient;
    //    protected service servece_owner = service.Null;
    //    public WebApiURL wapi;
    //    private string url;

    //    public WebAPIClientUZ(service servece_owner)
    //    {
    //        try
    //        {
    //            this.servece_owner = servece_owner;
    //            this.url = ConfigurationManager.AppSettings["WebApiUZWagonURL"].ToString();
    //            wapi = new WebApiURL(url);
    //        }
    //        catch (Exception e)
    //        {
    //            e.ExceptionMethodLog(String.Format("WebAPIClientUZ()"), this.servece_owner, eventID);
    //        }
    //    }
    //    /// <summary>
    //    /// Получить информацию по вагону из сайта УЗ
    //    /// </summary>
    //    /// <param name="num"></param>
    //    /// <returns></returns>
    //    public List<string> GetInfoWagon(int num)
    //    {
    //        try
    //        {
    //            string api_comand = "?func=print&site_nv=" + num.ToString();
    //            //string api_comand = "?p_NV=" + num.ToString();

    //            HtmlDocument htmlSnippet = new HtmlDocument();

    //            string result = wapi.Select(this.url, api_comand, "GET", "text/html");
    //            if (!String.IsNullOrWhiteSpace(result))
    //            {
    //                htmlSnippet.LoadHtml(result);

    //                List<string> hrefTags = new List<string>();

    //                foreach (HtmlNode link in htmlSnippet.DocumentNode.SelectNodes("//td"))
    //                {
    //                    string value = link.InnerHtml;
    //                    value = value.Replace("&nbsp;", "");
    //                    hrefTags.Add(value);
    //                }
    //                return hrefTags;
    //            }
    //            return null;
    //        }
    //        catch (Exception e)
    //        {
    //            e.ExceptionMethodLog(String.Format("GetSelect(num={0})", num), this.servece_owner, eventID);
    //            return null;
    //        }

    //    }
    //    /// <summary>
    //    /// Получить информацию по вагону из сайта УЗ
    //    /// </summary>
    //    /// <param name="num"></param>
    //    /// <returns></returns>
    //    public UZWagonInfo GetInfoWagonOfNum(int num)
    //    {
    //        try
    //        {
    //            List<string> list = GetInfoWagon(num);
    //            if (list != null && list.Count() == 17)
    //            {
    //                UZWagonInfo wagon_info = new UZWagonInfo()
    //                {
    //                    num = !String.IsNullOrWhiteSpace(list[1]) ? int.Parse(list[1]) : 0,
    //                    admin = !String.IsNullOrWhiteSpace(list[2]) ? list[2] : null,
    //                    owner = !String.IsNullOrWhiteSpace(list[3]) ? list[3] : null,
    //                    tenant_admin = !String.IsNullOrWhiteSpace(list[4]) ? list[4] : null,
    //                    tenant = !String.IsNullOrWhiteSpace(list[5]) ? list[5] : null,
    //                    operat = !String.IsNullOrWhiteSpace(list[6]) ? list[6] : null,
    //                    tara = !String.IsNullOrWhiteSpace(list[7]) ? float.Parse(list[7], CultureInfo.CreateSpecificCulture("en")) as float? : null,
    //                    carrying_capacity = !String.IsNullOrWhiteSpace(list[8]) ? float.Parse(list[8], CultureInfo.CreateSpecificCulture("en")) as float? : null,
    //                    resource = !String.IsNullOrWhiteSpace(list[9]) ? list[9] : null,
    //                    repair_date = !String.IsNullOrWhiteSpace(list[10]) ? DateTime.Parse(list[10], CultureInfo.CreateSpecificCulture("ru-RU")) as DateTime? : null,
    //                    baseness = !String.IsNullOrWhiteSpace(list[11]) ? list[11] : null,
    //                    rtp = !String.IsNullOrWhiteSpace(list[12]) ? list[12] : null,
    //                    new_construction = !String.IsNullOrWhiteSpace(list[13]) ? list[13] : null,
    //                    closed_route = !String.IsNullOrWhiteSpace(list[14]) ? list[14] : null,
    //                    exit_ban = !String.IsNullOrWhiteSpace(list[15]) ? list[15] : null,
    //                    other_bans = !String.IsNullOrWhiteSpace(list[16]) ? list[16] : null,
    //                };
    //                return wagon_info;
    //            }
    //            return null;
    //        }
    //        catch (Exception e)
    //        {
    //            e.ExceptionMethodLog(String.Format("GetInfoWagonOfNum(num={0})", num), this.servece_owner, eventID);
    //            return null;
    //        }

    //    }
    //}

    public class WebAPIClientUZ_GOV
    {
        private eventID eventID = eventID.MT_WebApiClient;
        protected service servece_owner = service.Null;
        //public WebApiURL wapi;
        private string url_gov;
        private string url_api_wagon;
        private string url_api_station;

        public WebAPIClientUZ_GOV(service servece_owner)
        {
            try
            {
                this.servece_owner = servece_owner;
                this.url_gov = ConfigurationManager.AppSettings["WebApi_UZ_GOV"].ToString();
                this.url_api_wagon = ConfigurationManager.AppSettings["WebApi_WAGON"].ToString();
                this.url_api_station = ConfigurationManager.AppSettings["WebApi_STATION"].ToString();
                //wapi = new WebApiURL(url);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("WebAPIClientUZ_GOV()"), this.servece_owner, eventID);
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
        public string Select(string url, string url_api, string api_comand, string metod, string accept, string content_type, string postData)
        {
            try
            {
                //String.Format("Выполняем запрос к WebAPI, url:{0}, api_comand {1}, metod {2}, accept {3}", url, api_comand, metod, accept).WriteInformation(eventID);

                WebProxy myProxy = new WebProxy("10.21.1.18", 3128);
                myProxy.Credentials = new NetworkCredential(@"krr-svc-RailWay", "B8T2OMoUyB4jZ62F49WT");


                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
                       | SecurityProtocolType.Tls11
                       | SecurityProtocolType.Tls12
                       | SecurityProtocolType.Ssl3;

                HttpWebRequest request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(url+ url_api + api_comand);
                //request.Proxy =  myProxy;
                request.Method = metod;
                //request.PreAuthenticate = true;
                //request.Credentials = CredentialCache.DefaultCredentials;
                request.Accept = accept;
                request.ContentType = content_type;
                if (!String.IsNullOrWhiteSpace(postData)) {
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
                            e.ExceptionLog(String.Format("Ошибка создания StreamReader ответа, команда {0}, метод {1}, accept {2}", api_comand, metod, accept), this.eventID);
                            return null;
                        }
                    }
                }
                catch (Exception e)
                {
                    e.ExceptionLog(String.Format("Ошибка получения ответа WebResponse, команда {0}, метод {1}, accept {2}", api_comand, metod, accept), this.eventID);
                    return null;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Select(url={0},api_comand={1},metod={2},accept={3})", url, api_comand, metod, accept), this.eventID);
                return null;
            }
        }
        /// <summary>
        /// Получить информацию по вагону из сайта УЗ
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public List<string> GetInfoWagon(int num)
        {
            try
            {
                string api_comand = "?func=print&site_nv=" + num.ToString();
                //string api_comand = "?p_NV=" + num.ToString();

                HtmlDocument htmlSnippet = new HtmlDocument();

                string result = Select(this.url_gov,this.url_api_wagon, api_comand, "GET", "text/html", "application/x-www-form-urlencoded", null);
                if (!String.IsNullOrWhiteSpace(result))
                {
                    htmlSnippet.LoadHtml(result);

                    List<string> hrefTags = new List<string>();

                    foreach (HtmlNode link in htmlSnippet.DocumentNode.SelectNodes("//td"))
                    {
                        string value = link.InnerHtml;
                        value = value.Replace("&nbsp;", "");
                        hrefTags.Add(value);
                    }
                    return hrefTags;
                }
                return null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetSelect(num={0})", num), this.servece_owner, eventID);
                return null;
            }

        }
        /// <summary>
        /// Получить информацию по вагону из сайта УЗ
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public UZWagonInfo GetInfoWagonOfNum(int num)
        {
            try
            {
                List<string> list = GetInfoWagon(num);
                if (list != null && list.Count() == 17)
                {
                    UZWagonInfo wagon_info = new UZWagonInfo()
                    {
                        num = !String.IsNullOrWhiteSpace(list[1]) ? int.Parse(list[1]) : 0,
                        admin = !String.IsNullOrWhiteSpace(list[2]) ? list[2] : null,
                        owner = !String.IsNullOrWhiteSpace(list[3]) ? list[3] : null,
                        tenant_admin = !String.IsNullOrWhiteSpace(list[4]) ? list[4] : null,
                        tenant = !String.IsNullOrWhiteSpace(list[5]) ? list[5] : null,
                        operat = !String.IsNullOrWhiteSpace(list[6]) ? list[6] : null,
                        tara = !String.IsNullOrWhiteSpace(list[7]) ? float.Parse(list[7], CultureInfo.CreateSpecificCulture("en")) as float? : null,
                        carrying_capacity = !String.IsNullOrWhiteSpace(list[8]) ? float.Parse(list[8], CultureInfo.CreateSpecificCulture("en")) as float? : null,
                        resource = !String.IsNullOrWhiteSpace(list[9]) ? list[9] : null,
                        repair_date = !String.IsNullOrWhiteSpace(list[10]) ? DateTime.Parse(list[10], CultureInfo.CreateSpecificCulture("ru-RU")) as DateTime? : null,
                        baseness = !String.IsNullOrWhiteSpace(list[11]) ? list[11] : null,
                        rtp = !String.IsNullOrWhiteSpace(list[12]) ? list[12] : null,
                        new_construction = !String.IsNullOrWhiteSpace(list[13]) ? list[13] : null,
                        closed_route = !String.IsNullOrWhiteSpace(list[14]) ? list[14] : null,
                        exit_ban = !String.IsNullOrWhiteSpace(list[15]) ? list[15] : null,
                        other_bans = !String.IsNullOrWhiteSpace(list[16]) ? list[16] : null,
                    };
                    return wagon_info;
                }
                return null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetInfoWagonOfNum(num={0})", num), this.servece_owner, eventID);
                return null;
            }

        }

        public List<UZStationInfo> GetInfoStationOfCode(int code)
        {
            try
            {
                string api_comand = "";
                //string postData = "B1=%D0%9F%D0%BE%D1%88%D1%83%D0%BA&D2=n_stan&R1=1&T1=&T2="+code.ToString()+"&T3=22&T4=&T5=";
                string postData = "T1=&T2=" + code.ToString() + "&T3=&T4=&T5=&B1=%D0%9F%D0%BE%D1%88%D1%83%D0%BA&R1=1&D2=n_stan";

                HtmlDocument htmlSnippet = new HtmlDocument();
                List<string> list_fields = new List<string>();
                List<UZStationInfo> list_ststion_uz = new List<UZStationInfo>();

                string result = Select(this.url_gov, this.url_api_station, api_comand, "POST", "text/html", "application/x-www-form-urlencoded", postData);
                if (!String.IsNullOrWhiteSpace(result))
                {
                    string sstr = "<br><table border='1' bgcolor='#ffffff' align=center cellpadding='1' cellspacing='0' height='20' width='600'>";
                    int indexOfSubstring = result.IndexOf(sstr);
                    if (indexOfSubstring > 0)
                    {
                        string text = result.Remove(0, (indexOfSubstring + sstr.Length));
                        indexOfSubstring = text.IndexOf("</table>");
                        if (indexOfSubstring > 0)
                        {
                            string res_tab = text.Remove(indexOfSubstring);
                            if (!String.IsNullOrWhiteSpace(res_tab))
                            {
                                // таблица определена
                                htmlSnippet.LoadHtml(res_tab);
                                foreach (HtmlNode link in htmlSnippet.DocumentNode.SelectNodes("//tr"))
                                {
                                    string value = link.InnerHtml;
                                    value = value.Replace("&nbsp;", "");
                                    if (!String.IsNullOrWhiteSpace(value))
                                    {
                                        // подстрока tr определена
                                        HtmlDocument html_tr = new HtmlDocument();
                                        html_tr.LoadHtml(value);
                                        
                                        foreach (HtmlNode field in html_tr.DocumentNode.SelectNodes("//td"))
                                        {
                                            string value_fl = field.InnerHtml;
                                            if (value_fl == "<b> Код: </b>") break; // Пропустим заглавие
                                            value_fl = value_fl.Replace("&nbsp;", "");
                                            list_fields.Add(value_fl);
                                        }

                                        if (list_fields.Count() == 6)
                                        {
                                            UZStationInfo str = new UZStationInfo()
                                            {
                                                code = !String.IsNullOrWhiteSpace(list_fields[0]) ? int.Parse(list_fields[0]) : 0,
                                                name = !String.IsNullOrWhiteSpace(list_fields[1]) ? list_fields[1] : null,
                                                name_uk = !String.IsNullOrWhiteSpace(list_fields[2]) ? list_fields[2] : null,
                                                admin = !String.IsNullOrWhiteSpace(list_fields[3]) ? list_fields[3] : null,
                                                ir = !String.IsNullOrWhiteSpace(list_fields[4]) ? list_fields[4] : null,
                                                node = !String.IsNullOrWhiteSpace(list_fields[5]) ? list_fields[5] : null,
                                            };
                                            list_ststion_uz.Add(str);
                                        }

                                    }
                                }
                                
                            }
                        }
                    }
                    return list_ststion_uz;
                }
                return null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetInfoStation(num={0})", code), this.servece_owner, eventID);
                return null;
            }

        }
    }
}
