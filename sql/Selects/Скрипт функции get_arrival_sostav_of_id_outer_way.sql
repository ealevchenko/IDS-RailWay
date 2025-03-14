/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT 
wim.[note],
wim.[outer_way_start],
count(wim.[id]) as count_wagon,
(select top(1) [locomotive1] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation] where [id_wagon_internal_routes] = wim.id_wagon_internal_routes and [operation_end]= wim.outer_way_start )
--TOP 1000 [id]
--      ,[id_wagon_internal_routes]
--      ,[id_station]
--      ,[id_way]
--      ,[way_start]
--      ,[way_end]
--      ,[id_outer_way]
--      ,[outer_way_start]
--      ,[outer_way_end]
--      ,[position]
--      ,[note]
--      ,[create]
--      ,[create_user]
--      ,[close]
--      ,[close_user]
--      ,[parent_id]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
  where wim.[id_outer_way] = 12 and wim.[outer_way_end] is null
  group by wim.[outer_way_start],wim.[note], wim.id_wagon_internal_routes

  /****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT 
wim.[note] as num_train,
wim.[outer_way_start],
count(wim.[id]) as count_wagon,
[locomotives] = (select top(1) [locomotive1] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation] where [operation_end]= wim.outer_way_start )
  --into arrival_sostav
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
  where wim.[id_outer_way] = 12 and wim.[outer_way_end] is null
  group by wim.[outer_way_start],wim.[note]