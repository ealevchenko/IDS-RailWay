use [KRR-PA-CNT-Railway]
--  id отправляемого состава
declare @id_outgoing bigint = 180308
--> СПИСОК ВАГОНОВ СОСТАВА
SELECT [id]
      ,[id_outgoing]
      ,[num]
      ,[position]
      ,[position_outgoing]
      ,[num_doc]
      ,[note]
      ,[date_outgoing_act]
      ,[outgoing]
      ,[outgoing_user]
      ,[id_outgoing_uz_vagon]
      ,[id_outgoing_detention]
      ,[id_reason_discrepancy_amkr]
      ,[id_reason_discrepancy_uz]
      ,[id_outgoing_return_start]
      ,[id_outgoing_return_stop]
      ,[parent_wir_id]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[note_vagonnik]
      ,[vagonnik]
      ,[vagonnik_user]
  FROM [IDS].[OutgoingCars]
  where [id_outgoing]=@id_outgoing and [position_outgoing] is not null
  order by [position_outgoing]
--> СПИСОК WIR ОТПРАВЛЕННОГО СОСТАВА
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
  FROM [IDS].[WagonInternalRoutes]
  where [id_outgoing_car] in (SELECT [id] FROM [IDS].[OutgoingCars]   where [id_outgoing]=@id_outgoing and [position_outgoing] is not null)
-->
SELECT [id]
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
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation]
  where [id_wagon_internal_routes] in (SELECT [id] FROM [IDS].[WagonInternalRoutes] where [id_outgoing_car] in (SELECT [id] FROM [IDS].[OutgoingCars]   where [id_outgoing]=@id_outgoing and [position_outgoing] is not null))
  --and [operation_start] = '2023-01-12 22:39:00.000'
  order by 1 desc

