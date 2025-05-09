USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Outgoing_UZ_Vagon]    Script Date: 17.03.2021 17:25:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Outgoing_UZ_Vagon](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_document] [bigint] NULL,
	[num] [int] NOT NULL,
	[id_outgoing] [bigint] NOT NULL,
	[id_car] [bigint] NOT NULL,
	[id_condition] [int] NULL,
	[id_wagons_rent_arrival] [int] NULL,
	[id_wagons_rent_outgoing] [int] NULL,
	[id_countrys] [int] NOT NULL,
	[id_genus] [int] NOT NULL,
	[id_owner] [int] NOT NULL,
	[gruzp_uz] [float] NULL,
	[tara_uz] [float] NULL,
	[note_uz] [nvarchar](1000) NULL,
	[gruzp] [float] NULL,
	[u_tara] [int] NULL,
	[ves_tary_arc] [int] NULL,
	[id_warehouse] [int] NULL,
	[id_division] [int] NULL,
	[laden] [bit] NULL,
	[id_cargo] [int] NULL,
	[id_cargo_gng] [int] NULL,
	[vesg] [int] NULL,
	[code_stn_to] [int] NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Outgoing_UZ_Vagon] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_Cargo] FOREIGN KEY([id_cargo])
REFERENCES [IDS].[Directory_Cargo] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_Cargo]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_CargoGNG] FOREIGN KEY([id_cargo_gng])
REFERENCES [IDS].[Directory_CargoGNG] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_CargoGNG]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_ConditionArrival] FOREIGN KEY([id_condition])
REFERENCES [IDS].[Directory_ConditionArrival] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_ConditionArrival]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_Countrys] FOREIGN KEY([id_countrys])
REFERENCES [IDS].[Directory_Countrys] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_Countrys]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_Divisions] FOREIGN KEY([id_division])
REFERENCES [IDS].[Directory_Divisions] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_Divisions]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_ExternalStation] FOREIGN KEY([code_stn_to])
REFERENCES [IDS].[Directory_ExternalStation] ([code])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_ExternalStation]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_GenusWagons] FOREIGN KEY([id_genus])
REFERENCES [IDS].[Directory_GenusWagons] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_GenusWagons]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_OwnersWagons] FOREIGN KEY([id_owner])
REFERENCES [IDS].[Directory_OwnersWagons] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_OwnersWagons]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_WagonsRent] FOREIGN KEY([id_wagons_rent_arrival])
REFERENCES [IDS].[Directory_WagonsRent] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_WagonsRent]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_WagonsRent1] FOREIGN KEY([id_wagons_rent_outgoing])
REFERENCES [IDS].[Directory_WagonsRent] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_WagonsRent1]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Outgoing_UZ_Document] FOREIGN KEY([id_document])
REFERENCES [IDS].[Outgoing_UZ_Document] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Outgoing_UZ_Document]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_OutgoingSostav] FOREIGN KEY([id_outgoing])
REFERENCES [IDS].[OutgoingSostav] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_OutgoingSostav]
GO


