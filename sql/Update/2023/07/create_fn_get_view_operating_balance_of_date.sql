USE [KRR-PA-CNT-Railway]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_view_operating_balance_of_date]
 (
   @date datetime
 )
	RETURNS 
	@operating_balance TABLE(
		[id] [bigint] NULL,
		[num] [int] NULL,
		[arrival_car_id] [bigint] NULL,
		[arrival_sostav_id] [bigint] NULL,
		[arrival_uz_vagon_id] [bigint] NULL,
		[arrival_uz_document_id] [bigint] NULL,
		[cur_wio_id] [bigint] NULL,
		[cur_wim_id] [bigint] NOT NULL,
		[outgoing_car_id] [bigint] NULL,
		[outgoing_sostav_id] [bigint] NULL,
		[arrival_uz_document_nom_main_doc] [int] NULL,
		[arrival_uz_document_nom_doc] [int] NULL,
		[arrival_uz_vagon_arrival_wagons_rent_id_operator] [int] NULL,
		[arrival_uz_vagon_arrival_wagons_rent_operators_ru] [nvarchar](100) NULL,
		[arrival_uz_vagon_arrival_wagons_rent_operators_en] [nvarchar](100) NULL,
		[arrival_uz_vagon_arrival_wagons_rent_operator_abbr_ru] [nvarchar](20) NULL,
		[arrival_uz_vagon_arrival_wagons_rent_operator_abbr_en] [nvarchar](20) NULL,
		[arrival_uz_vagon_arrival_wagons_rent_start] [datetime] NULL,
		[arrival_uz_vagon_arrival_wagons_rent_end] [datetime] NULL,
		[arrival_uz_vagon_arrival_wagons_rent_operator_paid] [bit] NULL,
		[arrival_uz_vagon_arrival_wagons_rent_operator_color] [nvarchar](10) NULL,
		[arrival_uz_vagon_id_condition] [int] NULL,
		[arrival_uz_vagon_condition_name_ru] [nvarchar](100) NULL,
		[arrival_uz_vagon_condition_name_en] [nvarchar](100) NULL,
		[arrival_uz_vagon_condition_abbr_ru] [nvarchar](20) NULL,
		[arrival_uz_vagon_condition_abbr_en] [nvarchar](20) NULL,
		[arrival_uz_vagon_condition_repairs] [bit] NULL,
		[current_id_condition] [int] NULL,
		[current_condition_name_ru] [nvarchar](100) NULL,
		[current_condition_name_en] [nvarchar](100) NULL,
		[current_condition_abbr_ru] [nvarchar](20) NULL,
		[current_condition_abbr_en] [nvarchar](20) NULL,
		[current_condition_repairs] [bit] NULL,
		[arrival_uz_vagon_id_genus] [int] NULL,
		[arrival_uz_vagon_rod] [int] NULL,
		[arrival_uz_vagon_rod_name_ru] [nvarchar](50) NULL,
		[arrival_uz_vagon_rod_name_en] [nvarchar](50) NULL,
		[arrival_uz_vagon_rod_abbr_ru] [nvarchar](5) NULL,
		[arrival_uz_vagon_rod_abbr_en] [nvarchar](5) NULL,
		[arrival_uz_vagon_id_type] [int] NULL,
		[arrival_uz_vagon_type_ru] [nvarchar](50) NULL,
		[arrival_uz_vagon_type_en] [nvarchar](50) NULL,
		[arrival_uz_vagon_gruzp] [float] NULL,
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
		[arrival_uz_document_code_stn_from] [int] NULL,
		[arrival_uz_document_station_from_name_ru] [nvarchar](50) NULL,
		[arrival_uz_document_station_from_name_en] [nvarchar](50) NULL,
		[arrival_uz_document_from_code_inlandrailway] [int] NULL,
		[arrival_uz_document_from_inlandrailway_name_ru] [nvarchar](150) NULL,
		[arrival_uz_document_from_inlandrailway_name_en] [nvarchar](150) NULL,
		[arrival_uz_document_from_inlandrailway_abbr_ru] [nvarchar](20) NULL,
		[arrival_uz_document_from_inlandrailway_abbr_en] [nvarchar](20) NULL,
		[arrival_uz_document_from_code_railway] [int] NULL,
		[arrival_uz_vagon_id_division_on_amkr] [int] NULL,
		[arrival_uz_vagon_division_code] [nvarchar](5) NULL,
		[arrival_uz_vagon_name_division_ru] [nvarchar](250) NULL,
		[arrival_uz_vagon_name_division_en] [nvarchar](250) NULL,
		[arrival_uz_vagon_division_abbr_ru] [nvarchar](50) NULL,
		[arrival_uz_vagon_division_abbr_en] [nvarchar](50) NULL,
		[arrival_uz_vagon_id_type_devision] [int] NULL,
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
		[sap_outgoing_supply_payer_name] [nvarchar](50) NULL,
		[current_id_station_amkr] [int] NOT NULL,
		[current_station_amkr_name_ru] [nvarchar](50) NULL,
		[current_station_amkr_name_en] [nvarchar](50) NULL,
		[current_station_amkr_abbr_ru] [nvarchar](50) NULL,
		[current_station_amkr_abbr_en] [nvarchar](50) NULL,
		[current_id_way] [int] NOT NULL,
		[current_id_park] [int] NULL,
		[current_way_num_ru] [nvarchar](20) NULL,
		[current_way_num_en] [nvarchar](20) NULL,
		[current_way_name_ru] [nvarchar](100) NULL,
		[current_way_name_en] [nvarchar](100) NULL,
		[current_way_abbr_ru] [nvarchar](50) NULL,
		[current_way_abbr_en] [nvarchar](50) NULL,
		[current_way_start] [datetime] NOT NULL,
		[current_way_end] [datetime] NULL,
		[current_wim_note] [nvarchar](250) NULL,
		[current_id_outer_way] [int] NULL,
		[current_outer_way_name_ru] [nvarchar](150) NULL,
		[current_outer_way_name_en] [nvarchar](150) NULL,
		[current_outer_way_start] [datetime] NULL,
		[current_outer_way_end] [datetime] NULL,
		[arrival_sostav_date_arrival] [datetime] NULL,
		[arrival_sostav_date_adoption] [datetime] NULL,
		[arrival_sostav_date_adoption_act] [datetime] NULL,
		[instructional_letters_num] [nvarchar](20) NULL,
		[instructional_letters_datetime] [datetime] NULL,
		[instructional_letters_station_code] [int] NULL,
		[instructional_letters_station_name] [nvarchar](50) NULL,
		[instructional_letters_note] [nvarchar](500) NULL
	)
	AS
	BEGIN
	insert @operating_balance
	select 
		 wir.id
		 --,out_sost.[date_outgoing]
		,wir.num
		,arr_car.[id] as arrival_car_id
		,arr_sost.[id] as arrival_sostav_id
		,arr_doc_vag.[id] as arrival_uz_vagon_id
		,arr_doc_uz.[id]  as arrival_uz_document_id
		,wio.id as cur_wio_id
		,wim.id as cur_wim_id
		,out_car.id as outgoing_car_id
		,out_sost.id as outgoing_sostav_id
		,arr_doc_uz.[nom_main_doc] as arrival_uz_document_nom_main_doc
		,arr_doc_uz.[nom_doc]   as arrival_uz_document_nom_doc
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
		--> �������� �� �������� [IDS].[Directory_ConditionArrival]
		,arr_doc_vag.[id_condition] as arrival_uz_vagon_id_condition
		,arr_dir_cond.condition_name_ru as arrival_uz_vagon_condition_name_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_name_en as arrival_uz_vagon_condition_name_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_ru as arrival_uz_vagon_condition_abbr_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_en as arrival_uz_vagon_condition_abbr_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.repairs as arrival_uz_vagon_condition_repairs						-- ���������� [IDS].[Directory_ConditionArrival] �� �������� ������� ������ [IDS].[Arrival_UZ_Vagon]
		--> �������� ������� [IDS].[Directory_ConditionArrival]
		,wio.[id_condition] as current_id_condition
		,cur_dir_cond.condition_name_ru as current_condition_name_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,cur_dir_cond.condition_name_en as current_condition_name_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,cur_dir_cond.condition_abbr_ru as current_condition_abbr_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,cur_dir_cond.condition_abbr_en as current_condition_abbr_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,cur_dir_cond.repairs as current_condition_repairs						-- ���������� [IDS].[Directory_ConditionArrival] �� �������� ������� ������ [IDS].[Arrival_UZ_Vagon]
		--> ��� ������ �� �������� [IDS].[Directory_GenusWagons]
		,arr_doc_vag.[id_genus]	 as arrival_uz_vagon_id_genus							-- id ������ ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.rod_uz as arrival_uz_vagon_rod											-- ��� ���� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_ru as arrival_uz_vagon_rod_name_ru								-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_en as arrival_uz_vagon_rod_name_en								-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_ru as arrival_uz_vagon_rod_abbr_ru								-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_en as arrival_uz_vagon_rod_abbr_en								-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> ��� ������
		,arr_doc_vag.[id_type] as arrival_uz_vagon_id_type
		,dir_type.type_ru as arrival_uz_vagon_type_ru
		,dir_type.type_en as arrival_uz_vagon_type_en
		,arr_doc_vag.[gruzp] as arrival_uz_vagon_gruzp
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
		--> [IDS].[Directory_Divisions] 
		,arr_doc_vag.[id_division_on_amkr] as arrival_uz_vagon_id_division_on_amkr
		,arr_dir_divis_amkr.[code] as arrival_uz_vagon_division_code					-- ��� ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_ru] as arrival_uz_vagon_name_division_ru	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_en] as arrival_uz_vagon_name_division_en	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_ru] as arrival_uz_vagon_division_abbr_ru	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_en] as arrival_uz_vagon_division_abbr_en	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[id_type_devision] as arrival_uz_vagon_id_type_devision	-- id ���� ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--=============== ��������� �������� ==================
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
		--============================================================
		--> ����� ����������� ����� (���� ����, ������� ����������, ��� ����)
		--============================================================
		--=============== ������� ������� ==================
		,wim.id_station as current_id_station_amkr
		,cur_dir_station_amkr.station_name_ru as current_station_amkr_name_ru
		,cur_dir_station_amkr.station_name_en as current_station_amkr_name_en
		,cur_dir_station_amkr.station_abbr_ru as current_station_amkr_abbr_ru
		,cur_dir_station_amkr.station_abbr_en as current_station_amkr_abbr_en
		--=============== ������� ���� ==================
		,wim.[id_way] as current_id_way
		,cur_dir_way.[id_park] as current_id_park
		,cur_dir_way.[way_num_ru] as current_way_num_ru
		,cur_dir_way.[way_num_en] as current_way_num_en
		,cur_dir_way.[way_name_ru] as current_way_name_ru
		,cur_dir_way.[way_name_en] as current_way_name_en
		,cur_dir_way.[way_abbr_ru] as current_way_abbr_ru
		,cur_dir_way.[way_abbr_en] as current_way_abbr_en
		,wim.[way_start] as current_way_start
		,wim.[way_end] as current_way_end
		,wim.note as current_wim_note
		--=============== ������� ==================
		,wim.[id_outer_way] as current_id_outer_way
		,outer_ways.[name_outer_way_ru] as current_outer_way_name_ru
		,outer_ways.[name_outer_way_en] as current_outer_way_name_en
		,wim.[outer_way_start] as current_outer_way_start
		,wim.[outer_way_end] as current_outer_way_end
		--============================================================
		--> ����� ����������� ����� (�������� � ���., ��������� ���.)
		--============================================================
		,arr_sost.[date_arrival] as arrival_sostav_date_arrival
		,arr_sost.[date_adoption] as arrival_sostav_date_adoption
		,arr_sost.[date_adoption_act] as arrival_sostav_date_adoption_act
		--============================================================
		--> ������� ��
		--============================================================
		--> ������������� ������
		,il.num as instructional_letters_num
		,il.dt as instructional_letters_datetime
		,il.destination_station as instructional_letters_station_code
		,let_station_uz.station as instructional_letters_station_name
		,il.[note] as instructional_letters_note
		--into operating_balance
	FROM IDS.WagonInternalMovement as wim
		--> ��������� �����������
		Left JOIN [IDS].[WagonInternalRoutes] as wir ON wir.id = wim.id_wagon_internal_routes
		Left JOIN [IDS].[WagonInternalOperation] as wio ON wio.id = (select top(1) [id] FROM [IDS].[WagonInternalOperation] WHERE [id_wagon_internal_routes] = wir.id)
	  	--==== �������� � ����� ������ =====================================================================
		--> �������� ������
		Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
		--> �������� �������
		Left JOIN IDS.ArrivalSostav as arr_sost ON arr_car.id_arrival = arr_sost.id
		--> ��������� �� ����� �� �������� ������ �� ����
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		 --> ��������� �� ������ ������� (������) �� �������� ������ �� ����
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
		--> ��������� SAP ��������� ��������
		Left JOIN [IDS].[SAPOutgoingSupply] as sap_os ON wir.id_sap_outbound_supply = sap_os.id
	  	--==== �������� ������ =====================================================================
		--> �������� ������
		Left JOIN IDS.OutgoingCars as out_car ON wir.id_outgoing_car = out_car.id
		--> �������� �������
		Left JOIN IDS.OutgoingSostav as out_sost ON out_car.id_outgoing = out_sost.id
		--==== ������������� ������ =====================================================================
		--> �������� ������� �� ������
		Left JOIN IDS.InstructionalLettersWagon as ilw  ON ilw.id = (SELECT TOP (1) [id] FROM [IDS].[InstructionalLettersWagon] where [num] =wir.num and [close] is null order by id desc)
		--> �������� �����
		Left JOIN IDS.InstructionalLetters as il ON ilw.id_instructional_letters = il.id
		--==== ����������� ===================================================================================
		--> ���������� �����
		--Left JOIN [IDS].[Directory_WagonsRent] as arr_wag_rent ON arr_wag_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = arr_car.num and ((arr_sost.[date_adoption] is null and convert(datetime, convert(varchar(15), [rent_start], 102)) <=arr_sost.[date_arrival]) OR (arr_sost.[date_adoption] is not null and convert(datetime, convert(varchar(15), [rent_start], 102)) <=arr_sost.[date_adoption])) order by [id] desc)	
		Left JOIN [IDS].[Directory_WagonsRent] as arr_wag_rent ON arr_wag_rent.id = arr_doc_vag.id_wagons_rent_arrival
		--> ���������� �������� ������ �� ��������
		Left JOIN IDS.Directory_OperatorsWagons as arr_dir_operator ON arr_wag_rent.id_operator =  arr_dir_operator.id
		--> ���������� �������� �� ��������
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> ���������� ������� ��������
		Left JOIN IDS.Directory_ConditionArrival as cur_dir_cond ON wio.id_condition = cur_dir_cond.id
		--> ���������� ��� ������ �� ��������
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON arr_doc_vag.[id_genus] = dir_rod.id
		--> ���������� ��� ������
		Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
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
		--> ���������� �������� ����� (�� �������� from)
		Left JOIN [IDS].[Directory_InlandRailway] as arr_ir_from ON arr_ext_station_from.[code_inlandrailway] = arr_ir_from.code
		--> ���������� ������������� ���� (�� ��������)
		Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis_amkr ON arr_doc_vag.[id_division_on_amkr] = arr_dir_divis_amkr.id
		--> ���������� ������� ���� (������� ������� ����)
		Left JOIN IDS.Directory_Station as cur_dir_station_amkr ON wim.id_station =  cur_dir_station_amkr.id
		--> ���������� ������� ����
	    Left JOIN [IDS].[Directory_Ways] as cur_dir_way ON wim.[id_way] = cur_dir_way.id
		--> ���������� ������� ���� ��������
		Left JOIN IDS.Directory_OuterWays as outer_ways ON wim.id_outer_way = outer_ways.id 
		--> ���������� ������� ������� ��
		Left JOIN UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs
		--> ��������� ������ ����������		
		Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_owg ON arr_wag_rent.id_operator = dir_owg.[id_operator]

	WHERE
	-- �������� ������
		wim.id_station <> 10 
		-- �������� ����������
		AND (dir_rod.rod_uz <> 90 or dir_rod.rod_uz is null) AND NOT arr_doc_uz.[klient] = 1 AND (NOT dir_owg.[group] in ('amkr_vz') OR dir_owg.[group] is null)
		AND 
		((wim.outer_way_start is null AND ((wim.[way_start]<=@date and wim.way_end>=@date) OR (wim.[way_start]<=@date and wim.way_end is null)))
		OR
		(wim.outer_way_start is not null AND ((wim.outer_way_start<=@date and wim.outer_way_end>=@date) OR (wim.outer_way_start<=@date and wim.outer_way_end is null))))
		AND 
		(out_sost.[date_outgoing] is null OR out_sost.[date_outgoing] > @date)
  RETURN
 END
 




GO


