declare @mun int = 61239257
declare @id_arrival_uz_vagon int = 964158
declare @id_document int = 712253
declare @nom_main_doc sysname = '40027690'

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
  where num = @mun
  order by 1 desc

SELECT [id]
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
  where id=@id_arrival_uz_vagon

SELECT [id]
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
  where num=@mun
  order by 1 desc

SELECT [id]
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
  where id=@id_document

SELECT [id]
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
  where [nom_main_doc]=@nom_main_doc

SELECT [num_doc]
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
  where [num_uz]=@nom_main_doc

SELECT [id]
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
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  where [id_arrival_car] = 1661916


--  INSERT INTO [IDS].[Arrival_UZ_Document]
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
--           ('93100891'
--           ,NULL
--           ,'40027690'
--           ,400502
--           ,467004
--           ,NULL
--           ,NULL
--           ,1727
--           ,7932
--           ,0
--           ,'5636888'
--           ,'8116733'
--           ,771
--           ,NULL
--           ,NULL
--           ,getdate()
--           ,'EUROPE\ealevchenko'
--           ,NULL
--           ,NULL
--           ,0
--           ,'2024-06-16 11:20:00.000'
--           ,'2024-06-22 00:00:00.000'
--           ,'2024-06-22 11:55:00.000'
--           ,'2024-06-22 01:37:00.000'
--           ,'2024-06-22 15:15:00.000')
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
--           (727136
--           ,61239257
--           ,315697
--           ,1785618
--           ,4
--           ,NULL
--           ,70
--           ,NULL
--           ,23800
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
--           ,NULL
--           ,199969)
--GO