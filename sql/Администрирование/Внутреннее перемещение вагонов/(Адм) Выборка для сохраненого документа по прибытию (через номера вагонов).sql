/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT max([id])
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
  where num in (65005571,65005563,65005605,55590111,58335407,56624208,63543136,64923683,53455234,55404271,55590079)
  group by num 


 select [id_document] FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon] where id in (SELECT max([id]) FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon] where num in (65005571,65005563,65005605,55590111,58335407,56624208,63543136,64923683,53455234,55404271,55590079) group by num)

 SELECT TOP (1000) [id]
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
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document]
  where id in (select [id_document] FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon] where id in (SELECT max([id]) FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon] where num in (65005571,65005563,65005605,55590111,58335407,56624208,63543136,64923683,53455234,55404271,55590079) group by num))