use [KRR-PA-CNT-Railway]
SELECT arrs.[id]
      ,arrs.[id_arrived]
      ,arrs.[id_sostav]
      ,arrs.[train]
      ,arrs.[composition_index]
      ,arrs.[date_arrival]
      ,arrs.[date_adoption]
      ,arrs.[date_adoption_act]
	  -- Станция отправки
	  ,arrs.[id_station_from]
      ,st_from.station_name_ru as station_from_name_ru
      ,st_from.station_name_en as station_from_name_en
      ,st_from.station_abbr_ru as station_from_abbr_ru
      ,st_from.station_abbr_en as station_from_abbr_en
	  -- Станция приема
	  ,arrs.[id_station_on]
	  ,st_on.station_name_ru AS station_on_name_ru
	  ,st_on.station_name_en AS station_on_name_en
	  ,st_on.station_abbr_ru AS station_on_abbr_ru
	  ,st_on.station_abbr_en AS station_on_abbr_en
		-- Путь приема
	  ,arrs.[id_way] as id_way_on
      ,ws.way_num_ru as way_on_num_ru
      ,ws.way_num_en as way_on_num_en
      ,ws.way_name_ru as way_on_name_ru
      ,ws.way_name_en as way_on_name_en
      ,arrs.[numeration]
      ,arrs.[num_doc]
      ,arrs.[count]
      ,arrs.[status]
      ,arrs.[note]
      ,arrs.[create]
      ,arrs.[create_user]
      ,arrs.[change]
      ,arrs.[change_user]
	  ,count_all = (SELECT count (AC.[id]) FROM [IDS].[ArrivalCars] AS AC where AC.[id_arrival]=arrs.[id])
	  ,count_arrival = (SELECT count (AC.[id]) FROM [IDS].[ArrivalCars] AS AC where AC.[id_arrival]=arrs.[id] and AC.[position_arrival] is not null)
	  ,count_not_arrival = (SELECT count (AC.[id]) FROM [IDS].[ArrivalCars] AS AC where AC.[id_arrival]=arrs.[id] and AC.[position_arrival] is null)
  into get_arrival_sostav
  FROM [IDS].[ArrivalSostav] as arrs LEFT OUTER JOIN
  		IDS.Directory_Station AS st_from ON arrs.[id_station_from] = st_from.id LEFT OUTER JOIN
		IDS.Directory_Station AS st_on ON arrs.[id_station_on] = st_on.id LEFT OUTER JOIN
  		IDS.Directory_Ways AS ws ON arrs.[id_way] = ws.id
		--order by 1 desc