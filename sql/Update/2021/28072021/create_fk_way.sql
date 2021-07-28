USE [KRR-PA-Test-Railway]
GO

ALTER TABLE [IDS].[WagonInternalMovement]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalMovement_Directory_Ways] FOREIGN KEY([id_way])
REFERENCES [IDS].[Directory_Ways] ([id])
GO

ALTER TABLE [IDS].[WagonInternalMovement] CHECK CONSTRAINT [FK_WagonInternalMovement_Directory_Ways]
GO


ALTER TABLE [IDS].[ArrivalSostav]  WITH CHECK ADD  CONSTRAINT [FK_ArrivalSostav_Directory_Ways] FOREIGN KEY([id_way])
REFERENCES [IDS].[Directory_Ways] ([id])
GO

ALTER TABLE [IDS].[ArrivalSostav] CHECK CONSTRAINT [FK_ArrivalSostav_Directory_Ways]
GO

ALTER TABLE [IDS].[Directory_OuterWays]  WITH CHECK ADD  CONSTRAINT [FK_Directory_OuterWays_Directory_Ways] FOREIGN KEY([id_way_from])
REFERENCES [IDS].[Directory_Ways] ([id])
GO

ALTER TABLE [IDS].[Directory_OuterWays] CHECK CONSTRAINT [FK_Directory_OuterWays_Directory_Ways]
GO

ALTER TABLE [IDS].[Directory_OuterWays]  WITH CHECK ADD  CONSTRAINT [FK_Directory_OuterWays_Directory_Ways1] FOREIGN KEY([id_way_on])
REFERENCES [IDS].[Directory_Ways] ([id])
GO

ALTER TABLE [IDS].[Directory_OuterWays] CHECK CONSTRAINT [FK_Directory_OuterWays_Directory_Ways1]
GO

ALTER TABLE [IDS].[OutgoingSostav]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingSostav_Directory_Ways] FOREIGN KEY([id_way_from])
REFERENCES [IDS].[Directory_Ways] ([id])
GO

ALTER TABLE [IDS].[OutgoingSostav] CHECK CONSTRAINT [FK_OutgoingSostav_Directory_Ways]
GO

ALTER TABLE [IDS].[ParkState_Way]  WITH CHECK ADD  CONSTRAINT [FK_ParkState_Way_Directory_Ways] FOREIGN KEY([id_way])
REFERENCES [IDS].[Directory_Ways] ([id])
GO

ALTER TABLE [IDS].[ParkState_Way] CHECK CONSTRAINT [FK_ParkState_Way_Directory_Ways]
GO
