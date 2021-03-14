USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Outgoing_UZ_Vagon_Cont]    Script Date: 14.03.2021 12:54:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Outgoing_UZ_Vagon_Cont](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_vagon] [bigint] NOT NULL,
	[nom_cont] [nvarchar](11) NOT NULL,
	[kod_tiporazmer] [nvarchar](4) NULL,
	[gruzp] [int] NULL,
	[ves_tary_arc] [int] NULL,
	[id_cargo] [int] NULL,
	[id_cargo_gng] [int] NULL,
	[kol_pac] [int] NULL,
	[pac] [nvarchar](3) NULL,
	[vesg] [int] NULL,
	[nom_zpu] [nvarchar](20) NULL,
 CONSTRAINT [PK_Outgoing_UZ_Vagon_Cont] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon_Cont]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Cont_Directory_Cargo] FOREIGN KEY([id_cargo])
REFERENCES [IDS].[Directory_Cargo] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon_Cont] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Cont_Directory_Cargo]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon_Cont]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Cont_Directory_CargoGNG] FOREIGN KEY([id_cargo_gng])
REFERENCES [IDS].[Directory_CargoGNG] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon_Cont] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Cont_Directory_CargoGNG]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon_Cont]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Cont_Outgoing_UZ_Vagon] FOREIGN KEY([id_vagon])
REFERENCES [IDS].[Outgoing_UZ_Vagon] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon_Cont] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Cont_Outgoing_UZ_Vagon]
GO


-- ключи

ALTER TABLE [IDS].[Outgoing_UZ_Cont_Pay]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Cont_Pay_Outgoing_UZ_Vagon_Cont] FOREIGN KEY([id_cont])
REFERENCES [IDS].[Outgoing_UZ_Vagon_Cont] ([id])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Cont_Pay] CHECK CONSTRAINT [FK_Outgoing_UZ_Cont_Pay_Outgoing_UZ_Vagon_Cont]
GO
