USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Arrival_UZ_Document]    Script Date: 13.07.2023 11:57:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Arrival_UZ_Document](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_doc_uz] [nvarchar](50) NOT NULL,
	[nom_doc] [int] NULL,
	[nom_main_doc] [int] NULL,
	[code_stn_from] [int] NULL,
	[code_stn_to] [int] NULL,
	[code_border_checkpoint] [int] NULL,
	[cross_time] [datetime] NULL,
	[code_shipper] [int] NULL,
	[code_consignee] [int] NULL,
	[klient] [bit] NULL,
	[code_payer_sender] [nvarchar](20) NULL,
	[code_payer_arrival] [nvarchar](20) NULL,
	[distance_way] [int] NULL,
	[note] [nvarchar](200) NULL,
	[parent_id] [bigint] NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[manual] [bit] NULL,
	[date_otpr] [datetime] NULL,
	[srok_end] [datetime] NULL,
	[date_grpol] [datetime] NULL,
	[date_pr] [datetime] NULL,
	[date_vid] [datetime] NULL,
 CONSTRAINT [PK_Arrival_UZ_Document] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[Arrival_UZ_Document]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Document_Arrival_UZ_Document] FOREIGN KEY([parent_id])
REFERENCES [IDS].[Arrival_UZ_Document] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Document] CHECK CONSTRAINT [FK_Arrival_UZ_Document_Arrival_UZ_Document]
GO

ALTER TABLE [IDS].[Arrival_UZ_Document]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Document_Directory_BorderCheckpoint] FOREIGN KEY([code_border_checkpoint])
REFERENCES [IDS].[Directory_BorderCheckpoint] ([code])
GO

ALTER TABLE [IDS].[Arrival_UZ_Document] CHECK CONSTRAINT [FK_Arrival_UZ_Document_Directory_BorderCheckpoint]
GO

ALTER TABLE [IDS].[Arrival_UZ_Document]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Document_Directory_Consignee] FOREIGN KEY([code_consignee])
REFERENCES [IDS].[Directory_Consignee] ([code])
GO

ALTER TABLE [IDS].[Arrival_UZ_Document] CHECK CONSTRAINT [FK_Arrival_UZ_Document_Directory_Consignee]
GO

ALTER TABLE [IDS].[Arrival_UZ_Document]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Document_Directory_ExternalStation] FOREIGN KEY([code_stn_from])
REFERENCES [IDS].[Directory_ExternalStation] ([code])
GO

ALTER TABLE [IDS].[Arrival_UZ_Document] CHECK CONSTRAINT [FK_Arrival_UZ_Document_Directory_ExternalStation]
GO

ALTER TABLE [IDS].[Arrival_UZ_Document]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Document_Directory_ExternalStation1] FOREIGN KEY([code_stn_to])
REFERENCES [IDS].[Directory_ExternalStation] ([code])
GO

ALTER TABLE [IDS].[Arrival_UZ_Document] CHECK CONSTRAINT [FK_Arrival_UZ_Document_Directory_ExternalStation1]
GO

ALTER TABLE [IDS].[Arrival_UZ_Document]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Document_Directory_PayerSender] FOREIGN KEY([code_payer_sender])
REFERENCES [IDS].[Directory_PayerSender] ([code])
GO

ALTER TABLE [IDS].[Arrival_UZ_Document] CHECK CONSTRAINT [FK_Arrival_UZ_Document_Directory_PayerSender]
GO

ALTER TABLE [IDS].[Arrival_UZ_Document]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Document_Directory_Shipper] FOREIGN KEY([code_shipper])
REFERENCES [IDS].[Directory_Shipper] ([code])
GO

ALTER TABLE [IDS].[Arrival_UZ_Document] CHECK CONSTRAINT [FK_Arrival_UZ_Document_Directory_Shipper]
GO

ALTER TABLE [IDS].[Arrival_UZ_Document]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Document_UZ_DOC] FOREIGN KEY([id_doc_uz])
REFERENCES [IDS].[UZ_DOC] ([num_doc])
GO

ALTER TABLE [IDS].[Arrival_UZ_Document] CHECK CONSTRAINT [FK_Arrival_UZ_Document_UZ_DOC]
GO


