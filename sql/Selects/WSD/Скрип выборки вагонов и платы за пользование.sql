use [KRR-PA-CNT-Railway-Test]

declare @num int = 56291040;
	SELECT 
		out_car.[id] as outgoing_car_id
		,out_car.[num]
		,out_car.[position] as outgoing_car_position
		,wir.id as id_wir
		--> Общие
		--> Собственник по УЗ
		,dir_owner.[id] as id_owner_wagon
		,dir_owner.[owner_ru] as owner_wagon_ru
		,dir_owner.[owner_en] as owner_wagon_en
		,dir_owner.[abbr_ru] as owner_wagon_abbr_ru
		,dir_owner.[abbr_en] as owner_wagon_abbr_en
		--> Администрация
		,dir_countrys.code_sng as wagon_adm		
		,dir_countrys.countrys_name_ru as wagon_adm_name_ru
		,dir_countrys.countrys_name_en as wagon_adm_name_en
		,dir_countrys.country_abbr_ru as wagon_adm_abbr_ru
		,dir_countrys.country_abbr_en as wagon_adm_abbr_en
		--> Род вагона
		,dir_rod.rod_uz as wagon_rod
		,dir_rod.genus_ru as wagon_rod_name_ru
		,dir_rod.genus_en as wagon_rod_name_en
		,dir_rod.abbr_ru as wagon_rod_abbr_ru
		,dir_rod.abbr_en as wagon_rod_abbr_en
		--> Тип вагона
		,dir_type.type_ru as wagon_type_ru
		,dir_type.type_en as wagon_type_en
		,dir_wagon.[gruzp] as wagon_gruzp
		,dir_wagon.[tara] as wagon_tara
		,dir_wagon.[kol_os] as wagon_kol_os
		,dir_wagon.[usl_tip] as wagon_usl_tip
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
		--=========================================================================================
		--> ПРИБЫТИЕ СОСТАВА [IDS].[ArrivalSostav]
		,arr_sost.[id] as arrival_sostav_id
		,arr_sost.[num_doc] as arrival_sostav_num_doc
		,arr_sost.[date_arrival] as arrival_sostav_date_arrival
		,arr_sost.[date_adoption] as arrival_sostav_date_adoption
		,arr_sost.[date_adoption_act] as arrival_sostav_date_adoption_act
		--> СПРАВОЧНИК ГРУЗА IDS.Directory_Cargo
		,arr_doc_vag.[id_cargo] as arrival_uz_vagon_id_cargo
		,arr_dir_cargo.cargo_name_ru as arrival_uz_vagon_cargo_name_ru
		,arr_dir_cargo.cargo_name_en as arrival_uz_vagon_cargo_name_en
		,arr_dir_cargo.empty_weight as arrival_uz_vagon_cargo_empty_weight
		--> СПРАВОЧНИК ГРУППА ГРУЗА [IDS].[Directory_CargoGroup]	
		,arr_dir_cargo.[id_group] as arrival_uz_vagon_id_group							-- id группа груза [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_ru as arrival_uz_vagon_cargo_group_name_ru	-- Группа грузов [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_en as arrival_uz_vagon_cargo_group_name_en	-- Группа грузов [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> Признак возвратный вагон
		,arr_doc_vag.[cargo_returns] as arrival_uz_vagon_cargo_returns
		--> ДОКУМЕНТ НА СОСТАВ ПО ПРИБЫТИЮ [IDS].[Arrival_UZ_Document]
		,arr_doc_uz.[id]  as arrival_uz_document_id
		,arr_doc_uz.[id_doc_uz]  as arrival_uz_document_id_doc_uz
		,arr_doc_uz.[nom_doc]  as arrival_uz_document_nom_doc
		,arr_doc_uz.[nom_main_doc]  as arrival_uz_document_nom_main_doc
		--> [IDS].[Directory_ExternalStation]
		,arr_doc_uz.[code_stn_from]  as arrival_uz_document_code_stn_from
		,arr_ext_station_from.[station_name_ru] as arrival_uz_document_station_from_name_ru
		,arr_ext_station_from.[station_name_en] as arrival_uz_document_station_from_name_en
		--=========================================================================================
		--> ОТПРАВКА СОСТАВ [IDS].[OutgoingSostav]
		,out_sost.[id] as outgoing_sostav_id
		,out_sost.[num_doc] as outgoing_sostav_num_doc
		,out_sost.[date_outgoing] as outgoing_sostav_date_outgoing
		,out_sost.[date_outgoing_act] as outgoing_sostav_date_outgoing_act
		,out_sost.[date_departure_amkr] as outgoing_sostav_date_departure_amkr
		--> ДОКУМЕНТ НА ВАГОН ПО ОТПРАВКЕ [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[id] as outgoing_uz_vagon_id										-- id строки документа по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[id_condition] as outgoing_uz_vagon_id_condition					-- id строки готовность по отправке [IDS].[Outgoing_UZ_Vagon]
		--> РАЗМЕТКА ПО ПРИБЫТИЮ [IDS].[Directory_ConditionArrival]
		,out_dir_cond.condition_name_ru as outgoing_uz_vagon_condition_name_ru			-- Готовность [IDS].[Directory_ConditionArrival] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cond.condition_name_en as outgoing_uz_vagon_condition_name_en			-- Готовность [IDS].[Directory_ConditionArrival] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cond.condition_abbr_ru as outgoing_uz_vagon_condition_abbr_ru			-- Готовность [IDS].[Directory_ConditionArrival] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cond.condition_abbr_en as outgoing_uz_vagon_condition_abbr_en			-- Готовность [IDS].[Directory_ConditionArrival] по отправке [IDS].[Outgoing_UZ_Vagon]
		--> СПРАВОЧНИК ГРУЗА [IDS].[Directory_Cargo]
		,out_doc_vag.[id_cargo] as outgoing_uz_vagon_id_cargo						-- id груза [IDS].[Directory_Cargo] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo.cargo_name_ru as outgoing_uz_vagon_cargo_name_ru			-- Груз [IDS].[Directory_Cargo] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo.cargo_name_en as outgoing_uz_vagon_cargo_name_en			-- Груз [IDS].[Directory_Cargo] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo.empty_weight as outgoing_uz_vagon_cargo_empty_weight
		--> СПРАВОЧНИК ГРУППА ГРУЗА [IDS].[Directory_CargoGroup]	
		,out_dir_cargo.[id_group] as outgoing_uz_vagon_id_group							-- id группа груза [IDS].[Directory_CargoOutGroup] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_group_cargo.cargo_group_name_ru as outgoing_uz_vagon_cargo_group_name_ru	-- Группа грузов [IDS].[Directory_CargoOutGroup] по отправке [IDS].[Outgoing_UZ_Vagon]
		,out_dir_group_cargo.cargo_group_name_en as outgoing_uz_vagon_cargo_group_name_en	-- Группа грузов [IDS].[Directory_CargoOutGroup] по отправке [IDS].[Outgoing_UZ_Vagon]		
		--> ДОКУМЕНТ НА СОСТАВ ПО ОТПРАВКЕ [IDS].[Outgoing_UZ_Document]
		,out_doc_sostav.[id] as outgoing_uz_document_id
		,out_doc_sostav.[id_doc_uz] as outgoing_uz_document_id_doc_uz
		,out_doc_sostav.[nom_doc] as outgoing_uz_document_nom_doc
		,out_doc_sostav.[code_stn_from] as outgoing_uz_document_code_stn_from
		--> [IDS].[Directory_ExternalStation]
		,out_doc_sostav.[code_stn_to] as outgoing_uz_document_code_stn_to
		,out_ext_station.[station_name_ru] as outgoing_uz_document_station_to_name_ru
		,out_ext_station.[station_name_en] as outgoing_uz_document_station_to_name_en
		--> Плата за пользование
		,wuf.[date_adoption] as usage_fee_date_adoption
		,wuf.[date_outgoing] as usage_fee_date_outgoing
		,wuf.[route] as usage_fee_route
		,wuf.[derailment] as usage_fee_derailment -- сход
		--> Плата за пользование груз прибытия
		,wuf.[inp_cargo] as usage_fee_inp_cargo
		,wuf.[id_cargo_arr] as usage_fee_id_cargo_arr
		,wuf_arr_dir_cargo.cargo_name_ru as usage_fee_arrival_cargo_name_ru
		,wuf_arr_dir_cargo.cargo_name_en as usage_fee_arrival_cargo_name_en
		,wuf_arr_dir_cargo.empty_weight as usage_fee_arrival_cargo_empty_weight
		,wuf.[id_cargo_group_arr] as usage_fee_id_cargo_group_arr
		,wuf_arr_dir_group_cargo.cargo_group_name_ru as usage_fee_arrival_cargo_group_name_ru
		,wuf_arr_dir_group_cargo.cargo_group_name_en as usage_fee_arrival_cargo_group_name_en
		,wuf.[date_start_unload] as usage_fee_date_start_unload
		,wuf.[date_end_unload] as usage_fee_date_end_unload
		--> Плата за пользование груз отправка
		,wuf.[out_cargo] as usage_fee_out_cargo
		,wuf.[id_cargo_out] as usage_fee_id_cargo_out
		,wuf_out_dir_cargo.cargo_name_ru as usage_fee_outgoing_cargo_name_ru
		,wuf_out_dir_cargo.cargo_name_en as usage_fee_outgoing_cargo_name_en
		,wuf_out_dir_cargo.empty_weight as usage_fee_outgoing_cargo_empty_weight
		,wuf.[id_cargo_group_out] as usage_fee_id_cargo_group_out
		,wuf_out_dir_group_cargo.cargo_group_name_ru as usage_fee_outgoing_cargo_group_name_ru
		,wuf_out_dir_group_cargo.cargo_group_name_en as usage_fee_outgoing_cargo_group_name_en
		,wuf.[date_start_load] as usage_fee_date_start_load
		,wuf.[date_end_load] as usage_fee_date_end_load
		--> Плата за пользование станции отправки и прибытия
		,wuf.[code_stn_from] as usage_fee_code_stn_from
		,wuf_arr_ext_station_from.[station_name_ru] as usage_fee_station_from_name_ru
		,wuf_arr_ext_station_from.[station_name_en] as usage_fee_station_from_name_en
		,wuf.[code_stn_to] as usage_fee_code_stn_to
		,wuf_out_ext_station.[station_name_ru] as usage_fee_station_to_name_ru
		,wuf_out_ext_station.[station_name_en] as usage_fee_station_to_name_en
		--> Плата за пользование стадии и периоды
		,wuf.[count_stage] as usage_fee_count_stage
		,wuf.[id_ufp] as usage_fee_id_ufp
		,wuf.[id_upfpd] as usage_fee_id_upfpd
		--> Плата за пользование ставка
		,wuf.[id_currency] as usage_fee_id_currency
		,wuf_cur.currency_ru as usage_fee_currency_ru
		,wuf_cur.currency_en as usage_fee_currency_en
		,wuf_cur.code as usage_fee_currency_code
		,wuf_cur.code_cc as usage_fee_currency_code_cc
		,wuf.[rate] as usage_fee_rate
		,wuf.[exchange_rate] as usage_fee_exchange_rate
		,wuf.[coefficient] as usage_fee_coefficient
		,wuf.[grace_time] as usage_fee_grace_time
		--> Плата за пользование расчеты
		,wuf.[calc_date_start] as usage_fee_calc_date_start
		,wuf.[calc_date_end] as usage_fee_calc_date_end
		,wuf.[downtime] as usage_fee_downtime
		,wuf.[use_time] as usage_fee_use_time
		,wuf.[calc_time] as usage_fee_calc_time
		,wuf.[calc_fee_amount] as usage_fee_calc_fee_amount
		,wuf.[manual_time] as usage_fee_manual_time
		,wuf.[manual_fee_amount] as usage_fee_manual_fee_amount
		,wuf.[note] as usage_fee_note
		--> Плата за пользование временные метки
		,wuf.[create] as usage_fee_create
		,wuf.[create_user] as usage_fee_create_user
		,wuf.[change] as usage_fee_change
		,wuf.[change_user] as usage_fee_change_user
		,wuf.[error] as usage_fee_error
		--into usage_fee_wagons
FROM [IDS].[OutgoingCars] as out_car
		--> Текущее внетренее перемещение
		Left JOIN [IDS].WagonInternalRoutes as wir ON out_car.id = wir.[id_outgoing_car]
		--> Отправка состава
		Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_sost.id = out_car.id_outgoing
		--> Документы на вагон по отправки вагона на УЗ
		Left JOIN [IDS].[Outgoing_UZ_Vagon] as out_doc_vag ON out_car.id_outgoing_uz_vagon = out_doc_vag.id
		--> Документы на состав по отправки вагона на УЗ
		Left JOIN [IDS].[Outgoing_UZ_Document] as out_doc_sostav ON out_doc_vag.id_document = out_doc_sostav.id
		--> Документы на вагон по отправки вагона на УЗ
		--==== ПРИБЫТИЕ И ПРИЕМ ВАГОНА =====================================================================
		--> Прибытие вагона
		Left JOIN [IDS].ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
		--> Прибытие состава
		Left JOIN [IDS].ArrivalSostav as arr_sost ON arr_car.id_arrival = arr_sost.id
		--> Документы на вагон по принятию вагона на АМКР
		Left JOIN [IDS].Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		--> Документы на группу вагонов (состав) по принятию ваг она на АМКР
		Left JOIN [IDS].Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
		--> Справочник Аренд по отправке
		Left JOIN [IDS].[Directory_WagonsRent] as out_wag_rent ON out_doc_vag.id_wagons_rent_outgoing = out_wag_rent.id
		--> Справочник Оператор вагона по прибытию
		Left JOIN [IDS].Directory_OperatorsWagons as out_dir_operator ON out_wag_rent.id_operator =  out_dir_operator.id
		--> Справочник Разметка по отправке
		Left JOIN [IDS].Directory_ConditionArrival as out_dir_cond ON out_doc_vag.id_condition = out_dir_cond.id
		--> Справочник Грузов по прибытию
		Left JOIN [IDS].Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
		--> Справочник Грузов по отправке
		Left JOIN [IDS].Directory_Cargo as out_dir_cargo ON out_doc_vag.id_cargo =  out_dir_cargo.id
		--> Справочник Группы Грузов по прибытию
		Left JOIN [IDS].Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		--> Справочник Группы Грузов по отправке
		Left JOIN [IDS].Directory_CargoOutGroup as out_dir_group_cargo ON out_dir_cargo.id_out_group =  out_dir_group_cargo.id
		--> Справочник Внешних станций (по прибытию from)
		Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON arr_doc_uz.[code_stn_from] = arr_ext_station_from.code
		--> Справочник Внешних станций (по отправке)
		Left JOIN [IDS].[Directory_ExternalStation] as out_ext_station ON out_doc_sostav.[code_stn_to] = out_ext_station.code
		--> Справочник вагонов
		Left JOIN [IDS].Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num
		--> Справочник Собственник вагона по УЗ
		Left JOIN [IDS].[Directory_OwnersWagons] as dir_owner ON dir_wagon.id_owner = dir_owner.id
		--> Справочник строна (Администрация вагона)
		Left JOIN [IDS].Directory_Countrys as dir_countrys ON dir_wagon.id_countrys = dir_countrys.id
		--> Справочник Род вагона
		Left JOIN [IDS].Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
		--> Справочник Тип вагона
		Left JOIN [IDS].Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
		--> Плата за пользование
		Left JOIN [IDS].[WagonUsageFee] as wuf ON wir.id_usage_fee = wuf.id
		--> Справочник Грузов по прибытию
		Left JOIN [IDS].Directory_Cargo as wuf_arr_dir_cargo ON wuf.[id_cargo_arr] =  wuf_arr_dir_cargo.id
		--> Справочник Грузов по отправке
		Left JOIN [IDS].Directory_Cargo as wuf_out_dir_cargo ON wuf.id_cargo_out =  wuf_out_dir_cargo.id
		--> Справочник Группы Грузов по прибытию
		Left JOIN [IDS].Directory_CargoGroup as wuf_arr_dir_group_cargo ON wuf.id_cargo_group_arr =  wuf_arr_dir_group_cargo.id
		--> Справочник Группы Грузов по отправке
		Left JOIN [IDS].Directory_CargoOutGroup as wuf_out_dir_group_cargo ON wuf.id_cargo_group_out =  wuf_out_dir_group_cargo.id
		--> Справочник Внешних станций (по прибытию from)
		Left JOIN [IDS].[Directory_ExternalStation] as wuf_arr_ext_station_from ON wuf.code_stn_from  = wuf_arr_ext_station_from.code
		--> Справочник Внешних станций (по отправке)
		Left JOIN [IDS].[Directory_ExternalStation] as wuf_out_ext_station ON wuf.code_stn_to = wuf_out_ext_station.code
		--> Справочник Внешних станций (по отправке)
		Left JOIN [IDS].[Directory_Currency] as wuf_cur ON wuf.id_currency = wuf_cur.id
WHERE out_car.[num] = @num;