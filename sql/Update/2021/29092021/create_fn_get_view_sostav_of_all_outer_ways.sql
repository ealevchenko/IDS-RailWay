USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_sostav_of_all_outer_ways]    Script Date: 01.10.2021 16:47:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_view_sostav_of_all_outer_ways]
 (

 )
		RETURNS 
	@view_sostav TABLE  (
	[outer_way_num_sostav] [nvarchar](50) NULL,
	[id_outer_way] [int] NULL,
	[name_outer_way_ru] [nvarchar](150) NULL,
	[name_outer_way_en] [nvarchar](150) NULL,
	[outer_way_close] [datetime] NULL,
	[outer_way_delete] [datetime] NULL,
	[from_operation_locomotive1] [nvarchar](20) NULL,
	[from_operation_locomotive2] [nvarchar](20) NULL,
	[from_operation_start] [datetime] NULL,
	[from_operation_end] [datetime] NULL,
	[from_operation_create] [datetime] NULL,
	[from_operation_create_user] [nvarchar](50) NULL,
	[from_id_station] [int] NULL,
	[from_station_name_ru] [nvarchar](50) NULL,
	[from_station_name_en] [nvarchar](50) NULL,
	[from_station_abbr_ru] [nvarchar](50) NULL,
	[from_station_abbr_en] [nvarchar](50) NULL,
	[from_id_way] [int] NULL,
	[from_id_park] [int] NULL,
	[from_way_num_ru] [nvarchar](20) NULL,
	[from_way_num_en] [nvarchar](20) NULL,
	[from_way_name_ru] [nvarchar](100) NULL,
	[from_way_name_en] [nvarchar](100) NULL,
	[from_way_abbr_ru] [nvarchar](50) NULL,
	[from_way_abbr_en] [nvarchar](50) NULL,
	[from_way_capacity] [int] NULL,
	[from_way_close] [datetime] NULL,
	[from_way_delete] [datetime] NULL,
	[count_wagons_send] [int] NULL,
	[on_operation_locomotive1] [nvarchar](20) NULL,
	[on_operation_locomotive2] [nvarchar](20) NULL,
	[on_operation_start] [datetime] NULL,
	[on_operation_end] [datetime] NULL,
	[on_operation_create] [datetime] NULL,
	[on_operation_create_user] [nvarchar](50) NULL,
	[on_id_station] [int] NULL,
	[on_station_name_ru] [nvarchar](50) NULL,
	[on_station_name_en] [nvarchar](50) NULL,
	[on_station_abbr_ru] [nvarchar](50) NULL,
	[on_station_abbr_en] [nvarchar](50) NULL,
	[on_id_way] [int] NULL,
	[on_id_park] [int] NULL,
	[on_way_num_ru] [nvarchar](20) NULL,
	[on_way_num_en] [nvarchar](20) NULL,
	[on_way_name_ru] [nvarchar](100) NULL,
	[on_way_name_en] [nvarchar](100) NULL,
	[on_way_abbr_ru] [nvarchar](50) NULL,
	[on_way_abbr_en] [nvarchar](50) NULL,
	[on_way_capacity] [int] NULL,
	[on_way_close] [datetime] NULL,
	[on_way_delete] [datetime] NULL,
	[count_wagons_arrival] [int] NULL
	)
AS
BEGIN
	insert @view_sostav
	select 
		fwag.outer_way_num_sostav
		--> Перегон
		,min(fwag.[id_outer_way]) as [id_outer_way]
		,min(fwag.[name_outer_way_ru]) as [name_outer_way_ru]
		,min(fwag.[name_outer_way_en]) as [name_outer_way_en]
		,min(fwag.outer_way_close) as outer_way_close
		,min(fwag.outer_way_delete) as outer_way_delete
		--> Операции отправки на станцию (дополнительная информаци)
		,min(fwag.from_operation_locomotive1) as from_operation_locomotive1
		,min(fwag.from_operation_locomotive2) as from_operation_locomotive2
		,min(fwag.from_operation_start) as from_operation_start
		,min(fwag.from_operation_end) as from_operation_end
		,min(fwag.from_operation_create) as from_operation_create
		,min(fwag.from_operation_create_user) as from_operation_create_user
			--> Станция отправки
		,min(fwag.from_id_station) as from_id_station
		,min(fwag.from_station_name_ru) as from_station_name_ru
		,min(fwag.from_station_name_en) as from_station_name_en
		,min(fwag.from_station_abbr_ru) as from_station_abbr_ru
		,min(fwag.from_station_abbr_en) as from_station_abbr_en
			--> Путь отправки
		,min(fwag.from_id_way) as from_id_way
		,min(fwag.from_id_park) as from_id_park
		,min(fwag.from_way_num_ru) as from_way_num_ru
		,min(fwag.from_way_num_en) as from_way_num_en
		,min(fwag.from_way_name_ru) as from_way_name_ru
		,min(fwag.from_way_name_en) as from_way_name_en
		,min(fwag.from_way_abbr_ru) as from_way_abbr_ru
		,min(fwag.from_way_abbr_en) as from_way_abbr_en
		,min(fwag.from_way_capacity) as from_way_capacity
		,min(fwag.from_way_close) as from_way_close
		,min(fwag.from_way_delete) as from_way_delete
		--> Кол. вагонов
		,count(fwag.outer_way_num_sostav) as count_wagons_send
		--> Операции прибыл на станцию (дополнительная информаци)
		,min(fwag.on_operation_locomotive1) as on_operation_locomotive1
		,min(fwag.on_operation_locomotive2) as on_operation_locomotive2
		,min(fwag.on_operation_start) as on_operation_start
		,min(fwag.on_operation_end) as on_operation_end
		,min(fwag.on_operation_create) as on_operation_create
		,min(fwag.on_operation_create_user) as on_operation_create_user
 		--> Станция прибытия
		,min(fwag.on_id_station) as on_id_station
		,min(fwag.on_station_name_ru) as on_station_name_ru
		,min(fwag.on_station_name_en) as on_station_name_en
		,min(fwag.on_station_abbr_ru) as on_station_abbr_ru
		,min(fwag.on_station_abbr_en) as on_station_abbr_en
		--> Путь прибытия
		,min(fwag.on_id_way) as on_id_way
		,min(fwag.on_id_park) as on_id_park
		,min(fwag.on_way_num_ru) as on_way_num_ru
		,min(fwag.on_way_num_en) as on_way_num_en
		,min(fwag.on_way_name_ru) as on_way_name_ru
		,min(fwag.on_way_name_en) as on_way_name_en
		,min(fwag.on_way_abbr_ru) as on_way_abbr_ru
		,min(fwag.on_way_abbr_en) as on_way_abbr_en
		,min(fwag.on_way_capacity) as on_way_capacity
		,min(fwag.on_way_close) as on_way_close
		,min(fwag.on_way_delete) as on_way_delete
		,count_wagons_arrival = (SELECT count([id]) FROM [IDS].[WagonInternalMovement] where [num_sostav] = fwag.outer_way_num_sostav and [outer_way_end] is not null)
	from [IDS].[get_view_wagons_of_all_outer_ways]() as fwag
	group by fwag.outer_way_num_sostav
	RETURN
END


GO


