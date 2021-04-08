USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_dislocation_wagon_of_num]    Script Date: 08.04.2021 16:53:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO








CREATE FUNCTION [IDS].[get_dislocation_wagon_of_num]
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
	[operation_wagon_name_ru] [nvarchar](20) NULL,
	[operation_wagon_name_en] [nvarchar](20) NULL,
	[operation_wagon_start] [datetime] NULL,
	[operation_wagon_end] [datetime] NULL,
	[operation_wagon_busy] [bit] NULL,
	[operation_wagon_create] [datetime] NULL,
	[operation_wagon_create_user] [nvarchar](50) NULL,
	[operation_wagon_close] [datetime] NULL,
	[operation_wagon_close_user] [nvarchar](50) NULL
	)
	AS
	BEGIN
	insert @wagon_dislocation

SELECT wir.[id] as id_wir
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
	  		--> “≈ ”ўјя ќѕ≈–ј÷»я
		-- операци€ над вагоном
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
	  --into wagon_dislocation
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] AS wir Left JOIN
  	IDS.[WagonInternalMovement] as wim ON wim.id = (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_wagon_internal_routes]= wir.[id] order by id desc) Left JOIN
	IDS.[WagonInternalOperation] as wio ON wio.id = (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= wir.[id] order by id desc)  Left JOIN
	[IDS].[Directory_Station] as dir_station ON dir_station.id = wim.[id_station] Left JOIN
	[IDS].[Directory_Ways] as dir_way ON dir_way.id = wim.[id_way] Left JOIN
	[IDS].[Directory_OuterWays] as dir_oway ON dir_oway.id = wim.[id_outer_way] Left JOIN
	IDS.Directory_WagonOperations as dir_operation ON wio.id_operation =  dir_operation.id     
  where wir.[num]=@num
  order by wir.[id] desc
  RETURN
 END
 



GO


