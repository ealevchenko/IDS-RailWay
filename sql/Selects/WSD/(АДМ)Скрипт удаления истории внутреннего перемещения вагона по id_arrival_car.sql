use [KRR-PA-Test-Railway]
declare @id_arrival_car int = 1281898;

  /****** ”ƒ¿À»“‹ Œœ≈–¿÷»»  ******/
--SELECT [id]
--      ,[id_wagon_internal_routes]
--      ,[id_operation]
--      ,[operation_start]
--      ,[operation_end]
--      ,[id_condition]
--      ,[id_loading_status]
--      ,[locomotive1]
--      ,[locomotive2]
--      ,[note]
--      ,[create]
--      ,[create_user]
--      ,[close]
--      ,[close_user]
--      ,[parent_id]
	  delete
  FROM [IDS].[WagonInternalOperation]
  where [id_wagon_internal_routes] in (select id FROM [IDS].[WagonInternalRoutes] where [id_arrival_car]=@id_arrival_car)

  /****** ”ƒ¿À»“‹ œ≈–≈Ã≈Ÿ≈Õ»ﬂ ******/
--SELECT [id]
--      ,[id_wagon_internal_routes]
--      ,[id_station]
--      ,[id_way]
--      ,[way_start]
--      ,[way_end]
--      ,[id_outer_way]
--      ,[outer_way_start]
--      ,[outer_way_end]
--      ,[position]
--      ,[note]
--      ,[create]
--      ,[create_user]
--      ,[close]
--      ,[close_user]
--      ,[parent_id]
--      ,[id_wio]
--      ,[num_sostav]
	  delete
  FROM [IDS].[WagonInternalMovement]
  where [id_wagon_internal_routes] in (select id FROM [IDS].[WagonInternalRoutes] where [id_arrival_car]=@id_arrival_car)

/****** ”ƒ¿À»“‹ ¬’Œƒ  ******/
--SELECT [id]
--      ,[num]
--      ,[id_arrival_car]
--      ,[id_sap_incoming_supply]
--      ,[doc_outgoing_car]
--      ,[id_outgoing_car]
--      ,[id_sap_outbound_supply]
--      ,[note]
--      ,[create]
--      ,[create_user]
--      ,[close]
--      ,[close_user]
--      ,[parent_id]
	  delete
  FROM [IDS].[WagonInternalRoutes]
  where [id_arrival_car]=@id_arrival_car

