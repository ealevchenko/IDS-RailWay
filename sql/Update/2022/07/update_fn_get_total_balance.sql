USE [KRR-PA-CNT-Railway]
GO
/****** Object:  UserDefinedFunction [IDS].[get_total_balance]    Script Date: 05.07.2022 15:11:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER FUNCTION [IDS].[get_total_balance]
 (
 )

	RETURNS 
	@table_total_balance TABLE(
	[id] [int] NOT NULL,
	[all] [int] NULL,
	[amkr] [int] NULL
	)
	AS
	BEGIN

	declare @total_all int;
declare @total_amkr_vz int;
declare @total_all_external int;
declare @total_amkr_external int;
declare @total_balance int;

--> ИТОГО ВСЕ ВАГОНЫ
set @total_all = (
select count(wim.id)
FROM IDS.WagonInternalMovement as wim
WHERE 
-- Исключим КИРОВА
wim.id_station <> 10
and wim.id_way in (SELECT [id] FROM [IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [IDS].Directory_Station where station_delete is null))
-- Вагоны на станциях и перегонах перегонах
AND (wim.way_end IS NULL OR (wim.outer_way_start is not NULL and wim.outer_way_end is null))
)
--> ИТОГО ВАГОНЫ АМКР и АМКР ВЗ
set @total_amkr_vz =(
select count(wim.id)
FROM IDS.WagonInternalMovement as wim	--> Текущая дислокаци
--> Текущее внетренее перемещение
INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
--> Справочник аренд
Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
where 
-- Исключим КИРОВА
wim.id_station <> 10
and wim.id_way in (SELECT [id] FROM [IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [IDS].Directory_Station where station_delete is null))
-- Вагоны на станциях и перегонах
AND (wim.way_end IS NULL OR (wim.outer_way_start is not NULL and wim.outer_way_end is null))
AND dir_rent.id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz'))
)

--> ИТОГО ОСТАТОК ВНЕШНИХ ВАГОНОВ
set @total_all_external = (
select count(wim.id)
FROM IDS.WagonInternalMovement as wim	--> Текущая дислокаци
--> Текущее внетренее перемещение
INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
--> Справочник аренд
Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
where 
-- Исключим КИРОВА
wim.id_station <> 10
and wim.id_way in (SELECT [id] FROM [IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [IDS].Directory_Station where station_delete is null))
-- Вагоны на станциях и перегонах
AND (wim.way_end IS NULL OR (wim.outer_way_start is not NULL and wim.outer_way_end is null))
AND (dir_rent.id_operator is null OR dir_rent.id_operator not IN  (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr_vz')))
)

--> ИТОГО ОСТАТОК ВНЕШНИХ ВАГОНОВ АМКР
set @total_amkr_external = (
select count(wim.id)
FROM IDS.WagonInternalMovement as wim	--> Текущая дислокаци
--> Текущее внетренее перемещение
INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
--> Справочник аренд
Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
where 
-- Исключим КИРОВА
wim.id_station <> 10
and wim.id_way in (SELECT [id] FROM [IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [IDS].Directory_Station where station_delete is null))
-- Вагоны на станциях и перегонах
AND (wim.way_end IS NULL OR (wim.outer_way_start is not NULL and wim.outer_way_end is null))
AND dir_rent.id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr'))
)

--> ИТОГО УЧЕТНЫЙ ОСТАТОК
set @total_balance = (
select count(wim.id)
FROM IDS.WagonInternalMovement as wim	--> Текущая дислокаци
--> Текущее внетренее перемещение
INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
--> Справочник вагонов
Left JOIN IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num
--> Справочник Род вагона
Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
--> Справочник аренд
Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
--> Отправка вагона
Left JOIN [IDS].[OutgoingCars] as out_car ON wir.id_outgoing_car = out_car.id
--> Отправка состава
Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_car.id_outgoing = out_sost.id
--> Прием вагона
Left JOIN [IDS].[ArrivalCars] as arr_car ON wir.id_arrival_car = arr_car.id
Left JOIN [IDS].[Arrival_UZ_Vagon] as uz_doc_vag ON arr_car.id_arrival_uz_vagon = uz_doc_vag.id
Left JOIN [IDS].[Arrival_UZ_Document] as uz_doc ON uz_doc_vag.id_document = uz_doc.id
where 
-- Исключим КИРОВА
wim.id_station <> 10
and uz_doc.klient <> 1
and wim.id_way in (SELECT [id] FROM [IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [IDS].Directory_Station where station_delete is null))
-- Вагоны на станциях и перегонах
AND (wim.way_end IS NULL OR (wim.outer_way_start is not NULL and wim.outer_way_end is null))
-- Вагоны осортированные по другим причинам
AND (dir_rent.id_operator is null OR (NOT (dir_rent.id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz'))) AND NOT (dir_rent.id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('cisterns')) and dir_rod.rod_uz = 70)))
AND (out_sost.status is null OR out_sost.status = 0 OR out_sost.status = 1)
)


	insert @table_total_balance
	select 1,@total_all,@total_amkr_vz

	insert @table_total_balance
	select 2,@total_all_external,@total_amkr_external

	insert @table_total_balance
	select 3,@total_balance,null

  RETURN
 END
 


