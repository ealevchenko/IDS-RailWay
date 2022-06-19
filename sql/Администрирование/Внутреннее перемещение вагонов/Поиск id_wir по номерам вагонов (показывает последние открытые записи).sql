/****** Script for SelectTopNRows command from SSMS  ******/
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
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  where [num] in (64500838,61229282,61738571,61232468,63901573,64810849,63115950,63552806,63011274,60118536,57415630,62001649,57415051,56113137,60808805,53188173,64049141,60033826,62057336,61743977) 
  and [close] is null