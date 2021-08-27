USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_park_station_of_station]    Script Date: 16.08.2021 16:29:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE FUNCTION [IDS].[get_view_park_station_of_station]
 (
    @id_station int
 )
	RETURNS 
	@parks_station TABLE(
			[id] [int] NOT NULL,
			[position_park] [int] NOT NULL,
			[park_name_ru] [nvarchar](100) NOT NULL,
			[park_name_en] [nvarchar](100) NOT NULL,
			[park_abbr_ru] [nvarchar](50) NOT NULL,
			[park_abbr_en] [nvarchar](50) NOT NULL,
			[create] [datetime] NOT NULL,
			[create_user] [nvarchar](50) NOT NULL,
			[change] [datetime] NULL,
			[change_user] [nvarchar](50) NULL
		)
	AS
	BEGIN
	insert @parks_station
	SELECT 
		 [id]
		,[position_park] = (SELECT top(1) [position_park] FROM [IDS].[Directory_Ways] as ways where ways.id_park=park.[id])
		,[park_name_ru] 
		,[park_name_en] 
		,[park_abbr_ru]  
		,[park_abbr_en] 
		,[create] 
		,[create_user]
		,[change] 
		,[change_user] 
	FROM [IDS].[Directory_ParkWays] as park
	where [id] in (SELECT distinct [id_park] FROM [IDS].[Directory_Ways] where id_station = @id_station)
  RETURN
 END


GO


