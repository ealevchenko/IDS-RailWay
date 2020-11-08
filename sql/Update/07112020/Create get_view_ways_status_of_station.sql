USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_ways_status_of_station]    Script Date: 07.11.2020 21:59:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_view_ways_status_of_station]
 (
   @id_station int
 )
	RETURNS 
	@way_status TABLE(
		[id] [int] NOT NULL,
		[id_station] [int] NOT NULL,
		[id_park] [int] NOT NULL,
		[position_park] [int] NOT NULL,
		[position_way] [int] NOT NULL,
		[park_name_ru] [nvarchar](100) NOT NULL,
		[park_name_en] [nvarchar](100) NOT NULL,
		[park_abbr_ru] [nvarchar](50) NOT NULL,
		[park_abbr_en] [nvarchar](50) NOT NULL,
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
	insert @way_status
	SELECT 
		w.[id],
		w.[id_station],
		w.[id_park],
		w.[position_park],
		w.[position_way],
		pw.[park_name_ru],
		pw.[park_name_en],
		pw.[park_abbr_ru],
		pw.[park_abbr_en],
		w.[way_num_ru],
		w.[way_num_en],
		w.[way_name_ru],
		w.[way_name_en],
		w.[way_abbr_ru],
		w.[way_abbr_en],
		w.[capacity],
		[count_wagon] = (SELECT count(id) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_way] =w.[id] and [way_end] is null),
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
	FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] as w Left JOIN
	IDS.Directory_ParkWays as pw ON pw.id = (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_ParkWays] where [id] = w.[id_park])
	where w.[id_station]=@id_station 
	ORDER BY position_park, position_way
  RETURN
 END
 


GO


