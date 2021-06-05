use [KRR-PA-CNT-Railway]

declare @id_station int = 8
declare @id_park int = 3
declare @id_way int = 227

--select 
--count_arrives_wagons_of_station = [IDS].[get_count_arrives_wagons_of_station](@id_station),
--count_sent_wagons_of_station = [IDS].[get_count_sent_wagons_of_station](@id_station),

--count_all_wagons_of_station = [IDS].[get_count_all_wagons_of_station](@id_station),
--count_all_wagons_of_park = [IDS].[get_count_all_wagons_of_park](@id_station,@id_park),
--count_all_wagons_of_way = [IDS].[get_count_all_wagons_of_way](@id_way),

--count_amkr_wagons_of_station = [IDS].[get_count_amkr_wagons_of_station](@id_station),
--count_amkr_wagons_of_park = [IDS].[get_count_amkr_wagons_of_park](@id_station,@id_park),
--count_amkr_wagons_of_way = [IDS].[get_count_amkr_wagons_of_way](@id_way),

--capacity_wagons_of_station = [IDS].[get_capacity_wagons_of_station](@id_station),
--capacity_wagons_of_park = [IDS].[get_capacity_wagons_of_park](@id_station,@id_park),
--capacity_wagons_of_way = [IDS].[get_capacity_wagons_of_way](@id_way)

--select * from [IDS].[get_view_station_status]()

--select * from [IDS].[get_view_status_all_station]()
--select * from [IDS].[get_view_status_station_of_id](@id_station)

--select * from [IDS].[get_view_status_all_park_of_station_id](@id_station)
--select * from [IDS].[get_view_status_park_of_id](@id_station, @id_park)

select * from [IDS].[get_view_status_all_way_of_station_park_id](@id_station, @id_park)
select * from [IDS].[get_view_status_way_of_id](@id_way)

--select [IDS].[get_position_park_of_station](@id_station, @id_park)