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
        public DateTime? current_station_amkr_start { get; set; }
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

    public class view_wagon_outer_way
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
        public string arrival_division_amkr_code { get; set; }
        public string arrival_division_amkr_name_ru { get; set; }
        public string arrival_division_amkr_name_en { get; set; }
        public string arrival_division_amkr_abbr_ru { get; set; }
        public string arrival_division_amkr_abbr_en { get; set; }
        public string current_operation_wagon_name_ru { get; set; }
        public string current_operation_wagon_name_en { get; set; }
        public DateTime? current_operation_wagon_start { get; set; }
        public DateTime? current_operation_wagon_end { get; set; }
        public string current_operation_note { get; set; }
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
        public string from_station_amkr_name_ru { get; set; }
        public string from_station_amkr_name_en { get; set; }
        public string from_station_amkr_abbr_ru { get; set; }
        public string from_station_amkr_abbr_en { get; set; }
        public string current_outer_way_name_ru { get; set; }
        public string current_outer_way_name_en { get; set; }
        public DateTime? current_outer_way_amkr_start { get; set; }
        public string current_outer_way_note { get; set; }
        public int? current_outer_way_amkr_duration { get; set; }
        public string on_station_amkr_name_ru { get; set; }
        public string on_station_amkr_name_en { get; set; }
        public string on_station_amkr_abbr_ru { get; set; }
        public string on_station_amkr_abbr_en { get; set; }
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

    public class view_station_status
    {
        public int id { get; set; }
        public string station_name_ru { get; set; }
        public string station_name_en { get; set; }
        public string station_abbr_ru { get; set; }
        public string station_abbr_en { get; set; }
        public bool exit_uz { get; set; }
        public bool station_uz { get; set; }
        public bool? default_side { get; set; }
        public int? code { get; set; }
        public int? idle_time { get; set; }
        public int? count_arrive { get; set; }
        public int? count_sent { get; set; }
        public int? count_wagon { get; set; }
        public int? count_capacity { get; set; }
    }

    public class view_way_status
    {
        public int id { get; set; }
        public int id_station { get; set; }
        public int id_park { get; set; }
        public int position_park { get; set; }
        public int position_way { get; set; }
        public string park_name_ru { get; set; }
        public string park_name_en { get; set; }
        public string park_abbr_ru { get; set; }
        public string park_abbr_en { get; set; }
        public string way_num_ru { get; set; }
        public string way_num_en { get; set; }
        public string way_name_ru { get; set; }
        public string way_name_en { get; set; }
        public string way_abbr_ru { get; set; }
        public string way_abbr_en { get; set; }
        public int? capacity { get; set; }
        public int count_wagon { get; set; }
        public bool? deadlock { get; set; }
        public bool? crossing_uz { get; set; }
        public bool? crossing_amkr { get; set; }
        public int? id_devision { get; set; }
        public bool? dissolution { get; set; }
        public bool? output_dissolution { get; set; }
        public string note { get; set; }
        public DateTime create { get; set; }
        public string create_user { get; set; }
        public DateTime? change { get; set; }
        public string change_user { get; set; }
    }

    public class view_arrival_sostav
    {
        public string num_train { get; set; }
        public DateTime outer_way_start { get; set; }
        public int count_wagon { get; set; }
        public string locomotives { get; set; }
    }

    public class OperationDislocationWagons
    {
        public int id_way_from { get; set; }
        public bool reverse { get; set; }
        public List<ListOperationWagon> list_dislocation { get; set; }
        public int id_way_on { get; set; }
        public bool side_on { get; set; }
        public DateTime lead_time { get; set; }
        public string locomotive1 { get; set; }
        public string locomotive2 { get; set; }
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

    public class OperationSendingWagons
    {
        public int id_way_from { get; set; }
        public List<ListOperationWagon> list_sending { get; set; }
        public int id_outer_ways { get; set; }
        public int num_sostav { get; set; }
        public DateTime lead_time { get; set; }
        //public DateTime date_start { get; set; }
        //public DateTime date_stop { get; set; }
        public string locomotive1 { get; set; }
        public string locomotive2 { get; set; }
        public string user { get; set; }
    }

    public class OperationArrivalWagons
    {
        public int id_outer_way { get; set; }
        public bool reverse { get; set; }
        public List<ListOperationWagon> list_arrival { get; set; }
        public int id_way_on { get; set; }
        public bool side_on { get; set; }
        public DateTime lead_time { get; set; }
        public string locomotive1 { get; set; }
        public string locomotive2 { get; set; }
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

        // GET: api/ids/rwt/wsd/view/vagons/outer_way/id/12
        [Route("view/vagons/outer_way/id/{id_outer_way:int}")]
        [ResponseType(typeof(view_wagon_outer_way))]
        public IHttpActionResult GetViewWagonsOfOuterWay(int id_outer_way)
        {
            try
            {
                string sql = "select * from [IDS].[get_view_wagons_of_outer_way](" + id_outer_way.ToString() + ") order by position";
                List<view_wagon_outer_way> list = db.Database.SqlQuery<view_wagon_outer_way>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/station/status/all
        [Route("view/station/status/all")]
        [ResponseType(typeof(view_station_status))]
        public IHttpActionResult GetViewStationStatus()
        {
            try
            {
                string sql = "select * from [IDS].[get_view_station_status]()";
                List<view_station_status> list = db.Database.SqlQuery<view_station_status>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/station/status/id/6
        [Route("view/station/status/id/{id_station:int}")]
        [ResponseType(typeof(view_station_status))]
        public IHttpActionResult GetViewStationStatusOfIDStation(int id_station)
        {
            try
            {
                string sql = "select * from [IDS].[get_view_station_status_of_id](" + id_station + ")";
                view_station_status station = db.Database.SqlQuery<view_station_status>(sql).ToList().FirstOrDefault();
                return Ok(station);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/arrival/sostav/outer_way/id/12
        [Route("view/arrival/sostav/outer_way/id/{id_outer_way:int}")]
        [ResponseType(typeof(view_arrival_sostav))]
        public IHttpActionResult GetViewArrivalSostavOfIDOuterWay(int id_outer_way)
        {
            try
            {
                string sql = "select * from [IDS].[get_arrival_sostav_of_id_outer_way](" + id_outer_way + ")";
                List<view_arrival_sostav> sostavs = db.Database.SqlQuery<view_arrival_sostav>(sql).ToList();
                return Ok(sostavs);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/ways/status/station/id/6
        [Route("view/ways/status/station/id/{id_station:int}")]
        [ResponseType(typeof(view_way_status))]
        public IHttpActionResult GetViewWaysStatusOfIDStation(int id_station)
        {
            try
            {
                string sql = "select * from [IDS].[get_view_ways_status_of_station](" + id_station + ") order by position_park, position_way";
                List<view_way_status> ways = db.Database.SqlQuery<view_way_status>(sql).ToList();
                return Ok(ways);
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
        public IHttpActionResult PostDislocationWagonsOfStation([FromBody] OperationDislocationWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.DislocationWagonsOfStation(value.id_way_from, value.reverse, value.list_dislocation, value.id_way_on, value.side_on, value.lead_time, value.locomotive1, value.locomotive2, value.user);
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
        public IHttpActionResult PostDissolutionWagonsOfStation([FromBody] OperationDissolutionWagons value)
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

        // POST api/ids/rwt/wsd/operation/sending
        [HttpPost]
        [Route("operation/sending")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostSendingWagonsOfStation([FromBody] OperationSendingWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.SendingWagonsOfStation(value.id_way_from, value.list_sending, value.id_outer_ways, value.num_sostav, value.lead_time, value.locomotive1, value.locomotive2, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/arrival
        [HttpPost]
        [Route("operation/arrival")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostArrivalWagonsOfStation([FromBody] OperationArrivalWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.ArrivalWagonsOfStation(value.id_outer_way, value.reverse, value.list_arrival, value.id_way_on, value.side_on, value.lead_time, value.locomotive1, value.locomotive2, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
