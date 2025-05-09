/****** Script for SelectTopNRows command from SSMS  ******/
declare @num_doc sysname = 'MA:2'--'MN:87654321'--'MN:12345678'
/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [num_doc]
      ,[revision]
      ,[status]
      ,[code_from]
      ,[code_on]
      ,[dt]
      ,[xml_doc]
      ,[num_uz]
      ,[close]
      ,[close_message]
  FROM [KRR-PA-Test-Railway].[IDS].[UZ_DOC]
  where [num_doc] = @num_doc

SELECT TOP (1000) [id]
      ,[id_arrival]
      ,[num]
      ,[position]
      ,[position_arrival]
      ,[consignee]
      ,[num_doc]
      ,[id_transfer]
      ,[note]
      ,[date_adoption_act]
      ,[arrival]
      ,[arrival_user]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[id_arrival_uz_vagon]
  FROM [KRR-PA-Test-Railway].[IDS].[ArrivalCars]
  where [num_doc] = @num_doc

  SELECT [id]
      ,[id_doc_uz]
      ,[nom_doc]
      ,[nom_main_doc]
      ,[code_stn_from]
      ,[code_stn_to]
      ,[code_border_checkpoint]
      ,[cross_time]
      ,[code_shipper]
      ,[code_consignee]
      ,[klient]
      ,[code_payer_sender]
      ,[code_payer_arrival]
      ,[distance_way]
      ,[note]
      ,[parent_id]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[manual]
  FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Document]
  where [id_doc_uz] = @num_doc
