USE [KRR-PA-CNT-Railway]
GO

ALTER TABLE [IDS].[OutgoingCars]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingCars_OutgoingSostav] FOREIGN KEY([id_outgoing])
REFERENCES [IDS].[OutgoingSostav] ([id])
GO

ALTER TABLE [IDS].[OutgoingCars] CHECK CONSTRAINT [FK_OutgoingCars_OutgoingSostav]
GO


