/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [abbr_ru], count([abbr_ru])
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagons]
  group by [abbr_ru]
  HAVING count([abbr_ru])>1

  SELECT TOP (1000) [id]
      ,[abbr_ru]
      ,[operators_ru]
      ,[abbr_en]
      ,[operators_en]
      ,[paid]
      ,[rop]
      ,[local_use]
      ,[color]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[monitoring_idle_time]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagons]
  where [abbr_ru] in (SELECT [abbr_ru]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagons] group by [abbr_ru]
  HAVING count([abbr_ru])>1)