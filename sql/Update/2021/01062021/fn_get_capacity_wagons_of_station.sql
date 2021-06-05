USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_capacity_wagons_of_station]    Script Date: 01.06.2021 17:40:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [IDS].[get_capacity_wagons_of_station](@id_station int) 
	RETURNS int
	AS
	BEGIN 
		RETURN (SELECT sum([capacity]) FROM [IDS].[Directory_Ways] where [id_station] =@id_station and [way_delete] is null and [capacity] is not null)
	END
GO


