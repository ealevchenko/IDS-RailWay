/****** Script for SelectTopNRows command from SSMS  ******/
SELECT count (vag_doc.id)
  FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] as out_car
  Left JOIN [IDS].[WagonInternalRoutes] as wir on wir.parent_id = (select id from [IDS].[WagonInternalRoutes] where [id_outgoing_car] = out_car.id)  
  Left JOIN [IDS].[ArrivalCars] as arr_car on wir.id_arrival_car = arr_car.id
  Left JOIN [IDS].[Arrival_UZ_Vagon] as vag_doc on arr_car.id_arrival_uz_vagon = vag_doc.id
  where vag_doc.cargo_returns = 1