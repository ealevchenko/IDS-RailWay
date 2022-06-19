/****** Script for SelectTopNRows command from SSMS  ******/
declare @id_arrival_car1 int = 1283485--1283484--1283802;
declare @id_arrival_car2 int = 1283803;

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
  FROM [KRR-PA-Test-Railway].[IDS].[ArrivalCars]
  where [id] in (@id_arrival_car1,@id_arrival_car2)
  /****** Script for SelectTopNRows command from SSMS  ******/
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
  FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Vagon]
  where [id] in (select [id_arrival_uz_vagon]  FROM [KRR-PA-Test-Railway].[IDS].[ArrivalCars] where [id] in (@id_arrival_car1,@id_arrival_car2))

  /****** Script for SelectTopNRows command from SSMS  ******/
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
  FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Document]
  where id in (select [id_document] FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Vagon] where [id] in (select [id_arrival_uz_vagon]  FROM [KRR-PA-Test-Railway].[IDS].[ArrivalCars] where [id] in (@id_arrival_car1,@id_arrival_car2)))




  declare @id_doc_main int = (select [parent_id] FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Document] where id in (select [id_document] FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Vagon] where [id] in (select [id_arrival_uz_vagon]  FROM [KRR-PA-Test-Railway].[IDS].[ArrivalCars] where [id] in (@id_arrival_car1,@id_arrival_car2))));

  /****** Script for SelectTopNRows command from SSMS  ******/
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
  FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Document]
  where id = @id_doc_main

  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT * FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Document_Acts] where id_document = @id_doc_main
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT * FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Document_Acts] where id_document = 296582

  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT * FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Document_Docs] where id_document = @id_doc_main
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT * FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Document_Docs] where id_document = 296582
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT * FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Document_Pay] where id_document = @id_doc_main
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT * FROM [KRR-PA-Test-Railway].[IDS].[Arrival_UZ_Document_Pay] where id_document = 296582