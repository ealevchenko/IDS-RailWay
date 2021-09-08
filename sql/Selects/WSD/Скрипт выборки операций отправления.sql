	use [KRR-PA-CNT-Railway]
	declare @start datetime = Convert(datetime,'2021-08-01 00:00:00',120)
	declare @stop datetime = Convert(datetime,'2021-08-31 23:59:59',120)
	declare @id_operation int = 5

select * from [IDS].[get_view_wagons_of_operation](@start,@stop,@id_operation) order by [operation_start] desc, [id_outer_way], wim_position
	
	select
	--> ��������� �����������
	  wio.[id_wagon_internal_routes] as id_wir
	  ,wim.[id] as id_wim
	  ,wio.[id] as id_wio
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
	--> ��������

      ,wio.[id_operation]
	  ,dir_wag_oper.[operation_name_ru]
      ,dir_wag_oper.[operation_name_en]
      ,dir_wag_oper.[busy]
      ,wio.[operation_start]
      ,wio.[operation_end]
      ,wio.[id_condition] as operation_id_condition
	  ,dir_cond_arr.[condition_name_ru] as operation_condition_name_ru
      ,dir_cond_arr.[condition_name_en] as operation_condition_name_en
      ,dir_cond_arr.[condition_abbr_ru] as operation_condition_abbr_ru
      ,dir_cond_arr.[condition_abbr_en] as operation_condition_abbr_en
      ,dir_cond_arr.[red] as operation_red
      ,wio.[id_loading_status] as operation_id_loading_status
	  ,dir_wls.[loading_status_ru] as operation_loading_status_ru
      ,dir_wls.[loading_status_en] as operation_loading_status_en
      ,wio.[locomotive1] as operation_locomotive1
      ,wio.[locomotive2] as operation_locomotive2
      ,wio.[note] as operation_note
      ,wio.[create] as operation_create
      ,wio.[create_user] as operation_create_user
      ,wio.[close] as operation_close
      ,wio.[close_user] as operation_close_user
      ,wio.[parent_id] as operation_parent_id
	  --> ����������
	  --> ������� ��������
      ,wim.[id_station] as from_id_station
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
      ,wim.[id_way] as from_id_way
      ,dir_way_from.[id_park] as from_id_park
      ,dir_way_from.[way_num_ru] as from_way_num_ru
      ,dir_way_from.[way_num_en] as from_way_num_en
      ,dir_way_from.[way_name_ru] as from_way_name_ru
      ,dir_way_from.[way_name_en] as from_way_name_en
      ,dir_way_from.[way_abbr_ru] as from_way_abbr_ru
      ,dir_way_from.[way_abbr_en] as from_way_abbr_en
      ,dir_way_from.[capacity] as from_capacity
      --,dir_way_from.[deadlock]
      --,dir_way_from.[crossing_uz]
      --,dir_way_from.[crossing_amkr]
      --,dir_way_from.[id_devision]
      --,dir_way_from.[dissolution]
      --,dir_way_from.[output_dissolution]
      ,dir_way_from.[way_close] as from_way_close
      ,dir_way_from.[way_delete] as from_way_delete
      ,dir_way_from.[note] as from_way_note
      ,wim.[way_start] as from_way_start
      ,wim.[way_end] as from_way_end
	  --> ������� ����
      ,wim.[id_outer_way]
	  ,outer_ways.[name_outer_way_ru]
      ,outer_ways.[name_outer_way_en]
      --,outer_ways.[id_station_from]
      --,outer_ways.[id_park_from]
      --,outer_ways.[id_way_from]
      --,outer_ways.[side_from]
      ,outer_ways.[way_close] as outer_way_close
      ,outer_ways.[way_delete] as outer_way_delete
      ,outer_ways.[note] as outer_way_note
      ,wim.[outer_way_start]
      ,wim.[outer_way_end]
      ,wim.[position] as wim_position
      ,wim.[note] as wim_note
      ,wim.[create] as wim_create
      ,wim.[create_user] as wim_create_user
      ,wim.[close] as wim_close
      ,wim.[close_user] as wim_close_user
      ,wim.[parent_id] as wim_parent_id
	  --> ������� ��������
      ,outer_ways.[id_station_on]
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
	FROM IDS.WagonInternalOperation as wio  INNER JOIN
	[IDS].[Directory_WagonOperations] as dir_wag_oper ON wio.id_operation = dir_wag_oper.id Left JOIN			-- ��������� �������� ��� ��������
	[IDS].[Directory_ConditionArrival] as dir_cond_arr ON wio.[id_condition] = dir_cond_arr.id Left JOIN		-- ��������� ��������� 
    [IDS].[Directory_WagonLoadingStatus] as dir_wls ON wio.[id_loading_status] = dir_wls.id Left JOIN			-- ��������� ������ ��������
	IDS.WagonInternalRoutes as wir ON wio.id_wagon_internal_routes = wir.id Left JOIN							-- ��������� �������� ��� ��������
	IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num  Left JOIN										-- ���������� �������
	IDS.Directory_WagonsRent as cur_dir_rent ON cur_dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc) Left JOIN
	IDS.Directory_Countrys as dir_countrys ON dir_wagon.id_countrys = dir_countrys.id Left JOIN					--> ���������� ������ ������
	IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id Left JOIN							--> ���������� ��� ������
	IDS.Directory_OperatorsWagons as dir_operator ON cur_dir_rent.id_operator =  dir_operator.id  Left JOIN		--> ������� �������� ������
	IDS.Directory_LimitingLoading as dir_limload ON cur_dir_rent.id_limiting =  dir_limload.id Left JOIN		--> ������� ����������� ��������
	IDS.WagonInternalMovement as wim ON wio.operation_end = wim.outer_way_start AND wio.id_wagon_internal_routes=wim.id_wagon_internal_routes and wio.create_user = wim.create_user Left JOIN
	[IDS].[Directory_Station] as dir_station_from ON wim.[id_station] = dir_station_from.id Left JOIN			-- ��������� ������� ��������
	[IDS].[Directory_Ways] as dir_way_from ON wim.[id_way] = dir_way_from.id Left JOIN							-- ��������� ���� ��������
	IDS.Directory_OuterWays as outer_ways ON wim.id_outer_way = outer_ways.id Left JOIN	
	[IDS].[Directory_Station] as dir_station_on ON outer_ways.[id_station_on] = dir_station_on.id Left JOIN		-- ��������� ������� ��������
	--> ��������
	IDS.ArrivalCars as ar_car ON wir.id_arrival_car = ar_car.id Left JOIN -- ��������
	--> ��������� �� ��������
	IDS.Arrival_UZ_Vagon as ar_doc_vag ON ar_car.id_arrival_uz_vagon = ar_doc_vag.id Left JOIN
	IDS.Arrival_UZ_Document as ar_doc_uz ON ar_doc_vag.id_document = ar_doc_uz.id Left JOIN
	IDS.Directory_ConditionArrival as arr_dir_cond ON ar_doc_vag.id_condition =  arr_dir_cond.id Left JOIN		--> ����������� �������� �� ��������
	IDS.Directory_Cargo as arr_dir_cargo ON ar_doc_vag.id_cargo =  arr_dir_cargo.id Left JOIN				--> ���� �� ��������
	IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id --Left JOIN               --> ������ ����� �� ��������

	WHERE wio.id_operation = @id_operation and wio.operation_start >= @start and wio.operation_start <= @stop 
	order by wio.operation_start desc, wim.id_outer_way, wim.[position]

	--select count(id) FROM IDS.WagonInternalOperation as wio
	--WHERE wio.id_operation = @id_operation and wio.operation_start >= @start and wio.operation_start <= @stop 