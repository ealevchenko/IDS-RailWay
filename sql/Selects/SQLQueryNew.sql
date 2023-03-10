/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [id]
      ,[num]
      ,[id_operator]
      ,[id_limiting]
      ,[rent_start]
      ,[rent_end]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[parent_id]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent]
  where num = 56107717
  order by 1 desc
/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [id]
      ,[num]
      ,[id_operator]
      ,[id_limiting]
      ,[rent_start]
      ,[rent_end]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[parent_id]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent]
  where num = 54617030
  order by 1 desc


  SELECT num, [parent_id], count( [parent_id] )
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent]-- where [parent_id] = 215763
  group by num,  [parent_id]  
  HAVING count( [parent_id] )>1
  order by [parent_id]


  SELECT [id]
      ,[num]
      ,[id_operator]
      ,[id_limiting]
      ,[rent_start]
      ,[rent_end]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[parent_id]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent]
  --where [parent_id] = 215763

  where  [parent_id] in ( SELECT max([parent_id])  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent] group by num,[parent_id] HAVING count( [parent_id] )>1)
  order by [parent_id]