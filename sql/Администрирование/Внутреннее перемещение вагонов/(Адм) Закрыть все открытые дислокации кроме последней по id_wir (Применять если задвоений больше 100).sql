USE [KRR-PA-CNT-Railway]
GO

declare @id_wir bigint = 371314

UPDATE [IDS].[WagonInternalMovement]
   SET [way_end] = getdate()
      ,[close] =  getdate()
      ,[close_user] = 'EUROPE\ealevchenko'
 WHERE id in (SELECT  [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_wagon_internal_routes] =@id_wir and [way_end] is null and [id] not in (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_wagon_internal_routes] =@id_wir order by 1 desc))
GO


