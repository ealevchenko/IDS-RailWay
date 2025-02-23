USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [TD].[MarriageNature]    Script Date: 02.01.2020 16:57:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [TD].[MarriageNature](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nature] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_MarriageNature] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [TD].[MarriageNature] ON 

INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (1, N'вагона')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (2, N'вагона местного парка')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (3, N'вагона общей сети')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (4, N'вагона общей сети, лафета для перевозки металлошихты')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (5, N'въездных ворот')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (6, N'дрезины')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (7, N'думпкара')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (8, N'коксовоза')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (9, N'крана на ж.д. ходу')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (10, N'лафета для перевозки металлошихты')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (11, N'платформы')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (12, N'платформы общей сети')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (13, N'платформы прикрытия')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (14, N'платформы, вагона общей сети')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (15, N'платформы, хоппера')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (16, N'плуга')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (17, N'полувагона ')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (18, N'тележки для изложниц')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (19, N'тележки для мульд')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (20, N'тепловоза')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (21, N'тепловоза с платформой')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (22, N'тепловоза, вагона')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (23, N'тепловоза, вагона общей сети')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (24, N'тепловоза, думпкара')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (25, N'тепловоза, крана на ж.д. ходу')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (26, N'тепловоза, платформы')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (27, N'тепловоза, тележки для изложниц')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (28, N'тепловоза, хоппера')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (29, N'тепловоза, чугуновоза')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (30, N'хоппера')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (31, N'цементовоза общей сети')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (32, N'чугуновоза')
INSERT [TD].[MarriageNature] ([id], [nature]) VALUES (33, N'шлаковоза')
SET IDENTITY_INSERT [TD].[MarriageNature] OFF
