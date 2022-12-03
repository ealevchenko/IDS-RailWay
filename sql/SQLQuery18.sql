use [KRR-PA-CNT-Railway]
declare @start datetime = Convert(datetime, '2022-10-21 22:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-10-22 21:59:59', 120)

select 
arrival_uz_vagon_arrival_wagons_rent_id_operator
,arrival_uz_vagon_arrival_wagons_rent_operators_ru
,arrival_uz_vagon_id_genus
,arrival_uz_vagon_rod
,arrival_uz_document_klient
,account_balance
--,* 
from [IDS].[get_view_incoming_cars_of_period](@start,@stop)