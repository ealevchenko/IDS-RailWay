	declare @start datetime = Convert(datetime,'2021-08-01 00:00:00',120)
	declare @stop datetime = Convert(datetime,'2021-08-30 23:59:59',120)
	declare @id_operation int = 5

	
	select
	*
	,wir.*
	,wio.*
	,outer_ways.*
	FROM IDS.WagonInternalOperation as wio  INNER JOIN
	IDS.WagonInternalRoutes as wir ON wio.id_wagon_internal_routes = wir.id Left JOIN
	IDS.WagonInternalMovement as wim ON wio.operation_end = wim.outer_way_start AND wio.id_wagon_internal_routes=wim.id_wagon_internal_routes and wio.create_user = wim.create_user Left JOIN
	IDS.Directory_OuterWays as outer_ways ON wim.id_outer_way = outer_ways.id
	WHERE wio.id_operation = @id_operation and wio.operation_start >= @start and wio.operation_start <= @stop
	order by wio.operation_start, wim.id_outer_way

	select count(id) FROM IDS.WagonInternalOperation as wio
	WHERE wio.id_operation = @id_operation and wio.operation_start >= @start and wio.operation_start <= @stop