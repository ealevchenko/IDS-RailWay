USE [KRR-PA-VIZ-Other_DATA]
GO

/****** Object:  UserDefinedFunction [dbo].[get_UZ_Data_of_num]    Script Date: 05.05.2022 8:30:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[get_UZ_Data_of_num]
 (
  @num int
 )
	RETURNS 
	@UZ_Data TABLE(
		[id] [int] NOT NULL,
		[doc_Id] [nvarchar](150) NOT NULL,
		[doc_Revision] [int] NOT NULL,
		[doc_Status] [nvarchar](15) NULL,
		[depart_code] [nvarchar](4) NOT NULL,
		[arrived_code] [nvarchar](4) NOT NULL,
		[dt] [datetime] NULL,
		[update_dt] [datetime] NULL,
		[raw_xml] [xml] NULL,
		[namespace_uri] [nvarchar](50) NULL
	)
	AS
	BEGIN
	insert @UZ_Data
	SELECT [id]
      ,[doc_Id]
      ,[doc_Revision]
      ,[doc_Status]
      ,[depart_code]
      ,[arrived_code]
      ,[dt]
      ,[update_dt]
      ,[raw_xml]
      ,[namespace_uri]
  FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data]
  where [doc_Id] in (SELECT [nom_doc] FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_VagonData] where [nomer]=@num)
  RETURN
 END
 


GO


