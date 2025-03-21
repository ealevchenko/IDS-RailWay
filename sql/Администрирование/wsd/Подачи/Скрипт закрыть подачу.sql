use [KRR-PA-CNT-Railway]
declare @id int = 21461 --11260 --11276--11059  --10617--10575--10544--10631--10703--10634
declare @date_close datetime = '2025-03-13 21:00:00.000' 


--UPDATE [IDS].[WagonInternalMovement]
--	SET [id_filing] = null
--where [id_filing] = @id

--UPDATE [IDS].[WagonInternalMovement]
--	SET [id_filing] = null
--where [id] in (13297453,13297454,13297455,13297456,13297457)

--UPDATE [IDS].[WagonInternalMovement]
--	SET [filing_end] = @date_close
--where [id_filing] = @id

--UPDATE [IDS].[WagonFiling]
--   SET [end_filing] = @date_close
--	  ,[doc_received] = @date_close
--      ,[close] = @date_close
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

  SELECT [id]
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
      ,[note2]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  where id in (SELECT [id_wagon_internal_routes] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_filing] = @id)
  order by id 

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
  order by [id_wagon_internal_routes]

  SELECT [id]
      ,[id_wagon_internal_routes]
      ,[internal_doc_num]
      ,[id_weighing_num]
      ,[doc_received]
      ,[id_cargo]
      ,[id_internal_cargo]
      ,[empty]
      ,[vesg]
      ,[id_station_from_amkr]
      ,[id_division_from]
      ,[id_wim_load]
      ,[id_wim_redirection]
      ,[code_external_station]
      ,[id_station_on_amkr]
      ,[id_division_on]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[close]
      ,[close_user]
      ,[parent_id]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMoveCargo]
  where [id_wagon_internal_routes] in (select [id_wagon_internal_routes] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_filing] = @id)
  order by [id_wagon_internal_routes], [id] desc

