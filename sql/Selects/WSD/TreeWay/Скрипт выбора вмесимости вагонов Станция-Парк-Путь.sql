use [KRR-PA-CNT-Railway]

declare @id_station int = 8
declare @id_park int = 75
declare @id_way int = 244

--> Станция
SELECT sum([capacity]) capacity
  FROM [IDS].[Directory_Ways]
  where [id_station] =@id_station and [way_delete] is null and [capacity] is not null

--> Парк
SELECT sum([capacity]) capacity
  FROM [IDS].[Directory_Ways]
  where [id_park] = @id_park and [id_station]=@id_station and [way_delete] is null and [capacity] is not null

--> Путь
SELECT [capacity] FROM [IDS].[Directory_Ways] where [id] =@id_way
