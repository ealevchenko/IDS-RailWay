/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [id]
      ,[service]
      ,[event_id]
      ,[description]
      ,[start]
      ,[stop]
      ,[duration]
      ,[code_return]
	  ,[skor] = [duration]/[code_return]
  FROM [KRR-PA-CNT-Railway].[LOGS].[Services]
  where [service]=1 and [event_id]=3400 and [code_return]>0
  order by 1 desc