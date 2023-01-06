USE [KRR-PA-CNT-Railway]
GO

/****** ‘ункци€ возвращает id_arrival id прибывшего предыдущего состава по которому нет возврата вагона ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_old_id_arrival_of_wir_parent_id](@parent_id bigint) 
	RETURNS bigint
	AS
	BEGIN 
		DECLARE @Counter INT = 1
		DECLARE @id_arrival_car bigint
		DECLARE @id_arrival bigint
		DECLARE @cargo_returns bit
	WHILE ( @Counter <= 10) -- берем с расчетом того что больше 10 возвратов за раз не будет
		BEGIN
			set @id_arrival_car = (SELECT [id_arrival_car] FROM [IDS].[WagonInternalRoutes] as wir where wir.id = @parent_id)
			set @id_arrival = (SELECT [id_arrival] FROM [IDS].[ArrivalCars] as arr_car where arr_car.id = @id_arrival_car)
			set @cargo_returns = (SELECT [cargo_returns] FROM  [IDS].[Arrival_UZ_Vagon] as arr_uz_vag WHERE arr_uz_vag.id = (SELECT [id_arrival_uz_vagon] FROM [IDS].[ArrivalCars] as arr_car1 where arr_car1.id = @id_arrival_car))
			if (@cargo_returns is null OR @cargo_returns = 0) BEGIN BREAK END;
			SET @Counter  = @Counter  + 1
		END
	RETURN @id_arrival
	END
GO


