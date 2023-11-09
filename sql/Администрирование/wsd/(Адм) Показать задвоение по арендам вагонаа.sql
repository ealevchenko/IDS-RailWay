/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [parent_id]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent]
  where [parent_id] is not null
  group by [parent_id]
  having count([parent_id])>1
  order by [parent_id] desc