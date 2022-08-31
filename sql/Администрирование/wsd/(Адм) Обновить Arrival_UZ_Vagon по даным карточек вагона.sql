USE [KRR-PA-CNT-Railway]
GO

--UPDATE [IDS].[Arrival_UZ_Vagon] 
--   SET [id_owner] =  (select [id_owner] from [IDS].[Directory_Wagons] where num = [IDS].[Arrival_UZ_Vagon].[num])
-- where  [id_owner] is null
--GO


