use [KRR-PA-CNT-Railway]
declare @id_wir int = 564009

--declare @id_car int = (select [id_outgoing_car] from [IDS].[WagonInternalRoutes] where [id]= (select [parent_id] FROM [IDS].[WagonInternalRoutes] where [id]= 564009))
--select * from [IDS].[get_view_outgoing_cars_of_id_car](@id_car)
select * from [IDS].[get_view_outgoing_cars_of_id_car]((select [id_outgoing_car] from [IDS].[WagonInternalRoutes] where [id]= (select [parent_id] FROM [IDS].[WagonInternalRoutes] where [id]= @id_wir)))