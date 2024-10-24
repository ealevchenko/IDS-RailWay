USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Settings]    Script Date: 14.09.2021 9:58:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Settings](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[area] [nvarchar](20) NOT NULL,
	[name] [nvarchar](20) NOT NULL,
	[value] [nvarchar](20) NOT NULL,
	[type] [int] NOT NULL,
	[description] [nvarchar](100) NULL,
 CONSTRAINT [PK_Settings] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Settings] ON 

INSERT [IDS].[Settings] ([id], [area], [name], [value], [type], [description]) VALUES (1, N'wsd', N'arrival_idle_time', N'3600', 1, N'Простой УЗ норма (мин)')
SET IDENTITY_INSERT [IDS].[Settings] OFF
GO
