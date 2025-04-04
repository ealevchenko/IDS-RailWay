use [KRR-PA-CNT-Railway]

declare @num_sostav int = 520   
declare @id_sostav bigint

SELECT [id]
      ,[id_arrived]
      ,[id_sostav]
      ,[train]
      ,[composition_index]
      ,[date_arrival]
      ,[date_adoption]
      ,[date_adoption_act]
      ,[id_station_from]
      ,[id_station_on]
      ,[id_way]
      ,[numeration]
      ,[num_doc]
      ,[count]
      ,[status]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [IDS].[ArrivalSostav]
  where [num_doc] = @num_sostav
  order by 1 desc

  set @id_sostav = (SELECT top(1) id FROM [IDS].[ArrivalSostav] where [num_doc] = @num_sostav order by 1 desc)

  SELECT [id]
      ,[id_arrival]
      ,[num]
      ,[position]
      ,[position_arrival]
      ,[consignee]
      ,[num_doc]
      ,[id_transfer]
      ,[note]
      ,[date_adoption_act]
      ,[arrival]
      ,[arrival_user]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[id_arrival_uz_vagon]
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars]
  where [id_arrival] = @id_sostav and num in (60726544, 60724341, 60455508, 54779467, 63470777, 63813711  )

  SELECT TOP (1000) [id]
      ,[num]
      ,[id_arrival_car]
      ,[id_sap_incoming_supply]
      ,[doc_outgoing_car]
      ,[id_outgoing_car]
      ,[id_sap_outbound_supply]
      ,[note]
      ,[create]
      ,[create_user]
      ,[close]
      ,[close_user]
      ,[parent_id]
      ,[highlight_color]
      ,[id_usage_fee]
      ,[note2]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  where [id_arrival_car] in (select id FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] where [id_arrival] = @id_sostav and num in (60726544, 60724341, 60455508, 54779467, 63470777, 63813711  ))


  --++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  declare @id_car bigint = 1946843;
  declare @id_arrival_uz_vagon bigint = (select [id_arrival_uz_vagon] FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] where id = @id_car)
  declare @id_arrival_uz_document bigint = (SELECT [id_document] FROM [IDS].[Arrival_UZ_Vagon] where id = @id_arrival_uz_vagon)
  
  declare @id_wir bigint =  (SELECT [id] FROM [IDS].[WagonInternalRoutes] where [id_arrival_car] = @id_car)

  --select @id_wir

  declare @id_sap_incoming_supply bigint =  (SELECT [id_sap_incoming_supply] FROM [IDS].[WagonInternalRoutes] where [id_arrival_car] = @id_car)
  declare @id_outgoing_car bigint =  (SELECT [id_outgoing_car] FROM [IDS].[WagonInternalRoutes] where [id_arrival_car] = @id_car)
  declare @id_sap_outbound_supply bigint =  (SELECT [id_sap_outbound_supply] FROM [IDS].[WagonInternalRoutes] where [id_arrival_car] = @id_car)

  declare @id_outgoing_sostav bigint =  (SELECT [id_outgoing] FROM [IDS].[OutgoingCars] where id = @id_outgoing_car)
  declare @id_outgoing_uz_vagon bigint =  (SELECT [id_outgoing_uz_vagon] FROM [IDS].[OutgoingCars] where id = @id_outgoing_car)
  declare @id_outgoing_uz_document bigint =  (SELECT [id_document] FROM [IDS].[Outgoing_UZ_Vagon] where id = @id_outgoing_uz_vagon)
  
  select @id_car,@id_arrival_uz_vagon,@id_arrival_uz_document,@id_wir,@id_sap_incoming_supply,@id_outgoing_car,@id_sap_outbound_supply ,@id_outgoing_sostav, @id_outgoing_uz_vagon, @id_outgoing_uz_document
  
  set @id_outgoing_sostav = 365990
  set @id_outgoing_car = 1096713;

  declare @out_uz bit = 0 
  if (@out_uz = 1)
  begin
  --========================
	 --> Удалить документы на вагон по отправке
	  if (@id_outgoing_uz_vagon is not null)
	  begin 
  
		  delete
		  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon_Acts]
		  where [id_vagon] = @id_outgoing_uz_vagon

		  delete
		  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon_Cont]
		  where [id_vagon] = @id_outgoing_uz_vagon

		  delete
		  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon_Pay]
		  where [id_vagon] = @id_outgoing_uz_vagon

		  -- Удалим ссылку на документ вагона по отправке
		  UPDATE [IDS].[OutgoingCars]
		   SET  [id_outgoing_uz_vagon] = null
		  WHERE id=@id_outgoing_car

		-- Удалим  документ вагона по отправке
		  delete
		  FROM [IDS].[Outgoing_UZ_Vagon] 
		  where id = @id_outgoing_uz_vagon

	  end -- {(@id_outgoing_uz_vagon is not null)}

	  --> Удалить документы по отправке (с проверкой ссылок на вагоны)
	  if (@id_outgoing_uz_document is not null)
	  begin
		  SELECT TOP (1000) [id]
			  ,[id_doc_uz]
			  ,[nom_doc]
			  ,[code_stn_from]
			  ,[code_stn_to]
			  ,[country_nazn]
			  ,[code_border_checkpoint]
			  ,[cross_date]
			  ,[code_shipper]
			  ,[code_consignee]
			  ,[vid]
			  ,[code_payer]
			  ,[distance_way]
			  ,[osum]
			  ,[date_sozdan]
			  ,[date_otpr]
			  ,[date_pr]
			  ,[date_grpol]
			  ,[date_vid]
			  ,[info_sht]
			  ,[name_gr]
			  ,[note]
			  ,[create]
			  ,[create_user]
			  ,[change]
			  ,[change_user]
		  FROM  [IDS].[Outgoing_UZ_Document] where id = @id_outgoing_uz_document
	  end

	  --> Удалим ссылки на  вагоны по отправке
	  UPDATE [IDS].[WagonInternalRoutes]
		SET [id_outgoing_car] = null
		,[id_sap_outbound_supply] = null
		WHERE id = @id_wir;

		--> Удалить вагоны по отправке
		SELECT [id]
		  ,[id_outgoing]
		  ,[num]
		  ,[position]
		  ,[position_outgoing]
		  ,[num_doc]
		  ,[note]
		  ,[date_outgoing_act]
		  ,[outgoing]
		  ,[outgoing_user]
		  ,[id_outgoing_uz_vagon]
		  ,[id_outgoing_detention]
		  ,[id_reason_discrepancy_amkr]
		  ,[id_reason_discrepancy_uz]
		  ,[id_outgoing_return_start]
		  ,[id_outgoing_return_stop]
		  ,[parent_wir_id]
		  ,[create]
		  ,[create_user]
		  ,[change]
		  ,[change_user]
		  ,[note_vagonnik]
		  ,[vagonnik]
		  ,[vagonnik_user]
	  FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars]
	  where id = @id_outgoing_car;
		--> Удалить состав по отправке
		SELECT [id]
			  ,[num_doc]
			  ,[id_station_from]
			  ,[id_way_from]
			  ,[id_station_on]
			  ,[date_readiness_amkr]
			  ,[date_end_inspection_acceptance_delivery]
			  ,[date_end_inspection_loader]
			  ,[date_end_inspection_vagonnik]
			  ,[date_show_wagons]
			  ,[date_readiness_uz]
			  ,[date_outgoing]
			  ,[date_outgoing_act]
			  ,[date_departure_amkr]
			  ,[composition_index]
			  ,[status]
			  ,[route_sign]
			  ,[note]
			  ,[create]
			  ,[create_user]
			  ,[change]
			  ,[change_user]
			  ,[vagonnik_user]
		  FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingSostav]
		  where id = @id_outgoing_sostav
  --========================
  end

 