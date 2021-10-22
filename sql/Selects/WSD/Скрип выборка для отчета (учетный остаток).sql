
--SELECT count([num]) count_wagon 
--FROM [IDS].[Directory_WagonsRent] where rent_end is null and  [id_operator] in 
--	(SELECT [id_operator] FROM [IDS].[Directory_OperatorsWagonsGroup] WHERE [group]=N'amkr') 
 
-- and [num] in 
--	(SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in 
--		(SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_way] in	
--			(SELECT [id] FROM [IDS].[Directory_Ways] where [id_park] = 71 and [id_station]=6) 
--		and [way_start] is not null and [way_end] is null )
--	)


select 
	wim.id
	,dir_rent.num
	,dir_rent.id_operator
	,out_sost.status
	--,dir_rent.*
	--,wim.*
FROM IDS.WagonInternalMovement as wim	--> Текущая дислокаци
--> Текущее внетренее перемещение
INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
--> Справочник аренд
Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
--> Отправка вагона
Left JOIN [IDS].[OutgoingCars] as out_car ON wir.id_outgoing_car = out_car.id
--> Отправка состава
Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_car.id_outgoing = out_sost.id
where 
-- Исключим КИРОВА
wim.id_station <> 10
-- Вагоны на станциях
AND (wim.way_end IS NULL and wim.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].Directory_Station where station_delete is null))) 
-- Добавить на перегонах
OR (wim.outer_way_start is not NULL and wim.outer_way_end is null)
order by out_sost.status desc