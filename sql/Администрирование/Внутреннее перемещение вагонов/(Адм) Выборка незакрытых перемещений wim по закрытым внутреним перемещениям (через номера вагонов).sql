/****** Script for SelectTopNRows command from SSMS  ******/
SELECT 
	wim.*
	,wir.*
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] as wir 
  Left JOIN IDS.[WagonInternalMovement] as wim ON wim.id_wagon_internal_routes = wir.id
  where wir.num in (60453776, 56086614)
  and ((wim.way_start is not null and wim.way_end is null) or (wim.outer_way_start is not null and wim.outer_way_end is null) or (wim.[close] is null) ) 

  SELECT 
	wim.*
	,wir.*
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] as wir 
  Left JOIN IDS.[WagonInternalMovement] as wim ON wim.id_wagon_internal_routes = wir.id
  where wir.[close] is not null and (wim.[close] is null)

  
--UPDATE [IDS].[WagonInternalMovement]
--   SET [close] = getdate()
-- WHERE id in (4414717,4414718,4414719,4414720,4414721,4414722,4414723,4414724,4414725,4414726,4414727,4414728,4414729)
--GO
