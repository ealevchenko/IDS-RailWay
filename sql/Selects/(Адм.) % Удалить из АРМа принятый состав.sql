/****** Script for SelectTopNRows command from SSMS  ******/
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
--delete
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation]
  where [id_wagon_internal_routes] in ( SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_arrival_car] in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] where [id_arrival] =84120 and [position_arrival] is not null))

  /****** Script for SelectTopNRows command from SSMS  ******/
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
	  delete
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]
  where [id_wagon_internal_routes] in (  SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_arrival_car] in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] where [id_arrival] =84120 and [position_arrival] is not null))

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
	  --delete
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  where [id_arrival_car] in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] where [id_arrival] =84120 and [position_arrival] is not null)

