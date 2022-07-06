/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT 
      wir.id
      ,wir.num
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
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
  Left JOIN [IDS].[WagonInternalRoutes] as wir ON  wim.[id_wagon_internal_routes] = wir.id
  where [outer_way_start] is not null and [outer_way_end] is null and wir.num in (55077887,56068489,52930013,55531487,63535603,55722524,63902316,63535801,63117824,61911483,61507976,60521325,55962377)

 -- UPDATE [IDS].[WagonInternalMovement]
 --  SET [outer_way_end] = [outer_way_start]
 --WHERE id in (select wim.[id]   FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
 -- Left JOIN [IDS].[WagonInternalRoutes] as wir ON  wim.[id_wagon_internal_routes] = wir.id where [outer_way_start] is not null and [outer_way_end] is null and wir.num in (55077887,56068489,52930013,55531487,63535603,55722524,63902316,63535801,63117824,61911483,61507976,60521325,55962377))
GO