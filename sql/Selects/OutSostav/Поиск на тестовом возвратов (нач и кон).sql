/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [id]
      ,[id_outgoing]
      ,[num]
      ,[position]
      ,[position_outgoing]
      ,[num_doc]
      ,[note]
      ,[date_outgoing_act]
      ,[outgoing]
      ,[outgoing_user]
      ,[id_outgoing_uz_vagon]
      ,[id_outgoing_detention]
      ,[id_reason_discrepancy_amkr]
      ,[id_reason_discrepancy_uz]
      ,[id_outgoing_return_start]
      ,[id_outgoing_return_stop]
      ,[parent_wir_id]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[note_vagonnik]
      ,[vagonnik]
      ,[vagonnik_user]
  FROM [KRR-PA-Test-Railway].[IDS].[OutgoingCars]
  --where id = 458075
  --where num = 60901758
--where num = 56517840
  where [id_outgoing_return_start] is not null or id_outgoing_return_stop is not null
  order by num, id desc