USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [UZ].[Directory_States]    Script Date: 05.03.2020 16:37:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [UZ].[Directory_States](
	[id] [int] NOT NULL,
	[state] [nvarchar](50) NOT NULL,
	[name_network] [nvarchar](250) NOT NULL,
	[abb_ru] [nvarchar](10) NOT NULL,
	[abb_en] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_Directory_States] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (20, N'Россия', N'Министерство путей сообщения Российской Федерации', N'РЖД', N'RZD')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (21, N'Беларусь', N'Белорусская железная дорога', N'БЧ', N'BC')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (22, N'Украина', N'Украинские железные дороги', N'УЗ', N'UZ')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (23, N'Молдова', N'Государственное предприятие "Железная дорога Молдовы"', N'ЧФМ', N'CFM')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (24, N'Литва', N'Акционерное общество специального назначения "Литовские железные дороги"', N'ЛГ', N'LG')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (25, N'Латвия', N'Государственное акционерное общество "Латвийская железная дорога"', N'ЛДЗ', N'LDZ')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (26, N'Эстония', N'Акционерное общество "Эстонская железная дорога"', N'ЭВР', N'EVR')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (27, N'Казахстан', N'РГП "Казахстан Темір Жолы"', N'КЗХ', N'KTJ')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (28, N'Грузия', N'ООО"Грузинская железная дорога"', N'ГР', N'GR')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (29, N'Узбекистан', N'Государственно-Акционерная железно-дорожная компания "Узбекистон Темир Йуллари"', N'УТИ', N'UTI')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (57, N'Азербайджан', N'Азербайджанская государственная железная дорога', N'АЗ', N'AZ')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (58, N'Армения', N'"Армянская железная дорога"', N'АРМ', N'ARM')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (59, N'Кыргызстан', N'Кыргызская железная дорога', N'КРГ', N'KRG')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (66, N'Таджикистан', N'Таджикская железная дорога', N'ТДЖ', N'TZD')
INSERT [UZ].[Directory_States] ([id], [state], [name_network], [abb_ru], [abb_en]) VALUES (67, N'Туркменистан', N'Управление "Туркмен-демирел-лары"', N'ТРК', N'TRK')
