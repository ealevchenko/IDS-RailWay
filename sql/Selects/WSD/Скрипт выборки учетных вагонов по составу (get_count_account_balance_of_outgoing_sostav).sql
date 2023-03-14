declare @id_sostav int = 210545

		SELECT 
		count(out_vag.[id])
		--uz_doc.[code_shipper]
		--,dir_div.[id_type_devision]
		--,*
		  FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] as out_car
			Left JOIN [IDS].[Outgoing_UZ_Vagon] as out_vag ON out_vag.id = out_car.[id_outgoing_uz_vagon]
			Left JOIN [IDS].[Directory_Divisions] as dir_div ON dir_div.id = out_vag.id_division
			Left JOIN [IDS].[Outgoing_UZ_Document] as uz_doc ON uz_doc.id = out_vag.id_document
			--> Справочник вагонов
			Left JOIN IDS.Directory_Wagons as dir_wagon ON out_car.num = dir_wagon.num
			--> Справочник Род вагона
			Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
			Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = out_car.num and rent_end is null order by [id] desc)
			where out_car.[id_outgoing]=@id_sostav and out_car.[outgoing] is not null and dir_div.[id_type_devision] <> 8
			AND (dir_rent.id_operator is null OR (NOT (dir_rent.id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz'))) AND NOT (dir_rent.id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('cisterns')) and dir_rod.rod_uz = 70)))
