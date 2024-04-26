use [KRR-PA-CNT-Railway]
declare @id_station int = 8


--select * from [IDS].[get_view_operators_of_id_station](8)

--SELECT 
--	  wim.id
--	  ,park_way.[park_name_ru]
--      ,park_way.[park_name_en]
--      ,park_way.[park_abbr_ru]
--      ,park_way.[park_abbr_en]
--	  ,dir_operator_group.[group]
--	  ,dir_operator.[id]
--      ,dir_operator.[abbr_ru]
--      ,dir_operator.[operators_ru]
--      ,dir_operator.[abbr_en]
--      ,dir_operator.[operators_en]
--  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
--  		--> Текущее внетренее перемещение
--		 INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
--		 --> Справочник аренд
--		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
--		--> Справочник группы Операторов вагона
--		Left JOIN IDS.Directory_OperatorsWagonsGroup as dir_operator_group ON dir_rent.id_operator =  dir_operator_group.id_operator
--		--> Справочник Оператор вагона
--		Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_rent.id_operator =  dir_operator.id
--		--> Справочник Оператор вагона
--		Left JOIN IDS.Directory_Ways as cur_dir_ways ON wim.id_way =  cur_dir_ways.id
--		--> Справочник Парки вагона
--		Left JOIN [IDS].[Directory_ParkWays] as park_way ON cur_dir_ways.id_park = park_way.id
--		WHERE wim.id_station = 8 and (wim.way_end IS NULL)

SELECT 
	cur_dir_ways.id as id_way
	,cur_dir_ways.way_num_ru as current_way_amkr_num_ru
	,cur_dir_ways.way_num_en as current_way_amkr_num_en
	--,cur_dir_ways.way_name_ru as current_way_amkr_name_ru
	--,cur_dir_ways.way_name_en as current_way_amkr_name_en
	,cur_dir_ways.way_abbr_ru as current_way_amkr_abbr_ru
	,cur_dir_ways.way_abbr_en as current_way_amkr_abbr_en
	  --,dir_operator_group.[group]
	  ,dir_operator.[id] as id_operator 
      ,dir_operator.[abbr_ru] as operator_abbr_ru
      --,dir_operator.[operators_ru]
      ,dir_operator.[abbr_en] as operator_abbr_en
      --,dir_operator.[operators_en]
      ,dir_operator.color as operator_color
	  ,Count (wim.id) as count_operators
	  --into operators_of_station
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
  		--> Текущее внетренее перемещение
		 INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
		 --> Справочник аренд
		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
		--> Справочник группы Операторов вагона
		Left JOIN IDS.Directory_OperatorsWagonsGroup as dir_operator_group ON dir_rent.id_operator =  dir_operator_group.id_operator
		--> Справочник Оператор вагона
		Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_rent.id_operator =  dir_operator.id
		--> Справочник Оператор вагона
		Left JOIN IDS.Directory_Ways as cur_dir_ways ON wim.id_way =  cur_dir_ways.id
		WHERE wim.id_station = @id_station and wim.[way_start] is not null and wim.[way_end] is null
		group by 
		cur_dir_ways.id, 
		cur_dir_ways.way_num_ru,
		cur_dir_ways.way_num_en,
		--cur_dir_ways.way_name_ru,
		--cur_dir_ways.way_name_en,
		cur_dir_ways.way_abbr_ru,
		cur_dir_ways.way_abbr_en,
		dir_operator.[id], 
		dir_operator.[abbr_ru], 
		dir_operator.[abbr_en],
		dir_operator.color
		order by cur_dir_ways.id, dir_operator.[id]
--Отправленые	
SELECT 
out_way.id
      ,out_way.[name_outer_way_ru]
      ,out_way.[name_outer_way_en]
	  ,dir_operator.[id] as id_operator 
      ,dir_operator.[abbr_ru] as operator_abbr_ru
      ,dir_operator.[abbr_en] as operator_abbr_en
      ,dir_operator.color as operator_color
	  ,Count (wim.id) as count_operators
	  --into operators_of_out_way
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
  		--> Текущее внетренее перемещение
		 INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
		 --> Справочник аренд
		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
		--> Справочник группы Операторов вагона
		Left JOIN IDS.Directory_OperatorsWagonsGroup as dir_operator_group ON dir_rent.id_operator =  dir_operator_group.id_operator
		--> Справочник Оператор вагона
		Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_rent.id_operator =  dir_operator.id
		--> Справочник перегонов
		Left JOIN [IDS].[Directory_OuterWays] out_way ON wim.id_outer_way = out_way.id
		WHERE wim.id_station = @id_station and wim.[way_start] is not null and wim.[way_end] is not null and wim.[outer_way_start] is not null and wim.[outer_way_end] is null
		group by 
		out_way.id, 
		out_way.name_outer_way_ru,
		out_way.name_outer_way_en,
		dir_operator.[id], 
		dir_operator.[abbr_ru], 
		dir_operator.[abbr_en],
		dir_operator.color
		order by out_way.id, dir_operator.[id]
--ПРИБЫТИЕ
SELECT 
out_way.id
      ,out_way.[name_outer_way_ru]
      ,out_way.[name_outer_way_en]
	  ,dir_operator.[id] as id_operator 
      ,dir_operator.[abbr_ru] as operator_abbr_ru
      ,dir_operator.[abbr_en] as operator_abbr_en
      ,dir_operator.color as operator_color
	  ,Count (wim.id) as count_operators
	  --into operators_of_station
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
  		--> Текущее внетренее перемещение
		 INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
		 --> Справочник аренд
		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
		--> Справочник группы Операторов вагона
		Left JOIN IDS.Directory_OperatorsWagonsGroup as dir_operator_group ON dir_rent.id_operator =  dir_operator_group.id_operator
		--> Справочник Оператор вагона
		Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_rent.id_operator =  dir_operator.id
		--> Справочник перегонов
		Left JOIN [IDS].[Directory_OuterWays] out_way ON wim.id_outer_way = out_way.id
		--WHERE wim.id_station = @id_station and wim.[way_start] is not null and wim.[way_end] is not null and wim.[outer_way_start] is not null and wim.[outer_way_end] is null
		WHERE wim.[id_outer_way] in (SELECT [id] FROM [IDS].[Directory_OuterWays] where [id_station_on] = @id_station) and [way_start] is not null and [way_end] is not null and [outer_way_start] is not null and [outer_way_end] is null
		
		group by 
		out_way.id, 
		out_way.name_outer_way_ru,
		out_way.name_outer_way_en,
		dir_operator.[id], 
		dir_operator.[abbr_ru], 
		dir_operator.[abbr_en],
		dir_operator.color
		order by out_way.id, dir_operator.[id]