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
    ///TODO: УДАЛИТЬ СТАРОЕ ДЕРЕВО ПУТЕЙ (Пока используется в дислокации и роспуске)
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

    ///TODO: УДАЛИТЬ СТАРОЕ ДЕТАЛЬНО ВАГОНЫ (Пока используется в дислокации и роспуске)
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

    public class view_status_park
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

    #region ОТЧЕТ УЧЕТНЫЙ ОСТАТОК  (Обновленный АРМ)
    public class view_operating_balance
    {
        public long? id { get; set; }

        public int? num { get; set; }

        public long? arrival_car_id { get; set; }

        public long? arrival_sostav_id { get; set; }

        public long? arrival_uz_vagon_id { get; set; }

        public long? arrival_uz_document_id { get; set; }

        public long? cur_wio_id { get; set; }

        public long cur_wim_id { get; set; }

        public long? outgoing_car_id { get; set; }

        public long? outgoing_sostav_id { get; set; }

        public int? arrival_uz_document_nom_main_doc { get; set; }

        public int? arrival_uz_document_nom_doc { get; set; }

        public string arrival_uz_vagon_operators_wagons_group { get; set; }
        public int? arrival_uz_vagon_arrival_wagons_rent_id_operator { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_operators_ru { get; set; }

        public string arrival_uz_vagon_arrival_wagons_rent_operators_en { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_operator_abbr_ru { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_operator_abbr_en { get; set; }

        public DateTime? arrival_uz_vagon_arrival_wagons_rent_start { get; set; }

        public DateTime? arrival_uz_vagon_arrival_wagons_rent_end { get; set; }

        public bool? arrival_uz_vagon_arrival_wagons_rent_operator_paid { get; set; }
        public string arrival_uz_vagon_arrival_wagons_rent_operator_color { get; set; }

        public string current_operators_wagons_group { get; set; }
        public int? current_wagons_rent_id_operator { get; set; }
        public string current_wagons_rent_operators_ru { get; set; }
        public string current_wagons_rent_operators_en { get; set; }
        public string current_wagons_rent_operator_abbr_ru { get; set; }
        public string current_wagons_rent_operator_abbr_en { get; set; }
        public DateTime? current_wagons_rent_start { get; set; }
        public DateTime? current_wagons_rent_end { get; set; }
        public bool? current_wagons_rent_operator_paid { get; set; }
        public string current_wagons_rent_operator_color { get; set; }

        public int? arrival_uz_vagon_id_condition { get; set; }
        public string arrival_uz_vagon_condition_name_ru { get; set; }
        public string arrival_uz_vagon_condition_name_en { get; set; }
        public string arrival_uz_vagon_condition_abbr_ru { get; set; }
        public string arrival_uz_vagon_condition_abbr_en { get; set; }

        public bool? arrival_uz_vagon_condition_repairs { get; set; }

        public int? current_id_condition { get; set; }
        public string current_condition_name_ru { get; set; }

        public string current_condition_name_en { get; set; }

        public string current_condition_abbr_ru { get; set; }

        public string current_condition_abbr_en { get; set; }

        public bool? current_condition_repairs { get; set; }

        public int? arrival_uz_vagon_id_genus { get; set; }

        public int? arrival_uz_vagon_rod { get; set; }

        public string arrival_uz_vagon_rod_name_ru { get; set; }
        public string arrival_uz_vagon_rod_name_en { get; set; }

        public string arrival_uz_vagon_rod_abbr_ru { get; set; }

        public string arrival_uz_vagon_rod_abbr_en { get; set; }

        public int? arrival_uz_vagon_id_type { get; set; }

        public string arrival_uz_vagon_type_ru { get; set; }

        public string arrival_uz_vagon_type_en { get; set; }

        public double? arrival_uz_vagon_gruzp { get; set; }

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

        public int? arrival_uz_document_code_stn_from { get; set; }

        public string arrival_uz_document_station_from_name_ru { get; set; }

        public string arrival_uz_document_station_from_name_en { get; set; }

        public int? arrival_uz_document_from_code_inlandrailway { get; set; }

        public string arrival_uz_document_from_inlandrailway_name_ru { get; set; }

        public string arrival_uz_document_from_inlandrailway_name_en { get; set; }

        public string arrival_uz_document_from_inlandrailway_abbr_ru { get; set; }

        public string arrival_uz_document_from_inlandrailway_abbr_en { get; set; }

        public int? arrival_uz_document_from_code_railway { get; set; }

        public int? arrival_uz_vagon_id_division_on_amkr { get; set; }

        public string arrival_uz_vagon_division_code { get; set; }

        public string arrival_uz_vagon_name_division_ru { get; set; }

        public string arrival_uz_vagon_name_division_en { get; set; }

        public string arrival_uz_vagon_division_abbr_ru { get; set; }

        public string arrival_uz_vagon_division_abbr_en { get; set; }

        public int? arrival_uz_vagon_id_type_devision { get; set; }
        public string sap_incoming_supply_kod_r_10 { get; set; }
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

        public int current_id_station_amkr { get; set; }

        public string current_station_amkr_name_ru { get; set; }

         public string current_station_amkr_name_en { get; set; }

        public string current_station_amkr_abbr_ru { get; set; }
        public string current_station_amkr_abbr_en { get; set; }
        public int current_id_way { get; set; }

        public int? current_id_park { get; set; }
        public string current_way_num_ru { get; set; }
        public string current_way_num_en { get; set; }
        public string current_way_name_ru { get; set; }
        public string current_way_name_en { get; set; }
        public string current_way_abbr_ru { get; set; }
        public string current_way_abbr_en { get; set; }
        public DateTime current_way_start { get; set; }
        public DateTime? current_way_end { get; set; }
        public string current_wim_note { get; set; }

        public int? current_id_outer_way { get; set; }
        public string current_outer_way_name_ru { get; set; }
        public string current_outer_way_name_en { get; set; }
        public DateTime? current_outer_way_start { get; set; }
        public DateTime? current_outer_way_end { get; set; }
        public DateTime? arrival_sostav_date_arrival { get; set; }
        public DateTime? arrival_sostav_date_adoption { get; set; }
        public DateTime? arrival_sostav_date_adoption_act { get; set; }
        public DateTime? arrival_sostav_old_date_adoption { get; set; }
        public DateTime? arrival_sostav_old_date_adoption_act { get; set; }
        public string wir_note { get; set; }
        public string instructional_letters_num { get; set; }
        public DateTime? instructional_letters_datetime { get; set; }
        public int? instructional_letters_station_code { get; set; }
        public string instructional_letters_station_name { get; set; }
        public string instructional_letters_note { get; set; }
        public int? idle_time { get; set; }
        public int? idle_time_act { get; set; }
    }
    public class view_operator_ob
    {
        public string type { get; set; }
        public int? num { get; set; }
        public string group { get; set; }
        public int? id_operator { get; set; }
        public string current_wagons_rent_operators_ru { get; set; }
        public string current_wagons_rent_operators_en { get; set; }
        public string current_wagons_rent_operator_abbr_ru { get; set; }
        public string current_wagons_rent_operator_abbr_en { get; set; }
        public bool? current_wagons_rent_operator_paid { get; set; }
    }
    public class view_current_ob
    {
        public int? num { get; set; }
        public string group { get; set; }
        public int? id_operator { get; set; }
        public string current_wagons_rent_operators_ru { get; set; }
        public string current_wagons_rent_operators_en { get; set; }
        public string current_wagons_rent_operator_abbr_ru { get; set; }
        public string current_wagons_rent_operator_abbr_en { get; set; }
        public bool? current_wagons_rent_operator_paid { get; set; }
    }
    public partial class view_report_ob
    {
        public int num { get; set; }
        public DateTime? date_adoption { get; set; }
        public string group { get; set; }
        public int? id_operator { get; set; }
        public string current_wagons_rent_operators_ru { get; set; }
        public string current_wagons_rent_operators_en { get; set; }
        public string current_wagons_rent_operator_abbr_ru { get; set; }
        public string current_wagons_rent_operator_abbr_en { get; set; }
        public bool? current_wagons_rent_operator_paid { get; set; }
        public int? arrival_uz_vagon_id_genus { get; set; }
        public int? arrival_uz_vagon_rod { get; set; }
        public string arrival_uz_vagon_rod_name_ru { get; set; }
        public string arrival_uz_vagon_rod_name_en { get; set; }
        public string arrival_uz_vagon_rod_abbr_ru { get; set; }
        public string arrival_uz_vagon_rod_abbr_en { get; set; }
        public int? arrival_uz_vagon_id_condition { get; set; }
        public string arrival_uz_vagon_condition_name_ru { get; set; }
        public string arrival_uz_vagon_condition_name_en { get; set; }
        public string arrival_uz_vagon_condition_abbr_ru { get; set; }
        public string arrival_uz_vagon_condition_abbr_en { get; set; }
        public bool? arrival_uz_vagon_condition_repairs { get; set; }
        public int? current_id_condition { get; set; }
        public string current_condition_name_ru { get; set; }
        public string current_condition_name_en { get; set; }
        public string current_condition_abbr_ru { get; set; }
        public string current_condition_abbr_en { get; set; }
        public bool? current_condition_repairs { get; set; }
    }
    public class view_total_balance
    {
        public int id { get; set; }
        public int? all { get; set; }
        public int? amkr { get; set; }
    }
    /// <summary>
    /// Класс данных выборки для отчета учетный остаток
    /// </summary>
    public class where_option_balance
    {
        public bool outer_car { get; set; }                 //Внешние стороние вагоны
        public bool amkr_outer_cars { get; set; }           //Внешние вагоны АМКР
        public bool amkr_cars { get; set; }                 //Внутри-заводские вагоны
        public int select_day { get; set; }                 //Сверх суток
        public int select_top { get; set; }                 //Топ
        public int id_operator { get; set; }                //Оператор
        public int id_limiting { get; set; }                //Ограничение
        public int id_cargo_arrival { get; set; }           //Груз по прибытию
        public int id_cargo_group_arrival { get; set; }     //Группа по ПРИБ
        public int id_certification_data { get; set; }      //Сертификационные данные
        public int id_departure_station { get; set; }       //Станция отправления
        public int id_division { get; set; }                //Грузополучатель
        public int id_station_contiguity { get; set; }      //Внешнее прибытие
        public int id_condition_arrival { get; set; }       //Разметка по прибытию
        public bool condition_mr { get; set; }              //Вагоны МР         
        public int id_genus { get; set; }                   //Род вагона
        public int id_cargo_sending { get; set; }           //Груз по отправлению          
        public int id_cargo_group_sending { get; set; }     //Группа по ОТПР
        public int id_division_loading { get; set; }        //Цех-погрузки                  
        public int id_destination_station { get; set; }     //Станция назначения
        public bool paid { get; set; }                      //Признак платности                                                          //
        public int id_station_amkr { get; set; }            //Станция нахождения вагона
        public bool not_surrender_cars { get; set; }        //Без учета сданных вагонов               
    }
    #endregion

    #region ДЕТАЛЬНО ВАГОНЫ (Обновленный АРМ)
    public class view_wagons
    {
        public long wir_id { get; set; }
        public long wim_id { get; set; }
        public long? wio_id { get; set; }
        public DateTime sample_datetime { get; set; }
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
        public bool? arrival_condition_repairs { get; set; }
        public string current_condition_name_ru { get; set; }
        public string current_condition_name_en { get; set; }
        public string current_condition_abbr_ru { get; set; }
        public string current_condition_abbr_en { get; set; }
        public bool? current_condition_red { get; set; }
        public bool? current_condition_repairs { get; set; }
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
        public int? accepted_id_station_amkr { get; set; }
        public string accepted_station_amkr_name_ru { get; set; }
        public string accepted_station_amkr_name_en { get; set; }
        public string accepted_station_amkr_abbr_ru { get; set; }
        public string accepted_station_amkr_abbr_en { get; set; }
        public int? arrival_id_station_amkr { get; set; }
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
        public int current_id_station_amkr { get; set; }
        public string current_station_amkr_name_ru { get; set; }
        public string current_station_amkr_name_en { get; set; }
        public string current_station_amkr_abbr_ru { get; set; }
        public string current_station_amkr_abbr_en { get; set; }
        public int? current_station_duration { get; set; }
        public int? current_way_duration { get; set; }
        public int? current_station_idle_time { get; set; }
        public int current_id_way { get; set; }
        public int? current_id_park { get; set; }
        public string current_way_num_ru { get; set; }
        public string current_way_num_en { get; set; }
        public string current_way_name_ru { get; set; }
        public string current_way_name_en { get; set; }
        public string current_way_abbr_ru { get; set; }
        public string current_way_abbr_en { get; set; }
        public DateTime current_way_start { get; set; }
        public DateTime? current_way_end { get; set; }
        public string current_wim_note { get; set; }
        public int? current_id_outer_way { get; set; }
        public string current_outer_way_name_ru { get; set; }
        public string current_outer_way_name_en { get; set; }
        public DateTime? current_outer_way_start { get; set; }
        public DateTime? current_outer_way_end { get; set; }
        public string sap_incoming_supply_num { get; set; }
        public string sap_incoming_supply_pos { get; set; }
        public DateTime? sap_incoming_supply_date { get; set; }
        public TimeSpan? sap_incoming_supply_time { get; set; }
        public string sap_incoming_supply_warehouse_code { get; set; }
        public string sap_incoming_supply_warehouse_name { get; set; }
        public string sap_incoming_supply_cargo_code { get; set; }
        public string sap_incoming_supply_cargo_name { get; set; }
        public string sap_incoming_supply_cargo_ban { get; set; }
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
        public bool? arrival_klient { get; set; }
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
        public string wir_highlight_color { get; set; }

    }

    public class view_outer_way_wagons
    {
        public long from_id_wim { get; set; }
        public long? id_wir { get; set; }
        public long? from_id_wio { get; set; }
        public long? on_id_wim { get; set; }
        public long? on_id_wio { get; set; }
        public string outer_way_num_sostav { get; set; }
        public int num { get; set; }
        public int outer_way_position { get; set; }
        public int? arrival_nom_doc { get; set; }
        public int? arrival_nom_main_doc { get; set; }
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
        public string arrival_condition_name_ru { get; set; }
        public string arrival_condition_name_en { get; set; }
        public string arrival_condition_abbr_ru { get; set; }
        public string arrival_condition_abbr_en { get; set; }
        public bool? arrival_condition_red { get; set; }
        public string arrival_cargo_group_name_ru { get; set; }
        public string arrival_cargo_group_name_en { get; set; }
        public string arrival_cargo_name_ru { get; set; }
        public string arrival_cargo_name_en { get; set; }
        public int? arrival_id_sertification_data { get; set; }
        public string arrival_sertification_data_ru { get; set; }
        public string arrival_sertification_data_en { get; set; }
        public string arrival_division_amkr_code { get; set; }
        public string arrival_division_amkr_name_ru { get; set; }
        public string arrival_division_amkr_name_en { get; set; }
        public string arrival_division_amkr_abbr_ru { get; set; }
        public string arrival_division_amkr_abbr_en { get; set; }
        public long? id_arrival_car { get; set; }
        public long? id_sap_incoming_supply { get; set; }
        public bool? doc_outgoing_car { get; set; }
        public long? id_outgoing_car { get; set; }
        public long? id_sap_outbound_supply { get; set; }
        public string wir_note { get; set; }
        public DateTime wir_create { get; set; }
        public string wir_create_user { get; set; }
        public DateTime? wir_close { get; set; }
        public string wir_close_user { get; set; }
        public long? wir_parent_id { get; set; }
        public int? from_id_operation { get; set; }
        public string from_operation_name_ru { get; set; }
        public string from_operation_name_en { get; set; }
        public bool? from_busy { get; set; }
        public DateTime? from_operation_start { get; set; }
        public DateTime? from_operation_end { get; set; }
        public int? from_operation_id_condition { get; set; }
        public string from_operation_condition_name_ru { get; set; }
        public string from_operation_condition_name_en { get; set; }
        public string from_operation_condition_abbr_ru { get; set; }
        public string from_operation_condition_abbr_en { get; set; }
        public int? from_operation_id_loading_status { get; set; }
        public string from_operation_loading_status_ru { get; set; }
        public string from_operation_loading_status_en { get; set; }
        public string from_operation_locomotive1 { get; set; }
        public string from_operation_locomotive2 { get; set; }
        public string from_operation_note { get; set; }
        public DateTime? from_operation_create { get; set; }
        public string from_operation_create_user { get; set; }
        public DateTime? from_operation_close { get; set; }
        public string from_operation_close_user { get; set; }
        public long? from_operation_parent_id { get; set; }
        public int from_id_station { get; set; }
        public string from_station_name_ru { get; set; }
        public string from_station_name_en { get; set; }
        public string from_station_abbr_ru { get; set; }
        public string from_station_abbr_en { get; set; }
        public int from_id_way { get; set; }
        public int? from_id_park { get; set; }
        public string from_way_num_ru { get; set; }
        public string from_way_num_en { get; set; }
        public string from_way_name_ru { get; set; }
        public string from_way_name_en { get; set; }
        public string from_way_abbr_ru { get; set; }
        public string from_way_abbr_en { get; set; }
        public int? from_way_capacity { get; set; }
        public DateTime? from_way_close { get; set; }
        public DateTime? from_way_delete { get; set; }
        public string from_way_note { get; set; }
        public DateTime from_way_start { get; set; }
        public DateTime? from_way_end { get; set; }
        public int? id_outer_way { get; set; }
        public string name_outer_way_ru { get; set; }
        public string name_outer_way_en { get; set; }
        public DateTime? outer_way_close { get; set; }
        public DateTime? outer_way_delete { get; set; }
        public string outer_way_note { get; set; }
        public DateTime? outer_way_start { get; set; }
        public DateTime? outer_way_end { get; set; }
        public string from_wim_note { get; set; }
        public DateTime from_wim_create { get; set; }
        public string from_wim_create_user { get; set; }
        public DateTime? from_wim_close { get; set; }
        public string from_wim_close_user { get; set; }
        public long? from_wim_parent_id { get; set; }
        public int? on_id_station { get; set; }
        public string on_station_name_ru { get; set; }
        public string on_station_name_en { get; set; }
        public string on_station_abbr_ru { get; set; }
        public string on_station_abbr_en { get; set; }
        public int? arrival_id_station { get; set; }
        public string arrival_station_name_ru { get; set; }
        public string arrival_station_name_en { get; set; }
        public string arrival_station_abbr_ru { get; set; }
        public string arrival_station_abbr_en { get; set; }
        public int? on_id_way { get; set; }
        public int? on_id_park { get; set; }
        public string on_way_num_ru { get; set; }
        public string on_way_num_en { get; set; }
        public string on_way_name_ru { get; set; }
        public string on_way_name_en { get; set; }
        public string on_way_abbr_ru { get; set; }
        public string on_way_abbr_en { get; set; }
        public int? on_way_capacity { get; set; }
        public DateTime? on_way_close { get; set; }
        public DateTime? on_way_delete { get; set; }
        public string on_way_note { get; set; }
        public DateTime? on_way_start { get; set; }
        public DateTime? on_way_end { get; set; }
        public int? on_way_position { get; set; }
        public string on_wim_note { get; set; }
        public DateTime? on_wim_create { get; set; }
        public string on_wim_create_user { get; set; }
        public DateTime? on_wim_close { get; set; }
        public string on_wim_close_user { get; set; }
        public long? on_wim_parent_id { get; set; }
        public int? on_id_operation { get; set; }
        public string on_operation_name_ru { get; set; }
        public string on_operation_name_en { get; set; }
        public bool? on_busy { get; set; }
        public DateTime? on_operation_start { get; set; }
        public DateTime? on_operation_end { get; set; }
        public int? on_operation_id_condition { get; set; }
        public string on_operation_condition_name_ru { get; set; }
        public string on_operation_condition_name_en { get; set; }
        public string on_operation_condition_abbr_ru { get; set; }
        public string on_operation_condition_abbr_en { get; set; }
        public int? on_operation_id_loading_status { get; set; }
        public string on_operation_loading_status_ru { get; set; }
        public string on_operation_loading_status_en { get; set; }
        public string on_operation_locomotive1 { get; set; }
        public string on_operation_locomotive2 { get; set; }
        public string on_operation_note { get; set; }
        public DateTime? on_operation_create { get; set; }
        public string on_operation_create_user { get; set; }
        public DateTime? on_operation_close { get; set; }
        public string on_operation_close_user { get; set; }
        public long? on_operation_parent_id { get; set; }
    }

    public class view_outer_way_sostav
    {
        public string outer_way_num_sostav { get; set; }
        public int? id_outer_way { get; set; }
        public string name_outer_way_ru { get; set; }
        public string name_outer_way_en { get; set; }
        public DateTime? outer_way_close { get; set; }
        public DateTime? outer_way_delete { get; set; }
        public string from_operation_locomotive1 { get; set; }
        public string from_operation_locomotive2 { get; set; }
        public DateTime? from_operation_start { get; set; }
        public DateTime? from_operation_end { get; set; }
        public DateTime? from_operation_create { get; set; }
        public string from_operation_create_user { get; set; }
        public int? from_id_station { get; set; }
        public string from_station_name_ru { get; set; }
        public string from_station_name_en { get; set; }
        public string from_station_abbr_ru { get; set; }
        public string from_station_abbr_en { get; set; }
        public int? from_id_way { get; set; }
        public int? from_id_park { get; set; }
        public string from_way_num_ru { get; set; }
        public string from_way_num_en { get; set; }
        public string from_way_name_ru { get; set; }
        public string from_way_name_en { get; set; }
        public string from_way_abbr_ru { get; set; }
        public string from_way_abbr_en { get; set; }
        public int? from_way_capacity { get; set; }
        public DateTime? from_way_close { get; set; }
        public DateTime? from_way_delete { get; set; }
        public int? count_wagons_send { get; set; }
        public string on_operation_locomotive1 { get; set; }
        public string on_operation_locomotive2 { get; set; }
        public DateTime? on_operation_start { get; set; }
        public DateTime? on_operation_end { get; set; }
        public DateTime? on_operation_create { get; set; }
        public string on_operation_create_user { get; set; }
        public int? on_id_station { get; set; }
        public string on_station_name_ru { get; set; }
        public string on_station_name_en { get; set; }
        public string on_station_abbr_ru { get; set; }
        public string on_station_abbr_en { get; set; }
        public int? on_id_way { get; set; }
        public int? on_id_park { get; set; }
        public string on_way_num_ru { get; set; }
        public string on_way_num_en { get; set; }
        public string on_way_name_ru { get; set; }
        public string on_way_name_en { get; set; }
        public string on_way_abbr_ru { get; set; }
        public string on_way_abbr_en { get; set; }
        public int? on_way_capacity { get; set; }
        public DateTime? on_way_close { get; set; }
        public DateTime? on_way_delete { get; set; }
        public int? count_wagons_arrival { get; set; }
        public int? count_wagons_return { get; set; }
        public int? count_wagons_accepted { get; set; }
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

    #region ОПЕРАЦИЯ ПРИНЯТЬ (Обновленный АРМ)
    public class OperationArrivalWagons
    {
        public int id_outer_way { get; set; }
        public List<ListOperationWagon> wagons { get; set; }
        public int id_way_on { get; set; }
        public bool head { get; set; }
        public DateTime lead_time { get; set; }
        public string locomotive1 { get; set; }
        public string locomotive2 { get; set; }
        public string user { get; set; }
    }
    #endregion

    #region ОПЕРАЦИЯ ВЕРНУТЬ (Обновленный АРМ)
    public class OperationReturnWagons
    {
        public int id_outer_way { get; set; }
        public List<ListOperationWagon> wagons { get; set; }
        public int id_way_on { get; set; }
        public bool head { get; set; }
        public DateTime? lead_time { get; set; }
        public string locomotive1 { get; set; }
        public string locomotive2 { get; set; }
        public bool type_return { get; set; }
        public string user { get; set; }
    }
    #endregion

    #region ОПЕРАЦИЯ СДАТЬ НА УЗ (Обновленный АРМ)
    public class OperationPresentSostav
    {
        public long id { get; set; }
        public DateTime date_end_inspection_acceptance_delivery { get; set; }
        public DateTime date_end_inspection_loader { get; set; }
        public DateTime date_end_inspection_vagonnik { get; set; }
        public DateTime date_readiness_uz { get; set; }
        public DateTime date_outgoing { get; set; }
        public DateTime? date_outgoing_act { get; set; }
        public int status { get; set; }
        public int id_station_on { get; set; }
        public bool route_sign { get; set; }
        public string composition_index { get; set; }
        public string user { get; set; }
    }
    #endregion

    #region ОПЕРАЦИЯ ПРЕДЪЯВИТЬ НА УЗ (Обновленный АРМ)
    public class OperationOutgoingDislocationWagons
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
    #endregion

    #region ОПЕРАЦИЯ ПРИНЯТЬ НА АМКР (Обновленный АРМ)
    public class OperationIncomingWagon
    {
        public long id_arrival_car { get; set; }
        public int position { get; set; }
        public DateTime? date_adoption_act { get; set; }
        public int? mode { get; set; }
        public Arrival_Doc arrival_main_doc { get; set; }
        public Arrival_Doc arrival_doc { get; set; }
        public Arrival_Doc_Vagon arrival_vagon_main_doc { get; set; }
        public Arrival_Doc_Vagon arrival_vagon_doc { get; set; }
        public string user { get; set; }
    }
    public class OperationReturnIncomingWagon
    {
        public long arrival_car_id { get; set; }
        public string user { get; set; }
    }
    public class OperationIncomingSostav
    {
        public long id_arrival_sostav { get; set; }
        public int num_doc { get; set; }
        public int train { get; set; }
        public string composition_index { get; set; }
        public DateTime date_arrival { get; set; }
        public DateTime date_adoption { get; set; }
        public DateTime? date_adoption_act { get; set; }
        public int id_station_from { get; set; }
        public int id_station_on { get; set; }
        public int id_way { get; set; }
        public bool? numeration { get; set; }
        public int count { get; set; }
        public string user { get; set; }
    }
    public class OperationCancelIncomingSostav
    {
        public long id_arrival_sostav { get; set; }
        public string user { get; set; }
    }
    public class OperationManualSearchArrivalWagon
    {
        public long id_arrival_sostav { get; set; }
        public bool check { get; set; }
        public List<int> num_cars { get; set; }
        public string num_doc { get; set; }
        public bool as_client { get; set; }
        public string user { get; set; }
    }
    public class OperationManualAddArrivalWagon
    {
        public long id_arrival_sostav { get; set; }
        public List<int> num_cars { get; set; }
        public string num_doc { get; set; }
        public string user { get; set; }
    }

    #endregion

    #region ОТЧЕТЫ Транспортный департамент (Обновленный АРМ)
    public class current_operation_wagon
    {
        public int num { get; set; }
        public int? id_wagons_rent { get; set; }
        public int? curr_wagons_rent_id_operator { get; set; }
        public string curr_wagons_rent_operators_ru { get; set; }
        public string curr_wagons_rent_operators_en { get; set; }
        public string curr_wagons_rent_operator_abbr_ru { get; set; }
        public string curr_wagons_rent_operator_abbr_en { get; set; }
        public DateTime? curr_wagons_rent_start { get; set; }
        public DateTime? curr_wagons_rent_end { get; set; }
        public bool? curr_wagons_rent_operator_paid { get; set; }
        public string curr_wagons_rent_operator_color { get; set; }
        public int? curr_wagons_rent_id_limiting { get; set; }
        public string curr_wagons_rent_limiting_name_ru { get; set; }
        public string curr_wagons_rent_limiting_name_en { get; set; }
        public string curr_wagons_rent_limiting_abbr_ru { get; set; }
        public string curr_wagons_rent_limiting_abbr_en { get; set; }
        public int wagon_id_countrys { get; set; }
        public int? wagon_adm { get; set; }
        public string wagon_adm_name_ru { get; set; }
        public string wagon_adm_name_en { get; set; }
        public string wagon_adm_abbr_ru { get; set; }
        public string wagon_adm_abbr_en { get; set; }
        public int wagon_id_genus { get; set; }
        public int? wagon_rod { get; set; }
        public string wagon_rod_name_ru { get; set; }
        public string wagon_rod_name_en { get; set; }
        public string wagon_rod_abbr_ru { get; set; }
        public string wagon_rod_abbr_en { get; set; }
        public int wagon_id_owner { get; set; }
        public string wagon_owner_wagon_ru { get; set; }
        public string wagon_owner_wagon_en { get; set; }
        public string wagon_owner_wagon_abbr_ru { get; set; }
        public string wagon_owner_wagon_abbr_en { get; set; }
        public double wagon_gruzp { get; set; }
        public double? wagon_tara { get; set; }
        public int wagon_kol_os { get; set; }
        public string wagon_usl_tip { get; set; }
        public DateTime? wagon_date_rem_uz { get; set; }
        public DateTime? cwagon_date_rem_vag { get; set; }
        public int? wagon_id_type_ownership { get; set; }
        public int? cwagon_sign { get; set; }
        public string wagon_factory_number { get; set; }
        public string wagon_inventory_number { get; set; }
        public int? wagon_year_built { get; set; }
        public bool? wagon_exit_ban { get; set; }
        public string wagon_note { get; set; }
        public int? wagon_sobstv_kis { get; set; }
        public bool? wagon_bit_warning { get; set; }
        public DateTime wagon_create { get; set; }
        public string wagon_create_user { get; set; }
        public DateTime? wagon_change { get; set; }
        public string wagon_change_user { get; set; }
        public bool? wagon_closed_route { get; set; }
        public string wagon_new_construction { get; set; }
        public long? wir_id { get; set; }
        public long? wir_id_arrival_car { get; set; }
        public long? wir_id_outgoing_car { get; set; }
        public string wir_note { get; set; }
        public string wir_highlight_color { get; set; }
        public int? arrival_id_condition { get; set; }
        public string arrival_condition_name_ru { get; set; }
        public string arrival_condition_name_en { get; set; }
        public string arrival_condition_abbr_ru { get; set; }
        public string arrival_condition_abbr_en { get; set; }
        public bool? arrival_condition_repairs { get; set; }
        public int? current_id_condition { get; set; }
        public string current_condition_name_ru { get; set; }
        public string currentn_condition_name_en { get; set; }
        public string current_condition_abbr_ru { get; set; }
        public string current_condition_abbr_en { get; set; }
        public bool? current_condition_repairs { get; set; }
        public DateTime? current_condition_create { get; set; }
        public string current_condition_create_user { get; set; }
        public string instructional_letters_num { get; set; }
        public DateTime? instructional_letters_datetime { get; set; }
        public int? instructional_letters_station_code { get; set; }
        public string instructional_letters_station_name { get; set; }
        public string instructional_letters_note { get; set; }
        public DateTime? cur_date_adoption { get; set; }
        public DateTime? cur_date_adoption_act { get; set; }
        public DateTime? cur_date_outgoing { get; set; }
        public DateTime? cur_date_outgoing_act { get; set; }
        public DateTime? last_date_outgoing { get; set; }
        public DateTime? last_date_outgoing_act { get; set; }
    }
    #endregion

    #region СЕРВИС Коммерческое состояние
    public class OperationCommercialCondition
    {
        public long id_wir { get; set; }
        public int id_condition_arrival { get; set; }
        public string note { get; set; }
        public bool distinguish { get; set; }
        public string user { get; set; }
    }
    #endregion

    #region СЕРВИС Плата за пользование
    public class OperationChangeUsageFeePeriod
    {
        public DateTime start { get; set; }
        public DateTime stop { get; set; }
        public bool hour_after_30 { get; set; }
        public int? id_currency { get; set; }
        public decimal? rate { get; set; }
        public int? id_currency_derailment { get; set; }
        public decimal? rate_derailment { get; set; }
        public float? coefficient_route { get; set; }
        public float? coefficient_not_route { get; set; }
        public int? grace_time_1 { get; set; }
        public int? grace_time_2 { get; set; }
        public string note { get; set; }
        public List<ListUsageFee> list_period { get; set; }
        public string user { get; set; }
    }
    #endregion

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
    public class OperationUpdateEPDSendingCar
    {
        public long id_outgoing_car { get; set; }
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
                db.Database.CommandTimeout = 300;
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
                System.Data.SqlClient.SqlParameter id_st = new System.Data.SqlClient.SqlParameter("@id_station", id_station);
                System.Data.SqlClient.SqlParameter id_pk = new System.Data.SqlClient.SqlParameter("@id_park", id_park);
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
                List<view_status_way> list = db.Database.SqlQuery<view_status_way>(sql, id_st, id_pk).ToList();
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

        /// <summary>
        /// ВСЕ Составы на падходах 
        /// </summary>
        /// <returns></returns>
        // GET: api/ids/rwt/wsd/view/vagons/outer_way/sostav
        [Route("view/vagons/outer_way/sostav")]
        [ResponseType(typeof(view_outer_way_sostav))]
        public IHttpActionResult GetViewSostavOfOuterWay()
        {
            try
            {
                string sql = "select * from [IDS].[get_view_sostav_of_all_outer_ways]() order by from_operation_end desc";
                List<view_outer_way_sostav> list = db.Database.SqlQuery<view_outer_way_sostav>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Составы на падходах прибывающие на указаную станцию
        /// </summary>
        /// <returns></returns>
        // GET: api/ids/rwt/wsd/view/vagons/outer_way/sostav/arrival/station/id/1
        [Route("view/vagons/outer_way/sostav/arrival/station/id/{id_station:int}")]
        [ResponseType(typeof(view_outer_way_sostav))]
        public IHttpActionResult GetViewArrivalSostavOfStationOuterWay(int id_station)
        {
            try
            {
                db.Database.CommandTimeout = 300;
                System.Data.SqlClient.SqlParameter id = new System.Data.SqlClient.SqlParameter("@id_station", id_station);
                string sql = "select * from [IDS].[get_view_arrival_sostav_of_outer_ways](@id_station) order by from_operation_end desc";
                List<view_outer_way_sostav> list = db.Database.SqlQuery<view_outer_way_sostav>(sql, id).ToList();
                this.db.Database.CommandTimeout = null;
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Составы на перегонах отправленные с указаной станции
        /// </summary>
        /// <param name="id_station"></param>
        /// <returns></returns>
        // GET: api/ids/rwt/wsd/view/vagons/outer_way/sostav/send/station/id/1
        [Route("view/vagons/outer_way/sostav/send/station/id/{id_station:int}")]
        [ResponseType(typeof(view_outer_way_sostav))]
        public IHttpActionResult GetViewSendSostavOfStationOuterWay(int id_station)
        {
            try
            {
                db.Database.CommandTimeout = 300;                
                System.Data.SqlClient.SqlParameter id = new System.Data.SqlClient.SqlParameter("@id_station", id_station);
                string sql = "select * from [IDS].[get_view_send_sostav_of_outer_ways](@id_station) order by from_operation_end desc";
                List<view_outer_way_sostav> list = db.Database.SqlQuery<view_outer_way_sostav>(sql, id).ToList();
                this.db.Database.CommandTimeout = null;
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/vagons/operation/sostav/send/period/start/2021-09-01T00:00:00/stop/2021-10-31T23:59:59
        [Route("view/vagons/operation/sostav/send/period/start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(view_outer_way_sostav))]
        public IHttpActionResult GetViewSostavOfPeriodOperationSend(DateTime start, DateTime stop)
        {
            try
            {
                db.Database.CommandTimeout = 300;                   
                System.Data.SqlClient.SqlParameter d_start = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter d_stop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                string sql = "select * from [IDS].[get_view_sostav_of_period_operation_send](@start, @stop) order by from_operation_end desc";
                List<view_outer_way_sostav> list = db.Database.SqlQuery<view_outer_way_sostav>(sql, d_start, d_stop).ToList();
                this.db.Database.CommandTimeout = null;
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        /// <summary>
        /// ВСЕ Вагоны на падходах 
        /// </summary>
        /// <returns></returns>
        // GET: api/ids/rwt/wsd/view/vagons/outer_way
        [Route("view/vagons/outer_way")]
        [ResponseType(typeof(view_outer_way_wagons))]
        public IHttpActionResult GetViewWagonsOfOuterWay()
        {
            try
            {
                string sql = "select * from [IDS].[get_view_wagons_of_all_outer_ways]() order by from_operation_end desc, id_outer_way, outer_way_num_sostav, outer_way_position";
                List<view_outer_way_wagons> list = db.Database.SqlQuery<view_outer_way_wagons>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Вернуть информацию по вагонам указаного состава на перегоне
        /// </summary>
        /// <returns></returns>
        // GET: api/ids/rwt/wsd/view/vagons/outer_way/sostav/num/50-29092021105300
        [Route("view/vagons/outer_way/sostav/num/{outer_way_num_sostav}")]
        [ResponseType(typeof(view_outer_way_wagons))]
        public IHttpActionResult GetViewWagonsOfSostavOuterWay(string outer_way_num_sostav)
        {
            try
            {
                System.Data.SqlClient.SqlParameter num_sostav = new System.Data.SqlClient.SqlParameter("@outer_way_num_sostav", outer_way_num_sostav);
                string sql = "select * from [IDS].[get_view_wagons_of_sostav_outer_ways](@outer_way_num_sostav) order by from_operation_end desc";
                List<view_outer_way_wagons> list = db.Database.SqlQuery<view_outer_way_wagons>(sql, num_sostav).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region ОТЧЕТ УЧЕТНЫЙ ОСТАТОК  (Обновленный АРМ)
        // GET: api/ids/rwt/wsd/view/operating_balance/date/2023-07-21T00:00:00
        /// <summary>
        /// Получить оперативный остаток на определенную дату
        /// </summary>
        /// <returns></returns>
        [Route("view/operating_balance/date/{date:datetime}")]
        [ResponseType(typeof(view_operating_balance))]
        public IHttpActionResult GetViewOperatingBalance(DateTime date)
        {
            try
            {
                db.Database.CommandTimeout = 300;
                System.Data.SqlClient.SqlParameter p_date = new System.Data.SqlClient.SqlParameter("@date", date);
                string sql = "select * from [IDS].[get_view_operating_balance_of_date](@date)";
                List<view_operating_balance> list = db.Database.SqlQuery<view_operating_balance>(sql,p_date).ToList();
                this.db.Database.CommandTimeout = null;
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/operators/operating_balance/start/2023-07-21T00:00:00/stop/2023-07-22T00:00:00
        /// <summary>
        /// Получить остаток по операторам за период 
        /// </summary>
        /// <returns></returns>
        [Route("view/operators/operating_balance/start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(view_operator_ob))]
        public IHttpActionResult GetViewOperators_OB_OfPeriod(DateTime start, DateTime stop)
        {
            try
            {
                db.Database.CommandTimeout = 300;
                System.Data.SqlClient.SqlParameter p_start = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter p_stop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                string sql = "select * from [IDS].[get_view_operator_ob_of_period](@start, @stop)";
                List<view_operator_ob> list = db.Database.SqlQuery<view_operator_ob>(sql, p_start, p_stop).ToList();
                this.db.Database.CommandTimeout = null;
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/current/operating_balance/date/2023-07-21T00:00:00
        /// <summary>
        /// Получить текущий оперативный остаток на указанную дату 
        /// </summary>
        /// <returns></returns>
        [Route("view/current/operating_balance/date/{date:datetime}")]
        [ResponseType(typeof(view_current_ob))]
        public IHttpActionResult GetViewCurrent_OB_OfDate(DateTime date)
        {
            try
            {
                db.Database.CommandTimeout = 300;
                System.Data.SqlClient.SqlParameter p_date = new System.Data.SqlClient.SqlParameter("@date", date);
                string sql = "select * from [IDS].[get_view_cur_ob_of_date](@date)";
                List<view_current_ob> list = db.Database.SqlQuery<view_current_ob>(sql, p_date).ToList();
                this.db.Database.CommandTimeout = null;
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/report/operating_balance/date/2023-07-21T00:00:00
        /// <summary>
        /// Получить текущий оперативный остаток на указанную дату 
        /// </summary>
        /// <returns></returns>
        [Route("view/report/operating_balance/date/{date:datetime}")]
        [ResponseType(typeof(view_report_ob))]
        public IHttpActionResult GetViewReport_OB_OfDate(DateTime date)
        {
            try
            {
                db.Database.CommandTimeout = 300;
                System.Data.SqlClient.SqlParameter p_date = new System.Data.SqlClient.SqlParameter("@date", date);
                string sql = "select * from [IDS].[get_view_report_ob_of_date](@date)";
                List<view_report_ob> list = db.Database.SqlQuery<view_report_ob>(sql, p_date).ToList();
                this.db.Database.CommandTimeout = null;
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // GET: api/ids/rwt/wsd/view/total_balance
        /// <summary>
        /// Получить расчет остатков по вагонам
        /// </summary>
        /// <returns></returns>
        [Route("view/total_balance")]
        [ResponseType(typeof(view_total_balance))]
        public IHttpActionResult GetViewTotalBalance()
        {
            try
            {

                string sql = "select * from [IDS].[get_total_balance]()";
                List<view_total_balance> list = db.Database.SqlQuery<view_total_balance>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/view/vagons/balance
        /// <summary>
        /// Показать вагоны детально отчет учетный остаток на АМКР
        /// </summary>
        /// <returns></returns>
        [Route("view/vagons/balance")]
        [ResponseType(typeof(view_wagons))]
        public IHttpActionResult GetViewWagonsOfBalance()
        {
            try
            {
                this.db.Database.CommandTimeout = 300;
                string sql = "select * from [IDS].[get_view_wagons_of_balance]()";
                var list = db.Database.SqlQuery<view_wagons>(sql).ToList();
                this.db.Database.CommandTimeout = null;
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/view/vagons/balance
        [HttpPost]
        [Route("view/vagons/balance")]
        [ResponseType(typeof(view_wagons))]
        public IHttpActionResult PostViewWagonsOfBalance([FromBody] where_option_balance value)
        {
            try
            {
                // формируем строку выборки
                string where = "";
                if (value.outer_car == false)
                {
                    if (value.amkr_outer_cars == false && value.amkr_cars == false)
                    {
                        return Ok(default(view_wagons));
                    }
                    if (value.amkr_outer_cars == true && value.amkr_cars == true)
                    {
                        //return Ok(default(view_wagons));
                        where += (String.IsNullOrWhiteSpace(where) ? "" : " AND ") + "id_operator IN (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] IN ('amkr', 'amkr_vz'))";
                    }
                    else
                    {
                        if (value.amkr_outer_cars == true)
                        {
                            where += (String.IsNullOrWhiteSpace(where) ? "" : " AND ") + "id_operator IN (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] = N'amkr')";
                        }
                        if (value.amkr_cars == true)
                        {
                            where += (String.IsNullOrWhiteSpace(where) ? "" : " AND ") + "id_operator IN (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] = N'amkr_vz')";
                        }
                    }
                }
                else
                {
                    if (value.amkr_outer_cars == false)
                    {
                        where += (String.IsNullOrWhiteSpace(where) ? "" : " AND ") + "id_operator NOT IN (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] = N'amkr')";
                    }
                    if (value.amkr_cars == false)
                    {
                        where += (String.IsNullOrWhiteSpace(where) ? "" : " AND ") + "id_operator NOT IN (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] = N'amkr_vz')";
                    }
                }
                db.Database.CommandTimeout = 300;
                string sql = "select * from [IDS].[get_view_wagons_of_balance]()" + (!String.IsNullOrWhiteSpace(where) ? " WHERE " + where : "");
                var list = db.Database.SqlQuery<view_wagons>(sql).ToList();
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
        [ResponseType(typeof(ResultTransfer))]
        public IHttpActionResult PostSendWagonsOfStationAMKR([FromBody] OperationSendWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                ResultTransfer result = ids_wir.SendWagonsOfStation(value.id_way_from, value.id_outer_ways, value.lead_time, value.wagons, null, value.locomotive1, value.locomotive2, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region ОПЕРАЦИЯ ПРИНЯТЬ (Обновленный АРМ)
        // POST api/ids/rwt/wsd/operation/arrival
        [HttpPost]
        [Route("operation/arrival")]
        [ResponseType(typeof(ResultTransfer))]
        public IHttpActionResult PostArrivalWagonsOfStationAMKR([FromBody] OperationArrivalWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                ResultTransfer result = ids_wir.ArrivalWagonsOfStation(value.id_outer_way, value.wagons, value.id_way_on, value.head, value.lead_time, value.locomotive1, value.locomotive2, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region ОПЕРАЦИЯ ВЕРНУТЬ(ОТМЕНИТЬ) (Обновленный АРМ)
        // POST api/ids/rwt/wsd/operation/return
        [HttpPost]
        [Route("operation/return")]
        [ResponseType(typeof(ResultTransfer))]
        public IHttpActionResult PostReturnWagonsOfStationAMKR([FromBody] OperationReturnWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                ResultTransfer result = ids_wir.ReturnWagonsOfStation(value.id_outer_way, value.wagons, value.id_way_on, value.head, value.lead_time, value.locomotive1, value.locomotive2, value.type_return, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region ОПЕРАЦИЯ ПРЕДЪЯВИТЬ НА УЗ (Обновленный АРМ)
        // POST api/ids/rwt/wsd/operation/present/wagon
        /// <summary>
        /// Операция предявить вагон на уз (Перенести в левую часть экрана)
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

        // POST api/ids/rwt/wsd/operation/outgoing_dislocation
        [HttpPost]
        [Route("operation/outgoing_dislocation")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationOutgoingDislocationWagons([FromBody] OperationOutgoingDislocationWagons value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.DislocationWagonsOfStation(value.id_way_from, value.reverse, value.list_dislocation, value.id_way_on, value.side_on, value.lead_time, value.locomotive1, value.locomotive2, true, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion

        #region ОПЕРАЦИЯ ПРИНЯТЬ НА АМКР (Обновленный АРМ)
        /// <summary>
        /// Удалить состав и вагоны прибывшего состава введенного вручную
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // DELETE api/ids/rwt/wsd/operation/delete/arrival_sostav/id/
        [HttpDelete]
        [Route("operation/delete/arrival_sostav/id/{id:long}")]
        [ResponseType(typeof(int))]
        public IHttpActionResult DeleteArrivalSostav(long id)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.DeleteManualArrivalSostav(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/incoming/wagon
        /// <summary>
        /// Операция принять вагон на АМКР (Перенести в левую часть экрана)
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/incoming/wagon")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationIncomingWagon([FromBody] OperationIncomingWagon value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationIncomingWagon(value.id_arrival_car, value.position, value.date_adoption_act, value.mode, value.arrival_main_doc, value.arrival_doc, value.arrival_vagon_main_doc, value.arrival_vagon_doc, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/return_incoming/wagon
        /// <summary>
        /// Операция вернуть принятый вагон на уз в правую часть
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/return_incoming/wagon")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationReturnIncomingWagon([FromBody] OperationReturnIncomingWagon value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationReturnIncomingWagon(value.arrival_car_id, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/incoming/sostav
        /// <summary>
        /// Операция принять состав на АМКР
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/incoming/sostav")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationIncomingSostav([FromBody] OperationIncomingSostav value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationIncomingSostav(value.id_arrival_sostav, value.num_doc, value.train, value.composition_index, value.date_arrival, value.date_adoption, value.date_adoption_act, value.id_station_from, value.id_station_on, value.id_way, value.numeration, value.count, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/cancel_incoming/sostav
        /// <summary>
        /// Операция отменить принятие состава на АМКР
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/cancel_incoming/sostav")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationCancelIncomingSostav([FromBody] OperationCancelIncomingSostav value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationCancelIncomingSostav(value.id_arrival_sostav, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/wsd/operation/arrival/wagon/searsh/manual
        /// <summary>
        /// Операция отменить принятие состава на АМКР
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/arrival/wagon/searsh/manual")]
        [ResponseType(typeof(ResultObject))]
        public IHttpActionResult PostOperationManualSearchArrivalWagon([FromBody] OperationManualSearchArrivalWagon value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                ResultObject result = ids_wir.OperationManualSearchArrivalWagon(value.id_arrival_sostav, value.check, value.num_cars, value.num_doc, value.as_client, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // POST api/ids/rwt/wsd/operation/arrival/wagon/add
        /// <summary>
        /// Операция отменить принятие состава на АМКР
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/arrival/wagon/add")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostOperationManualAddArrivalWagon([FromBody] OperationManualAddArrivalWagon value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.OperationManualAddArrivalWagon(value.id_arrival_sostav, value.num_cars, value.num_doc, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region ОТЧЕТЫ Департамент по продажам (Обновленный АРМ)
        // POST api/ids/rwt/wsd/report/sd/border_crossing
        [HttpPost]
        [Route("report/sd/border_crossing")]
        [ResponseType(typeof(ReportBorderCrossing))]
        public IHttpActionResult PostReportBorderCrossingOfNums([FromBody] List<int> nums)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                List<ReportBorderCrossing> result = ids_wir.GetReportBorderCrossingOfNums(nums);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region ОТЧЕТЫ Транспортный департамент (Обновленный АРМ)
        // GET: api/ids/rwt/wsd/report/td/current_operation_wagon/num/65201857
        [Route("report/td/current_operation_wagon/num/{num:int}")]
        [ResponseType(typeof(current_operation_wagon))]
        public IHttpActionResult GetCurrentOperationWagonOfNum(int num)
        {
            try
            {
                System.Data.SqlClient.SqlParameter p_num = new System.Data.SqlClient.SqlParameter("@num", num);
                string sql = "select * from [IDS].[get_current_operation_wagon_of_num](@num)";
                current_operation_wagon result = db.Database.SqlQuery<current_operation_wagon>(sql, p_num).FirstOrDefault();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region СЕРВИС Коммерческое состояние
        // POST api/ids/rwt/wsd/service/operation/commercial_condition
        [HttpPost]
        [Route("service/operation/commercial_condition")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostChangeCommercialCondition([FromBody] OperationCommercialCondition value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.ServiceChangeCommercialCondition(value.id_wir, value.id_condition_arrival, value.note, value.distinguish, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region СЕРВИС Плата за пользование
        // POST api/ids/rwt/wsd/service/operation/usage_fee_period/change
        [HttpPost]
        [Route("service/operation/usage_fee_period/change")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostChangeUsageFeePeriod([FromBody] OperationChangeUsageFeePeriod value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                int result = ids_wir.ServiceChangeUsageFeePeriod(value.start, value.stop, value.hour_after_30, value.id_currency, value.rate, value.id_currency_derailment, value.rate_derailment, value.coefficient_route, value.coefficient_not_route, value.grace_time_1, value.grace_time_2, value.note, value.list_period, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion


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
                int result = ids_wir.DislocationWagonsOfStation(value.id_way_from, value.reverse, value.list_dislocation, value.id_way_on, value.side_on, value.lead_time, value.locomotive1, value.locomotive2, false, value.user);
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

        #region ОПЕРАЦИЯ СДАТЬ НА УЗ (Обновленный АРМ)
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
                int result = ids_wir.OperationPresentSostav(value.id, value.date_end_inspection_acceptance_delivery, value.date_end_inspection_loader,
                    value.date_end_inspection_vagonnik, value.date_readiness_uz, value.date_outgoing, value.date_outgoing_act, value.status, value.id_station_on, value.route_sign, value.composition_index, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

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

        // POST api/ids/rwt/wsd/operation/update/epd/sending/car
        /// <summary>
        /// Обновить документы по составу предъявленному и сданному на дорогу 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("operation/update/epd/sending/car")]
        [ResponseType(typeof(OperationResultID))]
        public IHttpActionResult PostOperationUpdateEPDSendingCar([FromBody] OperationUpdateEPDSendingCar value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                OperationResultID result = ids_wir.OperationUpdateEPDSendingCar(value.id_outgoing_car, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wsd/searsh/epd/num_doc/42948810
        [Route("searsh/epd/num_doc/{num_doc}")]
        [ResponseType(typeof(ResultObject))]
        public IHttpActionResult Get_UZ_DOC_Of_NumDoc(string num_doc)
        {
            try
            {

                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                ResultObject result = ids_wir.OperationSearchUpdateUZ_DOC_Of_SMS(num_doc, true);
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
                List<sostav_operation_send> result = ids_wir.GetSostavWagonsOperationOfSend(start, stop);
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
