use [KRR-PA-CNT-Railway]
declare @num int = 12344--63531040--53984225-- 
--declare @nums nvarchar(max) = '63531040,53984225'

SELECT wir.[id] as id_wir
      ,wir.[num]
      ,wir.[id_arrival_car]
      ,wir.[id_sap_incoming_supply]
      ,wir.[doc_outgoing_car]
      ,wir.[id_outgoing_car]
      ,wir.[id_sap_outbound_supply]
      ,wir.[note] as note_wir
      ,wir.[create] as create_wir
      ,wir.[create_user] as create_user_wir
      ,wir.[close] as close_wir
      ,wir.[close_user] as close_user_wir
      ,wir.[parent_id] as parent_id_wir
	  ,wim.[id] as id_wim
      ,wim.[id_wagon_internal_routes]
      ,wim.[id_station]
	  ,dir_station.[station_name_ru]
      ,dir_station.[station_name_en]
      ,dir_station.[station_abbr_ru]
      ,dir_station.[station_abbr_en]
      ,wim.[id_way]
	  ,dir_way.[way_num_ru]
      ,dir_way.[way_num_en]
      ,dir_way.[way_name_ru]
      ,dir_way.[way_name_en]
      ,dir_way.[way_abbr_ru]
      ,dir_way.[way_abbr_en]
      ,wim.[way_start]
      ,wim.[way_end]
      ,wim.[id_outer_way]
	  ,dir_oway.[name_outer_way_ru]
      ,dir_oway.[name_outer_way_en]
      ,wim.[outer_way_start]
      ,wim.[outer_way_end]
      ,wim.[position]
      ,wim.[note] as note_wim
      ,wim.[create] as create_wim
      ,wim.[create_user] as create_user_wim
      ,wim.[close] as close_wim
      ,wim.[close_user] as close_user_wim
      ,wim.[parent_id] as parent_id_wim
	  --into wagon_dislocation
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] AS wir Left JOIN
  	IDS.[WagonInternalMovement] as wim ON wim.id = (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_wagon_internal_routes]= wir.[id] order by id desc) Left JOIN
	[IDS].[Directory_Station] as dir_station ON dir_station.id = wim.[id_station] Left JOIN
	[IDS].[Directory_Ways] as dir_way ON dir_way.id = wim.[id_way] Left JOIN
	[IDS].[Directory_OuterWays] as dir_oway ON dir_oway.id = wim.[id_outer_way]
  where [num]=@num
  --where [num] in(@nums)
