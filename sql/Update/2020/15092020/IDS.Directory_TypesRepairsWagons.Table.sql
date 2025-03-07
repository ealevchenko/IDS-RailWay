USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_TypesRepairsWagons]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_TypesRepairsWagons](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[abbr_ru] [nvarchar](10) NOT NULL,
	[type_repairs_ru] [nvarchar](50) NOT NULL,
	[abbr_en] [nvarchar](10) NOT NULL,
	[type_repairs_en] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Directory_TypesRepairsWagons] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_TypesRepairsWagons] ON 

INSERT [IDS].[Directory_TypesRepairsWagons] ([id], [abbr_ru], [type_repairs_ru], [abbr_en], [type_repairs_en]) VALUES (1, N'КР', N'капитальный', N'КР', N'капитальный')
INSERT [IDS].[Directory_TypesRepairsWagons] ([id], [abbr_ru], [type_repairs_ru], [abbr_en], [type_repairs_en]) VALUES (2, N'ДР', N'деповской', N'ДР', N'деповской')
INSERT [IDS].[Directory_TypesRepairsWagons] ([id], [abbr_ru], [type_repairs_ru], [abbr_en], [type_repairs_en]) VALUES (3, N'ИСКЛ', N'под исключение', N'ИСКЛ', N'под исключение')
INSERT [IDS].[Directory_TypesRepairsWagons] ([id], [abbr_ru], [type_repairs_ru], [abbr_en], [type_repairs_en]) VALUES (4, N'ТР-1 ', N'текущий ремонт ТР-1', N'ТР-1 ', N'текущий ремонт ТР-1')
INSERT [IDS].[Directory_TypesRepairsWagons] ([id], [abbr_ru], [type_repairs_ru], [abbr_en], [type_repairs_en]) VALUES (5, N'ТР-2', N'текущий ремонт ТР-2', N'ТР-2', N'текущий ремонт ТР-2')
INSERT [IDS].[Directory_TypesRepairsWagons] ([id], [abbr_ru], [type_repairs_ru], [abbr_en], [type_repairs_en]) VALUES (6, N'ТР-3', N'текущий ремонт ТР-3', N'ТР-3', N'текущий ремонт ТР-3')
INSERT [IDS].[Directory_TypesRepairsWagons] ([id], [abbr_ru], [type_repairs_ru], [abbr_en], [type_repairs_en]) VALUES (7, N'ТР-4', N'текущий ремонт ТР-4', N'ТР-4', N'текущий ремонт ТР-4')
SET IDENTITY_INSERT [IDS].[Directory_TypesRepairsWagons] OFF
