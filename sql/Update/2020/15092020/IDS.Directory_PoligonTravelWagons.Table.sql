USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_PoligonTravelWagons]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_PoligonTravelWagons](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[abbr_ru] [nvarchar](20) NOT NULL,
	[poligon_travel_ru] [nvarchar](100) NOT NULL,
	[abbr_en] [nvarchar](20) NOT NULL,
	[poligon_travel_en] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Directory_PoligonTravelWagons] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_PoligonTravelWagons] ON 

INSERT [IDS].[Directory_PoligonTravelWagons] ([id], [abbr_ru], [poligon_travel_ru], [abbr_en], [poligon_travel_en]) VALUES (1, N'Эксп. 3-и страны', N'Экспорт третьи страны', N'Эксп. 3-и страны', N'Экспорт третьи страны')
INSERT [IDS].[Directory_PoligonTravelWagons] ([id], [abbr_ru], [poligon_travel_ru], [abbr_en], [poligon_travel_en]) VALUES (2, N'Эксп. СНГ', N'Экспорт СНГ', N'Эксп. СНГ', N'Экспорт СНГ')
INSERT [IDS].[Directory_PoligonTravelWagons] ([id], [abbr_ru], [poligon_travel_ru], [abbr_en], [poligon_travel_en]) VALUES (3, N'только УЗ', N'Украина (прямое)', N'только УЗ', N'Украина (прямое)')
SET IDENTITY_INSERT [IDS].[Directory_PoligonTravelWagons] OFF
