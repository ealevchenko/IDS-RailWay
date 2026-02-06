SELECT [id]
      ,[doc_Id]
      ,[doc_Revision]
      ,[doc_Status]
      ,[depart_code]
      ,[arrived_code]
      ,[dt]
      ,[update_dt]
      ,[raw_xml]
      ,[namespace_uri]
  FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data]
  where [doc_Status] in ('Registered','Uncredited','Delivered') 
  and not [depart_code] in  ('0866','1663','3700','5503','7122','7932')
  and dt >='2026-01-01 00:00:00.000'
  --,'Canceled' 
  order by dt desc
