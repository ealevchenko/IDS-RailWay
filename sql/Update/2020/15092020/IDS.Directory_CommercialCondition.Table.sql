USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_CommercialCondition]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_CommercialCondition](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[commercial_condition_ru] [nvarchar](50) NOT NULL,
	[commercial_condition_en] [nvarchar](50) NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Directory_CommercialCondition] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Directory_CommercialCondition] ON 

INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (1, N'повреждения торцевых дверей', N'end door damage', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (2, N'повреждения кузова', N'body damage', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (3, N'повреждения люков', N'damage to hatches', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (4, N'повреждения люковых запоров', N'damage to hatch locks', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (5, N'повреждения пола', N'floor damage', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (6, N'повреждения бортов', N'damage to the sides', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (7, N'повреждения бортовых запоров', N'damage to airborne constipation', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (8, N'неисправность кровли', N'roof malfunction', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (9, N'неисправность пола', N'floor malfunction', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (10, N'неисправность обшивки кузова', N'bodywork malfunction', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (11, N'повреждения котла', N'boiler damage', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (12, N'наличие ЗПУ', N'the presence of ZPU', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (13, N'наличие знаков опасности', N'hazard signs', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (14, N'несоответствие схем погрузки', N'loading pattern mismatch', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (15, N'не снята реквизит крепления', N'not attached props mount', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (16, N'остатки ранее перевезних грузов', N'balances of previously transported goods', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (17, N'излишек', N'surplus', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (18, N'недостача', N'shortage', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (19, N'несоответствие ЗПУ/пломб', N'mismatch of the ZPU / seals', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (20, N'остатки груза внутри', N'cargo residues inside', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (21, N'остатки груза внутри и балках', N'cargo residues inside and beams', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (22, N'остатки груза на балках', N'cargo remains on beams', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (23, N'отсутствие ЗПУ/пломб', N'lack of ZPU / seals', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (24, N'повреждение ЗПУ/пломб', N'damage to ZPU / seals', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (25, N'порча, течь груза', N'spoilage, leakage of cargo', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (26, N'хищение', N'theft', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_CommercialCondition] ([id], [commercial_condition_ru], [commercial_condition_en], [create], [create_user], [change], [change_user]) VALUES (27, N'др. признаки несохр. перевозки', N'other signs of inconsistency. transportation', CAST(N'2020-04-14T09:50:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
SET IDENTITY_INSERT [IDS].[Directory_CommercialCondition] OFF
