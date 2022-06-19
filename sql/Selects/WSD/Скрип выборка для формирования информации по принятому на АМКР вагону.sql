use [KRR-PA-Test-Railway]

declare @id_car int = 1283486

	select 
		 arr_car.[id] as arrival_car_id
		,arr_car.[num]
		,arr_car.[position_arrival] as arrival_car_position_arrival
		,wir.id as id_wir
		-- Добавил 10-05-2022
		-->================================= ТЕКУЩАЯ ПОЗИЦИЯ ВАГОНА========================
		,wim_cur.id as arrival_car_wim_cur_id
		,wim_cur.[id_wagon_internal_routes] as arrival_car_wim_cur_id_wagon_internal_routes
		,wim_cur.[id_station] as arrival_car_wim_cur_id_station
		,wim_cur_station.station_name_ru as arrival_car_wim_cur_station_name_ru
		,wim_cur_station.station_name_en as arrival_car_wim_cur_station_name_en
		,wim_cur_station.station_abbr_ru as arrival_car_wim_cur_station_abbr_ru
		,wim_cur_station.station_abbr_en as arrival_car_wim_cur_station_abbr_en
		,wim_cur.[id_way] as arrival_car_wim_cur_id_way
		,wim_cur_way.[id_park] as arrival_car_wim_cur_way_on_id_park
		,wim_cur_way.[way_num_ru] as arrival_car_wim_cur_way_num_ru
		,wim_cur_way.[way_num_en] as arrival_car_wim_cur_way_num_en
		,wim_cur_way.[way_name_ru] as arrival_car_wim_cur_way_name_ru
		,wim_cur_way.[way_name_en] as arrival_car_wim_cur_way_name_en
		,wim_cur_way.[way_abbr_ru] as arrival_car_wim_cur_way_abbr_ru
		,wim_cur_way.[way_abbr_en] as arrival_car_wim_cur_way_abbr_en
		,wim_cur.[way_start] as arrival_car_wim_cur_way_start
		,wim_cur.[way_end] as arrival_car_wim_cur_way_end
		,wim_cur.[id_outer_way] as arrival_car_wim_cur_id_outer_way
		,wim_cur_outer_way.[name_outer_way_ru] as arrival_car_wim_cur_name_outer_way_ru
		,wim_cur_outer_way.[name_outer_way_en] as arrival_car_wim_cur_name_outer_way_en
		,wim_cur.[outer_way_start] as arrival_car_wim_cur_outer_way_start
		,wim_cur.[outer_way_end] as arrival_car_wim_cur_outer_way_end
		,wim_cur.[position] as arrival_car_wim_cur_position
		,wim_cur.[note] as arrival_car_wim_cur_note
		,wim_cur.[parent_id] as arrival_car_wim_cur_parent_id
		,wim_cur.[id_wio] as arrival_car_wim_cur_id_wio
		,wim_cur.[num_sostav] as arrival_car_wim_cur_num_sostav
		--
		-->================================= ПРИБЫТИЕ =====================================
		--> ПРИБЫТИЕ ВАГОНОВ [IDS].[ArrivalCars]
		--,arr_car.[id_arrival]
		,arr_car.[position] as arrival_car_position
		,arr_car.[consignee] as arrival_car_consignee
		,arr_car.[num_doc] as arrival_car_num_doc
		,arr_car.[id_transfer] as arrival_car_id_transfer					-- Признак вагон перенесен вручную (указан id состава откуда забрали)
		,arr_car.[note] as arrival_car_note
		,arr_car.[date_adoption_act] as arrival_car_date_adoption_act
		,arr_car.[arrival] as arrival_car_arrival
		,arr_car.[arrival_user] as arrival_car_arrival_user
		,arr_car.[create] as arrival_car_create
		,arr_car.[create_user] as arrival_car_create_user
		,arr_car.[change] as arrival_car_change
		,arr_car.[change_user] as arrival_car_change_user
		--,arr_car.[id_arrival_uz_vagon] as arrival_car_
		-->======================================================================================================
		--> ПРИБЫТИЕ СОСТАВА [IDS].[ArrivalSostav]
		,arr_sost.[id] as arrival_sostav_id
		,arr_sost.[id_arrived] as arrival_sostav_id_arrived
		,arr_sost.[id_sostav] as arrival_sostav_id_sostav
		,arr_sost.[train] as arrival_sostav_train
		,arr_sost.[composition_index] as arrival_sostav_composition_index
		,arr_sost.[date_arrival] as arrival_sostav_date_arrival
		,arr_sost.[date_adoption] as arrival_sostav_date_adoption
		,arr_sost.[date_adoption_act] as arrival_sostav_date_adoption_act
		-->IDS.Directory_Station
		,arr_sost.[id_station_from] as arrival_sostav_id_station_from
		,arr_dir_station_from.station_name_ru as arrival_sostav_station_from_name_ru
		,arr_dir_station_from.station_name_en as arrival_sostav_station_from_name_en
		,arr_dir_station_from.station_abbr_ru as arrival_sostav_station_from_abbr_ru
		,arr_dir_station_from.station_abbr_en as arrival_sostav_station_from_abbr_en
		-->IDS.Directory_Station
		,arr_sost.[id_station_on] as arrival_sostav_id_station_on
		,arr_dir_station_on.station_name_ru as arrival_sostav_station_on_name_ru
		,arr_dir_station_on.station_name_en as arrival_sostav_station_on_name_en
		,arr_dir_station_on.station_abbr_ru as arrival_sostav_station_on_abbr_ru
		,arr_dir_station_on.station_abbr_en as arrival_sostav_station_on_abbr_en
		--> [IDS].[Directory_Ways]
		,arr_sost.[id_way] as arrival_sostav_id_way
		,arr_dir_way_on.[id_park] as arrival_sostav_way_on_id_park
		,arr_dir_way_on.[way_num_ru] as arrival_sostav_way_on_num_ru
		,arr_dir_way_on.[way_num_en] as arrival_sostav_way_on_num_en
		,arr_dir_way_on.[way_name_ru] as arrival_sostav_way_on_name_ru
		,arr_dir_way_on.[way_name_en] as arrival_sostav_way_on_name_en
		,arr_dir_way_on.[way_abbr_ru] as arrival_sostav_way_on_abbr_ru
		,arr_dir_way_on.[way_abbr_en] as arrival_sostav_way_on_abbr_en
		,arr_sost.[numeration] as arrival_sostav_numeration
		,arr_sost.[num_doc] as arrival_sostav_num_doc
		,arr_sost.[count] as arrival_sostav_count
		,arr_sost.[status] as arrival_sostav_status
		,arr_sost.[note] as arrival_sostav_note
		,arr_sost.[create] as arrival_sostav_create
		,arr_sost.[create_user] as arrival_sostav_create_user
		,arr_sost.[change] as arrival_sostav_change
		,arr_sost.[change_user] as arrival_sostav_change_user
		-->======================================================================================================
		--> ДОКУМЕНТ НА ВАГОН ПО ПРИБЫТИЮ [IDS].[Arrival_UZ_Vagon] 
		,arr_doc_vag.[id] as arrival_uz_vagon_id
		--,arr_doc_vag.[id_document]
		--,arr_doc_vag.[num]
		,arr_doc_vag.[id_arrival] as arrival_uz_vagon_id_arrival
		-- владелец
		,arr_doc_vag.[id_owner] as arrival_uz_vagon_id_owner
		,dir_owner.[owner_ru] as arrival_uz_vagon_owner_wagon_ru					-- Владелец [IDS].[Directory_OwnersWagons] по справочнику [IDS].[Directory_Wagons]
		,dir_owner.[owner_en] as arrival_uz_vagon_owner_wagon_en					-- Владелец [IDS].[Directory_OwnersWagons] по справочнику [IDS].[Directory_Wagons]
		,dir_owner.[abbr_ru] as arrival_uz_vagon_owner_wagon_abbr_ru				-- Владелец [IDS].[Directory_OwnersWagons] по справочнику [IDS].[Directory_Wagons]
		,dir_owner.[abbr_en] as arrival_uz_vagon_owner_wagon_abbr_en				-- Владелец [IDS].[Directory_OwnersWagons] по справочнику [IDS].[Directory_Wagons]
		-- Добавил 16.04.2022	
		,arr_doc_vag.id_type_ownership as arrival_uz_vagon_id_type_ownership
		,dir_type_os.[type_ownership_ru] as arrival_uz_vagon_type_ownership_ru		-- ТИП Владения для АМКР [IDS].[Directory_TypeOwnerShip] по справочнику [IDS].[Directory_Wagons]
		,dir_type_os.[type_ownership_en] as arrival_uz_vagon_type_ownership_en      -- ТИП Владения для АМКР [IDS].[Directory_TypeOwnerShip] по справочнику [IDS].[Directory_Wagons]
		-- администрация
		,arr_doc_vag.[id_countrys] as arrival_uz_vagon_id_countrys
		,wag_dir_countrys.code_sng as arrival_uz_vagon_wagon_adm				-- Код администрации [IDS].[Directory_Countrys] по справочнику [IDS].[Directory_Wagons]
		,wag_dir_countrys.countrys_name_ru as arrival_uz_vagon_wagon_adm_name_ru		-- Администрации [IDS].[Directory_Countrys] по справочнику [IDS].[Directory_Wagons]
		,wag_dir_countrys.countrys_name_en as arrival_uz_vagon_wagon_adm_name_en		-- Администрации [IDS].[Directory_Countrys] по справочнику [IDS].[Directory_Wagons]
		,wag_dir_countrys.country_abbr_ru as arrival_uz_vagon_wagon_adm_abbr_ru		-- Администрации [IDS].[Directory_Countrys] по справочнику [IDS].[Directory_Wagons]
		,wag_dir_countrys.country_abbr_en as arrival_uz_vagon_wagon_adm_abbr_en		-- Администрации [IDS].[Directory_Countrys] по справочнику [IDS].[Directory_Wagons]
		--> РОД ВАГОНА ПО ПРИБЫТИЮ [IDS].[Directory_GenusWagons]
		,arr_doc_vag.[id_genus]	 as arrival_uz_vagon_id_genus							-- id строки род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.rod_uz as arrival_uz_vagon_rod									-- Код рода вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_ru as arrival_uz_vagon_rod_name_ru							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_en as arrival_uz_vagon_rod_name_en							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_ru as arrival_uz_vagon_rod_abbr_ru							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_en as arrival_uz_vagon_rod_abbr_en							-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,arr_doc_vag.[kol_os] as arrival_uz_vagon_wagon_kol_os
		,arr_doc_vag.[usl_tip] as arrival_uz_vagon_wagon_usl_tip
		,arr_doc_vag.[date_rem_uz] as arrival_uz_vagon_wagon_date_rem_uz
		,arr_doc_vag.[date_rem_vag] as arrival_uz_vagon_wagon_date_rem_vag
		--,arr_doc_vag.[id_car] as arrival_uz_vagon_
		--> РАЗМЕТКА ПО ПРИБЫТИЮ [IDS].[Directory_ConditionArrival]
		,arr_doc_vag.[id_condition] as arrival_uz_vagon_id_condition
		,arr_dir_cond.condition_name_ru as arrival_uz_vagon_condition_name_ru			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_name_en as arrival_uz_vagon_condition_name_en			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_ru as arrival_uz_vagon_condition_abbr_ru			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_en as arrival_uz_vagon_condition_abbr_en			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.repairs as arrival_uz_vagon_condition_repairs						-- Готовность [IDS].[Directory_ConditionArrival] по прибытию призаак ремонт [IDS].[Arrival_UZ_Vagon]
		--> АРЕНДА ПО ПРИБЫТИЮ [IDS].[Directory_WagonsRent]
		,arr_wag_rent.[id] as arrival_uz_vagon_id_wagons_rent_arrival							-- id строки аренда [IDS].[Directory_WagonsRent] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> ОПЕРАТОР ПО ПРИБЫТИЮ [IDS].[Directory_OperatorsWagons]
		,arr_wag_rent.[id_operator] as arrival_uz_vagon_arrival_wagons_rent_id_operator			-- id строки оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[operators_ru] as arrival_uz_vagon_arrival_wagons_rent_operators_ru	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[operators_en] as arrival_uz_vagon_arrival_wagons_rent_operators_en	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[abbr_ru] as arrival_uz_vagon_arrival_wagons_rent_operator_abbr_ru		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[abbr_en] as arrival_uz_vagon_arrival_wagons_rent_operator_abbr_en		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_wag_rent.[rent_start] as arrival_uz_vagon_arrival_wagons_rent_start					-- Начало аренды оператора [IDS].[Directory_WagonsRent] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_wag_rent.[rent_end] as arrival_uz_vagon_arrival_wagons_rent_end						-- Конец аренды оператора [IDS].[Directory_WagonsRent] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[paid] as arrival_uz_vagon_arrival_wagons_rent_operator_paid			-- Признак платности оператора [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[color] as arrival_uz_vagon_arrival_wagons_rent_operator_color			-- Цвет оператора [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> ОГРАНИЧЕНИЕ ПО ПРИБЫТИЮ [IDS].[Directory_LimitingLoading]
		,arr_wag_rent.[id_limiting] as arrival_uz_vagon_arrival_wagons_rent_id_limiting			-- id строки оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_limload.[limiting_name_ru] as arrival_uz_vagon_arrival_wagons_rent_limiting_name_ru	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_limload.[limiting_name_en] as arrival_uz_vagon_arrival_wagons_rent_limiting_name_en	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_limload.[limiting_abbr_ru] as arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_ru	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_limload.[limiting_abbr_en] as arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_en	-- Оганичение [IDS].[Directory_LimitingLoading] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> IDS.Directory_TypeWagons
		,arr_doc_vag.[id_type] as arrival_uz_vagon_id_type
		,dir_type.type_ru as arrival_uz_vagon_type_ru
		,dir_type.type_en as arrival_uz_vagon_type_en
		,arr_doc_vag.[gruzp] as arrival_uz_vagon_gruzp
		,arr_doc_vag.[u_tara] as arrival_uz_vagon_u_tara
		,arr_doc_vag.[ves_tary_arc] as arrival_uz_vagon_ves_tary_arc
		-- Добавил 16.04.2022
		,arr_doc_vag.[gruzp_uz] as arrival_uz_vagon_gruzp_uz
		,arr_doc_vag.[tara_uz] as arrival_uz_vagon_tara_uz
		,arr_doc_vag.[route] as arrival_uz_vagon_route
		,arr_doc_vag.[note_vagon] as arrival_uz_vagon_note_vagon
		--> IDS.Directory_Cargo
		,arr_doc_vag.[id_cargo] as arrival_uz_vagon_id_cargo
		,arr_dir_cargo.cargo_name_ru as arrival_uz_vagon_cargo_name_ru
		,arr_dir_cargo.cargo_name_en as arrival_uz_vagon_cargo_name_en
		--> СПРАВОЧНИК ГРУППА ГРУЗА [IDS].[Directory_CargoGroup]	
		,arr_dir_cargo.[id_group] as arrival_uz_vagon_id_group								-- id группа груза [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_ru as arrival_uz_vagon_cargo_group_name_ru	-- Группа грузов [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_en as arrival_uz_vagon_cargo_group_name_en	-- Группа грузов [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> СПРАВОЧНИК ГРУЗА ЕТСНГ [IDS].[Directory_CargoETSNG]
		,arr_dir_cargo.[id_cargo_etsng] as arrival_uz_vagon_id_cargo_etsng					-- id груза ЕТСНГ [IDS].[Directory_CargoETSNG] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_etsng.[code] as arrival_uz_vagon_cargo_etsng_code						-- Код груза ЕТСНГ [IDS].[Directory_CargoETSNG] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_etsng.[cargo_etsng_name_ru] as arrival_uz_vagon_cargo_etsng_name_ru	-- Груз ЕТСНГ [IDS].[Directory_CargoETSNG] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_etsng.[cargo_etsng_name_en] as arrival_uz_vagon_cargo_etsng_name_en	-- Груз ЕТСНГ [IDS].[Directory_CargoETSNG] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> [IDS].[Directory_CargoGNG]
		,arr_doc_vag.[id_cargo_gng] as arrival_uz_vagon_id_cargo_gng
		,arr_dir_cargo_gng.[code] as arrival_uz_vagon_cargo_gng_code							-- Код груза ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_gng.[cargo_gng_name_ru] as arrival_uz_vagon_cargo_gng_name_ru			-- Груз ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_gng.[cargo_gng_name_en] as arrival_uz_vagon_cargo_gng_name_en			-- Груз ГНГ [IDS].[Directory_CargoGNG] по отправке [IDS].[Arrival_UZ_Vagon]
		--> IDS.Directory_CertificationData
		,arr_doc_vag.[id_certification_data] as arrival_uz_vagon_id_certification_data
		,arr_dir_certif.[certification_data_ru] as arrival_uz_vagon_sertification_data_ru
		,arr_dir_certif.[certification_data_en] as arrival_uz_vagon_sertification_data_en
		--> [IDS].[Directory_CommercialCondition]
		,arr_doc_vag.[id_commercial_condition] as arrival_uz_vagon_id_commercial_condition
		,arr_comm_cond.[commercial_condition_ru] as arrival_uz_vagon_commercial_condition_ru
		,arr_comm_cond.[commercial_condition_en] as arrival_uz_vagon_commercial_condition_en
		,arr_doc_vag.[zayava]  as arrival_uz_vagon_zayava
		,arr_doc_vag.[kol_pac] as arrival_uz_vagon_kol_pac
		,arr_doc_vag.[pac] as arrival_uz_vagon_pac
		,arr_doc_vag.[vesg] as arrival_uz_vagon_vesg
		,arr_doc_vag.[vesg_reweighing] as arrival_uz_vagon_vesg_reweighing
		,arr_doc_vag.[nom_zpu] as arrival_uz_vagon_nom_zpu
		,arr_doc_vag.[danger] as arrival_uz_vagon_danger
		,arr_doc_vag.[danger_kod] as arrival_uz_vagon_danger_kod
		,arr_doc_vag.[cargo_returns] as arrival_uz_vagon_cargo_returns
		--> IDS.Directory_Station
		,arr_doc_vag.[id_station_on_amkr] as arrival_uz_vagon_id_station_on_amkr
		,arr_dir_station_amkr.station_name_ru as arrival_uz_vagon_station_amkr_name_ru
		,arr_dir_station_amkr.station_name_en as arrival_uz_vagon_station_amkr_name_en
		,arr_dir_station_amkr.station_abbr_ru as arrival_uz_vagon_station_amkr_abbr_ru
		,arr_dir_station_amkr.station_abbr_en as arrival_uz_vagon_station_amkr_abbr_en
		--> [IDS].[Directory_Divisions] 
		,arr_doc_vag.[id_division_on_amkr] as arrival_uz_vagon_id_division_on_amkr
		,arr_dir_divis_amkr.[code] as arrival_uz_vagon_division_code					-- Код подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_ru] as arrival_uz_vagon_name_division_ru	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_en] as arrival_uz_vagon_name_division_en	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_ru] as arrival_uz_vagon_division_abbr_ru	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_en] as arrival_uz_vagon_division_abbr_en	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[id_type_devision] as arrival_uz_vagon_id_type_devision	-- id типа подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_doc_vag.[empty_car] as arrival_uz_vagon_empty_car
		,arr_doc_vag.[kol_conductor] as arrival_uz_vagon_kol_conductor
		-- добавил 10-05-2022
		,arr_doc_vag.[manual] as arrival_uz_vagon_manual
		,arr_doc_vag.[pay_summa] as arrival_uz_vagon_pay_summa
		,arr_doc_vag.[create] as arrival_uz_vagon_create
		,arr_doc_vag.[create_user] as arrival_uz_vagon_create_user
		,arr_doc_vag.[change] as arrival_uz_vagon_change
		,arr_doc_vag.[change_user] as arrival_uz_vagon_change_user
		-->======================================================================================================
		--> ДОКУМЕНТ НА СОСТАВ ПО ПРИБЫТИЮ [IDS].[Arrival_UZ_Document]
		,arr_doc_uz.[id]  as arrival_uz_document_id
		,arr_doc_uz.[id_doc_uz]  as arrival_uz_document_id_doc_uz
		,arr_doc_uz.[nom_doc]  as arrival_uz_document_nom_doc
		,arr_doc_uz.[nom_main_doc]  as arrival_uz_document_nom_main_doc
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
		--> [IDS].[Directory_ExternalStation]
		,arr_doc_uz.[code_stn_to]  as arrival_uz_document_code_stn_to
		,arr_ext_station_to.[station_name_ru] as arrival_uz_document_station_to_name_ru
		,arr_ext_station_to.[station_name_en] as arrival_uz_document_station_to_name_en
		--> [IDS].[Directory_InlandRailway]
		,arr_ext_station_to.[code_inlandrailway] as arrival_uz_document_to_code_inlandrailway
		,arr_ir_to.[inlandrailway_name_ru] as arrival_uz_document_to_inlandrailway_name_ru
		,arr_ir_to.[inlandrailway_name_en] as arrival_uz_document_to_inlandrailway_name_en
		,arr_ir_to.[inlandrailway_abbr_ru] as arrival_uz_document_to_inlandrailway_abbr_ru
		,arr_ir_to.[inlandrailway_abbr_en] as arrival_uz_document_to_inlandrailway_abbr_en
		,arr_ir_to.[code_railway] as arrival_uz_document_to_code_railway
		-->  [IDS].[Directory_BorderCheckpoint]
		,arr_doc_uz.[code_border_checkpoint]  as arrival_uz_document_code_border_checkpoint
		,arr_border_checkpoint.[station_name_ru] as arrival_uz_document_border_checkpoint_station_name_ru
		,arr_border_checkpoint.[station_name_en] as arrival_uz_document_border_checkpoint_station_name_en
		,arr_border_checkpoint.[code_inlandrailway] as arrival_uz_document_border_checkpoint_code_inlandrailway
		,arr_doc_uz.[cross_time]  as arrival_uz_document_cross_time
		--> [IDS].[Directory_Shipper]
		,arr_doc_uz.[code_shipper]  as arrival_uz_document_code_shipper
		,arr_shipper.[shipper_name_ru] as arrival_uz_document_shipper_name_ru
		,arr_shipper.[shipper_name_en] as arrival_uz_document_shipper_name_en
		--> [IDS].[Directory_Consignee]
		,arr_doc_uz.[code_consignee] as arrival_uz_document_code_consignee
		,arr_consignee.[name] as arrival_uz_document_name_consignee
		,arr_doc_uz.[klient]  as arrival_uz_document_klient
		--> [IDS].[Directory_PayerArrival]
		,arr_doc_uz.[code_payer_sender]  as arrival_uz_document_code_payer_sender
		,arr_payer_send.[payer_name_ru] as arrival_uz_document_payer_sender_name_ru
		,arr_payer_send.[payer_name_en] as arrival_uz_document_payer_sender_name_en
		--> [IDS].[Directory_PayerArrival]
		,arr_doc_uz.[code_payer_arrival]  as arrival_uz_document_code_payer_arrival
		,arr_payer_arr.[payer_name_ru] as arrival_uz_document_payer_arrival_name_ru
		,arr_payer_arr.[payer_name_en] as arrival_uz_document_payer_arrival_name_en
		,arr_doc_uz.[distance_way]  as arrival_uz_document_distance_way
		,arr_doc_uz.[note]  as arrival_uz_document_note
		,arr_doc_uz.[parent_id]  as arrival_uz_document_parent_id
		-- добавил 10-05-2022
		,arr_doc_uz.[manual] as arrival_uz_document_manual
		--,arr_doc_uz.[create]
		--,arr_doc_uz.[create_user]
		--,arr_doc_uz.[change]
		--,arr_doc_uz.[change_user]
		-->======================================================================================================
		--> Входящая поставка [IDS].[SAPIncomingSupply]
		,sap_is.[VBELN] as sap_incoming_supply_num
		,sap_is.[NUM_VBELN] as sap_incoming_supply_pos
		,sap_is.[ERDAT] as sap_incoming_supply_date
		,sap_is.[ETIME] as sap_incoming_supply_time
		,sap_is.[LGORT] as sap_incoming_supply_warehouse_code			-- Заадресовка
		,sap_is.[LGOBE] as sap_incoming_supply_warehouse_name
		,sap_is.[LGORT_10] as sap_incoming_supply_warehouse_code_10		-- Переадресация (Заадресовка 10км)
		,sap_is.[LGOBE_10] as sap_incoming_supply_warehouse_name_10
		,sap_is.[MATNR] as sap_incoming_supply_cargo_code				-- Материал
		,sap_is.[MAKTX] as sap_incoming_supply_cargo_name
		,sap_is.[WERKS] as sap_incoming_supply_works
		,sap_is.[NAME_SH] as sap_incoming_supply_ship					--Судно:
		,sap_is.[KOD_R_10] as sap_incoming_supply_ban					-- Запрет выгр.
		--=============== ГТД ===================================
		--> ....
		--=============== ИНСТРУКТИВНЫЕ ПИСЬМИ ==================
		--> Инструктивные письма
		,il.num as instructional_letters_num
		,il.dt as instructional_letters_datetime
		,il.destination_station as instructional_letters_station_code
		,let_station_uz.station as instructional_letters_station_name
		,il.[note] as instructional_letters_note
		--into view_incoming_cars
	FROM IDS.ArrivalCars as arr_car
		--> Прибытие состава
	    Left JOIN IDS.ArrivalSostav as arr_sost ON arr_sost.id = arr_car.id_arrival
		--==== ТЕКУЩЕЕ ПЕРЕМЕЩЕНИЕ ================================================================
		--> Текущее внетренее перемещение
		Left JOIN IDS.WagonInternalRoutes as wir ON arr_car.id = wir.[id_arrival_car]
		-- Добавил 10-05-2022
		--> Текущее место нахождения
		Left JOIN IDS.[WagonInternalMovement] as wim_cur ON wim_cur.id = (SELECT top(1) [id] FROM [IDS].[WagonInternalMovement] where [id_wagon_internal_routes] = (SELECT TOP (1) [id]  FROM [IDS].[WagonInternalRoutes] where [num] = arr_car.[num] order by 1 desc) and [close] is null order by 1 desc)
		--> Текущая операция
        --Left JOIN IDS.WagonInternalOperation as wio ON wio.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= wir.id order by id desc)
		--==== ПРИБЫТИЕ И ПРИЕМ ВАГОНА =====================================================================
		 --> Документы на вагон по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		 --> Документы на группу вагонов (состав) по принятию ваг она на АМКР
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
		--Left JOIN IDS.Directory_Wagons as dir_wagon ON arr_car.num = dir_wagon.num
		--> Справочник аренд
		--Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = arr_car.num and rent_end is null order by [id] desc)	
		Left JOIN [IDS].[Directory_WagonsRent] as arr_wag_rent ON arr_wag_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = arr_car.num and ((arr_sost.[date_adoption] is null and [rent_start]<=arr_sost.[date_arrival]) OR (arr_sost.[date_adoption] is not null and [rent_start]<=arr_sost.[date_adoption])) order by [rent_start] desc)	
		----> Справочник Оператор вагона по прибытию
		Left JOIN IDS.Directory_OperatorsWagons as arr_dir_operator ON arr_wag_rent.id_operator =  arr_dir_operator.id
		----> Справочник Ограничение погрузки по прибытию
		Left JOIN IDS.Directory_LimitingLoading as arr_dir_limload ON arr_wag_rent.id_limiting =  arr_dir_limload.id
		-- Переделал 10.02.2022
		--> Справочник Собственник вагона по УЗ по прибытию
		Left JOIN [IDS].[Directory_OwnersWagons] as dir_owner ON arr_doc_vag.[id_owner] = dir_owner.id
		--> Справочник строна (Администрация вагона по прибытию)
		 Left JOIN IDS.Directory_Countrys as wag_dir_countrys ON arr_doc_vag.[id_countrys] = wag_dir_countrys.id
		--> Справочник Род вагона по прибытию
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON arr_doc_vag.[id_genus] = dir_rod.id
		--> Справочник Тип вагона
		Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
		-- Добавил 16.04.2022		
		--> Справочник Тип владения вагоном
		Left JOIN IDS.[Directory_TypeOwnerShip] as dir_type_os ON arr_doc_vag.id_type_ownership =  dir_type_os.id
		--> Справочник Разметка по прибытию
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> Справочник Грузов по прибытию
		Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
		--> Справочник Группы Грузов по прибытию
		Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		--> Справочник Грузов ЕТСНГ по прибытию
		Left JOIN [IDS].[Directory_CargoETSNG] as arr_dir_cargo_etsng ON arr_dir_cargo.id_cargo_etsng = arr_dir_cargo_etsng.id
		--> Справочник Грузов ГНГ по прибытию
		Left JOIN [IDS].[Directory_CargoGNG] as arr_dir_cargo_gng ON arr_doc_vag.id_cargo_gng = arr_dir_cargo_gng.id
		--> Справочник Сертификат данные
		Left JOIN IDS.Directory_CertificationData as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
		--> Справочник комерческое состояние
		Left JOIN [IDS].[Directory_CommercialCondition] as arr_comm_cond ON arr_doc_vag.[id_commercial_condition] = arr_comm_cond.id
		--> Справочник Станции АМКР (станция приема на АМКР)
		Left JOIN IDS.Directory_Station as arr_dir_station_from ON arr_sost.[id_station_from] =  arr_dir_station_from.id
		--> Справочник Станции АМКР (станция приема на АМКР)
		Left JOIN IDS.Directory_Station as arr_dir_station_on ON arr_sost.id_station_on =  arr_dir_station_on.id
		--> Справочник Станции АМКР (станция отправки на АМКР)
		Left JOIN IDS.Directory_Station as arr_dir_station_amkr ON arr_doc_vag.[id_station_on_amkr] =  arr_dir_station_amkr.id
		--> Справочник Путь АМКР (путь прибытия на АМКР)
		Left JOIN [IDS].[Directory_Ways] as arr_dir_way_on ON arr_sost.[id_way] =  arr_dir_way_on.id
		--> Справочник Подразделений АМКР (по отправке)
		Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis_amkr ON arr_doc_vag.[id_division_on_amkr] = arr_dir_divis_amkr.id
		-- Добавил 10-05-2022
		--> Справочник Станции АМКР (станция текущего местаположения)
		Left JOIN IDS.Directory_Station as wim_cur_station ON wim_cur.[id_station] =  wim_cur_station.id
		--> Справочник Путь АМКР (путь текущего местаположения)
		Left JOIN [IDS].[Directory_Ways] as wim_cur_way ON wim_cur.[id_way] =  wim_cur_way.id
		--> Справочник Перегонов АМКР (перегон текущего местаположения)
		Left JOIN [IDS].[Directory_OuterWays] as wim_cur_outer_way ON wim_cur.[id_outer_way] =  wim_cur_outer_way.id
		--..............
		--> Справочник Внешних станций УЗ
		Left JOIN UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs
		--> Справочник Внешних станций (по прибытию from)
		Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON arr_doc_uz.[code_stn_from] = arr_ext_station_from.code
		--> Справочник Внешних станций (по прибытию to)
		Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_to ON arr_doc_uz.[code_stn_to] = arr_ext_station_to.code
		--> Справочник Железных дорог (по прибытию from)
		Left JOIN [IDS].[Directory_InlandRailway] as arr_ir_from ON arr_ext_station_from.[code_inlandrailway] = arr_ir_from.code
		--> Справочник Железных дорог (по прибытию from)
		Left JOIN [IDS].[Directory_InlandRailway] as arr_ir_to ON arr_ext_station_to.[code_inlandrailway] = arr_ir_to.code
		--> Справочник Погран переходов (по отправке)
		Left JOIN [IDS].[Directory_BorderCheckpoint] as arr_border_checkpoint ON arr_doc_uz.[code_border_checkpoint] = arr_border_checkpoint.[code]
		--> Справочник грузоотправители (по прибытию)
		Left JOIN [IDS].[Directory_Consignee] arr_consignee ON arr_doc_uz.[code_consignee] = arr_consignee.code		
		--> Справочник грузополучателей (по отправке)
		Left JOIN [IDS].[Directory_Shipper] as arr_shipper ON arr_doc_uz.[code_shipper] = arr_shipper.code
		--> Справочник платильщик по отправке (по отправке)
		Left JOIN [IDS].[Directory_PayerSender] as arr_payer_send ON arr_doc_uz.[code_payer_sender] = arr_payer_send.[code]
		--> Справочник платильщик по отправке (по отправке)
		Left JOIN [IDS].[Directory_PayerArrival] as arr_payer_arr ON arr_doc_uz.[code_payer_arrival] = arr_payer_arr.[code]
	WHERE 

	arr_car.[id] =@id_car 

	order by arr_car.position	RETURN
