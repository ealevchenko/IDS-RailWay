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

namespace WEB_UI.Controllers.api
{
    public class OperationPeriodNums {
        public DateTime start { get; set; }
        public DateTime stop { get; set; }
        public List<int> nums { get; set; }
    }

    public class ViewOutgoingCars
    {
        public long? outgoing_car_id { get; set; }
        public int? num { get; set; }
        public int? outgoing_car_position { get; set; }
        public DateTime? wagon_date_rem_uz { get; set; }
        public double? wagon_gruzp_uz { get; set; }
        public double? wagon_tara_uz { get; set; }
        public string wagon_ban_uz { get; set; }
        public bool? wagon_closed_route { get; set; }
        public int? last_operation_id_operation { get; set; }
        public int? last_operation_id_condition { get; set; }
        public string last_operation_condition_name_ru { get; set; }
        public string last_operationt_condition_name_en { get; set; }
        public string last_operation_condition_abbr_ru { get; set; }
        public string last_operation_condition_abbr_en { get; set; }
        public bool? last_operation_condition_red { get; set; }
        public long? arrival_car_id { get; set; }
        public int? arrival_car_position { get; set; }
        public int? arrival_car_position_arrival { get; set; }
        public int? arrival_car_consignee { get; set; }
        public string arrival_car_num_doc { get; set; }
        public string arrival_car_note { get; set; }
        public DateTime? arrival_car_date_adoption_act { get; set; }
        public DateTime? arrival_car_arrival { get; set; }
        public string arrival_car_arrival_user { get; set; }
        public DateTime? arrival_car_create { get; set; }
        public string arrival_car_create_user { get; set; }
        public DateTime? arrival_car_change { get; set; }
        public string arrival_car_change_user { get; set; }
        public long? arrival_sostav_id { get; set; }
        public long? arrival_sostav_id_arrived { get; set; }
        public long? arrival_sostav_id_sostav { get; set; }
        public int? arrival_sostav_train { get; set; }
        public string arrival_sostav_composition_index { get; set; }
        public DateTime? arrival_sostav_date_arrival { get; set; }
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
        public int? arrival_sostav_status { get; set; }
        public string arrival_sostav_note { get; set; }
        public DateTime? arrival_sostav_create { get; set; }
        public string arrival_sostav_create_user { get; set; }
        public DateTime? arrival_sostav_change { get; set; }
        public string arrival_sostav_change_user { get; set; }
        public long? arrival_uz_vagon_id { get; set; }
        public long? arrival_uz_vagon_id_arrival { get; set; }
        public int? arrival_uz_vagon_id_condition { get; set; }
        public string arrival_uz_vagon_condition_name_ru { get; set; }
        public string arrival_uz_vagon_condition_name_en { get; set; }
        public string arrival_uz_vagon_condition_abbr_ru { get; set; }
        public string arrival_uz_vagon_condition_abbr_en { get; set; }
        public bool? arrival_uz_vagon_condition_repairs { get; set; }
        public int? arrival_uz_vagon_id_type { get; set; }
        public string arrival_uz_vagon_type_ru { get; set; }
        public string arrival_uz_vagon_type_en { get; set; }
        public double? arrival_uz_vagon_gruzp { get; set; }
        public int? arrival_uz_vagon_u_tara { get; set; }
        public int? arrival_uz_vagon_ves_tary_arc { get; set; }
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
        public string arrival_uz_vagon_tation_amkr_name_en { get; set; }
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
        public string arrival_uz_document_payer_arriva_name_en { get; set; }
        public int? arrival_uz_document_distance_way { get; set; }
        public string arrival_uz_document_note { get; set; }
        public long? arrival_uz_document_parent_id { get; set; }
        public int? outgoing_car_position_outgoing { get; set; }
        public string outgoing_car_num_doc { get; set; }
        public string outgoing_car_note { get; set; }
        public DateTime? outgoing_car_date_outgoing_act { get; set; }
        public DateTime? outgoing_car_outgoing { get; set; }
        public string outgoing_car_outgoing_user { get; set; }
        public int? outgoing_car_id_outgoing_detention { get; set; }
        public string outgoing_car_detention_cause_ru { get; set; }
        public string outgoing_car_detention_cause_en { get; set; }
        public int? outgoing_car_id_reason_discrepancy_amkr { get; set; }
        public string outgoing_car_reason_discrepancy_amkr_name_ru { get; set; }
        public string outgoing_car_reason_discrepancy_amkr_name_en { get; set; }
        public int? outgoing_car_id_reason_discrepancy_uz { get; set; }
        public string outgoing_car_reason_discrepancy_uz_name_ru { get; set; }
        public string outgoing_car_reason_discrepancy_uz_name_en { get; set; }
        public int? outgoing_car_id_outgoing_return_start { get; set; }
        public int? outgoing_car_id_detention_return_start { get; set; }
        public string outgoing_car_detention_cause_start_ru { get; set; }
        public string outgoing_car_detention_cause_start_en { get; set; }
        public int? outgoing_car_return_start_type_detention_return { get; set; }
        public DateTime? outgoing_car_return_start_date_start { get; set; }
        public DateTime? outgoing_car_return_start_date_stop { get; set; }
        public string outgoing_car_return_start_num_act { get; set; }
        public DateTime? outgoing_car_return_start_date_act { get; set; }
        public string outgoing_car_return_start_note { get; set; }
        public int? outgoing_car_id_outgoing_return_stop { get; set; }
        public int? outgoing_car_id_detention_return_stop { get; set; }
        public string outgoing_car_detention_cause_stop_ru { get; set; }
        public string outgoing_car_detention_cause_stop_en { get; set; }
        public int? outgoing_car_return_stop_type_detention_return { get; set; }
        public DateTime? outgoing_car_return_stop_date_start { get; set; }
        public DateTime? outgoing_car_return_stop_date_stop { get; set; }
        public string outgoing_car_return_stop_num_act { get; set; }
        public DateTime? outgoing_car_return_stop_date_act { get; set; }
        public string outgoing_car_return_stop_note { get; set; }
        public long? outgoing_car_parent_wir_id { get; set; }
        public DateTime? outgoing_car_create { get; set; }
        public string outgoing_car_create_user { get; set; }
        public DateTime? outgoing_car_change { get; set; }
        public string outgoing_car_change_user { get; set; }
        public string outgoing_car_note_vagonnik { get; set; }
        public DateTime? outgoing_car_vagonnik { get; set; }
        public string outgoing_car_vagonnik_user { get; set; }
        public long outgoing_sostav_id { get; set; }
        public int outgoing_sostav_num_doc { get; set; }
        public int outgoing_sostav_id_station_from { get; set; }
        public string outgoing_sostav_from_station_amkr_name_ru { get; set; }
        public string outgoing_sostav_from_station_amkr_name_en { get; set; }
        public string outgoing_sostav_from_station_amkr_abbr_ru { get; set; }
        public string outgoing_sostav_from_station_amkr_abbr_en { get; set; }
        public int outgoing_sostav_id_way_from { get; set; }
        public int? outgoing_sostav_from_id_park { get; set; }
        public string outgoing_sostav_from_way_num_ru { get; set; }
        public string outgoing_sostav_from_way_num_en { get; set; }
        public string outgoing_sostav_from_way_name_ru { get; set; }
        public string outgoing_sostav_from_way_name_en { get; set; }
        public string outgoing_sostav_from_way_abbr_ru { get; set; }
        public string outgoing_sostav_from_way_abbr_en { get; set; }
        public int? outgoing_sostav_id_station_on { get; set; }
        public string outgoing_sostav_on_station_amkr_name_ru { get; set; }
        public string outgoing_sostav_on_station_amkr_name_en { get; set; }
        public string outgoing_sostav_on_station_amkr_abbr_ru { get; set; }
        public string outgoing_sostav_on_station_amkr_abbr_en { get; set; }
        public DateTime outgoing_sostav_date_readiness_amkr { get; set; }
        public DateTime? outgoing_sostav_date_end_inspection_acceptance_delivery { get; set; }

