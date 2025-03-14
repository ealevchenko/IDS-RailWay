USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_wagons_of_operation]    Script Date: 07.09.2021 13:32:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_view_wagons_of_operation_send_arrival]
 (
		@start datetime,
		@stop datetime
 )
		RETURNS 
		@wagons TABLE  (
			[id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
			[id_wir] [bigint] NOT NULL,
			[from_id_wim] [bigint] NULL,
			[from_id_wio] [bigint] NOT NULL,
			[on_id_wim] [bigint] NULL,
			[on_id_wio] [bigint] NULL,
			[num] [int] NULL,
			[wagon_adm] [int] NULL,
			[wagon_adm_name_ru] [nvarchar](100) NULL,
			[wagon_adm_name_en] [nvarchar](100) NULL,
			[wagon_adm_abbr_ru] [nvarchar](10) NULL,
			[wagon_adm_abbr_en] [nvarchar](10) NULL,
			[wagon_rod] [int] NULL,
			[wagon_rod_name_ru] [nvarchar](50) NULL,
			[wagon_rod_name_en] [nvarchar](50) NULL,
			[wagon_rod_abbr_ru] [nvarchar](5) NULL,
			[wagon_rod_abbr_en] [nvarchar](5) NULL,
			[wagon_operators_name_ru] [nvarchar](100) NULL,
			[wagon_operators_name_en] [nvarchar](100) NULL,
			[wagon_operators_abbr_ru] [nvarchar](20) NULL,
			[wagon_operators_abbr_en] [nvarchar](20) NULL,
			[wagon_operators_paid] [bit] NULL,
			[wagon_operators_color] [nvarchar](10) NULL,
			[wagon_operators_rent_start] [datetime] NULL,
			[wagon_limiting_name_ru] [nvarchar](100) NULL,
			[wagon_limiting_name_en] [nvarchar](100) NULL,
			[wagon_limiting_abbr_ru] [nvarchar](30) NULL,
			[wagon_limiting_abbr_en] [nvarchar](30) NULL,
			[arrival_condition_name_ru] [nvarchar](100) NULL,
			[arrival_condition_name_en] [nvarchar](100) NULL,
			[arrival_condition_abbr_ru] [nvarchar](20) NULL,
			[arrival_condition_abbr_en] [nvarchar](20) NULL,
			[arrival_condition_red] [bit] NULL,
			[arrival_cargo_group_name_ru] [nvarchar](50) NULL,
			[arrival_cargo_group_name_en] [nvarchar](50) NULL,
			[arrival_cargo_name_ru] [nvarchar](50) NULL,
			[arrival_cargo_name_en] [nvarchar](50) NULL,
			[id_arrival_car] [bigint] NULL,
			[id_sap_incoming_supply] [bigint] NULL,
			[doc_outgoing_car] [bit] NULL,
			[id_outgoing_car] [bigint] NULL,
			[id_sap_outbound_supply] [bigint] NULL,
			[wir_note] [nvarchar](250) NULL,
			[wir_create] [datetime] NULL,
			[wir_create_user] [nvarchar](50) NULL,
			[wir_close] [datetime] NULL,
			[wir_close_user] [nvarchar](50) NULL,
			[wir_parent_id] [bigint] NULL,
			[from_id_operation] [int] NOT NULL,
			[from_operation_name_ru] [nvarchar](20) NOT NULL,
			[from_operation_name_en] [nvarchar](20) NOT NULL,
			[from_busy] [bit] NOT NULL,
			[from_operation_start] [datetime] NOT NULL,
			[from_operation_end] [datetime] NULL,
			[from_operation_id_condition] [int] NOT NULL,
			[from_operation_condition_name_ru] [nvarchar](100) NULL,
			[from_operation_condition_name_en] [nvarchar](100) NULL,
			[from_operation_condition_abbr_ru] [nvarchar](20) NULL,
			[from_operation_condition_abbr_en] [nvarchar](20) NULL,
			[from_operation_red] [bit] NULL,
			[from_operation_id_loading_status] [int] NOT NULL,
			[from_operation_loading_status_ru] [nvarchar](30) NULL,
			[from_operation_loading_status_en] [nvarchar](30) NULL,
			[from_operation_locomotive1] [nvarchar](20) NULL,
			[from_operation_locomotive2] [nvarchar](20) NULL,
			[from_operation_note] [nvarchar](250) NULL,
			[from_operation_create] [datetime] NOT NULL,
			[from_operation_create_user] [nvarchar](50) NOT NULL,
			[from_operation_close] [datetime] NULL,
			[from_operation_close_user] [nvarchar](50) NULL,
			[from_operation_parent_id] [bigint] NULL,
			[from_id_station] [int] NULL,
			[from_station_name_ru] [nvarchar](50) NULL,
			[from_station_name_en] [nvarchar](50) NULL,
			[from_station_abbr_ru] [nvarchar](50) NULL,
			[from_station_abbr_en] [nvarchar](50) NULL,
			[from_id_way] [int] NULL,
			[from_id_park] [int] NULL,
			[from_way_num_ru] [nvarchar](20) NULL,
			[from_way_num_en] [nvarchar](20) NULL,
			[from_way_name_ru] [nvarchar](100) NULL,
			[from_way_name_en] [nvarchar](100) NULL,
			[from_way_abbr_ru] [nvarchar](50) NULL,
			[from_way_abbr_en] [nvarchar](50) NULL,
			[from_way_capacity] [int] NULL,
			[from_way_close] [datetime] NULL,
			[from_way_delete] [datetime] NULL,
			[from_way_note] [nvarchar](100) NULL,
			[from_way_start] [datetime] NULL,
			[from_way_end] [datetime] NULL,
			[id_outer_way] [int] NULL,
			[name_outer_way_ru] [nvarchar](150) NULL,
			[name_outer_way_en] [nvarchar](150) NULL,
			[outer_way_close] [datetime] NULL,
			[outer_way_delete] [datetime] NULL,
			[outer_way_note] [nvarchar](200) NULL,
			[outer_way_start] [datetime] NULL,
			[outer_way_end] [datetime] NULL,
			[from_way_position] [int] NULL,
			[from_wim_note] [nvarchar](250) NULL,
			[from_wim_create] [datetime] NULL,
			[from_wim_create_user] [nvarchar](50) NULL,
			[from_wim_close] [datetime] NULL,
			[from_wim_close_user] [nvarchar](50) NULL,
			[from_wim_parent_id] [bigint] NULL,
			[on_id_station] [int] NULL,
			[on_station_name_ru] [nvarchar](50) NULL,
			[on_station_name_en] [nvarchar](50) NULL,
			[on_station_abbr_ru] [nvarchar](50) NULL,
			[on_station_abbr_en] [nvarchar](50) NULL,
			[on_id_way] [int] NULL,
			[on_id_park] [int] NULL,
			[on_way_num_ru] [nvarchar](20) NULL,
			[on_way_num_en] [nvarchar](20) NULL,
			[on_way_name_ru] [nvarchar](100) NULL,
			[on_way_name_en] [nvarchar](100) NULL,
			[on_way_abbr_ru] [nvarchar](50) NULL,
			[on_way_abbr_en] [nvarchar](50) NULL,
			[on_way_capacity] [int] NULL,
			[on_way_close] [datetime] NULL,
			[on_way_delete] [datetime] NULL,
			[on_way_note] [nvarchar](100) NULL,
			[on_way_start] [datetime] NULL,
			[on_way_end] [datetime] NULL,
			[on_way_position] [int] NULL,
			[on_wim_note] [nvarchar](250) NULL,
			[on_wim_create] [datetime] NULL,
			[on_wim_create_user] [nvarchar](50) NULL,
			[on_wim_close] [datetime] NULL,
			[on_wim_close_user] [nvarchar](50) NULL,
			[on_wim_parent_id] [bigint] NULL,
			[on_id_operation] [int] NULL,
			[on_operation_name_ru] [nvarchar](20) NULL,
			[on_operation_name_en] [nvarchar](20) NULL,
			[on_busy] [bit] NULL,
			[on_operation_start] [datetime] NULL,
			[on_operation_end] [datetime] NULL,
			[on_operation_id_condition] [int] NULL,
			[on_operation_condition_name_ru] [nvarchar](100) NULL,
			[on_operation_condition_name_en] [nvarchar](100) NULL,
			[on_operation_condition_abbr_ru] [nvarchar](20) NULL,
			[on_operation_condition_abbr_en] [nvarchar](20) NULL,
			[on_operation_red] [bit] NULL,
			[on_operation_id_loading_status] [int] NULL,
			[on_operation_locomotive1] [nvarchar](20) NULL,
			[on_operation_locomotive2] [nvarchar](20) NULL,
			[on_operation_note] [nvarchar](250) NULL,
			[on_operation_create] [datetime] NULL,
			[on_operation_create_user] [nvarchar](50) NULL,
			[on_operation_close] [datetime] NULL,
			[on_operation_close_user] [nvarchar](50) NULL,
			[on_operation_parent_id] [bigint] NULL
		)
		AS
		 BEGIN
	--> �������� ��������
	declare @id_operation int =5;
			
	insert @wagons
	select
	--> ��������� �����������
	  wio_from.[id_wagon_internal_routes] as id_wir
	  ,wim_from.[id] as from_id_wim
	  ,wio_from.[id] as from_id_wio
	  ,wim_on.[id] as on_id_wim
	  ,wio_on.[id] as on_id_wio
	  ,wir.[num]
	  -- ������
	  ,dir_countrys.code_sng as wagon_adm
	  ,dir_countrys.countrys_name_ru as wagon_adm_name_ru
	  ,dir_countrys.countrys_name_en as wagon_adm_name_en
	  ,dir_countrys.country_abbr_ru as wagon_adm_abbr_ru
	  ,dir_countrys.country_abbr_en as wagon_adm_abbr_en
	  		-- ��� ������
		,dir_rod.rod_uz as wagon_rod
		,dir_rod.genus_ru as wagon_rod_name_ru
		,dir_rod.genus_en as wagon_rod_name_en
		,dir_rod.abbr_ru as wagon_rod_abbr_ru
		,dir_rod.abbr_en as wagon_rod_abbr_en
		-- ��� ������
		--,dir_type.type_ru as wagon_type_ru
		--,dir_type.type_en as wagon_type_en
		-- �������� ������
		,dir_operator.operators_ru as wagon_operators_name_ru
		,dir_operator.operators_en as wagon_operators_name_en
		,dir_operator.abbr_ru as wagon_operators_abbr_ru
		,dir_operator.abbr_en as wagon_operators_abbr_en
		,dir_operator.paid as wagon_operators_paid
		,dir_operator.color as wagon_operators_color
		,cur_dir_rent.rent_start as wagon_operators_rent_start
		-- ����������� �������� ������
		,dir_limload.limiting_name_ru as wagon_limiting_name_ru
		,dir_limload.limiting_name_en as wagon_limiting_name_en
		,dir_limload.limiting_abbr_ru as wagon_limiting_abbr_ru
		,dir_limload.limiting_abbr_en as wagon_limiting_abbr_en
				-- �������� �� ��������
		,arr_dir_cond.condition_name_ru as arrival_condition_name_ru
		,arr_dir_cond.condition_name_en as arrival_condition_name_en
		,arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru
		,arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en
		,arr_dir_cond.red as arrival_condition_red
		-- ���� �� ��������
		,arr_dir_group_cargo.cargo_group_name_ru as arrival_cargo_group_name_ru
		,arr_dir_group_cargo.cargo_group_name_en as arrival_cargo_group_name_en
		,arr_dir_cargo.cargo_name_ru as arrival_cargo_name_ru
		,arr_dir_cargo.cargo_name_en as arrival_cargo_name_en
      ,wir.[id_arrival_car]
      ,wir.[id_sap_incoming_supply]
      ,wir.[doc_outgoing_car]
      ,wir.[id_outgoing_car]
      ,wir.[id_sap_outbound_supply]
      ,wir.[note] as wir_note
      ,wir.[create] as wir_create
      ,wir.[create_user] as wir_create_user
      ,wir.[close] as wir_close
      ,wir.[close_user] as wir_close_user
      ,wir.[parent_id] as wir_parent_id
	--> �������� �������� �� �������
      ,wio_from.[id_operation] as from_id_operation
	  ,dir_wag_oper_from.[operation_name_ru] as from_operation_name_ru
      ,dir_wag_oper_from.[operation_name_en] as from_operation_name_en
      ,dir_wag_oper_from.[busy] as from_busy
      ,wio_from.[operation_start] as from_operation_start
      ,wio_from.[operation_end] as from_operation_end
      ,wio_from.[id_condition] as from_operation_id_condition
	  ,dir_cond_from.[condition_name_ru] as from_operation_condition_name_ru
      ,dir_cond_from.[condition_name_en] as from_operation_condition_name_en
      ,dir_cond_from.[condition_abbr_ru] as from_operation_condition_abbr_ru
      ,dir_cond_from.[condition_abbr_en] as from_operation_condition_abbr_en
      ,dir_cond_from.[red] as from_operation_red
      ,wio_from.[id_loading_status] as from_operation_id_loading_status
	  ,dir_wls.[loading_status_ru] as from_operation_loading_status_ru
      ,dir_wls.[loading_status_en] as from_operation_loading_status_en
      ,wio_from.[locomotive1] as from_operation_locomotive1
      ,wio_from.[locomotive2] as from_operation_locomotive2
      ,wio_from.[note] as from_operation_note
      ,wio_from.[create] as from_operation_create
      ,wio_from.[create_user] as from_operation_create_user
      ,wio_from.[close] as from_operation_close
      ,wio_from.[close_user] as from_operation_close_user
      ,wio_from.[parent_id] as from_operation_parent_id
	  --> ����������
	  --> ������� ��������
      ,wim_from.[id_station] as from_id_station
	  ,dir_station_from.[station_name_ru] as from_station_name_ru
      ,dir_station_from.[station_name_en] as from_station_name_en
      ,dir_station_from.[station_abbr_ru] as from_station_abbr_ru
      ,dir_station_from.[station_abbr_en] as from_station_abbr_en
      --,dir_station_from.[exit_uz] as from_exit_uz
      --,dir_station_from.[station_uz] as from_station_uz
      --,dir_station_from.[default_side] as from_default_side
      --,dir_station_from.[code] as from_code
      --,dir_station_from.[idle_time] as from_idle_time
	  --> ���� ��������
      ,wim_from.[id_way] as from_id_way
      ,dir_way_from.[id_park] as from_id_park
      ,dir_way_from.[way_num_ru] as from_way_num_ru
      ,dir_way_from.[way_num_en] as from_way_num_en
      ,dir_way_from.[way_name_ru] as from_way_name_ru
      ,dir_way_from.[way_name_en] as from_way_name_en
      ,dir_way_from.[way_abbr_ru] as from_way_abbr_ru
      ,dir_way_from.[way_abbr_en] as from_way_abbr_en
      ,dir_way_from.[capacity] as from_way_capacity
      --,dir_way_from.[deadlock]
      --,dir_way_from.[crossing_uz]
      --,dir_way_from.[crossing_amkr]
      --,dir_way_from.[id_devision]
      --,dir_way_from.[dissolution]
      --,dir_way_from.[output_dissolution]
      ,dir_way_from.[way_close] as from_way_close
      ,dir_way_from.[way_delete] as from_way_delete
      ,dir_way_from.[note] as from_way_note
      ,wim_from.[way_start] as from_way_start
      ,wim_from.[way_end] as from_way_end
	  --> ������� ����
      ,wim_from.[id_outer_way]
	  ,outer_ways.[name_outer_way_ru]
      ,outer_ways.[name_outer_way_en]
      --,outer_ways.[id_station_from]
      --,outer_ways.[id_park_from]
      --,outer_ways.[id_way_from]
      --,outer_ways.[side_from]
      ,outer_ways.[way_close] as outer_way_close
      ,outer_ways.[way_delete] as outer_way_delete
      ,outer_ways.[note] as outer_way_note
      ,wim_from.[outer_way_start]
      ,wim_from.[outer_way_end]
      ,wim_from.[position] as from_way_position
      ,wim_from.[note] as from_wim_note
      ,wim_from.[create] as from_wim_create
      ,wim_from.[create_user] as from_wim_create_user
      ,wim_from.[close] as from_wim_close
      ,wim_from.[close_user] as from_wim_close_user
      ,wim_from.[parent_id] as from_wim_parent_id
	  --> ������� ��������
      ,outer_ways.[id_station_on] as on_id_station
	  ,dir_station_on.[station_name_ru] as on_station_name_ru
      ,dir_station_on.[station_name_en] as on_station_name_en
      ,dir_station_on.[station_abbr_ru] as on_station_abbr_ru
      ,dir_station_on.[station_abbr_en] as on_station_abbr_en
      --,dir_station_on.[exit_uz] as on_exit_uz
      --,dir_station_on.[station_uz] as on_station_uz
      --,dir_station_on.[default_side] as on_default_side
      --,dir_station_on.[code] as on_code
      --,dir_station_on.[idle_time] as on_idle_time
      --,outer_ways.[id_park_on]
      --,outer_ways.[id_way_on]
      --,outer_ways.[side_on]
      --,outer_ways.[exit_uz]
	  --> ���� ��������
      ,wim_on.[id_way] as on_id_way
      ,dir_way_on.[id_park] as on_id_park
      ,dir_way_on.[way_num_ru] as on_way_num_ru
      ,dir_way_on.[way_num_en] as on_way_num_en
      ,dir_way_on.[way_name_ru] as on_way_name_ru
      ,dir_way_on.[way_name_en] as on_way_name_en
      ,dir_way_on.[way_abbr_ru] as on_way_abbr_ru
      ,dir_way_on.[way_abbr_en] as on_way_abbr_en
      ,dir_way_on.[capacity] as on_way_capacity
      ,dir_way_on.[way_close] as on_way_close
      ,dir_way_on.[way_delete] as on_way_delete
      ,dir_way_on.[note] as on_way_note
      ,wim_on.[way_start] as on_way_start
      ,wim_on.[way_end] as on_way_end
	  ,wim_on.[position] as on_way_position
      ,wim_on.[note] as on_wim_note
      ,wim_on.[create] as on_wim_create
      ,wim_on.[create_user] as on_wim_create_user
      ,wim_on.[close] as on_wim_close
      ,wim_on.[close_user] as on_wim_close_user
      ,wim_on.[parent_id] as on_wim_parent_id
	  	--> �������� ����� �� �������
      ,wio_on.[id_operation] as on_id_operation
	  ,dir_wag_oper_on.[operation_name_ru] as on_operation_name_ru
      ,dir_wag_oper_on.[operation_name_en] as on_operation_name_en
      ,dir_wag_oper_on.[busy] as on_busy
      ,wio_on.[operation_start] as on_operation_start
      ,wio_on.[operation_end] as on_operation_end
      ,wio_on.[id_condition] as on_operation_id_condition
	  ,dir_cond_on.[condition_name_ru] as on_operation_condition_name_ru
      ,dir_cond_on.[condition_name_en] as on_operation_condition_name_en
      ,dir_cond_on.[condition_abbr_ru] as on_operation_condition_abbr_ru
      ,dir_cond_on.[condition_abbr_en] as on_operation_condition_abbr_en
      ,dir_cond_on.[red] as on_operation_red
      ,wio_on.[id_loading_status] as on_operation_id_loading_status
      ,wio_on.[locomotive1] as on_operation_locomotive1
      ,wio_on.[locomotive2] as on_operation_locomotive2
      ,wio_on.[note] as on_operation_note
      ,wio_on.[create] as on_operation_create
      ,wio_on.[create_user] as on_operation_create_user
      ,wio_on.[close] as on_operation_close
      ,wio_on.[close_user] as on_operation_close_user
      ,wio_on.[parent_id] as on_operation_parent_id

	FROM IDS.WagonInternalOperation as wio_from  INNER JOIN
	[IDS].[Directory_WagonOperations] as dir_wag_oper_from ON wio_from.id_operation = dir_wag_oper_from.id Left JOIN			-- ��������� �������� ��� ��������
	[IDS].[Directory_ConditionArrival] as dir_cond_from ON wio_from.[id_condition] = dir_cond_from.id Left JOIN		-- ��������� ��������� 
    [IDS].[Directory_WagonLoadingStatus] as dir_wls ON wio_from.[id_loading_status] = dir_wls.id Left JOIN			-- ��������� ������ ��������
	IDS.WagonInternalRoutes as wir ON wio_from.id_wagon_internal_routes = wir.id Left JOIN							-- ��������� �������� ��� ��������
	IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num  Left JOIN										-- ���������� �������
	IDS.Directory_WagonsRent as cur_dir_rent ON cur_dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc) Left JOIN
	IDS.Directory_Countrys as dir_countrys ON dir_wagon.id_countrys = dir_countrys.id Left JOIN					--> ���������� ������ ������
	IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id Left JOIN							--> ���������� ��� ������
	IDS.Directory_OperatorsWagons as dir_operator ON cur_dir_rent.id_operator =  dir_operator.id  Left JOIN		--> ������� �������� ������
	IDS.Directory_LimitingLoading as dir_limload ON cur_dir_rent.id_limiting =  dir_limload.id Left JOIN		--> ������� ����������� ��������
	--> �������� �� �������
	IDS.WagonInternalMovement as wim_from ON wio_from.operation_end = wim_from.outer_way_start AND wio_from.id_wagon_internal_routes=wim_from.id_wagon_internal_routes and wio_from.create_user = wim_from.create_user Left JOIN
	[IDS].[Directory_Station] as dir_station_from ON wim_from.[id_station] = dir_station_from.id Left JOIN			-- ��������� ������� ��������
	[IDS].[Directory_Ways] as dir_way_from ON wim_from.[id_way] = dir_way_from.id Left JOIN							-- ��������� ���� ��������
	IDS.Directory_OuterWays as outer_ways ON wim_from.id_outer_way = outer_ways.id Left JOIN	
	[IDS].[Directory_Station] as dir_station_on ON outer_ways.[id_station_on] = dir_station_on.id Left JOIN		-- ��������� ������� ��������
	--> �������� �� �������
	IDS.WagonInternalMovement as wim_on ON wim_from.id = wim_on.parent_id  Left JOIN								-- WIM - ��������
	[IDS].[Directory_Ways] as dir_way_on ON wim_on.[id_way] = dir_way_on.id Left JOIN							-- ��������� ���� ��������
	IDS.WagonInternalOperation as wio_on ON wim_on.id_wagon_internal_routes=wio_on.id_wagon_internal_routes AND wim_on.way_start = wio_on.operation_end Left JOIN
	[IDS].[Directory_WagonOperations] as dir_wag_oper_on ON wio_on.id_operation = dir_wag_oper_on.id Left JOIN	-- ��������� �������� ��� �������� �� ��������
	[IDS].[Directory_ConditionArrival] as dir_cond_on ON wio_on.[id_condition] = dir_cond_on.id Left JOIN		-- ��������� ��������� 
	--> �������� �� ����
	IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id Left JOIN -- ��������
	--> ��������� �� �������� �� ����
	IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id Left JOIN
	IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id Left JOIN
	IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition =  arr_dir_cond.id Left JOIN		--> ����������� �������� �� ��������
	IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id Left JOIN				--> ���� �� ��������
	IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id --Left JOIN               --> ������ ����� �� ��������

	WHERE wio_from.id_operation = @id_operation and wio_from.[operation_end] >= @start and wio_from.[operation_end] <= @stop 
	order by wio_from.operation_start desc, wim_from.id_outer_way, wim_from.[position]
  RETURN
 END

GO


