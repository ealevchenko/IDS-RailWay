USE [KRR-PA-CNT-Railway]
GO
SET IDENTITY_INSERT [IDS].[Directory_WagonOperations] ON 
INSERT [IDS].[Directory_WagonOperations] ([id], [operation_name_ru], [operation_name_en], [busy], [create], [create_user], [change], [change_user]) VALUES (11, N'Возврат с перегона', N'Return outer way', 0, CAST(N'2021-10-19T00:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[Directory_WagonOperations] ([id], [operation_name_ru], [operation_name_en], [busy], [create], [create_user], [change], [change_user]) VALUES (12, N'Отмена', N'Cancel', 0, CAST(N'2021-10-19T00:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)

SET IDENTITY_INSERT [IDS].[Directory_WagonOperations] OFF
GO
