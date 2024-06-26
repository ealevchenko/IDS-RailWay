--USE [KRR-PA-CNT-Railway]
--GO
--/****** Object:  Table [IDS].[Directory_WagonLoadingStatus]    Script Date: 25.09.2020 16:16:54 ******/
--SET ANSI_NULLS ON
--GO
--SET QUOTED_IDENTIFIER ON
--GO
--CREATE TABLE [IDS].[Directory_WagonLoadingStatus](
--	[id] [int] IDENTITY(1,1) NOT NULL,
--	[loading_status_ru] [nvarchar](30) NOT NULL,
--	[loading_status_en] [nvarchar](30) NOT NULL,
--	[create] [datetime] NOT NULL,
--	[create_user] [nvarchar](50) NOT NULL,
--	[change] [datetime] NULL,
--	[change_user] [nvarchar](50) NULL,
-- CONSTRAINT [PK_Directory_WagonLoadingStatus] PRIMARY KEY CLUSTERED 
--(
--	[id] ASC
--)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
--) ON [PRIMARY]
--GO
SET IDENTITY_INSERT [IDS].[Directory_WagonLoadingStatus] ON 
INSERT [IDS].[Directory_WagonLoadingStatus] ([id], [loading_status_ru], [loading_status_en], [create], [create_user], [change], [change_user]) VALUES (0, N'Порожний', N'Empty', CAST(N'2020-09-25T16:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_WagonLoadingStatus] ([id], [loading_status_ru], [loading_status_en], [create], [create_user], [change], [change_user]) VALUES (1, N'Груженый по прибытию', N'Loaded on arrival', CAST(N'2020-09-25T16:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_WagonLoadingStatus] ([id], [loading_status_ru], [loading_status_en], [create], [create_user], [change], [change_user]) VALUES (2, N'Груженый для отправки', N'Loaded to send', CAST(N'2020-09-25T16:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_WagonLoadingStatus] ([id], [loading_status_ru], [loading_status_en], [create], [create_user], [change], [change_user]) VALUES (3, N'Груженый ВП', N'Loaded ID', CAST(N'2020-09-25T16:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)

SET IDENTITY_INSERT [IDS].[Directory_WagonLoadingStatus] OFF
