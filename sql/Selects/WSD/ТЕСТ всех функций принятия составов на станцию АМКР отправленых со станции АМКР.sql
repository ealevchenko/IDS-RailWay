use [KRR-PA-CNT-Railway]

declare @id_station_on int =8;

select * from [IDS].[get_view_open_wagons_of_outer_ways_station_on](@id_station_on) 
--where outer_way_num_sostav = '116-24042024040300'
--select * from [IDS].[get_view_arrival_sostav_of_outer_ways](@id_station_on)
select * from [IDS].[get_view_open_arrival_sostav_of_outer_ways](@id_station_on)