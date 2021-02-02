USE [KRR-PA-CNT-Railway]
GO

ALTER TABLE [IDS].[Directory_Wagons]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Wagons_Directory_OperatorsWagons] FOREIGN KEY([id_operator])
REFERENCES [IDS].[Directory_OperatorsWagons] ([id])
GO

ALTER TABLE [IDS].[Directory_Wagons] CHECK CONSTRAINT [FK_Directory_Wagons_Directory_OperatorsWagons]
GO


ALTER TABLE [IDS].[Directory_Cars_KIS]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Cars_KIS_Directory_OperatorsWagons] FOREIGN KEY([id_operator])
REFERENCES [IDS].[Directory_OperatorsWagons] ([id])
GO

ALTER TABLE [IDS].[Directory_Cars_KIS] CHECK CONSTRAINT [FK_Directory_Cars_KIS_Directory_OperatorsWagons]
GO

ALTER TABLE [IDS].[CardsWagons]  WITH CHECK ADD  CONSTRAINT [FK_CardsWagons_Directory_OperatorsWagons] FOREIGN KEY([id_operator_wagon])
REFERENCES [IDS].[Directory_OperatorsWagons] ([id])
GO

ALTER TABLE [IDS].[CardsWagons] CHECK CONSTRAINT [FK_CardsWagons_Directory_OperatorsWagons]
GO


ALTER TABLE [IDS].[Directory_WagonsRent]  WITH CHECK ADD  CONSTRAINT [FK_Directory_WagonsRent_Directory_OperatorsWagons] FOREIGN KEY([id_operator])
REFERENCES [IDS].[Directory_OperatorsWagons] ([id])
GO

ALTER TABLE [IDS].[Directory_WagonsRent] CHECK CONSTRAINT [FK_Directory_WagonsRent_Directory_OperatorsWagons]
GO