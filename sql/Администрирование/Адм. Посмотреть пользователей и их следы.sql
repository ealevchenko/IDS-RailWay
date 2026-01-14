SELECT TOP (1000) [id]
      ,[date_time]
      ,[user_name]
      ,[authentication]
      ,[authentication_type]
      ,[user_host_name]
      ,[user_host_address]
      ,[url]
      ,[physical_path]
      ,[areas]
      ,[controller]
      ,[action]
      ,[roles_access]
      ,[access]
  FROM [KRR-PA-CNT-Railway].[LOGS].[WebVisit]
  --where [date_time]>'2025-09-19 00:00:00'
  where [user_name] like(N'%ole%') --or [user_name] like(N'%duda%')
  order by [user_name] desc

  SELECT [user_name], 
  count ([user_name])
  FROM [KRR-PA-CNT-Railway].[LOGS].[WebVisit]
  where [date_time]>'2025-09-22 00:00:00'
  group by [user_name]

  --SELECT TOP (1000) [id]
  --    ,[id_wagon_internal_routes]
  --    ,[id_station]
  --    ,[id_way]
  --    ,[way_start]
  --    ,[way_end]
  --    ,[id_outer_way]
  --    ,[outer_way_start]
  --    ,[outer_way_end]
  --    ,[position]
  --    ,[note]
  --    ,[create]
  --    ,[create_user]
  --    ,[close]
  --    ,[close_user]
  --    ,[parent_id]
  --    ,[id_wio]
  --    ,[num_sostav]
  --    ,[filing_start]
  --    ,[filing_end]
  --    ,[id_filing]
  --FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]
  -- where [create_user] like(N'%sschinyaev%') or [create_user] like(N'%duda%')