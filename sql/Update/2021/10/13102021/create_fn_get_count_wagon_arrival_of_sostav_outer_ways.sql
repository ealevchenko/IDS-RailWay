USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_count_wagon_arrival_of_sostav_outer_ways]    Script Date: 21.10.2021 9:35:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


--Функция возвращает количество принятых вагонов из отправленного состава

CREATE FUNCTION [IDS].[get_count_wagon_arrival_of_sostav_outer_ways](@num_sostav nvarchar(50)) 
	RETURNS int
	AS
	BEGIN 
		RETURN (
		SELECT count(wim_from.id) FROM IDS.WagonInternalMovement as wim_from --> Дислокация отправка на станцию
		--> Дислокация прибыл на станцию	
		Left JOIN IDS.WagonInternalMovement as wim_on ON wim_from.id = wim_on.parent_id
		--> Операция прибыл на станцию
		Left JOIN IDS.WagonInternalOperation as wio_on ON wim_on.[id_wio]=wio_on.id 
		WHERE wim_from.[num_sostav] = @num_sostav and wio_on.id_operation = 6)
	END
GO


