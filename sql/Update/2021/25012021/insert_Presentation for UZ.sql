USE [KRR-PA-CNT-Railway]

SET IDENTITY_INSERT [IDS].[Directory_WagonOperations] ON 
INSERT [IDS].[Directory_WagonOperations] ([id], [operation_name_ru], [operation_name_en], [busy], [create], [create_user], [change], [change_user]) VALUES (9, N'Предъявление на УЗ', N'Presentation for UZ', 0, CAST(N'2021-01-25T00:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
SET IDENTITY_INSERT [IDS].[Directory_WagonOperations] OFF
