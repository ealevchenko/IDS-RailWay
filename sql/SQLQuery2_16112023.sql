SELECT *  FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data] 
where [doc_Id] in (SELECT [nom_doc] FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_VagonData] where [nomer] = '68137504') 
and (([depart_code] in (0,7932,'none') and [arrived_code] <> '7932') or ([depart_code]='7932' and [arrived_code] = '7932')) 
and [doc_Status] in (N'Accepted', N'Delivered', N'Recieved', N'Uncredited') and (dt >= convert(datetime,'2023-11-14 18:10:00',120)) 
and ((update_dt is not null and update_dt >= convert(datetime,'2023-11-15 10:15:00',120) or (update_dt is null and dt >= convert(datetime,'2023-11-15 10:15:00',120)) or (not ([depart_code]='7932' and [arrived_code]='7932') and update_dt >= convert(datetime,'2023-11-14 10:15:00',120))    )) order by [dt] 