        public DateTime? outgoing_sostav_date_end_inspection_loader { get; set; }

        public DateTime? outgoing_sostav_date_end_inspection_vagonnik { get; set; }

        public DateTime? outgoing_sostav_date_show_wagons { get; set; }

        public DateTime? outgoing_sostav_date_readiness_uz { get; set; }

        public DateTime? outgoing_sostav_date_outgoing { get; set; }

        public DateTime? outgoing_sostav_date_outgoing_act { get; set; }

        public DateTime? outgoing_sostav_date_departure_amkr { get; set; }

        public string outgoing_sostav_composition_index { get; set; }

        public int outgoing_sostav_status { get; set; }

        public bool? outgoing_sostav_route_sign { get; set; }

        public string outgoing_sostav_note { get; set; }

        public DateTime outgoing_sostav_create { get; set; }

        public string outgoing_sostav_create_user { get; set; }

        public DateTime? outgoing_sostav_change { get; set; }

        public string outgoing_sostav_change_user { get; set; }

        public string outgoing_sostav_vagonnik_user { get; set; }

        public long? outgoing_uz_vagon_id { get; set; }

        public int? outgoing_uz_vagon_id_condition { get; set; }

        public string outgoing_uz_vagon_condition_name_ru { get; set; }

        public string outgoing_uz_vagon_condition_name_en { get; set; }

