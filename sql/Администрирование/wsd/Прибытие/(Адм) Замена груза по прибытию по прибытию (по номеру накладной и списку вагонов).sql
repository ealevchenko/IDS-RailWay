use [KRR-PA-CNT-Railway]
declare @num_doc int = 514;

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
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav]
  where [num_doc]=@num_doc
  order by 1 desc

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
  where [id_arrival] = (select top(1) id FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav] where [num_doc]=@num_doc order by 1 desc) and [position_arrival] is not null

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
  where id in (select [id_arrival_uz_vagon] FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] where [id_arrival] = (select top(1) id FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav] where [num_doc]=@num_doc order by 1 desc) and [position_arrival] is not null)
  and num in (63010037 )

  SELECT TOP (1000) [id]
      ,[id_group]
      ,[id_cargo_etsng]
      ,[cargo_name_ru]
      ,[cargo_name_en]
      ,[code_sap]
      ,[sending]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[id_out_group]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Cargo]

  -- !!!Выбраны документы
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
  where id in (63010037 )


--  UPDATE [IDS].[Arrival_UZ_Vagon]
--   SET [id_cargo] = 1
--      ,[id_cargo_gng] = null
-- WHERE id in (873255,873256,873257,873258,873259,873260,873261,873262,873263,873264,873265,873266,873267,873268,873269,873270,873271,873272,873273,873274,873275,873276,873277,873278,873279,873280,873281,873282,873283,873284,873285,873286,873287,873288,873289,873290,873291,873292,873293,873294,873295,873296,873297,873298,873299,873300,873301,873302,873303,873304,873305,873306,873307,873308,873309,873310,873311)
--GO

--UPDATE [IDS].[Arrival_UZ_Vagon]
--   SET [vesg] = 69400
----,[id_cargo] = 68
----,[id_cargo_gng] = 6
-- WHERE id in (1210028)
--GO

--UPDATE [IDS].[Arrival_UZ_Document]
--   SET[code_stn_from] = 394509
--      ,[code_stn_to] = 467004
--      ,[code_border_checkpoint] = 331800
--      ,[code_shipper] = 7122
--      ,[code_payer_sender] = '8141477'
--      ,[distance_way] = 837
-- where id in (842301,842302,842303,842304,842305,842306,842307,842308,842309,842310,842311,842312)
--GO
