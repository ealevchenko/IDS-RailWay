USE [KRR-PA-CNT-Railway]
GO

ALTER TABLE [IDS].[WagonInternalRoutes]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalRoutes_SAPIncomingSupply] FOREIGN KEY([id_sap_incoming_supply])
REFERENCES [IDS].[SAPIncomingSupply] ([id])
GO

ALTER TABLE [IDS].[WagonInternalRoutes] CHECK CONSTRAINT [FK_WagonInternalRoutes_SAPIncomingSupply]
GO