        public string outgoing_uz_vagon_condition_abbr_ru { get; set; }

        public string outgoing_uz_vagon_condition_abbr_en { get; set; }

        public bool? outgoing_uz_vagon_condition_repairs { get; set; }

        public int? outgoing_uz_vagon_arrival_id_wagons_rent { get; set; }

        public int? outgoing_uz_vagon_arrival_wagons_rent_id_operator { get; set; }

        public string outgoing_uz_vagon_arrival_wagons_rent_operators_ru { get; set; }

        public string outgoing_uz_vagon_arrival_wagons_rent_operators_en { get; set; }

        public string outgoing_uz_vagon_arrival_wagons_rent_operator_abbr_ru { get; set; }

        public string outgoing_uz_vagon_arrival_wagons_rent_operator_abbr_en { get; set; }

        public DateTime? outgoing_uz_vagon_arrival_wagons_rent_start { get; set; }

        public DateTime? outgoing_uz_vagon_arrival_wagons_rent_end { get; set; }

        public bool? outgoing_uz_vagon_arrival_wagons_rent_operator_paid { get; set; }

        public string outgoing_uz_vagon_arrival_wagons_rent_operator_color { get; set; }

        public int? outgoing_uz_vagon_arrival_wagons_rent_id_limiting { get; set; }

        public string outgoing_uz_vagon_arrival_wagons_rent_limiting_name_ru { get; set; }

        public string outgoing_uz_vagon_arrival_wagons_rent_limiting_name_en { get; set; }

        public string outgoing_uz_vagon_arrival_wagons_rent_limiting_abbr_ru { get; set; }

        public string outgoing_uz_vagon_arrival_wagons_rent_limiting_abbr_en { get; set; }

        public int? outgoing_uz_vagon_outgoing_id_wagons_rent { get; set; }

        public int? outgoing_uz_vagon_outgoing_wagons_rent_id_operator { get; set; }

        public string outgoing_uz_vagon_outgoing_wagons_rent_operators_ru { get; set; }

        public string outgoing_uz_vagon_outgoing_wagons_rent_operators_en { get; set; }

        public string outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_ru { get; set; }

        public string outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_en { get; set; }

        public DateTime? outgoing_uz_vagon_outgoing_wagons_rent_start { get; set; }

        public DateTime? outgoing_uz_vagon_outgoing_wagons_rent_end { get; set; }

        public bool? outgoing_uz_vagon_outgoing_wagons_rent_operator_paid { get; set; }

        public string outgoing_uz_vagon_outgoing_wagons_rent_operator_color { get; set; }

        public int? outgoing_uz_vagon_outgoing_wagons_rent_id_limiting { get; set; }

        public string outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_ru { get; set; }

        public string outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_en { get; set; }

        public string outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_ru { get; set; }

        public string outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_en { get; set; }

        public int? outgoing_uz_vagon_id_countrys { get; set; }

        public int? outgoing_uz_vagon_wagon_adm { get; set; }

        public string outgoing_uz_vagon_adm_name_ru { get; set; }

        public string outgoing_uz_vagon_adm_name_en { get; set; }

