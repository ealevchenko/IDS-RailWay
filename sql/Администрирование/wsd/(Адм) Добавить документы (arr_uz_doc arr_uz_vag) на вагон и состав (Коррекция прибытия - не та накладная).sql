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
  where num =61507802--61337481
  order by 1 desc
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[id_document]
      ,[num]
      ,[id_arrival]
      ,[id_car]
      ,[id_condition]
      ,[id_type]
      ,[gruzp]
      ,[u_tara]
      ,[ves_tary_arc]
      ,[route]
      ,[note_vagon]
      ,[id_cargo]
      ,[id_cargo_gng]
      ,[id_certification_data]
      ,[id_commercial_condition]
      ,[kol_pac]
      ,[pac]
      ,[vesg]
      ,[vesg_reweighing]
      ,[nom_zpu]
      ,[danger]
      ,[danger_kod]
      ,[cargo_returns]
      ,[id_station_on_amkr]
      ,[id_division_on_amkr]
      ,[empty_car]
      ,[kol_conductor]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[id_owner]
      ,[id_countrys]
      ,[id_genus]
      ,[kol_os]
      ,[usl_tip]
      ,[date_rem_uz]
      ,[date_rem_vag]
      ,[id_type_ownership]
      ,[gruzp_uz]
      ,[tara_uz]
      ,[zayava]
      ,[manual]
      ,[pay_summa]
      ,[id_wagons_rent_arrival]
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
  where id=846352--846356
  SELECT TOP (1000) [id]
      ,[id_document]
      ,[num]
      ,[id_arrival]
      ,[id_car]
      ,[id_condition]
      ,[id_type]
      ,[gruzp]
      ,[u_tara]
      ,[ves_tary_arc]
      ,[route]
      ,[note_vagon]
      ,[id_cargo]
      ,[id_cargo_gng]
      ,[id_certification_data]
      ,[id_commercial_condition]
      ,[kol_pac]
      ,[pac]
      ,[vesg]
      ,[vesg_reweighing]
      ,[nom_zpu]
      ,[danger]
      ,[danger_kod]
      ,[cargo_returns]
      ,[id_station_on_amkr]
      ,[id_division_on_amkr]
      ,[empty_car]
      ,[kol_conductor]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[id_owner]
      ,[id_countrys]
      ,[id_genus]
      ,[kol_os]
      ,[usl_tip]
      ,[date_rem_uz]
      ,[date_rem_vag]
      ,[id_type_ownership]
      ,[gruzp_uz]
      ,[tara_uz]
      ,[zayava]
      ,[manual]
      ,[pay_summa]
      ,[id_wagons_rent_arrival]
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
  where num=61507802--61337481
  order by 1 desc

  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[id_doc_uz]
      ,[nom_doc]
      ,[nom_main_doc]
      ,[code_stn_from]
      ,[code_stn_to]
      ,[code_border_checkpoint]
      ,[cross_time]
      ,[code_shipper]
      ,[code_consignee]
      ,[klient]
      ,[code_payer_sender]
      ,[code_payer_arrival]
      ,[distance_way]
      ,[note]
      ,[parent_id]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[manual]
      ,[date_otpr]
      ,[srok_end]
      ,[date_grpol]
      ,[date_pr]
      ,[date_vid]
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document]
  where id=619392--625443
    /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[id_doc_uz]
      ,[nom_doc]
      ,[nom_main_doc]
      ,[code_stn_from]
      ,[code_stn_to]
      ,[code_border_checkpoint]
      ,[cross_time]
      ,[code_shipper]
      ,[code_consignee]
      ,[klient]
      ,[code_payer_sender]
      ,[code_payer_arrival]
      ,[distance_way]
      ,[note]
      ,[parent_id]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[manual]
      ,[date_otpr]
      ,[srok_end]
      ,[date_grpol]
      ,[date_pr]
      ,[date_vid]
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document]
  where [nom_main_doc]=40505620

  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [num_doc]
      ,[revision]
      ,[status]
      ,[code_from]
      ,[code_on]
      ,[dt]
      ,[xml_doc]
      ,[num_uz]
      ,[close]
      ,[close_message]
  FROM [KRR-PA-CNT-Railway].[IDS].[UZ_DOC]
  where [num_uz]='40505620'--'40505604'

  --INSERT INTO [IDS].[Arrival_UZ_Document]
