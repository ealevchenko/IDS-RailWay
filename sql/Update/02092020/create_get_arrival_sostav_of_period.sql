USE [KRR-PA-CNT-Railway]
GO

/****** Object:  StoredProcedure [IDS].[get_arrival_sostav_of_period]    Script Date: 02.09.2020 21:42:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Левченко Э.А
-- Create date: 02.09.2020
-- Description:	Показать составы за указаный период
-- =============================================
CREATE PROCEDURE [IDS].[get_arrival_sostav_of_period]
	@start datetime,
	@stop datetime
AS
BEGIN
SELECT
ARS.id, 
ARS.id_arrived, 
ARS.id_sostav, 
ARS.train, 
ARS.composition_index, 
ARS.date_arrival, 
ARS.date_adoption, 
ARS.date_adoption_act, 
ARS.id_station_from, 
ARS.id_station_on, 
ARS.id_way, 
ARS.numeration, 
ARS.num_doc,
ARS.count, 
ARS.status, 
ARS.note, 
ARS.[create], 
ARS.create_user, 
ARS.change, 
ARS.change_user, 
SF.station_name_ru as station_from_name_ru, 
SF.station_name_en as station_from_name_en, 
SF.station_abbr_ru as station_from_abbr_ru, 
SF.station_abbr_en as station_from_abbr_ru,
SON.station_name_ru AS station_on_name_ru, 
SON.station_name_en AS station_on_name_en, 
SON.station_abbr_ru AS station_on_abbr_ru, 
SON.station_abbr_en AS station_on_abbr_ru, 
WS.way_num_ru,
WS.way_num_en,
WS.way_name_ru,
WS.way_name_en,
count_all = (SELECT count (AC.[id]) FROM [IDS].[ArrivalCars] AS AC where AC.[id_arrival]=ARS.id),
count_arrival = (SELECT count (AC.[id]) FROM [IDS].[ArrivalCars] AS AC where AC.[id_arrival]=ARS.id and AC.[position_arrival] is not null),
count_not_arrival = (SELECT count (AC.[id]) FROM [IDS].[ArrivalCars] AS AC where AC.[id_arrival]=ARS.id and AC.[position_arrival] is null)
FROM  IDS.ArrivalSostav AS ARS LEFT OUTER JOIN
	IDS.Directory_Ways AS WS ON ARS.id_way = WS.id LEFT OUTER JOIN
	IDS.Directory_Station AS SON ON ARS.id_station_on = SON.id LEFT OUTER JOIN
	IDS.Directory_Station AS SF ON ARS.id_station_from = SF.id
where ARS.date_arrival>=@start and ARS.date_arrival<=@stop
END



GO


