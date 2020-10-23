using EFIDS.Concrete;
using IDS;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WEB_UI.Controllers.api.IDS.RWT
{


    public class view_wagons
    {
        public long wir_id { get; set; }
        public long wim_id { get; set; }
        public long? wio_id { get; set; }
        public int position { get; set; }
        public int num { get; set; }
        public int? wagon_adm { get; set; }
        public string wagon_adm_name_ru { get; set; }
        public string wagon_adm_name_en { get; set; }
        public string wagon_adm_abbr_ru { get; set; }
        public string wagon_adm_abbr_en { get; set; }
        public int? wagon_rod { get; set; }
        public string wagon_rod_name_ru { get; set; }
        public string wagon_rod_name_en { get; set; }
        public string wagon_rod_abbr_ru { get; set; }
        public string wagon_rod_abbr_en { get; set; }
        public string wagon_type_ru { get; set; }
        public string wagon_type_en { get; set; }
        public string wagon_operators_name_ru { get; set; }
        public string wagon_operators_name_en { get; set; }
        public string wagon_operators_abbr_ru { get; set; }
        public string wagon_operators_abbr_en { get; set; }
        public bool? wagon_operators_paid { get; set; }
        public string wagon_operators_color { get; set; }
        public DateTime? wagon_operators_rent_start { get; set; }
        public string wagon_limiting_name_ru { get; set; }
        public string wagon_limiting_name_en { get; set; }
        public string wagon_limiting_abbr_ru { get; set; }
        public string wagon_limiting_abbr_en { get; set; }
        public double? wagon_gruzp_doc { get; set; }
        public double wagon_gruzp_uz { get; set; }
        public int? wagon_tara_doc { get; set; }
        public int? wagon_tara_arc_doc { get; set; }
        public double? wagon_tara_uz { get; set; }
        public DateTime? wagon_date_rem_uz { get; set; }
        public DateTime arrival_datetime { get; set; }
        public int? arrival_duration { get; set; }
        public string arrival_condition_name_ru { get; set; }
        public string arrival_condition_name_en { get; set; }
        public string arrival_condition_abbr_ru { get; set; }
        public string arrival_condition_abbr_en { get; set; }
        public bool? arrival_condition_red { get; set; }
        public string arrival_cargo_group_name_ru { get; set; }
        public string arrival_cargo_group_name_en { get; set; }
        public string arrival_cargo_name_ru { get; set; }
        public string arrival_cargo_name_en { get; set; }
        public string arrival_certification_data_ru { get; set; }
        public string arrival_certification_data_en { get; set; }
        public int? arrival_vesg_doc { get; set; }
        public double? arrival_vesg_reweighing { get; set; }
        public int arrival_station_from_code { get; set; }
        public string arrival_station_from_name_ru { get; set; }
        public string arrival_station_from_name_en { get; set; }
        public string arrival_station_amkr_name_ru { get; set; }
        public string arrival_station_amkr_name_en { get; set; }
        public string arrival_station_amkr_abbr_ru { get; set; }
        public string arrival_station_amkr_abbr_en { get; set; }
        public string arrival_station_amkr_code { get; set; }
        public string arrival_division_amkr_name_ru { get; set; }
        public string arrival_division_amkr_name_en { get; set; }
        public string arrival_division_amkr_abbr_ru { get; set; }
        public string arrival_division_amkr_abbr_en { get; set; }
        public string current_operation_wagon_name_ru { get; set; }
        public string current_operation_wagon_name_en { get; set; }
        public DateTime? current_operation_wagon_start { get; set; }
        public DateTime? current_operation_wagon_end { get; set; }
        public bool? current_operation_wagon_busy { get; set; }
        public DateTime? current_operation_wagon_create { get; set; }
        public string current_operation_wagon_create_user { get; set; }
        public DateTime? current_operation_wagon_close { get; set; }
        public string current_operation_wagon_close_user { get; set; }
        public string current_loading_status_ru { get; set; }
        public string current_loading_status_en { get; set; }
        public string current_condition_name_ru { get; set; }
        public string current_condition_name_en { get; set; }
        public string current_condition_abbr_ru { get; set; }
        public string current_condition_abbr_en { get; set; }
        public bool? current_condition_red { get; set; }
        public string current_station_amkr_name_ru { get; set; }
        public string current_station_amkr_name_en { get; set; }
        public string current_station_amkr_abbr_ru { get; set; }
        public string current_station_amkr_abbr_en { get; set; }
        public int? current_station_amkr_idle_time { get; set; }
        public DateTime current_station_amkr_start { get; set; }
        public int? current_station_amkr_duration { get; set; }
        public string current_way_amkr_num_ru { get; set; }
        public string current_way_amkr_num_en { get; set; }
        public string current_way_amkr_name_ru { get; set; }
        public string current_way_amkr_name_en { get; set; }
        public string current_way_amkr_abbr_ru { get; set; }
        public string current_way_amkr_abbr_en { get; set; }
        public DateTime current_way_amkr_start { get; set; }
        public int? current_way_amkr_duration { get; set; }
        public DateTime current_wim_create { get; set; }
        public string current_wim_create_user { get; set; }
        public decimal usage_fee { get; set; }
        public string instructional_letters_num { get; set; }
        public DateTime? instructional_letters_datetime { get; set; }
        public int? instructional_letters_station { get; set; }
        public string instructional_letters_station_name { get; set; }
        public string sap_is_num { get; set; }
        public DateTime? sap_is_create_date { get; set; }
        public TimeSpan? sap_is_create_time { get; set; }
        public bool? sap_os_doc_outgoing_car { get; set; }
    }

    public class OperationDislocationWagons
    {
        public List<long> list_wir_id { get; set; }
        public int id_way_from { get; set; }
        public bool reverse { get; set; }
        public int id_way_on { get; set; }
        public bool side_on { get; set; }
        public DateTime date_start { get; set; }
        public DateTime date_stop { get; set; }
        public string user { get; set; }
    }

    public class OperationDissolutionWagons
    {
        public int id_way_from { get; set; }
        public List<DissolutionWagon> list_dissolution { get; set; }
        public int id_way_on { get; set; }
        public DateTime date_start { get; set; }
        public DateTime date_stop { get; set; }
        public string user { get; set; }
    }



    [RoutePrefix("api/ids/rwt/wsd")]
    public class IDS_RWT_WSDController : ApiController
    {
        private EFDbContext db = new EFDbContext();

        // GET: api/ids/rwt/wsd/view/vagons/way/id/111
        [Route("view/vagons/way/id/{id_way:int}")]
        [ResponseType(typeof(view_wagons))]
        public IHttpActionResult GetViewWagonsOfWay(int id_way)
        {
            try
            {
                string sql = "select * from [IDS].[get_view_wagons_of_way](" + id_way.ToString() + ") order by position";
                List<view_wagons> list = db.Database.SqlQuery<view_wagons>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // POST api/ids/rwt/wsd/operation/dislocation
        [HttpPost]
        [Route("operation/dislocation")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostDislocationWagonsOfStation([FromBody]OperationDislocationWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.DislocationWagonsOfStation(value.list_wir_id, value.id_way_from, value.reverse, value.id_way_on, value.side_on, value.date_start, value.date_stop, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/dissolution
        [HttpPost]
        [Route("operation/dissolution")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostDissolutionWagonsOfStation([FromBody]OperationDissolutionWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.DissolutionWagonsOfStation(value.id_way_from, value.list_dissolution, value.date_start, value.date_stop, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
