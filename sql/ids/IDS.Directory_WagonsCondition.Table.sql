USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_WagonsCondition]    Script Date: 05.03.2020 16:37:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_WagonsCondition](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[abbr_ru] [nvarchar](20) NOT NULL,
	[condition_ru] [nvarchar](100) NOT NULL,
	[abbr_en] [nvarchar](20) NOT NULL,
	[condition_en] [nvarchar](100) NOT NULL,
	[red] [bit] NOT NULL,
 CONSTRAINT [PK_Directory_WagonsCondition] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_WagonsCondition] ON 

INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (1, N'гд.', N'годен под погрузку', N'гд.', N'годен под погрузку', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (2, N'кт.', N'катанка', N'кт.', N'катанка', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (3, N'чг.', N'чугун', N'чг.', N'чугун', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (4, N'сс.', N'концентрат', N'сс.', N'концентрат', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (5, N'ст.', N' сталь', N'ст.', N' сталь', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (6, N'МРт', N'негоден под погрузку,  неисправная или отсутствие тормозной системы ', N'МРт', N'негоден под погрузку,  неисправная или отсутствие тормозной системы ', 1)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (7, N'МР.', N'мелкий,ремонт', N'МР.', N'мелкий,ремонт', 1)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (8, N'чг-снг.', N'чугун на СНГ', N'чг-снг.', N'чугун на СНГ', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (9, N'сс-снг.', N'концентрат СНГ', N'сс-снг.', N'концентрат СНГ', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (10, N'шл.', N'шлак', N'шл.', N'шлак', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (11, N'к.', N'концентрат', N'к.', N'концентрат', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (12, N'др ', N'просрочен деповской ремонт', N'др ', N'просрочен деповской ремонт', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (13, N'кр ', N'просрочен капитальний ремонт', N'кр ', N'просрочен капитальний ремонт', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (14, N'рем.ж ', N'ремонт желателен', N'рем.ж ', N'ремонт желателен', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (15, N'н.кр.ск.', N'нет крышки скользуна', N'н.кр.ск.', N'нет крышки скользуна', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (16, N'бз', N'большой зазор', N'бз', N'большой зазор', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (17, N'см.кол.', N'сменить колодку', N'см.кол.', N'сменить колодку', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (18, N'н.кол.', N'нет колодки', N'н.кол.', N'нет колодки', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (19, N'мр/ст', N' зашедшие с дороги как мр, по согласованию с «УЗ» (собственниками) даются под погрузку.  ', N'мр/ст', N' зашедшие с дороги как мр, по согласованию с «УЗ» (собственниками) даются под погрузку.  ', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (20, N'мрт/ст', N' зашедшие с дороги как мр, по согласованию с «УЗ» (собственниками) даются под погрузку.  ', N'мрт/ст', N' зашедшие с дороги как мр, по согласованию с «УЗ» (собственниками) даются под погрузку.  ', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (21, N'мр/сс', N' зашедшие с дороги как мр, по согласованию с «УЗ» (собственниками) даются под погрузку.  ', N'мр/сс', N' зашедшие с дороги как мр, по согласованию с «УЗ» (собственниками) даются под погрузку.  ', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (22, N'мрт/сс', N' зашедшие с дороги как мр, по согласованию с «УЗ» (собственниками) даются под погрузку.  ', N'мрт/сс', N' зашедшие с дороги как мр, по согласованию с «УЗ» (собственниками) даются под погрузку.  ', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (23, N'ст/сс', N'сталь ,сыпучие', N'ст/сс', N'сталь ,сыпучие', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (24, N'сс/мр', N'двойная разметка', N'сс/мр', N'двойная разметка', 1)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (25, N'ст/СНГ', N'сталь СНГ', N'ст/СНГ', N'сталь СНГ', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (26, N'уш.куз.', N'уширение кузова', N'уш.куз.', N'уширение кузова', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (27, N'н.пруж', N'нет пружины', N'н.пруж', N'нет пружины', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (28, N'т.гр.', N'тонкий гребень', N'т.гр.', N'тонкий гребень', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (29, N'о.гр.', N'острый гребень', N'о.гр.', N'острый гребень', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (30, N'зав.рыч.', N'завал рычага', N'зав.рыч.', N'завал рычага', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (31, N'зав.башм.', N'завал башмака', N'зав.башм.', N'завал башмака', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (32, N'завр.башм.', N'завар башмака', N'завр.башм.', N'завар башмака', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (33, N'об.подн.', N'оборваны подножки', N'об.подн.', N'оборваны подножки', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (34, N'об.порч.', N'оборваны поручни', N'об.порч.', N'оборваны поручни', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (35, N'об.ст.', N'оборваны стойки', N'об.ст.', N'оборваны стойки', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (36, N'отб.к.кр.', N'отбит концевой кран', N'отб.к.кр.', N'отбит концевой кран', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (37, N'нет кр.', N'нет крепительной крышки', N'нет кр.', N'нет крепительной крышки', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (38, N'нет гл.части', N'нет главной части', N'нет гл.части', N'нет главной части', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (39, N'нет маг.част.', N'нет магистральной части', N'нет маг.част.', N'нет магистральной части', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (40, N'отб.тр.отв.', N'отбита трубка ответвления', N'отб.тр.отв.', N'отбита трубка ответвления', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (41, N'тр.роз.', N'трещина розетки', N'тр.роз.', N'трещина розетки', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (42, N'об.вал.', N'оборван валик подъемника', N'об.вал.', N'оборван валик подъемника', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (43, N'нет болт.', N'нет болта маятниковой подвески', N'нет болт.', N'нет болта маятниковой подвески', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (44, N'нет цб', N'нет центрирующей балочки', N'нет цб', N'нет центрирующей балочки', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (45, N'об.цеп.', N'оборвана цепочка', N'об.цеп.', N'оборвана цепочка', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (46, N'тр.авт.', N'трещина автосцепки', N'тр.авт.', N'трещина автосцепки', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (47, N'торм.маг.', N'повреждена тормозная магистраль', N'торм.маг.', N'повреждена тормозная магистраль', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (48, N'верх.обв.', N'повреждена верхняя обвязка', N'верх.обв.', N'повреждена верхняя обвязка', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (49, N'трещ.хрб.', N'трещина хребтовой балки', N'трещ.хрб.', N'трещина хребтовой балки', 0)
INSERT [IDS].[Directory_WagonsCondition] ([id], [abbr_ru], [condition_ru], [abbr_en], [condition_en], [red]) VALUES (50, N'прогн.люк', N'прогнуты люковые крышки', N'прогн.люк', N'прогнуты люковые крышки', 0)
SET IDENTITY_INSERT [IDS].[Directory_WagonsCondition] OFF
