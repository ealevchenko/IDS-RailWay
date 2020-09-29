USE [KRR-PA-CNT-Railway]
GO

ALTER TABLE [IDS].[WagonInternalRoutes]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalRoutes_OutgoingCars] FOREIGN KEY([id_outgoing_car])
REFERENCES [IDS].[OutgoingCars] ([id])
GO

ALTER TABLE [IDS].[WagonInternalRoutes] CHECK CONSTRAINT [FK_WagonInternalRoutes_OutgoingCars]
GO


