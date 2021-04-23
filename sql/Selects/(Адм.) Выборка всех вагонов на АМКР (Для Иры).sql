use [KRR-PA-CNT-Railway]
	SELECT
		-- id основных таблиц
		wir.id as wir_id,
		wim.id as wim_id,
		cur_wio.id as wio_id,
		--дислокация вагона
		wim.position,
		wir.num,
		--> Основная информация по вагону
		-- страна
		dir_countrys.code_sng as wagon_adm,
		dir_countrys.countrys_name_ru as wagon_adm_name_ru,
		dir_countrys.countrys_name_en as wagon_adm_name_en,
		dir_countrys.country_abbr_ru as wagon_adm_abbr_ru,
		dir_countrys.country_abbr_en as wagon_adm_abbr_en,
		-- род вагона
		dir_rod.rod_uz as wagon_rod,
		dir_rod.genus_ru as wagon_rod_name_ru,
		dir_rod.genus_en as wagon_rod_name_en,
		dir_rod.abbr_ru as wagon_rod_abbr_ru,
		dir_rod.abbr_en as wagon_rod_abbr_en,
		-- тип вагона
		dir_type.type_ru as wagon_type_ru,
		dir_type.type_en as wagon_type_en,
		-- оператор вагона
		dir_operator.operators_ru as wagon_operators_name_ru,
		dir_operator.operators_en as wagon_operators_name_en,
		dir_operator.abbr_ru as wagon_operators_abbr_ru,
		dir_operator.abbr_en as wagon_operators_abbr_en,
		dir_operator.paid as wagon_operators_paid,
		dir_operator.color as wagon_operators_color,
		cur_dir_rent.rent_start as wagon_operators_rent_start,
		-- Ограничение погрузки вагона
		dir_limload.limiting_name_ru as wagon_limiting_name_ru,
		dir_limload.limiting_name_en as wagon_limiting_name_en,
		dir_limload.limiting_abbr_ru as wagon_limiting_abbr_ru,
		dir_limload.limiting_abbr_en as wagon_limiting_abbr_en,
		-- грузоподъемность и тара
		ar_doc_vag.gruzp as wagon_gruzp_doc,
		dir_wagon.gruzp as wagon_gruzp_uz,
		-- тара
		ar_doc_vag.u_tara as wagon_tara_doc,
		ar_doc_vag.ves_tary_arc as wagon_tara_arc_doc,
		dir_wagon.tara as wagon_tara_uz,
		-- дата ремонта
		dir_wagon.date_rem_uz as wagon_date_rem_uz,
		--> ПРИБЫТИЕ И МАРШРУТ
		ar_sost.date_arrival as arrival_datetime,
		[arrival_duration] = DATEDIFF (hour, ar_sost.date_arrival, getdate()),
		-- Разметка по прибытию
		arr_dir_cond.condition_name_ru as arrival_condition_name_ru,
		arr_dir_cond.condition_name_en as arrival_condition_name_en,
		arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru,
		arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en,
		arr_dir_cond.red as arrival_condition_red,
		-- груз по прибытию
		arr_dir_group_cargo.cargo_group_name_ru as arrival_cargo_group_name_ru,
		arr_dir_group_cargo.cargo_group_name_en as arrival_cargo_group_name_en,
		arr_dir_cargo.cargo_name_ru as arrival_cargo_name_ru,
		arr_dir_cargo.cargo_name_en as arrival_cargo_name_en,
		-- сертификац данные
		arr_dir_certif.certification_data_ru as arrival_certification_data_ru,
		arr_dir_certif.certification_data_en as arrival_certification_data_en,
		-- вес
		ar_doc_vag.vesg as arrival_vesg_doc,
		ar_doc_vag.vesg_reweighing as arrival_vesg_reweighing,
		-- Станция отправитель
		arr_dir_ext_station.code as arrival_station_from_code,
		arr_dir_ext_station.station_name_ru as arrival_station_from_name_ru,
		arr_dir_ext_station.station_name_en as arrival_station_from_name_en,
		-- Станция назначения
		arr_dir_station_amkr.station_name_ru as arrival_station_amkr_name_ru,
		arr_dir_station_amkr.station_name_en as arrival_station_amkr_name_en,
		arr_dir_station_amkr.station_abbr_ru as arrival_station_amkr_abbr_ru,
		arr_dir_station_amkr.station_abbr_en as arrival_station_amkr_abbr_en,
		-- Цех получатель
		arr_dir_division_amkr.code as arrival_division_amkr_code,
		arr_dir_division_amkr.name_division_ru as arrival_division_amkr_name_ru,
		arr_dir_division_amkr.name_division_en as arrival_division_amkr_name_en,
		arr_dir_division_amkr.division_abbr_ru as arrival_division_amkr_abbr_ru,
		arr_dir_division_amkr.division_abbr_en as arrival_division_amkr_abbr_en,
		--> ТЕКУЩАЯ ОПЕРАЦИЯ
		-- операция над вагоном
		cur_wio.id_operation as current_id_operation_wagon,
		cur_dir_operation.operation_name_ru as current_operation_wagon_name_ru,
		cur_dir_operation.operation_name_en as current_operation_wagon_name_en,
		cur_wio.operation_start as current_operation_wagon_start,
		cur_wio.operation_end as current_operation_wagon_end,
		cur_dir_operation.busy as current_operation_wagon_busy,
		cur_wio.[create] as current_operation_wagon_create,
		cur_wio.create_user as current_operation_wagon_create_user,
		cur_wio.[close] as current_operation_wagon_close,
		cur_wio.close_user as current_operation_wagon_close_user,
		--> состояние загрузки
		cur_dir_load_status.loading_status_ru as current_loading_status_ru,
		cur_dir_load_status.loading_status_en as current_loading_status_en,
		-- текущий Тех осмотр
		cur_dir_cond.condition_name_ru as current_condition_name_ru,
		cur_dir_cond.condition_name_en as current_condition_name_en,
		cur_dir_cond.condition_abbr_ru as current_condition_abbr_ru,
		cur_dir_cond.condition_abbr_en as current_condition_abbr_en,
		cur_dir_cond.red as current_condition_red,
		--> ТЕКУЩАЯ ДИСЛОКАЦИЯ
		-- Текущая станция
		cur_dir_station.station_name_ru as current_station_amkr_name_ru,
		cur_dir_station.station_name_en as current_station_amkr_name_en,
		cur_dir_station.station_abbr_ru as current_station_amkr_abbr_ru,
		cur_dir_station.station_abbr_en as current_station_amkr_abbr_en,
		cur_dir_station.idle_time as current_station_amkr_idle_time,
		current_station_amkr_start = null,      -- !!! Определить по началу пути
		[current_station_amkr_duration] = 0, --!!! переделать расчет DATEDIFF (hour, wim.station_start, getdate()),
		--> текущий путь
		cur_dir_ways.way_num_ru as current_way_amkr_num_ru,
		cur_dir_ways.way_num_en as current_way_amkr_num_en,
		cur_dir_ways.way_name_ru as current_way_amkr_name_ru,
		cur_dir_ways.way_name_en as current_way_amkr_name_en,
		cur_dir_ways.way_abbr_ru as current_way_amkr_abbr_ru, 
		cur_dir_ways.way_abbr_en as current_way_amkr_abbr_en,
		wim.way_start as current_way_amkr_start,
		[current_way_amkr_duration] = DATEDIFF (hour, wim.way_start, getdate()),
		wim.[create] as current_wim_create,
		wim.create_user as current_wim_create_user,
		-- Оплата
		[usage_fee] = 0.0,
		--> ОТПРАВЛЕНИЕ
		out_sostav.status as out_sostav_status,
		-- Инструктивные письма
		il.num as instructional_letters_num,
		il.dt as instructional_letters_datetime,
		il.destination_station as instructional_letters_station,
		let_station_uz.station as instructional_letters_station_name,
		--> Документ SAP по прибытию
		sap_is.VBELN as sap_is_num,
		sap_is.ERDAT as sap_is_create_date,
		sap_is.ETIME as sap_is_create_time,
		-- Документ SAP по отправке
		wir.doc_outgoing_car as sap_os_doc_outgoing_car
		--......
		--into view_wagon
		FROM IDS.WagonInternalMovement as wim INNER JOIN
			IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id Left JOIN
			IDS.WagonInternalOperation as cur_wio ON cur_wio.id = (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= wim.id_wagon_internal_routes order by id desc)  Left JOIN
			--> Прибытие
			IDS.ArrivalCars as ar_car ON wir.id_arrival_car = ar_car.id Left JOIN -- Прибытие
			IDS.ArrivalSostav as ar_sost ON ar_car.id_arrival = ar_sost.id Left JOIN
			--> Документы по прибытию
			IDS.Arrival_UZ_Vagon as ar_doc_vag ON ar_car.id_arrival_uz_vagon = ar_doc_vag.id Left JOIN
			IDS.Arrival_UZ_Document as ar_doc_uz ON ar_doc_vag.id_document = ar_doc_uz.id Left JOIN
			-- Справочник вагонов
			IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num  Left JOIN
			IDS.Directory_WagonsRent as cur_dir_rent ON cur_dir_rent.id = (SELECT top(1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc) Left JOIN
			-- Письма
			IDS.InstructionalLettersWagon as ilw  ON ilw.id = (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[InstructionalLettersWagon] where [num] =wir.num and [close] is null order by id desc)  left JOIN	
			IDS.InstructionalLetters as il ON ilw.id_instructional_letters = il.id  Left JOIN	
			-- SAP Входящая поставка
			IDS.SAPIncomingSupply as sap_is ON wir.id_sap_incoming_supply = sap_is.id  Left JOIN	
			-- Справочники 
			IDS.Directory_Countrys as dir_countrys ON dir_wagon.id_countrys = dir_countrys.id Left JOIN								--> Страна вагона
			IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id Left JOIN											--> Род вагона
			IDS.Directory_TypeWagons as dir_type ON ar_doc_vag.id_type =  dir_type.id Left JOIN											--> Тип вагона
			IDS.Directory_OperatorsWagons as dir_operator ON cur_dir_rent.id_operator =  dir_operator.id  Left JOIN                     --> Текущий оператор вагона
			IDS.Directory_LimitingLoading as dir_limload ON cur_dir_rent.id_limiting =  dir_limload.id Left JOIN                       --> Текущее ограничение погрузки
			IDS.Directory_ConditionArrival as arr_dir_cond ON ar_doc_vag.id_condition =  arr_dir_cond.id Left JOIN                     --> Техническое сотояние по прибытию
			IDS.Directory_Cargo as arr_dir_cargo ON ar_doc_vag.id_cargo =  arr_dir_cargo.id  Left JOIN                                 --> Груз по прибытию
			IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id Left JOIN               --> Группа груза по прибытию
			IDS.Directory_CertificationData as arr_dir_certif ON ar_doc_vag.id_certification_data =  arr_dir_certif.id Left JOIN       --> Сертификат данные по прибытию
			IDS.Directory_ExternalStation as arr_dir_ext_station ON ar_doc_uz.code_stn_from =  arr_dir_ext_station.code Left JOIN       --> Станция отправления по прибытию
			IDS.Directory_Station as arr_dir_station_amkr ON ar_doc_vag.id_station_on_amkr =  arr_dir_station_amkr.id Left JOIN         --> Станция назначения АМКР по прибытию
			IDS.Directory_Divisions as arr_dir_division_amkr ON ar_doc_vag.id_division_on_amkr =  arr_dir_division_amkr.id Left JOIN    --> Цех назначения АМКР по прибытию
			IDS.Directory_WagonOperations as cur_dir_operation ON cur_wio.id_operation =  cur_dir_operation.id Left JOIN                --> Текущая операция над вагоном
			IDS.Directory_WagonLoadingStatus as cur_dir_load_status ON cur_wio.id_loading_status =  cur_dir_load_status.id Left JOIN    --> Текущее состояние загрузки вагона
			IDS.Directory_Station as cur_dir_station ON wim.id_station =  cur_dir_station.id Left JOIN                                  --> Текущая станция дислокации вагона
			IDS.Directory_ConditionArrival as cur_dir_cond ON cur_wio.id_condition =  cur_dir_cond.id  Left JOIN						--> Текущее техническое сотояние
			IDS.Directory_Ways as cur_dir_ways ON wim.id_way =  cur_dir_ways.id Left JOIN
			UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs Left JOIN						--> Станция УЗ по письму
			IDS.OutgoingCars as out_car ON wir.id_outgoing_car = out_car.id Left JOIN													--> Вагон отправка
			IDS.OutgoingSostav as out_sostav ON out_car.id_outgoing = out_sostav.id									--> Станция УЗ по письму

		WHERE (wim.way_end IS NULL) and wim.id_way =0 -- and out_sostav.status =2 --and wir.num = 65297459
		order by wim.position