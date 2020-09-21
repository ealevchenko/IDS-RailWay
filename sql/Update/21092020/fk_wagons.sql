USE [KRR-PA-CNT-Railway]
GO

ALTER TABLE [IDS].[Directory_WagonsRent]  WITH CHECK ADD  CONSTRAINT [FK_Directory_WagonsRent_Directory_Wagons] FOREIGN KEY([num])
REFERENCES [IDS].[Directory_Wagons] ([num])
GO

ALTER TABLE [IDS].[Directory_WagonsRent] CHECK CONSTRAINT [FK_Directory_WagonsRent_Directory_Wagons]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_Wagons] FOREIGN KEY([num])
REFERENCES [IDS].[Directory_Wagons] ([num])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_Wagons]
GO


