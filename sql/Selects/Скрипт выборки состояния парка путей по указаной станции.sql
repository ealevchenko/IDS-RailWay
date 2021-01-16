declare @id_station int = 6
declare @id int = 53

SELECT 
 [id] 
,[park_name_ru] 
,[park_name_en] 
,[park_abbr_ru]  
,[park_abbr_en] 
,[create] 
,[create_user]
,[change] 
,[change_user] 
,count_wagon = (SELECT count([id]) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_way] in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [id_station] = @id_station and [id_park] = ps.id) and [id_outer_way] is null and [way_end] is null)
,count_capacity = (SELECT sum([capacity]) FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [id_station] = @id_station and [id_park] = ps.id)
--into status_park_way
FROM [KRR-PA-CNT-Railway].[IDS].[Directory_ParkWays] as ps
--where [id] in (SELECT distinct [id_park] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where id_station = @id_station) and 
where id = @id