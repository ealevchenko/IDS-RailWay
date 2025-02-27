declare @num int = 48100

SELECT TOP (1000) [id]
      ,[num]
      ,[id_arrival_car]
      ,[id_sap_incoming_supply]
      ,[doc_outgoing_car]
      ,[id_outgoing_car]
      ,[id_sap_outbound_supply]
      ,[note]
      ,[create]
      ,[create_user]
      ,[close]
      ,[close_user]
      ,[parent_id]
      ,[highlight_color]
      ,[id_usage_fee]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  where [num]=@num

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
  where [id_wagon_internal_routes] = (select id FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [num]=@num)
  order by 1 desc

SELECT TOP (1000) [id]
      ,[id_wagon_internal_routes]
      ,[id_operation]
      ,[operation_start]
      ,[operation_end]
      ,[id_condition]
      ,[id_loading_status]
      ,[locomotive1]
      ,[locomotive2]
      ,[note]
      ,[create]
      ,[create_user]
      ,[close]
      ,[close_user]
      ,[parent_id]
      ,[con_change]
      ,[con_change_user]
      ,[id_organization_service]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation]
  where [id_wagon_internal_routes] = (select id FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [num]=@num)
  order by 1 desc


--UPDATE [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]
--   SET [way_end] = null
--       ,[note] = null
--      ,[close] = null
--      ,[close_user] = null
-- WHERE id = 13175821
--GO

--UPDATE [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation]
--   SET [operation_end] = null
--      ,[close] = null
--      ,[close_user] = null
-- WHERE id = 14277848
--GO