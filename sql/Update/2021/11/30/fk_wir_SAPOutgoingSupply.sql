USE [KRR-PA-CNT-Railway]
GO

--ALTER TABLE [IDS].[WagonInternalRoutes] DROP CONSTRAINT [FK_WagonInternalRoutes_SAPOutgoingSupply]
--GO

ALTER TABLE [IDS].[WagonInternalRoutes]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalRoutes_SAPOutgoingSupply] FOREIGN KEY([id_sap_outbound_supply])
REFERENCES [IDS].[SAPOutgoingSupply] ([id])
GO

ALTER TABLE [IDS].[WagonInternalRoutes] CHECK CONSTRAINT [FK_WagonInternalRoutes_SAPOutgoingSupply]
GO


