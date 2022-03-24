USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_arrival_sostav]    Script Date: 24.03.2022 12:19:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_arrival_sostav]
 (
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
	SELECT arrs.[id]
      ,arrs.[id_arrived]
      ,arrs.[id_sostav]
      ,arrs.[train]
      ,arrs.[composition_index]
      ,arrs.[date_arrival]
      ,arrs.[date_adoption]
      ,arrs.[date_adoption_act]
	  -- Станция отправки
	  ,arrs.[id_station_from]
      ,st_from.station_name_ru as station_from_name_ru
      ,st_from.station_name_en as station_from_name_en
      ,st_from.station_abbr_ru as station_from_abbr_ru
      ,st_from.station_abbr_en as station_from_abbr_en
	  -- Станция приема
	  ,arrs.[id_station_on]
	  ,st_on.station_name_ru AS station_on_name_ru
	  ,st_on.station_name_en AS station_on_name_en
	  ,st_on.station_abbr_ru AS station_on_abbr_ru
	  ,st_on.station_abbr_en AS station_on_abbr_en
		-- Путь приема
	  ,arrs.[id_way] as id_way_on
      ,ws.way_num_ru as way_on_num_ru
      ,ws.way_num_en as way_on_num_en
      ,ws.way_name_ru as way_on_name_ru
      ,ws.way_name_en as way_on_name_en
      ,arrs.[numeration]
      ,arrs.[num_doc]
      ,arrs.[count]
      ,arrs.[status]
      ,arrs.[note]
      ,arrs.[create]
      ,arrs.[create_user]
      ,arrs.[change]
      ,arrs.[change_user]
	  ,count_all = (SELECT count (AC.[id]) FROM [IDS].[ArrivalCars] AS AC where AC.[id_arrival]=arrs.[id])
	  ,count_arrival = (SELECT count (AC.[id]) FROM [IDS].[ArrivalCars] AS AC where AC.[id_arrival]=arrs.[id] and AC.[position_arrival] is not null)
	  ,count_not_arrival = (SELECT count (AC.[id]) FROM [IDS].[ArrivalCars] AS AC where AC.[id_arrival]=arrs.[id] and AC.[position_arrival] is null)
  FROM [IDS].[ArrivalSostav] as arrs LEFT OUTER JOIN
  		IDS.Directory_Station AS st_from ON arrs.[id_station_from] = st_from.id LEFT OUTER JOIN
		IDS.Directory_Station AS st_on ON arrs.[id_station_on] = st_on.id LEFT OUTER JOIN
  		IDS.Directory_Ways AS ws ON arrs.[id_way] = ws.id
  RETURN
 END
 


GO


