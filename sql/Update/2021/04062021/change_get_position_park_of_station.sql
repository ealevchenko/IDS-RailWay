USE [KRR-PA-CNT-Railway]
GO
/****** Object:  UserDefinedFunction [IDS].[get_position_park_of_station]    Script Date: 04.06.2021 17:15:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER FUNCTION [IDS].[get_position_park_of_station](@id_station int, @id_park int) 
	RETURNS int
	AS
	BEGIN 
		RETURN ((SELECT min([position_park]) FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [id_park]=@id_park and id_station =@id_station and [way_delete] is null))
	END
