USE [KRR-PA-CNT-Railway]
GO
SET IDENTITY_INSERT [IDS].[Directory_WagonOperations] ON 

INSERT [IDS].[Directory_WagonOperations] ([id], [operation_name_ru], [operation_name_en], [busy], [create], [create_user], [change], [change_user]) VALUES (1, N'Прибытие с УЗ', N'Arrival from UZ', 0, CAST(N'2020-09-24T16:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
SET IDENTITY_INSERT [IDS].[Directory_WagonOperations] OFF
