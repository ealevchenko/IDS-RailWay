use [KRR-PA-CNT-Railway]
declare @start datetime = Convert(datetime, '2022-08-03 22:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-08-04 21:59:59', 120)

select * from [IDS].[get_view_adoption_sostav_of_period](@start,@stop)
select * from [IDS].[get_view_outgoing_sostav_of_period](@start,@stop)