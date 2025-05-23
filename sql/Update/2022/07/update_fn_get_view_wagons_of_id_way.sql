USE [KRR-PA-CNT-Railway]
GO
/****** Object:  UserDefinedFunction [IDS].[get_view_wagons_of_id_way]    Script Date: 05.07.2022 12:12:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER FUNCTION [IDS].[get_view_wagons_of_id_way]
 (
	@id_way int
 )
		RETURNS 
		@view_wagons TABLE  (
			[wir_id] [bigint] NOT NULL,
			[wim_id] [bigint] NOT NULL,
			[wio_id] [bigint] NULL,
			[num] [int] NOT NULL,
			[position] [int] NOT NULL,
			[id_operator] [int] NULL,
			[operators_ru] [nvarchar](100) NULL,
			[operators_en] [nvarchar](100) NULL,
			[operator_abbr_ru] [nvarchar](20) NULL,
			[operator_abbr_en] [nvarchar](20) NULL,
			[operator_rent_start] [datetime] NULL,
			[operator_rent_end] [datetime] NULL,
			[operator_paid] [bit] NULL,
			[operator_color] [nvarchar](10) NULL,
			[operator_monitoring_idle_time] [bit] NULL,
			[id_limiting_loading] [int] NULL,
			[limiting_name_ru] [nvarchar](100) NULL,
			[limiting_name_en] [nvarchar](100) NULL,
			[limiting_abbr_ru] [nvarchar](30) NULL,
			[limiting_abbr_en] [nvarchar](30) NULL,
			[id_owner_wagon] [int] NULL,
			[owner_wagon_ru] [nvarchar](100) NULL,
			[owner_wagon_en] [nvarchar](100) NULL,
			[owner_wagon_abbr_ru] [nvarchar](20) NULL,
			[owner_wagon_abbr_en] [nvarchar](20) NULL,
			[wagon_adm] [int] NULL,
			[wagon_adm_name_ru] [nvarchar](100) NULL,
			[wagon_adm_name_en] [nvarchar](100) NULL,
			[wagon_adm_abbr_ru] [nvarchar](10) NULL,
			[wagon_adm_abbr_en] [nvarchar](10) NULL,
			[wagon_rod] [int] NULL,
			[wagon_rod_name_ru] [nvarchar](50) NULL,
			[wagon_rod_name_en] [nvarchar](50) NULL,
			[wagon_rod_abbr_ru] [nvarchar](5) NULL,
			[wagon_rod_abbr_en] [nvarchar](5) NULL,
			[wagon_type_ru] [nvarchar](50) NULL,
			[wagon_type_en] [nvarchar](50) NULL,
			[arrival_condition_name_ru] [nvarchar](100) NULL,
			[arrival_condition_name_en] [nvarchar](100) NULL,
			[arrival_condition_abbr_ru] [nvarchar](20) NULL,
			[arrival_condition_abbr_en] [nvarchar](20) NULL,
			[arrival_condition_red] [bit] NULL,
			[current_condition_name_ru] [nvarchar](100) NULL,
			[current_condition_name_en] [nvarchar](100) NULL,
			[current_condition_abbr_ru] [nvarchar](20) NULL,
			[current_condition_abbr_en] [nvarchar](20) NULL,
			[current_condition_red] [bit] NULL,
			[wagon_date_rem_uz] [datetime] NULL,
			[wagon_gruzp_doc] [float] NULL,
			[wagon_gruzp_uz] [float] NULL,
			[arrival_cargo_group_name_ru] [nvarchar](50) NULL,
			[arrival_cargo_group_name_en] [nvarchar](50) NULL,
			[arrival_cargo_name_ru] [nvarchar](50) NULL,
			[arrival_cargo_name_en] [nvarchar](50) NULL,
			[arrival_id_sertification_data] [int] NULL,
			[arrival_sertification_data_ru] [nvarchar](50) NULL,
			[arrival_sertification_data_en] [nvarchar](50) NULL,
			[arrival_id_commercial_condition] [int] NULL,
			[arrival_commercial_condition_ru] [nvarchar](50) NULL,
			[arrival_commercial_condition_en] [nvarchar](50) NULL,
			[arrival_station_from_code] [int] NULL,
			[arrival_station_from_name_ru] [nvarchar](50) NULL,
			[arrival_station_from_name_en] [nvarchar](50) NULL,
			[arrival_shipper_code] [int] NULL,
			[arrival_shipper_name_ru] [nvarchar](100) NULL,
			[arrival_shipper_name_en] [nvarchar](100) NULL,
			[arrival_station_amkr_name_ru] [nvarchar](50) NULL,
			[arrival_station_amkr_name_en] [nvarchar](50) NULL,
			[arrival_station_amkr_abbr_ru] [nvarchar](50) NULL,
			[arrival_station_amkr_abbr_en] [nvarchar](50) NULL,
			[arrival_division_amkr_code] [nvarchar](5) NULL,
			[arrival_division_amkr_name_ru] [nvarchar](250) NULL,
			[arrival_division_amkr_name_en] [nvarchar](250) NULL,
			[arrival_division_amkr_abbr_ru] [nvarchar](50) NULL,
			[arrival_division_amkr_abbr_en] [nvarchar](50) NULL,
			[current_id_loading_status] [int] NULL,
			[current_loading_status_ru] [nvarchar](30) NULL,
			[current_loading_status_en] [nvarchar](30) NULL,
			[current_wagon_busy] [int] NULL,
			[current_id_operation] [int] NULL,
			[current_operation_name_ru] [nvarchar](20) NULL,
			[current_operation_name_en] [nvarchar](20) NULL,
			[current_operation_start] [datetime] NULL,
			[current_operation_end] [datetime] NULL,
			[arrival_duration] [int] NULL,
			[arrival_idle_time] [int] NULL,
			[arrival_usage_fee] [numeric](2, 2) NULL,
			[current_station_duration] [int] NULL,
			[current_way_duration] [int] NULL,
			[current_station_idle_time] [int] NULL,
			[sap_incoming_supply_num] [nvarchar](10) NULL,
			[sap_incoming_supply_pos] [nvarchar](10) NULL,
			[sap_incoming_supply_date] [date] NULL,
			[sap_incoming_supply_time] [time](7) NULL,
			[sap_incoming_supply_warehouse_code] [nvarchar](4) NULL,
			[sap_incoming_supply_warehouse_name] [nvarchar](16) NULL,
			[sap_incoming_supply_cargo_code] [nvarchar](18) NULL,
			[sap_incoming_supply_cargo_name] [nvarchar](40) NULL,
			[sap_incoming_supply_cargo_ban] [nvarchar](4) NULL,
			--
			[sap_outgoing_supply_num] [char](10) NULL,
			[sap_outgoing_supply_date] [date] NULL,
			[sap_outgoing_supply_cargo_name] [nvarchar](160) NULL,
			[sap_outgoing_supply_cargo_code] [char](17) NULL,
			[sap_outgoing_supply_shipper_name] [nvarchar](150) NULL,
			[sap_outgoing_supply_shipper_code] [char](10) NULL,
			[sap_outgoing_supply_destination_station_name] [nvarchar](30) NULL,
			[sap_outgoing_supply_destination_station_code] [char](10) NULL,
			[sap_outgoing_supply_border_checkpoint_name] [nvarchar](30) NULL,
			[sap_outgoing_supply_border_checkpoint_code] [char](10) NULL,
			[sap_outgoing_supply_netto] [float] NULL,
			[sap_outgoing_supply_warehouse_code] [char](4) NULL,
			[sap_outgoing_supply_warehouse_name] [nvarchar](20) NULL,
			[sap_outgoing_supply_responsible_post] [nvarchar](50) NULL,
			[sap_outgoing_supply_responsible_fio] [nvarchar](50) NULL,
			[sap_outgoing_supply_payer_code] [char](15) NULL,
			[sap_outgoing_supply_payer_name] [nvarchar](50) NULL,
			--
			[instructional_letters_num] [nvarchar](20) NULL,
			[instructional_letters_datetime] [datetime] NULL,
			[instructional_letters_station_code] [int] NULL,
			[instructional_letters_station_name] [nvarchar](50) NULL,
			[instructional_letters_note] [nvarchar](500) NULL,
			[wagon_brutto_doc] [int] NULL,
			[wagon_brutto_amkr] [int] NULL,
			[wagon_tara_doc] [int] NULL,
			[wagon_tara_uz] [float] NULL,
			[wagon_tara_arc_doc] [int] NULL,
			[wagon_vesg_doc] [int] NULL,
			[wagon_vesg_amkr] [int] NULL,
			[diff_vesg] [int] NULL,
			[doc_outgoing_car] [bit] NULL,
			[arrival_nom_doc] [int] NULL,
			[arrival_nom_main_doc] [int] NULL,
			[arrival_klient] [bit] NULL,
			[arrival_composition_index] [nvarchar](50) NULL,
			[arrival_date_adoption] [datetime] NULL,
			[outgoing_id_return] [int] NULL,
			[outgoing_return_cause_ru] [nvarchar](150) NULL,
			[outgoing_return_cause_en] [nvarchar](150) NULL,
			[outgoing_date] [datetime] NULL,
			[outgoing_sostav_status] [int] NULL,
			[wagon_ban_uz] [nvarchar](1000) NULL,
			[wagon_closed_route] [bit] NULL,
			[wir_note] [nvarchar](250) NULL,
			[wir_highlight_color] [nchar](10) NULL
		)
		AS
		BEGIN

		--> Получим уставку норма простоя
		declare @arrival_idle_time int = CAST((select [value] from [IDS].[Settings] where area=N'wsd' and name = N'arrival_idle_time') AS INT);

		insert @view_wagons
	select wir.id as wir_id
		,wim.id as wim_id
		,wio.id as wio_id
		--=============== ОСНОВНОЕ ОКНО ==================
		,wir.num
		,wim.position
		--> Оператор
		,dir_operator.[id] as id_operator
		,dir_operator.[operators_ru]
		,dir_operator.[operators_en]
		,dir_operator.[abbr_ru] as operator_abbr_ru
		,dir_operator.[abbr_en] as operator_abbr_en
		,dir_rent.[rent_start] as operator_rent_start
		,dir_rent.[rent_end] as operator_rent_end
		,dir_operator.[paid] as operator_paid
		,dir_operator.[color] as operator_color
		,dir_operator.monitoring_idle_time as operator_monitoring_idle_time
		--> Ограничение
		,dir_limload.[id] as id_limiting_loading
		,dir_limload.[limiting_name_ru]
		,dir_limload.[limiting_name_en]
		,dir_limload.[limiting_abbr_ru]
		,dir_limload.[limiting_abbr_en]
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
		--> Разметка по прибытию
		,arr_dir_cond.condition_name_ru as arrival_condition_name_ru
		,arr_dir_cond.condition_name_en as arrival_condition_name_en
		,arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru
		,arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en
		,arr_dir_cond.red as arrival_condition_red
		--> Разметка по текущей операции
		,cur_dir_cond.condition_name_ru as current_condition_name_ru
		,cur_dir_cond.condition_name_en as current_condition_name_en
		,cur_dir_cond.condition_abbr_ru as current_condition_abbr_ru
		,cur_dir_cond.condition_abbr_en as current_condition_abbr_en
		,cur_dir_cond.red as current_condition_red
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
		--> Станция назначения
		,arr_dir_station_amkr.station_name_ru as arrival_station_amkr_name_ru
		,arr_dir_station_amkr.station_name_en as arrival_station_amkr_name_en
		,arr_dir_station_amkr.station_abbr_ru as arrival_station_amkr_abbr_ru
		,arr_dir_station_amkr.station_abbr_en as arrival_station_amkr_abbr_en
		--> Цех получатель
		,arr_dir_division_amkr.code as arrival_division_amkr_code
		,arr_dir_division_amkr.name_division_ru as arrival_division_amkr_name_ru
		,arr_dir_division_amkr.name_division_en as arrival_division_amkr_name_en
		,arr_dir_division_amkr.division_abbr_ru as arrival_division_amkr_abbr_ru
		,arr_dir_division_amkr.division_abbr_en as arrival_division_amkr_abbr_en
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
		,[arrival_duration] = DATEDIFF (minute, arr_sost.date_adoption, getdate())
		,[arrival_idle_time] = @arrival_idle_time -- Норма простоя
		,[arrival_usage_fee] = 0.00
		--=============== ПРОСТОЙ НА ЖД. СТАНЦИИ ==================
		,[current_station_duration] = DATEDIFF (minute, (select [IDS].[get_start_datetime_station_of_wim](wim.id)), getdate())
		,[current_way_duration] = DATEDIFF (minute, wim.way_start, getdate())
		,cur_dir_station_amkr.idle_time as current_station_idle_time
		--=============== ВНУТРИЗАВОДСКОЕ ПЕРЕМЕЩЕНИЕ( В/З) ==================
		--> ....
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
		--=============== ВХОДЯЩЕЕ ВЗВЕШИВАНИЕ ==================
		--> Брутто
		--,wagon_brutto_doc = (CASE WHEN arr_doc_vag.ves_tary_arc is not null AND arr_doc_vag.vesg is not null THEN arr_doc_vag.ves_tary_arc+arr_doc_vag.vesg ELSE null END)	--Брутто по ЭПД, тн
		,wagon_brutto_doc = (CASE WHEN arr_doc_vag.ves_tary_arc is not null AND arr_doc_vag.vesg is not null 
									THEN arr_doc_vag.ves_tary_arc+arr_doc_vag.vesg 
									ELSE (CASE WHEN arr_doc_vag.u_tara is not null AND arr_doc_vag.vesg is not null 
												THEN arr_doc_vag.u_tara+arr_doc_vag.vesg 
												ELSE null 
												END) 
								END)	--Брутто по ЭПД, тн
		,wagon_brutto_amkr = 0
		--> Тара
		,arr_doc_vag.u_tara as wagon_tara_doc
		,dir_wagon.tara as wagon_tara_uz
		,arr_doc_vag.ves_tary_arc as wagon_tara_arc_doc		--Тара по ЭПД, тн.
		--> Вес груза (Нетто)	
		,arr_doc_vag.vesg as wagon_vesg_doc					--Нетто по ЭПД, тн
		,wagon_vesg_amkr = 0
		--> Вес груза (Разница)		
		,diff_vesg = 0
		--=============== ОСТАЛЬНОЕ ==================
		,wir.doc_outgoing_car as doc_outgoing_car				-- Наличие документа для сдачи
		,arr_doc_uz.[nom_doc] as arrival_nom_doc			-- Номер документа(досылки)
		,arr_doc_uz.[nom_main_doc] as arrival_nom_main_doc		-- Номер основного документа (если заполнен)
		,arr_doc_uz.[klient] as arrival_klient					-- Признак контр-агента
		,arr_sost.composition_index as arrival_composition_index
		,arr_sost.date_adoption as arrival_date_adoption		-- дата приема
		,out_car.[id_outgoing_return_start] as outgoing_id_return
		,dir_return.[cause_ru] as outgoing_return_cause_ru
		,dir_return.[cause_en] as outgoing_return_cause_en
		,out_sost.date_outgoing as outgoing_date				-- дата отправки
		,out_sost.status as outgoing_sostav_status				-- статус состава для отправки
		,dir_wagon.note as wagon_ban_uz							-- Запреты по УЗ 
		,dir_wagon.[closed_route] as wagon_closed_route			--Замкнутый маршрут (кольцо)
		,wir.note as wir_note									-- Примечание по ходу движения вагона
		,wir.highlight_color as wir_highlight_color				-- Подсветка строки
	FROM IDS.WagonInternalMovement as wim	--> Текущая дислокаци
		--> Текущее внетренее перемещение
		 INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
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
		 --> Документы SAP Входящая поставка
		Left JOIN [IDS].[SAPIncomingSupply] as sap_is ON wir.id_sap_incoming_supply = sap_is.id
		 --==== СДАЧА ВАГОНА И ЗАДЕРЖАНИЯ ================================================================
		--> Отправка вагона
		Left JOIN [IDS].[OutgoingCars] as out_car ON wir.id_outgoing_car = out_car.id
		--> Отправка состава
		Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_car.id_outgoing = out_sost.id
				 --> Документы SAP Исходящая поставка
		Left JOIN [IDS].[SAPOutgoingSupply] as sap_os ON wir.id_sap_outbound_supply = sap_os.id
		 --==== ИНСТРУКТИВНЫЕ ПИСЬМА =====================================================================
		--> Перечень вагонов по письма
		Left JOIN IDS.InstructionalLettersWagon as ilw  ON ilw.id = (SELECT TOP (1) [id] FROM [IDS].[InstructionalLettersWagon] where [num] =wir.num and [close] is null order by id desc)
		--> Перечень писем
		Left JOIN IDS.InstructionalLetters as il ON ilw.id_instructional_letters = il.id
		--==== СПРАВОЧНИКИ ===================================================================================
		--> Справочник вагонов
		Left JOIN IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num
		--> Справочник аренд
		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
		--> Справочник Оператор вагона
		Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_rent.id_operator =  dir_operator.id
		--> Справочник Ограничение погрузки
		Left JOIN IDS.Directory_LimitingLoading as dir_limload ON dir_rent.id_limiting =  dir_limload.id
		--> Справочник Собственник вагона по УЗ
		Left JOIN [IDS].[Directory_OwnersWagons] as dir_owner ON dir_wagon.id_owner = dir_owner.id
		--> Справочник строна (Администрация вагона)
		Left JOIN IDS.Directory_Countrys as dir_countrys ON dir_wagon.id_countrys = dir_countrys.id
		--> Справочник Род вагона
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
		--> Справочник Тип вагона
		Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
		--> Справочник Разметка по прибытию
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> Справочник Разметка по текущей операции
		Left JOIN IDS.Directory_ConditionArrival as cur_dir_cond ON wio.id_condition =  cur_dir_cond.id
		--> Справочник Грузоотправитель
		Left JOIN [IDS].[Directory_Shipper] as shipper ON arr_doc_uz.[code_shipper] = shipper.[code]
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
		--> Справочник Станции АМКР (станция назначения АМКР)
		Left JOIN IDS.Directory_Station as arr_dir_station_amkr ON arr_doc_vag.id_station_on_amkr =  arr_dir_station_amkr.id
		--> Справочник Станции АМКР (текущая станция АМКР)
		Left JOIN IDS.Directory_Station as cur_dir_station_amkr ON wim.id_station =  cur_dir_station_amkr.id
		--> Справочник Подразделения (цех получатель)
		Left JOIN IDS.Directory_Divisions as arr_dir_division_amkr ON arr_doc_vag.id_division_on_amkr =  arr_dir_division_amkr.id
		--> Справочник Операции над вагоном (текущая операция)
		Left JOIN IDS.Directory_WagonOperations as cur_dir_operation ON wio.id_operation =  cur_dir_operation.id
		--> Справочник Сотояния загрузки
		Left JOIN [IDS].[Directory_WagonLoadingStatus] as cur_load ON wio.id_loading_status = cur_load.id
		--> Справочник Внешних станций УЗ
		Left JOIN UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs
		--> Справочник Возвратов
		Left JOIN [IDS].[Directory_DetentionReturn] as dir_return ON out_car.id_outgoing_return_start = dir_return.id
	WHERE (wim.id_way = @id_way) AND (wim.way_end IS NULL)
	--order by wim.position
	RETURN
 END

