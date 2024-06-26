USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[ParksWagons]    Script Date: 05.03.2020 16:37:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[ParksWagons](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name_park_ru] [nvarchar](250) NOT NULL,
	[name_park_en] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_ParksWagons] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[ParksWagons] ON 

INSERT [IDS].[ParksWagons] ([id], [name_park_ru], [name_park_en]) VALUES (26, N'Парк смольных цистерн', N'Парк смольных цистерн')
SET IDENTITY_INSERT [IDS].[ParksWagons] OFF
