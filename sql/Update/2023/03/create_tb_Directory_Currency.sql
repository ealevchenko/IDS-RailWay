USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_Currency]    Script Date: 27.03.2023 10:06:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_Currency](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[currency_ru] [nvarchar](50) NOT NULL,
	[currency_en] [nvarchar](50) NOT NULL,
	[code] [int] NOT NULL,
	[code_cc] [nchar](3) NOT NULL,
 CONSTRAINT [PK_Directory_Currency] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_Currency] ON 

INSERT [IDS].[Directory_Currency] ([id], [currency_ru], [currency_en], [code], [code_cc]) VALUES (1, N'Гривна', N'Hryvnia', 0, N'UAH')
INSERT [IDS].[Directory_Currency] ([id], [currency_ru], [currency_en], [code], [code_cc]) VALUES (2, N'Долар США', N'US dollar', 840, N'USD')
INSERT [IDS].[Directory_Currency] ([id], [currency_ru], [currency_en], [code], [code_cc]) VALUES (3, N'Швейцарський франк', N'Swiss franc', 756, N'CHF')
SET IDENTITY_INSERT [IDS].[Directory_Currency] OFF
GO
