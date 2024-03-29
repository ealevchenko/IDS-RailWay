USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_Consignee]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_Consignee](
	[code] [int] NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[description] [nvarchar](200) NOT NULL,
	[auxiliary] [bit] NOT NULL,
 CONSTRAINT [PK_Directory_Consignee] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [IDS].[Directory_Consignee] ([code], [name], [description], [auxiliary]) VALUES (659, N'ООО "Керамет-Украина"', N'Основной код Керамет', 0)
INSERT [IDS].[Directory_Consignee] ([code], [name], [description], [auxiliary]) VALUES (6302, N'Досылка АМКР', N'Досылочные грузы (добавлен в регламент)', 1)
INSERT [IDS].[Directory_Consignee] ([code], [name], [description], [auxiliary]) VALUES (7932, N'ПАТ "АРСЕЛОРМІТТАЛ КРИВИЙ РІГ"', N'Основной код АМКР', 0)
INSERT [IDS].[Directory_Consignee] ([code], [name], [description], [auxiliary]) VALUES (9200, N'«Промбудресурс КР»', N'Основной код', 0)
