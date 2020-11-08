use [KRR-PA-CNT-Railway]

--select * from [IDS].[get_view_station_status]()
--select * from [IDS].[get_view_station_status_of_id](6)
--select * from [IDS].[get_arrival_sostav_of_id_outer_way](12)
select * from [IDS].[get_view_wagons_of_outer_way](12)
select * from [IDS].[get_view_ways_status_of_station](6) -- Состояние путей по станции 
select * from [IDS].[get_view_ways_status_of_station_park](6,71) -- Состояние путей по станции и выбранному парку