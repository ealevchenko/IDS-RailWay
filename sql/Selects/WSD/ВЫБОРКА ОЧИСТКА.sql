use [KRR-PA-CNT-Railway]
SELECT 
	  dir_operation.operation_abbr_ru as 'Операция'
	  ,wio.[operation_end] as 'Дата окончания очистки'
	  ,dir_station_amkr.station_abbr_ru as 'Станция очистки'
	  --,dir_division_amkr.division_abbr_ru as 'Цех-выгрузки'
	  ,dir_operator.[abbr_ru] as 'Оператор'
	  , count(wio.[id]) as 'Кол-во вагонов'
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation] as wio
	INNER JOIN IDS.WagonInternalRoutes as wir ON wio.id_wagon_internal_routes = wir.id
	INNER JOIN IDS.WagonInternalMovement as wim ON wim.id_wio = wio.id
	--> Справочник аренд
	Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
	--> Справочник группы Операторов вагона
	Left JOIN IDS.Directory_OperatorsWagonsGroup as dir_operator_group ON dir_rent.id_operator =  dir_operator_group.id_operator
	--> Справочник Операции над вагоном (текущая операция)
	Left JOIN IDS.Directory_WagonOperations as dir_operation ON dir_operation.id = wio.[id_operation]
	--> Справочник Оператор вагона
	Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_rent.id_operator =  dir_operator.id
	Left JOIN IDS.Directory_Station as dir_station_amkr ON dir_station_amkr.id = wim.id_station
	Left JOIN IDS.WagonFiling as wf ON wf.id = wim.id_filing
	--> Справочник Подразделения (цех получатель)
	Left JOIN IDS.Directory_Divisions as dir_division_amkr ON dir_division_amkr.id = wf.id_division
  where wio.[id_operation] in (17) and wio.[operation_start] >= '2025-07-01 00:00:00.000' and wio.[operation_end]<= '2025-10-20 00:00:00.000'
  group by dir_operation.operation_abbr_ru, wio.[operation_end], dir_operator.[abbr_ru], dir_station_amkr.station_abbr_ru, dir_division_amkr.division_abbr_ru
  order by dir_operation.operation_abbr_ru, dir_station_amkr.station_abbr_ru, dir_division_amkr.division_abbr_ru, dir_operator.[abbr_ru], wio.[operation_end]