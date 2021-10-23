USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_count_wagon_accepted_of_sostav_outer_ways]    Script Date: 23.10.2021 16:52:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




--Функция возвращает количество возвращенных(отмененых) вагонов из отправленного состава

CREATE FUNCTION [IDS].[get_count_wagon_accepted_of_sostav_outer_ways](@num_sostav nvarchar(50)) 
	RETURNS int
	AS
	BEGIN 
		RETURN (
		SELECT count(wim_from.id) FROM IDS.WagonInternalMovement as wim_from --> Дислокация отправка на станцию
		--> Дислокация прибыл на станцию	
		Left JOIN IDS.WagonInternalMovement as wim_on ON wim_from.id = wim_on.parent_id
		--> Операция прибыл на станцию
		Left JOIN IDS.WagonInternalOperation as wio_on ON wim_on.[id_wio]=wio_on.id 
		WHERE wim_from.[num_sostav] = @num_sostav 
		and wim_from.outer_way_end is not null and (wio_on.id_operation is null OR (wio_on.id_operation <> 11 and wio_on.id_operation <> 12 and wio_on.id_operation <> 6)))
	END
GO


