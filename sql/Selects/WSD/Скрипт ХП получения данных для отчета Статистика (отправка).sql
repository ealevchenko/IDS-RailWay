use [KRR-PA-CNT-Railway]
declare @start datetime = Convert(datetime, '2022-07-01 00:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-07-11 23:59:59', 120)

/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT out_sost.[id]
      ,out_sost.[num_doc]
      ,out_sost.[id_station_from]
      ,out_sost.[id_way_from]
      ,out_sost.[id_station_on]
      ,out_sost.[date_readiness_amkr]
      ,out_sost.[date_end_inspection_acceptance_delivery]
      ,out_sost.[date_end_inspection_loader]
      ,out_sost.[date_end_inspection_vagonnik]
      ,out_sost.[date_show_wagons]
      ,out_sost.[date_readiness_uz]
      ,out_sost.[date_outgoing]
      ,out_sost.[date_outgoing_act]
      ,out_sost.[date_departure_amkr]
      ,out_sost.[composition_index]
      ,out_sost.[status]
      ,out_sost.[route_sign]
      ,out_sost.[note]
      ,out_sost.[create]
      ,out_sost.[create_user]
      ,out_sost.[change]
      ,out_sost.[change_user]
      ,out_sost.[vagonnik_user]
  	  ,count_wagon = (SELECT count(ac.id) FROM  [IDS].[OutgoingCars] as ac where ac.[id_outgoing]=out_sost.id and ac.[outgoing] is not null)
	  ,count_account_balance = ([IDS].[get_count_account_balance_of_outgoing_sostav](out_sost.id))
	  --into view_outgoing_sostav
  FROM [IDS].[OutgoingSostav] as out_sost
  where out_sost.[date_outgoing]>= @start and out_sost.[date_outgoing]<=@stop
  order by [date_outgoing] 