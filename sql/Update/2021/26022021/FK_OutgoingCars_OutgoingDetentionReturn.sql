USE [KRR-PA-CNT-Railway]
GO

ALTER TABLE [IDS].[OutgoingCars]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingCars_OutgoingDetentionReturn] FOREIGN KEY([id_outgoing_detention_return])
REFERENCES [IDS].[OutgoingDetentionReturn] ([id])
GO

ALTER TABLE [IDS].[OutgoingCars] CHECK CONSTRAINT [FK_OutgoingCars_OutgoingDetentionReturn]
GO


