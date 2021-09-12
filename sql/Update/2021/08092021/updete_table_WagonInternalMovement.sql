USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[WagonInternalMovement]    Script Date: 08.09.2021 13:04:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[WagonInternalMovement](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_wagon_internal_routes] [bigint] NOT NULL,
	[id_station] [int] NOT NULL,
	[id_way] [int] NOT NULL,
	[way_start] [datetime] NOT NULL,
	[way_end] [datetime] NULL,
	[id_outer_way] [int] NULL,
	[outer_way_start] [datetime] NULL,
	[outer_way_end] [datetime] NULL,
	[position] [int] NOT NULL,
	[note] [nvarchar](250) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[close] [datetime] NULL,
	[close_user] [nvarchar](50) NULL,
	[parent_id] [bigint] NULL,
	[outer_position] [int] NULL,
	[outer] [datetime] NULL,
	[outer_user] [nvarchar](50) NULL,
	[id_wio] [bigint] NULL,
 CONSTRAINT [PK_WagonInternalMovement] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[WagonInternalMovement]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalMovement_Directory_OuterWays] FOREIGN KEY([id_outer_way])
REFERENCES [IDS].[Directory_OuterWays] ([id])
GO

ALTER TABLE [IDS].[WagonInternalMovement] CHECK CONSTRAINT [FK_WagonInternalMovement_Directory_OuterWays]
GO

ALTER TABLE [IDS].[WagonInternalMovement]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalMovement_Directory_Station] FOREIGN KEY([id_station])
REFERENCES [IDS].[Directory_Station] ([id])
GO

ALTER TABLE [IDS].[WagonInternalMovement] CHECK CONSTRAINT [FK_WagonInternalMovement_Directory_Station]
GO

ALTER TABLE [IDS].[WagonInternalMovement]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalMovement_Directory_Ways] FOREIGN KEY([id_way])
REFERENCES [IDS].[Directory_Ways] ([id])
GO

ALTER TABLE [IDS].[WagonInternalMovement] CHECK CONSTRAINT [FK_WagonInternalMovement_Directory_Ways]
GO

ALTER TABLE [IDS].[WagonInternalMovement]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalMovement_WagonInternalMovement] FOREIGN KEY([parent_id])
REFERENCES [IDS].[WagonInternalMovement] ([id])
GO

ALTER TABLE [IDS].[WagonInternalMovement] CHECK CONSTRAINT [FK_WagonInternalMovement_WagonInternalMovement]
GO

ALTER TABLE [IDS].[WagonInternalMovement]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalMovement_WagonInternalOperation] FOREIGN KEY([id_wio])
REFERENCES [IDS].[WagonInternalOperation] ([id])
GO

ALTER TABLE [IDS].[WagonInternalMovement] CHECK CONSTRAINT [FK_WagonInternalMovement_WagonInternalOperation]
GO

ALTER TABLE [IDS].[WagonInternalMovement]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalMovement_WagonInternalRoutes] FOREIGN KEY([id_wagon_internal_routes])
REFERENCES [IDS].[WagonInternalRoutes] ([id])
GO

ALTER TABLE [IDS].[WagonInternalMovement] CHECK CONSTRAINT [FK_WagonInternalMovement_WagonInternalRoutes]
GO


