USE [KRR-PA-CNT-Railway]
GO
SET IDENTITY_INSERT [IDS].[Directory_WagonOperations] ON 

INSERT [IDS].[Directory_WagonOperations] ([id], [operation_name_ru], [operation_name_en], [busy], [create], [create_user], [change], [change_user]) VALUES (6, N'Прибытие', N'Arrival', 0, CAST(N'2020-11-02T11:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
SET IDENTITY_INSERT [IDS].[Directory_WagonOperations] OFF
