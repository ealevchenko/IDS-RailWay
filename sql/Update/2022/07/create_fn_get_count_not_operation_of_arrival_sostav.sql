USE [KRR-PA-CNT-Railway]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_count_not_operation_of_arrival_sostav](@id_sostav int) 
	RETURNS int
	AS
	BEGIN 
		RETURN
		(
		SELECT count(arr_car.[id])
		FROM  [IDS].[ArrivalCars] as arr_car 
		--> Справочник вагонов
		Left JOIN IDS.Directory_Wagons as dir_wagon ON arr_car.num = dir_wagon.num
		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = arr_car.num and rent_end is null order by [id] desc)
		where arr_car.[id_arrival]=@id_sostav and arr_car.[arrival] is not null AND dir_rent.id_operator is null
		)
	END
GO


