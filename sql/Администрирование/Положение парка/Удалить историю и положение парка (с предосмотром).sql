/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
declare @id_ps int = 3753

SELECT TOP (1000) [id]
      ,[id_station]
      ,[state_on]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[delete]
      ,[delete_user]
      ,[applied]
      ,[applied_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Station] 
  where [id]=@id_ps
  order by 1 desc

  SELECT [id]
      ,[id_park_state_station]
      ,[id_way]
      ,[position]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[delete]
      ,[delete_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Way]
  where [id_park_state_station] = @id_ps

  SELECT [id]
      ,[id_park_state_way]
      ,[num]
      ,[position]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[delete]
      ,[delete_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Wagon]
  where [id_park_state_way] in (SELECT [id]  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Way]  where [id_park_state_station] = @id_ps)

---- Удалить вагоны
--delete FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Wagon] where [id_park_state_way] in (SELECT [id]  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Way]  where [id_park_state_station] = @id_ps)
---- Удалить пути
--delete FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Way] where [id_park_state_station] = @id_ps
---- Удалить положение
--delete FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Station] where [id]=@id_ps




  