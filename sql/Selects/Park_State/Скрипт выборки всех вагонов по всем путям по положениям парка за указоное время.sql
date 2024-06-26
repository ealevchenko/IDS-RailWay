/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
declare @date datetime = convert(datetime, '2020-12-03 14:52:00.000',120)
SELECT	   pss.[id]
		  ,pss.[id_station] as pss_id_station
		  ,dir_station_pss.[station_name_ru] as pss_station_name_ru
		  ,dir_station_pss.[station_name_en] as pss_station_name_en
		  ,dir_station_pss.[station_abbr_ru] as pss_station_abbr_ru
		  ,dir_station_pss.[station_abbr_en] as pss_station_abbr_en
		  ,pss.[state_on]
		  ,pss.[note] as pss_note
		  ,pss.[create] as pss_create
		  ,pss.[create_user] as pss_create_user
		  ,pss.[change] as pss_change
		  ,pss.[change_user] as pss_change_user
		  ,pss.[delete] as pss_delete
		  ,pss.[delete_user] as pss_delete_user
		  ,pss.[applied] as pss_applied
		  ,pss.[applied_user] as pss_applied_user
	  	  ,ps_way.[id] as ps_way_id
		  ,ps_way.[id_way] as ps_way_id_way
		  ,dir_way_ps.[way_num_ru] as ps_way_way_num_ru
		  ,dir_way_ps.[way_num_en] as ps_way_way_num_en
		  ,dir_way_ps.[way_name_ru] as ps_way_way_name_ru
		  ,dir_way_ps.[way_name_en] as ps_way_way_name_en
		  ,dir_way_ps.[way_abbr_ru] as ps_way_way_abbr_ru
		  ,dir_way_ps.[way_abbr_en] as ps_way_way_abbr_en
		  ,ps_way.[position] as ps_way_position
		  ,ps_wag.[id] as ps_wag_id		  
		  ,ps_wag.num
		  ,ps_wag.[position] as ps_wag_position
		  ,ps_wag.[create] as ps_wag_create
		  ,ps_wag.[create_user] as ps_wag_create_user
		  ,ps_wag.[change] as ps_wag_change
		  ,ps_wag.[change_user] as ps_wag_change_user
		  ,wir.[id] as wir_id
		  ,wir.[id_arrival_car]
		  ,wir.[id_sap_incoming_supply]
		  ,wir.[doc_outgoing_car]
		  ,wir.[id_outgoing_car]
		  ,wir.[id_sap_outbound_supply]
		  ,wir.[note] as wir_note
		  ,wir.[create] as wir_create
		  ,wir.[create_user] as wir_create_user
		  ,wir.[close] as wir_close
		  ,wir.[close_user] as wir_close_user
		  ,wir.[parent_id] as wir_parent_id
		  ,wim.[id] as wim_id
		  ,wim.[id_wagon_internal_routes]
		  ,wim.[id_station] as id_station
		  ,dir_station.[station_name_ru] as station_name_ru
		  ,dir_station.[station_name_en] as station_name_en
		  ,dir_station.[station_abbr_ru] as station_abbr_ru
		  ,dir_station.[station_abbr_en] as station_abbr_en
		  ,wim.[id_way] as id_way
		  ,dir_way.[way_num_ru] as way_num_ru
		  ,dir_way.[way_num_en] as way_num_en
		  ,dir_way.[way_name_ru] as way_name_ru
		  ,dir_way.[way_name_en] as way_name_en
		  ,dir_way.[way_abbr_ru] as way_abbr_ru
		  ,dir_way.[way_abbr_en] as way_abbr_en
		  ,wim.[way_start]
		  ,wim.[way_end]
		  ,wim.[id_outer_way]
		  ,dir_oway.[name_outer_way_ru]
		  ,dir_oway.[name_outer_way_en]
		  ,wim.[outer_way_start]
		  ,wim.[outer_way_end]
		  ,wim.[position]
		  ,wim.[note] as wim_note
		  ,wim.[create] as wim_create
		  ,wim.[create_user] as wim_create_user
		  ,wim.[close] as wim_close
		  ,wim.[close_user] as wim_close_user
		  ,wim.[parent_id] as wim_parent_id
		  --INTO view_dislocation_wagon
  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Station] as pss INNER JOIN 
  IDS.ParkState_Way as ps_way ON ps_way.id_park_state_station = pss.id INNER JOIN
	IDS.ParkState_Wagon as ps_wag ON ps_way.id = ps_wag.id_park_state_way LEFT JOIN
	[IDS].[WagonInternalRoutes] AS wir ON wir.num = ps_wag.num Left JOIN
  	IDS.[WagonInternalMovement] as wim ON wim.id = (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_wagon_internal_routes]= wir.[id] order by id desc) Left JOIN
	[IDS].[Directory_Station] as dir_station ON dir_station.id = wim.[id_station] Left JOIN
	[IDS].[Directory_Ways] as dir_way ON dir_way.id = wim.[id_way] Left JOIN
	[IDS].[Directory_OuterWays] as dir_oway ON dir_oway.id = wim.[id_outer_way] Left JOIN
	[IDS].[Directory_Ways] as dir_way_ps ON dir_way_ps.id = ps_way.[id_way] Left JOIN
	[IDS].[Directory_Station] as dir_station_pss ON dir_station_pss.id = pss.[id_station]
  where [state_on] = @date