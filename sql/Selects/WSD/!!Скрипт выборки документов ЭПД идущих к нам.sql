/****** Script for SelectTopNRows command from SSMS  ******/
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
  where [doc_Status] in ('Sending','Draft','Registered','Reclaiming','Accepted') and [arrived_code]='7932'
  order by dt desc

  --where [doc_Id]='35000000000533303627'