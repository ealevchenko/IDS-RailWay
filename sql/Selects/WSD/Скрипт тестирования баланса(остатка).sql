use [KRR-PA-CNT-Railway]
declare @id_way int = 1230
 SELECT count([num]) count_wagon FROM [IDS].[Directory_WagonsRent] where rent_end is null and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_way] = @id_way and [way_start] is not null and [way_end] is null )) 

 SELECT count([num]) count_wagon FROM [IDS].[Directory_WagonsRent] 
 where rent_end is null and  [id_operator] in (
 SELECT [id_operator] FROM [IDS].[Directory_OperatorsWagons_AMKR]) 
 and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_way] = @id_way and [way_start] is not null and [way_end] is null )
 ) 

 select * from [IDS].[get_total_balance]()


--SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz')

SELECT count([id_operator]) FROM [IDS].[Directory_WagonsRent] where rent_end is null and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_way] = @id_way and [way_start] is not null and [way_end] is null)) and [id_operator] in (SELECT [id_operator] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz'))
SELECT count([id_operator]) FROM [IDS].[Directory_WagonsRent] where rent_end is null and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_way] in (SELECT [id] FROM [IDS].[Directory_Ways] where [id_park] = @id_park and [id_station]=@id_station and [way_delete] is null) and [way_start] is not null and [way_end] is null)) and [id_operator] in (SELECT [id_operator] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz'))
SELECT count([id_operator]) FROM [IDS].[Directory_WagonsRent] where rent_end is null and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_station] = @id_station and [way_start] is not null and [way_end] is null)) and [id_operator] in (SELECT [id_operator] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz'))

SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz') and [id_operator] in (SELECT [id_operator] FROM [IDS].[Directory_WagonsRent] where rent_end is null and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_way] = @id_way and [way_start] is not null and [way_end] is null)));

SELECT [id_operator] FROM [IDS].[Directory_WagonsRent] where rent_end is null and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_way] = @id_way and [way_start] is not null and [way_end] is null));
 
SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_way] = @id_way and [way_start] is not null and [way_end] is null) 

SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_way] = @id_way and [way_start] is not null and [way_end] is null
 
 SELECT [id] FROM [IDS].[Directory_Ways] where [id_park] = @id_park and [id_station]=@id_station and [way_delete] is null



 --SELECT count([num]) count_wagon FROM [IDS].[Directory_WagonsRent] where rent_end is null and  [id_operator] in (SELECT [id_operator] FROM [IDS].[Directory_OperatorsWagons_AMKR]) and [num] in (SELECT [num] FROM [IDS].[WagonInternalRoutes] where id in (SELECT [id_wagon_internal_routes] FROM [IDS].[WagonInternalMovement] where [id_way] in (SELECT [id] FROM [IDS].[Directory_Ways] where [id_park] = @id_park and [id_station]=@id_station) and [way_start] is not null and [way_end] is null ))


