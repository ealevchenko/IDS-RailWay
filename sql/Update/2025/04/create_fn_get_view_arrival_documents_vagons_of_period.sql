USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_adoption_sostav_of_period]    Script Date: 16.04.2025 14:17:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [IDS].[get_view_arrival_documents_vagons_of_period]
 (
   @start datetime, 
   @stop datetime
 )
	RETURNS 
	@vagons TABLE(
	[arrival_car_id] [bigint] NULL,
	[num] [int] NULL,
	[arrival_car_position_arrival] [int] NULL,
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
	[arrival_uz_vagon_id] [bigint] NOT NULL,
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
	[arrival_uz_vagon_summa_001] [bigint] NULL,
	[arrival_uz_vagon_id_act_services1] [int] NULL,
	[arrival_uz_vagon_id_act_services2] [int] NULL,
	[arrival_uz_vagon_id_act_services3] [int] NULL,
	[arrival_uz_vagon_num_act_services1] [nvarchar](20) NULL,
	[arrival_uz_vagon_num_act_services2] [nvarchar](20) NULL,
	[arrival_uz_vagon_num_act_services3] [nvarchar](20) NULL,
	[arrival_uz_vagon_create] [datetime] NOT NULL,
	[arrival_uz_vagon_create_user] [nvarchar](50) NOT NULL,
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
	[arrival_uz_document_date_otpr] [datetime] NULL,
	[arrival_uz_document_srok_end] [datetime] NULL,
	[arrival_uz_document_date_grpol] [datetime] NULL,
	[arrival_uz_document_date_pr] [datetime] NULL,
	[arrival_uz_document_date_vid] [datetime] NULL,
	[arrival_uz_document_code_payer_local] [nvarchar](20) NULL,
	[arrival_uz_document_payer_local_name_ru] [nvarchar](100) NULL,
	[arrival_uz_document_payer_local_name_en] [nvarchar](100) NULL,
	[arrival_uz_document_tariff_contract] [money] NULL,
	[arrival_uz_document_calc_payer] [datetime] NULL,
	[arrival_uz_document_calc_payer_user] [nvarchar](50) NULL,
	[arrival_uz_document_pay_summa] [bigint] NULL,
	[arrival_uz_document_create] [datetime] NULL,
	[arrival_uz_document_create_user] [nvarchar](50) NULL,
	[arrival_uz_document_change] [datetime] NULL,
	[arrival_uz_document_change_user] [nvarchar](50) NULL,
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
	[sap_incoming_supply_ban] [nvarchar](4) NULL
	)
	AS
	BEGIN
	insert @vagons
  SELECT 
  		-->================================= �������� =====================================
		--> �������� ������� [IDS].[ArrivalCars]  		 
		 arr_car.[id] as arrival_car_id
		,arr_car.[num]
		,arr_car.[position_arrival] as arrival_car_position_arrival
		--,arr_car.[id_arrival]
		,arr_car.[position] as arrival_car_position
		,arr_car.[consignee] as arrival_car_consignee
		,arr_car.[num_doc] as arrival_car_num_doc
		,arr_car.[id_transfer] as arrival_car_id_transfer					-- ������� ����� ��������� ������� (������ id ������� ������ �������)
		,arr_car.[note] as arrival_car_note
		,arr_car.[date_adoption_act] as arrival_car_date_adoption_act
		,arr_car.[arrival] as arrival_car_arrival
		,arr_car.[arrival_user] as arrival_car_arrival_user
		,arr_car.[create] as arrival_car_create
		,arr_car.[create_user] as arrival_car_create_user
		,arr_car.[change] as arrival_car_change
		,arr_car.[change_user] as arrival_car_change_user
  		-->======================================================================================================
		--> �������� ������� [IDS].[ArrivalSostav]
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
		--> �������� �� ����� �� �������� [IDS].[Arrival_UZ_Vagon] 
		,arr_doc_vag.[id] as arrival_uz_vagon_id
		-- ��������
		,arr_doc_vag.[id_owner] as arrival_uz_vagon_id_owner
		,dir_owner.[owner_ru] as arrival_uz_vagon_owner_wagon_ru					-- �������� [IDS].[Directory_OwnersWagons] �� ����������� [IDS].[Directory_Wagons]
		,dir_owner.[owner_en] as arrival_uz_vagon_owner_wagon_en					-- �������� [IDS].[Directory_OwnersWagons] �� ����������� [IDS].[Directory_Wagons]
		,dir_owner.[abbr_ru] as arrival_uz_vagon_owner_wagon_abbr_ru				-- �������� [IDS].[Directory_OwnersWagons] �� ����������� [IDS].[Directory_Wagons]
		,dir_owner.[abbr_en] as arrival_uz_vagon_owner_wagon_abbr_en				-- �������� [IDS].[Directory_OwnersWagons] �� ����������� [IDS].[Directory_Wagons]
		-- ������� 16.04.2022	
		,arr_doc_vag.id_type_ownership as arrival_uz_vagon_id_type_ownership
		,dir_type_os.[type_ownership_ru] as arrival_uz_vagon_type_ownership_ru		-- ��� �������� ��� ���� [IDS].[Directory_TypeOwnerShip] �� ����������� [IDS].[Directory_Wagons]
		,dir_type_os.[type_ownership_en] as arrival_uz_vagon_type_ownership_en      -- ��� �������� ��� ���� [IDS].[Directory_TypeOwnerShip] �� ����������� [IDS].[Directory_Wagons]
		-- �������������
		,arr_doc_vag.[id_countrys] as arrival_uz_vagon_id_countrys
		,wag_dir_countrys.code_sng as arrival_uz_vagon_wagon_adm				-- ��� ������������� [IDS].[Directory_Countrys] �� ����������� [IDS].[Directory_Wagons]
		,wag_dir_countrys.countrys_name_ru as arrival_uz_vagon_wagon_adm_name_ru		-- ������������� [IDS].[Directory_Countrys] �� ����������� [IDS].[Directory_Wagons]
		,wag_dir_countrys.countrys_name_en as arrival_uz_vagon_wagon_adm_name_en		-- ������������� [IDS].[Directory_Countrys] �� ����������� [IDS].[Directory_Wagons]
		,wag_dir_countrys.country_abbr_ru as arrival_uz_vagon_wagon_adm_abbr_ru		-- ������������� [IDS].[Directory_Countrys] �� ����������� [IDS].[Directory_Wagons]
		,wag_dir_countrys.country_abbr_en as arrival_uz_vagon_wagon_adm_abbr_en		-- ������������� [IDS].[Directory_Countrys] �� ����������� [IDS].[Directory_Wagons]
		--> ��� ������ �� �������� [IDS].[Directory_GenusWagons]
		,arr_doc_vag.[id_genus]	 as arrival_uz_vagon_id_genus							-- id ������ ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.rod_uz as arrival_uz_vagon_rod									-- ��� ���� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_ru as arrival_uz_vagon_rod_name_ru							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_en as arrival_uz_vagon_rod_name_en							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_ru as arrival_uz_vagon_rod_abbr_ru							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_en as arrival_uz_vagon_rod_abbr_en							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_doc_vag.[kol_os] as arrival_uz_vagon_wagon_kol_os
		,arr_doc_vag.[usl_tip] as arrival_uz_vagon_wagon_usl_tip
		,arr_doc_vag.[date_rem_uz] as arrival_uz_vagon_wagon_date_rem_uz
		,arr_doc_vag.[date_rem_vag] as arrival_uz_vagon_wagon_date_rem_vag
		--,arr_doc_vag.[id_car] as arrival_uz_vagon_
		--> �������� �� �������� [IDS].[Directory_ConditionArrival]
		,arr_doc_vag.[id_condition] as arrival_uz_vagon_id_condition
		,arr_dir_cond.condition_name_ru as arrival_uz_vagon_condition_name_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_name_en as arrival_uz_vagon_condition_name_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_ru as arrival_uz_vagon_condition_abbr_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_en as arrival_uz_vagon_condition_abbr_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.repairs as arrival_uz_vagon_condition_repairs						-- ���������� [IDS].[Directory_ConditionArrival] �� �������� ������� ������ [IDS].[Arrival_UZ_Vagon]
		--> ������ �� �������� [IDS].[Directory_WagonsRent]
		,arr_wag_rent.[id] as arrival_uz_vagon_id_wagons_rent_arrival							-- id ������ ������ [IDS].[Directory_WagonsRent] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> �������� �� �������� [IDS].[Directory_OperatorsWagons]
		,arr_wag_rent.[id_operator] as arrival_uz_vagon_arrival_wagons_rent_id_operator			-- id ������ �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[operators_ru] as arrival_uz_vagon_arrival_wagons_rent_operators_ru	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[operators_en] as arrival_uz_vagon_arrival_wagons_rent_operators_en	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[abbr_ru] as arrival_uz_vagon_arrival_wagons_rent_operator_abbr_ru		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[abbr_en] as arrival_uz_vagon_arrival_wagons_rent_operator_abbr_en		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_wag_rent.[rent_start] as arrival_uz_vagon_arrival_wagons_rent_start					-- ������ ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_wag_rent.[rent_end] as arrival_uz_vagon_arrival_wagons_rent_end						-- ����� ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[paid] as arrival_uz_vagon_arrival_wagons_rent_operator_paid			-- ������� ��������� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[color] as arrival_uz_vagon_arrival_wagons_rent_operator_color			-- ���� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> ����������� �� �������� [IDS].[Directory_LimitingLoading]
		,arr_wag_rent.[id_limiting] as arrival_uz_vagon_arrival_wagons_rent_id_limiting			-- id ������ ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_limload.[limiting_name_ru] as arrival_uz_vagon_arrival_wagons_rent_limiting_name_ru	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_limload.[limiting_name_en] as arrival_uz_vagon_arrival_wagons_rent_limiting_name_en	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_limload.[limiting_abbr_ru] as arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_ru	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_limload.[limiting_abbr_en] as arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_en	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> IDS.Directory_TypeWagons
		,arr_doc_vag.[id_type] as arrival_uz_vagon_id_type
		,dir_type.type_ru as arrival_uz_vagon_type_ru
		,dir_type.type_en as arrival_uz_vagon_type_en
		,arr_doc_vag.[gruzp] as arrival_uz_vagon_gruzp
		,arr_doc_vag.[u_tara] as arrival_uz_vagon_u_tara
		,arr_doc_vag.[ves_tary_arc] as arrival_uz_vagon_ves_tary_arc
		-- ������� 16.04.2022
		,arr_doc_vag.[gruzp_uz] as arrival_uz_vagon_gruzp_uz
		,arr_doc_vag.[tara_uz] as arrival_uz_vagon_tara_uz
		,arr_doc_vag.[route] as arrival_uz_vagon_route
		,arr_doc_vag.[note_vagon] as arrival_uz_vagon_note_vagon
		--> IDS.Directory_Cargo
		,arr_doc_vag.[id_cargo] as arrival_uz_vagon_id_cargo
		,arr_dir_cargo.cargo_name_ru as arrival_uz_vagon_cargo_name_ru
		,arr_dir_cargo.cargo_name_en as arrival_uz_vagon_cargo_name_en
		--> ���������� ������ ����� [IDS].[Directory_CargoGroup]	
		,arr_dir_cargo.[id_group] as arrival_uz_vagon_id_group								-- id ������ ����� [IDS].[Directory_CargoGroup] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_ru as arrival_uz_vagon_cargo_group_name_ru	-- ������ ������ [IDS].[Directory_CargoGroup] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_en as arrival_uz_vagon_cargo_group_name_en	-- ������ ������ [IDS].[Directory_CargoGroup] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> ���������� ����� ����� [IDS].[Directory_CargoETSNG]
		,arr_dir_cargo.[id_cargo_etsng] as arrival_uz_vagon_id_cargo_etsng					-- id ����� ����� [IDS].[Directory_CargoETSNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_etsng.[code] as arrival_uz_vagon_cargo_etsng_code						-- ��� ����� ����� [IDS].[Directory_CargoETSNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_etsng.[cargo_etsng_name_ru] as arrival_uz_vagon_cargo_etsng_name_ru	-- ���� ����� [IDS].[Directory_CargoETSNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_etsng.[cargo_etsng_name_en] as arrival_uz_vagon_cargo_etsng_name_en	-- ���� ����� [IDS].[Directory_CargoETSNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> [IDS].[Directory_CargoGNG]
		,arr_doc_vag.[id_cargo_gng] as arrival_uz_vagon_id_cargo_gng
		,arr_dir_cargo_gng.[code] as arrival_uz_vagon_cargo_gng_code							-- ��� ����� ��� [IDS].[Directory_CargoGNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_gng.[cargo_gng_name_ru] as arrival_uz_vagon_cargo_gng_name_ru			-- ���� ��� [IDS].[Directory_CargoGNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_gng.[cargo_gng_name_en] as arrival_uz_vagon_cargo_gng_name_en			-- ���� ��� [IDS].[Directory_CargoGNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> IDS.Directory_CertificationData
		,arr_doc_vag.[id_certification_data] as arrival_uz_vagon_id_certification_data
		,arr_dir_certif.[certification_data_ru] as arrival_uz_vagon_sertification_data_ru
		,arr_dir_certif.[certification_data_en] as arrival_uz_vagon_sertification_data_en
		--> [IDS].[Directory_CommercialCondition]
		,arr_doc_vag.[id_commercial_condition] as arrival_uz_vagon_id_commercial_condition
		,arr_comm_cond.[commercial_condition_ru] as arrival_uz_vagon_commercial_condition_ru
		,arr_comm_cond.[commercial_condition_en] as arrival_uz_vagon_commercial_condition_en
		--> ������� 25.04.2022
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
		,arr_dir_divis_amkr.[code] as arrival_uz_vagon_division_code					-- ��� ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_ru] as arrival_uz_vagon_name_division_ru		-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_en] as arrival_uz_vagon_name_division_en		-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_ru] as arrival_uz_vagon_division_abbr_ru		-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_en] as arrival_uz_vagon_division_abbr_en		-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[id_type_devision] as arrival_uz_vagon_id_type_devision		-- id ���� ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_doc_vag.[empty_car] as arrival_uz_vagon_empty_car
		,arr_doc_vag.[kol_conductor] as arrival_uz_vagon_kol_conductor
		,arr_doc_vag.[manual] as arrival_uz_vagon_manual
		,arr_doc_vag.[pay_summa] as arrival_uz_vagon_pay_summa
		,arrival_uz_vagon_summa_001 = (SELECT sum([summa]) FROM [IDS].[Arrival_UZ_Vagon_Pay] where [id_vagon] = arr_doc_vag.[id] and [kod]='001')
		--> ���� �������������� �����
		,arr_doc_vag.[id_act_services1] as arrival_uz_vagon_id_act_services1
		,arr_doc_vag.[id_act_services2] as arrival_uz_vagon_id_act_services2
		,arr_doc_vag.[id_act_services3] as arrival_uz_vagon_id_act_services3
		,arr_doc_vag.[num_act_services1] as arrival_uz_vagon_num_act_services1
		,arr_doc_vag.[num_act_services2] as arrival_uz_vagon_num_act_services2
		,arr_doc_vag.[num_act_services3] as arrival_uz_vagon_num_act_services3
		--> �������� � ������
		,arr_doc_vag.[create] as arrival_uz_vagon_create
		,arr_doc_vag.[create_user] as arrival_uz_vagon_create_user
		,arr_doc_vag.[change] as arrival_uz_vagon_change
		,arr_doc_vag.[change_user] as arrival_uz_vagon_change_user
		-->======================================================================================================
		--> �������� �� ������ �� �������� [IDS].[Arrival_UZ_Document]
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
		,arr_doc_uz.[date_otpr] as arrival_uz_document_date_otpr
		,arr_doc_uz.[srok_end] as arrival_uz_document_srok_end
		,arr_doc_uz.[date_grpol] as arrival_uz_document_date_grpol
		,arr_doc_uz.[date_pr] as arrival_uz_document_date_pr
		,arr_doc_uz.[date_vid] as arrival_uz_document_date_vid
		--> ���������� �� ��������
		--> [IDS].[Directory_PayerArrival]
		,arr_doc_uz.[code_payer_local]  as arrival_uz_document_code_payer_local
		,arr_payer_loc.[payer_name_ru] as arrival_uz_document_payer_local_name_ru
		,arr_payer_loc.[payer_name_en] as arrival_uz_document_payer_local_name_en
		,arr_doc_uz.[tariff_contract] as arrival_uz_document_tariff_contract
		,arr_doc_uz.[calc_payer] as arrival_uz_document_calc_payer
		,arr_doc_uz.[calc_payer_user] as arrival_uz_document_calc_payer_user
		-->
		,arrival_uz_document_pay_summa = (SELECT sum([summa]) FROM [IDS].[Arrival_UZ_Document_Pay] where [id_document] = arr_doc_uz.[id] and [kod]='001')
		-->
		,arr_doc_uz.[create] as arrival_uz_document_create
		,arr_doc_uz.[create_user] as arrival_uz_document_create_user
		,arr_doc_uz.[change] as arrival_uz_document_change
		,arr_doc_uz.[change_user] as arrival_uz_document_change_user
		-->======================================================================================================
		--> �������� �������� [IDS].[SAPIncomingSupply]
		,sap_is.[VBELN] as sap_incoming_supply_num
		,sap_is.[NUM_VBELN] as sap_incoming_supply_pos
		,sap_is.[ERDAT] as sap_incoming_supply_date
		,sap_is.[ETIME] as sap_incoming_supply_time
		,sap_is.[LGORT] as sap_incoming_supply_warehouse_code			-- �����������
		,sap_is.[LGOBE] as sap_incoming_supply_warehouse_name
		,sap_is.[LGORT_10] as sap_incoming_supply_warehouse_code_10		-- ������������� (����������� 10��)
		,sap_is.[LGOBE_10] as sap_incoming_supply_warehouse_name_10
		,sap_is.[MATNR] as sap_incoming_supply_cargo_code				-- ��������
		,sap_is.[MAKTX] as sap_incoming_supply_cargo_name
		,sap_is.[WERKS] as sap_incoming_supply_works
		,sap_is.[NAME_SH] as sap_incoming_supply_ship					--�����:
		,sap_is.[KOD_R_10] as sap_incoming_supply_ban					-- ������ ����.
		--into arrival_uz_vagon_verif
  FROM  [IDS].[Arrival_UZ_Vagon] as arr_doc_vag
	--> ��������� �� ������ ������� (������) �� �������� ��� ��� �� ����
	Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
	--> �������� ������
	Left JOIN IDS.ArrivalCars as arr_car ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
 	Left JOIN IDS.ArrivalSostav as arr_sost ON arr_sost.id = arr_car.id_arrival 
	Left JOIN [IDS].[SAPIncomingSupply] as sap_is ON sap_is.id = (SELECT top(1) [id] FROM [IDS].[SAPIncomingSupply] where [id_arrival_car]=arr_car.id)
  	--> ���������� ������� ���� (������� ������ �� ����)
	Left JOIN IDS.Directory_Station as arr_dir_station_from ON arr_sost.[id_station_from] =  arr_dir_station_from.id
	--> ���������� ������� ���� (������� ������ �� ����)
	Left JOIN IDS.Directory_Station as arr_dir_station_on ON arr_sost.id_station_on =  arr_dir_station_on.id
	--> ���������� ������� ���� (������� �������� �� ����)
	Left JOIN IDS.Directory_Station as arr_dir_station_amkr ON arr_doc_vag.[id_station_on_amkr] =  arr_dir_station_amkr.id
	--> ���������� ���� ���� (���� �������� �� ����)
	Left JOIN [IDS].[Directory_Ways] as arr_dir_way_on ON arr_sost.[id_way] =  arr_dir_way_on.id
	--> ���������� ������������� ���� (�� ��������)
	Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis_amkr ON arr_doc_vag.[id_division_on_amkr] = arr_dir_divis_amkr.id
	--> ���������� ����������� ������ �� �� �� ��������
	Left JOIN [IDS].[Directory_OwnersWagons] as dir_owner ON arr_doc_vag.[id_owner] = dir_owner.id
	--> ���������� ��� �������� �������
	Left JOIN IDS.[Directory_TypeOwnerShip] as dir_type_os ON arr_doc_vag.id_type_ownership =  dir_type_os.id
	--> ���������� ������ (������������� ������ �� ��������)
	Left JOIN IDS.Directory_Countrys as wag_dir_countrys ON arr_doc_vag.[id_countrys] = wag_dir_countrys.id
	--> ���������� ��� ������
	Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
	--> ���������� ��� ������ �� ��������
	Left JOIN IDS.Directory_GenusWagons as dir_rod ON arr_doc_vag.[id_genus] = dir_rod.id
	--> ���������� �������� �� ��������
	Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
	Left JOIN [IDS].[Directory_WagonsRent] as arr_wag_rent ON arr_wag_rent.id = arr_doc_vag.id_wagons_rent_arrival
	--> ���������� �������� ������ �� ��������
	Left JOIN IDS.Directory_OperatorsWagons as arr_dir_operator ON arr_wag_rent.id_operator =  arr_dir_operator.id
	--> ���������� ����������� �������� �� ��������
	Left JOIN IDS.Directory_LimitingLoading as arr_dir_limload ON arr_wag_rent.id_limiting =  arr_dir_limload.id
	--> ���������� ������ �� ��������
	Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
	--> ���������� ������ ������ �� ��������
	Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
	--> ���������� ������ ����� �� ��������
	Left JOIN [IDS].[Directory_CargoETSNG] as arr_dir_cargo_etsng ON arr_dir_cargo.id_cargo_etsng = arr_dir_cargo_etsng.id
	--> ���������� ������ ��� �� ��������
	Left JOIN [IDS].[Directory_CargoGNG] as arr_dir_cargo_gng ON arr_doc_vag.id_cargo_gng = arr_dir_cargo_gng.id
	--> ���������� ���������� ������
	Left JOIN IDS.Directory_CertificationData as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
	--> ���������� ����������� ���������
	Left JOIN [IDS].[Directory_CommercialCondition] as arr_comm_cond ON arr_doc_vag.[id_commercial_condition] = arr_comm_cond.id
	--> ���������� ������� ������� (�� �������� from)
	Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON arr_doc_uz.[code_stn_from] = arr_ext_station_from.code
	--> ���������� ������� ������� (�� �������� to)
	Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_to ON arr_doc_uz.[code_stn_to] = arr_ext_station_to.code
	--> ���������� �������� ����� (�� �������� from)
	Left JOIN [IDS].[Directory_InlandRailway] as arr_ir_from ON arr_ext_station_from.[code_inlandrailway] = arr_ir_from.code
	--> ���������� �������� ����� (�� �������� from)
	Left JOIN [IDS].[Directory_InlandRailway] as arr_ir_to ON arr_ext_station_to.[code_inlandrailway] = arr_ir_to.code
	--> ���������� ������ ��������� (�� ��������)
	Left JOIN [IDS].[Directory_BorderCheckpoint] as arr_border_checkpoint ON arr_doc_uz.[code_border_checkpoint] = arr_border_checkpoint.[code]
	--> ���������� ���������������� (�� ��������)
	Left JOIN [IDS].[Directory_Consignee] arr_consignee ON arr_doc_uz.[code_consignee] = arr_consignee.code		
	--> ���������� ���������������� (�� ��������)
	Left JOIN [IDS].[Directory_Shipper] as arr_shipper ON arr_doc_uz.[code_shipper] = arr_shipper.code
	--> ���������� ���������� �� �������� (�� ��������)
	Left JOIN [IDS].[Directory_PayerSender] as arr_payer_send ON arr_doc_uz.[code_payer_sender] = arr_payer_send.[code]
	--> ���������� ���������� �� �������� (�� ��������)
	Left JOIN [IDS].[Directory_PayerArrival] as arr_payer_arr ON arr_doc_uz.[code_payer_arrival] = arr_payer_arr.[code]
	--> ���������� ���������� �� �������� (�� ���� ������)
	Left JOIN [IDS].[Directory_PayerArrival] as arr_payer_loc ON arr_doc_uz.[code_payer_local] = arr_payer_loc.[code]
  where arr_doc_vag.id in (select [id_arrival_uz_vagon] FROM  [IDS].[ArrivalCars] as arr_car where arr_car.[id_arrival] in (select id FROM [IDS].[ArrivalSostav] as arr_sost where arr_sost.date_adoption >= @start and arr_sost.date_adoption <= @stop))
  RETURN
 END
 




GO


