USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_park_state_of_station]    Script Date: 24.11.2020 17:29:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_view_park_state_of_station]
 (
	@id_station int
 )
	RETURNS 
	@view_park_stste TABLE(
	[id] [int] NOT NULL,
	[id_station] [int] NOT NULL,
	[state_on] [datetime] NOT NULL,
	[note] [nvarchar](100) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[delete] [datetime] NULL,
	[delete_user] [nvarchar](50) NULL
	)
	AS
	BEGIN
	insert @view_park_stste
	SELECT [id]
      ,[id_station]
      ,[state_on]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[delete]
      ,[delete_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Station]
  where id_station = @id_station and [delete] is null
  order by [state_on] desc

  RETURN
 END
 
GO


