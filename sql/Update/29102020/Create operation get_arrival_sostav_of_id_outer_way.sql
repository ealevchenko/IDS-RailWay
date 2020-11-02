USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_arrival_sostav_of_id_outer_way]    Script Date: 02.11.2020 21:27:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_arrival_sostav_of_id_outer_way]
 (
   @id_outer_way int
 )
	RETURNS 
	@arrival_sostav TABLE(
	[num_train] [nvarchar](250) NULL,
	[outer_way_start] [datetime] NULL,
	[count_wagon] [int] NULL,
	[locomotives] [nvarchar](20) NULL
	)
	AS
	BEGIN
	insert @arrival_sostav
	SELECT 
	wim.[note] as num_train,
	wim.[outer_way_start],
	count(wim.[id]) as count_wagon,
	[locomotives] = (select top(1) [locomotive1] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation] where [operation_end]= wim.outer_way_start )
	  --into arrival_sostav
	  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
	  where wim.[id_outer_way] = @id_outer_way and wim.[outer_way_end] is null
	  group by wim.[outer_way_start],wim.[note]
  RETURN
 END
 


GO


