USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_dislocation_wagon_of_num]    Script Date: 30.11.2020 15:50:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






CREATE FUNCTION [IDS].[get_dislocation_wagon_of_num]
 (
   @num int
 )
	RETURNS 
	@position_wagon TABLE(
	[id] [bigint] NOT NULL,
	[id_wagon_internal_routes] [bigint] NOT NULL,
	[id_station] [int] NOT NULL,
	[station_name_ru] [nvarchar](50) NULL,
	[station_name_en] [nvarchar](50) NULL,
	[station_abbr_ru] [nvarchar](50) NULL,
	[station_abbr_en] [nvarchar](50) NULL,
	[id_way] [int] NOT NULL,
	[way_num_ru] [nvarchar](20) NULL,
	[way_num_en] [nvarchar](20) NULL,
	[way_name_ru] [nvarchar](100) NULL,
	[way_name_en] [nvarchar](100) NULL,
	[way_abbr_ru] [nvarchar](50) NULL,
	[way_abbr_en] [nvarchar](50) NULL,
	[way_start] [datetime] NOT NULL,
	[way_end] [datetime] NULL,
	[id_outer_way] [int] NULL,
	[name_outer_way_ru] [nvarchar](150) NULL,
	[name_outer_way_en] [nvarchar](150) NULL,
	[outer_way_start] [datetime] NULL,
	[outer_way_end] [datetime] NULL,
	[position] [int] NOT NULL,
	[note] [nvarchar](250) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[close] [datetime] NULL,
	[close_user] [nvarchar](50) NULL,
	[parent_id] [bigint] NULL
	)
	AS
	BEGIN
	insert @position_wagon
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
	  FROM [IDS].[WagonInternalMovement] as wim Left JOIN
	  [IDS].[Directory_Station] as dir_station ON dir_station.id = wim.[id_station] Left JOIN
	  [IDS].[Directory_Ways] as dir_way ON dir_way.id = wim.[id_way] Left JOIN
	  [IDS].[Directory_OuterWays] as dir_oway ON dir_oway.id = wim.[id_outer_way]
	  where [id_wagon_internal_routes] = (SELECT top (1) [id] FROM [IDS].[WagonInternalRoutes] where [num] = @num and [close] is null order by 1 desc)
	  order by id desc
  RETURN
 END
 


GO


