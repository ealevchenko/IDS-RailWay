
declare @id_car int = 1629865
declare @id_sostav int = (select [id_arrival]   FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] where id = @id_car)
declare @id_wir int = (select [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_arrival_car] = @id_car)
declare @id_vagon int = (select [id_arrival_uz_vagon]   FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] where id = @id_car)
declare @id_sap_incoming_supply int = (select [id_sap_incoming_supply] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where [id_arrival_car] = @id_car)

-- Оставить информацию о прибытии
--UPDATE [IDS].[ArrivalCars]
--   SET [position_arrival] = null
--      ,[num_doc] = null
--      ,[arrival] = null
--      ,[arrival_user] = null
--      ,[id_arrival_uz_vagon] = null
-- WHERE where [id_arrival_car] = @id_car

  -- Удалить информацию о прибытии
  --SELECT TOP (1000) [id]
  --    ,[num]
  --    ,[id_arrival_car]
  --    ,[id_sap_incoming_supply]
  --    ,[doc_outgoing_car]
  --    ,[id_outgoing_car]
  --    ,[id_sap_outbound_supply]
  --    ,[note]
  --    ,[create]
  --    ,[create_user]
  --    ,[close]
  --    ,[close_user]
  --    ,[parent_id]
  delete
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  where [id_arrival_car] = @id_car


  --SELECT TOP (1000) [id]
  --    ,[id_wagon_internal_routes]
  --    ,[id_station]
  --    ,[id_way]
  --    ,[way_start]
  --    ,[way_end]
  --    ,[id_outer_way]
  --    ,[outer_way_start]
  --    ,[outer_way_end]
  --    ,[position]
  --    ,[note]
  --    ,[create]
  --    ,[create_user]
  --    ,[close]
  --    ,[close_user]
  --    ,[parent_id]
  delete
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]
  where [id_wagon_internal_routes] = @id_wir

  --SELECT TOP (1000) [id]
  --    ,[id_wagon_internal_routes]
  --    ,[id_operation]
  --    ,[operation_start]
  --    ,[operation_end]
  --    ,[id_condition]
  --    ,[id_loading_status]
  --    ,[locomotive1]
  --    ,[locomotive2]
  --    ,[note]
  --    ,[create]
  --    ,[create_user]
  --    ,[close]
  --    ,[close_user]
  --    ,[parent_id]
  delete
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation]
  where [id_wagon_internal_routes] = @id_wir

  --SELECT TOP (1000) [id]
  --    ,[id_arrival_car]
  --    ,[num]
  --    ,[num_doc_uz]
  --    ,[date_doc_uz]
  --    ,[code_border_checkpoint]
  --    ,[name_border_checkpoint]
  --    ,[cross_time]
  --    ,[VBELN]
  --    ,[NUM_VBELN]
  --    ,[WERKS]
  --    ,[LGORT]
  --    ,[LGOBE]
  --    ,[ERDAT]
  --    ,[ETIME]
  --    ,[LGORT_10]
  --    ,[LGOBE_10]
  --    ,[MATNR]
  --    ,[MAKTX]
  --    ,[NAME_SH]
  --    ,[KOD_R_10]
  --    ,[note]
  --    ,[term]
  --    ,[attempt]
  --    ,[create]
  --    ,[create_user]
  --    ,[change]
  --    ,[change_user]
  --    ,[close]
  --    ,[close_user]
	  delete
  FROM [KRR-PA-CNT-Railway].[IDS].[SAPIncomingSupply]
  where [id] = @id_sap_incoming_supply

  --SELECT [id]
  --    ,[id_arrival]
  --    ,[num]
  --    ,[position]
  --    ,[position_arrival]
  --    ,[consignee]
  --    ,[num_doc]
  --    ,[id_transfer]
  --    ,[note]
  --    ,[date_adoption_act]
  --    ,[arrival]
  --    ,[arrival_user]
  --    ,[create]
  --    ,[create_user]
  --    ,[change]
  --    ,[change_user]
  --    ,[id_arrival_uz_vagon]
  delete
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars]
  where id = @id_car







