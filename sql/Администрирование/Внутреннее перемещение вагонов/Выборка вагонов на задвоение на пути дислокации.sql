 use [KRR-PA-CNT-Railway]
/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
select N'СПИСОК ЗАДВОЕННЫХ ВАГОНОВ'
SELECT 
	num = (select top (1) num FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where id = wim.[id_wagon_internal_routes])
	,wim.[id_wagon_internal_routes]
	, count(wim.[id]) as count
	FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
  where wim.[way_end] is null 
  group by [id_wagon_internal_routes]
  HAVING count(wim.[id]) > 1
  order by count(wim.[id]) desc
select N'СПИСОК ОТКРЫТЫХ ПОЛОЖЕНИЙ ВАГОНОВ КОТОРЫЕ УШЛИ'
SELECT wim.[id]
	  ,[close_wir] = (select top (1) [close] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where id = wim.[id_wagon_internal_routes])
      ,wim.[id_wagon_internal_routes]
      ,wim.[id_station]
      ,wim.[id_way]
      ,wim.[way_start]
      ,wim.[way_end]
      ,wim.[id_outer_way]
      ,wim.[outer_way_start]
      ,wim.[outer_way_end]
      ,wim.[position]
      ,wim.[note]
      ,wim.[create]
      ,wim.[create_user]
      ,wim.[close]
      ,wim.[close_user]
      ,wim.[parent_id]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
  where [way_end] is null and (select top (1) [close] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where id = wim.[id_wagon_internal_routes]) is not null
select N'СПИСОК ОТКРЫТЫХ ВАГОНОВ НА ПЕРЕГОНАХ КОТОРЫЕ УШЛИ'
SELECT  
	 wir.id
	 ,wir.num
	 ,wir.[close]
      ,wim.[id]
      ,wim.[id_wagon_internal_routes]
      ,wim.[id_station]
      ,wim.[id_way]
      ,wim.[way_start]
      ,wim.[way_end]
      ,wim.[id_outer_way]
      ,wim.[outer_way_start]
      ,wim.[outer_way_end]
      ,wim.[position]
      ,wim.[note]
      ,wim.[create]
      ,wim.[create_user]
      ,wim.[close]
      ,wim.[close_user]
      ,wim.[parent_id]
      ,wim.[id_wio]
      ,wim.[num_sostav]
  FROM [IDS].[WagonInternalMovement] as wim
  Left JOIN [IDS].[WagonInternalRoutes] as wir ON wir.id = wim.[id_wagon_internal_routes]
  where [outer_way_start] is not null and [outer_way_end] is null and wir.[close] is not null
select N'ПОКАЗАТЬ ВНУТРЕННЕЕ ПЕРЕМЕЩЕНИЕ'
declare @idwir int = 6845899

--> LIST WIR по ID
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
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  where [id] = @idwir
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
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]
    where [id_wagon_internal_routes] = @idwir
	order by 1 desc

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
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation]
  where [id_wagon_internal_routes] = @idwir
  order by 1 desc