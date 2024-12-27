--use [KRR-PA-CNT-Railway]
use [KRR-PA-CNT-Railway-Archive]
declare @id_station int = 7
declare @start datetime = convert(datetime,'2024-10-01',120);
declare @stop datetime = convert(datetime,'2024-12-30',120);

select * from [IDS].[get_view_wagons_filing_of_period_id_station](@start,@stop,@id_station)

	SELECT
		--> ��������� �����������
		wim_filing.[id] as id_wim
		,wim_filing.[id_wagon_internal_routes] as id_wir
		,[is_moving] = [IDS].[is_wagon_moving_of_id_wim](wim_filing.[id])
		--> ������ 03.12.2024
		,wf.id as id_filing
		,wf.num_filing
		,wf.type_filing
		,wf.id_division as id_division_filing
		,wf.vesg as vesg_filing
		,wf.note as note_filing
		,wf.start_filing
		,wf.end_filing
		,wf.doc_received as doc_received_filing
		,wf.[create] as create_filing
		,wf.[create_user] as create_user_filing
		,wf.[change] as change_filing
		,wf.[change_user] as change_user_filing
		,wf.[close] as close_filing
		,wf.[close_user] as close_user_filing
		,wir.[num]
		,arr_doc_uz.[nom_doc] as arrival_nom_doc -- ����� ���������(�������)
		,arrival_nom_main_doc = CASE WHEN arr_doc_uz.[nom_main_doc] is not null AND arr_doc_uz.[nom_main_doc]>0 THEN arr_doc_uz.[nom_main_doc] ELSE null END
		,wim_filing.[position] as position		-- ������� ������
		,wim_filing.[way_start] as filing_way_start
		,wim_filing.[way_end] as filing_way_end
		,wim_filing.[filing_start]
		,wim_filing.[filing_end]
		,wim_filing.[create] as filing_wim_create
		,wim_filing.[create_user] as filing_wim_create_user
		,wim_filing.[close] as filing_wim_close
		,wim_filing.[close_user] as filing_wim_close_user
		--> ������� ��������
		,wim_filing.[id_station] as filing_id_station
		,dir_station_filing.[station_name_ru] as filing_station_name_ru
		,dir_station_filing.[station_name_en] as filing_station_name_en
		,dir_station_filing.[station_abbr_ru] as filing_station_abbr_ru
		,dir_station_filing.[station_abbr_en] as filing_station_abbr_en
		--> ����
		,dir_way_filing.[id_park] as filing_id_park
		,dir_park_filing.[park_name_ru] as filing_park_name_ru
		,dir_park_filing.[park_name_en] as filing_park_name_en
		,dir_park_filing.[park_abbr_ru] as filing_park_abbr_ru
		,dir_park_filing.[park_abbr_en] as filing_park_abbr_en
		--> ���� ��������
		,wim_filing.[id_way] as filing_id_way
		,dir_way_filing.[way_num_ru] as filing_way_num_ru
		,dir_way_filing.[way_num_en] as filing_way_num_en
		,dir_way_filing.[way_name_ru] as filing_way_name_ru
		,dir_way_filing.[way_name_en] as filing_way_name_en
		,dir_way_filing.[way_abbr_ru] as filing_way_abbr_ru
		,dir_way_filing.[way_abbr_en] as filing_way_abbr_en
		,dir_way_filing.[capacity] as filing_way_capacity
		,dir_way_filing.[id_devision] as filing_way_id_devision
		,dir_way_filing.[way_close] as filing_way_close
		,dir_way_filing.[way_delete] as filing_way_delete
		,dir_way_filing.[note] as filing_way_note
		--> ���
		,wf.[id_division] as filing_division_id_division		
		,dir_division.code as filing_division_code
		,dir_division.name_division_ru as filing_division_name_ru
		,dir_division.name_division_en as filing_division_name_en
		,dir_division.division_abbr_ru as filing_division_abbr_ru
		,dir_division.division_abbr_en as filing_division_abbr_en
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
		--> ��� ������
		,dir_type.type_ru as wagon_type_ru
		,dir_type.type_en as wagon_type_en
		--> ���������� ������ �� ������
		,dir_wagon.[gruzp] as wagon_gruzp
		,dir_wagon.[tara] as wagon_tara
		,dir_wagon.[kol_os] as wagon_kol_os
		,dir_wagon.[usl_tip] as wagon_usl_tip
		,dir_wagon.[date_rem_uz] as wagon_date_rem_uz
		,dir_wagon.[date_rem_vag] as wagon_date_rem_vag
		,dir_wagon.[sign] as wagon_sign
		,dir_wagon.[factory_number] as wagon_factory_number
		,dir_wagon.[inventory_number] as wagon_inventory_number
		,dir_wagon.[year_built] as wagon_year_built
		,dir_wagon.[exit_ban] as wagon_exit_ban
		,dir_wagon.[note] as wagon_note
		,dir_wagon.[closed_route] as wagon_closed_route
		,dir_wagon.[new_construction] as wagon_new_construction
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
		,dir_group_operator.[group] as operator_group
		--> �����������
		,dir_limload.[id] as id_limiting_loading
		,dir_limload.[limiting_name_ru]
		,dir_limload.[limiting_name_en]
		,dir_limload.[limiting_abbr_ru]
		,dir_limload.[limiting_abbr_en]
		--> �������� �� ��������
		,arr_doc_vag.id_condition as arrival_condition_id_condition
		,arr_dir_cond.condition_name_ru as arrival_condition_name_ru
		,arr_dir_cond.condition_name_en as arrival_condition_name_en
		,arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru
		,arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en
		,arr_dir_cond.red as arrival_condition_red
		--> �������� �� ������� ��������
		,wio.id_condition as current_condition_id_condition
		,cur_dir_cond.condition_name_ru as current_condition_name_ru
		,cur_dir_cond.condition_name_en as current_condition_name_en
		,cur_dir_cond.condition_abbr_ru as current_condition_abbr_ru
		,cur_dir_cond.condition_abbr_en as current_condition_abbr_en
		,cur_dir_cond.red as current_condition_red
		--> ���� �� ��������
		,arr_dir_cargo.id_group as arrival_cargo_group_id_group
		,arr_dir_group_cargo.cargo_group_name_ru as arrival_cargo_group_name_ru
		,arr_dir_group_cargo.cargo_group_name_en as arrival_cargo_group_name_en
		,arr_doc_vag.id_cargo as arrival_cargo_id_cargo
		,arr_dir_cargo.cargo_name_ru as arrival_cargo_name_ru
		,arr_dir_cargo.cargo_name_en as arrival_cargo_name_en
		--> ���������������� ������
		,arr_dir_certif.[id] as arrival_id_sertification_data
		,arr_dir_certif.[certification_data_ru] as arrival_sertification_data_ru
		,arr_dir_certif.[certification_data_en] as arrival_sertification_data_en
		--> ������� �����������
		,arr_dir_ext_station.code as arrival_station_from_code
		,arr_dir_ext_station.station_name_ru as arrival_station_from_name_ru
		,arr_dir_ext_station.station_name_en as arrival_station_from_name_en
		--> ������� ����������
		,arr_doc_vag.id_station_on_amkr as arrival_station_amkr_id_station
		,arr_dir_station_amkr.station_name_ru as arrival_station_amkr_name_ru
		,arr_dir_station_amkr.station_name_en as arrival_station_amkr_name_en
		,arr_dir_station_amkr.station_abbr_ru as arrival_station_amkr_abbr_ru
		,arr_dir_station_amkr.station_abbr_en as arrival_station_amkr_abbr_en
		--> ��� ����������
		,arr_doc_vag.id_division_on_amkr as arrival_division_amkr_id_division
		,arr_dir_division_amkr.code as arrival_division_amkr_code
		,arr_dir_division_amkr.name_division_ru as arrival_division_amkr_name_ru
		,arr_dir_division_amkr.name_division_en as arrival_division_amkr_name_en
		,arr_dir_division_amkr.division_abbr_ru as arrival_division_amkr_abbr_ru
		,arr_dir_division_amkr.division_abbr_en as arrival_division_amkr_abbr_en
		--> ��������� ��������
		,cur_load.[id] as current_id_loading_status
		,cur_load.[loading_status_ru] as current_loading_status_ru
		,cur_load.[loading_status_en] as current_loading_status_en
		--> ������� ��������
		,cur_dir_operation.[id] as current_id_operation
		,cur_dir_operation.[operation_name_ru] as current_operation_name_ru
		,cur_dir_operation.[operation_name_en] as current_operation_name_en
		,wio.[operation_start] as current_operation_start
		,wio.[operation_end] as current_operation_end
		--> ������� ���������� �� ����������� ����� �� ����
		--move_cargo
		,wimc_curr.[internal_doc_num]
		,wimc_curr.[id_weighing_num]
		,wimc_curr.[doc_received] as move_cargo_doc_received
		--> ������� ���� �����������
		,curr_dir_cargo.id_group as current_cargo_id_group
		,curr_dir_group_cargo.cargo_group_name_ru as current_cargo_group_name_ru
		,curr_dir_group_cargo.cargo_group_name_en as current_cargo_group_name_en
		,wimc_curr.[id_cargo] as current_cargo_id_cargo
		,curr_dir_cargo.cargo_name_ru as current_cargo_name_ru
		,curr_dir_cargo.cargo_name_en as current_cargo_name_en
		-->
		,curr_dir_int_cargo.id_group as current_internal_cargo_id_group
		,curr_dir_group_int_cargo.cargo_group_name_ru as current_internal_cargo_group_name_ru
		,curr_dir_group_int_cargo.cargo_group_name_en as current_internal_cargo_group_name_en
		,wimc_curr.[id_internal_cargo] as current_internal_cargo_id_internal_cargo
		,curr_dir_int_cargo.cargo_name_ru as current_internal_cargo_name_ru
		,curr_dir_int_cargo.cargo_name_en as current_internal_cargo_name_en
		-->
		,wimc_curr.[vesg] as current_vesg
		--> ������� ������� �����������
		,wimc_curr.[id_station_from_amkr]
		,dir_station_from_amkr.[station_name_ru] as current_station_from_amkr_name_ru
		,dir_station_from_amkr.[station_name_en] as current_station_from_amkr_name_en
		,dir_station_from_amkr.[station_abbr_ru] as current_station_from_amkr_abbr_ru
		,dir_station_from_amkr.[station_abbr_en] as current_station_from_amkr_abbr_en
		--> ������� ��� ��������
		,wimc_curr.[id_division_from]
		,dir_division_from.code as current_division_from_code
		,dir_division_from.name_division_ru as current_division_from_name_ru
		,dir_division_from.name_division_en as current_division_from_name_en
		,dir_division_from.division_abbr_ru as current_division_from_abbr_ru
		,dir_division_from.division_abbr_en as current_division_from_abbr_en
		,wimc_curr.[id_wim_load]
		--> ������� �������������
		,wimc_curr.[id_wim_redirection]
		--> ������� ������� �������
		,wimc_curr.[code_external_station]
		,curr_dir_ext_station.station_name_ru as current_external_station_on_name_ru
		,curr_dir_ext_station.station_name_en as current_external_station_on_name_en
		,wimc_curr.[id_station_on_amkr]
		,dir_station_on_amkr.[station_name_ru] as current_station_on_amkr_name_ru
		,dir_station_on_amkr.[station_name_en] as current_station_on_amkr_name_en
		,dir_station_on_amkr.[station_abbr_ru] as current_station_on_amkr_abbr_ru
		,dir_station_on_amkr.[station_abbr_en] as current_station_on_amkr_abbr_en
		--> ������� ������� ���
		,wimc_curr.[id_division_on]
		,dir_division_on.code as current_division_on_code
		,dir_division_on.name_division_ru as current_division_on_name_ru
		,dir_division_on.name_division_en as current_division_on_name_en
		,dir_division_on.division_abbr_ru as current_division_on_abbr_ru
		,dir_division_on.division_abbr_en as current_division_on_abbr_en
		-->
		,wimc_curr.[id_wim_unload]
		--> 
		,wimc_curr.[create] as move_cargo_create
		,wimc_curr.[create_user] as move_cargo_create_user
		,wimc_curr.[change] as move_cargo_change
		,wimc_curr.[change_user] as move_cargo_change_user
		,wimc_curr.[close] as move_cargo_close
		,wimc_curr.[close_user] as move_cargo_close_user
		--into view_filing
	FROM IDS.WagonFiling as wf 
		--> ������ �����
		INNER JOIN IDS.WagonInternalMovement as wim_filing ON wim_filing.id_filing = wf.id 
		--> ��������� �� ������ ������
		INNER JOIN IDS.WagonInternalRoutes as wir ON wim_filing.id_wagon_internal_routes = wir.id
		--> ������� ��������� �����������
		--INNER JOIN IDS.WagonInternalMovement as curr_wim ON curr_wim.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalMovement] where [id_wagon_internal_routes]= wir.id order by id desc) 
		--> �������� ������		
		LEFT JOIN IDS.WagonInternalOperation as wio_filing  ON wio_filing.[id] = wim_filing.[id_wio]
		--> ������� ��������
		Left JOIN IDS.WagonInternalOperation as wio ON wio.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= wir.id order by id desc)

		--> ������� ������ ��������� ������ 	
		LEFT JOIN [IDS].[WagonInternalMoveCargo] as wimc_curr  ON wimc_curr.[id] = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalMoveCargo] where [id_wagon_internal_routes]= wir.id and [close] is null order by id desc) 

	   --==== �������� � ����� ������ =====================================================================
		--> �������� �� ����
		Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
		--> ��������� �� �������� �� ���� ������
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id 
		--> ��������� �� �������� �� ���� �������
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id

	   --==== ����������� =====================================================================
		--> ���������� �������
		Left JOIN IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num
		--> ���������� ������ ������
		Left JOIN IDS.Directory_Countrys as dir_countrys ON dir_wagon.id_countrys = dir_countrys.id
		--> ���������� ��� ������
		Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
		--> ���������� ��� ������
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
		--> ���������� �����
		Left JOIN IDS.Directory_WagonsRent as cur_dir_rent ON cur_dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
		--> ������� �������� ������
		Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON cur_dir_rent.id_operator =  dir_operator.id
		--> ������� ������ ��������� ������
		Left JOIN IDS.Directory_OperatorsWagonsGroup as dir_group_operator ON dir_operator.id =  dir_group_operator.id_operator
		--> ������� ����������� �������� 
		Left JOIN IDS.Directory_LimitingLoading as dir_limload ON cur_dir_rent.id_limiting =  dir_limload.id
		--> ����������� �������� �� ��������
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition =  arr_dir_cond.id 
		--> ���������� �������� �� ������� ��������
		Left JOIN IDS.Directory_ConditionArrival as cur_dir_cond ON wio.id_condition =  cur_dir_cond.id
		--> ���� �� ��������
		Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id 	
		--> ������ ����� �� ��������
		Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		--> ���������� ���������� ������
		Left JOIN IDS.Directory_CertificationData as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
		--> ���������� ������� ����������� (������� �������)
		Left JOIN IDS.Directory_ExternalStation as arr_dir_ext_station ON arr_doc_uz.code_stn_from =  arr_dir_ext_station.code
		--> ���������� ������� ���� (������� ���������� ����)
		Left JOIN IDS.Directory_Station as arr_dir_station_amkr ON arr_doc_vag.id_station_on_amkr =  arr_dir_station_amkr.id
		--> ���������� ������������� (��� ����������)
		Left JOIN IDS.Directory_Divisions as dir_division ON wf.id_division =  dir_division.id
		--> ���������� ������������� (��� ���������� �� ��������)
		Left JOIN IDS.Directory_Divisions as arr_dir_division_amkr ON arr_doc_vag.id_division_on_amkr =  arr_dir_division_amkr.id
		--> ���������� �������� ��� ������� (������� ��������)
		Left JOIN IDS.Directory_WagonOperations as cur_dir_operation ON wio.id_operation =  cur_dir_operation.id
		--> ���������� �������� ��������
		Left JOIN [IDS].[Directory_WagonLoadingStatus] as cur_load ON wio.id_loading_status = cur_load.id
		----> ���������� �������� ��� ������� (� ������)
		--Left JOIN IDS.Directory_WagonOperations as filing_dir_operation ON wio_filing.id_operation =  cur_dir_operation.id
		----> ���������� �������� �������� (� ������)
		--Left JOIN [IDS].[Directory_WagonLoadingStatus] as filing_load ON wio_filing.id_loading_status = cur_load.id
		-- ���������� ������� ��������
		Left JOIN [IDS].[Directory_Station] as dir_station_filing ON wim_filing.[id_station] = dir_station_filing.id
		--> ��������� ���� ��������
		Left JOIN [IDS].[Directory_Ways] as dir_way_filing ON wim_filing.[id_way] = dir_way_filing.id 
		--> ��������� ���� ��������
		Left JOIN [IDS].[Directory_ParkWays] as dir_park_filing ON dir_way_filing.id_park = dir_park_filing.id
		--> ���� �������
		Left JOIN IDS.Directory_Cargo as curr_dir_cargo ON curr_dir_cargo.id =  wimc_curr.[id_cargo]
		--> ������ �������� �����.
		Left JOIN IDS.Directory_CargoGroup as curr_dir_group_cargo ON curr_dir_group_cargo.id = curr_dir_cargo.id_group
		--> ����(����������) �������
		Left JOIN IDS.[Directory_InternalCargo] as curr_dir_int_cargo ON curr_dir_int_cargo.id = wimc_curr.[id_internal_cargo]
		--> ������ �����(�����������) �������
		Left JOIN IDS.[Directory_InternalCargoGroup] as curr_dir_group_int_cargo ON curr_dir_group_int_cargo.id = curr_dir_int_cargo.[id_group]
		-- ���������� ������� ��������
		Left JOIN [IDS].[Directory_Station] as dir_station_from_amkr ON dir_station_from_amkr.id = wimc_curr.[id_station_from_amkr]
		--> ���������� ������������� (��� �����������)
		Left JOIN IDS.Directory_Divisions as dir_division_from ON dir_division_from.id = wimc_curr.[id_division_from]
		--> ���������� ������� ����������� (������� ������� ���������)
		Left JOIN IDS.Directory_ExternalStation as curr_dir_ext_station ON curr_dir_ext_station.code = wimc_curr.[code_external_station]
		-- ���������� ������� ��������
		Left JOIN [IDS].[Directory_Station] as dir_station_on_amkr ON dir_station_on_amkr.id = wimc_curr.[id_station_on_amkr]
		--> ���������� ������������� (��� �����������)
		Left JOIN IDS.Directory_Divisions as dir_division_on ON dir_division_on.id = wimc_curr.[id_division_on]

	where ((wf.[create] is not null and wf.[close] is null) or (wf.[create] >= @start and wf.[create]<=@stop))
	and wim_filing.id_station = @id_station	
	--and wir.num = 63664924
	ORDER BY wf.[create], wim_filing.position 
	


