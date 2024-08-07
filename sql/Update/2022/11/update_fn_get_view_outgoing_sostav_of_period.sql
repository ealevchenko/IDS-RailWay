USE [KRR-PA-CNT-Railway]
GO
/****** Object:  UserDefinedFunction [IDS].[get_view_outgoing_sostav_of_period]    Script Date: 28.11.2022 12:09:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER FUNCTION [IDS].[get_view_outgoing_sostav_of_period]
 (
   @start datetime, 
   @stop datetime
 )
	RETURNS 
	@sostav TABLE(
		[id] [bigint] NOT NULL,
		[num_doc] [int] NOT NULL,
		[id_station_from] [int] NOT NULL,
		[id_way_from] [int] NOT NULL,
		[id_station_on] [int] NULL,
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
		[route_sign] [bit] NULL,
		[note] [nvarchar](200) NULL,
		[create] [datetime] NOT NULL,
		[create_user] [nvarchar](50) NOT NULL,
		[change] [datetime] NULL,
		[change_user] [nvarchar](50) NULL,
		[vagonnik_user] [nvarchar](50) NULL,
		[count_wagon] [int] NULL,
		[count_return_wagon] [int] NULL,
		[count_account_balance] [int] NULL
	)
	AS
	BEGIN
	insert @sostav
	SELECT out_sost.[id]
      ,out_sost.[num_doc]
      ,out_sost.[id_station_from]
      ,out_sost.[id_way_from]
      ,out_sost.[id_station_on]
      ,out_sost.[date_readiness_amkr]
      ,out_sost.[date_end_inspection_acceptance_delivery]
      ,out_sost.[date_end_inspection_loader]
      ,out_sost.[date_end_inspection_vagonnik]
      ,out_sost.[date_show_wagons]
      ,out_sost.[date_readiness_uz]
      ,out_sost.[date_outgoing]
      ,out_sost.[date_outgoing_act]
      ,out_sost.[date_departure_amkr]
      ,out_sost.[composition_index]
      ,out_sost.[status]
      ,out_sost.[route_sign]
      ,out_sost.[note]
      ,out_sost.[create]
      ,out_sost.[create_user]
      ,out_sost.[change]
      ,out_sost.[change_user]
      ,out_sost.[vagonnik_user]
  	  ,count_wagon = (SELECT count(ac.id) FROM  [IDS].[OutgoingCars] as ac where ac.[id_outgoing]=out_sost.id and ac.[outgoing] is not null)
	  	  -- вагоны вернутые с УЗ
	  ,count_return_wagon = (SELECT count (vag_doc.id) FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] as out_car
		Left JOIN [IDS].[WagonInternalRoutes] as wir on wir.parent_id = (select id from [IDS].[WagonInternalRoutes] where [id_outgoing_car] = out_car.id)  
		Left JOIN [IDS].[ArrivalCars] as arr_car on wir.id_arrival_car = arr_car.id
		Left JOIN [IDS].[Arrival_UZ_Vagon] as vag_doc on arr_car.id_arrival_uz_vagon = vag_doc.id
		where out_car.[id_outgoing]=out_sost.id and vag_doc.cargo_returns = 1)
	  ,count_account_balance = ([IDS].[get_count_account_balance_of_outgoing_sostav](out_sost.id))
	  --into view_outgoing_sostav
  FROM [IDS].[OutgoingSostav] as out_sost
  where out_sost.[date_outgoing]>= @start and out_sost.[date_outgoing]<=@stop
  order by [date_outgoing] 
  RETURN
 END

