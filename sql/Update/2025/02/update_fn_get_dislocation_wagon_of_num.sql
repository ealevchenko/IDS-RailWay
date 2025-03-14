USE [KRR-PA-CNT-Railway]
GO
/****** Object:  UserDefinedFunction [IDS].[get_dislocation_wagon_of_num]    Script Date: 25.02.2025 10:13:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER FUNCTION [IDS].[get_dislocation_wagon_of_num]
 (
   @num int
 )
	RETURNS 
	@wagon_dislocation TABLE(
	[id_wir] [bigint] NOT NULL,
	[num] [int] NOT NULL,
	[id_arrival_car] [bigint] NULL,
	[id_sap_incoming_supply] [bigint] NULL,
	[doc_outgoing_car] [bit] NULL,
	[id_outgoing_car] [bigint] NULL,
	[id_sap_outbound_supply] [bigint] NULL,
	[note_wir] [nvarchar](250) NULL,
	[create_wir] [datetime] NOT NULL,
	[create_user_wir] [nvarchar](50) NOT NULL,
	[close_wir] [datetime] NULL,
	[close_user_wir] [nvarchar](50) NULL,
	[parent_id_wir] [bigint] NULL,
	[id_wim] [bigint] NULL,
	[id_wagon_internal_routes] [bigint] NULL,
	[id_station] [int] NULL,
	[station_name_ru] [nvarchar](50) NULL,
	[station_name_en] [nvarchar](50) NULL,
	[station_abbr_ru] [nvarchar](50) NULL,
	[station_abbr_en] [nvarchar](50) NULL,
	[id_way] [int] NULL,
	[way_num_ru] [nvarchar](20) NULL,
	[way_num_en] [nvarchar](20) NULL,
	[way_name_ru] [nvarchar](100) NULL,
	[way_name_en] [nvarchar](100) NULL,
	[way_abbr_ru] [nvarchar](50) NULL,
	[way_abbr_en] [nvarchar](50) NULL,
	[way_start] [datetime] NULL,
	[way_end] [datetime] NULL,
	[id_outer_way] [int] NULL,
	[name_outer_way_ru] [nvarchar](150) NULL,
	[name_outer_way_en] [nvarchar](150) NULL,
	[outer_way_start] [datetime] NULL,
	[outer_way_end] [datetime] NULL,
	[position] [int] NULL,
	[note_wim] [nvarchar](250) NULL,
	[create_wim] [datetime] NULL,
	[create_user_wim] [nvarchar](50) NULL,
	[close_wim] [datetime] NULL,
	[close_user_wim] [nvarchar](50) NULL,
	[parent_id_wim] [bigint] NULL,
	[id_operation_wagon] [int] NULL,
	[operation_wagon_name_ru] [nvarchar](50) NULL,
	[operation_wagon_name_en] [nvarchar](50) NULL,
	[operation_wagon_start] [datetime] NULL,
	[operation_wagon_end] [datetime] NULL,
	[operation_wagon_busy] [bit] NULL,
	[operation_wagon_create] [datetime] NULL,
	[operation_wagon_create_user] [nvarchar](50) NULL,
	[operation_wagon_close] [datetime] NULL,
	[operation_wagon_close_user] [nvarchar](50) NULL,
	[date_outgoing] [datetime] NULL,
	[date_outgoing_act] [datetime] NULL,
	[date_departure_amkr] [datetime] NULL,
	[status] [int] NULL,
	[current_wagon_busy] [int] NOT NULL,
	[current_move_busy] [int] NOT NULL	)
	AS
	BEGIN
	insert @wagon_dislocation

SELECT top(1) wir.[id] as id_wir
      ,wir.[num]
      ,wir.[id_arrival_car]
      ,wir.[id_sap_incoming_supply]
      ,wir.[doc_outgoing_car]
      ,wir.[id_outgoing_car]
      ,wir.[id_sap_outbound_supply]
      ,wir.[note] as note_wir
      ,wir.[create] as create_wir
      ,wir.[create_user] as create_user_wir
      ,wir.[close] as close_wir
      ,wir.[close_user] as close_user_wir
      ,wir.[parent_id] as parent_id_wir
	  ,wim.[id] as id_wim
      ,wim.[id_wagon_internal_routes]
      ,wim.[id_station]
	  ,dir_station.[station_name_ru]
      ,dir_station.[station_name_en]
      ,dir_station.[station_abbr_ru]
      ,dir_station.[station_abbr_en]
      ,wim.[id_way]
	  ,dir_way.[way_num_ru]
      ,dir_way.[way_num_en]
      ,dir_way.[way_name_ru]
      ,dir_way.[way_name_en]
      ,dir_way.[way_abbr_ru]
      ,dir_way.[way_abbr_en]
      ,wim.[way_start]
      ,wim.[way_end]
      ,wim.[id_outer_way]
	  ,dir_oway.[name_outer_way_ru]
      ,dir_oway.[name_outer_way_en]
      ,wim.[outer_way_start]
      ,wim.[outer_way_end]
      ,wim.[position]
      ,wim.[note] as note_wim
      ,wim.[create] as create_wim
      ,wim.[create_user] as create_user_wim
      ,wim.[close] as close_wim
      ,wim.[close_user] as close_user_wim
      ,wim.[parent_id] as parent_id_wim
	  		--> ТЕКУЩАЯ ОПЕРАЦИЯ
		-- операция над вагоном
		,wio.id_operation as id_operation_wagon
		,dir_operation.operation_name_ru as operation_wagon_name_ru
		,dir_operation.operation_name_en as operation_wagon_name_en
		,wio.operation_start as operation_wagon_start
		,wio.operation_end as operation_wagon_end
		,dir_operation.busy as operation_wagon_busy
		,wio.[create] as operation_wagon_create
		,wio.create_user as operation_wagon_create_user
		,wio.[close] as operation_wagon_close
		,wio.close_user as operation_wagon_close_user
		--> Отправка вагонов добавил 15.01.2024
		,out_sost.date_outgoing
		,out_sost.date_outgoing_act
		,out_sost.date_departure_amkr
		,out_sost.status
		,current_wagon_busy = (CASE WHEN (wio.operation_start is not null and wio.[operation_end] is null) or (wf.[create] is not null and wf.[close] is null and (wim.filing_start is null  or wim.filing_end is null)) THEN 1 ELSE 0 END)
		,current_move_busy = (CASE WHEN (out_sost.status > 0 OR wio.id_operation in (9) OR (wio.operation_start is not null and wio.[operation_end] is null) OR (wf.[create] is not null and wf.[close] is null and (wim.filing_start is null  or wim.filing_end is null))) THEN 1 ELSE 0 END)

	  --into wagon_dislocation
  FROM [IDS].[WagonInternalRoutes] AS wir Left JOIN
	--> Отправка вагонов добавил 15.01.2024
  	[IDS].[OutgoingCars] as out_car ON out_car.id = wir.id_outgoing_car Left JOIN
	[IDS].[OutgoingSostav] as out_sost ON out_sost.id = out_car.id_outgoing Left JOIN
  	IDS.[WagonInternalMovement] as wim ON wim.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalMovement] where [id_wagon_internal_routes]= wir.[id] and [close] is null order by id desc) Left JOIN
	IDS.[WagonInternalOperation] as wio ON wio.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= wir.[id] and [close] is null order by id desc)  Left JOIN
	[IDS].[WagonFiling] as wf ON wf.id = wim.id_filing Left JOIN 
	[IDS].[Directory_Station] as dir_station ON dir_station.id = wim.[id_station] Left JOIN
	[IDS].[Directory_Ways] as dir_way ON dir_way.id = wim.[id_way] Left JOIN
	[IDS].[Directory_OuterWays] as dir_oway ON dir_oway.id = wim.[id_outer_way] Left JOIN
	IDS.Directory_WagonOperations as dir_operation ON wio.id_operation =  dir_operation.id     
  where wir.[num]=@num
  order by wir.[id] desc
  RETURN
 END
 



