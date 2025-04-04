use [KRR-PA-CNT-Railway]

declare @start datetime = '2025-03-01 00:00:00'
declare @stop datetime = '2025-03-30 00:00:00'

SELECT *
	FROM [IDS].[Arrival_UZ_Document] as arr_doc
	--> Документы на вагон по принятию вагона на АМКР
	--Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_doc_vag.id_document = arr_doc.id
	--> Прибытие состава
	--Left JOIN IDS.ArrivalSostav as arr_sost ON arr_sost.id = arr_doc_vag.id_arrival
	--> Прибытие вагона
	--Left JOIN IDS.ArrivalCars as arr_car ON  arr_car.id_arrival_uz_vagon = arr_doc_vag.id

  where arr_doc.[id] in (select [id_document] FROM [IDS].[Arrival_UZ_Vagon] where [id_arrival] in (select [id] FROM [IDS].[ArrivalSostav] where [date_adoption] >= @start and [date_adoption] <= @stop))
  
 -- SELECT *
	--FROM [IDS].[Arrival_UZ_Document] as arr_doc
	----> Документы на вагон по принятию вагона на АМКР
	--Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_doc_vag.id_document = arr_doc.id
	----> Прибытие состава
	--Left JOIN IDS.ArrivalSostav as arr_sost ON arr_sost.id = arr_doc_vag.id_arrival
	----> Прибытие вагона
	----Left JOIN IDS.ArrivalCars as arr_car ON  arr_car.id_arrival_uz_vagon = arr_doc_vag.id
	--Left JOIN IDS.ArrivalCars as arr_car ON  arr_car.id_arrival = arr_sost.id
	--where arr_sost.[date_adoption] >= @start and arr_sost.[date_adoption] <= @stop

  SELECT * FROM IDS.ArrivalSostav as arr_sost
	Left JOIN IDS.ArrivalCars as arr_car ON  arr_car.id_arrival = arr_sost.id
	Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_doc_vag.id = arr_car.id_arrival_uz_vagon
	Left JOIN [IDS].[Arrival_UZ_Document] as arr_doc ON arr_doc.id = arr_doc_vag.id_document
	where arr_sost.[date_adoption] >= @start and arr_sost.[date_adoption] <= @stop
