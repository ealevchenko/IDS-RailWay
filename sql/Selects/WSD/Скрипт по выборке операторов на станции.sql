use [KRR-PA-CNT-Railway]
SELECT 
	  wim.id
	  ,dir_operator_group.[group]
	  ,dir_operator.[id]
      ,dir_operator.[abbr_ru]
      ,dir_operator.[operators_ru]
      ,dir_operator.[abbr_en]
      ,dir_operator.[operators_en]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
  		--> Текущее внетренее перемещение
		 INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
		 --> Справочник аренд
		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
		--> Справочник группы Операторов вагона
		Left JOIN IDS.Directory_OperatorsWagonsGroup as dir_operator_group ON dir_rent.id_operator =  dir_operator_group.id_operator
		--> Справочник Оператор вагона
		Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_rent.id_operator =  dir_operator.id

		 WHERE wim.id_station = 8 and (wim.way_end IS NULL)

		 SELECT 
	  wim.id
	  ,dir_operator_group.[group]
	  ,dir_operator.[id]
      ,dir_operator.[abbr_ru]
      ,dir_operator.[operators_ru]
      ,dir_operator.[abbr_en]
      ,dir_operator.[operators_en]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
  		--> Текущее внетренее перемещение
		 INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
		 --> Справочник аренд
		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
		--> Справочник группы Операторов вагона
		Left JOIN IDS.Directory_OperatorsWagonsGroup as dir_operator_group ON dir_rent.id_operator =  dir_operator_group.id_operator
		--> Справочник Оператор вагона
		Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_rent.id_operator =  dir_operator.id

		 WHERE wim.id_station = 8 and wim.[way_start] is not null and wim.[way_end] is not null and wim.[outer_way_start] is not null and wim.[outer_way_end] is null
