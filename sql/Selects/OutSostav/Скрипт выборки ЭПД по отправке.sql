use [KRR-PA-CNT-Railway]

----/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
----SELECT [id]
----      ,[num_doc]
----      ,[id_station_from]
----      ,[id_way_from]
----      ,[id_station_on]
----      ,[date_readiness_amkr]
----      ,[date_end_inspection_acceptance_delivery]
----      ,[date_end_inspection_loader]
----      ,[date_end_inspection_vagonnik]
----      ,[date_show_wagons]
----      ,[date_readiness_uz]
----      ,[date_outgoing]
----      ,[date_outgoing_act]
----      ,[date_departure_amkr]
----      ,[composition_index]
----      ,[status]
----      ,[route_sign]
----      ,[note]
----      ,[create]
----      ,[create_user]
----      ,[change]
----      ,[change_user]
----      ,[vagonnik_user]
----  FROM [IDS].[OutgoingSostav]
----  order by 1 desc

  SELECT 
  -- Состав
	   out_sost.[id] as id_sostav
      ,out_sost.[date_outgoing]
      ,out_sost.[date_departure_amkr]
      ,out_sost.[status] as status_sostav
  -- Вагоны
      ,out_car.[id] as id_car
      ,out_car.[num]
      ,out_car.[position_outgoing]
	-- Документы
      ,doc_uz.[num_doc]
	  ,doc_uz.[revision]
      ,doc_uz.[status]
      ,doc_uz.[code_from]
      ,doc_uz.[code_on]
      ,doc_uz.[dt]
      --,doc_uz.[xml_doc]
      ,doc_uz.[num_uz]
	  --into uz_doc_sending
  FROM [IDS].[OutgoingSostav] as out_sost
		Left JOIN [IDS].[OutgoingCars] as out_car ON out_sost.[id] = out_car.[id_outgoing]
  		--> Прибытие вагона
		Left JOIN [IDS].[UZ_DOC_OUT] as doc_uz ON out_car.[num_doc] = doc_uz.[num_doc]
  where out_sost.[status] >=2 and  out_car.[position_outgoing] is not null and (doc_uz.[num_doc] is null or doc_uz.[status]<8) and out_sost.[date_outgoing] > CONVERT(datetime,'2021-09-26 00:00:00',120) --[id_outgoing] = 107442 and 

  order by out_sost.[date_outgoing], out_sost.[id], out_car.[position_outgoing]