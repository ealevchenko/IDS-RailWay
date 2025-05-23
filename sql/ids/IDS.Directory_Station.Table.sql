USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_Station]    Script Date: 05.03.2020 16:37:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_Station](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[station_name_ru] [nvarchar](50) NOT NULL,
	[station_name_en] [nvarchar](50) NOT NULL,
	[station_abbr_ru] [nvarchar](50) NOT NULL,
	[station_abbr_en] [nvarchar](50) NOT NULL,
	[exit_uz] [bit] NOT NULL,
	[station_uz] [bit] NOT NULL,
	[default_side] [bit] NULL,
	[code] [int] NULL,
 CONSTRAINT [PK_Directory_Station] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_Station] ON 

INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (1, N'Аглофабрика', N'Sinter factory', N'Аглофабрика', N'Sinter factory', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (2, N'Аглофабрика ГД', N'Sinter factory of the State Duma', N'Аглофабрика ГД', N'Sinter factory MD', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (3, N'Батуринская', N'Baturinskaya', N'Батуринская', N'Baturinskaya', 0, 1, NULL, 466904)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (4, N'Бункерная', N'Bunker', N'Бункерная', N'Bunker', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (5, N'Верх Мартена  ', N'Top martin', N'Верх Мартена  ', N'Top martin', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (6, N'Восточная-Приемоотправочная', N'East Pickup', N'ВП', N'East Pickup', 1, 0, 1, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (7, N'Восточная-Разгрузочная', N'East Unloading', N'ВР', N'East Unloading', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (8, N'Восточная-Сортировочная', N'East Sorting', N'ВС', N'East Sorting', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (9, N'Доменная', N'Domain', N'Доменная', N'Domain', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (10, N'Кирова', N'Kirov', N'Кирова', N'Kirov', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (11, N'Коксовая', N'Coke', N'Коксовая', N'Coke', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (12, N'Копровая-1', N'Koprovaya-1', N'Копровая-1', N'Koprovaya-1', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (13, N'Копровая-2', N'Koprovaya-2', N'Копровая-2', N'Koprovaya-2', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (14, N'Кривой Рог', N'Krivoy Rog', N'Кривой Рог', N'Krivoy Rog', 0, 1, NULL, 467201)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (15, N'Кривой Рог - Сортировочный', N'Kryvyi Rih - Sorting', N'Кривой Рог - Сорт.', N'Kryvyi Rih - Sort.', 0, 1, NULL, 467108)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (16, N'Кривой Рог- Главный', N'Kryvyi Rih - Main', N'Кривой Рог- Глав.', N'Kryvyi Rih - Main', 0, 1, NULL, 467004)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (17, N'Металлургическая', N'Metallurgical', N'Металлургическая', N'Metallurgical', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (18, N'Новоблочная', N'Newblock', N'Новоблочная', N'Newblock', 0, 1, NULL, 466923)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (19, N'Новобункерная', N'New bunker', N'Новобункерная', N'New bunker', 1, 0, 0, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (20, N'Новодоменная', N'New domain', N'Новодоменная', N'New domain', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (21, N'Отвальная', N'Dump', N'Отвальная', N'Dump', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (22, N'Плавочная', N'Swimming', N'Плавочная', N'Swimming', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (23, N'пост Блюминг', N'post blooming', N'пост Блюминг', N'post blooming', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (24, N'Прокатная', N'Rolling', N'Прокатная', N'Rolling', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (25, N'Прокатная-2', N'Rolling-2', N'Прокатная-2', N'Rolling-2', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (26, N'Промежуточная', N'Intermediate', N'Промежуточная', N'Intermediate', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (27, N'Промышленная', N'Industrial', N'Промышленная', N'Industrial', 1, 0, 1, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (28, N'Промышленная ГД', N'Industrial GD', N'Промышленная ГД', N'Industrial MD', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (29, N'Роковатая', N'Rocky', N'Роковатая', N'Rocky', 0, 1, NULL, 457905)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (30, N'Складская', N'Warehouse', N'Складская', N'Warehouse', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (31, N'Стальная-1', N'Steel-1', N'Стальная-1', N'Steel-1', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (32, N'Стальная-2', N'Steel-2', N'Стальная-2', N'Steel-2', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (33, N'Шихтовая', N'Charge', N'Шихтовая', N'Charge', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (34, N'Шлаковый, Чугунный', N'Slag, Cast Iron', N'Шлаковый, Чугунный', N'Slag, Cast Iron', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (35, N'Южная', N'South', N'Южная', N'South', 0, 0, NULL, NULL)
INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code]) VALUES (36, N'Южная ГД', N'South DG', N'Южная ГД', N'South MD', 0, 0, NULL, NULL)
SET IDENTITY_INSERT [IDS].[Directory_Station] OFF
