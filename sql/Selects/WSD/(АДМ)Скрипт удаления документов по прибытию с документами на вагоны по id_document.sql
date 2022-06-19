use [KRR-PA-Test-Railway]

declare @id_document int = 295957--296578;

  /****** ”ƒ¿À»“‹  ŒÕ“≈…Õ≈–¿ œÀ¿“»À‹Ÿ» »  ******/
--SELECT [id]
--      ,[id_cont]
--      ,[kod]
--      ,[summa]
  DELETE
  FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Cont_Pay]
  where [id_cont] in (select id FROM [IDS].[Arrival_UZ_Vagon_Cont] where [id_vagon] in (select id FROM [IDS].[Arrival_UZ_Vagon] where [id_document] = (Select id FROM [IDS].[Arrival_UZ_Document] where id=@id_document)))
/****** ”ƒ¿À»“‹  ŒÕ“≈…Õ≈–¿  ******/
--SELECT [id]
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
	    DELETE
  FROM [IDS].[Arrival_UZ_Vagon_Cont]
  where [id_vagon] in (select id FROM [IDS].[Arrival_UZ_Vagon] where [id_document] = (Select id FROM [IDS].[Arrival_UZ_Document] where id=@id_document))
/****** ”ƒ¿À»“‹ œÀ¿“»À‹Ÿ» » œŒ ¬¿√ŒÕ¿Ã  ******/
--SELECT [id]
--      ,[id_vagon]
--      ,[kod]
--      ,[summa]
	    DELETE
  FROM [IDS].[Arrival_UZ_Vagon_Pay]
  where [id_vagon] in (select id FROM [IDS].[Arrival_UZ_Vagon] where [id_document] = (Select id FROM [IDS].[Arrival_UZ_Document] where id=@id_document))
/****** ”ƒ¿À»“‹ ¿ “€ œŒ ¬¿√ŒÕ¿Ã  ******/
--SELECT [id]
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
	    DELETE
  FROM [IDS].[Arrival_UZ_Vagon_Acts]  
  where [id_vagon] in (select id FROM [IDS].[Arrival_UZ_Vagon] where [id_document] = (Select id FROM [IDS].[Arrival_UZ_Document] where id=@id_document))
/****** Œ“ –Œ≈Ã œ–»¡€¬ÿ»… —Œ—“¿¬ (≈ÒÎË ÒÚ‡ÚÛÒ=2)  ******/
UPDATE [IDS].[ArrivalSostav]
   SET [date_adoption] = NULL
      ,[date_adoption_act] = NULL
      ,[status] = 1
  where [id] in (select id_arrival FROM [IDS].[ArrivalCars] where [id_arrival_uz_vagon] in (select id FROM [IDS].[Arrival_UZ_Vagon] where [id_document] = (Select id FROM [IDS].[Arrival_UZ_Document] where id=@id_document))) and status =2
/****** —¡–Œ—»Ã œ–»¡€¬ÿ»≈ ¬¿√ŒÕ€ ******/
UPDATE [IDS].[ArrivalCars]
   SET [position_arrival] = null
      ,[date_adoption_act] = null
      ,[arrival] = null
      ,[arrival_user] = null
      ,[id_arrival_uz_vagon] = null
 WHERE [id_arrival_uz_vagon] in (select id FROM [IDS].[Arrival_UZ_Vagon] where [id_document] = (Select id FROM [IDS].[Arrival_UZ_Document] where id=@id_document))

/****** ”ƒ¿À»Ã ¬¿√ŒÕ€  ******/
--SELECT  [id]
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
--      ,[id_owner]
--      ,[id_countrys]
--      ,[id_genus]
--      ,[kol_os]
--      ,[usl_tip]
--      ,[date_rem_uz]
--      ,[date_rem_vag]
--      ,[id_type_ownership]
--      ,[gruzp_uz]
--      ,[tara_uz]
--      ,[zayava]
--      ,[manual]
	    DELETE
  FROM [IDS].[Arrival_UZ_Vagon]
  where [id_document] = (Select id FROM [IDS].[Arrival_UZ_Document] where id=@id_document)

/****** ”ƒ¿À»Ã œÀ¿“»À‹Ÿ» ¿  ******/
--SELECT [id]
--      ,[id_document]
--      ,[code_payer]
--      ,[type_payer]
--      ,[kod]
--      ,[summa]
	    DELETE
  FROM  [IDS].[Arrival_UZ_Document_Pay]
  where [id_document]=@id_document

/****** ”ƒ¿À»Ã ¿ “€  ******/
--SELECT [id]
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
	    DELETE
  FROM  [IDS].[Arrival_UZ_Document_Acts]
  where [id_document]=@id_document

/****** ”ƒ¿À»Ã ƒŒ ”Ã≈Õ“€  ******/
--SELECT [id]
--      ,[id_document]
--      ,[id_doc]
--      ,[description]
--      ,[doc_date]
--      ,[doc_type]
--      ,[doc_type_name]
--      ,[doc]
	    DELETE
  FROM  [IDS].[Arrival_UZ_Document_Docs]
  where [id_document]=@id_document

/****** ”ƒ¿À»Ã ƒŒ ”Ã≈Õ“  ******/
--SELECT  [id]
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
--      ,[manual]
	    DELETE
  FROM [IDS].[Arrival_UZ_Document]
  where id=@id_document

--  /****** œ–»¡€¬ÿ»≈ ¬¿√ŒÕ€  ******/
--SELECT [id]
--      ,[id_arrival]
--      ,[num]
--      ,[position]
--      ,[position_arrival]
--      ,[consignee]
--      ,[num_doc]
--      ,[id_transfer]
--      ,[note]
--      ,[date_adoption_act]
--      ,[arrival]
--      ,[arrival_user]
--      ,[create]
--      ,[create_user]
--      ,[change]
--      ,[change_user]
--      ,[id_arrival_uz_vagon]
--  FROM [IDS].[ArrivalCars]
  --where [id_arrival_uz_vagon] in (select id FROM [IDS].[Arrival_UZ_Vagon] where [id_document] = (Select id FROM [IDS].[Arrival_UZ_Document] where id=@id_document))

  /****** —Œ—“¿¬ œ–»¡€“»ﬂ  ******/
--SELECT [id]
--      ,[id_arrived]
--      ,[id_sostav]
--      ,[train]
--      ,[composition_index]
--      ,[date_arrival]
--      ,[date_adoption]
--      ,[date_adoption_act]
--      ,[id_station_from]
--      ,[id_station_on]
--      ,[id_way]
--      ,[numeration]
--      ,[num_doc]
--      ,[count]
--      ,[status]
--      ,[note]
--      ,[create]
--      ,[create_user]
--      ,[change]
--      ,[change_user]
--  FROM [IDS].[ArrivalSostav]
  --where [id] in (select id_arrival FROM [IDS].[ArrivalCars] where [id_arrival_uz_vagon] in (select id FROM [IDS].[Arrival_UZ_Vagon] where [id_document] = (Select id FROM [IDS].[Arrival_UZ_Document] where id=@id_document))) and status =2



