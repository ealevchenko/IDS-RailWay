USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_Countrys]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_Countrys](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code_sng] [int] NULL,
	[code_europe] [int] NULL,
	[code_iso] [int] NULL,
	[countrys_name_ru] [nvarchar](100) NOT NULL,
	[countrys_name_en] [nvarchar](100) NOT NULL,
	[country_abbr_ru] [nvarchar](10) NOT NULL,
	[country_abbr_en] [nvarchar](10) NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Directory_Countrys] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_Countrys] ON 

INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (0, 0, NULL, NULL, N'До выяснения', N'Until clarification', N'?', N'?', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (1, 57, NULL, 31, N'Азербайджан', N'Azerbaijan', N'АЗЕ', N'AZE', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (2, 58, NULL, 51, N'Армения', N'Armenia', N'АРМ', N'ARM', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (3, 21, NULL, 112, N'Белоруссия', N'Belarus', N'БЕЛ', N'BLR', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (4, 28, NULL, 268, N'Грузия', N'Georgia', N'ГРУ', N'GEO', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (5, 27, NULL, 398, N'Казахстан', N'Kazakhstan', N'КАЗ', N'KAZ', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (6, 59, NULL, 417, N'Киргизия', N'Kyrgyzstan', N'КИР', N'KGZ', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (7, 25, NULL, 428, N'Латвия', N'Latvia', N'ЛАТ', N'LVA', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (8, 24, NULL, 440, N'Литва', N'Lithuania', N'ЛИТ', N'LTU', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (9, 23, NULL, 498, N'Молдавия', N'Moldova', N'МОЛ', N'MDA', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (10, 20, NULL, 643, N'Россия', N'Russia', N'РОС', N'RUS', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (11, 66, NULL, 762, N'Таджикистан', N'Tajikistan', N'ТАД', N'TJK', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (12, 67, NULL, 795, N'Туркмения', N'Turkmenistan', N'ТУР', N'TKM', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (13, 29, NULL, 860, N'Узбекистан', N'Uzbekistan', N'УЗБ', N'UZB', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (14, 22, NULL, 804, N'Украина', N'Ukraine', N'УКР', N'UKR', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
INSERT [IDS].[Directory_Countrys] ([id], [code_sng], [code_europe], [code_iso], [countrys_name_ru], [countrys_name_en], [country_abbr_ru], [country_abbr_en], [create], [create_user], [change], [change_user]) VALUES (15, 26, NULL, 233, N'Эстония', N'Estonia', N'ЭСТ', N'EST', CAST(N'2020-02-04T15:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
SET IDENTITY_INSERT [IDS].[Directory_Countrys] OFF
