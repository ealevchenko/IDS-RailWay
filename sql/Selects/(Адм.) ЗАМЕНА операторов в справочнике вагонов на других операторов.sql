/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT [id]
      ,[num]
      ,[id_countrys]
      ,[id_genus]
      ,[id_owner]
      ,[ban_changes_operator]
      ,[id_operator]
      ,[gruzp]
      ,[kol_os]
      ,[usl_tip]
      ,[date_rem_uz]
      ,[date_rem_vag]
      ,[id_limiting]
      ,[id_type_ownership]
      ,[rent_start]
      ,[rent_end]
      ,[note]
      ,[sobstv_kis]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Cars]
  where [id_operator]=9

 -- UPDATE [KRR-PA-CNT-Railway].[IDS].[Directory_Cars]
 --  SET [id_operator] = 15
 --WHERE [id_operator]=9