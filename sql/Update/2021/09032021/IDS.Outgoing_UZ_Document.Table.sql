USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Outgoing_UZ_Document]    Script Date: 09.03.2021 15:19:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Outgoing_UZ_Document](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_doc_uz] [nvarchar](50) NOT NULL,
	[nom_doc] [int] NULL,
	[code_stn_from] [int] NULL,
	[code_stn_to] [int] NULL,
	[country_nazn] [int] NULL,
	[code_border_checkpoint] [int] NULL,
	[cross_date] [datetime] NULL,
	[code_shipper] [int] NULL,
	[code_consignee] [int] NULL,
	[vid] [nvarchar](2) NULL,
	[code_payer] [nvarchar](20) NULL,
	[distance_way] [int] NULL,
	[osum] [bigint] NULL,
	[date_sozdan] [datetime] NULL,
	[date_otpr] [datetime] NULL,
	[date_pr] [datetime] NULL,
	[date_grpol] [datetime] NULL,
	[date_vid] [datetime] NULL,
	[info_sht] [nvarchar](400) NULL,
	[name_gr] [nvarchar](800) NULL,
	[note] [nvarchar](200) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Outgoing_UZ_Document] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [IDS].[Outgoing_UZ_Document]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Document_Directory_Consignee] FOREIGN KEY([code_shipper])
REFERENCES [IDS].[Directory_Consignee] ([code])
GO
ALTER TABLE [IDS].[Outgoing_UZ_Document] CHECK CONSTRAINT [FK_Outgoing_UZ_Document_Directory_Consignee]
GO
ALTER TABLE [IDS].[Outgoing_UZ_Document]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Document_Directory_PayerSender] FOREIGN KEY([code_payer])
REFERENCES [IDS].[Directory_PayerSender] ([code])
GO
ALTER TABLE [IDS].[Outgoing_UZ_Document] CHECK CONSTRAINT [FK_Outgoing_UZ_Document_Directory_PayerSender]
GO
ALTER TABLE [IDS].[Outgoing_UZ_Document]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Document_Directory_Shipper] FOREIGN KEY([code_consignee])
REFERENCES [IDS].[Directory_Shipper] ([code])
GO
ALTER TABLE [IDS].[Outgoing_UZ_Document] CHECK CONSTRAINT [FK_Outgoing_UZ_Document_Directory_Shipper]
GO
