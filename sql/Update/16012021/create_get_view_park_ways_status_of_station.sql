USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_park_ways_status_of_station]    Script Date: 16.01.2021 13:29:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_view_park_ways_status_of_station]
 (
    @id_station int
 )
	RETURNS 
	@park_ways_status TABLE(
			[id] [int] NOT NULL,
			[park_name_ru] [nvarchar](100) NOT NULL,
			[park_name_en] [nvarchar](100) NOT NULL,
			[park_abbr_ru] [nvarchar](50) NOT NULL,
			[park_abbr_en] [nvarchar](50) NOT NULL,
			[create] [datetime] NOT NULL,
			[create_user] [nvarchar](50) NOT NULL,
			[change] [datetime] NULL,
			[change_user] [nvarchar](50) NULL,
			[count_wagon] [int] NULL,
			[count_capacity] [int] NULL
		)
	AS
	BEGIN
	insert @park_ways_status
	SELECT 
		 [id] 
		,[park_name_ru] 
		,[park_name_en] 
		,[park_abbr_ru]  
		,[park_abbr_en] 
		,[create] 
		,[create_user]
		,[change] 
		,[change_user] 
		,count_wagon = (SELECT count([id]) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_way] in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [id_station] = @id_station and [id_park] = ps.id) and [id_outer_way] is null and [way_end] is null)
		,count_capacity = (SELECT sum([capacity]) FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [id_station] = @id_station and [id_park] = ps.id)
	FROM [KRR-PA-CNT-Railway].[IDS].[Directory_ParkWays] as ps
	where [id] in (SELECT distinct [id_park] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where id_station = @id_station)
  RETURN
 END


GO


