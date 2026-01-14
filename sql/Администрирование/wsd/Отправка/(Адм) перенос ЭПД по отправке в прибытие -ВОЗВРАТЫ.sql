--SELECT TOP (1000) [num_doc]
--      ,[revision]
--      ,[status]
--      ,[code_from]
--      ,[code_on]
--      ,[dt]
--      ,[xml_doc]
--      ,[num_uz]
--  FROM [KRR-PA-CNT-Railway].[IDS].[UZ_DOC_OUT]
--  --where [num_doc]='85387287'
--  where [num_doc]='90361781'

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
  --where [num_doc]='85387287'
  where [num_doc]='638181'

  --*****************************************************
  --insert into [KRR-PA-CNT-Railway].[IDS].[UZ_DOC]  
  --SELECT TOP (1000) [num_doc]
  --    ,[revision]
  --    ,[status]
  --    ,[code_from]
  --    ,[code_on]
  --    ,[dt]
  --    ,[xml_doc]
  --    ,[num_uz]
	 -- ,[close] = GetDate()
  --    ,[close_message]=N'������� � ��'
  --FROM [KRR-PA-CNT-Railway].[IDS].[UZ_DOC_OUT]
  ----where [num_doc]='85387287'
  --where [num_doc]='90361781'
  --*****************************************************
