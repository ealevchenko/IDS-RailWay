USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [TD].[MarriageSubdivision]    Script Date: 02.01.2020 16:57:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [TD].[MarriageSubdivision](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[subdivision] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_MarriageSubdivision] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [TD].[MarriageSubdivision] ON 

INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (1, N'АЦ МП')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (2, N'АЦ-1')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (3, N'АЦ-2')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (4, N'АЦ-3')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (5, N'Блуминг')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (6, N'Вмешательство посторонних лиц')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (7, N'ВТЦ')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (8, N'ДАТП')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (9, N'ДФ-1,2')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (10, N'ДЦ-1')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (11, N'ДЦ-2')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (12, N'Кислородное производство')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (13, N'Коксовый цех')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (14, N'Копровой цех')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (15, N'КЦ')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (16, N'МЦ')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (17, N'ОИЦ')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (18, N'ООО «ГТК»')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (19, N'ООО «ИСК»')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (20, N'ООО «ЛМЗ» (РМЦ-1)')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (21, N'ООО «ЛМЗ» (РМЦ-2)')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (22, N'ООО «ЛМЗ» (РМЦ-3)')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (23, N'ООО «ЛМЗ» (ЦМК)')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (24, N'ООО «ЛМЗ» (ЦПИ)')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (25, N'ООО «ЛМЗ» (ЦСЛЦ)')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (26, N'ООО «ЛМЗ» (ЦЧЛЦ)')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (27, N'ООО «Ремгидромаш»')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (28, N'ООО «Стройиндустрия»')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (29, N'Прокат-3')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (30, N'РОФ-1')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (31, N'РОФ-2')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (32, N'РП СПС')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (33, N'РУ ГД')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (34, N'СПЦ-1')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (35, N'СПЦ-2')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (36, N'Технологический цех КХП')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (37, N'ТЭЦ-1')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (38, N'ТЭЦ-3')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (39, N'УЖДТ ГД (вагонная служба)')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (40, N'УЖДТ ГД (локомотивная служба)')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (41, N'УЖДТ ГД (служба движения)')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (42, N'УЖДТ ГД (служба пути)')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (43, N'УЖДТ ГД (энергослужба)')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (44, N'УПЦ')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (45, N'УСХиПП')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (46, N'ЦВС')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (47, N'Цех сероочистки')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (48, N'Цех улавливания')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (49, N'ЦКРМА')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (50, N'ЦПМП')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (51, N'ЦПС')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (52, N'ЦРМО-4')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (53, N'ЦРП')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (54, N'ЦРПС')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (55, N'ЦСП')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (56, N'ЦЭЖДТ')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (57, N'ЧАО «КД МППЖТ»')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (58, N'ЧП «Восход»')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (59, N'ЧП «Сигма»')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (60, N'ЧП «Стил Сервис»')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (61, N'ШУ')
INSERT [TD].[MarriageSubdivision] ([id], [subdivision]) VALUES (62, N'КД МППЖТ')
SET IDENTITY_INSERT [TD].[MarriageSubdivision] OFF