--> Вагоны
--SELECT TOP (1000) [id]
--      ,[id_vagon]
--      ,[date_akt]
--      ,[date_dved]
--      ,[nom_akt]
--      ,[nom_dved]
--      ,[prichina_akt]
--      ,[stn_akt]
--      ,[stn_name_akt]
--      ,[type]
--      ,[vagon_nom]
	  delete
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon_Acts]
  where [id_vagon] = @id_vagon

--SELECT TOP (1000) [id]
--      ,[id_vagon]
--      ,[nom_cont]
--      ,[kod_tiporazmer]
--      ,[gruzp]
--      ,[ves_tary_arc]
--      ,[id_cargo]
--      ,[id_cargo_gng]
--      ,[kol_pac]
--      ,[pac]
--      ,[vesg]
--      ,[vesg_reweighing]
--      ,[nom_zpu]
delete
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon_Cont]
    where [id_vagon] = @id_vagon

--SELECT TOP (1000) [id]
--      ,[id_vagon]
--      ,[kod]
--      ,[summa]
delete
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon_Pay]
where [id_vagon] = @id_vagon

--SELECT TOP (1000) [id]
--      ,[id_document]
--      ,[num]
--      ,[id_arrival]
--      ,[id_car]
--      ,[id_condition]
--      ,[id_type]
--      ,[gruzp]
--      ,[u_tara]
--      ,[ves_tary_arc]
--      ,[route]
--      ,[note_vagon]
--      ,[id_cargo]
--      ,[id_cargo_gng]
--      ,[id_certification_data]
--      ,[id_commercial_condition]
--      ,[kol_pac]
--      ,[pac]
--      ,[vesg]
--      ,[vesg_reweighing]
--      ,[nom_zpu]
--      ,[danger]
--      ,[danger_kod]
--      ,[cargo_returns]
--      ,[id_station_on_amkr]
--      ,[id_division_on_amkr]
--      ,[empty_car]
--      ,[kol_conductor]
--      ,[create]
--      ,[create_user]
--      ,[change]
--      ,[change_user]
delete
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
where id = @id_vagon;

  --SELECT [id]
  --    ,[id_arrived]
  --    ,[id_sostav]
  --    ,[train]
  --    ,[composition_index]
  --    ,[date_arrival]
  --    ,[date_adoption]
  --    ,[date_adoption_act]
  --    ,[id_station_from]
  --    ,[id_station_on]
  --    ,[id_way]
  --    ,[numeration]
  --    ,[num_doc]
  --    ,[count]
  --    ,[status]
  --    ,[note]
  --    ,[create]
  --    ,[create_user]
  --    ,[change]
  --    ,[change_user]
  delete
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav]
  where [id] = @id_sostav

--> ДОКУМЕНТ 
declare @id_dociment int = (select [id_document] FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon] where id = @id_vagon)

--SELECT TOP (1000) [id]
--      ,[id_document]
--      ,[date_akt]
--      ,[date_dved]
--      ,[nom_akt]
--      ,[nom_dved]
--      ,[prichina_akt]
--      ,[stn_akt]
--      ,[stn_name_akt]
--      ,[type]
--      ,[vagon_nom]
delete
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document_Acts]
    where id=@id_dociment

--SELECT TOP (1000) [id]
--      ,[id_document]
--      ,[id_doc]
--      ,[description]
--      ,[doc_date]
--      ,[doc_type]
--      ,[doc_type_name]
--      ,[doc]
delete
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document_Docs]
where id=@id_dociment

--SELECT TOP (1000) [id]
--      ,[id_document]
--      ,[code_payer]
--      ,[type_payer]
--      ,[kod]
--      ,[summa]
delete
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document_Pay]
where id=@id_dociment

--SELECT TOP (1000) [id]
--      ,[id_doc_uz]
--      ,[nom_doc]
--      ,[nom_main_doc]
--      ,[code_stn_from]
--      ,[code_stn_to]
--      ,[code_border_checkpoint]
--      ,[cross_time]
--      ,[code_shipper]
--      ,[code_consignee]
--      ,[klient]
--      ,[code_payer_sender]
--      ,[code_payer_arrival]
--      ,[distance_way]
--      ,[note]
--      ,[parent_id]
--      ,[create]
--      ,[create_user]
--      ,[change]
--      ,[change_user]
delete
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document]
  where id=@id_dociment