        public string outgoing_uz_vagon_adm_abbr_ru { get; set; }

        public string outgoing_uz_vagon_adm_abbr_en { get; set; }

        public int? outgoing_uz_vagon_id_genus { get; set; }

        public int? outgoing_uz_vagon_rod { get; set; }

        public string outgoing_uz_vagon_rod_name_ru { get; set; }

        public string outgoing_uz_vagon_rod_name_en { get; set; }

        public string outgoing_uz_vagon_rod_abbr_ru { get; set; }

        public string outgoing_uz_vagon_rod_abbr_en { get; set; }

        public int? outgoing_uz_vagon_id_owner { get; set; }

        public string outgoing_uz_vagon_owner_wagon_ru { get; set; }

        public string outgoing_uz_vagon_owner_wagon_en { get; set; }

        public string outgoing_uz_vagon_owner_wagon_abbr_ru { get; set; }

        public string outgoing_uz_vagon_owner_wagon_abbr_en { get; set; }

        public double? outgoing_uz_vagon_gruzp_uz { get; set; }

        public double? outgoing_uz_vagon_tara_uz { get; set; }

        public string outgoing_uz_vagon_note_uz { get; set; }

        public double? outgoing_uz_vagon_gruzp { get; set; }

        public int? outgoing_uz_vagon_u_tara { get; set; }

        public int? outgoing_uz_vagon_ves_tary_arc { get; set; }

        public int? outgoing_uz_vagon_id_warehouse { get; set; }

        public int? outgoing_uz_vagon_id_division { get; set; }
        public string outgoing_uz_vagon_division_code { get; set; }

        public string outgoing_uz_vagon_name_division_ru { get; set; }

        public string outgoing_uz_vagon_name_division_en { get; set; }

        public string outgoing_uz_vagon_division_abbr_ru { get; set; }

        public string outgoing_uz_vagon_division_abbr_en { get; set; }

        public int? outgoing_uz_vagon_id_type_devision { get; set; }

        public bool? outgoing_uz_vagon_laden { get; set; }

        public int? outgoing_uz_vagon_id_cargo { get; set; }

        public string outgoing_uz_vagon_cargo_name_ru { get; set; }

        public string outgoing_uz_vagon_cargo_name_en { get; set; }

        public int? outgoing_uz_vagon_id_group { get; set; }

        public string outgoing_uz_vagon_cargo_group_name_ru { get; set; }

        public string outgoing_uz_vagon_cargo_group_name_en { get; set; }

        public int? outgoing_uz_vagon_id_cargo_etsng { get; set; }

        public int? outgoing_uz_vagon_cargo_etsng_code { get; set; }

        public string outgoing_uz_vagon_cargo_etsng_name_ru { get; set; }

        public string outgoing_uz_vagon_cargo_etsng_name_en { get; set; }

        public int? outgoing_uz_vagon_id_cargo_gng { get; set; }

        public int? outgoing_uz_vagon_cargo_gng_code { get; set; }

        public string outgoing_uz_vagon_cargo_gng_name_ru { get; set; }

        public string outgoing_uz_vagon_cargo_gng_name_en { get; set; }

        public int? outgoing_uz_vagon_vesg { get; set; }

        public int? outgoing_uz_vagon_to_station_uz_code { get; set; }

        public string outgoing_uz_vagon_to_station_uz_name { get; set; }
        public string outgoing_uz_vagon_cont_1_nom_cont { get; set; }
        public string outgoing_uz_vagon_cont_1_kod_tiporazmer { get; set; }
        public int? outgoing_uz_vagon_cont_1_gruzp { get; set; }
        public int? outgoing_uz_vagon_cont_1_ves_tary_arc { get; set; }
        public int? outgoing_uz_vagon_cont_1_id_cargo { get; set; }
        public string outgoing_uz_vagon_cont_2_nom_cont { get; set; }
        public string outgoing_uz_vagon_cont_2_kod_tiporazmer { get; set; }
        public int? outgoing_uz_vagon_cont_2_gruzp { get; set; }

        public int? outgoing_uz_vagon_cont_2_ves_tary_arc { get; set; }

        public int? outgoing_uz_vagon_cont_2_id_cargo { get; set; }

