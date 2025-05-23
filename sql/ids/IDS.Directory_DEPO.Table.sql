USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_DEPO]    Script Date: 05.03.2020 16:37:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_DEPO](
	[code] [int] NOT NULL,
	[code_station] [int] NOT NULL,
	[depo_ru] [nvarchar](50) NOT NULL,
	[depo_en] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Directory_DEPO] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [IDS].[Directory_DEPO] ([code], [code_station], [depo_ru], [depo_en]) VALUES (6599, 450605, N'Нижнеднепровск', N'Нижнеднепровск')
INSERT [IDS].[Directory_DEPO] ([code], [code_station], [depo_ru], [depo_en]) VALUES (9722, 456809, N'Пятихатки', N'Пятихатки')
INSERT [IDS].[Directory_DEPO] ([code], [code_station], [depo_ru], [depo_en]) VALUES (9749, 466904, N'Батуринская', N'Батуринская')
INSERT [IDS].[Directory_DEPO] ([code], [code_station], [depo_ru], [depo_en]) VALUES (9771, 370400, N'Клепаров', N'Клепаров')
INSERT [IDS].[Directory_DEPO] ([code], [code_station], [depo_ru], [depo_en]) VALUES (9774, 463003, N'Пологи', N'Пологи')
INSERT [IDS].[Directory_DEPO] ([code], [code_station], [depo_ru], [depo_en]) VALUES (9775, 476003, N'Мелитополь', N'Мелитополь')
INSERT [IDS].[Directory_DEPO] ([code], [code_station], [depo_ru], [depo_en]) VALUES (9784, 376303, N'Дрогобыч', N'Дрогобыч')
INSERT [IDS].[Directory_DEPO] ([code], [code_station], [depo_ru], [depo_en]) VALUES (9793, 456404, N'Верховцево', N'Верховцево')
INSERT [IDS].[Directory_DEPO] ([code], [code_station], [depo_ru], [depo_en]) VALUES (9810, 417804, N'Херсон', N'Херсон')
INSERT [IDS].[Directory_DEPO] ([code], [code_station], [depo_ru], [depo_en]) VALUES (9816, 430002, N'Купянск', N'Купянск')
