use [KRR-PA-CNT-Railway]

declare @id_station int = 8
declare @id_park int = 75
declare @id_way int = 244

--> Станция (АМКР)
SELECT count([num]) count_wagon
  FROM [IDS].[Directory_WagonsRent]
    where rent_end is null 
	and  [id_operator] in (SELECT [id_operator] FROM [IDS].[Directory_OperatorsWagons_AMKR]) -- определение наши
	and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] 
where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] 
    -- меняем 
	where [id_station] = @id_station and [way_start] is not null and [way_end] is null
	
	
	)
	)

--> Станция (Все)
SELECT count([num]) count_wagon
  FROM [IDS].[Directory_WagonsRent]
    where rent_end is null 
	--and  [id_operator] in (SELECT [id_operator] FROM [IDS].[Directory_OperatorsWagons_AMKR]) -- определение наши
	and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] 
where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] 
    -- меняем 
	where [id_station] = @id_station and [way_start] is not null and [way_end] is null
	
	
	)
	)

--> Парк (АМКР)
SELECT count([num]) count_wagon
  FROM [IDS].[Directory_WagonsRent]
    where rent_end is null 
	and  [id_operator] in (SELECT [id_operator] FROM [IDS].[Directory_OperatorsWagons_AMKR]) -- определение наши
	and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] 
where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] 
    -- меняем 
	where [id_way] in (SELECT [id] FROM [IDS].[Directory_Ways] where [id_park] = @id_park and [id_station]=@id_station) 
	and [way_start] is not null and [way_end] is null
	
	
	)
	)
--> Парк (Все)
SELECT count([num]) count_wagon
  FROM [IDS].[Directory_WagonsRent]
    where rent_end is null 
	--and  [id_operator] in (SELECT [id_operator] FROM [IDS].[Directory_OperatorsWagons_AMKR]) -- определение наши
	and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] 
where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] 
    -- меняем 
	where [id_way] in (SELECT [id] FROM [IDS].[Directory_Ways] where [id_park] = @id_park and [id_station]=@id_station) 
	and [way_start] is not null and [way_end] is null
	
	
	)
	)

--> Путь (АМКР)
SELECT count([num]) count_wagon
  FROM [IDS].[Directory_WagonsRent]
    where rent_end is null 
	and  [id_operator] in (SELECT [id_operator] FROM [IDS].[Directory_OperatorsWagons_AMKR]) -- определение наши
	and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] 
where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] 
    -- меняем 
	where [id_way] = @id_way and [way_start] is not null and [way_end] is null
	
	
	)
	)
--> Путь (Все)
SELECT count([num]) count_wagon
  FROM [IDS].[Directory_WagonsRent]
    where rent_end is null 
	--and  [id_operator] in (SELECT [id_operator] FROM [IDS].[Directory_OperatorsWagons_AMKR]) -- определение наши
	and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] 
where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] 
    -- меняем 
	where [id_way] = @id_way and [way_start] is not null and [way_end] is null
	
	
	)
	)