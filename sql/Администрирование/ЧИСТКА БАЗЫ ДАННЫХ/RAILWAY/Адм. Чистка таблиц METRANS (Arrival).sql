declare @date datetime = '2023-01-01 00:00:00'
  --Удаление

  --delete
  --FROM [KRR-PA-CNT-Railway].[METRANS].[ArrivalCars]
  --where [id_sostav] in (SELECT [id]   FROM [KRR-PA-CNT-Railway].[METRANS].[ArrivalSostav] where [date_time] < @date)

  --delete
  --FROM [KRR-PA-CNT-Railway].[METRANS].[ArrivalSostav]
  --where [date_time] < @date

SELECT [id]
      ,[id_arrived]
      ,[file_name]
      ,[composition_index]
      ,[date_time]
      ,[operation]
      ,[create]
      ,[close]
      ,[arrived]
      ,[Parent_id]
  FROM [KRR-PA-CNT-Railway].[METRANS].[ArrivalSostav]
  where [date_time] < @date
  order by [date_time] desc

SELECT [id]
      ,[id_sostav]
      ,[position]
      ,[num]
      ,[country_code]
      ,[wight]
      ,[cargo_code]
      ,[cargo]
      ,[station_code]
      ,[station]
      ,[consignee]
      ,[operation]
      ,[composition_index]
      ,[date_operation]
      ,[train]
      ,[num_doc_arrived]
      ,[arrived]
      ,[parent_id]
      ,[user_name]
  FROM [KRR-PA-CNT-Railway].[METRANS].[ArrivalCars]
  where [id_sostav] in (SELECT [id]   FROM [KRR-PA-CNT-Railway].[METRANS].[ArrivalSostav] where [date_time] < @date)


