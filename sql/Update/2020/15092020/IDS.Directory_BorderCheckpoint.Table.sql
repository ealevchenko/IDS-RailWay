USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_BorderCheckpoint]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_BorderCheckpoint](
	[code] [int] NOT NULL,
	[station_name_ru] [nvarchar](50) NOT NULL,
	[station_name_en] [nvarchar](50) NOT NULL,
	[code_inlandrailway] [int] NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Directory_BorderCheckpoint] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [IDS].[Directory_BorderCheckpoint] ([code], [station_name_ru], [station_name_en], [code_inlandrailway], [create], [create_user], [change], [change_user]) VALUES (348303, N'Бережесть (эксп.)', N'Бережесть (эксп.)', 32, CAST(N'2020-06-02T08:19:38.977' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_BorderCheckpoint] ([code], [station_name_ru], [station_name_en], [code_inlandrailway], [create], [create_user], [change], [change_user]) VALUES (352609, N'Изов (эксп. ПКП)', N'Изов (эксп. ПКП)', 35, CAST(N'2020-08-12T01:02:39.397' AS DateTime), N'EUROPE\lssmelskaya', NULL, NULL)
INSERT [IDS].[Directory_BorderCheckpoint] ([code], [station_name_ru], [station_name_en], [code_inlandrailway], [create], [create_user], [change], [change_user]) VALUES (373706, N'Мостиска II (эксп. ПКП)', N'Мостиска II (эксп. ПКП)', 35, CAST(N'2020-06-26T14:56:08.843' AS DateTime), N'EUROPE\nnlavrenko', NULL, NULL)
INSERT [IDS].[Directory_BorderCheckpoint] ([code], [station_name_ru], [station_name_en], [code_inlandrailway], [create], [create_user], [change], [change_user]) VALUES (380309, N'Чоп (эксп. ЖСР)', N'Чоп (эксп. ЖСР)', 35, CAST(N'2020-04-15T21:23:17.620' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_BorderCheckpoint] ([code], [station_name_ru], [station_name_en], [code_inlandrailway], [create], [create_user], [change], [change_user]) VALUES (381104, N'Ужгород (эксп. ЖСР)', N'Ужгород (эксп. ЖСР)', 35, CAST(N'2020-08-06T13:49:35.417' AS DateTime), N'EUROPE\yvgantsova', NULL, NULL)
INSERT [IDS].[Directory_BorderCheckpoint] ([code], [station_name_ru], [station_name_en], [code_inlandrailway], [create], [create_user], [change], [change_user]) VALUES (415809, N'Кучурган(эксп. на Новосавицкую)', N'Кучурган(эксп. на Новосавицкую)', 40, CAST(N'2020-07-31T15:07:53.187' AS DateTime), N'EUROPE\aamartseva', NULL, NULL)
INSERT [IDS].[Directory_BorderCheckpoint] ([code], [station_name_ru], [station_name_en], [code_inlandrailway], [create], [create_user], [change], [change_user]) VALUES (431801, N'Тополи (эксп.)', N'Тополи (эксп.)', 43, CAST(N'2020-04-03T00:45:35.847' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_BorderCheckpoint] ([code], [station_name_ru], [station_name_en], [code_inlandrailway], [create], [create_user], [change], [change_user]) VALUES (441201, N'Казачья Лопань (эксп.)', N'Казачья Лопань (эксп.)', 43, CAST(N'2020-06-01T16:19:58.193' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
ALTER TABLE [IDS].[Directory_BorderCheckpoint]  WITH CHECK ADD  CONSTRAINT [FK_Directory_BorderCheckpoint_Directory_InlandRailway] FOREIGN KEY([code_inlandrailway])
REFERENCES [IDS].[Directory_InlandRailway] ([code])
GO
ALTER TABLE [IDS].[Directory_BorderCheckpoint] CHECK CONSTRAINT [FK_Directory_BorderCheckpoint_Directory_InlandRailway]
GO
