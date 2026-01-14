
use [KRR-PA-CNT-Railway]
declare @date datetime = '2023-01-01 00:00:00';
  delete
  FROM [SAP].[Out_Supply]
  where [create]<@date and [id] not in (SELECT [id_out_supply] FROM [IDS].[SAPOutgoingSupply])
