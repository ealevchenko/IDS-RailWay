using IDSLogs.Enum;
using IDSLogs;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Runtime.Serialization;
using EFMT.Entities;
using WebApiClient;
using Newtonsoft.Json.Linq;
using System.Xml.Linq;

namespace MT
{
    [Serializable]
    public class WagonsTrackingMT : ISerializable
    {
        public int id { get; set; }
        public int nvagon { get; set; }
        public int? st_disl { get; set; }
        public string nst_disl { get; set; }
        public int? kodop { get; set; }
        public string nameop { get; set; }
        public string full_nameop { get; set; }
        public DateTime? dt { get; set; }
        public int? st_form { get; set; }
        public string nst_form { get; set; }
        public int? idsost { get; set; }
        public string nsost { get; set; }
        public int? st_nazn { get; set; }
        public string nst_nazn { get; set; }
        public int? ntrain { get; set; }
        public int? st_end { get; set; }
        public string nst_end { get; set; }
        public int? kgr { get; set; }
        public string nkgr { get; set; }
        public int? kgrp { get; set; }
        public decimal? ves { get; set; }
        public DateTime? updated { get; set; }
        public int? kgro { get; set; }
        public int? km { get; set; }

        public WagonsTrackingMT()
        {

        }

        public WagonsTrackingMT(SerializationInfo info, StreamingContext context)
        {
            this.nvagon = (int)info.GetValue("nvagon", typeof(int));//
            this.st_disl = (int?)info.GetValue("st_disl", typeof(int?));//
            this.nst_disl = (string)info.GetValue("nst_disl", typeof(string));
            this.kodop = (int?)info.GetValue("kodop", typeof(int?));//
            this.nameop = (string)info.GetValue("nameop", typeof(string));//
            this.dt = ((string)info.GetValue("dt", typeof(string))).DateNullConversion();//
            this.nst_form = (string)info.GetValue("nst_form", typeof(string));//
            this.st_form = (int?)info.GetValue("st_form", typeof(int?));
            this.nsost = (string)info.GetValue("nsost", typeof(string));//
            this.st_nazn = (int?)info.GetValue("st_nazn", typeof(int?));//
            this.nst_nazn = (string)info.GetValue("nst_nazn", typeof(string));//
            this.ntrain = (int?)info.GetValue("ntrain", typeof(int?));//
            this.st_end = (int?)info.GetValue("st_end", typeof(int?));//
            this.nst_end = (string)info.GetValue("nst_end", typeof(string));//
            this.idsost = (int?)info.GetValue("idsost", typeof(int?));//
            this.kgr = (int?)info.GetValue("kgr", typeof(int?));//
            this.nkgr = (string)info.GetValue("nkgr", typeof(string));//
            this.kgrp = (int?)info.GetValue("kgrp", typeof(int?));
            this.ves = (decimal?)info.GetValue("ves", typeof(decimal?));
            this.updated = ((string)info.GetValue("updated", typeof(string))).DateNullConversion();
            //this.note = (string)info.GetValue("note", typeof(string));
            this.full_nameop = (string)info.GetValue("full_nameop", typeof(string));
            //this.nquest = (string)info.GetValue("nquest", typeof(string));
            this.kgro = (int?)info.GetValue("kgro", typeof(int?));
            this.km = (int?)info.GetValue("km", typeof(int?));
        }

