use [KRR-PA-CNT-Railway]
declare @start datetime = Convert(datetime, '2022-08-20 00:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-08-20 23:59:59', 120)

select arrival_uz_vagon_cargo_returns, * from [IDS].[get_view_outgoing_cars_of_period](@start,@stop) where arrival_uz_vagon_cargo_returns is not null