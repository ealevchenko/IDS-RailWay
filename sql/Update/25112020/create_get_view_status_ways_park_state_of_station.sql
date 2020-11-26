USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_status_ways_park_state_of_station]    Script Date: 26.11.2020 17:10:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_view_status_ways_park_state_of_station]
 (
	@id_park_state_station int
 )
	RETURNS 
	@ways_status_park_state TABLE(
		[id] [int] NOT NULL,
		[id_park_state_station] [int] NOT NULL,
		[id_park] [int] NULL,
		[id_way] [int] NOT NULL,
		[position] [int] NOT NULL,
		[park_name_ru] [nvarchar](100) NULL,
		[park_name_en] [nvarchar](100) NULL,
		[park_abbr_ru] [nvarchar](50) NULL,
		[park_abbr_en] [nvarchar](50) NULL,
		[way_num_ru] [nvarchar](20) NULL,
		[way_num_en] [nvarchar](20) NULL,
		[way_name_ru] [nvarchar](100) NULL,
		[way_name_en] [nvarchar](100) NULL,
		[way_abbr_ru] [nvarchar](50) NULL,
		[way_abbr_en] [nvarchar](50) NULL,
		[capacity] [int] NULL,
		[count_wagon] [int] NULL,
		[note] [nvarchar](100) NULL,
		[create] [datetime] NOT NULL,
		[create_user] [nvarchar](50) NOT NULL,
		[change] [datetime] NULL,
		[change_user] [nvarchar](50) NULL,
		[delete] [datetime] NULL,
		[delete_user] [nvarchar](50) NULL
	)
	AS
	BEGIN
	insert @ways_status_park_state
		SELECT
		   psw.[id]
		  ,psw.[id_park_state_station]
		  ,dir_way.[id_park]
		  ,psw.[id_way]
		  ,psw.[position]
		  -- Парк
		  ,dir_park.[park_name_ru]
		  ,dir_park.[park_name_en]
		  ,dir_park.[park_abbr_ru]
		  ,dir_park.[park_abbr_en]
		  -- Путь
		  ,dir_way.[way_num_ru]
		  ,dir_way.[way_num_en]
		  ,dir_way.[way_name_ru]
		  ,dir_way.[way_name_en]
		  ,dir_way.[way_abbr_ru]
		  ,dir_way.[way_abbr_en]
		  ,dir_way.[capacity]
		  ,[count_wagon] = (SELECT count(id) FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Wagon] where [id_park_state_way] =psw.[id])
		  ,psw.[note]
		  ,psw.[create]
		  ,psw.[create_user]
		  ,psw.[change]
		  ,psw.[change_user]
		  ,psw.[delete]
		  ,psw.[delete_user]
	  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Way] as psw Left JOIN								
		IDS.[Directory_Ways] as dir_way ON dir_way.id = psw.id_way Left JOIN	
		IDS.[Directory_ParkWays] as dir_park ON dir_park.id = dir_way.id_park
	  where psw.[id_park_state_station] = @id_park_state_station
	  order by psw.[position] 
  RETURN
 END
 
GO


