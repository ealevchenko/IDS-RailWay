USE [KRR-PA-CNT-Railway]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_id_wagons_rent_arrival_of_id_arrival_uz_vagon](@id_arrival_uz_vagon int) 
	RETURNS int
	AS
	BEGIN 

	declare @num int = (SELECT [num] FROM [IDS].[Arrival_UZ_Vagon] where id = @id_arrival_uz_vagon)

	declare @date_arrival datetime = (SELECT [date_arrival] FROM [IDS].[ArrivalSostav] where [id] = (select [id_arrival] FROM [IDS].[Arrival_UZ_Vagon] where id = @id_arrival_uz_vagon))

	declare @date_adoption datetime = (SELECT [date_adoption] FROM [IDS].[ArrivalSostav] where [id] = (select [id_arrival] FROM [IDS].[Arrival_UZ_Vagon] where id = @id_arrival_uz_vagon))

		RETURN (SELECT top(1) id FROM [IDS].[Directory_WagonsRent] where [num] = @num 
				and (
				(@date_adoption is null and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@date_arrival) 
				OR 
				(@date_adoption is not null and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@date_adoption)
				) order by [id] desc)
	END
GO