        public void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            throw new NotImplementedException();
        }
    }

    [Serializable]
    public class WagonsArrivalMT : ISerializable
    {
        public int id { get; set; }
        public int position { get; set; }
        public int num { get; set; }
        public int country_code { get; set; }
        public decimal? wight { get; set; }
        public int cargo_code { get; set; }
        public string cargo { get; set; }
        public int station_code { get; set; }
        public string station { get; set; }
        public int consignee { get; set; }
        public string operation { get; set; }
        public string composition_index { get; set; }
        public DateTime date_operation { get; set; }
        public int train { get; set; }

        public WagonsArrivalMT()
        {

        }

        public WagonsArrivalMT(SerializationInfo info, StreamingContext context)
        {
            this.id = (int)info.GetValue("Id", typeof(int));
            this.position = (int)info.GetValue("Position", typeof(int));
            this.num = (int)info.GetValue("CarriageNumber", typeof(int));
            this.country_code = (int)info.GetValue("CountryCode", typeof(int));
            this.wight = (decimal?)info.GetValue("Weight", typeof(decimal?));
            this.cargo_code = (int)info.GetValue("IDCargo", typeof(int));
            this.cargo = (string)info.GetValue("Cargo", typeof(string));
            this.station_code = (int)info.GetValue("IDStation", typeof(int));
            this.station = (string)info.GetValue("Station", typeof(string));
            this.consignee = (int)info.GetValue("Consignee", typeof(int));
            this.operation = (string)info.GetValue("Operation", typeof(string));
            this.composition_index = (string)info.GetValue("CompositionIndex", typeof(string));
            this.date_operation = (DateTime)info.GetValue("DateOperation", typeof(DateTime));
            this.train = (int)info.GetValue("TrainNumber", typeof(int));
            //this.dt = ((string)info.GetValue("dt", typeof(string))).DateNullConversion();//
        }

        public void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            throw new NotImplementedException();
        }
    }


    public class RequestArrivalMT
    {
        public string id { get; set; }
        public List<WagonsArrivalMT> wagons { get; set; }
    }


    public class WebApiClientMT
    {
        private eventID eventID = eventID.MT_WebApiClient;
        protected service servece_owner = service.Null;
        public WebApiToken wapi;
        private string url;
        private string user;
        private string psw;
        private string api;
        private string api_arrival;

        public WebApiClientMT(service servece_owner)
        {
            try
            {
                this.servece_owner = servece_owner;
                this.url = ConfigurationManager.AppSettings["WebApiMTURL"].ToString();
                this.user = ConfigurationManager.AppSettings["WebApiMTUser"].ToString();
                this.psw = ConfigurationManager.AppSettings["WebApiMTPSW"].ToString();
                this.api = ConfigurationManager.AppSettings["WebApiMTApi"].ToString();
                this.api_arrival = ConfigurationManager.AppSettings["WebApiMTArrivalApi"].ToString();

                wapi = new WebApiToken(url, user, psw);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("WebApiClientMetallurgTrans()"), this.servece_owner, eventID);
            }
        }

        public WebApiClientMT(string url, string user, string psw, string api, service servece_owner)
        {
            try
            {
                this.servece_owner = servece_owner;
                this.url = url;
                this.user = user;
                this.psw = psw;
                this.api = api;
                wapi = new WebApiToken(url, user, psw);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("WebApiClientMetallurgTrans(url={0},user={1},psw={2},api={3})", url, user, psw, api), this.servece_owner, eventID);
            }
        }


        /// <summary>
        /// Получить все вагоны
        /// </summary>
        /// <returns></returns>
        public List<WagonsTrackingMT> GetWagonsTracking()
        {
            try
            {
                return wapi.GetJSONSelect<List<WagonsTrackingMT>>(this.api + "?nvagon=0");
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetWagonsTracking()"), this.servece_owner, eventID);
                return null;
            }
        }

        public List<WagonsTrackingMT> GetWagonsTracking(int num_vag)
        {
            try
            {
                return wapi.GetJSONSelect<List<WagonsTrackingMT>>(this.api + "?nvagon=" + num_vag.ToString());
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetWagonsTracking(num_vag={0})", num_vag), this.servece_owner, eventID);
                return null;
            }
        }

        public List<WagonsTrackingMT> GetWagonsTracking(int num_vag, DateTime date_start)
        {
            try
            {
                string select = String.Format(this.api + "?nvagon={0}&dt1={1}", num_vag, date_start.ToString("yyyy-MM-dd HH:mm:ss"));
                return wapi.GetJSONSelect<List<WagonsTrackingMT>>(select);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetWagonsTracking(num_vag={0}, date_start={1})", num_vag, date_start), this.servece_owner, eventID);
                return null;
            }

        }

        public List<WagonsTrackingMT> GetWagonsTracking(int num_vag, DateTime date_start, DateTime date_stop)
        {
            try
            {
                string select = String.Format(this.api + "?nvagon={0}&dt1={1}&dt2={2}", num_vag, date_start.ToString("yyyy-MM-dd HH:mm:ss"), date_stop.ToString("yyyy-MM-dd HH:mm:ss"));
                return wapi.GetJSONSelect<List<WagonsTrackingMT>>(select);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetWagonsTracking(num_vag={0}, date_start={1}, date_stop={2})", num_vag, date_start, date_stop), this.servece_owner, eventID);
                return null;
            }
        }

        public string GetJSONWagonsTracking()
        {
            try
            {
                return wapi.GetApiValues(this.api + "?nvagon=0");
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetJSONWagonsTracking()"), this.servece_owner, eventID);
                return null;
            }

        }

        #region API ARRIVAL
        public RequestArrivalMT GetArrival()
        {
            try
            {
                if (wapi == null) return null;
                if (wapi.error) return null;
                string resp = wapi.GetApiValues(this.api + "/Get");
                JObject o = JObject.Parse(resp);
                string mess = (string)o["Message"];
                if (String.IsNullOrWhiteSpace(mess))
                {
                    string RequestId = (string)o["RequestId"];
                    IList<WagonsArrivalMT> wagon_arr = o["Wagons"].Select(p => new WagonsArrivalMT
                    {
                        id = (int)p["Id"],
                        position = (int)p["Position"],
                        num = (int)p["CarriageNumber"],
                        country_code = (int)p["CountryCode"],
                        wight = (decimal?)p["Weight"],
                        cargo_code = (int)p["IDCargo"],
                        cargo = (string)p["Cargo"],
                        station_code = (int)p["IDStation"],
                        station = (string)p["Station"],
                        consignee = (int)p["Consignee"],
                        operation = (string)p["Operation"],
                        composition_index = (string)p["CompositionIndex"],
                        date_operation = (DateTime)p["DateOperation"],
                        train = (int?)p["TrainNumber"] == null ? 0 :(int)p["TrainNumber"]  
                    }).ToList();
                    RequestArrivalMT reguest_mt = new RequestArrivalMT()
                    {
                        id = RequestId,
                        wagons = wagon_arr.ToList(),
                    };
                    return reguest_mt;
                }
                else {
                    return null;
                }

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetArrival()"), this.servece_owner, eventID);
                return null;
            }
        }

        public string PostArrival(string id)
        {
            try
            {
                string resp = wapi.PostApiValues(this.api + "/ConfirmDelivery?id=" + id);
                return resp;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetArrival()"), this.servece_owner, eventID);
                return null;
            }
        }
        #endregion
    }
}
