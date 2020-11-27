USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_wagon_park_state_of_way]    Script Date: 27.11.2020 17:01:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_view_wagon_park_state_of_way]
 (
	@id_park_state_way int
 )
	RETURNS 
	@view_wagon_park_state TABLE(
	[id] [int] NOT NULL,
	[id_park_state_way] [int] NOT NULL,
	[num] [int] NOT NULL,
	[position] [int] NOT NULL,
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
	insert @view_wagon_park_state
	SELECT [id]
      ,[id_park_state_way]
      ,[num]
      ,[position]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[delete]
      ,[delete_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Wagon]
  where [id_park_state_way] = @id_park_state_way
  order by [position] desc
  RETURN
 END
 
GO


