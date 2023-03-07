USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_incoming_cars_of_id_sostav]    Script Date: 07.03.2023 10:27:07 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_new_rent_outgoing_of_id_sostav]
 (
	@id_sostav bigint
 )
	RETURNS 
	@new_rent_outgoing TABLE  (

	[id] [bigint] NULL,
	[num] [int] NOT NULL,
	[id_operator] [int] NULL,
	[id_limiting] [int] NULL,
	[rent_start] [datetime] NULL,
	[rent_end] [datetime] NULL,
	[date_outgoing] [datetime] NULL,
	[parent_id] [int] NULL,
	[id_outgoing_uz_vagon] [bigint] NULL,
	[new_id] [int] NULL
	)
	AS
	BEGIN

	insert @new_rent_outgoing
	SELECT wr.[id]
      ,wr.[num]
      ,wr.[id_operator]
      ,wr.[id_limiting]
      ,wr.[rent_start]
      ,wr.[rent_end]
	  ,[date_outgoing] = (select [date_outgoing] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingSostav] where id =@id_sostav)
      --,wr.[create]
      --,wr.[create_user]
      --,wr.[change]
      --,wr.[change_user]
      ,wr.[parent_id]
	  ,[id_outgoing_uz_vagon] = (SELECT [id_outgoing_uz_vagon] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars]  where [id_outgoing] =@id_sostav and [num] = wr.[num])
	  ,[new_id] = (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent]
   where num = wr.[num] and [rent_start]<(select [date_outgoing] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingSostav] where id =@id_sostav) 
   and ([rent_end] is null or  [rent_end] > (select [date_outgoing] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingSostav] where id =@id_sostav)))
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent] as wr
  where [id] in (SELECT [id_wagons_rent_outgoing] FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon] where [id] in (SELECT [id_outgoing_uz_vagon] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars]  where [id_outgoing] =@id_sostav and  [position_outgoing] is not null))
  and [rent_end] < (select [date_outgoing] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingSostav] where id =@id_sostav)	
	RETURN
 END

GO


