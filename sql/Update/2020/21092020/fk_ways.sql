USE [KRR-PA-CNT-Railway]
GO

ALTER TABLE [IDS].[OutgoingSostav]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingSostav_Directory_Ways] FOREIGN KEY([id_way_from])
REFERENCES [IDS].[Directory_Ways] ([id])
GO

ALTER TABLE [IDS].[OutgoingSostav] CHECK CONSTRAINT [FK_OutgoingSostav_Directory_Ways]
GO


ALTER TABLE [IDS].[ArrivalSostav]  WITH CHECK ADD  CONSTRAINT [FK_ArrivalSostav_Directory_Ways] FOREIGN KEY([id_way])
REFERENCES [IDS].[Directory_Ways] ([id])
GO

ALTER TABLE [IDS].[ArrivalSostav] CHECK CONSTRAINT [FK_ArrivalSostav_Directory_Ways]
GO