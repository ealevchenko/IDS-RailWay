USE [KRR-PA-CNT-Railway]
GO

ALTER TABLE [IDS].[ArrivalSostav] DROP CONSTRAINT [FK_ArrivalSostav_Directory_Ways]
GO

ALTER TABLE [IDS].[Directory_OuterWays] DROP CONSTRAINT [FK_Directory_OuterWays_Directory_Ways]
GO

ALTER TABLE [IDS].[Directory_OuterWays] DROP CONSTRAINT [FK_Directory_OuterWays_Directory_Ways1]
GO

ALTER TABLE [IDS].[OutgoingSostav] DROP CONSTRAINT [FK_OutgoingSostav_Directory_Ways]
GO

--ALTER TABLE [IDS].[ParkState_Wagon] DROP CONSTRAINT [FK_ParkState_Wagon_ParkState_Way]
--GO

ALTER TABLE [IDS].[ParkState_Way] DROP CONSTRAINT [FK_ParkState_Way_Directory_Ways]
GO

ALTER TABLE [IDS].[WagonInternalMovement] DROP CONSTRAINT [FK_WagonInternalMovement_Directory_Ways]
GO

