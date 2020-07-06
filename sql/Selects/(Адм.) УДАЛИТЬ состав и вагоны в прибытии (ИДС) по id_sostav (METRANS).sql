
declare @id_sostav int = 19588


delete
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars]
  where id_arrival = (select [id] FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav] where id_sostav = @id_sostav)

delete
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav]
  where id_sostav = @id_sostav

