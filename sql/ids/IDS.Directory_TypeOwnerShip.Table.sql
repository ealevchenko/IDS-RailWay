USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_TypeOwnerShip]    Script Date: 05.03.2020 16:37:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_TypeOwnerShip](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[type_ownership_ru] [nvarchar](50) NOT NULL,
	[type_ownership_en] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Directory_TypeOwnerShip] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_TypeOwnerShip] ON 

INSERT [IDS].[Directory_TypeOwnerShip] ([id], [type_ownership_ru], [type_ownership_en]) VALUES (1, N'Собственный', N'Собственный')
INSERT [IDS].[Directory_TypeOwnerShip] ([id], [type_ownership_ru], [type_ownership_en]) VALUES (2, N'Лизинг', N'Лизинг')
INSERT [IDS].[Directory_TypeOwnerShip] ([id], [type_ownership_ru], [type_ownership_en]) VALUES (3, N'Арендованный', N'Арендованный')
SET IDENTITY_INSERT [IDS].[Directory_TypeOwnerShip] OFF
