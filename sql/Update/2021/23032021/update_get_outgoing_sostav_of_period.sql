USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_outgoing_sostav_of_period]    Script Date: 23.03.2021 17:40:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




--drop FUNCTION [IDS].[get_outgoing_sostav_of_period]


CREATE FUNCTION [IDS].[get_outgoing_sostav_of_period]
 (
    @start datetime,
	@stop datetime
 )
	RETURNS 
	@outgoing_sostav TABLE(
	[id] [bigint] NOT NULL,
	[num_doc] [int] NOT NULL,
	[id_station_from] [int] NOT NULL,
	[station_from_name_ru] [nvarchar](50) NULL,
	[station_from_name_en] [nvarchar](50) NULL,
	[station_from_abbr_ru] [nvarchar](50) NULL,
	[station_from_abbr_en] [nvarchar](50) NULL,
	[id_way_from] [int] NOT NULL,
	[way_from_num_ru] [nvarchar](20) NULL,
	[way_from_num_en] [nvarchar](20) NULL,
	[way_from_name_ru] [nvarchar](100) NULL,
	[way_from_name_en] [nvarchar](100) NULL,
	[id_station_on] [int] NULL,
	[station_on_name_ru] [nvarchar](50) NULL,
	[station_on_name_en] [nvarchar](50) NULL,
	[station_on_abbr_ru] [nvarchar](50) NULL,
	[station_on_abbr_en] [nvarchar](50) NULL,
	[date_readiness_amkr] [datetime] NOT NULL,
	[date_end_inspection_acceptance_delivery] [datetime] NULL,
	[date_end_inspection_loader] [datetime] NULL,
	[date_end_inspection_vagonnik] [datetime] NULL,
	[date_show_wagons] [datetime] NULL,
	[date_readiness_uz] [datetime] NULL,
	[date_outgoing] [datetime] NULL,
	[date_outgoing_act] [datetime] NULL,
	[date_departure_amkr] [datetime] NULL,
	[composition_index] [nvarchar](50) NULL,
	[status] [int] NOT NULL,
	[note] [nvarchar](200) NULL,
	[route_sign] [bit] NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[count_all] [int] NULL,
	[count_outgoing] [int] NULL,
	[count_not_outgoing] [int] NULL,
	[count_detention_return] [int] NULL
	)
	AS
	BEGIN
	insert @outgoing_sostav
SELECT
			outs.[id]
			,outs.[num_doc]
			-- Станция отправки
			,outs.[id_station_from]
			,st_from.station_name_ru as station_from_name_ru
			,st_from.station_name_en as station_from_name_en
			,st_from.station_abbr_ru as station_from_abbr_ru
			,st_from.station_abbr_en as station_from_abbr_en
			-- Путь отправки
			,outs.[id_way_from]
			,ws.way_num_ru as way_from_num_ru
			,ws.way_num_en as way_from_num_en
			,ws.way_name_ru as way_from_name_ru
			,ws.way_name_en as way_from_name_en
			-- Станция приема
			,outs.[id_station_on]
			,st_on.station_name_ru AS station_on_name_ru
			,st_on.station_name_en AS station_on_name_en
			,st_on.station_abbr_ru AS station_on_abbr_ru
			,st_on.station_abbr_en AS station_on_abbr_en
		  ,outs.[date_readiness_amkr]
		  ,outs.[date_end_inspection_acceptance_delivery]
		  ,outs.[date_end_inspection_loader]
		  ,outs.[date_end_inspection_vagonnik]
		  ,outs.[date_show_wagons]
		  ,outs.[date_readiness_uz]
		  ,outs.[date_outgoing]
		  ,outs.[date_outgoing_act]
		  ,outs.[date_departure_amkr]
		  ,outs.[composition_index]
		  ,outs.[status]
		  ,outs.[note]
		  ,outs.[route_sign]
		  ,outs.[create]
		  ,outs.[create_user]
		  ,outs.[change]
		  ,outs.[change_user]
		  ,count_all = (SELECT count (AC.[id]) FROM [IDS].[OutgoingCars] AS AC where AC.[id_outgoing]=outs.id)
		  ,count_outgoing = (SELECT count (AC.[id]) FROM [IDS].[OutgoingCars] AS AC where AC.[id_outgoing]=outs.id and AC.[position_outgoing] is not null)
		  ,count_not_outgoing = (SELECT count (AC.[id]) FROM [IDS].[OutgoingCars] AS AC where AC.[id_outgoing]=outs.id and AC.[position_outgoing] is null and AC.[id_outgoing_detention] is null)
		  ,count_detention_return = (SELECT count (AC.[id]) FROM [IDS].[OutgoingCars] AS AC where AC.[id_outgoing]=outs.id and AC.[id_outgoing_detention] is not null)
	FROM  IDS.OutgoingSostav AS outs LEFT OUTER JOIN
		IDS.Directory_Ways AS ws ON outs.id_way_from = ws.id LEFT OUTER JOIN
		IDS.Directory_Station AS st_from ON outs.id_station_from = st_from.id LEFT OUTER JOIN
		IDS.Directory_Station AS st_on ON outs.id_station_on = st_on.id
	where outs.date_readiness_amkr>=@start and outs.date_readiness_amkr<=@stop
	order by outs.[date_readiness_amkr]
  RETURN
 END
 


GO