        public long? outgoing_uz_document_id { get; set; }

        public string outgoing_uz_document_id_doc_uz { get; set; }

        public int? outgoing_uz_document_nom_doc { get; set; }

        public int? outgoing_uz_document_code_stn_from { get; set; }

        public int? outgoing_uz_document_code_stn_to { get; set; }

        public string outgoing_uz_document_station_to_name_ru { get; set; }

        public string outgoing_uz_document_station_to_name_en { get; set; }

        public int? outgoing_uz_document_to_code_inlandrailway { get; set; }

        public string outgoing_uz_document_to_inlandrailway_name_ru { get; set; }

        public string outgoing_uz_document_to_inlandrailway_name_en { get; set; }

        public string outgoing_uz_document_to_inlandrailway_abbr_ru { get; set; }

        public string outgoing_uz_document_to_inlandrailway_abbr_en { get; set; }

        public int? outgoing_uz_document_to_code_railway { get; set; }

        public int? outgoing_uz_document_country_nazn { get; set; }

        public string outgoing_uz_document_to_countrys_name_ru { get; set; }

        public string outgoing_uz_document_to_countrys_name_en { get; set; }

        public string outgoing_uz_document_to_country_abbr_ru { get; set; }

        public string outgoing_uz_document_to_country_abbr_en { get; set; }

        public int? outgoing_uz_document_code_border_checkpoint { get; set; }

        public string outgoing_uz_document_border_checkpoint_station_name_ru { get; set; }

        public string outgoing_uz_document_border_checkpoint_station_name_en { get; set; }

        public int? outgoing_uz_document_border_checkpoint_code_inlandrailway { get; set; }

        public DateTime? outgoing_uz_document_cross_date { get; set; }

        public int? outgoing_uz_document_code_shipper { get; set; }

        public string outgoing_uz_document_name_shipper { get; set; }

        public int? outgoing_uz_document_code_consignee { get; set; }

        public string outgoing_uz_document_consignee_name_ru { get; set; }

        public string outgoing_uz_document_consignee_name_en { get; set; }

        public string outgoing_uz_document_vid { get; set; }

        public string outgoing_uz_document_code_payer { get; set; }

        public string outgoing_uz_document_payer_name_ru { get; set; }

        public string outgoing_uz_document_payer_name_en { get; set; }

        public int? outgoing_uz_document_distance_way { get; set; }

        public long? outgoing_uz_document_osum { get; set; }

        public DateTime? outgoing_uz_document_date_sozdan { get; set; }

        public DateTime? outgoing_uz_document_date_otpr { get; set; }

        public DateTime? outgoing_uz_document_date_pr { get; set; }

        public DateTime? outgoing_uz_document_date_grpol { get; set; }

        public DateTime? outgoing_uz_document_date_vid { get; set; }

        public string outgoing_uz_document_info_sht { get; set; }

        public string outgoing_uz_document_name_gr { get; set; }

        public string outgoing_uz_document_note { get; set; }

        public string sap_incoming_supply_num { get; set; }

        public string sap_incoming_supply_pos { get; set; }

        public DateTime? sap_incoming_supply_date { get; set; }

        public TimeSpan? sap_incoming_supply_time { get; set; }

        public string sap_incoming_supply_warehouse_code { get; set; }

        public string sap_incoming_supply_warehouse_name { get; set; }

        public string sap_incoming_supply_cargo_code { get; set; }

        public string sap_incoming_supply_cargo_name { get; set; }

        public string sap_outgoing_supply_num { get; set; }

        public DateTime? sap_outgoing_supply_date { get; set; }

        public string sap_outgoing_supply_cargo_name { get; set; }

        public string sap_outgoing_supply_cargo_code { get; set; }

        public string sap_outgoing_supply_shipper_name { get; set; }

        public string sap_outgoing_supply_shipper_code { get; set; }

        public string sap_outgoing_supply_destination_station_name { get; set; }

        public string sap_outgoing_supply_destination_station_code { get; set; }

        public string sap_outgoing_supply_border_checkpoint_name { get; set; }

        public string sap_outgoing_supply_border_checkpoint_code { get; set; }

