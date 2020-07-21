USE [KRR-PA-CNT-Railway]
GO

delete FROM [IDS].[Directory_WagonsRent]

delete FROM [IDS].[Directory_Wagons]

INSERT INTO [IDS].[Directory_Wagons]
           ([num]
           ,[id_countrys]
           ,[id_genus]
           ,[id_owner]
           ,[id_operator]
           ,[change_operator]
           ,[gruzp]
           ,[kol_os]
           ,[usl_tip]
           ,[date_rem_uz]
           ,[date_rem_vag]
           ,[id_type_ownership]
           ,[sign]
           ,[note]
           ,[sobstv_kis]
           ,[bit_warning]
           ,[create]
           ,[create_user]
           ,[change]
           ,[change_user])
SELECT [num]
      ,[id_countrys]
      ,[id_genus]
      ,[id_owner]
      ,[id_operator_uz]
	  ,[create]
      ,[gruzp]
      ,[kol_os]
      ,[usl_tip]
      ,[date_rem_uz]
      ,[date_rem_vag]
      ,[id_type_ownership]
      ,[sign]
      ,[note]
      ,[sobstv_kis]
	  ,[ban_changes_operator]
      ,[create]
      ,[create_user]
      ,null
      ,null
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Cars]
  where id in (select max([id]) FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Cars] group by [num])
  
INSERT INTO [IDS].[Directory_WagonsRent]
           ([num]
           ,[id_operator]
           ,[id_limiting]
           ,[rent_start]
           ,[rent_end]
           ,[create]
           ,[create_user]
           ,[change]
           ,[change_user]
           ,[parent_id])

		   SELECT [num]

      ,[id_operator]
      ,[id_limiting]
      ,[rent_start]
      ,[rent_end]
      ,[create]
      ,[create_user]
      ,null
      ,null
	  ,null
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Cars]
  where id in (select max([id]) FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Cars] group by [num])
  


