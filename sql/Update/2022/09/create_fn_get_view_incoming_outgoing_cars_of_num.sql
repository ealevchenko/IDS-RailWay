USE [KRR-PA-CNT-Railway]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [IDS].[get_view_incoming_outgoing_cars_of_num]
 (
	@num int
 )
	RETURNS 
	@view_incoming_outgoing TABLE  (
	[wir_id] [bigint] NOT NULL,
	[num] [int] NOT NULL,
	[id_arrival_car] [bigint] NULL,
	[id_sap_incoming_supply] [bigint] NULL,
	[wir_doc_outgoing_car] [bit] NULL,
	[id_outgoing_car] [bigint] NULL,
	[id_sap_outbound_supply] [bigint] NULL,
	[wir_note] [nvarchar](250) NULL,
	[wir_create] [datetime] NOT NULL,
	[wir_create_user] [nvarchar](50) NOT NULL,
	[wir_close] [datetime] NULL,
	[wir_close_user] [nvarchar](50) NULL,
	[wir_parent_id] [bigint] NULL,
	[wir_highlight_color] [nchar](10) NULL,
	[arrival_car_position] [int] NULL,
	[arrival_car_consignee] [int] NULL,
	[arrival_car_num_doc] [nvarchar](50) NULL,
	[arrival_car_id_transfer] [bigint] NULL,
	[arrival_car_note] [nvarchar](200) NULL,
	[arrival_car_date_adoption_act] [datetime] NULL,
	[arrival_car_arrival] [datetime] NULL,
	[arrival_car_arrival_user] [nvarchar](50) NULL,
	[arrival_car_create] [datetime] NULL,
	[arrival_car_create_user] [nvarchar](50) NULL,
	[arrival_car_change] [datetime] NULL,
	[arrival_car_change_user] [nvarchar](50) NULL,
	[arrival_sostav_id] [bigint] NULL,
	[arrival_sostav_id_arrived] [bigint] NULL,
	[arrival_sostav_id_sostav] [bigint] NULL,
	[arrival_sostav_train] [int] NULL,
	[arrival_sostav_composition_index] [nvarchar](50) NULL,
	[arrival_sostav_date_arrival] [datetime] NULL,
	[arrival_sostav_date_adoption] [datetime] NULL,
	[arrival_sostav_date_adoption_act] [datetime] NULL,
	[arrival_sostav_id_station_from] [int] NULL,
	[arrival_sostav_station_from_name_ru] [nvarchar](50) NULL,
	[arrival_sostav_station_from_name_en] [nvarchar](50) NULL,
	[arrival_sostav_station_from_abbr_ru] [nvarchar](50) NULL,
	[arrival_sostav_station_from_abbr_en] [nvarchar](50) NULL,
	[arrival_sostav_id_station_on] [int] NULL,
	[arrival_sostav_station_on_name_ru] [nvarchar](50) NULL,
	[arrival_sostav_station_on_name_en] [nvarchar](50) NULL,
	[arrival_sostav_station_on_abbr_ru] [nvarchar](50) NULL,
	[arrival_sostav_station_on_abbr_en] [nvarchar](50) NULL,
	[arrival_sostav_id_way] [int] NULL,
	[arrival_sostav_way_on_id_park] [int] NULL,
	[arrival_sostav_way_on_num_ru] [nvarchar](20) NULL,
	[arrival_sostav_way_on_num_en] [nvarchar](20) NULL,
	[arrival_sostav_way_on_name_ru] [nvarchar](100) NULL,
	[arrival_sostav_way_on_name_en] [nvarchar](100) NULL,
	[arrival_sostav_way_on_abbr_ru] [nvarchar](50) NULL,
	[arrival_sostav_way_on_abbr_en] [nvarchar](50) NULL,
	[arrival_sostav_numeration] [bit] NULL,
	[arrival_sostav_num_doc] [int] NULL,
	[arrival_sostav_count] [int] NULL,
	[arrival_sostav_status] [int] NULL,
	[arrival_sostav_note] [nvarchar](200) NULL,
	[arrival_sostav_create] [datetime] NULL,
	[arrival_sostav_create_user] [nvarchar](50) NULL,
	[arrival_sostav_change] [datetime] NULL,
	[arrival_sostav_change_user] [nvarchar](50) NULL,
	[arrival_uz_vagon_id] [bigint] NULL,
	[arrival_uz_vagon_id_arrival] [bigint] NULL,
	[arrival_uz_vagon_id_owner] [int] NULL,
	[arrival_uz_vagon_owner_wagon_ru] [nvarchar](100) NULL,
	[arrival_uz_vagon_owner_wagon_en] [nvarchar](100) NULL,
	[arrival_uz_vagon_owner_wagon_abbr_ru] [nvarchar](20) NULL,
	[arrival_uz_vagon_owner_wagon_abbr_en] [nvarchar](20) NULL,
	[arrival_uz_vagon_id_type_ownership] [int] NULL,
	[arrival_uz_vagon_type_ownership_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_type_ownership_en] [nvarchar](50) NULL,
	[arrival_uz_vagon_id_countrys] [int] NULL,
	[arrival_uz_vagon_wagon_adm] [int] NULL,
	[arrival_uz_vagon_wagon_adm_name_ru] [nvarchar](100) NULL,
	[arrival_uz_vagon_wagon_adm_name_en] [nvarchar](100) NULL,
	[arrival_uz_vagon_wagon_adm_abbr_ru] [nvarchar](10) NULL,
	[arrival_uz_vagon_wagon_adm_abbr_en] [nvarchar](10) NULL,
	[arrival_uz_vagon_id_genus] [int] NULL,
	[arrival_uz_vagon_rod] [int] NULL,
	[arrival_uz_vagon_rod_name_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_rod_name_en] [nvarchar](50) NULL,
	[arrival_uz_vagon_rod_abbr_ru] [nvarchar](5) NULL,
	[arrival_uz_vagon_rod_abbr_en] [nvarchar](5) NULL,
	[arrival_uz_vagon_wagon_kol_os] [int] NULL,
	[arrival_uz_vagon_wagon_usl_tip] [nvarchar](10) NULL,
	[arrival_uz_vagon_wagon_date_rem_uz] [datetime] NULL,
	[arrival_uz_vagon_wagon_date_rem_vag] [datetime] NULL,
	[arrival_uz_vagon_id_condition] [int] NULL,
	[arrival_uz_vagon_condition_name_ru] [nvarchar](100) NULL,
	[arrival_uz_vagon_condition_name_en] [nvarchar](100) NULL,
	[arrival_uz_vagon_condition_abbr_ru] [nvarchar](20) NULL,
	[arrival_uz_vagon_condition_abbr_en] [nvarchar](20) NULL,
	[arrival_uz_vagon_condition_repairs] [bit] NULL,
	[arrival_uz_vagon_id_wagons_rent_arrival] [int] NULL,
	[arrival_uz_vagon_arrival_wagons_rent_id_operator] [int] NULL,
	[arrival_uz_vagon_arrival_wagons_rent_operators_ru] [nvarchar](100) NULL,
	[arrival_uz_vagon_arrival_wagons_rent_operators_en] [nvarchar](100) NULL,
	[arrival_uz_vagon_arrival_wagons_rent_operator_abbr_ru] [nvarchar](20) NULL,
	[arrival_uz_vagon_arrival_wagons_rent_operator_abbr_en] [nvarchar](20) NULL,
	[arrival_uz_vagon_arrival_wagons_rent_start] [datetime] NULL,
	[arrival_uz_vagon_arrival_wagons_rent_end] [datetime] NULL,
	[arrival_uz_vagon_arrival_wagons_rent_operator_paid] [bit] NULL,
	[arrival_uz_vagon_arrival_wagons_rent_operator_color] [nvarchar](10) NULL,
	[arrival_uz_vagon_arrival_wagons_rent_id_limiting] [int] NULL,
	[arrival_uz_vagon_arrival_wagons_rent_limiting_name_ru] [nvarchar](100) NULL,
	[arrival_uz_vagon_arrival_wagons_rent_limiting_name_en] [nvarchar](100) NULL,
	[arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_ru] [nvarchar](30) NULL,
	[arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_en] [nvarchar](30) NULL,
	[arrival_uz_vagon_id_type] [int] NULL,
	[arrival_uz_vagon_type_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_type_en] [nvarchar](50) NULL,
	[arrival_uz_vagon_gruzp] [float] NULL,
	[arrival_uz_vagon_u_tara] [int] NULL,
	[arrival_uz_vagon_ves_tary_arc] [int] NULL,
	[arrival_uz_vagon_gruzp_uz] [float] NULL,
	[arrival_uz_vagon_tara_uz] [float] NULL,
	[arrival_uz_vagon_route] [bit] NULL,
	[arrival_uz_vagon_note_vagon] [nvarchar](200) NULL,
	[arrival_uz_vagon_id_cargo] [int] NULL,
	[arrival_uz_vagon_cargo_name_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_cargo_name_en] [nvarchar](50) NULL,
	[arrival_uz_vagon_id_group] [int] NULL,
	[arrival_uz_vagon_cargo_group_name_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_cargo_group_name_en] [nvarchar](50) NULL,
	[arrival_uz_vagon_id_cargo_etsng] [int] NULL,
	[arrival_uz_vagon_cargo_etsng_code] [int] NULL,
	[arrival_uz_vagon_cargo_etsng_name_ru] [nvarchar](250) NULL,
	[arrival_uz_vagon_cargo_etsng_name_en] [nvarchar](250) NULL,
	[arrival_uz_vagon_id_cargo_gng] [int] NULL,
	[arrival_uz_vagon_cargo_gng_code] [int] NULL,
	[arrival_uz_vagon_cargo_gng_name_ru] [nvarchar](250) NULL,
	[arrival_uz_vagon_cargo_gng_name_en] [nvarchar](250) NULL,
	[arrival_uz_vagon_id_certification_data] [int] NULL,
	[arrival_uz_vagon_sertification_data_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_sertification_data_en] [nvarchar](50) NULL,
	[arrival_uz_vagon_id_commercial_condition] [int] NULL,
	[arrival_uz_vagon_commercial_condition_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_commercial_condition_en] [nvarchar](50) NULL,
	[arrival_uz_vagon_zayava] [nvarchar](100) NULL,
	[arrival_uz_vagon_kol_pac] [int] NULL,
	[arrival_uz_vagon_pac] [nvarchar](3) NULL,
	[arrival_uz_vagon_vesg] [int] NULL,
	[arrival_uz_vagon_vesg_reweighing] [float] NULL,
	[arrival_uz_vagon_nom_zpu] [nvarchar](20) NULL,
	[arrival_uz_vagon_danger] [char](3) NULL,
	[arrival_uz_vagon_danger_kod] [char](4) NULL,
	[arrival_uz_vagon_cargo_returns] [bit] NULL,
	[arrival_uz_vagon_id_station_on_amkr] [int] NULL,
	[arrival_uz_vagon_station_amkr_name_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_station_amkr_name_en] [nvarchar](50) NULL,
	[arrival_uz_vagon_station_amkr_abbr_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_station_amkr_abbr_en] [nvarchar](50) NULL,
	[arrival_uz_vagon_id_division_on_amkr] [int] NULL,
	[arrival_uz_vagon_division_code] [nvarchar](5) NULL,
	[arrival_uz_vagon_name_division_ru] [nvarchar](250) NULL,
	[arrival_uz_vagon_name_division_en] [nvarchar](250) NULL,
	[arrival_uz_vagon_division_abbr_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_division_abbr_en] [nvarchar](50) NULL,
	[arrival_uz_vagon_id_type_devision] [int] NULL,
	[arrival_uz_vagon_empty_car] [bit] NULL,
	[arrival_uz_vagon_kol_conductor] [int] NULL,
	[arrival_uz_vagon_manual] [bit] NULL,
	[arrival_uz_vagon_pay_summa] [int] NULL,
	[arrival_uz_vagon_create] [datetime] NULL,
	[arrival_uz_vagon_create_user] [nvarchar](50) NULL,
	[arrival_uz_vagon_change] [datetime] NULL,
	[arrival_uz_vagon_change_user] [nvarchar](50) NULL,
	[arrival_uz_document_id] [bigint] NULL,
	[arrival_uz_document_id_doc_uz] [nvarchar](50) NULL,
	[arrival_uz_document_nom_doc] [int] NULL,
	[arrival_uz_document_nom_main_doc] [int] NULL,
	[arrival_uz_document_code_stn_from] [int] NULL,
	[arrival_uz_document_station_from_name_ru] [nvarchar](50) NULL,
	[arrival_uz_document_station_from_name_en] [nvarchar](50) NULL,
	[arrival_uz_document_from_code_inlandrailway] [int] NULL,
	[arrival_uz_document_from_inlandrailway_name_ru] [nvarchar](150) NULL,
	[arrival_uz_document_from_inlandrailway_name_en] [nvarchar](150) NULL,
	[arrival_uz_document_from_inlandrailway_abbr_ru] [nvarchar](20) NULL,
	[arrival_uz_document_from_inlandrailway_abbr_en] [nvarchar](20) NULL,
	[arrival_uz_document_from_code_railway] [int] NULL,
	[arrival_uz_document_code_stn_to] [int] NULL,
	[arrival_uz_document_station_to_name_ru] [nvarchar](50) NULL,
	[arrival_uz_document_station_to_name_en] [nvarchar](50) NULL,
	[arrival_uz_document_to_code_inlandrailway] [int] NULL,
	[arrival_uz_document_to_inlandrailway_name_ru] [nvarchar](150) NULL,
	[arrival_uz_document_to_inlandrailway_name_en] [nvarchar](150) NULL,
	[arrival_uz_document_to_inlandrailway_abbr_ru] [nvarchar](20) NULL,
	[arrival_uz_document_to_inlandrailway_abbr_en] [nvarchar](20) NULL,
	[arrival_uz_document_to_code_railway] [int] NULL,
	[arrival_uz_document_code_border_checkpoint] [int] NULL,
	[arrival_uz_document_border_checkpoint_station_name_ru] [nvarchar](50) NULL,
	[arrival_uz_document_border_checkpoint_station_name_en] [nvarchar](50) NULL,
	[arrival_uz_document_border_checkpoint_code_inlandrailway] [int] NULL,
	[arrival_uz_document_cross_time] [datetime] NULL,
	[arrival_uz_document_code_shipper] [int] NULL,
	[arrival_uz_document_shipper_name_ru] [nvarchar](100) NULL,
	[arrival_uz_document_shipper_name_en] [nvarchar](100) NULL,
	[arrival_uz_document_code_consignee] [int] NULL,
	[arrival_uz_document_name_consignee] [nvarchar](50) NULL,
	[arrival_uz_document_klient] [bit] NULL,
	[arrival_uz_document_code_payer_sender] [nvarchar](20) NULL,
	[arrival_uz_document_payer_sender_name_ru] [nvarchar](100) NULL,
	[arrival_uz_document_payer_sender_name_en] [nvarchar](100) NULL,
	[arrival_uz_document_code_payer_arrival] [nvarchar](20) NULL,
	[arrival_uz_document_payer_arrival_name_ru] [nvarchar](100) NULL,
	[arrival_uz_document_payer_arrival_name_en] [nvarchar](100) NULL,
	[arrival_uz_document_distance_way] [int] NULL,
	[arrival_uz_document_note] [nvarchar](200) NULL,
	[arrival_uz_document_parent_id] [bigint] NULL,
	[arrival_uz_document_manual] [bit] NULL,
	[sap_incoming_supply_num] [nvarchar](10) NULL,
	[sap_incoming_supply_pos] [nvarchar](10) NULL,
	[sap_incoming_supply_date] [date] NULL,
	[sap_incoming_supply_time] [time](7) NULL,
	[sap_incoming_supply_warehouse_code] [nvarchar](4) NULL,
	[sap_incoming_supply_warehouse_name] [nvarchar](16) NULL,
	[sap_incoming_supply_warehouse_code_10] [nvarchar](4) NULL,
	[sap_incoming_supply_warehouse_name_10] [nvarchar](16) NULL,
	[sap_incoming_supply_cargo_code] [nvarchar](18) NULL,
	[sap_incoming_supply_cargo_name] [nvarchar](40) NULL,
	[sap_incoming_supply_works] [nvarchar](4) NULL,
	[sap_incoming_supply_ship] [nvarchar](35) NULL,
	[sap_incoming_supply_ban] [nvarchar](4) NULL,
	[outgoing_car_position_outgoing] [int] NULL,
	[outgoing_car_num_doc] [nvarchar](50) NULL,
	[outgoing_car_note] [nvarchar](200) NULL,
	[outgoing_car_date_outgoing_act] [datetime] NULL,
	[outgoing_car_outgoing] [datetime] NULL,
	[outgoing_car_outgoing_user] [nvarchar](50) NULL,
	[outgoing_car_id_outgoing_detention] [int] NULL,
	[outgoing_car_id_detention_return] [int] NULL,
	[outgoing_car_detention_cause_ru] [nvarchar](150) NULL,
	[outgoing_car_detention_cause_en] [nvarchar](150) NULL,
	[outgoing_car_detention_type_detention_return] [int] NULL,
	[outgoing_car_detention_date_start] [datetime] NULL,
	[outgoing_car_detention_date_stop] [datetime] NULL,
	[outgoing_car_id_reason_discrepancy_amkr] [int] NULL,
	[outgoing_car_reason_discrepancy_amkr_name_ru] [nvarchar](100) NULL,
	[outgoing_car_reason_discrepancy_amkr_name_en] [nvarchar](100) NULL,
	[outgoing_car_id_reason_discrepancy_uz] [int] NULL,
	[outgoing_car_reason_discrepancy_uz_name_ru] [nvarchar](100) NULL,
	[outgoing_car_reason_discrepancy_uz_name_en] [nvarchar](100) NULL,
	[outgoing_car_id_outgoing_return_start] [int] NULL,
	[outgoing_car_id_detention_return_start] [int] NULL,
	[outgoing_car_detention_cause_start_ru] [nvarchar](150) NULL,
	[outgoing_car_detention_cause_start_en] [nvarchar](150) NULL,
	[outgoing_car_return_start_type_detention_return] [int] NULL,
	[outgoing_car_return_start_date_start] [datetime] NULL,
	[outgoing_car_return_start_date_stop] [datetime] NULL,
	[outgoing_car_return_start_num_act] [nvarchar](20) NULL,
	[outgoing_car_return_start_date_act] [datetime] NULL,
	[outgoing_car_return_start_note] [nvarchar](200) NULL,
	[outgoing_car_id_outgoing_return_stop] [int] NULL,
	[outgoing_car_id_detention_return_stop] [int] NULL,
	[outgoing_car_detention_cause_stop_ru] [nvarchar](150) NULL,
	[outgoing_car_detention_cause_stop_en] [nvarchar](150) NULL,
	[outgoing_car_return_stop_type_detention_return] [int] NULL,
	[outgoing_car_return_stop_date_start] [datetime] NULL,
	[outgoing_car_return_stop_date_stop] [datetime] NULL,
	[outgoing_car_return_stop_num_act] [nvarchar](20) NULL,
	[outgoing_car_return_stop_date_act] [datetime] NULL,
	[outgoing_car_return_stop_note] [nvarchar](200) NULL,
	[outgoing_car_parent_wir_id] [bigint] NULL,
	[outgoing_car_create] [datetime] NULL,
	[outgoing_car_create_user] [nvarchar](50) NULL,
	[outgoing_car_change] [datetime] NULL,
	[outgoing_car_change_user] [nvarchar](50) NULL,
	[outgoing_car_note_vagonnik] [nvarchar](100) NULL,
	[outgoing_car_vagonnik] [datetime] NULL,
	[outgoing_car_vagonnik_user] [nchar](50) NULL,
	[outgoing_sostav_id] [bigint] NULL,
	[outgoing_sostav_num_doc] [int] NULL,
	[outgoing_sostav_id_station_from] [int] NULL,
	[outgoing_sostav_from_station_amkr_name_ru] [nvarchar](50) NULL,
	[outgoing_sostav_from_station_amkr_name_en] [nvarchar](50) NULL,
	[outgoing_sostav_from_station_amkr_abbr_ru] [nvarchar](50) NULL,
	[outgoing_sostav_from_station_amkr_abbr_en] [nvarchar](50) NULL,
	[outgoing_sostav_id_way_from] [int] NULL,
	[outgoing_sostav_from_id_park] [int] NULL,
	[outgoing_sostav_from_way_num_ru] [nvarchar](20) NULL,
	[outgoing_sostav_from_way_num_en] [nvarchar](20) NULL,
	[outgoing_sostav_from_way_name_ru] [nvarchar](100) NULL,
	[outgoing_sostav_from_way_name_en] [nvarchar](100) NULL,
	[outgoing_sostav_from_way_abbr_ru] [nvarchar](50) NULL,
	[outgoing_sostav_from_way_abbr_en] [nvarchar](50) NULL,
	[outgoing_sostav_id_station_on] [int] NULL,
	[outgoing_sostav_on_station_amkr_name_ru] [nvarchar](50) NULL,
	[outgoing_sostav_on_station_amkr_name_en] [nvarchar](50) NULL,
	[outgoing_sostav_on_station_amkr_abbr_ru] [nvarchar](50) NULL,
	[outgoing_sostav_on_station_amkr_abbr_en] [nvarchar](50) NULL,
	[outgoing_sostav_date_readiness_amkr] [datetime] NULL,
	[outgoing_sostav_date_end_inspection_acceptance_delivery] [datetime] NULL,
	[outgoing_sostav_date_end_inspection_loader] [datetime] NULL,
	[outgoing_sostav_date_end_inspection_vagonnik] [datetime] NULL,
	[outgoing_sostav_date_show_wagons] [datetime] NULL,
	[outgoing_sostav_date_readiness_uz] [datetime] NULL,
	[outgoing_sostav_date_outgoing] [datetime] NULL,
	[outgoing_sostav_date_outgoing_act] [datetime] NULL,
	[outgoing_sostav_date_departure_amkr] [datetime] NULL,
	[outgoing_sostav_composition_index] [nvarchar](50) NULL,
	[outgoing_sostav_status] [int] NULL,
	[outgoing_sostav_route_sign] [bit] NULL,
	[outgoing_sostav_note] [nvarchar](200) NULL,
	[outgoing_sostav_create] [datetime] NULL,
	[outgoing_sostav_create_user] [nvarchar](50) NULL,
	[outgoing_sostav_change] [datetime] NULL,
	[outgoing_sostav_change_user] [nvarchar](50) NULL,
	[outgoing_sostav_vagonnik_user] [nvarchar](50) NULL,
	[outgoing_uz_vagon_id] [bigint] NULL,
	[outgoing_uz_vagon_id_condition] [int] NULL,
	[outgoing_uz_vagon_outgoing_id_wagons_rent] [int] NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_id_operator] [int] NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_operators_ru] [nvarchar](100) NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_operators_en] [nvarchar](100) NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_ru] [nvarchar](20) NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_en] [nvarchar](20) NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_start] [datetime] NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_end] [datetime] NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_operator_paid] [bit] NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_operator_color] [nvarchar](10) NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_id_limiting] [int] NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_ru] [nvarchar](100) NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_en] [nvarchar](100) NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_ru] [nvarchar](30) NULL,
	[outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_en] [nvarchar](30) NULL,
	[outgoing_uz_vagon_id_countrys] [int] NULL,
	[outgoing_uz_vagon_wagon_adm] [int] NULL,
	[outgoing_uz_vagon_adm_name_ru] [nvarchar](100) NULL,
	[outgoing_uz_vagon_adm_name_en] [nvarchar](100) NULL,
	[outgoing_uz_vagon_adm_abbr_ru] [nvarchar](10) NULL,
	[outgoing_uz_vagon_adm_abbr_en] [nvarchar](10) NULL,
	[outgoing_uz_vagon_id_genus] [int] NULL,
	[outgoing_uz_vagon_rod] [int] NULL,
	[outgoing_uz_vagon_rod_name_ru] [nvarchar](50) NULL,
	[outgoing_uz_vagon_rod_name_en] [nvarchar](50) NULL,
	[outgoing_uz_vagon_rod_abbr_ru] [nvarchar](5) NULL,
	[outgoing_uz_vagon_rod_abbr_en] [nvarchar](5) NULL,
	[outgoing_uz_vagon_id_owner] [int] NULL,
	[outgoing_uz_vagon_owner_wagon_ru] [nvarchar](100) NULL,
	[outgoing_uz_vagon_owner_wagon_en] [nvarchar](100) NULL,
	[outgoing_uz_vagon_owner_wagon_abbr_ru] [nvarchar](20) NULL,
	[outgoing_uz_vagon_owner_wagon_abbr_en] [nvarchar](20) NULL,
	[outgoing_uz_vagon_gruzp_uz] [float] NULL,
	[outgoing_uz_vagon_tara_uz] [float] NULL,
	[outgoing_uz_vagon_note_uz] [nvarchar](1000) NULL,
	[outgoing_uz_vagon_gruzp] [float] NULL,
	[outgoing_uz_vagon_u_tara] [int] NULL,
	[outgoing_uz_vagon_ves_tary_arc] [int] NULL,
	[outgoing_uz_vagon_id_warehouse] [int] NULL,
	[outgoing_uz_vagon_id_division] [int] NULL,
	[outgoing_uz_vagon_division_code] [nvarchar](5) NULL,
	[outgoing_uz_vagon_name_division_ru] [nvarchar](250) NULL,
	[outgoing_uz_vagon_name_division_en] [nvarchar](250) NULL,
	[outgoing_uz_vagon_division_abbr_ru] [nvarchar](50) NULL,
	[outgoing_uz_vagon_division_abbr_en] [nvarchar](50) NULL,
	[outgoing_uz_vagon_id_type_devision] [int] NULL,
	[outgoing_uz_vagon_laden] [bit] NULL,
	[outgoing_uz_vagon_id_cargo] [int] NULL,
	[outgoing_uz_vagon_cargo_name_ru] [nvarchar](50) NULL,
	[outgoing_uz_vagon_cargo_name_en] [nvarchar](50) NULL,
	[outgoing_uz_vagon_id_group] [int] NULL,
	[outgoing_uz_vagon_cargo_group_name_ru] [nvarchar](50) NULL,
	[outgoing_uz_vagon_cargo_group_name_en] [nvarchar](50) NULL,
	[outgoing_uz_vagon_id_cargo_etsng] [int] NULL,
	[outgoing_uz_vagon_cargo_etsng_code] [int] NULL,
	[outgoing_uz_vagon_cargo_etsng_name_ru] [nvarchar](250) NULL,
	[outgoing_uz_vagon_cargo_etsng_name_en] [nvarchar](250) NULL,
	[outgoing_uz_vagon_id_cargo_gng] [int] NULL,
	[outgoing_uz_vagon_cargo_gng_code] [int] NULL,
	[outgoing_uz_vagon_cargo_gng_name_ru] [nvarchar](250) NULL,
	[outgoing_uz_vagon_cargo_gng_name_en] [nvarchar](250) NULL,
	[outgoing_uz_vagon_vesg] [int] NULL,
	[outgoing_uz_vagon_to_station_uz_code] [int] NULL,
	[outgoing_uz_vagon_to_station_uz_name] [nvarchar](50) NULL,
	[outgoing_uz_vagon_cont_1_nom_cont] [nvarchar](11) NULL,
	[outgoing_uz_vagon_cont_1_kod_tiporazmer] [nvarchar](4) NULL,
	[outgoing_uz_vagon_cont_1_gruzp] [int] NULL,
	[outgoing_uz_vagon_cont_1_ves_tary_arc] [int] NULL,
	[outgoing_uz_vagon_cont_1_id_cargo] [int] NULL,
	[outgoing_uz_vagon_cont_2_nom_cont] [nvarchar](11) NULL,
	[outgoing_uz_vagon_cont_2_kod_tiporazmer] [nvarchar](4) NULL,
	[outgoing_uz_vagon_cont_2_gruzp] [int] NULL,
	[outgoing_uz_vagon_cont_2_ves_tary_arc] [int] NULL,
	[outgoing_uz_vagon_cont_2_id_cargo] [int] NULL,
	[outgoing_uz_document_id] [bigint] NULL,
	[outgoing_uz_document_id_doc_uz] [nvarchar](50) NULL,
	[outgoing_uz_document_nom_doc] [int] NULL,
	[outgoing_uz_document_code_stn_from] [int] NULL,
	[outgoing_uz_document_code_stn_to] [int] NULL,
	[outgoing_uz_document_station_to_name_ru] [nvarchar](50) NULL,
	[outgoing_uz_document_station_to_name_en] [nvarchar](50) NULL,
	[outgoing_uz_document_to_code_inlandrailway] [int] NULL,
	[outgoing_uz_document_to_inlandrailway_name_ru] [nvarchar](150) NULL,
	[outgoing_uz_document_to_inlandrailway_name_en] [nvarchar](150) NULL,
	[outgoing_uz_document_to_inlandrailway_abbr_ru] [nvarchar](20) NULL,
	[outgoing_uz_document_to_inlandrailway_abbr_en] [nvarchar](20) NULL,
	[outgoing_uz_document_to_code_railway] [int] NULL,
	[outgoing_uz_document_country_nazn] [int] NULL,
	[outgoing_uz_document_to_countrys_name_ru] [nvarchar](100) NULL,
	[outgoing_uz_document_to_countrys_name_en] [nvarchar](100) NULL,
	[outgoing_uz_document_to_country_abbr_ru] [nvarchar](10) NULL,
	[outgoing_uz_document_to_country_abbr_en] [nvarchar](10) NULL,
	[outgoing_uz_document_code_border_checkpoint] [int] NULL,
	[outgoing_uz_document_border_checkpoint_station_name_ru] [nvarchar](50) NULL,
	[outgoing_uz_document_border_checkpoint_station_name_en] [nvarchar](50) NULL,
	[outgoing_uz_document_border_checkpoint_code_inlandrailway] [int] NULL,
	[outgoing_uz_document_cross_date] [datetime] NULL,
	[outgoing_uz_document_code_shipper] [int] NULL,
	[outgoing_uz_document_name_shipper] [nvarchar](50) NULL,
	[outgoing_uz_document_code_consignee] [int] NULL,
	[outgoing_uz_document_consignee_name_ru] [nvarchar](100) NULL,
	[outgoing_uz_document_consignee_name_en] [nvarchar](100) NULL,
	[outgoing_uz_document_vid] [nvarchar](2) NULL,
	[outgoing_uz_document_code_payer] [nvarchar](20) NULL,
	[outgoing_uz_document_payer_name_ru] [nvarchar](100) NULL,
	[outgoing_uz_document_payer_name_en] [nvarchar](100) NULL,
	[outgoing_uz_document_distance_way] [int] NULL,
	[outgoing_uz_document_osum] [bigint] NULL,
	[outgoing_uz_document_date_sozdan] [datetime] NULL,
	[outgoing_uz_document_date_otpr] [datetime] NULL,
	[outgoing_uz_document_date_pr] [datetime] NULL,
	[outgoing_uz_document_date_grpol] [datetime] NULL,
	[outgoing_uz_document_date_vid] [datetime] NULL,
	[outgoing_uz_document_info_sht] [nvarchar](400) NULL,
	[outgoing_uz_document_name_gr] [nvarchar](800) NULL,
	[outgoing_uz_document_note] [nvarchar](200) NULL,
	[sap_outgoing_supply_num] [char](10) NULL,
	[sap_outgoing_supply_date] [date] NULL,
	[sap_outgoing_supply_cargo_name] [nvarchar](160) NULL,
	[sap_outgoing_supply_cargo_code] [char](17) NULL,
	[sap_outgoing_supply_shipper_name] [nvarchar](150) NULL,
	[sap_outgoing_supply_shipper_code] [char](10) NULL,
	[sap_outgoing_supply_destination_station_name] [nvarchar](30) NULL,
	[sap_outgoing_supply_destination_station_code] [char](10) NULL,
	[sap_outgoing_supply_border_checkpoint_name] [nvarchar](30) NULL,
	[sap_outgoing_supply_border_checkpoint_code] [char](10) NULL,
	[sap_outgoing_supply_netto] [float] NULL,
	[sap_outgoing_supply_warehouse_code] [char](4) NULL,
	[sap_outgoing_supply_warehouse_name] [nvarchar](20) NULL,
	[sap_outgoing_supply_responsible_post] [nvarchar](50) NULL,
	[sap_outgoing_supply_responsible_fio] [nvarchar](50) NULL,
	[sap_outgoing_supply_payer_code] [char](15) NULL,
	[sap_outgoing_supply_payer_name] [nvarchar](50) NULL)
	AS
	BEGIN

	insert @view_incoming_outgoing
