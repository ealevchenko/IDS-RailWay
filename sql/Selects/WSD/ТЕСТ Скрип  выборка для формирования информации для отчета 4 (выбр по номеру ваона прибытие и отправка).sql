use [KRR-PA-CNT-Railway]
declare @num int = 53984753
declare @start datetime = Convert(datetime, '2021-01-01 00:00:00', 120)
declare @stop datetime = Convert(datetime, '2021-12-31 23:59:59', 120)
select * from [IDS].[get_view_incoming_outgoing_cars_of_num](@num)

select * from [IDS].[get_view_incoming_outgoing_cars_of_num](@num)
where arrival_sostav_date_adoption>=@start and arrival_sostav_date_adoption<=@stop

