/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [id]
      ,[station_name_ru]
      ,[station_name_en]
      ,[station_abbr_ru]
      ,[station_abbr_en]
      ,[exit_uz]
      ,[station_uz]
      ,[default_side]
      ,[code]
      ,[idle_time]
	 -- delete
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Station]
  --where id=34