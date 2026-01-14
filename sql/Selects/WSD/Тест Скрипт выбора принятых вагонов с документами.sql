use [KRR-PA-CNT-Railway]

declare  @start datetime = '2025-03-01T00:00:00'
declare  @stop datetime = '2025-03-30T00:00:00'

select * from [IDS].[get_view_arrival_documents_vagons_of_period](@start,@stop)