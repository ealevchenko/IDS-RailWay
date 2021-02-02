USE [KRR-PA-CNT-Railway]
GO

ALTER TABLE [IDS].[WagonInternalMovement]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalMovement_Directory_OuterWays] FOREIGN KEY([id_outer_way])
REFERENCES [IDS].[Directory_OuterWays] ([id])
GO

ALTER TABLE [IDS].[WagonInternalMovement] CHECK CONSTRAINT [FK_WagonInternalMovement_Directory_OuterWays]
GO


