USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_OperatorsWagonsGroup]    Script Date: 28.10.2021 10:54:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_OperatorsWagonsGroup](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[group] [nvarchar](20) NOT NULL,
	[id_operator] [int] NOT NULL,
	[description] [nvarchar](200) NULL,
 CONSTRAINT [PK_Directory_OperatorsWagonsGroup] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_OperatorsWagonsGroup] ON 

INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (1, N'amkr', 14, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (2, N'amkr', 16, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (3, N'amkr_vz', 188, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (4, N'cisterns', 28, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (5, N'cisterns', 23, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (6, N'cisterns', 2, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (7, N'cisterns', 41, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (8, N'cisterns', 125, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (9, N'cisterns', 193, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (10, N'cisterns', 192, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (11, N'cisterns', 31, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (12, N'cisterns', 29, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (13, N'cisterns', 32, NULL)
INSERT [IDS].[Directory_OperatorsWagonsGroup] ([id], [group], [id_operator], [description]) VALUES (14, N'cisterns', 27, NULL)
SET IDENTITY_INSERT [IDS].[Directory_OperatorsWagonsGroup] OFF
GO
