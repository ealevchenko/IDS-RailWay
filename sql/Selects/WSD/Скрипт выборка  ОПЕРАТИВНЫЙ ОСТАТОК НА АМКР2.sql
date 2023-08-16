use [KRR-PA-CNT-Railway]

declare @date datetime = convert(datetime,'2023-08-10 20:00:00',120)

--select * from ids.get_view_operating_balance_of_date(@date)

	select 
		 wir.id
		 --,out_sost.[date_outgoing]
		,wir.num
		,arr_car.[id] as arrival_car_id
		,arr_sost.[id] as arrival_sostav_id
		,arr_doc_vag.[id] as arrival_uz_vagon_id
		,arr_doc_uz.[id]  as arrival_uz_document_id
		,wio.id as cur_wio_id
		,wim.id as cur_wim_id
		,out_car.id as outgoing_car_id
		,out_sost.id as outgoing_sostav_id
		,arr_doc_uz.[nom_main_doc] as arrival_uz_document_nom_main_doc
		,arr_doc_uz.[nom_doc]   as arrival_uz_document_nom_doc
		--> ОПЕРАТОР ПО ПРИБЫТИЮ [IDS].[Directory_OperatorsWagons]
		,dir_owg.[group] as arrival_uz_vagon_operators_wagons_group
		,arr_wag_rent.[id_operator] as arrival_uz_vagon_arrival_wagons_rent_id_operator			-- id строки оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[operators_ru] as arrival_uz_vagon_arrival_wagons_rent_operators_ru	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[operators_en] as arrival_uz_vagon_arrival_wagons_rent_operators_en	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[abbr_ru] as arrival_uz_vagon_arrival_wagons_rent_operator_abbr_ru		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[abbr_en] as arrival_uz_vagon_arrival_wagons_rent_operator_abbr_en		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_wag_rent.[rent_start] as arrival_uz_vagon_arrival_wagons_rent_start					-- Начало аренды оператора [IDS].[Directory_WagonsRent] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_wag_rent.[rent_end] as arrival_uz_vagon_arrival_wagons_rent_end						-- Конец аренды оператора [IDS].[Directory_WagonsRent] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[paid] as arrival_uz_vagon_arrival_wagons_rent_operator_paid			-- Признак платности оператора [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[color] as arrival_uz_vagon_arrival_wagons_rent_operator_color			-- Цвет оператора [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> ОПЕРАТОР ТЕКУЩИЙ [IDS].[Directory_OperatorsWagons]
		,dir_curr_owg.[group] as current_operators_wagons_group
		,curr_wag_rent.[id_operator] as current_wagons_rent_id_operator			-- id строки оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.[operators_ru] as current_wagons_rent_operators_ru	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.[operators_en] as current_wagons_rent_operators_en	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.[abbr_ru] as current_wagons_rent_operator_abbr_ru		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.[abbr_en] as current_wagons_rent_operator_abbr_en		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,curr_wag_rent.[rent_start] as current_wagons_rent_start					-- Начало аренды оператора [IDS].[Directory_WagonsRent] по прибытию [IDS].[Arrival_UZ_Vagon]
		,curr_wag_rent.[rent_end] as current_wagons_rent_end						-- Конец аренды оператора [IDS].[Directory_WagonsRent] по прибытию [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.[paid] as current_wagons_rent_operator_paid			-- Признак платности оператора [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.[color] as current_wagons_rent_operator_color			-- Цвет оператора [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> РАЗМЕТКА ПО ПРИБЫТИЮ [IDS].[Directory_ConditionArrival]
		,arr_doc_vag.[id_condition] as arrival_uz_vagon_id_condition
		,arr_dir_cond.condition_name_ru as arrival_uz_vagon_condition_name_ru			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_name_en as arrival_uz_vagon_condition_name_en			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_ru as arrival_uz_vagon_condition_abbr_ru			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_en as arrival_uz_vagon_condition_abbr_en			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.repairs as arrival_uz_vagon_condition_repairs						-- Готовность [IDS].[Directory_ConditionArrival] по прибытию призаак ремонт [IDS].[Arrival_UZ_Vagon]
		--> РАЗМЕТКА ТЕКУЩАЯ [IDS].[Directory_ConditionArrival]
		,wio.[id_condition] as current_id_condition
		,cur_dir_cond.condition_name_ru as current_condition_name_ru			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,cur_dir_cond.condition_name_en as current_condition_name_en			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,cur_dir_cond.condition_abbr_ru as current_condition_abbr_ru			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,cur_dir_cond.condition_abbr_en as current_condition_abbr_en			-- Готовность [IDS].[Directory_ConditionArrival] по прибытию [IDS].[Arrival_UZ_Vagon]
		,cur_dir_cond.repairs as current_condition_repairs						-- Готовность [IDS].[Directory_ConditionArrival] по прибытию призаак ремонт [IDS].[Arrival_UZ_Vagon]
		--> РОД ВАГОНА ПО ПРИБЫТИЮ [IDS].[Directory_GenusWagons]
		,arr_doc_vag.[id_genus]	 as arrival_uz_vagon_id_genus							-- id строки род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.rod_uz as arrival_uz_vagon_rod											-- Код рода вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_ru as arrival_uz_vagon_rod_name_ru								-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_en as arrival_uz_vagon_rod_name_en								-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_ru as arrival_uz_vagon_rod_abbr_ru								-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_en as arrival_uz_vagon_rod_abbr_en								-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		--> ТИП ВАГОНА
		,arr_doc_vag.[id_type] as arrival_uz_vagon_id_type
		,dir_type.type_ru as arrival_uz_vagon_type_ru
		,dir_type.type_en as arrival_uz_vagon_type_en
		,arr_doc_vag.[gruzp] as arrival_uz_vagon_gruzp
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
		--> [IDS].[Directory_Divisions] 
		,arr_doc_vag.[id_division_on_amkr] as arrival_uz_vagon_id_division_on_amkr
		,arr_dir_divis_amkr.[code] as arrival_uz_vagon_division_code					-- Код подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_ru] as arrival_uz_vagon_name_division_ru	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_en] as arrival_uz_vagon_name_division_en	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_ru] as arrival_uz_vagon_division_abbr_ru	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_en] as arrival_uz_vagon_division_abbr_en	-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[id_type_devision] as arrival_uz_vagon_id_type_devision	-- id типа подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		--=============== ВХОДЯЩАЯ ПОСТАВКА ==================	
		,sap_is.[KOD_R_10] as sap_incoming_supply_kod_r_10
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
		--============================================================
		--> Будет заполняться позже (Груз ОТПР, Станция назначения, Цех ПОГР)
		--============================================================
		--=============== ТЕКУЩАЯ СТАНЦИЯ ==================
		,wim.id_station as current_id_station_amkr
		,cur_dir_station_amkr.station_name_ru as current_station_amkr_name_ru
		,cur_dir_station_amkr.station_name_en as current_station_amkr_name_en
		,cur_dir_station_amkr.station_abbr_ru as current_station_amkr_abbr_ru
		,cur_dir_station_amkr.station_abbr_en as current_station_amkr_abbr_en
		--=============== ТЕКУЩИЙ ПУТЬ ==================
		,wim.[id_way] as current_id_way
		,cur_dir_way.[id_park] as current_id_park
		,cur_dir_way.[way_num_ru] as current_way_num_ru
		,cur_dir_way.[way_num_en] as current_way_num_en
		,cur_dir_way.[way_name_ru] as current_way_name_ru
		,cur_dir_way.[way_name_en] as current_way_name_en
		,cur_dir_way.[way_abbr_ru] as current_way_abbr_ru
		,cur_dir_way.[way_abbr_en] as current_way_abbr_en
		,wim.[way_start] as current_way_start
		,wim.[way_end] as current_way_end
		,wim.note as current_wim_note
		--=============== ПЕРЕГОН ==================
		,wim.[id_outer_way] as current_id_outer_way
		,outer_ways.[name_outer_way_ru] as current_outer_way_name_ru
		,outer_ways.[name_outer_way_en] as current_outer_way_name_en
		,wim.[outer_way_start] as current_outer_way_start
		,wim.[outer_way_end] as current_outer_way_end
		--============================================================
		--> Будет заполняться позже (Операция с ваг., Состояние ваг.)
		--============================================================
		,arr_sost.[date_arrival] as arrival_sostav_date_arrival
		,arr_sost.[date_adoption] as arrival_sostav_date_adoption
		,arr_sost.[date_adoption_act] as arrival_sostav_date_adoption_act
		-- Показать дату приема с учетом возврата
		,arrival_sostav_old_date_adoption = CASE  WHEN arr_doc_vag.[cargo_returns] = 1 THEN arr_sost_old.[date_adoption] ELSE arr_sost.[date_adoption] END
		,arrival_sostav_old_date_adoption_act = CASE  WHEN arr_doc_vag.[cargo_returns] = 1 THEN arr_sost_old.[date_adoption_act] ELSE arr_sost.[date_adoption_act] END
		--============================================================
		--> Простой УЗ
		--============================================================
		,wir.note as wir_note
		--> Инструктивные письма
		,il.num as instructional_letters_num
		,il.dt as instructional_letters_datetime
		,il.destination_station as instructional_letters_station_code
		,let_station_uz.station as instructional_letters_station_name
		,il.[note] as instructional_letters_note
		-- Общий простой  , час
		,idle_time = CASE  WHEN arr_doc_vag.[cargo_returns] = 1 THEN (DATEDIFF(minute, arr_sost_old.[date_adoption] , @date)) ELSE ( DATEDIFF(minute, arr_sost.[date_adoption], @date)) END 
		-- Общий простой Акт, час
		,idle_time_act = CASE  WHEN arr_doc_vag.[cargo_returns] = 1 THEN (DATEDIFF(minute, arr_sost_old.[date_adoption_act] , @date)) ELSE ( DATEDIFF(minute, arr_sost.[date_adoption_act], @date)) END 
		--into operating_balance
	FROM IDS.[WagonInternalRoutes] as wir
		--> Внутренее перемещение
		Left JOIN [IDS].[WagonInternalMovement] as wim ON wim.id = (SELECT top(1) [id] FROM [IDS].[WagonInternalMovement] where [id_wagon_internal_routes]=wir.id and ((outer_way_start is null  and (([way_start]<=@date and way_end>=@date) OR ([way_start]<=@date and way_end is null))) or outer_way_start is not null and ((outer_way_start<=@date and outer_way_end>=@date) or (outer_way_start<=@date and outer_way_end is null))) order by [way_end])
		Left JOIN [IDS].[WagonInternalOperation] as wio ON wio.id = (select top(1) [id] FROM [IDS].[WagonInternalOperation] WHERE [id_wagon_internal_routes] = wir.id)
	  	--==== ПРИБЫТИЕ И ПРИЕМ ВАГОНА =====================================================================
		--> Прибытие вагона
		Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
		--> Прибытие состава
		Left JOIN IDS.ArrivalSostav as arr_sost ON arr_car.id_arrival = arr_sost.id
		--> Предыдущее Прибытие состава c учетом возврата
		Left JOIN IDS.ArrivalSostav as arr_sost_old ON arr_sost_old.id = [IDS].[get_old_id_arrival_of_wir_parent_id](wir.parent_id)
		--> Документы на вагон по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		 --> Документы на группу вагонов (состав) по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
		--> Документы SAP Входящая поставка
		Left JOIN [IDS].[SAPIncomingSupply] as sap_is ON wir.id_sap_incoming_supply = sap_is.id
		--> Документы SAP Исходящая поставка
		Left JOIN [IDS].[SAPOutgoingSupply] as sap_os ON wir.id_sap_outbound_supply = sap_os.id
	  	--==== ОТПРАВКА ВАГОНА =====================================================================
		--> Отправка вагона
		Left JOIN IDS.OutgoingCars as out_car ON wir.id_outgoing_car = out_car.id
		--> Отправка состава
		Left JOIN IDS.OutgoingSostav as out_sost ON out_car.id_outgoing = out_sost.id
		--==== ИНСТРУКТИВНЫЕ ПИСЬМА =====================================================================
		--> Перечень вагонов по письма
		Left JOIN IDS.InstructionalLettersWagon as ilw  ON ilw.id = (SELECT TOP (1) [id] FROM [IDS].[InstructionalLettersWagon] where [num] =wir.num and [close] is null order by id desc)
		--> Перечень писем
		Left JOIN IDS.InstructionalLetters as il ON ilw.id_instructional_letters = il.id
		--==== СПРАВОЧНИКИ ===================================================================================
		--> Справочник аренд текущих
		Left JOIN [IDS].[Directory_WagonsRent] as curr_wag_rent ON curr_wag_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@date order by [id] desc)	
		--> Справочник аренд по прибытию		
		Left JOIN [IDS].[Directory_WagonsRent] as arr_wag_rent ON arr_wag_rent.id = arr_doc_vag.id_wagons_rent_arrival
		--> Справочник Оператор вагона по прибытию
		Left JOIN IDS.Directory_OperatorsWagons as arr_dir_operator ON arr_wag_rent.id_operator =  arr_dir_operator.id
		--> Справочник Оператор вагона текущий
		Left JOIN IDS.Directory_OperatorsWagons as curr_dir_operator ON curr_wag_rent.id_operator =  curr_dir_operator.id
		--> Справочник Разметка по прибытию
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> Справочник Текущая разметка
		Left JOIN IDS.Directory_ConditionArrival as cur_dir_cond ON wio.id_condition = cur_dir_cond.id
		--> Справочник Род вагона по прибытию
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON arr_doc_vag.[id_genus] = dir_rod.id
		--> Справочник Тип вагона
		Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
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
		--> Справочник Внешних станций (по прибытию from)
		Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON arr_doc_uz.[code_stn_from] = arr_ext_station_from.code
		--> Справочник Железных дорог (по прибытию from)
		Left JOIN [IDS].[Directory_InlandRailway] as arr_ir_from ON arr_ext_station_from.[code_inlandrailway] = arr_ir_from.code
		--> Справочник Подразделений АМКР (по отправке)
		Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis_amkr ON arr_doc_vag.[id_division_on_amkr] = arr_dir_divis_amkr.id
		--> Справочник Станции АМКР (текущая станция АМКР)
		Left JOIN IDS.Directory_Station as cur_dir_station_amkr ON wim.id_station =  cur_dir_station_amkr.id
		--> Справочник текущий путь
	    Left JOIN [IDS].[Directory_Ways] as cur_dir_way ON wim.[id_way] = cur_dir_way.id
		--> Справочник Внешний путь отправки
		Left JOIN IDS.Directory_OuterWays as outer_ways ON wim.id_outer_way = outer_ways.id 
		--> Справочник Внешних станций УЗ
		Left JOIN UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs
		--> Документы группа операторов	прибытие	
		Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_owg ON arr_wag_rent.id_operator = dir_owg.[id_operator]
		--> Документы группа операторов	текущая	
		Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_curr_owg ON curr_wag_rent.id_operator = dir_curr_owg.[id_operator]

	WHERE
	-- Исключим КИРОВА
		wim.id_station <> 10 

		--and wir.id_outgoing_car is not null
		--AND wim.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].Directory_Station where station_delete is null))
		--and dir_rod.rod_uz = 70
		--and arr_wag_rent.[id_operator] <>  curr_wag_rent.[id_operator]
		--and wir.num = 55573984
		--and curr_dir_operator.[abbr_ru] = N'ЦТЛ'
		-- Исключим ЛОКОМОТИВЫ
		AND (dir_rod.rod_uz <> 90 or dir_rod.rod_uz is null) AND NOT arr_doc_uz.[klient] = 1 AND (NOT dir_curr_owg.[group] in ('amkr_vz') OR dir_curr_owg.[group] is null)
		and arr_sost.[date_adoption] <= @date
		--AND wim.id = (SELECT top(1) [id]
		--FROM [IDS].[WagonInternalMovement]
		--where [id_wagon_internal_routes]=wir.id 
		--and ((outer_way_start is null  and (([way_start]<=@date and way_end>=@date) OR ([way_start]<=@date and way_end is null))) or outer_way_start is not null and ((outer_way_start<=@date and outer_way_end>=@date) or (outer_way_start<=@date and outer_way_end is null)))
		--order by [way_end])
		
		--AND 
		--((wim.outer_way_start is null AND ((wim.[way_start]<=@date and wim.way_end>=@date) OR (wim.[way_start]<=@date and wim.way_end is null)))
		--OR
		--(wim.outer_way_start is not null AND ((wim.outer_way_start<=@date and wim.outer_way_end>=@date) OR (wim.outer_way_start<=@date and wim.outer_way_end is null))))
		AND 
		(out_sost.[date_outgoing] is null OR out_sost.[date_outgoing] > @date)
