USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Outgoing_UZ_Vagon_Pay]    Script Date: 09.03.2021 15:19:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Outgoing_UZ_Vagon_Pay](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_vagon] [bigint] NOT NULL,
	[kod] [nvarchar](3) NOT NULL,
	[summa] [bigint] NOT NULL,
 CONSTRAINT [PK_Outgoing_UZ_Vagon_Pay] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [IDS].[Outgoing_UZ_Vagon_Pay]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Pay_Outgoing_UZ_Vagon] FOREIGN KEY([id_vagon])
REFERENCES [IDS].[Outgoing_UZ_Vagon] ([id])
GO
ALTER TABLE [IDS].[Outgoing_UZ_Vagon_Pay] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Pay_Outgoing_UZ_Vagon]
GO
