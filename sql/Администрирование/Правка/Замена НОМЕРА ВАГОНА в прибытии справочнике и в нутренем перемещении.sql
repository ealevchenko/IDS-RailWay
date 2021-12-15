USE [KRR-PA-CNT-Railway]
GO

declare @num_old int = 8857
declare @num_new int = 23673

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

  
delete [IDS].[Directory_WagonsRent]
   --SET [num] = @num_new
 where [num] = @num_old

 UPDATE [IDS].[Arrival_UZ_Vagon]
   SET [num] = @num_new
  where [num] = @num_old

delete [IDS].[Directory_Wagons]
   --SET [num] = @num_new
 where [num] = @num_old
 

  UPDATE [IDS].[WagonInternalRoutes]
   SET [num] = @num_new
  where [num] = @num_old