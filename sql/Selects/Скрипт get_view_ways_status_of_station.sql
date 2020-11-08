use [KRR-PA-CNT-Railway]
	SELECT 
		w.[id],
		w.[id_station],
		w.[id_park],
		w.[position_park],
		w.[position_way],
		pw.[park_name_ru],
		pw.[park_name_en],
		pw.[park_abbr_ru],
		pw.[park_abbr_en],
		w.[way_num_ru],
		w.[way_num_en],
		w.[way_name_ru],
		w.[way_name_en],
		w.[way_abbr_ru],
		w.[way_abbr_en],
		w.[capacity],
		[count_wagon] = (SELECT count(id) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_way] =w.[id] and [way_end] is null),
		w.[deadlock],
		w.[crossing_uz],
		w.[crossing_amkr],
		w.[id_devision], 
		w.[dissolution], 
		w.[output_dissolution], 
		w.[note],
		w.[create],
		w.[create_user],
		w.[change],
		w.[change_user]
	FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] as w Left JOIN
	IDS.Directory_ParkWays as pw ON pw.id = (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_ParkWays] where [id] = w.[id_park])

	
	where w.[id_station]=6 
	ORDER BY position_park, position_way