USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_OperatorsWagons_AMKR]    Script Date: 01.06.2021 16:34:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_OperatorsWagons_AMKR](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_operator] [int] NOT NULL,
 CONSTRAINT [PK_Directory_OperatorsWagons_AMKR] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_OperatorsWagons_AMKR] ON 

INSERT [IDS].[Directory_OperatorsWagons_AMKR] ([id], [id_operator]) VALUES (1, 14)
INSERT [IDS].[Directory_OperatorsWagons_AMKR] ([id], [id_operator]) VALUES (2, 16)
INSERT [IDS].[Directory_OperatorsWagons_AMKR] ([id], [id_operator]) VALUES (3, 188)
SET IDENTITY_INSERT [IDS].[Directory_OperatorsWagons_AMKR] OFF
GO
