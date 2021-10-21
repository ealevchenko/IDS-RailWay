use [KRR-PA-Test-Railway]

--select * from [IDS].[get_view_sostav_of_all_outer_ways]()

--select * from [IDS].[get_view_wagons_of_all_outer_ways]()
--where outer_way_num_sostav = '50-29092021105300'

--select * from [IDS].[get_view_wagons_of_sostav_outer_ways]('50-29092021105300');

	declare @start datetime = Convert(datetime,'2021-09-01 00:00:00',120)
	declare @stop datetime = Convert(datetime,'2021-10-30 23:59:59',120)
select * from [IDS].[get_view_sostav_of_period_operation_send](@start,@stop)


----select * from [IDS].[get_view_wagons_of_period_operation_send](@start,@stop);

select * from [IDS].[get_view_arrival_sostav_of_outer_ways](7)
select * from [IDS].[get_view_send_sostav_of_outer_ways](6)
select * from [IDS].[get_view_sostav_of_all_outer_ways]()

select IDS.[get_count_wagon_arrival_of_sostav_outer_ways]('51-29092021110900');
select IDS.[get_count_wagon_return_of_sostav_outer_ways]('51-29092021110900');

select * from [IDS].[get_view_wagons_of_sostav_outer_ways]('51-29092021110900') order by outer_way_position;
select count([on_id_operation]) from [IDS].[get_view_wagons_of_sostav_outer_ways]('51-29092021110900') where [on_id_operation] = 6;
select count([on_id_operation]) from [IDS].[get_view_wagons_of_sostav_outer_ways]('51-29092021110900') where [on_id_operation] = 11 or [on_id_operation] = 12;