USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [TD].[MarriageClassification]    Script Date: 02.01.2020 16:57:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [TD].[MarriageClassification](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[classification] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_MarriageClassification] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [TD].[MarriageClassification] ON 

INSERT [TD].[MarriageClassification] ([id], [classification]) VALUES (1, N'Взрез стрелки')
INSERT [TD].[MarriageClassification] ([id], [classification]) VALUES (2, N'Другие нарушения ПТЭ и инструкций')
INSERT [TD].[MarriageClassification] ([id], [classification]) VALUES (3, N'Наезд на автотранспорт и другие препятствия')
INSERT [TD].[MarriageClassification] ([id], [classification]) VALUES (4, N'Наезд на тупик')
INSERT [TD].[MarriageClassification] ([id], [classification]) VALUES (5, N'Перевод стрелки под составом')
INSERT [TD].[MarriageClassification] ([id], [classification]) VALUES (6, N'Повреждение оборудования')
INSERT [TD].[MarriageClassification] ([id], [classification]) VALUES (7, N'Проезд запрещающего показания светофора или предельного столбика')
INSERT [TD].[MarriageClassification] ([id], [classification]) VALUES (8, N'Саморасцеп')
INSERT [TD].[MarriageClassification] ([id], [classification]) VALUES (9, N'Столкновение')
INSERT [TD].[MarriageClassification] ([id], [classification]) VALUES (10, N'Сход с рельс')
INSERT [TD].[MarriageClassification] ([id], [classification]) VALUES (11, N'Просыпь агломерата')
SET IDENTITY_INSERT [TD].[MarriageClassification] OFF
