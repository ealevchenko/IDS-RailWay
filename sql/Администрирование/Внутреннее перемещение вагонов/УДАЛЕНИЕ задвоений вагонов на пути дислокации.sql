/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [id]
      ,[id_wagon_internal_routes]
      ,[id_station]
      ,[id_way]
      ,[way_start]
      ,[way_end]
      ,[id_outer_way]
      ,[outer_way_start]
      ,[outer_way_end]
      ,[position]
      ,[note]
      ,[create]
      ,[create_user]
      ,[close]
      ,[close_user]
      ,[parent_id]
	  --delete
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]

  where id in (314743)