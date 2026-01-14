USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_status_all_way_of_station_park_id]    Script Date: 17.07.2024 16:08:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






CREATE FUNCTION [IDS].[get_view_status_all_way_of_station_id]
 (
	@id_station int
 )
	RETURNS 
	@status_way TABLE(
			[id] [int] NOT NULL,
			[id_station] [int] NOT NULL,
			[id_park] [int] NOT NULL,
			[position_park] [int] NOT NULL,
			[position_way] [int] NOT NULL,
			[way_num_ru] [nvarchar](20) NOT NULL,
			[way_num_en] [nvarchar](20) NOT NULL,
			[way_name_ru] [nvarchar](100) NOT NULL,
			[way_name_en] [nvarchar](100) NOT NULL,
			[way_abbr_ru] [nvarchar](50) NOT NULL,
			[way_abbr_en] [nvarchar](50) NOT NULL,
			--[capacity] [int] NULL,
			[deadlock] [bit] NULL,
			[crossing_uz] [bit] NULL,
			[crossing_amkr] [bit] NULL,
			[id_devision] [int] NULL,
			[dissolution] [bit] NULL,
			[output_dissolution] [bit] NULL,
			[station_dissolution] [int] NULL,
			[way_close] [datetime] NULL,
			[way_delete] [datetime] NULL,
			[count_all_wagons] [int] NULL,
			[count_amkr_wagons] [int] NULL,
			[capacity_wagons] [int] NULL
		)
	AS
	BEGIN
	insert @status_way
	SELECT 
	   way.[id]
      ,way.[id_station]
      ,way.[id_park]
      ,way.[position_park]
      ,way.[position_way]
      ,way.[way_num_ru]
      ,way.[way_num_en]
      ,way.[way_name_ru]
      ,way.[way_name_en]
      ,way.[way_abbr_ru]
      ,way.[way_abbr_en]
      --,way.[capacity]
      ,way.[deadlock]
      ,way.[crossing_uz]
      ,way.[crossing_amkr]
      ,way.[id_devision]
      ,way.[dissolution]
      ,way.[output_dissolution]
      ,way.[station_dissolution]
      ,way.[way_close]
      ,way.[way_delete]
		,[IDS].[get_count_all_wagons_of_way](way.[id])
		,[IDS].[get_count_amkr_wagons_of_way](way.[id])
		,way.[capacity]--,[IDS].[get_capacity_wagons_of_way](way.[id])
	FROM IDS.Directory_Ways as way
	WHERE way.id_station = @id_station and [way_delete] is null
  RETURN
 END


GO


