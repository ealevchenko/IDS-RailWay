USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_start_datetime_station_of_wim]    Script Date: 08.07.2025 13:21:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_start_datetime_way_of_wim](@parent_id bigint, @id_way int, @way_start datetime) 
	RETURNS datetime
	AS
	BEGIN 
	 declare @ds datetime = (select [way_start] FROM [IDS].[WagonInternalMovement] wim_pi where wim_pi.id=@parent_id and wim_pi.id_way=@id_way)
	 RETURN (select (CASE WHEN @ds is null THEN @way_start ELSE @ds END))
	END
GO


