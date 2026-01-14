use [KRR-PA-CNT-Railway]
	
		--> Получим уставку норма простоя
	declare @arrival_idle_time int = CAST((select [value] from [IDS].[Settings] where area=N'wsd' and name = N'arrival_idle_time') AS INT);

		SELECT
		wir.id
		,wim.id as wim_id
		--,wim.id_wio as wim_wio_id
		,wio.id as wio_id
		,wir.num
		,current_datatime = getdate()
		--============================================================
		--> ПРИБЫТИЕ
		--============================================================
		,arrival_nom_main_doc = CASE WHEN arr_doc_uz.[nom_main_doc] is not null AND arr_doc_uz.[nom_main_doc]>0 THEN arr_doc_uz.[nom_main_doc] ELSE null END
		,arrival_nom_doc = CASE WHEN arr_doc_uz.[nom_main_doc] is not null AND arr_doc_uz.[nom_doc] is not null AND arr_doc_uz.[nom_doc]>0 THEN arr_doc_uz.[nom_doc] ELSE null END -- Номер документа(досылки)
		,arr_sost.date_adoption as arrival_date_adoption		-- дата приема
		,arr_doc_uz.[klient] as arrival_klient					-- Признак контр-агента
		--> Разметка по прибытию
		,arr_dir_cond.id as arrival_id_condition
		--,arr_dir_cond.condition_name_ru as arrival_condition_name_ru
		--,arr_dir_cond.condition_name_en as arrival_condition_name_en
		,arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru
		,arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en
		,arr_dir_cond.red as arrival_condition_red
		--> груз по прибытию
		,arr_dir_group_cargo.id as arrival_id_cargo_group
		,arr_dir_group_cargo.cargo_group_name_ru as arrival_cargo_group_name_ru
		,arr_dir_group_cargo.cargo_group_name_en as arrival_cargo_group_name_en
		,arr_dir_cargo.id as arrival_id_cargo
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
		--> Вес по прибытию
		,arr_doc_vag.vesg as arrival_vesg
		--> Станция отправитель
		,arr_dir_ext_station.code as arrival_station_from_code
		,arr_dir_ext_station.station_name_ru as arrival_station_from_name_ru
		,arr_dir_ext_station.station_name_en as arrival_station_from_name_en
		--,shipper.[code] as arrival_shipper_code
		--,shipper.[shipper_name_ru] as arrival_shipper_name_ru
		--,shipper.[shipper_name_en] as arrival_shipper_name_en
		----> Станция приема
		--,arr_sost.id_station_on as accepted_id_station_amkr
		--,acc_dir_station_amkr.station_name_ru as accepted_station_amkr_name_ru
		--,acc_dir_station_amkr.station_name_en as accepted_station_amkr_name_en
		--,acc_dir_station_amkr.station_abbr_ru as accepted_station_amkr_abbr_ru
		--,acc_dir_station_amkr.station_abbr_en as accepted_station_amkr_abbr_en
		--> Станция назначения
		,arr_doc_vag.id_station_on_amkr as arrival_id_station_amkr
		,arr_dir_station_amkr.station_name_ru as arrival_station_amkr_name_ru
		,arr_dir_station_amkr.station_name_en as arrival_station_amkr_name_en
		,arr_dir_station_amkr.station_abbr_ru as arrival_station_amkr_abbr_ru
		,arr_dir_station_amkr.station_abbr_en as arrival_station_amkr_abbr_en
		--> Цех получатель
		,arr_dir_division_amkr.id as arrival_id_division_amkr
		,arr_dir_division_amkr.code as arrival_division_amkr_code
		,arr_dir_division_amkr.name_division_ru as arrival_division_amkr_name_ru
		,arr_dir_division_amkr.name_division_en as arrival_division_amkr_name_en
		,arr_dir_division_amkr.division_abbr_ru as arrival_division_amkr_abbr_ru
		,arr_dir_division_amkr.division_abbr_en as arrival_division_amkr_abbr_en
		--=============== ВХОДЯЩАЯ ПОСТАВКА ==================
		,sap_is.[VBELN] as sap_incoming_supply_num
		,sap_is.[NUM_VBELN] as sap_incoming_supply_pos
		,sap_is.[ERDAT] as sap_incoming_supply_date
		,sap_is.[ETIME] as sap_incoming_supply_time
		,sap_is.[LGORT_10] as sap_incoming_supply_warehouse_code 
		,sap_is.[LGOBE_10] as sap_incoming_supply_warehouse_name
		,sap_is.[MATNR] as sap_incoming_supply_cargo_code 
		,sap_is.[MAKTX] as sap_incoming_supply_cargo_name
		,sap_is.[KOD_R_10] as sap_incoming_supply_cargo_ban
		--============================================================
		--> ИНФОРМАЦИЯ О ВАГОНЕ НА МОМЕТ ВЫБОРКИ
		--============================================================
		,wim.id_station as id_station_amkr
		,dir_station_amkr.station_name_ru as station_amkr_name_ru
		,dir_station_amkr.station_name_en as station_amkr_name_en
		,dir_station_amkr.station_abbr_ru as station_amkr_abbr_ru
		,dir_station_amkr.station_abbr_en as station_amkr_abbr_en
		--=============== ПУТЬ НА МОМЕТ ВЫБОРКИ ==================
		,wim.[id_way] as id_way
		,dir_way.[id_park] as id_park
		,dir_way.[way_num_ru] as way_num_ru
		,dir_way.[way_num_en] as way_num_en
		,dir_way.[way_name_ru] as way_name_ru
		,dir_way.[way_name_en] as way_name_en
		,dir_way.[way_abbr_ru] as way_abbr_ru
		,dir_way.[way_abbr_en] as way_abbr_en
		,wim.[way_start] as way_start
		,wim.[way_end] as way_end
		,wim.note as wim_note
		--=============== ПЕРЕГОН НА МОМЕТ ВЫБОРКИ ==================
		,wim.[id_outer_way] as id_outer_way
		,outer_ways.[name_outer_way_ru] as outer_way_name_ru
		,outer_ways.[name_outer_way_en] as outer_way_name_en
		,wim.[outer_way_start] as outer_way_start
		,wim.[outer_way_end] as outer_way_end
		-- 
		,view_type_way = (CASE WHEN (wim.[id_outer_way] is not null)  THEN 'outer_way' ELSE 'way' END)
		,view_name_way_ru = (CASE WHEN (wim.[id_outer_way] is not null)  THEN outer_ways.[name_outer_way_ru] ELSE (dir_way.[way_num_ru] + '-' + dir_way.[way_abbr_ru]) END)
		,view_name_way_en = (CASE WHEN (wim.[id_outer_way] is not null)  THEN outer_ways.[name_outer_way_en] ELSE (dir_way.[way_num_en] + '-' + dir_way.[way_abbr_en]) END)
		--> Примечания
		,wir.note as wir_note									-- Примечание по ходу движения вагона
		,wir.note2 as wir_note2									-- Примечание по ходу движения вагона
		,wir.highlight_color as wir_highlight_color				-- Подсветка строки
		--> Оператор
		,dir_operator.[id] as id_operator
		--,dir_operator.[operators_ru]
		--,dir_operator.[operators_en]
		,dir_operator.[abbr_ru] as operator_abbr_ru
		,dir_operator.[abbr_en] as operator_abbr_en
		,dir_rent.[rent_start] as operator_rent_start
		,dir_rent.[rent_end] as operator_rent_end
		,dir_operator.[paid] as operator_paid
		,dir_operator.[color] as operator_color
		,dir_operator.monitoring_idle_time as operator_monitoring_idle_time
		,dir_operator_group.[group] as operator_group
		--> Ограничение
		,dir_limload.[id] as id_limiting_loading
		--,dir_limload.[limiting_name_ru]
		--,dir_limload.[limiting_name_en]
		,dir_limload.[limiting_abbr_ru]
		,dir_limload.[limiting_abbr_en]
		--> Администрация
		,wagon_adm = (CASE WHEN dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null THEN dir_countrys.code_sng ELSE null END)
		--,dir_countrys.countrys_name_ru as wagon_adm_name_ru
		--,dir_countrys.countrys_name_en as wagon_adm_name_en
		,wagon_adm_abbr_ru = (CASE WHEN dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null THEN dir_countrys.countrys_name_ru ELSE null END)
		,wagon_adm_abbr_en = (CASE WHEN dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null THEN dir_countrys.countrys_name_en ELSE null END)
		--,dir_countrys.country_abbr_ru as wagon_adm_abbr_ru
		--,dir_countrys.country_abbr_en as wagon_adm_abbr_en
		--> Род вагона
		,dir_rod.rod_uz as wagon_rod
		--,dir_rod.genus_ru as wagon_rod_name_ru
		--,dir_rod.genus_en as wagon_rod_name_en
		,dir_rod.abbr_ru as wagon_rod_abbr_ru
		,dir_rod.abbr_en as wagon_rod_abbr_en
		--> Тип вагона
		,dir_type.type_ru as wagon_type_ru
		,dir_type.type_en as wagon_type_en
		--> Разметка по текущей операции
		--,cur_dir_cond.condition_name_ru as current_condition_name_ru
		--,cur_dir_cond.condition_name_en as current_condition_name_en
		,cur_dir_cond.condition_abbr_ru as current_condition_abbr_ru
		,cur_dir_cond.condition_abbr_en as current_condition_abbr_en
		,cur_dir_cond.red as current_condition_red
		,cur_dir_cond.repairs as current_condition_repairs
		--> Дата ремонта УЗ
		,dir_wagon.date_rem_uz as wagon_date_rem_uz
		--> Грузоподъемность
		,arr_doc_vag.gruzp as wagon_gruzp_doc
		,dir_wagon.gruzp as wagon_gruzp_uz
		--> Состояние загрузки
		,load_status.[id] as id_loading_status
		,load_status.[loading_status_ru] as loading_status_ru
		,load_status.[loading_status_en] as loading_status_en
		--> Операция
		,dir_operation.[id] as id_operation
		,dir_operation.[operation_name_ru] as operation_name_ru
		,dir_operation.[operation_name_en] as operation_name_en
		,wio.[operation_start] as operation_start
		,wio.[operation_end] as operation_end
		--> Детальная информация по перемещению груза на АМКР
		,move_cargo.id as move_cargo_id		
		,move_cargo.[internal_doc_num] as move_cargo_internal_doc_num
		,move_cargo.[id_weighing_num] as move_cargo_id_weighing_num
		,move_cargo.[doc_received] as move_cargo_doc_received
		,move_cargo.[id_cargo] as move_cargo_id_cargo
		,move_cargo.[id_internal_cargo] as move_cargo_id_internal_cargo
		,move_cargo.[id_division_from] as move_cargo_id_division_from
		,move_cargo.[id_division_on] as move_cargo_id_division_on
		,move_cargo.[code_external_station] as move_cargo_code_external_station
		,move_cargo.[empty] as move_cargo_empty
		,move_cargo.[vesg] as move_cargo_vesg
		------------------------------------------------
		--,[arrival_duration] = (CASE WHEN ((dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null) AND out_sost.date_outgoing is null) THEN DATEDIFF (minute, arr_sost.date_adoption, getdate()) ELSE null END)
		,[arrival_duration] = (CASE WHEN ((dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null) ) THEN  (CASE WHEN out_sost.date_outgoing is null THEN DATEDIFF (minute, arr_sost.date_adoption, getdate()) ELSE DATEDIFF (minute, arr_sost.date_adoption, out_sost.date_outgoing) END) ELSE null END)
		,[arrival_idle_time] = (CASE WHEN dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null THEN @arrival_idle_time ELSE null END)		
		,[arrival_usage_fee] = 0.00
		--=============== ПРОСТОЙ НА ЖД. СТАНЦИИ ==================
		--,[current_station_duration] = (CASE WHEN dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null THEN DATEDIFF (minute, (select [IDS].[get_start_datetime_station_of_wim](wim.id)), getdate()) ELSE null END)
		--,[current_way_duration] = (CASE WHEN dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null THEN DATEDIFF (minute, wim.way_start, getdate()) ELSE null END)
		--,[current_station_idle_time] = (CASE WHEN dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null THEN dir_station_amkr.idle_time ELSE null END)
		,[current_station_duration] = DATEDIFF (minute, (select [IDS].[get_start_datetime_station_of_wim](wim.id)), getdate())
		--,[current_way_duration] = DATEDIFF (minute, wim.way_start, getdate())
		,[current_way_duration] = DATEDIFF (minute, (select [IDS].[get_start_datetime_way_of_wim](wim.parent_id, wim.id_way, wim.way_start)), getdate())
		,[current_station_idle_time] = dir_station_amkr.idle_time 
		--=============== ИНСТРУКТИВНЫЕ ПИСЬМИ ==================
		--> Инструктивные письма
		,instructional_letters_num = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN il.num ELSE null END
		,instructional_letters_datetime = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN il.dt ELSE null END
		,instructional_letters_station_code = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN il.destination_station ELSE null END
		,instructional_letters_station_name = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN let_station_uz.station ELSE null END
		,instructional_letters_note = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN il.[note] ELSE null END
		---------------------------------------------------------------------------------------------
		--> Текущее внутренее перемещение
		,view_cargo_name_ru = (CASE 
		WHEN (move_cargo.id is not null) 
		THEN (CASE WHEN dir_cargo.id_group is not null THEN dir_cargo.cargo_name_ru ELSE dir_int_cargo.cargo_name_ru END)  
		ELSE arr_dir_cargo.cargo_name_ru 
		END)
		,view_cargo_name_en = (CASE 
		WHEN (move_cargo.id is not null) 
		THEN (CASE WHEN dir_cargo.id_group is not null THEN dir_cargo.cargo_name_en ELSE dir_int_cargo.cargo_name_en END)  
		ELSE arr_dir_cargo.cargo_name_en 
		END)
		,view_division_from_abbr_ru = (CASE 
		WHEN (move_cargo.id is not null and load_status.id not in (0, 3, 8)) 
		THEN dir_division_from.division_abbr_ru 
		ELSE null 
		END)
		,view_division_from_abbr_en = (CASE 
		WHEN (move_cargo.id is not null and load_status.id not in (0, 3, 8)) 
		THEN dir_division_from.division_abbr_en 
		ELSE null 
		END)
		,view_division_on_abbr_ru = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_division_on.division_abbr_ru ELSE arr_dir_division_amkr.division_abbr_ru END)  
		ELSE null
		END)
		,view_division_on_abbr_en = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_division_on.division_abbr_en ELSE arr_dir_division_amkr.division_abbr_en END)  
		ELSE null
		END)
		,view_external_station_on_name_ru = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_ext_station.station_name_ru ELSE arr_dir_ext_station.station_name_ru END)  
		ELSE null
		END)
		,view_external_station_on_name_en = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_ext_station.station_name_en ELSE arr_dir_ext_station.station_name_en END)  
		ELSE null
		END)
		,view_station_from_amkr_abbr_ru = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_station_from_amkr.[station_abbr_ru] ELSE null END)  
		ELSE null
		END)
		,view_station_from_amkr_abbr_en = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_station_from_amkr.[station_abbr_en] ELSE null END)  
		ELSE null
		END)
		,view_station_on_amkr_abbr_ru = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_station_on_amkr.[station_abbr_ru] ELSE arr_dir_station_amkr.station_abbr_ru END)  
		ELSE null
		END)
		,view_station_on_amkr_abbr_en = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_station_on_amkr.[station_abbr_en] ELSE arr_dir_station_amkr.station_abbr_en END)  
		ELSE null
		END)
		,view_vesg = (CASE 
		WHEN (move_cargo.id is not null) 
		THEN move_cargo.[vesg]
		ELSE arr_doc_vag.[vesg]
		END)
		--> Информация по предыдущим операциям (выгрузка)
		,wim_unload.id as wim_unload_id
		,wim_unload.[id_filing] as wim_unload_id_filing
		,wim_unload.[filing_start] as wim_unload_filing_start
		,wim_unload.[filing_end] as wim_unload_filing_end
		,wim_unload.[id_wio] as wim_unload_id_wio
		--> Информация по предыдущим операциям (погрузка)
		,wim_load.id as wim_load_id
		,wim_load.[id_filing] as wim_load_id_filing
		,wim_load.[filing_start] as wim_load_filing_start
		,wim_load.[filing_end] as wim_load_filing_end
		,wim_load.[id_wio] as wim_load_id_wio
		--> Информация по предыдущим операциям (очистка)
		,wim_clear.id as wim_clear_id
		,wim_clear.[id_filing] as wim_clear_id_filing
		,wim_clear.[filing_start] as wim_clear_filing_start
		,wim_clear.[filing_end] as wim_clear_filing_end
		,wim_clear.[id_wio] as wim_clear_id_wio
		-- ЗАПРЕТЫ НА ОПЕРАЦИИ --------------------------
	    ,current_wagon_busy = CASE 
		WHEN (wio.operation_start is not null and wio.[operation_end] is null) or (wf_pre.[create] is not null and wf_pre.[close] is null and (wim.filing_start is null  or wim.filing_end is null)) 
		THEN 1  
		ELSE 0 
		END
		,current_move_busy = CASE 
		WHEN (out_sost.status > 0 OR dir_operation.id in (9) OR (wio.operation_start is not null and wio.[operation_end] is null) OR (wf_pre.[create] is not null and wf_pre.[close] is null and (wim.filing_start is null  or wim.filing_end is null))) 
		THEN 1  
		ELSE 0 
		END
		,exist_load_document = CASE 
		WHEN (load_status.id not in (0, 3) AND  wf_pre.id is not null AND wf_pre.type_filing = 2 AND (move_cargo.[doc_received] is not null OR wf_pre.doc_received is not null))
		THEN 1  
		ELSE 0 
		END
		--============================================================
		--> ОТПРАВКА
		--============================================================
		,out_sost.date_outgoing as outgoing_date				-- дата отправки
		,out_sost.date_outgoing_act as date_outgoing_act		-- дата отправки
		,out_sost.status as outgoing_sostav_status				-- статус состава для отправки
		-- Причина возврата
		,outgoing_return_cause_ru = CASE WHEN out_car.[id_outgoing_return_start] is not null THEN dir_out_return.[cause_ru] ELSE dir_curr_return.[cause_ru] END
		,outgoing_return_cause_en = CASE WHEN out_car.[id_outgoing_return_start] is not null THEN dir_out_return.[cause_en] ELSE dir_curr_return.[cause_en] END
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
		--> ПРЕДЫДУЩАЯ ОТПРАВКА
		--============================================================
		,old_out_car.id as old_arrival_car_id_outgoing_car
		,old_out_car.id_outgoing_uz_vagon as old_arrival_car_id_outgoing_uz_vagon
		,old_out_sostav.date_outgoing as old_date_outgoing
		,old_out_sostav.date_outgoing_act as old_date_outgoing_act
		,old_out_uz_vag.[id_cargo] as old_outgoing_uz_vagon_id_cargo
		,old_out_dir_cargo.cargo_name_ru as old_outgoing_uz_vagon_cargo_name_ru
		,old_out_dir_cargo.cargo_name_en as old_outgoing_uz_vagon_cargo_name_en
		,old_out_uz_doc.[code_stn_to]  as old_outgoingl_uz_document_code_stn_to
		,old_out_ext_station_to.[station_name_ru] as old_outgoing_uz_document_station_to_name_ru
		,old_out_ext_station_to.[station_name_en] as old_outgoing_uz_document_station_to_name_en

	--into operating_balance_rw_cars
	FROM [IDS].[WagonInternalMovement] as wim
	Left JOIN [IDS].[WagonInternalRoutes] as wir ON wir.id = wim.[id_wagon_internal_routes]
	--> Текущая операция
	Left JOIN IDS.WagonInternalOperation as wio ON wio.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= wim.id_wagon_internal_routes order by id desc)
	--==== ПРИБЫТИЕ И ПРИЕМ ВАГОНА =====================================================================
	--> Прибытие вагона
	Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
	--> Прибытие состава
	Left JOIN IDS.ArrivalSostav as arr_sost ON arr_car.id_arrival = arr_sost.id
	--> Документы на вагон по принятию вагона на АМКР
	Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
	--> Документы на группу вагонов (состав) по принятию вагона на АМКР
	Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id

	--==== СПРАВОЧНИКИ ===================================================================================
	--> Справочник вагонов
	Left JOIN IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num
	--> Справочник аренд
	Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
	--> Справочник группы Операторов вагона
	Left JOIN IDS.Directory_OperatorsWagonsGroup as dir_operator_group ON dir_operator_group.id_operator = dir_rent.id_operator 
	--> Справочник Оператор вагона
	Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_operator.id = dir_rent.id_operator
	--> Справочник Ограничение погрузки
	Left JOIN IDS.Directory_LimitingLoading as dir_limload ON dir_limload.id = dir_rent.id_limiting
	--> Справочник строна (Администрация вагона)
	Left JOIN IDS.Directory_Countrys as dir_countrys ON dir_countrys.id = dir_wagon.id_countrys
	--> Справочник Род вагона
	Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_rod.id = dir_wagon.id_genus
	--> Справочник Тип вагона
	Left JOIN IDS.Directory_TypeWagons as dir_type ON dir_type.id = arr_doc_vag.id_type
	--> Справочник Разметка по текущей операции
	Left JOIN IDS.Directory_ConditionArrival as cur_dir_cond ON cur_dir_cond.id = wio.id_condition
	--> Справочник Операции над вагоном (на момент выборки)
	Left JOIN [IDS].[Directory_WagonOperations] as dir_operation ON dir_operation.id = wio.id_operation
	--> Справочник Сотояния загрузки (на момент выборки)
	Left JOIN [IDS].[Directory_WagonLoadingStatus] as load_status ON load_status.id = wio.id_loading_status
	--> Справочник внутрених перемещений грузов (на момент выборки)
	Left JOIN .[IDS].[WagonInternalMoveCargo] as move_cargo ON move_cargo.id = (SELECT TOP (1) wimc_w.[id] FROM [IDS].[WagonInternalMoveCargo] wimc_w where [id_wagon_internal_routes]=wir.id order by wimc_w.id desc)
	--> Груз (на момент выборки)
	Left JOIN [IDS].[Directory_Cargo] as dir_cargo ON dir_cargo.id =  move_cargo.[id_cargo]
	--> Группа груза (на момент выборки)
	Left JOIN [IDS].[Directory_CargoGroup] as dir_group_cargo ON dir_group_cargo.id = dir_cargo.id_group
	--> Груз(внутренний) (на момент выборки)
	Left JOIN [IDS].[Directory_InternalCargo] as dir_int_cargo ON dir_int_cargo.id = move_cargo.[id_internal_cargo]
	--> Группа груза(внутреннего) (на момент выборки)
	Left JOIN [IDS].[Directory_InternalCargoGroup] as dir_group_int_cargo ON dir_group_int_cargo.id = dir_int_cargo.[id_group]
	--> Справочник Подразделения (цех отправитель)(на момент выборки)
	Left JOIN [IDS].[Directory_Divisions] as dir_division_from ON dir_division_from.id = move_cargo.[id_division_from]
	--> Справочник Подразделения (цех получатель) (на момент выборки)
	Left JOIN [IDS].[Directory_Divisions] as dir_division_on ON dir_division_on.id = move_cargo.[id_division_on]
	--> Справочник Станция отправления (Внешняя станция получения) (на момент выборки)
	Left JOIN IDS.Directory_ExternalStation as dir_ext_station ON dir_ext_station.code = move_cargo.[code_external_station]
	-- Справочник Станция отправки по АМКР (на момент выборки)
	Left JOIN [IDS].[Directory_Station] as dir_station_from_amkr ON dir_station_from_amkr.id = move_cargo.[id_station_from_amkr]
	-- Справочник Станция прибытия по АМКР (на момент выборки)
	Left JOIN [IDS].[Directory_Station] as dir_station_on_amkr ON dir_station_on_amkr.id = move_cargo.[id_station_on_amkr]
	--> Справочник Станции АМКР (текущая станция АМКР)
	Left JOIN IDS.Directory_Station as dir_station_amkr ON dir_station_amkr.id =  wim.id_station
	--> Справочник текущий путь
	Left JOIN [IDS].[Directory_Ways] as dir_way ON dir_way.id = wim.[id_way]
	--> Справочник Внешний путь отправки
	Left JOIN [IDS].[Directory_OuterWays] as outer_ways ON outer_ways.id = wim.id_outer_way

	--> Справочник Грузов
	Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
	--> Справочник Группы Грузов
	Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
	--> Справочник Сертификат данные
	Left JOIN IDS.Directory_CertificationData as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
	--> Справочник комерческое состояние
	Left JOIN [IDS].[Directory_CommercialCondition] as arr_comm_cond ON arr_doc_vag.[id_commercial_condition] = arr_comm_cond.id
	--> Справочник Станция отправления (Внешняя станция)
	Left JOIN IDS.Directory_ExternalStation as arr_dir_ext_station ON arr_doc_uz.code_stn_from =  arr_dir_ext_station.code
		--> Справочник Разметка по прибытию
	Left JOIN [IDS].[Directory_ConditionArrival] as arr_dir_cond ON arr_dir_cond.id  = arr_doc_vag.id_condition
	
	--> Справочник Грузоотправитель
	--Left JOIN [IDS].[Directory_Shipper] as shipper ON arr_doc_uz.[code_shipper] = shipper.[code]
	--> Справочник Станции АМКР (станция назначения АМКР) прибытие
	Left JOIN IDS.Directory_Station as arr_dir_station_amkr ON arr_dir_station_amkr.id = arr_doc_vag.id_station_on_amkr
	--> Справочник Подразделения (цех получатель) прибытие
	Left JOIN [IDS].[Directory_Divisions] as arr_dir_division_amkr ON arr_dir_division_amkr.id = arr_doc_vag.id_division_on_amkr
	--> Документы SAP Входящая поставка
	Left JOIN [IDS].[SAPIncomingSupply] as sap_is ON wir.id_sap_incoming_supply = sap_is.id

	Left JOIN [IDS].[WagonInternalMovement] as wim_unload ON wim_unload.id = (SELECT top(1) wim_f1.[id] FROM [IDS].[WagonInternalMovement] as wim_f1 Left JOIN [IDS].[WagonFiling] as wf ON wf.id = wim_f1.[id_filing]
		where wim_f1.[id_wagon_internal_routes]=wir.id and wim_f1.[id_filing] is not null and wim_f1.id <= wim.id and wf.type_filing = 1 
		order by wim_f1.id desc)

   Left JOIN [IDS].[WagonInternalMovement] as wim_load ON wim_load.id = (SELECT top(1) wim_f2.[id] FROM [IDS].[WagonInternalMovement] as wim_f2 Left JOIN [IDS].[WagonFiling] as wf ON wf.id = wim_f2.[id_filing]
		where wim_f2.[id_wagon_internal_routes]=wir.id and wim_f2.[id_filing] is not null and wim_f2.id <= wim.id and wf.type_filing = 2 
		order by wim_f2.id desc)

	Left JOIN [IDS].[WagonInternalMovement] as wim_clear ON wim_clear.id = (SELECT top(1) wim_f3.[id] FROM [IDS].[WagonInternalMovement] as wim_f3 Left JOIN [IDS].[WagonFiling] as wf ON wf.id = wim_f3.[id_filing]
		where wim_f3.[id_wagon_internal_routes]=wir.id and wim_f3.[id_filing] is not null and wim_f3.id <= wim.id and wf.type_filing = 3 
		order by wim_f3.id desc)

	--> Ограничил по времени на месяц от текущей даты
	Left JOIN [IDS].[InstructionalLettersWagon] as ilw  ON ilw.id = (SELECT TOP (1) ilws.[id] FROM [IDS].[InstructionalLettersWagon] as ilws Left JOIN [IDS].[InstructionalLetters] as ils ON ils.id =  ilws.id_instructional_letters where ilws.[num]=wir.num and ilws.[close] is null order by ilws.[id] desc)
	--> Перечень писем
	Left JOIN IDS.InstructionalLetters as il ON ilw.id_instructional_letters = il.id
	--> Справочник Внешних станций УЗ
	Left JOIN UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs

	--==== СДАЧА ВАГОНА И ЗАДЕРЖАНИЯ ================================================================
	--> Отправка вагона
	Left JOIN [IDS].[OutgoingCars] as out_car ON wir.id_outgoing_car = out_car.id
	--> Отправка состава
	Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_car.id_outgoing = out_sost.id
	--> Документы SAP Исходящая поставка
	Left JOIN [IDS].[SAPOutgoingSupply] as sap_os ON wir.id_sap_outbound_supply = sap_os.id

	Left JOIN IDS.WagonInternalRoutes as wir_old ON wir_old.id = (select id from IDS.WagonInternalRoutes where id = wir.parent_id and num = wir.num)
	Left JOIN [IDS].[OutgoingCars] as old_out_car ON old_out_car.id = wir_old.id_outgoing_car
	Left JOIN [IDS].[OutgoingSostav] as old_out_sostav ON old_out_sostav.id = old_out_car.id_outgoing
	Left JOIN [IDS].[Outgoing_UZ_Vagon] as old_out_uz_vag ON old_out_uz_vag.id = old_out_car.id_outgoing_uz_vagon
	Left JOIN [IDS].[Outgoing_UZ_Document] as old_out_uz_doc ON old_out_uz_doc.id = old_out_uz_vag.id_document
	Left JOIN IDS.Directory_Cargo as old_out_dir_cargo ON old_out_dir_cargo.id =  old_out_uz_vag.id_cargo
	Left JOIN [IDS].[Directory_ExternalStation] as old_out_ext_station_to ON old_out_uz_doc.[code_stn_to] = old_out_ext_station_to.code

	--> предыдущий wim по предыдущей подаче 
	Left JOIN IDS.WagonInternalMovement as wim_wf_pre ON wim_wf_pre.id = (SELECT top(1) [id] FROM [IDS].[WagonInternalMovement] where [id_wagon_internal_routes] = wir.id and [id_filing] is not null order by [id_filing] desc)
	--> Предыдущая подача 23.10.2024
	Left JOIN IDS.WagonFiling as wf_pre ON wf_pre.id = wim_wf_pre.id_filing

	--> Возврат по отправке
	Left JOIN [IDS].[OutgoingDetentionReturn] as out_dr ON out_dr.id = out_car.id_outgoing_return_start
	--> Справочник Возвратов
	Left JOIN [IDS].[Directory_DetentionReturn] as dir_out_return ON out_dr.id_detention_return = dir_out_return.id	
	--> Возврат текущий открытый
	Left JOIN [IDS].[OutgoingDetentionReturn] as curr_dr ON curr_dr.id = (SELECT top(1) [id] FROM [IDS].[OutgoingDetentionReturn] where [num]=wir.num and [date_stop] is null order by 1 desc)	
	--> Справочник Возвратов
	Left JOIN [IDS].[Directory_DetentionReturn] as dir_curr_return ON curr_dr.id_detention_return = dir_curr_return.id

	--WHERE wim.id_station <> 10 AND ( (wim.id_outer_way is null AND wim.way_end is null) OR (wim.id_outer_way is not null AND wim.outer_way_end is null))
	--WHERE wim.id IN (SELECT wim_w.id FROM IDS.WagonInternalMovement as wim_w where wim_w.id_station <> 10 AND ( (wim_w.id_outer_way is null AND wim_w.way_end is null) OR (wim_w.id_outer_way is not null AND wim_w.outer_way_end is null)))
	--and wir.num = 60521457
	--WHERE wim.id IN (SELECT wim_w.id FROM IDS.WagonInternalMovement as wim_w Left JOIN IDS.WagonInternalRoutes as wir_w ON wir_w.id = wim_w.id_wagon_internal_routes Left JOIN IDS.Directory_Wagons as dir_wagon_w ON dir_wagon_w.num = wir_w.num Left JOIN IDS.Directory_GenusWagons as dir_rod_w ON dir_rod_w.id = dir_wagon_w.id_genus where wim_w.id_station <> 10 AND ( (wim_w.id_outer_way is null AND wim_w.way_end is null) OR (wim_w.id_outer_way is not null AND wim_w.outer_way_end is null)))
	WHERE wim.id IN (SELECT wim_w.id FROM IDS.WagonInternalMovement as wim_w 
		Left JOIN IDS.WagonInternalRoutes as wir_w ON wir_w.id = wim_w.id_wagon_internal_routes 
		Left JOIN IDS.Directory_Wagons as dir_wagon_w ON dir_wagon_w.num = wir_w.num 
		Left JOIN IDS.Directory_GenusWagons as dir_rod_w ON dir_rod_w.id = dir_wagon_w.id_genus 
		where wim_w.id_station <> 10 AND dir_rod_w.rod_uz <> 90 AND ((wim_w.id_outer_way is null AND wim_w.way_end is null) OR (wim_w.id_outer_way is not null AND wim_w.outer_way_end is null)))
	
	--and wir.num = 60521457 
	











--	SELECT wim_w.id FROM IDS.WagonInternalMovement as wim_w
--	Left JOIN IDS.WagonInternalRoutes as wir_w ON wir_w.id = wim_w.id_wagon_internal_routes
--	Left JOIN IDS.Directory_Wagons as dir_wagon_w ON dir_wagon_w.num = wir_w.num
--	Left JOIN IDS.Directory_GenusWagons as dir_rod_w ON dir_rod_w.id = dir_wagon_w.id_genus
--where wim_w.id_station <> 10 AND (
--(wim_w.id_outer_way is null AND wim_w.way_end is null) OR 
--(wim_w.id_outer_way is not null AND wim_w.outer_way_end is null))
----AND (dir_rod_w.rod_uz <> 90 or dir_rod_w.rod_uz is null)
----AND wim_w.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].Directory_Station where station_delete is null))



--SELECT top(1) wim_f.[id] FROM [IDS].[WagonInternalMovement] as wim_f Left JOIN [IDS].[WagonFiling] as wf ON wf.id = wim_f.[id_filing]
--		where wim_f.[id_wagon_internal_routes]=480191 and wim_f.[id_filing] is not null and wim_f.id < 12664752 and wf.type_filing = 1 
--		order by wim_f.id desc