USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_start_datetime_station_of_wim]    Script Date: 10.09.2021 13:48:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_start_datetime_station_of_wim](@id_wim int) 
	RETURNS datetime
	AS
	BEGIN 
	RETURN (select top(1) way_start from [IDS].[get_wim_station_of_id_wim](@id_wim) order by way_start)
	END
GO


