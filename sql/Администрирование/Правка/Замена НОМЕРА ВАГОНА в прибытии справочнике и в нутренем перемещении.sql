USE [KRR-PA-CNT-Railway]
GO

BEGIN TRY
BEGIN TRANSACTION;
declare @num_old int = 7334 
declare @num_new int = 57313884


print N'INSERT NEW Directory_Wagons'
INSERT INTO [IDS].[Directory_Wagons]
           ([num]
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
           ,[closed_route]
           ,[new_construction])
	 SELECT @num_new
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
      ,[closed_route]
      ,[new_construction]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Wagons]
  where num = @num_old

print N'Directory_WagonsRent'
UPDATE [IDS].[Directory_WagonsRent]
   SET [num] = @num_new
 where [num] = @num_old

UPDATE [IDS].[ArrivalCars]
   SET [num] = @num_new
  where [num]=@num_old

UPDATE [IDS].[OutgoingCars]
   SET [num] = @num_new
  where [num]=@num_old



UPDATE [IDS].[SAPIncomingSupply]
   SET [num] = @num_new
  where [num]=@num_old

UPDATE [IDS].[SAPOutgoingSupply]
   SET [num] = @num_new
  where [num]=@num_old

UPDATE [IDS].[Outgoing_UZ_Vagon]
   SET [num] = @num_new
  where [num] = @num_old


UPDATE [IDS].[InstructionalLettersWagon]
   SET [num] = @num_new
  where [num] = @num_old

UPDATE [IDS].[OutgoingDetentionReturn]
   SET [num] = @num_new
  where [num] = @num_old

--print N'Directory_Wagons'
--UPDATE [IDS].[Directory_Wagons]
--   SET [num] = @num_new
-- where [num] = @num_old  

--print N'Directory_WagonsRent'
--UPDATE [IDS].[Directory_WagonsRent]
--   SET [num] = @num_new
-- where [num] = @num_old


 UPDATE [IDS].[Arrival_UZ_Vagon]
   SET [num] = @num_new
  where [num] = @num_old

  UPDATE [IDS].[WagonInternalRoutes]
   SET [num] = @num_new
  where [num] = @num_old

  delete [IDS].[Directory_Wagons]
	where [num] = @num_old

  	COMMIT TRANSACTION;
    PRINT N'ƒ¿ÕÕ€≈ ”—œ≈ÿÕŒ Œ¡ÕŒ¬À≈ÕÕ€!'
END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION;
    PRINT N'Œÿ»¡ ¿ ' + CONVERT(VARCHAR, ERROR_NUMBER()) + ':' + ERROR_MESSAGE()
END CATCH