        public double? sap_outgoing_supply_netto { get; set; }

        public string sap_outgoing_supply_warehouse_code { get; set; }

        public string sap_outgoing_supply_warehouse_name { get; set; }

        public string sap_outgoing_supply_responsible_post { get; set; }

        public string sap_outgoing_supply_responsible_fio { get; set; }

        public string sap_outgoing_supply_payer_code { get; set; }

        public string sap_outgoing_supply_payer_name { get; set; }

        public string instructional_letters_num { get; set; }

        public DateTime? instructional_letters_datetime { get; set; }

        public int? instructional_letters_station_code { get; set; }

        public string instructional_letters_station_name { get; set; }

        public string instructional_letters_note { get; set; }
    }

    [RoutePrefix("api/ids/rwt/outgoing_cars")]
    public class IDS_RWT_OutgoingCarsController : ApiController
    {
        protected ILongRepository<OutgoingCars> ef_ids;

        public IDS_RWT_OutgoingCarsController(ILongRepository<OutgoingCars> ids)
        {
            this.ef_ids = ids;
        }


        // GET: api/ids/rwt/outgoing_cars/all
        [Route("all")]
        [ResponseType(typeof(OutgoingCars))]
        public IHttpActionResult GetOutgoingCars()
        {
            try
            {
                List<OutgoingCars> list = this.ef_ids.Context.ToList().Select(c => c.GetOutgoingCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/outgoing_cars/sostav/id/17
        [Route("sostav/id/{id:long}")]
        [ResponseType(typeof(OutgoingCars))]
        public IHttpActionResult GetOutgoingCarsOfSostav(long id)
        {
            try
            {
                List<OutgoingCars> list = this.ef_ids
                    .Context
                    .Where(s => s.id_outgoing == id)
                    .ToList()
                    .Select(c => c.GetOutgoingCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/outgoing_cars/id/78943
        [Route("id/{id:long}")]
        [ResponseType(typeof(OutgoingCars))]
        public IHttpActionResult GetOutgoingCarsOfID(long id)
        {
            try
            {
                OutgoingCars cars = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    //.Select(c => c.GetOutgoingCars()).FirstOrDefault();
                    .Select(c => c.GetOutgoingCars_OutgoingSostav()).FirstOrDefault();
                return Ok(cars);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/outgoing_cars/view/sostav/id/6
        [Route("view/sostav/id/{id:int}")]
        [ResponseType(typeof(ViewOutgoingCars))]
        public IHttpActionResult GetViewOutgoingCarsOfIDSostav(int id)
        {
            try
            {
                System.Data.SqlClient.SqlParameter p_id = new System.Data.SqlClient.SqlParameter("@id_station", id);
                string sql = "select * from [IDS].[get_view_outgoing_cars_of_id_sostav](@id_station) order by outgoing_car_position";
                List<ViewOutgoingCars> list = this.ef_ids.Database.SqlQuery<ViewOutgoingCars>(sql, p_id).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/outgoing_cars/num/63303077
        [Route("num/{num:int}")]
        [ResponseType(typeof(OutgoingCars))]
        public IHttpActionResult GetOutgoingCarsOfNum(int num)
        {
            try
            {
                List<OutgoingCars> list = this.ef_ids
                    .Context
                    .Where(s => s.num == num)
                    .ToList()
                    .OrderBy(s => s.id_outgoing)
                    .Select(c => c.GetOutgoingCars_OutgoingSostav()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //// GET: api/ids/rwt/outgoing_cars/start/2020-03-13T00:00:00/stop/2020-03-13T23:59:59/nums/56681562,52740883
        //[Route("start/{start:datetime}/stop/{stop:datetime}/nums/{nums}")]
        //[ResponseType(typeof(OutgoingCars))]
        //public IHttpActionResult GetArrivalCars(DateTime start, DateTime stop, string nums)
        //{
        //    try
        //    {
        //        //string sql = "SELECT IDS.OutgoingCars.* FROM IDS.OutgoingCars INNER JOIN IDS.ArrivalSostav ON IDS.OutgoingCars.id = IDS.ArrivalSostav.id WHERE (IDS.ArrivalSostav.date_arrival >= CONVERT(datetime,'" + start.ToString("yyyy-MM-dd HH:mm:ss") + "',120) and IDS.ArrivalSostav.date_arrival <= CONVERT(datetime,'" + stop.ToString("yyyy-MM-dd HH:mm:ss") + "',120) and num in("+ nums + "))";
        //        //List<OutgoingCars> list = this.ef_ids.Database.SqlQuery<OutgoingCars>(sql).ToList().Select(c => c.GetArrivalCars_ArrivalSostav()).ToList();
        //        List<OutgoingCars> list_result = new List<OutgoingCars>();
        //        List<OutgoingCars> list = this.ef_ids
        //            .Context
        //            .Where(s => s.ArrivalSostav.date_arrival >= start && s.ArrivalSostav.date_arrival <= stop)
        //            //.ToList()
        //            //.TakeWhile(x => nums.IndexOf(x.num.ToString()) > -1)
        //            .ToList()
        //            .Select(c => c.GetArrivalCars_ArrivalSostav()).ToList();
        //        foreach (OutgoingCars car in list)
        //        {
        //            if (nums.IndexOf(car.num.ToString()) > -1)
        //            {
        //                list_result.Add(car);
        //            }
        //        }
        //        return Ok(list_result);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        //// POST: api/ids/rwt/outgoing_cars/period/
        //[HttpPost]
        //[Route("period")]
        //[ResponseType(typeof(OutgoingCars))]
        //public IHttpActionResult PostArrivalCarsOfPeriodNums([FromBody]OperationPeriodNums value)
        //{
        //    try
        //    {
        //        //string sql = "SELECT IDS.OutgoingCars.* FROM IDS.OutgoingCars INNER JOIN IDS.ArrivalSostav ON IDS.OutgoingCars.id = IDS.ArrivalSostav.id WHERE (IDS.ArrivalSostav.date_arrival >= CONVERT(datetime,'" + start.ToString("yyyy-MM-dd HH:mm:ss") + "',120) and IDS.ArrivalSostav.date_arrival <= CONVERT(datetime,'" + stop.ToString("yyyy-MM-dd HH:mm:ss") + "',120) and num in("+ nums + "))";
        //        //List<OutgoingCars> list = this.ef_ids.Database.SqlQuery<OutgoingCars>(sql).ToList().Select(c => c.GetArrivalCars_ArrivalSostav()).ToList();
        //        List<OutgoingCars> list_result = new List<OutgoingCars>();
        //        List<OutgoingCars> list = this.ef_ids
        //            .Context
        //            .Where(s => s.ArrivalSostav.date_arrival >= value.start && s.ArrivalSostav.date_arrival <= value.stop)
        //            //.ToList()
        //            //.TakeWhile(x => nums.IndexOf(x.num.ToString()) > -1)
        //            .ToList()
        //            .Select(c => c.GetArrivalCars_ArrivalSostav()).ToList();
        //        foreach (OutgoingCars car in list)
        //        {
        //            int num = value.nums.Find(n=>n == car.num);

        //            if (num>0)
        //            {
        //                list_result.Add(car);
        //            }
        //        }
        //        return Ok(list_result);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        // POST api/ids/rwt/outgoing_cars/
        [HttpPost]
        [Route("")]
        public long PostOutgoingCars([FromBody]OutgoingCars value)
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

        // PUT api/ids/rwt/outgoing_cars/id
        [HttpPut]
        [Route("id/{id:long}")]
        public long PutOutgoingCars(long id, [FromBody]OutgoingCars value)
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

        // DELETE api/ids/rwt/outgoing_cars/id
        [HttpDelete]
        [Route("id/{id:long}")]
        public int DeleteOutgoingCars(long id)
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

        // DELETE api/ids/rwt/outgoing_cars/sostav/id/17
        [HttpDelete]
        [Route("sostav/id/{id:long}")]
        public int DeleteOutgoingCarsOfSostav(long id)
        {
            try
            {
                List<OutgoingCars> list = this.ef_ids
                    .Context
                    .Where(s => s.id_outgoing == id)
                    .ToList()
                    .Select(c => c.GetOutgoingCars()).ToList();
                List<long> list_del = new List<long>();

                foreach (OutgoingCars car in list) {
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
