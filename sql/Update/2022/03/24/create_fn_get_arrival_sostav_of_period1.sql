USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_arrival_sostav_of_period1]    Script Date: 24.03.2022 12:19:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_arrival_sostav_of_period1]
 (
    @start datetime,
	@stop datetime
 )
	RETURNS 
	@arriva_sostav TABLE(
	[id] [bigint] NOT NULL,
	[id_arrived] [bigint] NULL,
	[id_sostav] [bigint] NULL,
	[train] [int] NOT NULL,
	[composition_index] [nvarchar](50) NOT NULL,
	[date_arrival] [datetime] NOT NULL,
	[date_adoption] [datetime] NULL,
	[date_adoption_act] [datetime] NULL,
	[id_station_from] [int] NULL,
	[station_from_name_ru] [nvarchar](50) NULL,
	[station_from_name_en] [nvarchar](50) NULL,
	[station_from_abbr_ru] [nvarchar](50) NULL,
	[station_from_abbr_en] [nvarchar](50) NULL,
	[id_station_on] [int] NULL,
	[station_on_name_ru] [nvarchar](50) NULL,
	[station_on_name_en] [nvarchar](50) NULL,
	[station_on_abbr_ru] [nvarchar](50) NULL,
	[station_on_abbr_en] [nvarchar](50) NULL,
	[id_way_on] [int] NULL,
	[way_on_num_ru] [nvarchar](20) NULL,
	[way_on_num_en] [nvarchar](20) NULL,
	[way_on_name_ru] [nvarchar](100) NULL,
	[way_on_name_en] [nvarchar](100) NULL,
	[numeration] [bit] NULL,
	[num_doc] [int] NULL,
	[count] [int] NULL,
	[status] [int] NOT NULL,
	[note] [nvarchar](200) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[count_all] [int] NULL,
	[count_arrival] [int] NULL,
	[count_not_arrival] [int] NULL
	)
	AS
	BEGIN
	insert @arriva_sostav
	select * from [IDS].[get_arrival_sostav]()
	where date_arrival>=@start and date_arrival<=@stop
	order by [date_arrival]
  RETURN
 END
 


GO


