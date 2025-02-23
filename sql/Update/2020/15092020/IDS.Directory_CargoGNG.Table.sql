USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_CargoGNG]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_CargoGNG](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code] [int] NOT NULL,
	[cargo_gng_name_ru] [nvarchar](250) NOT NULL,
	[cargo_gng_name_en] [nvarchar](250) NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Directory_CargoGNG] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_CargoGNG] ON 

INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (6, 27011210, N'Уголь битуминозный коксующийся', N'Уголь битуминозный коксующийся', CAST(N'2020-05-28T14:35:48.230' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (7, 72024950, N'Феррохром, содержащий более 0.05 мас.%, но не более 0.5 мас.% углерода', N'Феррохром, содержащий более 0.05 мас.%, но не более 0.5 мас.% углерода', CAST(N'2020-05-29T09:08:23.693' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (8, 25210000, N'Флюс известняковый; известняк и прочий известняковый камень, используемый для изготовления извести или цемента', N'Флюс известняковый; известняк и прочий известняковый камень, используемый для изготовления извести или цемента', CAST(N'2020-06-01T16:20:15.657' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (9, 25181000, N'Доломит некальцинированный или неспекшийся', N'Доломит некальцинированный или неспекшийся', CAST(N'2020-06-02T08:20:36.640' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (10, 27011290, N'Уголь битуминозный прочий', N'Уголь битуминозный прочий', CAST(N'2020-06-02T09:22:03.800' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (11, 99220000, N'Вагоны железнодорожные, как транспортное средство перевозки грузов, имеющие более 2-х осей, порожние, не поименованные особо', N'Вагоны железнодорожные, как транспортное средство перевозки грузов, имеющие более 2-х осей, порожние, не поименованные особо', CAST(N'2020-06-26T14:56:24.347' AS DateTime), N'EUROPE\nnlavrenko', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (12, 38160000, N'Цементы огнеупорные, растворы строительные, бетоны и аналогичные составы, кроме товаров позиции 3801', N'Цементы огнеупорные, растворы строительные, бетоны и аналогичные составы, кроме товаров позиции 3801', CAST(N'2020-06-30T11:00:02.297' AS DateTime), N'EUROPE\ivshuba', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (13, 27011100, N'Антрацит', N'Антрацит', CAST(N'2020-07-01T10:39:48.657' AS DateTime), N'EUROPE\ivshuba', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (14, 99222000, N'Вагоны железнодорожные, как транспортное средство перевозки грузов, имеющие более 2-х осей, порожние, пересылаемые в ремонт или из ремонта без повышения их таможенной стоимости', N'Вагоны железнодорожные, как транспортное средство перевозки грузов, имеющие более 2-х осей, порожние, пересылаемые в ремонт или из ремонта без повышения их таможенной стоимости', CAST(N'2020-08-13T06:00:22.060' AS DateTime), N'EUROPE\igsemenkovich', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (15, 69021000, N'Кирпичи огнеупорные, блоки, плитки и аналогичные огнеупорные керамические строительные материалы, содержащие более 50 мас.% элементов Mg, Ca или Cr, взятых отдельно или вместе, в пересчете на МgО, СаО или Сr2О3', N'Кирпичи огнеупорные, блоки, плитки и аналогичные огнеупорные керамические строительные материалы, содержащие более 50 мас.% элементов Mg, Ca или Cr, взятых отдельно или вместе, в пересчете на МgО, СаО или Сr2О3', CAST(N'2020-08-27T11:55:08.267' AS DateTime), N'EUROPE\svnovikova', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (16, 68159100, N'Изделия прочие из камня или других минеральных веществ, содержащие магнезит, доломит или хромит', N'Изделия прочие из камня или других минеральных веществ, содержащие магнезит, доломит или хромит', CAST(N'2020-08-27T12:10:27.743' AS DateTime), N'EUROPE\svnovikova', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (17, 99223000, N'Вагоны железнодорожные, как транспортное средство перевозки грузов, имеющие более 2-х осей, порожние, пересылаемые для очистки, промывки или дезинфекции или из очистки, промывки или дезинфекции', N'Вагоны железнодорожные, как транспортное средство перевозки грузов, имеющие более 2-х осей, порожние, пересылаемые для очистки, промывки или дезинфекции или из очистки, промывки или дезинфекции', CAST(N'2020-09-02T03:14:45.910' AS DateTime), N'EUROPE\igsemenkovich', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (18, 87041010, N'Автомобили-самосвалы, предназначенные для эксплуатации в условиях бездорожья с поршневым двигателем внутреннего сгорания с воспламенением от сжатия или с поршневым двигателем внутреннего сгорания с искровым зажиганием', N'Автомобили-самосвалы, предназначенные для эксплуатации в условиях бездорожья с поршневым двигателем внутреннего сгорания с воспламенением от сжатия или с поршневым двигателем внутреннего сгорания с искровым зажиганием', CAST(N'2020-09-11T11:52:08.600' AS DateTime), N'EUROPE\aamartseva', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (19, 68159900, N'Изделия прочие из камня или других минеральных веществ, кроме содержащих магнезит, доломит или хромит', N'Изделия прочие из камня или других минеральных веществ, кроме содержащих магнезит, доломит или хромит', CAST(N'2020-09-12T17:13:15.897' AS DateTime), N'EUROPE\svnovikova', NULL, NULL)
INSERT [IDS].[Directory_CargoGNG] ([id], [code], [cargo_gng_name_ru], [cargo_gng_name_en], [create], [create_user], [change], [change_user]) VALUES (20, 27410000, N'Топливо дизельное', N'Топливо дизельное', CAST(N'2020-09-13T20:36:33.550' AS DateTime), N'EUROPE\vgtsyvina', NULL, NULL)
SET IDENTITY_INSERT [IDS].[Directory_CargoGNG] OFF
