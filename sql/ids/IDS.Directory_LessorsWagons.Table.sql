USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_LessorsWagons]    Script Date: 05.03.2020 16:37:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_LessorsWagons](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[abbr_ru] [nvarchar](20) NOT NULL,
	[lessors_ru] [nvarchar](100) NOT NULL,
	[abbr_en] [nvarchar](20) NOT NULL,
	[lessors_en] [nvarchar](100) NOT NULL,
	[paid] [bit] NOT NULL,
	[rop] [bit] NOT NULL,
	[local_use] [bit] NOT NULL,
 CONSTRAINT [PK_Directory_LessorsWagons] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_LessorsWagons] ON 

INSERT [IDS].[Directory_LessorsWagons] ([id], [abbr_ru], [lessors_ru], [abbr_en], [lessors_en], [paid], [rop], [local_use]) VALUES (1, N'SRA', N'Skinest Rail AS', N'SRA', N'Skinest Rail AS', 1, 0, 1)
INSERT [IDS].[Directory_LessorsWagons] ([id], [abbr_ru], [lessors_ru], [abbr_en], [lessors_en], [paid], [rop], [local_use]) VALUES (2, N'ЕТС', N'ООО "ЕВРАЗИЯ ТРАНС СЕРВИС"', N'ЕТС', N'ООО "ЕВРАЗИЯ ТРАНС СЕРВИС"', 1, 0, 1)
INSERT [IDS].[Directory_LessorsWagons] ([id], [abbr_ru], [lessors_ru], [abbr_en], [lessors_en], [paid], [rop], [local_use]) VALUES (3, N'ПЛТД', N'ООО "ПСЕЛ ЛТД" ', N'ПЛТД', N'ООО "ПСЕЛ ЛТД" ', 1, 0, 1)
INSERT [IDS].[Directory_LessorsWagons] ([id], [abbr_ru], [lessors_ru], [abbr_en], [lessors_en], [paid], [rop], [local_use]) VALUES (4, N'РЛ', N'ООО "РЕЙЛ ЛОДЖИСТИКС"', N'РЛ', N'ООО "РЕЙЛ ЛОДЖИСТИКС"', 1, 0, 1)
INSERT [IDS].[Directory_LessorsWagons] ([id], [abbr_ru], [lessors_ru], [abbr_en], [lessors_en], [paid], [rop], [local_use]) VALUES (5, N'СРЛ', N'ООО "Скинест Рейл"', N'СРЛ', N'ООО "Скинест Рейл"', 1, 0, 1)
INSERT [IDS].[Directory_LessorsWagons] ([id], [abbr_ru], [lessors_ru], [abbr_en], [lessors_en], [paid], [rop], [local_use]) VALUES (6, N'СТС', N'ООО "Спецтранссервис" ', N'СТС', N'ООО "Спецтранссервис" ', 1, 0, 1)
INSERT [IDS].[Directory_LessorsWagons] ([id], [abbr_ru], [lessors_ru], [abbr_en], [lessors_en], [paid], [rop], [local_use]) VALUES (7, N'ТА', N'ООО "Тар Альянс"', N'ТА', N'ООО "Тар Альянс"', 1, 0, 1)
INSERT [IDS].[Directory_LessorsWagons] ([id], [abbr_ru], [lessors_ru], [abbr_en], [lessors_en], [paid], [rop], [local_use]) VALUES (8, N'ХЛТД', N'ООО "ХИМЭКС ЛТД" ', N'ХЛТД', N'ООО "ХИМЭКС ЛТД" ', 1, 0, 1)
INSERT [IDS].[Directory_LessorsWagons] ([id], [abbr_ru], [lessors_ru], [abbr_en], [lessors_en], [paid], [rop], [local_use]) VALUES (9, N'БУД', N'ЧП "БУДРЕКС-2002"', N'БУД', N'ЧП "БУДРЕКС-2002"', 1, 0, 1)
SET IDENTITY_INSERT [IDS].[Directory_LessorsWagons] OFF
