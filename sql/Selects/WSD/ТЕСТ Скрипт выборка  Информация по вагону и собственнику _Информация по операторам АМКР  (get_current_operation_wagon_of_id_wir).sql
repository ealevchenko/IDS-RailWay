
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
  where num=64563422 
  order by 1desc


select * from [IDS].[get_current_operation_wagon_of_num](64563422)
select * from [IDS].[get_current_operation_wagon_of_id_wir](753035)