USE [KRR-PA-CNT-Railway]--[KRR-PA-Test-Railway]
GO
/****** Object:  UserDefinedFunction [IDS].[get_position_park_of_station]    Script Date: 30.08.2021 12:11:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER FUNCTION [IDS].[get_position_park_of_station](@id_station int, @id_park int) 
	RETURNS int
	AS
	BEGIN 
		RETURN ((SELECT min([position_park]) FROM [IDS].[Directory_Ways] where [id_park]=@id_park and id_station =@id_station and [way_delete] is null))
	END