SELECT  
       -->================================= ВНУТРННЕЕ ПЕРМЕЩЕНИЕ ВАГОНА ========================
	   wir.[id] as wir_id
      ,wir.[num] as num
      ,wir.[id_arrival_car] as id_arrival_car
      ,wir.[id_sap_incoming_supply] as id_sap_incoming_supply
      ,wir.[doc_outgoing_car] as wir_doc_outgoing_car
      ,wir.[id_outgoing_car] as id_outgoing_car
      ,wir.[id_sap_outbound_supply] as id_sap_outbound_supply
      ,wir.[note] as wir_note
      ,wir.[create] as wir_create
      ,wir.[create_user] as wir_create_user
      ,wir.[close] as wir_close
      ,wir.[close_user] as wir_close_user
      ,wir.[parent_id] as wir_parent_id
      ,wir.[highlight_color] as wir_highlight_color
		-->================================= ПРИБЫТИЕ =====================================
		--> ПРИБЫТИЕ ВАГОНОВ [IDS].[ArrivalCars]
		--,arr_car.[id_arrival]
		,arr_car.[position] as arrival_car_position
		,arr_car.[consignee] as arrival_car_consignee
		,arr_car.[num_doc] as arrival_car_num_doc
		,arr_car.[id_transfer] as arrival_car_id_transfer					-- Признак вагон перенесен вручную (указан id состава откуда забрали)
		,arr_car.[note] as arrival_car_note
		,arr_car.[date_adoption_act] as arrival_car_date_adoption_act
		,arr_car.[arrival] as arrival_car_arrival
		,arr_car.[arrival_user] as arrival_car_arrival_user
		,arr_car.[create] as arrival_car_create
		,arr_car.[create_user] as arrival_car_create_user
		,arr_car.[change] as arrival_car_change
		,arr_car.[change_user] as arrival_car_change_user
		--,arr_car.[id_arrival_uz_vagon] as arrival_car_
		-->======================================================================================================
		--> ПРИБЫТИЕ СОСТАВА [IDS].[ArrivalSostav]
		,arr_sost.[id] as arrival_sostav_id
		,arr_sost.[id_arrived] as arrival_sostav_id_arrived
		,arr_sost.[id_sostav] as arrival_sostav_id_sostav
		,arr_sost.[train] as arrival_sostav_train
		,arr_sost.[composition_index] as arrival_sostav_composition_index
		,arr_sost.[date_arrival] as arrival_sostav_date_arrival
		,arr_sost.[date_adoption] as arrival_sostav_date_adoption
		,arr_sost.[date_adoption_act] as arrival_sostav_date_adoption_act
		-->IDS.Directory_Station
		,arr_sost.[id_station_from] as arrival_sostav_id_station_from
		,arr_dir_station_from.station_name_ru as arrival_sostav_station_from_name_ru
		,arr_dir_station_from.station_name_en as arrival_sostav_station_from_name_en
		,arr_dir_station_from.station_abbr_ru as arrival_sostav_station_from_abbr_ru
		,arr_dir_station_from.station_abbr_en as arrival_sostav_station_from_abbr_en
		-->IDS.Directory_Station
		,arr_sost.[id_station_on] as arrival_sostav_id_station_on
		,arr_dir_station_on.station_name_ru as arrival_sostav_station_on_name_ru
		,arr_dir_station_on.station_name_en as arrival_sostav_station_on_name_en
		,arr_dir_station_on.station_abbr_ru as arrival_sostav_station_on_abbr_ru
		,arr_dir_station_on.station_abbr_en as arrival_sostav_station_on_abbr_en
		--> [IDS].[Directory_Ways]
		,arr_sost.[id_way] as arrival_sostav_id_way
		,arr_dir_way_on.[id_park] as arrival_sostav_way_on_id_park
		,arr_dir_way_on.[way_num_ru] as arrival_sostav_way_on_num_ru
		,arr_dir_way_on.[way_num_en] as arrival_sostav_way_on_num_en
		,arr_dir_way_on.[way_name_ru] as arrival_sostav_way_on_name_ru
		,arr_dir_way_on.[way_name_en] as arrival_sostav_way_on_name_en
		,arr_dir_way_on.[way_abbr_ru] as arrival_sostav_way_on_abbr_ru
		,arr_dir_way_on.[way_abbr_en] as arrival_sostav_way_on_abbr_en
		,arr_sost.[numeration] as arrival_sostav_numeration
		,arr_sost.[num_doc] as arrival_sostav_num_doc
		,arr_sost.[count] as arrival_sostav_count
		,arr_sost.[status] as arrival_sostav_status
		,arr_sost.[note] as arrival_sostav_note
		,arr_sost.[create] as arrival_sostav_create
		,arr_sost.[create_user] as arrival_sostav_create_user
		,arr_sost.[change] as arrival_sostav_change
		,arr_sost.[change_user] as arrival_sostav_change_user
				-->======================================================================================================
		--> ДОКУМЕНТ НА ВАГОН ПО ПРИБЫТИЮ [IDS].[Arrival_UZ_Vagon] 
		,arr_doc_vag.[id] as arrival_uz_vagon_id
		--,arr_doc_vag.[id_document]
		--,arr_doc_vag.[num]
		,arr_doc_vag.[id_arrival] as arrival_uz_vagon_id_arrival
		-- владелец
		,arr_doc_vag.[id_owner] as arrival_uz_vagon_id_owner
		,dir_owner.[owner_ru] as arrival_uz_vagon_owner_wagon_ru					-- Владелец [IDS].[Directory_OwnersWagons] по справочнику [IDS].[Directory_Wagons]
		,dir_owner.[owner_en] as arrival_uz_vagon_owner_wagon_en					-- Владелец [IDS].[Directory_OwnersWagons] по справочнику [IDS].[Directory_Wagons]
		,dir_owner.[abbr_ru] as arrival_uz_vagon_owner_wagon_abbr_ru				-- Владелец [IDS].[Directory_OwnersWagons] по справочнику [IDS].[Directory_Wagons]
		,dir_owner.[abbr_en] as arrival_uz_vagon_owner_wagon_abbr_en				-- Владелец [IDS].[Directory_OwnersWagons] по справочнику [IDS].[Directory_Wagons]
		-- Добавил 16.04.2022	
		,arr_doc_vag.id_type_ownership as arrival_uz_vagon_id_type_ownership
		,dir_type_os.[type_ownership_ru] as arrival_uz_vagon_type_ownership_ru		-- ТИП Владения для АМКР [IDS].[Directory_TypeOwnerShip] по справочнику [IDS].[Directory_Wagons]
		,dir_type_os.[type_ownership_en] as arrival_uz_vagon_type_ownership_en      -- ТИП Владения для АМКР [IDS].[Directory_TypeOwnerShip] по справочнику [IDS].[Directory_Wagons]
		-- администрация
		,arr_doc_vag.[id_countrys] as arrival_uz_vagon_id_countrys
		,wag_dir_countrys.code_sng as arrival_uz_vagon_wagon_adm				-- Код администрации [IDS].[Directory_Countrys] по справочнику [IDS].[Directory_Wagons]
		,wag_dir_countrys.countrys_name_ru as arrival_uz_vagon_wagon_adm_name_ru		-- Администрации [IDS].[Directory_Countrys] по справочнику [IDS].[Directory_Wagons]
		,wag_dir_countrys.countrys_name_en as arrival_uz_vagon_wagon_adm_name_en		-- Администрации [IDS].[Directory_Countrys] по справочнику [IDS].[Directory_Wagons]
		,wag_dir_countrys.country_abbr_ru as arrival_uz_vagon_wagon_adm_abbr_ru		-- Администрации [IDS].[Directory_Countrys] по справочнику [IDS].[Directory_Wagons]
		,wag_dir_countrys.country_abbr_en as arrival_uz_vagon_wagon_adm_abbr_en		-- Администрации [IDS].[Directory_Countrys] по справочнику [IDS].[Directory_Wagons]
		--> РОД ВАГОНА ПО ПРИБЫТИЮ [IDS].[Directory_GenusWagons]
		,arr_doc_vag.[id_genus]	 as arrival_uz_vagon_id_genus							-- id строки род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.rod_uz as arrival_uz_vagon_rod									-- Код рода вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_ru as arrival_uz_vagon_rod_name_ru							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_en as arrival_uz_vagon_rod_name_en							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_ru as arrival_uz_vagon_rod_abbr_ru							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_en as arrival_uz_vagon_rod_abbr_en							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,arr_doc_vag.[kol_os] as arrival_uz_vagon_wagon_kol_os
		,arr_doc_vag.[usl_tip] as arrival_uz_vagon_wagon_usl_tip
		,arr_doc_vag.[date_rem_uz] as arrival_uz_vagon_wagon_date_rem_uz
		,arr_doc_vag.[date_rem_vag] as arrival_uz_vagon_wagon_date_rem_vag
		--,arr_doc_vag.[id_car] as arrival_uz_vagon_
		--> РАЗМЕТКА ПО ПРИБЫТИЮ [IDS].[Directory_ConditionArrival]
		,arr_doc_vag.[id_condition] as arrival_uz_vagon_id_condition
		,arr_dir_cond.condition_name_ru as arrival_uz_vagon_condition_name_ru			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_name_en as arrival_uz_vagon_condition_name_en			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_ru as arrival_uz_vagon_condition_abbr_ru			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_en as arrival_uz_vagon_condition_abbr_en			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.repairs as arrival_uz_vagon_condition_repairs						-- Готовность [IDS].[Directory_ConditionArrival] по прибытию призаак ремонт [IDS].[Arrival_UZ_Vagon]
		--> АРЕНДА ПО ПРИБЫТИЮ [IDS].[Directory_WagonsRent]
		,arr_wag_rent.[id] as arrival_uz_vagon_id_wagons_rent_arrival							-- id строки аренда [IDS].[Directory_WagonsRent] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> ОПЕРАТОР ПО ПРИБЫТИЮ [IDS].[Directory_OperatorsWagons]
		,arr_wag_rent.[id_operator] as arrival_uz_vagon_arrival_wagons_rent_id_operator			-- id строки оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[operators_ru] as arrival_uz_vagon_arrival_wagons_rent_operators_ru	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[operators_en] as arrival_uz_vagon_arrival_wagons_rent_operators_en	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[abbr_ru] as arrival_uz_vagon_arrival_wagons_rent_operator_abbr_ru		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[abbr_en] as arrival_uz_vagon_arrival_wagons_rent_operator_abbr_en		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_wag_rent.[rent_start] as arrival_uz_vagon_arrival_wagons_rent_start					-- Начало аренды оператора [IDS].[Directory_WagonsRent] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_wag_rent.[rent_end] as arrival_uz_vagon_arrival_wagons_rent_end						-- Конец аренды оператора [IDS].[Directory_WagonsRent] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[paid] as arrival_uz_vagon_arrival_wagons_rent_operator_paid			-- Признак платности оператора [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[color] as arrival_uz_vagon_arrival_wagons_rent_operator_color			-- Цвет оператора [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> ОГРАНИЧЕНИЕ ПО ПРИБЫТИЮ [IDS].[Directory_LimitingLoading]
		,arr_wag_rent.[id_limiting] as arrival_uz_vagon_arrival_wagons_rent_id_limiting			-- id строки оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_limload.[limiting_name_ru] as arrival_uz_vagon_arrival_wagons_rent_limiting_name_ru	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_limload.[limiting_name_en] as arrival_uz_vagon_arrival_wagons_rent_limiting_name_en	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_limload.[limiting_abbr_ru] as arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_ru	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_limload.[limiting_abbr_en] as arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_en	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> IDS.Directory_TypeWagons
		,arr_doc_vag.[id_type] as arrival_uz_vagon_id_type
		,dir_type.type_ru as arrival_uz_vagon_type_ru
		,dir_type.type_en as arrival_uz_vagon_type_en
		,arr_doc_vag.[gruzp] as arrival_uz_vagon_gruzp
		,arr_doc_vag.[u_tara] as arrival_uz_vagon_u_tara
		,arr_doc_vag.[ves_tary_arc] as arrival_uz_vagon_ves_tary_arc
		,arr_doc_vag.[gruzp_uz] as arrival_uz_vagon_gruzp_uz
		,arr_doc_vag.[tara_uz] as arrival_uz_vagon_tara_uz
		,arr_doc_vag.[route] as arrival_uz_vagon_route
		,arr_doc_vag.[note_vagon] as arrival_uz_vagon_note_vagon
		--> IDS.Directory_Cargo
		,arr_doc_vag.[id_cargo] as arrival_uz_vagon_id_cargo
		,arr_dir_cargo.cargo_name_ru as arrival_uz_vagon_cargo_name_ru
		,arr_dir_cargo.cargo_name_en as arrival_uz_vagon_cargo_name_en
		--> СПРАВОЧНИК ГРУППА ГРУЗА [IDS].[Directory_CargoGroup]	
		,arr_dir_cargo.[id_group] as arrival_uz_vagon_id_group								-- id группа груза [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_ru as arrival_uz_vagon_cargo_group_name_ru	-- Группа грузов [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_en as arrival_uz_vagon_cargo_group_name_en	-- Группа грузов [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> СПРАВОЧНИК ГРУЗА ЕТСНГ [IDS].[Directory_CargoETSNG]
		,arr_dir_cargo.[id_cargo_etsng] as arrival_uz_vagon_id_cargo_etsng					-- id груза ЕТСНГ [IDS].[Directory_CargoETSNG] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_etsng.[code] as arrival_uz_vagon_cargo_etsng_code						-- Код груза ЕТСНГ [IDS].[Directory_CargoETSNG] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_etsng.[cargo_etsng_name_ru] as arrival_uz_vagon_cargo_etsng_name_ru	-- Груз ЕТСНГ [IDS].[Directory_CargoETSNG] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_etsng.[cargo_etsng_name_en] as arrival_uz_vagon_cargo_etsng_name_en	-- Груз ЕТСНГ [IDS].[Directory_CargoETSNG] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> [IDS].[Directory_CargoGNG]
		,arr_doc_vag.[id_cargo_gng] as arrival_uz_vagon_id_cargo_gng
		,arr_dir_cargo_gng.[code] as arrival_uz_vagon_cargo_gng_code							-- Код груза ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_gng.[cargo_gng_name_ru] as arrival_uz_vagon_cargo_gng_name_ru			-- Груз ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_gng.[cargo_gng_name_en] as arrival_uz_vagon_cargo_gng_name_en			-- Груз ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Arrival_UZ_Vagon]
		--> IDS.Directory_CertificationData
		,arr_doc_vag.[id_certification_data] as arrival_uz_vagon_id_certification_data
		,arr_dir_certif.[certification_data_ru] as arrival_uz_vagon_sertification_data_ru
		,arr_dir_certif.[certification_data_en] as arrival_uz_vagon_sertification_data_en
		--> [IDS].[Directory_CommercialCondition]
		,arr_doc_vag.[id_commercial_condition] as arrival_uz_vagon_id_commercial_condition
		,arr_comm_cond.[commercial_condition_ru] as arrival_uz_vagon_commercial_condition_ru
		,arr_comm_cond.[commercial_condition_en] as arrival_uz_vagon_commercial_condition_en
		,arr_doc_vag.[zayava]  as arrival_uz_vagon_zayava
		,arr_doc_vag.[kol_pac] as arrival_uz_vagon_kol_pac
		,arr_doc_vag.[pac] as arrival_uz_vagon_pac
		,arr_doc_vag.[vesg] as arrival_uz_vagon_vesg
		,arr_doc_vag.[vesg_reweighing] as arrival_uz_vagon_vesg_reweighing
		,arr_doc_vag.[nom_zpu] as arrival_uz_vagon_nom_zpu
		,arr_doc_vag.[danger] as arrival_uz_vagon_danger
		,arr_doc_vag.[danger_kod] as arrival_uz_vagon_danger_kod
		,arr_doc_vag.[cargo_returns] as arrival_uz_vagon_cargo_returns
		--> IDS.Directory_Station
		,arr_doc_vag.[id_station_on_amkr] as arrival_uz_vagon_id_station_on_amkr
		,arr_dir_station_amkr.station_name_ru as arrival_uz_vagon_station_amkr_name_ru
		,arr_dir_station_amkr.station_name_en as arrival_uz_vagon_station_amkr_name_en
		,arr_dir_station_amkr.station_abbr_ru as arrival_uz_vagon_station_amkr_abbr_ru
		,arr_dir_station_amkr.station_abbr_en as arrival_uz_vagon_station_amkr_abbr_en
		--> [IDS].[Directory_Divisions] 
		,arr_doc_vag.[id_division_on_amkr] as arrival_uz_vagon_id_division_on_amkr
		,arr_dir_divis_amkr.[code] as arrival_uz_vagon_division_code					-- Код подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_ru] as arrival_uz_vagon_name_division_ru	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_en] as arrival_uz_vagon_name_division_en	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_ru] as arrival_uz_vagon_division_abbr_ru	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_en] as arrival_uz_vagon_division_abbr_en	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[id_type_devision] as arrival_uz_vagon_id_type_devision	-- id типа подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_doc_vag.[empty_car] as arrival_uz_vagon_empty_car
		,arr_doc_vag.[kol_conductor] as arrival_uz_vagon_kol_conductor
		,arr_doc_vag.[manual] as arrival_uz_vagon_manual
		,arr_doc_vag.[pay_summa] as arrival_uz_vagon_pay_summa
		,arr_doc_vag.[create] as arrival_uz_vagon_create
		,arr_doc_vag.[create_user] as arrival_uz_vagon_create_user
		,arr_doc_vag.[change] as arrival_uz_vagon_change
		,arr_doc_vag.[change_user] as arrival_uz_vagon_change_user
		-->======================================================================================================
		--> ДОКУМЕНТ НА СОСТАВ ПО ПРИБЫТИЮ [IDS].[Arrival_UZ_Document]
		,arr_doc_uz.[id]  as arrival_uz_document_id
		,arr_doc_uz.[id_doc_uz]  as arrival_uz_document_id_doc_uz
		,arr_doc_uz.[nom_doc]  as arrival_uz_document_nom_doc
		,arr_doc_uz.[nom_main_doc]  as arrival_uz_document_nom_main_doc
		--> [IDS].[Directory_ExternalStation]
		,arr_doc_uz.[code_stn_from]  as arrival_uz_document_code_stn_from
		,arr_ext_station_from.[station_name_ru] as arrival_uz_document_station_from_name_ru
		,arr_ext_station_from.[station_name_en] as arrival_uz_document_station_from_name_en
		--> [IDS].[Directory_InlandRailway]
		,arr_ext_station_from.[code_inlandrailway] as arrival_uz_document_from_code_inlandrailway
		,arr_ir_from.[inlandrailway_name_ru] as arrival_uz_document_from_inlandrailway_name_ru
		,arr_ir_from.[inlandrailway_name_en] as arrival_uz_document_from_inlandrailway_name_en
		,arr_ir_from.[inlandrailway_abbr_ru] as arrival_uz_document_from_inlandrailway_abbr_ru
		,arr_ir_from.[inlandrailway_abbr_en] as arrival_uz_document_from_inlandrailway_abbr_en
		,arr_ir_from.[code_railway] as arrival_uz_document_from_code_railway
		--> [IDS].[Directory_ExternalStation]
		,arr_doc_uz.[code_stn_to]  as arrival_uz_document_code_stn_to
		,arr_ext_station_to.[station_name_ru] as arrival_uz_document_station_to_name_ru
		,arr_ext_station_to.[station_name_en] as arrival_uz_document_station_to_name_en
		--> [IDS].[Directory_InlandRailway]
		,arr_ext_station_to.[code_inlandrailway] as arrival_uz_document_to_code_inlandrailway
		,arr_ir_to.[inlandrailway_name_ru] as arrival_uz_document_to_inlandrailway_name_ru
		,arr_ir_to.[inlandrailway_name_en] as arrival_uz_document_to_inlandrailway_name_en
		,arr_ir_to.[inlandrailway_abbr_ru] as arrival_uz_document_to_inlandrailway_abbr_ru
		,arr_ir_to.[inlandrailway_abbr_en] as arrival_uz_document_to_inlandrailway_abbr_en
		,arr_ir_to.[code_railway] as arrival_uz_document_to_code_railway
		-->  [IDS].[Directory_BorderCheckpoint]
		,arr_doc_uz.[code_border_checkpoint]  as arrival_uz_document_code_border_checkpoint
		,arr_border_checkpoint.[station_name_ru] as arrival_uz_document_border_checkpoint_station_name_ru
		,arr_border_checkpoint.[station_name_en] as arrival_uz_document_border_checkpoint_station_name_en
		,arr_border_checkpoint.[code_inlandrailway] as arrival_uz_document_border_checkpoint_code_inlandrailway
		,arr_doc_uz.[cross_time]  as arrival_uz_document_cross_time
		--> [IDS].[Directory_Shipper]
		,arr_doc_uz.[code_shipper]  as arrival_uz_document_code_shipper
		,arr_shipper.[shipper_name_ru] as arrival_uz_document_shipper_name_ru
		,arr_shipper.[shipper_name_en] as arrival_uz_document_shipper_name_en
		--> [IDS].[Directory_Consignee]
		,arr_doc_uz.[code_consignee] as arrival_uz_document_code_consignee
		,arr_consignee.[name] as arrival_uz_document_name_consignee
		,arr_doc_uz.[klient]  as arrival_uz_document_klient
		--> [IDS].[Directory_PayerArrival]
		,arr_doc_uz.[code_payer_sender]  as arrival_uz_document_code_payer_sender
		,arr_payer_send.[payer_name_ru] as arrival_uz_document_payer_sender_name_ru
		,arr_payer_send.[payer_name_en] as arrival_uz_document_payer_sender_name_en
		--> [IDS].[Directory_PayerArrival]
		,arr_doc_uz.[code_payer_arrival]  as arrival_uz_document_code_payer_arrival
		,arr_payer_arr.[payer_name_ru] as arrival_uz_document_payer_arrival_name_ru
		,arr_payer_arr.[payer_name_en] as arrival_uz_document_payer_arrival_name_en
		,arr_doc_uz.[distance_way]  as arrival_uz_document_distance_way
		,arr_doc_uz.[note]  as arrival_uz_document_note
		,arr_doc_uz.[parent_id]  as arrival_uz_document_parent_id
		,arr_doc_uz.[manual] as arrival_uz_document_manual
		--,arr_doc_uz.[create]
		--,arr_doc_uz.[create_user]
		--,arr_doc_uz.[change]
		--,arr_doc_uz.[change_user]
		-->======================================================================================================
		--> Входящая поставка [IDS].[SAPIncomingSupply]
		,sap_is.[VBELN] as sap_incoming_supply_num
		,sap_is.[NUM_VBELN] as sap_incoming_supply_pos
		,sap_is.[ERDAT] as sap_incoming_supply_date
		,sap_is.[ETIME] as sap_incoming_supply_time
		,sap_is.[LGORT] as sap_incoming_supply_warehouse_code			-- Заадресовка
		,sap_is.[LGOBE] as sap_incoming_supply_warehouse_name
		,sap_is.[LGORT_10] as sap_incoming_supply_warehouse_code_10		-- Переадресация (Заадресовка 10км)
		,sap_is.[LGOBE_10] as sap_incoming_supply_warehouse_name_10
		,sap_is.[MATNR] as sap_incoming_supply_cargo_code				-- Материал
		,sap_is.[MAKTX] as sap_incoming_supply_cargo_name
		,sap_is.[WERKS] as sap_incoming_supply_works
		,sap_is.[NAME_SH] as sap_incoming_supply_ship					--Судно:
		,sap_is.[KOD_R_10] as sap_incoming_supply_ban					-- Запрет выгр.
		--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		-->================================= ОТПРАВКА =====================================
		--> ОТПРАВКА ВАГОНОВ [IDS].[OutgoingCars]
		,out_car.[position_outgoing] as outgoing_car_position_outgoing
		,out_car.[num_doc] as outgoing_car_num_doc														-- Номер документа(по отправке)
		,out_car.[note] as outgoing_car_note															-- примечание вагона по отправке
		,out_car.[date_outgoing_act] as outgoing_car_date_outgoing_act									-- сдан по акту
		,out_car.[outgoing] as outgoing_car_outgoing													-- вагон был сдан (дата и время)
		,out_car.[outgoing_user] as outgoing_car_outgoing_user											-- вагон был сдан (пользователь)
	--> ПРИЧИНА ЗАДЕРЖАНИЯ [IDS].[OutgoingDetentionReturn]
		,out_car.[id_outgoing_detention] as outgoing_car_id_outgoing_detention							-- id строки задержание [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_detect_return.id_detention_return as outgoing_car_id_detention_return						-- id строки описания задержания [IDS].[Directory_Reason_Discrepancy] по строку задержания [IDS].[OutgoingDetentionReturn]
		,out_dir_dr.[cause_ru] as outgoing_car_detention_cause_ru										-- Задержание [IDS].[Directory_DetentionReturn] по строку задержания [IDS].[OutgoingDetentionReturn]]
		,out_dir_dr.[cause_en] as outgoing_car_detention_cause_en										-- Задержание [IDS].[Directory_DetentionReturn] по строку задержания [IDS].[OutgoingDetentionReturn]
		,out_detect_return.[type_detention_return] as outgoing_car_detention_type_detention_return		-- Тип задержания [IDS].[OutgoingDetentionReturn] по строку задержания [IDS].[OutgoingDetentionReturn]
		,out_detect_return.[date_start] as outgoing_car_detention_date_start							-- Дата начала задержания [IDS].[OutgoingDetentionReturn] по строку задержания [IDS].[OutgoingDetentionReturn]
		,out_detect_return.[date_stop] as outgoing_car_detention_date_stop								-- Дата конца задержания [IDS].[OutgoingDetentionReturn] по строку задержания [IDS].[OutgoingDetentionReturn]
		--> ПРИЧИНА НЕСООТВЕТСВИЯ [Directory_Reason_Discrepancy]
		,out_car.[id_reason_discrepancy_amkr] as outgoing_car_id_reason_discrepancy_amkr				-- id строки несоответсвия АМКР [IDS].[Directory_Reason_Discrepancy] по отправке [IDS].[OutgoingCars]
		,out_dir_rd_amkr.[reason_discrepancy_name_ru] as outgoing_car_reason_discrepancy_amkr_name_ru	-- Несоответсвие АМКР [IDS].[Directory_Reason_Discrepancy] по отправке [IDS].[OutgoingCars]
		,out_dir_rd_amkr.[reason_discrepancy_name_en] as outgoing_car_reason_discrepancy_amkr_name_en	-- Несоответсвие АМКР [IDS].[Directory_Reason_Discrepancy] по отправке [IDS].[OutgoingCars]
		,out_car.[id_reason_discrepancy_uz] as outgoing_car_id_reason_discrepancy_uz					-- id строки несоответсвия УЗ [IDS].[Directory_Reason_Discrepancy] по отправке [IDS].[OutgoingCars]
		,out_dir_rd_uz.[reason_discrepancy_name_ru] as outgoing_car_reason_discrepancy_uz_name_ru		-- Несоответсвие УЗ [IDS].[Directory_Reason_Discrepancy] по отправке [IDS].[OutgoingCars]
		,out_dir_rd_uz.[reason_discrepancy_name_en] as outgoing_car_reason_discrepancy_uz_name_en		-- Несоответсвие УЗ [IDS].[Directory_Reason_Discrepancy] по отправке [IDS].[OutgoingCars]
		--> ВОЗВРАТ НАЧАЛО ПО ОТПРАВКЕ [IDS].[OutgoingDetentionReturn]	
		,out_car.[id_outgoing_return_start] as outgoing_car_id_outgoing_return_start					-- id строки начало возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		--> ВОЗВРАТ НАЧАЛО [IDS].[Directory_DetentionReturn]
		,out_detect_return_start.[id_detention_return] as outgoing_car_id_detention_return_start		-- id начала возврата [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_dir_dr_start.[cause_ru] as outgoing_car_detention_cause_start_ru							-- Возврат начало [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_dir_dr_start.[cause_en] as outgoing_car_detention_cause_start_en							-- Возврат начало [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
		--
		,out_detect_return_start.[type_detention_return] as outgoing_car_return_start_type_detention_return -- Тип начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_detect_return_start.[date_start] as outgoing_car_return_start_date_start						-- Дата начала начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_detect_return_start.[date_stop] as outgoing_car_return_start_date_stop							-- Дата конца начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_detect_return_start.[num_act] as outgoing_car_return_start_num_act								-- № акта начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_detect_return_start.[date_act] as outgoing_car_return_start_date_act							-- Дата акта начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_detect_return_start.[note] as outgoing_car_return_start_note									-- Примечание начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		--> ВОЗВРАТ КОНЕЦ ПО ОТПРАВКЕ [IDS].[OutgoingDetentionReturn]	
		,out_car.[id_outgoing_return_stop] as outgoing_car_id_outgoing_return_stop						-- id конца возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		--> ВОЗВРАТ КОНЕЦ [IDS].[Directory_DetentionReturn]
		,out_detect_return_stop.[id_detention_return] as outgoing_car_id_detention_return_stop			-- id конца возврата [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_dir_dr_stop.[cause_ru] as outgoing_car_detention_cause_stop_ru								-- Возврат конца [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_dir_dr_stop.[cause_en] as outgoing_car_detention_cause_stop_en								-- Возврат конца [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
		--
		,out_detect_return_stop.[type_detention_return] as outgoing_car_return_stop_type_detention_return -- Тип конца возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_detect_return_stop.[date_start] as outgoing_car_return_stop_date_start						-- Дата конца начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_detect_return_stop.[date_stop] as outgoing_car_return_stop_date_stop						-- Дата конца конца возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_detect_return_stop.[num_act] as outgoing_car_return_stop_num_act							-- № акта конца возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_detect_return_stop.[date_act] as outgoing_car_return_stop_date_act							-- Дата акта конца возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_detect_return_stop.[note] as outgoing_car_return_stop_note									-- Примечание конца возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
		,out_car.[parent_wir_id] as outgoing_car_parent_wir_id											-- ссылка на внутренее перемещение если открыт "возврат" по отправке [IDS].[OutgoingCars]
		,out_car.[create] as outgoing_car_create														-- строку по отправленому вагону создали (дата и время) по отправке [IDS].[OutgoingCars]
		,out_car.[create_user] as outgoing_car_create_user												-- строку по отправленому вагону создали (пользователь) по отправке [IDS].[OutgoingCars]
		,out_car.[change] as outgoing_car_change														-- строку по отправленому вагону правили (дата и время) по отправке [IDS].[OutgoingCars]
		,out_car.[change_user] as outgoing_car_change_user												-- строку по отправленому вагону правили (пользователь) по отправке [IDS].[OutgoingCars]
		,out_car.[note_vagonnik] as outgoing_car_note_vagonnik											-- Примечание сделанное вагонником по отправке [IDS].[OutgoingCars]
		,out_car.[vagonnik] as outgoing_car_vagonnik													-- Вагонник (дата и время) по отправке [IDS].[OutgoingCars]
		,out_car.[vagonnik_user] as outgoing_car_vagonnik_user											-- Вагонник (пользователь) по отправке [IDS].[OutgoingCars]
		-->======================================================================================================
		--> ОТПРАВКА СОСТАВ [IDS].[OutgoingSostav]
		,out_sost.[id] as outgoing_sostav_id
		,out_sost.[num_doc] as outgoing_sostav_num_doc
		--> СТАНЦИЯ ОТПРАВЛЕНИЯ АМКР IDS.Directory_Station
		,out_sost.[id_station_from] as outgoing_sostav_id_station_from
		,out_dir_station_amkr.station_name_ru as outgoing_sostav_from_station_amkr_name_ru
		,out_dir_station_amkr.station_name_en as outgoing_sostav_from_station_amkr_name_en
		,out_dir_station_amkr.station_abbr_ru as outgoing_sostav_from_station_amkr_abbr_ru
		,out_dir_station_amkr.station_abbr_en as outgoing_sostav_from_station_amkr_abbr_en
		--> ПУТЬ ОТПРАВЛЕНИЯ АМКР IDS.[Directory_Ways]
		,out_sost.[id_way_from] as outgoing_sostav_id_way_from
		,out_dir_way_amkr.[id_park] as outgoing_sostav_from_id_park
		,out_dir_way_amkr.[way_num_ru] as outgoing_sostav_from_way_num_ru
		,out_dir_way_amkr.[way_num_en] as outgoing_sostav_from_way_num_en
		,out_dir_way_amkr.[way_name_ru] as outgoing_sostav_from_way_name_ru
		,out_dir_way_amkr.[way_name_en] as outgoing_sostav_from_way_name_en
		,out_dir_way_amkr.[way_abbr_ru] as outgoing_sostav_from_way_abbr_ru
		,out_dir_way_amkr.[way_abbr_en] as outgoing_sostav_from_way_abbr_en
		--> СТАНЦИЯ КУДА ОТПРАВЛЯЕТСЯ СОСТАВ АМКР IDS.Directory_Station
		,out_sost.[id_station_on] as outgoing_sostav_id_station_on
		,out_dir_station_on.station_name_ru as outgoing_sostav_on_station_amkr_name_ru
		,out_dir_station_on.station_name_en as outgoing_sostav_on_station_amkr_name_en
		,out_dir_station_on.station_abbr_ru as outgoing_sostav_on_station_amkr_abbr_ru
		,out_dir_station_on.station_abbr_en as outgoing_sostav_on_station_amkr_abbr_en
		,out_sost.[date_readiness_amkr] as outgoing_sostav_date_readiness_amkr
		,out_sost.[date_end_inspection_acceptance_delivery] as outgoing_sostav_date_end_inspection_acceptance_delivery
		,out_sost.[date_end_inspection_loader] as outgoing_sostav_date_end_inspection_loader
		,out_sost.[date_end_inspection_vagonnik] as outgoing_sostav_date_end_inspection_vagonnik
		,out_sost.[date_show_wagons] as outgoing_sostav_date_show_wagons
		,out_sost.[date_readiness_uz] as outgoing_sostav_date_readiness_uz
		,out_sost.[date_outgoing] as outgoing_sostav_date_outgoing
		,out_sost.[date_outgoing_act] as outgoing_sostav_date_outgoing_act
		,out_sost.[date_departure_amkr] as outgoing_sostav_date_departure_amkr
		,out_sost.[composition_index] as outgoing_sostav_composition_index
		,out_sost.[status] as outgoing_sostav_status
		,out_sost.[route_sign] as outgoing_sostav_route_sign
		,out_sost.[note] as outgoing_sostav_note
		,out_sost.[create] as outgoing_sostav_create
		,out_sost.[create_user] as outgoing_sostav_create_user
		,out_sost.[change] as outgoing_sostav_change
		,out_sost.[change_user] as outgoing_sostav_change_user
		,out_sost.[vagonnik_user] as outgoing_sostav_vagonnik_user
		-->======================================================================================================
		--> ДОКУМЕНТ НА ВАГОН ПО ОТПРАВКЕ [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[id] as outgoing_uz_vagon_id										-- id строки документа по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[id_condition] as outgoing_uz_vagon_id_condition					-- id строки готовность по прибытию [IDS].[Outgoing_UZ_Vagon]
		----> РАЗМЕТКА ПО ПРИБЫТИЮ [IDS].[Directory_ConditionArrival]
		--,out_dir_cond.condition_name_ru as outgoing_uz_vagon_condition_name_ru			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,out_dir_cond.condition_name_en as outgoing_uz_vagon_condition_name_en			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,out_dir_cond.condition_abbr_ru as outgoing_uz_vagon_condition_abbr_ru			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,out_dir_cond.condition_abbr_en as outgoing_uz_vagon_condition_abbr_en			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,out_dir_cond.repairs as outgoing_uz_vagon_condition_repairs						-- Готовность [IDS].[Directory_ConditionArrival] по прибытию призаак ремонт [IDS].[Outgoing_UZ_Vagon]
		----> АРЕНДА ПО ПРИБЫТИЮ [IDS].[Directory_WagonsRent]
		--,arr_wag_rent.[id] as outgoing_uz_vagon_arrival_id_wagons_rent							-- id строки аренда [IDS].[Directory_WagonsRent] по прибытию [IDS].[Outgoing_UZ_Vagon]
		----> ОПЕРАТОР ПО ПРИБЫТИЮ [IDS].[Directory_OperatorsWagons]
		--,arr_wag_rent.[id_operator] as outgoing_uz_vagon_arrival_wagons_rent_id_operator			-- id строки оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,arr_dir_operator.[operators_ru] as outgoing_uz_vagon_arrival_wagons_rent_operators_ru	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,arr_dir_operator.[operators_en] as outgoing_uz_vagon_arrival_wagons_rent_operators_en	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,arr_dir_operator.[abbr_ru] as outgoing_uz_vagon_arrival_wagons_rent_operator_abbr_ru		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,arr_dir_operator.[abbr_en] as outgoing_uz_vagon_arrival_wagons_rent_operator_abbr_en		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,arr_wag_rent.[rent_start] as outgoing_uz_vagon_arrival_wagons_rent_start					-- Начало аренды оператора [IDS].[Directory_WagonsRent] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,arr_wag_rent.[rent_end] as outgoing_uz_vagon_arrival_wagons_rent_end						-- Конец аренды оператора [IDS].[Directory_WagonsRent] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,arr_dir_operator.[paid] as outgoing_uz_vagon_arrival_wagons_rent_operator_paid			-- Признак платности оператора [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,arr_dir_operator.[color] as outgoing_uz_vagon_arrival_wagons_rent_operator_color			-- Цвет оператора [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
		----> ОГРАНИЧЕНИЕ ПО ПРИБЫТИЮ [IDS].[Directory_LimitingLoading]
		--,arr_wag_rent.[id_limiting] as outgoing_uz_vagon_arrival_wagons_rent_id_limiting			-- id строки оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,arr_dir_limload.[limiting_name_ru] as outgoing_uz_vagon_arrival_wagons_rent_limiting_name_ru	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,arr_dir_limload.[limiting_name_en] as outgoing_uz_vagon_arrival_wagons_rent_limiting_name_en	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,arr_dir_limload.[limiting_abbr_ru] as outgoing_uz_vagon_arrival_wagons_rent_limiting_abbr_ru	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--,arr_dir_limload.[limiting_abbr_en] as outgoing_uz_vagon_arrival_wagons_rent_limiting_abbr_en	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Outgoing_UZ_Vagon]
		--> АРЕНДА ПО ОТПРАВКЕ [IDS].[Directory_WagonsRent]
		,out_wag_rent.[id] as outgoing_uz_vagon_outgoing_id_wagons_rent					-- id строки аренда [IDS].[Directory_WagonsRent] по отправке [IDS].[Outgoing_UZ_Vagon]
		--> ОПЕРАТОР ПО ОТПРАВКЕ [IDS].[Directory_OperatorsWagons]
		,out_wag_rent.[id_operator] as outgoing_uz_vagon_outgoing_wagons_rent_id_operator			-- id строки оператор [IDS].[Directory_OperatorsWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_operator.[operators_ru] as outgoing_uz_vagon_outgoing_wagons_rent_operators_ru	-- Оператор [IDS].[Directory_OperatorsWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_operator.[operators_en] as outgoing_uz_vagon_outgoing_wagons_rent_operators_en	-- Оператор [IDS].[Directory_OperatorsWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_operator.[abbr_ru] as outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_ru	-- Оператор [IDS].[Directory_OperatorsWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_operator.[abbr_en] as outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_en	-- Оператор [IDS].[Directory_OperatorsWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_wag_rent.[rent_start] as outgoing_uz_vagon_outgoing_wagons_rent_start				-- Начало аренды оператора [IDS].[Directory_WagonsRent] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_wag_rent.[rent_end] as outgoing_uz_vagon_outgoing_wagons_rent_end					-- Конец аренды оператора [IDS].[Directory_WagonsRent] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_operator.[paid] as outgoing_uz_vagon_outgoing_wagons_rent_operator_paid			-- Признак платности оператора [IDS].[Directory_OperatorsWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_operator.[color] as outgoing_uz_vagon_outgoing_wagons_rent_operator_color		-- Цвет оператора [IDS].[Directory_OperatorsWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		--> ОГРАНИЧЕНИЕ ПО ОТПРАВКЕ [IDS].[Directory_LimitingLoading]
		,out_wag_rent.[id_limiting] as outgoing_uz_vagon_outgoing_wagons_rent_id_limiting					-- id строки оганичение [IDS].[Directory_LimitingLoading] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_limload.[limiting_name_ru] as outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_ru	-- Оганичение [IDS].[Directory_LimitingLoading] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_limload.[limiting_name_en] as outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_en	-- Оганичение [IDS].[Directory_LimitingLoading] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_limload.[limiting_abbr_ru] as outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_ru	-- Оганичение [IDS].[Directory_LimitingLoading] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_limload.[limiting_abbr_en] as outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_en	-- Оганичение [IDS].[Directory_LimitingLoading] по отправке [IDS].[Outgoing_UZ_Vagon]
		--> АДМИНИСТРАЦИЯ ПО ОТПРАВКЕ [IDS].[Directory_Countrys]
		,out_doc_vag.[id_countrys] as outgoing_uz_vagon_id_countrys						-- id строки администрация [IDS].[Directory_Countrys] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_countrys.code_sng as outgoing_uz_vagon_wagon_adm						-- Код администрации [IDS].[Directory_Countrys] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_countrys.countrys_name_ru as outgoing_uz_vagon_adm_name_ru		-- Администрации [IDS].[Directory_Countrys] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_countrys.countrys_name_en as outgoing_uz_vagon_adm_name_en		-- Администрации [IDS].[Directory_Countrys] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_countrys.country_abbr_ru as outgoing_uz_vagon_adm_abbr_ru			-- Администрации [IDS].[Directory_Countrys] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_countrys.country_abbr_en as outgoing_uz_vagon_adm_abbr_en			-- Администрации [IDS].[Directory_Countrys] по отправке [IDS].[Outgoing_UZ_Vagon]
		--> РОД ВАГОНА ПО ОТПРАВКЕ [IDS].[Directory_GenusWagons]
		,out_doc_vag.[id_genus]	 as outgoing_uz_vagon_id_genus							-- id строки род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		-- Правил 13-02-2022
		,out_dir_rod.rod_uz as outgoing_uz_vagon_rod									-- Код рода вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_rod.genus_ru as outgoing_uz_vagon_rod_name_ru							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_rod.genus_en as outgoing_uz_vagon_rod_name_en							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_rod.abbr_ru as outgoing_uz_vagon_rod_abbr_ru							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_rod.abbr_en as outgoing_uz_vagon_rod_abbr_en							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		--> СОБСТВЕННИК ПО УЗ [IDS].[Directory_OwnersWagons]
		,out_doc_vag.[id_owner] as outgoing_uz_vagon_id_owner						-- id строки владелец [IDS].[Directory_OwnersWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		-- переделал 10.02.2022
		,out_dir_owner.[owner_ru] as outgoing_uz_vagon_owner_wagon_ru					-- Владелец [IDS].[Directory_OwnersWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_owner.[owner_en] as outgoing_uz_vagon_owner_wagon_en					-- Владелец [IDS].[Directory_OwnersWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_owner.[abbr_ru] as outgoing_uz_vagon_owner_wagon_abbr_ru				-- Владелец [IDS].[Directory_OwnersWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_owner.[abbr_en] as outgoing_uz_vagon_owner_wagon_abbr_en				-- Владелец [IDS].[Directory_OwnersWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[gruzp_uz] as outgoing_uz_vagon_gruzp_uz						-- Грузоподъемность по документу УЗ [IDS].[Directory_OwnersWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[tara_uz] as outgoing_uz_vagon_tara_uz						-- Тара по документу УЗ по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[note_uz] as outgoing_uz_vagon_note_uz						-- Примечание по документу УЗ по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[gruzp] as outgoing_uz_vagon_gruzp							-- Грузоподъемность по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[u_tara] as outgoing_uz_vagon_u_tara							-- Тара уточненая по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[ves_tary_arc] as outgoing_uz_vagon_ves_tary_arc				-- Тара уточненая по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[id_warehouse] as outgoing_uz_vagon_id_warehouse				-- id склад уточненая по отправке [IDS].[Outgoing_UZ_Vagon]
		--> СПРАВОЧНИК ПОДРАЗДЕЛЕНИЯ ПО ОТПРАВКЕ [IDS].[Directory_Divisions]
		,out_doc_vag.[id_division] as outgoing_uz_vagon_id_division				-- id строки подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_divis.[code] as outgoing_uz_vagon_division_code					-- Код подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_divis.[name_division_ru] as outgoing_uz_vagon_name_division_ru	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_divis.[name_division_en] as outgoing_uz_vagon_name_division_en	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_divis.[division_abbr_ru] as outgoing_uz_vagon_division_abbr_ru	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_divis.[division_abbr_en] as outgoing_uz_vagon_division_abbr_en	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_divis.[id_type_devision] as outgoing_uz_vagon_id_type_devision	-- id типа подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[laden] as outgoing_uz_vagon_laden							-- груженый [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		--> СПРАВОЧНИК ГРУЗА [IDS].[Directory_Cargo]
		,out_doc_vag.[id_cargo] as outgoing_uz_vagon_id_cargo						-- id груза [IDS].[Directory_Cargo] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo.cargo_name_ru as outgoing_uz_vagon_cargo_name_ru			-- Груз [IDS].[Directory_Cargo] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo.cargo_name_en as outgoing_uz_vagon_cargo_name_en			-- Груз [IDS].[Directory_Cargo] по отправке [IDS].[Outgoing_UZ_Vagon]
		--> СПРАВОЧНИК ГРУППА ГРУЗА [IDS].[Directory_CargoGroup]	
		,out_dir_cargo.[id_group] as outgoing_uz_vagon_id_group							-- id группа груза [IDS].[Directory_CargoGroup] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_group_cargo.cargo_group_name_ru as outgoing_uz_vagon_cargo_group_name_ru	-- Группа грузов [IDS].[Directory_CargoGroup] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_group_cargo.cargo_group_name_en as outgoing_uz_vagon_cargo_group_name_en	-- Группа грузов [IDS].[Directory_CargoGroup] по отправке [IDS].[Outgoing_UZ_Vagon]
		--> СПРАВОЧНИК ГРУЗА ЕТСНГ [IDS].[Directory_CargoETSNG]
		,out_dir_cargo.[id_cargo_etsng] as outgoing_uz_vagon_id_cargo_etsng					-- id груза ЕТСНГ [IDS].[Directory_CargoETSNG] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo_etsng.[code] as outgoing_uz_vagon_cargo_etsng_code						-- Код груза ЕТСНГ [IDS].[Directory_CargoETSNG] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo_etsng.[cargo_etsng_name_ru] as outgoing_uz_vagon_cargo_etsng_name_ru	-- Груз ЕТСНГ [IDS].[Directory_CargoETSNG] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo_etsng.[cargo_etsng_name_en] as outgoing_uz_vagon_cargo_etsng_name_en	-- Груз ЕТСНГ [IDS].[Directory_CargoETSNG] по отправке [IDS].[Outgoing_UZ_Vagon]
		--> СПРАВОЧНИК ГРУЗА ГНГ [IDS].[Directory_CargoGNG]
		,out_doc_vag.[id_cargo_gng] as outgoing_uz_vagon_id_cargo_gng							-- id груза ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo_gng.[code] as outgoing_uz_vagon_cargo_gng_code							-- Код груза ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo_gng.[cargo_gng_name_ru] as outgoing_uz_vagon_cargo_gng_name_ru			-- Груз ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo_gng.[cargo_gng_name_en] as outgoing_uz_vagon_cargo_gng_name_en			-- Груз ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[vesg] as outgoing_uz_vagon_vesg											-- Вес груза ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Outgoing_UZ_Vagon]
		--> СПРАВОЧНИК СТАНЦИИ УЗ ПО ОТПРАВКЕ [UZ].[Directory_Stations]
		,out_doc_vag.[code_stn_to] as outgoing_uz_vagon_to_station_uz_code						-- Код станции УЗ [UZ].[Directory_Stations] по отправке [IDS].[Outgoing_UZ_Vagon]
		
		-- Исправил 06092022
		,out_vag_station_uz.[station_name_ru] as outgoing_uz_vagon_to_station_uz_name			-- Станция УЗ [IDS].[Directory_ExternalStation] по отправке [IDS].[Outgoing_UZ_Vagon]
		--,out_doc_vag.[create]
		--,out_doc_vag.[create_user]
		--,out_doc_vag.[change]
		--,out_doc_vag.[change_user]
			-->======================================================================================================
		--> ДОКУМЕНТ НА КОНТЕЙНЕРА [IDS].[Outgoing_UZ_Vagon_Cont]
		,out_doc_vag_cont1.[nom_cont] as outgoing_uz_vagon_cont_1_nom_cont
		,out_doc_vag_cont1.[kod_tiporazmer] as outgoing_uz_vagon_cont_1_kod_tiporazmer
		,out_doc_vag_cont1.[gruzp] as outgoing_uz_vagon_cont_1_gruzp
		,out_doc_vag_cont1.[ves_tary_arc] as outgoing_uz_vagon_cont_1_ves_tary_arc
		,out_doc_vag_cont1.[id_cargo] as outgoing_uz_vagon_cont_1_id_cargo
		,out_doc_vag_cont2.[nom_cont] as outgoing_uz_vagon_cont_2_nom_cont
		,out_doc_vag_cont2.[kod_tiporazmer] as outgoing_uz_vagon_cont_2_kod_tiporazmer
		,out_doc_vag_cont2.[gruzp] as outgoing_uz_vagon_cont_2_gruzp
		,out_doc_vag_cont2.[ves_tary_arc] as outgoing_uz_vagon_cont_2_ves_tary_arc
		,out_doc_vag_cont2.[id_cargo] as outgoing_uz_vagon_cont_2_id_cargo
		-->======================================================================================================
		--> ДОКУМЕНТ НА СОСТАВ ПО ОТПРАВКЕ [IDS].[Outgoing_UZ_Document]
		,out_doc_sostav.[id] as outgoing_uz_document_id
		,out_doc_sostav.[id_doc_uz] as outgoing_uz_document_id_doc_uz
		,out_doc_sostav.[nom_doc] as outgoing_uz_document_nom_doc
		,out_doc_sostav.[code_stn_from] as outgoing_uz_document_code_stn_from
		--> [IDS].[Directory_ExternalStation]
		,out_doc_sostav.[code_stn_to] as outgoing_uz_document_code_stn_to
		,out_ext_station.[station_name_ru] as outgoing_uz_document_station_to_name_ru
		,out_ext_station.[station_name_en] as outgoing_uz_document_station_to_name_en
		--> [IDS].[Directory_InlandRailway]
		,out_ext_station.[code_inlandrailway] as outgoing_uz_document_to_code_inlandrailway
		,out_ir_to.[inlandrailway_name_ru] as outgoing_uz_document_to_inlandrailway_name_ru
		,out_ir_to.[inlandrailway_name_en] as outgoing_uz_document_to_inlandrailway_name_en
		,out_ir_to.[inlandrailway_abbr_ru] as outgoing_uz_document_to_inlandrailway_abbr_ru
		,out_ir_to.[inlandrailway_abbr_en] as outgoing_uz_document_to_inlandrailway_abbr_en
		,out_ir_to.[code_railway] as outgoing_uz_document_to_code_railway
		--> [IDS].[Directory_Countrys]
		,out_doc_sostav.[country_nazn] as outgoing_uz_document_country_nazn
		--,out_countrys_to.[code_sng] as outgoing_uz_document_to_code_sng
		--,out_countrys_to.[code_europe] as outgoing_uz_document_to_code_europe
		--,out_countrys_to.[code_iso] as outgoing_uz_document_to_code_iso
		,out_countrys_to.[countrys_name_ru] as outgoing_uz_document_to_countrys_name_ru
		,out_countrys_to.[countrys_name_en] as outgoing_uz_document_to_countrys_name_en
		,out_countrys_to.[country_abbr_ru] as outgoing_uz_document_to_country_abbr_ru
		,out_countrys_to.[country_abbr_en] as outgoing_uz_document_to_country_abbr_en
		--> [IDS].[Directory_BorderCheckpoint]
		,out_doc_sostav.[code_border_checkpoint] as outgoing_uz_document_code_border_checkpoint
		,out_border_checkpoint.[station_name_ru] as outgoing_uz_document_border_checkpoint_station_name_ru
		,out_border_checkpoint.[station_name_en] as outgoing_uz_document_border_checkpoint_station_name_en
		,out_border_checkpoint.[code_inlandrailway] as outgoing_uz_document_border_checkpoint_code_inlandrailway
		,out_doc_sostav.[cross_date] as outgoing_uz_document_cross_date
		--> [IDS].[Directory_Consignee]
		,out_doc_sostav.[code_shipper] as outgoing_uz_document_code_shipper
		,out_consignee.[name] as outgoing_uz_document_name_shipper
		--> [IDS].[Directory_Shipper]
		,out_doc_sostav.[code_consignee] as outgoing_uz_document_code_consignee
		,out_shipper.[shipper_name_ru] as outgoing_uz_document_consignee_name_ru
		,out_shipper.[shipper_name_en] as outgoing_uz_document_consignee_name_en
		,out_doc_sostav.[vid] as outgoing_uz_document_vid
		--> [IDS].[Directory_PayerSender]
		,out_doc_sostav.[code_payer] as outgoing_uz_document_code_payer
		,out_payer_sender.[payer_name_ru] as outgoing_uz_document_payer_name_ru
		,out_payer_sender.[payer_name_en] as outgoing_uz_document_payer_name_en
		,out_doc_sostav.[distance_way] as outgoing_uz_document_distance_way
		,out_doc_sostav.[osum] as outgoing_uz_document_osum
		,out_doc_sostav.[date_sozdan] as outgoing_uz_document_date_sozdan
		,out_doc_sostav.[date_otpr] as outgoing_uz_document_date_otpr
		,out_doc_sostav.[date_pr] as outgoing_uz_document_date_pr
		,out_doc_sostav.[date_grpol] as outgoing_uz_document_date_grpol
		,out_doc_sostav.[date_vid] as outgoing_uz_document_date_vid
		,out_doc_sostav.[info_sht] as outgoing_uz_document_info_sht
		,out_doc_sostav.[name_gr] as outgoing_uz_document_name_gr
		,out_doc_sostav.[note] as outgoing_uz_document_note
		--,out_doc_sostav.[create]
		--,out_doc_sostav.[create_user]
		--,out_doc_sostav.[change]
		--,out_doc_sostav.[change_user]
		-->======================================================================================================
		--> Исходящая поставка [IDS].[SAPOutgoingSupply]
		,sap_os.[VBELN] as sap_outgoing_supply_num
		,sap_os.[ERDAT] as sap_outgoing_supply_date
		,sap_os.[ZBEZEI] as sap_outgoing_supply_cargo_name
		,sap_os.[STAWN] as sap_outgoing_supply_cargo_code
		,sap_os.[NAME1_AG] as sap_outgoing_supply_shipper_name
		,sap_os.[KUNNR_AG] as sap_outgoing_supply_shipper_code
		,sap_os.[ZRWNAME] as sap_outgoing_supply_destination_station_name
		,sap_os.[ZENDSTAT] as sap_outgoing_supply_destination_station_code
		,sap_os.[ZCRSTNAME] as sap_outgoing_supply_border_checkpoint_name
		,sap_os.[ZCROSSSTAT] as sap_outgoing_supply_border_checkpoint_code
		,sap_os.[ZZVES_NETTO] as sap_outgoing_supply_netto
		,sap_os.[ABTNR] as sap_outgoing_supply_warehouse_code
		,sap_os.[VTEXT] as sap_outgoing_supply_warehouse_name
		,sap_os.[ZZDOLG] as sap_outgoing_supply_responsible_post
		,sap_os.[ZZFIO] as sap_outgoing_supply_responsible_fio
		,sap_os.[ZZPLATEL] as sap_outgoing_supply_payer_code
		,sap_os.[ZZNAME_PLATEL] as sap_outgoing_supply_payer_name

		FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] as wir
		--==== ПРИБЫТИЕ И ПРИЕМ ВАГОНА =====================================================================
		Left JOIN IDS.ArrivalCars as arr_car ON wir.[id_arrival_car] = arr_car.id
		--> Прибытие состава
	    Left JOIN IDS.ArrivalSostav as arr_sost ON arr_sost.id = arr_car.id_arrival
		 --> Документы на вагон по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		 --> Документы на группу вагонов (состав) по принятию ваг она на АМКР
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
		 --> Документы SAP Входящая поставка
		--Left JOIN [IDS].[SAPIncomingSupply] as sap_is ON wir.id_sap_incoming_supply = sap_is.id
		Left JOIN [IDS].[SAPIncomingSupply] as sap_is ON arr_car.id = sap_is.id_arrival_car

		--==== ОТПРАВКА ВАГОНА =====================================================================
		--> Отправка вагона
		Left JOIN [IDS].[OutgoingCars] as out_car ON wir.[id_outgoing_car] = out_car.id
		--> Отправка состава
		Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_sost.id = out_car.id_outgoing
		--==== СДАЧА ВАГОНА, ЗАДЕРЖАНИЯ, ВОЗВРАТ И ОТПРАВКА  ================================================================
		--> Документы на вагон по отправки вагона на УЗ
		Left JOIN [IDS].[Outgoing_UZ_Vagon] as out_doc_vag ON out_car.id_outgoing_uz_vagon = out_doc_vag.id
		--> Документы на контейнера по отправки вагона на УЗ
		Left JOIN [IDS].[Outgoing_UZ_Vagon_Cont] as out_doc_vag_cont1 ON out_doc_vag_cont1.id = (SELECT TOP (1) [id] FROM [IDS].[Outgoing_UZ_Vagon_Cont] where [id_vagon]= out_doc_vag.id order by id)
		Left JOIN [IDS].[Outgoing_UZ_Vagon_Cont] as out_doc_vag_cont2 ON out_doc_vag_cont2.id = (SELECT TOP (1) [id] FROM [IDS].[Outgoing_UZ_Vagon_Cont] where [id_vagon]= out_doc_vag.id order by id desc)
		--> Документы на состав по отправки вагона на УЗ
		Left JOIN [IDS].[Outgoing_UZ_Document] as out_doc_sostav ON out_doc_vag.id_document = out_doc_sostav.id
		--> Документы SAP Исходящая поставка
		Left JOIN [IDS].[SAPOutgoingSupply] as sap_os ON wir.id_sap_outbound_supply = sap_os.id

		--==================================== СПРАВОЧНИКИ ====================================================
		--> Справочник Станции АМКР (станция приема на АМКР)
		Left JOIN IDS.Directory_Station as arr_dir_station_from ON arr_sost.[id_station_from] =  arr_dir_station_from.id
		--> Справочник Станции АМКР (станция приема на АМКР)
		Left JOIN IDS.Directory_Station as arr_dir_station_on ON arr_sost.id_station_on =  arr_dir_station_on.id
		--> Справочник Станции АМКР (станция отправки на АМКР)
		Left JOIN IDS.Directory_Station as arr_dir_station_amkr ON arr_doc_vag.[id_station_on_amkr] =  arr_dir_station_amkr.id
		--> Справочник Путь АМКР (путь прибытия на АМКР)
		Left JOIN [IDS].[Directory_Ways] as arr_dir_way_on ON arr_sost.[id_way] =  arr_dir_way_on.id

		--> Справочник Станции АМКР (станция прибытия на АМКР)
		Left JOIN IDS.Directory_Station as out_dir_station_amkr ON out_sost.id_station_from =  out_dir_station_amkr.id
		--> Справочник Станции АМКР (отправка станция на которую отправлен состав)
		Left JOIN IDS.Directory_Station as out_dir_station_on ON out_sost.id_station_on =  out_dir_station_on.id
		--> Справочник Путь АМКР (путь отправки на АМКР)
		Left JOIN [IDS].[Directory_Ways] as out_dir_way_amkr ON out_sost.[id_way_from] =  out_dir_way_amkr.id


		--> Справочник Подразделений АМКР (по отправке)
		Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis_amkr ON arr_doc_vag.[id_division_on_amkr] = arr_dir_divis_amkr.id
		--> Справочник Подразделений АМКР (по отправке)
		Left JOIN [IDS].[Directory_Divisions] as out_dir_divis ON out_doc_vag.[id_division] = out_dir_divis.id

		--> Справочник Собственник вагона по УЗ по прибытию
		Left JOIN [IDS].[Directory_OwnersWagons] as dir_owner ON arr_doc_vag.[id_owner] = dir_owner.id
		--> Справочник Собственник вагона по УЗ по отправке
		Left JOIN [IDS].[Directory_OwnersWagons] as out_dir_owner ON out_doc_vag.id_owner = out_dir_owner.id
		--> Справочник строна (Администрация вагона по прибытию)
		 Left JOIN IDS.Directory_Countrys as wag_dir_countrys ON arr_doc_vag.[id_countrys] = wag_dir_countrys.id
		--> Справочник строна (Администрация вагона по отправке)
		Left JOIN IDS.Directory_Countrys as out_dir_countrys ON out_doc_vag.id_countrys = out_dir_countrys.id
		--> Справочник Стран (по отправке)
		Left JOIN [IDS].[Directory_Countrys] as out_countrys_to ON out_doc_sostav.[country_nazn] = out_countrys_to.[code_iso]
		--> Справочник Род вагона по прибытию
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON arr_doc_vag.[id_genus] = dir_rod.id
		--> Справочник Род вагона (По отправке)
		Left JOIN IDS.Directory_GenusWagons as out_dir_rod ON out_doc_vag.id_genus = out_dir_rod.id
		--> Справочник Тип вагона
		Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
		--> Справочник Тип владения вагоном
		Left JOIN IDS.[Directory_TypeOwnerShip] as dir_type_os ON arr_doc_vag.id_type_ownership =  dir_type_os.id
		--> Справочник Разметка по прибытию
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> Справочник аренд
		Left JOIN [IDS].[Directory_WagonsRent] as arr_wag_rent ON arr_wag_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = arr_car.num and ((arr_sost.[date_adoption] is null and convert(datetime, convert(varchar(15), [rent_start], 102)) <=arr_sost.[date_arrival]) OR (arr_sost.[date_adoption] is not null and convert(datetime, convert(varchar(15), [rent_start], 102)) <=arr_sost.[date_adoption])) order by [rent_start] desc)	
		--> Справочник Оператор вагона по прибытию
		Left JOIN IDS.Directory_OperatorsWagons as arr_dir_operator ON arr_wag_rent.id_operator =  arr_dir_operator.id
		--> Справочник Ограничение погрузки по прибытию
		Left JOIN IDS.Directory_LimitingLoading as arr_dir_limload ON arr_wag_rent.id_limiting =  arr_dir_limload.id

		--> Справочник Аренд по отправке
		Left JOIN [IDS].[Directory_WagonsRent] as out_wag_rent ON out_doc_vag.id_wagons_rent_outgoing = out_wag_rent.id
				--> Справочник Оператор вагона по прибытию
		Left JOIN IDS.Directory_OperatorsWagons as out_dir_operator ON out_wag_rent.id_operator =  out_dir_operator.id
		--> Справочник Ограничение погрузки по прибытию
		Left JOIN IDS.Directory_LimitingLoading as out_dir_limload ON out_wag_rent.id_limiting =  out_dir_limload.id


		--> Справочник Грузов по прибытию
		Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
		--> Справочник Грузов по отправке
		Left JOIN IDS.Directory_Cargo as out_dir_cargo ON out_doc_vag.id_cargo =  out_dir_cargo.id
		--> Справочник Группы Грузов по прибытию
		Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		--> Справочник Группы Грузов по отправке
		Left JOIN IDS.Directory_CargoGroup as out_dir_group_cargo ON out_dir_cargo.id_group =  out_dir_group_cargo.id
		--> Справочник Грузов ЕТСНГ по прибытию
		Left JOIN [IDS].[Directory_CargoETSNG] as arr_dir_cargo_etsng ON arr_dir_cargo.id_cargo_etsng = arr_dir_cargo_etsng.id
		--> Справочник Грузов ЕТСНГ по отправке
		Left JOIN [IDS].[Directory_CargoETSNG] as out_dir_cargo_etsng ON out_dir_cargo.id_cargo_etsng = out_dir_cargo_etsng.id
		--> Справочник Грузов ГНГ по прибытию
		Left JOIN [IDS].[Directory_CargoGNG] as arr_dir_cargo_gng ON arr_doc_vag.id_cargo_gng = arr_dir_cargo_gng.id
		--> Справочник Грузов ГНГ по отправке
		Left JOIN [IDS].[Directory_CargoGNG] as out_dir_cargo_gng ON out_doc_vag.id_cargo_gng = out_dir_cargo_gng.id
		--> Справочник Сертификат данные
		Left JOIN IDS.Directory_CertificationData as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
		--> Справочник комерческое состояние
		Left JOIN [IDS].[Directory_CommercialCondition] as arr_comm_cond ON arr_doc_vag.[id_commercial_condition] = arr_comm_cond.id

		--> Справочник Внешних станций УЗ (по отправке)
		Left JOIN [IDS].[Directory_ExternalStation] as out_vag_station_uz ON  out_doc_vag.[code_stn_to] = out_vag_station_uz.code
		--> Справочник Внешних станций (по прибытию from)
		Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON arr_doc_uz.[code_stn_from] = arr_ext_station_from.code
		--> Справочник Внешних станций (по прибытию to)
		Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_to ON arr_doc_uz.[code_stn_to] = arr_ext_station_to.code
		--> Справочник Внешних станций (по отправке)
		Left JOIN [IDS].[Directory_ExternalStation] as out_ext_station ON out_doc_sostav.[code_stn_to] = out_ext_station.code
		--> Справочник Железных дорог (по прибытию from)
		Left JOIN [IDS].[Directory_InlandRailway] as arr_ir_from ON arr_ext_station_from.[code_inlandrailway] = arr_ir_from.code
		--> Справочник Железных дорог (по прибытию from)
		Left JOIN [IDS].[Directory_InlandRailway] as arr_ir_to ON arr_ext_station_to.[code_inlandrailway] = arr_ir_to.code
		--> Справочник Железных дорог (по отправке)
		Left JOIN [IDS].[Directory_InlandRailway] as out_ir_to ON out_ext_station.[code_inlandrailway] = out_ir_to.code
		--> Справочник Погран переходов (по отправке)
		Left JOIN [IDS].[Directory_BorderCheckpoint] as arr_border_checkpoint ON arr_doc_uz.[code_border_checkpoint] = arr_border_checkpoint.[code]
		--> Справочник Погран переходов (по отправке)
		Left JOIN [IDS].[Directory_BorderCheckpoint] as out_border_checkpoint ON out_doc_sostav.[code_border_checkpoint] = out_border_checkpoint.[code]
		--> Справочник грузоотправители (по прибытию)
		Left JOIN [IDS].[Directory_Consignee] arr_consignee ON arr_doc_uz.[code_consignee] = arr_consignee.code
		--> Справочник грузоотправители (по отправке)
		Left JOIN [IDS].[Directory_Consignee] as out_consignee ON out_doc_sostav.[code_shipper] = out_consignee.code
		--> Справочник грузополучателей (по отправке)
		Left JOIN [IDS].[Directory_Shipper] as arr_shipper ON arr_doc_uz.[code_shipper] = arr_shipper.code
		--> Справочник грузополучателей (по отправке)
		Left JOIN [IDS].[Directory_Shipper] as out_shipper ON out_doc_sostav.[code_consignee] = out_shipper.code
		--> Справочник платильщик по отправке (по отправке)
		Left JOIN [IDS].[Directory_PayerSender] as arr_payer_send ON arr_doc_uz.[code_payer_sender] = arr_payer_send.[code]
		--> Справочник платильщик по отправке (по отправке)
		Left JOIN [IDS].[Directory_PayerArrival] as arr_payer_arr ON arr_doc_uz.[code_payer_arrival] = arr_payer_arr.[code]
		--> Справочник платильщик (по отправке)
		Left JOIN [IDS].[Directory_PayerSender] as out_payer_sender ON out_doc_sostav.[code_payer] = out_payer_sender.[code]

		--> Справочник задержаний (подробно)
		Left JOIN [IDS].[OutgoingDetentionReturn] as out_detect_return ON out_car.[id_outgoing_detention] = out_detect_return.id
		--> Справочник перечня задержаний 
		Left JOIN [IDS].[Directory_DetentionReturn] as out_dir_dr ON out_detect_return.[id_detention_return] = out_dir_dr.id
		--> Справочник несоответсвий АМКР		
		Left JOIN [IDS].[Directory_Reason_Discrepancy] as out_dir_rd_amkr ON out_car.id_reason_discrepancy_amkr = out_dir_rd_amkr.id
		--> Справочник несоответсвий АМКР		
		Left JOIN [IDS].[Directory_Reason_Discrepancy] as out_dir_rd_uz ON out_car.id_reason_discrepancy_uz = out_dir_rd_uz.id
		--> Справочник возврата начала (подробно)
		Left JOIN [IDS].[OutgoingDetentionReturn] as out_detect_return_start ON out_car.id_outgoing_return_start = out_detect_return_start.id
		--> Справочник возврата стоп (подробно)
		Left JOIN [IDS].[OutgoingDetentionReturn] as out_detect_return_stop ON out_car.id_outgoing_return_stop = out_detect_return_stop.id
		--> Справочник Возврата начало 
		Left JOIN [IDS].[Directory_DetentionReturn] as out_dir_dr_start ON out_detect_return_start.id_detention_return = out_dir_dr_start.id
		--> Справочник Возврата начало 
		Left JOIN [IDS].[Directory_DetentionReturn] as out_dir_dr_stop ON out_detect_return_stop.id_detention_return = out_dir_dr_stop.id
	where wir.[num]=@num
	RETURN
 END

GO


