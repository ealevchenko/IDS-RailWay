USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_CargoGroup]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_CargoGroup](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[cargo_group_name_ru] [nvarchar](50) NOT NULL,
	[cargo_group_name_en] [nvarchar](50) NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Directory_CargoGroup] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_CargoGroup] ON 

INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (0, N'ДО ВЫЯСНЕНИЯ', N'UNTIL CLARIFICATION', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (1, N'УГОЛЬ', N'COAL', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (2, N'КОКС', N'COKE', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (3, N'НЕФТЕПРОДУКТ', N'OIL PRODUCT', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (4, N'ФЕРРОСПЛАВЫ', N'Ferroalloys', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (5, N'АГЛОМЕРАТ', N'AGGLOMERATE', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (6, N'ФЛЮСЫ', N'FLUX', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (7, N'РУДА', N'ORE', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (8, N'БРИКЕТЫ', N'BRIQUETTES', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (9, N'МЕТАЛЛ', N'METAL', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (10, N'ОБОРУДОВАНИЕ', N'EQUIPMENT', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (11, N'ПОРОЖНИЕ ВАГОНЫ', N'EMPTY CARS', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (12, N'МЕТИЗЫ', N'Hardware', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (13, N'ЛОМ', N'SCRAP', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (14, N'ПРОКАТ ', N'RENT', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (15, N'СЫРЬЕ ЦВ.МЕТ.', N'RAW MATERIAL C.MET.', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (16, N'ЖД ТРАНСПОРТ', N'Railway Transport', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (17, N'ЖРС', N'Iron ore', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (18, N'СТРОИТЕЛЬНЫЕ МАТЕРИАЛЫ', N'CONSTRUCTION MATERIALS', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (19, N'ПРОМ СЫРЬЕ', N'PROM RAW MATERIALS', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (20, N'ВАГОНЫ С ЛЮДЬМИ', N'WAGONS WITH PEOPLE', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (21, N'ОГНЕУПОРЫ', N'FIRE RESISTANCE', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (22, N'ПРОЧИЕ', N'OTHER', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (23, N'ЛЕС', N'FOREST', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (24, N'КОНТЕЙНЕРЫ', N'CONTAINERS', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (25, N'ГРАНШЛАК', N'GRANCHLAC', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (26, N'КОНЦЕНТРАТ', N'CONCENTRATE', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (27, N'ХИМИЧЕСКИЕ МАТЕРИАЛЫ', N'CHEMICAL MATERIALS', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (28, N'ВОЗВРАТ', N'RETURN', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (29, N'ОКАТЫШИ', N'PELLS', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGroup] ([id], [cargo_group_name_ru], [cargo_group_name_en], [create], [create_user], [change], [change_user]) VALUES (30, N'БЕЗ ЗААДРЕСОВКИ', N'WITHOUT ADDRESSING', CAST(N'2020-04-12T13:05:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
SET IDENTITY_INSERT [IDS].[Directory_CargoGroup] OFF
