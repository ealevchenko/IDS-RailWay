USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[OutgoingSostav]    Script Date: 23.03.2021 17:38:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[OutgoingSostav](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[num_doc] [int] NOT NULL,
	[id_station_from] [int] NOT NULL,
	[id_way_from] [int] NOT NULL,
	[id_station_on] [int] NULL,
	[date_readiness_amkr] [datetime] NOT NULL,
	[date_end_inspection_acceptance_delivery] [datetime] NULL,
	[date_end_inspection_loader] [datetime] NULL,
	[date_end_inspection_vagonnik] [datetime] NULL,
	[date_show_wagons] [datetime] NULL,
	[date_readiness_uz] [datetime] NULL,
	[date_outgoing] [datetime] NULL,
	[date_outgoing_act] [datetime] NULL,
	[date_departure_amkr] [datetime] NULL,
	[composition_index] [nvarchar](50) NULL,
	[status] [int] NOT NULL,
	[note] [nvarchar](200) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[route_sign] [bit] NULL,
 CONSTRAINT [PK_OutgoingSostav] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[OutgoingSostav]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingSostav_Directory_Station] FOREIGN KEY([id_station_from])
REFERENCES [IDS].[Directory_Station] ([id])
GO

ALTER TABLE [IDS].[OutgoingSostav] CHECK CONSTRAINT [FK_OutgoingSostav_Directory_Station]
GO

ALTER TABLE [IDS].[OutgoingSostav]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingSostav_Directory_Station1] FOREIGN KEY([id_station_on])
REFERENCES [IDS].[Directory_Station] ([id])
GO

ALTER TABLE [IDS].[OutgoingSostav] CHECK CONSTRAINT [FK_OutgoingSostav_Directory_Station1]
GO

ALTER TABLE [IDS].[OutgoingSostav]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingSostav_Directory_Station2] FOREIGN KEY([id_station_from])
REFERENCES [IDS].[Directory_Station] ([id])
GO

ALTER TABLE [IDS].[OutgoingSostav] CHECK CONSTRAINT [FK_OutgoingSostav_Directory_Station2]
GO

ALTER TABLE [IDS].[OutgoingSostav]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingSostav_Directory_Ways] FOREIGN KEY([id_way_from])
REFERENCES [IDS].[Directory_Ways] ([id])
GO

ALTER TABLE [IDS].[OutgoingSostav] CHECK CONSTRAINT [FK_OutgoingSostav_Directory_Ways]
GO


