use [KRR-PA-CNT-Railway]

/*
Нужно добавить удаление отправки если есть  
*/

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
--      ,[highlight_color]
--      ,[id_usage_fee]
--  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
--  where num=61808754
--  order by 1 desc


declare @id_wir int = 943991

delete
  FROM [IDS].[WagonInternalMovement]
  where [id_wagon_internal_routes] = @id_wir

delete
--select *
  FROM [IDS].[WagonInternalOperation]
  where [id_wagon_internal_routes] = @id_wir



declare @id_arrival_car bigint = (select [id_arrival_car] FROM [IDS].[WagonInternalRoutes] where id =@id_wir);
declare @id_arrival_uz_vagon bigint = (select [id_arrival_uz_vagon] FROM [IDS].[ArrivalCars] where id =@id_arrival_car);

select @id_wir,@id_arrival_car,@id_arrival_uz_vagon

delete
  FROM [IDS].[WagonInternalRoutes]
  where id =@id_wir

  delete 
  FROM [KRR-PA-CNT-Railway].[IDS].[SAPIncomingSupply]
  where [id_arrival_car] =@id_arrival_car

   delete
  FROM [IDS].[ArrivalCars]
  where id =@id_arrival_car;

    delete
  FROM [IDS].[Arrival_UZ_Vagon]
  where id = @id_arrival_uz_vagon