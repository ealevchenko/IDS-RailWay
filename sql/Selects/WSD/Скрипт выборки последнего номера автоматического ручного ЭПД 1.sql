/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1) [id]  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [num] = 64097561 order by 1 desc

  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT top(1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_wagon_internal_routes] = (SELECT TOP (1) [id]  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [num] = 64097561 order by 1 desc) and [close] is null order by 1 desc