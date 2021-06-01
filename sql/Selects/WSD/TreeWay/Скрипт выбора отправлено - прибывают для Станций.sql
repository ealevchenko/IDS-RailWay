use [KRR-PA-CNT-Railway]

declare @id_station int = 8

-- Прибывают
SELECT count([id]) FROM [IDS].[WagonInternalMovement]
  where [id_outer_way] in (SELECT [id] FROM [IDS].[Directory_OuterWays] where [id_station_on] = @id_station) and [way_start] is not null and [way_end] is not null and [outer_way_start] is not null and [outer_way_end] is null 

-- Отправлено
SELECT count([id]) FROM [IDS].[WagonInternalMovement]
  where [id_station] = @id_station and [way_start] is not null and [way_end] is not null and [outer_way_start] is not null and [outer_way_end] is null