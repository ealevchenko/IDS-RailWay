using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EFIDS.Helper;
using EFIDS.Abstract;
using EFIDS.Entities;
using System.Data;
using System.ComponentModel.DataAnnotations;

namespace WEB_UI.Controllers.api
{
    /// <summary>
    /// Класс набора данных по вагонам принятым на АМКР
    /// </summary>
    public class ViewIncomingCars
    {
        public long? arrival_car_id { get; set; }
        public int? num { get; set; }
        public int? arrival_car_position_arrival { get; set; }
        public long? id_wir { get; set; }
        // Добавил 21-06-2022
        public long? arrival_car_id_outgoing_car { get; set; }
        public long? arrival_car_id_outgoing_uz_vagon { get; set; }
        // Добавил 12-12-2022
        public long? old_arrival_car_id_outgoing_car { get; set; }
        public long? old_arrival_car_id_outgoing_uz_vagon { get; set; }
        public DateTime? old_date_outgoing { get; set; }
        public DateTime? old_date_outgoing_act { get; set; }
        public int? old_outgoing_uz_vagon_id_cargo { get; set; }
        public string old_outgoing_uz_vagon_cargo_name_ru { get; set; }
        public string old_outgoing_uz_vagon_cargo_name_en { get; set; }
        public int? old_outgoingl_uz_document_code_stn_to { get; set; }
        public string old_outgoing_uz_document_station_to_name_ru { get; set; }
        public string old_outgoing_uz_document_station_to_name_en { get; set; }
        // Добавил 10-05-2022
        public long? arrival_car_wim_cur_id { get; set; }
        public long? arrival_car_wim_cur_id_wagon_internal_routes { get; set; }
        public int? arrival_car_wim_cur_id_station { get; set; }
        public string arrival_car_wim_cur_station_name_ru { get; set; }
        public string arrival_car_wim_cur_station_name_en { get; set; }
        public string arrival_car_wim_cur_station_abbr_ru { get; set; }
        public string arrival_car_wim_cur_station_abbr_en { get; set; }
        public int? arrival_car_wim_cur_id_way { get; set; }
        public int? arrival_car_wim_cur_way_on_id_park { get; set; }
        public string arrival_car_wim_cur_way_num_ru { get; set; }
        public string arrival_car_wim_cur_way_num_en { get; set; }
        public string arrival_car_wim_cur_way_name_ru { get; set; }
        public string arrival_car_wim_cur_way_name_en { get; set; }
        public string arrival_car_wim_cur_way_abbr_ru { get; set; }
        public string arrival_car_wim_cur_way_abbr_en { get; set; }
        public DateTime? arrival_car_wim_cur_way_start { get; set; }
        public DateTime? arrival_car_wim_cur_way_end { get; set; }
        public int? arrival_car_wim_cur_id_outer_way { get; set; }
        public string arrival_car_wim_cur_name_outer_way_ru { get; set; }
        public string arrival_car_wim_cur_name_outer_way_en { get; set; }
        public DateTime? arrival_car_wim_cur_outer_way_start { get; set; }
        public DateTime? arrival_car_wim_cur_outer_way_end { get; set; }
        public int? arrival_car_wim_cur_position { get; set; }
        public string arrival_car_wim_cur_note { get; set; }
        public long? arrival_car_wim_cur_parent_id { get; set; }
        public long? arrival_car_wim_cur_id_wio { get; set; }
        public string arrival_car_wim_cur_num_sostav { get; set; }
        public int? arrival_car_position { get; set; }
        public int? arrival_car_consignee { get; set; }
        public string arrival_car_num_doc { get; set; }
        public long? arrival_car_id_transfer { get; set; }
        public string arrival_car_note { get; set; }
        public DateTime? arrival_car_date_adoption_act { get; set; }
        public DateTime? arrival_car_arrival { get; set; }
        public string arrival_car_arrival_user { get; set; }
        public DateTime? arrival_car_create { get; set; }
        public string arrival_car_create_user { get; set; }
        public DateTime? arrival_car_change { get; set; }
        public string arrival_car_change_user { get; set; }
        public long arrival_sostav_id { get; set; }
        public long? arrival_sostav_id_arrived { get; set; }
        public long? arrival_sostav_id_sostav { get; set; }
        public int arrival_sostav_train { get; set; }
        public string arrival_sostav_composition_index { get; set; }
        public DateTime arrival_sostav_date_arrival { get; set; }
        public DateTime? arrival_sostav_date_adoption { get; set; }
        public DateTime? arrival_sostav_date_adoption_act { get; set; }
        public int? arrival_sostav_id_station_from { get; set; }
        public string arrival_sostav_station_from_name_ru { get; set; }
        public string arrival_sostav_station_from_name_en { get; set; }
        public string arrival_sostav_station_from_abbr_ru { get; set; }
        public string arrival_sostav_station_from_abbr_en { get; set; }
        public int? arrival_sostav_id_station_on { get; set; }
        public string arrival_sostav_station_on_name_ru { get; set; }
        public string arrival_sostav_station_on_name_en { get; set; }
        public string arrival_sostav_station_on_abbr_ru { get; set; }
        public string arrival_sostav_station_on_abbr_en { get; set; }
        public int? arrival_sostav_id_way { get; set; }
        public int? arrival_sostav_way_on_id_park { get; set; }
        public string arrival_sostav_way_on_num_ru { get; set; }
        public string arrival_sostav_way_on_num_en { get; set; }
        public string arrival_sostav_way_on_name_ru { get; set; }
        public string arrival_sostav_way_on_name_en { get; set; }
        public string arrival_sostav_way_on_abbr_ru { get; set; }
        public string arrival_sostav_way_on_abbr_en { get; set; }
        public bool? arrival_sostav_numeration { get; set; }
        public int? arrival_sostav_num_doc { get; set; }
        public int? arrival_sostav_count { get; set; }
        public int arrival_sostav_status { get; set; }
        public string arrival_sostav_note { get; set; }
        public DateTime arrival_sostav_create { get; set; }
        public string arrival_sostav_create_user { get; set; }
        public DateTime? arrival_sostav_change { get; set; }
        public string arrival_sostav_change_user { get; set; }
        public long? arrival_uz_vagon_id { get; set; }
        public long? arrival_uz_vagon_id_arrival { get; set; }
        public int? arrival_uz_vagon_id_owner { get; set; }
        public string arrival_uz_vagon_owner_wagon_ru { get; set; }
        public string arrival_uz_vagon_owner_wagon_en { get; set; }
        public string arrival_uz_vagon_owner_wagon_abbr_ru { get; set; }
        public string arrival_uz_vagon_owner_wagon_abbr_en { get; set; }
        //Добавил 16.04
        public int? arrival_uz_vagon_id_type_ownership { get; set; }
        public string arrival_uz_vagon_type_ownership_ru { get; set; }
        public string arrival_uz_vagon_type_ownership_en { get; set; }
        //----------------------------------------------------------------
        public int? arrival_uz_vagon_id_countrys { get; set; }
        public int? arrival_uz_vagon_wagon_adm { get; set; }
        public string arrival_uz_vagon_wagon_adm_name_ru { get; set; }
        public string arrival_uz_vagon_wagon_adm_name_en { get; set; }
        public string arrival_uz_vagon_wagon_adm_abbr_ru { get; set; }
        public string arrival_uz_vagon_wagon_adm_abbr_en { get; set; }
        public int? arrival_uz_vagon_id_genus { get; set; }
        public int? arrival_uz_vagon_rod { get; set; }
        public string arrival_uz_vagon_rod_name_ru { get; set; }
        public string arrival_uz_vagon_rod_name_en { get; set; }
        public string arrival_uz_vagon_rod_abbr_ru { get; set; }
        public string arrival_uz_vagon_rod_abbr_en { get; set; }
        public int? arrival_uz_vagon_wagon_kol_os { get; set; }
        public string arrival_uz_vagon_wagon_usl_tip { get; set; }
        public DateTime? arrival_uz_vagon_wagon_date_rem_uz { get; set; }
        public DateTime? arrival_uz_vagon_wagon_date_rem_vag { get; set; }
        public int? arrival_uz_vagon_id_condition { get; set; }
        public string arrival_uz_vagon_condition_name_ru { get; set; }
        public string arrival_uz_vagon_condition_name_en { get; set; }
        public string arrival_uz_vagon_condition_abbr_ru { get; set; }
        public string arrival_uz_vagon_condition_abbr_en { get; set; }
        public bool? arrival_uz_vagon_condition_repairs { get; set; }
        public int? arrival_uz_vagon_id_wagons_rent_arrival { get; set; }
        public int? arrival_uz_vagon_arrival_wagons_rent_id_operator { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_operators_ru { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_operators_en { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_operator_abbr_ru { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_operator_abbr_en { get; set; }
        public DateTime? arrival_uz_vagon_arrival_wagons_rent_start { get; set; }
        public DateTime? arrival_uz_vagon_arrival_wagons_rent_end { get; set; }
        public bool? arrival_uz_vagon_arrival_wagons_rent_operator_paid { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_operator_color { get; set; }
        public int? arrival_uz_vagon_arrival_wagons_rent_group_id_operator { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_group_operators_ru { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_group_operators_en { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_operator_group_abbr_ru { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_operator_group_abbr_en { get; set; }
        public int? arrival_uz_vagon_arrival_wagons_rent_id_limiting { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_limiting_name_ru { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_limiting_name_en { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_ru { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_en { get; set; }
        public int? arrival_uz_vagon_id_type { get; set; }
        public string arrival_uz_vagon_type_ru { get; set; }
        public string arrival_uz_vagon_type_en { get; set; }
        public double? arrival_uz_vagon_gruzp { get; set; }
        public int? arrival_uz_vagon_u_tara { get; set; }
        public int? arrival_uz_vagon_ves_tary_arc { get; set; }
        // Добавил 16.04
        public double? arrival_uz_vagon_gruzp_uz { get; set; }
        public double? arrival_uz_vagon_tara_uz { get; set; }
        //
        public bool? arrival_uz_vagon_route { get; set; }
        public string arrival_uz_vagon_note_vagon { get; set; }
        public int? arrival_uz_vagon_id_cargo { get; set; }
        public string arrival_uz_vagon_cargo_name_ru { get; set; }
        public string arrival_uz_vagon_cargo_name_en { get; set; }
        public int? arrival_uz_vagon_id_group { get; set; }
        public string arrival_uz_vagon_cargo_group_name_ru { get; set; }
        public string arrival_uz_vagon_cargo_group_name_en { get; set; }
        public int? arrival_uz_vagon_id_cargo_etsng { get; set; }
        public int? arrival_uz_vagon_cargo_etsng_code { get; set; }
        public string arrival_uz_vagon_cargo_etsng_name_ru { get; set; }
        public string arrival_uz_vagon_cargo_etsng_name_en { get; set; }
        public int? arrival_uz_vagon_id_cargo_gng { get; set; }
        public int? arrival_uz_vagon_cargo_gng_code { get; set; }
        public string arrival_uz_vagon_cargo_gng_name_ru { get; set; }
        public string arrival_uz_vagon_cargo_gng_name_en { get; set; }
        public int? arrival_uz_vagon_id_certification_data { get; set; }
        public string arrival_uz_vagon_sertification_data_ru { get; set; }
        public string arrival_uz_vagon_sertification_data_en { get; set; }
        public int? arrival_uz_vagon_id_commercial_condition { get; set; }
        public string arrival_uz_vagon_commercial_condition_ru { get; set; }
        public string arrival_uz_vagon_commercial_condition_en { get; set; }
        // добавил 25.04.2022
        public string arrival_uz_vagon_zayava { get; set; }
        public int? arrival_uz_vagon_kol_pac { get; set; }
        public string arrival_uz_vagon_pac { get; set; }
        public int? arrival_uz_vagon_vesg { get; set; }
        public double? arrival_uz_vagon_vesg_reweighing { get; set; }
        public string arrival_uz_vagon_nom_zpu { get; set; }
        public string arrival_uz_vagon_danger { get; set; }
        public string arrival_uz_vagon_danger_kod { get; set; }
        public bool? arrival_uz_vagon_cargo_returns { get; set; }
        public int? arrival_uz_vagon_id_station_on_amkr { get; set; }
        public string arrival_uz_vagon_station_amkr_name_ru { get; set; }
        public string arrival_uz_vagon_station_amkr_name_en { get; set; }
        public string arrival_uz_vagon_station_amkr_abbr_ru { get; set; }
        public string arrival_uz_vagon_station_amkr_abbr_en { get; set; }
        public int? arrival_uz_vagon_id_division_on_amkr { get; set; }
        public string arrival_uz_vagon_division_code { get; set; }
        public string arrival_uz_vagon_name_division_ru { get; set; }
        public string arrival_uz_vagon_name_division_en { get; set; }
        public string arrival_uz_vagon_division_abbr_ru { get; set; }
        public string arrival_uz_vagon_division_abbr_en { get; set; }
        public int? arrival_uz_vagon_id_type_devision { get; set; }
        public bool? arrival_uz_vagon_empty_car { get; set; }
        public int? arrival_uz_vagon_kol_conductor { get; set; }
        // добавил 10-05-2022
        public bool? arrival_uz_vagon_manual { get; set; }
        // добавил 22-05-2022
        public int? arrival_uz_vagon_pay_summa { get; set; }
        public DateTime? arrival_uz_vagon_create { get; set; }
        public string arrival_uz_vagon_create_user { get; set; }
        public DateTime? arrival_uz_vagon_change { get; set; }
        public string arrival_uz_vagon_change_user { get; set; }
        public long? arrival_uz_document_id { get; set; }
        public string arrival_uz_document_id_doc_uz { get; set; }
        public int? arrival_uz_document_nom_doc { get; set; }
        public int? arrival_uz_document_nom_main_doc { get; set; }
        public int? arrival_uz_document_code_stn_from { get; set; }
        public string arrival_uz_document_station_from_name_ru { get; set; }
        public string arrival_uz_document_station_from_name_en { get; set; }
        public int? arrival_uz_document_from_code_inlandrailway { get; set; }
        public string arrival_uz_document_from_inlandrailway_name_ru { get; set; }
        public string arrival_uz_document_from_inlandrailway_name_en { get; set; }
        public string arrival_uz_document_from_inlandrailway_abbr_ru { get; set; }
        public string arrival_uz_document_from_inlandrailway_abbr_en { get; set; }
        public int? arrival_uz_document_from_code_railway { get; set; }
        public int? arrival_uz_document_code_stn_to { get; set; }
        public string arrival_uz_document_station_to_name_ru { get; set; }
        public string arrival_uz_document_station_to_name_en { get; set; }
        public int? arrival_uz_document_to_code_inlandrailway { get; set; }
        public string arrival_uz_document_to_inlandrailway_name_ru { get; set; }
        public string arrival_uz_document_to_inlandrailway_name_en { get; set; }
        public string arrival_uz_document_to_inlandrailway_abbr_ru { get; set; }
        public string arrival_uz_document_to_inlandrailway_abbr_en { get; set; }
        public int? arrival_uz_document_to_code_railway { get; set; }
        public int? arrival_uz_document_code_border_checkpoint { get; set; }
        public string arrival_uz_document_border_checkpoint_station_name_ru { get; set; }
        public string arrival_uz_document_border_checkpoint_station_name_en { get; set; }
        public int? arrival_uz_document_border_checkpoint_code_inlandrailway { get; set; }
        public DateTime? arrival_uz_document_cross_time { get; set; }
        public int? arrival_uz_document_code_shipper { get; set; }
        public string arrival_uz_document_shipper_name_ru { get; set; }
        public string arrival_uz_document_shipper_name_en { get; set; }
        public int? arrival_uz_document_code_consignee { get; set; }
        public string arrival_uz_document_name_consignee { get; set; }
        public bool? arrival_uz_document_klient { get; set; }
        public string arrival_uz_document_code_payer_sender { get; set; }
        public string arrival_uz_document_payer_sender_name_ru { get; set; }
        public string arrival_uz_document_payer_sender_name_en { get; set; }
        public string arrival_uz_document_code_payer_arrival { get; set; }
        public string arrival_uz_document_payer_arrival_name_ru { get; set; }
        public string arrival_uz_document_payer_arrival_name_en { get; set; }
        public int? arrival_uz_document_distance_way { get; set; }
        public string arrival_uz_document_note { get; set; }
        public long? arrival_uz_document_parent_id { get; set; }
        // добавил 10-05-2022
        public bool? arrival_uz_document_manual { get; set; }
        // добавил 13-07-2023
        public DateTime? arrival_uz_document_date_otpr { get; set; }
        public DateTime? arrival_uz_document_srok_end { get; set; }
        public DateTime? arrival_uz_document_date_grpol { get; set; }
        public DateTime? arrival_uz_document_date_pr { get; set; }
        public DateTime? arrival_uz_document_date_vid { get; set; }
        // Исправил 27.04.2022
        public string sap_incoming_supply_num { get; set; }
        public string sap_incoming_supply_pos { get; set; }
        public DateTime? sap_incoming_supply_date { get; set; }
        public TimeSpan? sap_incoming_supply_time { get; set; }
        public string sap_incoming_supply_warehouse_code { get; set; }
        public string sap_incoming_supply_warehouse_name { get; set; }
        public string sap_incoming_supply_warehouse_code_10 { get; set; }
        public string sap_incoming_supply_warehouse_name_10 { get; set; }
        public string sap_incoming_supply_cargo_code { get; set; }
        public string sap_incoming_supply_cargo_name { get; set; }
        public string sap_incoming_supply_works { get; set; }
        public string sap_incoming_supply_ship { get; set; }
        public string sap_incoming_supply_ban { get; set; }
        //-------------
        public string instructional_letters_num { get; set; }
        public DateTime? instructional_letters_datetime { get; set; }
        public int? instructional_letters_station_code { get; set; }
        public string instructional_letters_station_name { get; set; }
        public string instructional_letters_note { get; set; }
        public bool? account_balance { get; set; }
    }
    public class MineCargoIncomingCars
    {
        public int? id_cargo { get; set; } 
        public string cargo_name_ru { get; set; } 
        public string cargo_name_en { get; set; } 
        public int? id_group_cargo { get; set; } 
        public string cargo_group_name_ru { get; set; } 
        public string cargo_group_name_en { get; set; } 
        public int? id_out_group_cargo { get; set; } 
        public string cargo_out_group_name_ru { get; set; } 
        public string cargo_out_group_name_en { get; set; } 
        public int? id_cargo_etsng { get; set; } 
        public int? code_cargo_etsng { get; set; } 
        public string cargo_etsng_name_ru { get; set; } 
        public string cargo_etsng_name_en { get; set; } 
        public int? id_division { get; set; } 
        public string division_abbr_ru { get; set; } 
        public string division_abbr_en { get; set; } 
        public int? code_stn_from { get; set; } 
        public string station_name_ru { get; set; } 
        public string station_name_en { get; set; } 
        public int? count_wagon { get; set; } 
        public int? vesg { get; set; } 
    }
    public class ViewReportAdoptionWagonNotOperation
    {
        public long id_sostav { get; set; }
        public DateTime? sostav_date_adoption { get; set; }
        public int? sostav_num_doc { get; set; }
        public long? id_car { get; set; }
        public int? num { get; set; }
        public int? id_cargo { get; set; }
        public string cargo_name_ru { get; set; }
        public string cargo_name_en { get; set; }
        public int? nom_doc { get; set; }
        public int? nom_main_doc { get; set; }
        public int? code_stn_from { get; set; }
        public string station_from_name_ru { get; set; }
        public string station_from_name_en { get; set; }
        public int? id_division_on_amkr { get; set; }
        public string division_code { get; set; }
        public string name_division_ru { get; set; }
        public string name_division_en { get; set; }
        public string division_abbr_ru { get; set; }
        public string division_abbr_en { get; set; }
    }
    /// <summary>
    /// Класс набора данных для выбора вагонов по прибытию
    /// </summary>
    public class ViewIncomingCarsWhere
    {
        public DateTime start { get; set; }
        public DateTime stop { get; set; }
        public bool laden { get; set; }
        public bool accounting { get; set; }
        public bool client { get; set; }
        public bool not_client { get; set; }
        public bool paid { get; set; }
        public int[] nums { get; set; }
        public int[] nom_main_docs { get; set; }
        public int[] nom_docs { get; set; }
        public int[] id_operator { get; set; }
        public int[] id_limiting { get; set; }
        public int[] id_owner { get; set; }
        public int[] code_stn_from { get; set; }
        public int[] id_cargo { get; set; }
        public int[] id_certification_data { get; set; }
        public int[] supply_cargo_code { get; set; }
        public int[] id_group_cargo { get; set; }
        public int[] code_consignee { get; set; }
        public int[] id_division { get; set; }
        public int[] id_genus { get; set; }
        public int[] id_condition { get; set; }
        public int[] code_payer_arrival { get; set; }
        public int[] code_payer_arrival_name { get; set; }
        public int[] id_station_on { get; set; }
    }

    [RoutePrefix("api/ids/rwt/arrival_cars")]
    public class IDS_RWT_Incoming_ArrivalCarsController : ApiController
    {
        protected ILongRepository<ArrivalCars> ef_ids;

        public IDS_RWT_Incoming_ArrivalCarsController(ILongRepository<ArrivalCars> ids)
        {
            this.ef_ids = ids;
        }


        // GET: api/ids/rwt/arrival_cars/all
        [Route("all")]
        [ResponseType(typeof(ArrivalCars))]
        public IHttpActionResult GetArrivalCars()
        {
            try
            {
                List<ArrivalCars> list = this.ef_ids.Context.ToList().Select(c => c.GetArrivalCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_cars/sostav/id/17
        [Route("sostav/id/{id:long}")]
        [ResponseType(typeof(ArrivalCars))]
        public IHttpActionResult GetArrivalCarsOfSostav(long id)
        {
            try
            {
                List<ArrivalCars> list = this.ef_ids
                    .Context
                    .Where(s => s.id_arrival == id)
                    .ToList()
                    .Select(c => c.GetArrivalCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_cars/id/78943
        [Route("id/{id:long}")]
        [ResponseType(typeof(ArrivalCars))]
        public IHttpActionResult GetArrivalCars(long id)
        {
            try
            {
                ArrivalCars cars = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    //.Select(c => c.GetArrivalCars()).FirstOrDefault();
                    .Select(c => c.GetArrivalCars_ArrivalSostav()).FirstOrDefault();
                return Ok(cars);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Получить полную информацию по вагонам принятого состава
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET: api/ids/rwt/arrival_cars/view/sostav/id/6
        [Route("view/sostav/id/{id:int}")]
        [ResponseType(typeof(ViewIncomingCars))]
        public IHttpActionResult GetViewIncomingCarsOfIDSostav(int id)
        {
            try
            {
                System.Data.SqlClient.SqlParameter p_id = new System.Data.SqlClient.SqlParameter("@id_station", id);
                string sql = "select * from [IDS].[get_view_incoming_cars_of_id_sostav](@id_station) order by arrival_car_position";
                List<ViewIncomingCars> list = this.ef_ids.Database.SqlQuery<ViewIncomingCars>(sql, p_id).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Получить полную информацию по вагону принятого состава, через id-вагона
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET: api/ids/rwt/arrival_cars/view/car/id/6
        [Route("view/car/id/{id:int}")]
        [ResponseType(typeof(ViewIncomingCars))]
        public IHttpActionResult GetViewIncomingCarsOfIDCar(int id)
        {
            try
            {
                System.Data.SqlClient.SqlParameter p_id = new System.Data.SqlClient.SqlParameter("@id_car", id);
                string sql = "select * from [IDS].[get_view_incoming_cars_of_id_car](@id_car)";
                ViewIncomingCars result = this.ef_ids.Database.SqlQuery<ViewIncomingCars>(sql, p_id).FirstOrDefault();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Получить полную информацию по вагону принятого состава, через id-вагона
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET: api/ids/rwt/arrival_cars/view/car/start/2020-03-12T00:00:00/stop/2020-03-20T23:59:59
        [Route("view/car/start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(ViewIncomingCars))]
        public IHttpActionResult GetViewIncomingCarsOfPeriod(DateTime start, DateTime stop)
        {
            try
            {
                System.Data.SqlClient.SqlParameter p_start = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter p_stop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                string sql = "select * from [IDS].[get_view_incoming_cars_of_period](@start, @stop)";
                List<ViewIncomingCars> result = this.ef_ids.Database.SqlQuery<ViewIncomingCars>(sql, p_start, p_stop).ToList();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // GET: api/ids/rwt/arrival_cars/mine_cargo/car/start/2023-03-01T00:00:00/stop/2023-03-31T23:59:59
        [Route("mine_cargo/car/start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(MineCargoIncomingCars))]
        public IHttpActionResult GetMineCargoIncomingCarsOfPeriod(DateTime start, DateTime stop)
        {
            try
            {
                System.Data.SqlClient.SqlParameter p_start = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter p_stop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                string sql = "select * from [IDS].[get_mine_cargo_incoming_cars_of_period](@start, @stop)";
                List<MineCargoIncomingCars> result = this.ef_ids.Database.SqlQuery<MineCargoIncomingCars>(sql, p_start, p_stop).ToList();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        public object get_string_of_int(int[] vals) {
            if (vals != null && vals.Count() > 0) {
                return (object)String.Join(",", vals);
            }
            return (object)DBNull.Value;
        }

        /// <summary>
        /// Выборка принятых вагонов по условию
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        // POST: api/ids/rwt/arrival_cars/view/car/where/
        [HttpPost]
        [Route("view/car/where/")]
        [ResponseType(typeof(ViewIncomingCars))]
        public IHttpActionResult GetViewIncomingCarsOfWhere([FromBody] ViewIncomingCarsWhere value)
        {
            try
            {
                this.ef_ids.Database.CommandTimeout = 300;
                System.Data.SqlClient.SqlParameter p_start = new System.Data.SqlClient.SqlParameter("@start", value.start);
                System.Data.SqlClient.SqlParameter p_stop = new System.Data.SqlClient.SqlParameter("@stop", value.stop);
                System.Data.SqlClient.SqlParameter p_laden = new System.Data.SqlClient.SqlParameter("@laden", value.laden);
                System.Data.SqlClient.SqlParameter p_accounting = new System.Data.SqlClient.SqlParameter("@accounting", value.accounting);
                System.Data.SqlClient.SqlParameter p_client = new System.Data.SqlClient.SqlParameter("@client", value.client);
                System.Data.SqlClient.SqlParameter p_not_client = new System.Data.SqlClient.SqlParameter("@not_client", value.not_client);
                System.Data.SqlClient.SqlParameter p_paid = new System.Data.SqlClient.SqlParameter("@paid", value.paid);
                //System.Data.SqlClient.SqlParameter p_nums = new System.Data.SqlClient.SqlParameter("@nums", value.nums ?? (object)DBNull.Value);
                System.Data.SqlClient.SqlParameter p_nums = new System.Data.SqlClient.SqlParameter("@nums", get_string_of_int(value.nums));
                System.Data.SqlClient.SqlParameter p_nom_main_docs = new System.Data.SqlClient.SqlParameter("@nom_main_docs", get_string_of_int(value.nom_main_docs));
                System.Data.SqlClient.SqlParameter p_nom_docs = new System.Data.SqlClient.SqlParameter("@nom_docs", get_string_of_int(value.nom_docs));
                System.Data.SqlClient.SqlParameter p_id_operator = new System.Data.SqlClient.SqlParameter("@id_operator",  get_string_of_int(value.id_operator));
                System.Data.SqlClient.SqlParameter p_id_limiting = new System.Data.SqlClient.SqlParameter("@id_limiting", get_string_of_int(value.id_limiting));
                System.Data.SqlClient.SqlParameter p_id_owner = new System.Data.SqlClient.SqlParameter("@id_owner", get_string_of_int(value.id_owner));
                System.Data.SqlClient.SqlParameter p_code_stn_from = new System.Data.SqlClient.SqlParameter("@code_stn_from", get_string_of_int(value.code_stn_from));
                System.Data.SqlClient.SqlParameter p_id_cargo = new System.Data.SqlClient.SqlParameter("@id_cargo", get_string_of_int(value.id_cargo));
                System.Data.SqlClient.SqlParameter p_id_certification_data = new System.Data.SqlClient.SqlParameter("@id_certification_data", get_string_of_int(value.id_certification_data));
                System.Data.SqlClient.SqlParameter p_supply_cargo_code = new System.Data.SqlClient.SqlParameter("@supply_cargo_code", get_string_of_int(value.supply_cargo_code));
                System.Data.SqlClient.SqlParameter p_id_group_cargo = new System.Data.SqlClient.SqlParameter("@id_group_cargo", get_string_of_int(value.id_group_cargo));
                System.Data.SqlClient.SqlParameter p_code_consignee = new System.Data.SqlClient.SqlParameter("@code_consignee", get_string_of_int(value.code_consignee));
                System.Data.SqlClient.SqlParameter p_id_division = new System.Data.SqlClient.SqlParameter("@id_division", get_string_of_int(value.id_division));
                System.Data.SqlClient.SqlParameter p_id_genus = new System.Data.SqlClient.SqlParameter("@id_genus", get_string_of_int(value.id_genus));
                System.Data.SqlClient.SqlParameter p_id_condition = new System.Data.SqlClient.SqlParameter("@id_condition", get_string_of_int(value.id_condition));
                System.Data.SqlClient.SqlParameter p_code_payer_arrival = new System.Data.SqlClient.SqlParameter("@code_payer_arrival", get_string_of_int(value.code_payer_arrival));
                System.Data.SqlClient.SqlParameter p_code_payer_arrival_name = new System.Data.SqlClient.SqlParameter("@code_payer_arrival_name", get_string_of_int(value.code_payer_arrival_name));
                System.Data.SqlClient.SqlParameter p_id_station_on = new System.Data.SqlClient.SqlParameter("@id_station_on", get_string_of_int(value.id_station_on));

                string sql = "EXEC [IDS].[get_view_incoming_cars_of_where] @start, @stop, @laden, @accounting, @client, @not_client, @paid, @nums, @nom_main_docs, @nom_docs, @id_operator, @id_limiting, @id_owner, @code_stn_from, @id_cargo, @id_certification_data, @supply_cargo_code, @id_group_cargo, @code_consignee, @id_division, @id_genus, @id_condition, @code_payer_arrival, @code_payer_arrival_name, @id_station_on";
                List<ViewIncomingCars> result = this.ef_ids.Database.SqlQuery<ViewIncomingCars>(sql, p_start, p_stop, p_laden, p_accounting, p_client, p_not_client, p_paid, p_nums, p_nom_main_docs, p_nom_docs, p_id_operator, p_id_limiting, p_id_owner, p_code_stn_from, p_id_cargo, p_id_certification_data, p_supply_cargo_code, p_id_group_cargo, p_code_consignee, p_id_division, p_id_genus, p_id_condition, p_code_payer_arrival, p_code_payer_arrival_name, p_id_station_on).ToList();
                this.ef_ids.Database.CommandTimeout = null;
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_cars/num/63303077
        [Route("num/{num:int}")]
        [ResponseType(typeof(ArrivalCars))]
        public IHttpActionResult GetArrivalCarsOfNum(int num)
        {
            try
            {
                List<ArrivalCars> list = this.ef_ids
                    .Context
                    .Where(s => s.num == num)
                    .ToList()
                    .OrderBy(s => s.id_arrival)
                    .Select(c => c.GetArrivalCars_ArrivalSostav()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_cars/start/2020-03-13T00:00:00/stop/2020-03-13T23:59:59/nums/56681562,52740883
        [Route("start/{start:datetime}/stop/{stop:datetime}/nums/{nums}")]
        [ResponseType(typeof(ArrivalCars))]
        public IHttpActionResult GetArrivalCars(DateTime start, DateTime stop, string nums)
        {
            try
            {
                //string sql = "SELECT IDS.ArrivalCars.* FROM IDS.ArrivalCars INNER JOIN IDS.ArrivalSostav ON IDS.ArrivalCars.id = IDS.ArrivalSostav.id WHERE (IDS.ArrivalSostav.date_arrival >= CONVERT(datetime,'" + start.ToString("yyyy-MM-dd HH:mm:ss") + "',120) and IDS.ArrivalSostav.date_arrival <= CONVERT(datetime,'" + stop.ToString("yyyy-MM-dd HH:mm:ss") + "',120) and num in("+ nums + "))";
                //List<ArrivalCars> list = this.ef_ids.Database.SqlQuery<ArrivalCars>(sql).ToList().Select(c => c.GetArrivalCars_ArrivalSostav()).ToList();
                List<ArrivalCars> list_result = new List<ArrivalCars>();
                List<ArrivalCars> list = this.ef_ids
                    .Context
                    .Where(s => s.ArrivalSostav.date_arrival >= start && s.ArrivalSostav.date_arrival <= stop)
                    //.ToList()
                    //.TakeWhile(x => nums.IndexOf(x.num.ToString()) > -1)
                    .ToList()
                    .Select(c => c.GetArrivalCars_ArrivalSostav()).ToList();
                foreach (ArrivalCars car in list)
                {
                    if (nums.IndexOf(car.num.ToString()) > -1)
                    {
                        list_result.Add(car);
                    }
                }
                return Ok(list_result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_cars/report/adoption_wagon/not_operator/start/2020-03-12T00:00:00/stop/2020-03-20T23:59:59
        [Route("report/adoption_wagon/not_operator/start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(ViewReportAdoptionWagonNotOperation))]
        public IHttpActionResult GetReportAdoptionWagonNotOperationOfPeriod(DateTime start, DateTime stop)
        {
            try
            {
                System.Data.SqlClient.SqlParameter d_start = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter d_stop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                string sql = "select * from [IDS].[get_view_adoption_wagon_not_operation_of_period](@start,@stop)";
                List<ViewReportAdoptionWagonNotOperation> sostav = this.ef_ids.Database.SqlQuery<ViewReportAdoptionWagonNotOperation>(sql, d_start, d_stop).ToList();
                return Ok(sostav);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST: api/ids/rwt/arrival_cars/period/
        [HttpPost]
        [Route("period")]
        [ResponseType(typeof(ArrivalCars))]
        public IHttpActionResult PostArrivalCarsOfPeriodNums([FromBody] OperationPeriodNums value)
        {
            try
            {
                //string sql = "SELECT IDS.ArrivalCars.* FROM IDS.ArrivalCars INNER JOIN IDS.ArrivalSostav ON IDS.ArrivalCars.id = IDS.ArrivalSostav.id WHERE (IDS.ArrivalSostav.date_arrival >= CONVERT(datetime,'" + start.ToString("yyyy-MM-dd HH:mm:ss") + "',120) and IDS.ArrivalSostav.date_arrival <= CONVERT(datetime,'" + stop.ToString("yyyy-MM-dd HH:mm:ss") + "',120) and num in("+ nums + "))";
                //List<ArrivalCars> list = this.ef_ids.Database.SqlQuery<ArrivalCars>(sql).ToList().Select(c => c.GetArrivalCars_ArrivalSostav()).ToList();
                List<ArrivalCars> list_result = new List<ArrivalCars>();
                List<ArrivalCars> list = this.ef_ids
                    .Context
                    .Where(s => s.ArrivalSostav.date_arrival >= value.start && s.ArrivalSostav.date_arrival <= value.stop)
                    //.ToList()
                    //.TakeWhile(x => nums.IndexOf(x.num.ToString()) > -1)
                    .ToList()
                    .Select(c => c.GetArrivalCars_ArrivalSostav()).ToList();
                foreach (ArrivalCars car in list)
                {
                    int num = value.nums.Find(n => n == car.num);

                    if (num > 0)
                    {
                        list_result.Add(car);
                    }
                }
                return Ok(list_result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/arrival_cars/
        [HttpPost]
        [Route("")]
        public long PostArrivalCars([FromBody] ArrivalCars value)
        {
            try
            {
                this.ef_ids.Add(value);
                int res = this.ef_ids.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/rwt/arrival_cars/id
        [HttpPut]
        [Route("id/{id:long}")]
        public long PutArrivalCars(long id, [FromBody] ArrivalCars value)
        {
            try
            {
                this.ef_ids.Update(value);
                int res = this.ef_ids.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/rwt/arrival_cars/id
        [HttpDelete]
        [Route("id/{id:long}")]
        public int DeleteArrivalCars(long id)
        {
            try
            {
                this.ef_ids.Delete(id);
                return this.ef_ids.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/rwt/arrival_cars/sostav/id/17
        [HttpDelete]
        [Route("sostav/id/{id:long}")]
        public int DeleteArrivalCarsOfSostav(long id)
        {
            try
            {
                List<ArrivalCars> list = this.ef_ids
                    .Context
                    .Where(s => s.id_arrival == id)
                    .ToList()
                    .Select(c => c.GetArrivalCars()).ToList();
                List<long> list_del = new List<long>();

                foreach (ArrivalCars car in list)
                {
                    list_del.Add(car.id);
                }

                this.ef_ids.Delete(list_del);
                return this.ef_ids.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
