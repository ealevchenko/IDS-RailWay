USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_adoption_sostav_of_period]    Script Date: 25.07.2022 15:03:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






CREATE FUNCTION [IDS].[get_view_adoption_sostav_of_docs]
 (

 )
	RETURNS 
	@sostav TABLE(
		[id] [bigint] NOT NULL,
		[id_arrived] [bigint] NULL,
		[id_sostav] [bigint] NULL,
		[train] [int] NOT NULL,
		[composition_index] [nvarchar](50) NOT NULL,
		[date_arrival] [datetime] NOT NULL,
		[date_adoption] [datetime] NULL,
		[date_adoption_act] [datetime] NULL,
		[id_station_from] [int] NULL,
		[id_station_on] [int] NULL,
		[id_way] [int] NULL,
		[numeration] [bit] NULL,
		[num_doc] [int] NULL,
		[count] [int] NULL,
		[status] [int] NOT NULL,
		[note] [nvarchar](200) NULL,
		[create] [datetime] NOT NULL,
		[create_user] [nvarchar](50) NOT NULL,
		[change] [datetime] NULL,
		[change_user] [nvarchar](50) NULL,
		[count_wagon] [int] NULL,
		[count_account_balance] [int] NULL
	)
	AS
	BEGIN
	insert @sostav
	SELECT 
	   arr_sost.[id]
      ,arr_sost.[id_arrived]
      ,arr_sost.[id_sostav]
      ,arr_sost.[train]
      ,arr_sost.[composition_index]
      ,arr_sost.[date_arrival]
      ,arr_sost.[date_adoption]
      ,arr_sost.[date_adoption_act]
      ,arr_sost.[id_station_from]
      ,arr_sost.[id_station_on]
      ,arr_sost.[id_way]
      ,arr_sost.[numeration]
      ,arr_sost.[num_doc]
      ,arr_sost.[count]
      ,arr_sost.[status]
      ,arr_sost.[note]
      ,arr_sost.[create]
      ,arr_sost.[create_user]
      ,arr_sost.[change]
      ,arr_sost.[change_user]
	  ,count_wagon = (SELECT count(ac.id) FROM  [IDS].[ArrivalCars] as ac where ac.[id_arrival]=arr_sost.id and ac.[arrival] is not null)
	  ,count_account_balance = ([IDS].[get_count_account_balance_of_arrival_sostav](arr_sost.id))
  FROM  [IDS].[ArrivalSostav] as arr_sost
  where arr_sost.[num_doc] is not null and arr_sost.[num_doc] > 0; 
  RETURN
 END
 




GO


