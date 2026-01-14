use [KRR-PA-CNT-Railway]
declare @id_station int = 4


select * from [IDS].[get_view_operators_of_id_station](@id_station)
select * from [IDS].[get_view_operators_send_of_id_station](@id_station)
select * from [IDS].[get_view_operators_arrival_of_id_station](@id_station)

--select * from  [IDS].[get_view_wagons_of_id_way](115)



--select * from [IDS].[get_view_status_station_of_id](1) order by id

--select * from [IDS].[get_view_status_all_park_of_station_id](1) order by position
--select * from [IDS].[get_view_status_park_of_id](1, 84)

--select * from [IDS].[get_view_status_all_way_of_station_park_id](1, 84) order by position_way
--select * from [IDS].[get_view_status_way_of_id](1) order by position_way

--select * from [IDS].[get_total_balance]()


