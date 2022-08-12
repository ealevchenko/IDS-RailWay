
declare @start datetime = Convert(datetime, '2022-07-31 00:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-08-01 23:59:59', 120)

use [KRR-PA-CNT-Railway]
SELECT 
--arr_car.[id]
--      ,arr_car.[id_arrival]
--      ,arr_car.[num]
--      ,arr_car.[position]
--      ,arr_car.[position_arrival]
--      ,arr_car.[consignee]
--      ,arr_car.[num_doc]
--      ,arr_car.[id_transfer]
--      ,arr_car.[note]
--      ,arr_car.[date_adoption_act]
--      ,arr_car.[arrival]
--      ,arr_car.[arrival_user]
--      ,arr_car.[create]
--      ,arr_car.[create_user]
--      ,arr_car.[change]
--      ,arr_car.[change_user]
--      ,arr_car.[id_arrival_uz_vagon]
		max(arr_car.[id_arrival]) as id_sostav
		,max(arr_sost.[date_adoption])
		,arr_dir_cargo.[id]
		,arr_dir_cargo.[cargo_name_ru]
		,arr_dir_cargo.[cargo_name_en]
		,count(arr_dir_cargo.[id]) as count_wagon
		,sum([vesg]) as summ_vesg
		,sum([vesg_reweighing]) as summ_vesg_reweighing
		,def_vesg = sum([vesg])-sum([vesg_reweighing])
  FROM IDS.ArrivalSostav as arr_sost
	--> Прибытие вагона
	Left JOIN IDS.ArrivalCars as arr_car ON arr_sost.id = arr_car.id_arrival
	--> Документы на вагон по принятию вагона на АМКР
	Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
	--> Справочник Грузов по прибытию
	Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
  --where arr_car.[id_arrival]=182017
  where arr_sost.[date_adoption]>= @start and arr_sost.[date_adoption]<=@stop
  group by arr_car.[id_arrival], arr_dir_cargo.[id], arr_dir_cargo.[cargo_name_ru], arr_dir_cargo.[cargo_name_en]
  order by arr_car.[id_arrival]