USE [KRR-PA-CNT-Railway]
GO

UPDATE [IDS].[ArrivalSostav]
   SET [date_adoption] = null --2020-12-12 04:35:00.000
      ,[status] = 1
 WHERE id = 83638
GO


