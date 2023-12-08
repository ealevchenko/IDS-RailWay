USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_current_operation_wagon_of_num]    Script Date: 08.12.2023 13:44:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_current_operation_wagon_of_id_wir]
 (
	@id_wir bigint
 )
	RETURNS 
	@current_operation_wagon TABLE(
	[num] [int] NOT NULL,
	[id_wagons_rent] [int] NULL,
	[curr_wagons_rent_id_operator] [int] NULL,
	[curr_wagons_rent_operators_ru] [nvarchar](100) NULL,
	[curr_wagons_rent_operators_en] [nvarchar](100) NULL,
	[curr_wagons_rent_operator_abbr_ru] [nvarchar](20) NULL,
	[curr_wagons_rent_operator_abbr_en] [nvarchar](20) NULL,
	[curr_wagons_rent_start] [datetime] NULL,
	[curr_wagons_rent_end] [datetime] NULL,
	[curr_wagons_rent_operator_paid] [bit] NULL,
	[curr_wagons_rent_operator_color] [nvarchar](10) NULL,
	[curr_wagons_rent_id_limiting] [int] NULL,
	[curr_wagons_rent_limiting_name_ru] [nvarchar](100) NULL,
	[curr_wagons_rent_limiting_name_en] [nvarchar](100) NULL,
	[curr_wagons_rent_limiting_abbr_ru] [nvarchar](30) NULL,
	[curr_wagons_rent_limiting_abbr_en] [nvarchar](30) NULL,
	[wagon_id_countrys] [int] NOT NULL,
	[wagon_adm] [int] NULL,
	[wagon_adm_name_ru] [nvarchar](100) NULL,
	[wagon_adm_name_en] [nvarchar](100) NULL,
	[wagon_adm_abbr_ru] [nvarchar](10) NULL,
	[wagon_adm_abbr_en] [nvarchar](10) NULL,
	[wagon_id_genus] [int] NOT NULL,
	[wagon_rod] [int] NULL,
	[wagon_rod_name_ru] [nvarchar](50) NULL,
	[wagon_rod_name_en] [nvarchar](50) NULL,
	[wagon_rod_abbr_ru] [nvarchar](5) NULL,
	[wagon_rod_abbr_en] [nvarchar](5) NULL,
	[wagon_id_owner] [int] NOT NULL,
	[wagon_owner_wagon_ru] [nvarchar](100) NULL,
	[wagon_owner_wagon_en] [nvarchar](100) NULL,
	[wagon_owner_wagon_abbr_ru] [nvarchar](20) NULL,
	[wagon_owner_wagon_abbr_en] [nvarchar](20) NULL,
	[wagon_gruzp] [float] NOT NULL,
	[wagon_tara] [float] NULL,
	[wagon_kol_os] [int] NOT NULL,
	[wagon_usl_tip] [nvarchar](10) NULL,
	[wagon_date_rem_uz] [datetime] NULL,
	[cwagon_date_rem_vag] [datetime] NULL,
	[wagon_id_type_ownership] [int] NULL,
	[cwagon_sign] [int] NULL,
	[wagon_factory_number] [nvarchar](10) NULL,
	[wagon_inventory_number] [nvarchar](10) NULL,
	[wagon_year_built] [int] NULL,
	[wagon_exit_ban] [bit] NULL,
	[wagon_note] [nvarchar](1000) NOT NULL,
	[wagon_sobstv_kis] [int] NULL,
	[wagon_bit_warning] [bit] NULL,
	[wagon_create] [datetime] NOT NULL,
	[wagon_create_user] [nvarchar](50) NOT NULL,
	[wagon_change] [datetime] NULL,
	[wagon_change_user] [nvarchar](50) NULL,
	[wagon_closed_route] [bit] NULL,
	[wagon_new_construction] [nchar](200) NULL,
	[wir_id] [bigint] NULL,
	[wir_id_arrival_car] [bigint] NULL,
	[wir_id_outgoing_car] [bigint] NULL,
	[wir_note] [nvarchar](250) NULL,
	[wir_highlight_color] [nchar](10) NULL,
	[arrival_id_condition] [int] NULL,
	[arrival_condition_name_ru] [nvarchar](100) NULL,
	[arrival_condition_name_en] [nvarchar](100) NULL,
	[arrival_condition_abbr_ru] [nvarchar](20) NULL,
	[arrival_condition_abbr_en] [nvarchar](20) NULL,
	[arrival_condition_repairs] [bit] NULL,
	[current_id_condition] [int] NULL,
	[current_condition_name_ru] [nvarchar](100) NULL,
	[currentn_condition_name_en] [nvarchar](100) NULL,
	[current_condition_abbr_ru] [nvarchar](20) NULL,
	[current_condition_abbr_en] [nvarchar](20) NULL,
	[current_condition_repairs] [bit] NULL,
	[current_condition_create] [datetime] NULL,
	[current_condition_create_user] [nvarchar](50) NULL,
	[instructional_letters_num] [nvarchar](20) NULL,
	[instructional_letters_datetime] [datetime] NULL,
	[instructional_letters_station_code] [int] NULL,
	[instructional_letters_station_name] [nvarchar](50) NULL,
	[instructional_letters_note] [nvarchar](500) NULL,
	[cur_date_adoption] [datetime] NULL,
	[cur_date_adoption_act] [datetime] NULL,
	[cur_date_outgoing] [datetime] NULL,
	[cur_date_outgoing_act] [datetime] NULL,
	[last_date_outgoing] [datetime] NULL,
	[last_date_outgoing_act] [datetime] NULL
		)
	AS
	BEGIN
	insert @current_operation_wagon
	SELECT dir_wag.[num]
	,dir_rent.[id] as id_wagons_rent							-- id ������ ������ [IDS].[Directory_WagonsRent] �� �������� [IDS].[Outgoing_UZ_Vagon]
	--> �������� �� �������� [IDS].[Directory_OperatorsWagons]
	,dir_rent.[id_operator] as curr_wagons_rent_id_operator			-- id ������ �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_operator.[operators_ru] as curr_wagons_rent_operators_ru	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_operator.[operators_en] as curr_wagons_rent_operators_en	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_operator.[abbr_ru] as curr_wagons_rent_operator_abbr_ru		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_operator.[abbr_en] as curr_wagons_rent_operator_abbr_en		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,dir_rent.[rent_start] as curr_wagons_rent_start					-- ������ ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,dir_rent.[rent_end] as curr_wagons_rent_end						-- ����� ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_operator.[paid] as curr_wagons_rent_operator_paid			-- ������� ��������� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_operator.[color] as curr_wagons_rent_operator_color			-- ���� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	--> ����������� �� �������� [IDS].[Directory_LimitingLoading]
	,dir_rent.[id_limiting] as curr_wagons_rent_id_limiting			-- id ������ ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_limload.[limiting_name_ru] as curr_wagons_rent_limiting_name_ru	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_limload.[limiting_name_en] as curr_wagons_rent_limiting_name_en	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_limload.[limiting_abbr_ru] as curr_wagons_rent_limiting_abbr_ru	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_limload.[limiting_abbr_en] as curr_wagons_rent_limiting_abbr_en	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
	--> ������������� �� �������� [IDS].[Directory_Countrys]
	,dir_wag.[id_countrys] as wagon_id_countrys						-- id ������ ������������� [IDS].[Directory_Countrys] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_countrys.code_sng as wagon_adm						-- ��� ������������� [IDS].[Directory_Countrys] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_countrys.countrys_name_ru as wagon_adm_name_ru		-- ������������� [IDS].[Directory_Countrys] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_countrys.countrys_name_en as wagon_adm_name_en		-- ������������� [IDS].[Directory_Countrys] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_countrys.country_abbr_ru as wagon_adm_abbr_ru			-- ������������� [IDS].[Directory_Countrys] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_countrys.country_abbr_en as wagon_adm_abbr_en			-- ������������� [IDS].[Directory_Countrys] �� �������� [IDS].[Outgoing_UZ_Vagon]
	--> ��� ������ �� �������� [IDS].[Directory_GenusWagons]
	-- ������!
	,dir_wag.[id_genus]	 as wagon_id_genus								-- id ������ ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_rod.rod_uz as wagon_rod									-- ��� ���� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_rod.genus_ru as wagon_rod_name_ru							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_rod.genus_en as wagon_rod_name_en							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_rod.abbr_ru as wagon_rod_abbr_ru							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_rod.abbr_en as wagon_rod_abbr_en							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	--> ����������� �� �� [IDS].[Directory_OwnersWagons]
	,dir_wag.[id_owner] as wagon_id_owner								-- id ������ �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	--
	,curr_dir_owner.[owner_ru] as wagon_owner_wagon_ru					-- �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_owner.[owner_en] as wagon_owner_wagon_en					-- �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_owner.[abbr_ru] as wagon_owner_wagon_abbr_ru				-- �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,curr_dir_owner.[abbr_en] as wagon_owner_wagon_abbr_en				-- �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
     ,dir_wag.[gruzp] as wagon_gruzp
     ,dir_wag.[tara] as wagon_tara
     ,dir_wag.[kol_os] as wagon_kol_os
     ,dir_wag.[usl_tip] as wagon_usl_tip
     ,dir_wag.[date_rem_uz] as wagon_date_rem_uz
     ,dir_wag.[date_rem_vag] as cwagon_date_rem_vag
     ,dir_wag.[id_type_ownership] as wagon_id_type_ownership
     ,dir_wag.[sign] as cwagon_sign
     ,dir_wag.[factory_number] as wagon_factory_number
     ,dir_wag.[inventory_number] as wagon_inventory_number
     ,dir_wag.[year_built] as wagon_year_built
     ,dir_wag.[exit_ban] as wagon_exit_ban
     ,dir_wag.[note] as wagon_note
     ,dir_wag.[sobstv_kis] as wagon_sobstv_kis
     ,dir_wag.[bit_warning] as wagon_bit_warning
     ,dir_wag.[create] as wagon_create
     ,dir_wag.[create_user] as wagon_create_user
     ,dir_wag.[change] as wagon_change
     ,dir_wag.[change_user]as wagon_change_user
     ,dir_wag.[closed_route] as wagon_closed_route
     ,dir_wag.[new_construction] as wagon_new_construction
	 ,curr_wir.id as wir_id
	 ,curr_wir.[id_arrival_car] as wir_id_arrival_car
	 ,curr_wir.[id_outgoing_car] as wir_id_outgoing_car
	 ,curr_wir.note as wir_note
	 ,curr_wir.highlight_color as wir_highlight_color
	 --> �������� �� �������� [IDS].[Directory_ConditionArrival]
	,arr_doc_vag.[id_condition] as arrival_id_condition
	,arr_dir_cond.condition_name_ru as arrival_condition_name_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
	,arr_dir_cond.condition_name_en as arrival_condition_name_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
	,arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
	,arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
	,arr_dir_cond.repairs as arrival_condition_repairs						-- ���������� [IDS].[Directory_ConditionArrival] �� �������� ������� ������ [IDS].[Arrival_UZ_Vagon]
	 --> �������� �� �������� [IDS].[Directory_ConditionArrival]
	,curr_wio.[id_condition] as current_id_condition
	,curr_dir_cond.condition_name_ru as current_condition_name_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
	,curr_dir_cond.condition_name_en as currentn_condition_name_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
	,curr_dir_cond.condition_abbr_ru as current_condition_abbr_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
	,curr_dir_cond.condition_abbr_en as current_condition_abbr_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
	,curr_dir_cond.repairs as current_condition_repairs						-- ���������� [IDS].[Directory_ConditionArrival] �� �������� ������� ������ [IDS].[Arrival_UZ_Vagon]
	--> �������� 09.12 (� ������� wio ������� ���� ����������� ��������� ��������)
	,curr_wio.[con_change] as current_condition_create							-- ������� ������ �������� (���� ��������� ��������)
	,curr_wio.[con_change_user] as current_condition_create_user				-- ������ ������ �������� (������������ ��������� ��������)
	--=============== ������������� ������ ==================
	--> ������������� ������
	,il.num as instructional_letters_num
	,il.dt as instructional_letters_datetime
	,il.destination_station as instructional_letters_station_code
	,let_station_uz.station as instructional_letters_station_name
	,il.[note] as instructional_letters_note
	
	,arr_sost.[date_adoption] as cur_date_adoption
    ,arr_sost.[date_adoption_act] as cur_date_adoption_act
	,cur_out_sost.date_outgoing as cur_date_outgoing
	,cur_out_sost.date_outgoing_act as  cur_date_outgoing_act
	,out_sost.date_outgoing as last_date_outgoing
	,out_sost.date_outgoing_act as  last_date_outgoing_act

	 --,curr_wir.*

	  --,dir_rent.*
  FROM IDS.[WagonInternalRoutes] as curr_wir
		--> ���������� �������� ������
		Left JOIN [KRR-PA-CNT-Railway].[IDS].[Directory_Wagons] as dir_wag ON curr_wir.num = dir_wag.num
		--> ���������� ����� ������
		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = dir_wag.num order by [id] desc)	
  		--> ���������� �������� ������ �� ��������
		Left JOIN IDS.Directory_OperatorsWagons as curr_dir_operator ON dir_rent.id_operator =  curr_dir_operator.id
		--> ���������� ����������� �������� �� ��������
		Left JOIN IDS.Directory_LimitingLoading as curr_dir_limload ON dir_rent.id_limiting =  curr_dir_limload.id
		--> ���������� ������ (������������� ������)
		Left JOIN IDS.Directory_Countrys as curr_dir_countrys ON dir_wag.id_countrys = curr_dir_countrys.id
		--> ���������� ��� ������
		Left JOIN IDS.Directory_GenusWagons as curr_dir_rod ON dir_wag.id_genus = curr_dir_rod.id
		--> ���������� ����������� ������ �� ��
		Left JOIN [IDS].[Directory_OwnersWagons] as curr_dir_owner ON dir_wag.id_owner = curr_dir_owner.id
		--> �������� ������
		Left JOIN IDS.ArrivalCars as arr_car ON curr_wir.id_arrival_car = arr_car.id
		--> �������� �������
		Left JOIN IDS.ArrivalSostav as arr_sost ON arr_car.id_arrival = arr_sost.id
		--> ��������� �� ����� �� �������� ������ �� ����
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		--> ��������� �� ������ ������� (������) �� �������� ��� ��� �� ����
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
		--> ���������� �������� �� ��������
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> �������� ������ �������
		Left JOIN IDS.OutgoingCars as cur_out_car ON curr_wir.id_outgoing_car = cur_out_car.id
		--> �������� �������
		Left JOIN IDS.OutgoingSostav as cur_out_sost ON cur_out_car.[id_outgoing] = cur_out_sost.id
		--> ������� ��������
        Left JOIN IDS.WagonInternalOperation as curr_wio ON curr_wio.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= curr_wir.id order by id desc)
		--> ���������� �������� �������
		Left JOIN IDS.Directory_ConditionArrival as curr_dir_cond ON curr_wio.id_condition = curr_dir_cond.id

		--==== ������������� ������ =====================================================================
		--> �������� ������� �� ������
		Left JOIN IDS.InstructionalLettersWagon as ilw  ON ilw.id = (SELECT TOP (1) [id] FROM [IDS].[InstructionalLettersWagon] where [num] = dir_wag.[num] order by id desc)
		--> �������� �����
		Left JOIN IDS.InstructionalLetters as il ON ilw.id_instructional_letters = il.id
		--> ���������� ������� ������� ��
		Left JOIN UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs

		--> ��������� ����������� ����������� (��������� �����������)
        Left JOIN IDS.[WagonInternalRoutes] as out_wir ON out_wir.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalRoutes] as wir1 where wir1.[num] = dir_wag.[num] and wir1.id_outgoing_car is not null order by id desc)
		--> �������� ������
		Left JOIN IDS.OutgoingCars as out_car ON out_wir.id_outgoing_car = out_car.id
		--> �������� �������
		Left JOIN IDS.OutgoingSostav as out_sost ON out_car.[id_outgoing] = out_sost.id
	where curr_wir.id=@id_wir
  RETURN
 END


GO


