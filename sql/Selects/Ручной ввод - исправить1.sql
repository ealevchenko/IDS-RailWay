/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT uz_doc.[id]
      ,uz_doc.[id_doc_uz]
      ,uz_doc.[nom_doc]
      ,uz_doc.[nom_main_doc]
      ,uz_doc.[code_stn_from]
      ,uz_doc.[code_stn_to]
      ,uz_doc.[code_border_checkpoint]
      ,uz_doc.[cross_time]
      ,uz_doc.[code_shipper]
      ,uz_doc.[code_consignee]
      ,uz_doc.[klient]
      ,uz_doc.[code_payer_sender]
      ,uz_doc.[code_payer_arrival]
      ,uz_doc.[distance_way]
      ,uz_doc.[note]
      ,uz_doc.[parent_id]
      ,uz_doc.[create]
      ,uz_doc.[create_user]
      ,uz_doc.[change]
      ,uz_doc.[change_user]
	  ,count_wag = (SELECT count([id]) FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon] where [id_document] = uz_doc.[id])
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document] as uz_doc
  where (SELECT count([id]) FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon] where [id_document] = uz_doc.[id])>62
  order by 1 desc