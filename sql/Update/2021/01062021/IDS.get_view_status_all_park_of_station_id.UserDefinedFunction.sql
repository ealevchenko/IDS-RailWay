USE [KRR-PA-CNT-Railway]
GO
/****** Object:  UserDefinedFunction [IDS].[get_view_status_all_park_of_station_id]    Script Date: 02.06.2021 17:31:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_view_status_all_park_of_station_id]
 (
	@id_station int
 )
	RETURNS 
	@status_park TABLE(
			[id] [int] NOT NULL,
			[position] [int] NOT NULL,
			[park_name_ru] [nvarchar](100) NOT NULL,
			[park_name_en] [nvarchar](100) NOT NULL,
			[park_abbr_ru] [nvarchar](50) NOT NULL,
			[park_abbr_en] [nvarchar](50) NOT NULL,
			[count_all_wagons] [int] NULL,
			[count_amkr_wagons] [int] NULL,
			[capacity_wagons] [int] NULL
		)
	AS
	BEGIN
	insert @status_park
	SELECT 
		pw.id,
		[IDS].[get_position_park_of_station](@id_station, pw.id),
		pw.park_name_ru, 
		pw.park_name_en, 
		pw.park_abbr_ru, 
		pw.park_abbr_en, 
		[IDS].[get_count_all_wagons_of_park](@id_station,pw.id),
		[IDS].[get_count_amkr_wagons_of_park](@id_station,pw.id),
		[IDS].[get_capacity_wagons_of_park](@id_station,pw.id)
	FROM IDS.Directory_ParkWays as pw
	WHERE pw.id in (SELECT [id_park] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [id_station] =@id_station)
  RETURN
 END


GO
