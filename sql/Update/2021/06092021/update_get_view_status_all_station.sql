USE [KRR-PA-CNT-Railway]
GO
/****** Object:  UserDefinedFunction [IDS].[get_view_status_all_station]    Script Date: 06.09.2021 16:13:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER FUNCTION [IDS].[get_view_status_all_station]
 (

 )
	RETURNS 
	@status_station TABLE(
			[id] [int] NOT NULL,
			[station_name_ru] [nvarchar](50) NOT NULL,
			[station_name_en] [nvarchar](50) NOT NULL,
			[station_abbr_ru] [nvarchar](50) NOT NULL,
			[station_abbr_en] [nvarchar](50) NOT NULL,
			[exit_uz] [bit] NOT NULL,
			[station_uz] [bit] NOT NULL,
			[default_side] [bit] NULL,
			[code] [int] NULL,
			[idle_time] [int] NULL,
			[count_arrives_wagons] [int] NULL,
			[count_sent_wagons] [int] NULL,
			[count_all_wagons] [int] NULL,
			[count_amkr_wagons] [int] NULL,
			[capacity_wagons] [int] NULL
		)
	AS
	BEGIN
	insert @status_station
	SELECT 
		st.id, 
		st.station_name_ru, 
		st.station_name_en, 
		st.station_abbr_ru, 
		st.station_abbr_en, exit_uz, 
		st.station_uz, 
		st.default_side, 
		st.code, 
		st.idle_time,
		[IDS].[get_count_arrives_wagons_of_station](st.id),
		[IDS].[get_count_sent_wagons_of_station](st.id),
		[IDS].[get_count_all_wagons_of_station](st.id),
		[IDS].[get_count_amkr_wagons_of_station](st.id),
		[IDS].[get_capacity_wagons_of_station](st.id)
	FROM IDS.Directory_Station as st
	WHERE st.station_delete is null
  RETURN
 END


