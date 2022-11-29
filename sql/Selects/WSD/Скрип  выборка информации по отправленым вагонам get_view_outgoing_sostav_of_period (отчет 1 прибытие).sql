use [KRR-PA-CNT-Railway]
declare @start datetime = Convert(datetime, '2022-08-03 22:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-08-04 21:59:59', 120)

select * from [IDS].[get_view_outgoing_sostav_of_period](@start,@stop)

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
	  -- вагоны вернутые с УЗ
	  ,count_return_wagon = (SELECT count (vag_doc.id) FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] as out_car
		Left JOIN [IDS].[WagonInternalRoutes] as wir on wir.parent_id = (select id from [IDS].[WagonInternalRoutes] where [id_outgoing_car] = out_car.id)  
		Left JOIN [IDS].[ArrivalCars] as arr_car on wir.id_arrival_car = arr_car.id
		Left JOIN [IDS].[Arrival_UZ_Vagon] as vag_doc on arr_car.id_arrival_uz_vagon = vag_doc.id
		where out_car.[id_outgoing]=out_sost.id and vag_doc.cargo_returns = 1)
	  ,count_account_balance = ([IDS].[get_count_account_balance_of_outgoing_sostav](out_sost.id))


	  --into view_outgoing_sostav
  FROM [IDS].[OutgoingSostav] as out_sost
  where out_sost.[date_outgoing]>= @start and out_sost.[date_outgoing]<=@stop
  order by [date_outgoing] 