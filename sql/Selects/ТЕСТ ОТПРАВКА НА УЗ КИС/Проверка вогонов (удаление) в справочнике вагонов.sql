/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
declare @num int = 54733175--52684883 --64049158 -- 61260170

SELECT [num]
      ,[id_countrys]
      ,[id_genus]
      ,[id_owner]
      ,[id_operator]
      ,[change_operator]
      ,[gruzp]
      ,[tara]
      ,[kol_os]
      ,[usl_tip]
      ,[date_rem_uz]
      ,[date_rem_vag]
      ,[id_type_ownership]
      ,[sign]
      ,[factory_number]
      ,[inventory_number]
      ,[year_built]
      ,[exit_ban]
      ,[note]
      ,[sobstv_kis]
      ,[bit_warning]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
	  --delete
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Wagons]
  where [num] =@num


  SELECT [id]
      ,[num]
      ,[id_operator]
      ,[id_limiting]
      ,[rent_start]
      ,[rent_end]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[parent_id]
	  --delete
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent]
    where [num] = @num

	--delete FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent] where [num] = @num
	--delete FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Wagons] where [num] =@num