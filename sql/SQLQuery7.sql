/****** Script for SelectTopNRows command from SSMS  ******/
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
  --where [parent_id]=215808
  where [num]=56618176
  order by id desc

  /****** Script for SelectTopNRows command from SSMS  ******/
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
  --where [parent_id]=25795
  where [num]=60242609
  order by id desc