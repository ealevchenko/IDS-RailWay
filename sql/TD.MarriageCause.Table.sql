USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [TD].[MarriageCause]    Script Date: 02.01.2020 16:57:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [TD].[MarriageCause](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[cause] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_MarriageCause] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [TD].[MarriageCause] ON 

INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (1, N'боковой износ рельса')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (2, N'выезд без запроса')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (3, N'движение без сигнала руководителя')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (4, N'движение по неготовому маршруту')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (5, N'излом рельса')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (6, N'нарушение местной инструкции (ТРА станции)')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (7, N'нарушение скоростного режима, неправильное ведение поезда')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (8, N'нарушение технологической инструкции')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (9, N'не доведение остряка')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (10, N'не закрепление подвижного состава')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (11, N'не запирание стрелки на запорную закладку')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (12, N'не изъятие тормозного башмака')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (13, N'не наблюдение за впереди лежащим участком пути')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (14, N'невосприятие сигнала остановки')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (15, N'неисправность башмакосбрасывателя (вагонозамедлителя)')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (16, N'неисправность вагона')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (17, N'неисправность вагоноопрокидывателя')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (18, N'неисправность локомотива')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (19, N'неисправность спецсостава')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (20, N'неисправность стрелочного перевода')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (21, N'неисправность стыка')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (22, N'неисправность устройств СЦБ')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (23, N'неправильная погрузка (выгрузка)')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (24, N'неправильные действия работника')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (25, N'несогласованность действий')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (26, N'отступление по уровню')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (27, N'отступление по шаблону')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (28, N'отсутствие габарита')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (29, N'перекос пути')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (30, N'понижение отвальной нитки пути')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (31, N'просадка пути')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (32, N'саморасцеп')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (33, N'соединение с превышенной скоростью')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (34, N'срихтован путь')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (35, N'угол в плане')
INSERT [TD].[MarriageCause] ([id], [cause]) VALUES (36, N'Перевод стрелки под составом')
SET IDENTITY_INSERT [TD].[MarriageCause] OFF
