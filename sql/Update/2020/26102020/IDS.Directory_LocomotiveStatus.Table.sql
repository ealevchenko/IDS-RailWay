USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_LocomotiveStatus]    Script Date: 26.10.2020 17:13:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_LocomotiveStatus](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[locomotive_status_ru] [nvarchar](20) NOT NULL,
	[locomotive_status_en] [nvarchar](20) NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Directory_LocomotiveStatus] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_LocomotiveStatus] ON 

INSERT [IDS].[Directory_LocomotiveStatus] ([id], [locomotive_status_ru], [locomotive_status_en], [create], [create_user], [change], [change_user]) VALUES (1, N'В работе', N'In work', CAST(N'2020-10-26T00:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_LocomotiveStatus] ([id], [locomotive_status_ru], [locomotive_status_en], [create], [create_user], [change], [change_user]) VALUES (2, N'Не в работе', N'Out of work', CAST(N'2020-10-26T00:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_LocomotiveStatus] ([id], [locomotive_status_ru], [locomotive_status_en], [create], [create_user], [change], [change_user]) VALUES (3, N'В запасе', N'In reserve', CAST(N'2020-10-26T00:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_LocomotiveStatus] ([id], [locomotive_status_ru], [locomotive_status_en], [create], [create_user], [change], [change_user]) VALUES (4, N'ТР-1', N'TR-1', CAST(N'2020-10-26T00:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_LocomotiveStatus] ([id], [locomotive_status_ru], [locomotive_status_en], [create], [create_user], [change], [change_user]) VALUES (5, N'ТР-2', N'TR-2', CAST(N'2020-10-26T00:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_LocomotiveStatus] ([id], [locomotive_status_ru], [locomotive_status_en], [create], [create_user], [change], [change_user]) VALUES (6, N'ТР-3', N'TR-3', CAST(N'2020-10-26T00:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
SET IDENTITY_INSERT [IDS].[Directory_LocomotiveStatus] OFF
