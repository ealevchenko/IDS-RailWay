USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_dislocation_wagon_of_date]    Script Date: 10.12.2020 17:49:27 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_dislocation_wagon_of_date]
 (
   @date datetime
 )
	RETURNS 
	@wagon_dislocation TABLE(
	[id] [int] NOT NULL,
	[pss_id_station] [int] NOT NULL,
	[pss_station_name_ru] [nvarchar](50) NULL,
	[pss_station_name_en] [nvarchar](50) NULL,
	[pss_station_abbr_ru] [nvarchar](50) NULL,
	[pss_station_abbr_en] [nvarchar](50) NULL,
	[state_on] [datetime] NOT NULL,
	[pss_note] [nvarchar](100) NULL,
	[pss_create] [datetime] NOT NULL,
	[pss_create_user] [nvarchar](50) NOT NULL,
	[pss_change] [datetime] NULL,
	[pss_change_user] [nvarchar](50) NULL,
	[pss_delete] [datetime] NULL,
	[pss_delete_user] [nvarchar](50) NULL,
	[pss_applied] [datetime] NULL,
	[pss_applied_user] [nvarchar](50) NULL,
	[ps_way_id] [int] NOT NULL,
	[ps_way_id_way] [int] NOT NULL,
	[ps_way_way_num_ru] [nvarchar](20) NULL,
	[ps_way_way_num_en] [nvarchar](20) NULL,
	[ps_way_way_name_ru] [nvarchar](100) NULL,
	[ps_way_way_name_en] [nvarchar](100) NULL,
	[ps_way_way_abbr_ru] [nvarchar](50) NULL,
	[ps_way_way_abbr_en] [nvarchar](50) NULL,
	[ps_way_position] [int] NOT NULL,
	[ps_wag_id] [int] NOT NULL,
	[num] [int] NOT NULL,
	[ps_wag_position] [int] NOT NULL,
	[ps_wag_create] [datetime] NOT NULL,
	[ps_wag_create_user] [nvarchar](50) NOT NULL,
	[ps_wag_change] [datetime] NULL,
	[ps_wag_change_user] [nvarchar](50) NULL,
	[wir_id] [bigint] NULL,
	[id_arrival_car] [bigint] NULL,
	[id_sap_incoming_supply] [bigint] NULL,
	[doc_outgoing_car] [bit] NULL,
	[id_outgoing_car] [bigint] NULL,
	[id_sap_outbound_supply] [bigint] NULL,
	[wir_note] [nvarchar](250) NULL,
	[wir_create] [datetime] NULL,
	[wir_create_user] [nvarchar](50) NULL,
	[wir_close] [datetime] NULL,
	[wir_close_user] [nvarchar](50) NULL,
	[wir_parent_id] [bigint] NULL,
	[wim_id] [bigint] NULL,
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
	[wim_note] [nvarchar](250) NULL,
	[wim_create] [datetime] NULL,
	[wim_create_user] [nvarchar](50) NULL,
	[wim_close] [datetime] NULL,
	[wim_close_user] [nvarchar](50) NULL,
	[wim_parent_id] [bigint] NULL
	)
	AS
	BEGIN
	insert @wagon_dislocation
	SELECT  pss.[id]
		  ,pss.[id_station] as pss_id_station
		  ,dir_station_pss.[station_name_ru] as pss_station_name_ru
		  ,dir_station_pss.[station_name_en] as pss_station_name_en
		  ,dir_station_pss.[station_abbr_ru] as pss_station_abbr_ru
		  ,dir_station_pss.[station_abbr_en] as pss_station_abbr_en
		  ,pss.[state_on]
		  ,pss.[note] as pss_note
		  ,pss.[create] as pss_create
		  ,pss.[create_user] as pss_create_user
		  ,pss.[change] as pss_change
		  ,pss.[change_user] as pss_change_user
		  ,pss.[delete] as pss_delete
		  ,pss.[delete_user] as pss_delete_user
		  ,pss.[applied] as pss_applied
		  ,pss.[applied_user] as pss_applied_user
	  	  ,ps_way.[id] as ps_way_id
		  ,ps_way.[id_way] as ps_way_id_way
		  ,dir_way_ps.[way_num_ru] as ps_way_way_num_ru
		  ,dir_way_ps.[way_num_en] as ps_way_way_num_en
		  ,dir_way_ps.[way_name_ru] as ps_way_way_name_ru
		  ,dir_way_ps.[way_name_en] as ps_way_way_name_en
		  ,dir_way_ps.[way_abbr_ru] as ps_way_way_abbr_ru
		  ,dir_way_ps.[way_abbr_en] as ps_way_way_abbr_en
		  ,ps_way.[position] as ps_way_position
		  ,ps_wag.[id] as ps_wag_id		  
		  ,ps_wag.num
		  ,ps_wag.[position] as ps_wag_position
		  ,ps_wag.[create] as ps_wag_create
		  ,ps_wag.[create_user] as ps_wag_create_user
		  ,ps_wag.[change] as ps_wag_change
		  ,ps_wag.[change_user] as ps_wag_change_user
		  ,wir.[id] as wir_id
		  ,wir.[id_arrival_car]
		  ,wir.[id_sap_incoming_supply]
		  ,wir.[doc_outgoing_car]
		  ,wir.[id_outgoing_car]
		  ,wir.[id_sap_outbound_supply]
		  ,wir.[note] as wir_note
		  ,wir.[create] as wir_create
		  ,wir.[create_user] as wir_create_user
		  ,wir.[close] as wir_close
		  ,wir.[close_user] as wir_close_user
		  ,wir.[parent_id] as wir_parent_id
		  ,wim.[id] as wim_id
		  ,wim.[id_wagon_internal_routes]
		  ,wim.[id_station] as id_station
		  ,dir_station.[station_name_ru] as station_name_ru
		  ,dir_station.[station_name_en] as station_name_en
		  ,dir_station.[station_abbr_ru] as station_abbr_ru
		  ,dir_station.[station_abbr_en] as station_abbr_en
		  ,wim.[id_way] as id_way
		  ,dir_way.[way_num_ru] as way_num_ru
		  ,dir_way.[way_num_en] as way_num_en
		  ,dir_way.[way_name_ru] as way_name_ru
		  ,dir_way.[way_name_en] as way_name_en
		  ,dir_way.[way_abbr_ru] as way_abbr_ru
		  ,dir_way.[way_abbr_en] as way_abbr_en
		  ,wim.[way_start]
		  ,wim.[way_end]
		  ,wim.[id_outer_way]
		  ,dir_oway.[name_outer_way_ru]
		  ,dir_oway.[name_outer_way_en]
		  ,wim.[outer_way_start]
		  ,wim.[outer_way_end]
		  ,wim.[position]
		  ,wim.[note] as wim_note
		  ,wim.[create] as wim_create
		  ,wim.[create_user] as wim_create_user
		  ,wim.[close] as wim_close
		  ,wim.[close_user] as wim_close_user
		  ,wim.[parent_id] as wim_parent_id
		  --INTO view_dislocation_wagon
  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Station] as pss INNER JOIN 
  IDS.ParkState_Way as ps_way ON ps_way.id_park_state_station = pss.id INNER JOIN
	IDS.ParkState_Wagon as ps_wag ON ps_way.id = ps_wag.id_park_state_way LEFT JOIN
	[IDS].[WagonInternalRoutes] AS wir ON wir.num = ps_wag.num Left JOIN
  	IDS.[WagonInternalMovement] as wim ON wim.id = (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_wagon_internal_routes]= wir.[id] order by id desc) Left JOIN
	[IDS].[Directory_Station] as dir_station ON dir_station.id = wim.[id_station] Left JOIN
	[IDS].[Directory_Ways] as dir_way ON dir_way.id = wim.[id_way] Left JOIN
	[IDS].[Directory_OuterWays] as dir_oway ON dir_oway.id = wim.[id_outer_way] Left JOIN
	[IDS].[Directory_Ways] as dir_way_ps ON dir_way_ps.id = ps_way.[id_way] Left JOIN
	[IDS].[Directory_Station] as dir_station_pss ON dir_station_pss.id = pss.[id_station]
  where [state_on] = @date
  RETURN
 END
 




GO


