SELECT TOP (1000) [id]
      ,[id_document]
      ,[num]
      ,[id_outgoing]
      ,[id_car]
      ,[id_condition]
      ,[id_wagons_rent_arrival]
      ,[id_wagons_rent_outgoing]
      ,[id_countrys]
      ,[id_genus]
      ,[id_owner]
      ,[gruzp_uz]
      ,[tara_uz]
      ,[note_uz]
      ,[gruzp]
      ,[u_tara]
      ,[ves_tary_arc]
      ,[id_warehouse]
      ,[id_division]
      ,[laden]
      ,[id_cargo]
      ,[id_cargo_gng]
      ,[vesg]
      ,[code_stn_to]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon]
    where num=64167331
  order by 1 desc

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
  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Document]
  where id = 436537

 -- UPDATE [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon]
 --  SET [id_document] = 436537
 --     ,[gruzp] = 70.3
 --     ,[u_tara] = 23550
 --     ,[ves_tary_arc] = 23600
 --     ,[vesg] = 66450
 --WHERE id = 661079
GO

