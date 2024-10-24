USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [TD].[MarriageDistrict]    Script Date: 02.01.2020 16:57:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [TD].[MarriageDistrict](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[district] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_MarriageDistrict] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [TD].[MarriageDistrict] ON 

INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (1, N'Аглорудный район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (2, N'Восточный район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (3, N'Доменный район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (4, N'Коксовый район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (5, N'Конвертерный район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (6, N'Копровой район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (7, N'Новодоменный район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (8, N'Погрузочный район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (9, N'Прокатный район № 1')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (10, N'Прокатный район № 2')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (11, N'Промежуточный район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (12, N'Промышленный район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (13, N'Промышленный район ГД')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (14, N'Разгрузочный район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (15, N'Разливочный район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (16, N'Район третьего карьера')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (17, N'Складской район')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (18, N'Сталеплавильный район № 1')
INSERT [TD].[MarriageDistrict] ([id], [district]) VALUES (19, N'Сталеплавильный район № 2')
SET IDENTITY_INSERT [TD].[MarriageDistrict] OFF
