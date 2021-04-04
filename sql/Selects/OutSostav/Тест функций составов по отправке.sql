use [KRR-PA-CNT-Railway]
declare @start datetime = convert(datetime,'2021-04-01 00:00:00',120)
declare @stop datetime = convert(datetime,'2021-04-10 23:59:59',120)
declare @status int = 0

select * from [IDS].[get_outgoing_sostav]()

select * from [IDS].[get_outgoing_sostav_of_period](@start,@stop)

select * from [IDS].[get_outgoing_sostav_of_status](@status)

