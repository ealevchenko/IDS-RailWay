use [KRR-PA-CNT-Railway]
declare @num int = 63531040

--SELECT top (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [num] = @num and [close] is null order by 1 desc

  /****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT wim.[id]
      ,wim.[id_wagon_internal_routes]
	  -- станция
      ,wim.[id_station]
	  ,dir_station.[station_name_ru]
      ,dir_station.[station_name_en]
      ,dir_station.[station_abbr_ru]
      ,dir_station.[station_abbr_en]
	  -- путь
      ,wim.[id_way]
	  ,dir_way.[way_num_ru]
      ,dir_way.[way_num_en]
      ,dir_way.[way_name_ru]
      ,dir_way.[way_name_en]
      ,dir_way.[way_abbr_ru]
      ,dir_way.[way_abbr_en]
      ,wim.[way_start]
      ,wim.[way_end]
	  -- перегон
      ,wim.[id_outer_way]
	  ,dir_oway.[name_outer_way_ru]
      ,dir_oway.[name_outer_way_en]
      ,wim.[outer_way_start]
      ,wim.[outer_way_end]
      ,wim.[position]
      ,wim.[note]
      ,wim.[create]
      ,wim.[create_user]
      ,wim.[close]
      ,wim.[close_user]
      ,wim.[parent_id]
	  --into wagon_position
  FROM [IDS].[WagonInternalMovement] as wim Left JOIN
  [IDS].[Directory_Station] as dir_station ON dir_station.id = wim.[id_station] Left JOIN
  [IDS].[Directory_Ways] as dir_way ON dir_way.id = wim.[id_way] Left JOIN
  [IDS].[Directory_OuterWays] as dir_oway ON dir_oway.id = wim.[id_outer_way]
  where [id_wagon_internal_routes] = (SELECT top (1) [id] FROM [IDS].[WagonInternalRoutes] where [num] = @num and [close] is null order by 1 desc)
  order by id desc
