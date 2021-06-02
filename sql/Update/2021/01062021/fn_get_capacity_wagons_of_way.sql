USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_capacity_wagons_of_way]    Script Date: 02.06.2021 10:12:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_capacity_wagons_of_way](@id_way int) 
	RETURNS int
	AS
	BEGIN 
		RETURN (SELECT [capacity] FROM [IDS].[Directory_Ways] where [id] =@id_way)
	END
GO


