use [KRR-PA-CNT-Railway]
declare @id int = 12--31

--UPDATE [IDS].[WagonInternalMovement]
--	SET[filing_end] = '2025-03-04 02:10:00.000'
--where [id_filing] = @id

--UPDATE [IDS].[WagonInternalMovement]
--	SET [id_filing] = null
--where [id_filing] = @id

--UPDATE [IDS].[WagonFiling]
--   SET [end_filing] = '2025-03-04 11:00:00.000'
--      ,[close] = '2025-03-04 11:00:00.000'
--      ,[close_user] = 'EUROPE\ealevchenko'
-- WHERE [id] = @id



SELECT TOP (1000) [id]
      ,[num_filing]
      ,[type_filing]
      ,[id_division]
      ,[vesg]
      ,[note]
      ,[start_filing]
      ,[end_filing]
      ,[doc_received]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[close]
      ,[close_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonFiling]
  where [id] = @id

SELECT TOP (1000) [id]
      ,[id_wagon_internal_routes]
      ,[id_station]
      ,[id_way]
      ,[way_start]
      ,[way_end]
      ,[id_outer_way]
      ,[outer_way_start]
      ,[outer_way_end]
      ,[position]
      ,[note]
      ,[create]
      ,[create_user]
      ,[close]
      ,[close_user]
      ,[parent_id]
      ,[id_wio]
      ,[num_sostav]
      ,[filing_start]
      ,[filing_end]
      ,[id_filing]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]
  where [id_filing] = @id

