USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Outgoing_UZ_Vagon_Acts]    Script Date: 09.03.2021 15:19:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Outgoing_UZ_Vagon_Acts](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_vagon] [bigint] NOT NULL,
	[date_akt] [datetime] NULL,
	[date_dved] [datetime] NULL,
	[nom_akt] [nvarchar](9) NULL,
	[nom_dved] [int] NULL,
	[prichina_akt] [nvarchar](70) NULL,
	[stn_akt] [int] NULL,
	[stn_name_akt] [nvarchar](50) NULL,
	[type] [int] NULL,
	[vagon_nom] [int] NULL,
 CONSTRAINT [PK_Outgoing_UZ_Vagon_Acts] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [IDS].[Outgoing_UZ_Vagon_Acts]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Acts_Outgoing_UZ_Vagon] FOREIGN KEY([id_vagon])
REFERENCES [IDS].[Outgoing_UZ_Vagon] ([id])
GO
ALTER TABLE [IDS].[Outgoing_UZ_Vagon_Acts] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Acts_Outgoing_UZ_Vagon]
GO
