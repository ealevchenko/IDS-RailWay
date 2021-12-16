use [KRR-PA-CNT-Railway]

select 
	out_car.[id] as id_outgoing_cars
	,out_car.[num]
	,out_car.[position]
	--================= ИНФОРМАЦИЯ ПО ВАГОНУ ==========================================
	-- Справочник вагона
	,dir_wagon.tara as wagon_tara_uz
	,dir_wagon.note as wagon_ban_uz							-- Запреты по УЗ 
	,dir_wagon.[closed_route] as wagon_closed_route			--Замкнутый маршрут (кольцо)
	----> Оператор
	--,dir_operator.[id] as id_operator
	--,dir_operator.[operators_ru]
	--,dir_operator.[operators_en]
	--,dir_operator.[abbr_ru] as operator_abbr_ru
	--,dir_operator.[abbr_en] as operator_abbr_en
	--,dir_rent.[rent_start] as operator_rent_start
	--,dir_rent.[rent_end] as operator_rent_end
	--,dir_operator.[paid] as operator_paid
	--,dir_operator.[color] as operator_color
	--,dir_operator.monitoring_idle_time as operator_monitoring_idle_time
	----> Ограничение
	--,dir_limload.[id] as id_limiting_loading
	--,dir_limload.[limiting_name_ru]
	--,dir_limload.[limiting_name_en]
	--,dir_limload.[limiting_abbr_ru]
	--,dir_limload.[limiting_abbr_en]
	----> Собственник по УЗ
	--,dir_owner.[id] as id_owner_wagon
	--,dir_owner.[owner_ru] as owner_wagon_ru
	--,dir_owner.[owner_en] as owner_wagon_en
	--,dir_owner.[abbr_ru] as owner_wagon_abbr_ru
	--,dir_owner.[abbr_en] as owner_wagon_abbr_en
	----> Администрация
	--,dir_countrys.code_sng as wagon_adm
	--,dir_countrys.countrys_name_ru as wagon_adm_name_ru
	--,dir_countrys.countrys_name_en as wagon_adm_name_en
	--,dir_countrys.country_abbr_ru as wagon_adm_abbr_ru
	--,dir_countrys.country_abbr_en as wagon_adm_abbr_en
	----> Род вагона
	--,dir_rod.rod_uz as wagon_rod
	--,dir_rod.genus_ru as wagon_rod_name_ru
	--,dir_rod.genus_en as wagon_rod_name_en
	--,dir_rod.abbr_ru as wagon_rod_abbr_ru
	--,dir_rod.abbr_en as wagon_rod_abbr_en
	--> Тип вагона
	,dir_type.type_ru as wagon_type_ru
	,dir_type.type_en as wagon_type_en
	-->======================================================================================================
	--> ОТПРАВКА ВАГОНОВ [IDS].[OutgoingCars]
	,out_car.[position_outgoing] as outgoing_car_position_outgoing
    ,out_car.[num_doc] as outgoing_car_num_doc							-- Номер документа(по отправке)
	,out_car.[note] as outgoing_car_note							-- примечание вагона по отправке
	,out_car.[date_outgoing_act] as outgoing_car_date_outgoing_act	-- сдан по акту
	,out_car.[outgoing] as outgoing_car_outgoing					-- вагон был сдан (дата и время)
	,out_car.[outgoing_user] as outgoing_car_outgoing_user			-- вагон был сдан (пользователь)
	--> ПРИЧИНА ЗАДЕРЖАНИЯ [IDS].[Directory_DetentionReturn]
	,out_car.[id_outgoing_detention] as outgoing_car_id_outgoing_detention	-- id строки задержание [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_dir_dr.[cause_ru] as outgoing_car_detention_cause_ru				-- Задержание [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_dir_dr.[cause_en] as outgoing_car_detention_cause_en				-- Задержание [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
	--> ПРИЧИНА НЕСООТВЕТСВИЯ [Directory_Reason_Discrepancy]
	,out_car.[id_reason_discrepancy_amkr] as outgoing_car_id_reason_discrepancy_amkr				-- id строки несоответсвия АМКР [IDS].[Directory_Reason_Discrepancy] по отправке [IDS].[OutgoingCars]
	,out_dir_rd_amkr.[reason_discrepancy_name_ru] as outgoing_car_reason_discrepancy_amkr_name_ru	-- Несоответсвие АМКР [IDS].[Directory_Reason_Discrepancy] по отправке [IDS].[OutgoingCars]
	,out_dir_rd_amkr.[reason_discrepancy_name_en] as outgoing_car_reason_discrepancy_amkr_name_en	-- Несоответсвие АМКР [IDS].[Directory_Reason_Discrepancy] по отправке [IDS].[OutgoingCars]
	,out_car.[id_reason_discrepancy_uz] as outgoing_car_id_reason_discrepancy_uz					-- id строки несоответсвия УЗ [IDS].[Directory_Reason_Discrepancy] по отправке [IDS].[OutgoingCars]
	,out_dir_rd_uz.[reason_discrepancy_name_ru] as outgoing_car_reason_discrepancy_uz_name_ru		-- Несоответсвие УЗ [IDS].[Directory_Reason_Discrepancy] по отправке [IDS].[OutgoingCars]
	,out_dir_rd_uz.[reason_discrepancy_name_en] as outgoing_car_reason_discrepancy_uz_name_en		-- Несоответсвие УЗ [IDS].[Directory_Reason_Discrepancy] по отправке [IDS].[OutgoingCars]
	--> ВОЗВРАТ НАЧАЛО ПО ОТПРАВКЕ [IDS].[OutgoingDetentionReturn]	
	,out_car.[id_outgoing_return_start] as outgoing_car_id_outgoing_return_start		-- id строки начало возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	--> ВОЗВРАТ НАЧАЛО [IDS].[Directory_DetentionReturn]
	,out_detect_return_start.[id_detention_return] as outgoing_car_id_detention_return_start	-- id начала возврата [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_dir_dr_start.[cause_ru] as outgoing_car_detention_cause_start_ru						-- Возврат начало [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_dir_dr_start.[cause_en] as outgoing_car_detention_cause_start_en						-- Возврат начало [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
	--
	,out_detect_return_start.[type_detention_return] as outgoing_car_return_start_type_detention_return -- Тип начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_detect_return_start.[date_start] as outgoing_car_return_start_date_start						-- Дата начала начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_detect_return_start.[date_stop] as outgoing_car_return_start_date_stop							-- Дата конца начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_detect_return_start.[num_act] as outgoing_car_return_start_num_act								-- № акта начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_detect_return_start.[date_act] as outgoing_car_return_start_date_act							-- Дата акта начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_detect_return_start.[note] as outgoing_car_return_start_note									-- Примечание начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	--> ВОЗВРАТ КОНЕЦ ПО ОТПРАВКЕ [IDS].[OutgoingDetentionReturn]	
	,out_car.[id_outgoing_return_stop] as outgoing_car_id_outgoing_return_stop						-- id конца возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	--> ВОЗВРАТ КОНЕЦ [IDS].[Directory_DetentionReturn]
	,out_detect_return_stop.[id_detention_return] as outgoing_car_id_detention_return_stop			-- id конца возврата [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_dir_dr_stop.[cause_ru] as outgoing_car_detention_cause_stop_ru								-- Возврат конца [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_dir_dr_stop.[cause_en] as outgoing_car_detention_cause_stop_en								-- Возврат конца [IDS].[Directory_DetentionReturn] по отправке [IDS].[OutgoingCars]
	--
	,out_detect_return_stop.[type_detention_return] as outgoing_car_return_stop_type_detention_return -- Тип конца возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_detect_return_stop.[date_start] as outgoing_car_return_stop_date_start						-- Дата конца начала возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_detect_return_stop.[date_stop] as outgoing_car_return_stop_date_stop						-- Дата конца конца возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_detect_return_stop.[num_act] as outgoing_car_return_stop_num_act							-- № акта конца возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_detect_return_stop.[date_act] as outgoing_car_return_stop_date_act							-- Дата акта конца возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_detect_return_stop.[note] as outgoing_car_return_stop_note									-- Примечание конца возврата [IDS].[OutgoingDetentionReturn] по отправке [IDS].[OutgoingCars]
	,out_car.[parent_wir_id] as outgoing_car_parent_wir_id											-- ссылка на внутренее перемещение если открыт "возврат" по отправке [IDS].[OutgoingCars]
	,out_car.[create] as outgoing_car_create														-- строку по отправленому вагону создали (дата и время) по отправке [IDS].[OutgoingCars]
	,out_car.[create_user] as outgoing_car_create_user												-- строку по отправленому вагону создали (пользователь) по отправке [IDS].[OutgoingCars]
	,out_car.[change] as outgoing_car_change														-- строку по отправленому вагону правили (дата и время) по отправке [IDS].[OutgoingCars]
	,out_car.[change_user] as outgoing_car_change_user												-- строку по отправленому вагону правили (пользователь) по отправке [IDS].[OutgoingCars]
	,out_car.[note_vagonnik] as outgoing_car_note_vagonnik											-- Примечание сделанное вагонником по отправке [IDS].[OutgoingCars]
	,out_car.[vagonnik] as outgoing_car_vagonnik													-- Вагонник (дата и время) по отправке [IDS].[OutgoingCars]
	,out_car.[vagonnik_user] as outgoing_car_vagonnik_user											-- Вагонник (пользователь) по отправке [IDS].[OutgoingCars]
	-->*****************************************************************************************************************************
	--> ОТПРАВКА СОСТАВ [IDS].[OutgoingSostav]
	,out_sost.[id] as id_outgoing_sostav
	,out_sost.[num_doc] as outgoing_sostav_num_doc
	--> СТАНЦИЯ ОТПРАВЛЕНИЯ АМКР IDS.Directory_Station
	,out_sost.[id_station_from] as outgoing_sostav_id_station_from
	,out_dir_station_amkr.station_name_ru as outgoing_sostav_from_station_amkr_name_ru
	,out_dir_station_amkr.station_name_en as outgoing_sostav_from_station_amkr_name_en
	,out_dir_station_amkr.station_abbr_ru as outgoing_sostav_from_station_amkr_abbr_ru
	,out_dir_station_amkr.station_abbr_en as outgoing_sostav_from_station_amkr_abbr_en
	--> ПУТЬ ОТПРАВЛЕНИЯ АМКР IDS.[Directory_Ways]
	,out_sost.[id_way_from] as outgoing_sostav_id_way_from
	,out_dir_way_amkr.[id_park] as outgoing_sostav_from_id_park
	,out_dir_way_amkr.[way_num_ru] as outgoing_sostav_from_way_num_ru
	,out_dir_way_amkr.[way_num_en] as outgoing_sostav_from_way_num_en
	,out_dir_way_amkr.[way_name_ru] as outgoing_sostav_from_way_name_ru
	,out_dir_way_amkr.[way_name_en] as outgoing_sostav_from_way_name_en
	,out_dir_way_amkr.[way_abbr_ru] as outgoing_sostav_from_way_abbr_ru
	,out_dir_way_amkr.[way_abbr_en] as outgoing_sostav_from_way_abbr_en
	--> СТАНЦИЯ КУДА ОТПРАВЛЯЕТСЯ СОСТАВ АМКР IDS.Directory_Station
	,out_sost.[id_station_on] as outgoing_sostav_id_station_from
	,out_dir_station_on.station_name_ru as outgoing_sostav_on_station_amkr_name_ru
	,out_dir_station_on.station_name_en as outgoing_sostav_on_station_amkr_name_en
	,out_dir_station_on.station_abbr_ru as outgoing_sostav_on_station_amkr_abbr_ru
	,out_dir_station_on.station_abbr_en as outgoing_sostav_on_station_amkr_abbr_en
	,out_sost.[date_readiness_amkr] as outgoing_sostav_date_readiness_amkr
	,out_sost.[date_end_inspection_acceptance_delivery] as outgoing_sostav_date_end_inspection_acceptance_delivery
	,out_sost.[date_end_inspection_loader] as outgoing_sostav_date_end_inspection_loader
	,out_sost.[date_end_inspection_vagonnik] as outgoing_sostav_date_end_inspection_vagonnik
	,out_sost.[date_show_wagons] as outgoing_sostav_date_show_wagons
	,out_sost.[date_readiness_uz] as outgoing_sostav_date_readiness_uz
	,out_sost.[date_outgoing] as outgoing_sostav_date_outgoing
	,out_sost.[date_outgoing_act] as outgoing_sostav_date_outgoing_act
	,out_sost.[date_departure_amkr] as outgoing_sostav_date_departure_amkr
	,out_sost.[composition_index] as outgoing_sostav_composition_index
	,out_sost.[status] as outgoing_sostav_status
	,out_sost.[route_sign] as outgoing_sostav_route_sign
	,out_sost.[note] as outgoing_sostav_note
	,out_sost.[create] as outgoing_sostav_create
	,out_sost.[create_user] as outgoing_sostav_create_user
	,out_sost.[change] as outgoing_sostav_change
	,out_sost.[change_user] as outgoing_sostav_change_user
	,out_sost.[vagonnik_user] as outgoing_sostav_vagonnik_user
	-->*****************************************************************************************************************************
	--> ДОКУМЕНТ НА ВАГОН ПО ОТПРАВКЕ [IDS].[Outgoing_UZ_Vagon]
	,out_doc_vag.[id] as id_outgoing_uz_vagon								-- id строки документа по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_doc_vag.[id_condition] as outgoing_uz_vagon_id_condition					-- id строки готовность по прибытию [IDS].[Outgoing_UZ_Vagon]
	--> РАЗМЕТКА ПО ПРИБЫТИЮ [IDS].[Directory_ConditionArrival]
	,out_dir_cond.condition_name_ru as outgoing_uz_vagon_condition_name_ru			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,out_dir_cond.condition_name_en as outgoing_uz_vagon_condition_name_en			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,out_dir_cond.condition_abbr_ru as outgoing_uz_vagon_condition_abbr_ru			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,out_dir_cond.condition_abbr_en as outgoing_uz_vagon_condition_abbr_en			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,out_dir_cond.repairs as outgoing_uz_vagon_condition_repairs						-- Готовность [IDS].[Directory_ConditionArrival] по прибытию призаак ремонт [IDS].[Outgoing_UZ_Vagon]
	--> АРЕНДА ПО ПРИБЫТИЮ [IDS].[Directory_WagonsRent]
	,arr_wag_rent.[id] as outgoing_uz_vagon_arrival_id_wagons_rent							-- id строки аренда [IDS].[Directory_WagonsRent] по прибытию [IDS].[Outgoing_UZ_Vagon]
	--> ОПЕРАТОР ПО ПРИБЫТИЮ [IDS].[Directory_OperatorsWagons]
	,arr_wag_rent.[id_operator] as outgoing_uz_vagon_arrival_wagons_rent_id_operator			-- id строки оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_operator.[operators_ru] as outgoing_uz_vagon_arrival_wagons_rent_operators_ru	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_operator.[operators_en] as outgoing_uz_vagon_arrival_wagons_rent_operators_en	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_operator.[abbr_ru] as outgoing_uz_vagon_arrival_wagons_rent_operator_abbr_ru		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_operator.[abbr_en] as outgoing_uz_vagon_arrival_wagons_rent_operator_abbr_en		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,arr_wag_rent.[rent_start] as outgoing_uz_vagon_arrival_wagons_rent_start					-- Начало аренды оператора [IDS].[Directory_WagonsRent] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,arr_wag_rent.[rent_end] as outgoing_uz_vagon_arrival_wagons_rent_end						-- Конец аренды оператора [IDS].[Directory_WagonsRent] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_operator.[paid] as outgoing_uz_vagon_arrival_wagons_rent_operator_paid			-- Признак платности оператора [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_operator.[color] as outgoing_uz_vagon_arrival_wagons_rent_operator_color			-- Цвет оператора [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Outgoing_UZ_Vagon]
	--> ОГРАНИЧЕНИЕ ПО ПРИБЫТИЮ [IDS].[Directory_LimitingLoading]
	,arr_wag_rent.[id_limiting] as outgoing_uz_vagon_arrival_wagons_rent_id_limiting			-- id строки оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_limload.[limiting_name_ru] as outgoing_uz_vagon_arrival_wagons_rent_limiting_name_ru	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_limload.[limiting_name_en] as outgoing_uz_vagon_arrival_wagons_rent_limiting_name_en	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_limload.[limiting_abbr_ru] as outgoing_uz_vagon_arrival_wagons_rent_limiting_abbr_ru	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_limload.[limiting_abbr_en] as outgoing_uz_vagon_arrival_wagons_rent_limiting_abbr_en	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Outgoing_UZ_Vagon]
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
	--> ОГРАНИЧЕНИЕ ПО ОТПРАВКЕ [IDS].[Directory_LimitingLoading]
	,out_wag_rent.[id_limiting] as outgoing_uz_vagon_outgoing_wagons_rent_id_limiting					-- id строки оганичение [IDS].[Directory_LimitingLoading] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_limload.[limiting_name_ru] as outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_ru	-- Оганичение [IDS].[Directory_LimitingLoading] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_limload.[limiting_name_en] as outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_en	-- Оганичение [IDS].[Directory_LimitingLoading] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_limload.[limiting_abbr_ru] as outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_ru	-- Оганичение [IDS].[Directory_LimitingLoading] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_limload.[limiting_abbr_en] as outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_en	-- Оганичение [IDS].[Directory_LimitingLoading] по отправке [IDS].[Outgoing_UZ_Vagon]
	--> АДМИНИСТРАЦИЯ ПО ОТПРАВКЕ [IDS].[Directory_Countrys]
	,out_doc_vag.[id_countrys] as outgoing_uz_vagon_id_countrys						-- id строки администрация [IDS].[Directory_Countrys] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_countrys.code_sng as outgoing_uz_vagon_wagon_adm						-- Код администрации [IDS].[Directory_Countrys] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_countrys.countrys_name_ru as outgoing_uz_vagon_adm_name_ru		-- Администрации [IDS].[Directory_Countrys] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_countrys.countrys_name_en as outgoing_uz_vagon_adm_name_en		-- Администрации [IDS].[Directory_Countrys] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_countrys.country_abbr_ru as outgoing_uz_vagon_adm_abbr_ru			-- Администрации [IDS].[Directory_Countrys] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_countrys.country_abbr_en as outgoing_uz_vagon_adm_abbr_en			-- Администрации [IDS].[Directory_Countrys] по отправке [IDS].[Outgoing_UZ_Vagon]
	--> РОД ВАГОНА ПО ОТПРАВКЕ [IDS].[Directory_GenusWagons]
	,out_doc_vag.[id_genus]	 as outgoing_uz_vagon_id_genus							-- id строки род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
	,dir_rod.rod_uz as outgoing_uz_vagon_rod									-- Код рода вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
	,dir_rod.genus_ru as outgoing_uz_vagon_rod_name_ru							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
	,dir_rod.genus_en as outgoing_uz_vagon_rod_name_en							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
	,dir_rod.abbr_ru as outgoing_uz_vagon_rod_abbr_ru							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
	,dir_rod.abbr_en as outgoing_uz_vagon_rod_abbr_en							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
	--> СОБСТВЕННИК ПО УЗ [IDS].[Directory_OwnersWagons]
	,out_doc_vag.[id_owner] as outgoing_uz_vagon_id_owner						-- id строки владелец [IDS].[Directory_OwnersWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
	,dir_owner.[owner_ru] as outgoing_uz_vagon_owner_wagon_ru					-- Владелец [IDS].[Directory_OwnersWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
	,dir_owner.[owner_en] as outgoing_uz_vagon_owner_wagon_en					-- Владелец [IDS].[Directory_OwnersWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
	,dir_owner.[abbr_ru] as outgoing_uz_vagon_owner_wagon_abbr_ru				-- Владелец [IDS].[Directory_OwnersWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
	,dir_owner.[abbr_en] as outgoing_uz_vagon_owner_wagon_abbr_en				-- Владелец [IDS].[Directory_OwnersWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_doc_vag.[gruzp_uz] as outgoing_uz_vagon_gruzp_uz						-- Грузоподъемность по документу УЗ [IDS].[Directory_OwnersWagons] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_doc_vag.[tara_uz] as outgoing_uz_vagon_tara_uz						-- Тара по документу УЗ по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_doc_vag.[note_uz] as outgoing_uz_vagon_note_uz						-- Примечание по документу УЗ по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_doc_vag.[gruzp] as outgoing_uz_vagon_gruzp							-- Грузоподъемность по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_doc_vag.[u_tara] as outgoing_uz_vagon_u_tara							-- Тара уточненая по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_doc_vag.[ves_tary_arc] as outgoing_uz_vagon_ves_tary_arc				-- Тара уточненая по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_doc_vag.[id_warehouse] as outgoing_uz_vagon_id_warehouse				-- id склад уточненая по отправке [IDS].[Outgoing_UZ_Vagon]
	--> СПРАВОЧНИК ПОДРАЗДЕЛЕНИЯ ПО ОТПРАВКЕ [IDS].[Directory_Divisions]
	,out_doc_vag.[id_division] as outgoing_uz_vagon_id_division				-- id строки подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_divis.[code] as outgoing_uz_vagon_division_code					-- Код подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_divis.[name_division_ru] as outgoing_uz_vagon_name_division_ru	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_divis.[name_division_en] as outgoing_uz_vagon_name_division_en	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_divis.[division_abbr_ru] as outgoing_uz_vagon_division_abbr_ru	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_divis.[division_abbr_en] as outgoing_uz_vagon_division_abbr_en	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
	,arr_dir_divis.[id_type_devision] as outgoing_uz_vagon_id_type_devision	-- id типа подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_doc_vag.[laden] as outgoing_uz_vagon_laden							-- груженый [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
	--> СПРАВОЧНИК ГРУЗА [IDS].[Directory_Cargo]
	,out_doc_vag.[id_cargo] as outgoing_uz_vagon_id_cargo						-- id груза [IDS].[Directory_Cargo] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_cargo.cargo_name_ru as outgoing_uz_vagon_cargo_name_ru			-- Груз [IDS].[Directory_Cargo] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_cargo.cargo_name_en as outgoing_uz_vagon_cargo_name_en			-- Груз [IDS].[Directory_Cargo] по отправке [IDS].[Outgoing_UZ_Vagon]
	--> СПРАВОЧНИК ГРУППА ГРУЗА [IDS].[Directory_CargoGroup]	
	,out_dir_cargo.[id_group] as outgoing_uz_vagon_id_group							-- id группа груза [IDS].[Directory_CargoGroup] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_group_cargo.cargo_group_name_ru as outgoing_uz_vagon_cargo_group_name_ru	-- Группа грузов [IDS].[Directory_CargoGroup] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_group_cargo.cargo_group_name_en as outgoing_uz_vagon_cargo_group_name_en	-- Группа грузов [IDS].[Directory_CargoGroup] по отправке [IDS].[Outgoing_UZ_Vagon]
	--> СПРАВОЧНИК ГРУЗА ЕТСНГ [IDS].[Directory_CargoETSNG]
	,out_dir_cargo.[id_cargo_etsng] as outgoing_uz_vagon_id_cargo_etsng					-- id груза ЕТСНГ [IDS].[Directory_CargoETSNG] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_cargo_etsng.[code] as outgoing_uz_vagon_cargo_etsng_code						-- Код груза ЕТСНГ [IDS].[Directory_CargoETSNG] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_cargo_etsng.[cargo_etsng_name_ru] as outgoing_uz_vagon_cargo_etsng_name_ru	-- Груз ЕТСНГ [IDS].[Directory_CargoETSNG] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_cargo_etsng.[cargo_etsng_name_en] as outgoing_uz_vagon_cargo_etsng_name_en	-- Груз ЕТСНГ [IDS].[Directory_CargoETSNG] по отправке [IDS].[Outgoing_UZ_Vagon]
	--> СПРАВОЧНИК ГРУЗА ГНГ [IDS].[Directory_CargoGNG]
	,out_doc_vag.[id_cargo_gng] as outgoing_uz_vagon_id_cargo_gng							-- id груза ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_cargo_gng.[code] as outgoing_uz_vagon_cargo_gng_code							-- Код груза ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_cargo_gng.[cargo_gng_name_ru] as outgoing_uz_vagon_cargo_gng_name_ru			-- Груз ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_dir_cargo_gng.[cargo_gng_name_en] as outgoing_uz_vagon_cargo_gng_name_en			-- Груз ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_doc_vag.[vesg] as outgoing_uz_vagon_vesg											-- Вес груза ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Outgoing_UZ_Vagon]
	--> СПРАВОЧНИК СТАНЦИИ УЗ ПО ОТПРАВКЕ [UZ].[Directory_Stations]
	,out_doc_vag.[code_stn_to] as outgoing_uz_vagon_to_station_uz_code						-- Код станции УЗ [UZ].[Directory_Stations] по отправке [IDS].[Outgoing_UZ_Vagon]
	,out_station_uz.[station] as outgoing_uz_vagon_to_station_uz_name						-- Станция УЗ [UZ].[Directory_Stations] по отправке [IDS].[Outgoing_UZ_Vagon]
	--,out_doc_vag.[create]
	--,out_doc_vag.[create_user]
	--,out_doc_vag.[change]
	--,out_doc_vag.[change_user]
	-->*****************************************************************************************************************************
	--> ДОКУМЕНТ НА СОСТАВ ПО ОТПРАВКЕ [IDS].[Outgoing_UZ_Document]
	,out_doc_sostav.[id_doc_uz] as outgoing_uz_document_id_doc_uz
	,out_doc_sostav.[nom_doc] as outgoing_uz_document_
	,out_doc_sostav.[code_stn_from] as outgoing_uz_document_
	,out_doc_sostav.[code_stn_to] as outgoing_uz_document_
	,out_doc_sostav.[country_nazn] as outgoing_uz_document_
	,out_doc_sostav.[code_border_checkpoint] as outgoing_uz_document_
	,out_doc_sostav.[cross_date] as outgoing_uz_document_
	,out_doc_sostav.[code_shipper] as outgoing_uz_document_
	,out_doc_sostav.[code_consignee] as outgoing_uz_document_
	,out_doc_sostav.[vid] as outgoing_uz_document_
	,out_doc_sostav.[code_payer] as outgoing_uz_document_
	,out_doc_sostav.[distance_way] as outgoing_uz_document_
	,out_doc_sostav.[osum] as outgoing_uz_document_
	,out_doc_sostav.[date_sozdan] as outgoing_uz_document_
	,out_doc_sostav.[date_otpr] as outgoing_uz_document_
	,out_doc_sostav.[date_pr] as outgoing_uz_document_
	,out_doc_sostav.[date_grpol] as outgoing_uz_document_
	,out_doc_sostav.[date_vid] as outgoing_uz_document_
	,out_doc_sostav.[info_sht] as outgoing_uz_document_
	,out_doc_sostav.[name_gr] as outgoing_uz_document_
	,out_doc_sostav.[note] as outgoing_uz_document_
	--,out_doc_sostav.[create]
	--,out_doc_sostav.[create_user]
	--,out_doc_sostav.[change]
	--,out_doc_sostav.[change_user]
	--========== ДОКУМЕНТЫ ПО ПРИБЫТИЮ ==========================
	,arr_doc_uz.[nom_doc] as arrival_nom_doc						-- Номер документа(досылки)
	,arr_doc_uz.[nom_main_doc] as arrival_nom_main_doc				-- Номер основного документа (если заполнен)
	,arr_sost.composition_index as arrival_composition_index
	,arr_sost.date_adoption as arrival_date_adoption				-- дата приема
	,arr_sost.date_adoption_act as arrival_date_adoption_act		-- дата приема (по акту)
	,arr_car.date_adoption_act as arrival_car_date_adoption_act		-- дата приема вагона (по акту)
	--> Разметка по прибытию
	,arr_dir_cond.condition_name_ru as arrival_condition_name_ru
	,arr_dir_cond.condition_name_en as arrival_condition_name_en
	,arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru
	,arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en
	,arr_dir_cond.red as arrival_condition_red
	,arr_dir_cond.repairs as arrival_condition_repairs
	--> Дата ремонта УЗ
	,dir_wagon.date_rem_uz as wagon_date_rem_uz
	--> Грузоподъемность
	,arr_doc_vag.gruzp as wagon_gruzp_doc
	,dir_wagon.gruzp as wagon_gruzp_uz
	--> груз по прибытию
	,arr_dir_group_cargo.cargo_group_name_ru as arrival_cargo_group_name_ru
	,arr_dir_group_cargo.cargo_group_name_en as arrival_cargo_group_name_en
	,arr_dir_cargo.cargo_name_ru as arrival_cargo_name_ru
	,arr_dir_cargo.cargo_name_en as arrival_cargo_name_en
	--> Сертификационные данные
	,arr_dir_certif.[id] as arrival_id_sertification_data
	,arr_dir_certif.[certification_data_ru] as arrival_sertification_data_ru
	,arr_dir_certif.[certification_data_en] as arrival_sertification_data_en
	--> Комерчиское состояние
	,arr_comm_cond.[id] as arrival_id_commercial_condition
	,arr_comm_cond.[commercial_condition_ru] as arrival_commercial_condition_ru
	,arr_comm_cond.[commercial_condition_en] as arrival_commercial_condition_en
	--> Станция отправитель
	,arr_dir_ext_station.code as arrival_station_from_code
	,arr_dir_ext_station.station_name_ru as arrival_station_from_name_ru
	,arr_dir_ext_station.station_name_en as arrival_station_from_name_en
	,shipper.[code] as arrival_shipper_code
	,shipper.[shipper_name_ru] as arrival_shipper_name_ru
	,shipper.[shipper_name_en] as arrival_shipper_name_en
	--> Станция приема АМКР
	,arr_sost.id_station_on as accepted_id_station_amkr
	,arr_dir_station_amkr.station_name_ru as accepted_station_amkr_name_ru
	,arr_dir_station_amkr.station_name_en as accepted_station_amkr_name_en
	,arr_dir_station_amkr.station_abbr_ru as accepted_station_amkr_abbr_ru
	,arr_dir_station_amkr.station_abbr_en as accepted_station_amkr_abbr_en
		--	--> Станция назначения
		--,arr_doc_vag.id_station_on_amkr as arrival_id_station_amkr
		--,arr_dir_station_amkr.station_name_ru as arrival_station_amkr_name_ru
		--,arr_dir_station_amkr.station_name_en as arrival_station_amkr_name_en
		--,arr_dir_station_amkr.station_abbr_ru as arrival_station_amkr_abbr_ru
		--,arr_dir_station_amkr.station_abbr_en as arrival_station_amkr_abbr_en
		----> Цех получатель
		--,arr_dir_division_amkr.code as arrival_division_amkr_code
		--,arr_dir_division_amkr.name_division_ru as arrival_division_amkr_name_ru
		--,arr_dir_division_amkr.name_division_en as arrival_division_amkr_name_en
		--,arr_dir_division_amkr.division_abbr_ru as arrival_division_amkr_abbr_ru
		--,arr_dir_division_amkr.division_abbr_en as arrival_division_amkr_abbr_en
	--================ ТЕКУЩЕЕ СОСТОЯНИЕ ========================================
	--> Состояние загрузки
	,cur_load.[id] as current_id_loading_status
	,cur_load.[loading_status_ru] as current_loading_status_ru
	,cur_load.[loading_status_en] as current_loading_status_en
		--> Состояние занят
	,current_wagon_busy = CASE WHEN wio.[operation_end] is null THEN 1  ELSE 0 END
		--> Текущая операция
	,cur_dir_operation.[id] as current_id_operation
	,cur_dir_operation.[operation_name_ru] as current_operation_name_ru
	,cur_dir_operation.[operation_name_en] as current_operation_name_en
	,wio.[operation_start] as current_operation_start
	,wio.[operation_end] as current_operation_end
			--=============== ПРОСТОЙ ПО ПРИБЫТИЮ ==================
		--,[arrival_duration] = DATEDIFF (minute, arr_sost.date_adoption, getdate())
		--,[arrival_idle_time] = @arrival_idle_time -- Норма простоя
		--,[arrival_usage_fee] = 0.00
		--=============== ТЕКУЩАЯ СТАНЦИЯ ==================
		--,wim.id_station as current_id_station_amkr
		--,cur_dir_station_amkr.station_name_ru as current_station_amkr_name_ru
		--,cur_dir_station_amkr.station_name_en as current_station_amkr_name_en
		--,cur_dir_station_amkr.station_abbr_ru as current_station_amkr_abbr_ru
		--,cur_dir_station_amkr.station_abbr_en as current_station_amkr_abbr_en
		--=============== ПРОСТОЙ НА ЖД. СТАНЦИИ ==================
		--,[current_station_duration] = DATEDIFF (minute, (select [IDS].[get_start_datetime_station_of_wim](wim.id)), getdate())
		--,[current_way_duration] = DATEDIFF (minute, wim.way_start, getdate())
		--,cur_dir_station_amkr.idle_time as current_station_idle_time
		--=============== ТЕКУЩИЙ ПУТЬ ==================
		--,wim.[id_way] as current_id_way
		--,cur_dir_way.[id_park] as current_id_park
		--,cur_dir_way.[way_num_ru] as current_way_num_ru
		--,cur_dir_way.[way_num_en] as current_way_num_en
		--,cur_dir_way.[way_name_ru] as current_way_name_ru
		--,cur_dir_way.[way_name_en] as current_way_name_en
		--,cur_dir_way.[way_abbr_ru] as current_way_abbr_ru
		--,cur_dir_way.[way_abbr_en] as current_way_abbr_en
		--,wim.[way_start] as current_way_start
		--,wim.[way_end] as current_way_end
		--,wim.note as current_wim_note
		--=============== ПЕРЕГОН ==================
		--,wim.[id_outer_way] as current_id_outer_way
		--,outer_ways.[name_outer_way_ru] as current_outer_way_name_ru
		--,outer_ways.[name_outer_way_en] as current_outer_way_name_en
		--,wim.[outer_way_start] as current_outer_way_start
		--,wim.[outer_way_end] as current_outer_way_end
		--=============== ВХОДЯЩАЯ ПОСТАВКА ==================
		,sap_is.[VBELN] as sap_incoming_supply_num
		,sap_is.[NUM_VBELN] as sap_incoming_supply_pos
		,sap_is.[ERDAT] as sap_incoming_supply_date
		,sap_is.[ETIME] as sap_incoming_supply_time
		,sap_is.[LGORT_10] as sap_incoming_supply_warehouse_code 
		,sap_is.[LGOBE_10] as sap_incoming_supply_warehouse_name
		,sap_is.[MATNR] as sap_incoming_supply_cargo_code 
		,sap_is.[MAKTX] as sap_incoming_supply_cargo_name
		--=============== ИСХОДЯЩАЯ ПОСТАВКА ==================
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
		--=============== ГТД ===================================
		--> ....
		--=============== ИНСТРУКТИВНЫЕ ПИСЬМИ ==================
		--> Инструктивные письма
		,il.num as instructional_letters_num
		,il.dt as instructional_letters_datetime
		,il.destination_station as instructional_letters_station_code
		,let_station_uz.station as instructional_letters_station_name
		,il.[note] as instructional_letters_note

FROM [IDS].[OutgoingSostav] as out_sost
		--> Отправка вагона
		Left JOIN [IDS].[OutgoingCars] as out_car ON out_sost.id = out_car.id_outgoing
		--==== ТЕКУЩЕЕ ПЕРЕМЕЩЕНИЕ ================================================================
		--> Текущее внетренее перемещение
		Left JOIN IDS.WagonInternalRoutes as wir ON out_car.id = wir.[id_outgoing_car]
		--> Текущая операция
        Left JOIN IDS.WagonInternalOperation as wio ON wio.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= wir.id order by id desc)
		--==== СДАЧА ВАГОНА, ЗАДЕРЖАНИЯ, ВОЗВРАТ И ОТПРАВКА  ================================================================
		--> Документы SAP Исходящая поставка
		Left JOIN [IDS].[SAPOutgoingSupply] as sap_os ON wir.id_sap_outbound_supply = sap_os.id
		--> Документы на вагон по отправки вагона на УЗ
		Left JOIN [IDS].[Outgoing_UZ_Vagon] as out_doc_vag ON out_car.id_outgoing_uz_vagon = out_doc_vag.id
		--> Документы на состав по отправки вагона на УЗ
		Left JOIN [IDS].[Outgoing_UZ_Document] as out_doc_sostav ON out_doc_vag.id_document = out_doc_sostav.id
		--==== ПРИБЫТИЕ И ПРИЕМ ВАГОНА =====================================================================
		--> Прибытие вагона
		Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
		--> Прибытие состава
		Left JOIN IDS.ArrivalSostav as arr_sost ON arr_car.id_arrival = arr_sost.id
		 --> Документы на вагон по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		 --> Документы на группу вагонов (состав) по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
		 --> Документы SAP Входящая поставка
		Left JOIN [IDS].[SAPIncomingSupply] as sap_is ON wir.id_sap_incoming_supply = sap_is.id
		 --==== ИНСТРУКТИВНЫЕ ПИСЬМА =====================================================================
		--> Перечень вагонов по письма
		Left JOIN IDS.InstructionalLettersWagon as ilw  ON ilw.id = (SELECT TOP (1) [id] FROM [IDS].[InstructionalLettersWagon] where [num] =wir.num and [close] is null order by id desc)
		--> Перечень писем
		Left JOIN IDS.InstructionalLetters as il ON ilw.id_instructional_letters = il.id
		--==== СПРАВОЧНИКИ ===================================================================================
		--> Справочник вагонов
		Left JOIN IDS.Directory_Wagons as dir_wagon ON out_car.num = dir_wagon.num
		--> Справочник аренд
		--Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = out_car.num and rent_end is null order by [id] desc)	
		--> Справочник Аренд по прибытию
		Left JOIN [IDS].[Directory_WagonsRent] as arr_wag_rent ON out_doc_vag.id_wagons_rent_arrival = arr_wag_rent.id
		--> Справочник Аренд по отправке
		Left JOIN [IDS].[Directory_WagonsRent] as out_wag_rent ON out_doc_vag.id_wagons_rent_outgoing = out_wag_rent.id
		--> Справочник Оператор вагона по прибытию
		Left JOIN IDS.Directory_OperatorsWagons as arr_dir_operator ON arr_wag_rent.id_operator =  arr_dir_operator.id
		--> Справочник Ограничение погрузки по прибытию
		Left JOIN IDS.Directory_LimitingLoading as arr_dir_limload ON arr_wag_rent.id_limiting =  arr_dir_limload.id
		--> Справочник Оператор вагона по прибытию
		Left JOIN IDS.Directory_OperatorsWagons as out_dir_operator ON out_wag_rent.id_operator =  out_dir_operator.id
		--> Справочник Ограничение погрузки по прибытию
		Left JOIN IDS.Directory_LimitingLoading as out_dir_limload ON out_wag_rent.id_limiting =  out_dir_limload.id
		--> Справочник Собственник вагона по УЗ
		Left JOIN [IDS].[Directory_OwnersWagons] as dir_owner ON dir_wagon.id_owner = dir_owner.id
		--> Справочник строна (Администрация вагона по отправке)
		Left JOIN IDS.Directory_Countrys as out_dir_countrys ON out_doc_vag.id_countrys = out_dir_countrys.id
		--> Справочник Род вагона
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
		--> Справочник Тип вагона
		Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
		--> Справочник Разметка по прибытию
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> Справочник Разметка по отправке
		Left JOIN IDS.Directory_ConditionArrival as out_dir_cond ON out_doc_vag.id_condition = out_dir_cond.id
		--> Справочник Грузоотправитель
		Left JOIN [IDS].[Directory_Shipper] as shipper ON arr_doc_uz.[code_shipper] = shipper.[code]
		--> Справочник Грузов по прибытию
		Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
		--> Справочник Грузов по отправке
		Left JOIN IDS.Directory_Cargo as out_dir_cargo ON out_doc_vag.id_cargo =  out_dir_cargo.id
		--> Справочник Группы Грузов по прибытию
		Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		--> Справочник Группы Грузов по отправке
		Left JOIN IDS.Directory_CargoGroup as out_dir_group_cargo ON out_dir_cargo.id_group =  out_dir_group_cargo.id
		--> Справочник Грузов ЕТСНГ по отправке
		Left JOIN [IDS].[Directory_CargoETSNG] as out_dir_cargo_etsng ON out_dir_cargo.id_cargo_etsng = out_dir_cargo_etsng.id
		--> Справочник Грузов ГНГ по отправке
		Left JOIN [IDS].[Directory_CargoGNG] as out_dir_cargo_gng ON out_doc_vag.id_cargo_gng = out_dir_cargo_gng.id

		--> Справочник Задержаний 
		Left JOIN [IDS].[Directory_DetentionReturn] as out_dir_dr ON out_car.id_outgoing_detention = out_dir_dr.id
		--> Справочник несоответсвий АМКР		
		Left JOIN [IDS].[Directory_Reason_Discrepancy] as out_dir_rd_amkr ON out_car.id_reason_discrepancy_amkr = out_dir_rd_amkr.id
		--> Справочник несоответсвий АМКР		
		Left JOIN [IDS].[Directory_Reason_Discrepancy] as out_dir_rd_uz ON out_car.id_reason_discrepancy_uz = out_dir_rd_uz.id
		--> Справочник возврата начала
		Left JOIN [IDS].[OutgoingDetentionReturn] as out_detect_return_start ON out_car.id_reason_discrepancy_amkr = out_detect_return_start.id
		--> Справочник возврата стоп
		Left JOIN [IDS].[OutgoingDetentionReturn] as out_detect_return_stop ON out_car.id_reason_discrepancy_uz = out_detect_return_stop.id

		--> Справочник Возврата начало 
		Left JOIN [IDS].[Directory_DetentionReturn] as out_dir_dr_start ON out_detect_return_start.id_detention_return = out_dir_dr_start.id
		--> Справочник Возврата начало 
		Left JOIN [IDS].[Directory_DetentionReturn] as out_dir_dr_stop ON out_detect_return_stop.id_detention_return = out_dir_dr_stop.id


		--> Справочник Сертификат данные
		Left JOIN IDS.Directory_CertificationData as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
		--> Справочник комерческое состояние
		Left JOIN [IDS].[Directory_CommercialCondition] as arr_comm_cond ON arr_doc_vag.[id_commercial_condition] = arr_comm_cond.id
		--> Справочник Станция отправления (Внешняя станция)
		Left JOIN IDS.Directory_ExternalStation as arr_dir_ext_station ON arr_doc_uz.code_stn_from =  arr_dir_ext_station.code
		--> Справочник Станции АМКР (станция приема на АМКР)
		Left JOIN IDS.Directory_Station as arr_dir_station_amkr ON arr_sost.id_station_on =  arr_dir_station_amkr.id
		--> Справочник Станции АМКР (станция отправки на АМКР)
		Left JOIN IDS.Directory_Station as out_dir_station_amkr ON out_sost.id_station_from =  out_dir_station_amkr.id
		--> Справочник Станции АМКР (отправка станция на которую отправлен состав)
		Left JOIN IDS.Directory_Station as out_dir_station_on ON out_sost.id_station_on =  out_dir_station_on.id
		--> Справочник Путь АМКР (путь отправки на АМКР)
		Left JOIN [IDS].[Directory_Ways] as out_dir_way_amkr ON out_sost.[id_way_from] =  out_dir_way_amkr.id

		--> Справочник Подразделений АМКР (по отправке)
		Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis ON out_doc_vag.id_division = arr_dir_divis.id
		--..............

		--> Справочник Операции над вагоном (текущая операция)
		Left JOIN IDS.Directory_WagonOperations as cur_dir_operation ON wio.id_operation =  cur_dir_operation.id
		--> Справочник Сотояния загрузки
		Left JOIN [IDS].[Directory_WagonLoadingStatus] as cur_load ON wio.id_loading_status = cur_load.id
		--> Справочник Внешних станций УЗ
		Left JOIN UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs
		--> Справочник Внешних станций УЗ (по отправке)
		Left JOIN [UZ].[Directory_Stations] as out_station_uz ON  out_doc_vag.[code_stn_to] = out_station_uz.code_cs

WHERE 

out_sost.id =127697 

order by out_car.position