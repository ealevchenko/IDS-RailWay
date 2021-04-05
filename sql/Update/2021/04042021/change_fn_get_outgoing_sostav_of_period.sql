USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_outgoing_sostav_of_period]    Script Date: 04.04.2021 22:31:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




drop FUNCTION [IDS].[get_outgoing_sostav_of_period]
go

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
	[vagonnik_user] [nvarchar](50) NULL,
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
	[count_return] [int] NULL,
	[count_detention] [int] NULL,
	[count_vagonnik] [int] NULL
	)
	AS
	BEGIN
	insert @outgoing_sostav
	select * from [IDS].[get_outgoing_sostav]()
	where date_readiness_amkr>=@start and date_readiness_amkr<=@stop
	order by [date_readiness_amkr]
  RETURN
 END
 


GO


