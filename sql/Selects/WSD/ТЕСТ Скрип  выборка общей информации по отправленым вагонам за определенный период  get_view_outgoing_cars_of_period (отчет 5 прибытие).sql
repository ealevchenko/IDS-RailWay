use [KRR-PA-CNT-Railway]
declare @start datetime = Convert(datetime, '2022-12-01 00:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-12-29 23:59:59', 120)

select outgoing_uz_document_code_payer from [IDS].[get_view_outgoing_cars_of_period](@start,@stop)