USE [KRR-PA-CNT-Railway-Archive]
GO

--UPDATE [IDS].[WagonInternalMovement]
--   SET [filing_start] = null
--      ,[filing_end] = null
--      ,[id_filing] = null
--	  ,[id_wio] = null
-- where [id] in (select id  FROM [KRR-PA-CNT-Railway-Archive].[IDS].[WagonInternalMovement]
--where [id_wio] in (select id  FROM [KRR-PA-CNT-Railway-Archive].[IDS].[WagonInternalOperation] where [id_operation] in (13,14)))
--GO

delete FROM [KRR-PA-CNT-Railway-Archive].[IDS].[WagonInternalMoveCargo]


UPDATE [IDS].[WagonInternalMovement]
   SET [filing_start] = null
      ,[filing_end] = null
      ,[id_filing] = null
	  ,[id_wio] = null
 where [id_filing] is not null
GO

UPDATE [IDS].[WagonInternalOperation]
   SET [parent_id] = null
 WHERE [id] in (select id FROM [KRR-PA-CNT-Railway-Archive].[IDS].[WagonInternalOperation] where [id_operation] in (13,14,15,16))
GO


delete FROM [KRR-PA-CNT-Railway-Archive].[IDS].[WagonFiling]


UPDATE [IDS].[WagonInternalOperation]
   SET [parent_id] = null
 where [parent_id] in (select id
  FROM [KRR-PA-CNT-Railway-Archive].[IDS].[WagonInternalOperation]
  where [id_operation] in (13,14, 15,16))
GO

delete
  FROM [KRR-PA-CNT-Railway-Archive].[IDS].[WagonInternalOperation]
  where [id_operation] in (13,14, 15,16)
