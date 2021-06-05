USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_capacity_wagons_of_park]    Script Date: 02.06.2021 10:12:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_capacity_wagons_of_park](@id_station int, @id_park int) 
	RETURNS int
	AS
	BEGIN 
		RETURN (SELECT sum([capacity]) capacity FROM [IDS].[Directory_Ways] where [id_park] = @id_park and [id_station]=@id_station and [way_delete] is null and [capacity] is not null)
	END
GO


