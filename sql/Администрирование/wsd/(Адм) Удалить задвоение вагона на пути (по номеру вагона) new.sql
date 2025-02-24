declare @num int = 33300

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
  and [close] is null
  order by 1 desc

  SELECT [id]
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
  --and [close] is null
  order by 1 desc

 -- UPDATE [IDS].[WagonInternalMovement]
 --  SET [outer_way_end] = [outer_way_start]
 --     ,[close] = getdate()
 --     ,[close_user] = N'EUROPE\ealevchenko'

 --WHERE id = 13120813
GO