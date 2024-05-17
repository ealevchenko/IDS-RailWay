	use [KRR-PA-CNT-Railway]

	declare @id_station_on int =8;

	--select * from [IDS].[get_view_open_wagons_of_outer_ways_station_on](@id_station_on)

	select distinct [num_sostav] FROM IDS.WagonInternalMovement as wim Left JOIN IDS.Directory_OuterWays as ow ON wim.id_outer_way = ow.id WHERE wim.[num_sostav] is not null and ow.[id_station_on] = @id_station_on and wim.[outer_way_end] is null


	
	select
	--> ��������� �����������
	wim_from.[id] as from_id_wim
	,wim_from.[id_wagon_internal_routes] as id_wir
	,wio_from.[id] as from_id_wio
	,wim_on.[id] as on_id_wim
	,wio_on.[id] as on_id_wio
	,wim_from.[num_sostav] as outer_way_num_sostav	-- ����� �������
	,wir.[num]										-- ����� ������
	,wim_from.[position] as outer_way_position		-- ������� ������
	--> ����� ���������
	,arr_doc_uz.[nom_doc] as arrival_nom_doc			-- ����� ���������(�������)
	,arr_doc_uz.[nom_main_doc] as arrival_nom_main_doc		-- ����� ��������� ��������� (���� ��������)
	--> �������������
	,dir_countrys.code_sng as wagon_adm
	,dir_countrys.countrys_name_ru as wagon_adm_name_ru
	,dir_countrys.countrys_name_en as wagon_adm_name_en
	,dir_countrys.country_abbr_ru as wagon_adm_abbr_ru
	,dir_countrys.country_abbr_en as wagon_adm_abbr_en
	--> ��� ������
	,dir_rod.rod_uz as wagon_rod
	,dir_rod.genus_ru as wagon_rod_name_ru
	,dir_rod.genus_en as wagon_rod_name_en
	,dir_rod.abbr_ru as wagon_rod_abbr_ru
	,dir_rod.abbr_en as wagon_rod_abbr_en
	--> ��������
	,dir_operator.[id] as id_operator
	,dir_operator.[operators_ru]
	,dir_operator.[operators_en]
	,dir_operator.[abbr_ru] as operator_abbr_ru
	,dir_operator.[abbr_en] as operator_abbr_en
	,cur_dir_rent.[rent_start] as operator_rent_start
	,cur_dir_rent.[rent_end] as operator_rent_end
	,dir_operator.[paid] as operator_paid
	,dir_operator.[color] as operator_color
	,dir_operator.monitoring_idle_time as operator_monitoring_idle_time
	--> �����������
	,dir_limload.[id] as id_limiting_loading
	,dir_limload.[limiting_name_ru]
	,dir_limload.[limiting_name_en]
	,dir_limload.[limiting_abbr_ru]
	,dir_limload.[limiting_abbr_en]
	--> �������� �� ��������
	,arr_dir_cond.condition_name_ru as arrival_condition_name_ru
	,arr_dir_cond.condition_name_en as arrival_condition_name_en
	,arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru
	,arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en
	,arr_dir_cond.red as arrival_condition_red
	--> ���� �� ��������
	,arr_dir_group_cargo.cargo_group_name_ru as arrival_cargo_group_name_ru
	,arr_dir_group_cargo.cargo_group_name_en as arrival_cargo_group_name_en
	,arr_dir_cargo.cargo_name_ru as arrival_cargo_name_ru
	,arr_dir_cargo.cargo_name_en as arrival_cargo_name_en
		--> ���������������� ������
	,arr_dir_certif.[id] as arrival_id_sertification_data
	,arr_dir_certif.[certification_data_ru] as arrival_sertification_data_ru
	,arr_dir_certif.[certification_data_en] as arrival_sertification_data_en
		--> ��� ����������
	,arr_dir_division_amkr.code as arrival_division_amkr_code
	,arr_dir_division_amkr.name_division_ru as arrival_division_amkr_name_ru
	,arr_dir_division_amkr.name_division_en as arrival_division_amkr_name_en
	,arr_dir_division_amkr.division_abbr_ru as arrival_division_amkr_abbr_ru
	,arr_dir_division_amkr.division_abbr_en as arrival_division_amkr_abbr_en
	--> ��������� �����������
	,wir.[id_arrival_car]
	,wir.[id_sap_incoming_supply]
	,wir.doc_outgoing_car			-- ������� ��������� ��� �����
	,wir.[id_outgoing_car]
	,wir.[id_sap_outbound_supply]
	,wir.[note] as wir_note			-- ���������� �� ���� �������� ������
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
	--> �������� �� �������� ��������
	,wio_from.[id_condition] as from_operation_id_condition
	,dir_cond_from.[condition_name_ru] as from_operation_condition_name_ru
	,dir_cond_from.[condition_name_en] as from_operation_condition_name_en
	,dir_cond_from.[condition_abbr_ru] as from_operation_condition_abbr_ru
	,dir_cond_from.[condition_abbr_en] as from_operation_condition_abbr_en
	--> ��������� ��������
	,dir_wls_from.[id] as from_operation_id_loading_status
	,dir_wls_from.[loading_status_ru] as from_operation_loading_status_ru
	,dir_wls_from.[loading_status_en] as from_operation_loading_status_en
	--> �������� �������� �� ������� (�������������� ���������)
	,wio_from.[locomotive1] as from_operation_locomotive1
	,wio_from.[locomotive2] as from_operation_locomotive2
	,wio_from.[note] as from_operation_note
	,wio_from.[create] as from_operation_create
	,wio_from.[create_user] as from_operation_create_user
	,wio_from.[close] as from_operation_close
	,wio_from.[close_user] as from_operation_close_user
	,wio_from.[parent_id] as from_operation_parent_id
	--> ���������� � ������ ��������� ��������
	--> ������� ��������
	,wim_from.[id_station] as from_id_station
	,dir_station_from.[station_name_ru] as from_station_name_ru
	,dir_station_from.[station_name_en] as from_station_name_en
	,dir_station_from.[station_abbr_ru] as from_station_abbr_ru
	,dir_station_from.[station_abbr_en] as from_station_abbr_en
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
	,dir_way_from.[way_close] as from_way_close
	,dir_way_from.[way_delete] as from_way_delete
	,dir_way_from.[note] as from_way_note
	,wim_from.[way_start] as from_way_start
	,wim_from.[way_end] as from_way_end
	--> ������� ����\������\�������
	,wim_from.[id_outer_way]
	,outer_ways.[name_outer_way_ru]
	,outer_ways.[name_outer_way_en]
	,outer_ways.[way_close] as outer_way_close
	,outer_ways.[way_delete] as outer_way_delete
	,outer_ways.[note] as outer_way_note
	,wim_from.[outer_way_start]
	,wim_from.[outer_way_end]
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
		--> ������� �������� ���������
	,wim_on.id_station as arrival_id_station
	,dir_station_arr.[station_name_ru] as arrival_station_name_ru
	,dir_station_arr.[station_name_en] as arrival_station_name_en
	,dir_station_arr.[station_abbr_ru] as arrival_station_abbr_ru
	,dir_station_arr.[station_abbr_en] as arrival_station_abbr_en
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
	--> �������� ������ �� �������
	,wio_on.[id_operation] as on_id_operation
	,dir_wag_oper_on.[operation_name_ru] as on_operation_name_ru
	,dir_wag_oper_on.[operation_name_en] as on_operation_name_en
	,dir_wag_oper_on.[busy] as on_busy
	,wio_on.[operation_start] as on_operation_start
	,wio_on.[operation_end] as on_operation_end
    --> �������� ������ �������� �� ��������
	,dir_cond_on.[id] as on_operation_id_condition
	,dir_cond_on.[condition_name_ru] as on_operation_condition_name_ru
	,dir_cond_on.[condition_name_en] as on_operation_condition_name_en
	,dir_cond_on.[condition_abbr_ru] as on_operation_condition_abbr_ru
	,dir_cond_on.[condition_abbr_en] as on_operation_condition_abbr_en
	--> ��������� ��������
	,dir_wls_on.[id] as on_operation_id_loading_status
	,dir_wls_on.[loading_status_ru] as on_operation_loading_status_ru
	,dir_wls_on.[loading_status_en] as on_operation_loading_status_en
	--> �������� ������ �� ������� (�������������� ���������)
	,wio_on.[locomotive1] as on_operation_locomotive1
	,wio_on.[locomotive2] as on_operation_locomotive2
	,wio_on.[note] as on_operation_note
	,wio_on.[create] as on_operation_create
	,wio_on.[create_user] as on_operation_create_user
	,wio_on.[close] as on_operation_close
	,wio_on.[close_user] as on_operation_close_user
	,wio_on.[parent_id] as on_operation_parent_id
	into aaaaa
	FROM IDS.WagonInternalMovement as wim_from --> ���������� �������� �� �������
	INNER JOIN IDS.WagonInternalRoutes as wir ON wim_from.id_wagon_internal_routes = wir.id --> ������� ��������� �����������
	--> �������� �������� �� �������		
	LEFT JOIN IDS.WagonInternalOperation as wio_from  ON wio_from.[id] = wim_from.[id_wio]
	--> ���������� ������ �� �������	
	Left JOIN IDS.WagonInternalMovement as wim_on ON wim_from.id = wim_on.parent_id
	--> �������� ������ �� �������
	Left JOIN IDS.WagonInternalOperation as wio_on ON wim_on.[id_wio]=wio_on.id 
	--==== �������� � ����� ������ =====================================================================
	--> �������� �� ����
	Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
	--> ��������� �� �������� �� ���� ������
	Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id 
	--> ��������� �� �������� �� ���� �������
	Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
	--==== ����������� ===================================================================================
	--> ���������� �������
	Left JOIN IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num
	--> ���������� ������ ������
	Left JOIN	IDS.Directory_Countrys as dir_countrys ON dir_wagon.id_countrys = dir_countrys.id				
	--> ���������� ��� ������
	Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
	--> ���������� �����
	Left JOIN IDS.Directory_WagonsRent as cur_dir_rent ON cur_dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
	--> ������� �������� ������
	Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON cur_dir_rent.id_operator =  dir_operator.id	
	--> ������� ����������� �������� 
	Left JOIN IDS.Directory_LimitingLoading as dir_limload ON cur_dir_rent.id_limiting =  dir_limload.id
	--> ����������� �������� �� ��������
	Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition =  arr_dir_cond.id 	
	--> ���� �� ��������
	Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id 	
	--> ������ ����� �� ��������
	Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
	--> ���������� ���������� ������
	Left JOIN IDS.Directory_CertificationData as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
	-- ���������� �������� ��� �������� (��������)
	LEFT JOIN [IDS].[Directory_WagonOperations] as dir_wag_oper_from ON wio_from.id_operation = dir_wag_oper_from.id
	--> �������� �� �������� ��������
	Left JOIN [IDS].[Directory_ConditionArrival] as dir_cond_from ON wio_from.[id_condition] = dir_cond_from.id
	--> ��������� �������� �� �������� ��������
    Left JOIN [IDS].[Directory_WagonLoadingStatus] as dir_wls_from ON wio_from.[id_loading_status] = dir_wls_from.id
	-- ���������� ������� ��������
	Left JOIN [IDS].[Directory_Station] as dir_station_from ON wim_from.[id_station] = dir_station_from.id 		
	--> ��������� ���� ��������
	Left JOIN [IDS].[Directory_Ways] as dir_way_from ON wim_from.[id_way] = dir_way_from.id 
	--> ���������� ������� ���� ��������
	Left JOIN IDS.Directory_OuterWays as outer_ways ON wim_from.id_outer_way = outer_ways.id 	
	--> ���������� ������� ��������
	Left JOIN [IDS].[Directory_Station] as dir_station_on ON outer_ways.[id_station_on] = dir_station_on.id
	--> ���������� ���� �������� �������
	Left JOIN [IDS].[Directory_Ways] as dir_way_on ON wim_on.[id_way] = dir_way_on.id 
		--> ���������� ������� �������� ������� �� ����
	Left JOIN [IDS].[Directory_Station] as dir_station_arr ON wim_on.id_station = dir_station_arr.id
	--> ���������� �������� ��� �������� (��������)
	Left JOIN [IDS].[Directory_WagonOperations] as dir_wag_oper_on ON wio_on.id_operation = dir_wag_oper_on.id 	-- ��������� �������� ��� �������� �� ��������
	--> �������� �� �������� ��������
	Left JOIN [IDS].[Directory_ConditionArrival] as dir_cond_on ON wio_on.[id_condition] = dir_cond_on.id 
	--> ��������� �������� �� �������� ��������
    Left JOIN [IDS].[Directory_WagonLoadingStatus] as dir_wls_on ON wio_on.[id_loading_status] = dir_wls_on.id
		--> ���������� ������������� (��� ����������)
	Left JOIN IDS.Directory_Divisions as arr_dir_division_amkr ON arr_doc_vag.id_division_on_amkr =  arr_dir_division_amkr.id
	
	
	--WHERE wim_from.[num_sostav] is not null and outer_ways.[id_station_on] = 8
	where wim_from.[num_sostav] in (select distinct [num_sostav] FROM IDS.WagonInternalMovement as wim Left JOIN IDS.Directory_OuterWays as ow ON wim.id_outer_way = ow.id WHERE wim.[num_sostav] is not null and ow.[id_station_on] = @id_station_on and wim.[outer_way_end] is null)
	order by wim_from.[num_sostav],wim_from.[position]
	--*/