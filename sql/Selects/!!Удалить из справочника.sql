/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [id]
      ,[condition_name_ru]
      ,[condition_name_en]
      ,[condition_abbr_ru]
      ,[condition_abbr_en]
      ,[red]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
	  --delete
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_ConditionArrival]
  --where id in (25,3,24,8,9,10,11,13,19,20,21,22,23)

