/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [id]
      ,[code]
      ,[code_cs]
      ,[station]
      ,[id_ir]
  FROM [KRR-PA-CNT-Railway].[UZ].[Directory_Stations]
  where [station] like (N'петров %')
SELECT TOP (1000) [id]
      ,[code]
      ,[code_cs]
      ,[station]
      ,[id_ir]
  FROM [KRR-PA-CNT-Railway].[UZ].[Directory_Stations]
  where [code_cs] = 320609

  SELECT TOP (1000) [code]
      ,[station_name_ru]
      ,[station_name_en]
      ,[code_inlandrailway]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_ExternalStation]
where [station_name_ru] like (N'поч %')