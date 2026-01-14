use [KRR-PA-CNT-Railway]

declare @nom_main_doc int = 40502239


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
      ,[code_payer_local]
      ,[tariff_contract]
      ,[calc_payer]
      ,[calc_payer_user]
  FROM [IDS].[Arrival_UZ_Document]
  where [nom_main_doc] = @nom_main_doc

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
  FROM  [IDS].[Arrival_UZ_Vagon]
  where [id_document] = (select top(1) id FROM [IDS].[Arrival_UZ_Document]  where [nom_main_doc] = @nom_main_doc order by 1 desc)

  declare @id_document bigint = 919500
  declare @num int = 64907751
  declare @vesg int = 68140

 -- UPDATE [IDS].[Arrival_UZ_Document]
 --  SET [code_stn_from] = 424206
 --     --,[code_stn_to] = <code_stn_to, int,>
 --     --,[code_border_checkpoint] = <code_border_checkpoint, int,>
 --     --,[cross_time] = <cross_time, datetime,>
 --     ,[code_shipper] = 1100
 --     --,[code_consignee] = <code_consignee, int,>
 --     --,[klient] = <klient, bit,>
 --     ,[code_payer_sender] = 8376488
 --     --,[code_payer_arrival] = <code_payer_arrival, nvarchar(20),>
 --     ,[distance_way] = 954
 --WHERE id = @id_document

 --UPDATE [IDS].[Arrival_UZ_Vagon]
 --  SET [vesg] = @vesg
 --    -- ,[id_certification_data] = <id_certification_data, int,>
 --WHERE [id_document]=@id_document and num =@num;

 --,62388541,60454089,63893333,63480545,53093316