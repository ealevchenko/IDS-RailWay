use [KRR-PA-Test-Railway]

declare @num int = 52830882
declare @arrived_codes sysname = '7932,0';
declare @db sysname = '[KRR-PA-VIZ-Other_DATA]';

DECLARE @query nvarchar(4000)


  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
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

  
  /****** Script for SelectTopNRows command from SSMS  ******/
SET @query = N'SELECT [id]
      ,[doc_Id]
      ,[doc_Revision]
      ,[doc_Status]
      ,[depart_code]
      ,[arrived_code]
      ,[dt]
      ,[update_dt]
      ,[raw_xml]
      ,[namespace_uri]
  FROM '+@db+'.[dbo].[UZ_Data]
  where [doc_Id] in (SELECT [nom_doc] FROM '+@db+'.[dbo].[UZ_VagonData] where [nomer]='+ cast(@num as nvarchar(8))+') and [arrived_code] in ('+@arrived_codes+')';
  	EXEC(@query)

	--print(@query)