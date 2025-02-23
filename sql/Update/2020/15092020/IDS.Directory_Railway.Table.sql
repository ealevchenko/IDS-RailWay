USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_Railway]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_Railway](
	[code] [int] NOT NULL,
	[railway_name_ru] [nvarchar](150) NOT NULL,
	[railway_name_en] [nvarchar](150) NOT NULL,
	[railway_abbr_ru] [nvarchar](10) NOT NULL,
	[railway_abbr_en] [nvarchar](10) NOT NULL,
	[id_countrys] [int] NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Directory_Railway] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (20, N'Министерство путей сообщения Российской Федерации', N'Ministry of Railways of the Russian Federation', N'РЖД', N'RZD', 10, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (21, N'Белорусская железная дорога', N'Belarusian railway', N'БЧ', N'BC', 3, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (22, N'Украинские железные дороги', N'Ukrainian railways', N'УЗ', N'UZ', 14, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (23, N'Государственное предприятие "Железная дорога Молдовы"', N'State Enterprise "Railway of Moldova"', N'ЧФМ', N'CFM', 9, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (24, N'Акционерное общество специального назначения "Литовские железные дороги"', N'Joint Stock Company of Special Purpose "Lithuanian Railways"', N'ЛГ', N'LG', 8, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (25, N'Государственное акционерное общество "Латвийская железная дорога"', N'State Joint Stock Company "Latvian Railway"', N'ЛДЗ', N'LDZ', 7, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (26, N'Акционерное общество "Эстонская железная дорога"', N'Joint Stock Company "Estonian Railway"', N'ЭВР', N'EVR', 15, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (27, N'РГП "Казахстан Темір Жолы"', N'RSE "Kazakhstan Temir Zholy"', N'КЗХ', N'KTJ', 5, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (28, N'ООО"Грузинская железная дорога"', N'LLC Georgian Railway', N'ГР', N'GR', 4, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (29, N'Государственно-Акционерная железно-дорожная компания "Узбекистон Темир Йуллари"', N'State-joint-stock railway company "Uzbekistan Temir Yullari"', N'УТИ', N'UTI', 13, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (57, N'Азербайджанская государственная железная дорога', N'Azerbaijan State Railway', N'АЗ', N'AZ', 1, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (58, N'Армянская железная дорога', N'Armenian railway', N'АРМ', N'ARM', 2, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (59, N'Кыргызская железная дорога', N'Kyrgyz railway', N'КРГ', N'KRG', 6, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (66, N'Таджикская железная дорога', N'Tajik railway', N'ТДЖ', N'TZD', 11, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (67, N'Управление "Туркмен-демирел-лары"', N'Management of "Turkmen-Demirel-Lara"', N'ТРК', N'TRK', 12, CAST(N'2020-02-04T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
ALTER TABLE [IDS].[Directory_Railway]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Railway_Directory_Countrys] FOREIGN KEY([id_countrys])
REFERENCES [IDS].[Directory_Countrys] ([id])
GO
ALTER TABLE [IDS].[Directory_Railway] CHECK CONSTRAINT [FK_Directory_Railway_Directory_Countrys]
GO
