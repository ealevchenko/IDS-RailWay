
declare @num_doc int =  608        
/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
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
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav]
  where [num_doc]=@num_doc
  order by 1 desc

  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
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
  where [id_arrival]=(SELECT TOP(1) ID FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav] where [num_doc]=@num_doc order by 1 desc)  
  and num in(52305901 )

  SELECT TOP (1000) [id]
      --,[id_document]
      --,[num]
      --,[id_arrival]
      --,[id_car]
      --,[id_condition]
      --,[id_type]
      --,[gruzp]
      --,[u_tara]
      --,[ves_tary_arc]
      --,[route]
      --,[note_vagon]
      ,[id_cargo]
      --,[id_cargo_gng]
      --,[id_certification_data]
      --,[id_commercial_condition]
      --,[kol_pac]
      --,[pac]
      ,[vesg]
      --,[vesg_reweighing]
      --,[nom_zpu]
      --,[danger]
      --,[danger_kod]
      --,[cargo_returns]
      --,[id_station_on_amkr]
      ,[id_division_on_amkr]
      --,[empty_car]
      --,[kol_conductor]
      --,[create]
      --,[create_user]
      --,[change]
      --,[change_user]
      --,[id_owner]
      --,[id_countrys]
      --,[id_genus]
      --,[kol_os]
      --,[usl_tip]
      --,[date_rem_uz]
      --,[date_rem_vag]
      --,[id_type_ownership]
      --,[gruzp_uz]
      --,[tara_uz]
      --,[zayava]
      --,[manual]
      --,[pay_summa]
      --,[id_wagons_rent_arrival]
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
  where id in (SELECT [id_arrival_uz_vagon]
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars]
  where [id_arrival]=(SELECT TOP(1) ID FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav] where [num_doc]=@num_doc order by 1 desc)  
  and num in(53319240  )
  )

  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      --,[id_doc_uz]
      --,[nom_doc]
      --,[nom_main_doc]
      --,[code_stn_from]
      --,[code_stn_to]
      --,[code_border_checkpoint]
      --,[cross_time]
      ,[code_shipper]
      ,[code_consignee]
      ,[klient]
      --,[code_payer_sender]
      --,[code_payer_arrival]
      --,[distance_way]
      --,[note]
      --,[parent_id]
      --,[create]
      --,[create_user]
      --,[change]
      --,[change_user]
      --,[manual]
      --,[date_otpr]
      --,[srok_end]
      --,[date_grpol]
      --,[date_pr]
      --,[date_vid]
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document]
  where [id] in (SELECT [id_document] FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
  where id in (SELECT [id_arrival_uz_vagon]
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars]
  where [id_arrival]=(SELECT TOP(1) ID FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav] where [num_doc]=@num_doc order by 1 desc)  
  and num in(53319240  )
  ))

  
--UPDATE [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document]
--   SET  [code_shipper] = 3700   
--		,[code_consignee] = 7932   
--      ,[klient] = 0
-- WHERE id IN (895416)
--GO

--UPDATE [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document]
--   SET  [code_consignee] = 7932     
--      ,[klient] = null
-- WHERE id IN (918930)
--GO

--UPDATE [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
--   --SET [id_division_on_amkr] = 0
--   SET [id_cargo] = 1,
--	 [vesg] = NULL
-- WHERE id in (1213037,1213038,1213039,1213040,1213041,1213042,1213043,1213044,1213045,1213046,1213047,1213048,1213049,1213050,1213051,1213052,1213053,1213054,1213055,1213056,1213057,1213058,1213059,1213060,1213061,1213062,1213063,1213064,1213065,1213066,1213067,1213068,1213069,1213070,1213071,1213072,1213073,1213074,1213075,1213076,1213077,1213078,1213079,1213080,1213081,1213082,1213083,1213084,1213085,1213086,1213087,1213089)
--GO
