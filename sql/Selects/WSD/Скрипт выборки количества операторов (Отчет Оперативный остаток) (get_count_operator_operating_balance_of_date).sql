use [KRR-PA-CNT-Railway]

declare @date datetime = convert(datetime,'2023-07-01 20:00:00',120)
declare @operator sysname =  N'ЦТЛ'

select [IDS].[get_count_operator_operating_balance_of_date](@date, @operator) 

	select count(wir.num)
	FROM IDS.WagonInternalMovement as wim
		--> Внутренее перемещение
		Left JOIN [IDS].[WagonInternalRoutes] as wir ON wir.id = wim.id_wagon_internal_routes
		--> Прибытие вагона
		Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
		--> Документы на вагон по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		-- --> Документы на группу вагонов (состав) по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
		--> Отправка вагона
		Left JOIN IDS.OutgoingCars as out_car ON wir.id_outgoing_car = out_car.id
		----> Отправка состава
		Left JOIN IDS.OutgoingSostav as out_sost ON out_car.id_outgoing = out_sost.id
		--> Справочник аренд текущих
		Left JOIN [IDS].[Directory_WagonsRent] as curr_wag_rent ON curr_wag_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@date order by [id] desc)	
		--> Справочник Оператор вагона текущий
		Left JOIN IDS.Directory_OperatorsWagons as curr_dir_operator ON curr_wag_rent.id_operator =  curr_dir_operator.id
		--> Справочник Род вагона по прибытию
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON arr_doc_vag.[id_genus] = dir_rod.id
		--> Документы группа операторов	текущая	
		Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_curr_owg ON curr_wag_rent.id_operator = dir_curr_owg.[id_operator]
	WHERE
		wim.id_station <> 10 
		and curr_dir_operator.[abbr_ru] = @operator
		-- Исключим ЛОКОМОТИВЫ
		AND (dir_rod.rod_uz <> 90 or dir_rod.rod_uz is null) AND NOT arr_doc_uz.[klient] = 1 AND (NOT dir_curr_owg.[group] in ('amkr_vz') OR dir_curr_owg.[group] is null)
		AND 
		((wim.outer_way_start is null AND ((wim.[way_start]<=@date and wim.way_end>=@date) OR (wim.[way_start]<=@date and wim.way_end is null)))
		OR
		(wim.outer_way_start is not null AND ((wim.outer_way_start<=@date and wim.outer_way_end>=@date) OR (wim.outer_way_start<=@date and wim.outer_way_end is null))))
		AND 
		(out_sost.[date_outgoing] is null OR out_sost.[date_outgoing] > @date)
		--group by curr_dir_operator.[abbr_ru]