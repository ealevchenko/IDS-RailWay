declare @start datetime = convert(datetime,'2021-01-01 00:00:00',120)
declare @stop datetime = convert(datetime,'2021-01-20 00:00:00',120)

SELECT
		outs.[id]
		,outs.[num_doc]
		-- Станция отправки
		,outs.[id_station_from]
		,st_from.station_name_ru as station_from_name_ru
		,st_from.station_name_en as station_from_name_en
		,st_from.station_abbr_ru as station_from_abbr_ru
		,st_from.station_abbr_en as station_from_abbr_en
		-- Путь отправки
		,outs.[id_way_from]
		,ws.way_num_ru as way_from_num_ru
		,ws.way_num_en as way_from_num_en
		,ws.way_name_ru as way_from_name_ru
		,ws.way_name_en as way_from_name_en
		-- Станция приема
		,outs.[id_station_on]
		,st_on.station_name_ru AS station_on_name_ru
		,st_on.station_name_en AS station_on_name_en
		,st_on.station_abbr_ru AS station_on_abbr_ru
		,st_on.station_abbr_en AS station_on_abbr_en
      ,outs.[date_readiness_amkr]
      ,outs.[date_end_inspection_acceptance_delivery]
      ,outs.[date_end_inspection_loader]
      ,outs.[date_end_inspection_vagonnik]
      ,outs.[date_show_wagons]
      ,outs.[date_readiness_uz]
      ,outs.[date_outgoing]
      ,outs.[date_outgoing_act]
      ,outs.[date_departure]
      ,outs.[composition_index]
      ,outs.[status]
      ,outs.[note]
      ,outs.[create]
      ,outs.[create_user]
      ,outs.[change]
      ,outs.[change_user]
	  ,count_all = (SELECT count (AC.[id]) FROM [IDS].[OutgoingCars] AS AC where AC.[id_outgoing]=outs.id)
	  ,count_outgoing = (SELECT count (AC.[id]) FROM [IDS].[OutgoingCars] AS AC where AC.[id_outgoing]=outs.id and AC.[position_outgoing] is not null)
	  ,count_not_outgoing = (SELECT count (AC.[id]) FROM [IDS].[OutgoingCars] AS AC where AC.[id_outgoing]=outs.id and AC.[position_outgoing] is null and AC.[id_outgoing_detention_return] is null)
	  ,count_detention_return = (SELECT count (AC.[id]) FROM [IDS].[OutgoingCars] AS AC where AC.[id_outgoing]=outs.id and AC.[id_outgoing_detention_return] is not null)
--into outgoing_sostav
FROM  IDS.OutgoingSostav AS outs LEFT OUTER JOIN
    IDS.Directory_Ways AS ws ON outs.id_way_from = ws.id LEFT OUTER JOIN
    IDS.Directory_Station AS st_from ON outs.id_station_from = st_from.id LEFT OUTER JOIN
	IDS.Directory_Station AS st_on ON outs.id_station_on = st_on.id
where outs.date_readiness_amkr>=@start and outs.date_readiness_amkr<=@stop
order by outs.[date_readiness_amkr]