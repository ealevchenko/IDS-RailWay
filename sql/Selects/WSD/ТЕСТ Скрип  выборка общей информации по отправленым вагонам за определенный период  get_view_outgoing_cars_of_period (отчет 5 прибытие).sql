use [KRR-PA-CNT-Railway]
declare @start datetime = Convert(datetime, '2023-02-02 00:00:00', 120)
declare @stop datetime = Convert(datetime, '2023-02-14 23:59:59', 120)

 --select [IDS].[get_old_id_arrival_of_wir_parent_id](544683)

select outgoing_sostav_id
,[num]
,outgoing_uz_document_code_stn_to
,outgoing_uz_document_station_to_name_ru
,outgoing_uz_document_to_code_inlandrailway
,outgoing_uz_document_to_code_railway
,outgoing_uz_document_to_inlandrailway_name_ru
,outgoing_uz_document_country_nazn
,outgoing_uz_document_to_countrys_name_ru
from [IDS].[get_view_outgoing_cars_of_period](@start,@stop) 
where outgoing_uz_document_to_code_inlandrailway = 8