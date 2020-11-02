USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_station_status]    Script Date: 02.11.2020 21:28:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [IDS].[get_view_station_status]
 (

 )
	RETURNS 
	@station_status TABLE(
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
			[count_arrive] [int] NULL,
			[count_sent] [int] NULL,
			[count_wagon] [int] NULL,
			[count_capacity] [int] NULL
		)
	AS
	BEGIN
	insert @station_status
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
		count_arrive = (SELECT count([id]) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_outer_way] in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OuterWays] where [id_station_on] =st.id) and [outer_way_end] is null),
		count_sent = (SELECT count([id]) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_outer_way] in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OuterWays] where [id_station_from] =st.id) and [outer_way_end] is null),
		count_wagon = (SELECT count([id]) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_station] = st.id and [id_outer_way] is null and [way_end] is null),
		count_capacity = (SELECT sum([capacity]) FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [id_station] = st.id)
	FROM IDS.Directory_Station as st
  RETURN
 END


GO


