use [KRR-PA-CNT-Railway]

--SELECT [parent_id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_outgoing_car] = 586310

--/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
--SELECT [parent_id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_outgoing_car] = 586310

--  SELECT [id_arrival_car] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
--  where id = (SELECT [parent_id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_outgoing_car] = 586310)

--  /****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
--SELECT [id_arrival] FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars]
--  where id = (SELECT [id_arrival_car] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
--  where id = (SELECT [parent_id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_outgoing_car] = 586310))

--  /****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
--SELECT [date_adoption]
--      ,[date_adoption_act]
--  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav]
--  where [id] = (SELECT [id_arrival] FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars]
--  where id = (SELECT [id_arrival_car] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
--  where id = (SELECT [parent_id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_outgoing_car] = 586310)))



--with recursive tree (id_arrival_car, id, level, pathstr)
--as (select id_arrival_car, id, 0, cast('' as text)
--   from [IDS].[WagonInternalRoutes]
--   where parent_id is null
--union all
--   select [IDS].[WagonInternalRoutes].id_arrival_car, [IDS].[WagonInternalRoutes].id, t.level + 1, tree.pathstr + [IDS].[WagonInternalRoutes].id_arrival_car
--   from [IDS].[WagonInternalRoutes]
--     inner join tree on tree.id = [IDS].[WagonInternalRoutes].parent_id)


--select id, space(level) + id_arrival_car as id_arrival_car
--from tree
--order by pathstr

DECLARE @parent_id bigint = 544683

DECLARE @Counter INT = 1
DECLARE @id_arrival_car bigint
DECLARE @id_arrival bigint
DECLARE @cargo_returns bit

WHILE ( @Counter <= 10)
BEGIN
	set @id_arrival_car = (SELECT [id_arrival_car] FROM [IDS].[WagonInternalRoutes] as wir where wir.id = @parent_id)
	set @id_arrival = (SELECT [id_arrival] FROM [IDS].[ArrivalCars] as arr_car where arr_car.id = @id_arrival_car)
	set @cargo_returns = (SELECT [cargo_returns] FROM  [IDS].[Arrival_UZ_Vagon] as arr_uz_vag WHERE arr_uz_vag.id = (SELECT [id_arrival_uz_vagon] FROM [IDS].[ArrivalCars] as arr_car1 where arr_car1.id = @id_arrival_car))
    if (@cargo_returns is null OR @cargo_returns = 0) BEGIN BREAK END;
	--PRINT 'The counter value is = ' + CONVERT(VARCHAR,@Counter)
    SET @Counter  = @Counter  + 1
END
select @id_arrival, @Counter