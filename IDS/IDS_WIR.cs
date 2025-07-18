﻿using EFIDS.Concrete;
using EFIDS.Entities;
using IDSLogs;
using IDSLogs.Enum;
using IDS.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UZ;
using System.Runtime.InteropServices;
using System.Globalization;
using EFIDS.Helper;
using IDS;
using System.Threading;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Remoting.Contexts;
using System.Runtime.ConstrainedExecution;
using System.Text.RegularExpressions;

namespace IDS
{
    /// <summary>
    /// Класс набора данных отображения ЭПД в ИДС 
    /// </summary>
    //public class IDS_UZ_DOC
    //{
    //    public string num_doc { get; set; }
    //    public int revision { get; set; }
    //    public int? status { get; set; }
    //    public int? num_uz { get; set; }
    //    public string code_from { get; set; }
    //    public string code_on { get; set; }
    //    public DateTime? dt { get; set; }
    //    public string xml_doc { get; set; }
    //    public string xml_final { get; set; }
    //    public OTPR otpr { get; set; }

    //}
    public class ListUsageFee
    {
        public int id { get; set; }
        public int id_operator { get; set; }
        public int id_genus { get; set; }
    }

    /// <summary>
    /// Класс данных задание на роспуск
    /// </summary>
    public class DissolutionWagon
    {
        public long wir_id { get; set; }
        public int position { get; set; }
        public int id_way_dissolution { get; set; }
    }
    /// <summary>
    /// Класс данных задание на операции дислокация, отправка, прием
    /// </summary>
    public class ListOperationWagon
    {
        public long wir_id { get; set; }
        public int position { get; set; }
    }
    /// <summary>
    /// Класс данных WIR c новой позицией
    /// </summary>
    public class WagonInternalRoutesPosition
    {
        public WagonInternalRoutes wir { get; set; }
        public int new_position { get; set; }
    }
    /// <summary>
    /// Класс данных сотояние парка новая позиция
    /// </summary>
    public class ParkStatePosition
    {
        public int id_way { get; set; }
        public int num { get; set; }
        public int position { get; set; }
    }
    /// <summary>
    /// Класс данных для хранения ЭПД отправляемых вагонов
    /// </summary>
    public class EPDOutgoingCar
    {
        public long id_outgoing_car { get; set; }
        public UZ.UZ_DOC epd { get; set; }
    }

    public class wagon_operation_send
    {
        public long id_wir { get; set; }
        public long? id_wim { get; set; }
        public long id_wio { get; set; }
        public int? num { get; set; }
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
        public string arrival_condition_name_ru { get; set; }
        public string arrival_condition_name_en { get; set; }
        public string arrival_condition_abbr_ru { get; set; }
        public string arrival_condition_abbr_en { get; set; }
        public bool? arrival_condition_red { get; set; }
        public string arrival_cargo_group_name_ru { get; set; }
        public string arrival_cargo_group_name_en { get; set; }
        public string arrival_cargo_name_ru { get; set; }
        public string arrival_cargo_name_en { get; set; }
        public long? id_arrival_car { get; set; }
        public long? id_sap_incoming_supply { get; set; }
        public bool? doc_outgoing_car { get; set; }
        public long? id_outgoing_car { get; set; }
        public long? id_sap_outbound_supply { get; set; }
        public string wir_note { get; set; }
        public DateTime? wir_create { get; set; }
        public string wir_create_user { get; set; }
        public DateTime? wir_close { get; set; }
        public string wir_close_user { get; set; }
        public long? wir_parent_id { get; set; }
        public int id_operation { get; set; }
        public string operation_name_ru { get; set; }
        public string operation_name_en { get; set; }
        public bool busy { get; set; }
        public DateTime operation_start { get; set; }
        public DateTime? operation_end { get; set; }
        public int operation_id_condition { get; set; }
        public string operation_condition_name_ru { get; set; }
        public string operation_condition_name_en { get; set; }
        public string operation_condition_abbr_ru { get; set; }
        public string operation_condition_abbr_en { get; set; }
        public bool? operation_red { get; set; }
        public int operation_id_loading_status { get; set; }
        public string operation_loading_status_ru { get; set; }
        public string operation_loading_status_en { get; set; }
        public string operation_locomotive1 { get; set; }
        public string operation_locomotive2 { get; set; }
        public string operation_note { get; set; }
        public DateTime operation_create { get; set; }
        public string operation_create_user { get; set; }
        public DateTime? operation_close { get; set; }
        public string operation_close_user { get; set; }
        public long? operation_parent_id { get; set; }
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
        public int? from_capacity { get; set; }
        public DateTime? from_way_close { get; set; }
        public DateTime? from_way_delete { get; set; }
        public string from_way_note { get; set; }
        public DateTime? from_way_start { get; set; }
        public DateTime? from_way_end { get; set; }
        public int? id_outer_way { get; set; }
        public string name_outer_way_ru { get; set; }
        public string name_outer_way_en { get; set; }
        public DateTime? outer_way_close { get; set; }
        public DateTime? outer_way_delete { get; set; }
        public string outer_way_note { get; set; }
        public DateTime? outer_way_start { get; set; }
        public DateTime? outer_way_end { get; set; }
        public int? wim_position { get; set; }
        public string wim_note { get; set; }
        public DateTime? wim_create { get; set; }
        public string wim_create_user { get; set; }
        public DateTime? wim_close { get; set; }
        public string wim_close_user { get; set; }
        public long? wim_parent_id { get; set; }
        public int? id_station_on { get; set; }
        public string on_station_name_ru { get; set; }
        public string on_station_name_en { get; set; }
        public string on_station_abbr_ru { get; set; }
        public string on_station_abbr_en { get; set; }
    }

    public class sostav_operation_send
    {
        public int id { get; set; }
        public int id_operation { get; set; }
        public string operation_name_ru { get; set; }
        public string operation_name_en { get; set; }
        public DateTime operation_start { get; set; }
        public DateTime? operation_end { get; set; }
        public DateTime operation_create { get; set; }
        public string operation_create_user { get; set; }
        public string operation_locomotive1 { get; set; }
        public string operation_locomotive2 { get; set; }
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
        public int? id_outer_way { get; set; }
        public string name_outer_way_ru { get; set; }
        public string name_outer_way_en { get; set; }
        public DateTime? outer_way_close { get; set; }
        public DateTime? outer_way_delete { get; set; }
        public string outer_way_note { get; set; }
        public int? id_station_on { get; set; }
        public string on_station_name_ru { get; set; }
        public string on_station_name_en { get; set; }
        public string on_station_abbr_ru { get; set; }
        public string on_station_abbr_en { get; set; }
        public int count_wagon_send { get; set; }
        public int count_wagon_arrival { get; set; }
        public List<wagon_operation_send> wagons { get; set; }
    }

    public class wagon_send_arrival
    {
        public int id { get; set; }
        public long id_wir { get; set; }
        public long? from_id_wim { get; set; }
        public long from_id_wio { get; set; }
        public long? on_id_wim { get; set; }
        public long? on_id_wio { get; set; }
        public int? num { get; set; }
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
        public string arrival_condition_name_ru { get; set; }
        public string arrival_condition_name_en { get; set; }
        public string arrival_condition_abbr_ru { get; set; }
        public string arrival_condition_abbr_en { get; set; }
        public bool? arrival_condition_red { get; set; }
        public string arrival_cargo_group_name_ru { get; set; }
        public string arrival_cargo_group_name_en { get; set; }
        public string arrival_cargo_name_ru { get; set; }
        public string arrival_cargo_name_en { get; set; }
        public long? id_arrival_car { get; set; }
        public long? id_sap_incoming_supply { get; set; }
        public bool? doc_outgoing_car { get; set; }
        public long? id_outgoing_car { get; set; }
        public long? id_sap_outbound_supply { get; set; }
        public string wir_note { get; set; }
        public DateTime? wir_create { get; set; }
        public string wir_create_user { get; set; }
        public DateTime? wir_close { get; set; }
        public string wir_close_user { get; set; }
        public long? wir_parent_id { get; set; }
        public int from_id_operation { get; set; }
        public string from_operation_name_ru { get; set; }
        public string from_operation_name_en { get; set; }
        public bool from_busy { get; set; }
        public DateTime from_operation_start { get; set; }
        public DateTime? from_operation_end { get; set; }
        public int from_operation_id_condition { get; set; }
        public string from_operation_condition_name_ru { get; set; }
        public string from_operation_condition_name_en { get; set; }
        public string from_operation_condition_abbr_ru { get; set; }
        public string from_operation_condition_abbr_en { get; set; }
        public bool? from_operation_red { get; set; }
        public int from_operation_id_loading_status { get; set; }
        public string from_operation_loading_status_ru { get; set; }
        public string from_operation_loading_status_en { get; set; }
        public string from_operation_locomotive1 { get; set; }
        public string from_operation_locomotive2 { get; set; }
        public string from_operation_note { get; set; }
        public DateTime from_operation_create { get; set; }
        public string from_operation_create_user { get; set; }
        public DateTime? from_operation_close { get; set; }
        public string from_operation_close_user { get; set; }
        public long? from_operation_parent_id { get; set; }
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
        public string from_way_note { get; set; }
        public DateTime? from_way_start { get; set; }
        public DateTime? from_way_end { get; set; }
        public int? id_outer_way { get; set; }
        public string name_outer_way_ru { get; set; }
        public string name_outer_way_en { get; set; }
        public DateTime? outer_way_close { get; set; }
        public DateTime? outer_way_delete { get; set; }
        public string outer_way_note { get; set; }
        public DateTime? outer_way_start { get; set; }
        public DateTime? outer_way_end { get; set; }
        public int? from_way_position { get; set; }
        public string from_wim_note { get; set; }
        public DateTime? from_wim_create { get; set; }
        public string from_wim_create_user { get; set; }
        public DateTime? from_wim_close { get; set; }
        public string from_wim_close_user { get; set; }
        public long? from_wim_parent_id { get; set; }
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
        public bool? on_operation_red { get; set; }
        public int? on_operation_id_loading_status { get; set; }
        public string on_operation_locomotive1 { get; set; }
        public string on_operation_locomotive2 { get; set; }
        public string on_operation_note { get; set; }
        public DateTime? on_operation_create { get; set; }
        public string on_operation_create_user { get; set; }
        public DateTime? on_operation_close { get; set; }
        public string on_operation_close_user { get; set; }
        public long? on_operation_parent_id { get; set; }
    }

    public class sostav_send_arrival
    {
        public int id { get; set; }
        public int from_id_operation { get; set; }
        public string from_operation_name_ru { get; set; }
        public string from_operation_name_en { get; set; }
        public DateTime from_operation_start { get; set; }
        public DateTime? from_operation_end { get; set; }
        public DateTime from_operation_create { get; set; }
        public string from_operation_create_user { get; set; }
        public string from_operation_locomotive1 { get; set; }
        public string from_operation_locomotive2 { get; set; }
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
        public int? id_outer_way { get; set; }
        public string name_outer_way_ru { get; set; }
        public string name_outer_way_en { get; set; }
        public DateTime? outer_way_close { get; set; }
        public DateTime? outer_way_delete { get; set; }
        public string outer_way_note { get; set; }
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
        public DateTime? on_way_close { get; set; }
        public DateTime? on_way_delete { get; set; }
        public int? on_id_operation { get; set; }
        public string on_operation_name_ru { get; set; }
        public string on_operation_name_en { get; set; }
        public DateTime? on_operation_start { get; set; }
        public DateTime? on_operation_end { get; set; }
        public DateTime? on_operation_create { get; set; }
        public string on_operation_create_user { get; set; }
        public string on_operation_locomotive1 { get; set; }
        public string on_operation_locomotive2 { get; set; }
        public int count_wagon_send { get; set; }
        public int count_wagon_arrival { get; set; }
        public List<wagon_send_arrival> wagons { get; set; }
    }

    /// <summary>
    /// Класс описание документа по прибытию
    /// </summary>
    public class UZ_DOC_Arrival
    {
        public string num_doc { get; set; }
        public int revision { get; set; }
        public int? status { get; set; }
        public int? num_uz { get; set; }
        public string code_from { get; set; }
        public string code_on { get; set; }
        public DateTime? dt { get; set; }
        public DateTime? close { get; set; }
        public string close_message { get; set; }
    }
    public class UZ_DOC_Sending
    {
        public long id_sostav { get; set; }
        public DateTime? date_outgoing { get; set; }
        public DateTime? date_departure_amkr { get; set; }
        public int status_sostav { get; set; }
        public long? id_car { get; set; }
        public int? num { get; set; }
        public int? position_outgoing { get; set; }
        public string num_doc { get; set; }
        public int? revision { get; set; }
        public int? status { get; set; }
        public string code_from { get; set; }
        public string code_on { get; set; }
        public DateTime? dt { get; set; }
        public int? num_uz { get; set; }
    }

    #region 
    /// <summary>
    /// Класс описание платильщиков по ЭПД прибытию
    /// </summary>
    public class Doc_Pay
    {
        public int code_payer { get; set; }

        public int type_payer { get; set; }
        public string kod { get; set; }

        public long summa { get; set; }
    }
    /// <summary>
    /// Класс описание актов по ЭПД прибытию
    /// </summary>
    public class Doc_Acts
    {
        public DateTime? date_akt { get; set; }
        public DateTime? date_dved { get; set; }
        public string nom_akt { get; set; }
        public int? nom_dved { get; set; }
        public string prichina_akt { get; set; }
        public int? stn_akt { get; set; }
        public string stn_name_akt { get; set; }
        public int? type { get; set; }
        public int? vagon_nom { get; set; }
    }
    /// <summary>
    /// Класс описание документов по ЭПД прибытию
    /// </summary>
    public class Doc_Docs
    {
        public string id_doc { get; set; }
        public string description { get; set; }
        public DateTime? doc_date { get; set; }
        public string doc_type { get; set; }
        public string doc_type_name { get; set; }
        public byte[] doc { get; set; }
    }
    /// <summary>
    /// Класс описания документа по прибытию
    /// </summary>
    public class Arrival_Doc
    {
        public string id_doc { get; set; }
        public string nom_doc { get; set; }
        public string epd_code_from { get; set; }
        public string epd_code_on { get; set; }
        public int? code_stn_from { get; set; }
        public int? code_stn_to { get; set; }
        public int? code_border_checkpoint { get; set; }
        public DateTime? cross_time { get; set; }
        public int? code_shipper { get; set; }
        public int? code_consignee { get; set; }
        public bool? klient { get; set; }
        public string code_payer_sender { get; set; }
        public string code_payer_arrival { get; set; }
        public int? distance_way { get; set; }
        public string note { get; set; }
        public List<Doc_Pay> doc_pays { get; set; }
        public List<Doc_Acts> doc_acts { get; set; }
        public List<Doc_Docs> doc_docs { get; set; }
        public DateTime? date_otpr { get; set; }
        public DateTime? srok_end { get; set; }
        public DateTime? date_grpol { get; set; }
        public DateTime? date_pr { get; set; }
        public DateTime? date_vid { get; set; }
    }
    /// <summary>
    /// Класс описания документа тарифы по контейнерам
    /// </summary>
    public class Doc_Cont_Pay
    {
        public string kod { get; set; } // StringLength(3)
        public long summa { get; set; }
    }
    /// <summary>
    /// Класс описания документа контейнера по прибытию на вагонах
    /// </summary>
    public class Doc_Vagon_Cont
    {
        public string nom_cont { get; set; } //StringLength(11)
        public string kod_tiporazmer { get; set; } //StringLength(4)
        public int? gruzp { get; set; }
        public int? ves_tary_arc { get; set; }
        public int? id_cargo { get; set; }
        public int? id_cargo_gng { get; set; }
        public int? kol_pac { get; set; }
        public string pac { get; set; }
        public int? vesg { get; set; }
        public double? vesg_reweighing { get; set; }
        public string nom_zpu { get; set; } //StringLength(20)
        public List<Doc_Cont_Pay> pays { get; set; }
    }
    /// <summary>
    /// Класс описания документа акты по прибытию на вагон
    /// </summary>
    public class Doc_Vagon_Acts
    {
        public DateTime? date_akt { get; set; }
        public DateTime? date_dved { get; set; }
        public string nom_akt { get; set; }
        public int? nom_dved { get; set; }
        public string prichina_akt { get; set; }
        public int? stn_akt { get; set; }
        public string stn_name_akt { get; set; }
        public int? type { get; set; }
        public int? vagon_nom { get; set; }
    }
    /// <summary>
    /// Класс описания документа тарифа по прибытию на вагонах
    /// </summary>
    public class Doc_Vagon_Pay
    {
        public string kod { get; set; } // StringLength(3)
        public long summa { get; set; }
    }
    /// <summary>
    /// Класс описания документа на вагон по прибытию
    /// </summary>
    public class Arrival_Doc_Vagon
    {
        public int num { get; set; }
        public long id_arrival { get; set; }
        public int id_car { get; set; }
        public int? id_condition { get; set; }
        public int? id_type { get; set; }
        public double? gruzp { get; set; }
        public int? u_tara { get; set; }
        public int? ves_tary_arc { get; set; }
        public bool? route { get; set; }
        public string note_vagon { get; set; } // StringLength(200)
        public int? id_cargo { get; set; }
        public int? id_cargo_gng { get; set; }
        public int? id_certification_data { get; set; }
        public int? id_commercial_condition { get; set; }
        public int? kol_pac { get; set; }
        public string pac { get; set; } // StringLength(3)
        public int? vesg { get; set; }
        public double? vesg_reweighing { get; set; }
        public string nom_zpu { get; set; } // StringLength(20)
        public string danger { get; set; } // StringLength(3)
        public string danger_kod { get; set; } // StringLength(4)
        public bool? cargo_returns { get; set; }
        public int? id_station_on_amkr { get; set; }
        public int? id_division_on_amkr { get; set; }
        public bool? empty_car { get; set; }
        public int? kol_conductor { get; set; }
        public int? id_owner { get; set; }
        public int? id_countrys { get; set; }
        public int? id_genus { get; set; }
        public int? kol_os { get; set; }
        public string usl_tip { get; set; }
        public DateTime? date_rem_uz { get; set; }
        public DateTime? date_rem_vag { get; set; }
        public int? id_type_ownership { get; set; }
        public double? gruzp_uz { get; set; }
        public double? tara_uz { get; set; }
        public string zayava { get; set; } //StringLength(100)
        public int? pay_summa { get; set; }
        public List<Doc_Vagon_Cont> conts { get; set; }
        public List<Doc_Vagon_Pay> pays { get; set; }
        public List<Doc_Vagon_Acts> acts { get; set; }
        public int? id_wagons_rent_arrival { get; set; }
    }
    /// <summary>
    /// Класс набора данных информации по найденым вагонам
    /// </summary>
    public class Manual_Search_Vagon
    {
        public int num { get; set; }
        public int position { get; set; }
        public bool sys_num { get; set; } // соответсвует системной нумерации
        public ArrivalCars car { get; set; }
        public EFIDS.Entities.UZ_DOC new_uz_doc { get; set; }
        public WagonInternalRoutes wir { get; set; }
        public int type_update { get; set; }
    }

    public class ReportBorderCrossing
    {
        public int num { get; set; }
        public int? status { get; set; }
        public DateTime? date_departure_amkr { get; set; } // Отправлен
        public DateTime? cross_time { get; set; }
        public string border_crossing_stn { get; set; }
        public string border_crossing_stn_name { get; set; }
        public string client_kod_on { get; set; }
        public string client_name_on { get; set; }
        public int? vesg { get; set; }
        public string num_doc { get; set; }
        public int? revision { get; set; }
        public int? num_uz { get; set; }
        public int? epd_status { get; set; }
        public DateTime? epd_date_otpr { get; set; }
        public DateTime? epd_date_pr { get; set; }

    }
    /// <summary>
    /// Класс набора данных информации по новым рентам на отправленные вагоны
    /// </summary>
    public class New_Rent_Outgoing
    {
        public long id { get; set; }
        public int num { get; set; }
        public int? id_operator { get; set; }
        public int? id_limiting { get; set; }
        public DateTime? rent_start { get; set; }
        public DateTime? rent_end { get; set; }
        public DateTime? date_outgoing { get; set; }
        public int? parent_id { get; set; }
        public long? id_outgoing_uz_vagon { get; set; }
        public int? new_id { get; set; }
    }

    #endregion

    public class IDS_WIR : IDS_Base
    {
        private eventID eventID = eventID.IDS_IDSWIR;
        private int day_arhive_epd_arrival = 90; // Количество дней хранения ЭПД на сервере УЗ (3 месяца)
        public int Day_arhive_epd_arrival { get { return this.day_arhive_epd_arrival; } set { this.day_arhive_epd_arrival = value; } }
        private int day_arhive_epd_sending = 80; // Количество дней хранения ЭПД на сервере УЗ (3 месяца)
        public int Day_arhive_epd_sending { get { return this.day_arhive_epd_sending; } set { this.day_arhive_epd_sending = value; } }

        private bool searsh_in_sms_arrival = false; // Бит включить поиск в базе даных УЗ
        public bool Searsh_in_sms_arrival { get { return this.searsh_in_sms_arrival; } set { this.searsh_in_sms_arrival = value; } }

        private List<int> list_consignees_searsh_arrival_epd = new List<int>() { 7932, 6302, 659 };
        private List<int> list_stations_searsh_arrival_epd = new List<int>() { 457905, 466904, 466923, 467004, 467108, 467201, 466603, 457708 };
        private int min_period_searsh_arrival_epd = -36;

        private int min_period_preparation_of_epd = 3; // минимальный период допуска по времении для подготовки документов ЭПД (состав отправили а документ могут быть созданы позже)

        private List<int> list_groups_cargo = new List<int>() { 11, 16, 20, 24 }; // Список id групп груза с порожними вагонами

        public IDS_WIR()
            : base()
        {

        }

        public IDS_WIR(service servece_owner)
            : base(servece_owner)
        {

        }

        #region ПРИБЫТИЕ ВАГОНОВ (АРМ ДИСПЕТЧЕРА)
        ////TODO: !!!Удалить старое прибытие
        ///// <summary>
        ///// Принять вагон
        ///// </summary>
        ///// <param name="context"></param>
        ///// <param name="id_station"></param>
        ///// <param name="id_way"></param>
        ///// <param name="date_start"></param>
        ///// <param name="position"></param>
        ///// <param name="wagon"></param>
        ///// <param name="user"></param>
        ///// <returns></returns>
        //public int IncomingWagon(ref EFDbContext context, int id_station, int id_way, DateTime date_start, int position, ArrivalCars wagon, string user)
        //{
        //    try
        //    {
        //        long? parent_id = null;
        //        // Получим последнюю запись по вагону
        //        WagonInternalRoutes last_wir = context.GetLastWagon(wagon.num);
        //        if (last_wir != null)
        //        {
        //            // Запись есть проверим, для этого прибытия была создана запись
        //            if (last_wir.id_arrival_car == wagon.id) return 0; // Строка для вагона уже создана
        //            // Запись не закрыта (!Запись перед созданием должна быть закрыта, вагон выйти из АМКР)
        //            parent_id = last_wir.CloseWagon(date_start, "Закрыта принудительно, вагон зашел с новым составом.", user);
        //            context.Update(last_wir); // Обновим контекст
        //        }
        //        // Определим входящую поставку
        //        List<SAPIncomingSupply> sap_is = wagon.SAPIncomingSupply.ToList();
        //        Arrival_UZ_Vagon vag_doc = wagon.Arrival_UZ_Vagon;

        //        // Создадим новую строкку
        //        WagonInternalRoutes new_wir = new WagonInternalRoutes()
        //        {
        //            id = 0,
        //            num = wagon.num,
        //            id_arrival_car = wagon.id,
        //            id_sap_incoming_supply = sap_is != null && sap_is.Count() > 0 ? (long?)sap_is[0].id : null,
        //            create = DateTime.Now,
        //            create_user = user,
        //            parent_id = parent_id

        //        };
        //        new_wir.SetStationWagon_old(id_station, id_way, date_start, position, null, user);
        //        new_wir.SetOpenOperation(1, date_start, (int)vag_doc.id_condition, vag_doc.vesg > 0 ? 1 : 0, null, null, null, user).SetCloseOperation(date_start, null, user);
        //        context.Insert(new_wir); // Обновим контекст
        //        return 1;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("IncomingWagon(context={0}, id_station={1}, id_way={2}, date_start={3}, position={4}, wagon={5}, user={6})",
        //            context, id_station, id_way, date_start, position, wagon, user), servece_owner, eventID);
        //        return -1;// Возвращаем id=-1 , Ошибка
        //    }
        //}
        ////TODO: !!!Удалить старое прибытие
        ///// <summary>
        ///// Принять вагоны
        ///// </summary>
        ///// <param name="context"></param>
        ///// <param name="id_station"></param>
        ///// <param name="id_way"></param>
        ///// <param name="date_start"></param>
        ///// <param name="wagons"></param>
        ///// <param name="numeration"></param>
        ///// <param name="user"></param>
        ///// <returns></returns>
        //public ResultTransfer IncomingWagons(ref EFDbContext context, int id_station, int id_way, DateTime date_start, List<ArrivalCars> wagons, bool numeration, string user)
        //{
        //    ResultTransfer rt = new ResultTransfer(wagons.Count());
        //    try
        //    {


        //        if (context == null)
        //        {
        //            context = new EFDbContext();
        //        }
        //        int position = context.GetNextPosition(id_way);
        //        foreach (ArrivalCars wagon in numeration ? wagons.OrderByDescending(w => w.position_arrival) : wagons.OrderBy(w => w.position_arrival))
        //        {
        //            int result = IncomingWagon(ref context, id_station, id_way, date_start, position, wagon, user);
        //            rt.SetMovedResult(result, wagon.num);
        //            position++;
        //        }
        //        rt.SetResult(context.SaveChanges());
        //        return rt;

        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("IncomingWagons(context={0}, id_station={1}, id_way={2}, date_start={3}, wagons={4}, numeration={5}, user={6})",
        //            context, id_station, id_way, date_start, wagons, numeration, user), servece_owner, eventID);
        //        rt.SetResult(-1);
        //        return rt;// Возвращаем id=-1 , Ошибка
        //    }
        //}

        //----------------------------------------------------------          
        /// <summary>
        /// Операция удалить состав введенный вручную
        /// </summary>
        /// <param name="id_sostav"></param>
        /// <returns></returns>
        public int DeleteManualArrivalSostav(long id_sostav)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);
                EFArrivalCars ef_arr_car = new EFArrivalCars(context);
                EFSAPIncomingSupply ef_sap_is = new EFSAPIncomingSupply(context);
                ArrivalSostav sostav = ef_arr_sostav.Context.Where(s => s.id == id_sostav).FirstOrDefault();
                if (sostav == null) return (int)errors_base.not_arrival_sostav_db; // В базе данных нет записи состава для оправкиия
                if (sostav.status > 0) return (int)errors_base.error_status_arrival_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                if (sostav.id_arrived != null) return (int)errors_base.error_status_arrival_sostav; // Ошибка статуса состава (Состав введен не руками)
                List<ArrivalCars> list_cars = ef_arr_car.Context.Where(s => s.id_arrival == id_sostav).ToList();
                if (list_cars != null && list_cars.Count > 0)
                {
                    // Если есть вагоны проверим чтобы они небыли приняты
                    List<ArrivalCars> list_adoption_cars = list_cars.Where(c => c.arrival != null).ToList();
                    if (list_adoption_cars != null && list_adoption_cars.Count > 0) return (int)errors_base.arrival_cars_adoption; // Запрет операции вагон(ы) прибывшего состава уже приняты
                }
                // Проверки закончены
                if (list_cars != null && list_cars.Count > 0)
                {
                    // Удалим входящие поставки
                    foreach (ArrivalCars car in list_cars)
                    {

                        List<SAPIncomingSupply> list_del = ef_sap_is.Context.Where(s => s.id_arrival_car == car.id).ToList();
                        ef_sap_is.Delete(list_del.Select(s => s.id).ToList());
                    }
                    ef_arr_car.Delete(list_cars.Select(w => w.id).ToList());
                }
                ef_arr_sostav.Delete(sostav.id);
                return context.SaveChanges();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DeleteManualArrivalSostav(id_sostav={0})", id_sostav), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Обрезать поле для сохранения
        /// </summary>
        /// <param name="field"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public string getSubstringField(string field, int size)
        {
            if (!string.IsNullOrWhiteSpace(field))
            {
                return field.Substring(0, field.Length > size ? size : field.Length).Trim();
            }
            return null;
        }

        #region Arrival_UZ_Document_Pay
        /// <summary>
        /// Метод преобразования в тип Arrival_UZ_Document_Pay
        /// </summary>
        /// <param name="doc_pays"></param>
        /// <returns></returns>
        public List<Arrival_UZ_Document_Pay> CreateArrival_UZ_Document_Pay(List<Doc_Pay> doc_pays)
        {
            try
            {
                List<Arrival_UZ_Document_Pay> list_doc_pays = new List<Arrival_UZ_Document_Pay>();
                foreach (Doc_Pay pay in doc_pays)
                {
                    Arrival_UZ_Document_Pay arr_pay = new Arrival_UZ_Document_Pay()
                    {
                        id = 0,
                        id_document = 0,
                        code_payer = pay.code_payer,
                        type_payer = pay.type_payer,
                        kod = pay.kod,
                        summa = pay.summa
                    };
                    list_doc_pays.Add(arr_pay);
                }
                return list_doc_pays;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateArrival_UZ_Document_Pay(doc_pays={0})",
                    doc_pays), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод обновления информации по Arrival_UZ_Document_Pay (платильщиков) в документе
        /// </summary>
        /// <param name="context"></param>
        /// <param name="arr_uz_doc"></param>
        /// <param name="list_doc_pays"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateArrival_UZ_Document_Pay(ref EFDbContext context, Arrival_UZ_Document arr_uz_doc, List<Arrival_UZ_Document_Pay> list_doc_pays, string user)
        {
            try
            {
                EFArrival_UZ_Document_Pay arr_uz_doc_pay = new EFArrival_UZ_Document_Pay(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Arrival_UZ_Document_Pay по данным документа
                if (list_doc_pays == null) return (int)errors_base.error_update_arr_doc_pay; // Ошибка обновления документов (платильщик на документ) 
                if (arr_uz_doc.id == 0)
                {
                    // Документ только создали, добавим pay
                    foreach (Arrival_UZ_Document_Pay doc_pay in list_doc_pays)
                    {
                        arr_uz_doc.Arrival_UZ_Document_Pay.Add(doc_pay);
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Arrival_UZ_Document_Pay> old_list_doc_pay = arr_uz_doc.Arrival_UZ_Document_Pay.ToList();
                    // Сравнить
                    foreach (Arrival_UZ_Document_Pay doc_pay in list_doc_pays)
                    {
                        Arrival_UZ_Document_Pay exist_doc_pay = arr_uz_doc_pay.Context.Where(p => p.id_document == arr_uz_doc.id && p.code_payer == doc_pay.code_payer && p.kod == doc_pay.kod).FirstOrDefault();
                        if (exist_doc_pay != null)
                        {
                            // есть - обновить
                            exist_doc_pay.summa = doc_pay.summa;
                            arr_uz_doc_pay.Update(exist_doc_pay);
                            old_list_doc_pay.Remove(exist_doc_pay);
                        }
                        else
                        {
                            // нет - добавить
                            arr_uz_doc.Arrival_UZ_Document_Pay.Add(doc_pay);
                        }
                    }
                    // Удалим исключенные платежки
                    arr_uz_doc_pay.Delete(old_list_doc_pay.Select(p => p.id));
                }
                return list_doc_pays.Count();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrival_UZ_Document_Pay(context={0}, arr_uz_doc={1}, list_doc_pays={2}, user={3})",
                    context, arr_uz_doc, list_doc_pays, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        #endregion

        #region Arrival_UZ_Document_Acts
        /// <summary>
        /// Метод преобразования в тип Arrival_UZ_Document_Acts
        /// </summary>
        /// <param name="doc_acts"></param>
        /// <returns></returns>
        public List<Arrival_UZ_Document_Acts> CreateArrival_UZ_Document_Acts(List<Doc_Acts> doc_acts)
        {
            try
            {
                List<Arrival_UZ_Document_Acts> list = new List<Arrival_UZ_Document_Acts>();
                foreach (Doc_Acts obj in doc_acts)
                {
                    Arrival_UZ_Document_Acts arr_act = new Arrival_UZ_Document_Acts()
                    {
                        id = 0,
                        id_document = 0,
                        date_akt = obj.date_akt,
                        date_dved = obj.date_dved,
                        nom_akt = obj.nom_akt,
                        nom_dved = obj.nom_dved,
                        prichina_akt = obj.prichina_akt,
                        stn_akt = obj.stn_akt,
                        stn_name_akt = obj.stn_name_akt,
                        type = obj.type,
                        vagon_nom = obj.vagon_nom,
                    };
                    list.Add(arr_act);
                }
                return list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateArrival_UZ_Document_Acts(doc_acts={0})", doc_acts), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод обновления информации по Arrival_UZ_Document_Acts (акты) в документе
        /// </summary>
        /// <param name="context"></param>
        /// <param name="arr_uz_doc"></param>
        /// <param name="list"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateArrival_UZ_Document_Acts(ref EFDbContext context, Arrival_UZ_Document arr_uz_doc, List<Arrival_UZ_Document_Acts> list, string user)
        {
            try
            {
                EFArrival_UZ_Document_Acts arr_uz_doc_act = new EFArrival_UZ_Document_Acts(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Arrival_UZ_Document_Acts по данным документа
                if (list == null) return (int)errors_base.error_update_arr_doc_act; // Ошибка обновления документов (акты) 
                if (arr_uz_doc.id == 0)
                {
                    // Документ только создали, добавим акты
                    foreach (Arrival_UZ_Document_Acts act in list)
                    {
                        arr_uz_doc.Arrival_UZ_Document_Acts.Add(act);
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Arrival_UZ_Document_Acts> old_list = arr_uz_doc.Arrival_UZ_Document_Acts.ToList();
                    // Сравнить
                    foreach (Arrival_UZ_Document_Acts obj in list)
                    {
                        Arrival_UZ_Document_Acts exist_act = arr_uz_doc_act.Context.Where(p => p.id_document == arr_uz_doc.id && p.nom_akt == obj.nom_akt && p.date_akt == obj.date_akt).FirstOrDefault();
                        if (exist_act != null)
                        {
                            // есть - обновить
                            exist_act.date_dved = obj.date_dved;
                            exist_act.nom_dved = obj.nom_dved;
                            exist_act.prichina_akt = obj.prichina_akt;
                            exist_act.stn_akt = obj.stn_akt;
                            exist_act.stn_name_akt = obj.stn_name_akt;
                            exist_act.type = obj.type;
                            exist_act.vagon_nom = obj.vagon_nom;
                            arr_uz_doc_act.Update(exist_act);
                            old_list.Remove(exist_act);
                        }
                        else
                        {
                            // нет - добавить
                            arr_uz_doc.Arrival_UZ_Document_Acts.Add(obj);
                        }
                    }
                    // Удалим исключенные платежки
                    arr_uz_doc_act.Delete(old_list.Select(p => p.id));
                }
                return list.Count();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrival_UZ_Document_Acts(context={0}, arr_uz_doc={1}, list={2}, user={3})",
                    context, arr_uz_doc, list, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        #endregion

        #region Arrival_UZ_Document_Docs
        /// <summary>
        /// Метод преобразования в тип Arrival_UZ_Document_Docs
        /// </summary>
        /// <param name="doc_docs"></param>
        /// <returns></returns>
        public List<Arrival_UZ_Document_Docs> CreateArrival_UZ_Document_Docs(List<Doc_Docs> doc_docs)
        {
            try
            {
                List<Arrival_UZ_Document_Docs> list = new List<Arrival_UZ_Document_Docs>();
                foreach (Doc_Docs obj in doc_docs)
                {
                    Arrival_UZ_Document_Docs arr_doc = new Arrival_UZ_Document_Docs()
                    {
                        id = 0,
                        id_document = 0,
                        id_doc = obj.id_doc,
                        description = obj.description,
                        doc_date = obj.doc_date,
                        doc_type = obj.doc_type,
                        doc_type_name = obj.doc_type_name,
                        doc = obj.doc,
                    };
                    list.Add(arr_doc);
                }
                return list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateArrival_UZ_Document_Docs(doc_acts={0})", doc_docs), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод обновления информации по Arrival_UZ_Document_Docs (документы) в документе
        /// </summary>
        /// <param name="context"></param>
        /// <param name="arr_uz_doc"></param>
        /// <param name="list"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateArrival_UZ_Document_Docs(ref EFDbContext context, Arrival_UZ_Document arr_uz_doc, List<Arrival_UZ_Document_Docs> list, string user)
        {
            try
            {
                EFArrival_UZ_Document_Docs arr_uz_doc_doc = new EFArrival_UZ_Document_Docs(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Arrival_UZ_Document_Docs по данным документа
                if (list == null) return (int)errors_base.error_update_arr_doc_doc; // Ошибка обновления документов (документы)
                if (arr_uz_doc.id == 0)
                {
                    // Документ только создали, добавим акты
                    foreach (Arrival_UZ_Document_Docs doc in list)
                    {
                        arr_uz_doc.Arrival_UZ_Document_Docs.Add(doc);
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Arrival_UZ_Document_Docs> old_list = arr_uz_doc.Arrival_UZ_Document_Docs.ToList();
                    // Сравнить
                    foreach (Arrival_UZ_Document_Docs obj in list)
                    {
                        Arrival_UZ_Document_Docs exist_doc = arr_uz_doc_doc.Context.Where(p => p.id_document == arr_uz_doc.id && p.id_doc == obj.id_doc && p.doc_date == obj.doc_date).FirstOrDefault();
                        if (exist_doc != null)
                        {
                            // есть - обновить
                            exist_doc.description = obj.description;
                            exist_doc.doc_type = obj.doc_type;
                            exist_doc.doc_type_name = obj.doc_type_name;
                            exist_doc.doc = obj.doc;
                            arr_uz_doc_doc.Update(exist_doc);
                            old_list.Remove(exist_doc);
                        }
                        else
                        {
                            // нет - добавить
                            arr_uz_doc.Arrival_UZ_Document_Docs.Add(obj);
                        }
                    }
                    // Удалим исключенные платежки
                    arr_uz_doc_doc.Delete(old_list.Select(p => p.id));
                }
                return list.Count();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrival_UZ_Document_Docs(context={0}, arr_uz_doc={1}, list={2}, user={3})",
                    context, arr_uz_doc, list, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        #endregion

        #region Arrival_UZ_Document
        /// <summary>
        /// Создать или обновить (update = true) строку документ по прибытию.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="epd"></param>
        /// <param name="arrival_doc"></param>
        /// <param name="parent_id"></param>
        /// <param name="main_num_uz"></param>
        /// <param name="uz_doc_manual"></param>
        /// <param name="update"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultObject UpdateArrival_UZ_Document(ref EFDbContext context, EFIDS.Entities.UZ_DOC epd, int? main_num_uz, Arrival_Doc arrival_doc, long? parent_id, bool uz_doc_manual, bool update, string user)
        {
            ResultObject res = new ResultObject();
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFArrival_UZ_Document ef_arr_uz_doc = new EFArrival_UZ_Document(context);

                Arrival_UZ_Document arr_uz_doc = ef_arr_uz_doc.Context.Where(d => d.id_doc_uz == epd.num_doc).FirstOrDefault(); // Основной
                if (arr_uz_doc == null)
                {
                    // нет создать 
                    arr_uz_doc = new Arrival_UZ_Document()
                    {
                        id = 0,
                        id_doc_uz = epd.num_doc,
                        nom_doc = main_num_uz != null ? epd.num_uz : null,
                        nom_main_doc = main_num_uz != null ? main_num_uz : epd.num_uz,
                        code_stn_from = arrival_doc.code_stn_from,
                        code_stn_to = arrival_doc.code_stn_to,
                        code_border_checkpoint = arrival_doc.code_border_checkpoint,
                        cross_time = arrival_doc.cross_time,
                        code_shipper = arrival_doc.code_shipper,
                        code_consignee = arrival_doc.code_consignee,
                        klient = arrival_doc.klient,
                        code_payer_sender = arrival_doc.code_payer_sender,
                        code_payer_arrival = arrival_doc.code_payer_arrival,
                        distance_way = arrival_doc.distance_way,
                        note = getSubstringField(arrival_doc.note, 200),
                        parent_id = parent_id,
                        create = DateTime.Now,
                        create_user = user,
                        change = null,
                        change_user = null,
                        manual = uz_doc_manual,
                        date_otpr = arrival_doc.date_otpr,
                        srok_end = arrival_doc.srok_end,
                        date_grpol = arrival_doc.date_grpol,
                        date_pr = arrival_doc.date_pr,
                        date_vid = arrival_doc.date_vid,
                    };
                    res.mode = mode_obj.add;
                }
                else
                {
                    // есть обновить если установлен признак
                    if (update)
                    {
                        arr_uz_doc.nom_doc = main_num_uz != null ? epd.num_uz : null;
                        arr_uz_doc.nom_main_doc = main_num_uz != null ? main_num_uz : epd.num_uz;
                        arr_uz_doc.code_stn_from = arrival_doc.code_stn_from;
                        arr_uz_doc.code_stn_to = arrival_doc.code_stn_to;
                        arr_uz_doc.code_border_checkpoint = arrival_doc.code_border_checkpoint;
                        arr_uz_doc.cross_time = arrival_doc.cross_time;
                        arr_uz_doc.code_shipper = arrival_doc.code_shipper;
                        arr_uz_doc.code_consignee = arrival_doc.code_consignee;
                        arr_uz_doc.klient = arrival_doc.klient;
                        arr_uz_doc.code_payer_sender = arrival_doc.code_payer_sender;
                        arr_uz_doc.code_payer_arrival = arrival_doc.code_payer_arrival;
                        arr_uz_doc.distance_way = arrival_doc.distance_way;
                        arr_uz_doc.note = getSubstringField(arrival_doc.note, 200);
                        arr_uz_doc.parent_id = parent_id;
                        arr_uz_doc.change = DateTime.Now;
                        arr_uz_doc.change_user = user;
                        arr_uz_doc.manual = uz_doc_manual;
                        arr_uz_doc.date_otpr = arrival_doc.date_otpr;
                        arr_uz_doc.srok_end = arrival_doc.srok_end;
                        arr_uz_doc.date_grpol = arrival_doc.date_grpol;
                        arr_uz_doc.date_pr = arrival_doc.date_pr;
                        arr_uz_doc.date_vid = arrival_doc.date_vid;
                        res.mode = mode_obj.update;
                    }
                }
                // Обновим платильщика
                int res_upd_pay = UpdateArrival_UZ_Document_Pay(ref context, arr_uz_doc, CreateArrival_UZ_Document_Pay(arrival_doc.doc_pays), user);
                if (res_upd_pay < 0)
                {
                    res.result = res_upd_pay; // Ошибка обновления платильщика
                    return res;
                }
                // Обновим акты
                int res_upd_act = UpdateArrival_UZ_Document_Acts(ref context, arr_uz_doc, CreateArrival_UZ_Document_Acts(arrival_doc.doc_acts), user);
                if (res_upd_act < 0)
                {
                    res.result = res_upd_act; // Ошибка обновления актов
                    return res;
                }
                // Обновим документы
                int res_upd_doc = UpdateArrival_UZ_Document_Docs(ref context, arr_uz_doc, CreateArrival_UZ_Document_Docs(arrival_doc.doc_docs), user);
                if (res_upd_doc < 0)
                {
                    res.result = res_upd_doc; // Ошибка обновления документов
                    return res;
                }
                res.obj = arr_uz_doc;
                return res;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrival_UZ_Document(context={0}, epd={1})", context, epd), servece_owner, eventID);
                res.result = (int)errors_base.global; // Глобальная ошибка
                return res;
            }
        }
        #endregion

        #region Arrival_UZ_Cont_Pay
        /// <summary>
        /// Метод преобразования в тип Arrival_UZ_Cont_Pay
        /// </summary>
        /// <param name="doc_pays"></param>
        /// <returns></returns>
        public List<Arrival_UZ_Cont_Pay> CreateArrival_UZ_Cont_Pay(List<Doc_Cont_Pay> doc_pays)
        {
            try
            {
                List<Arrival_UZ_Cont_Pay> list = new List<Arrival_UZ_Cont_Pay>();
                foreach (Doc_Cont_Pay obj in doc_pays)
                {
                    Arrival_UZ_Cont_Pay doc = new Arrival_UZ_Cont_Pay()
                    {
                        id = 0,
                        id_cont = 0,
                        kod = obj.kod,
                        summa = obj.summa

                    };
                    list.Add(doc);
                }
                return list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateArrival_UZ_Cont_Pay(doc_pays={0})", doc_pays), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод обновления информации по Arrival_UZ_Cont_Pay (платильщиков) в документе на контейнера
        /// </summary>
        /// <param name="context"></param>
        /// <param name="arr_uz_cont"></param>
        /// <param name="list_doc_pays"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateArrival_UZ_Cont_Pay(ref EFDbContext context, Arrival_UZ_Vagon_Cont arr_uz_cont, List<Arrival_UZ_Cont_Pay> list_doc_pays, string user)
        {
            try
            {
                EFArrival_UZ_Cont_Pay ef_cont_pay = new EFArrival_UZ_Cont_Pay(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Arrival_UZ_Document_Pay по данным документа
                if (list_doc_pays == null) return (int)errors_base.error_update_arr_cont_pay; // Ошибка обновления документов (контейнера на вагон) 
                if (arr_uz_cont.id == 0)
                {
                    // Документ только создали, добавим pay
                    foreach (Arrival_UZ_Cont_Pay doc in list_doc_pays)
                    {
                        arr_uz_cont.Arrival_UZ_Cont_Pay.Add(doc);
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Arrival_UZ_Cont_Pay> old_list = arr_uz_cont.Arrival_UZ_Cont_Pay.ToList();
                    // Сравнить
                    foreach (Arrival_UZ_Cont_Pay obj in list_doc_pays)
                    {
                        Arrival_UZ_Cont_Pay exist_doc = ef_cont_pay.Context.Where(p => p.id_cont == arr_uz_cont.id && p.kod == obj.kod).FirstOrDefault();
                        if (exist_doc != null)
                        {
                            // есть - обновить
                            exist_doc.summa = obj.summa;
                            ef_cont_pay.Update(exist_doc);
                            old_list.Remove(exist_doc);
                        }
                        else
                        {
                            // нет - добавить
                            arr_uz_cont.Arrival_UZ_Cont_Pay.Add(obj);
                        }
                    }
                    // Удалим исключенные платежки
                    ef_cont_pay.Delete(old_list.Select(p => p.id));
                }
                return list_doc_pays.Count();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrival_UZ_Cont_Pay(context={0}, arr_uz_cont={1}, list_doc_pays={2}, user={3})",
                    context, arr_uz_cont, list_doc_pays, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        #endregion

        #region Arrival_UZ_Vagon_Cont
        /// <summary>
        /// Метод преобразования в тип Arrival_UZ_Document_Pay
        /// </summary>
        /// <param name="conts"></param>
        /// <returns></returns>
        public List<Arrival_UZ_Vagon_Cont> CreateArrival_UZ_Vagon_Cont(List<Doc_Vagon_Cont> conts)
        {
            try
            {
                List<Arrival_UZ_Vagon_Cont> list = new List<Arrival_UZ_Vagon_Cont>();
                foreach (Doc_Vagon_Cont obj in conts)
                {
                    List<Arrival_UZ_Cont_Pay> list_pay = CreateArrival_UZ_Cont_Pay(obj.pays);
                    Arrival_UZ_Vagon_Cont doc = new Arrival_UZ_Vagon_Cont()
                    {
                        id = 0,
                        id_vagon = 0,
                        nom_cont = obj.nom_cont,
                        kod_tiporazmer = obj.kod_tiporazmer,
                        gruzp = obj.gruzp,
                        ves_tary_arc = obj.ves_tary_arc,
                        id_cargo = obj.id_cargo,
                        id_cargo_gng = obj.id_cargo_gng,
                        kol_pac = obj.kol_pac,
                        pac = obj.pac,
                        vesg = obj.vesg,
                        vesg_reweighing = obj.vesg_reweighing,
                        nom_zpu = obj.nom_zpu,
                        Arrival_UZ_Cont_Pay = list_pay,
                    };
                    list.Add(doc);
                }
                return list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateArrival_UZ_Vagon_Cont(conts={0})", conts), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод обновления информации по Arrival_UZ_Vagon_Cont (контейнера) на вагон
        /// </summary>
        /// <param name="context"></param>
        /// <param name="arr_uz_vag"></param>
        /// <param name="list_cont"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateArrival_UZ_Vagon_Cont(ref EFDbContext context, Arrival_UZ_Vagon arr_uz_vag, List<Arrival_UZ_Vagon_Cont> list_cont, string user)
        {
            try
            {
                EFArrival_UZ_Vagon_Cont ef_arr_cont = new EFArrival_UZ_Vagon_Cont(context);
                EFArrival_UZ_Cont_Pay ef_cont_pay = new EFArrival_UZ_Cont_Pay(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Arrival_UZ_Vagon_Cont по данным документа
                if (list_cont == null) return (int)errors_base.error_update_arr_vag_cont; // Ошибка обновления документов (контейнера) 
                if (arr_uz_vag.id == 0)
                {
                    // Документ только создали, добавим контейнера
                    foreach (Arrival_UZ_Vagon_Cont doc in list_cont)
                    {
                        arr_uz_vag.Arrival_UZ_Vagon_Cont.Add(doc);
                    }
                }
                else
                {
                    // Список существующих контейнеров
                    List<Arrival_UZ_Vagon_Cont> old_list = arr_uz_vag.Arrival_UZ_Vagon_Cont.ToList();
                    // Сравнить
                    foreach (Arrival_UZ_Vagon_Cont obj in list_cont)
                    {
                        Arrival_UZ_Vagon_Cont exist_doc = ef_arr_cont.Context.Where(p => p.id_vagon == arr_uz_vag.id && p.nom_cont == obj.nom_cont).FirstOrDefault();
                        if (exist_doc != null)
                        {
                            // есть - обновить
                            exist_doc.kod_tiporazmer = obj.kod_tiporazmer;
                            exist_doc.gruzp = obj.gruzp;
                            exist_doc.ves_tary_arc = obj.ves_tary_arc;
                            exist_doc.id_cargo = obj.id_cargo;
                            exist_doc.id_cargo_gng = obj.id_cargo_gng;
                            exist_doc.kol_pac = obj.kol_pac;
                            exist_doc.pac = obj.pac;
                            exist_doc.vesg = obj.vesg;
                            exist_doc.vesg_reweighing = obj.vesg_reweighing;
                            exist_doc.nom_zpu = obj.nom_zpu;
                            // Обновим платильщика
                            int res_upd_pay = UpdateArrival_UZ_Cont_Pay(ref context, exist_doc, obj.Arrival_UZ_Cont_Pay.ToList(), user);
                            if (res_upd_pay < 0) return res_upd_pay; // Ошибка обновления платильщика
                            ef_arr_cont.Update(exist_doc);
                            old_list.Remove(exist_doc);
                        }
                        else
                        {
                            // нет - добавить
                            arr_uz_vag.Arrival_UZ_Vagon_Cont.Add(obj);
                        }
                    }
                    // Удалим исключенные платежки и контейнера
                    foreach (Arrival_UZ_Vagon_Cont del in old_list)
                    {
                        ef_cont_pay.Delete(del.Arrival_UZ_Cont_Pay.Select(p => p.id));
                    }
                    ef_arr_cont.Delete(old_list.Select(p => p.id));
                }
                return list_cont.Count();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrival_UZ_Vagon_Cont(context={0}, arr_uz_vag={1}, list_cont={2}, user={3})",
                    context, arr_uz_vag, list_cont, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        #endregion

        #region Arrival_UZ_Vagon_Pay
        /// <summary>
        /// Метод преобразования в тип Arrival_UZ_Vagon_Pay
        /// </summary>
        /// <param name="doc_pays"></param>
        /// <returns></returns>
        public List<Arrival_UZ_Vagon_Pay> CreateArrival_UZ_Vagon_Pay(List<Doc_Vagon_Pay> doc_pays)
        {
            try
            {
                List<Arrival_UZ_Vagon_Pay> list = new List<Arrival_UZ_Vagon_Pay>();
                foreach (Doc_Vagon_Pay obj in doc_pays)
                {
                    Arrival_UZ_Vagon_Pay doc = new Arrival_UZ_Vagon_Pay()
                    {
                        id = 0,
                        id_vagon = 0,
                        kod = obj.kod,
                        summa = obj.summa

                    };
                    list.Add(doc);
                }
                return list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateArrival_UZ_Vagon_Pay(doc_pays={0})", doc_pays), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод обновления информации по Arrival_UZ_Vagon_Pay (платильщиков) в документе на вагон
        /// </summary>
        /// <param name="context"></param>
        /// <param name="arr_uz_vag"></param>
        /// <param name="list"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateArrival_UZ_Vagon_Pay(ref EFDbContext context, Arrival_UZ_Vagon arr_uz_vag, List<Arrival_UZ_Vagon_Pay> list, string user)
        {
            try
            {
                EFArrival_UZ_Vagon_Pay ef_vagon_pay = new EFArrival_UZ_Vagon_Pay(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Arrival_UZ_Document_Pay по данным документа
                if (list == null) return (int)errors_base.error_update_arr_vag_pay; // Ошибка обновления документов (платник на вагон) 
                if (arr_uz_vag.id == 0)
                {
                    // Документ только создали, добавим 
                    foreach (Arrival_UZ_Vagon_Pay obj in list)
                    {
                        arr_uz_vag.Arrival_UZ_Vagon_Pay.Add(obj);
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Arrival_UZ_Vagon_Pay> old_list = arr_uz_vag.Arrival_UZ_Vagon_Pay.ToList();
                    // Сравнить
                    foreach (Arrival_UZ_Vagon_Pay obj in list)
                    {
                        Arrival_UZ_Vagon_Pay exist_doc = ef_vagon_pay.Context.Where(p => p.id_vagon == arr_uz_vag.id && p.kod == obj.kod).FirstOrDefault();
                        if (exist_doc != null)
                        {
                            // есть - обновить
                            exist_doc.summa = obj.summa;
                            ef_vagon_pay.Update(exist_doc);
                            old_list.Remove(exist_doc);
                        }
                        else
                        {
                            // нет - добавить
                            arr_uz_vag.Arrival_UZ_Vagon_Pay.Add(obj);
                        }
                    }
                    // Удалим исключенные платежки
                    ef_vagon_pay.Delete(old_list.Select(p => p.id));
                }
                return list.Count();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrival_UZ_Vagon_Pay(context={0}, arr_uz_vag={1}, list={2}, user={3})",
                    context, arr_uz_vag, list, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        #endregion

        #region Arrival_UZ_Vagon_Acts
        /// <summary>
        /// Метод преобразования в тип Arrival_UZ_Vagon_Acts
        /// </summary>
        /// <param name="doc_acts"></param>
        /// <returns></returns>
        public List<Arrival_UZ_Vagon_Acts> CreateArrival_UZ_Vagon_Acts(List<Doc_Vagon_Acts> doc_acts)
        {
            try
            {
                List<Arrival_UZ_Vagon_Acts> list = new List<Arrival_UZ_Vagon_Acts>();
                foreach (Doc_Vagon_Acts obj in doc_acts)
                {
                    Arrival_UZ_Vagon_Acts doc = new Arrival_UZ_Vagon_Acts()
                    {
                        id = 0,
                        id_vagon = 0,
                        date_akt = obj.date_akt,
                        date_dved = obj.date_dved,
                        nom_akt = obj.nom_akt,
                        nom_dved = obj.nom_dved,
                        prichina_akt = obj.prichina_akt,
                        stn_akt = obj.stn_akt,
                        stn_name_akt = obj.stn_name_akt,
                        type = obj.type,
                        vagon_nom = obj.vagon_nom,

                    };
                    list.Add(doc);
                }
                return list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateArrival_UZ_Vagon_Acts(doc_acts={0})", doc_acts), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод обновления информации по Arrival_UZ_Vagon_Acts (акты на вагоны) в документе на вагон
        /// </summary>
        /// <param name="context"></param>
        /// <param name="arr_uz_vag"></param>
        /// <param name="list"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateArrival_UZ_Vagon_Acts(ref EFDbContext context, Arrival_UZ_Vagon arr_uz_vag, List<Arrival_UZ_Vagon_Acts> list, string user)
        {
            try
            {
                EFArrival_UZ_Vagon_Acts ef_vagon_acts = new EFArrival_UZ_Vagon_Acts(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Arrival_UZ_Document_Pay по данным документа
                if (list == null) return (int)errors_base.error_update_arr_vag_pay; // Ошибка обновления документов (платник на вагон) 
                if (arr_uz_vag.id == 0)
                {
                    // Документ только создали, добавим 
                    foreach (Arrival_UZ_Vagon_Acts obj in list)
                    {
                        arr_uz_vag.Arrival_UZ_Vagon_Acts.Add(obj);
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Arrival_UZ_Vagon_Acts> old_list = arr_uz_vag.Arrival_UZ_Vagon_Acts.ToList();
                    // Сравнить
                    foreach (Arrival_UZ_Vagon_Acts obj in list)
                    {
                        Arrival_UZ_Vagon_Acts exist_act = ef_vagon_acts.Context.Where(p => p.id_vagon == arr_uz_vag.id && p.nom_akt == obj.nom_akt && p.date_akt == obj.date_akt).FirstOrDefault();
                        if (exist_act != null)
                        {
                            // есть - обновить
                            exist_act.date_dved = obj.date_dved;
                            exist_act.nom_dved = obj.nom_dved;
                            exist_act.prichina_akt = obj.prichina_akt;
                            exist_act.stn_akt = obj.stn_akt;
                            exist_act.stn_name_akt = obj.stn_name_akt;
                            exist_act.type = obj.type;
                            exist_act.vagon_nom = obj.vagon_nom;
                            ef_vagon_acts.Update(exist_act);
                            old_list.Remove(exist_act);
                        }
                        else
                        {
                            // нет - добавить
                            arr_uz_vag.Arrival_UZ_Vagon_Acts.Add(obj);
                        }
                    }
                    // Удалим исключенные платежки
                    ef_vagon_acts.Delete(old_list.Select(p => p.id));
                }
                return list.Count();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrival_UZ_Vagon_Acts(context={0}, arr_uz_vag={1}, list={2}, user={3})",
                    context, arr_uz_vag, list, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        #endregion

        #region Arrival_UZ_Vagon
        /// <summary>
        /// Создать или обновить (update = true) строку документ по прибытию вагона.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_document"></param>
        /// <param name="arrival_doc_vag"></param>
        /// <param name="uz_doc_manual"></param>
        /// <param name="update"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultObject UpdateArrival_UZ_Vagon(ref EFDbContext context, long id_document, Arrival_Doc_Vagon arrival_doc_vag, bool uz_doc_manual, bool update, string user)
        {
            ResultObject res = new ResultObject();
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFArrival_UZ_Vagon ef_arr_uz_doc_vag = new EFArrival_UZ_Vagon(context);
                // Проверим документ создан 
                Arrival_UZ_Vagon arr_uz_doc_vag = ef_arr_uz_doc_vag.Context.Where(d => d.id_document == id_document && d.num == arrival_doc_vag.num).FirstOrDefault();
                if (arr_uz_doc_vag == null)
                {
                    // нет создать 
                    arr_uz_doc_vag = new Arrival_UZ_Vagon()
                    {
                        id = 0,
                        id_document = id_document,
                        num = arrival_doc_vag.num,
                        id_arrival = arrival_doc_vag.id_arrival,
                        id_car = arrival_doc_vag.id_car,
                        id_condition = arrival_doc_vag.id_condition,
                        id_type = arrival_doc_vag.id_type,
                        gruzp = arrival_doc_vag.gruzp,
                        u_tara = arrival_doc_vag.u_tara,
                        ves_tary_arc = arrival_doc_vag.ves_tary_arc,
                        route = arrival_doc_vag.route,
                        note_vagon = getSubstringField(arrival_doc_vag.note_vagon, 200),
                        id_cargo = arrival_doc_vag.id_cargo,
                        id_cargo_gng = arrival_doc_vag.id_cargo_gng,
                        id_certification_data = arrival_doc_vag.id_certification_data,
                        id_commercial_condition = arrival_doc_vag.id_commercial_condition,
                        kol_pac = arrival_doc_vag.kol_pac,
                        pac = getSubstringField(arrival_doc_vag.pac, 3),
                        vesg = arrival_doc_vag.vesg,
                        vesg_reweighing = arrival_doc_vag.vesg_reweighing,
                        nom_zpu = getSubstringField(arrival_doc_vag.nom_zpu, 20),
                        danger = getSubstringField(arrival_doc_vag.danger, 3),
                        danger_kod = getSubstringField(arrival_doc_vag.danger_kod, 4),
                        cargo_returns = arrival_doc_vag.cargo_returns,
                        id_station_on_amkr = arrival_doc_vag.id_station_on_amkr,
                        id_division_on_amkr = arrival_doc_vag.id_division_on_amkr,
                        empty_car = arrival_doc_vag.empty_car,
                        kol_conductor = arrival_doc_vag.kol_conductor,
                        date_rem_uz = arrival_doc_vag.date_rem_uz,
                        date_rem_vag = arrival_doc_vag.date_rem_vag,
                        gruzp_uz = arrival_doc_vag.gruzp_uz,
                        id_countrys = arrival_doc_vag.id_countrys,
                        id_genus = arrival_doc_vag.id_genus,
                        id_owner = arrival_doc_vag.id_owner,
                        id_type_ownership = arrival_doc_vag.id_type_ownership,
                        kol_os = arrival_doc_vag.kol_os,
                        manual = uz_doc_manual,
                        pay_summa = arrival_doc_vag.pay_summa,
                        tara_uz = arrival_doc_vag.tara_uz,
                        usl_tip = arrival_doc_vag.usl_tip,
                        zayava = getSubstringField(arrival_doc_vag.zayava, 100),
                        id_wagons_rent_arrival = arrival_doc_vag.id_wagons_rent_arrival,
                        create = DateTime.Now,
                        create_user = user,
                        change = null,
                        change_user = null,
                    };
                    res.mode = mode_obj.add;
                }
                else
                {
                    // есть обновить если установлен признак
                    if (update)
                    {
                        arr_uz_doc_vag.id_arrival = arrival_doc_vag.id_arrival;
                        arr_uz_doc_vag.id_car = arrival_doc_vag.id_car;
                        arr_uz_doc_vag.id_condition = arrival_doc_vag.id_condition;
                        arr_uz_doc_vag.id_type = arrival_doc_vag.id_type;
                        arr_uz_doc_vag.gruzp = arrival_doc_vag.gruzp;
                        arr_uz_doc_vag.u_tara = arrival_doc_vag.u_tara;
                        arr_uz_doc_vag.ves_tary_arc = arrival_doc_vag.ves_tary_arc;
                        arr_uz_doc_vag.route = arrival_doc_vag.route;
                        arr_uz_doc_vag.note_vagon = getSubstringField(arrival_doc_vag.note_vagon, 200);
                        arr_uz_doc_vag.id_cargo = arrival_doc_vag.id_cargo;
                        arr_uz_doc_vag.id_cargo_gng = arrival_doc_vag.id_cargo_gng;
                        arr_uz_doc_vag.id_certification_data = arrival_doc_vag.id_certification_data;
                        arr_uz_doc_vag.id_commercial_condition = arrival_doc_vag.id_commercial_condition;
                        arr_uz_doc_vag.kol_pac = arrival_doc_vag.kol_pac;
                        arr_uz_doc_vag.pac = getSubstringField(arrival_doc_vag.pac, 3);
                        arr_uz_doc_vag.vesg = arrival_doc_vag.vesg;
                        arr_uz_doc_vag.vesg_reweighing = arrival_doc_vag.vesg_reweighing;
                        arr_uz_doc_vag.nom_zpu = getSubstringField(arrival_doc_vag.nom_zpu, 20);
                        arr_uz_doc_vag.danger = getSubstringField(arrival_doc_vag.danger, 3);
                        arr_uz_doc_vag.danger_kod = getSubstringField(arrival_doc_vag.danger_kod, 4);
                        arr_uz_doc_vag.cargo_returns = arrival_doc_vag.cargo_returns;
                        arr_uz_doc_vag.id_station_on_amkr = arrival_doc_vag.id_station_on_amkr;
                        arr_uz_doc_vag.id_division_on_amkr = arrival_doc_vag.id_division_on_amkr;
                        arr_uz_doc_vag.empty_car = arrival_doc_vag.empty_car;
                        arr_uz_doc_vag.kol_conductor = arrival_doc_vag.kol_conductor;
                        arr_uz_doc_vag.date_rem_uz = arrival_doc_vag.date_rem_uz;
                        arr_uz_doc_vag.date_rem_vag = arrival_doc_vag.date_rem_vag;
                        arr_uz_doc_vag.gruzp_uz = arrival_doc_vag.gruzp_uz;
                        arr_uz_doc_vag.id_countrys = arrival_doc_vag.id_countrys;
                        arr_uz_doc_vag.id_genus = arrival_doc_vag.id_genus;
                        arr_uz_doc_vag.id_owner = arrival_doc_vag.id_owner;
                        arr_uz_doc_vag.id_type_ownership = arrival_doc_vag.id_type_ownership;
                        arr_uz_doc_vag.kol_os = arrival_doc_vag.kol_os;
                        arr_uz_doc_vag.manual = uz_doc_manual;
                        arr_uz_doc_vag.tara_uz = arrival_doc_vag.tara_uz;
                        arr_uz_doc_vag.usl_tip = arrival_doc_vag.usl_tip;
                        arr_uz_doc_vag.zayava = getSubstringField(arrival_doc_vag.zayava, 100);
                        arr_uz_doc_vag.id_wagons_rent_arrival = arrival_doc_vag.id_wagons_rent_arrival;
                        arr_uz_doc_vag.change = DateTime.Now;
                        arr_uz_doc_vag.change_user = user;
                        arr_uz_doc_vag.manual = uz_doc_manual;
                        res.mode = mode_obj.update;
                    }
                }
                // Обновим контейнера и платильщиков
                int res_upd_conts = UpdateArrival_UZ_Vagon_Cont(ref context, arr_uz_doc_vag, CreateArrival_UZ_Vagon_Cont(arrival_doc_vag.conts), user);
                if (res_upd_conts < 0)
                {
                    res.result = res_upd_conts; // Ошибка обновления контейнера или платильщиков
                    return res;
                }
                // Обновим платильщиков на вагоны
                int res_upd_pay = UpdateArrival_UZ_Vagon_Pay(ref context, arr_uz_doc_vag, CreateArrival_UZ_Vagon_Pay(arrival_doc_vag.pays), user);
                if (res_upd_pay < 0)
                {
                    res.result = res_upd_pay; // Ошибка обновления платильщиков на вагоны
                    return res;
                }
                // Обновим акты
                int res_upd_act = UpdateArrival_UZ_Vagon_Acts(ref context, arr_uz_doc_vag, CreateArrival_UZ_Vagon_Acts(arrival_doc_vag.acts), user);
                if (res_upd_act < 0)
                {
                    res.result = res_upd_act; // Ошибка обновления актов
                    return res;
                }
                res.obj = arr_uz_doc_vag;
                return res;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrival_UZ_Vagon(context={0}, id_document={1}, arrival_doc_vag={2}, uz_doc_manual={3}, update={5}, user={6})", context, id_document, arrival_doc_vag, uz_doc_manual, update, user), servece_owner, eventID);
                res.result = (int)errors_base.global; // Глобальная ошибка
                return res;
            }
        }
        /// <summary>
        /// Обновить документ вагона по прибытию по справочным данным по вагону (Применять после обновления карточки вагона)  
        /// </summary>
        /// <param name="num"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateArrival_UZ_Vagon_Of_CardWagon(int num, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                // Вагоны
                EFDirectory_Wagons ef_vag = new EFDirectory_Wagons(context);
                EFArrival_UZ_Vagon ef_arr_uz_doc_vag = new EFArrival_UZ_Vagon(context);
                // Получим вагон
                Directory_Wagons wagon = ef_vag.Context.Where(w => w.num == num).FirstOrDefault();
                if (wagon == null) return (int)errors_ids_dir.not_wagon_of_db;// Нет вагона в базе данных
                // Получим основные обновления
                int id_countrys = wagon.id_countrys;
                int id_genus = wagon.id_genus;
                int id_owner = wagon.id_owner;
                double gruzp = wagon.gruzp;
                double? tara = wagon.tara;
                int kol_os = wagon.kol_os;
                string usl_tip = wagon.usl_tip;
                DateTime? date_rem_uz = wagon.date_rem_uz;
                DateTime? date_rem_vag = wagon.date_rem_vag;
                int? id_type_ownership = wagon.id_type_ownership;

                Arrival_UZ_Vagon arr_vag = ef_arr_uz_doc_vag.Context.Where(v => v.num == num && v.create >= wagon.create).OrderByDescending(c => c.id).FirstOrDefault();
                if (arr_vag != null)
                {
                    bool update = false;
                    if (arr_vag.id_countrys == 0 && id_countrys != 0 && arr_vag.id_countrys != id_countrys)
                    {
                        arr_vag.id_countrys = id_countrys;
                        update = true;
                    }
                    if (arr_vag.id_genus == 0 && id_genus != 0 && arr_vag.id_genus != id_genus)
                    {
                        arr_vag.id_genus = id_genus;
                        update = true;
                    }
                    if (arr_vag.id_owner == 0 && id_owner != 0 && arr_vag.id_owner != id_owner)
                    {
                        arr_vag.id_owner = id_owner;
                        update = true;
                    }
                    if (arr_vag.gruzp_uz == null && gruzp != 0 && arr_vag.gruzp_uz != gruzp)
                    {
                        arr_vag.gruzp_uz = gruzp;
                        update = true;
                    }
                    if ((arr_vag.kol_os == null || arr_vag.kol_os == 0) && kol_os != 0 && arr_vag.kol_os != kol_os)
                    {
                        arr_vag.kol_os = kol_os;
                        update = true;
                    }
                    if (arr_vag.date_rem_uz == null && date_rem_uz != null && arr_vag.date_rem_uz != date_rem_uz)
                    {
                        arr_vag.date_rem_uz = date_rem_uz;
                        update = true;
                    }
                    if (arr_vag.date_rem_vag == null && date_rem_vag != null && arr_vag.date_rem_vag != date_rem_vag)
                    {
                        arr_vag.date_rem_vag = date_rem_vag;
                        update = true;
                    }
                    if (arr_vag.id_type_ownership == null && id_type_ownership != null && arr_vag.id_type_ownership != id_type_ownership)
                    {
                        arr_vag.id_type_ownership = id_type_ownership;
                        update = true;
                    }
                    if (update)
                    {
                        arr_vag.change_user = user;
                        arr_vag.change = DateTime.Now;
                        return context.SaveChanges();
                    }
                }
                return 0;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrival_UZ_Vagon_Of_CardWagon(num={0}, user={1})", num, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }

        #endregion

        /// <summary>
        /// Принять вагон на АМКР (перенести в левую часть)
        /// </summary>
        /// <param name="id_arrival_car"></param>
        /// <param name="position"></param>
        /// <param name="date_adoption_act"></param>
        /// <param name="mode"></param>
        /// <param name="arrival_main_doc"></param>
        /// <param name="arrival_doc"></param>
        /// <param name="arrival_vagon_main_doc"></param>
        /// <param name="arrival_vagon_doc"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationIncomingWagon(long id_arrival_car, int position, DateTime? date_adoption_act, int? mode, Arrival_Doc arrival_main_doc, Arrival_Doc arrival_doc, Arrival_Doc_Vagon arrival_vagon_main_doc, Arrival_Doc_Vagon arrival_vagon_doc, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFArrivalCars ef_arr_car = new EFArrivalCars(context);
                EFUZ_DOC ef_uz_doc = new EFUZ_DOC(context);
                EFUZ_DOC_OUT ef_uz_doc_out = new EFUZ_DOC_OUT(context);
                EFArrival_UZ_Document ef_arr_uz_doc = new EFArrival_UZ_Document(context);
                EFArrival_UZ_Vagon ef_arr_uz_doc_vag = new EFArrival_UZ_Vagon(context);
                ArrivalCars car = ef_arr_car.Context.Where(c => c.id == id_arrival_car).FirstOrDefault();
                if (car == null) return (int)errors_base.not_arrival_cars_db;                               // Ошибка, нет записи вагона по прибытию  
                if (car.arrival != null) return (int)errors_base.arrival_cars_arrival;                      // Запрет операции вагон уже принят                

                bool main_uz_doc_manual = false;
                bool uz_doc_manual = false;



                #region ОБНОВИМ EFIDS.Entities.UZ_DOC
                EFIDS.Entities.UZ_DOC epd_main = null;// ЭПД Основного документа
                EFIDS.Entities.UZ_DOC epd = null;// ЭПД досылочного документа
                if (mode == null)
                {
                    main_uz_doc_manual = true;
                    uz_doc_manual = false;
                    // Режим автоматического ручного ЭПД
                    // Определим последний номер и создадим ручной автоматически
                    int auto_num_manual = ef_uz_doc.Database.SqlQuery<int>("select [IDS].[get_last_manual_epd]();").FirstOrDefault();
                    if (auto_num_manual > 0)
                    {
                        string num_doc = "MA:" + auto_num_manual.ToString();
                        epd_main = ef_uz_doc.Context.Where(d => d.num_doc == num_doc).FirstOrDefault();
                        if (epd_main != null) return (int)errors_base.exist_manual_epd;     // Ошибка ЭПД автоматического ручного документа MA:xxxxx - уже существует
                        // Создадим 
                        epd_main = new EFIDS.Entities.UZ_DOC()
                        {
                            num_doc = num_doc,
                            revision = 0,
                            status = 6,
                            num_uz = (auto_num_manual * -1), // сохраняем отрицательный номер что-бы не путать с оригиналами
                            code_from = "0",
                            code_on = "7932",
                            dt = DateTime.Now,
                            xml_doc = null,
                            close = DateTime.Now,
                            close_message = "Документ создан автоматически"
                        };
                        ef_uz_doc.Add(epd_main);
                        car.UZ_DOC = epd_main;
                    }
                    else
                    {
                        return (int)errors_base.not_last_manual_epd; // Ошибка не получен последний номер автоматического ручного документа MA:xxxxx 
                    }

                }
                else
                {
                    if (String.IsNullOrWhiteSpace(arrival_main_doc.nom_doc)) return (int)errors_base.arrival_cars_num_main_doc;   // Запрет по вагону нет документа уз 
                    // Проверка режима
                    switch (mode)
                    {
                        case 0:
                            {
                                // Проверим оригиналы
                                main_uz_doc_manual = false;
                                uz_doc_manual = false;
                                // Определим наличие досылки
                                if (arrival_doc != null && !String.IsNullOrWhiteSpace(arrival_doc.nom_doc))
                                {
                                    //int i_nom_doc = int.Parse(arrival_doc.nom_doc);
                                    epd = ef_uz_doc.Context.Where(d => d.num_doc == arrival_doc.id_doc).FirstOrDefault();
                                    if (epd == null) return (int)errors_base.not_uz_doc_db; // Ошибка в базе данных отсутсвует досылочный ЭПД
                                }
                                // Основной документ
                                //int i_nom_main_doc = int.Parse(arrival_main_doc.nom_doc);
                                epd_main = ef_uz_doc.Context.Where(d => d.num_doc == arrival_main_doc.id_doc).FirstOrDefault();
                                if (epd_main == null) return (int)errors_base.not_main_uz_doc_db; // Ошибка в базе данных отсутсвует основной ЭПД 
                                // Продолжим
                                break;
                            }
                            ;
                        case 1:
                            {
                                // Проверим и создадим ручные но с номерами
                                main_uz_doc_manual = true;
                                uz_doc_manual = true;
                                // Определим наличие досылки
                                if (arrival_doc != null && !String.IsNullOrWhiteSpace(arrival_doc.nom_doc))
                                {
                                    int i_nom_doc = int.Parse(arrival_doc.nom_doc);
                                    epd = ef_uz_doc.Context.Where(d => d.num_uz == i_nom_doc).FirstOrDefault();
                                    // Это оригинальный документ, тогда выходим
                                    if (epd != null && epd.xml_doc != null) return (int)errors_base.exist_not_manual_uz_doc_db; // Ошибка в базе данных указаный ЭПД введен не ручном режиме
                                    if (epd == null)
                                    {
                                        // Создадим 
                                        string num_doc = "MN:" + arrival_doc.nom_doc;
                                        epd = new EFIDS.Entities.UZ_DOC()
                                        {
                                            num_doc = num_doc,
                                            revision = 0,
                                            status = 6,
                                            num_uz = i_nom_doc,
                                            code_from = arrival_doc.epd_code_from,
                                            code_on = arrival_doc.epd_code_on,
                                            dt = DateTime.Now,
                                            xml_doc = null,
                                            // Оставил открытым, вдруг потом зайдет
                                            //close = DateTime.Now,
                                            //close_message = "Документ создан вручную"
                                        };
                                        ef_uz_doc.Add(epd);
                                    }
                                    // досылка уже создана, далее
                                }
                                // Основной документ
                                int i_nom_main_doc = int.Parse(arrival_main_doc.nom_doc);
                                epd_main = ef_uz_doc.Context.Where(d => d.num_uz == i_nom_main_doc).FirstOrDefault();
                                if (epd_main != null && epd_main.xml_doc != null) return (int)errors_base.exist_not_manual_main_uz_doc_db; // Ошибка в базе данных указаный основной ЭПД введен не ручном режиме
                                if (epd_main == null)
                                {
                                    // Создадим 
                                    string num_doc = "MN:" + arrival_main_doc.nom_doc;
                                    epd_main = new EFIDS.Entities.UZ_DOC()
                                    {
                                        num_doc = num_doc,
                                        revision = 0,
                                        status = 6,
                                        num_uz = i_nom_main_doc,
                                        code_from = arrival_main_doc.epd_code_from,
                                        code_on = arrival_main_doc.epd_code_on,
                                        dt = DateTime.Now,
                                        xml_doc = null,
                                        // Оставил открытым, вдруг потом зайдет
                                        //close = DateTime.Now,
                                        //close_message = "Документ создан вручную"
                                    };
                                    ef_uz_doc.Add(epd_main);
                                }
                                // Продолжим
                                break;
                            }
                            ;
                        case 2:
                            {
                                // Основной оригинал, а досылка ручной
                                main_uz_doc_manual = false;
                                uz_doc_manual = true;
                                // Проверим досылку должна быть обязательно (основной проверили ранее)
                                if (arrival_doc == null || String.IsNullOrWhiteSpace(arrival_doc.nom_doc)) return (int)errors_base.arrival_cars_num_doc;   // По вагону неопределен досылочный докумен уз
                                // Определтм основной (автомат)                                                                   // Основной документ
                                //int i_nom_main_doc = int.Parse(arrival_main_doc.nom_doc);
                                epd_main = ef_uz_doc.Context.Where(d => d.num_doc == arrival_main_doc.id_doc).FirstOrDefault();
                                if (epd_main == null) return (int)errors_base.not_main_uz_doc_db; // Ошибка в базе данных отсутсвует основной ЭПД 
                                // определим досылку (ручном)
                                int i_nom_doc = int.Parse(arrival_doc.nom_doc);
                                epd = ef_uz_doc.Context.Where(d => d.num_uz == i_nom_doc).FirstOrDefault();
                                // Это оригинальный документ, тогда выходим
                                if (epd != null && epd.xml_doc != null) return (int)errors_base.exist_not_manual_uz_doc_db; // Ошибка в базе данных указаный ЭПД введен не ручном режиме
                                if (epd == null)
                                {
                                    // Создадим 
                                    string num_doc = "MN:" + arrival_doc.nom_doc;
                                    epd = new EFIDS.Entities.UZ_DOC()
                                    {
                                        num_doc = num_doc,
                                        revision = 0,
                                        status = 6,
                                        num_uz = i_nom_doc,
                                        code_from = arrival_doc.epd_code_from,
                                        code_on = arrival_doc.epd_code_on,
                                        dt = DateTime.Now,
                                        xml_doc = null,
                                        // Оставил открытым, вдруг потом зайдет
                                        //close = DateTime.Now,
                                        //close_message = "Документ создан вручную"
                                    };
                                    ef_uz_doc.Add(epd);
                                }
                                break;
                            }
                            ;
                        case 3:
                            {
                                // Основной ручной, а досылка оригинал
                                main_uz_doc_manual = true;
                                uz_doc_manual = false;
                                // Проверим досылку должна быть обязательно (основной проверили ранее)
                                if (arrival_doc == null || String.IsNullOrWhiteSpace(arrival_doc.nom_doc)) return (int)errors_base.arrival_cars_num_doc;   // По вагону неопределен досылочный докумен уз
                                // Основной документ (ручном)
                                int i_nom_main_doc = int.Parse(arrival_main_doc.nom_doc);
                                epd_main = ef_uz_doc.Context.Where(d => d.num_uz == i_nom_main_doc).FirstOrDefault();
                                if (epd_main != null && epd_main.xml_doc != null) return (int)errors_base.exist_not_manual_main_uz_doc_db; // Ошибка в базе данных указаный основной ЭПД введен не ручном режиме
                                if (epd_main == null)
                                {
                                    // Создадим 
                                    string num_doc = "MN:" + arrival_main_doc.nom_doc;
                                    epd_main = new EFIDS.Entities.UZ_DOC()
                                    {
                                        num_doc = num_doc,
                                        revision = 0,
                                        status = 6,
                                        num_uz = i_nom_main_doc,
                                        code_from = arrival_main_doc.epd_code_from,
                                        code_on = arrival_main_doc.epd_code_on,
                                        dt = DateTime.Now,
                                        xml_doc = null,
                                        // Оставил открытым, вдруг потом зайдет
                                        //close = DateTime.Now,
                                        //close_message = "Документ создан вручную"
                                    };
                                    ef_uz_doc.Add(epd_main);
                                }
                                // определим досылку (атомат)
                                //int i_nom_doc = int.Parse(arrival_doc.nom_doc);
                                epd = ef_uz_doc.Context.Where(d => d.num_doc == arrival_doc.id_doc).FirstOrDefault();
                                if (epd == null) return (int)errors_base.not_uz_doc_db; // Ошибка в базе данных отсутсвует досылочный ЭПД
                                break;
                            }
                            ;
                        case 4:
                            {
                                // Основной ручной, а досылка оригинал
                                main_uz_doc_manual = true;
                                uz_doc_manual = false;
                                if (arrival_main_doc == null || String.IsNullOrWhiteSpace(arrival_main_doc.nom_doc)) return (int)errors_base.arrival_cars_num_main_doc;   // По вагону неопределен основной документ
                                // Проверим наличие физическое наличие документа
                                epd_main = ef_uz_doc.Context.Where(d => d.num_doc == arrival_main_doc.id_doc).FirstOrDefault();
                                if (epd_main == null)
                                {
                                    // Такого документа не существует
                                    if (arrival_main_doc.id_doc != null)
                                    {
                                        // Документ существует переносим
                                        UZ_DOC_OUT exist_uz_doc_out = ef_uz_doc_out.Context.Where(d => d.num_doc == arrival_main_doc.id_doc).FirstOrDefault();
                                        if (exist_uz_doc_out == null) return (int)errors_base.not_uz_doc_out_db; // В базе данных нет записи документа ЭПД по отправке
                                        epd_main = new EFIDS.Entities.UZ_DOC()
                                        {
                                            num_doc = exist_uz_doc_out.num_doc,
                                            revision = exist_uz_doc_out.revision,
                                            status = exist_uz_doc_out.status,
                                            num_uz = exist_uz_doc_out.num_uz,
                                            code_from = exist_uz_doc_out.code_from,
                                            code_on = exist_uz_doc_out.code_on,
                                            dt = exist_uz_doc_out.dt,
                                            xml_doc = exist_uz_doc_out.xml_doc,
                                            close = DateTime.Now,
                                            close_message = "Возврат с УЗ"
                                        };
                                    }
                                    else
                                    {
                                        // Документ отсутсвует сосздадим ручной
                                        string num_doc = "MN:" + arrival_main_doc.nom_doc;
                                        int i_nom_main_doc = int.Parse(arrival_main_doc.nom_doc);
                                        epd_main = new EFIDS.Entities.UZ_DOC()
                                        {
                                            num_doc = num_doc,
                                            revision = 0,
                                            status = 6,
                                            num_uz = i_nom_main_doc,
                                            code_from = arrival_main_doc.epd_code_from,
                                            code_on = arrival_main_doc.epd_code_on,
                                            dt = DateTime.Now,
                                            xml_doc = null,
                                            close = DateTime.Now,
                                            close_message = "Возврат с УЗ"
                                        };
                                    }
                                    ef_uz_doc.Add(epd_main);

                                }
                                break;
                            }
                            ;
                    }
                    ;
                }
                ;
                // Привяжем к ArrivalCars правильную ссылку EFIDS.Entities.UZ_DOC
                // Если нет ссылки на документ или ссылка не равна выбранному документу по № накладной переопределим ссылку на документ
                if (car.num_doc == null || (car.num_doc != null && epd == null && car.num_doc != epd_main.num_doc) || (car.num_doc != null && epd != null && car.num_doc != epd.num_doc))
                {
                    car.UZ_DOC = epd == null ? epd_main : epd; // если есть дасылка тогда привяжем досылку (через досылку будет ссылка на основной) иначе основной
                }
                #endregion

                #region ОБНОВИМ SAPIncomingSupply
                IDS_SAP ids_sap = new IDS_SAP(this.servece_owner);
                IDS_Directory ids_dir = new IDS_Directory(this.servece_owner);
                Directory_BorderCheckpoint dir_border_checkpoint = null;
                if (arrival_main_doc.code_border_checkpoint != null)
                {
                    dir_border_checkpoint = ids_dir.GetDirectory_BorderCheckpoint((int)arrival_main_doc.code_border_checkpoint, null, false, user);
                }
                SAPIncomingSupply sap_is = ids_sap.GetSAPIncomingSupply(ref context, id_arrival_car, car.num, epd_main.num_uz.ToString(), epd_main.dt, dir_border_checkpoint != null ? dir_border_checkpoint.code.ToString() : null, dir_border_checkpoint != null ? dir_border_checkpoint.station_name_ru : null, arrival_main_doc.cross_time, true, user);

                #endregion

                if (epd_main == null) return (int)errors_base.not_main_uz_doc_db; // Ошибка в базе данных отсутсвует досылочный ЭПД



                #region ОБНОВИМ Arrival_UZ_Document, Arrival_UZ_Vagon ОСНОВНОГО И ДОСЫЛОЧНОГО ДОКУМЕНТА
                // --------------------------------------------------------------------------------------
                // Получим основой документ существующий  или создадим новый (обновление отключено)
                ResultObject res_arr_main_uz_doc = UpdateArrival_UZ_Document(ref context, epd_main, null, arrival_main_doc, null, main_uz_doc_manual, false, user);
                if (res_arr_main_uz_doc.result < 0 || res_arr_main_uz_doc.obj == null) return res_arr_main_uz_doc.result; // Была ошибка вернем код
                Arrival_UZ_Document arr_main_uz_doc = (Arrival_UZ_Document)res_arr_main_uz_doc.obj;

                ResultObject res_arr_main_uz_doc_vag = UpdateArrival_UZ_Vagon(ref context, arr_main_uz_doc.id, arrival_vagon_main_doc, main_uz_doc_manual, false, user);
                if (res_arr_main_uz_doc_vag.result < 0 || res_arr_main_uz_doc_vag.obj == null) return res_arr_main_uz_doc_vag.result; // Была ошибка вернем код
                Arrival_UZ_Vagon arr_main_uz_doc_vag = (Arrival_UZ_Vagon)res_arr_main_uz_doc_vag.obj;
                // Добавим основной вагон если стоит add (Обновлять не будем - стоит update=false)
                if (res_arr_main_uz_doc_vag.mode == mode_obj.add)
                {
                    arr_main_uz_doc.Arrival_UZ_Vagon.Add(arr_main_uz_doc_vag);
                }
                // Досылка --------------------------------------------------------------------------------
                Arrival_UZ_Document arr_uz_doc = null;
                Arrival_UZ_Vagon arr_uz_doc_vag = null;
                // проверим есть досылка
                if (epd != null)
                {
                    ResultObject res_arr_uz_doc = UpdateArrival_UZ_Document(ref context, epd, epd_main.num_uz, arrival_doc, (arr_main_uz_doc.id > 0 ? arr_main_uz_doc.id : (long?)null), uz_doc_manual, false, user);
                    if (res_arr_uz_doc.result < 0 || res_arr_uz_doc.obj == null) return res_arr_uz_doc.result; // Была ошибка вернем код
                    arr_uz_doc = (Arrival_UZ_Document)res_arr_uz_doc.obj;
                    // Если основной документ только создан, тогда добавим ссылку
                    if (arr_main_uz_doc.id == 0)
                    {
                        arr_uz_doc.Arrival_UZ_Document2 = arr_main_uz_doc;
                    }
                    ;
                    ResultObject res_arr_uz_doc_vag = UpdateArrival_UZ_Vagon(ref context, arr_uz_doc.id, arrival_vagon_doc, uz_doc_manual, false, user);
                    if (res_arr_uz_doc_vag.result < 0 || res_arr_uz_doc_vag.obj == null) return res_arr_uz_doc_vag.result; // Была ошибка вернем код
                    arr_uz_doc_vag = (Arrival_UZ_Vagon)res_arr_uz_doc_vag.obj;
                    // Добавим вагон если стоит add (Обновлять не будем - стоит update=false)
                    if (res_arr_uz_doc_vag.mode == mode_obj.add)
                    {
                        arr_uz_doc.Arrival_UZ_Vagon.Add(arr_uz_doc_vag);
                    }

                }

                #endregion

                // Добавим основной документ
                if (arr_main_uz_doc != null && arr_main_uz_doc.id == 0)
                {
                    ef_arr_uz_doc.Add(arr_main_uz_doc);
                }
                // Добавим досылочный документ
                if (arr_uz_doc != null && arr_uz_doc.id == 0)
                {
                    ef_arr_uz_doc.Add(arr_uz_doc);
                }
                // Обновим информацию по ArrivalCars
                car.position_arrival = position;
                car.date_adoption_act = date_adoption_act;
                car.arrival = DateTime.Now;
                car.arrival_user = user;
                car.change = DateTime.Now;
                car.change_user = user;
                car.Arrival_UZ_Vagon = arr_uz_doc_vag != null ? arr_uz_doc_vag : arr_main_uz_doc_vag;
                if (car.SAPIncomingSupply.Count() == 0)
                {
                    car.SAPIncomingSupply.Add(sap_is);
                }
                if (car.ArrivalSostav.status == 0)
                {
                    car.ArrivalSostav.status = 1;
                }
                ef_arr_car.Update(car);

                int result = context.SaveChanges();
                return result;
            }

            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationIncomingWagon(id_arrival_car={0}, user={1})", id_arrival_car, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Отменить принятие вагона на АМКР (вернуть из левой в правую часть)
        /// </summary>
        /// <param name="id_arrival_car"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationReturnIncomingWagon(long id_arrival_car, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFUZ_DOC ef_uz_doc = new EFUZ_DOC(context);
                EFArrivalCars ef_arr_car = new EFArrivalCars(context);
                EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);
                EFArrival_UZ_Document ef_arr_uz_doc = new EFArrival_UZ_Document(context);
                EFArrival_UZ_Document_Pay ef_arr_uz_doc_pay = new EFArrival_UZ_Document_Pay(context);
                EFArrival_UZ_Document_Docs ef_arr_uz_doc_doc = new EFArrival_UZ_Document_Docs(context);
                EFArrival_UZ_Document_Acts ef_arr_uz_doc_act = new EFArrival_UZ_Document_Acts(context);

                EFArrival_UZ_Vagon ef_arr_uz_vag = new EFArrival_UZ_Vagon(context);
                EFArrival_UZ_Cont_Pay ef_arr_uz_vag_cont_pay = new EFArrival_UZ_Cont_Pay(context);
                EFArrival_UZ_Vagon_Cont ef_arr_uz_vag_cont = new EFArrival_UZ_Vagon_Cont(context);
                EFArrival_UZ_Vagon_Acts ef_arr_uz_vag_act = new EFArrival_UZ_Vagon_Acts(context);
                EFArrival_UZ_Vagon_Pay ef_arr_uz_vag_pay = new EFArrival_UZ_Vagon_Pay(context);

                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);

                ArrivalCars car = ef_arr_car.Context.Where(c => c.id == id_arrival_car).FirstOrDefault();
                if (car == null) return (int)errors_base.not_arrival_cars_db;                               // Ошибка, нет записи вагона по прибытию  
                if (car.ArrivalSostav.status != 1) return (int)errors_base.error_status_arrival_sostav;     // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                                                                                                            // Проверим наличие созданного внутреннего перемещения
                WagonInternalRoutes wir = ef_wir.Context.Where(w => w.id_arrival_car == id_arrival_car).FirstOrDefault();
                if (wir != null) return (int)errors_base.arrival_cars_wir; // Записи по WagonInternalRoutes - уже имеет ссылку на прибытие (Состав уже принят)
                // Удалим информацию по документам
                // Проверим запись на вагон
                Arrival_UZ_Vagon arr_uz_vag = ef_arr_uz_vag.Context.Where(v => v.id == car.id_arrival_uz_vagon).FirstOrDefault();
                if (arr_uz_vag != null)
                {
                    // Удалим информацию по контейнерам
                    List<Arrival_UZ_Vagon_Cont> list = ef_arr_uz_vag_cont.Context.Where(c => c.id_vagon == arr_uz_vag.id).ToList();
                    foreach (Arrival_UZ_Vagon_Cont cont in list)
                    {
                        List<Arrival_UZ_Cont_Pay> list_cont_pay = ef_arr_uz_vag_cont_pay.Context.Where(c => c.id_cont == cont.id).ToList();
                        ef_arr_uz_vag_cont_pay.Delete(list_cont_pay.Select(n => n.id).ToList()); // Удалим pay по контейнерам
                    }
                    ef_arr_uz_vag_cont.Delete(list.Select(n => n.id).ToList()); // удалим контейнера
                    // Удалим Акты
                    List<Arrival_UZ_Vagon_Acts> list_act = ef_arr_uz_vag_act.Context.Where(a => a.id_vagon == arr_uz_vag.id).ToList();
                    ef_arr_uz_vag_act.Delete(list_act.Select(n => n.id).ToList()); // удалим акты
                    // Удалим pay
                    List<Arrival_UZ_Vagon_Pay> list_pay = ef_arr_uz_vag_pay.Context.Where(p => p.id_vagon == arr_uz_vag.id).ToList();
                    ef_arr_uz_vag_pay.Delete(list_pay.Select(n => n.id).ToList()); // удалим акты
                    // Обработаем документ
                    Arrival_UZ_Document arr_uz_doc = ef_arr_uz_doc.Context.Where(d => d.id == arr_uz_vag.id_document).FirstOrDefault();
                    if (arr_uz_doc != null)
                    {
                        // Проверка количества вагонов в документе если = 1 или меньше удалить документ и Pay документа
                        // если это последний вагон?
                        if (arr_uz_doc.Arrival_UZ_Vagon.Count() <= 1)
                        {
                            arr_uz_doc.Arrival_UZ_Vagon.Clear();
                            // Тогда удалим документ
                            // Удалим pay по документу
                            List<Arrival_UZ_Document_Pay> list_doc_pay = ef_arr_uz_doc_pay.Context.Where(c => c.id_document == arr_uz_doc.id).ToList();
                            ef_arr_uz_doc_pay.Delete(list_doc_pay.Select(n => n.id).ToList());
                            // Удалим Акты по документу
                            List<Arrival_UZ_Document_Acts> list_doc_act = ef_arr_uz_doc_act.Context.Where(a => a.id_document == arr_uz_doc.id).ToList();
                            ef_arr_uz_doc_act.Delete(list_doc_act.Select(n => n.id).ToList()); // удалим акты
                            // Удалим документы по документу
                            List<Arrival_UZ_Document_Docs> list_doc_doc = ef_arr_uz_doc_doc.Context.Where(a => a.id_document == arr_uz_doc.id).ToList();
                            ef_arr_uz_doc_doc.Delete(list_doc_doc.Select(n => n.id).ToList()); // удалим акты
                            // Удалим сам документ
                            ef_arr_uz_doc.Delete(arr_uz_doc.id);
                            // Если докуменит был создан в ручную убрать на него сылку, а если нет привязок документ удалить
                            if (car.UZ_DOC != null && (car.UZ_DOC.xml_doc == null || arr_uz_vag.cargo_returns == true))
                            {
                                EFIDS.Entities.UZ_DOC epd = ef_uz_doc.Context.Where(d => d.num_uz == car.UZ_DOC.num_uz).FirstOrDefault();
                                car.UZ_DOC = null;
                                if (epd.ArrivalCars.Count() <= 1)
                                {
                                    ef_uz_doc.Delete(epd.num_doc);
                                }
                                ;
                            }
                        }
                        else
                        {
                            arr_uz_doc.Arrival_UZ_Vagon.Remove(arr_uz_vag);
                        }
                    }
                    // Если вагон возвратный тогда удалим сылку на документ
                    if (arr_uz_vag.cargo_returns == true && car.UZ_DOC != null)
                    {
                        car.UZ_DOC = null;
                    }
                    // Удалим сам документ на вагон
                    ef_arr_uz_vag.Delete(arr_uz_vag.id);
                }
                // Обновим информацию о вагоне
                car.id_arrival_uz_vagon = null;
                car.position_arrival = null;
                car.date_adoption_act = null;
                car.note = null;
                car.arrival = null;
                car.arrival_user = null;
                car.change = DateTime.Now;
                car.change_user = user;
                // Если докуменит был создан в ручную убрать на него сылку
                if (car.UZ_DOC != null && car.UZ_DOC.xml_doc == null)
                {
                    car.UZ_DOC = null;
                }
                // Состав
                ArrivalSostav sostav = ef_arr_sostav.Context.Where(s => s.id == car.id_arrival).FirstOrDefault();
                //int count_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList().Count();
                if (sostav != null && sostav.ArrivalCars.Where(c => c.position_arrival != null).ToList().Count == 0)
                {
                    car.ArrivalSostav.status = 0;
                }
                car.ArrivalSostav.change = DateTime.Now;
                car.ArrivalSostav.change_user = user;
                ef_arr_car.Update(car);// Обновим  вагон
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationReturnIncomingWagon(id_arrival_car={0}, user={1})", id_arrival_car, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Принять состав на АМКР (перенести все вагоны состава на станцию АМКР АРМ)
        /// </summary>
        /// <param name="id_arrival_sostav"></param>
        /// <param name="num_doc"></param>
        /// <param name="train"></param>
        /// <param name="composition_index"></param>
        /// <param name="date_arrival"></param>
        /// <param name="date_adoption"></param>
        /// <param name="date_adoption_act"></param>
        /// <param name="id_station_from"></param>
        /// <param name="id_station_on"></param>
        /// <param name="id_way"></param>
        /// <param name="numeration"></param>
        /// <param name="count"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationIncomingSostav(long id_arrival_sostav, int num_doc, int train, string composition_index, DateTime date_arrival,
            DateTime date_adoption, DateTime? date_adoption_act, int id_station_from, int id_station_on, int id_way, bool? numeration,
            int count, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFUZ_DOC ef_uz_doc = new EFUZ_DOC(context);
                EFArrivalCars ef_arr_car = new EFArrivalCars(context);
                EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);
                EFArrival_UZ_Vagon ef_arr_uz_vag = new EFArrival_UZ_Vagon(context);
                EFSAPIncomingSupply ef_sap = new EFSAPIncomingSupply(context);
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);


                ArrivalSostav sostav = ef_arr_sostav.Context.Where(d => d.id == id_arrival_sostav).FirstOrDefault();
                if (sostav == null) return (int)errors_base.not_arrival_sostav_db; // В базе данных нет записи состава для оправки
                if (sostav.date_adoption != null) return (int)errors_base.arrival_cars_arrival; // Запрет операции вагон уже принят
                if (sostav.ArrivalCars.Count() == 0) return (int)errors_base.not_arrival_cars_db; // Ошибка, нет записи вагона по прибытию 
                List<ArrivalCars> list_car = sostav.ArrivalCars.Where(c => c.position_arrival != null).ToList();
                if (list_car == null || list_car.Count() == 0) return (int)errors_base.not_arrival_cars_db; // Ошибка, нет записи вагона по прибытию
                long? parent_id = null;
                int position = context.GetNextPosition(id_way);
                foreach (ArrivalCars car in numeration == true ? list_car.OrderByDescending(w => w.position_arrival) : list_car.OrderBy(w => w.position_arrival))
                {
                    Arrival_UZ_Vagon arr_vag_doc = ef_arr_uz_vag.Context.Where(d => d.id == car.id_arrival_uz_vagon).FirstOrDefault();
                    if (arr_vag_doc == null) return (int)errors_base.not_inp_uz_vag_db; // В базе данных нет записи документа на вагон.
                    WagonInternalRoutes last_wir = context.GetLastWagon(car.num);
                    // Проверим детально запись внутреннего перемещения
                    if (last_wir != null)
                    {
                        if (last_wir.id_arrival_car == car.id) return (int)errors_base.arrival_cars_wir;    // Записи по WagonInternalRoutes - уже имеет ссылку на прибытие (Состав уже принят)
                        //if (last_wir.id_arrival_car == car.id && last_wir.close != null) return (int)errors_base.open_wir;                      // Записи по WagonInternalRoutes - открыта
                        parent_id = last_wir.id;
                    }

                    SAPIncomingSupply sap_is = ef_sap.Context.Where(c => c.id_arrival_car == car.id && c.num == car.num).FirstOrDefault();

                    // Создадим строку внутреннего перемещения
                    WagonInternalRoutes new_wir = new WagonInternalRoutes()
                    {
                        id = 0,
                        num = car.num,
                        id_arrival_car = car.id,
                        id_sap_incoming_supply = sap_is != null ? (long?)sap_is.id : null,
                        create = DateTime.Now,
                        create_user = user,
                        parent_id = parent_id

                    };
                    new_wir.SetStationWagon_old(id_station_on, id_way, date_arrival, position, null, user);
                    new_wir.SetOpenOperation(1, date_arrival, (int)arr_vag_doc.id_condition, arr_vag_doc.vesg > 0 ? 1 : 0, null, null, null, user).SetCloseOperation(date_arrival, null, user);
                    ef_wir.Add(new_wir);
                    position++;
                }

                // Обновим информацию о составе
                sostav.num_doc = num_doc;
                sostav.train = train;
                sostav.composition_index = composition_index;
                sostav.date_arrival = date_arrival;
                sostav.date_adoption = date_adoption;
                sostav.date_adoption_act = date_adoption_act;
                sostav.id_station_from = id_station_from;
                sostav.id_station_on = id_station_on;
                sostav.id_way = id_way;
                sostav.numeration = numeration;
                sostav.count = count;
                sostav.status = 2;
                //sostav.note = note;
                sostav.change = DateTime.Now;
                sostav.change_user = user;
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationIncomingSostav(id_arrival_sostav={0}, user={1})", id_arrival_sostav, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Отменить принять состав на АМКР (Убрать вагоны со станции АМКР - если по ним небыло операций дислокация и.т.д.)
        /// </summary>
        /// <param name="id_arrival_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationCancelIncomingSostav(long id_arrival_sostav, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFUZ_DOC ef_uz_doc = new EFUZ_DOC(context);
                EFArrivalCars ef_arr_car = new EFArrivalCars(context);
                EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);
                EFArrival_UZ_Vagon ef_arr_uz_vag = new EFArrival_UZ_Vagon(context);
                EFSAPIncomingSupply ef_sap = new EFSAPIncomingSupply(context);
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                EFWagonInternalOperation ef_wio = new EFWagonInternalOperation(context);
                EFWagonInternalMovement ef_wim = new EFWagonInternalMovement(context);

                ArrivalSostav sostav = ef_arr_sostav.Context.Where(d => d.id == id_arrival_sostav).FirstOrDefault();
                if (sostav == null) return (int)errors_base.not_arrival_sostav_db; // В базе данных нет записи состава для оправки
                if (sostav.date_adoption == null) return (int)errors_base.not_arrival_cars_arrival; // Запрет операции вагон еще не принят
                if (sostav.ArrivalCars.Count() == 0) return (int)errors_base.not_arrival_cars_db; // Ошибка, нет записи вагонов по прибытию 
                List<ArrivalCars> list_car = sostav.ArrivalCars.Where(c => c.arrival != null).ToList();
                if (list_car == null || list_car.Count() == 0) return (int)errors_base.not_arrival_cars_db; // Ошибка, нет записи вагона по прибытию
                foreach (ArrivalCars car in list_car.OrderBy(w => w.position_arrival))
                {
                    Arrival_UZ_Vagon arr_vag_doc = ef_arr_uz_vag.Context.Where(d => d.id == car.id_arrival_uz_vagon).FirstOrDefault();
                    if (arr_vag_doc == null) return (int)errors_base.not_inp_uz_vag_db; // В базе данных нет записи документа на вагон.

                    WagonInternalRoutes wir = ef_wir.Context.Where(w => w.id_arrival_car == car.id).FirstOrDefault();
                    if (wir == null) return (int)errors_base.not_wir_db; // В базе данных нет записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                    WagonInternalRoutes wir_next = ef_wir.Context.Where(w => w.parent_id == wir.id).FirstOrDefault();
                    if (wir_next != null) return (int)errors_base.close_wir; // Записи по WagonInternalRoutes - закрыта есть следущее внутреннее перемещение
                    List<WagonInternalOperation> list_wio = ef_wio.Context.Where(w => w.id_wagon_internal_routes == wir.id).ToList();
                    if (list_wio.Count() > 1) return (int)errors_base.not_arrival_operation; // Операция вагона текущая операция вагона не "Прибытие с УЗ"
                    if (list_wio[0].id_operation != 1) return (int)errors_base.not_arrival_operation; // Операция вагона текущая операция вагона не "Прибытие с УЗ"
                    // Все проверки закончены, удаляем
                    List<WagonInternalMovement> list_wim = ef_wim.Context.Where(w => w.id_wagon_internal_routes == wir.id).ToList();
                    //
                    ef_wio.Delete(list_wio.Select(w => w.id).ToList());
                    ef_wim.Delete(list_wim.Select(w => w.id).ToList());
                    ef_wir.Delete(wir.id);
                }
                // Обновим информацию о составе
                sostav.num_doc = null;
                sostav.date_adoption = null;
                sostav.date_adoption_act = null;
                sostav.id_station_on = null;
                sostav.id_way = null;
                sostav.numeration = null;
                sostav.status = 1;
                sostav.change = DateTime.Now;
                sostav.change_user = user;
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationCancelIncomingSostav(id_arrival_sostav={0}, user={1})", id_arrival_sostav, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Метод поиска информации по вагонам введенным вручную 
        /// </summary>
        /// <param name="id_arrival_sostav"></param>
        /// <param name="check"></param>
        /// <param name="num_cars"></param>
        /// <param name="as_client"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultObject OperationManualSearchArrivalWagon(long id_arrival_sostav, bool check, List<int> num_cars, string num_doc, bool as_client, string user)
        {
            ResultObject res = new ResultObject();
            try
            {
                List<Manual_Search_Vagon> list_msv = new List<Manual_Search_Vagon>();

                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFUZ_DOC ef_uz_doc = new EFUZ_DOC(context);
                EFArrivalCars ef_arr_car = new EFArrivalCars(context);
                EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                IDS_Directory ids_dir = new IDS_Directory(this.servece_owner);

                if (num_cars == null || num_cars.Count() == 0)
                {
                    res.result = (int)errors_base.not_input_list_wagons; // Ошибка, нет списка вагонов
                    return res;
                }
                ArrivalSostav sostav = ef_arr_sostav.Context.Where(d => d.id == id_arrival_sostav).FirstOrDefault();
                List<ArrivalCars> list_car_exist = sostav.ArrivalCars.ToList();

                if (sostav == null)
                {
                    res.result = (int)errors_base.not_arrival_sostav_db; // В базе данных нет записи состава для прибытия
                    return res;
                }
                if (sostav.date_adoption != null && sostav.status > 1)
                {
                    res.result = (int)errors_base.error_status_arrival_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию -принят)
                    return res;
                }
                DateTime curr_date = sostav.date_arrival;
                DateTime start_date = sostav.date_arrival.AddDays(-2);
                DateTime stop_date = sostav.date_arrival.AddDays(2);

                List<ArrivalCars> period_car = new List<ArrivalCars>();

                period_car = ef_arr_car.Context.Where(c => c.create >= start_date && c.create <= stop_date).ToList();
                int position = 0;
                foreach (int num in num_cars)
                {
                    position++;
                    int type_update = 0;
                    bool sys_num = ids_dir.IsCorrectNumCar(num);

                    EFIDS.Entities.UZ_DOC new_uz_doc = null;
                    if (string.IsNullOrWhiteSpace(num_doc))
                    {
                        ResultObject res_epd = OperationUpdateUZ_DOC(num, sostav.date_arrival, true, as_client);
                        new_uz_doc = res_epd != null && res_epd.obj != null ? ((EFIDS.Entities.UZ_DOC)res_epd.obj).GetUZ_DOC() : null;
                    }
                    else
                    {

                        new_uz_doc = ef_uz_doc.Context.Where(d => d.num_doc == num_doc).FirstOrDefault();
                    }
                    // Ищим вагон в текущем составе
                    ArrivalCars car = list_car_exist.Where(c => c.num == num).FirstOrDefault();
                    if (car != null && car.arrival == null && car.ArrivalSostav.status < 2)
                    {
                        // Вагон есть не принят и состав не закрыт обновим документ
                        type_update = 1; // Только обновить ЭПД

                    }
                    else
                    {
                        // 
                        if (car != null)
                        {
                            // Вагон есть, но или принят или закрыт состав 
                            type_update = 7; // Запрет 
                        }
                        else
                        {
                            // Вагона нет в текущем составе, ищем за указаный период
                            car = period_car.Where(c => c.num == num).OrderByDescending(d => d.create).FirstOrDefault();
                            if (car != null)
                            {
                                bool b_out_car = true;
                                // Проверим отправку
                                WagonInternalRoutes wir_car = car.WagonInternalRoutes.OrderByDescending(w => w.id).FirstOrDefault();
                                if (wir_car != null)
                                {
                                    OutgoingCars out_car = wir_car.OutgoingCars;
                                    if (out_car != null)
                                    {
                                        OutgoingSostav out_sost = out_car.OutgoingSostav;
                                        if (out_sost != null)
                                        {
                                            if (out_sost.date_departure_amkr != null)
                                            {
                                                b_out_car = false;
                                            }
                                        }
                                    }
                                }
                                if (car.arrival != null && car.ArrivalSostav.status == 2 && b_out_car)
                                {
                                    type_update = 5; // Состав и вагон принят, запрет
                                }
                                else
                                {
                                    if (car.ArrivalSostav.status == 1)
                                    {
                                        if (car.arrival != null)
                                        {
                                            // Состав в работе вагон принят
                                            type_update = 4; // Состав в работе вагон принят, запрет
                                        }
                                        else
                                        {
                                            // Состав в работе вагон не принят принят
                                            type_update = 3; // Состав в работе вагон не принят, выбор
                                        }
                                    }
                                    else
                                    {
                                        if (car.ArrivalSostav.status != 2 && car.ArrivalSostav.status != 1)
                                        {
                                            if (car.arrival != null)
                                            {
                                                type_update = 5; // Состав и вагон принят, запрет
                                            }
                                            else
                                            {
                                                // Вагон свободен для переноса
                                                type_update = 2; // Состав не обработан или отклонен вагон можно переносить                                        
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    WagonInternalRoutes wir = ef_wir.Context.Where(w => w.num == num && w.close == null).FirstOrDefault();
                    type_update = wir != null ? 6 : type_update; // Запрет есть незакрыто внутреннее перемещение
                    Manual_Search_Vagon msv = new Manual_Search_Vagon()
                    {
                        num = num,
                        position = position,
                        sys_num = sys_num,
                        car = car != null ? car.GetArrivalCars_ArrivalSostav() : null,
                        new_uz_doc = new_uz_doc.GetUZ_DOC(),
                        wir = wir.GetWagonInternalRoutes(),
                        type_update = type_update,
                    };
                    list_msv.Add(msv);
                }
                res.result = list_msv.Count();
                res.obj = list_msv;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationManualSearchArrivalWagon(id_arrival_sostav={0}, check={1}, num_cars={2}, as_client={3}, user={4})", id_arrival_sostav, check, num_cars, as_client, user), servece_owner, eventID);
                res.result = (int)errors_base.global; // Глобальная ошибка
            }
            return res;
        }
        /// <summary>
        /// Добавить вагоны введенные вручную
        /// </summary>
        /// <param name="id_arrival_sostav"></param>
        /// <param name="num_cars"></param>
        /// <param name="num_doc"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationManualAddArrivalWagon(long id_arrival_sostav, List<int> num_cars, string num_doc, string user)
        {
            try
            {
                List<Manual_Search_Vagon> list_msv;

                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFUZ_DOC ef_uz_doc = new EFUZ_DOC(context);
                EFArrivalCars ef_arr_car = new EFArrivalCars(context);
                EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                IDS_Directory ids_dir = new IDS_Directory(this.servece_owner);
                ResultObject res;
                int res_upd = 0;
                res = OperationManualSearchArrivalWagon(id_arrival_sostav, true, num_cars, num_doc, false, user);
                if (res.obj != null)
                {
                    list_msv = (List<Manual_Search_Vagon>)res.obj;
                    ArrivalSostav sostav = ef_arr_sostav.Context.Where(d => d.id == id_arrival_sostav).FirstOrDefault();

                    if (sostav == null) return (int)errors_base.not_arrival_sostav_db; // В базе данных нет записи состава для прибытия
                    if (sostav.status > 1) return (int)errors_base.error_status_arrival_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)                                                                                      // 
                    int position = sostav.ArrivalCars.Count() > 1 ? sostav.ArrivalCars.Count() + 1 : 1;
                    foreach (Manual_Search_Vagon sv in list_msv)
                    {
                        if (sv.type_update > 3) return (int)errors_base.error_status_arrival_sostav; // Статус состава не позволяет сделать эту операцию
                        if (sv.type_update == 0)
                        {
                            // создадим прибытие
                            ArrivalCars arr_car = new ArrivalCars()
                            {
                                id = 0,
                                id_arrival = id_arrival_sostav,
                                num = sv.num,
                                position = position,
                                position_arrival = null,
                                consignee = sv.new_uz_doc != null && sv.new_uz_doc.code_on != null ? int.Parse(sv.new_uz_doc.code_on) : 0,
                                num_doc = sv.new_uz_doc != null ? sv.new_uz_doc.num_doc : null,
                                id_transfer = null,
                                note = "Добавлен (ручной режим)",
                                date_adoption_act = null,
                                arrival = null,
                                arrival_user = null,
                                create = DateTime.Now,
                                create_user = user,
                            };
                            ef_arr_car.Add(arr_car);
                            sostav.ArrivalCars.Add(arr_car);
                            position++;
                        }
                        else
                        {
                            // перенести 
                            ArrivalCars arr_car = ef_arr_car.Context.Where(c => c.id == sv.car.id).FirstOrDefault();
                            if (arr_car == null) return (int)errors_base.not_arrival_cars_db; // Ошибка, нет записи вагона по прибытию 

                            if (sv.type_update == 1)
                            {
                                // обновим документ
                                arr_car.num_doc = sv.new_uz_doc != null ? sv.new_uz_doc.num_doc : arr_car.num_doc;
                                arr_car.note = "Обновили ЭПД (ручной режим)";
                            }
                            else
                            {
                                // Перенос вагона
                                arr_car.id_transfer = sv.car.id_arrival;
                                arr_car.id_arrival = id_arrival_sostav;
                                arr_car.position = position;
                                arr_car.note = "Перенесен (ручной режим)";
                                arr_car.num_doc = sv.new_uz_doc != null ? sv.new_uz_doc.num_doc : arr_car.num_doc;

                            }
                            arr_car.change = DateTime.Now;
                            arr_car.change_user = user;
                            ef_arr_car.Update(arr_car);
                            position++;
                        }

                    }
                    res_upd = context.SaveChanges();
                }
                return res_upd;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationManualAddArrivalWagon(id_arrival_sostav={0}, num_cars={1},  user={2})", id_arrival_sostav, num_cars, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }

        }
        /// <summary>
        /// Метод обновления документов по прибытию зашедших первый раз по которым обновили информацию (Род.. Адм.. ) 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateID UpdateArrival_UZ_Documents(string user)
        {
            ResultUpdateID result = new ResultUpdateID(0);
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                //IDS_Directory ids_dir = new IDS_Directory(this.servece_owner);

                EFDbContext context = new EFDbContext();
                EFArrival_UZ_Vagon ef_arr_uz_doc_vag = new EFArrival_UZ_Vagon(context);
                EFDirectory_Wagons ef_vag = new EFDirectory_Wagons(context);
                List<Arrival_UZ_Vagon> list_arr_uz_doc_vag = ef_arr_uz_doc_vag.Context.Where(v => v.id_genus == 0 || v.id_countrys == 0 && v.num > 20000000).ToList();
                //list_arr_uz_doc_vag = list_arr_uz_doc_vag.Where(v => v.num == 77259539).ToList();
                //List<Arrival_UZ_Vagon> list_arr_uz_doc_vag = ef_arr_uz_doc_vag.Context.Where(v => v.num == 61298329).ToList();
                result.count = list_arr_uz_doc_vag.Count();
                foreach (Arrival_UZ_Vagon vag in list_arr_uz_doc_vag)
                {
                    if (vag.num.IsCorrectNumCar())
                    {
                        Directory_Wagons dir_wag = ef_vag.Context.Where(d => d.num == vag.num).FirstOrDefault();
                        if (dir_wag != null)
                        {
                            TimeSpan deff = vag.create - dir_wag.create;
                            // Получим бит привышения времени 6 дней от содания справочника и входа вагона(исключим изменения владельца, даты ремонта.. по старым записям захода вагона)
                            bool old_time = deff.TotalHours > 24 * 6;
                            //if (deff.TotalHours <= 24 * 6)
                            //{
                            // записи находятся в диапазоне
                            // Получим основные обновления
                            int id_countrys = dir_wag.id_countrys;
                            int id_genus = dir_wag.id_genus;
                            int id_owner = dir_wag.id_owner;
                            double gruzp = dir_wag.gruzp;
                            double? tara = dir_wag.tara;
                            int kol_os = dir_wag.kol_os;
                            string usl_tip = dir_wag.usl_tip;
                            DateTime? date_rem_uz = dir_wag.date_rem_uz;
                            DateTime? date_rem_vag = dir_wag.date_rem_vag;
                            int? id_type_ownership = dir_wag.id_type_ownership;
                            // проверим изменения и обновим
                            bool update = false;
                            if ((vag.id_countrys == 0 || vag.id_countrys == null) && id_countrys != 0)
                            {
                                vag.id_countrys = id_countrys;
                                update = true;
                            }
                            if ((vag.id_genus == 0 || vag.id_genus == null) && id_genus != 0)
                            {
                                vag.id_genus = id_genus;
                                update = true;
                            }
                            if (!old_time && (vag.id_owner == 0 || vag.id_owner == null) && id_owner != 0)
                            {
                                vag.id_owner = id_owner;
                                update = true;
                            }
                            if (!old_time && vag.gruzp_uz == null && gruzp != 0)
                            {
                                vag.gruzp_uz = gruzp;
                                update = true;
                            }
                            if ((vag.kol_os == null || vag.kol_os == 0) && kol_os != 0)
                            {
                                vag.kol_os = kol_os;
                                update = true;
                            }
                            if (!old_time && vag.date_rem_uz == null && date_rem_uz != null)
                            {
                                vag.date_rem_uz = date_rem_uz;
                                update = true;
                            }
                            if (!old_time && vag.date_rem_vag == null && date_rem_vag != null)
                            {
                                vag.date_rem_vag = date_rem_vag;
                                update = true;
                            }
                            if (!old_time && vag.id_type_ownership == null && id_type_ownership != null)
                            {
                                vag.id_type_ownership = id_type_ownership;
                                update = true;
                            }
                            if (update)
                            {
                                vag.change_user = user;
                                vag.change = DateTime.Now;
                                ef_arr_uz_doc_vag.Update(vag);
                                result.SetUpdateResult(1, vag.id);
                                //int context.SaveChanges();
                            }
                            else
                            {
                                // Пропустить
                                result.SetUpdateResult(0, vag.id);
                            }
                            //}
                            //else
                            //{
                            //    // Пропустить
                            //    result.SetUpdateResult(0, vag.id);
                            //}
                        }
                        else
                        {
                            // Пропустить
                            result.SetUpdateResult(0, vag.id);
                        }
                    }
                    else
                    {
                        // Пропустить
                        result.SetCloseResult(1, vag.id);
                    }

                }
                // Обновим в базе
                if (result.count > 0 && result.update > 0)
                {
                    // Если без ошибок, тогда записываем результат применения 
                    result.SetResult(context.SaveChanges());
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrival_UZ_Documents(user={0})", user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;// Ошибка
            }
        }
        //public int OperationUpdateEPDIncomingWagon(long id_arrival_car, string user)
        //{
        //    try
        //    {
        //        bool add = true;
        //        bool search_sms = true;

        //        //Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }
        //        IDS_Directory ids_dir = new IDS_Directory(servece_owner);
        //        EFDbContext context = new EFDbContext();
        //        UZ.UZ_Convert convert = new UZ.UZ_Convert();
        //        EFArrivalCars ef_arr_car = new EFArrivalCars(context);
        //        EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);
        //        EFArrival_UZ_Vagon ef_arr_uz_vag = new EFArrival_UZ_Vagon(context);
        //        EFArrival_UZ_Document ef_arr_uz_doc = new EFArrival_UZ_Document(context);

        //        EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
        //        EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
        //        EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);

        //        EFDirectory_Cargo ef_dir_cargo = new EFDirectory_Cargo(context);

        //        ArrivalCars car = ef_arr_car.Context.Where(c => c.id == id_arrival_car).FirstOrDefault();
        //        if (car == null) return (int)errors_base.not_arrival_cars_db;   // Ошибка, нет записи вагона по прибытию  
        //        if (car.arrival == null) return (int)errors_base.not_arrival_cars_arrival;  // Запрет операции вагон еще не принят  
        //        ArrivalSostav arr_sostav = ef_arr_sostav.Context.Where(c => c.id == car.id_arrival).FirstOrDefault();
        //        if (arr_sostav == null) return (int)errors_base.not_arrival_sostav_db;  // В базе данных нет записи состава для оправки

        //        Arrival_UZ_Vagon arr_uz_vag = ef_arr_uz_vag.Context.Where(c => c.id == car.id_arrival_uz_vagon).FirstOrDefault();
        //        if (arr_uz_vag == null) return (int)errors_base.not_inp_uz_vag_db;  // В базе данных нет записи состава для оправки
        //        Arrival_UZ_Document arr_uz_doc = ef_arr_uz_doc.Context.Where(c => c.id == arr_uz_vag.id_document).FirstOrDefault();


        //        WagonInternalRoutes wir = ef_wir.Context.Where(c => c.id_arrival_car == car.id).FirstOrDefault();
        //        if (wir == null) return (int)errors_base.not_wir_db;    //В базе данных нет записи по WagonInternalRoutes(Внутреннее перемещение вагонов)
        //        WagonInternalRoutes wir_old = ef_wir.Context.Where(c => c.id == wir.parent_id).FirstOrDefault();
        //        DateTime? dt_old_outgoing = null;
        //        if (wir_old != null)
        //        {
        //            OutgoingCars out_car = ef_out_car.Context.Where(c => c.id == wir_old.id_outgoing_car).FirstOrDefault();
        //            if (out_car != null)
        //            {
        //                OutgoingSostav out_sostav = ef_out_sostav.Context.Where(c => c.id == out_car.id_outgoing).FirstOrDefault();
        //                if (out_sostav != null)
        //                {
        //                    dt_old_outgoing = out_sostav.date_outgoing;
        //                }
        //            }
        //        }

        //        DateTime dt_adoption = (DateTime)arr_sostav.date_adoption;

        //        ResultObject result = OperationUpdateUZ_DOC(car.num, this.list_consignees_searsh_arrival_epd, this.list_stations_searsh_arrival_epd, dt_old_outgoing, dt_adoption, this.min_period_searsh_arrival_epd, add, search_sms);

        //        if (result.result < 0) return (int)errors_base.not_inp_uz_vag_db; // Ошибка определения или сохранения ЭПД 

        //        EFIDS.Entities.UZ_DOC uz_doc = (EFIDS.Entities.UZ_DOC)result.obj;

        //        if (car.num_doc == uz_doc.num_doc) return 0; // Не обновлять

        //        //DateTime? date_departure_amkr = null;
        //        //int? status = null;
        //        DateTime? cross_time = null;
        //        string border_crossing_stn = null;
        //        string border_crossing_stn_name = null;
        //        string client_kod_on = null;
        //        string client_name_on = null;
        //        int? vesg = null;
        //        DateTime? epd_date_otpr = null;
        //        DateTime? epd_date_pr = null;
        //        //int? epd_status = null;
        //        //string num_doc = null;
        //        //int? revision = null;
        //        //int? num_uz = null;
        //        string stn_from = null;
        //        string name_from = null;
        //        string stn_to = null;
        //        string name_to = null;
        //        string send_kod_plat = null;
        //        string send_name_plat = null;
        //        string arr_kod_plat = null;
        //        string arr_name_plat = null;
        //        List<Doc_Pay> list_doc_pays = new List<Doc_Pay>();
        //        List<Doc_Acts> list_doc_acts = new List<Doc_Acts>();
        //        List<Doc_Docs> list_doc_docs = new List<Doc_Docs>();

        //        double? gruzp = null;
        //        int? u_tara = null;
        //        int? ves_tary_arc = null;
        //        int? kol_pac = null;
        //        string pac = null;
        //        string nom_zpu = null;
        //        string danger = null;
        //        string danger_kod = null;
        //        string zayava = null;
        //        int? pay_summa = null;

        //        Directory_Cargo dir_cargo = null;
        //        List<Doc_Vagon_Cont> list_conts = new List<Doc_Vagon_Cont>();
        //        List<Doc_Vagon_Pay> list_pays = new List<Doc_Vagon_Pay>();
        //        List<Doc_Vagon_Acts> list_acts = new List<Doc_Vagon_Acts>();

        //        UZ.OTPR otpr = convert.XMLToOTPR(uz_doc.xml_doc);
        //        if (otpr == null) return -1;

        //        epd_date_otpr = otpr.date_otpr;
        //        epd_date_pr = otpr.date_pr;
        //        // Погран переход
        //        if (otpr.route != null && otpr.route.Count() > 0)
        //        {
        //            ROUTE route = otpr.route[otpr.route.Count() - 1];
        //            // Данные по умолчанию
        //            stn_from = route.stn_from;
        //            name_from = route.name_from;
        //            stn_to = route.stn_to;
        //            name_to = route.name_to;
        //            if (route != null && route.joint != null && route.joint.Count() > 0)
        //            {


        //                foreach (JOINT jn in route.joint)
        //                {
        //                    if (jn.admin == 22)
        //                    {
        //                        cross_time = jn.cross_time;
        //                        border_crossing_stn = jn.stn;
        //                        border_crossing_stn_name = jn.stn_name;
        //                    }
        //                }
        //            }
        //        }
        //        // Грузополучатель
        //        if (otpr.client != null && otpr.client.Count() > 0)
        //        {
        //            foreach (CLIENT cl in otpr.client)
        //            {
        //                if (cl.type == "2")
        //                {
        //                    client_kod_on = cl.kod;
        //                    client_name_on = cl.name;
        //                }
        //            }
        //        }
        //        //
        //        if (otpr.pl != null && otpr.pl.Count() > 0)
        //        {
        //            //--
        //            for (int i = 0; i < otpr.pl.Count(); i++)
        //            {
        //                if (otpr.pl[i].pay != null && otpr.pl[i].pay.Count() > 0)
        //                {
        //                    for (int p = 0; p < otpr.pl[i].pay.Count(); p++)
        //                    {
        //                        Doc_Pay dp = new Doc_Pay()
        //                        {
        //                            code_payer = (otpr.pl[i].kod_plat != null ? int.Parse(otpr.pl[i].kod_plat) : 0),
        //                            type_payer = (otpr.pl[i].type != null ? int.Parse(otpr.pl[i].type) : 0),
        //                            kod = otpr.pl[i].pay[p].kod,
        //                            summa = (otpr.pl[i].pay[p].summa != null ? (long)otpr.pl[i].pay[p].summa : 0),
        //                        };
        //                        list_doc_pays.Add(dp);
        //                    }
        //                }
        //            }
        //            //--


        //            PL pl = null;
        //            if (otpr.pl.Count() == 1)
        //            {
        //                // если плательщик один тогда берем его
        //                pl = otpr.pl[0];
        //                send_kod_plat = pl.kod_plat;
        //                send_name_plat = pl.name_plat;
        //            }
        //            else
        //            {
        //                // если плательщиков много тогда берем только УЗ или только отправителя type=0
        //                for (var i = 0; i < otpr.pl.Count(); i++)
        //                {
        //                    if (otpr.pl[i].carrier_kod == 22 || otpr.pl[i].type == "0")
        //                    {
        //                        pl = otpr.pl[i];
        //                        send_kod_plat = pl.kod_plat;
        //                        send_name_plat = pl.name_plat;
        //                    }
        //                    if (otpr.pl[i].carrier_kod == 22 || otpr.pl[i].type == "1")
        //                    {
        //                        pl = otpr.pl[i];
        //                        arr_kod_plat = pl.kod_plat;
        //                        arr_name_plat = pl.name_plat;
        //                    }
        //                }
        //            }
        //        }

        //        if (otpr.acts != null && otpr.acts.Count() > 0)
        //        {
        //            for (int i = 0; i < otpr.acts.Count(); i++)
        //            {
        //                var act = otpr.acts[i];
        //                if (act.vagon_nom == null)
        //                {
        //                    Doc_Acts da = new Doc_Acts()
        //                    {
        //                        date_akt = act.date_akt,
        //                        date_dved = act.date_akt,
        //                        prichina_akt = act.prichina_akt,
        //                        stn_akt = act.stn_akt != null ? (int?)int.Parse(act.stn_akt) : null,
        //                        stn_name_akt = act.stn_name_akt,
        //                        type = act.type != null ? (int?)int.Parse(act.type) : null,
        //                        vagon_nom = null
        //                    };
        //                    list_doc_acts.Add(da);
        //                }
        //                else
        //                {
        //                    Doc_Vagon_Acts dva = new Doc_Vagon_Acts()
        //                    {
        //                        date_akt = act.date_akt,
        //                        date_dved = act.date_akt,
        //                        nom_akt = act.nom_akt,
        //                        nom_dved = act.nom_dved,
        //                        prichina_akt = act.prichina_akt,
        //                        stn_akt = act.stn_akt != null ? (int?)int.Parse(act.stn_akt) : null,
        //                        stn_name_akt = act.stn_name_akt,
        //                        type = act.type != null ? (int?)int.Parse(act.type) : null,
        //                        vagon_nom = car.num
        //                    };
        //                    list_acts.Add(dva);
        //                }
        //            }
        //        }

        //        if (otpr.sender_doc != null && otpr.sender_doc.Count() > 0)
        //        {
        //            for (int i = 0; i < otpr.sender_doc.Count(); i++)
        //            {
        //                var doc = otpr.sender_doc[i];
        //                Doc_Docs dd = new Doc_Docs()
        //                {
        //                    id_doc = doc.id != null ? doc.id.ToString() : null,
        //                    description = doc.description,
        //                    doc_date = doc.doc_date,
        //                    doc_type = doc.doc_type,
        //                    doc_type_name = doc.doc_type_name,
        //                    doc = null, //TODO: !Сдесь должен сохранится документ                        
        //                };
        //                list_doc_docs.Add(dd);
        //            }
        //        }
        //        // груз
        //        if (otpr.vagon != null && otpr.vagon.Count() > 0)
        //        {
        //            VAGON vagon = otpr.vagon.ToList().Where(w => w.nomer == car.num.ToString()).FirstOrDefault();
        //            if (vagon != null)
        //            {
        //                gruzp = vagon.gruzp;
        //                u_tara = vagon.u_tara;
        //                ves_tary_arc = vagon.ves_tary_arc;
        //                //
        //                if (vagon.zpu_v != null && vagon.zpu_v.Count() > 0)
        //                {
        //                    nom_zpu = vagon.zpu_v[0].nom_zpu;
        //                }
        //                //
        //                if (vagon.collect_v != null && vagon.collect_v.Count() > 0)
        //                {
        //                    vesg = vagon.collect_v[0].vesg;
        //                    kol_pac = vagon.collect_v[0].kol_pac;
        //                    pac = vagon.collect_v[0].pac;
        //                    int? kod_etsng = vagon.collect_v[0].kod_etsng != null ? (int?)int.Parse(vagon.collect_v[0].kod_etsng) : null;
        //                    string name_etsng = vagon.collect_v[0].name_etsng;
        //                    danger = vagon.collect_v[0].danger; // класс опасности
        //                    danger_kod = vagon.collect_v[0].danger_kod; // код опасности
        //                    Directory_CargoETSNG dir_cargo_etsng = ids_dir.GetDirectory_CargoETSNG(ref context, (int)kod_etsng, name_etsng, true, user);
        //                    dir_cargo = ef_dir_cargo.Context.Where(c => c.id_cargo_etsng == dir_cargo_etsng.id).FirstOrDefault();
        //                    if (dir_cargo == null) return (int)errors_base.not_dir_cargo_of_db;   // В базе данных нет записи указаного груза
        //                }

        //                // Раздел VAGON/PAY_V
        //                if (vagon.pay_v != null && vagon.pay_v.Count() > 0)
        //                {
        //                    //Тариф при выдачи
        //                    pay_summa = 0;
        //                    for (int i = 0; i < vagon.pay_v.Count(); i++)
        //                    {
        //                        if (vagon.pay_v[i].kod == "001" || vagon.pay_v[i].kod == "021")
        //                        {
        //                            pay_summa += vagon.pay_v[i].summa != null ? vagon.pay_v[i].summa : 0;
        //                        }
        //                    }
        //                };

        //                if (vagon.nomer != null && vagon.pay_v != null && vagon.pay_v.Count() > 0)
        //                {
        //                    for (int p = 0; p < vagon.pay_v.Count(); p++)
        //                    {
        //                        PAY_V pay = vagon.pay_v[p];
        //                        Doc_Vagon_Pay dvp = new Doc_Vagon_Pay()
        //                        {
        //                            kod = pay.kod,
        //                            summa = pay.summa != null ? (long)pay.summa : 0,
        //                        };
        //                        list_pays.Add(dvp);
        //                    }
        //                }
        //            }
        //        }
        //        if (otpr.cont != null && otpr.cont.Count() > 0)
        //        {
        //            list_conts.Clear();
        //            CONT[] conts = otpr.cont.Where(c => c.nom_vag == car.num).ToArray();
        //            if (conts != null)
        //            {
        //                for (int i = 0; i < conts.Count(); i++)
        //                {
        //                    CONT cont = conts[i];
        //                    COLLECT_K collect = cont.collect_k != null ? cont.collect_k : null;
        //                    ZPU_K zpu = cont.zpu_k != null && cont.zpu_k.Count() > 0 ? cont.zpu_k[0] : null;
        //                    PAY_K[] pay = cont.pay_k != null && cont.pay_k.Count() > 0 ? cont.pay_k : new PAY_K[0];
        //                    List<Doc_Cont_Pay> pays = new List<Doc_Cont_Pay>();
        //                    for (int p = 0; p < pay.Count(); p++)
        //                    {
        //                        Doc_Cont_Pay dcp = new Doc_Cont_Pay()
        //                        {
        //                            kod = pay[p].kod,
        //                            summa = pay[p].summa != null ? (long)pay[p].summa : 0
        //                        };
        //                        pays.Add(dcp);
        //                    }

        //                    Doc_Vagon_Cont dvc = new Doc_Vagon_Cont()
        //                    {
        //                        nom_cont = cont.nom_cont,
        //                        kod_tiporazmer = cont.kod_tiporazmer,
        //                        gruzp = cont.gruzp,
        //                        ves_tary_arc = cont.ves_tary_arc,
        //                        id_cargo = null,
        //                        id_cargo_gng = null,
        //                        kol_pac = collect != null ? collect.kol_pac : null,
        //                        pac = collect != null ? collect.pac : null,
        //                        vesg = collect != null ? collect.vesg : null,
        //                        vesg_reweighing = null,
        //                        nom_zpu = zpu != null ? zpu.nom_zpu : null,
        //                        pays = pays,
        //                    };
        //                    list_conts.Add(dvc);
        //                }
        //            }
        //        }
        //        // Раздел TEXT станции отправки и прибытия и коды администрации отпр и прибытия
        //        if (otpr.text != null)
        //            zayava = otpr.text.zayava;

        //        Arrival_Doc arrival_main_doc = new Arrival_Doc()
        //        {
        //            id_doc = uz_doc.num_doc,
        //            nom_doc = uz_doc.num_uz.ToString(),
        //            epd_code_from = uz_doc.code_from,
        //            epd_code_on = uz_doc.code_on,
        //            code_stn_from = (stn_from != null ? (int?)int.Parse(stn_from) : null),
        //            code_stn_to = (stn_to != null ? (int?)int.Parse(stn_to) : null),
        //            code_border_checkpoint = (border_crossing_stn != null ? (int?)int.Parse(border_crossing_stn) : null),
        //            cross_time = cross_time,
        //            code_shipper = (uz_doc.code_from != null ? (int?)int.Parse(uz_doc.code_from) : null),
        //            code_consignee = (uz_doc.code_on != null ? (int?)int.Parse(uz_doc.code_on) : null),
        //            klient = (uz_doc.code_on != null && uz_doc.code_on == "7932" ? false : true),
        //            code_payer_sender = send_kod_plat,
        //            code_payer_arrival = arr_kod_plat,
        //            distance_way = otpr.distance_way,
        //            note = null,
        //            doc_pays = list_doc_pays,
        //            doc_acts = list_doc_acts,
        //            doc_docs = list_doc_docs,
        //            date_otpr = otpr.date_otpr,
        //            srok_end = otpr.srok_end,
        //            date_grpol = otpr.date_grpol,
        //            date_pr = otpr.date_pr,
        //            date_vid = otpr.date_vid,
        //        };

        //        Arrival_Doc_Vagon arrival_vagon_main_doc = new Arrival_Doc_Vagon()
        //        {
        //            num = car.num,
        //            id_arrival = (long)car.id_arrival,
        //            id_car = (int)car.id,
        //            id_condition = arr_uz_vag.id_condition,
        //            id_type = arr_uz_vag.id_type,
        //            gruzp = gruzp,
        //            u_tara = u_tara != null ? u_tara * 1000 : null,
        //            ves_tary_arc = ves_tary_arc != null ? ves_tary_arc : null,
        //            route = arr_uz_vag.route,
        //            note_vagon = arr_uz_vag.note_vagon,
        //            id_cargo = dir_cargo.id,
        //            id_cargo_gng = null,
        //            id_certification_data = arr_uz_vag.id_certification_data,
        //            id_commercial_condition = arr_uz_vag.id_commercial_condition,
        //            kol_pac = kol_pac,
        //            pac = pac,
        //            vesg = vesg != null ? vesg * 1000 : null,
        //            vesg_reweighing = null,
        //            nom_zpu = nom_zpu,
        //            danger = danger,
        //            danger_kod = danger_kod,
        //            cargo_returns = arr_uz_vag.cargo_returns, // ?
        //            id_station_on_amkr = arr_uz_vag.id_station_on_amkr,
        //            id_division_on_amkr = arr_uz_vag.id_division_on_amkr,
        //            empty_car = arr_uz_vag.empty_car,
        //            kol_conductor = null,
        //            id_owner = arr_uz_vag.id_owner,
        //            id_countrys = arr_uz_vag.id_countrys,
        //            id_genus = arr_uz_vag.id_genus,
        //            kol_os = arr_uz_vag.kol_os,
        //            usl_tip = arr_uz_vag.usl_tip,
        //            date_rem_uz = arr_uz_vag.date_rem_uz,
        //            date_rem_vag = arr_uz_vag.date_rem_vag,
        //            id_type_ownership = arr_uz_vag.id_type_ownership,
        //            gruzp_uz = arr_uz_vag.gruzp_uz,
        //            tara_uz = arr_uz_vag.tara_uz,
        //            zayava = zayava,
        //            pay_summa = pay_summa,
        //            conts = list_conts,
        //            pays = list_pays,
        //            acts = list_acts,
        //            id_wagons_rent_arrival = arr_uz_vag.id_wagons_rent_arrival,
        //        };

        //        Arrival_UZ_Vagon arr_main_uz_doc_vag = null;
        //        if (arr_uz_doc != null)
        //        {
        //            ResultObject res_arr_main_uz_doc_vag = UpdateArrival_UZ_Vagon(ref context, arr_uz_doc.id, arrival_vagon_main_doc, false, false, user);
        //            if (res_arr_main_uz_doc_vag.result < 0 || res_arr_main_uz_doc_vag.obj == null) return res_arr_main_uz_doc_vag.result; // Была ошибка вернем код
        //            arr_main_uz_doc_vag = (Arrival_UZ_Vagon)res_arr_main_uz_doc_vag.obj;
        //            if (res_arr_main_uz_doc_vag.mode == mode_obj.add)
        //            {
        //                ef_arr_uz_vag.Add(arr_main_uz_doc_vag);
        //            }
        //            if (res_arr_main_uz_doc_vag.mode == mode_obj.update)
        //            {
        //                ef_arr_uz_vag.Update(arr_main_uz_doc_vag);
        //            }

        //        }
        //        ResultObject res_arr_main_uz_doc = UpdateArrival_UZ_Document(ref context, uz_doc, null, arrival_main_doc, null, true, true, user);
        //        if (res_arr_main_uz_doc.result < 0 || res_arr_main_uz_doc.obj == null) return res_arr_main_uz_doc.result; // Была ошибка вернем код
        //        Arrival_UZ_Document new_arr_uz_doc = (Arrival_UZ_Document)res_arr_main_uz_doc.obj;

        //        if (res_arr_main_uz_doc.mode == mode_obj.add) {
        //            ef_arr_uz_doc.Add(new_arr_uz_doc);
        //        }
        //        if (res_arr_main_uz_doc.mode == mode_obj.update) {
        //            ef_arr_uz_doc.Update(new_arr_uz_doc);
        //        }

        //        //if (new_arr_uz_doc.id == 0)
        //        //{

        //        //    arr_main_uz_doc_vag.id_document = 0;
        //        //    arr_main_uz_doc_vag.Arrival_UZ_Document = null;
        //        //    new_arr_uz_doc.Arrival_UZ_Vagon.Add(arr_main_uz_doc_vag);
        //        //    ef_arr_uz_doc.Update(new_arr_uz_doc);
        //        //    if (arr_uz_doc != null && arr_uz_doc.Arrival_UZ_Vagon.Count() == 1)
        //        //    {
        //        //        ef_arr_uz_doc.Delete(arr_uz_doc.id);
        //        //    }
        //        //}
        //        //return 1;
        //        int res = context.SaveChanges();
        //        return res;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("OperationUpdateEPDIncomingWagon(id_arrival_car={0}, user={1})", id_arrival_car, user), servece_owner, eventID);
        //        //result.SetResult((int)errors_base.global);
        //        //return result;// Ошибка
        //        return (int)errors_base.global;
        //    }
        //}
        #endregion

        #region ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ - АРМ ДИСПЕТЧЕРА
        /// <summary>
        /// Перенумерация вагонов по указаному пути с указаной начальной позиции
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way"></param>
        /// <param name="position_start"></param>
        /// <returns></returns>
        public int RenumberingWagons(ref EFDbContext context, int id_way, int position_start)
        {
            try
            {
                int count = 0;
                if (context == null)
                {
                    context = new EFDbContext();
                }
                //List<WagonInternalMovement> list_wim = context.WagonInternalMovement.Where(m => m.id_way == id_way & m.id_outer_way == null & m.way_end == null).OrderBy(p => p.position).ToList();
                List<WagonInternalMovement> list_wim = context.GetMovementWagonsOfWay(id_way);
                if (list_wim != null)
                {
                    count = list_wim.Count();
                    foreach (WagonInternalMovement wim in list_wim)
                    {
                        wim.position = position_start++;
                    }
                }
                return count;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagons(context={0}, id_way={1}, position_start={2})", context, id_way, position_start), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }

        #region Операции "Дислокации"
        /// <summary>
        /// Выполнить дислокацию по вагону
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_way_on"></param>
        /// <param name="position_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int DislocationWagon(ref EFDbContext context, int id_way_from, int id_way_on, int position_on, DateTime lead_time, WagonInternalRoutes wagon, string locomotive1, string locomotive2, bool wagon_outgoing, string user)
        {
            try
            {
                if (wagon == null) return (int)errors_base.not_wir_db;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_wim_db;
                if (wim.id_way != id_way_from) return (int)errors_base.wagon_not_way;
                wagon.SetStationWagon_old(wim.id_station, id_way_on, lead_time, position_on, null, user);
                // Установим и закроем операцию дислокация -3              
                wagon.SetOpenOperation(wagon_outgoing ? 8 : 3, lead_time.AddMinutes(-10), null, null, null, null, null, user).SetCloseOperation(lead_time, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagon(context={0}, id_way_from={1}, id_way_on={2}, position_on={3}, lead_time={4}, wagon={5}, locomotive1={6}, locomotive2={7}, wagon_outgoing={8}, user={9})",
                    context, id_way_from, id_way_on, position_on, lead_time, wagon, locomotive1, locomotive2, wagon_outgoing, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Дислокация вагонов на станци
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="reverse"></param>
        /// <param name="id_way_on"></param>
        /// <param name="side_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagons"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer DislocationWagons(ref EFDbContext context, int id_way_from, bool reverse, int id_way_on, bool side_on, DateTime lead_time, List<WagonInternalRoutes> wagons, string locomotive1, string locomotive2, bool wagon_outgoing, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }


                if (wagons != null && wagons.Count() > 0)
                {
                    // Определим сортировку (реверс)
                    List<WagonInternalRoutes> wagon_position = reverse == true ? wagons.OrderByDescending(w => w.GetLastMovement().position).ToList() : wagons.OrderBy(w => w.GetLastMovement().position).ToList();
                    // Подготовим путь приема (перестроим позиции)
                    int res_renum = RenumberingWagons(ref context, id_way_on, (side_on == false ? (wagons.Count() + 1) : 1));
                    // Определим позицию переноса вагонов
                    int position = side_on == false ? 1 : context.GetNextPosition(id_way_on);

                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = DislocationWagon(ref context, id_way_from, id_way_on, position, lead_time, wagon, locomotive1, locomotive2, wagon_outgoing, user);
                        rt.SetMovedResult(result, wagon.num);
                        position++;
                    }
                }
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                }
                else
                {
                    rt.SetResult((int)errors_base.cancel_save_changes);
                }
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagons(context={0}, id_way_from={1}, reverse={2}, id_way_on={3}, side={4}, lead_time={5}, wagons={6}, locomotive1={7}, locomotive2={8}, wagon_outgoing={9}, user={10})",
                    context, id_way_from, reverse, id_way_on, side_on, lead_time, wagons, locomotive1, locomotive2, user), servece_owner, eventID);
                rt.SetResult(-1);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Операция дислокации вагонов на станции АМКР
        /// </summary>
        /// <param name="id_way_from"></param>
        /// <param name="reverse"></param>
        /// <param name="list_dislocation"></param>
        /// <param name="id_way_on"></param>
        /// <param name="side_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int DislocationWagonsOfStation(int id_way_from, bool reverse, List<ListOperationWagon> list_dislocation, int id_way_on, bool side_on, DateTime lead_time, string locomotive1, string locomotive2, bool wagon_outgoing, string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                ResultTransfer res = new ResultTransfer(0);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                List<WagonInternalRoutes> wagons = new List<WagonInternalRoutes>();
                foreach (ListOperationWagon dw in list_dislocation)
                {
                    wagons.Add(context.WagonInternalRoutes.Where(r => r.id == dw.wir_id).FirstOrDefault());
                }
                // Если этопредъявленные вагоны, тогда поменяем номер пути
                if (wagon_outgoing == true)
                {
                    EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                    EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                    long id_outgoing_car = (long)wagons[0].id_outgoing_car;
                    OutgoingCars out_car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();
                    if (out_car != null)
                    {
                        OutgoingSostav out_sos = ef_out_sostav.Context.Where(s => s.id == out_car.id_outgoing).FirstOrDefault();
                        if (out_sos != null)
                        {
                            // Заменим путь
                            out_sos.id_way_from = id_way_on;
                            ef_out_sostav.Update(out_sos);
                        }
                    }
                }

                // Перенесем вагоны 
                res = DislocationWagons(ref context, id_way_from, reverse, id_way_on, side_on, lead_time, wagons, locomotive1, locomotive2, wagon_outgoing, user);
                // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                if (res.result > 0)
                {
                    // Перенумеруем
                    int result_rnw = RenumberingWagons(ref context, id_way_from, 1);
                    if (result_rnw > 0)
                    {
                        // Применим перенумерацию
                        context.SaveChanges();
                    }
                }
                string mess = String.Format("Операция дислокации вагонов на станции АМКР. Код выполнения = {0}. Путь отправки = {1}, реверс = {2}, путь приема = {3}, сторона = {4}, время выполнения операции = {5}. Результат переноса [выбрано для переноса = {6}, перенесено = {7}, пропущено = {8}, ошибок переноса = {9}].",
                    res.result, id_way_from, reverse, id_way_on, side_on, lead_time, res.count, res.moved, res.skip, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция дислокации вагонов на станции АМКР."), start, stop, res.result);

                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagonsOfStation(id_way_from={0},reverse ={1}, list_dislocation={2}, id_way_on={3}, side_on={4}, lead_time={5}, locomotive1={6}, locomotive2={7}, wagon_outgoing ={8}, user={9})",
                    id_way_from, reverse, list_dislocation, id_way_on, side_on, lead_time, locomotive1, locomotive2, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        #endregion

        #region Операции "Роспуска"
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_way_on"></param>
        /// <param name="position_on"></param>
        /// <param name="date_start"></param>
        /// <param name="date_stop"></param>
        /// <param name="wagon"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int DissolutionWagon(ref EFDbContext context, int id_way_from, int id_way_on, int position_on, DateTime date_start, DateTime date_stop, WagonInternalRoutes wagon, string user)
        {
            try
            {
                if (wagon == null) return (int)errors_base.not_open_wir;  // Нет перечня вагонов
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way_on).FirstOrDefault();
                if (way == null) return (int)errors_base.not_dir_way_of_db;         // Неуказан путь приема
                int id_station_on = way.id_station;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_open_wir;       //  Нет открытой записи положения вагона. (Если вагон защел тогда вагон всегда должен гдето стоять!)
                if (wim.id_way != id_way_from) return (int)errors_base.wagon_not_way; // Нет вагон стоит не натом пути по которому нужно провести операцию.
                wagon.SetStationWagon_old(id_station_on, id_way_on, date_stop, position_on, null, user);
                // Установим и закроем операцию роспуск -4              
                wagon.SetOpenOperation(4, date_start, null, null, null, null, null, user).SetCloseOperation(date_stop, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DissolutionWagon(context={0}, id_way_from={1}, id_way_on={2}, position_on={3}, date_start={4}, date_stop={5}, wagon={6}, user={6})",
                    context, id_way_from, id_way_on, position_on, date_start, date_stop, wagon, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Роспуск вагонов
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_way_on"></param>
        /// <param name="date_start"></param>
        /// <param name="date_stop"></param>
        /// <param name="wagons"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer DissolutionWagons(ref EFDbContext context, int id_way_from, int id_way_on, DateTime date_start, DateTime date_stop, List<WagonInternalRoutes> wagons, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }


                if (wagons != null && wagons.Count() > 0)
                {
                    // Отсортируем вагоны по позиции
                    bool reverse = false;
                    bool side_on = true; // false -голова

                    List<WagonInternalRoutes> wagon_position = reverse == true ? wagons.OrderByDescending(w => w.GetLastMovement().position).ToList() : wagons.OrderBy(w => w.GetLastMovement().position).ToList();
                    // Подготовим путь приема (перестроим позиции)
                    int res_renum = RenumberingWagons(ref context, id_way_on, (side_on == false ? (wagons.Count() + 1) : 1));
                    // Определим позицию переноса вагонов
                    int position = side_on == false ? 1 : context.GetNextPosition(id_way_on);

                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = DissolutionWagon(ref context, id_way_from, id_way_on, position, date_start, date_stop, wagon, user);
                        rt.SetMovedResult(result, wagon.num);
                        if (result > 0 && rt.result >= 0)
                        {
                            rt.result += 1;
                        }
                        if (result < 0)
                        {
                            rt.result = result;
                        }
                        position++;
                    }
                }
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DissolutionWagons(context={0}, id_way_from={1}, id_way_on={2}, date_start={3}, date_stop={4}, wagons={5}, user={6})",
                    context, id_way_from, id_way_on, date_start, date_stop, wagons, user), servece_owner, eventID);
                rt.SetResult(-1);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Операция дислокации вагонов на станции АМКР
        /// </summary>
        /// <param name="list_wir"></param>
        /// <param name="id_way_from"></param>
        /// <param name="reverse"></param>
        /// <param name="id_way_on"></param>
        /// <param name="side_on"></param>
        /// <param name="date_start"></param>
        /// <param name="date_stop"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int DissolutionWagonsOfStation(int id_way_from, List<DissolutionWagon> list_dissolution, DateTime date_start, DateTime date_stop, string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                string s_id_way_on = "";
                ListResultTransfer lrt = new ListResultTransfer();

                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Сгруппируем по путям роспуска
                List<IGrouping<int, DissolutionWagon>> group_dissolution = list_dissolution
                                .ToList()
                                .GroupBy(w => w.id_way_dissolution)
                                .ToList();

                EFDbContext context = new EFDbContext();
                // Пройдемся по путям роспуска
                foreach (IGrouping<int, DissolutionWagon> gr_dw in group_dissolution.ToList())
                {

                    int id_way_dissolution = gr_dw.Key;
                    s_id_way_on += id_way_dissolution.ToString() + ";";
                    List<DissolutionWagon> list_dw = gr_dw.OrderBy(w => w.position).ToList();
                    List<WagonInternalRoutes> wagons = new List<WagonInternalRoutes>();
                    foreach (DissolutionWagon dw in list_dw)
                    {
                        wagons.Add(context.WagonInternalRoutes.Where(r => r.id == dw.wir_id).FirstOrDefault());
                    }
                    ResultTransfer res = new ResultTransfer(wagons.Count);
                    // Перенесем вагоны 
                    res = DissolutionWagons(ref context, id_way_from, id_way_dissolution, date_start, date_stop, wagons, user);
                    lrt.AddResultTransfer(res);
                    // Проверим на ошибки
                    if (lrt.result < 0)
                    {
                        lrt.SetResult((int)errors_base.cancel_save_changes);
                        break;
                    }
                    // добавим результат

                }
                // Все вагоны перенесены, сохраним изменения если небыло ошибок
                if (lrt.result > 0)
                {
                    lrt.SetResult(context.SaveChanges());
                    // Если все прошло сделаем перенумерацию на пути отправки
                    if (lrt.result > 0)
                    {
                        int result_rnw = RenumberingWagons(ref context, id_way_from, 1);
                        if (result_rnw > 0)
                        {
                            // Применим перенумерацию
                            lrt.SetResult(context.SaveChanges());
                        }
                    }
                }

                string mess = String.Format("Операция роспуска вагонов на станциях АМКР. Код выполнения = {0}. Путь отправки = {1}, пути приема = {2}, время начала операции = {3}, время конца операции = {4}. Результат переноса [выбрано для переноса = {5}, перенесено = {6}, пропущено = {7}, ошибок переноса = {8}].",
                    lrt.result, id_way_from, s_id_way_on, date_start, date_stop,
                    lrt.count, lrt.moved, lrt.skip, lrt.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(lrt.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция роспуска вагонов на станции АМКР."), start, stop, lrt.result);
                return lrt.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DissolutionWagonsOfStation(id_way_from={0}, list_dissolution={1}, date_start={2}, date_stop={3}, user={4})",
                    id_way_from, list_dissolution, date_start, date_stop, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        #endregion

        #region  Операция "Отправка"
        //TODO: ! Удалить старая операция отправки
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="position_on"></param>
        /// <param name="num_sostav"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int SendingWagon(ref EFDbContext context, int id_way_from, int id_outer_ways, int position_on, int num_sostav, DateTime lead_time, WagonInternalRoutes wagon, string locomotive1, string locomotive2, string user)
        {
            try
            {
                if (wagon == null) return (int)errors_base.not_open_wir;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_open_wir;
                if (wim.id_way != id_way_from) return (int)errors_base.wagon_not_way;
                // Проверим вагон уже стоит ?
                if (wim.id_outer_way == id_outer_ways && wim.position == position_on) return 0; // Вагон отправлен пропустить операцию
                                                                                                // Вагон не стоит, переставим.
                string note_sostav = "Состав №" + num_sostav.ToString();
                wagon.SetSendingWagon_old(id_outer_ways, lead_time, position_on, note_sostav, user);
                // Установим и закроем операцию отправления -5              
                wagon.SetOpenOperation(5, lead_time.AddMinutes(-10), null, null, locomotive1, locomotive2, note_sostav, user).SetCloseOperation(lead_time, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SendingWagon(context={0}, id_way_from={1}, id_outer_ways={2}, position_on={3}, num_sostav={4}, lead_time={5}, wagon={6}, locomotive1={7}, locomotive2={8}, user={9})",
                    context, id_way_from, id_outer_ways, position_on, num_sostav, lead_time, wagon, locomotive1, locomotive2, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        //TODO: ! Удалить старая операция отправки
        /// <summary>
        /// Отправка вагонов на станцию АМКР
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="num_sostav"></param>
        /// <param name="date_start"></param>
        /// <param name="date_stop"></param>
        /// <param name="wagons"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer SendingWagons(ref EFDbContext context, int id_way_from, int id_outer_ways, int num_sostav, DateTime lead_time, List<WagonInternalRoutesPosition> wagons, string locomotive1, string locomotive2, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }


                if (wagons != null && wagons.Count() > 0)
                {
                    // Отсортируем вагоны по позиции
                    bool reverse = false;
                    //bool side_on = true; // false -голова

                    // Определим позиции (реверс)
                    List<WagonInternalRoutes> wagon_position = reverse == true ? wagons.OrderByDescending(w => w.new_position).Select(w => w.wir).ToList() : wagons.OrderBy(w => w.new_position).Select(w => w.wir).ToList();

                    // Подготовим путь приема (перестроим позиции)
                    //int res_renum = RenumberingWagons(ref context, id_way_on, (side_on == false ? (wagons.Count() + 1) : 1));
                    // Определим позицию переноса вагонов (все отправки начинаются с 1 позиции)
                    int position = 1;

                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = SendingWagon(ref context, id_way_from, id_outer_ways, position, num_sostav, lead_time, wagon, locomotive1, locomotive2, user);
                        rt.SetMovedResult(result, wagon.num);
                        position++;
                    }
                }
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                }
                else
                {
                    rt.SetResult((int)errors_base.cancel_save_changes);
                }
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagons(context={0}, id_way_from={1}, id_outer_ways={2}, num_sostav={3}, lead_time={4}, wagons={5}, locomotive1={6}, locomotive2={7}, user={8})",
                    context, id_way_from, id_outer_ways, num_sostav, lead_time, wagons, locomotive1, locomotive2, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        //TODO: ! Удалить старая операция отправки
        /// <summary>
        /// Операция отправки вагонов на станцию АМКР
        /// </summary>
        /// <param name="id_way_from"></param>
        /// <param name="list_sending"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="num_sostav"></param>
        /// <param name="date_start"></param>
        /// <param name="date_stop"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int SendingWagonsOfStation(int id_way_from, List<ListOperationWagon> list_sending, int id_outer_ways, int num_sostav, DateTime lead_time, string locomotive1, string locomotive2, string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                ResultTransfer res = new ResultTransfer(0);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                List<WagonInternalRoutesPosition> wagons = new List<WagonInternalRoutesPosition>();
                // Пройдемся по вагонам отсортировав их по позиции
                foreach (ListOperationWagon sw in list_sending.OrderBy(w => w.position).ToList())
                {
                    wagons.Add(new WagonInternalRoutesPosition() { wir = context.WagonInternalRoutes.Where(r => r.id == sw.wir_id).FirstOrDefault(), new_position = sw.position });
                }
                // Отправляем все вагоны
                res = SendingWagons(ref context, id_way_from, id_outer_ways, num_sostav, lead_time, wagons, locomotive1, locomotive2, user);
                // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                if (res.result > 0)
                {
                    int result_rnw = RenumberingWagons(ref context, id_way_from, 1);
                    if (result_rnw > 0)
                    {
                        // Применим перенумерацию
                        context.SaveChanges();
                    }
                }
                string mess = String.Format("Операция отправки вагонов на станцию АМКР. Код выполнения = {0}. Путь отправки = {1}, внешний путь приема = {2}, номер состава = {3}, время выполнения операции = {4}, локомотив-1 = {5}, локомотив-2 = {6}. Результат переноса [выбрано для переноса = {7}, перенесено = {8}, пропущено = {9}, ошибок переноса = {10}].",
                    res.result, id_way_from, id_outer_ways, num_sostav, lead_time, locomotive1, locomotive2,
                    res.count, res.moved, res.skip, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция отправки вагонов на станцию АМКР."), start, stop, res.result);

                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SendingWagonsOfStation(id_way_from={0}, list_sending={1}, id_outer_ways={2}, num_sostav={3}, lead_time={4}, locomotive1={5}, locomotive2={6}, user={7})",
                    id_way_from, list_sending, id_outer_ways, num_sostav, lead_time, locomotive1, locomotive2, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }

        /// <summary>
        /// Выполнить операцию отправить вагон в составе на станцию АМКР
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="position_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="num_sostav"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int SendWagon(ref EFDbContext context, int id_way_from, int id_outer_ways, int position_on, DateTime lead_time, WagonInternalRoutes wagon, string num_sostav, string locomotive1, string locomotive2, string user)
        {
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                if (wagon == null) return (int)errors_base.not_wir_db; // В базе данных нет записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                                                                       // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_open_wir;                  // В базе данных нет открытой записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                if (wim.id_way != id_way_from) return (int)errors_base.wagon_not_way;   // Вагон не стоит на пути
                                                                                        // Проверим вагон уже стоит ?
                if (wim.id_outer_way == id_outer_ways && wim.position == position_on) return 0; // Вагон отправлен пропустить операцию
                                                                                                // Вагон не стоит, переставим.

                // Установим и закроем операцию отправления -5              
                WagonInternalOperation new_operation = wagon.SetOpenOperation(5, lead_time.AddMinutes(-10), null, null, locomotive1, locomotive2, "Состав:" + num_sostav, user).SetCloseOperation(lead_time, null, user);
                if (new_operation == null) return (int)errors_base.err_create_wio_db;   // Ошибка создания новой операции над вагоном.

                // Установим и вагон на внешний путь
                WagonInternalMovement new_movement = wagon.SetSendingWagon(id_outer_ways, lead_time, position_on, num_sostav, null, user);
                if (new_movement == null) return (int)errors_base.err_create_wim_db;   // Ошибка создания новой позиции вагона.
                                                                                       // Зададим сылку на операцию
                new_movement.WagonInternalOperation = new_operation;
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SendWagon(context={0}, id_way_from={1}, id_outer_ways={2}, position_on={3}, num_sostav={4}, lead_time={5}, wagon={6}, locomotive1={7}, locomotive2={8}, user={9})",
                    context, id_way_from, id_outer_ways, position_on, num_sostav, lead_time, wagon, locomotive1, locomotive2, user), servece_owner, eventID);
                return (int)errors_base.global; // Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Выполнить операцию отправить вагоны на станцию АМКР
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagons"></param>
        /// <param name="num_sostav"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer SendWagonsOfStation(int id_way_from, int id_outer_ways, DateTime lead_time, List<ListOperationWagon> wagons, string num_sostav, string locomotive1, string locomotive2, string user)
        {
            DateTime start = DateTime.Now;
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                EFDbContext context = new EFDbContext();
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                //Проверим и скорректируем нового состава
                if (String.IsNullOrWhiteSpace(num_sostav))
                {
                    num_sostav = id_outer_ways.ToString() + '-' + lead_time.ToString("ddMMyyyyHHmmss");
                }
                List<WagonInternalRoutesPosition> List_wir = new List<WagonInternalRoutesPosition>();
                // Пройдемся по вагонам отсортировав их по позиции
                foreach (ListOperationWagon sw in wagons.OrderBy(w => w.position).ToList())
                {
                    List_wir.Add(new WagonInternalRoutesPosition() { wir = context.WagonInternalRoutes.Where(r => r.id == sw.wir_id).FirstOrDefault(), new_position = sw.position });
                }

                if (List_wir != null && List_wir.Count() > 0)
                {
                    // Выполним сортировку позиций по возрастанию
                    List<WagonInternalRoutes> wagon_position = List_wir.OrderBy(w => w.new_position).Select(w => w.wir).ToList();

                    int position = 1;


                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = SendWagon(ref context, id_way_from, id_outer_ways, position, lead_time, wagon, num_sostav, locomotive1, locomotive2, user);
                        rt.SetMovedResult(result, wagon.num);
                        position++;
                    }
                }
                // 
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                    // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                    if (rt.result > 0)
                    {
                        string mess = String.Format("Операция отправки вагонов на станцию АМКР. Код выполнения = {0}. Путь отправки = {1}, внешний путь приема = {2}, номер состава = {3}, время выполнения операции = {4}, локомотив-1 = {5}, локомотив-2 = {6}. Результат переноса [выбрано для переноса = {7}, перенесено = {8}, пропущено = {9}, ошибок переноса = {10}].",
                            rt.result, id_way_from, id_outer_ways, num_sostav, lead_time, locomotive1, locomotive2, rt.count, rt.moved, rt.skip, rt.error);
                        mess.WarningLog(servece_owner, eventID);
                        mess.EventLog(rt.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                        DateTime stop = DateTime.Now;
                        servece_owner.ServicesToLog(eventID, String.Format("Операция отправки вагонов на станцию АМКР."), start, stop, rt.result);
                        int result_rnw = RenumberingWagons(ref context, id_way_from, 1);
                        if (result_rnw > 0)
                        {
                            // Применим перенумерацию
                            int res_renum = context.SaveChanges();
                        }
                    }
                }
                else
                {
                    rt.SetResult((int)errors_base.cancel_save_changes);
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SendWagonsOfStation(id_way_from={0}, id_outer_ways={1}, lead_time={2}, List_wir={3}, num_sostav={4}, locomotive1={5}, locomotive2={6}, user={7})",
                    id_way_from, id_outer_ways, lead_time, wagons, num_sostav, locomotive1, locomotive2, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        ///// <summary>
        ///// Выполнить операцию отправить вагоны на станцию АМКР
        ///// </summary>
        ///// <param name="id_way_from"></param>
        ///// <param name="wagons"></param>
        ///// <param name="id_outer_ways"></param>
        ///// <param name="lead_time"></param>
        ///// <param name="locomotive1"></param>
        ///// <param name="locomotive2"></param>
        ///// <param name="user"></param>
        ///// <returns></returns>
        //public int SendWagonsOfStation(int id_way_from, List<ListOperationWagon> wagons, int id_outer_ways, DateTime lead_time, string locomotive1, string locomotive2, string user)
        //{
        //    try
        //    {
        //        DateTime start = DateTime.Now;
        //        ResultTransfer res = new ResultTransfer(0);
        //        //Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }

        //        EFDbContext context = new EFDbContext();
        //        // Отправляем все вагоны
        //        // Номер состава
        //        string num_sostav = id_outer_ways.ToString() + '-' + lead_time.ToString("ddMMyyyyHHmmss");
        //        res = SendWagonsOfStation(ref context, id_way_from, id_outer_ways, lead_time, wagons, num_sostav, locomotive1, locomotive2, user);
        //        // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
        //        if (res.result > 0)
        //        {
        //            int result_rnw = RenumberingWagons(ref context, id_way_from, 1);
        //            if (result_rnw > 0)
        //            {
        //                // Применим перенумерацию
        //                context.SaveChanges();
        //            }
        //        }
        //        string mess = String.Format("Операция отправки вагонов на станцию АМКР. Код выполнения = {0}. Путь отправки = {1}, внешний путь приема = {2}, номер состава = {3}, время выполнения операции = {4}, локомотив-1 = {5}, локомотив-2 = {6}. Результат переноса [выбрано для переноса = {7}, перенесено = {8}, пропущено = {9}, ошибок переноса = {10}].",
        //            res.result, id_way_from, id_outer_ways, num_sostav, lead_time, locomotive1, locomotive2,
        //            res.count, res.moved, res.skip, res.error);
        //        mess.WarningLog(servece_owner, eventID);
        //        mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
        //        DateTime stop = DateTime.Now;
        //        servece_owner.ServicesToLog(eventID, String.Format("Операция отправки вагонов на станцию АМКР."), start, stop, res.result);

        //        return res.result;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("SendWagonsOfStation(id_way_from={0}, wagons={1}, id_outer_ways={2}, lead_time={3}, locomotive1={4}, locomotive2={5}, user={6})",
        //            id_way_from, wagons, id_outer_ways, lead_time, locomotive1, locomotive2, user), servece_owner, eventID);
        //        return -1;// Возвращаем id=-1 , Ошибка
        //    }
        //}
        #endregion

        #region  Операция "Принять вагон"
        //TODO: ! Удалить старая операция приема
        /// <summary>
        /// Принять вагон на станцию
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="id_way_on"></param>
        /// <param name="position_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ArrivalWagon_old(ref EFDbContext context, int id_outer_way, int id_way_on, int position_on, DateTime lead_time, WagonInternalRoutes wagon, string locomotive1, string locomotive2, string user)
        {
            try
            {
                if (wagon == null) return (int)errors_base.not_open_wir;
                // Определим станцию и путь приема
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way_on).FirstOrDefault();
                if (way == null) return (int)errors_base.not_dir_way_of_db;         // Неуказан путь приема
                int id_station_on = way.id_station;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_open_wir;
                if (wim.id_outer_way != id_outer_way) return (int)errors_base.wagon_not_outerway;
                // Проверим вагон уже стоит ?
                if (wim.id_way == id_way_on && wim.position == position_on) return 0; // Вагон принят пропустить операцию
                                                                                      // Вагон не принят, принять.
                string note_sostav = wim.note + "- принят";
                wagon.SetStationWagon_old(id_station_on, id_way_on, lead_time, position_on, note_sostav, user);
                // Установим и закроем операцию отправления -5              
                wagon.SetOpenOperation(6, lead_time.AddMinutes(-10), null, null, locomotive1, locomotive2, note_sostav, user).SetCloseOperation(lead_time, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ArrivalWagon(context={0}, id_outer_ways={1}, id_way_on={2}, position_on={3}, lead_time={4}, wagon={5}, locomotive1={6}, locomotive2={7}, user={8})",
                    context, id_outer_way, id_way_on, position_on, lead_time, wagon, locomotive1, locomotive2, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        //TODO: ! Удалить старая операция приема        
        /// <summary>
        /// Приемка вагонов на АМКР
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="reverse"></param>
        /// <param name="id_way_on"></param>
        /// <param name="side_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagons"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer ArrivalWagons(ref EFDbContext context, int id_outer_way, bool reverse, int id_way_on, bool side_on, DateTime lead_time, List<WagonInternalRoutesPosition> wagons, string locomotive1, string locomotive2, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }


                if (wagons != null && wagons.Count() > 0)
                {
                    // Определим позиции (реверс)
                    List<WagonInternalRoutes> wagon_position = reverse == true ? wagons.OrderByDescending(w => w.new_position).Select(w => w.wir).ToList() : wagons.OrderBy(w => w.new_position).Select(w => w.wir).ToList();

                    //Подготовим путь приема(перестроим позиции)
                    int res_renum = RenumberingWagons(ref context, id_way_on, (side_on == false ? (wagons.Count() + 1) : 1));
                    // Определим позицию переноса вагонов
                    int position = side_on == false ? 1 : context.GetNextPosition(id_way_on);

                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = ArrivalWagon_old(ref context, id_outer_way, id_way_on, position, lead_time, wagon, locomotive1, locomotive2, user);
                        rt.SetMovedResult(result, wagon.num);
                        position++;
                    }
                }
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                }
                else
                {
                    rt.SetResult((int)errors_base.cancel_save_changes);
                }
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ArrivalWagons(context={0},id_outer_ways ={1}, reverse={2}, id_way_on={3}, side_on={4}, lead_time={5}, wagons={6}, locomotive1={7}, locomotive2={8}, user={9})",
                    context, id_outer_way, reverse, id_way_on, side_on, lead_time, wagons, locomotive1, locomotive2, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        //TODO: ! Удалить старая операция приема        
        /// <summary>
        /// Операция принять вагон на станцию АМКР
        /// </summary>
        /// <param name="id_outer_ways"></param>
        /// <param name="reverse"></param>
        /// <param name="list_arrival"></param>
        /// <param name="id_way_on"></param>
        /// <param name="side_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ArrivalWagonsOfStation(int id_outer_way, bool reverse, List<ListOperationWagon> list_arrival, int id_way_on, bool side_on, DateTime lead_time, string locomotive1, string locomotive2, string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                ResultTransfer res = new ResultTransfer(0);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                List<WagonInternalRoutesPosition> wagons = new List<WagonInternalRoutesPosition>();

                // Пройдемся по вагонам отсортировав их по позиции
                foreach (ListOperationWagon sw in list_arrival.OrderBy(w => w.position).ToList())
                {
                    wagons.Add(new WagonInternalRoutesPosition() { wir = context.WagonInternalRoutes.Where(r => r.id == sw.wir_id).FirstOrDefault(), new_position = sw.position });
                }
                // Отправляем все вагоны
                res = ArrivalWagons(ref context, id_outer_way, reverse, id_way_on, side_on, lead_time, wagons, locomotive1, locomotive2, user);
                //// Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                //if (res.result > 0)
                //{
                //    int result_rnw = RenumberingWagons(ref context, id_way_from, 1);
                //    if (result_rnw > 0)
                //    {
                //        // Применим перенумерацию
                //        context.SaveChanges();
                //    }
                //}
                string mess = String.Format("Операция прибытия вагонов на станцию АМКР. Код выполнения = {0}. Внешний путь отправки = {1}, реверс = {2}, путь приема = {3}, сторона = {4}, время  операции = {5}. Результат переноса [выбрано для переноса = {6}, перенесено = {7}, пропущено = {8}, ошибок переноса = {9}].",
                    res.result, id_outer_way, reverse, id_way_on, side_on, lead_time, res.count, res.moved, res.skip, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция прибытия вагонов на станцию АМКР."), start, stop, res.result);
                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ArrivalWagonsOfStation(id_outer_ways={0}, reverse={1}, list_arrival={2}, id_way_on={3}, side_on={4}, lead_time={5}, locomotive1={6}, locomotive2={7}, user={8})",
                    id_outer_way, reverse, list_arrival, id_way_on, side_on, lead_time, locomotive1, locomotive2, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }

        /// <summary>
        /// Принять прибывающий вагон состава с внешнего пути
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_outer_way"></param>
        /// <param name="id_way_on"></param>
        /// <param name="position_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ArrivalWagon(ref EFDbContext context, int id_outer_way, int id_way_on, int position_on, DateTime lead_time, WagonInternalRoutes wagon, string locomotive1, string locomotive2, string user)
        {
            try
            {
                if (wagon == null) return (int)errors_base.not_wir_db; // В базе данных нет записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                                                                       // Определим станцию и путь приема
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way_on).FirstOrDefault();
                if (way == null) return (int)errors_base.not_dir_way_of_db;         // В базе данных нет записи указанной строки пути
                if (way.way_delete != null) return (int)errors_base.way_is_delete;  // Путь удален
                if (way.way_close != null) return (int)errors_base.way_is_close;    // Путь закрыт
                int id_station_on = way.id_station;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_open_wir;                  // В базе данных нет открытой записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                if (wim.id_outer_way != id_outer_way) return (int)errors_base.wagon_not_outerway; // вагон  не стоит на указаном перегоне
                                                                                                  // Проверим вагон уже стоит ?
                if (wim.id_way == id_way_on && wim.position == position_on) return 0; // Вагон уже принят пропустить операцию
                                                                                      // Вагон не принят, принять.
                string note_sostav = "Состав:" + wim.num_sostav + "- принят";

                // Установим и закроем операцию принять -6              
                WagonInternalOperation new_operation = wagon.SetOpenOperation(6, lead_time.AddMinutes(-10), null, null, locomotive1, locomotive2, note_sostav, user).SetCloseOperation(lead_time, null, user);
                if (new_operation == null) return (int)errors_base.err_create_wio_db;   // Ошибка создания новой операции над вагоном.

                // Установим и вагон на путь станции
                WagonInternalMovement new_movement = wagon.SetStationWagon(id_station_on, id_way_on, lead_time, position_on, null, user, true);

                if (new_movement == null) return (int)errors_base.err_create_wim_db;   // Ошибка создания новой позиции вагона.
                                                                                       // Зададим сылку на операцию
                new_movement.WagonInternalOperation = new_operation;
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ArrivalWagon(context={0}, id_outer_ways={1}, id_way_on={2}, position_on={3}, lead_time={4}, wagon={5}, locomotive1={6}, locomotive2={7}, user={8})",
                    context, id_outer_way, id_way_on, position_on, lead_time, wagon, locomotive1, locomotive2, user), servece_owner, eventID);
                return (int)errors_base.global;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Принять прибывающий состав с внешнего пути
        /// </summary>
        /// <param name="id_outer_way"></param>
        /// <param name="wagons"></param>
        /// <param name="id_way_on"></param>
        /// <param name="head"></param>
        /// <param name="lead_time"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer ArrivalWagonsOfStation(int id_outer_way, List<ListOperationWagon> wagons, int id_way_on, bool head, DateTime lead_time, string locomotive1, string locomotive2, string user)
        {
            DateTime start = DateTime.Now;
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                EFDbContext context = new EFDbContext();
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                List<WagonInternalRoutesPosition> List_wir = new List<WagonInternalRoutesPosition>();
                // Пройдемся по вагонам отсортировав их по позиции
                foreach (ListOperationWagon sw in wagons.OrderBy(w => w.position).ToList())
                {
                    List_wir.Add(new WagonInternalRoutesPosition() { wir = context.WagonInternalRoutes.Where(r => r.id == sw.wir_id).FirstOrDefault(), new_position = sw.position });
                }

                if (List_wir != null && List_wir.Count() > 0)
                {
                    // Выполним сортировку позиций по возрастанию
                    List<WagonInternalRoutes> wagon_position = List_wir.OrderBy(w => w.new_position).Select(w => w.wir).ToList();

                    //Подготовим путь приема(перестроим позиции)
                    int res_renum = RenumberingWagons(ref context, id_way_on, (head == true ? (wagons.Count() + 1) : 1));
                    // Определим позицию переноса вагонов
                    int position = head == true ? 1 : context.GetNextPosition(id_way_on);

                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = ArrivalWagon(ref context, id_outer_way, id_way_on, position, lead_time, wagon, locomotive1, locomotive2, user);
                        rt.SetMovedResult(result, wagon.num);
                        position++;
                    }
                }
                // 
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                    // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                    if (rt.result > 0)
                    {
                        string mess = String.Format("Операция принять состав на станцию АМКР. Код выполнения = {0}. внешний путь = {1}, путь приема = {2}, голова = {3}, время выполнения операции = {4}, локомотив-1 = {5}, локомотив-2 = {6}. Результат переноса [выбрано для переноса = {7}, перенесено = {8}, пропущено = {9}, ошибок переноса = {10}].",
                            rt.result, id_outer_way, id_way_on, head, lead_time, locomotive1, locomotive2, rt.count, rt.moved, rt.skip, rt.error);
                        mess.WarningLog(servece_owner, eventID);
                        mess.EventLog(rt.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                        DateTime stop = DateTime.Now;
                        servece_owner.ServicesToLog(eventID, String.Format("Операция принять состав на станцию АМКР."), start, stop, rt.result);
                    }
                }
                else
                {
                    rt.SetResult((int)errors_base.cancel_save_changes);
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ArrivalWagonsOfStation(id_outer_way={0}, wagons={1}, id_way_on={2}, head={3}, lead_time={4}, locomotive1={5}, locomotive2={6}, user={7})",
                    id_outer_way, wagons, id_way_on, head, lead_time, locomotive1, locomotive2, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        #endregion

        #region  Операция "Вернуть вагоны"
        /// <summary>
        /// Вернуть(отменить) отправленные вагоны из состава
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_outer_way"></param>
        /// <param name="id_way_on"></param>
        /// <param name="position_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="type_return"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ReturnWagon(ref EFDbContext context, int id_outer_way, int id_way_on, int position_on, DateTime? lead_time, WagonInternalRoutes wagon, string locomotive1, string locomotive2, bool type_return, string user)
        {
            try
            {
                if (type_return == false && lead_time == null) return (int)errors_base.error_date; // режим возврата и неуказана дата (дата не указывается если отмена)
                if (wagon == null) return (int)errors_base.not_wir_db; // В базе данных нет записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                                                                       // Определим станцию и путь приема
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way_on).FirstOrDefault();
                if (way == null) return (int)errors_base.not_dir_way_of_db;         // В базе данных нет записи указанной строки пути
                if (way.way_delete != null) return (int)errors_base.way_is_delete;  // Путь удален
                if (way.way_close != null) return (int)errors_base.way_is_close;    // Путь закрыт
                int id_station_on = way.id_station;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_wim_db;    // В базе данных нет записи по WagonInternalMovement (Внутреннее перемещение вагонов)
                if (wim.id_outer_way != id_outer_way) return (int)errors_base.wagon_not_outerway; // вагон  не стоит на указаном перегоне
                WagonInternalOperation wio = wagon.GetLastOperation();
                if (wio == null) return (int)errors_base.not_wio_db;    // В базе данных нет записи по WagonInternalOperation (Внутреннее перемещение вагонов)
                if (wio.id_operation == 11 || wio.id_operation == 12) return (int)errors_base.already_wio; // вагон  не стоит на указаном перегоне
                                                                                                           // Проверим вагон уже стоит ?
                                                                                                           //if (wim.id_way == id_way_on && wim.position == position_on) return 0; // Вагон уже принят пропустить операцию

                // Вагон не принят, принять.
                string note_sostav = "Состав:" + wim.num_sostav + "-" + (type_return ? " отмена" : " возврат");
                DateTime lead_time_start;
                DateTime lead_time_stop;
                if (type_return)
                {
                    // Если отмена операции тогда дата выполнения отмены равна дате предыдущей операции + 1 минута 
                    lead_time_start = ((DateTime)wio.operation_end).AddMinutes(1);
                    lead_time_stop = ((DateTime)wio.operation_end).AddMinutes(1);
                    locomotive1 = wio.locomotive1;
                    locomotive2 = wio.locomotive2;
                }
                else
                {
                    lead_time_start = ((DateTime)lead_time).AddMinutes(-1);
                    lead_time_stop = (DateTime)lead_time;
                }

                // Установим и закроем операцию принять -11- возрат 12 - отмена              
                WagonInternalOperation new_operation = wagon.SetOpenOperation((type_return ? 12 : 11), lead_time_start, null, null, locomotive1, locomotive2, note_sostav, user).SetCloseOperation(lead_time_stop, null, user);
                if (new_operation == null) return (int)errors_base.err_create_wio_db;   // Ошибка создания новой операции над вагоном.

                // Установим и вагон на путь станции без проверки 
                WagonInternalMovement new_movement = wagon.SetStationWagon(id_station_on, id_way_on, lead_time_stop, position_on, null, user, false);

                if (new_movement == null) return (int)errors_base.err_create_wim_db;   // Ошибка создания новой позиции вагона.
                                                                                       // Зададим сылку на операцию
                new_movement.WagonInternalOperation = new_operation;
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ReturnWagon(context={0}, id_outer_ways={1}, id_way_on={2}, position_on={3}, lead_time={4}, wagon={5}, locomotive1={6}, locomotive2={7}, type_return={8}, user={9})",
                    context, id_outer_way, id_way_on, position_on, lead_time, wagon, locomotive1, locomotive2, type_return, user), servece_owner, eventID);
                return (int)errors_base.global;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Вернуть(отменить) отправленные вагоны из состава
        /// </summary>
        /// <param name="id_outer_way"></param>
        /// <param name="wagons"></param>
        /// <param name="id_way_on"></param>
        /// <param name="head"></param>
        /// <param name="lead_time"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="type_return"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer ReturnWagonsOfStation(int id_outer_way, List<ListOperationWagon> wagons, int id_way_on, bool head, DateTime? lead_time, string locomotive1, string locomotive2, bool type_return, string user)
        {
            DateTime start = DateTime.Now;
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                EFDbContext context = new EFDbContext();
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                List<WagonInternalRoutesPosition> List_wir = new List<WagonInternalRoutesPosition>();
                // Пройдемся по вагонам отсортировав их по позиции
                foreach (ListOperationWagon sw in wagons.OrderBy(w => w.position).ToList())
                {
                    List_wir.Add(new WagonInternalRoutesPosition() { wir = context.WagonInternalRoutes.Where(r => r.id == sw.wir_id).FirstOrDefault(), new_position = sw.position });
                }

                if (List_wir != null && List_wir.Count() > 0)
                {
                    // Выполним сортировку позиций по возрастанию
                    List<WagonInternalRoutes> wagon_position = List_wir.OrderBy(w => w.new_position).Select(w => w.wir).ToList();

                    //Подготовим путь приема(перестроим позиции)
                    int res_renum = RenumberingWagons(ref context, id_way_on, (head == true ? (wagons.Count() + 1) : 1));
                    // Определим позицию переноса вагонов
                    int position = head == true ? 1 : context.GetNextPosition(id_way_on);

                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = ReturnWagon(ref context, id_outer_way, id_way_on, position, lead_time, wagon, locomotive1, locomotive2, type_return, user);
                        rt.SetMovedResult(result, wagon.num);
                        position++;
                    }
                }
                // 
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                    // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                    if (rt.result > 0)
                    {
                        string mess = String.Format("Операция " + (type_return ? "отмена отправки вагонов" : "возрат отправленых вагонов") + ". Код выполнения = {0}. внешний путь = {1}, путь приема = {2}, голова = {3}, время выполнения операции = {4}, локомотив-1 = {5}, локомотив-2 = {6}. Результат переноса [выбрано для переноса = {7}, перенесено = {8}, пропущено = {9}, ошибок переноса = {10}].",
                            rt.result, id_outer_way, id_way_on, head, lead_time, locomotive1, locomotive2, rt.count, rt.moved, rt.skip, rt.error);
                        mess.WarningLog(servece_owner, eventID);
                        mess.EventLog(rt.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                        DateTime stop = DateTime.Now;
                        servece_owner.ServicesToLog(eventID, String.Format("Операция " + (type_return ? "отмена отправки вагонов" : "возрат отправленых вагонов") + "."), start, stop, rt.result);
                    }
                }
                else
                {
                    rt.SetResult((int)errors_base.cancel_save_changes);
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ReturnWagonsOfStation(id_outer_way={0}, wagons={1}, id_way_on={2}, head={3}, lead_time={4}, locomotive1={5}, locomotive2={6}, type_return={7}, user={8})",
                    id_outer_way, wagons, id_way_on, head, lead_time, locomotive1, locomotive2, type_return, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        #endregion

        #region Операция "Применить состояние парка"
        /// <summary>
        /// Принять вагон по состоянию парка
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_way"></param>
        /// <param name="position"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ApplyWagonParkState(ref EFDbContext context, int id_station, int id_way, int position, DateTime lead_time, WagonInternalRoutes wagon, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                if (wagon == null) return (int)errors_base.not_open_wir;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_wim_db;
                WagonInternalOperation wio = wagon.GetLastOperation();
                if (wio == null) return (int)errors_base.not_wio_db;
                WagonFiling wf = context.WagonFiling.Where(f => f.id == wim.id_filing).FirstOrDefault();
                // Будет пропускать вагоны предъявленные и с открытыми операциями и с подачами
                if (wio.id_operation == 9 || (wio.operation_start != null && wio.operation_end == null) || (wf != null && wf.create != null && wf.close == null && (wim.filing_start == null || wim.filing_end == null)))
                {
                    return 0;
                }
                // Проверим вагон уже стоит ?
                if (wim.id_station == id_station && wim.id_way == id_way && wim.position == position) return 0; // Вагон стоит на станции на пути и в позиции, пропустить операцию
                string note = "Перенесён по состоянию парка";
                wagon.SetStationWagon_old(id_station, id_way, lead_time, position, note, user);
                // Установим и закроем операцию ручная расстановка -3              
                wagon.SetOpenOperation(8, lead_time.AddMinutes(-10), null, null, null, null, null, user).SetCloseOperation(lead_time, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ApplyWagonParkState(context={0}, id_station={1}, id_way={2}, position={3}, lead_time={4}, wagon={5}, user={6})",
                    context, id_station, id_way, position, lead_time, wagon, user), servece_owner, eventID);
                return (int)errors_base.global;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Принять вагоны по состоянию парка
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="wagons_ps"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer ApplyWagonsParkState(ref EFDbContext context, int id_station, List<ParkStatePosition> wagons_ps, DateTime lead_time, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons_ps.Count());
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                if (wagons_ps != null && wagons_ps.Count() > 0)
                {
                    // Получить все вагоны которые стоят на указаной станции по всем путям
                    List<WagonInternalMovement> old_dislocation = context.WagonInternalMovement.Where(m => m.id_station == id_station && m.way_end == null).OrderBy(c => c.id_way).OrderBy(c => c.position).ToList();
                    // Пройдемся по каждому вагону
                    foreach (ParkStatePosition wagon in wagons_ps.OrderBy(c => c.id_way).OrderBy(c => c.position).ToList())
                    {
                        WagonInternalRoutes wir_wagon = context.GetLastWagon(wagon.num);
                        if (wir_wagon != null)
                        {
                            WagonInternalMovement el = old_dislocation.Find(w => w.id_wagon_internal_routes == wir_wagon.id);
                            bool res_remove = old_dislocation.Remove(el);
                            int result = ApplyWagonParkState(ref context, id_station, wagon.id_way, wagon.position, lead_time, wir_wagon, user);
                            rt.SetMovedResult(result, wagon.num);
                        }
                        else
                        {
                            rt.SetMovedResult((int)errors_base.not_open_wir, wagon.num); // вагон не заходил на АМКР
                        }
                    }
                    // Расставить вагоны на путь до выяснения
                    int position = context.GetNextPosition(0);
                    foreach (WagonInternalMovement wim in old_dislocation)
                    {
                        WagonInternalRoutes wir = wim.WagonInternalRoutes;
                        int result = ApplyWagonParkState(ref context, 99, 0, position, lead_time, wir, user);
                        rt.SetMovedResult(result, wir.num);
                        position++;
                    }
                }
                else
                {
                    // 
                    rt.SetResult((int)errors_base.not_input_value);
                }
                // Проверка на ошибки и сохранение результата
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                }
                else
                {
                    rt.SetResult((int)errors_base.cancel_save_changes);
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ApplyWagonsParkState(context={0}, id_station={1}, wagons_ps={2}, lead_time={3}, user={4})",
                    context, id_station, wagons_ps, lead_time, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Принять вагоны по состоянию парка
        /// </summary>
        /// <param name="id_station"></param>
        /// <param name="wagons_ps"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ApplyWagonsParkState(int id_station, List<ParkStatePosition> wagons_ps, DateTime lead_time, string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                ResultTransfer res = new ResultTransfer(0);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                // Отправляем все вагоны
                res = ApplyWagonsParkState(ref context, id_station, wagons_ps, lead_time, user);

                string mess = String.Format("Операция расстановки вагонов по состоянию парка на станции {0} по состоянию на {1}. Код выполнения = {2}. Результат расстановки [определено = {3}, расставлено = {4}, ошибок = {5}].",
                    id_station, lead_time, res.count, res.moved, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция расстановки вагонов на станции АМКР."), start, stop, res.result);
                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ApplyWagonsParkState(id_station={0}, wagons_ps={1}, lead_time={2}, user={3})",
                    id_station, wagons_ps, lead_time, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Выполнить операцию "Принять вагоны по состоянию парка"
        /// </summary>
        /// <param name="id_station"></param>
        /// <param name="wagons_ps"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer OperationApplyWagonsParkState(int id_station, List<ParkStatePosition> wagons_ps, DateTime lead_time, string user)
        {
            ResultTransfer res = new ResultTransfer(0);
            try
            {

                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                // Отправляем все вагоны
                res = ApplyWagonsParkState(ref context, id_station, wagons_ps, lead_time, user);
                return res;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationApplyWagonsParkState(id_station={0}, wagons_ps={1}, lead_time={2}, user={3})",
                    id_station, wagons_ps, lead_time, user), servece_owner, eventID);
                res.SetResult((int)errors_base.global);
                return res;
            }
        }
        #endregion

        #region Операция "Предъявить на УЗ"
        /// <summary>
        /// Перенести вагон на путь для предъявления.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_way_on"></param>
        /// <param name="position"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationTransferProvideWagon(ref EFDbContext context, int id_station, int id_way_on, int position, DateTime lead_time, WagonInternalRoutes wagon, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                if (wagon == null) return (int)errors_base.not_wir_db;  // В базе данных нет записи по WagonInternalRoutes (Внутренее перемещение вагонов)
                                                                        // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_wim_db;    // В базе данных нет записи по WagonInternalMovement (Внутреняя дислокация вагонов)
                                                                        // Проверим вагон уже стоит ?
                if (wim.id_way == id_way_on && wim.position == position) return 0; // Вагон стоит на станции на пути и в позиции, пропустить операцию
                WagonInternalOperation wio = wagon.GetLastOperation();
                if (wio == null) return (int)errors_base.not_wio_db;
                if (wio.id_operation == 9) return (int)errors_base.wagon_lock_operation; // Операция предявлен (заблокирована)
                string note = "Перенесен для предъявления";
                wagon.SetStationWagon_old(id_station, id_way_on, lead_time, position, note, user);
                // Установим и закроем операцию ручная расстановка -3              
                wagon.SetOpenOperation(8, lead_time.AddMinutes(-1), null, null, null, null, null, user).SetCloseOperation(lead_time, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationTransferProvideWagon(context={0}, id_station={1}, id_way_on={2}, position={3}, lead_time={4}, wagon={5}, user={6})",
                    context, id_station, id_way_on, position, lead_time, wagon, user), servece_owner, eventID);
                return (int)errors_base.global;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Операция собрать вагоны на пути для предъявления
        /// </summary>
        /// <param name="id_way_on"></param>
        /// <param name="nums"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer OperationTransferProvideWagons(int id_way_on, List<int> nums, DateTime lead_time, string user)
        {
            ResultTransfer res = new ResultTransfer(0);
            DateTime start = DateTime.Now;
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                // Проверим путь
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way_on).FirstOrDefault();
                if (way != null)
                {
                    // Этот путь имеет выход на УЗ
                    if (way.crossing_uz == true)
                    {
                        if (nums != null && nums.Count() > 0)
                        {
                            res.count = nums.Count();
                            int position = context.GetNextPosition(id_way_on);
                            // Пройдемся по каждому вагону
                            foreach (int num in nums)
                            {
                                WagonInternalRoutes wir_wagon = context.GetLastWagon(num);
                                if (wir_wagon != null)
                                {
                                    int result = OperationTransferProvideWagon(ref context, way.id_station, id_way_on, position, lead_time, wir_wagon, user);
                                    res.SetMovedResult(result, num);
                                }
                                else
                                {
                                    res.SetMovedResult((int)errors_base.not_wir_db, num); // В базе данных нет записи по WagonInternalRoutes (Внутренее перемещение вагонов)
                                }
                                position++;
                            }
                            // Проверка на ошибки и сохранение результата
                            if (res.error == 0)
                            {
                                res.SetResult(context.SaveChanges());
                                // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                                if (res.result > 0)
                                {
                                    int result_rnw = RenumberingWagons(ref context, id_way_on, 1);
                                    if (result_rnw > 0)
                                    {
                                        // Применим перенумерацию
                                        context.SaveChanges();
                                    }
                                }
                            }
                            else
                            {
                                res.SetResult((int)errors_base.cancel_save_changes);
                            }

                        }
                        else
                        {
                            // 
                            res.SetResult((int)errors_base.not_input_value);
                        }

                    }
                    else
                    {
                        res.SetResult((int)errors_base.way_not_crossing_uz); // Путь не имеет выход на УЗ
                    }
                }
                else
                {
                    res.SetResult((int)errors_base.not_dir_way_of_db); // Указаного пути нет!
                }
                // Выведем результат
                string mess = String.Format("Операция переноса вагонов на путь {0} для предъявления на УЗ. Код выполнения = {1}. Результат переноса [определено = {2}, перенесено = {3}, пропущено = {4}, ошибок = {5}].",
                    id_way_on, res.result, res.count, res.moved, res.skip, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция переноса вагонов на путь для предъявления на УЗ."), start, stop, res.result);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationTransferProvideWagons(id_way_on={0}, nums={1}, lead_time={2}, user={3})",
                    id_way_on, nums, lead_time, user), servece_owner, eventID);
                res.SetResult((int)errors_base.global);

            }
            return res;
        }
        /// <summary>
        /// Выполнить операцию пръедъявлния на УЗ
        /// </summary>
        /// <param name="id_way"></param>
        /// <param name="list_provide"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer OperationProvideWagons(int id_way, List<ListOperationWagon> list_provide, int position, DateTime lead_time, string user)
        {
            ResultTransfer res = new ResultTransfer(0);
            DateTime start = DateTime.Now;
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                //EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                //EFOutgoingSostav ef_out_sos = new EFOutgoingSostav(context);

                //List<WagonInternalRoutesPosition> wagons = new List<WagonInternalRoutesPosition>();
                // Проверим станцию
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way).FirstOrDefault();
                if (way != null)
                {
                    // Этот путь имеет выход на УЗ
                    if (way.crossing_uz == true)
                    {
                        List<long> list_id = list_provide.ToList().OrderBy(p => p.position).Select(p => p.wir_id).ToList();
                        res = ids_tr.InsertOutgoingSostav(ref context, way.id_station, id_way, position, lead_time, list_id, user);
                    }
                    else
                    {
                        res.SetResult((int)errors_base.way_not_crossing_uz); // Путь не имеет выход на УЗ
                    }
                }
                else
                {
                    res.SetResult((int)errors_base.not_dir_way_of_db); // Указаного пути нет!
                }
                string mess = String.Format("Операция формирования состава для предъявления на УЗ. Код выполнения = {0}. Станция отправки = {1}, путь отправки = {2}, время операции = {3}. Результат [определено вагонов = {4}, сформировано = {5}, ошибок формирования = {6}].",
                    res.result, (way != null ? (int?)way.id_station : null), id_way, lead_time, res.count, res.moved, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция формирования состава для предъявления на УЗ."), start, stop, res.result);

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationProvideWagons(id_way={0}, list_provide={1}, lead_time={2}, user={3})",
                    id_way, list_provide, lead_time, user), servece_owner, eventID);
                res.SetResult((int)errors_base.global); // Глобальная ошибка
            }
            return res;
        }
        /// <summary>
        /// Выполнить операцию "Вернуть вагон, сформированный для предъявления"
        /// </summary>
        /// <param name="context"></param>
        /// <param name="car"></param>
        /// <param name="id_way"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationReturnProvideWagon(ref EFDbContext context, OutgoingCars car, int id_way, string user)
        {
            try
            {
                EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);

                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);

                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.outgoing != null) return (int)errors_base.outgoing_cars_outgoing; // Запрет операции вагон отправлен
                                                                                          //if (car.OutgoingSostav.status == 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)

                // Проверим наличие задержания и удалим его
                if (car.id_outgoing_detention != null)
                {
                    ef_out_dr.Delete((int)car.id_outgoing_detention); // удалим
                }
                // Проверим наличие закрытого возврата и откроем его
                if (car.id_outgoing_return_stop != null)
                {
                    OutgoingDetentionReturn outgoing_return_stop = ef_out_dr.Context.Where(r => r.id == car.id_outgoing_return_stop).FirstOrDefault();
                    if (outgoing_return_stop != null)
                    {
                        outgoing_return_stop.date_stop = null;
                        outgoing_return_stop.change = DateTime.Now;
                        outgoing_return_stop.create_user = user;
                        ef_out_dr.Update(outgoing_return_stop); // обновим
                    }
                }
                WagonInternalRoutes wir = ef_wir.Context.Where(w => w.id_outgoing_car == car.id).FirstOrDefault();
                if (wir == null) return (int)errors_base.not_wir_db;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wir.GetLastMovement();
                if (wim == null) return (int)errors_base.not_wim_db;
                if (wim.way_end != null || wim.id_way != id_way) return (int)errors_base.wagon_not_way; // Вагон не стоит на пути
                WagonInternalOperation wio = wir.GetLastOperation();
                if (wio == null) return (int)errors_base.not_wio_db;
                if (wio.id_operation < 8 || wio.id_operation > 9) return (int)errors_base.wagon_not_operation; // Операция не предъявить
                EFWagonInternalOperation ef_wio = new EFWagonInternalOperation(context);
                // Проверки прошло убераем отметки операция предявдения и ссылку на отправленый вагон
                ef_wio.Delete(wio.id);
                wir.id_outgoing_car = null;
                ef_wir.Update(wir);
                // Проверить сап исходящие, и если есть отключим привязку к отправленному вагону
                EFSAPOutgoingSupply ef_sap_os = new EFSAPOutgoingSupply(context);
                SAPOutgoingSupply sap_os = ef_sap_os.Context.Where(s => s.id_outgoing_car == car.id).FirstOrDefault();
                if (sap_os != null)
                {
                    sap_os.id_outgoing_car = null;
                    sap_os.OutgoingCars = null;
                    sap_os.change = DateTime.Now;
                    sap_os.change_user = user;
                    ef_sap_os.Update(sap_os);
                }

                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationReturnProvideWagon(context={0}, car={1}, id_way={2}, user={3})",
                    context, car, id_way, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Выполнить операцию "Вернуть состав, сформированный для предъявления"
        /// </summary>
        /// <param name="id_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateWagon OperationReturnProvideWagons(long id_sostav, string user)
        {
            ResultUpdateWagon res = new ResultUpdateWagon(0);
            DateTime start = DateTime.Now;
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingSostav ef_out_sost = new EFOutgoingSostav(context);
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                OutgoingSostav sostav = ef_out_sost.Context.Where(s => s.id == id_sostav).FirstOrDefault();
                if (sostav != null)
                {
                    if (sostav.status == 0)
                    {
                        bool not_delete_sostav = false;
                        List<OutgoingCars> list_cars = ef_out_car.Context.Where(w => w.id_outgoing == id_sostav).ToList();
                        if (list_cars != null && list_cars.Count() > 0)
                        {

                            // Обновим количество вагонов
                            res.count = list_cars.Count();
                            foreach (OutgoingCars car in list_cars)
                            {
                                if (car.parent_wir_id == null)
                                {
                                    // Это реальный вагон а не неактивная ссылка на изменения по задержанию
                                    int result = OperationReturnProvideWagon(ref context, car, sostav.id_way_from, user);
                                    if (result > 0)
                                    {
                                        ef_out_car.Delete(car.id);
                                    }
                                    res.SetUpdateResult(result, car.num);
                                }
                                else
                                {
                                    res.SetUpdateResult(0, car.num);
                                    not_delete_sostav = true;
                                }

                            }
                        }
                        // проверим на ошибки
                        if (res.error == 0)
                        {
                            if (!not_delete_sostav)
                            {
                                ef_out_sost.Delete(id_sostav);
                            }
                            else
                            {
                                sostav.status = 4; // Статус состав отменен но остались ссылки на возвраты
                                sostav.change = DateTime.Now;
                                sostav.change_user = user;
                                ef_out_sost.Update(sostav);
                            }
                            // Сохраним изменения
                            res.SetResult(context.SaveChanges());
                        }
                        else
                        {
                            res.SetResult((int)errors_base.cancel_save_changes);     // есть ошибки, отмена примененя изменеий
                        }

                        //else
                        //{
                        //    res.SetResult((int)errors_base.not_outgoing_cars_db);     // В базе данных нет записи по вагонам для отпправки
                        //}
                    }
                    else
                    {
                        res.SetResult((int)errors_base.error_status_outgoing_sostav);     // Ошибка статуса состава (Статус не позволяет сделать эту операцию))
                    }
                }
                else
                {
                    res.SetResult((int)errors_base.not_outgoing_sostav_db); // В базе данных нет записи состава для оправки

                }
                string mess = String.Format("Операция «Вернуть состав, сформированный для предъявления». Код выполнения={0}. Результат [состав id = {1}, вагонов в составе = {2}, возвращено = {3}, ошибок = {4}].",
                    res.result, id_sostav, res.count, res.update, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция «Вернуть состав, сформированный для предъявления»"), start, stop, res.result);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationReturnProvideWagons(id_sostav={0}, user={1})",
                    id_sostav, user), servece_owner, eventID);
                res.SetResult((int)errors_base.global); // Глобальная ошибка
            }
            return res;
        }
        /// <summary>
        /// Вернуть вагон с пръедявления
        /// </summary>
        /// <param name="id_outgoing_car"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationReturnProvideCar(long id_outgoing_car, string user)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                //EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                //EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);
                OutgoingCars car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();

                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.outgoing != null) return (int)errors_base.outgoing_cars_outgoing; // Запрет операции вагон отправлен
                                                                                          //TODO: Отменили, вернуть всегда if (car.OutgoingSostav.status == 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)

                int result = OperationReturnProvideWagon(ref context, car, car.OutgoingSostav.id_way_from, user);
                if (result > 0)
                {
                    ef_out_car.Delete(car.id);
                    return context.SaveChanges(); // Применить операции
                }
                else
                {
                    return result;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationReturnProvideCar(id_outgoing_car={0},  user={1})",
                    id_outgoing_car, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }

        #endregion

        #endregion

        #region ОТПРАВКА ВАГОНОВ (АРМ ДИСПЕТЧЕРА)

        #region Операция "Задержание вагона"
        /// <summary>
        /// Выполнить операцию обновить или добавить задержание вагона предяъявленого на УЗ
        /// </summary>
        /// <param name="id_outgoing_car"></param>
        /// <param name="odr"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationUpdateOutgoingDetention(long id_outgoing_car, int id_detention_return, DateTime date_start, DateTime date_stop, string user)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);
                OutgoingCars car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();
                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения

                if (car.id_outgoing_detention == null)
                {
                    // Добавить
                    OutgoingDetentionReturn dr = new OutgoingDetentionReturn()
                    {
                        id = 0,
                        num = car.num,
                        type_detention_return = 0,
                        id_detention_return = id_detention_return,
                        date_start = date_start,
                        date_stop = date_stop,
                        create = DateTime.Now,
                        create_user = user
                    };
                    car.OutgoingDetentionReturn = dr;
                    car.change = DateTime.Now;
                    car.change_user = user;
                    ef_out_car.Update(car);
                }
                else
                {
                    // обновить
                    OutgoingDetentionReturn dr = ef_out_dr.Context.Where(d => d.id == car.id_outgoing_detention).FirstOrDefault();
                    dr.id_detention_return = id_detention_return;
                    dr.date_start = date_start;
                    dr.date_stop = date_stop;
                    dr.change = DateTime.Now;
                    dr.change_user = user;
                    ef_out_dr.Update(dr);
                }
                return context.SaveChanges();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateOutgoingDetention(id_outgoing_car={0}, id_detention_return={1}, date_start={2}, date_stop={3}, user={4})",
                    id_outgoing_car, id_detention_return, date_start, date_stop, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        #endregion

        #region Операция "Возврат вагона"
        /// <summary>
        /// Выполнить операцию открыть возврат
        /// </summary>
        /// <param name="id_outgoing_car"></param>
        /// <param name="id_detention_return"></param>
        /// <param name="date_start"></param>
        /// <param name="num_act"></param>
        /// <param name="date_act"></param>
        /// <param name="note"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationOpenOutgoingReturn(long id_outgoing_car, int id_detention_return, DateTime date_start, string num_act, DateTime? date_act, string note, string user)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);
                OutgoingCars car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();

                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.outgoing != null) return (int)errors_base.outgoing_cars_outgoing; // Запрет операции вагон отправлен
                if (car.OutgoingSostav.status == 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                                                                                                          // Создать возврат
                OutgoingDetentionReturn outgoingreturn = new OutgoingDetentionReturn()
                {
                    id = 0,
                    num = car.num,
                    type_detention_return = 1,
                    id_detention_return = id_detention_return,
                    date_start = date_start,
                    date_stop = null,
                    num_act = num_act,
                    date_act = date_act,
                    note = note,
                    create = DateTime.Now,
                    create_user = user
                };
                ef_out_dr.Add(outgoingreturn); // Добавим строку
                                               // Получим строку внутреннего перемещения
                WagonInternalRoutes wir = ef_wir.Context.Where(w => w.id_outgoing_car == car.id).FirstOrDefault();
                if (wir == null) return (int)errors_base.not_wir_db; // В базе данных нет записи по WagonInternalRoutes (Внутренее перемещение вагонов)
                if (wir.close != null) return (int)errors_base.close_wir; // Запись закрыта (операции не возможны)
                                                                          // Применить операцию ВОЗВРАТ
                wir.SetOpenOperation(10, date_start.AddMinutes(-1), null, null, null, null, note, user).SetCloseOperation(date_start, note, user);
                // Убрать вагон из предъявления
                wir.id_outgoing_car = null;
                ef_wir.Update(wir); // обновим
                                    //ef_out_car.Delete(car.id); // Удалим запись вогона в предъявлении
                                    // Сбросим информацию о вагоне
                car.position_outgoing = null;
                car.date_outgoing_act = null;
                car.id_reason_discrepancy_amkr = null;
                car.id_reason_discrepancy_uz = null;
                car.outgoing = null;
                car.outgoing_user = null;
                car.note = "Открыт возврат";
                car.OutgoingDetentionReturn1 = outgoingreturn;
                car.parent_wir_id = wir.id; // Покажем ссылку на старую попытку сдать
                car.change = DateTime.Now;
                car.change_user = user;

                car.OutgoingSostav.change = DateTime.Now;
                car.OutgoingSostav.change_user = user;

                ef_out_car.Update(car);
                //TODO: Проверка на последний вагон 
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationOpenOutgoingReturn(id_outgoing_car={0}, id_detention_return={1}, date_start={2}, num_act={3}, date_act={4}, note={5},user={6})",
                    id_outgoing_car, id_detention_return, date_start, num_act, date_act, note, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Выполнить закрыть возврат
        /// </summary>
        /// <param name="id_outgoing_car"></param>
        /// <param name="id_outgoin_return"></param>
        /// <param name="date_stop"></param>
        /// <param name="num_act"></param>
        /// <param name="date_act"></param>
        /// <param name="note"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationCloseOutgoingReturn(long id_outgoing_car, int id_outgoin_return, DateTime date_stop, string num_act, DateTime? date_act, string note, string user)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                //EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);
                OutgoingCars car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();
                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.outgoing != null) return (int)errors_base.outgoing_cars_outgoing; // Запрет операции вагон отправлен
                if (car.OutgoingSostav.status == 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                                                                                                          // Найдем возврат
                OutgoingDetentionReturn outgoin_greturn = ef_out_dr.Context.Where(r => r.id == id_outgoin_return).FirstOrDefault();
                if (outgoin_greturn == null) { return (int)errors_base.not_outgoing_detention_return_db; } // Ошибка в базе нет задержания
                if (outgoin_greturn.date_stop != null) { return (int)errors_base.close_outgoing_detention_return; } // Ошибка в запись задержания закрыта
                                                                                                                    // Закроем задержание
                outgoin_greturn.date_stop = date_stop;
                outgoin_greturn.num_act = num_act;
                outgoin_greturn.date_act = date_act;
                outgoin_greturn.note = note;
                outgoin_greturn.change = DateTime.Now;
                outgoin_greturn.change_user = user;
                ef_out_dr.Update(outgoin_greturn);
                // Обновим информацию о вагоне
                car.note = "Закрыт возврат";
                car.id_outgoing_return_stop = outgoin_greturn.id;
                car.change = DateTime.Now;
                car.change_user = user;
                car.OutgoingSostav.change = DateTime.Now;
                car.OutgoingSostav.change_user = user;
                ef_out_car.Update(car);
                //TODO: Проверка на последний вагон 
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationCloseOutgoingReturn(id_outgoing_car={0}, id_outgoin_greturn={1}, date_stop={2}, num_act={3}, date_act={4}, note={5},user={6})",
                    id_outgoing_car, id_outgoin_return, date_stop, num_act, date_act, note, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        #endregion

        #region ОПЕРАЦИИ "СДАЧИ ВАГОНОВ И СОСТАВА НА УЗ"
        /// <summary>
        /// Выполнить операцию пръедявит вагон
        /// </summary>
        /// <param name="id_outgoing_car"></param>
        /// <param name="position"></param>
        /// <param name="date_outgoing_act"></param>
        /// <param name="id_reason_discrepancy_amkr"></param>
        /// <param name="id_reason_discrepancy_uz"></param>
        /// <param name="id_condition"></param>
        /// <param name="id_wagons_rent_arrival"></param>
        /// <param name="id_wagons_rent_outgoing"></param>
        /// <param name="id_countrys"></param>
        /// <param name="id_genus"></param>
        /// <param name="id_owner"></param>
        /// <param name="gruzp_uz"></param>
        /// <param name="tara_uz"></param>
        /// <param name="note_uz"></param>
        /// <param name="id_warehouse"></param>
        /// <param name="id_division"></param>
        /// <param name="laden"></param>
        /// <param name="id_cargo"></param>
        /// <param name="nom_cont1"></param>
        /// <param name="nom_cont2"></param>
        /// <param name="code_stn_to"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationPresentWagon(long id_outgoing_car, int position, DateTime? date_outgoing_act, int? id_reason_discrepancy_amkr, int? id_reason_discrepancy_uz,
            //int? id_outgoing_detention_return, 
            int? id_condition, int? id_wagons_rent_arrival, int? id_wagons_rent_outgoing, int id_countrys, int id_genus, int id_owner,
            double? gruzp_uz, double? tara_uz, string note_uz, int? id_warehouse, int? id_division, bool laden, int id_cargo, string nom_cont1, string nom_cont2, int? code_stn_to, string user)
        {
            try
            {
                //IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                //EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoing_UZ_Vagon ef_out_uz_vag = new EFOutgoing_UZ_Vagon(context);
                EFOutgoing_UZ_Vagon_Cont ef_out_uz_vag_cont = new EFOutgoing_UZ_Vagon_Cont(context);

                //EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                //EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);
                OutgoingCars car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();
                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.outgoing != null) return (int)errors_base.outgoing_cars_outgoing; // Запрет операции вагон отправлен
                if (car.OutgoingSostav.status == 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)

                // Проверим запись на вагон
                Outgoing_UZ_Vagon out_uz_vag = ef_out_uz_vag.Context.Where(v => v.id_car == id_outgoing_car).FirstOrDefault();
                if (out_uz_vag != null) return (int)errors_base.exist_out_uz_vag; // Запрет операции, строка по вагону уже создана. 

                // Создадимк строки документа по контейнерам
                Outgoing_UZ_Vagon_Cont vag_cont1 = null;
                Outgoing_UZ_Vagon_Cont vag_cont2 = null;
                if (!String.IsNullOrWhiteSpace(nom_cont1))
                {
                    vag_cont1 = new Outgoing_UZ_Vagon_Cont()
                    {
                        id = 0,
                        id_vagon = 0,
                        nom_cont = nom_cont1,
                        kod_tiporazmer = null,
                        gruzp = null,
                        ves_tary_arc = null,
                        id_cargo = null,
                        id_cargo_gng = null,
                        kol_pac = null,
                        pac = null,
                        vesg = null,
                        nom_zpu = null,
                    };
                    ef_out_uz_vag_cont.Add(vag_cont1);
                }
                if (!String.IsNullOrWhiteSpace(nom_cont2))
                {
                    vag_cont2 = new Outgoing_UZ_Vagon_Cont()
                    {
                        id = 0,
                        id_vagon = 0,
                        nom_cont = nom_cont2,
                        kod_tiporazmer = null,
                        gruzp = null,
                        ves_tary_arc = null,
                        id_cargo = null,
                        id_cargo_gng = null,
                        kol_pac = null,
                        pac = null,
                        vesg = null,
                        nom_zpu = null,
                    };
                    ef_out_uz_vag_cont.Add(vag_cont2);
                }
                // добавим документ по отправке вагоне
                out_uz_vag = new Outgoing_UZ_Vagon()
                {
                    id = 0,
                    id_document = null,
                    num = car.num,
                    id_outgoing = (long)car.id_outgoing,
                    id_car = car.id,
                    id_condition = id_condition,
                    id_wagons_rent_arrival = id_wagons_rent_arrival,
                    id_wagons_rent_outgoing = id_wagons_rent_outgoing,
                    id_countrys = id_countrys,
                    id_genus = id_genus,
                    id_owner = id_owner,
                    gruzp_uz = gruzp_uz,
                    tara_uz = tara_uz,
                    note_uz = note_uz,
                    gruzp = null,
                    u_tara = null,
                    ves_tary_arc = null,
                    id_warehouse = id_warehouse,
                    id_division = id_division,
                    laden = laden,
                    id_cargo = id_cargo,
                    id_cargo_gng = null,
                    vesg = null, 
                    kol_conductor = null,
                    //id_outgoing_detention_return = id_outgoing_detention_return,
                    code_stn_to = code_stn_to,
                    create = DateTime.Now,
                    create_user = user,
                    change = null,
                    change_user = null,
                };
                // Обновим ссылки на строки OutgoingCars и Outgoing_UZ_Vagon_Cont
                //out_uz_vag.OutgoingCars.Add(car);// ссылка на OutgoingCars
                // Добавим контейнер1
                if (vag_cont1 != null)
                {
                    out_uz_vag.Outgoing_UZ_Vagon_Cont.Add(vag_cont1);
                }
                // Добавим контейнер2
                if (vag_cont1 != null)
                {
                    out_uz_vag.Outgoing_UZ_Vagon_Cont.Add(vag_cont1);
                }

                ef_out_uz_vag.Add(out_uz_vag); // добавим строку

                // Обновим информацию о вагоне
                car.position_outgoing = position;
                car.date_outgoing_act = date_outgoing_act;
                car.id_reason_discrepancy_amkr = id_reason_discrepancy_amkr;
                car.id_reason_discrepancy_uz = id_reason_discrepancy_uz;
                //car.id_outgoing_detention_return = id_outgoing_detention_return;
                car.outgoing = DateTime.Now;
                car.outgoing_user = user;
                car.change = DateTime.Now;
                car.change_user = user;
                // Состав
                car.OutgoingSostav.status = 1;
                car.OutgoingSostav.change = DateTime.Now;
                car.OutgoingSostav.change_user = user;
                // Привяжем документ
                car.Outgoing_UZ_Vagon = out_uz_vag;

                ef_out_car.Update(car);// Обновим  вагон
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationPresentWagon(id_outgoing_car={0}, position ={1}, date_outgoing_act ={2}, id_reason_discrepancy_amkr ={3}, id_reason_discrepancy_uz ={4}, " +
                    "id_condition ={5}, id_wagons_rent_arrival ={6}, id_wagons_rent_outgoing ={7}, id_countrys ={8}, id_genus ={9}, id_owner ={10}, " +
                    "gruzp_uz ={11}, tara_uz ={12}, note_uz ={13}, id_warehouse ={14}, id_division ={15},laden ={16}, id_cargo ={17}, nom_cont1 ={18}, nom_cont2 ={19}, code_stn_to ={20}, user ={21})",
                 id_outgoing_car, position, date_outgoing_act, id_reason_discrepancy_amkr, id_reason_discrepancy_uz,
                 id_condition, id_wagons_rent_arrival, id_wagons_rent_outgoing, id_countrys, id_genus, id_owner,
                 gruzp_uz, tara_uz, note_uz, id_warehouse, id_division, laden, id_cargo, nom_cont1, nom_cont2, code_stn_to, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Вернуть вагон, отменить операцию предъявить вагон 
        /// </summary>
        /// <param name="id_outgoing_car"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationReturnPresentWagon(long id_outgoing_car, string user)
        {
            try
            {
                //IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoing_UZ_Vagon ef_out_uz_vag = new EFOutgoing_UZ_Vagon(context);
                EFOutgoing_UZ_Cont_Pay ef_out_uz_vag_cont_pay = new EFOutgoing_UZ_Cont_Pay(context);
                EFOutgoing_UZ_Vagon_Cont ef_out_uz_vag_cont = new EFOutgoing_UZ_Vagon_Cont(context);
                EFOutgoing_UZ_Vagon_Acts ef_out_uz_vag_act = new EFOutgoing_UZ_Vagon_Acts(context);
                EFOutgoing_UZ_Vagon_Pay ef_out_uz_vag_pay = new EFOutgoing_UZ_Vagon_Pay(context);

                //EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);
                OutgoingCars car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();
                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.OutgoingSostav.status == 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)

                // Проверим наличие задержания и удалим его
                if (car.id_outgoing_detention != null)
                {
                    ef_out_dr.Delete((int)car.id_outgoing_detention); // удалим
                    car.id_outgoing_detention = null;
                }
                // Проверим наличие закрытого возврата и откроем его
                if (car.id_outgoing_return_stop != null)
                {
                    OutgoingDetentionReturn outgoing_return_stop = ef_out_dr.Context.Where(r => r.id == car.id_outgoing_return_stop).FirstOrDefault();
                    if (outgoing_return_stop != null)
                    {
                        outgoing_return_stop.date_stop = null;
                        outgoing_return_stop.change = DateTime.Now;
                        outgoing_return_stop.create_user = user;
                        ef_out_dr.Update(outgoing_return_stop); // обновим
                    }
                    car.id_outgoing_return_stop = null;
                }
                // Удалим информацию по документам
                // Проверим запись на вагон
                Outgoing_UZ_Vagon out_uz_vag = ef_out_uz_vag.Context.Where(v => v.id_car == id_outgoing_car).FirstOrDefault();
                if (out_uz_vag != null)
                {
                    // Удалим информацию по контейнерам
                    List<Outgoing_UZ_Vagon_Cont> list = ef_out_uz_vag_cont.Context.Where(c => c.id_vagon == out_uz_vag.id).ToList();
                    foreach (Outgoing_UZ_Vagon_Cont cont in list)
                    {
                        List<Outgoing_UZ_Cont_Pay> list_cont_pay = ef_out_uz_vag_cont_pay.Context.Where(c => c.id_cont == cont.id).ToList();
                        ef_out_uz_vag_cont_pay.Delete(list_cont_pay.Select(n => n.id).ToList()); // Удалим pay по контейнерам
                    }
                    ef_out_uz_vag_cont.Delete(list.Select(n => n.id).ToList()); // удалим контейнера
                                                                                // Удалим Акты
                    List<Outgoing_UZ_Vagon_Acts> list_act = ef_out_uz_vag_act.Context.Where(a => a.id_vagon == out_uz_vag.id).ToList();
                    ef_out_uz_vag_act.Delete(list_act.Select(n => n.id).ToList()); // удалим акты
                                                                                   // Удалим pay
                    List<Outgoing_UZ_Vagon_Pay> list_pay = ef_out_uz_vag_pay.Context.Where(p => p.id_vagon == out_uz_vag.id).ToList();
                    ef_out_uz_vag_pay.Delete(list_pay.Select(n => n.id).ToList()); // удалим акты
                                                                                   //TODO: ! добавить проверку количества вагонов в документе если = 1 или меньше удалить документ и Pay документа

                    // Удалим сам документ
                    ef_out_uz_vag.Delete(out_uz_vag.id);
                }
                // Обновим информацию о вагоне
                car.id_outgoing_uz_vagon = null;
                car.position_outgoing = null;
                car.date_outgoing_act = null;
                car.id_reason_discrepancy_amkr = null;
                car.id_reason_discrepancy_uz = null;
                car.note = null;
                car.outgoing = null;
                car.outgoing_user = null;
                car.change = DateTime.Now;
                car.change_user = user;
                // Состав
                OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == car.id_outgoing).FirstOrDefault();
                //int count_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList().Count();
                if (sostav != null && sostav.OutgoingCars.Where(c => c.outgoing != null).ToList().Count == 0)
                {
                    car.OutgoingSostav.status = 0;
                }
                car.OutgoingSostav.change = DateTime.Now;
                car.OutgoingSostav.change_user = user;
                ef_out_car.Update(car);// Обновим  вагон
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationReturnPresentWagon(id_outgoing_car={0}, user={1})",
                    id_outgoing_car, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Выполнить операцию предъявить состав на УЗ
        /// </summary>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="date_end_inspection_acceptance_delivery"></param>
        /// <param name="date_end_inspection_loader"></param>
        /// <param name="date_end_inspection_vagonnik"></param>
        /// <param name="date_readiness_uz"></param>
        /// <param name="date_outgoing"></param>
        /// <param name="date_outgoing_act"></param>
        /// <param name="status"></param>
        /// <param name="station_on"></param>
        /// <param name="route_sign"></param>
        /// <param name="composition_index"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationPresentSostav(long id_outgoing_sostav, DateTime date_end_inspection_acceptance_delivery,
            DateTime date_end_inspection_loader, DateTime date_end_inspection_vagonnik, DateTime date_readiness_uz,
            DateTime date_outgoing, DateTime? date_outgoing_act, int status, int station_on, bool route_sign, string composition_index, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == id_outgoing_sostav).FirstOrDefault();
                if (sostav == null) return (int)errors_base.not_outgoing_sostav_db;                     //В базе данных нет записи состава для оправки
                                                                                                        // Проверим состав откланен
                if (sostav.status == 4) return (int)errors_base.error_status_outgoing_sostav;           // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                                                                                                        // Сдается впервые?
                if (sostav.status < 2)
                {
                    sostav.status = 2;
                    // Если впервый раз сдаем тогда откорректируем вагоны
                    int count_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList().Count();
                    List<OutgoingCars> list_not_out_car = sostav.OutgoingCars.Where(c => c.outgoing == null).ToList();
                    if (count_car == 0) return (int)errors_base.not_outgoing_cars_db; // В базе данных нет записи по вагонам для отпправки
                                                                                      // Проверить есть вагоны которые не перенесли в левую часть, если да убрать вагоны и убрать блокировку
                    if (list_not_out_car != null && list_not_out_car.Count() > 0)
                    {
                        foreach (OutgoingCars car in list_not_out_car)
                        {
                            if (car.parent_wir_id == null)
                            {
                                // Это реальный вагон а не неактивная ссылка на изменения по задержанию
                                int result = OperationReturnProvideWagon(ref context, car, sostav.id_way_from, user);
                                if (result > 0)
                                {
                                    ef_out_car.Delete(car.id);
                                }
                            }

                        }
                    }

                }
                // Обновим состав
                //sostav.status = 2;
                sostav.date_end_inspection_acceptance_delivery = date_end_inspection_acceptance_delivery;
                sostav.date_end_inspection_loader = date_end_inspection_loader;
                sostav.date_end_inspection_vagonnik = date_end_inspection_vagonnik;
                sostav.date_readiness_uz = date_readiness_uz;
                sostav.date_outgoing = date_outgoing;
                sostav.date_outgoing_act = date_outgoing_act;
                sostav.id_station_on = station_on;
                sostav.route_sign = route_sign;
                sostav.composition_index = composition_index;
                sostav.change = DateTime.Now;
                sostav.change_user = user;
                ef_out_sostav.Update(sostav);
                int result_sostav = context.SaveChanges(); // Применить операции
                //TODO: ! Расчет платы выполняем в новом api (WSD/view/calc_wagon/outgoing/sostav/)
                //if (result_sostav >= 0)
                //{
                //    ResultUpdateIDWagon result_calc = CalcUsageFeeOfOutgoingSostav(id_outgoing_sostav, user);
                //    if (result_calc.result >= 0)
                //    {
                //        result_sostav += result_calc.result;
                //    }
                //    else
                //    {
                //        result_sostav = (int)errors_base.error_calc_usage_fee; //// Ошибка выполнения расчета платы за пользование
                //    }
                //}
                return result_sostav;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationPresentSostav(id_outgoing_sostav={0}, date_end_inspection_acceptance_delivery ={1},date_end_inspection_loader ={2}, date_end_inspection_vagonnik={3}, date_readiness_uz ={4}, date_outgoing ={5}, date_outgoing_act={6}, station_on={7}, route_sign={8}, composition_index={9}, user={10})",
                    id_outgoing_sostav, date_end_inspection_acceptance_delivery, date_end_inspection_loader, date_end_inspection_vagonnik, date_readiness_uz,
                    date_outgoing, date_outgoing_act, station_on, route_sign, composition_index, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Выполнить операцию вернуть сдачу состава 
        /// </summary>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationReturnPresentSostav(long id_outgoing_sostav, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == id_outgoing_sostav).FirstOrDefault();
                if (sostav == null) return (int)errors_base.not_outgoing_sostav_db; //В базе данных нет записи состава для оправки
                if (sostav.status != 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                int count_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList().Count();
                // Обновим состав
                sostav.status = count_car > 0 ? 1 : 0;
                sostav.date_end_inspection_acceptance_delivery = null;
                sostav.date_end_inspection_loader = null;
                sostav.date_end_inspection_vagonnik = null;
                sostav.date_readiness_uz = null;
                sostav.date_outgoing = null;
                sostav.date_outgoing_act = null;
                sostav.id_station_on = null;
                sostav.route_sign = null;
                sostav.composition_index = null;
                sostav.change = DateTime.Now;
                sostav.change_user = user;
                ef_out_sostav.Update(sostav);
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationReturnPresentSostav(id_outgoing_sostav={0}, user={1})",
                    id_outgoing_sostav, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }

        #endregion

        #region ОПЕРАЦИЯ "ОТПРАВКИ СОСТАВА НА УЗ"
        /// <summary>
        /// Отправить вагон на УЗ
        /// </summary>
        /// <param name="context"></param>
        /// <param name="car"></param>
        /// <param name="id_way_from"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int SendingWagonOnUZ(ref EFDbContext context, OutgoingCars car, int id_way_from, DateTime lead_time, string user)
        {
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);

                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.OutgoingSostav.status != 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                                                                                                          // найдем запись внутреннего перемещения
                WagonInternalRoutes wir = ef_wir.Context.Where(w => w.id_outgoing_car == car.id).FirstOrDefault();
                if (wir == null) return (int)errors_base.not_wir_db;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wir.GetLastMovement();
                if (wim == null) return (int)errors_base.not_wim_db; // В базе данных нет текущего положения
                if (wim.way_end != null || wim.id_way != id_way_from) return (int)errors_base.wagon_not_way; // Вагон не стоит на пути
                WagonInternalOperation wio = wir.GetLastOperation();
                if (wio == null) return (int)errors_base.not_wio_db; // В базе данных нет текущей операции
                if (wio.id_operation < 8 || wio.id_operation > 9) return (int)errors_base.wagon_not_operation; // текущая операция не предъявить вагон на УЗ
                                                                                                               // Все проверки прошел
                                                                                                               // Проверить сап исходящие, и если есть закроем
                EFSAPOutgoingSupply ef_sap_os = new EFSAPOutgoingSupply(context);
                SAPOutgoingSupply sap_os = ef_sap_os.Context.Where(s => s.id_outgoing_car == car.id).FirstOrDefault();
                if (sap_os != null)
                {
                    sap_os.close = DateTime.Now;
                    sap_os.close_user = user;
                    ef_sap_os.Update(sap_os);
                }
                // Установим и закроем операцию отпрака на УЗ             
                wir.SetOpenOperation(2, lead_time.AddMinutes(-10), null, null, null, null, null, user).SetCloseOperation(lead_time, null, user);
                wir.CloseWagon(lead_time, null, user);
                ef_wir.Update(wir);
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SendingWagonOnUZ(context={0}, car={1}, id_way_from={2}, lead_time={3}, user={4})",
                    context, car, id_way_from, lead_time, user), servece_owner, eventID);
                return (int)errors_base.global;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Отправить состав на УЗ
        /// </summary>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="lead_time"></param>
        /// <param name="composition_index"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultWagon OperationSendingSostavOnUZ(long id_outgoing_sostav, DateTime lead_time, string composition_index, string user)
        {
            OperationResultWagon rt = new OperationResultWagon();
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == id_outgoing_sostav).FirstOrDefault();
                if (sostav != null)
                {
                    // Состав определен
                    if (sostav.status == 2)
                    {
                        List<OutgoingCars> list_out_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList();
                        if (list_out_car != null && list_out_car.Count() > 0)
                        {
                            // Вагоны для отправки определены
                            //rt.count = list_out_car.Count();
                            // Пройдемся по вагонам
                            foreach (OutgoingCars car in list_out_car)
                            {
                                //if (car.num == 51231488)
                                //{
                                //    string s = "";
                                //}
                                int result = SendingWagonOnUZ(ref context, car, sostav.id_way_from, lead_time, user);
                                rt.SetResultOperation(result, car.num);
                            }
                            // Проверка на ошибку
                            if (rt.error == 0)
                            {
                                sostav.status = 3;
                                sostav.date_departure_amkr = lead_time;
                                sostav.composition_index = composition_index != null ? composition_index : sostav.composition_index;
                                sostav.change = DateTime.Now;
                                sostav.change_user = user;
                                ef_out_sostav.Update(sostav);
                                rt.SetResult(context.SaveChanges());
                                // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                                if (rt.result > 0)
                                {
                                    int result_rnw = RenumberingWagons(ref context, sostav.id_way_from, 1);
                                    if (result_rnw > 0)
                                    {
                                        // Применим перенумерацию
                                        context.SaveChanges();
                                    }
                                }
                            }
                            else
                            {
                                rt.SetResult((int)errors_base.error_save_changes); // Были ошибки по ходу выполнения всей операций
                            }
                        }
                        else
                        {
                            rt.SetResult((int)errors_base.not_outgoing_cars_db); // В базе данных нет записи по вагонам для отпправки
                        }
                    }
                    else
                    {
                        rt.SetResult((int)errors_base.error_status_outgoing_sostav); // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                    }
                }
                else
                {
                    rt.SetResult((int)errors_base.not_outgoing_sostav_db); //В базе данных нет записи состава для оправки
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationSendingSostavOnUZ(id_outgoing_sostav={0}, lead_time={1}, composition_index={2}, user={3})",
                    id_outgoing_sostav, lead_time, composition_index, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }



        #endregion

        #endregion

        #region АДМИНИСТРИРОВАНИЕ
        /// <summary>
        /// Закрыть вагоны принудительно
        /// </summary>
        /// <param name="list_id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int CloseWir(List<int> list_id, DateTime close_date, string note, string user)
        {
            ResultUpdateID res = new ResultUpdateID(list_id.Count());
            try
            {

                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                // Пройдемся по списку внутрених перемещений
                int count = list_id.Count();
                foreach (int id in list_id.ToList())
                {
                    WagonInternalRoutes wir = ef_wir.Context.Where(r => r.id == id).FirstOrDefault();
                    int result = 0;
                    ;
                    if (wir != null)
                    {
                        // Запись не закрыта
                        if (wir.close == null)
                        {
                            wir.CloseWagon(close_date, note, user); // Закроет все операции и дислокации
                            ef_wir.Update(wir);
                            result = ef_wir.Save();
                            //res.SetUpdateResult(result, id);
                        }
                        else
                        {
                            // Запись закрыта пропустить
                            result = 0;
                            //res.SetUpdateResult(result, id);
                        }
                    }
                    else
                    {
                        // Запись wir не найдена
                        result = (int)errors_base.not_wir_db;

                    }
                    res.SetUpdateResult(result, id);
                    Console.WriteLine("Обработал id = {0}, результат = {1}, осталось {2}", id, result, count--);
                }
                if (res.error == 0)
                {
                    res.SetResult(res.listResult.Count());                      // ОК   
                }
                else
                {
                    res.SetResult((int)errors_base.error_save_changes);      // Были ошибки по ходу выполнения операций       
                }

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CloseWir(list_id={0}, close_date={1}, note={2}, user={3})", list_id, close_date, note, user), servece_owner, eventID);
                res.SetResult((int)errors_base.global); // Ошибка
            }
            return res.result;
        }
        /// <summary>
        /// Закрыть вагоны принудительно
        /// </summary>
        /// <param name="list_id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int DeleteDoubleWir(List<int> list_id)
        {
            ResultUpdateID res = new ResultUpdateID(list_id.Count());
            try
            {

                EFDbContext context = new EFDbContext();

                EFWagonInternalMovement ef_wim = new EFWagonInternalMovement(context);
                EFWagonInternalOperation ef_wio = new EFWagonInternalOperation(context);
                int count = list_id.Count();
                // Пройдемся по списку внутрених перемещений
                foreach (int id in list_id.ToList())
                {
                    List<WagonInternalMovement> list_wim = ef_wim.Context.Where(m => m.id_wagon_internal_routes == id).OrderBy(c => c.id).ToList();
                    List<WagonInternalOperation> list_wio = ef_wio.Context.Where(m => m.id_wagon_internal_routes == id).OrderBy(c => c.id).ToList();

                    // Сгруппируем по путям роспуска
                    List<IGrouping<long?, WagonInternalMovement>> group_list_wim = list_wim
                                    .ToList()
                                    .GroupBy(w => w.parent_id)
                                    .ToList();
                    List<IGrouping<long?, WagonInternalOperation>> group_list_wio = list_wio
                                    .ToList()
                                    .GroupBy(w => w.parent_id)
                                    .ToList();
                    // Пройдемся по путям роспуска
                    foreach (IGrouping<long?, WagonInternalMovement> gr_wim in group_list_wim.ToList())
                    {
                        // Найдем задвоение
                        if (gr_wim.Count() > 1)
                        {
                            WagonInternalMovement wim_close = gr_wim.Where(m => m.way_end != null).FirstOrDefault();
                            if (wim_close != null)
                            {
                                // есть закрытая запись, удалить все не закрытые
                                List<WagonInternalMovement> list_wim_close = gr_wim.Where(m => m.way_end == null).ToList();
                                foreach (WagonInternalMovement del_wim in list_wim_close)
                                {
                                    ef_wim.Delete(del_wim.id);
                                }

                            }
                            else
                            {
                                // Нет закрытой записи, оставить одну с макс id
                                WagonInternalMovement wim_max = gr_wim.OrderByDescending(m => m.id).FirstOrDefault();
                                if (wim_max != null)
                                {
                                    long id_max = wim_max.id;
                                    foreach (WagonInternalMovement del_wim in gr_wim)
                                    {
                                        if (del_wim.id != id_max)
                                        {
                                            ef_wim.Delete(del_wim.id);
                                        }

                                    }
                                }

                            }
                        }
                    }
                    int result_wim = ef_wim.Save();

                    count--;
                    Console.WriteLine("Обработал wim id = {0}, результат = {1}, осталось {2}", id, result_wim, count);
                    // Пройдемся по операциям
                    foreach (IGrouping<long?, WagonInternalOperation> gr_wio in group_list_wio.ToList())
                    {
                        // Найдем задвоение
                        if (gr_wio.Count() > 1)
                        {
                            // Нет закрытой записи, оставить одну с макс id
                            WagonInternalOperation wio_max = gr_wio.OrderByDescending(m => m.id).FirstOrDefault();
                            if (wio_max != null)
                            {
                                long id_max = wio_max.id;
                                foreach (WagonInternalOperation del_wio in gr_wio)
                                {
                                    if (del_wio.id != id_max)
                                    {
                                        ef_wio.Delete(del_wio.id);
                                    }

                                }
                            }
                        }
                    }
                    int result_wio = ef_wio.Save();

                    Console.WriteLine("Обработал wio id = {0}, результат = {1}, осталось {2}", id, result_wio, count);
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DeleteDoubleWir(list_id={0})", list_id), servece_owner, eventID);
                res.SetResult((int)errors_base.global); // Ошибка
            }
            return res.result;
        }
        /// <summary>
        /// Административная функция вернуть вагон из отправки
        /// </summary>
        /// <param name="nums"></param>
        /// <param name="note"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ReturnWagons(List<int> nums, string note, string user)
        {
            ResultUpdateWagon res = new ResultUpdateWagon(nums.Count());
            try
            {

                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                //EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                // Пройдемся по списку внутрених перемещений
                int count = nums.Count();
                foreach (int num in nums.ToList())
                {
                    WagonInternalRoutes wir = context.GetLastWagon(num);
                    int result = 0;
                    if (wir != null)
                    {
                        // Запись закрыта
                        if (wir.close != null)
                        {
                            // Получим текущее положение вагона
                            WagonInternalMovement wim = wir.GetLastMovement();
                            WagonInternalOperation wio = wir.GetLastOperation();
                            if (wim != null)
                            {
                                if (wio != null)
                                {
                                    // Проверки закончились, выполним операции
                                    wir.id_outgoing_car = null;
                                    wir.note = note;
                                    wir.close = null;
                                    wir.close_user = null;
                                    // вернем на путь
                                    wim.way_end = null;
                                    wim.note = note;
                                    wim.close = null;
                                    wim.close_user = null;
                                    // Отментим отмену в операции
                                    wio.note = note;
                                    result = 3;
                                }
                                else
                                {
                                    result = (int)errors_base.not_wio_db;
                                }
                            }
                            else
                            {
                                result = (int)errors_base.not_wim_db;
                            }


                            //wir.CloseWagon(close_date, note, user); // Закроет все операции и дислокации
                            //ef_wir.Update(wir);
                            //result = ef_wir.Save();
                            //res.SetUpdateResult(result, num);
                        }
                        else
                        {
                            // Запись открыта пропустить
                            result = 0;

                        }
                    }
                    else
                    {
                        // Запись wir не найдена
                        result = (int)errors_base.not_wir_db;

                    }
                    if (result > 0)
                    {
                        result = context.SaveChanges();
                    }
                    res.SetUpdateResult(result, num);
                    Console.WriteLine("Обработал №  = {0}, результат = {1}, осталось {2}", num, result, count--);
                }
                if (res.error == 0)
                {
                    res.SetResult(res.listResult.Count());                      // ОК   
                }
                else
                {
                    res.SetResult((int)errors_base.error_save_changes);      // Были ошибки по ходу выполнения операций       
                }

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ReturnWagons(nums={0}, note={1}, user={2})", nums, note, user), servece_owner, eventID);
                res.SetResult((int)errors_base.global); // Ошибка
            }
            return res.result;
        }

        #endregion

        #region ОПЕРАЦИИ ОБНОВЛЕНИЯ ДОКУМЕНТОВ ЭПД

        #region ОПЕРАЦИИ ОБНОВЛЕНИЯ ДОКУМЕНТОВ ЭПД ПО ПРИБЫТИЮ
        /// <summary>
        /// Получить последний документ на промежуточном сервере и сервере SMS если установлен бит
        /// </summary>
        /// <param name="id_doc"></param>
        /// <param name="num_doc"></param>
        /// <returns></returns>
        public UZ.UZ_DOC getUpdate_UZ_DOC(string id_doc, string num_doc)
        {
            try
            {
                UZ.UZ_DOC uz_doc = null;
                List<UZ.UZ_DOC> result_uz_doc = new List<UZ.UZ_DOC>();


                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS();
                // Проверим по промежуточной базе
                UZ.UZ_DOC uz_doc_db = uz_sms.GetDocumentOfDB_NumDoc(id_doc);
                if (uz_doc_db != null) result_uz_doc.Add(uz_doc_db); // если есть добавим в список результатов

                // Проверим по sms УЗ (если признак искать в SMS - true)
                if (this.searsh_in_sms_arrival && !String.IsNullOrWhiteSpace(num_doc))
                {
                    //List<UZ.UZ_DOC> list_uz_doc_sms = uz_sms.GetUZ_DOC_Of_NumDoc(num_doc);
                    List<UZ.UZ_DOC_FULL> list_uz_doc_sms = uz_sms.Get_UZ_DOC_SMS_Of_NumDoc(num_doc);
                    if (list_uz_doc_sms != null && list_uz_doc_sms.Count() > 0)
                    {
                        UZ.UZ_DOC_FULL doc_full = list_uz_doc_sms.Where(d => d.id_doc == id_doc).OrderByDescending(c => c.revision).FirstOrDefault();
                        UZ.UZ_DOC doc = new UZ.UZ_DOC()
                        {
                            id_doc = doc_full.id_doc,
                            revision = doc_full.revision,
                            status = doc_full.status,
                            sender_code = doc_full.sender_code,
                            recipient_code = doc_full.recipient_code,
                            dt = doc_full.dt,
                            xml = doc_full.xml,
                            xml_final = doc_full.xml_final,
                            otpr = doc_full.otpr,

                        };
                        result_uz_doc.Add(doc);
                    }
                }
                uz_doc = result_uz_doc.OrderByDescending(v => v.revision).FirstOrDefault();
                return uz_doc;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("getUpdate_UZ_DOC(id_doc = {0}, num_doc = {1})", id_doc, num_doc), servece_owner, eventID);
                return null;// Ошибка
            }
        }
        /// <summary>
        /// Получить последний документ с сервера SMS (УЗ)
        /// </summary>
        /// <param name="id_doc"></param>
        /// <param name="num_doc"></param>
        /// <returns></returns>
        public UZ.UZ_DOC getUpdateSMS_UZ_DOC(string id_doc, string num_doc)
        {
            try
            {
                UZ.UZ_DOC uz_doc = null;
                List<UZ.UZ_DOC> result_uz_doc = new List<UZ.UZ_DOC>();


                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS();

                // Проверим по sms УЗ (если признак искать в SMS - true)
                if (!String.IsNullOrWhiteSpace(num_doc))
                {
                    //List<UZ.UZ_DOC> list_uz_doc_sms = uz_sms.GetUZ_DOC_Of_NumDoc(num_doc);
                    List<UZ.UZ_DOC_FULL> list_uz_doc_sms = uz_sms.Get_UZ_DOC_SMS_Of_NumDoc(num_doc);
                    if (list_uz_doc_sms != null && list_uz_doc_sms.Count() > 0)
                    {
                        //result_uz_doc.Add(list_uz_doc_sms.Where(d => d.id_doc == id_doc).OrderByDescending(c => c.revision).FirstOrDefault());
                        UZ.UZ_DOC_FULL doc_full = list_uz_doc_sms.Where(d => d.id_doc == id_doc).OrderByDescending(c => c.revision).FirstOrDefault();
                        UZ.UZ_DOC doc = new UZ.UZ_DOC()
                        {
                            id_doc = doc_full.id_doc,
                            revision = doc_full.revision,
                            status = doc_full.status,
                            sender_code = doc_full.sender_code,
                            recipient_code = doc_full.recipient_code,
                            dt = doc_full.dt,
                            xml = doc_full.xml,
                            xml_final = doc_full.xml_final,
                            otpr = doc_full.otpr,

                        };
                        result_uz_doc.Add(doc);
                    }
                }
                uz_doc = result_uz_doc.OrderByDescending(v => v.revision).FirstOrDefault();
                return uz_doc;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("getUpdateSMS_UZ_DOC(id_doc = {0}, num_doc = {1})", id_doc, num_doc), servece_owner, eventID);
                return null;// Ошибка
            }
        }
        /// <summary>
        /// Обновить и найти ЭПД
        /// </summary>
        /// <param name="context"></param>
        /// <param name="doc"></param>
        /// <param name="new_doc"></param>
        /// <param name="close"></param>
        /// <param name="close_message"></param>
        /// <returns></returns>
        public int Update_UZ_DOC(ref EFIDS.Concrete.EFDbContext context, UZ_DOC_Arrival doc, UZ.UZ_DOC new_doc, DateTime? close, string close_message)
        {
            try
            {
                if (context == null)
                {
                    context = new EFIDS.Concrete.EFDbContext();
                }
                EFIDS.Concrete.EFUZ_DOC ef_uz_doc = new EFIDS.Concrete.EFUZ_DOC(context);
                EFIDS.Entities.UZ_DOC uz_doc = ef_uz_doc.Context.Where(d => d.num_doc == doc.num_doc).FirstOrDefault();
                if (uz_doc != null)
                {
                    // Ревизия документа выше чем ревизия сохраненного документа
                    if (uz_doc.revision <= new_doc.revision)
                    {
                        string code_from = new_doc.sender_code != null ? new_doc.sender_code : "0";

                        uz_doc.num_doc = new_doc.id_doc;
                        uz_doc.revision = new_doc.revision;
                        uz_doc.num_uz = new_doc.otpr != null ? new_doc.otpr.nom_doc : null;
                        uz_doc.status = (int)new_doc.status;
                        uz_doc.code_from = code_from;
                        uz_doc.code_on = new_doc.recipient_code;
                        uz_doc.dt = new_doc.dt;
                        uz_doc.xml_doc = new_doc.xml;
                        uz_doc.close = close;
                        uz_doc.close_message = close_message;
                        ef_uz_doc.Update(uz_doc);
                        return 1;
                    }
                    else return 0; // пропущен
                }
                else return (int)errors_base.not_epd_document; // Нет ЭПД
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Update_UZ_DOC(context={0}, doc={1}, new_doc={2}, close={3}, close_message={4})", context, doc, new_doc, close, close_message), servece_owner, eventID);
                return (int)errors_base.global;// Ошибка
            }
        }
        /// <summary>
        /// Закрыть ЭПД
        /// </summary>
        /// <param name="context"></param>
        /// <param name="doc"></param>
        /// <param name="close"></param>
        /// <param name="close_message"></param>
        /// <returns></returns>
        public int Close_UZ_DOC(ref EFIDS.Concrete.EFDbContext context, UZ_DOC_Arrival doc, DateTime? close, string close_message)
        {
            try
            {
                if (context == null)
                {
                    context = new EFIDS.Concrete.EFDbContext();
                }
                EFIDS.Concrete.EFUZ_DOC ef_uz_doc = new EFIDS.Concrete.EFUZ_DOC(context);
                EFIDS.Entities.UZ_DOC uz_doc = ef_uz_doc.Context.Where(d => d.num_doc == doc.num_doc).FirstOrDefault();
                if (uz_doc != null)
                {
                    uz_doc.close = close;
                    uz_doc.close_message = close_message;
                    ef_uz_doc.Update(uz_doc);
                    return 1;

                }
                else return (int)errors_base.not_epd_document; // Нет ЭПД
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Close_UZ_DOC(context={0}, doc={1}, close={2}, close_message={3})", context, doc, close, close_message), servece_owner, eventID);
                return (int)errors_base.global;// Ошибка
            }
        }
        /// <summary>
        /// Обновить список ЭПД
        /// </summary>
        /// <param name="context"></param>
        /// <param name="res"></param>
        /// <param name="list_uz_doc"></param>
        /// <param name="searsh_uz"></param>
        public void Update_List_UZ_DOC(ref EFIDS.Concrete.EFDbContext context, ref ResultUpdateStringID res, List<UZ_DOC_Arrival> list_uz_doc, bool searsh_uz, int max_index)
        {
            try
            {
                string user = null;
                IDS_Arhiv ids_arhiv = new IDS_Arhiv(this.servece_owner);
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                int count = list_uz_doc.Count();
                int index = 0;
                // Начнем обработку раскредитованых с датой ниже мак даты хранения на сервере
                foreach (UZ_DOC_Arrival doc in list_uz_doc)
                {
                    int res_upd = 0;
                    if (doc.revision == 0)
                    {
                        res_upd = Close_UZ_DOC(ref context, doc, DateTime.Now, "ЭПД - ручной ввод, закрыт");
                        res.SetCloseResult(res_upd, doc.num_doc);
                        Console.WriteLine("ID документа {0}, № документа {1} - ЭПД - ручной ввод, закрыт", doc.num_doc, doc.num_uz);
                    }
                    else
                    {
                        DateTime date_exceeded = DateTime.Now.AddDays(-1 * this.day_arhive_epd_arrival);
                        Console.WriteLine("ID документа {0}, № документа {1}, осталось {2}", doc.num_doc, doc.num_uz, --count);
                        // Получим документ
                        UZ.UZ_DOC upd_doc_uz = getUpdate_UZ_DOC(doc.num_doc, doc.num_uz.ToString());
                        if (upd_doc_uz != null)
                        {
                            if (((int)upd_doc_uz.status) == 8) // 
                            {
                                // Достигли конца обновления

                                ResultUpdateID res_upd_arr = Update_Arrival_UZ_Doc(ref context, upd_doc_uz, user); // обновим документ прибытия в БД ИДС
                                //int res_pdf = ids_arhiv.Update_UZ_DOC_PDF(upd_doc_uz, user); // Обновим документ PDF после раскредитовки
                                res_upd = Update_UZ_DOC(ref context, doc, upd_doc_uz, DateTime.Now, "ЭПД найден в БД обновлен и закрыт.");
                                res.SetCloseResult(res_upd, doc.num_doc);
                                Console.WriteLine("ID документа {0}, № документа {1} - Найден в БД, обновлен и закрыт, код {2}", doc.num_doc, doc.num_uz, res_upd);
                            }
                            else
                            {
                                // еще требуется обновление
                                // Проверим дата обновления документа еще в диапазоне времени хранения на сервере УЗ
                                if ((doc.dt != null && doc.dt > date_exceeded) || (doc.dt == null))
                                {
                                    // Дата обновления документа еще в диапазоне времени хранения на сервере УЗ или не определена
                                    res_upd = Update_UZ_DOC(ref context, doc, upd_doc_uz, null, "ЭПД найден в БД и обновлен");
                                    res.SetUpdateResult(res_upd, doc.num_doc);
                                    Console.WriteLine("ID документа {0}, № документа {1} - Найден в БД и обновлен, код {2}", doc.num_doc, doc.num_uz, res_upd);
                                }
                                else
                                {
                                    // Достигли конца обновления, документ уже не доступен на УЗ
                                    res_upd = Update_UZ_DOC(ref context, doc, upd_doc_uz, DateTime.Now, "ЭПД найден в БД обновлен и закрыт по времени.");
                                    res.SetCloseResult(res_upd, doc.num_doc);
                                    Console.WriteLine("ID документа {0}, № документа {1} - Найден в БД, обновлен и закрыт по времени, код {2}", doc.num_doc, doc.num_uz, res_upd);
                                }
                            }
                        }
                        else
                        {
                            // Искать на сервере УЗ?
                            if (searsh_uz == true)
                            {
                                // Поиск на сервере УЗ 
                                UZ.UZ_DOC sms_doc_uz = getUpdateSMS_UZ_DOC(doc.num_doc, doc.num_uz.ToString());
                                if (sms_doc_uz != null)
                                {
                                    // ЭПД найден на УЗ
                                    if (((int)sms_doc_uz.status) == 8)
                                    {
                                        // Достигли конца обновления
                                        ResultUpdateID res_upd_arr = Update_Arrival_UZ_Doc(ref context, upd_doc_uz, user); // обновим документ прибытия в БД ИДС
                                        //int res_pdf = ids_arhiv.Update_UZ_DOC_PDF(upd_doc_uz, user); // Обновим документ PDF после раскредитовки
                                        res_upd = Update_UZ_DOC(ref context, doc, sms_doc_uz, DateTime.Now, "ЭПД найден на УЗ обновлен и закрыт.");
                                        res.SetCloseResult(res_upd, doc.num_doc);
                                        Console.WriteLine("ID документа {0}, № документа {1} - Найден на УЗ, обновлен и закрыт, код {2}", doc.num_doc, doc.num_uz, res_upd);
                                    }
                                    else
                                    {
                                        // еще требуется обновление
                                        res_upd = Update_UZ_DOC(ref context, doc, sms_doc_uz, null, "ЭПД найден на УЗ и обновлен");
                                        res.SetUpdateResult(res_upd, doc.num_doc);
                                        Console.WriteLine("ID документа {0}, № документа {1} - Найден на УЗ и обновлен, код {2}", doc.num_doc, doc.num_uz, res_upd);
                                    }
                                }
                                else
                                {
                                    // ЭПД не найдено на УЗ
                                    res_upd = Close_UZ_DOC(ref context, doc, DateTime.Now, "ЭПД не найден в БД и УЗ, закрыт");
                                    res.SetCloseResult(res_upd, doc.num_doc);
                                    Console.WriteLine("ID документа {0}, № документа {1} - !Не найден в БД и на УЗ, закрыт", doc.num_doc, doc.num_uz);
                                }
                            }
                            else
                            {
                                res_upd = Close_UZ_DOC(ref context, doc, DateTime.Now, "ЭПД не найден в БД и закрыт");
                                res.SetCloseResult(res_upd, doc.num_doc);
                                Console.WriteLine("ID документа {0}, № документа {1} - !Не найден в БД, закрыт", doc.num_doc, doc.num_uz);
                            }
                        }
                    }
                    index++;
                    if (max_index > 0 && index > max_index)
                    {
                        break;
                    }
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Update_List_UZ_DOC(context={0}, res={1}, list_uz_doc={2}, searsh_uz={3})", context, res, list_uz_doc, searsh_uz), servece_owner, eventID);
            }
        }
        // TODO: !Убрал использовал для проверки
        //public int Update_Arrival_UZ_Doc_Of_ID_DOC(string id_doc, string user)
        //{
        //    try
        //    {
        //        EFIDS.Concrete.EFDbContext context = new EFIDS.Concrete.EFDbContext();
        //        string sql = "select * from [IDS].[get_view_uz_doc_arrival]() where num_doc =N'" + id_doc + "'";
        //        UZ_DOC_Arrival uz_doc = context.Database.SqlQuery<UZ_DOC_Arrival>(sql).FirstOrDefault();
        //        if (uz_doc == null) return 0;
        //        UZ.UZ_DOC upd_doc_uz = getUpdate_UZ_DOC(uz_doc.num_doc, uz_doc.num_uz.ToString());
        //        if (upd_doc_uz == null)
        //        {
        //            upd_doc_uz = getUpdateSMS_UZ_DOC(uz_doc.num_doc, uz_doc.num_uz.ToString());
        //        }
        //        if (upd_doc_uz == null) return 0;

        //        ResultUpdateID res = Update_Arrival_UZ_Doc(ref context, upd_doc_uz, user);

        //        return 0;

        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("Update_Arrival_UZ_Doc(id_doc_uz={0}, user={1})", id_doc, user), servece_owner, eventID);
        //        return (int)errors_base.global; ;
        //    }
        //}
        /// <summary>
        /// Обновить БД ИДС документов по прибытию по ЭПД (Платильщик по прибытию, тариф при выдачи по вагонам)
        /// </summary>
        /// <param name="context"></param>
        /// <param name="doc_uz"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateID Update_Arrival_UZ_Doc(ref EFIDS.Concrete.EFDbContext context, UZ.UZ_DOC doc_uz, string user)
        {
            ResultUpdateID result = new ResultUpdateID(0);
            try
            {
                if (doc_uz == null)
                {
                    result.SetResult((int)errors_base.not_input_value);
                    return result;// Ошибка нет входных данных
                }
                if (doc_uz.otpr == null || doc_uz.otpr.pl.Count() == 0)
                {
                    result.SetResult(0);
                    return result;// Нет документа ЭПД или отсутсвует PL              
                }
                IDS_Directory ids_dir = new IDS_Directory(this.servece_owner);
                EFArrival_UZ_Vagon ef_arr_uz_doc_vag = new EFArrival_UZ_Vagon(context);
                EFArrival_UZ_Document ef_arr_uz_doc = new EFArrival_UZ_Document(context);
                Arrival_UZ_Document doc_vag = ef_arr_uz_doc.Context.FirstOrDefault(v => v.id_doc_uz == doc_uz.id_doc);
                if (doc_vag == null)
                {
                    result.SetResult((int)errors_base.not_inp_uz_doc_db);
                    return result; // В базе данных нет записи документа на состав.          
                }

                doc_vag.date_otpr = doc_uz.otpr.date_otpr;
                doc_vag.srok_end = doc_uz.otpr.srok_end;
                doc_vag.date_grpol = doc_uz.otpr.date_grpol;
                doc_vag.date_pr = doc_uz.otpr.date_pr;
                doc_vag.date_vid = doc_uz.otpr.date_vid;

                List<Arrival_UZ_Vagon> list_vagon = doc_vag.Arrival_UZ_Vagon.ToList();
                result.count = list_vagon.Count();
                bool upd_pl = false;
                // Проверим если нет платильщика по прибытию, обновим его из ЭПД
                if (doc_vag.code_payer_arrival == null)
                {
                    foreach (PL pl in doc_uz.otpr.pl)
                    {
                        if (pl.type == "1")
                        {
                            string kod_plat = pl.kod_plat;
                            string name_plat = pl.name_plat;
                            //Directory_PayerArrival dir_pa = ids_dir.GetDirectory_PayerArrival(ref context, kod_plat, name_plat, true, user);
                            Directory_PayerArrival dir_pa = ids_dir.GetDirectory_PayerArrival(kod_plat, name_plat, true, user);
                            if (dir_pa != null)
                            {
                                doc_vag.code_payer_arrival = dir_pa.code;
                                doc_vag.change = DateTime.Now;
                                doc_vag.change_user = user;
                                ef_arr_uz_doc.Update(doc_vag);
                                upd_pl = true;
                                result.result = result.result >= 0 ? ++result.result : result.result;
                                Console.WriteLine("Документ по прибытию БД ИДС ID:{0} - добавлен платильщик по прибытию, Код:{1}", doc_vag.id, dir_pa.code);
                            }
                        }
                    }
                }
                result.SetUpdateResult(upd_pl ? 1 : 0, doc_vag.id, 0); //  Обновил информацию по документу
                                                                       // проверим есть информация по вагонам в ЭПД
                if (doc_uz.otpr != null && doc_uz.otpr.vagon != null && doc_uz.otpr.vagon.Count() > 0)
                {
                    foreach (Arrival_UZ_Vagon vag in list_vagon)
                    {
                        bool upd = false;
                        VAGON vagon = doc_uz.otpr.vagon.ToList().FirstOrDefault(w => w.nomer == vag.num.ToString());
                        if (vagon != null && vagon.pay_v != null && vagon.pay_v.Count() > 0)
                        {

                            int summ = 0;
                            foreach (PAY_V pay in vagon.pay_v)
                            {
                                if (pay.kod == "001" || pay.kod == "022")
                                {
                                    summ += pay.summa != null ? (int)pay.summa : 0;
                                }
                            }
                            if (summ > 0 && vag.pay_summa != summ)
                            {
                                vag.pay_summa = summ;
                                vag.change = DateTime.Now;
                                vag.change_user = user;
                                ef_arr_uz_doc_vag.Update(vag);
                                upd = true;
                                result.result = result.result >= 0 ? ++result.result : result.result;
                                Console.WriteLine("Документ по прибытию БД ИДС ID:{0}, вагон №{1} - добавлен тариф при выдаче :{2}", doc_vag.id, vag.num, summ);
                            }
                        }
                        result.SetUpdateResult(upd ? 1 : 0, vag.id, 1); //  Обновил информацию по вагону
                    }
                }
                ;
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Update_Arrival_UZ_Doc(context={0}, doc_uz={1}, user={2})", context, doc_uz, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;// Ошибка
            }
        }
        /// <summary>
        /// Обновим документы по прибытию
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateArrivalEPD()
        {
            try
            {
                DateTime start = DateTime.Now;
                ResultUpdateStringID res = new ResultUpdateStringID(0);
                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);

                EFIDS.Concrete.EFDbContext context_ids = new EFIDS.Concrete.EFDbContext();

                // Выполним запрос и получим все ЭПД с признапком не закрыт
                string sql = "select * from [IDS].[get_view_uz_doc_arrival]() where [close] is null";
                //string sql = "select * from [IDS].[get_view_uz_doc_arrival]() where [dt]>= '2022-09-01 00:00:00'";
                List<UZ_DOC_Arrival> list_uz_doc = context_ids.Database.SqlQuery<UZ_DOC_Arrival>(sql).ToList();
                res.count = list_uz_doc != null ? list_uz_doc.Count() : 0;
                List<UZ_DOC_Arrival> uz_doc_ids_uncredited = new List<UZ_DOC_Arrival>();
                List<UZ_DOC_Arrival> uz_doc_ids_open = new List<UZ_DOC_Arrival>();
                // Проверим список получен?
                if (list_uz_doc != null && list_uz_doc.Count() > 0)
                {
                    // Да список получен, продолжим обработку.
                    uz_doc_ids_uncredited = list_uz_doc.Where(d => d.status == 8).ToList(); // выбрать раскредитованых
                    uz_doc_ids_open = list_uz_doc.Where(d => d.status != 8).ToList(); // выбрать не раскредитованые
                                                                                      //uz_doc_ids_open = uz_doc_ids_open.Where(d => d.num_doc.Trim() == "35000000000533640749").ToList();
                                                                                      // Начнем обработку раскредитованых
                    if (uz_doc_ids_uncredited != null && uz_doc_ids_uncredited.Count() > 0)
                    {
                        List<UZ_DOC_Arrival> uz_doc_ids_uncredited_null = uz_doc_ids_uncredited.Where(d => d.dt == null).ToList(); // выбрать раскредитованых с датой обновления пусто
                        DateTime date_exceeded = DateTime.Now.AddDays(-1 * this.day_arhive_epd_arrival);
                        List<UZ_DOC_Arrival> uz_doc_ids_uncredited_exceeded = uz_doc_ids_uncredited.Where(d => d.dt < date_exceeded).ToList(); // выбрать раскредитованых с датой обновления ниже мак даты хранения на сервере
                        List<UZ_DOC_Arrival> uz_doc_ids_uncredited_not_reached = uz_doc_ids_uncredited.Where(d => d.dt >= date_exceeded).ToList(); // выбрать раскредитованых с датой обновления в диапазоне периода хранения данных на сервере.
                                                                                                                                                   // -----------------------------------------------------------------------------------------
                                                                                                                                                   // Начнем обработку раскредитованых с датой обновления пусто
                        Update_List_UZ_DOC(ref context_ids, ref res, uz_doc_ids_uncredited_null, false, 0);
                        // -----------------------------------------------------------------------------------------
                        // Начнем обработку раскредитованых с датой ниже мак даты хранения на сервере
                        Update_List_UZ_DOC(ref context_ids, ref res, uz_doc_ids_uncredited_exceeded, false, 0);
                        // -----------------------------------------------------------------------------------------
                        // Начнем обработку раскредитованых с датой обновления в диапазоне периода хранения данных на сервере
                        Update_List_UZ_DOC(ref context_ids, ref res, uz_doc_ids_uncredited_not_reached, true, 0);

                    }
                    // Начнем обработку не раскредитованых
                    if (uz_doc_ids_open != null && uz_doc_ids_open.Count() > 0)
                    {
                        List<UZ_DOC_Arrival> uz_doc_ids_open_null = uz_doc_ids_open.Where(d => d.dt == null).ToList(); // выбрать раскредитованых с датой обновления пусто
                        DateTime date_exceeded = DateTime.Now.AddDays(-1 * this.day_arhive_epd_arrival);
                        List<UZ_DOC_Arrival> uz_doc_ids_open_exceeded = uz_doc_ids_open.Where(d => d.dt < date_exceeded).ToList(); // выбрать раскредитованых с датой обновления ниже мак даты хранения на сервере
                        List<UZ_DOC_Arrival> uz_doc_ids_open_not_reached = uz_doc_ids_open.Where(d => d.dt >= date_exceeded).ToList(); // выбрать раскредитованых с датой обновления в диапазоне периода хранения данных на сервере.
                                                                                                                                       // -----------------------------------------------------------------------------------------
                                                                                                                                       // Начнем обработку раскредитованых с датой обновления пусто
                        Update_List_UZ_DOC(ref context_ids, ref res, uz_doc_ids_open_null, false, 0);
                        // -----------------------------------------------------------------------------------------
                        // Начнем обработку раскредитованых с датой ниже мак даты хранения на сервере
                        Update_List_UZ_DOC(ref context_ids, ref res, uz_doc_ids_open_exceeded, false, 20000);
                        // -----------------------------------------------------------------------------------------
                        // Начнем обработку раскредитованых с датой обновления в диапазоне периода хранения данных на сервере
                        Update_List_UZ_DOC(ref context_ids, ref res, uz_doc_ids_open_not_reached, true, 0);

                    }
                }
                // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                if (res.error == 0)
                {
                    res.SetResult(context_ids.SaveChanges());
                }
                string mess = String.Format("Операция обновления ЭПД по прибытию. Код выполнения = {0}. Результат обновления [определено {1} документов (из них раскредетовано но не закрыто : {2}, не раскредетовано : {3} ), обновлено {4}, пропущено {5}, закрыто {6}, ошибок обновления {7}].",
                    res.result, res.count, uz_doc_ids_uncredited.Count(), uz_doc_ids_open.Count(), res.update, res.skip, res.close, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция обновления ЭПД по прибытию"), start, stop, res.result);
                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateArrivalEPD()"), servece_owner, eventID);
                return (int)errors_base.global;// Ошибка
            }
        }
        /// <summary>
        /// Метод поиска документа ЭПД в БД ИДС (Таблица UZ_DOC), если документа нет, документ ищим в промежуточной базе (таблица [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data]),
        /// если документа нет в промежуточной базе и стоит признак search_sms = true, тогда документ ищим на УЗ через модуль SMS.
        /// если документ найден и стоит признак add = true, тогда документ будет сохранен в БД ИДС (Таблица UZ_DOC)
        /// </summary>
        /// <param name="num_doc"></param>
        /// <param name="num"></param>
        /// <param name="add"></param>
        /// <param name="search_sms"></param>
        /// <returns></returns>
        public ResultObject OperationUpdateUZ_DOC(string num_doc, int num, bool add, bool search_sms)
        {
            ResultObject result = new ResultObject();
            try
            {
                EFDbContext context = new EFDbContext();
                EFUZ_DOC ef_uz_doc = new EFUZ_DOC(context);
                UZ_SMS uz_sms = new UZ_SMS();

                if (string.IsNullOrWhiteSpace(num_doc))
                {
                    result.result = (int)errors_base.not_input_value; // Ошибка входные параметры
                    return result;
                }

                int doc_num = int.Parse(num_doc);
                // Найдем документ в БД ИДС
                EFIDS.Entities.UZ_DOC uz_doc = ef_uz_doc.Context.Where(d => d.num_uz == doc_num).FirstOrDefault();
                if (uz_doc != null)
                {
                    uz_doc = IsWagonOfUZ_DOC(num, uz_doc) ? uz_doc : null;
                }
                if (uz_doc == null)
                {
                    // Документа нет в БД ИДС, продолжим поиск в промежуточной

                    // Проверим по промежуточной базе
                    UZ_DOC_FULL doc = uz_sms.Get_UZ_DOC_SDB_Of_Num_NumDoc(num, doc_num);
                    if (doc == null && search_sms)
                    {
                        // Документа нет в промежуточной базе, продолжим поиск в СМС
                        List<UZ_DOC_FULL> docs = uz_sms.Get_UZ_DOC_SMS_Of_NumDoc(num_doc); //num_doc
                        if (docs != null && docs.Count() > 0)
                        {
                            doc = docs[0];
                        }
                    }
                    // если документ найден doc=UZ_DOC_FULL
                    if (doc != null)
                    {
                        // преобразуем и обновим в EFIDS.Entities.UZ_DOC
                        uz_doc = UpdateUZ_DOC(ref context, doc, add);
                        if (uz_doc != null)
                        {
                            uz_doc = IsWagonOfUZ_DOC(num, uz_doc) ? uz_doc : null;
                        }
                        //result.obj = uz_doc;
                    }
                }
                // если документ найден и преобразован uz_doc=EFIDS.Entities.UZ_DOC
                if (uz_doc != null)
                {
                    // Выполним обновление в базе данных
                    if (context.Entry(uz_doc).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        if (context.Entry(uz_doc).State == System.Data.Entity.EntityState.Added)
                        {
                            result.mode = mode_obj.add;
                        }
                        if (context.Entry(uz_doc).State == System.Data.Entity.EntityState.Modified)
                        {
                            result.mode = mode_obj.update;
                        }
                        result.result = context.SaveChanges();
                    }
                    else
                    {
                        result.mode = mode_obj.not;
                    }
                }
                result.obj = uz_doc;
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateUZ_DOC(num_doc={0}, num={1}, add={2}, search_sms={3})", num_doc, num, add, search_sms), servece_owner, eventID);
                result.result = (int)errors_base.global;// Ошибка
                return result;
            }
        }
        /// <summary>
        /// Метод поиска документа ЭПД (по номеру вагона, времени прибытия, грузополучателям, станциям прибытия) в промежуточной базе (таблица [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data]),
        /// если документа нет в промежуточной базе и стоит признак search_sms = true, тогда документ ищим на УЗ через модуль SMS.
        /// если документ найден и стоит признак add = true, тогда документ будет сохранен или обновлен в БД ИДС (Таблица UZ_DOC)
        /// </summary>
        /// <param name="num"></param>
        /// <param name="consignees"></param>
        /// <param name="stations"></param>
        /// <param name="dt_arrival"></param>
        /// <param name="period"></param>
        /// <param name="add"></param>
        /// <param name="search_sms"></param>
        /// <returns></returns>
        public ResultObject OperationUpdateUZ_DOC(int num, List<int> consignees, List<int> stations, DateTime? dt_arrival, int period, bool add, bool search_sms)
        {
            ResultObject result = new ResultObject();
            try
            {
                EFDbContext context = new EFDbContext();
                EFUZ_DOC ef_uz_doc = new EFUZ_DOC(context);
                EFIDS.Entities.UZ_DOC uz_doc = null;
                // Документа нет в БД ИДС, продолжим поиск в промежуточной
                UZ_SMS uz_sms = new UZ_SMS();
                // Проверим по промежуточной базе
                UZ_DOC_FULL doc = uz_sms.Get_UZ_DOC_SDB_Of_Num_Date(num, consignees, stations, dt_arrival, period);
                if (doc == null && search_sms)
                {
                    // Документа нет в промежуточной базе, продолжим поиск в СМС
                    List<UZ_DOC_FULL> docs = uz_sms.Get_UZ_DOC_SMS_Of_NumWagon(num.ToString(), null); //num_doc

                    if (docs != null && docs.Count() > 0)
                    {
                        List<UZ_DOC_FULL> list_doc = docs.Where(d => d.otpr.nom_doc != null).OrderByDescending(c => c.otpr.srok_end).ToList();
                        if (list_doc != null && list_doc.Count() > 0)
                        {
                            foreach (UZ_DOC_FULL docf in list_doc)
                            {
                                DateTime? end_date = docf.otpr != null ? docf.otpr.srok_end : null;
                                DateTime? date_otpr = docf.otpr != null ? docf.otpr.date_otpr : null;
                                if (dt_arrival != null && end_date != null && dt_arrival <= end_date && date_otpr != null && date_otpr < dt_arrival)
                                {
                                    // Этот документ подходит
                                    doc = docf;
                                    break;
                                }
                            }
                        }
                    }
                }
                // если документ найден doc=UZ_DOC_FULL
                if (doc != null)
                {
                    // преобразуем и обновим в EFIDS.Entities.UZ_DOC
                    uz_doc = UpdateUZ_DOC(ref context, doc, add);
                    result.obj = uz_doc;
                }
                // если документ найден и преобразован uz_doc=EFIDS.Entities.UZ_DOC
                if (uz_doc != null)
                {
                    // Выполним обновление в базе данных
                    if (context.Entry(uz_doc).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        if (context.Entry(uz_doc).State == System.Data.Entity.EntityState.Added)
                        {
                            result.mode = mode_obj.add;
                        }
                        if (context.Entry(uz_doc).State == System.Data.Entity.EntityState.Modified)
                        {
                            result.mode = mode_obj.update;
                        }
                        result.result = context.SaveChanges();
                    }
                    else
                    {
                        result.mode = mode_obj.not;
                    }
                }
                result.obj = uz_doc;
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateUZ_DOC(num={0}, consignees={1}, stations={2}, dt_arrival={3}, period={4}, add={5}, search_sms={6})", num, consignees, stations, dt_arrival, period, add, search_sms), servece_owner, eventID);
                result.result = (int)errors_base.global;// Ошибка
                return result;
            }
        }
        /// <summary>
        /// Метод поиска документа ЭПД (по номеру вагона, времени прибытия, грузополучателям, станциям прибытия) в промежуточной базе (таблица [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data]),
        /// если документа нет в промежуточной базе и стоит признак search_sms = true, тогда документ ищим на УЗ через модуль SMS.
        /// если документ найден и стоит признак add = true, тогда документ будет сохранен или обновлен в БД ИДС (Таблица UZ_DOC)
        /// </summary>
        /// <param name="num"></param>
        /// <param name="dt_arrival"></param>
        /// <param name="add"></param>
        /// <param name="search_sms"></param>
        /// <returns></returns>
        public ResultObject OperationUpdateUZ_DOC(int num, DateTime? dt_arrival, bool add, bool search_sms)
        {
            ResultObject result = new ResultObject();
            try
            {
                result = OperationUpdateUZ_DOC(num, this.list_consignees_searsh_arrival_epd, this.list_stations_searsh_arrival_epd, dt_arrival, this.min_period_searsh_arrival_epd, add, search_sms);
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateUZ_DOC(num={0}, dt_arrival={1}, add={2}, search_sms={3})", num, dt_arrival, add, search_sms), servece_owner, eventID);
                result.result = (int)errors_base.global;// Ошибка
                return result;
            }
        }
        /// <summary>
        /// Метод поиска документа ЭПД (по номеру вагона, времени последней сдачи и текущего приема, грузополучателям, станциям прибытия) в промежуточной базе (таблица [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data]),
        /// если документа нет в промежуточной базе и стоит признак search_sms = true, тогда документ ищим на УЗ через модуль SMS.
        /// если документ найден и стоит признак add = true, тогда документ будет сохранен или обновлен в БД ИДС (Таблица UZ_DOC)
        /// </summary>
        /// <param name="num"></param>
        /// <param name="consignees"></param>
        /// <param name="stations"></param>
        /// <param name="dt_old_outgoing"></param>
        /// <param name="dt_adoption"></param>
        /// <param name="period"></param>
        /// <param name="add"></param>
        /// <param name="search_sms"></param>
        /// <returns></returns>
        public ResultObject OperationUpdateUZ_DOC(int num, List<int> consignees, List<int> stations, DateTime? dt_old_outgoing, DateTime dt_adoption, int period, bool add, bool search_sms)
        {
            ResultObject result = new ResultObject();
            try
            {
                EFDbContext context = new EFDbContext();
                EFUZ_DOC ef_uz_doc = new EFUZ_DOC(context);
                EFIDS.Entities.UZ_DOC uz_doc = null;
                // Документа нет в БД ИДС, продолжим поиск в промежуточной
                UZ_SMS uz_sms = new UZ_SMS();
                // Проверим по промежуточной базе
                UZ_DOC_FULL doc = uz_sms.Get_UZ_DOC_SDB_Of_Num_Date(num, consignees, stations, dt_old_outgoing, dt_adoption, period);
                if (doc == null && search_sms)
                {
                    // Документа нет в промежуточной базе, продолжим поиск в СМС
                    List<UZ_DOC_FULL> docs = uz_sms.Get_UZ_DOC_SMS_Of_NumWagon(num.ToString(), null); //num_doc

                    if (docs != null && docs.Count() > 0)
                    {
                        List<UZ_DOC_FULL> list_doc = docs.Where(d => d.otpr.nom_doc != null).OrderByDescending(c => c.otpr.srok_end).ToList();
                        if (list_doc != null && list_doc.Count() > 0)
                        {
                            foreach (UZ_DOC_FULL docf in list_doc)
                            {
                                DateTime? date_pr = docf.otpr != null ? docf.otpr.date_pr : null;
                                DateTime? date_otpr = docf.otpr != null ? docf.otpr.date_otpr : null;
                                if (dt_old_outgoing != null && date_otpr > dt_old_outgoing && date_pr < dt_adoption)
                                {
                                    // Этот документ подходит
                                    doc = docf;
                                    break;
                                }
                            }
                        }
                    }
                }
                // если документ найден doc=UZ_DOC_FULL
                if (doc != null)
                {
                    // преобразуем и обновим в EFIDS.Entities.UZ_DOC
                    uz_doc = UpdateUZ_DOC(ref context, doc, add);
                    result.obj = uz_doc;
                }
                // если документ найден и преобразован uz_doc=EFIDS.Entities.UZ_DOC
                if (uz_doc != null)
                {
                    // Выполним обновление в базе данных
                    if (context.Entry(uz_doc).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        if (context.Entry(uz_doc).State == System.Data.Entity.EntityState.Added)
                        {
                            result.mode = mode_obj.add;
                        }
                        if (context.Entry(uz_doc).State == System.Data.Entity.EntityState.Modified)
                        {
                            result.mode = mode_obj.update;
                        }
                        result.result = context.SaveChanges();
                    }
                    else
                    {
                        result.mode = mode_obj.not;
                    }
                }
                result.obj = uz_doc;
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateUZ_DOC(num={0}, consignees={1}, stations={2}, dt_old_outgoing={1}, dt_adoption={2}, period={4}, add={5}, search_sms={6})", num, consignees, stations, dt_old_outgoing, dt_adoption, period, add, search_sms), servece_owner, eventID);
                result.result = (int)errors_base.global;// Ошибка
                return result;
            }
        }
        /// <summary>
        /// Метод поиска документа ЭПД (по номеру вагона, времени последней сдачи и текущего приема, грузополучателям, станциям прибытия) в промежуточной базе (таблица [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data]),
        /// если документа нет в промежуточной базе и стоит признак search_sms = true, тогда документ ищим на УЗ через модуль SMS.
        /// если документ найден и стоит признак add = true, тогда документ будет сохранен или обновлен в БД ИДС (Таблица UZ_DOC)
        /// </summary>
        /// <param name="num"></param>
        /// <param name="dt_old_outgoing"></param>
        /// <param name="dt_adoption"></param>
        /// <param name="add"></param>
        /// <param name="search_sms"></param>
        /// <returns></returns>
        public ResultObject OperationUpdateUZ_DOC(int num, DateTime? dt_old_outgoing, DateTime dt_adoption, bool add, bool search_sms)
        {
            ResultObject result = new ResultObject();
            try
            {
                result = OperationUpdateUZ_DOC(num, this.list_consignees_searsh_arrival_epd, this.list_stations_searsh_arrival_epd, dt_old_outgoing, dt_adoption, this.min_period_searsh_arrival_epd, add, search_sms);
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateUZ_DOC(num={0}, dt_old_outgoing={1}, dt_adoption={2}, add={3}, search_sms={4})", num, dt_old_outgoing, dt_adoption, add, search_sms), servece_owner, eventID);
                result.result = (int)errors_base.global;// Ошибка
                return result;
            }
        }

        /// <summary>
        /// Метод добавить или обновить EFIDS.Entities.UZ_DOC, обновление произойдет если ревизия документа будет отличатся
        /// </summary>
        /// <param name="context"></param>
        /// <param name="uz_doc"></param>
        /// <param name="update"></param>
        /// <returns></returns>
        public EFIDS.Entities.UZ_DOC UpdateUZ_DOC(ref EFDbContext context, EFIDS.Entities.UZ_DOC uz_doc, bool update)
        {
            try
            {
                EFUZ_DOC ef_uz_doc = new EFUZ_DOC(context);
                // Найдем документ в БД ИДС
                EFIDS.Entities.UZ_DOC doc = ef_uz_doc.Context.Where(d => d.num_doc == uz_doc.num_doc).FirstOrDefault();
                if (doc == null)
                {
                    if (update) ef_uz_doc.Add(uz_doc);
                    return uz_doc;
                }
                else
                {
                    if (doc.revision < uz_doc.revision)
                    {
                        doc.revision = uz_doc.revision;
                        doc.num_uz = uz_doc.num_uz;
                        doc.status = (int)uz_doc.status;
                        doc.code_from = uz_doc.code_from;
                        doc.code_on = uz_doc.code_on;
                        doc.dt = uz_doc.dt;
                        doc.xml_doc = uz_doc.xml_doc;

                        if (update) ef_uz_doc.Update(doc);
                    }
                    return doc;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateUZ_DOC(context={0}, uz_doc={1}, update={2} )", context, uz_doc, update), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод добавить или обновить EFIDS.Entities.UZ_DOC преобразовав его из UZ_DOC_FULL, обновление произойдет если ревизия документа будет отличатся
        /// </summary>
        /// <param name="context"></param>
        /// <param name="uz_doc_full"></param>
        /// <param name="update"></param>
        /// <returns></returns>
        public EFIDS.Entities.UZ_DOC UpdateUZ_DOC(ref EFDbContext context, UZ_DOC_FULL uz_doc_full, bool update)
        {
            try
            {
                EFUZ_DOC ef_uz_doc = new EFUZ_DOC(context);
                // Найдем документ в БД ИДС
                EFIDS.Entities.UZ_DOC doc = ef_uz_doc.Context.Where(d => d.num_doc == uz_doc_full.id_doc).FirstOrDefault();
                if (doc == null)
                {
                    doc = new EFIDS.Entities.UZ_DOC()
                    {
                        num_doc = uz_doc_full.id_doc,
                        revision = uz_doc_full.revision,
                        num_uz = uz_doc_full.num_uz,
                        status = (int)uz_doc_full.status,
                        code_from = uz_doc_full.sender_code != null ? uz_doc_full.sender_code : "0",
                        code_on = uz_doc_full.recipient_code,
                        dt = uz_doc_full.dt, // uz_doc_full.otpr.date_otpr
                        xml_doc = uz_doc_full.xml,

                    };
                    if (update) ef_uz_doc.Add(doc);
                }
                else
                {
                    if (doc.revision < uz_doc_full.revision)
                    {
                        doc.revision = uz_doc_full.revision;
                        doc.num_uz = uz_doc_full.num_uz;
                        doc.status = (int)uz_doc_full.status;
                        doc.code_from = uz_doc_full.sender_code != null ? uz_doc_full.sender_code : "0";
                        doc.code_on = uz_doc_full.recipient_code;
                        doc.dt = uz_doc_full.dt;
                        doc.xml_doc = uz_doc_full.xml;

                        if (update) ef_uz_doc.Update(doc);
                    }
                }
                return doc;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateUZ_DOC(context={0}, uz_doc_full={1}, update={2} )", context, uz_doc_full, update), servece_owner, eventID);
                return null;
            }
        }
        public bool IsWagonOfUZ_DOC(int num, EFIDS.Entities.UZ_DOC uz_doc)
        {
            try
            {
                UZ_SMS uz_sms = new UZ_SMS();
                OTPR otpr = uz_sms.GetOTPROfXML(uz_doc.xml_doc);
                if (otpr != null && otpr.vagon != null && otpr.vagon.Count() > 0)
                {
                    int searsh_vag = otpr.vagon.Where(v => v.nomer == num.ToString()).Count();
                    if (searsh_vag > 0) return true;
                }
                ;
                return false;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("IsWagonOfUZ_DOC(num={0}, uz_doc={1})", num, uz_doc), servece_owner, eventID);
                return false;
            }
        }
        /// <summary>
        /// Метод поиска и обновления документов 
        /// </summary>
        /// <param name="num_doc"></param>
        /// <param name="add"></param>
        /// <returns></returns>
        public ResultObject OperationSearchUpdateUZ_DOC_Of_SMS(string num_doc, bool add)
        {
            ResultObject result = new ResultObject();
            try
            {
                EFDbContext context = new EFDbContext();
                EFUZ_DOC ef_uz_doc = new EFUZ_DOC(context);
                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(service.WebAPI_UZ);

                List<UZ_DOC_FULL> docs = uz_sms.Get_UZ_DOC_SMS_Of_NumDoc(num_doc); //num_doc
                bool res_con = uz_sms.Connection();
                if (!res_con)
                {
                    result.result = (int)errors_base.error_connect_sms; // Ошибка Подкллючения к модулю согласования
                    return result;
                }
                List<UZ.UZ_DOC_FULL> list_docs = uz_sms.Get_UZ_DOC_SMS_Of_NumDoc(num_doc);
                if (docs != null && docs.Count() > 0)
                {
                    foreach (UZ.UZ_DOC_FULL doc in list_docs)
                    {
                        // Обновим документы
                        UpdateUZ_DOC(ref context, doc, add);
                    }
                    result.result = context.SaveChanges();
                    result.obj = list_docs;
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationSearchUpdateUZ_DOC_Of_SMS(num_doc={0}, add={1})", num_doc, add), servece_owner, eventID);
                result.result = (int)errors_base.global;// Ошибка
                return result;
            }
        }
        #endregion

        #region ОПЕРАЦИИ ОБНОВЛЕНИЯ ДОКУМЕНТОВ ЭПД ПО ОТПРАВКЕ
        /// <summary>
        /// получить текущий документ на сданный на УЗ вагон
        /// </summary>
        /// <param name="car"></param>
        /// <param name="arr_date"></param>
        /// <param name="out_date"></param>
        /// <param name="type_searsh"></param>
        /// <returns></returns>
        public UZ.UZ_DOC GetSendingEPD(OutgoingCars car, DateTime arr_date, DateTime out_date, int type_searsh)
        {
            try
            {
                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);
                // Проверим вагон
                if (car == null) return null;
                // Проверим документ определен?
                if (!String.IsNullOrWhiteSpace(car.num_doc))
                {
                    // документ определен обновим его
                    EFUZ_DOC_OUT ef_uzdoc = new EFUZ_DOC_OUT(new EFDbContext());
                    UZ_DOC_OUT uz_doc_old = ef_uzdoc.Get(car.num_doc);
                    UZ.UZ_DOC uz_doc_new = uz_sms.GetDocumentOfDB_NumDoc(car.num_doc);
                    if ((uz_doc_new != null && uz_doc_old != null && uz_doc_old.revision <= uz_doc_new.revision) || (uz_doc_new != null && uz_doc_old == null))
                    {
                        return uz_doc_new; // Документ имеет новую ревизию
                    }
                    else if (uz_doc_new.status != uz_status.canceled)
                    {
                        return null; // Документ старая ревизия и не удален
                    }
                    // Проодит только удаленные ревизии
                }
                // Документ не определен или документ с признаком удален
                UZ.UZ_DOC uz_doc = null;
                // документ не определен
                if (type_searsh == 0 || type_searsh == 1)
                {
                    uz_doc = uz_sms.GetDocumentOfDB_NumShipper(car.num, new int[] { 7932 }, arr_date, out_date);
                }
                if (type_searsh == 1 && uz_doc == null)
                {
                    uz_doc = uz_sms.GetDocumentOfSMS_NumShipper(car.num, "7932", arr_date, out_date);
                }
                if (type_searsh == 2)
                {
                    uz_doc = uz_sms.GetDocumentOfSMS_NumShipper(car.num, "7932", arr_date, out_date);
                }
                return uz_doc;


                //if (String.IsNullOrWhiteSpace(car.num_doc))
                //{
                //    UZ.UZ_DOC uz_doc = null;
                //    // документ не определен
                //    if (type_searsh == 0 || type_searsh == 1)
                //    {
                //        uz_doc = uz_sms.GetDocumentOfDB_NumShipper(car.num, new int[] { 7932 }, arr_date, out_date);
                //    }
                //    if (type_searsh == 1 && uz_doc == null)
                //    {
                //        uz_doc = uz_sms.GetDocumentOfSMS_NumShipper(car.num, "7932", arr_date, out_date);
                //    }
                //    if (type_searsh == 2)
                //    {
                //        uz_doc = uz_sms.GetDocumentOfSMS_NumShipper(car.num, "7932", arr_date, out_date);
                //    }
                //    return uz_doc;
                //}
                //else
                //{
                //    // документ определен обновим его
                //    EFUZ_DOC_OUT ef_uzdoc = new EFUZ_DOC_OUT(new EFDbContext());
                //    UZ_DOC_OUT uz_doc_old = ef_uzdoc.Get(car.num_doc);
                //    UZ.UZ_DOC uz_doc_new = uz_sms.GetDocumentOfDB_NumDoc(car.num_doc);
                //    if ((uz_doc_new != null && uz_doc_old != null && uz_doc_old.revision < uz_doc_new.revision) || (uz_doc_new != null && uz_doc_old == null))
                //    {
                //        return uz_doc_new;
                //    }
                //    else
                //    {
                //        return null;
                //    }
                //}
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetSendingEPD(car={0}, start_date={1}, out_date={2}, arr_date={3})",
                    car, arr_date, out_date, arr_date), servece_owner, eventID);
                return null;


            }
        }

        #region ДОКУМЕНТ Outgoing_UZ_Vagon_Pay
        /// <summary>
        /// Получить список платежек по вагону
        /// </summary>
        /// <param name="pays"></param>
        /// <returns></returns>
        public List<Outgoing_UZ_Vagon_Pay> CreateOutgoing_UZ_Vagon_Pay(List<UZ.PAY_V> pays)
        {
            try
            {
                List<Outgoing_UZ_Vagon_Pay> list_vag_pays = new List<Outgoing_UZ_Vagon_Pay>();

                // Пройдемся по платежкам
                foreach (UZ.PAY_V pay in pays.ToList())
                {
                    Outgoing_UZ_Vagon_Pay new_pay = new Outgoing_UZ_Vagon_Pay()
                    {
                        id = 0,
                        id_vagon = 0,
                        kod = pay.kod,
                        summa = (int)pay.summa,
                    };
                    list_vag_pays.Add(new_pay);
                }

                return list_vag_pays;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateOutgoing_UZ_Vagon_Pay(pays={0})",
                    pays), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Обновить пплатежки по вагону
        /// </summary>
        /// <param name="context"></param>
        /// <param name="out_uz_vag"></param>
        /// <param name="pays"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Vagon_Pay(ref EFDbContext context, Outgoing_UZ_Vagon out_uz_vag, List<UZ.PAY_V> pays, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                EFOutgoing_UZ_Vagon_Pay ef_out_vag_pay = new EFOutgoing_UZ_Vagon_Pay(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Outgoing_UZ_Document_Pay по данным документа
                List<Outgoing_UZ_Vagon_Pay> list_vag_pays = CreateOutgoing_UZ_Vagon_Pay(pays);
                result.count = list_vag_pays.Count();

                if (out_uz_vag.id == 0)
                {
                    // Документ только создали, добавим pay
                    foreach (Outgoing_UZ_Vagon_Pay vag_pay in list_vag_pays)
                    {
                        out_uz_vag.Outgoing_UZ_Vagon_Pay.Add(vag_pay);
                        result.AddInsert();
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Outgoing_UZ_Vagon_Pay> old_list_vag_pay = out_uz_vag.Outgoing_UZ_Vagon_Pay.ToList();
                    // Сравнить
                    foreach (Outgoing_UZ_Vagon_Pay vag_pay in list_vag_pays)
                    {
                        Outgoing_UZ_Vagon_Pay exist_doc_pay = ef_out_vag_pay.Context.Where(p => p.id_vagon == out_uz_vag.id && p.kod == vag_pay.kod).FirstOrDefault();
                        if (exist_doc_pay != null)
                        {
                            // есть - обновить
                            exist_doc_pay.summa = vag_pay.summa;
                            ef_out_vag_pay.Update(exist_doc_pay);
                            old_list_vag_pay.Remove(exist_doc_pay);
                            result.AddUpdate();
                        }
                        else
                        {
                            // нет - добавить
                            out_uz_vag.Outgoing_UZ_Vagon_Pay.Add(vag_pay);
                            result.AddInsert();
                        }
                    }
                    // Удалим исключенные платежки
                    ef_out_vag_pay.Delete(old_list_vag_pay.Select(p => p.id));
                    result.delete = old_list_vag_pay.Select(p => p.id).Count();
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Vagon_Pay(context={0}, out_uz_vag={1}, pays={2}, user={3})",
                    context, out_uz_vag, pays, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;
            }
        }
        #endregion

        #region ДОКУМЕНТ Outgoing_UZ_Vagon_Acts
        /// <summary>
        /// Получить список актов по вагонам из ЭПД
        /// </summary>
        /// <param name="acts"></param>
        /// <returns></returns>
        public List<Outgoing_UZ_Vagon_Acts> CreateOutgoing_UZ_Vagon_Acts(List<UZ.ACTS> acts)
        {
            try
            {
                List<Outgoing_UZ_Vagon_Acts> list_vag_acts = new List<Outgoing_UZ_Vagon_Acts>();

                // Пройдемся по актам
                foreach (UZ.ACTS act in acts.ToList())
                {
                    // Проверим документ на вагон?
                    if (!String.IsNullOrWhiteSpace(act.vagon_nom))
                    {
                        Outgoing_UZ_Vagon_Acts new_act = new Outgoing_UZ_Vagon_Acts()
                        {
                            id = 0,
                            id_vagon = 0,
                            date_akt = act.date_akt,
                            date_dved = act.date_dved,
                            nom_akt = act.nom_akt,
                            nom_dved = act.nom_dved,
                            prichina_akt = act.prichina_akt,
                            stn_akt = act.stn_akt != null ? (int?)int.Parse(act.stn_akt) : null,
                            stn_name_akt = act.stn_name_akt,
                            type = act.type != null ? (int?)int.Parse(act.type) : null,
                            vagon_nom = act.vagon_nom != null ? (int?)int.Parse(act.vagon_nom) : null,
                        };

                        list_vag_acts.Add(new_act);
                    }
                }
                return list_vag_acts;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateOutgoing_UZ_Vagon_Acts(acts={0})",
                    acts), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Обновить Акты по вагону
        /// </summary>
        /// <param name="context"></param>
        /// <param name="out_uz_vag"></param>
        /// <param name="acts"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Vagon_Acts(ref EFDbContext context, Outgoing_UZ_Vagon out_uz_vag, List<UZ.ACTS> acts, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                EFOutgoing_UZ_Vagon_Acts ef_out_vag_acts = new EFOutgoing_UZ_Vagon_Acts(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Outgoing_UZ_Document_Pay по данным документа
                List<Outgoing_UZ_Vagon_Acts> list_vag_acts = CreateOutgoing_UZ_Vagon_Acts(acts);
                result.count = list_vag_acts.Count();

                if (out_uz_vag.id == 0)
                {
                    // Документ только создали, добавим акты
                    foreach (Outgoing_UZ_Vagon_Acts vag_act in list_vag_acts)
                    {
                        // Проверим Акт по текущему вагону
                        if (vag_act.vagon_nom == out_uz_vag.num)
                        {
                            out_uz_vag.Outgoing_UZ_Vagon_Acts.Add(vag_act);
                            result.AddInsert();
                        }
                        ;
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Outgoing_UZ_Vagon_Acts> old_list_vag_acts = out_uz_vag.Outgoing_UZ_Vagon_Acts.ToList();
                    // Сравнить
                    foreach (Outgoing_UZ_Vagon_Acts vag_act in list_vag_acts)
                    {
                        Outgoing_UZ_Vagon_Acts exist_vag_act = ef_out_vag_acts.Context.Where(a => a.id_vagon == out_uz_vag.id && a.vagon_nom == vag_act.vagon_nom && a.nom_akt == vag_act.nom_akt).FirstOrDefault();
                        if (exist_vag_act != null)
                        {
                            // есть - обновить
                            exist_vag_act.date_akt = vag_act.date_akt;
                            exist_vag_act.date_dved = vag_act.date_dved;
                            exist_vag_act.nom_akt = vag_act.nom_akt;
                            exist_vag_act.nom_dved = vag_act.nom_dved;
                            exist_vag_act.prichina_akt = vag_act.prichina_akt;
                            exist_vag_act.stn_akt = vag_act.stn_akt;
                            exist_vag_act.stn_name_akt = vag_act.stn_name_akt;
                            exist_vag_act.type = vag_act.type;

                            ef_out_vag_acts.Update(exist_vag_act);
                            old_list_vag_acts.Remove(exist_vag_act);
                            result.AddUpdate();
                        }
                        else
                        {
                            // нет - добавить
                            // Проверим Акт по текущему вагону
                            if (vag_act.vagon_nom == out_uz_vag.num)
                            {
                                out_uz_vag.Outgoing_UZ_Vagon_Acts.Add(vag_act);
                                result.AddInsert();
                            }
                            ;
                        }
                    }
                    // Удалим исключенные платежки
                    ef_out_vag_acts.Delete(old_list_vag_acts.Select(p => p.id));
                    result.delete = old_list_vag_acts.Select(p => p.id).Count();
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Vagon_Acts(context={0}, out_uz_vag={1}, acts={2}, user={3})",
                    context, out_uz_vag, acts, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;
            }
        }
        #endregion

        #region ДОКУМЕНТ Outgoing_UZ_Cont_Pay
        /// <summary>
        /// Создать список платежек по контейнеру из данных ЭПД
        /// </summary>
        /// <param name="pays"></param>
        /// <returns></returns>
        public List<Outgoing_UZ_Cont_Pay> CreateOutgoing_UZ_Cont_Pay(List<UZ.PAY_K> pays)
        {
            try
            {
                List<Outgoing_UZ_Cont_Pay> list_cont_pays = new List<Outgoing_UZ_Cont_Pay>();

                // Пройдемся по платежкам
                foreach (UZ.PAY_K pay in pays.ToList())
                {
                    Outgoing_UZ_Cont_Pay new_pay = new Outgoing_UZ_Cont_Pay()
                    {
                        id = 0,
                        id_cont = 0,
                        kod = pay.kod,
                        summa = (int)pay.summa,
                    };
                    list_cont_pays.Add(new_pay);
                }

                return list_cont_pays;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateOutgoing_UZ_Cont_Pay(pays={0})",
                    pays), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Обновить платежки по контейнеру
        /// </summary>
        /// <param name="context"></param>
        /// <param name="cont"></param>
        /// <param name="pays"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Cont_Pay(ref EFDbContext context, Outgoing_UZ_Vagon_Cont cont, List<UZ.PAY_K> pays, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                EFOutgoing_UZ_Cont_Pay ef_out_count_pay = new EFOutgoing_UZ_Cont_Pay(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Outgoing_UZ_Document_Pay по данным документа
                List<Outgoing_UZ_Cont_Pay> list_cont_pays = CreateOutgoing_UZ_Cont_Pay(pays);
                result.count = list_cont_pays.Count();

                if (cont.id == 0)
                {
                    // Документ только создали, добавим pay
                    foreach (Outgoing_UZ_Cont_Pay cont_pay in list_cont_pays)
                    {
                        cont.Outgoing_UZ_Cont_Pay.Add(cont_pay);
                        result.AddInsert();
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Outgoing_UZ_Cont_Pay> old_list_cont_pay = cont.Outgoing_UZ_Cont_Pay.ToList();
                    // Сравнить
                    foreach (Outgoing_UZ_Cont_Pay cont_pay in list_cont_pays)
                    {
                        Outgoing_UZ_Cont_Pay exist_cont_pay = ef_out_count_pay.Context.Where(d => d.id_cont == cont.id && d.kod == cont_pay.kod).FirstOrDefault();
                        if (exist_cont_pay != null)
                        {
                            // есть - обновить
                            exist_cont_pay.summa = cont_pay.summa;
                            ef_out_count_pay.Update(exist_cont_pay);
                            old_list_cont_pay.Remove(exist_cont_pay);
                            result.AddUpdate();
                        }
                        else
                        {
                            // нет - добавить
                            cont.Outgoing_UZ_Cont_Pay.Add(cont_pay);
                            result.AddInsert();
                        }
                    }
                    // Удалим исключенные платежки
                    ef_out_count_pay.Delete(old_list_cont_pay.Select(p => p.id));
                    result.delete = old_list_cont_pay.Select(p => p.id).Count();
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Cont_Pay(context={0}, cont={1}, pays={2}, user={3})",
                    context, cont, pays, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;
            }
        }
        #endregion

        #region ДОКУМЕНТ Outgoing_UZ_Vagon_Cont
        /// <summary>
        /// Создать список справочных строк по контейнерам из данных документа
        /// </summary>
        /// <param name="context"></param>
        /// <param name="conts"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public List<Outgoing_UZ_Vagon_Cont> CreateOutgoing_UZ_Vagon_Cont(ref EFDbContext context, List<UZ.CONT> conts, string user)
        {
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                IDSDirectory ids_dir = new IDSDirectory(this.servece_owner, context);
                List<Outgoing_UZ_Vagon_Cont> list_cont = new List<Outgoing_UZ_Vagon_Cont>();

                foreach (UZ.CONT cont in conts)
                {
                    UZ.COLLECT_K collectk = cont.collect_k;
                    List<UZ.ZPU_K> zpu = cont.zpu_k.ToList();

                    int? code_gng = collectk.kod_gng != null ? (int?)int.Parse(collectk.kod_gng) : null;
                    string name_gng = collectk.name_gng;
                    Directory_CargoGNG cargo_gng = code_gng != null ? ids_dir.GetDirectory_CargoGNG((int)code_gng, name_gng, true, user) : null;

                    int? code_etsng = collectk.kod_etsng != null ? (int?)int.Parse(collectk.kod_etsng) : null;
                    string name_etsng = collectk.name_etsng;
                    Directory_CargoETSNG cargo_etsng = code_etsng != null ? ids_dir.GetDirectory_CargoETSNG((int)code_etsng, name_etsng, true, user) : null;
                    // Проверим привязку строки груза ЕТСНГ к справочнику грузов, если нет добавим 
                    Directory_Cargo cargo = ids_dir.GetDirectory_Cargo(cargo_etsng, true, user);
                    // Создадим контейнер
                    Outgoing_UZ_Vagon_Cont new_cont = new Outgoing_UZ_Vagon_Cont()
                    {
                        id = 0,
                        id_vagon = 0,
                        nom_cont = cont.nom_cont,
                        kod_tiporazmer = cont.kod_tiporazmer,
                        gruzp = cont.gruzp,
                        ves_tary_arc = cont.ves_tary_arc,
                        kol_pac = collectk != null ? collectk.kol_pac : null,
                        pac = collectk != null ? collectk.pac : null,
                        vesg = collectk != null ? collectk.vesg : null,
                        nom_zpu = zpu != null && zpu.Count() > 0 ? zpu[0].nom_zpu : null,
                    };
                    new_cont.Directory_CargoGNG = cargo_gng;
                    new_cont.Directory_Cargo = cargo;
                    list_cont.Add(new_cont);
                }
                return list_cont;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateOutgoing_UZ_Vagon_Cont(context={0}, conts={1}, user={2})",
                    context, conts, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Обновим информацию по контенерам на вагоны
        /// </summary>
        /// <param name="context"></param>
        /// <param name="out_uz_vag"></param>
        /// <param name="conts"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Vagon_Cont(ref EFDbContext context, Outgoing_UZ_Vagon out_uz_vag, List<UZ.CONT> conts, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                EFOutgoing_UZ_Vagon_Cont ef_out_vag_cont = new EFOutgoing_UZ_Vagon_Cont(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Outgoing_UZ_Document_Pay по данным документа
                List<Outgoing_UZ_Vagon_Cont> list_out_vag_cont = CreateOutgoing_UZ_Vagon_Cont(ref context, conts, user);
                result.count = list_out_vag_cont.Count();
                // вагон существует или создан вновь
                if (out_uz_vag.id == 0)
                {
                    // Документ только создали, добавим pay
                    foreach (Outgoing_UZ_Vagon_Cont vag_cont in list_out_vag_cont)
                    {
                        List<UZ.PAY_K> paysk = conts.Find(c => c.nom_cont == vag_cont.nom_cont).pay_k.ToList();
                        ResultUpdateDB res_vag_cont_pay = UpdateOutgoing_UZ_Cont_Pay(ref context, vag_cont, paysk, user);
                        if (res_vag_cont_pay.result >= 0)
                        {
                            out_uz_vag.Outgoing_UZ_Vagon_Cont.Add(vag_cont);
                            result.AddInsert();
                        }
                        else
                        {
                            result.SetResult((int)errors_base.error_update_out_cont_pay); // Ошибка обновления документов (контейнера на вагон)
                        }
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Outgoing_UZ_Vagon_Cont> old_list_out_vag_cont = out_uz_vag.Outgoing_UZ_Vagon_Cont.ToList();
                    // Сравнить
                    foreach (Outgoing_UZ_Vagon_Cont vag_cont in list_out_vag_cont)
                    {
                        Outgoing_UZ_Vagon_Cont exist_out_vag_cont = ef_out_vag_cont.Context.Where(c => c.id_vagon == out_uz_vag.id && c.nom_cont == vag_cont.nom_cont).FirstOrDefault();
                        if (exist_out_vag_cont != null)
                        {
                            // есть - обновить
                            List<UZ.PAY_K> paysk = conts.Find(c => c.nom_cont == vag_cont.nom_cont).pay_k.ToList();
                            ResultUpdateDB res_vag_cont_pay = UpdateOutgoing_UZ_Cont_Pay(ref context, vag_cont, paysk, user);
                            if (res_vag_cont_pay.result >= 0)
                            {
                                exist_out_vag_cont.kod_tiporazmer = vag_cont.kod_tiporazmer;
                                exist_out_vag_cont.gruzp = vag_cont.gruzp;
                                exist_out_vag_cont.ves_tary_arc = vag_cont.ves_tary_arc;
                                exist_out_vag_cont.kol_pac = vag_cont.kol_pac;
                                exist_out_vag_cont.pac = vag_cont.pac;
                                exist_out_vag_cont.vesg = vag_cont.vesg;
                                exist_out_vag_cont.nom_zpu = vag_cont.nom_zpu;
                                ef_out_vag_cont.Update(exist_out_vag_cont);
                                old_list_out_vag_cont.Remove(exist_out_vag_cont);
                                result.AddUpdate();
                            }
                            else
                            {
                                result.SetResult((int)errors_base.error_update_out_cont_pay); // Ошибка обновления документов (контейнера на вагон)
                            }
                        }
                        else
                        {
                            // нет - добавить
                            List<UZ.PAY_K> paysk = conts.Find(c => c.nom_cont == vag_cont.nom_cont).pay_k.ToList();
                            ResultUpdateDB res_vag_cont_pay = UpdateOutgoing_UZ_Cont_Pay(ref context, vag_cont, paysk, user);
                            if (res_vag_cont_pay.result >= 0)
                            {
                                out_uz_vag.Outgoing_UZ_Vagon_Cont.Add(vag_cont);
                                result.AddInsert();
                            }
                            else
                            {
                                result.SetResult((int)errors_base.error_update_out_cont_pay); // Ошибка обновления документов (контейнера на вагон)
                            }
                        }
                    }
                    // Удалим исключенные платежки
                    ef_out_vag_cont.Delete(old_list_out_vag_cont.Select(p => p.id));
                    result.delete = old_list_out_vag_cont.Select(p => p.id).Count();
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Vagon_Cont(context={0}, out_uz_vag={1}, conts={2}, user={3})",
                    context, out_uz_vag, conts, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;
            }
        }
        #endregion

        #region ДОКУМЕНТ Outgoing_UZ_Vagon
        /// <summary>
        /// Обнавить документ по вагону
        /// </summary>
        /// <param name="context"></param>
        /// <param name="document"></param>
        /// <param name="epd_car"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Vagon(ref EFDbContext context, Outgoing_UZ_Document document, EPDOutgoingCar epd_car, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                EFOutgoing_UZ_Vagon ef_out_uz_vag = new EFOutgoing_UZ_Vagon(context);

                EFDirectory_CargoETSNG ef_cargo_etsng = new EFDirectory_CargoETSNG(context);
                EFDirectory_Cargo ef_cargo = new EFDirectory_Cargo(context);

                IDSDirectory ids_dir = new IDSDirectory(this.servece_owner, context);

                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                if (epd_car != null && epd_car.epd != null)
                {
                    OutgoingCars out_car = ef_out_car.Context.Where(c => c.id == epd_car.id_outgoing_car).FirstOrDefault();
                    if (out_car != null)
                    {
                        Outgoing_UZ_Vagon out_uz_vag = ef_out_uz_vag.Context.Where(v => v.id_car == epd_car.id_outgoing_car).FirstOrDefault();
                        if (out_uz_vag != null)
                        {
                            // получим ЭПД на вагон
                            UZ.VAGON vagon = epd_car.epd.otpr.vagon.ToList().Find(v => v.nomer == out_car.num.ToString());
                            List<UZ.CONT> conts = epd_car.epd.otpr.cont.ToList().Where(c => c.nom_vag == out_car.num).ToList();
                            List<UZ.ACTS> acts = epd_car.epd.otpr.acts.ToList();

                            if (vagon != null)
                            {
                                // Определим коллекции по документу на вагон и контейнер
                                UZ.COLLECT_V collect_v = vagon.collect_v != null && vagon.collect_v.Count() > 0 ? vagon.collect_v[0] : null;
                                UZ.COLLECT_K collect_k = conts != null && conts.Count() > 0 ? conts[0].collect_k : null;
                                List<UZ.PAY_V> pays_v = vagon.pay_v.ToList();
                                // 
                                int? code = null;
                                string name = null;
                                int? vesg = null;
                                int? kod_etsng = null;
                                int? id_cargo = null;
                                // Проверим по агонам
                                if (collect_v != null)
                                {
                                    code = collect_v.kod_gng != null ? (int?)int.Parse(collect_v.kod_gng) : null;
                                    name = collect_v.name_gng;
                                    vesg = collect_v.vesg;
                                    kod_etsng = collect_v.kod_etsng != null ? (int?)int.Parse(collect_v.kod_etsng) : null;
                                }
                                // Проверим на контейнер
                                if (collect_k != null)
                                {
                                    code = collect_k.kod_gng != null ? (int?)int.Parse(collect_k.kod_gng) : null;
                                    name = collect_k.name_gng;
                                    vesg = collect_k.vesg;
                                    kod_etsng = collect_k.kod_etsng != null ? (int?)int.Parse(collect_k.kod_etsng) : null;
                                }
                                // Обновим груз 
                                if (kod_etsng != null)
                                {
                                    Directory_CargoETSNG cargo_etsng = ef_cargo_etsng.Context.Where(e => e.code == kod_etsng).FirstOrDefault();
                                    if (cargo_etsng != null)
                                    {
                                        Directory_Cargo cargo = ef_cargo.Context.Where(c => c.id_cargo_etsng == cargo_etsng.id).FirstOrDefault();
                                        id_cargo = cargo != null ? (int?)cargo.id : out_uz_vag.id_cargo;
                                    }
                                }

                                // Если неопределен код гнг, добавить
                                if (out_uz_vag.id_cargo_gng != null && code != null)
                                {
                                    Directory_CargoGNG cargo_gng = code != null ? ids_dir.GetDirectory_CargoGNG((int)code, name, true, user) : null;
                                    out_uz_vag.Directory_CargoGNG = cargo_gng;
                                }
                                // 
                                out_uz_vag.id_document = document.id > 0 ? (long?)document.id : null;
                                out_uz_vag.id_cargo = id_cargo;
                                out_uz_vag.gruzp = vagon.gruzp;
                                out_uz_vag.u_tara = vagon.u_tara;
                                out_uz_vag.ves_tary_arc = vagon.ves_tary_arc;
                                out_uz_vag.vesg = vesg;
                                out_uz_vag.kol_conductor = vagon.kol_conductor;
                                out_uz_vag.change = DateTime.Now;
                                out_uz_vag.change_user = user;
                                // Добавим контейнера если есть
                                ResultUpdateDB res_vag_cont = UpdateOutgoing_UZ_Vagon_Cont(ref context, out_uz_vag, conts, user);
                                if (res_vag_cont.result >= 0)
                                {
                                    // Добавим Акты
                                    ResultUpdateDB res_vag_acts = UpdateOutgoing_UZ_Vagon_Acts(ref context, out_uz_vag, acts, user);
                                    if (res_vag_acts.result >= 0)
                                    {
                                        // добавим платежки
                                        ResultUpdateDB res_vag_pay = UpdateOutgoing_UZ_Vagon_Pay(ref context, out_uz_vag, pays_v, user);
                                        if (res_vag_pay.result >= 0)
                                        {
                                            ef_out_uz_vag.Update(out_uz_vag);
                                            if (document.Outgoing_UZ_Vagon != null && document.Outgoing_UZ_Vagon.Count() > 0)
                                            {
                                                Outgoing_UZ_Vagon vag_exist = document.Outgoing_UZ_Vagon.ToList().Find(v => v.num == out_uz_vag.num);
                                                if (vag_exist != null)
                                                {
                                                    // Удалить
                                                    document.Outgoing_UZ_Vagon.Remove(vag_exist);
                                                }

                                            }
                                            document.Outgoing_UZ_Vagon.Add(out_uz_vag);
                                            //document.Outgoing_UZ_Vagon   out_uz_vag.
                                            result.SetResult(res_vag_cont.result + res_vag_acts.result + res_vag_pay.result);
                                        }
                                        else
                                        {
                                            result.SetResult((int)errors_base.error_update_out_vag_pay); // Ошибка обновления документов (платежки на вагон)
                                        }
                                    }
                                    else
                                    {
                                        result.SetResult((int)errors_base.error_update_out_vag_acts); // Ошибка обновления документов (акты на вагон)                                        
                                    }
                                }
                                else
                                {
                                    result.SetResult((int)errors_base.error_update_out_vag_cont); // Ошибка обновления документов (контейнера на вагон)  
                                }
                            }
                            else
                            {
                                result.SetResult((int)errors_base.not_vagon_epd_document); // ошибка указанного вагона нет в документе
                            }
                        }
                        else
                        {
                            result.SetResult((int)errors_base.not_out_uz_vag_db); // документ на ваго не найден
                        }
                    }
                    else
                    {
                        result.SetResult((int)errors_base.not_outgoing_cars_db); // в базе нет данного вагона на отправку
                    }
                }
                else
                {
                    result.SetResult((int)errors_base.not_epd_document); // нет ЭПД на вагон
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Vagon(context={0}, document={1}, epd_car={2}, user={3})",
                    context, document, epd_car, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);

            }
            return result;
        }
        /// <summary>
        /// Обновить информацию по группам вагонов
        /// </summary>
        /// <param name="context"></param>
        /// <param name="document"></param>
        /// <param name="list_cars"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Vagons(ref EFDbContext context, Outgoing_UZ_Document document, List<EPDOutgoingCar> list_cars, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                result.count = list_cars.Count();
                foreach (EPDOutgoingCar epd_vagon in list_cars)
                {
                    ResultUpdateDB res_vagon = UpdateOutgoing_UZ_Vagon(ref context, document, epd_vagon, user);
                    if (res_vagon.result >= 0)
                    {
                        result.SetUpdateResult(res_vagon.result, epd_vagon.id_outgoing_car);
                    }
                    else
                    {
                        result.SetResult((int)errors_base.error_update_out_vag); // Ошибка обновления документов (на вагон)
                    }
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Vagons(context={0}, document={1}, list_cars={2}, user={3})",
                    context, document, list_cars, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);

            }
            return result;
        }
        #endregion

        #region ДОКУМЕНТ Outgoing_UZ_Document_Pay
        /// <summary>
        /// Создать список Outgoing_UZ_Document_Pay
        /// </summary>
        /// <param name="pls"></param>
        /// <returns></returns>
        public List<Outgoing_UZ_Document_Pay> CreateOutgoing_UZ_Document_Pay(List<UZ.PL> pls)
        {
            try
            {
                List<Outgoing_UZ_Document_Pay> list_doc_pays = new List<Outgoing_UZ_Document_Pay>();

                foreach (UZ.PL pl in pls)
                {
                    // Пройдемся по платежкам
                    foreach (UZ.PAY pay in pl.pay.ToList())
                    {
                        Outgoing_UZ_Document_Pay new_pay = new Outgoing_UZ_Document_Pay()
                        {
                            id = 0,
                            id_document = 0,
                            code_payer = int.Parse(pl.kod_plat),
                            kod = pay.kod,
                            summa = (int)pay.summa,
                            type_payer = int.Parse(pl.type),
                        };
                        list_doc_pays.Add(new_pay);
                    }
                }
                return list_doc_pays;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateOutgoing_UZ_Document_Pay(pls={0})",
                    pls), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Добавить или обновить платежки по документу
        /// </summary>
        /// <param name="context"></param>
        /// <param name="document"></param>
        /// <param name="pls"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Document_Pay(ref EFDbContext context, Outgoing_UZ_Document document, List<UZ.PL> pls, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                EFOutgoing_UZ_Document_Pay ef_out_doc_pay = new EFOutgoing_UZ_Document_Pay(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Outgoing_UZ_Document_Pay по данным документа
                List<Outgoing_UZ_Document_Pay> list_doc_pays = CreateOutgoing_UZ_Document_Pay(pls);
                result.count = list_doc_pays.Count();

                if (document.id == 0)
                {
                    // Документ только создали, добавим pay
                    foreach (Outgoing_UZ_Document_Pay doc_pay in list_doc_pays)
                    {
                        document.Outgoing_UZ_Document_Pay.Add(doc_pay);
                        result.AddInsert();
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Outgoing_UZ_Document_Pay> old_list_doc_pay = document.Outgoing_UZ_Document_Pay.ToList();
                    // Сравнить
                    foreach (Outgoing_UZ_Document_Pay doc_pay in list_doc_pays)
                    {
                        Outgoing_UZ_Document_Pay exist_doc_pay = ef_out_doc_pay.Context.Where(d => d.id_document == document.id && d.code_payer == doc_pay.code_payer && d.type_payer == doc_pay.type_payer && d.kod == doc_pay.kod).FirstOrDefault();
                        if (exist_doc_pay != null)
                        {
                            // есть - обновить
                            exist_doc_pay.summa = doc_pay.summa;
                            ef_out_doc_pay.Update(exist_doc_pay);
                            old_list_doc_pay.Remove(exist_doc_pay);
                            result.AddUpdate();
                        }
                        else
                        {
                            // нет - добавить
                            document.Outgoing_UZ_Document_Pay.Add(doc_pay);
                            result.AddInsert();
                        }
                    }
                    // Удалим исключенные платежки
                    ef_out_doc_pay.Delete(old_list_doc_pay.Select(p => p.id));
                    result.delete = old_list_doc_pay.Select(p => p.id).Count();
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Document_Pay(context={0})",
                    context), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;
            }
        }
        #endregion

        #region ДОКУМЕНТ _UZ_Document
        /// <summary>
        /// Обновить документ на группу вагонов + обновить вагоны...
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_doc_uz"></param>
        /// <param name="list_cars"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateOutgoing_UZ_Document(ref EFDbContext context, string id_doc_uz, List<EPDOutgoingCar> list_cars, string user)
        {
            try
            {

                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                IDSDirectory ids_dir = new IDSDirectory(this.servece_owner);
                EFOutgoing_UZ_Document ef_out_uz_doc = new EFOutgoing_UZ_Document(context);

                if (list_cars == null || list_cars.Count() == 0) return (int)errors_base.not_input_list_wagons;
                // Получим и обрботаем документы
                UZ.UZ_DOC epd = list_cars[0].epd;
                UZ.OTPR otpr = epd.otpr;
                // грузооотправители и грузополучатели
                List<UZ.CLIENT> clients = epd.otpr.client.ToList();
                UZ.CLIENT client_from = clients != null && clients.Count() > 0 ? clients[0] : null;
                UZ.CLIENT client_on = clients != null && clients.Count() > 1 ? clients[1] : null;
                if (client_on != null && client_on.kod != null)
                {
                    Directory_Shipper shipper = ids_dir.GetDirectory_Shipper(int.Parse(client_on.kod), client_on.name, true, user);
                }
                // маршруты
                List<UZ.ROUTE> route = epd.otpr.route.ToList();
                // Определим внешнюю станцию
                if (route != null && route.Count() > 0 && route[0].stn_to != null)
                {
                    Directory_ExternalStation station = ids_dir.GetDirectory_ExternalStation(int.Parse(route[0].stn_to), route[0].name_to, true, user);
                }
                List<UZ.JOINT> joints = route != null && route.Count() > 0 ? route[0].joint.ToList() : null;
                // Получим погран переход
                UZ.JOINT joint = joints.Find(j => j.admin == 22);
                if (joint != null && joint.stn != null)
                {
                    Directory_BorderCheckpoint border_checkpoint = ids_dir.GetDirectory_BorderCheckpoint(int.Parse(joint.stn), joint.stn_name, true, user);
                }
                // Платники
                List<UZ.PL> pls = epd.otpr.pl.ToList();
                UZ.PL pl_from = pls != null && pls.Count() > 0 ? pls.Find(p => p.type == "0") : null;
                if (pl_from != null)
                {
                    // Проверим и создадим в базе платника по отправлению
                    Directory_PayerSender payer = ids_dir.GetDirectory_PayerSender(pl_from.kod_plat, pl_from.name_plat, true, user);
                    List<UZ.PAY> pays_from = pl_from.pay.ToList();
                }
                // Штемпель
                List<UZ.SHTEMPEL> shtempels = epd.otpr.shtempel.ToList();
                // 
                UZ.TEXT text = epd.otpr.text;
                // Вагоны
                List<UZ.VAGON> vagons = epd.otpr.vagon.ToList();
                // Проверим документ создан
                Outgoing_UZ_Document uz_doc = ef_out_uz_doc.Context.Where(d => d.id_doc_uz == id_doc_uz).FirstOrDefault();
                if (uz_doc == null)
                {
                    // Документ не создан. Создать документ
                    uz_doc = new Outgoing_UZ_Document()
                    {
                        id = 0,
                        id_doc_uz = id_doc_uz,
                        nom_doc = otpr.nom_doc,
                        code_stn_from = route != null && route.Count() > 0 && route[0].stn_from != null ? (int?)int.Parse(route[0].stn_from) : null,
                        code_stn_to = route != null && route.Count() > 0 && route[0].stn_to != null ? (int?)int.Parse(route[0].stn_to) : null,
                        country_nazn = otpr != null ? otpr.country_nazn : null,
                        code_border_checkpoint = joint != null && joint.stn != null ? (int?)int.Parse(joint.stn) : null,
                        cross_date = joint != null && joint.cross_time != null ? (DateTime?)joint.cross_time : null,
                        code_shipper = client_from != null && client_from.kod != null ? (int?)int.Parse(client_from.kod) : null,
                        code_consignee = client_on != null && client_on.kod != null ? (int?)int.Parse(client_on.kod) : null,
                        vid = otpr != null ? otpr.vid : null,
                        code_payer = pl_from != null ? pl_from.kod_plat : null,
                        distance_way = otpr != null ? otpr.distance_way : null,
                        osum = otpr != null ? otpr.osum : null,
                        date_sozdan = otpr != null ? otpr.date_sozdan : null,
                        date_otpr = otpr != null ? otpr.date_otpr : null,
                        date_pr = otpr != null ? otpr.date_pr : null,
                        date_grpol = otpr != null ? otpr.date_grpol : null,
                        date_vid = otpr != null ? otpr.date_vid : null,
                        info_sht = null,
                        name_gr = text != null ? text.name_gr : null,
                        note = null,
                        create = DateTime.Now,
                        create_user = user, 
                    };
                }
                else
                {
                    // Документ найден, обновить
                    uz_doc.code_stn_from = route != null && route.Count() > 0 && route[0].stn_from != null ? (int?)int.Parse(route[0].stn_from) : null;
                    uz_doc.code_stn_to = route != null && route.Count() > 0 && route[0].stn_to != null ? (int?)int.Parse(route[0].stn_to) : null;
                    uz_doc.country_nazn = otpr != null ? otpr.country_nazn : null;
                    uz_doc.code_border_checkpoint = joint != null && joint.stn != null ? (int?)int.Parse(joint.stn) : null;
                    uz_doc.cross_date = joint != null && joint.cross_time != null ? (DateTime?)joint.cross_time : null;
                    uz_doc.code_shipper = client_from != null && client_from.kod != null ? (int?)int.Parse(client_from.kod) : null;
                    uz_doc.code_consignee = client_on != null && client_on.kod != null ? (int?)int.Parse(client_on.kod) : null;
                    uz_doc.vid = otpr != null ? otpr.vid : null;
                    uz_doc.code_payer = pl_from != null ? pl_from.kod_plat : null;
                    uz_doc.distance_way = otpr != null ? otpr.distance_way : null;
                    uz_doc.osum = otpr != null ? otpr.osum : null;
                    uz_doc.date_sozdan = otpr != null ? otpr.date_sozdan : null;
                    uz_doc.date_otpr = otpr != null ? otpr.date_otpr : null;
                    uz_doc.date_pr = otpr != null ? otpr.date_pr : null;
                    uz_doc.date_grpol = otpr != null ? otpr.date_grpol : null;
                    uz_doc.date_vid = otpr != null ? otpr.date_vid : null;
                    uz_doc.info_sht = null;
                    uz_doc.name_gr = text != null ? text.name_gr : null;
                    uz_doc.note = null;
                    uz_doc.change = DateTime.Now;
                    uz_doc.change_user = user;
                }
                // Добаим грузополучателя
                //uz_doc.Directory_Shipper = shipper;
                // добавить или обновить к документу платежки
                ResultUpdateDB res_doc_pay = UpdateOutgoing_UZ_Document_Pay(ref context, uz_doc, pls, user);
                if (res_doc_pay.result >= 0)
                {
                    ResultUpdateDB res_doc_vagons = UpdateOutgoing_UZ_Vagons(ref context, uz_doc, list_cars, user);
                    if (res_doc_vagons.result >= 0)
                    {
                        // Без ошибок, добавим вагоны

                        if (uz_doc.id > 0)
                        {
                            ef_out_uz_doc.Update(uz_doc);
                        }
                        else
                        {
                            ef_out_uz_doc.Add(uz_doc);
                        }
                        // Добавить документ ЭПД в базу данных
                        EFUZ_DOC_OUT ef_uzdoc = new EFUZ_DOC_OUT(context);
                        UZ_DOC_OUT doc = ef_uzdoc.Get(epd.id_doc);
                        if (doc == null)
                        {
                            string code_from = epd.sender_code != null ? epd.sender_code : "0";
                            doc = new UZ_DOC_OUT()
                            {
                                num_doc = epd.id_doc,
                                revision = epd.revision,
                                num_uz = epd.otpr != null ? epd.otpr.nom_doc : null,
                                status = (int)epd.status,
                                code_from = code_from,
                                code_on = epd.recipient_code,
                                dt = epd.dt,
                                xml_doc = epd.xml,
                            };
                            ef_uzdoc.Add(doc);
                        }
                        else
                        {
                            // Ревизия документа выше чем ревизия сохраненного документа
                            if (doc.revision < epd.revision)
                            {
                                string code_from = epd.sender_code != null ? epd.sender_code : "0";
                                doc.num_doc = epd.id_doc;
                                doc.revision = epd.revision;
                                doc.num_uz = epd.otpr != null ? epd.otpr.nom_doc : null;
                                doc.status = (int)epd.status;
                                doc.code_from = code_from;
                                doc.code_on = epd.recipient_code;
                                doc.dt = epd.dt;
                                doc.xml_doc = epd.xml;
                                ef_uzdoc.Update(doc);
                            }
                        }
                        // Обновим документ отправки
                        EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                        foreach (EPDOutgoingCar epd_car in list_cars)
                        {
                            // Получим вагон в отправлении
                            OutgoingCars out_car = ef_out_car.Context.Where(c => c.id == epd_car.id_outgoing_car).FirstOrDefault();
                            if (out_car != null)
                            {
                                out_car.num_doc = doc.num_doc;
                                out_car.UZ_DOC_OUT = doc;
                                ef_out_car.Update(out_car);
                            }
                            else
                            {
                                return (int)errors_base.not_outgoing_cars_db; // Ошибка обновления вагона по отправке
                            }
                        }
                        return 1;
                    }
                    else
                    {
                        // Ошибка добавления вагонов
                        return (int)errors_base.error_update_out_vag; // Ошибка обновления документов (вагоны к документу)
                    }
                }
                else
                {
                    return (int)errors_base.error_update_out_doc_pay; // Ошибка обновления документов (платежка на вагон)
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Document(context={0}, id_doc_uz={1}, list_cars={2}, user={3})",
                    context, id_doc_uz, list_cars, user), servece_owner, eventID);
                return (int)errors_base.global;
            }
        }
        #endregion

        /// <summary>
        /// Операция обновить документы ЭПД по составу
        /// </summary>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        //public OperationResultID OperationUpdateEPDSendingSostav(ref EFDbContext context, long id_outgoing_sostav, string user)
        //{
        //    OperationResultID rt = new OperationResultID();
        //    try
        //    {
        //        if (context == null)
        //        {
        //            context = new EFIDS.Concrete.EFDbContext();
        //        };
        //        // Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }
        //        EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
        //        EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
        //        OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == id_outgoing_sostav).FirstOrDefault();
        //        if (sostav != null)
        //        {
        //            // Состав определен (сдан или отправлен)
        //            if (sostav.status >= 2 && sostav.status <= 3)
        //            {
        //                List<OutgoingCars> list_out_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList(); //  && c.num == 61284964
        //                if (list_out_car != null && list_out_car.Count() > 0)
        //                {
        //                    List<EPDOutgoingCar> list_update_epd = new List<EPDOutgoingCar>(); // Список для обновления
        //                    List<int> list_num = new List<int>();
        //                    // Обновим документы 
        //                    foreach (OutgoingCars car in list_out_car)
        //                    {
        //                        UZ.UZ_DOC new_uz_doc = GetSendingEPD(car, sostav.date_readiness_amkr, true);
        //                        if (new_uz_doc != null)
        //                        {
        //                            EPDOutgoingCar new_update_epd = new EPDOutgoingCar()
        //                            {
        //                                id_outgoing_car = car.id,
        //                                epd = new_uz_doc
        //                            };
        //                            list_update_epd.Add(new_update_epd); // добавим  в список обновления
        //                        }
        //                        else
        //                        {
        //                            list_num.Add(car.num);
        //                        }

        //                    }
        //                    // Сгруппируем документы по id_doc уз
        //                    List<IGrouping<string, EPDOutgoingCar>> group_outgoing_car = list_update_epd.ToList().GroupBy(d => d.epd.id_doc).ToList();
        //                    // Пройдемся по документам
        //                    foreach (IGrouping<string, EPDOutgoingCar> out_cars in group_outgoing_car)
        //                    {
        //                        List<EPDOutgoingCar> list_cars = out_cars.ToList();
        //                        // Выполним обновление всего пула документов
        //                        int result = UpdateOutgoing_UZ_Document(ref context, out_cars.Key, list_cars, user);
        //                        // Запомним результат
        //                        foreach (EPDOutgoingCar car in list_cars)
        //                        {
        //                            rt.SetResultOperation(result, car.id_outgoing_car);
        //                        }
        //                    }
        //                    // Проверка на ошибку
        //                    if (rt.error == 0)
        //                    {
        //                        //sostav.change = DateTime.Now;
        //                        //sostav.change_user = user;
        //                        //ef_out_sostav.Update(sostav);
        //                        if (rt.listResult.Count() > 0)
        //                        {
        //                            rt.SetResult(context.SaveChanges());
        //                        }
        //                    }
        //                    else
        //                    {
        //                        rt.SetResult((int)errors_base.error_save_changes); // Были ошибки по ходу выполнения всей операций
        //                    }
        //                }
        //                else
        //                {
        //                    rt.SetResult((int)errors_base.not_outgoing_cars_db); // В базе данных нет записи по вагонам для отпправки
        //                }
        //            }
        //            else
        //            {
        //                rt.SetResult((int)errors_base.error_status_outgoing_sostav); // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
        //            }
        //        }
        //        else
        //        {
        //            rt.SetResult((int)errors_base.not_outgoing_sostav_db); //В базе данных нет записи состава для оправки
        //        }
        //        return rt;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("OperationUpdateEPDSendingSostav(context={0}, id_outgoing_sostav={1}, user={2})",
        //            context, id_outgoing_sostav, user), servece_owner, eventID);
        //        rt.SetResult((int)errors_base.global);
        //        return rt;// Возвращаем id=-1 , Ошибка
        //    }
        //}
        //public OperationResultID OperationUpdateEPDSendingSostav2(ref EFDbContext context, long id_outgoing_sostav, string user)
        //{
        //    OperationResultID rt = new OperationResultID();
        //    try
        //    {
        //        if (context == null)
        //        {
        //            context = new EFIDS.Concrete.EFDbContext();
        //        };
        //        // Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }
        //        EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
        //        EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
        //        EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
        //        EFArrivalCars ef_arr_car = new EFArrivalCars(context);
        //        EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);

        //        OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == id_outgoing_sostav).FirstOrDefault();
        //        if (sostav != null)
        //        {
        //            // Состав определен (сдан или отправлен)
        //            if (sostav.status >= 2 && sostav.status <= 3)
        //            {
        //                List<int> skip_num = new List<int>();
        //                List<OutgoingCars> list_out_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList(); //  && c.num == 61284964
        //                if (list_out_car != null && list_out_car.Count() > 0)
        //                {
        //                    skip_num.Clear();
        //                    List<EPDOutgoingCar> list_update_epd = new List<EPDOutgoingCar>(); // Список для обновления
        //                    List<long> list_num = new List<long>();
        //                    // Обновим документы 
        //                    foreach (OutgoingCars car in list_out_car)
        //                    {
        //                        int skip = list_num.IndexOf(car.id);
        //                        if (skip == -1)
        //                        {
        //                            WagonInternalRoutes wir = ef_wir.Context.Where(n => n.id_outgoing_car == car.id).FirstOrDefault();
        //                            if (wir != null)
        //                            {
        //                                ArrivalCars arr_car = ef_arr_car.Context.Where(a => a.id == wir.id_arrival_car).FirstOrDefault();
        //                                if (arr_car != null)
        //                                {
        //                                    ArrivalSostav arr_sostav = ef_arr_sostav.Context.Where(s => s.id == arr_car.id_arrival).FirstOrDefault();
        //                                    if (arr_sostav != null)
        //                                    {
        //                                        UZ.UZ_DOC new_uz_doc = GetSendingEPD(car, (DateTime)arr_sostav.date_adoption, sostav.date_readiness_amkr, true);
        //                                        if (new_uz_doc != null)
        //                                        {
        //                                            if (new_uz_doc.otpr != null && new_uz_doc.otpr.vagon != null && new_uz_doc.otpr.vagon.Length > 0)
        //                                            {
        //                                                foreach (VAGON vag in new_uz_doc.otpr.vagon)
        //                                                {
        //                                                    OutgoingCars out_car = list_out_car.Where(v => v.num.ToString() == vag.nomer).FirstOrDefault();
        //                                                    if (out_car == null)
        //                                                    {
        //                                                        continue;
        //                                                    }
        //                                                    EPDOutgoingCar new_update_epd = new EPDOutgoingCar()
        //                                                    {
        //                                                        id_outgoing_car = out_car.id,
        //                                                        epd = new_uz_doc
        //                                                    };
        //                                                    list_update_epd.Add(new_update_epd); // добавим  в список обновления
        //                                                    list_num.Add(out_car.id); // Добавим в исключение
        //                                                }
        //                                            }
        //                                        }

        //                                    }
        //                                }
        //                            }
        //                        }
        //                    }
        //                    // Сгруппируем документы по id_doc уз
        //                    List<IGrouping<string, EPDOutgoingCar>> group_outgoing_car = list_update_epd.ToList().GroupBy(d => d.epd.id_doc).ToList();
        //                    // Пройдемся по документам
        //                    foreach (IGrouping<string, EPDOutgoingCar> out_cars in group_outgoing_car)
        //                    {
        //                        List<EPDOutgoingCar> list_cars = out_cars.ToList();
        //                        // Выполним обновление всего пула документов
        //                        int result = UpdateOutgoing_UZ_Document(ref context, out_cars.Key, list_cars, user);
        //                        // Запомним результат
        //                        foreach (EPDOutgoingCar car in list_cars)
        //                        {
        //                            rt.SetResultOperation(result, car.id_outgoing_car);
        //                        }
        //                    }
        //                    // Проверка на ошибку
        //                    if (rt.error == 0)
        //                    {
        //                        //sostav.change = DateTime.Now;
        //                        //sostav.change_user = user;
        //                        //ef_out_sostav.Update(sostav);
        //                        if (rt.listResult.Count() > 0)
        //                        {
        //                            rt.SetResult(context.SaveChanges());
        //                        }
        //                    }
        //                    else
        //                    {
        //                        rt.SetResult((int)errors_base.error_save_changes); // Были ошибки по ходу выполнения всей операций
        //                    }
        //                }
        //                else
        //                {
        //                    rt.SetResult((int)errors_base.not_outgoing_cars_db); // В базе данных нет записи по вагонам для отпправки
        //                }
        //            }
        //            else
        //            {
        //                rt.SetResult((int)errors_base.error_status_outgoing_sostav); // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
        //            }
        //        }
        //        else
        //        {
        //            rt.SetResult((int)errors_base.not_outgoing_sostav_db); //В базе данных нет записи состава для оправки
        //        }
        //        return rt;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("OperationUpdateEPDSendingSostav(context={0}, id_outgoing_sostav={1}, user={2})",
        //            context, id_outgoing_sostav, user), servece_owner, eventID);
        //        rt.SetResult((int)errors_base.global);
        //        return rt;// Возвращаем id=-1 , Ошибка
        //    }
        //}
        public OperationResultID OperationUpdateEPDSendingSostav(ref EFDbContext context, long id_outgoing_sostav, int type_searsh, string user)
        {
            OperationResultID rt = new OperationResultID();
            try
            {
                if (context == null)
                {
                    context = new EFIDS.Concrete.EFDbContext();
                }
                ;
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                EFArrivalCars ef_arr_car = new EFArrivalCars(context);
                EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);

                OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == id_outgoing_sostav).FirstOrDefault();
                if (sostav != null)
                {
                    // Состав определен (сдан или отправлен)
                    if (sostav.status >= 2 && sostav.status <= 3)
                    {
                        List<int> skip_num = new List<int>();
                        List<OutgoingCars> list_out_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList(); //  && c.num == 61284964
                        if (list_out_car != null && list_out_car.Count() > 0)
                        {
                            skip_num.Clear();
                            List<EPDOutgoingCar> list_update_epd = new List<EPDOutgoingCar>(); // Список для обновления
                            List<long> list_num = new List<long>();
                            // Обновим документы 
                            foreach (OutgoingCars car in list_out_car.ToList())
                            {
                                int skip = list_num.IndexOf(car.id);
                                if (skip == -1)
                                {
                                    WagonInternalRoutes wir = ef_wir.Context.Where(n => n.id_outgoing_car == car.id).FirstOrDefault();
                                    if (wir != null)
                                    {
                                        ArrivalCars arr_car = ef_arr_car.Context.Where(a => a.id == wir.id_arrival_car).FirstOrDefault();
                                        if (arr_car != null)
                                        {
                                            ArrivalSostav arr_sostav = ef_arr_sostav.Context.Where(s => s.id == arr_car.id_arrival).FirstOrDefault();
                                            if (arr_sostav != null)
                                            {
                                                UZ.UZ_DOC new_uz_doc = GetSendingEPD(car, (DateTime)arr_sostav.date_adoption, sostav.date_departure_amkr != null ? (DateTime)sostav.date_departure_amkr : (sostav.date_outgoing != null ? ((DateTime)sostav.date_outgoing).AddHours(this.min_period_preparation_of_epd) : sostav.date_readiness_amkr), type_searsh);
                                                if (new_uz_doc != null)
                                                {
                                                    if (new_uz_doc.otpr != null && new_uz_doc.otpr.vagon != null && new_uz_doc.otpr.vagon.Length > 0)
                                                    {
                                                        foreach (VAGON vag in new_uz_doc.otpr.vagon)
                                                        {
                                                            OutgoingCars out_car = list_out_car.Where(v => v.num.ToString() == vag.nomer).FirstOrDefault();
                                                            if (out_car == null)
                                                            {
                                                                continue;
                                                            }
                                                            EPDOutgoingCar new_update_epd = new EPDOutgoingCar()
                                                            {
                                                                id_outgoing_car = out_car.id,
                                                                epd = new_uz_doc
                                                            };
                                                            list_update_epd.Add(new_update_epd); // добавим  в список обновления
                                                            list_num.Add(out_car.id); // Добавим в исключение
                                                        }
                                                    }
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                            // Сгруппируем документы по id_doc уз
                            List<IGrouping<string, EPDOutgoingCar>> group_outgoing_car = list_update_epd.ToList().GroupBy(d => d.epd.id_doc).ToList();
                            // Пройдемся по документам
                            foreach (IGrouping<string, EPDOutgoingCar> out_cars in group_outgoing_car)
                            {
                                List<EPDOutgoingCar> list_cars = out_cars.ToList();
                                // Выполним обновление всего пула документов
                                int result = UpdateOutgoing_UZ_Document(ref context, out_cars.Key, list_cars, user);
                                // Запомним результат
                                foreach (EPDOutgoingCar car in list_cars)
                                {
                                    rt.SetResultOperation(result, car.id_outgoing_car);
                                }
                            }
                            // Проверка на ошибку
                            if (rt.error == 0)
                            {
                                //sostav.change = DateTime.Now;
                                //sostav.change_user = user;
                                //ef_out_sostav.Update(sostav);
                                if (rt.listResult.Count() > 0)
                                {
                                    rt.SetResult(context.SaveChanges());
                                }
                            }
                            else
                            {
                                rt.SetResult((int)errors_base.error_save_changes); // Были ошибки по ходу выполнения всей операций
                            }
                        }
                        else
                        {
                            rt.SetResult((int)errors_base.not_outgoing_cars_db); // В базе данных нет записи по вагонам для отпправки
                        }
                    }
                    else
                    {
                        rt.SetResult((int)errors_base.error_status_outgoing_sostav); // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                    }
                }
                else
                {
                    rt.SetResult((int)errors_base.not_outgoing_sostav_db); //В базе данных нет записи состава для оправки
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateEPDSendingSostav(context={0}, id_outgoing_sostav={1}, type_searsh={2}, user={3})",
                    context, id_outgoing_sostav, type_searsh, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Операция обновить документы ЭПД по составу
        /// </summary>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultID OperationUpdateEPDSendingSostav(long id_outgoing_sostav, string user)
        {
            OperationResultID rt = new OperationResultID();
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                return OperationUpdateEPDSendingSostav(ref context, id_outgoing_sostav, 1, user);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateEPDSendingSostav(id_outgoing_sostav={0}, user={1})",
                    id_outgoing_sostav, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        public OperationResultID OperationUpdateEPDSendingCar(ref EFDbContext context, long id_car, string user)
        {
            OperationResultID rt = new OperationResultID();
            try
            {
                if (context == null)
                {
                    context = new EFIDS.Concrete.EFDbContext();
                }
                ;
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                //EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFUZ_DOC_OUT ef_uz_doc = new EFUZ_DOC_OUT(context);
                OutgoingCars car = ef_out_car.Context.Where(s => s.id == id_car).FirstOrDefault();
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                EFArrivalCars ef_arr_car = new EFArrivalCars(context);
                EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);
                if (car != null)
                {
                    // Найдем все вагоны состава
                    long id_sostav = car.OutgoingSostav.id;
                    List<OutgoingCars> cars = ef_out_car.Context.Where(c => c.id_outgoing == id_sostav).ToList();
                    //--------------------------------
                    WagonInternalRoutes wir = ef_wir.Context.Where(n => n.id_outgoing_car == car.id).FirstOrDefault();
                    if (wir != null)
                    {
                        ArrivalCars arr_car = ef_arr_car.Context.Where(a => a.id == wir.id_arrival_car).FirstOrDefault();
                        if (arr_car != null)
                        {
                            ArrivalSostav arr_sostav = ef_arr_sostav.Context.Where(s => s.id == arr_car.id_arrival).FirstOrDefault();
                            if (arr_sostav != null)
                            {

                                UZ.UZ_DOC new_uz_doc = GetSendingEPD(car, (DateTime)arr_sostav.date_adoption, car.OutgoingSostav.date_departure_amkr != null ? (DateTime)car.OutgoingSostav.date_departure_amkr : (car.OutgoingSostav.date_outgoing != null ? ((DateTime)car.OutgoingSostav.date_outgoing).AddHours(this.min_period_preparation_of_epd) : car.OutgoingSostav.date_readiness_amkr), 1);
                                if (new_uz_doc != null)
                                {
                                    List<EPDOutgoingCar> list_cars = new List<EPDOutgoingCar>();
                                    List<String> vagons = new List<string>();
                                    if (new_uz_doc.otpr != null && new_uz_doc.otpr.vagon != null && new_uz_doc.otpr.vagon.Count() > 0)
                                    {
                                        vagons = new_uz_doc.otpr.vagon.ToList().Select(w => w.nomer).ToList();
                                    }
                                    foreach (string vag in vagons)
                                    {
                                        OutgoingCars wag = cars.Where(c => c.num == int.Parse(vag)).FirstOrDefault();
                                        if (wag != null) list_cars.Add(new EPDOutgoingCar() { id_outgoing_car = wag.id, epd = new_uz_doc });
                                    }
                                    // Выполним обновление всего пула документов
                                    int result = UpdateOutgoing_UZ_Document(ref context, new_uz_doc.id_doc, list_cars, user);
                                    rt.SetResultOperation(result, car.id);
                                    // Проверка на ошибку
                                    if (rt.error == 0)
                                    {
                                        if (rt.listResult.Count() > 0)
                                        {
                                            rt.SetResult(context.SaveChanges());
                                        }
                                    }
                                    else
                                    {
                                        rt.SetResult((int)errors_base.error_save_changes); // Были ошибки по ходу выполнения всей операций
                                    }

                                }
                                else
                                {
                                    rt.SetResult((int)errors_base.not_out_uz_vag_db); //В базе данных нет документов для обновления
                                }
                            }
                        }
                    }
                    //------------------------------------
                }
                else
                {
                    rt.SetResult((int)errors_base.not_outgoing_cars_db); //В базе данных нет записи состава для оправки
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateEPDSendingCar(context={0}, id_car={1}, user={2})",
                    context, id_car, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        public OperationResultID OperationUpdateEPDSendingCar(long id_car, string user)
        {
            OperationResultID rt = new OperationResultID();
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                return OperationUpdateEPDSendingCar(ref context, id_car, user);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateEPDSendingCar(id_car={0}, user={1})",
                    id_car, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        public OperationResultID OperationClearEPDSendingSostav(ref EFDbContext context, long id_outgoing_sostav, string user)
        {
            OperationResultID rt = new OperationResultID();
            try
            {
                if (context == null)
                {
                    context = new EFIDS.Concrete.EFDbContext();
                }
                ;
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                EFOutgoing_UZ_Vagon ef_vag_uz = new EFOutgoing_UZ_Vagon(context);

                OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == id_outgoing_sostav).FirstOrDefault();
                if (sostav != null)
                {
                    // Состав определен (сдан или отправлен)
                    if (sostav.status >= 2 && sostav.status <= 3)
                    {
                        //List<int> skip_num = new List<int>();
                        List<OutgoingCars> list_out_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList(); //  && c.num == 61284964
                        if (list_out_car != null && list_out_car.Count() > 0)
                        {
                            // Обновим документы 
                            foreach (OutgoingCars car in list_out_car)
                            {
                                Outgoing_UZ_Vagon vag_uz = ef_vag_uz.Context.Where(v => v.id == car.id_outgoing_uz_vagon).FirstOrDefault();
                                if (vag_uz != null)
                                {
                                    vag_uz.id_document = null;
                                    vag_uz.change = DateTime.Now;
                                    vag_uz.change_user = user;
                                    ef_vag_uz.Update(vag_uz);
                                }
                                car.num_doc = null;
                                car.change = DateTime.Now;
                                car.change_user = user;
                                ef_out_car.Update(car);
                                rt.SetResultOperation(1, car.id);
                            }
                            // Проверка на ошибку
                            if (rt.error == 0)
                            {
                                if (rt.listResult.Count() > 0)
                                {
                                    rt.SetResult(context.SaveChanges());
                                }
                            }
                            else
                            {
                                rt.SetResult((int)errors_base.error_save_changes); // Были ошибки по ходу выполнения всей операций
                            }
                        }
                        else
                        {
                            rt.SetResult((int)errors_base.not_outgoing_cars_db); // В базе данных нет записи по вагонам для отпправки
                        }
                    }
                    else
                    {
                        rt.SetResult((int)errors_base.error_status_outgoing_sostav); // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                    }
                }
                else
                {
                    rt.SetResult((int)errors_base.not_outgoing_sostav_db); //В базе данных нет записи состава для оправки
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationClearEPDSendingSostav(context={0}, id_outgoing_sostav={1}, user={2})",
                    context, id_outgoing_sostav, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        public OperationResultID OperationClearEPDSendingSostav(long id_outgoing_sostav, string user)
        {
            OperationResultID rt = new OperationResultID();
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                return OperationClearEPDSendingSostav(ref context, id_outgoing_sostav, user);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationClearEPDSendingSostav(id_outgoing_sostav={0}, user={1})",
                    id_outgoing_sostav, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }

        /// <summary>
        /// Обновить документы по отправленным составам
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateSendingEPD(string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                DateTime date_exceeded = DateTime.Now.AddDays(-1 * this.day_arhive_epd_sending);
                OperationResultID res = new OperationResultID();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                //IDS_WIR ids_wir = new IDS_WIR(this.servece_owner);
                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);

                EFIDS.Concrete.EFDbContext context_ids = new EFIDS.Concrete.EFDbContext();
                // Выполним запрос и получим все ЭПД с признапком не закрыт
                string sql = "select * from [IDS].[get_view_uz_doc_sending]() where status_sostav >=2 and  [position_outgoing] is not null and ([num_doc] is null or [status]<>8)";
                List<UZ_DOC_Sending> list_uz_doc_all = context_ids.Database.SqlQuery<UZ_DOC_Sending>(sql).ToList();
                List<UZ_DOC_Sending> list_uz_doc = list_uz_doc_all.Where(d => d.date_outgoing >= date_exceeded).ToList();
                // Сгруппируем по id сотава для отправки
                List<IGrouping<long, UZ_DOC_Sending>> group_uz_doc = list_uz_doc.ToList().GroupBy(d => d.id_sostav).ToList();
                int count = group_uz_doc != null ? group_uz_doc.Count() : 0;
                int upd_cars = 0; // Количество обновленных вагонов в составах
                int all_cars = 0; // Количество общее вагонов в составах
                                  // Пройдемся по составам
                foreach (IGrouping<long, UZ_DOC_Sending> uz_doc_sostav in group_uz_doc.OrderBy(c => c.Key))
                //foreach (IGrouping<long, UZ_DOC_Sending> uz_doc_sostav in group_uz_doc.Where(s => s.Key == 396405))
                {
                    List<UZ_DOC_Sending> list_cars = uz_doc_sostav.ToList();
                    all_cars += list_cars != null ? list_cars.Count() : 0; // Добавим общее количество вагонов
                                                                           // Выполним обновление всего пула документов
                    DateTime dt = new DateTime(2023, 11, 2, 0, 0, 0);
                    if (uz_doc_sostav.ToList()[0].date_outgoing >= dt)
                    {
                        Console.WriteLine(String.Format("Обрабатываю id={0}, num_doc={1} data={2}", uz_doc_sostav.Key, uz_doc_sostav.ToList()[0].num_doc, uz_doc_sostav.ToList()[0].date_outgoing));
                        OperationResultID result = OperationUpdateEPDSendingSostav(ref context_ids, uz_doc_sostav.Key, 1, user);
                        if (result.result > 0)
                        {
                            upd_cars += result.result; // Добавим добавленное количество вагонов
                        }
                        // Запомним результат
                        res.SetResultOperation(result.result, uz_doc_sostav.Key);
                        string mess_update = String.Format("ID состава {0}, определено вагонов {1}, обновлено {2} ошибок {3}, осталось составов {4}", uz_doc_sostav.Key, (list_cars != null ? list_cars.Count() : 0), result.result, result.error, --count);

                        mess_update.WarningLog(servece_owner, eventID);
                    }
                }
                res.SetResult(upd_cars);
                //
                string mess = String.Format("Операция обновления ЭПД по отправке. Код выполнения = {0}. Результат обновления [определено {1} вагонов в {2} составах, обновлено вагонов {3}, ошибок обновления {4}].",
                    res.result, all_cars, group_uz_doc != null ? group_uz_doc.Count() : 0, res.result, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция обновления ЭПД по отправке"), start, stop, res.result);
                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateSendingEPD(user = {0})", user), servece_owner, eventID);
                return (int)errors_base.global;// Ошибка
            }
        }
        /// <summary>
        /// Метод обновления документов по отправке зашедших первый раз по которым обновили информацию (Род.. Адм.. ) после отправки
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateID UpdateOutgoing_UZ_Document(string user)
        {
            ResultUpdateID result = new ResultUpdateID(0);
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                //IDS_Directory ids_dir = new IDS_Directory(this.servece_owner);

                EFDbContext context = new EFDbContext();
                EFOutgoing_UZ_Vagon ef_out_uz_doc_vag = new EFOutgoing_UZ_Vagon(context);
                EFDirectory_Wagons ef_vag = new EFDirectory_Wagons(context);
                List<Outgoing_UZ_Vagon> list_out_uz_doc_vag = ef_out_uz_doc_vag.Context.Where(v => v.id_genus == 0 || v.id_countrys == 0 && v.num > 20000000).ToList();
                //list_out_uz_doc_vag = list_out_uz_doc_vag.Where(d => d.num == 26246199).ToList();
                result.count = list_out_uz_doc_vag.Count();
                int sum = 0;
                foreach (Outgoing_UZ_Vagon vag in list_out_uz_doc_vag)
                {
                    sum++;
                    if (vag.num.IsCorrectNumCar())
                    {
                        Directory_Wagons dir_wag = ef_vag.Context.Where(d => d.num == vag.num).FirstOrDefault();
                        if (dir_wag != null)
                        {


                            TimeSpan deff = vag.create - dir_wag.create;

                            //Console.Write("Вагон :{0}, отправлен {1}, создан в справочнике {2}, разница {3} час - ", vag.num, vag.create, dir_wag.create, deff.TotalHours);
                            // создание двух строк состоит в диапазоне 3 часов (тоесть вагон зашел первый раз, создалась строка справочника затем отметка о прибытии)
                            // Определится с временем задержки
                            if (deff.TotalHours <= 24 * 6)
                            {
                                // записи находятся в диапазоне
                                // Получим основные обновления
                                int id_countrys = dir_wag.id_countrys;
                                int id_genus = dir_wag.id_genus;
                                int id_owner = dir_wag.id_owner;
                                double gruzp = dir_wag.gruzp;
                                double? tara = dir_wag.tara;
                                // проверим изменения и обновим
                                bool update = false;
                                if ((vag.id_countrys == 0 || vag.id_countrys == null) && id_countrys != 0)
                                {
                                    vag.id_countrys = id_countrys;
                                    update = true;
                                }
                                if ((vag.id_genus == 0 || vag.id_genus == null) && id_genus != 0)
                                {
                                    vag.id_genus = id_genus;
                                    update = true;
                                }
                                if ((vag.id_owner == 0 || vag.id_owner == null) && id_owner != 0)
                                {
                                    vag.id_owner = id_owner;
                                    update = true;
                                }
                                if (vag.gruzp_uz == null && gruzp != 0)
                                {
                                    vag.gruzp_uz = gruzp;
                                    update = true;
                                }
                                if (update)
                                {
                                    vag.change_user = user;
                                    vag.change = DateTime.Now;
                                    ef_out_uz_doc_vag.Update(vag);
                                    result.SetUpdateResult(1, vag.id);
                                    //int context.SaveChanges();
                                }
                                else
                                {
                                    // Пропустить
                                    result.SetUpdateResult(0, vag.id);
                                }
                                //Console.Write("Зашел, осталось {0} \n", result.count - sum);

                            }
                            else
                            {
                                //Console.Write("Пропущенно!, осталось {0}\n", result.count - sum);
                                // Пропустить
                                result.SetUpdateResult(0, vag.id);
                            }
                        }
                        else
                        {
                            // Пропустить
                            result.SetUpdateResult(0, vag.id);
                        }
                    }
                    else
                    {
                        // Пропустить
                        result.SetCloseResult(1, vag.id);
                    }

                }
                // Обновим в базе
                if (result.count > 0 && result.update > 0)
                {
                    // Если без ошибок, тогда записываем результат применения 
                    result.SetResult(context.SaveChanges());
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Document(user={1})", user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;// Ошибка
            }
        }

        //public async void UpdateOutgoing_ASYNC(int[] nums, string user)
        //{
        //    ResultUpdateID result = new ResultUpdateID(0);
        //    try
        //    {
        //        // Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }

        //        List<Task<int>> res_tasks = new List<Task<int>>();

        //        foreach (int num in nums)
        //        {
        //            res_tasks.Add(SquareAsync(num));
        //        }
        //        //var task1 = SquareAsync(4);
        //        //var task2 = SquareAsync(5);
        //        //var task3 = SquareAsync(6);

        //        // ожидаем завершения всех задач
        //        int[] results = await Task.WhenAll(res_tasks.ToArray());
        //        // получаем результаты:
        //        foreach (int res in results)
        //            Console.WriteLine(res);
        //        //return result;


        //        async Task<int> SquareAsync(int num)
        //        {
        //            //await Task.Delay(1000);
        //            //return n * n;
        //            UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);

        //            List<UZ_DOC_FULL> list = uz_sms.Get_UZ_DOC_SMS_Of_NumWagon(num.ToString(), "7932");
        //            return list.Count();
        //        }


        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("UpdateOutgoing_ASYNC(user={1})", user), servece_owner, eventID);
        //        result.SetResult((int)errors_base.global);
        //        //return result;// Ошибка
        //    }
        //}
        //public async void UpdateOutgoing_Parallel(int[] nums, string user)
        //{
        //    //ResultUpdateID result = new ResultUpdateID(0);
        //    try
        //    {
        //        // Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }

        //        //UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);

        //        ParallelLoopResult result = Parallel.ForEach<int>(nums.ToList(), SquareAsync);


        //        //List<Task<int>> res_tasks = new List<Task<int>>();

        //        //foreach (int num in nums)
        //        //{
        //        //    res_tasks.Add(SquareAsync(num));
        //        //}
        //        ////var task1 = SquareAsync(4);
        //        ////var task2 = SquareAsync(5);
        //        ////var task3 = SquareAsync(6);

        //        //// ожидаем завершения всех задач
        //        //int[] results = await Task.WhenAll(res_tasks.ToArray());
        //        //// получаем результаты:
        //        //foreach (int res in results)
        //        //    Console.WriteLine(res);
        //        ////return result;


        //        void SquareAsync(int num)
        //        {
        //            //await Task.Delay(1000);
        //            //return n * n;
        //            UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);

        //            List<UZ_DOC_FULL> list = uz_sms.Get_UZ_DOC_SMS_Of_NumWagon(num.ToString(), null);
        //            //return list.Count();
        //        }


        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("UpdateOutgoing_ASYNC(user={1})", user), servece_owner, eventID);
        //        //result.SetResult((int)errors_base.global);
        //        //return result;// Ошибка
        //    }
        //}

        /// <summary>
        /// Обновить по сданному или отправленному составу оператора АМКР
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateWagon UpdateOperationOutgoingSostav(ref EFDbContext context, long id_outgoing_sostav, string user)
        {
            ResultUpdateWagon result = new ResultUpdateWagon(0);
            try
            {
                if (context == null)
                {
                    context = new EFIDS.Concrete.EFDbContext();
                }
                ;
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                EFOutgoing_UZ_Vagon ef_out_vag = new EFOutgoing_UZ_Vagon(context);
                EFDirectory_WagonsRent ef_wag_rent = new EFDirectory_WagonsRent(context);
                OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == id_outgoing_sostav).FirstOrDefault();
                List<ChangeID> del_id_wr = new List<ChangeID>(); // Список id rent для удаления

                if (sostav != null)
                {
                    // Состав определен (сдан или отправлен)
                    if (sostav.status >= 2 && sostav.status <= 3)
                    {
                        List<OutgoingCars> cars = ef_out_car.Context.Where(c => c.id_outgoing == sostav.id && c.position_outgoing != null).ToList();
                        result.count = cars.Count();
                        Console.WriteLine("По сотаву {0} Определено {1} вагонов", id_outgoing_sostav, result.count);
                        foreach (OutgoingCars car in cars)
                        {
                            Outgoing_UZ_Vagon vag = ef_out_vag.Context.Where(v => v.id == car.id_outgoing_uz_vagon).FirstOrDefault();
                            if (vag != null)
                            {
                                //List<Directory_WagonsRent> list_rent = ef_wag_rent.Context.Where(r => r.num == vag.num).ToList();

                                // сформируем список id для исправления
                                List<IGrouping<int?, Directory_WagonsRent>> list_double = ef_wag_rent.Context.Where(r => r.num == vag.num).GroupBy(g => g.parent_id).ToList().Where(g => g.Count() > 1).ToList();
                                if (list_double.Count > 0)
                                {
                                    foreach (IGrouping<int?, Directory_WagonsRent> gr_wr in list_double)
                                    {
                                        ChangeID ch_id = new ChangeID();
                                        foreach (Directory_WagonsRent wr in gr_wr.ToList())
                                        {
                                            Directory_WagonsRent del_rent = ef_wag_rent.Context.Where(r => r.parent_id == wr.id).FirstOrDefault();
                                            if (del_rent == null)
                                            {
                                                ch_id.id_old = wr.id;
                                            }
                                            else
                                            {
                                                ch_id.id_new = wr.id;
                                            }
                                        }
                                        if (ch_id != null)
                                        {
                                            del_id_wr.Add(ch_id);
                                            Console.WriteLine("В справочнике аренд по вагону {0}, определено задвоение аренды, убрать :{1} оставить: {2}", vag.num, ch_id.id_old, ch_id.id_new);
                                        }
                                    }
                                }
                                // Получим аренды по данному вагону
                                Directory_WagonsRent rent = ef_wag_rent.Context.Where(r => r.num == vag.num && r.rent_start <= sostav.date_outgoing && r.rent_end > sostav.date_outgoing).FirstOrDefault();
                                Directory_WagonsRent rent_null = ef_wag_rent.Context.Where(r => r.num == vag.num && r.rent_start <= sostav.date_outgoing && r.rent_end == null).OrderByDescending(c => c.id).FirstOrDefault();
                                int? id_wagons_rent_outgoing = null;
                                id_wagons_rent_outgoing = rent != null ? (int?)rent.id : rent_null != null ? (int?)rent_null.id : null;
                                // если аренда новая и записаная - разные, изменим аренду
                                if (id_wagons_rent_outgoing != null && vag.id_wagons_rent_outgoing != id_wagons_rent_outgoing)
                                {
                                    vag.id_wagons_rent_outgoing = id_wagons_rent_outgoing;
                                    vag.change = DateTime.Now;
                                    vag.change_user = user;
                                    result.SetUpdateResult(1, vag.num);
                                    Console.WriteLine("По вагону {0} определена замена аренды на отправку {1}", vag.num, id_wagons_rent_outgoing);
                                }
                                else
                                {
                                    result.SetSkipResult(0, vag.num);
                                }
                            }
                        }
                        if (result.update > 0)
                        {
                            result.SetResult(context.SaveChanges());
                        }
                    }
                    else
                    {
                        result.SetResult((int)errors_base.error_status_outgoing_sostav); // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                    }
                }
                else
                {
                    result.SetResult((int)errors_base.not_outgoing_sostav_db); //В базе данных нет записи состава
                }
                Console.WriteLine("По составу {0} определено {1} вагонов (обновновить: {2}, пропустить :{3}), результат обновления :{4}", id_outgoing_sostav, result.count, result.update, result.skip, result.result);
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOperationOutgoingSostav(context={0}, id_outgoing_sostav={1}, user={2})",
                    context, id_outgoing_sostav, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Обновить по сданному или отправленному составу оператора АМКР
        /// </summary>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateWagon UpdateOperationOutgoingSostav(long id_outgoing_sostav, string user)
        {
            ResultUpdateWagon rt = new ResultUpdateWagon(0);
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                return UpdateOperationOutgoingSostav(ref context, id_outgoing_sostav, user);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOperationOutgoingSostav(id_outgoing_sostav={0}, user={1})",
                    id_outgoing_sostav, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Обновить оператора АМКР по сданным или отправленным составам с указаной даты
        /// </summary>
        /// <param name="date_outgoing"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultID UpdateOperationOutgoingSostav(DateTime date_outgoing, string user)
        {
            OperationResultID rt = new OperationResultID();
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                List<OutgoingSostav> list_sostav = ef_out_sostav.Context.Where(s => s.date_outgoing >= date_outgoing).ToList();
                foreach (OutgoingSostav sost in list_sostav)
                {
                    ResultUpdateWagon rt_st = UpdateOperationOutgoingSostav(sost.id, user);
                    rt.SetResultOperation(rt_st.result, sost.id);
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOperationOutgoingSostav(date_outgoing={0}, user={1})",
                    date_outgoing, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }

        #endregion

        #endregion

        #region Отчеты "Операции"
        /// <summary>
        /// Получить список вагонов с опрецией отправка за указаный период времени
        /// </summary>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <returns></returns>
        public List<wagon_operation_send> GetWagonsOperationOfSend(DateTime start, DateTime stop)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                context.Database.CommandTimeout = 300;
                System.Data.SqlClient.SqlParameter dstart = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter dstop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                System.Data.SqlClient.SqlParameter id_operation = new System.Data.SqlClient.SqlParameter("@id_operation", 5);
                string sql = "select * from [IDS].[get_view_wagons_of_operation](@start,@stop,@id_operation)";
                List<wagon_operation_send> list = context.Database.SqlQuery<wagon_operation_send>(sql, dstart, dstop, id_operation).ToList();
                context.Database.CommandTimeout = null;
                return list;
            }

            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetWagonsOperationOfSend(start={0}, stop={1})",
                    start, stop), servece_owner, eventID);
                return null; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Получить составы с вагонами с оперецией отправка за указанный период времени
        /// </summary>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        public List<sostav_operation_send> GetSostavWagonsOperationOfSend(DateTime start, DateTime stop)
        {
            try
            {
                int id = 1;
                List<sostav_operation_send> list_sostav = new List<sostav_operation_send>();
                List<wagon_operation_send> list = GetWagonsOperationOfSend(start, stop);
                if (list != null && list.Count() > 0)
                {
                    // Сгруппируем по времени операции
                    List<IGrouping<DateTime, wagon_operation_send>> wagons_date = list.OrderBy(c => c.operation_start).ToList()
                                    .ToList()
                                    .GroupBy(w => w.operation_start)
                                    .ToList();
                    // Пройдемся по индексу поезда
                    foreach (IGrouping<DateTime, wagon_operation_send> gr_outer_way in wagons_date.ToList())
                    {
                        DateTime operation_start = gr_outer_way.Key;
                        // Сгруппируем по перегону
                        List<IGrouping<int?, wagon_operation_send>> wagons_outer = gr_outer_way
                            .ToList()
                            .GroupBy(w => w.id_outer_way)
                            .ToList();

                        foreach (IGrouping<int?, wagon_operation_send> wagons_sostav in wagons_outer.ToList())
                        {
                            // Получим вагоны состава
                            List<wagon_operation_send> wagons = wagons_sostav.OrderBy(w => w.wim_position).ToList();
                            // Проверим есть вагоны
                            if (wagons != null && wagons.Count() > 0)
                            {
                                // Вагоны есть, создадим строку состав
                                sostav_operation_send sostav = new sostav_operation_send()
                                {
                                    id = id,
                                    id_operation = wagons[0].id_operation,
                                    operation_name_ru = wagons[0].operation_name_ru,
                                    operation_name_en = wagons[0].operation_name_en,
                                    operation_start = wagons[0].operation_start,
                                    operation_end = wagons[0].operation_end,
                                    operation_create = wagons.OrderByDescending(w => w.operation_create).FirstOrDefault().operation_create,
                                    operation_create_user = wagons[0].operation_create_user,
                                    operation_locomotive1 = wagons[0].operation_locomotive1,
                                    operation_locomotive2 = wagons[0].operation_locomotive2,
                                    from_id_station = wagons[0].from_id_station,
                                    from_station_name_ru = wagons[0].from_station_name_ru,
                                    from_station_name_en = wagons[0].from_station_name_en,
                                    from_station_abbr_ru = wagons[0].from_station_abbr_ru,
                                    from_station_abbr_en = wagons[0].from_station_abbr_en,
                                    from_id_way = wagons[0].from_id_way,
                                    from_id_park = wagons[0].from_id_park,
                                    from_way_num_ru = wagons[0].from_way_num_ru,
                                    from_way_num_en = wagons[0].from_way_num_en,
                                    from_way_name_ru = wagons[0].from_way_name_ru,
                                    from_way_name_en = wagons[0].from_way_name_en,
                                    from_way_abbr_ru = wagons[0].from_way_abbr_ru,
                                    from_way_abbr_en = wagons[0].from_way_abbr_en,
                                    id_outer_way = wagons[0].id_outer_way,
                                    name_outer_way_ru = wagons[0].name_outer_way_ru,
                                    name_outer_way_en = wagons[0].name_outer_way_en,
                                    outer_way_close = wagons[0].outer_way_close,
                                    outer_way_delete = wagons[0].outer_way_delete,
                                    outer_way_note = wagons[0].outer_way_note,
                                    id_station_on = wagons[0].id_station_on,
                                    on_station_name_ru = wagons[0].on_station_name_ru,
                                    on_station_name_en = wagons[0].on_station_name_en,
                                    on_station_abbr_ru = wagons[0].on_station_abbr_ru,
                                    on_station_abbr_en = wagons[0].on_station_abbr_en,
                                    count_wagon_send = wagons.Count(),
                                    count_wagon_arrival = wagons.Where(w => w.outer_way_end != null).Count(),
                                    wagons = wagons.ToList(),
                                };
                                id++;
                                list_sostav.Add(sostav);
                            }
                        }

                    }
                }
                return list_sostav;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetSostavWagonsOperationOfSend(start={0}, stop={1})",
                    start, stop), servece_owner, eventID);
                return null; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Получить список вагонов с операцией отправка и прибытие за указаный период времени
        /// </summary>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <returns></returns>
        public List<wagon_send_arrival> GetWagonsOperationOfSendArrival(DateTime start, DateTime stop)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                context.Database.CommandTimeout = 300;
                System.Data.SqlClient.SqlParameter dstart = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter dstop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                string sql = "select * from [IDS].[get_view_wagons_of_operation_send_arrival](@start,@stop)";
                List<wagon_send_arrival> list = context.Database.SqlQuery<wagon_send_arrival>(sql, dstart, dstop).ToList();
                context.Database.CommandTimeout = null;
                return list;
            }

            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetWagonsOperationOfSendArrival(start={0}, stop={1})",
                    start, stop), servece_owner, eventID);
                return null; // Глобальная ошибка
            }
        }

        #endregion

        #region Отчеты "Департамент по продажам"
        public List<ReportBorderCrossing> GetReportBorderCrossingOfNums(List<int> nums)
        {
            try
            {
                List<ReportBorderCrossing> list_report = new List<ReportBorderCrossing>();

                EFDbContext context = new EFDbContext();
                UZ.UZ_Convert convert = new UZ.UZ_Convert();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);

                foreach (int num in nums)
                {
                    DateTime? date_departure_amkr = null;
                    int? status = null;
                    DateTime? cross_time = null;
                    string border_crossing_stn = null;
                    string border_crossing_stn_name = null;
                    string client_kod_on = null;
                    string client_name_on = null;
                    int? vesg = null;
                    DateTime? epd_date_otpr = null;
                    DateTime? epd_date_pr = null;
                    int? epd_status = null;
                    string num_doc = null;
                    int? revision = null;
                    int? num_uz = null;


                    OutgoingCars out_car = ef_out_car.Context.Where(c => c.num == num).OrderByDescending(c => c.id).FirstOrDefault();
                    if (out_car != null)
                    {
                        date_departure_amkr = out_car.OutgoingSostav.date_departure_amkr;
                        status = out_car.OutgoingSostav.status;
                        UZ_DOC_OUT uz_doc_out = out_car.UZ_DOC_OUT;
                        if (uz_doc_out != null)
                        {
                            num_doc = uz_doc_out.num_doc;
                            revision = uz_doc_out.revision;
                            num_uz = uz_doc_out.num_uz;
                            epd_status = uz_doc_out.status;
                            UZ.OTPR otpr = convert.XMLToOTPR(uz_doc_out.xml_doc);
                            if (otpr != null)
                            {
                                epd_date_otpr = otpr.date_otpr;
                                epd_date_pr = otpr.date_pr;
                                // Погран переход
                                if (otpr.route != null && otpr.route.Count() > 0)
                                {
                                    ROUTE route = otpr.route[otpr.route.Count() - 1];
                                    if (route != null && route.joint != null && route.joint.Count() > 0)
                                    {
                                        foreach (JOINT jn in route.joint)
                                        {
                                            if (jn.admin == 22)
                                            {
                                                cross_time = jn.cross_time;
                                                border_crossing_stn = jn.stn;
                                                border_crossing_stn_name = jn.stn_name;
                                            }
                                        }
                                    }
                                }
                                // Грузополучатель
                                if (otpr.client != null && otpr.client.Count() > 0)
                                {
                                    foreach (CLIENT cl in otpr.client)
                                    {
                                        if (cl.type == "2")
                                        {
                                            client_kod_on = cl.kod;
                                            client_name_on = cl.name;
                                        }
                                    }
                                }
                                // груз
                                if (otpr.vagon != null && otpr.vagon.Count() > 0)
                                {
                                    VAGON vagon = otpr.vagon.ToList().Where(w => w.nomer == num.ToString()).FirstOrDefault();
                                    if (vagon != null && vagon.collect_v != null && vagon.collect_v.Count() > 0)
                                    {
                                        vesg = vagon.collect_v[0].vesg;
                                    }
                                }
                            }
                        }
                    }
                    ReportBorderCrossing rbc = new ReportBorderCrossing()
                    {
                        num = num,
                        status = status,
                        date_departure_amkr = date_departure_amkr,
                        cross_time = cross_time,
                        border_crossing_stn = border_crossing_stn,
                        border_crossing_stn_name = border_crossing_stn_name,
                        client_kod_on = client_kod_on,
                        client_name_on = client_name_on,
                        vesg = vesg,
                        epd_status = epd_status,
                        epd_date_otpr = epd_date_otpr,
                        epd_date_pr = epd_date_pr,
                        num_doc = num_doc,
                        revision = revision,
                        num_uz = num_uz,
                    };
                    list_report.Add(rbc);
                }

                return list_report;
            }

            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetReportBorderCrossingOfNums(nums={0})", nums), servece_owner, eventID);
                return null; // Глобальная ошибка
            }
        }

        public List<ReportBorderCrossing> GetReportBorderCrossingOfNumsEPD(List<int> nums)
        {
            try
            {
                List<ReportBorderCrossing> list_report = new List<ReportBorderCrossing>();

                EFDbContext context = new EFDbContext();
                UZ.UZ_Convert convert = new UZ.UZ_Convert();
                //EFOutgoingCars ef_out_car = new EFOutgoingCars(context);

                foreach (int num in nums)
                {
                    DateTime? date_departure_amkr = null;
                    int? status = null;
                    DateTime? cross_time = null;
                    string border_crossing_stn = null;
                    string border_crossing_stn_name = null;
                    string client_kod_on = null;
                    string client_name_on = null;
                    int? vesg = null;
                    DateTime? epd_date_otpr = null;
                    DateTime? epd_date_pr = null;
                    int? epd_status = null;
                    string num_doc = null;
                    int? revision = null;
                    int? num_uz = null;

                    List<UZ_DOC_OUT> docs = context.UZ_DOC_OUT.Where(c => c.num_uz == num).ToList();

                    foreach (UZ_DOC_OUT uz_doc_out in docs)
                    {
                        if (uz_doc_out != null)
                        {
                            num_doc = uz_doc_out.num_doc;
                            revision = uz_doc_out.revision;
                            num_uz = uz_doc_out.num_uz;
                            epd_status = uz_doc_out.status;
                            UZ.OTPR otpr = convert.XMLToOTPR(uz_doc_out.xml_doc);
                            if (otpr != null)
                            {
                                epd_date_otpr = otpr.date_otpr;
                                epd_date_pr = otpr.date_pr;

                                if (otpr.frontier_mark != null && otpr.frontier_mark.Count() > 0) { 
                                
                                }
                                // Погран переход
                                if (otpr.route != null && otpr.route.Count() > 0)
                                {
                                    ROUTE route = otpr.route[otpr.route.Count() - 1];
                                    if (route != null && route.joint != null && route.joint.Count() > 0)
                                    {
                                        foreach (JOINT jn in route.joint)
                                        {
                                            if (jn.admin == 22)
                                            {
                                                cross_time = jn.cross_time;
                                                border_crossing_stn = jn.stn;
                                                border_crossing_stn_name = jn.stn_name;
                                            }
                                        }
                                    }
                                }
                                // Грузополучатель
                                if (otpr.client != null && otpr.client.Count() > 0)
                                {
                                    foreach (CLIENT cl in otpr.client)
                                    {
                                        if (cl.type == "2")
                                        {
                                            client_kod_on = cl.kod;
                                            client_name_on = cl.name;
                                        }
                                    }
                                }
                                // груз
                                if (otpr.vagon != null && otpr.vagon.Count() > 0)
                                {
                                    VAGON vagon = otpr.vagon.ToList().Where(w => w.nomer == num.ToString()).FirstOrDefault();
                                    if (vagon != null && vagon.collect_v != null && vagon.collect_v.Count() > 0)
                                    {
                                        vesg = vagon.collect_v[0].vesg;
                                    }
                                }
                            }
                        }

                        ReportBorderCrossing rbc = new ReportBorderCrossing()
                        {
                            num = num,
                            status = status,
                            date_departure_amkr = date_departure_amkr,
                            cross_time = cross_time,
                            border_crossing_stn = border_crossing_stn,
                            border_crossing_stn_name = border_crossing_stn_name,
                            client_kod_on = client_kod_on,
                            client_name_on = client_name_on,
                            vesg = vesg,
                            epd_status = epd_status,
                            epd_date_otpr = epd_date_otpr,
                            epd_date_pr = epd_date_pr,
                            num_doc = num_doc,
                            revision = revision,
                            num_uz = num_uz,
                        };
                        list_report.Add(rbc);
                    }
                }

                return list_report;
            }

            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetReportBorderCrossingOfNumsEPD(nums={0})", nums), servece_owner, eventID);
                return null; // Глобальная ошибка
            }
        }
        public List<ReportBorderCrossing> GetReportBorderCrossingOfNumsEPD_DB(List<int> nums, int depart_code, DateTime lower_date, DateTime upper_date)
        {
            try
            {
                List<ReportBorderCrossing> list_report = new List<ReportBorderCrossing>();

                EFDbContext context = new EFDbContext();
                UZ.UZ_Convert convert = new UZ.UZ_Convert();
                UZ.UZ_SMS sms = new UZ.UZ_SMS();
                List<UZ.OTPR> otprs = sms.GetDocumentsOfDB_Period(depart_code, lower_date, upper_date);

                foreach (int num in nums)
                {
                    DateTime? date_departure_amkr = null;
                    int? status = null;
                    DateTime? cross_time = null;
                    string border_crossing_stn = null;
                    string border_crossing_stn_name = null;
                    string client_kod_on = null;
                    string client_name_on = null;
                    int? vesg = null;
                    DateTime? epd_date_otpr = null;
                    DateTime? epd_date_pr = null;
                    int? epd_status = null;
                    string num_doc = null;
                    int? revision = null;
                    int? num_uz = null;

                    UZ.OTPR otpr = otprs.Where(o => o.nom_doc == num).FirstOrDefault();
                    if (otpr != null)
                    {
                        epd_date_otpr = otpr.date_otpr;
                        epd_date_pr = otpr.date_pr;
                        if (otpr.frontier_mark != null && otpr.frontier_mark.Count() > 0)
                        {

                        }
                        // Погран переход
                        if (otpr.route != null && otpr.route.Count() > 0)
                        {
                            ROUTE route = otpr.route[otpr.route.Count() - 1];
                            if (route != null && route.joint != null && route.joint.Count() > 0)
                            {
                                foreach (JOINT jn in route.joint)
                                {
                                    if (jn.admin == 22)
                                    {
                                        cross_time = jn.cross_time;
                                        border_crossing_stn = jn.stn;
                                        border_crossing_stn_name = jn.stn_name;
                                    }
                                }
                            }
                        }
                        // Грузополучатель
                        if (otpr.client != null && otpr.client.Count() > 0)
                        {
                            foreach (CLIENT cl in otpr.client)
                            {
                                if (cl.type == "2")
                                {
                                    client_kod_on = cl.kod;
                                    client_name_on = cl.name;
                                }
                            }
                        }
                        // груз
                        if (otpr.vagon != null && otpr.vagon.Count() > 0)
                        {
                            VAGON vagon = otpr.vagon.ToList().Where(w => w.nomer == num.ToString()).FirstOrDefault();
                            if (vagon != null && vagon.collect_v != null && vagon.collect_v.Count() > 0)
                            {
                                vesg = vagon.collect_v[0].vesg;
                            }
                        }
                        ReportBorderCrossing rbc = new ReportBorderCrossing()
                        {
                            num = num,
                            status = status,
                            date_departure_amkr = date_departure_amkr,
                            cross_time = cross_time,
                            border_crossing_stn = border_crossing_stn,
                            border_crossing_stn_name = border_crossing_stn_name,
                            client_kod_on = client_kod_on,
                            client_name_on = client_name_on,
                            vesg = vesg,
                            epd_status = epd_status,
                            epd_date_otpr = epd_date_otpr,
                            epd_date_pr = epd_date_pr,
                            num_doc = null,
                            revision = revision,
                            num_uz = otpr.nom_doc,
                        };
                        list_report.Add(rbc);
                    }
                }
                return list_report;
            }

            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetReportBorderCrossingOfNumsEPD_DB(nums={0}, depart_code={1}, lower_date={2}, upper_date={3})", nums, depart_code, lower_date, upper_date), servece_owner, eventID);
                return null; // Глобальная ошибка
            }
        }
        #endregion



        #region Сервис "Коммерческое состояние (Разметка)"
        /// <summary>
        /// Правка разметки по прибытию
        /// </summary>
        /// <param name="id_wir"></param>
        /// <param name="id_condition_arrival"></param>
        /// <param name="note"></param>
        /// <param name="distinguish"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ServiceChangeCommercialCondition(long id_wir, int id_condition_arrival, string note, bool distinguish, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                EFWagonInternalOperation ef_wio = new EFWagonInternalOperation(context);
                WagonInternalRoutes wir = ef_wir.Context.Where(w => w.id == id_wir).FirstOrDefault();
                // Получим текущее внутренее перемещение
                if (wir == null) return (int)errors_base.not_wir_db;        // В базе данных нет записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                if (wir.close != null) return (int)errors_base.close_wir;   // Внутренее перемещение уже закрыто
                if (wir.OutgoingCars != null && wir.OutgoingCars.OutgoingSostav != null && wir.OutgoingCars.OutgoingSostav.status > 1) return (int)errors_base.error_status_outgoing_sostav; //Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                                                                                                                                                                                             // Получим текущую операцию
                WagonInternalOperation curr_wio = wir.WagonInternalOperation.ToList().OrderByDescending(w => w.id).FirstOrDefault();
                if (curr_wio == null) return (int)errors_base.not_wio_db; // В базе данных нет записи по WagonInternalOperation (Внутренняя операция по вагону)
                WagonInternalOperation wio = ef_wio.Context.Where(w => w.id == curr_wio.id).FirstOrDefault();
                if (wio == null) return (int)errors_base.not_wio_db; // В базе данных нет записи по WagonInternalOperation (Внутренняя операция по вагону)
                                                                     // Выполним операцию
                wio.id_condition = id_condition_arrival;
                wio.con_change = DateTime.Now;
                wio.con_change_user = user;
                ef_wio.Update(wio);
                wir.note = note.Substring(0, note.Length > 250 ? 250 : note.Length).Trim();
                if (distinguish == true)
                {
                    wir.highlight_color = "#ffcbcb";
                }
                else
                {
                    wir.highlight_color = null;
                }
                ef_wir.Update(wir);
                return context.SaveChanges();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ServiceChangeCommercialCondition(id_wir={0}, id_condition_arrival={1}, note={2}, distinguish={3}, user={4})", id_wir, id_condition_arrival, note, distinguish, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }

        }
        #endregion

        #region Сервис "Заадресовка вагонов"
        public int ServiceChangeWagonAddressing(int id_division_on_amkr, int? id_commercial_condition, int? id_certification_data, int code_stn_from, List<int> list_arrival_uz_vagon_id, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                if (list_arrival_uz_vagon_id == null || list_arrival_uz_vagon_id.Count() == 0) return (int)errors_base.not_input_list_wagons;  // Не указан список вагонов
                EFArrival_UZ_Vagon ef_arr_uz_vag = new EFArrival_UZ_Vagon(context);
                EFArrival_UZ_Document ef_arr_uz_doc = new EFArrival_UZ_Document(context);
                foreach (int id in list_arrival_uz_vagon_id)
                {
                    Arrival_UZ_Vagon arr_uz_vag = ef_arr_uz_vag.Context.Where(v => v.id == id).FirstOrDefault();
                    if (arr_uz_vag == null) return (int)errors_base.not_inp_uz_vag_db;  // В базе данных нет записи документа на вагон.
                    Arrival_UZ_Document arr_uz_doc = ef_arr_uz_doc.Context.Where(v => v.id == arr_uz_vag.id_document).FirstOrDefault();
                    if (arr_uz_doc == null) return (int)errors_base.not_inp_uz_doc_db;  // В базе данных нет записи документа на состав.
                    arr_uz_vag.id_division_on_amkr = id_division_on_amkr != -1 ? id_division_on_amkr : arr_uz_vag.id_division_on_amkr;
                    arr_uz_vag.id_commercial_condition = id_commercial_condition != -1 ? id_commercial_condition : arr_uz_vag.id_commercial_condition;
                    arr_uz_vag.id_certification_data = id_certification_data != -1 ? id_certification_data : arr_uz_vag.id_certification_data;
                    if (id_division_on_amkr != -1 && id_commercial_condition != -1 && id_certification_data != -1)
                    {
                        arr_uz_vag.change = DateTime.Now;
                        arr_uz_vag.change_user = user;
                    }
                    ef_arr_uz_vag.Update(arr_uz_vag);
                    arr_uz_doc.code_stn_from = code_stn_from != -1 ? code_stn_from : arr_uz_doc.code_stn_from;
                    if (code_stn_from != -1)
                    {
                        arr_uz_doc.change = DateTime.Now;
                        arr_uz_doc.change_user = user;
                    }
                    ef_arr_uz_doc.Update(arr_uz_doc);
                }
                return context.SaveChanges();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ServiceChangeWagonAddressing(id_division_on_amkr={0}, id_commercial_condition={1}, id_certification_data={2}, code_stn_from={3}, list_arrival_uz_vagon_id={4}, user={5})",
                    id_division_on_amkr, id_commercial_condition, id_certification_data, code_stn_from, list_arrival_uz_vagon_id, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        #endregion

        #region Сервис "Расчет платы за пользование"
        /// <summary>
        /// Класс данных периоды ставок по вагону
        /// </summary>
        public class Wagon_Usage_Fee_Period
        {
            public DateTime? date_adoption { get; set; }
            public DateTime? date_outgoing { get; set; }
            public int id_operator { get; set; }
            public int id_genus { get; set; }
            public DateTime start { get; set; }
            public DateTime stop { get; set; }
            public int? id_currency { get; set; }
            public decimal? rate { get; set; }
            public int? id_currency_derailment { get; set; }
            public decimal? rate_derailment { get; set; }
            public float? coefficient_route { get; set; }
            public float? coefficient_not_route { get; set; }
            public int? grace_time_1 { get; set; }
            public int? grace_time_2 { get; set; }
            public bool? hour_after_30 { get; set; }
        }
        /// <summary>
        /// Правка периодов платы за пользование
        /// </summary>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <param name="id_currency"></param>
        /// <param name="rate"></param>
        /// <param name="id_currency_derailment"></param>
        /// <param name="rate_derailment"></param>
        /// <param name="coefficient_route"></param>
        /// <param name="coefficient_not_route"></param>
        /// <param name="grace_time_1"></param>
        /// <param name="grace_time_2"></param>
        /// <param name="note"></param>
        /// <param name="list_period"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ServiceChangeUsageFeePeriod(DateTime start, DateTime stop, bool hour_after_30, int? id_currency, decimal? rate, int? id_currency_derailment, decimal? rate_derailment,
            float? coefficient_route, float? coefficient_not_route, int? grace_time_1, int? grace_time_2, string note, List<ListUsageFee> list_period, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFUsage_Fee_Period ef_efp = new EFUsage_Fee_Period(context);

                if (list_period == null && list_period.Count() == 0) return (int)errors_base.not_input_list_change; // Неуказан список для изменения
                foreach (ListUsageFee luf in list_period)
                {
                    Usage_Fee_Period usp = null;
                    if (luf.id > 0)
                    {
                        usp = ef_efp.Context.Where(u => u.id == luf.id).FirstOrDefault();
                        if (usp == null) return (int)errors_base.not_usage_fee_period_of_db;  // 
                    }
                    else
                    {
                        usp = ef_efp.Context.Where(u => u.id_operator == luf.id_operator && u.id_genus == luf.id_genus && u.close == null).OrderByDescending(c => c.stop).FirstOrDefault();
                    }
                    if (usp == null)
                    {
                        // добавить
                        Usage_Fee_Period new_usp = new Usage_Fee_Period()
                        {
                            id = 0,
                            id_operator = luf.id_operator,
                            id_genus = luf.id_genus,
                            start = start,
                            stop = stop,
                            hour_after_30 = hour_after_30,
                            id_currency = id_currency,
                            rate = rate,
                            id_currency_derailment = id_currency_derailment,
                            rate_derailment = rate_derailment,
                            coefficient_route = coefficient_route,
                            coefficient_not_route = coefficient_not_route,
                            grace_time_1 = grace_time_1,
                            grace_time_2 = grace_time_2,
                            note = note,
                            create = DateTime.Now,
                            create_user = user,
                            parent_id = null
                        };
                        ef_efp.Add(new_usp);
                    }
                    else
                    {
                        if (start < usp.start || stop <= usp.start) return (int)errors_base.error_usage_fee_date_start_stop;      // 
                        if (start > usp.start)
                        {
                            // добавить
                            Usage_Fee_Period new_usp = new Usage_Fee_Period()
                            {
                                id = 0,
                                id_operator = usp.id_operator,
                                id_genus = usp.id_genus,
                                start = start,
                                stop = stop,
                                hour_after_30 = hour_after_30,
                                id_currency = id_currency,
                                rate = rate,
                                id_currency_derailment = id_currency_derailment,
                                rate_derailment = rate_derailment,
                                coefficient_route = coefficient_route,
                                coefficient_not_route = coefficient_not_route,
                                grace_time_1 = grace_time_1,
                                grace_time_2 = grace_time_2,
                                note = note,
                                create = DateTime.Now,
                                create_user = user,
                                parent_id = usp.id
                            };
                            usp.stop = start.AddSeconds(-1);
                            usp.close = DateTime.Now;
                            usp.close_user = user;
                            ef_efp.Update(usp);
                            ef_efp.Add(new_usp);
                        }
                        else
                        {
                            usp.stop = stop;
                            usp.hour_after_30 = hour_after_30;
                            usp.id_currency = id_currency;
                            usp.rate = rate;
                            usp.id_currency_derailment = id_currency_derailment;
                            usp.rate_derailment = rate_derailment;
                            usp.coefficient_route = coefficient_route;
                            usp.coefficient_not_route = coefficient_not_route;
                            usp.grace_time_1 = grace_time_1;
                            usp.grace_time_2 = grace_time_2;
                            usp.note = note;
                            usp.create = DateTime.Now;
                            usp.create_user = user;
                            usp.parent_id = usp.id;
                            usp.change = DateTime.Now;
                            usp.change_user = user;
                            ef_efp.Update(usp);
                        }
                    }
                }
                return context.SaveChanges();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ServiceChangeUsageFeePeriod(start={0}, stop={1}, hour_after_30={2} id_currency={3}, rate={4}, id_currency_derailment={5}, rate_derailment ={6}, coefficient_route={7} , coefficient_not_route={8}, grace_time_1={9}, grace_time_2={10}, note={11}, list_period={12}, user={13})",
                    start, stop, hour_after_30, id_currency, rate, id_currency_derailment, rate_derailment, coefficient_route, coefficient_not_route, grace_time_1, grace_time_2, note, list_period, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Правка деталей периодов платы за пользование
        /// </summary>
        /// <param name="id_usage_fee_period"></param>
        /// <param name="id"></param>
        /// <param name="stn_from"></param>
        /// <param name="arrival_cargo"></param>
        /// <param name="stn_to"></param>
        /// <param name="outgoing_cargo"></param>
        /// <param name="grace_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ServiceChangeUsageFeePeriodDetali(int id_usage_fee_period, int id, int? stn_from, int? arrival_cargo, int? stn_to, int? outgoing_cargo, int grace_time, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                using (EFDbContext context = new EFDbContext())
                {
                    Usage_Fee_Period ufp = context.Usage_Fee_Period.Where(u => u.id == id_usage_fee_period).FirstOrDefault();
                    if (ufp == null) return (int)errors_base.not_usage_fee_period_of_db;
                    if (id < 0) return 0;
                    if (id > 0)
                    {
                        // Правка
                        Usage_Fee_Period_Detali ufpd = context.Usage_Fee_Period_Detali
                            .Where(d => d.id_usage_fee_period == id_usage_fee_period && d.id == id)
                            .FirstOrDefault();
                        if (ufpd == null) return (int)errors_base.not_usage_fee_period_detali_of_db;
                        ufpd.code_stn_from = stn_from;
                        ufpd.id_cargo_arrival = arrival_cargo;
                        ufpd.code_stn_to = stn_to;
                        ufpd.id_cargo_outgoing = outgoing_cargo;
                        ufpd.grace_time = grace_time;
                        return context.SaveChanges();
                    }
                    else
                    {
                        // Правка
                        Usage_Fee_Period_Detali ufpd_old = context.Usage_Fee_Period_Detali
                            .Where(d => d.id_usage_fee_period == id_usage_fee_period
                            && d.code_stn_from == stn_from
                            && d.code_stn_to == stn_to
                            && d.id_cargo_arrival == arrival_cargo
                            && d.id_cargo_outgoing == outgoing_cargo
                            && d.grace_time == grace_time
                            ).FirstOrDefault();
                        if (ufpd_old != null) return (int)errors_base.exists_usage_fee_period_detali_of_db;
                        // Добавить
                        Usage_Fee_Period_Detali ufpd = new Usage_Fee_Period_Detali()
                        {
                            id = 0,
                            id_usage_fee_period = id_usage_fee_period,
                            code_stn_from = stn_from,
                            id_cargo_arrival = arrival_cargo,
                            code_stn_to = stn_to,
                            id_cargo_outgoing = outgoing_cargo,
                            grace_time = grace_time,
                        };
                        ufp.Usage_Fee_Period_Detali.Add(ufpd);
                        return context.SaveChanges();
                    }
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ServiceChangeUsageFeePeriodDetali(id_usage_fee_period={0}, id={1}, stn_from={2} arrival_cargo={3}, stn_to={4}, outgoing_cargo={5},  grace_time={6}, user={7})",
                    id_usage_fee_period, id, stn_from, arrival_cargo, stn_to, outgoing_cargo, grace_time, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Удаление деталей периодов платы за пользование
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int ServiceDeleteUsageFeePeriodDetali(int id)
        {
            try
            {
                using (EFDbContext context = new EFDbContext())
                {
                    Usage_Fee_Period_Detali ufpd = context.Usage_Fee_Period_Detali.Where(d => d.id == id).FirstOrDefault();
                    if (ufpd == null) return (int)errors_base.not_usage_fee_period_detali_of_db;
                    context.Usage_Fee_Period_Detali.Remove(ufpd);
                    return context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ServiceDeleteUsageFeePeriodDetali(id={0})", id), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }

        /// <summary>
        /// Поиск wir возвратного вагона
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_wir"></param>
        /// <returns></returns>
        public long GetIDWIR(ref EFDbContext context, long id_wir)
        {
            EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
            EFArrivalCars ef_arr_car = new EFArrivalCars(context);
            EFArrival_UZ_Vagon ef_arr_uz_vag = new EFArrival_UZ_Vagon(context);
            WagonInternalRoutes wir = ef_wir.Context.Where(w => w.id == id_wir).FirstOrDefault();
            if (wir == null) return (int)errors_base.not_wir_db; // В базе данных нет записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
            ArrivalCars arr_car = ef_arr_car.Context.Where(c => c.id == wir.id_arrival_car).FirstOrDefault();
            if (arr_car == null) return (int)errors_base.not_arrival_cars_db; // Ошибка, нет записи вагона по прибытию 
            Arrival_UZ_Vagon arr_uz_vag = ef_arr_uz_vag.Context.Where(v => v.id == arr_car.id_arrival_uz_vagon).FirstOrDefault();
            if (arr_uz_vag == null) return (int)errors_base.not_inp_uz_vag_db; // В базе данных нет записи документа на вагон.
            if (arr_uz_vag.cargo_returns != null && arr_uz_vag.cargo_returns == true)
            {
                // Возврат
                if (wir.parent_id == null) return wir.id;
                return GetIDWIR(ref context, (long)wir.parent_id);
            }
            else
            {
                return wir.id;
            }
        }
        public class SettlementRate
        {
            public int id_currency { get; set; } = -1;               // Выбранная валюта
            public decimal rate { get; set; } = 0;                   // Выбранная ставка
            public decimal rate_currency { get; set; } = 0;          // ставка для расчета (с учетом схода)
            public decimal exchange_rate { get; set; } = 1;
        }

        /// <summary>
        /// Получить ставку, курс и валюту (с учетом схода)
        /// </summary>
        /// <param name="context"></param>
        /// <param name="derailment"></param>
        /// <param name="wufp"></param>
        /// <param name="list_bank"></param>
        /// <returns></returns>
        public SettlementRate GetExchangeRate(ref EFDbContext context, bool derailment, Wagon_Usage_Fee_Period wufp, List<Directory_BankRate> list_bank)
        {
            SettlementRate srate = new SettlementRate();
            // Ставка, курс и валюта (с учетом схода)
            EFDirectory_Currency ef_dir_curr = new EFDirectory_Currency(context);
            // Проверим на сход
            if (!derailment)
            {
                if (wufp.id_currency != null)
                {
                    srate.id_currency = (int)wufp.id_currency;
                    srate.rate = wufp.rate != null ? (decimal)wufp.rate : 0;
                    srate.rate_currency = wufp.rate != null ? (decimal)wufp.rate : 0;
                    if (wufp.id_currency > 1)
                    {
                        // отправимся за курсом
                        Directory_Currency curr = ef_dir_curr.Context.Where(c => c.id == wufp.id_currency).FirstOrDefault();
                        if (curr != null)
                        {
                            Directory_BankRate res_er = list_bank.Where(e => e.code == curr.code).FirstOrDefault();
                            srate.exchange_rate = (decimal)res_er.rate;
                        }
                    }
                }
            }
            else
            {
                // сход
                if (wufp.id_currency_derailment != null)
                {
                    srate.id_currency = (int)wufp.id_currency_derailment;
                    srate.rate = wufp.rate_derailment != null ? (decimal)wufp.rate_derailment : 0;
                    srate.rate_currency = wufp.rate_derailment != null ? (decimal)wufp.rate_derailment : 0;
                    if (wufp.id_currency_derailment > 1)
                    {
                        // отправимся за курсом
                        Directory_Currency curr = ef_dir_curr.Context.Where(c => c.id == wufp.id_currency_derailment).FirstOrDefault();
                        if (curr != null)
                        {
                            Directory_BankRate res_er = list_bank.Where(e => e.code == curr.code).FirstOrDefault();
                            srate.exchange_rate = (decimal)res_er.rate;
                        }

                    }
                }
            }
            return srate;
        }
        /// <summary>
        /// Расчет платы за пользование по принятому составу
        /// </summary>
        /// <param name="id_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateIDWagon CalcUsageFeeOfIncomingSostav(long id_sostav, string user)
        {
            ResultUpdateIDWagon result = new ResultUpdateIDWagon(id_sostav, 0);
            try
            {
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                ArrivalSostav arr_sostav = ef_arr_sostav.Context.Where(s => s.id == id_sostav).FirstOrDefault();
                if (arr_sostav == null)
                {
                    result.result = (int)errors_base.not_arrival_sostav_db; // В базе данных нет записи состава по прибытию
                    return result;
                }
                List<ArrivalCars> list_arr_cars = arr_sostav.ArrivalCars.Where(p => p.position_arrival != null).ToList();
                if (list_arr_cars == null || list_arr_cars.Count() == 0)
                {
                    result.result = (int)errors_base.not_arrival_cars_db; // В базе данных нет записи по вагонам по прибытию
                    return result;
                }
                List<OutgoingCars> list_out_cars = new List<OutgoingCars>();
                foreach (ArrivalCars arr_car in list_arr_cars)
                {
                    WagonInternalRoutes wir_arr = ef_wir.Context.Where(r => r.id_arrival_car == arr_car.id).FirstOrDefault();
                    if (wir_arr != null && wir_arr.id_outgoing_car != null)
                    {
                        OutgoingCars out_car = ef_out_car.Context.Where(o => o.id == wir_arr.id_outgoing_car).FirstOrDefault();
                        if (out_car != null)
                        {
                            list_out_cars.Add(out_car);
                        }
                    }
                }
                result = CalcUsageFeeOfOutgoingCars(id_sostav, list_out_cars, user);
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CalcUsageFeeOfIncomingSostav(id_sostav={0}, user={1})", id_sostav, user), servece_owner, eventID);
                result.result = (int)errors_base.global; // Глобальная ошибка
                return result;
            }
        }
        /// <summary>
        /// Расчет платы за пользование по сданному составу
        /// </summary>
        /// <param name="id_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateIDWagon CalcUsageFeeOfOutgoingSostav(long id_sostav, string user)
        {
            ResultUpdateIDWagon result = new ResultUpdateIDWagon(id_sostav, 0);
            try
            {
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                OutgoingSostav out_sostav = ef_out_sostav.Context.Where(s => s.id == id_sostav).FirstOrDefault();
                if (out_sostav == null)
                {
                    result.result = (int)errors_base.not_outgoing_sostav_db;    // В базе данных нет записи состава для оправки
                    return result;
                }

                if (out_sostav.date_outgoing == null)
                {
                    result.result = (int)errors_base.error_status_outgoing_sostav;     // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                    return result;
                }
                List<OutgoingCars> list_out_cars = out_sostav.OutgoingCars.Where(p => p.position_outgoing != null).ToList(); // && p.num == 72222912  
                if (list_out_cars == null || list_out_cars.Count() == 0)
                {
                    result.result = (int)errors_base.not_outgoing_cars_db; // В базе данных нет записи по вагонам для отправки
                    return result;
                }
                result = CalcUsageFeeOfOutgoingCars(id_sostav, list_out_cars, user);
                return result;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CalcUsageFeeOfOutgoingSostav(id_sostav={0}, user={1})", id_sostav, user), servece_owner, eventID);
                result.result = (int)errors_base.global; // Глобальная ошибка
                return result;
            }
        }
        /// <summary>
        /// Расчет платы за пользование по сданному составу
        /// </summary>
        /// <param name="id_sostav"></param>
        /// <param name="list"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateIDWagon CalcUsageFeeOfOutgoingCars(long id_sostav, List<OutgoingCars> list, string user)
        {
            ResultUpdateIDWagon result = new ResultUpdateIDWagon(id_sostav, list.Count());
            try
            {
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFArrivalSostav ef_arr_sostav = new EFArrivalSostav(context);
                EFArrivalCars ef_arr_car = new EFArrivalCars(context);
                EFArrival_UZ_Vagon ef_arr_uz_vag = new EFArrival_UZ_Vagon(context);
                EFOutgoing_UZ_Vagon ef_out_uz_vag = new EFOutgoing_UZ_Vagon(context);
                EFUsage_Fee_Period ef_uf_per = new EFUsage_Fee_Period(context);
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                EFWagonInternalOperation ef_wio = new EFWagonInternalOperation(context);
                EFWagonUsageFee ef_wuf = new EFWagonUsageFee(context);
                EFDirectory_Currency ef_dir_curr = new EFDirectory_Currency(context);
                EFDirectory_OperatorsWagons ef_dir_oper_wag = new EFDirectory_OperatorsWagons(context);
                EFDirectory_BankRate ef_dir_br = new EFDirectory_BankRate(context);
                DateTime date = DateTime.Now.Date;
                List<Directory_BankRate> list_bank = ef_dir_br.Context.Where(b => b.date == date).ToList();
                if (list_bank == null || list_bank.Count() < 2)
                {
                    result.result = (int)errors_base.not_list_exchange_rate;    // Ошибка, нет данных по курсу валют
                    return result;
                }
                foreach (OutgoingCars car in list) //.Where(w => w.num == 63375885)
                {
                    Console.WriteLine("Обрабатываю вагон №{0}", car.num);
                    WagonInternalRoutes wir = ef_wir.Context.Where(w => w.id_outgoing_car == car.id).FirstOrDefault();
                    if (wir == null)
                    {
                        result.SetErrorResult(car.id, (int)errors_base.not_wir_db, car.num); // В базе данных нет записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                        continue;
                    }
                    WagonInternalOperation wio = ef_wio.Context.Where(o => o.id_wagon_internal_routes == wir.id && (o.id_condition == 76 || o.id_condition == 74)).FirstOrDefault();
                    long id_wir_arrival = GetIDWIR(ref context, wir.id);
                    // Прибытие
                    WagonInternalRoutes wir_arrival = ef_wir.Context.Where(w => w.id == id_wir_arrival).FirstOrDefault();
                    if (wir_arrival == null)
                    {
                        result.SetErrorResult(car.id, (int)errors_base.not_wir_db, car.num); // В базе данных нет записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                        continue;
                    }
                    ArrivalCars arr_car = ef_arr_car.Context.Where(c => c.id == wir_arrival.id_arrival_car).FirstOrDefault();
                    if (arr_car == null)
                    {
                        result.SetErrorResult(car.id, (int)errors_base.not_arrival_cars_db, car.num); // Ошибка, нет записи вагона по прибытию 
                        continue;
                    }
                    ArrivalSostav arr_sostav = ef_arr_sostav.Context.Where(s => s.id == arr_car.id_arrival).FirstOrDefault();
                    if (arr_sostav == null)
                    {
                        result.SetErrorResult(car.id, (int)errors_base.not_arrival_sostav_db, car.num); // В базе данных нет записи состава для оправки
                        continue;
                    }
                    Arrival_UZ_Vagon arr_uz_vag = ef_arr_uz_vag.Context.Where(v => v.id == arr_car.id_arrival_uz_vagon).FirstOrDefault();
                    if (arr_uz_vag == null)
                    {
                        result.SetErrorResult(car.id, (int)errors_base.not_inp_uz_vag_db, car.num); // В базе данных нет записи документа на вагон.
                        continue;
                    }
                    // Отправка
                    Outgoing_UZ_Vagon out_uz_vag = ef_out_uz_vag.Context.Where(w => w.id == car.id_outgoing_uz_vagon).FirstOrDefault();
                    if (out_uz_vag == null)
                    {
                        result.SetErrorResult(car.id, (int)errors_base.not_out_uz_vag_db, car.num); // В базе данных нет записи документа на вагон.
                        continue;
                    }
                    // Расчеты
                    List<Wagon_Usage_Fee_Period> list_period_setup = new List<Wagon_Usage_Fee_Period>();
                    DateTime date_adoption = arr_sostav.date_adoption_act != null ? (DateTime)arr_sostav.date_adoption_act : (arr_car.date_adoption_act != null ? (DateTime)arr_car.date_adoption_act : (DateTime)arr_sostav.date_adoption);    // Зашел
                    DateTime date_outgoing = car.OutgoingSostav.date_outgoing_act != null ? (DateTime)car.OutgoingSostav.date_outgoing_act : (car.date_outgoing_act != null ? (DateTime)car.date_outgoing_act : (DateTime)car.OutgoingSostav.date_outgoing);//   Вышел (согласно всех актов)

                    int? id_operator_outgoing = out_uz_vag.id_wagons_rent_outgoing != null ? out_uz_vag.Directory_WagonsRent1.id_operator : null;   // Оператор по отправке
                    if (id_operator_outgoing != null)
                    {
                        Directory_OperatorsWagons oper_wag = ef_dir_oper_wag.Context.Where(w => w.id == id_operator_outgoing).FirstOrDefault();
                        if (oper_wag != null)
                        {
                            id_operator_outgoing = oper_wag.parent_id != null ? oper_wag.parent_id : oper_wag.id;
                        }
                    }
                    bool inp_cargo = list_groups_cargo.Find(x => x == arr_uz_vag.Directory_Cargo.id_group) == 0;    // Груз по прибытию
                    bool out_cargo = list_groups_cargo.Find(x => x == out_uz_vag.Directory_Cargo.id_group) == 0;    // Груз по отправке
                    bool? route = car.OutgoingSostav.route_sign;                                                                 // Маршрут
                    int num = car.num;                                                                              // Номер вагона
                    int id_genus = out_uz_vag.id_genus;                                                             // Род вагона
                    bool derailment = wio != null ? true : false;                                                   // Сход
                                                                                                                    // Список настройки периода по оператору отправки
                    List<Usage_Fee_Period> list_uf_period_outgoing = ef_uf_per.Context.Where(p => p.id_operator == id_operator_outgoing && p.id_genus == id_genus).OrderByDescending(c => c.id).ToList();
                    // расчет оператора
                    List<Usage_Fee_Period> list_period_where = new List<Usage_Fee_Period>();
                    list_period_where.Clear();
                    Usage_Fee_Period arr_perriod = list_uf_period_outgoing.Where(o => o.start <= date_adoption && o.stop >= date_adoption).FirstOrDefault();
                    Usage_Fee_Period out_perriod = list_uf_period_outgoing.Where(o => o.start <= date_outgoing && o.stop >= date_outgoing).FirstOrDefault();
                    bool uz_wagon = false;              // Вагоны ЦТЛ
                    // Сформируем список периодов
                    if (arr_perriod != null)
                    {
                        list_period_where.Add(arr_perriod);
                        if (out_perriod != null && arr_perriod.id != out_perriod.id)
                        {
                            list_period_where.Add(out_perriod);
                        }
                    }
                    foreach (Usage_Fee_Period ufp in list_period_where)
                    {
                        uz_wagon = (ufp.hour_after_30 != null && ufp.hour_after_30 == true ? true : false); // Определим вагоны ЦТЛ
                        list_period_setup.Add(new Wagon_Usage_Fee_Period()
                        {
                            date_adoption = date_adoption >= ufp.start && date_adoption <= ufp.stop ? (DateTime?)date_adoption : null,
                            date_outgoing = date_outgoing >= ufp.start && date_outgoing <= ufp.stop ? (DateTime?)date_outgoing : null,
                            id_operator = (int)ufp.id_operator,
                            id_genus = ufp.id_genus,
                            start = ufp.start,
                            stop = ufp.stop,
                            id_currency = ufp.id_currency,
                            rate = ufp.rate,
                            id_currency_derailment = ufp.id_currency_derailment,
                            rate_derailment = ufp.rate_derailment,
                            coefficient_route = ufp.coefficient_route,
                            coefficient_not_route = ufp.coefficient_not_route,
                            grace_time_1 = ufp.grace_time_1,
                            grace_time_2 = ufp.grace_time_2,
                            hour_after_30 = ufp.hour_after_30
                        });
                    } // {end foreach (Usage_Fee_Period ufp in list_period_where)}
                    //============================================================================
                    //  РАСЧЕТ
                    //============================================================================
                    int hour_period = 0;                                // Время (часов)
                    int remaining_minutes_period = 0;                   // Остаток минут
                    int sum_remaining_minutes_period = 0;               // Остаток минут (суммируемый)
                    int grace_time = 0;                                 // Льготное время
                    SettlementRate curr_rate = new SettlementRate();    // Ставка, курс и валюта (с учетом схода)
                    float coefficient_route = 1;                        // коэффициент маршрута, для всех по умолчанию 1;
                    // -----
                    int calc_hour_period = 0;                           // Время расчетное (часов)
                    int calc_time = 0;                                  // Расчетное время
                    decimal calc_fee_amount = 0;                        // Расчетная сумма
                    int cammon_minut_period = 0;                        // Общее время простоя
                    TimeSpan tm_period;
                    if (list_period_setup.Count() > 0)
                    {
                        // Опредеим расчет ЦТЛ или собсьвенники
                        if (!uz_wagon)
                        {
                            // Вагоны собсьвенники (Считаем без периодов берем по последнему)
                            DateTime? dt_start = list_period_setup.First().date_adoption;
                            DateTime? dt_end = list_period_setup.Last().date_outgoing;
                            Wagon_Usage_Fee_Period wufp = list_period_setup.Last();
                            if (dt_start == null || dt_end == null)
                            {
                                result.result = (int)errors_base.not_dt_calc_usage_fee;    // Ошибка (нет даты начала или конца периода) выполнения расчета платы за пользование
                                return result;
                            }
                            // просчитаем временной интервал
                            tm_period = (DateTime)dt_end - (DateTime)dt_start; // первый и последний период
                            hour_period = (int)Math.Truncate(tm_period.TotalHours);
                            remaining_minutes_period = (int)Math.Truncate(tm_period.TotalMinutes - (hour_period * 60));
                            // Округление до часа
                            if (remaining_minutes_period > 0)
                            {
                                hour_period++;
                                remaining_minutes_period = 0;
                            }
                            // определим льготный период
                            if (inp_cargo && out_cargo)
                            {
                                grace_time = wufp.grace_time_2 != null ? (int)wufp.grace_time_2 : 0;
                            }
                            else
                            {
                                grace_time = wufp.grace_time_1 != null ? (int)wufp.grace_time_1 : 0;
                            }
                            // Получим ставку, курс
                            curr_rate = GetExchangeRate(ref context, derailment, wufp, list_bank);
                            // Определим коэффициент маршрута если нет схода
                            if (!derailment && wufp.coefficient_route != null && route != null && route == true)
                            {
                                coefficient_route = (float)wufp.coefficient_route;
                            }
                            if (!derailment && wufp.coefficient_not_route != null && route != null && route == false)
                            {
                                coefficient_route = (float)wufp.coefficient_not_route;
                            }
                            calc_hour_period = hour_period;
                            int hour_calc = (hour_period - grace_time);
                            // пересчет времени с учетом uz_wagon
                            var remainder = (hour_calc % 24);
                            if (remainder > 0)
                            {
                                remainder = 24 - remainder;
                            }
                            // текущая плата почасово
                            long rc_res = (long)((curr_rate.rate_currency / 24) * 10000000); // Убрал обрезание до 3 знака
                            decimal rate_currency_hour = (decimal)(rc_res / 10000000.0);
                            //decimal rate_currency_hour = curr_rate.rate_currency / 24;

                            calc_time = hour_calc + (remainder); // округлим до целых суток
                            calc_fee_amount = (rate_currency_hour * calc_time * (decimal)coefficient_route) * curr_rate.exchange_rate;
                        }
                        else
                        {
                            int stage = 0;                      // этапы расчета (0-одинарный, 1-первый, 2-промежуточный, 3-последний)
                            bool rounding = false;              // Признак округление в первом периоде расчета уже было
                                                                // Пройдемся по активным периодам
                            foreach (Wagon_Usage_Fee_Period wufp in list_period_setup)
                            {
                                grace_time = 0;                 // сбросим льготный период
                                curr_rate.exchange_rate = 1;    // сбросим курс
                                curr_rate.rate_currency = 0;    // сбросим ставку
                                coefficient_route = 1;          // сбросим коэффициент

                                if (wufp.date_adoption != null)
                                {
                                    // Первый период
                                    if (wufp.date_outgoing != null)
                                    {
                                        tm_period = (DateTime)wufp.date_outgoing - (DateTime)wufp.date_adoption; // первый и последний период
                                        stage = 0;
                                    }
                                    else
                                    {
                                        tm_period = (DateTime)wufp.stop.AddSeconds(1) - (DateTime)wufp.date_adoption; // за первый период
                                        stage = 1;
                                    }
                                    // определим льготный период
                                    if (inp_cargo && out_cargo)
                                    {
                                        grace_time = wufp.grace_time_2 != null ? (int)wufp.grace_time_2 : 0;
                                    }
                                    else
                                    {
                                        grace_time = wufp.grace_time_1 != null ? (int)wufp.grace_time_1 : 0;
                                    }
                                }
                                else
                                {
                                    if (wufp.date_outgoing != null)
                                    {
                                        tm_period = ((DateTime)wufp.date_outgoing) - (DateTime)wufp.start; // за последний период
                                        stage = 3;
                                    }
                                    else
                                    {
                                        tm_period = (DateTime)wufp.stop.AddSeconds(1).AddMinutes(1) - (DateTime)wufp.start; // за промежуточный период период
                                        stage = 2;
                                    }
                                }
                                // просчитаем интервал
                                hour_period = (int)Math.Truncate(tm_period.TotalHours);
                                remaining_minutes_period = (int)Math.Truncate(tm_period.TotalMinutes - (hour_period * 60));
                                sum_remaining_minutes_period += remaining_minutes_period;
                                // Округление до часа,
                                //rounding = false; //!!! в первом случаее сделал округление всегда, но 3.01.2024 id_outgoing=242270 ваг 52136538 замечание применяется только 1 раз- убрал
                                if (remaining_minutes_period >= 30 && !rounding)
                                {
                                    hour_period++;
                                    rounding = true;
                                }
                                remaining_minutes_period = 0;

                                // Ставка, курс и валюта (с учетом схода)
                                curr_rate = GetExchangeRate(ref context, derailment, wufp, list_bank);
                                // Определим коэффициент маршрута если нет схода
                                if (!derailment && wufp.coefficient_route != null && route != null && route == true)
                                {
                                    coefficient_route = (float)wufp.coefficient_route;
                                }
                                if (!derailment && wufp.coefficient_not_route != null && route != null && route == false)
                                {
                                    coefficient_route = (float)wufp.coefficient_not_route;
                                }
                                // текущая плата почасово
                                long rc_res = (long)((curr_rate.rate_currency / 24) * 10000000); // Убрал обрезание до 3 знака
                                decimal rate_currency_hour = (decimal)(rc_res / 10000000.0);
                                //decimal rate_currency_hour = curr_rate.rate_currency / 24; 
                                // расчеты
                                switch (stage)
                                {
                                    case 0:
                                        {
                                            // первый и последний период
                                            calc_hour_period = hour_period;
                                            int hour_calc = (hour_period - grace_time);
                                            // пересчет времени с учетом uz_wagon
                                            calc_time = hour_calc; // округлим до целых суток
                                            calc_fee_amount = (rate_currency_hour * calc_time * (decimal)coefficient_route) * curr_rate.exchange_rate;
                                            break;
                                        }
                                        ;
                                    case 1:
                                        {
                                            // Первый период
                                            calc_hour_period = hour_period;
                                            int hour_calc = (hour_period - grace_time);
                                            calc_time = hour_calc;
                                            calc_fee_amount = (rate_currency_hour * hour_calc * (decimal)coefficient_route) * curr_rate.exchange_rate;
                                            break;
                                        }
                                        ;
                                    case 2:
                                        {
                                            // промежуточный период
                                            calc_hour_period += hour_period;
                                            int hour_calc = (hour_period);
                                            calc_time += hour_calc;
                                            calc_fee_amount += (rate_currency_hour * hour_calc * (decimal)coefficient_route) * curr_rate.exchange_rate;
                                            break;
                                        }
                                    case 3:
                                        {
                                            // последний период
                                            int hour_calc = hour_period;
                                            // Если небыло округления а сумма остатков >=0 тогда добавим час
                                            if (sum_remaining_minutes_period >= 30 && !rounding)
                                            {
                                                hour_calc++;
                                            }
                                            calc_hour_period += hour_calc;
                                            calc_time += hour_calc;
                                            calc_fee_amount += (rate_currency_hour * hour_calc * (decimal)coefficient_route) * curr_rate.exchange_rate;
                                            break;
                                        }
                                }
                            }
                        }
                    }
                    WagonUsageFee wuf = null;
                    TimeSpan tm = date_outgoing - date_adoption; // за первый период
                    cammon_minut_period = (int)tm.TotalMinutes;
                    int cfa_res = (int)(calc_fee_amount * 100);
                    decimal calc_fee_amount_res = (decimal)(cfa_res / 100.0);
                    //============================================================================
                    //  ЗАПИСЬ РАСЧЕТА
                    //============================================================================
                    if (wir.id_usage_fee != null)
                    {
                        // Плата расчитана
                        wuf = ef_wuf.Context.Where(w => w.id == wir.id_usage_fee).FirstOrDefault();
                        if (wuf != null)
                        {
                            wuf.id_operator = (int)id_operator_outgoing;
                            wuf.id_genus = id_genus;
                            wuf.date_adoption = date_adoption;
                            wuf.date_outgoing = date_outgoing;
                            wuf.route = route != null && route == true ? true : false;
                            wuf.inp_cargo = inp_cargo;
                            wuf.out_cargo = out_cargo;
                            wuf.derailment = derailment;// сход
                            wuf.count_stage = list_period_setup.Count(); // Количество стадий расчета
                            wuf.id_currency = curr_rate.id_currency;
                            wuf.rate = curr_rate.rate;
                            wuf.exchange_rate = curr_rate.exchange_rate;
                            wuf.coefficient = coefficient_route;
                            wuf.use_time = calc_hour_period;
                            wuf.grace_time = grace_time;
                            wuf.calc_time = calc_time; //calc_time
                            wuf.calc_fee_amount = Math.Round(calc_fee_amount_res, 1, MidpointRounding.AwayFromZero);
                            wuf.downtime = cammon_minut_period;
                            wuf.note = null;
                            wuf.create = DateTime.Now;
                            wuf.create_user = user;
                            ef_wuf.Update(wuf);
                            result.SetUpdateResult(car.id, 1, car.num);
                        }
                    }
                    else
                    {
                        wuf = new WagonUsageFee()
                        {
                            id = 0,
                            id_wir = wir.id,
                            num = num,
                            id_operator = (int)id_operator_outgoing,
                            id_genus = id_genus,
                            date_adoption = date_adoption,
                            date_outgoing = date_outgoing,
                            route = route != null && route == true ? true : false,
                            inp_cargo = inp_cargo,
                            out_cargo = out_cargo,
                            derailment = derailment, // сход
                            count_stage = list_period_setup.Count(), // Количество стадий расчета
                            id_currency = curr_rate.id_currency,
                            rate = curr_rate.rate,
                            exchange_rate = curr_rate.exchange_rate,
                            coefficient = coefficient_route,
                            use_time = calc_hour_period,
                            grace_time = grace_time,
                            calc_time = calc_time,
                            calc_fee_amount = Math.Round(calc_fee_amount_res, 1, MidpointRounding.AwayFromZero),
                            manual_time = null,
                            manual_fee_amount = null,
                            downtime = cammon_minut_period,
                            note = null,
                            create = DateTime.Now,
                            create_user = user,
                            change = null,
                            change_user = null,
                        };
                        wir.WagonUsageFee = wuf;
                        ef_wir.Update(wir);
                        result.SetInsertResult(car.id, 1, car.num);
                    }

                } // {end  foreach (OutgoingCars car in list)}
                result.SetResult(context.SaveChanges());
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CalcUsageFeeOfOutgoingCars(id_sostav={0}, list={1}, user={2})", id_sostav, list, user), servece_owner, eventID);
                result.result = (int)errors_base.global; // Глобальная ошибка
                return result;
            }
        }
        /// <summary>
        /// Расчет платы за пользование по сданным составам за выбранный период
        /// </summary>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public List<ResultUpdateIDWagon> CalcUsageFeeOfOutgoingSostav(DateTime start, DateTime stop, string user)
        {
            if (String.IsNullOrWhiteSpace(user))
            {
                user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
            }
            List<ResultUpdateIDWagon> result = new List<ResultUpdateIDWagon>();
            try
            {
                EFDbContext context = new EFDbContext();
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                List<OutgoingSostav> list_sostav = ef_out_sostav.Context.Where(s => s.date_outgoing >= start && s.date_outgoing <= stop).ToList();
                int count = list_sostav.Count();
                foreach (OutgoingSostav out_sost in list_sostav)
                {
                    ResultUpdateIDWagon res_sost = CalcUsageFeeOfOutgoingSostav(out_sost.id, user);
                    result.Add(res_sost);
                    Console.WriteLine("Обработал состав id = {0} [ вагонов: {1}/ добавил: {2}/ обновил: {3} / ОШИБОК: {4}], результат = {5}, осталось {6}", out_sost.id, res_sost.count, res_sost.add, res_sost.update, res_sost.error, res_sost.result, count--);
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CalcUsageFeeOfOutgoingSostav(start={0}, stop={1})", start, stop), servece_owner, eventID);
                // Глобальная ошибка
                return null;
            }
        }
        #endregion


    }
}

