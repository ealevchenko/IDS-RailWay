use [KRR-PA-CNT-Railway]
SET IDENTITY_INSERT [IDS].[Directory_Station] ON 

INSERT [IDS].[Directory_Station] ([id], [station_name_ru], [station_name_en], [station_abbr_ru], [station_abbr_en], [exit_uz], [station_uz], [default_side], [code], [idle_time]) VALUES (99, N'До выяснения', N'Until clarification', N'?', N'?', 0, 0, NULL, NULL, NULL)

SET IDENTITY_INSERT [IDS].[Directory_Station] OFF 

SET IDENTITY_INSERT [IDS].[Directory_ParkWays] ON 

INSERT [IDS].[Directory_ParkWays] ([id], [park_name_ru], [park_name_en], [park_abbr_ru], [park_abbr_en], [create], [create_user], [change], [change_user]) VALUES (0, N'Накопительный', N'Cumulative', N'Накопительный', N'Cumulative', CAST(N'2020-11-30T08:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)

SET IDENTITY_INSERT [IDS].[Directory_ParkWays] OFF 

SET IDENTITY_INSERT [IDS].[Directory_Ways] ON 

INSERT [IDS].[Directory_Ways] ([id], [id_station], [id_park], [position_park], [position_way], [way_num_ru], [way_num_en], [way_name_ru], [way_name_en], [way_abbr_ru], [way_abbr_en], [capacity], [deadlock], [crossing_uz], [crossing_amkr], [id_devision], [dissolution], [output_dissolution], [way_close], [way_delete], [note], [create], [create_user], [change], [change_user]) VALUES (0, 99, 0, 1, 1, N'1', N'1', N'Накопительный', N'Накопительный', N'Накопительный', N'Накопительный', null, NULL, NULL, NULL, null, NULL, NULL, NULL, NULL, N'', CAST(N'2020-11-30T00:00:00.000' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)

SET IDENTITY_INSERT [IDS].[Directory_Ways] OFF 