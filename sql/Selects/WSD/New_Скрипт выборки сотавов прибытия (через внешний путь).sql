	use [KRR-PA-Test-Railway]--[KRR-PA-CNT-Railway]
	declare @start datetime = Convert(datetime,'2021-09-01 00:00:00',120)
	declare @stop datetime = Convert(datetime,'2021-09-30 23:59:59',120)

select 
	fwag.outer_way_num_sostav
	--> Перегон
	,min(fwag.[id_outer_way]) as [id_outer_way]
	,min(fwag.[name_outer_way_ru]) as [name_outer_way_ru]
	,min(fwag.[name_outer_way_en]) as [name_outer_way_en]
	,min(fwag.outer_way_close) as outer_way_close
	,min(fwag.outer_way_delete) as outer_way_delete
	--> Операции отправки на станцию (дополнительная информаци)
	,min(fwag.from_operation_locomotive1) as from_operation_locomotive1
	,min(fwag.from_operation_locomotive2) as from_operation_locomotive2
	,min(fwag.from_operation_start) as from_operation_start
	,min(fwag.from_operation_end) as from_operation_end
	,min(fwag.from_operation_create) as from_operation_create
	,min(fwag.from_operation_create_user) as from_operation_create_user
		--> Станция отправки
	,min(fwag.from_id_station) as from_id_station
	,min(fwag.from_station_name_ru) as from_station_name_ru
	,min(fwag.from_station_name_en) as from_station_name_en
	,min(fwag.from_station_abbr_ru) as from_station_abbr_ru
	,min(fwag.from_station_abbr_en) as from_station_abbr_en
		--> Путь отправки
	,min(fwag.from_id_way) as from_id_way
	,min(fwag.from_id_park) as from_id_park
	,min(fwag.from_way_num_ru) as from_way_num_ru
	,min(fwag.from_way_num_en) as from_way_num_en
	,min(fwag.from_way_name_ru) as from_way_name_ru
	,min(fwag.from_way_name_en) as from_way_name_en
	,min(fwag.from_way_abbr_ru) as from_way_abbr_ru
	,min(fwag.from_way_abbr_en) as from_way_abbr_en
	,min(fwag.from_way_capacity) as from_way_capacity
	,min(fwag.from_way_close) as from_way_close
	,min(fwag.from_way_delete) as from_way_delete
	--> Кол. вагонов
	,count(fwag.outer_way_num_sostav) as count_wagons_send
	--> Операции прибыл на станцию (дополнительная информаци)
	,min(fwag.on_operation_locomotive1) as on_operation_locomotive1
	,min(fwag.on_operation_locomotive2) as on_operation_locomotive2
	,min(fwag.on_operation_start) as on_operation_start
	,min(fwag.on_operation_end) as on_operation_end
	,min(fwag.on_operation_create) as on_operation_create
	,min(fwag.on_operation_create_user) as on_operation_create_user
 	--> Станция прибытия
	,min(fwag.on_id_station) as on_id_station
	,min(fwag.on_station_name_ru) as on_station_name_ru
	,min(fwag.on_station_name_en) as on_station_name_en
	,min(fwag.on_station_abbr_ru) as on_station_abbr_ru
	,min(fwag.on_station_abbr_en) as on_station_abbr_en
	--> Путь прибытия
	,min(fwag.on_id_way) as on_id_way
	,min(fwag.on_id_park) as on_id_park
	,min(fwag.on_way_num_ru) as on_way_num_ru
	,min(fwag.on_way_num_en) as on_way_num_en
	,min(fwag.on_way_name_ru) as on_way_name_ru
	,min(fwag.on_way_name_en) as on_way_name_en
	,min(fwag.on_way_abbr_ru) as on_way_abbr_ru
	,min(fwag.on_way_abbr_en) as on_way_abbr_en
	,min(fwag.on_way_capacity) as on_way_capacity
	,min(fwag.on_way_close) as on_way_close
	,min(fwag.on_way_delete) as on_way_delete
	,count_wagons_arrival = (SELECT count([id]) FROM [KRR-PA-Test-Railway].[IDS].[WagonInternalMovement] where [num_sostav] = fwag.outer_way_num_sostav and [outer_way_end] is not null)
	--into outer_way_sostav
from [IDS].[get_view_wagons_of_all_outer_ways]() as fwag
group by fwag.outer_way_num_sostav

	--WHERE wim_from.[num_sostav] is not null 
	--and wim_from.[id_outer_way] =51 
	--and wim_from.[outer_way_start] >= @start and wim_from.[outer_way_start] <= @stop
	--order by [outer_way_start] desc, [id_outer_way], outer_way_num_sostav, outer_way_position