
SELECT *  FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data] where [doc_Id] in (SELECT [nom_doc] FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_VagonData] where [nomer] = 53167490) 
and [depart_code] in (0,7932,'none') 
and [doc_Status] in (N'Accepted', N'Delivered', N'Recieved', N'Uncredited') 
and update_dt >= convert(datetime,'2021-04-24 02:25:00',120) order by [dt]
go

SELECT *  FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data] where [doc_Id] in (SELECT [nom_doc] FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_VagonData] where [nomer] = 53167490) 
and [depart_code] in (0,7932,'none') 
and [doc_Status] in (N'Accepted', N'Delivered', N'Recieved', N'Uncredited') 
and update_dt >= convert(datetime,'2021-04-24 02:25:00',120) 
and CONVERT(nvarchar(max), raw_xml) like(N'%nomer="53167490"%')
order by [dt]
go
 

declare @num int = 52930005--63382469--97260186--52305216
-->
SELECT N'ПОИСК ДОКУМЕНТА ПО НОМЕРУ ВАГОНА'
SELECT [id]
      ,[nom_doc]
      ,[nomer]
      ,[calc_weight]
      ,[etsng_old]
      ,[gng_old]
      ,[gruzp]
      ,[is_removed]
      ,[ostat_davl]
      ,[kod_adm]
      ,[kod_firm_owner]
      ,[kol_conductor]
      ,[kol_os]
      ,[measure_equip_num]
      ,[name_firm_owner]
      ,[negab_do]
      ,[negab_rs]
      ,[negab_v]
      ,[nom_ref]
      ,[pour_off_date]
      ,[pr_sobst]
      ,[pr_zam]
      ,[promoted_by]
      ,[remove_weight]
      ,[rod_vag]
      ,[roller_weight]
      ,[tank_state]
      ,[use]
      ,[usl_tip]
      ,[u_tara]
      ,[ves_tary_arc]
      ,[zd_kod]
      ,[dt]
      ,[flag_railway]
  FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_VagonData]
  where nomer = @num
  order by dt desc

SELECT [id]
      ,[doc_Id]
      ,[doc_Revision]
      ,[doc_Status]
      ,[depart_code]
      ,[arrived_code]
      ,[dt]
      ,[update_dt]
      ,[raw_xml]
  FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data]
  where [doc_Id] in (select [nom_doc] FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_VagonData] where nomer = @num) 
  order by dt desc

SELECT N'НАПОЛНЯЕМОСТЬ БАЗЫ НА ', GetDate()

SELECT top(100) [id]
      ,[doc_Id]
      ,[doc_Revision]
      ,[doc_Status]
      ,[depart_code]
      ,[arrived_code]
      ,[dt]
      ,[update_dt]
      ,[raw_xml]
  FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data]
  order by dt desc