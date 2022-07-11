use [KRR-PA-CNT-Railway]
--SELECT count([num]) count_wagon 
--FROM [IDS].[Directory_WagonsRent] where rent_end is null and  [id_operator] in 
--	(SELECT [id_operator] FROM [IDS].[Directory_OperatorsWagonsGroup] WHERE [group]=N'amkr') 
 
-- and [num] in 
--	(SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in 
--		(SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_way] in	
--			(SELECT [id] FROM [IDS].[Directory_Ways] where [id_park] = 71 and [id_station]=6) 
--		and [way_start] is not null and [way_end] is null )
--	)

--select 
--	wim.id
--	,wim.id_wagon_internal_routes
--	,dir_rent.num
--	,dir_rent.id_operator
--	,out_sost.status
--	--,dir_rent.*
--	,wim.*
--FROM IDS.WagonInternalMovement as wim	--> ������� ���������
----> ������� ��������� �����������
--INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
----> ���������� �����
--Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
----> �������� ������
--Left JOIN [IDS].[OutgoingCars] as out_car ON wir.id_outgoing_car = out_car.id
----> �������� �������
--Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_car.id_outgoing = out_sost.id
--where 
--wim.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station = 8) and
---- ������ �� ��������
--(wim.way_end IS NULL 
---- �������� �� ���������
--OR wim.outer_way_start is not NULL and wim.outer_way_end is null) 
--order by out_sost.status desc

--select 
--	wim.id
--	,wim.id_wagon_internal_routes
--	,wir.num
--	,out_sost.status
--	,dir_rod.rod_uz
--	,dir_rent.id_operator
--	,wim.id_way
--	,wim.id_outer_way
--FROM IDS.WagonInternalMovement as wim	--> ������� ���������
----> ������� ��������� �����������
--INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
----> ���������� �������
--Left JOIN IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num
----> ���������� ��� ������
--Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
----> ���������� �����
--Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)
----> �������� ������
--Left JOIN [IDS].[OutgoingCars] as out_car ON wir.id_outgoing_car = out_car.id
----> �������� �������
--Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_car.id_outgoing = out_sost.id
--where 
---- �������� ������
--wim.id_station <> 10
--and wim.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].Directory_Station where station_delete is null))
---- ������ �� ��������
--AND (wim.way_end IS NULL 
---- �������� �� ���������
--OR (wim.outer_way_start is not NULL and wim.outer_way_end is null)
--)
--order by out_sost.status desc


select * from [IDS].[get_total_balance]()


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
--> ����� ������
Left JOIN [IDS].[ArrivalCars] as arr_car ON wir.id_arrival_car = arr_car.id
Left JOIN [IDS].[Arrival_UZ_Vagon] as uz_doc_vag ON arr_car.id_arrival_uz_vagon = uz_doc_vag.id
Left JOIN [IDS].[Arrival_UZ_Document] as uz_doc ON uz_doc_vag.id_document = uz_doc.id
where 
-- �������� ������
wim.id_station <> 10
and uz_doc.klient <> 1
and wim.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].Directory_Station where station_delete is null))
-- ������ �� �������� � ���������
AND (wim.way_end IS NULL OR (wim.outer_way_start is not NULL and wim.outer_way_end is null))
AND dir_rent.id_operator NOT IN (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz'))
AND (out_sost.status is null OR out_sost.status = 0 OR out_sost.status = 1)
AND not (dir_rent.id_operator IN (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('cisterns')) and dir_rod.rod_uz = 70)
)