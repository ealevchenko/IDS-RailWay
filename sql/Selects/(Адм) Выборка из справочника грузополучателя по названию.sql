/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [code]
      ,[shipper_name_ru]
      ,[shipper_name_en]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Shipper]
  where [shipper_name_ru] like(N'%Лом%')