use [KRR-PA-CNT-Railway]
declare @start datetime = Convert(datetime, '2022-08-03 22:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-08-04 21:59:59', 120)

	SELECT 
	   arr_sost.[id]
      ,arr_sost.[id_arrived]
      ,arr_sost.[id_sostav]
      ,arr_sost.[train]
      ,arr_sost.[composition_index]
      ,arr_sost.[date_arrival]
      ,arr_sost.[date_adoption]
      ,arr_sost.[date_adoption_act]
      ,arr_sost.[id_station_from]
      ,arr_sost.[id_station_on]
      ,arr_sost.[id_way]
      ,arr_sost.[numeration]
      ,arr_sost.[num_doc]
      ,arr_sost.[count]
      ,arr_sost.[status]
      ,arr_sost.[note]
      ,arr_sost.[create]
      ,arr_sost.[create_user]
      ,arr_sost.[change]
      ,arr_sost.[change_user]
	  --,count_wagon = (SELECT count(ac.id) FROM  [IDS].[ArrivalCars] as ac where ac.[id_arrival]=arr_sost.id and ac.[arrival] is not null)
	  ,count_wagon = (SELECT count(ac.id) FROM  [IDS].[ArrivalCars] as ac Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON ac.id_arrival_uz_vagon = arr_doc_vag.id where ac.[id_arrival]=arr_sost.id and ac.[arrival] is not null and arr_doc_vag.cargo_returns is null)
		,count_return_wagon = (SELECT count(ac.id) FROM  [IDS].[ArrivalCars] as ac Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON ac.id_arrival_uz_vagon = arr_doc_vag.id where ac.[id_arrival]=arr_sost.id and ac.[arrival] is not null and arr_doc_vag.cargo_returns = 1)
	  ,count_account_balance = ([IDS].[get_count_account_balance_of_arrival_sostav](arr_sost.id))
	  ,count_not_operator = ([IDS].[get_count_not_operation_of_arrival_sostav](arr_sost.id))
  FROM  [IDS].[ArrivalSostav] as arr_sost
  where arr_sost.[date_adoption]>= @start and arr_sost.[date_adoption]<=@stop


  SELECT count(ac.id) FROM  [IDS].[ArrivalCars] as ac Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON ac.id_arrival_uz_vagon = arr_doc_vag.id where ac.[id_arrival]=182006 and ac.[arrival] is not null and arr_doc_vag.cargo_returns is null