/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [num_doc]
      ,[revision]
      ,[num_nakl]
      ,[output]
      ,[pdf_doc]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway-Archive].[IDS].[UZ_DOC_PDF]
  where [num_doc]='86854766'