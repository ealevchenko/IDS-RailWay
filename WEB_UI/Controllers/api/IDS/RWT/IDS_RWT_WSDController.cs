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
    #region TREE WAY (Для дерева путей - Обновленный АРМ)

    public class view_status_station
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
        public int? count_arrives_wagons { get; set; }
        public int? count_sent_wagons { get; set; }
        public int? count_all_wagons { get; set; }
        public int? count_amkr_wagons { get; set; }
        public int? capacity_wagons { get; set; }
    }

    public partial class view_status_park
    {
        public int id { get; set; }
        public int position { get; set; }
        public string park_name_ru { get; set; }
        public string park_name_en { get; set; }
        public string park_abbr_ru { get; set; }
        public string park_abbr_en { get; set; }
        public int? count_all_wagons { get; set; }
        public int? count_amkr_wagons { get; set; }
        public int? capacity_wagons { get; set; }
    }

    public class view_status_way
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
        //public int? capacity { get; set; }
        public bool? deadlock { get; set; }
        public bool? crossing_uz { get; set; }
        public bool? crossing_amkr { get; set; }
        public int? id_devision { get; set; }
        public bool? dissolution { get; set; }
        public bool? output_dissolution { get; set; }
        public DateTime? way_close { get; set; }
        public DateTime? way_delete { get; set; }
        public int? count_all_wagons { get; set; }
        public int? count_amkr_wagons { get; set; }
        public int? capacity_wagons { get; set; }
    }

    #endregion

    #region ДЕТАЛЬНО ВАГОНЫ (Обновленный АРМ)
    public class view_wagons
    {
        public long wir_id { get; set; }
        public long wim_id { get; set; }
        public long? wio_id { get; set; }
        public int num { get; set; }
        public int position { get; set; }
        public int? id_operator { get; set; }
        public string operators_ru { get; set; }
        public string operators_en { get; set; }
        public string operator_abbr_ru { get; set; }
        public string operator_abbr_en { get; set; }
        public DateTime? operator_rent_start { get; set; }
        public DateTime? operator_rent_end { get; set; }
        public bool? operator_paid { get; set; }
        public string operator_color { get; set; }
        public bool? operator_monitoring_idle_time { get; set; }
        public int? id_limiting_loading { get; set; }
        public string limiting_name_ru { get; set; }
        public string limiting_name_en { get; set; }
        public string limiting_abbr_ru { get; set; }
        public string limiting_abbr_en { get; set; }
        public int? id_owner_wagon { get; set; }
        public string owner_wagon_ru { get; set; }
        public string owner_wagon_en { get; set; }
        public string owner_wagon_abbr_ru { get; set; }
        public string owner_wagon_abbr_en { get; set; }
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
        public string arrival_condition_name_ru { get; set; }
        public string arrival_condition_name_en { get; set; }
        public string arrival_condition_abbr_ru { get; set; }
        public string arrival_condition_abbr_en { get; set; }
        public bool? arrival_condition_red { get; set; }
        public string current_condition_name_ru { get; set; }
        public string current_condition_name_en { get; set; }
        public string current_condition_abbr_ru { get; set; }
        public string current_condition_abbr_en { get; set; }
        public bool? current_condition_red { get; set; }
        public DateTime? wagon_date_rem_uz { get; set; }
        public double? wagon_gruzp_doc { get; set; }
        public double? wagon_gruzp_uz { get; set; }
        public string arrival_cargo_group_name_ru { get; set; }
        public string arrival_cargo_group_name_en { get; set; }
        public string arrival_cargo_name_ru { get; set; }
        public string arrival_cargo_name_en { get; set; }
        public int? arrival_id_sertification_data { get; set; }
        public string arrival_sertification_data_ru { get; set; }
        public string arrival_sertification_data_en { get; set; }
        public int? arrival_id_commercial_condition { get; set; }
        public string arrival_commercial_condition_ru { get; set; }
        public string arrival_commercial_condition_en { get; set; }
        public int? arrival_station_from_code { get; set; }
        public string arrival_station_from_name_ru { get; set; }
        public string arrival_station_from_name_en { get; set; }
        public int? arrival_shipper_code { get; set; }
        public string arrival_shipper_name_ru { get; set; }
        public string arrival_shipper_name_en { get; set; }
        public string arrival_station_amkr_name_ru { get; set; }
        public string arrival_station_amkr_name_en { get; set; }
        public string arrival_station_amkr_abbr_ru { get; set; }
        public string arrival_station_amkr_abbr_en { get; set; }
        public string arrival_division_amkr_code { get; set; }
        public string arrival_division_amkr_name_ru { get; set; }
        public string arrival_division_amkr_name_en { get; set; }
        public string arrival_division_amkr_abbr_ru { get; set; }
        public string arrival_division_amkr_abbr_en { get; set; }
        public int? current_id_loading_status { get; set; }
        public string current_loading_status_ru { get; set; }
        public string current_loading_status_en { get; set; }
        public int? current_wagon_busy { get; set; }
        public int? current_id_operation { get; set; }
        public string current_operation_name_ru { get; set; }
        public string current_operation_name_en { get; set; }
        public DateTime? current_operation_start { get; set; }
        public DateTime? current_operation_end { get; set; }
        public int? arrival_duration { get; set; }
        public int? arrival_idle_time { get; set; }
        public decimal? arrival_usage_fee { get; set; }
        public int? current_station_duration { get; set; }
        public int? current_way_duration { get; set; }
        public int? current_station_idle_time { get; set; }
        public string sap_incoming_supply_num { get; set; }
        public string sap_incoming_supply_pos { get; set; }
        public DateTime? sap_incoming_supply_date { get; set; }
        public TimeSpan? sap_incoming_supply_time { get; set; }
        public string sap_incoming_supply_warehouse_code { get; set; }
        public string sap_incoming_supply_warehouse_name { get; set; }
        public string sap_incoming_supply_cargo_code { get; set; }
        public string sap_incoming_supply_cargo_name { get; set; }
        public string instructional_letters_num { get; set; }
        public DateTime? instructional_letters_datetime { get; set; }
        public int? instructional_letters_station_code { get; set; }
        public string instructional_letters_station_name { get; set; }
        public string instructional_letters_note { get; set; }
        public int? wagon_brutto_doc { get; set; }
        public int? wagon_brutto_amkr { get; set; }
        public int? wagon_tara_doc { get; set; }
        public double? wagon_tara_uz { get; set; }
        public int? wagon_tara_arc_doc { get; set; }
        public int? wagon_vesg_doc { get; set; }
        public int? wagon_vesg_amkr { get; set; }
        public int? diff_vesg { get; set; }
        public bool? doc_outgoing_car { get; set; }
        public int? arrival_nom_doc { get; set; }
        public int? arrival_nom_main_doc { get; set; }
        public string arrival_composition_index { get; set; }
        public DateTime? arrival_date_adoption { get; set; }
        public int? outgoing_id_return { get; set; }
        public string outgoing_return_cause_ru { get; set; }
        public string outgoing_return_cause_en { get; set; }
        public DateTime? outgoing_date { get; set; }
        public int? outgoing_sostav_status { get; set; }
        public string wagon_ban_uz { get; set; }
        public bool? wagon_closed_route { get; set; }
        public string wir_note { get; set; }
    }
    #endregion

    #region ОПЕРАЦИЯ ОТПРАВИТЬ (Обновленный АРМ)
    public class OperationSendWagons
    {
        public int id_way_from { get; set; }
        public List<ListOperationWagon> wagons { get; set; }
        public int id_outer_ways { get; set; }
        public DateTime lead_time { get; set; }
        public string locomotive1 { get; set; }
        public string locomotive2 { get; set; }
        public string user { get; set; }
    }
    #endregion

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

    ///TODO: УДАЛИТЬ СТАРОЕ ДЕТАЛЬНО ВАГОНЫ
    public class view_wagons1
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
        public DateTime? arrival_datetime { get; set; }
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
        public int? arrival_station_from_code { get; set; }
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
        public int current_id_operation_wagon { get; set; }
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
        public int? id_out_sostav { get; set; }
        public int? out_sostav_status { get; set; }
        public string instructional_letters_num { get; set; }
        public DateTime? instructional_letters_datetime { get; set; }
        public int? instructional_letters_station { get; set; }
        public string instructional_letters_station_name { get; set; }
        public string sap_is_num { get; set; }
        public DateTime? sap_is_create_date { get; set; }
        public TimeSpan? sap_is_create_time { get; set; }
        public bool? sap_os_doc_outgoing_car { get; set; }
    }
    ///TODO: УДАЛИТЬ СТАРОЕ ДЕРЕВО ПУТЕЙ
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
    ///TODO: УДАЛИТЬ СТАРОЕ ДЕРЕВО ПУТЕЙ
    public partial class view_park_way_status
    {
        public int id { get; set; }
        public string park_name_ru { get; set; }
        public string park_name_en { get; set; }
        public string park_abbr_ru { get; set; }
        public string park_abbr_en { get; set; }
        public DateTime create { get; set; }
        public string create_user { get; set; }
        public DateTime? change { get; set; }
        public string change_user { get; set; }
        public int? count_wagon { get; set; }
        public int? count_capacity { get; set; }
    }
    ///TODO: УДАЛИТЬ СТАРОЕ ДЕРЕВО ПУТЕЙ
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

    ///TODO: УДАЛИТЬ СТАРАЯ ОПЕРАЦИЯ ОТПРАВИТЬ
    public class OperationSendingWagons
    {
        public int id_way_from { get; set; }
        public List<ListOperationWagon> list_sending { get; set; }
        public int id_outer_ways { get; set; }
        public int num_sostav { get; set; }
        public DateTime lead_time { get; set; }
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

    public class OperationProvideWagons
    {
        public int id_way_from { get; set; }
        public List<ListOperationWagon> list_provide { get; set; }
        public int position { get; set; }
        public DateTime lead_time { get; set; }
        public string user { get; set; }
    }

    public class OperationReturnProvideWagons
    {
        public int id_sostav { get; set; }
        public string user { get; set; }
    }

    public class OperationTransferProvideWagons
    {
        public int id_way_on { get; set; }
        public List<int> nums { get; set; }
        public DateTime lead_time { get; set; }
        public string user { get; set; }
    }

    public class OperationUpdateOutgoingDetention
    {
        public long id_outgoing_car { get; set; }
        public int id_detention_return { get; set; }
        public DateTime date_start { get; set; }
        public DateTime date_stop { get; set; }
        public string user { get; set; }
    }

    public class OperationOpenOutgoingReturn
    {
        public long id_outgoing_car { get; set; }
        public int id_detention_return { get; set; }
        public DateTime date_start { get; set; }
        public string num_act { get; set; }
        public DateTime? date_act { get; set; }
        public string note { get; set; }
        public string user { get; set; }
    }

    public class OperationCloseOutgoingReturn
    {
        public long id_outgoing_car { get; set; }
        public int id_outgoin_return { get; set; }
        public DateTime date_stop { get; set; }
        public string num_act { get; set; }
        public DateTime? date_act { get; set; }
        public string note { get; set; }
        public string user { get; set; }
    }

    public class OperationReturnProvideCar
    {
        public long id_outgoing_car { get; set; }
        //public DateTime date_start { get; set; }
        public string user { get; set; }
    }

    public class OperationPresentWagon
    {
        public long id_outgoing_car { get; set; }
        public int position { get; set; }
        public DateTime? date_outgoing_act { get; set; }
        public int? id_reason_discrepancy_amkr { get; set; }
        public int? id_reason_discrepancy_uz { get; set; }
        //public int? id_outgoing_detention_return { get; set; }
        public int? id_condition { get; set; }
        public int? id_wagons_rent_arrival { get; set; }
        public int? id_wagons_rent_outgoing { get; set; }
        public int id_countrys { get; set; }
        public int id_genus { get; set; }
        public int id_owner { get; set; }
        public double? gruzp_uz { get; set; }
        public double? tara_uz { get; set; }
        public string note_uz { get; set; }
        public int? id_warehouse { get; set; }
        public int? id_division { get; set; }
        public bool laden { get; set; }
        public int id_cargo { get; set; }
        public string nom_cont1 { get; set; }
        public string nom_cont2 { get; set; }
        public int? code_stn_to { get; set; }
        public string user { get; set; }
    }

    public class OperationPresentSostav
    {
        public long id_outgoing_sostav { get; set; }
        public DateTime date_end_inspection_acceptance_delivery { get; set; }
        public DateTime date_end_inspection_loader { get; set; }
        public DateTime date_end_inspection_vagonnik { get; set; }
        public DateTime date_readiness_uz { get; set; }
        public DateTime date_outgoing { get; set; }
        public DateTime? date_outgoing_act { get; set; }
        public int station_on { get; set; }
        public bool route_sign { get; set; }
        public string composition_index { get; set; }
        public string user { get; set; }
    }

    public class OperationReturnPresentSostav
    {
        public long id_outgoing_sostav { get; set; }
        public string user { get; set; }
    }

    public class OperationReturnPresentWagon
    {
        public long id_outgoing_car { get; set; }
        public string user { get; set; }
    }

    public class OperationSendingSostavOnUZ
    {
        public long id_outgoing_sostav { get; set; }
        public DateTime lead_time { get; set; }
        public string composition_index { get; set; }
        public string user { get; set; }
    }

    public class OperationUpdateEPDSendingSostav
    {
        public long id_outgoing_sostav { get; set; }
        public string user { get; set; }
    }

    public class view_wagon_dislocation
    {
        public long id_wir { get; set; }
        public int num { get; set; }
        public long? id_arrival_car { get; set; }
        public long? id_sap_incoming_supply { get; set; }
        public bool? doc_outgoing_car { get; set; }
        public long? id_outgoing_car { get; set; }
        public long? id_sap_outbound_supply { get; set; }
        public string note_wir { get; set; }
        public DateTime create_wir { get; set; }
        public string create_user_wir { get; set; }
        public DateTime? close_wir { get; set; }
        public string close_user_wir { get; set; }
        public long? parent_id_wir { get; set; }
        public long? id_wim { get; set; }
        public long? id_wagon_internal_routes { get; set; }
        public int? id_station { get; set; }
        public string station_name_ru { get; set; }
        public string station_name_en { get; set; }
        public string station_abbr_ru { get; set; }
        public string station_abbr_en { get; set; }
        public int? id_way { get; set; }
        public string way_num_ru { get; set; }
        public string way_num_en { get; set; }
        public string way_name_ru { get; set; }
        public string way_name_en { get; set; }
        public string way_abbr_ru { get; set; }
        public string way_abbr_en { get; set; }
        public DateTime? way_start { get; set; }
        public DateTime? way_end { get; set; }
        public int? id_outer_way { get; set; }
        public string name_outer_way_ru { get; set; }
        public string name_outer_way_en { get; set; }
        public DateTime? outer_way_start { get; set; }
        public DateTime? outer_way_end { get; set; }
        public int? position { get; set; }
        public string note_wim { get; set; }
        public DateTime? create_wim { get; set; }
        public string create_user_wim { get; set; }
        public DateTime? close_wim { get; set; }
        public string close_user_wim { get; set; }
        public long? parent_id_wim { get; set; }
        public int id_operation_wagon { get; set; }
        public string operation_wagon_name_ru { get; set; }
        public string operation_wagon_name_en { get; set; }
        public DateTime? operation_wagon_start { get; set; }
        public DateTime? operation_wagon_end { get; set; }
        public bool? operation_wagon_busy { get; set; }
        public DateTime? operation_wagon_create { get; set; }
        public string operation_wagon_create_user { get; set; }
        public DateTime? operation_wagon_close { get; set; }
        public string operation_wagon_close_user { get; set; }
    }

    [RoutePrefix("api/ids/rwt/wsd")]
    public class IDS_RWT_WSDController : ApiController
    {
        private EFDbContext db = new EFDbContext();

        #region TREE WAY (Дерево путей - Обновленный АРМ)
        // GET: api/ids/rwt/wsd/view/status/station/all
        /// <summary>
        /// Получить состояние по всем станциям (дерево станций)
        /// </summary>
        /// <returns></returns>
        [Route("view/status/station/all")]
        [ResponseType(typeof(view_status_station))]
        public IHttpActionResult GetViewStatusAllStation()
        {
            try
            {
                db.Database.CommandTimeout = 100;
                string sql = "select * from [IDS].[get_view_status_all_station]()";
                List<view_status_station> list = db.Database.SqlQuery<view_status_station>(sql).ToList();
                db.Database.CommandTimeout = null;               
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/status/station/id/8
        /// <summary>
        /// Получить состояние по указаной станции (дерево станций)
        /// </summary>
        /// <returns></returns>
        [Route("view/status/station/id/{id:int}")]
        [ResponseType(typeof(view_status_station))]
        public IHttpActionResult GetViewStatusStationOfID(int id)
        {
            try
            {
                //db.Database.CommandTimeout = 100;
                System.Data.SqlClient.SqlParameter id_station = new System.Data.SqlClient.SqlParameter("@id_station", id);
                string sql = "select * from [IDS].[get_view_status_station_of_id](@id_station) order by id";
                List<view_status_station> list = db.Database.SqlQuery<view_status_station>(sql, id_station).ToList();
                //db.Database.CommandTimeout = null;               
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/status/park/all/station/id/8
        /// <summary>
        /// Получить состояние парков по указаной станции (дерево станция\парки)
        /// </summary>
        /// <returns></returns>
        [Route("view/status/park/all/station/id/{id:int}")]
        [ResponseType(typeof(view_status_park))]
        public IHttpActionResult GetViewStatusAllParkOfStationID(int id)
        {
            try
            {
                //db.Database.CommandTimeout = 100;
                System.Data.SqlClient.SqlParameter id_station = new System.Data.SqlClient.SqlParameter("@id_station", id);
                string sql = "select * from [IDS].[get_view_status_all_park_of_station_id](@id_station) order by position";
                List<view_status_park> list = db.Database.SqlQuery<view_status_park>(sql, id_station).ToList();
                //db.Database.CommandTimeout = null;               
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/status/park/id/3/station/id/8
        /// <summary>
        /// Получить состояние парка по указаному id и станции (дерево станция\парк)
        /// </summary>
        /// <returns></returns>
        [Route("view/status/park/id/{id_park:int}/station/id/{id_station:int}")]
        [ResponseType(typeof(view_status_park))]
        public IHttpActionResult GetViewStatusParkOfID(int id_station, int id_park)
        {
            try
            {
                //db.Database.CommandTimeout = 100;
                System.Data.SqlClient.SqlParameter id_st= new System.Data.SqlClient.SqlParameter("@id_station", id_station);
                System.Data.SqlClient.SqlParameter id_pk= new System.Data.SqlClient.SqlParameter("@id_park", id_park);
                string sql = "select * from [IDS].[get_view_status_park_of_id](@id_station, @id_park)";
                List<view_status_park> list = db.Database.SqlQuery<view_status_park>(sql, id_st, id_pk).ToList();
                //db.Database.CommandTimeout = null;               
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/status/way/park/id/3/station/id/8
        /// <summary>
        /// Получить состояние путей по указаному парку станции (дерево станция\парк\пути)
        /// </summary>
        /// <returns></returns>
        [Route("view/status/way/park/id/{id_park:int}/station/id/{id_station:int}")]
        [ResponseType(typeof(view_status_way))]
        public IHttpActionResult GetViewStatusWayOfStationParkID(int id_station, int id_park)
        {
            try
            {
                //db.Database.CommandTimeout = 100;
                System.Data.SqlClient.SqlParameter id_st = new System.Data.SqlClient.SqlParameter("@id_station", id_station);
                System.Data.SqlClient.SqlParameter id_pk = new System.Data.SqlClient.SqlParameter("@id_park", id_park);
                string sql = "select * from [IDS].[get_view_status_all_way_of_station_park_id](@id_station, @id_park) order by position_way";
                List<view_status_way> list = db.Database.SqlQuery<view_status_way>(sql, id_st,id_pk).ToList();
                //db.Database.CommandTimeout = null;               
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/status/way/id/3
        /// <summary>
        /// Получить состояние парков по указаной станции (дерево станция\парки)
        /// </summary>
        /// <returns></returns>
        [Route("view/status/way/id/{id_way:int}")]
        [ResponseType(typeof(view_status_way))]
        public IHttpActionResult GetViewStatusWayOfID(int id_way)
        {
            try
            {
                //db.Database.CommandTimeout = 100;
                System.Data.SqlClient.SqlParameter id_w = new System.Data.SqlClient.SqlParameter("@id_way", id_way);
                string sql = "select * from [IDS].[get_view_status_way_of_id](@id_way) order by position_way";
                List<view_status_way> list = db.Database.SqlQuery<view_status_way>(sql, id_w).ToList();
                //db.Database.CommandTimeout = null;               
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion

        #region ДЕРЕВО ПУТЕЙ старое
        ///TODO: УДАЛИТЬ СТАРОЕ ДЕРЕВО ПУТЕЙ
        // GET: api/ids/rwt/wsd/view/station/status/all
        /// <summary>
        /// Получить состояние по всем станциям (дерево станций)
        /// </summary>
        /// <returns></returns>
        //[Route("view/station/status/all")]
        //[ResponseType(typeof(view_station_status))]
        //public IHttpActionResult GetViewStationStatus()
        //{
        //    try
        //    {
        //        db.Database.CommandTimeout = 300;
        //        string sql = "select * from [IDS].[get_view_station_status]()";
        //        List<view_station_status> list = db.Database.SqlQuery<view_station_status>(sql).ToList();
        //        db.Database.CommandTimeout = null;               
        //        return Ok(list);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        // GET: api/ids/rwt/wsd/view/park_ways/status/station/id/6
        /// <summary>
        /// Получить состояние парка путей по указаной станции
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("view/park_ways/status/station/id/{id:int}")]
        [ResponseType(typeof(view_park_way_status))]
        public IHttpActionResult GetViewParkWaysOfStation(int id)
        {
            try
            {
                System.Data.SqlClient.SqlParameter id_station = new System.Data.SqlClient.SqlParameter("@id_station", id);
                string sql = "select * from [IDS].[get_view_park_ways_status_of_station](@id_station) order by id";
                var list = db.Database.SqlQuery<view_park_way_status>(sql, id_station).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/ways/status/station/id/6/park_ways/id/71
        /// <summary>
        /// Получить состояние путей по указаной станции и парку
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("view/ways/status/station/id/{id_station:int}/park_ways/id/{id_park:int}")]
        [ResponseType(typeof(view_way_status))]
        public IHttpActionResult GetViewWaysOfStationPark(int id_station, int id_park)
        {
            try
            {
                System.Data.SqlClient.SqlParameter id_s = new System.Data.SqlClient.SqlParameter("@id_station", id_station);
                System.Data.SqlClient.SqlParameter id_p = new System.Data.SqlClient.SqlParameter("@id_park", id_park);
                string sql = "select * from [IDS].[get_view_ways_status_of_station_park_ways](@id_station, @id_park) order by position_way";
                var list = db.Database.SqlQuery<view_way_status>(sql, id_s, id_p).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/ways/status/id/109
        /// <summary>
        /// Получить состояние пути по id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("view/ways/status/id/{id:int}")]
        [ResponseType(typeof(view_way_status))]
        public IHttpActionResult GetViewWaysOfID(int id)
        {
            try
            {
                System.Data.SqlClient.SqlParameter id_way = new System.Data.SqlClient.SqlParameter("@id_way", id);
                string sql = "select * from [IDS].[get_view_ways_status_of_id](@id_way) order by position_way";
                view_way_status way = db.Database.SqlQuery<view_way_status>(sql, id_way).FirstOrDefault();
                return Ok(way);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion

        #region ДЕТАЛЬНО ВАГОНЫ (Обновленный АРМ)

        //TODO: Убрать старая выборка GET: api/ids/rwt/wsd/view_old/vagons/way/id/225
        /// <summary>
        /// Показать вагоны детально на указаном пути
        /// </summary>
        /// <param name="id_way"></param>
        /// <returns></returns>
        [Route("view_old/vagons/way/id/{id_way:int}")]
        [ResponseType(typeof(view_wagons1))]
        public IHttpActionResult GetOldViewWagonsOfWay(int id_way)
        {
            try
            {
                db.Database.CommandTimeout = 300;
                System.Data.SqlClient.SqlParameter id = new System.Data.SqlClient.SqlParameter("@id_way", id_way);
                string sql = "select * from [IDS].[get_view_wagons_of_way](@id_way) order by position";
                var list = db.Database.SqlQuery<view_wagons1>(sql, id).ToList();
                this.db.Database.CommandTimeout = null;
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/vagons/way/id/225
        /// <summary>
        /// Показать вагоны детально на указаном пути
        /// </summary>
        /// <param name="id_way"></param>
        /// <returns></returns>
        [Route("view/vagons/way/id/{id_way:int}")]
        [ResponseType(typeof(view_wagons))]
        public IHttpActionResult GetViewWagonsOfWay(int id_way)
        {
            try
            {
                db.Database.CommandTimeout = 300;
                System.Data.SqlClient.SqlParameter id = new System.Data.SqlClient.SqlParameter("@id_way", id_way);
                //string sql = "select * from [IDS].[get_view_wagons_of_way](@id_way) order by position";
                string sql = "select * from [IDS].[get_view_wagons_of_id_way](@id_way) order by position";
                var list = db.Database.SqlQuery<view_wagons>(sql, id).ToList();
                this.db.Database.CommandTimeout = null;
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion


        #region ОПЕРАЦИЯ ОТПРАВИТЬ (Обновленный АРМ)
        // POST api/ids/rwt/wsd/operation/sending
        [HttpPost]
        [Route("operation/sending")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostSendWagonsOfStationAMKR([FromBody] OperationSendWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.SendWagonsOfStation(value.id_way_from, value.wagons, value.id_outer_ways, value.lead_time, value.locomotive1, value.locomotive2, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

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


        //TODO: Убрать старая операция POST api/ids/rwt/wsd/operation/sending_old
        [HttpPost]
        [Route("operation/sending_old")]
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

        // POST api/ids/rwt/wsd/operation/transfer_provide
        [HttpPost]
        [Route("operation/transfer_provide")]
        [ResponseType(typeof(ResultTransfer))]
        public IHttpActionResult PostTransferProvideWagonsOfStation([FromBody] OperationTransferProvideWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                ResultTransfer result = ids_wir.OperationTransferProvideWagons(value.id_way_on, value.nums, value.lead_time, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/provide
        /// <summary>
        /// Операция предъявить состав на УЗ
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/provide")]
        [ResponseType(typeof(ResultTransfer))]
        public IHttpActionResult PostProvideWagonsOfStation([FromBody] OperationProvideWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                ResultTransfer result = ids_wir.OperationProvideWagons(value.id_way_from, value.list_provide, value.position, value.lead_time, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/return_provide
        /// <summary>
        /// Операция вернуть состав , отменить пръедявление
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/return_provide")]
        [ResponseType(typeof(ResultUpdateWagon))]
        public IHttpActionResult PostReturnProvideWagonsOfStation([FromBody] OperationReturnProvideWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                ResultUpdateWagon result = ids_wir.OperationReturnProvideWagons(value.id_sostav, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/detention
        /// <summary>
        /// Операция добавить или обновить задержание
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/detention")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostUpdateOutgoingDetention([FromBody] OperationUpdateOutgoingDetention value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationUpdateOutgoingDetention(value.id_outgoing_car, value.id_detention_return, value.date_start, value.date_stop, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/open_return
        /// <summary>
        /// Операция открыть возврат вагона
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/open_return")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationOpenOutgoingReturn([FromBody] OperationOpenOutgoingReturn value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationOpenOutgoingReturn(value.id_outgoing_car, value.id_detention_return, value.date_start, value.num_act, value.date_act, value.note, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // POST api/ids/rwt/wsd/operation/close_return
        /// <summary>
        /// Операция закрыть возврат вагона
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/close_return")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationCloseOutgoingReturn([FromBody] OperationCloseOutgoingReturn value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationCloseOutgoingReturn(value.id_outgoing_car, value.id_outgoin_return, value.date_stop, value.num_act, value.date_act, value.note, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // POST api/ids/rwt/wsd/operation/return_provide/wagon
        /// <summary>
        /// Операция вернуть вагон с пръедявления
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/return_provide/wagon")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationReturnProvideCar([FromBody] OperationReturnProvideCar value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationReturnProvideCar(value.id_outgoing_car, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/present/wagon
        /// <summary>
        /// Операция предявить вагон на уз
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/present/wagon")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationPresentWagon([FromBody] OperationPresentWagon value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationPresentWagon(value.id_outgoing_car, value.position, value.date_outgoing_act, value.id_reason_discrepancy_amkr, value.id_reason_discrepancy_uz,
                    //value.id_outgoing_detention_return, 
                    value.id_condition, value.id_wagons_rent_arrival, value.id_wagons_rent_outgoing, value.id_countrys, value.id_genus, value.id_owner,
                    value.gruzp_uz, value.tara_uz, value.note_uz, value.id_warehouse, value.id_division, value.laden, value.id_cargo, value.nom_cont1, value.nom_cont2, value.code_stn_to, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/present/sostav
        /// <summary>
        /// Операция предявить весь состав на уз
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/present/sostav")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationPresentSostav([FromBody] OperationPresentSostav value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationPresentSostav(value.id_outgoing_sostav, value.date_end_inspection_acceptance_delivery, value.date_end_inspection_loader, 
                    value.date_end_inspection_vagonnik, value.date_readiness_uz,  value.date_outgoing, value.date_outgoing_act, value.station_on, value.route_sign, value.composition_index, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/return_present/sostav
        /// <summary>
        /// Операция вернуть сдачу состава на уз (вагоны оставить)
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/return_present/sostav")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationReturnPresentSostav([FromBody] OperationReturnPresentSostav value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationReturnPresentSostav(value.id_outgoing_sostav, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/return_present/wagon
        /// <summary>
        /// Операция вернуть предявленный вагон на уз в правую часть
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/return_present/wagon")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationReturnPresentWagon([FromBody] OperationReturnPresentWagon value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationReturnPresentWagon(value.id_outgoing_car, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/sending_uz/sostav
        /// <summary>
        /// Операция отправить состав на УЗ
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/sending_uz/sostav")]
        [ResponseType(typeof(OperationResultWagon))]
        public IHttpActionResult PostOperationSendingSostavOnUZ([FromBody] OperationSendingSostavOnUZ value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                OperationResultWagon result = ids_wir.OperationSendingSostavOnUZ(value.id_outgoing_sostav, value.lead_time, value.composition_index, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #region ОБНОВЛЕНИЕ ДОКУМЕНТОВ ЭПД 
        // POST api/ids/rwt/wsd/operation/update/epd/sending/sostav
        /// <summary>
        /// Обновить документы по составу предъявленному и сданному на дорогу 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/update/epd/sending/sostav")]
        [ResponseType(typeof(OperationResultID))]
        public IHttpActionResult PostOperationUpdateEPDSendingSostav([FromBody] OperationUpdateEPDSendingSostav value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                OperationResultID result = ids_wir.OperationUpdateEPDSendingSostav(value.id_outgoing_sostav, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region ПОИСК ВАГОНОВ
        // GET: api/ids/rwt/wsd/view/dislocation/amkr/wagon/num/54781596
        /// <summary>
        /// Поиск текущего положения вагона на территории АМКР
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        [Route("view/dislocation/amkr/wagon/num/{num:int}")]
        [ResponseType(typeof(view_wagon_dislocation))]
        public IHttpActionResult GetViewDislocationAMKRWagonOfNum(int num)
        {
            try
            {
                string sql = "select top(1) * from [IDS].[get_dislocation_wagon_of_num](" + num + ") order by id_wir desc";
                List<view_wagon_dislocation> position = db.Database.SqlQuery<view_wagon_dislocation>(sql).ToList();
                return Ok(position);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region ИСТОРИЯ ОПЕРАЦИЙ
        // GET: api/ids/rwt/wsd/report/operation/send/start/2021-08-01T00:00:00/stop/2021-08-31T23:59:59
        [Route("report/operation/send/start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(sostav_operation_send))]
        public IHttpActionResult GetSostavWagonsOperationOfSend(DateTime start, DateTime stop)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                List<sostav_operation_send> result = ids_wir.GetSostavWagonsOperationOfSend(start,stop);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion
    }
}
