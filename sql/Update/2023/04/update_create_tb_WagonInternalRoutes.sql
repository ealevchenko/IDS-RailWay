USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[WagonInternalRoutes]    Script Date: 21.04.2023 11:19:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[WagonInternalRoutes](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[num] [int] NOT NULL,
	[id_arrival_car] [bigint] NULL,
	[id_sap_incoming_supply] [bigint] NULL,
	[doc_outgoing_car] [bit] NULL,
	[id_outgoing_car] [bigint] NULL,
	[id_sap_outbound_supply] [bigint] NULL,
	[note] [nvarchar](250) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[close] [datetime] NULL,
	[close_user] [nvarchar](50) NULL,
	[parent_id] [bigint] NULL,
	[highlight_color] [nchar](10) NULL,
	[id_usage_fee] [int] NULL,
 CONSTRAINT [PK_WagonInternalRoutes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[WagonInternalRoutes]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalRoutes_ArrivalCars] FOREIGN KEY([id_arrival_car])
REFERENCES [IDS].[ArrivalCars] ([id])
GO

ALTER TABLE [IDS].[WagonInternalRoutes] CHECK CONSTRAINT [FK_WagonInternalRoutes_ArrivalCars]
GO

ALTER TABLE [IDS].[WagonInternalRoutes]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalRoutes_Directory_Wagons] FOREIGN KEY([num])
REFERENCES [IDS].[Directory_Wagons] ([num])
GO

ALTER TABLE [IDS].[WagonInternalRoutes] CHECK CONSTRAINT [FK_WagonInternalRoutes_Directory_Wagons]
GO

ALTER TABLE [IDS].[WagonInternalRoutes]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalRoutes_OutgoingCars] FOREIGN KEY([id_outgoing_car])
REFERENCES [IDS].[OutgoingCars] ([id])
GO

ALTER TABLE [IDS].[WagonInternalRoutes] CHECK CONSTRAINT [FK_WagonInternalRoutes_OutgoingCars]
GO

ALTER TABLE [IDS].[WagonInternalRoutes]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalRoutes_SAPIncomingSupply] FOREIGN KEY([id_sap_incoming_supply])
REFERENCES [IDS].[SAPIncomingSupply] ([id])
GO

ALTER TABLE [IDS].[WagonInternalRoutes] CHECK CONSTRAINT [FK_WagonInternalRoutes_SAPIncomingSupply]
GO

ALTER TABLE [IDS].[WagonInternalRoutes]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalRoutes_SAPOutgoingSupply] FOREIGN KEY([id_sap_outbound_supply])
REFERENCES [IDS].[SAPOutgoingSupply] ([id])
GO

ALTER TABLE [IDS].[WagonInternalRoutes] CHECK CONSTRAINT [FK_WagonInternalRoutes_SAPOutgoingSupply]
GO

ALTER TABLE [IDS].[WagonInternalRoutes]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalRoutes_WagonInternalRoutes] FOREIGN KEY([parent_id])
REFERENCES [IDS].[WagonInternalRoutes] ([id])
GO

ALTER TABLE [IDS].[WagonInternalRoutes] CHECK CONSTRAINT [FK_WagonInternalRoutes_WagonInternalRoutes]
GO

ALTER TABLE [IDS].[WagonInternalRoutes]  WITH CHECK ADD  CONSTRAINT [FK_WagonInternalRoutes_WagonUsageFee] FOREIGN KEY([id_usage_fee])
REFERENCES [IDS].[WagonUsageFee] ([id])
GO

ALTER TABLE [IDS].[WagonInternalRoutes] CHECK CONSTRAINT [FK_WagonInternalRoutes_WagonUsageFee]
GO


