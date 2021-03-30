use [KRR-PA-CNT-Railway]


SELECT 
		sostav.[id] as out_id_sostav
      ,sostav.[num_doc] as out_sostav_num_doc
	  -- Станция отправки
      ,sostav.[id_station_from] as out_sostav_id_station_from
		,st_from.station_name_ru as out_sostav_station_from_name_ru
		,st_from.station_name_en as out_sostav_station_from_name_en
		,st_from.station_abbr_ru as out_sostav_station_from_abbr_ru
		,st_from.station_abbr_en as out_sostav_station_from_abbr_en
		-- путь отправки
      ,sostav.[id_way_from] as out_sostav_id_way_from
		,ws.way_num_ru as out_sostav_way_from_num_ru
		,ws.way_num_en as out_sostav_way_from_num_en
		,ws.way_name_ru as out_sostav_way_from_name_ru
		,ws.way_name_en as out_sostav_way_from_name_en
		-- станция приема
      ,sostav.[id_station_on] as out_sostav_id_station_on
		,st_on.station_name_ru AS out_sostav_station_on_name_ru
		,st_on.station_name_en AS out_sostav_station_on_name_en
		,st_on.station_abbr_ru AS out_sostav_station_on_abbr_ru
		,st_on.station_abbr_en AS out_sostav_station_on_abbr_en
      ,sostav.[date_readiness_amkr] as out_sostav_date_readiness_amkr
      ,sostav.[date_end_inspection_acceptance_delivery] as out_sostav_date_end_inspection_acceptance_delivery
      ,sostav.[date_end_inspection_loader] as out_sostav_date_end_inspection_loader
      ,sostav.[date_end_inspection_vagonnik] as out_sostav_date_end_inspection_vagonnik
      ,sostav.[vagonnik_user] as out_sostav_vagonnik_user
      ,sostav.[date_show_wagons] as out_sostav_date_show_wagons
      ,sostav.[date_readiness_uz] as out_sostav_date_readiness_uz
      ,sostav.[date_outgoing] as out_sostav_date_outgoing
      ,sostav.[date_outgoing_act] as out_sostav_date_outgoing_act
      ,sostav.[date_departure_amkr] as out_sostav_date_departure_amkr
      ,sostav.[composition_index] as out_sostav_composition_index
      ,sostav.[status] as out_sostav_status
      ,sostav.[note] as out_sostav_note
      ,sostav.[create] as out_sostav_create
      ,sostav.[create_user] as out_sostav_create_user
      ,sostav.[change] as out_sostav_change
      ,sostav.[change_user] as out_sostav_change_user
      ,sostav.[route_sign] as out_sostav_route_sign
	  ,car.[id] as out_id_car
      ,car.[num] as out_car_num
	  --> Основная информация по вагону
		-- страна
		,dir_countrys.code_sng as out_car_adm
		,dir_countrys.countrys_name_ru as out_car_adm_name_ru
		,dir_countrys.countrys_name_en as out_car_adm_name_en
		,dir_countrys.country_abbr_ru as out_car_adm_abbr_ru
		,dir_countrys.country_abbr_en as out_car_adm_abbr_en
		-- род вагона
		,dir_rod.rod_uz as out_car_rod
		,dir_rod.genus_ru as out_car_rod_name_ru
		,dir_rod.genus_en as out_car_rod_name_en
		,dir_rod.abbr_ru as out_car_rod_abbr_ru
		,dir_rod.abbr_en as out_car_rod_abbr_en

      ,car.[position] as out_car_position
      ,car.[position_outgoing] as out_car_position_outgoing
      ,car.[num_doc] as out_car_num_doc_uz
      ,car.[note] as out_car_note
      ,car.[date_outgoing_act] as out_car_date_outgoing_act
      ,car.[outgoing] as out_car_outgoing
      ,car.[outgoing_user] as out_car_outgoing_user
      ,car.[create] as out_car_create
      ,car.[create_user] as out_car_create_user
      ,car.[change] as out_car_change
      ,car.[change_user] as out_car_change_user
	  -- документ на вагон
      ,car.[id_outgoing_uz_vagon] as out_car_id_outgoing_uz_vagon
	  ,out_dir_cargo.cargo_name_ru as out_car_out_cargo_name_ru
	  ,out_dir_cargo.cargo_name_en as out_car_out_cargo_name_en
	  -- задержание
      ,car.[id_outgoing_detention] as out_car_id_outgoing_detention
	  ,car_detention.[id_detention_return] as out_car_detention_id_detention_return
	  ,dir_car_detention.[cause_ru] as out_car_detention_cause_ru
      ,dir_car_detention.[cause_en] as out_car_detention_cause_en
      ,car_detention.[type_detention_return] as out_car_detention_type_detention_return
      ,car_detention.[date_start] as out_car_detention_date_start
      ,car_detention.[date_stop] as out_car_detention_date_stop
	  -- причины
      ,car.[id_reason_discrepancy_amkr] as out_car_id_reason_discrepancy_amkr
	  ,dir_reason_amkr.[reason_discrepancy_name_ru] as out_car_reason_discrepancy_amkr_name_ru
      ,dir_reason_amkr.[reason_discrepancy_name_en] as out_car_reason_discrepancy_amkr_name_en
      ,car.[id_reason_discrepancy_uz] as out_car_id_reason_discrepancy_uz
	  ,dir_reason_uz.[reason_discrepancy_name_ru] as out_car_reason_discrepancy_uz_name_ru
      ,dir_reason_uz.[reason_discrepancy_name_en] as out_car_reason_discrepancy_uz_name_en
	  -- возврат открытый
      ,car.[id_outgoing_return_start] as out_car_id_outgoing_return_start
	  ,car_return_start.[id_detention_return] as out_car_return_start_id_detention_return
	  ,dir_car_return_start.[cause_ru] as out_car_return_start_cause_ru
      ,dir_car_return_start.[cause_en] as out_car_return_start_cause_en
      ,car_return_start.[type_detention_return] as out_car_return_start_type_detention_return
      ,car_return_start.[date_start] as out_car_return_start_date_start
      ,car_return_start.[date_stop] as out_car_return_start_date_stop
	  ,car_return_start.[num_act] as out_car_return_start_num_act
      ,car_return_start.[date_act] as out_car_return_start_date_act
      ,car_return_start.[note] as out_car_return_start_note
	  -- возврат закрытый
      ,car.[id_outgoing_return_stop] as out_car_id_outgoing_return_stop
	  ,car_return_stop.[id_detention_return] as out_car_return_stop_id_detention_return
	  ,dir_car_return_stop.[cause_ru] as out_car_return_stop_cause_ru
      ,dir_car_return_stop.[cause_en] as out_car_return_stop_cause_en
      ,car_return_stop.[type_detention_return] as out_car_return_stop_type_detention_return
      ,car_return_stop.[date_stop] as out_car_return_stop_date_stop
      ,car_return_stop.[date_stop] as out_car_return_stop_date_stop
	  ,car_return_stop.[num_act] as out_car_return_stop_num_act
      ,car_return_stop.[date_act] as out_car_return_stop_date_act
      ,car_return_stop.[note] as out_car_return_stop_note
	  --
      ,car.[parent_wir_id] as out_car_parent_wir_id
      ,car.[note_vagonnik] as out_car_note_vagonnik
  FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingSostav] as sostav Left JOIN 
  IDS.[OutgoingCars] as car ON sostav.id = car.id_outgoing Left JOIN 
  		IDS.Directory_Ways AS ws ON sostav.id_way_from = ws.id LEFT JOIN
		IDS.Directory_Station AS st_from ON sostav.id_station_from = st_from.id LEFT JOIN
		IDS.Directory_Station AS st_on ON sostav.id_station_on = st_on.id  LEFT JOIN
		--> Документы по отправке
		IDS.Outgoing_UZ_Vagon as out_doc_vag ON car.id_outgoing_uz_vagon = out_doc_vag.id Left JOIN
		IDS.Outgoing_UZ_Document as out_doc_uz ON out_doc_vag.id_document = out_doc_uz.id Left JOIN
		--> Задержания возвраты
		[IDS].[OutgoingDetentionReturn] as car_detention ON car.id_outgoing_detention = car_detention.id LEFT JOIN
		[IDS].[Directory_DetentionReturn] as dir_car_detention ON car_detention.id_detention_return = dir_car_detention.id LEFT JOIN
		[IDS].[Directory_Reason_Discrepancy] as dir_reason_amkr ON car.id_reason_discrepancy_amkr = dir_reason_amkr.id LEFT JOIN
		[IDS].[Directory_Reason_Discrepancy] as dir_reason_uz ON car.id_reason_discrepancy_uz = dir_reason_uz.id LEFT JOIN
		[IDS].[OutgoingDetentionReturn] as car_return_start ON car.id_outgoing_return_start = car_return_start.id LEFT JOIN
		[IDS].[Directory_DetentionReturn] as dir_car_return_start ON car_return_start.id_detention_return = dir_car_return_start.id LEFT JOIN
		[IDS].[OutgoingDetentionReturn] as car_return_stop ON car.id_outgoing_return_stop = car_return_stop.id LEFT JOIN
		[IDS].[Directory_DetentionReturn] as dir_car_return_stop ON car_return_stop.id_detention_return = dir_car_return_stop.id LEFT JOIN
		-- Справочник вагонов
		IDS.Directory_Wagons as dir_wagon ON car.num = dir_wagon.num  Left JOIN
		IDS.Directory_WagonsRent as cur_dir_rent ON cur_dir_rent.id = (SELECT top(1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent] where [num] = car.num and rent_end is null order by [id] desc)  Left JOIN
		IDS.Directory_Cargo as out_dir_cargo ON out_doc_vag.id =  out_dir_cargo.id  Left JOIN                                 --> Груз по отправке
		-- Справочники 
		IDS.Directory_Countrys as dir_countrys ON dir_wagon.id_countrys = dir_countrys.id Left JOIN --> Страна вагона
		IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id--> Род вагона


		order by 1 desc