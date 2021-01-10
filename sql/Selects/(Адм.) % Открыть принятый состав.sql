USE [KRR-PA-CNT-Railway]
GO

UPDATE [IDS].[ArrivalSostav]
   SET [date_adoption] = null
      ,[date_adoption_act] = null
      ,[status] = 1
 WHERE [id] = 84120
GO


