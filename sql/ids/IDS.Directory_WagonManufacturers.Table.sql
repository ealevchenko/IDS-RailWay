USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_WagonManufacturers]    Script Date: 05.03.2020 16:37:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_WagonManufacturers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name_ru] [nvarchar](250) NOT NULL,
	[abbr_ru] [nvarchar](10) NOT NULL,
	[name_en] [nvarchar](250) NOT NULL,
	[abbr_en] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_Directory_WagonManufacturers] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_WagonManufacturers] ON 

INSERT [IDS].[Directory_WagonManufacturers] ([id], [name_ru], [abbr_ru], [name_en], [abbr_en]) VALUES (1, N'Днепровагонбуд', N'ДВБ', N'Днепровагонбуд', N'ДВБ')
INSERT [IDS].[Directory_WagonManufacturers] ([id], [name_ru], [abbr_ru], [name_en], [abbr_en]) VALUES (2, N'Днепровагонмаш', N'ДВМ', N'Днепровагонмаш', N'ДВМ')
INSERT [IDS].[Directory_WagonManufacturers] ([id], [name_ru], [abbr_ru], [name_en], [abbr_en]) VALUES (3, N'Стрыйский ВРЗ', N'СВРЗ', N'Стрыйский ВРЗ', N'СВРЗ')
INSERT [IDS].[Directory_WagonManufacturers] ([id], [name_ru], [abbr_ru], [name_en], [abbr_en]) VALUES (4, N'Дарницкий ВРЗ', N'ДВРЗ', N'Дарницкий ВРЗ', N'ДВРЗ')
INSERT [IDS].[Directory_WagonManufacturers] ([id], [name_ru], [abbr_ru], [name_en], [abbr_en]) VALUES (5, N'Крюковский ВСЗ', N'КВСЗ', N'Крюковский ВСЗ', N'КВСЗ')
INSERT [IDS].[Directory_WagonManufacturers] ([id], [name_ru], [abbr_ru], [name_en], [abbr_en]) VALUES (6, N'Стахановский вагоностроительный завод', N'СВСЗ', N'Стахановский вагоностроительный завод', N'СВСЗ')
INSERT [IDS].[Directory_WagonManufacturers] ([id], [name_ru], [abbr_ru], [name_en], [abbr_en]) VALUES (7, N'Харьковский вагоностроительный завод', N'ХВСЗ', N'Харьковский вагоностроительный завод', N'ХВСЗ')
INSERT [IDS].[Directory_WagonManufacturers] ([id], [name_ru], [abbr_ru], [name_en], [abbr_en]) VALUES (8, N'Попаснянский вагоноремонтный завод', N'ПВРЗ', N'Попаснянский вагоноремонтный завод', N'ПВРЗ')
SET IDENTITY_INSERT [IDS].[Directory_WagonManufacturers] OFF
