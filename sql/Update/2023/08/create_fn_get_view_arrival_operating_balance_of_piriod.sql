USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_arrival_operating_balance_of_piriod]    Script Date: 07.08.2023 14:41:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE FUNCTION [IDS].[get_view_arrival_operating_balance_of_piriod]
 (
   @start datetime,
   @stop datetime
 )
	RETURNS 
	@operating_balance TABLE(
	[num] [int] NULL,
	[current_operators_wagons_group] [nvarchar](20) NULL,
	[current_wagons_rent_id_operator] [int] NULL,
	[current_wagons_rent_operators_ru] [nvarchar](100) NULL,
	[current_wagons_rent_operators_en] [nvarchar](100) NULL,
	[current_wagons_rent_operator_abbr_ru] [nvarchar](20) NULL,
	[current_wagons_rent_operator_abbr_en] [nvarchar](20) NULL,
	[current_wagons_rent_start] [datetime] NULL,
	[current_wagons_rent_end] [datetime] NULL,
	[current_wagons_rent_operator_paid] [bit] NULL,
	[current_wagons_rent_operator_color] [nvarchar](10) NULL,
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
	[arrival_uz_vagon_id_genus] [int] NULL,
	[arrival_uz_vagon_rod] [int] NULL,
	[arrival_uz_vagon_rod_name_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_rod_name_en] [nvarchar](50) NULL,
	[arrival_uz_vagon_rod_abbr_ru] [nvarchar](5) NULL,
	[arrival_uz_vagon_rod_abbr_en] [nvarchar](5) NULL,
	[arrival_uz_vagon_id_cargo] [int] NULL,
	[arrival_uz_vagon_cargo_name_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_cargo_name_en] [nvarchar](50) NULL,
	[arrival_uz_vagon_id_group] [int] NULL,
	[arrival_uz_vagon_cargo_group_name_ru] [nvarchar](50) NULL,
	[arrival_uz_vagon_cargo_group_name_en] [nvarchar](50) NULL,
	[arrival_uz_document_code_stn_from] [int] NULL,
	[arrival_uz_document_station_from_name_ru] [nvarchar](50) NULL,
	[arrival_uz_document_station_from_name_en] [nvarchar](50) NULL,
	[current_id_station_amkr] [int] NULL,
	[current_station_amkr_name_ru] [nvarchar](50) NULL,
	[current_station_amkr_name_en] [nvarchar](50) NULL,
	[current_station_amkr_abbr_ru] [nvarchar](50) NULL,
	[current_station_amkr_abbr_en] [nvarchar](50) NULL,
	[current_id_way] [int] NULL,
	[current_id_park] [int] NULL,
	[current_way_num_ru] [nvarchar](20) NULL,
	[current_way_num_en] [nvarchar](20) NULL,
	[current_way_name_ru] [nvarchar](100) NULL,
	[current_way_name_en] [nvarchar](100) NULL,
	[current_way_abbr_ru] [nvarchar](50) NULL,
	[current_way_abbr_en] [nvarchar](50) NULL,
	[current_way_start] [datetime] NULL,
	[current_way_end] [datetime] NULL,
	[current_wim_note] [nvarchar](250) NULL,
	[current_id_outer_way] [int] NULL,
	[current_outer_way_name_ru] [nvarchar](150) NULL,
	[current_outer_way_name_en] [nvarchar](150) NULL,
	[current_outer_way_start] [datetime] NULL,
	[current_outer_way_end] [datetime] NULL,
	[arrival_sostav_date_arrival] [datetime] NOT NULL,
	[arrival_sostav_date_adoption] [datetime] NULL,
	[arrival_sostav_date_adoption_act] [datetime] NULL,
	[arrival_sostav_old_date_adoption] [datetime] NULL,
	[arrival_sostav_old_date_adoption_act] [datetime] NULL,
	[outgoing_sostav_date_outgoing] [datetime] NULL,
	[outgoing_sostav_date_outgoing_act] [datetime] NULL
	)
	AS
	BEGIN
	insert @operating_balance
	SELECT arr_car.num
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
		--> IDS.Directory_Cargo
		,arr_doc_vag.[id_cargo] as arrival_uz_vagon_id_cargo
		,arr_dir_cargo.cargo_name_ru as arrival_uz_vagon_cargo_name_ru
		,arr_dir_cargo.cargo_name_en as arrival_uz_vagon_cargo_name_en
		--> СПРАВОЧНИК ГРУППА ГРУЗА [IDS].[Directory_CargoGroup]	
		,arr_dir_cargo.[id_group] as arrival_uz_vagon_id_group								-- id группа груза [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_ru as arrival_uz_vagon_cargo_group_name_ru	-- Группа грузов [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_en as arrival_uz_vagon_cargo_group_name_en	-- Группа грузов [IDS].[Directory_CargoGroup] по прибытию [IDS].[Arrival_UZ_Vagon]
		--> [IDS].[Directory_ExternalStation]
		,arr_doc_uz.[code_stn_from]  as arrival_uz_document_code_stn_from
		,arr_ext_station_from.[station_name_ru] as arrival_uz_document_station_from_name_ru
		,arr_ext_station_from.[station_name_en] as arrival_uz_document_station_from_name_en
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
		--
		,arr_sost.[date_arrival] as arrival_sostav_date_arrival
		,arr_sost.[date_adoption] as arrival_sostav_date_adoption
		,arr_sost.[date_adoption_act] as arrival_sostav_date_adoption_act
		-- Показать дату приема с учетом возврата
		,arrival_sostav_old_date_adoption = CASE  WHEN arr_doc_vag.[cargo_returns] = 1 THEN arr_sost_old.[date_adoption] ELSE arr_sost.[date_adoption] END
		,arrival_sostav_old_date_adoption_act = CASE  WHEN arr_doc_vag.[cargo_returns] = 1 THEN arr_sost_old.[date_adoption_act] ELSE arr_sost.[date_adoption_act] END
				--
		,out_sost.date_outgoing as outgoing_sostav_date_outgoing
		,out_sost.date_outgoing_act as outgoing_sostav_date_outgoing_act
		--into arrival_operating_balance
	FROM [IDS].[ArrivalSostav] as arr_sost
  		--> Прибытие вагона
		Left JOIN IDS.ArrivalCars as arr_car ON arr_sost.id = arr_car.id_arrival
		--> Документы на вагон по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		--> Документы на группу вагонов (состав) по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
		--> Внутренее перемещение
		Left JOIN [IDS].[WagonInternalRoutes] as wir ON wir.id_arrival_car = arr_car.id
		Left JOIN [IDS].[WagonInternalMovement] as wim ON wim.id = (  select top(1) [id] FROM [IDS].[WagonInternalMovement] WHERE [id_wagon_internal_routes] = wir.id AND ((outer_way_start is null AND (([way_start]<=@stop and way_end>=@stop) OR ([way_start]<=@stop and way_end is null))) OR (outer_way_start is not null AND ((outer_way_start<=@stop and outer_way_end>=@stop) OR (outer_way_start<=@stop and outer_way_end is null)))))
		Left JOIN [IDS].[WagonInternalOperation] as wio ON wio.id = (select top(1) [id] FROM [IDS].[WagonInternalOperation] WHERE [id_wagon_internal_routes] = wir.id and [operation_end]<=@stop order by [id] desc)
		--> Предыдущее Прибытие состава c учетом возврата
		Left JOIN IDS.ArrivalSostav as arr_sost_old ON arr_sost_old.id = [IDS].[get_old_id_arrival_of_wir_parent_id](wir.parent_id)		
		--> Отправленные вагоны		
		Left JOIN IDS.OutgoingCars as out_car ON out_car.id = wir.id_outgoing_car
		Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_sost.id = out_car.id_outgoing
		--==== СПРАВОЧНИКИ ===================================================================================
		--> Справочник аренд текущих
		Left JOIN [IDS].[Directory_WagonsRent] as curr_wag_rent ON curr_wag_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = arr_car.num and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@stop order by [id] desc)	
		--> Справочник Оператор вагона текущий
		Left JOIN IDS.Directory_OperatorsWagons as curr_dir_operator ON curr_wag_rent.id_operator =  curr_dir_operator.id
		--> Документы группа операторов	текущая	
		Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_curr_owg ON curr_wag_rent.id_operator = dir_curr_owg.[id_operator]
		--> Справочник Разметка по прибытию
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> Справочник Текущая разметка
		Left JOIN IDS.Directory_ConditionArrival as cur_dir_cond ON wio.id_condition = cur_dir_cond.id
		--> Справочник Род вагона по прибытию
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON arr_doc_vag.[id_genus] = dir_rod.id
		--> Справочник Грузов по прибытию
		Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
		--> Справочник Группы Грузов по прибытию
		Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		--> Справочник Внешних станций (по прибытию from)
		Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON arr_doc_uz.[code_stn_from] = arr_ext_station_from.code
		--> Справочник Станции АМКР (текущая станция АМКР)
		Left JOIN IDS.Directory_Station as cur_dir_station_amkr ON wim.id_station =  cur_dir_station_amkr.id
		--> Справочник текущий путь
	    Left JOIN [IDS].[Directory_Ways] as cur_dir_way ON wim.[id_way] = cur_dir_way.id
		--> Справочник Внешний путь отправки
		Left JOIN IDS.Directory_OuterWays as outer_ways ON wim.id_outer_way = outer_ways.id 

	WHERE wim.id_station <> 10 
	-- Исключим ЛОКОМОТИВЫ
	AND (dir_rod.rod_uz <> 90 or dir_rod.rod_uz is null) AND NOT arr_doc_uz.[klient] = 1 AND (NOT dir_curr_owg.[group] in ('amkr_vz') OR dir_curr_owg.[group] is null)
	--and curr_dir_operator.[abbr_ru] = N'ЦТЛ'
	and arr_sost.[date_adoption] >= @start and arr_sost.[date_adoption] <= @stop
  RETURN
 END
 




GO


