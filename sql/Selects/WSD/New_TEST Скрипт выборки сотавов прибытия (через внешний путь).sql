use [KRR-PA-Test-Railway]

select * from [IDS].[get_view_sostav_of_all_outer_ways]()

select * from [IDS].[get_view_wagons_of_all_outer_ways]()
where outer_way_num_sostav = '50-29092021105300'

select * from [IDS].[get_view_wagons_of_sostav_outer_ways]('50-29092021105300');