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

    public class WebAPIClientUZ
    {
        private eventID eventID = eventID.MT_WebApiClient;
        protected service servece_owner = service.Null;
        public WebApiURL wapi;
        private string url;

        public WebAPIClientUZ(service servece_owner)
        {
            try
            {
                this.servece_owner = servece_owner;
                this.url = ConfigurationManager.AppSettings["WebApiUZWagonURL"].ToString();
                wapi = new WebApiURL(url);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("WebAPIClientUZ()"), this.servece_owner, eventID);
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

                HtmlDocument htmlSnippet = new HtmlDocument();

                string result = wapi.Select(this.url, api_comand, "GET", "text/html");
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
                if (list != null && list.Count() == 17) {
                    UZWagonInfo wagon_info = new UZWagonInfo() { 
                        num = !String.IsNullOrWhiteSpace(list[1]) ? int.Parse(list[1]) : 0,
                        admin = !String.IsNullOrWhiteSpace(list[2]) ? list[2] : null,
                        owner = !String.IsNullOrWhiteSpace(list[3]) ? list[3] : null,
                        tenant_admin = !String.IsNullOrWhiteSpace(list[4]) ? list[4] : null,
                        tenant = !String.IsNullOrWhiteSpace(list[5]) ? list[5] : null,
                        operat = !String.IsNullOrWhiteSpace(list[6]) ? list[6] : null,
                        tara = !String.IsNullOrWhiteSpace(list[7]) ? float.Parse(list[7]) as float? : null,
                        carrying_capacity = !String.IsNullOrWhiteSpace(list[8]) ? float.Parse(list[8]) as float? : null,
                        resource = !String.IsNullOrWhiteSpace(list[9]) ? list[9] : null,
                        repair_date = !String.IsNullOrWhiteSpace(list[10]) ? DateTime.Parse(list[10]) as DateTime? : null,
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
    }
}
