USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_count_all_wagons_of_station]    Script Date: 01.06.2021 17:40:38 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [IDS].[get_count_all_wagons_of_station](@id_station int) 
	RETURNS int
	AS
	BEGIN 
		RETURN (SELECT count([num]) count_wagon FROM [IDS].[Directory_WagonsRent] where rent_end is null and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_station] = @id_station and [way_start] is not null and [way_end] is null )) )
	END
GO


