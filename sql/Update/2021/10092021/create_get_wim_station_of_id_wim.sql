USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_wim_station_of_id_wim]    Script Date: 10.09.2021 13:48:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [IDS].[get_wim_station_of_id_wim]
 (
	@id_wim int
 )
		--id, way_start, id_station, parent_id
		RETURNS 
		@view_wim TABLE  (
			[id] [bigint] NOT NULL,
			[way_start] [datetime] NOT NULL,
			[id_station] [int] NOT NULL,
			[parent_id] [bigint] NOT NULL
		)
		AS
	BEGIN
	with CteAlias as (
    select id, way_start, id_station, parent_id
    from [IDS].[WagonInternalMovement] t
    where t.id = @id_wim
    union all
	select t.id, t.way_start, t.id_station, t.parent_id
    from [IDS].[WagonInternalMovement] t
    inner join CteAlias parent on t.id = parent.parent_id and t.id_station = parent.id_station
	)
	insert @view_wim
	select * from CteAlias 
	order by way_start
	RETURN
 END

GO


