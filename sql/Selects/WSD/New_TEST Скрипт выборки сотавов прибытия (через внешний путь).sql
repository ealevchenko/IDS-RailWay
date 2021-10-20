use [KRR-PA-Test-Railway]

--select * from [IDS].[get_view_sostav_of_all_outer_ways]()

--select * from [IDS].[get_view_wagons_of_all_outer_ways]()
--where outer_way_num_sostav = '50-29092021105300'

--select * from [IDS].[get_view_wagons_of_sostav_outer_ways]('50-29092021105300');

--declare @start datetime = Convert(datetime,'2021-09-01 00:00:00',120)
--declare @stop datetime = Convert(datetime,'2021-10-30 23:59:59',120)

--select * from [IDS].[get_view_sostav_of_period_operation_send](@start,@stop);
----select * from [IDS].[get_view_wagons_of_period_operation_send](@start,@stop);

select * from [IDS].[get_view_wagons_of_sostav_outer_ways]('51-29092021110900') order by outer_way_position;