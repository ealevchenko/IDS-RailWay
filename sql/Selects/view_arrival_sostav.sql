SELECT
ARS.id, 
ARS.id_arrived, 
ARS.id_sostav, 
ARS.train, 
ARS.composition_index, 
ARS.date_arrival, 
ARS.date_adoption, 
ARS.date_adoption_act, 
ARS.id_station_from, 
ARS.id_station_on, 
ARS.id_way, 
ARS.numeration, 
ARS.num_doc,
ARS.count, 
ARS.status, 
ARS.note, 
ARS.[create], 
ARS.create_user, 
ARS.change, 
ARS.change_user, 
SF.station_name_ru as station_from_name_ru, 
SF.station_name_en as station_from_name_en, 
SF.station_abbr_ru as station_from_abbr_ru, 
SF.station_abbr_en as station_from_abbr_ru,
SON.station_name_ru AS station_on_name_ru, 
SON.station_name_en AS station_on_name_en, 
SON.station_abbr_ru AS station_on_abbr_ru, 
SON.station_abbr_en AS station_on_abbr_ru, 
WS.num AS way_num,
WS.name_ru AS way_name_ru, 
WS.name_en AS way_name_en
FROM  IDS.ArrivalSostav AS ARS LEFT OUTER JOIN
	RW.Directory_Ways AS WS ON ARS.id_way = WS.id LEFT OUTER JOIN
	IDS.Directory_Station AS SON ON ARS.id_station_on = SON.id LEFT OUTER JOIN
	IDS.Directory_Station AS SF ON ARS.id_station_from = SF.id
where ARS.date_arrival>=CONVERT(datetime, '2020-06-01 00:00:00',120) and ARS.date_arrival<=CONVERT(datetime, '2020-06-30 00:00:00',120)