USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_Reason_Discrepancy]    Script Date: 10.02.2021 13:29:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_Reason_Discrepancy](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[reason_discrepancy_name_ru] [nvarchar](100) NOT NULL,
	[reason_discrepancy_name_en] [nvarchar](100) NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[delete] [datetime] NULL,
	[delete_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Directory_Reason_Discrepancy] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_Reason_Discrepancy] ON 

INSERT [IDS].[Directory_Reason_Discrepancy] ([id], [reason_discrepancy_name_ru], [reason_discrepancy_name_en], [create], [create_user], [change], [change_user], [delete], [delete_user]) VALUES (1, N'До распоряжения УЗ', N'Until the order of UZ', CAST(N'2021-02-10T13:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL, NULL, NULL)
INSERT [IDS].[Directory_Reason_Discrepancy] ([id], [reason_discrepancy_name_ru], [reason_discrepancy_name_en], [create], [create_user], [change], [change_user], [delete], [delete_user]) VALUES (2, N'Отсутствие договора', N'No contract', CAST(N'2021-02-10T13:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL, NULL, NULL)
INSERT [IDS].[Directory_Reason_Discrepancy] ([id], [reason_discrepancy_name_ru], [reason_discrepancy_name_en], [create], [create_user], [change], [change_user], [delete], [delete_user]) VALUES (3, N'Занятость пути', N'Busy way', CAST(N'2021-02-10T13:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL, NULL, NULL)
INSERT [IDS].[Directory_Reason_Discrepancy] ([id], [reason_discrepancy_name_ru], [reason_discrepancy_name_en], [create], [create_user], [change], [change_user], [delete], [delete_user]) VALUES (4, N'Запрет УЗ по телеграмме', N'Prohibition of UZ by telegram', CAST(N'2021-02-10T13:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL, NULL, NULL)
INSERT [IDS].[Directory_Reason_Discrepancy] ([id], [reason_discrepancy_name_ru], [reason_discrepancy_name_en], [create], [create_user], [change], [change_user], [delete], [delete_user]) VALUES (5, N'Запрет устный', N'Prohibition oral', CAST(N'2021-02-10T13:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL, NULL, NULL)
INSERT [IDS].[Directory_Reason_Discrepancy] ([id], [reason_discrepancy_name_ru], [reason_discrepancy_name_en], [create], [create_user], [change], [change_user], [delete], [delete_user]) VALUES (6, N'Коммерческий брак', N'Commercial marriage', CAST(N'2021-02-10T13:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL, NULL, NULL)
INSERT [IDS].[Directory_Reason_Discrepancy] ([id], [reason_discrepancy_name_ru], [reason_discrepancy_name_en], [create], [create_user], [change], [change_user], [delete], [delete_user]) VALUES (7, N'Нет транспортной инструкции', N'No shipping instructions', CAST(N'2021-02-10T13:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL, NULL, NULL)
INSERT [IDS].[Directory_Reason_Discrepancy] ([id], [reason_discrepancy_name_ru], [reason_discrepancy_name_en], [create], [create_user], [change], [change_user], [delete], [delete_user]) VALUES (8, N'Нет подтверждение получателя', N'No recipient confirmation', CAST(N'2021-02-10T13:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL, NULL, NULL)
INSERT [IDS].[Directory_Reason_Discrepancy] ([id], [reason_discrepancy_name_ru], [reason_discrepancy_name_en], [create], [create_user], [change], [change_user], [delete], [delete_user]) VALUES (9, N'Отсутствует оплата', N'No payment', CAST(N'2021-02-10T13:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL, NULL, NULL)
INSERT [IDS].[Directory_Reason_Discrepancy] ([id], [reason_discrepancy_name_ru], [reason_discrepancy_name_en], [create], [create_user], [change], [change_user], [delete], [delete_user]) VALUES (10, N'Приказ отсутствует', N'No order', CAST(N'2021-02-10T13:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [IDS].[Directory_Reason_Discrepancy] OFF
