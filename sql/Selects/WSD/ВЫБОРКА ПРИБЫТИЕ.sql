use [KRR-PA-CNT-Railway]
SELECT 
	  dir_operation.operation_abbr_ru as 'Операция'
	  ,wio.[operation_end] as 'Дата окончания Прибытие'
	  ,dir_station_amkr.station_abbr_ru as 'Станция Прибытие'
	  --,dir_operator.[abbr_ru] as 'Оператор'
	  , count(wio.[id]) as 'Кол-во вагонов'
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation] as wio
	INNER JOIN IDS.WagonInternalRoutes as wir ON wio.id_wagon_internal_routes = wir.id
	INNER JOIN IDS.WagonInternalMovement as wim ON wim.[outer_way_end] = wio.operation_end and  wim.id_wagon_internal_routes = wio.id_wagon_internal_routes
	--> Справочник аренд
	--Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
	----> Справочник группы Операторов вагона
	--Left JOIN IDS.Directory_OperatorsWagonsGroup as dir_operator_group ON dir_rent.id_operator =  dir_operator_group.id_operator
	--> Справочник Операции над вагоном (текущая операция)
	INNER JOIN IDS.Directory_WagonOperations as dir_operation ON dir_operation.id = wio.[id_operation]
	--> Справочник Оператор вагона
	--Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_rent.id_operator =  dir_operator.id
	INNER JOIN IDS.Directory_Station as dir_station_amkr ON dir_station_amkr.id = wim.id_station
  where wio.[id_operation] in (6) and wio.[operation_start] >= '2025-07-01 00:00:00.000' and wio.[operation_end]<= '2025-10-20 00:00:00.000'
  group by dir_operation.operation_abbr_ru, wio.[operation_end], dir_station_amkr.station_abbr_ru
  order by dir_operation.operation_abbr_ru, dir_station_amkr.station_abbr_ru, wio.[operation_end]