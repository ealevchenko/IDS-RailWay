declare @start datetime = convert(datetime, '2023-01-01 00:00:00');
declare @stop datetime = convert(datetime, '2023-01-31 23:59:59');

select * from[IDS].[get_mine_cargo_incoming_cars_of_period](@start,@stop)

	SELECT 
	arr_dir_cargo.id as id_cargo
	,arr_dir_cargo.cargo_name_ru
    ,arr_dir_cargo.cargo_name_en
	,arr_dir_group_cargo.id	as id_group_cargo
	,arr_dir_group_cargo.cargo_group_name_ru
    ,arr_dir_group_cargo.cargo_group_name_en
	,arr_dir_cargo_etsng.id as id_cargo_etsng 
	,arr_dir_cargo_etsng.code as code_cargo_etsng
    ,arr_dir_cargo_etsng.cargo_etsng_name_ru
    ,arr_dir_cargo_etsng.cargo_etsng_name_en
	,arr_doc_uz.code_stn_from
	,arr_ext_station_from.station_name_ru
	,arr_ext_station_from.station_name_en
    ,count(arr_doc_vag.vesg) as count_wagon
	,sum(arr_doc_vag.vesg) as vesg
	--into shmakovo
	FROM IDS.ArrivalCars as arr_car
	--> Прибытие состава
	Left JOIN IDS.ArrivalSostav as arr_sost ON arr_sost.id = arr_car.id_arrival
	 --> Документы на вагон по принятию вагона на АМКР
	Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
	--> Документы на группу вагонов (состав) по принятию ваг она на АМКР
	Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
	--> Справочник Грузов по прибытию
	Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
	--> Справочник Группы Грузов по прибытию
	Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
	--> Справочник Грузов ЕТСНГ по прибытию
	Left JOIN [IDS].[Directory_CargoETSNG] as arr_dir_cargo_etsng ON arr_dir_cargo.id_cargo_etsng = arr_dir_cargo_etsng.id
	--> Справочник Грузов ГНГ по прибытию
	Left JOIN [IDS].[Directory_CargoGNG] as arr_dir_cargo_gng ON arr_doc_vag.id_cargo_gng = arr_dir_cargo_gng.id
	--> Справочник Внешних станций (по прибытию from)
	Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON arr_doc_uz.[code_stn_from] = arr_ext_station_from.code
	WHERE 
	arr_car.arrival is not null and arr_sost.[date_adoption]>= @start and arr_sost.[date_adoption]<=@stop and arr_doc_uz.code_stn_from = 457708
	group by 
	arr_dir_cargo.id
	,arr_dir_group_cargo.id
	,arr_dir_cargo_etsng.id
	,arr_dir_cargo.cargo_name_ru
    ,arr_dir_cargo.cargo_name_en
	,arr_dir_group_cargo.cargo_group_name_ru
    ,arr_dir_group_cargo.cargo_group_name_en
	,arr_dir_cargo_etsng.code
    ,arr_dir_cargo_etsng.cargo_etsng_name_ru
    ,arr_dir_cargo_etsng.cargo_etsng_name_en
	,arr_doc_uz.code_stn_from
	,arr_ext_station_from.station_name_ru
	,arr_ext_station_from.station_name_en
	,arr_doc_vag.vesg
