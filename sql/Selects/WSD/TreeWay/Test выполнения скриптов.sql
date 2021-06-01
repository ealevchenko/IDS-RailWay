use [KRR-PA-CNT-Railway]
select 
[IDS].[get_count_arrives_wagons_of_station](8),
[IDS].[get_count_sent_wagons_of_station](8),
[IDS].[get_count_all_wagons_of_station](8),
[IDS].[get_count_amkr_wagons_of_station](8),
[IDS].[get_capacity_wagons_of_station](8)
select * from [IDS].[get_view_station_status]()