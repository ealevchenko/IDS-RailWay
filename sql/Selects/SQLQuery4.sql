/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT [parent_id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_outgoing_car] = 586310

  SELECT [id_arrival_car] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  where id = (SELECT [parent_id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_outgoing_car] = 586310)

  /****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT [id_arrival] FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars]
  where id = (SELECT [id_arrival_car] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  where id = (SELECT [parent_id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_outgoing_car] = 586310))

  /****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT [date_adoption]
      ,[date_adoption_act]
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav]
  where [id] = (SELECT [id_arrival] FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars]
  where id = (SELECT [id_arrival_car] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  where id = (SELECT [parent_id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_outgoing_car] = 586310)))