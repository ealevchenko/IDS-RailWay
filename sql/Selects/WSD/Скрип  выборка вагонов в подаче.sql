--use [KRR-PA-CNT-Railway]
use [KRR-PA-CNT-Railway-Archive]
declare @id_station int = 7
declare @start datetime = convert(datetime,'2024-10-01',120);
declare @stop datetime = convert(datetime,'2024-10-30',120);

select * from [IDS].[get_view_wagons_filing_of_period_id_station](@start,@stop,@id_station)

	SELECT
		--> Âíóòğåíåå ïåğåìåùåíèå
		wim_filing.[id] as id_wim
		,wim_filing.[id_wagon_internal_routes] as id_wir
		,curr_wim.[id] as curr_id_wim
		,wf.[id] as id_wf
		,wf.[num_filing]
		,wf.[note]
		,wf.[start_filing]
		,wf.[end_filing]
		,wf.[create] as filing_create
		,wf.[create_user] as filing_create_user
		,wf.[change] as filing_change
		,wf.[change_user] as filing_change_user
		,wf.[close] as filing_close
		,wf.[close_user] as filing_close_user
		,wir.[num]
		,wim_filing.[position] as position		-- Ïîçèöèÿ âàãîíà
		,wim_filing.[way_start] as filing_way_start
		,wim_filing.[way_end] as filing_way_end
		,wim_filing.[filing_start]
		,wim_filing.[filing_end]
		,wim_filing.[create] as filing_wim_create
		,wim_filing.[create_user] as filing_wim_create_user
		,wim_filing.[close] as filing_wim_close
		,wim_filing.[close_user] as filing_wim_close_user
		--> Ñòàíöèÿ îòïğàâêè
		,wim_filing.[id_station] as filing_id_station
		,dir_station_filing.[station_name_ru] as filing_station_name_ru
		,dir_station_filing.[station_name_en] as filing_station_name_en
		,dir_station_filing.[station_abbr_ru] as filing_station_abbr_ru
		,dir_station_filing.[station_abbr_en] as filing_station_abbr_en
		--> Ïàğê
		,dir_way_filing.[id_park] as filing_id_park
		,dir_park_filing.[park_name_ru] as filing_park_name_ru
		,dir_park_filing.[park_name_en] as filing_park_name_en
		,dir_park_filing.[park_abbr_ru] as filing_park_abbr_ru
		,dir_park_filing.[park_abbr_en] as filing_park_abbr_en
		--> Ïóòü îòïğàâêè
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
		--> Öåõ
		,wf.[id_division] as filing_division_id_division		
		,dir_division.code as filing_division_code
		,dir_division.name_division_ru as filing_division_name_ru
		,dir_division.name_division_en as filing_division_name_en
		,dir_division.division_abbr_ru as filing_division_abbr_ru
		,dir_division.division_abbr_en as filing_division_abbr_en
		--> Àäìèíèñòğàöèÿ
		,dir_countrys.code_sng as wagon_adm
		,dir_countrys.countrys_name_ru as wagon_adm_name_ru
		,dir_countrys.countrys_name_en as wagon_adm_name_en
		,dir_countrys.country_abbr_ru as wagon_adm_abbr_ru
		,dir_countrys.country_abbr_en as wagon_adm_abbr_en
		--> Ğîä âàãîíà
		,dir_rod.rod_uz as wagon_rod
		,dir_rod.genus_ru as wagon_rod_name_ru
		,dir_rod.genus_en as wagon_rod_name_en
		,dir_rod.abbr_ru as wagon_rod_abbr_ru
		,dir_rod.abbr_en as wagon_rod_abbr_en
		--> Òèï âàãîíà
		,dir_type.type_ru as wagon_type_ru
		,dir_type.type_en as wagon_type_en
		--> Îïåğàòîğ
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
		--> Îãğàíè÷åíèå
		,dir_limload.[id] as id_limiting_loading
		,dir_limload.[limiting_name_ru]
		,dir_limload.[limiting_name_en]
		,dir_limload.[limiting_abbr_ru]
		,dir_limload.[limiting_abbr_en]
		--> Ğàçìåòêà ïî ïğèáûòèş
		,arr_doc_vag.id_condition as arrival_condition_id_condition
		,arr_dir_cond.condition_name_ru as arrival_condition_name_ru
		,arr_dir_cond.condition_name_en as arrival_condition_name_en
		,arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru
		,arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en
		,arr_dir_cond.red as arrival_condition_red
		--> Ğàçìåòêà ïî òåêóùåé îïåğàöèè
		,wio_filing.id_condition as current_condition_id_condition
		,cur_dir_cond.condition_name_ru as current_condition_name_ru
		,cur_dir_cond.condition_name_en as current_condition_name_en
		,cur_dir_cond.condition_abbr_ru as current_condition_abbr_ru
		,cur_dir_cond.condition_abbr_en as current_condition_abbr_en
		,cur_dir_cond.red as current_condition_red
		--> ãğóç ïî ïğèáûòèş
		,arr_dir_cargo.id_group as arrival_cargo_group_id_group
		,arr_dir_group_cargo.cargo_group_name_ru as arrival_cargo_group_name_ru
		,arr_dir_group_cargo.cargo_group_name_en as arrival_cargo_group_name_en
		,arr_doc_vag.id_cargo as arrival_cargo_id_cargo
		,arr_dir_cargo.cargo_name_ru as arrival_cargo_name_ru
		,arr_dir_cargo.cargo_name_en as arrival_cargo_name_en
		--> Ñåğòèôèêàöèîííûå äàííûå
		,arr_dir_certif.[id] as arrival_id_sertification_data
		,arr_dir_certif.[certification_data_ru] as arrival_sertification_data_ru
		,arr_dir_certif.[certification_data_en] as arrival_sertification_data_en
		--> Ñòàíöèÿ îòïğàâèòåëü
		,arr_dir_ext_station.code as arrival_station_from_code
		,arr_dir_ext_station.station_name_ru as arrival_station_from_name_ru
		,arr_dir_ext_station.station_name_en as arrival_station_from_name_en
		--> Ñòàíöèÿ íàçíà÷åíèÿ
		,arr_doc_vag.id_station_on_amkr as arrival_station_amkr_id_station
		,arr_dir_station_amkr.station_name_ru as arrival_station_amkr_name_ru
		,arr_dir_station_amkr.station_name_en as arrival_station_amkr_name_en
		,arr_dir_station_amkr.station_abbr_ru as arrival_station_amkr_abbr_ru
		,arr_dir_station_amkr.station_abbr_en as arrival_station_amkr_abbr_en
		--> Öåõ ïîëó÷àòåëü
		,arr_doc_vag.id_division_on_amkr as arrival_division_amkr_id_division
		,arr_dir_division_amkr.code as arrival_division_amkr_code
		,arr_dir_division_amkr.name_division_ru as arrival_division_amkr_name_ru
		,arr_dir_division_amkr.name_division_en as arrival_division_amkr_name_en
		,arr_dir_division_amkr.division_abbr_ru as arrival_division_amkr_abbr_ru
		,arr_dir_division_amkr.division_abbr_en as arrival_division_amkr_abbr_en
		--> Ñîñòîÿíèå çàãğóçêè
		,cur_load.[id] as current_id_loading_status
		,cur_load.[loading_status_ru] as current_loading_status_ru
		,cur_load.[loading_status_en] as current_loading_status_en
				--> Òåêóùàÿ îïåğàöèÿ
		,cur_dir_operation.[id] as current_id_operation
		,cur_dir_operation.[operation_name_ru] as current_operation_name_ru
		,cur_dir_operation.[operation_name_en] as current_operation_name_en
		,wio_filing.[operation_start] as current_operation_start
		,wio_filing.[operation_end] as current_operation_end
		--> ãğóç ïî òåêóùèé
		,current_cargo_group_id_group = null
		,current_cargo_group_name_ru = null
		,current_cargo_group_name_en = null
		,current_cargo_id_cargo = null
		,current_cargo_name_ru = null
		,current_cargo_name_en = null
		--> Öåõ ïîëó÷àòåëü òåêóùèé
		,current_division_amkr_id_division = null
		,current_division_amkr_code = null
		,current_division_amkr_name_ru = null
		,current_division_amkr_name_en = null
		,current_division_amkr_abbr_ru = null
		,current_division_amkr_abbr_en = null
		--> Ñòàíöèÿ íàçíà÷åíèÿ òåêóùàÿ
		,current_station_amkr_id_station = null
		,current_station_amkr_name_ru = null
		,current_station_amkr_name_en = null
		,current_station_amkr_abbr_ru = null
		,current_station_amkr_abbr_en = null
	FROM IDS.WagonFiling as wf 
		--> Ñïèñîê ïîäà÷
		INNER JOIN IDS.WagonInternalMovement as wim_filing ON wim_filing.id_filing = wf.id 
		--> ïîëîæåíèå íà ìîìåíò ïîäà÷è
		INNER JOIN IDS.WagonInternalRoutes as wir ON wim_filing.id_wagon_internal_routes = wir.id
		--> Òåêóùåå âíåòğåíåå ïåğåìåùåíèå
		INNER JOIN IDS.WagonInternalMovement as curr_wim ON curr_wim.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalMovement] where [id_wagon_internal_routes]= wir.id order by id desc) 
		--> Îïåğàöèÿ ïîäà÷è		
		LEFT JOIN IDS.WagonInternalOperation as wio_filing  ON wio_filing.[id] = wim_filing.[id_wio]
	   --==== ÏĞÈÁÛÒÈÅ È ÏĞÈÅÌ ÂÀÃÎÍÀ =====================================================================
		--> Ïğèáûòèå íà ÀÌÊĞ
		Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
		--> Äîêóìåíòû ïî ïğèáûòèş íà ÀÌÊĞ âàãîíà
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id 
		--> Äîêóìåíòû ïî ïğèáûòèş íà ÀÌÊĞ ñîñòàâà
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id

	   --==== ÑÏĞÀÂÎ×ÍÈÊÈ =====================================================================
		--> Ñïğàâî÷íèê âàãîíîâ
		Left JOIN IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num
		--> Ñïğàâî÷íèê Ñòğàíà âàãîíà
		Left JOIN IDS.Directory_Countrys as dir_countrys ON dir_wagon.id_countrys = dir_countrys.id
		--> Ñïğàâî÷íèê Òèï âàãîíà
		Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
		--> Ñïğàâî÷íèê Ğîä âàãîíà
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
		--> Ñïğàâî÷íèê àğåíä
		Left JOIN IDS.Directory_WagonsRent as cur_dir_rent ON cur_dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
		--> Òåêóùèé îïåğàòîğ âàãîíà
		Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON cur_dir_rent.id_operator =  dir_operator.id	
		--> Òåêóùåå îãğàíè÷åíèå ïîãğóçêè 
		Left JOIN IDS.Directory_LimitingLoading as dir_limload ON cur_dir_rent.id_limiting =  dir_limload.id
		--> Òåõíè÷åñêîå ñîòîÿíèå ïî ïğèáûòèş
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition =  arr_dir_cond.id 
		--> Ñïğàâî÷íèê Ğàçìåòêà ïî òåêóùåé îïåğàöèè
		Left JOIN IDS.Directory_ConditionArrival as cur_dir_cond ON wio_filing.id_condition =  cur_dir_cond.id
		--> Ãğóç ïî ïğèáûòèş
		Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id 	
		--> Ãğóïïà ãğóçà ïî ïğèáûòèş
		Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		--> Ñïğàâî÷íèê Ñåğòèôèêàò äàííûå
		Left JOIN IDS.Directory_CertificationData as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
		--> Ñïğàâî÷íèê Ñòàíöèÿ îòïğàâëåíèÿ (Âíåøíÿÿ ñòàíöèÿ)
		Left JOIN IDS.Directory_ExternalStation as arr_dir_ext_station ON arr_doc_uz.code_stn_from =  arr_dir_ext_station.code
		--> Ñïğàâî÷íèê Ñòàíöèè ÀÌÊĞ (ñòàíöèÿ íàçíà÷åíèÿ ÀÌÊĞ)
		Left JOIN IDS.Directory_Station as arr_dir_station_amkr ON arr_doc_vag.id_station_on_amkr =  arr_dir_station_amkr.id
		--> Ñïğàâî÷íèê Ïîäğàçäåëåíèÿ (öåõ ïîëó÷àòåëü)
		Left JOIN IDS.Directory_Divisions as dir_division ON wf.id_division =  dir_division.id
		--> Ñïğàâî÷íèê Ïîäğàçäåëåíèÿ (öåõ ïîëó÷àòåëü ïî ïğèáûòèş)
		Left JOIN IDS.Directory_Divisions as arr_dir_division_amkr ON arr_doc_vag.id_division_on_amkr =  arr_dir_division_amkr.id
		--> Ñïğàâî÷íèê Îïåğàöèè íàä âàãîíîì (òåêóùàÿ îïåğàöèÿ)
		Left JOIN IDS.Directory_WagonOperations as cur_dir_operation ON wio_filing.id_operation =  cur_dir_operation.id
		--> Ñïğàâî÷íèê Ñîòîÿíèÿ çàãğóçêè
		Left JOIN [IDS].[Directory_WagonLoadingStatus] as cur_load ON wio_filing.id_loading_status = cur_load.id
		-- Ñïğàâî÷íèê Ñòàíöèÿ îòïğàâêè
		Left JOIN [IDS].[Directory_Station] as dir_station_filing ON wim_filing.[id_station] = dir_station_filing.id
		--> Ñïğàâî÷íè Ïóòü îòïğàâêè
		Left JOIN [IDS].[Directory_Ways] as dir_way_filing ON wim_filing.[id_way] = dir_way_filing.id 
		--> Ñïğàâî÷íè Ïóòü îòïğàâêè
		Left JOIN [IDS].[Directory_ParkWays] as dir_park_filing ON dir_way_filing.id_park = dir_park_filing.id
	where ((wf.[create] is not null and wf.[close] is null) or (wf.[create] >= @start and wf.[create]<=@stop))
	and wim_filing.id_station = @id_station	ORDER BY wf.[create], wim_filing.position	


