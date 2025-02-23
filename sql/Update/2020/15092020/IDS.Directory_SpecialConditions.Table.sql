USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_SpecialConditions]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_SpecialConditions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[special_conditions_ru] [nvarchar](50) NOT NULL,
	[special_conditions_en] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Directory_SpecialConditions] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_SpecialConditions] ON 

INSERT [IDS].[Directory_SpecialConditions] ([id], [special_conditions_ru], [special_conditions_en]) VALUES (1, N'Смола', N'Смола')
INSERT [IDS].[Directory_SpecialConditions] ([id], [special_conditions_ru], [special_conditions_en]) VALUES (2, N'Бензол', N'Бензол')
INSERT [IDS].[Directory_SpecialConditions] ([id], [special_conditions_ru], [special_conditions_en]) VALUES (3, N'Серная кислота', N'Серная кислота')
INSERT [IDS].[Directory_SpecialConditions] ([id], [special_conditions_ru], [special_conditions_en]) VALUES (4, N'Поглотительное масло', N'Поглотительное масло')
SET IDENTITY_INSERT [IDS].[Directory_SpecialConditions] OFF
