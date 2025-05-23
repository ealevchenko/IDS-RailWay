/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
USE [KRR-PA-CNT-Railway]
GO

--UPDATE [IDS].[ArrivalCars]
--   SET [position_arrival] = null
--		,[id_arrival_uz_vagon] = null
--      ,[arrival] = null
--      ,[arrival_user] = null

-- WHERE id = 143632
--GO

--UPDATE [IDS].[ArrivalSostav]
--   SET [status] = 0
-- WHERE id=1105
--GO


SELECT TOP (1000) [id]
      ,[id_arrival]
      ,[num]
      ,[position]
      ,[position_arrival]
      ,[consignee]
      ,[num_doc]
      ,[id_transfer]
      ,[note]
      ,[date_adoption_act]
	  ,[id_arrival_uz_vagon]
      ,[arrival]
      ,[arrival_user]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] 
  where [position_arrival] is not null 
  and [num] =64056740
  order by 1 desc

  SELECT TOP (1000) [id]
      ,[id_arrived]
      ,[id_sostav]
      ,[train]
      ,[composition_index]
      ,[date_arrival]
      ,[date_adoption]
      ,[date_adoption_act]
      ,[id_station_from]
      ,[id_station_on]
      ,[id_way]
      ,[num_doc]
      ,[count]
      ,[status]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav] order by 1 desc