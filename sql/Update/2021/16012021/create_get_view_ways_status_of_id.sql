USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_ways_status_of_station_park_ways]    Script Date: 16.01.2021 14:27:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE FUNCTION [IDS].[get_view_ways_status_of_id]
 (
    @id_way int
 )
	RETURNS 
	@ways_status TABLE(
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
		[capacity] [int] NULL,
		[count_wagon] [int] NULL,
		[deadlock] [bit] NULL,
		[crossing_uz] [bit] NULL,
		[crossing_amkr] [bit] NULL,
		[id_devision] [int] NULL,
		[dissolution] [bit] NULL,
		[output_dissolution] [bit] NULL,
		[note] [nvarchar](100) NOT NULL,
		[create] [datetime] NOT NULL,
		[create_user] [nvarchar](50) NOT NULL,
		[change] [datetime] NULL,
		[change_user] [nvarchar](50) NULL
		)
	AS
	BEGIN
	insert @ways_status
	SELECT 
		w.[id],
		w.[id_station],
		w.[id_park],
		w.[position_park],
		w.[position_way],
		w.[way_num_ru],
		w.[way_num_en],
		w.[way_name_ru],
		w.[way_name_en],
		w.[way_abbr_ru],
		w.[way_abbr_en],
		w.[capacity],
		count_wagon = (SELECT count([id]) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_way] =w.[id] and [id_outer_way] is null and [way_end] is null),
		w.[deadlock],
		w.[crossing_uz],
		w.[crossing_amkr],
		w.[id_devision], 
		w.[dissolution], 
		w.[output_dissolution], 
		w.[note],
		w.[create],
		w.[create_user],
		w.[change],
		w.[change_user] 
	FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] as w 
	where [id] = @id_way
  RETURN
 END


GO


