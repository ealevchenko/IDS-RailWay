USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_TypeWagons]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_TypeWagons](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[type_ru] [nvarchar](50) NOT NULL,
	[type_en] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Directory_TypeWagons] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_TypeWagons] ON 

INSERT [IDS].[Directory_TypeWagons] ([id], [type_ru], [type_en]) VALUES (1, N'бездверный', N'бездверный')
INSERT [IDS].[Directory_TypeWagons] ([id], [type_ru], [type_en]) VALUES (2, N'безлюковый', N'безлюковый')
INSERT [IDS].[Directory_TypeWagons] ([id], [type_ru], [type_en]) VALUES (3, N'глуходонный ', N'глуходонный ')
INSERT [IDS].[Directory_TypeWagons] ([id], [type_ru], [type_en]) VALUES (4, N'дверный', N'дверный')
INSERT [IDS].[Directory_TypeWagons] ([id], [type_ru], [type_en]) VALUES (5, N'длиннобазный', N'длиннобазный')
INSERT [IDS].[Directory_TypeWagons] ([id], [type_ru], [type_en]) VALUES (6, N'заварной', N'заварной')
INSERT [IDS].[Directory_TypeWagons] ([id], [type_ru], [type_en]) VALUES (7, N'люковой', N'люковой')
INSERT [IDS].[Directory_TypeWagons] ([id], [type_ru], [type_en]) VALUES (8, N'с подварными люками ', N'с подварными люками ')
SET IDENTITY_INSERT [IDS].[Directory_TypeWagons] OFF
