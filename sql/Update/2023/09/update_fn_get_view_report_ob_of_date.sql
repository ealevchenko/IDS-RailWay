USE [KRR-PA-CNT-Railway]
GO
/****** Object:  UserDefinedFunction [IDS].[get_view_report_ob_of_date]    Script Date: 05.10.2023 9:39:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER FUNCTION [IDS].[get_view_report_ob_of_date]
 (
   @date datetime
 )
	RETURNS 
	@operating_balance TABLE(
		[num] [int] NULL,
		[date_adoption] [datetime] NULL,
		[group] [nvarchar](20) NULL,
		[id_operator] [int] NULL,
		[current_wagons_rent_operators_ru] [nvarchar](100) NULL,
		[current_wagons_rent_operators_en] [nvarchar](100) NULL,
		[current_wagons_rent_operator_abbr_ru] [nvarchar](20) NULL,
		[current_wagons_rent_operator_abbr_en] [nvarchar](20) NULL,
		[current_wagons_rent_operator_paid] [bit] NULL,
		[arrival_uz_vagon_id_genus] [int] NULL,
		[arrival_uz_vagon_rod] [int] NULL,
		[arrival_uz_vagon_rod_name_ru] [nvarchar](50) NULL,
		[arrival_uz_vagon_rod_name_en] [nvarchar](50) NULL,
		[arrival_uz_vagon_rod_abbr_ru] [nvarchar](5) NULL,
		[arrival_uz_vagon_rod_abbr_en] [nvarchar](5) NULL,
		[arrival_uz_vagon_id_condition] [int] NULL,
		[arrival_uz_vagon_condition_name_ru] [nvarchar](100) NULL,
		[arrival_uz_vagon_condition_name_en] [nvarchar](100) NULL,
		[arrival_uz_vagon_condition_abbr_ru] [nvarchar](20) NULL,
		[arrival_uz_vagon_condition_abbr_en] [nvarchar](20) NULL,
		[arrival_uz_vagon_condition_repairs] [bit] NULL,
		[current_id_condition] [int] NULL,
		[current_condition_name_ru] [nvarchar](100) NULL,
		[current_condition_name_en] [nvarchar](100) NULL,
		[current_condition_abbr_ru] [nvarchar](20) NULL,
		[current_condition_abbr_en] [nvarchar](20) NULL,
		[current_condition_repairs] [bit] NULL,
		[current_id_station_amkr] [int] NOT NULL,
		[current_station_amkr_name_ru] [nvarchar](50) NULL,
		[current_station_amkr_name_en] [nvarchar](50) NULL,
		[current_station_amkr_abbr_ru] [nvarchar](50) NULL,
		[current_station_amkr_abbr_en] [nvarchar](50) NULL,
		[arrival_uz_vagon_id_cargo] [int] NULL,
		[arrival_uz_vagon_cargo_name_ru] [nvarchar](50) NULL,
		[arrival_uz_vagon_cargo_name_en] [nvarchar](50) NULL,
		[arrival_uz_vagon_id_group] [int] NULL,
		[arrival_uz_vagon_cargo_group_name_ru] [nvarchar](50) NULL,
		[arrival_uz_vagon_cargo_group_name_en] [nvarchar](50) NULL,
		[arrival_uz_document_code_stn_from] [int] NULL,
		[arrival_uz_document_station_from_name_ru] [nvarchar](50) NULL,
		[arrival_uz_document_station_from_name_en] [nvarchar](50) NULL
	)
	AS
	BEGIN
	insert @operating_balance
	SELECT 
		wir.num
		,arr_sost.date_adoption
		,dir_curr_owg.[group]
		,curr_wag_rent.id_operator
		,curr_dir_operator.[operators_ru] as current_wagons_rent_operators_ru	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.[operators_en] as current_wagons_rent_operators_en	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.[abbr_ru] as current_wagons_rent_operator_abbr_ru		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.[abbr_en] as current_wagons_rent_operator_abbr_en		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.paid as current_wagons_rent_operator_paid
		,arr_doc_vag.[id_genus]	 as arrival_uz_vagon_id_genus							-- id строки род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.rod_uz as arrival_uz_vagon_rod											-- Код рода вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_ru as arrival_uz_vagon_rod_name_ru								-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_en as arrival_uz_vagon_rod_name_en								-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_ru as arrival_uz_vagon_rod_abbr_ru								-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_en as arrival_uz_vagon_rod_abbr_en								-- Род вагона [IDS].[Directory_GenusWagons] по отправке [IDS].[Arrival_UZ_Vagon]
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
		--> ТЕКУЩАЯ СТАНЦИЯ
		,wim.id_station as current_id_station_amkr
		,cur_dir_station_amkr.station_name_ru as current_station_amkr_name_ru
		,cur_dir_station_amkr.station_name_en as current_station_amkr_name_en
		,cur_dir_station_amkr.station_abbr_ru as current_station_amkr_abbr_ru
		,cur_dir_station_amkr.station_abbr_en as current_station_amkr_abbr_en
		--> СПРАВОЧНИК ГРУЗА [IDS].[Directory_Cargo]
		,arr_doc_vag.[id_cargo] as arrival_uz_vagon_id_cargo
		,arr_dir_cargo.cargo_name_ru as arrival_uz_vagon_cargo_name_ru
		,arr_dir_cargo.cargo_name_en as arrival_uz_vagon_cargo_name_en
		--> СПРАВОЧНИК ГРУППА ГРУЗА [IDS].[Directory_CargoGroup]	
		,arr_dir_cargo.[id_group] as arrival_uz_vagon_id_group								-- id группа груза [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_ru as arrival_uz_vagon_cargo_group_name_ru	-- Группа грузов [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_en as arrival_uz_vagon_cargo_group_name_en	-- Группа грузов [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> СПРАВОЧНИК СТАНЦИИ ОТПРАВЛЕНИЯ [IDS].[Directory_ExternalStation]
		,arr_doc_uz.[code_stn_from]  as arrival_uz_document_code_stn_from
		,arr_ext_station_from.[station_name_ru] as arrival_uz_document_station_from_name_ru
		,arr_ext_station_from.[station_name_en] as arrival_uz_document_station_from_name_en

	FROM [IDS].[WagonInternalMovement] as wim
		--> Внутренее перемещение вагона
		Left JOIN  IDS.[WagonInternalRoutes] as wir ON wir.id = wim.id_wagon_internal_routes
		--> Внутренее операции вагона
		Left JOIN [IDS].[WagonInternalOperation] as wio ON wio.id = (select top(1) [id] FROM [IDS].[WagonInternalOperation] WHERE [id_wagon_internal_routes] = wim.id_wagon_internal_routes AND [operation_end] <= @date order by [operation_end] desc)
			--==== ПРИЕМ ВАГОНА =====================================================================
		--> Прибытие вагона
		Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
		--> Прибытие состава
		Left JOIN IDS.ArrivalSostav as arr_sost ON arr_car.id_arrival = arr_sost.id
		--> Документы на вагон по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		--> Документы на группу вагонов (состав) по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
		--> Справочник Разметка по прибытию
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> Справочник Текущая разметка
		Left JOIN IDS.Directory_ConditionArrival as cur_dir_cond ON wio.id_condition = cur_dir_cond.id
		--==== ОТПРАВКА ВАГОНА =====================================================================
		--> Отправка вагона
		Left JOIN IDS.OutgoingCars as out_car ON wir.id_outgoing_car = out_car.id
		--> Отправка состава
		Left JOIN IDS.OutgoingSostav as out_sost ON out_car.id_outgoing = out_sost.id
		--==== СПРАВОЧНИКИ =====================================================================
		--> Справочник Род вагона по прибытию
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON arr_doc_vag.[id_genus] = dir_rod.id
		--> Справочник аренд текущих
		Left JOIN [IDS].[Directory_WagonsRent] as curr_wag_rent ON curr_wag_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@date order by [id] desc)	
		--> Справочник Оператор вагона текущий
		Left JOIN IDS.Directory_OperatorsWagons as curr_dir_operator ON curr_wag_rent.id_operator =  curr_dir_operator.id
		--> Документы группа операторов	текущая	
		Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_curr_owg ON curr_wag_rent.id_operator = dir_curr_owg.[id_operator]
		--> Справочник Станции АМКР (текущая станция АМКР)
		Left JOIN IDS.Directory_Station as cur_dir_station_amkr ON wim.id_station =  cur_dir_station_amkr.id
		--> Справочник Грузов по прибытию
		Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
		--> Справочник Группы Грузов по прибытию
		Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		--> Справочник Внешних станций (по прибытию from)
		Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON arr_doc_uz.[code_stn_from] = arr_ext_station_from.code
	where 
		wim.id in (SELECT max(ID) FROM IDS.WagonInternalMovement 
			where  id_station <> 10 AND 
				((outer_way_start is null AND (([way_start]<=@date and way_end>=@date) OR ([way_start]<=@date and way_end is null))) OR
				(outer_way_start is not null AND ((outer_way_start<=@date and outer_way_end>=@date) OR (outer_way_start<=@date and outer_way_end is null))))
			Group by id_wagon_internal_routes)
		AND arr_sost.date_adoption <= @date
		AND (out_sost.[date_outgoing] is null OR out_sost.[date_outgoing] > @date) 	
		-- Исключим ЛОКОМОТИВЫ
		AND (dir_rod.rod_uz <> 90 or dir_rod.rod_uz is null) AND NOT arr_doc_uz.[klient] = 1 AND (NOT dir_curr_owg.[group] in ('amkr_vz') OR dir_curr_owg.[group] is null)
	order by arr_sost.date_adoption desc
	RETURN
 END
 
