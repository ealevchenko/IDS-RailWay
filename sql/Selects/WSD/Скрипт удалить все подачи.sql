USE [KRR-PA-CNT-Railway-Archive]
GO

UPDATE [IDS].[WagonInternalMovement]
   SET [filing_start] = null
      ,[filing_end] = null
      ,[id_filing] = null
 where [id_filing] is not null
GO

delete FROM [KRR-PA-CNT-Railway-Archive].[IDS].[WagonFiling]