--           ([id_doc_uz]
--           ,[nom_doc]
--           ,[nom_main_doc]
--           ,[code_stn_from]
--           ,[code_stn_to]
--           ,[code_border_checkpoint]
--           ,[cross_time]
--           ,[code_shipper]
--           ,[code_consignee]
--           ,[klient]
--           ,[code_payer_sender]
--           ,[code_payer_arrival]
--           ,[distance_way]
--           ,[note]
--           ,[parent_id]
--           ,[create]
--           ,[create_user]
--           ,[change]
--           ,[change_user]
--           ,[manual]
--           ,[date_otpr]
--           ,[srok_end]
--           ,[date_grpol]
--           ,[date_pr]
--           ,[date_vid])
--     VALUES
--           ('90462545'
--           ,NULL
--           ,'40505620'
--           ,416604
--           ,416604
--           ,NULL
--           ,NULL
--           ,6435
--           ,7932
--           ,0
--           ,'5639846'
--           ,'8116733'
--           ,771
--           ,NULL
--           ,NULL
--           ,getdate()
--           ,'EUROPE\ealevchenko'
--           ,NULL
--           ,NULL
--           ,0
--           ,'2023-11-12 09:20:00.000'
--           ,'2023-11-18 00:00:00.000'
--           ,'2023-11-14 15:11:00.000'
--           ,'2023-11-14 13:31:00.000'
--           ,'2023-11-14 15:36:00.000')
--GO

--INSERT INTO [IDS].[Arrival_UZ_Vagon]
--           ([id_document]
--           ,[num]
--           ,[id_arrival]
--           ,[id_car]
--           ,[id_condition]
--           ,[id_type]
--           ,[gruzp]
--           ,[u_tara]
--           ,[ves_tary_arc]
--           ,[route]
--           ,[note_vagon]
--           ,[id_cargo]
--           ,[id_cargo_gng]
--           ,[id_certification_data]
--           ,[id_commercial_condition]
--           ,[kol_pac]
--           ,[pac]
--           ,[vesg]
--           ,[vesg_reweighing]
--           ,[nom_zpu]
--           ,[danger]
--           ,[danger_kod]
--           ,[cargo_returns]
--           ,[id_station_on_amkr]
--           ,[id_division_on_amkr]
--           ,[empty_car]
--           ,[kol_conductor]
--           ,[create]
--           ,[create_user]
--           ,[change]
--           ,[change_user]
--           ,[id_owner]
--           ,[id_countrys]
--           ,[id_genus]
--           ,[kol_os]
--           ,[usl_tip]
--           ,[date_rem_uz]
--           ,[date_rem_vag]
--           ,[id_type_ownership]
--           ,[gruzp_uz]
--           ,[tara_uz]
--           ,[zayava]
--           ,[manual]
--           ,[pay_summa]
--           ,[id_wagons_rent_arrival])
--     VALUES
--           (625506
--           ,61507802
--           ,274091
--           ,1666410
--           ,4
--           ,NULL
--           ,70
--           ,NULL
--           ,23600
--           ,0
--           ,NULL
--           ,1
--           ,NULL
--           ,NULL
--           ,NULL
--           ,NULL
--           ,NULL
--           ,NULL
--           ,NULL
--           ,NULL
--           ,NULL
--           ,NULL
--           ,NULL
--           ,2
--           ,13
--           ,NULL
--           ,NULL
--           ,getdate()
--           ,'EUROPE\ealevchenko'
--           ,NULL
--           ,NULL
--           ,0
--           ,14
--           ,22
--           ,4
--           ,NULL
--           ,NULL
--           ,NULL
--           ,NULL
--           ,NULL
--           ,NULL
--           ,NULL
--           ,0
--           ,621390
--           ,225370)
--GO