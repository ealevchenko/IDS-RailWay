use [KRR-PA-CNT-Railway]

declare @id_wir bigint = 1049841;
SELECT [id]
      ,[num]
      ,[id_arrival_car]
      ,[id_sap_incoming_supply]
      ,[doc_outgoing_car]
      ,[id_outgoing_car]
      ,[id_sap_outbound_supply]
      ,[note]
      ,[create]
      ,[create_user]
      ,[close]
      ,[close_user]
      ,[parent_id]
      ,[highlight_color]
      ,[id_usage_fee]
      ,[note2]
  FROM [IDS].[WagonInternalRoutes]
  where [id] = @id_wir

declare @id_arrival_car bigint = (select [id_arrival_car] FROM [IDS].[WagonInternalRoutes] where [id] = @id_wir)
declare @id_sap_incoming_supply bigint = (select [id_sap_incoming_supply] FROM [IDS].[WagonInternalRoutes] where [id] = @id_wir)
declare @id_outgoing_car bigint = (select [id_outgoing_car] FROM [IDS].[WagonInternalRoutes] where [id] = @id_wir)
declare @id_sap_outbound_supply bigint = (select [id_sap_outbound_supply] FROM [IDS].[WagonInternalRoutes] where [id] = @id_wir)


BEGIN TRY
BEGIN TRANSACTION;
print('---============== START ===============---')

select @id_arrival_car,@id_sap_incoming_supply,@id_outgoing_car,@id_sap_outbound_supply
	
	ROLLBACK TRANSACTION;
	--COMMIT TRANSACTION;
    PRINT N'ƒ¿ÕÕ€≈ ”—œ≈ÿÕŒ Œ¡ÕŒ¬À≈ÕÕ€!'
END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION;
    PRINT N'Œÿ»¡ ¿ ' + CONVERT(VARCHAR, ERROR_NUMBER()) + ':' + ERROR_MESSAGE()
END CATCH