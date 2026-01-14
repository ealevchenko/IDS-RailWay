USE [KRR-PA-CNT-Railway]

declare @start datetime = convert(datetime,'2023-08-26 20:01:00',120)
declare @stop datetime = convert(datetime,'2023-08-27 20:00:00',120)

select [type] = 'arrival'
,arr_car.num
,dir_curr_owg.[group]
,curr_wag_rent.id_operator
,curr_dir_operator.[operators_ru] as current_wagons_rent_operators_ru	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
,curr_dir_operator.[operators_en] as current_wagons_rent_operators_en	-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
,curr_dir_operator.[abbr_ru] as current_wagons_rent_operator_abbr_ru		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
,curr_dir_operator.[abbr_en] as current_wagons_rent_operator_abbr_en		-- Оператор [IDS].[Directory_OperatorsWagons] по прибытию [IDS].[Arrival_UZ_Vagon]
FROM [IDS].[ArrivalSostav] as arr_sost
	--> Прибытие вагона
	Left JOIN IDS.ArrivalCars as arr_car ON arr_sost.id = arr_car.id_arrival
	--> Документы на вагон по принятию вагона на АМКР
	Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
	--> Документы на группу вагонов (состав) по принятию вагона на АМКР
	Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
	--==== СПРАВОЧНИКИ =====================================================================
	--> Справочник Род вагона по прибытию
	Left JOIN IDS.Directory_GenusWagons as dir_rod ON arr_doc_vag.[id_genus] = dir_rod.id
	--> Справочник аренд текущих
	Left JOIN [IDS].[Directory_WagonsRent] as curr_wag_rent ON curr_wag_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = arr_car.num and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@stop order by [id] desc)	
	--> Справочник Оператор вагона текущий
	Left JOIN IDS.Directory_OperatorsWagons as curr_dir_operator ON curr_wag_rent.id_operator =  curr_dir_operator.id
	--> Документы группа операторов	текущая	
	Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_curr_owg ON curr_wag_rent.id_operator = dir_curr_owg.[id_operator]
where arr_sost.id_station_on <> 10 
	AND arr_car.position_arrival is not null
	-- Исключим ЛОКОМОТИВЫ
	AND (dir_rod.rod_uz <> 90 or dir_rod.rod_uz is null) AND NOT arr_doc_uz.[klient] = 1 AND (NOT dir_curr_owg.[group] in ('amkr_vz') OR dir_curr_owg.[group] is null)
	--and curr_dir_operator.[abbr_ru] = N'ЦТЛ'
	and arr_sost.[date_adoption] >= @start and arr_sost.[date_adoption] <= @stop