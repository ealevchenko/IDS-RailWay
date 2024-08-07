USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_HazardClass]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_HazardClass](
	[code] [char](3) NOT NULL,
	[hazard_class_ru] [nvarchar](200) NOT NULL,
	[hazard_class_en] [nvarchar](200) NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Directory_HazardClass] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'1  ', N'Взрывчатые материалы', N'Explosive materials', CAST(N'2020-04-15T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'2  ', N'Газы', N'Gases', CAST(N'2020-04-15T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'3  ', N'Легковоспламеняющиеся жидкости', N'Flammable liquids', CAST(N'2020-04-15T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'4  ', N'Легковоспламеняющиеся твердые грузы и вещества, самовозгорающие грузы и  вещества ,вещества, выделяющие воспламеняющиеся газы при взаимодействии с водой', N'Flammable solid loads and substances, self-igniting loads and substances, substances that emit flammable gases in contact with water', CAST(N'2020-04-15T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'4.1', N'Легковоспламеняющиеся твердые вещества, самореактивные вещества и твердые взрывчатые вещества', N'Легковоспламеняющиеся твердые вещества, самореактивные вещества и твердые взрывчатые вещества', CAST(N'2020-09-11T12:30:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'4.2', N'Самовозгорающиеся вещества', N'Самовозгорающиеся вещества', CAST(N'2020-09-11T12:30:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'4.3', N'Вещества, выделяющие воспламеняющиеся газы при взаимодействии с водой', N'Вещества, выделяющие воспламеняющиеся газы при взаимодействии с водой', CAST(N'2020-09-11T12:30:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'5  ', N'Окисляющие вещества и органические пероксиды', N'Oxidizing agents and organic peroxides', CAST(N'2020-04-15T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'5.1', N'Окисляющие вещества', N'Окисляющие вещества', CAST(N'2020-09-11T12:30:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'5.2', N'Органические пероксиды', N'Органические пероксиды', CAST(N'2020-09-11T12:30:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'6  ', N'Ядовитые (токсичные) вещества и инфекционные вещества', N'Poisonous (toxic) substances and infectious substances', CAST(N'2020-04-15T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'6.1', N'Ядовитые (токсичные) вещества', N'Ядовитые (токсичные) вещества', CAST(N'2020-09-11T12:30:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'6.2', N'Инфекционные вещества', N'Инфекционные вещества', CAST(N'2020-09-11T12:30:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'7  ', N'Радиоактивные материалы', N'Radioactive materials', CAST(N'2020-04-15T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'8  ', N'Едкие (коррозионные) грузы и вещества', N'Caustic (corrosive) cargo and substances', CAST(N'2020-04-15T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_HazardClass] ([code], [hazard_class_ru], [hazard_class_en], [create], [create_user], [change], [change_user]) VALUES (N'9  ', N'Прочие опасные грузы и вещества', N'Other dangerous goods and substances', CAST(N'2020-04-15T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
