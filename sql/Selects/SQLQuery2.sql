/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [num_doc]
      ,[revision]
      ,[status]
      ,[code_from]
      ,[code_on]
      ,[dt]
      ,[xml_doc]
      ,[num_uz]
      ,[close]
      ,[close_message]
  FROM [KRR-PA-CNT-Railway].[IDS].[UZ_DOC]
  where [num_uz]=1919--21458--21445