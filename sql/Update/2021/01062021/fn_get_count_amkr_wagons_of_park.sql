USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_count_amkr_wagons_of_park]    Script Date: 02.06.2021 10:12:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_count_amkr_wagons_of_park](@id_station int, @id_park int) 
	RETURNS int
	AS
	BEGIN 
		RETURN (SELECT count([num]) count_wagon FROM [IDS].[Directory_WagonsRent] where rent_end is null and  [id_operator] in (SELECT [id_operator] FROM [IDS].[Directory_OperatorsWagons_AMKR]) and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_way] in (SELECT [id] FROM [IDS].[Directory_Ways] where [id_park] = @id_park and [id_station]=@id_station) and [way_start] is not null and [way_end] is null )))
	END
GO


