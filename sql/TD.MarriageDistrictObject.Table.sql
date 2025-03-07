USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [TD].[MarriageDistrictObject]    Script Date: 02.01.2020 16:57:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [TD].[MarriageDistrictObject](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_district] [int] NOT NULL,
	[district_object] [nvarchar](250) NOT NULL,
	[type_object] [int] NOT NULL,
 CONSTRAINT [PK_MarriageDistrictObject] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [TD].[MarriageDistrictObject] ON 

INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (1, 2, N'Станция Восточная – Сортировочная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (2, 2, N'Станция Восточная – Разгрузочная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (3, 17, N'Станция Восточная – Приемоотправочная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (4, 17, N'Станция Складская', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (5, 1, N'Станция Бункерная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (6, 1, N'Станция Аглофабрика', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (7, 3, N'Станция Отвальная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (8, 3, N'Ж.д. пост Чугунный', 1)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (9, 3, N'Ж.д. пост Шлаковый', 1)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (10, 15, N'Станция Доменная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (11, 18, N'Станция Стальная-1, парк Низ Мартена', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (12, 18, N'Станция Стальная-1, парк Стриппер', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (13, 19, N'Станция Плавочная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (14, 5, N'Станция Стальная-2', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (15, 12, N'Станция Промышленная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (16, 12, N'Станция Кирова', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (17, 12, N'Станция Шихтовая', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (18, 12, N'Ж.д. пост Верх Мартена', 1)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (19, 11, N'Станция Прокатная-2', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (20, 11, N'Станция Южная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (21, 11, N'Станция Промежуточная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (22, 9, N'Станция Прокатная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (23, 10, N'Станция Прокатная, парк Блуминг', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (24, 6, N'Станция Копровая-1', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (25, 6, N'Станция Копровая-2', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (26, 7, N'Станция Новобункерная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (27, 7, N'Станция Новобункерная, парк Входной', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (28, 7, N'Станция Новодоменная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (29, 7, N'Станция Новодоменная, парк Разъезд', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (30, 7, N'Станция Металлургическая', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (31, 4, N'Станция Коксовая', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (32, 13, N'Станция Промышленная ГД', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (33, 13, N'Станция Аглофабрика ГД', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (34, 13, N'Станция Южная ГД', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (35, 8, N'Станция Карьерная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (36, 8, N'Станция Погрузочная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (37, 8, N'Станция Заречная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (38, 14, N'Станция Разгрузочная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (39, 14, N'Ж.д. пост Дальнеотвальный', 1)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (40, 14, N'Ж.д. пост Верхний', 1)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (41, 16, N'Станция Породная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (42, 16, N'Станция Западная', 0)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (43, 16, N'Ж.д. пост Степной', 1)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (44, 17, N'Перегон станция Восточная – Приемоотправочная – станция Кривой Рог Главный', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (45, 17, N'Перегон станция Восточная – Приемоотправочная – станция Новоблочная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (46, 17, N'Перегон станция Восточная – Приемоотправочная –станция Новобункерная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (47, 2, N'Перегон станция Восточная – Сортировочная – станция Бункерная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (48, 11, N'Перегон станция Восточная – Сортировочная – станция Промежуточная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (49, 11, N'Перегон станция Восточная – Сортировочная – станция Прокатная-2', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (50, 13, N'Перегон станция Восточная – Сортировочная – станция Промышленная ГД', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (51, 7, N'Перегон станция Восточная – Сортировочная – станция Новодоменная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (52, 2, N'Перегон станция Восточная – Разгрузочная – станция Промышленная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (53, 1, N'Перегон станция Бункерная – станция Промышленная ГД', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (54, 11, N'Перегон станция Прокатная-2 – станция Южная ', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (55, 11, N'Перегон станция Прокатная-2 – станция Стальная-2', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (56, 11, N'Перегон станция Южная – станция Стальная-2', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (57, 7, N'Перегон станция Металлургическая – станция Промежуточная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (58, 12, N'Перегон станция Промышленная – станция Промышленная ГД', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (59, 12, N'Перегон станция Кирова – станция Шмаково', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (60, 7, N'Перегон станция Новобункерная – станция Новоблочная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (61, 7, N'Перегон станция Новодоменная – станция Промышленная ГД', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (62, 13, N'Перегон станция Промышленная ГД – станция Аглофабрика ГД', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (63, 13, N'Перегон станция Промышленная ГД – станция Южная ГД', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (64, 13, N'Перегон станция Аглофабрика ГД – станция Разгрузочная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (65, 12, N'Соединительный путь станция Шихтовая – станция Копровая-1', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (66, 8, N'Перегон станция Карьерная – станция Погрузочная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (67, 8, N'Перегон станция Карьерная – станция Разгрузочная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (68, 8, N'Перегон станция Погрузочная – станция Заречная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (69, 14, N'Перегон станция Разгрузочная – ж.д. пост Дальнеотвальный', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (70, 14, N'Перегон ж.д. пост Дальнеотвальный - ж.д. пост Верхний', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (71, 16, N'Перегон станция Заречная – станция Породная', 2)
INSERT [TD].[MarriageDistrictObject] ([id], [id_district], [district_object], [type_object]) VALUES (72, 16, N'Перегон станция Западная – ж.д. пост Степной', 2)
SET IDENTITY_INSERT [TD].[MarriageDistrictObject] OFF
ALTER TABLE [TD].[MarriageDistrictObject]  WITH CHECK ADD  CONSTRAINT [FK_MarriageDistrictObject_MarriageDistrict] FOREIGN KEY([id_district])
REFERENCES [TD].[MarriageDistrict] ([id])
GO
ALTER TABLE [TD].[MarriageDistrictObject] CHECK CONSTRAINT [FK_MarriageDistrictObject_MarriageDistrict]
GO
