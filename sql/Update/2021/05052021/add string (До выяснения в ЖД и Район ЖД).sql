USE [KRR-PA-CNT-Railway]
GO
INSERT [IDS].[Directory_Railway] ([code], [railway_name_ru], [railway_name_en], [railway_abbr_ru], [railway_abbr_en], [id_countrys], [create], [create_user], [change], [change_user]) VALUES (0, N'До выяснения', N'Until clarification', N'?', N'?', 0, CAST(N'2021-05-05T15:12:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
GO

INSERT [IDS].[Directory_InlandRailway] ([code], [inlandrailway_name_ru], [inlandrailway_name_en], [inlandrailway_abbr_ru], [inlandrailway_abbr_en], [code_railway], [create], [create_user], [change], [change_user]) VALUES (0, N'До выяснения', N'Until clarification', N'?', N'?', 0, CAST(N'2021-05-05T15:16:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, N'')
go
