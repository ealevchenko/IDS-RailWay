/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [num_doc]
      ,[revision]
      ,[status]
      ,[code_from]
      ,[code_on]
      ,[dt]
      ,[xml_doc]
  FROM [KRR-PA-CNT-Railway].[IDS].[UZ_DOC]
--where [num_doc] = '71113418'
where [num_doc] = '43000000000519531319'