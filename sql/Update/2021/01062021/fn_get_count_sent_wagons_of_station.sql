USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_count_sent_wagons_of_station]    Script Date: 01.06.2021 17:40:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [IDS].[get_count_sent_wagons_of_station](@id_station int) 
	RETURNS int
	AS
	BEGIN 
		RETURN (SELECT count([id]) FROM [IDS].[WagonInternalMovement] where [id_station] = @id_station and [way_start] is not null and [way_end] is not null and [outer_way_start] is not null and [outer_way_end] is null)
	END
GO


