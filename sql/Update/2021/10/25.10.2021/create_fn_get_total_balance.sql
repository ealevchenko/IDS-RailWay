USE [KRR-PA-CNT-Railway]
GO

/****** ������� ������� ��������  Script Date: 25.10.2021 14:23:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [IDS].[get_total_balance]
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

--> ����� ��� ������
set @total_all = (
select count(wim.id)
FROM IDS.WagonInternalMovement as wim
WHERE 
-- �������� ������
wim.id_station <> 10
and wim.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].Directory_Station where station_delete is null))
-- ������ �� �������� � ��������� ���������
AND (wim.way_end IS NULL OR (wim.outer_way_start is not NULL and wim.outer_way_end is null))
)
--> ����� ������ ���� � ���� ��
set @total_amkr_vz =(
select count(wim.id)
FROM IDS.WagonInternalMovement as wim	--> ������� ���������
--> ������� ��������� �����������
INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
--> ���������� �����
Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
where 
-- �������� ������
wim.id_station <> 10
and wim.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].Directory_Station where station_delete is null))
-- ������ �� �������� � ���������
AND (wim.way_end IS NULL OR (wim.outer_way_start is not NULL and wim.outer_way_end is null))
AND dir_rent.id_operator IN (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz'))
)

--> ����� ������� ������� �������
set @total_all_external = (
select count(wim.id)
FROM IDS.WagonInternalMovement as wim	--> ������� ���������
--> ������� ��������� �����������
INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
--> ���������� �����
Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
where 
-- �������� ������
wim.id_station <> 10
and wim.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].Directory_Station where station_delete is null))
-- ������ �� �������� � ���������
AND (wim.way_end IS NULL OR (wim.outer_way_start is not NULL and wim.outer_way_end is null))
AND dir_rent.id_operator not IN  (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr_vz'))
)

--> ����� ������� ������� ������� ����
set @total_amkr_external = (
select count(wim.id)
FROM IDS.WagonInternalMovement as wim	--> ������� ���������
--> ������� ��������� �����������
INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
--> ���������� �����
Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
where 
-- �������� ������
wim.id_station <> 10
and wim.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].Directory_Station where station_delete is null))
-- ������ �� �������� � ���������
AND (wim.way_end IS NULL OR (wim.outer_way_start is not NULL and wim.outer_way_end is null))
AND dir_rent.id_operator IN (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr'))
)

--> ����� ������� �������
set @total_balance = (
select count(wim.id)
FROM IDS.WagonInternalMovement as wim	--> ������� ���������
--> ������� ��������� �����������
INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
--> ���������� �������
Left JOIN IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num
--> ���������� ��� ������
Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
--> ���������� �����
Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
--> �������� ������
Left JOIN [IDS].[OutgoingCars] as out_car ON wir.id_outgoing_car = out_car.id
--> �������� �������
Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_car.id_outgoing = out_sost.id
where 
-- �������� ������
wim.id_station <> 10
and wim.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].Directory_Station where station_delete is null))
-- ������ �� �������� � ���������
AND (wim.way_end IS NULL OR (wim.outer_way_start is not NULL and wim.outer_way_end is null))
AND dir_rent.id_operator NOT IN (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz'))
AND (out_sost.status is null OR out_sost.status = 0 OR out_sost.status = 1)
AND not (dir_rent.id_operator IN (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('cisterns')) and dir_rod.rod_uz = 70)
)


	insert @table_total_balance
	select 1,@total_all,@total_amkr_vz

	insert @table_total_balance
	select 2,@total_all_external,@total_amkr_external

	insert @table_total_balance
	select 3,@total_balance,null

  RETURN
 END
 


GO


