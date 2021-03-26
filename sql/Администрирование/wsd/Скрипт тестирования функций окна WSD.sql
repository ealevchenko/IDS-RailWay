use [KRR-PA-CNT-Railway]
declare @id_way int = 225
declare @status int = 2


-- “ест выборки вагонов по на пути детально
select * from [IDS].[get_view_wagons_of_way](@id_way) order by position
select * from [IDS].[get_outgoing_sostav_of_status](@status)
