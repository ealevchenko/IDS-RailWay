USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_TypeDivision]    Script Date: 11.06.2020 14:14:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_TypeDivision](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[type_devisions_ru] [nvarchar](250) NOT NULL,
	[type_devisions_en] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_Directory_TypeDivision] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_TypeDivision] ON 

INSERT [IDS].[Directory_TypeDivision] ([id], [type_devisions_ru], [type_devisions_en]) VALUES (0, N'Базовый', N'Main')
INSERT [IDS].[Directory_TypeDivision] ([id], [type_devisions_ru], [type_devisions_en]) VALUES (1, N'Департамент', N'The Department')
INSERT [IDS].[Directory_TypeDivision] ([id], [type_devisions_ru], [type_devisions_en]) VALUES (2, N'Управление', N'Control')
INSERT [IDS].[Directory_TypeDivision] ([id], [type_devisions_ru], [type_devisions_en]) VALUES (3, N'Служба', N'Service')
INSERT [IDS].[Directory_TypeDivision] ([id], [type_devisions_ru], [type_devisions_en]) VALUES (4, N'Цех', N'Shop')
INSERT [IDS].[Directory_TypeDivision] ([id], [type_devisions_ru], [type_devisions_en]) VALUES (5, N'Участок', N'Plot')
INSERT [IDS].[Directory_TypeDivision] ([id], [type_devisions_ru], [type_devisions_en]) VALUES (6, N'Лабаратория', N'Lab')
INSERT [IDS].[Directory_TypeDivision] ([id], [type_devisions_ru], [type_devisions_en]) VALUES (7, N'Склад', N'Warehouse')
SET IDENTITY_INSERT [IDS].[Directory_TypeDivision] OFF
