/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [id]
      ,[num_doc]
      ,[id_station_from]
      ,[id_way_from]
      ,[id_station_on]
      ,[date_readiness_amkr]
      ,[date_show_wagons]
      ,[date_readiness_uz]
      ,[date_outgoing]
      ,[date_outgoing_act]
      ,[composition_index]
      ,[status]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingSostav]
order by 1 desc

	--delete FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] --=where [id_outgoing] in (517,516,515,514)
	--delete  FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingSostav] --where [id] in (517,516,515,514)

	
	