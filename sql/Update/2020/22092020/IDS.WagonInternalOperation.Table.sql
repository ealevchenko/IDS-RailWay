USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[WagonInternalOperation]    Script Date: 22.09.2020 17:11:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[WagonInternalOperation](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_wagon_internal_routes] [bigint] NOT NULL,
	[id_operation] [int] NOT NULL,
	[operation_start] [datetime] NOT NULL,
	[operation_end] [datetime] NULL,
	[id_condition] [int] NOT NULL,
	[id_loading_status] [int] NOT NULL,
	[locomotive1] [nvarchar](10) NULL,
	[locomotive2] [nvarchar](10) NULL,
	[note] [nvarchar](250) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[close] [datetime] NULL,
	[close_user] [nvarchar](50) NULL,
	[parent_id] [bigint] NULL,
 CONSTRAINT [PK_WagonInternalOperation] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [IDS].[WagonInternalOperation]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalOperation_Directory_ConditionArrival] FOREIGN KEY([id_condition])
REFERENCES [IDS].[Directory_ConditionArrival] ([id])
GO
ALTER TABLE [IDS].[WagonInternalOperation] CHECK CONSTRAINT [FK_WagonInternalOperation_Directory_ConditionArrival]
GO
ALTER TABLE [IDS].[WagonInternalOperation]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalOperation_Directory_WagonLoadingStatus] FOREIGN KEY([id_loading_status])
REFERENCES [IDS].[Directory_WagonLoadingStatus] ([id])
GO
ALTER TABLE [IDS].[WagonInternalOperation] CHECK CONSTRAINT [FK_WagonInternalOperation_Directory_WagonLoadingStatus]
GO
ALTER TABLE [IDS].[WagonInternalOperation]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalOperation_Directory_WagonOperations] FOREIGN KEY([id_operation])
REFERENCES [IDS].[Directory_WagonOperations] ([id])
GO
ALTER TABLE [IDS].[WagonInternalOperation] CHECK CONSTRAINT [FK_WagonInternalOperation_Directory_WagonOperations]
GO
ALTER TABLE [IDS].[WagonInternalOperation]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalOperation_WagonInternalOperation] FOREIGN KEY([parent_id])
REFERENCES [IDS].[WagonInternalOperation] ([id])
GO
ALTER TABLE [IDS].[WagonInternalOperation] CHECK CONSTRAINT [FK_WagonInternalOperation_WagonInternalOperation]
GO
ALTER TABLE [IDS].[WagonInternalOperation]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalOperation_WagonInternalRoutes] FOREIGN KEY([id_wagon_internal_routes])
REFERENCES [IDS].[WagonInternalRoutes] ([id])
GO
ALTER TABLE [IDS].[WagonInternalOperation] CHECK CONSTRAINT [FK_WagonInternalOperation_WagonInternalRoutes]
GO
