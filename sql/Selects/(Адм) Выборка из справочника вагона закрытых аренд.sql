/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT [num],
  
  id = (select top(1) id from [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent] where num = rent.num order by id desc)
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent] as rent
  where (select top(1) rent_end from [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent] where num = rent.num order by id desc) is not null
  order by rent.[num]