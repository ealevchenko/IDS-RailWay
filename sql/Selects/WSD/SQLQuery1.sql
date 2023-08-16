use [KRR-PA-CNT-Railway]

declare @start datetime = convert(datetime,'2023-07-01 20:01:00',120)
declare @stop datetime = convert(datetime,'2023-07-02 20:00:00',120)

select [type]='start',* from ids.[get_view_current_operating_balance_of_date](@start)
UNION
select [type]='stop',* from ids.[get_view_current_operating_balance_of_date](@stop)
UNION
select [type]='arrival',* from ids.get_view_arrival_operating_balance_of_piriod(@start,@stop)
UNION
select [type]='outgoing',* from ids.get_view_outgoing_operating_balance_of_piriod(@start,@stop)
