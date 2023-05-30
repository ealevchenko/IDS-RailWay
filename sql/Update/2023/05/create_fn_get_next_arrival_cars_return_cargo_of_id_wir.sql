USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_old_id_arrival_of_wir_parent_id]    Script Date: 30.05.2023 13:47:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE FUNCTION [IDS].[get_next_arrival_cars_return_cargo_of_id_wir](@id_wir bigint) 
	RETURNS bit
	AS
	BEGIN 
	RETURN (SELECT [cargo_returns] FROM [IDS].[Arrival_UZ_Vagon] where id =(SELECT [id_arrival_uz_vagon] FROM [IDS].[ArrivalCars] where [id]=(select top(1) [id_arrival_car] FROM [IDS].[WagonInternalRoutes] where [parent_id] = @id_wir)))
	END
GO


