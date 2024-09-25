use [KRR-PA-CNT-Railway]

SELECT N'Прибывшие составы по которым нет вагонов'
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
  where id not in (SELECT[id_arrival] FROM [IDS].[ArrivalCars])
SELECT N'Документы на вагоны по котоым ссылаются пустые составы'
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
  FROM [IDS].[Arrival_UZ_Vagon]
  where [id_arrival] in (SELECT [id] FROM [IDS].[ArrivalSostav] where id not in (SELECT[id_arrival] FROM [IDS].[ArrivalCars]))
SELECT N'Информация документ на состав на который ссылается документы на вагоны по котоым ссылаются пустые составы'
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
  FROM [IDS].[Arrival_UZ_Document]
  where id in (SELECT [id_document] FROM [IDS].[Arrival_UZ_Vagon] where [id_arrival] in (SELECT [id] FROM [IDS].[ArrivalSostav] where id not in (SELECT[id_arrival] FROM [IDS].[ArrivalCars])))
SELECT N'Информация документ на состав на который ссылается документы на вагоны по котоым ссылаются пустые составы'
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
  FROM [IDS].[Arrival_UZ_Vagon]
  where [id_document] in (SELECT [id_document] FROM [IDS].[Arrival_UZ_Vagon] where [id_arrival] in (SELECT [id] FROM [IDS].[ArrivalSostav] where id not in (SELECT[id_arrival] FROM [IDS].[ArrivalCars])))

  
if OBJECT_ID('tempdb..#IDArrivalSostav') is not null drop table #IDArrivalSostav
CREATE TABLE [#IDArrivalSostav]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('tempdb..#IDArrivalUZVagon') is not null drop table #IDArrivalUZVagon
CREATE TABLE [#IDArrivalUZVagon]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('tempdb..#IDArrivalUZDocument') is not null drop table #IDArrivalUZDocument
CREATE TABLE [#IDArrivalUZDocument]( [id] [bigint] NOT NULL ) ON [PRIMARY]


insert into #IDArrivalSostav
select id FROM [IDS].[ArrivalSostav]
where id not in (SELECT[id_arrival] FROM [IDS].[ArrivalCars])

insert into #IDArrivalUZVagon
select id FROM [IDS].[Arrival_UZ_Vagon]
where [id_arrival] in (SELECT [id] FROM [IDS].[ArrivalSostav] where id not in (SELECT[id_arrival] FROM [IDS].[ArrivalCars]))

insert into #IDArrivalUZDocument
SELECT id FROM [IDS].[Arrival_UZ_Document]
where id in (SELECT [id_document] FROM [IDS].[Arrival_UZ_Vagon] where [id_arrival] in (SELECT [id] FROM [IDS].[ArrivalSostav] where id not in (SELECT[id_arrival] FROM [IDS].[ArrivalCars])))


BEGIN TRY
BEGIN TRANSACTION;
print('---============== START ===============---')
print('---============== INSERT ===============---')
    select count(id) as 'IDArrivalSostav' from [#IDArrivalSostav]	
	select count(id) as 'IDArrivalUZVagon' from [#IDArrivalUZVagon]
	select count(id) as 'IDArrivalUZDocument' from [#IDArrivalUZDocument]
print('---==============START DELETE  ===============---')
----------------------------------------------------
--> (Arrival_UZ_Cont_Pay)
	PRINT N'Удалить Arrival_UZ_Cont_Pay'
	delete FROM [IDS].[Arrival_UZ_Cont_Pay]
	where [id_cont] in (SELECT id FROM [IDS].[Arrival_UZ_Vagon_Cont] where [id_vagon] in (SELECT id FROM [#IDArrivalUZVagon]))
--> Arrival_UZ_Vagon_Cont
	PRINT N'Удалить Arrival_UZ_Vagon_Cont'
	delete FROM [IDS].[Arrival_UZ_Vagon_Cont]
	where [id_vagon] in (SELECT id FROM [#IDArrivalUZVagon])
-->Arrival_UZ_Vagon_Acts
	PRINT N'Удалить Arrival_UZ_Vagon_Acts'
	delete FROM [IDS].[Arrival_UZ_Vagon_Acts]
	where [id_vagon] in (SELECT id FROM [#IDArrivalUZVagon])
--> Arrival_UZ_Vagon_Pay
	PRINT N'Удалить Arrival_UZ_Vagon_Pay'
	delete FROM [IDS].[Arrival_UZ_Vagon_Pay]
	where [id_vagon] in (SELECT id FROM [#IDArrivalUZVagon])
--> Arrival_UZ_Vagon

	PRINT N'Удалить Arrival_UZ_Vagon'
	delete FROM [IDS].[Arrival_UZ_Vagon]
	where [id] in (SELECT id FROM [#IDArrivalUZVagon])

	PRINT N'Удалить ArrivalSostav'
	delete FROM [IDS].[ArrivalSostav] where id in(SELECT id FROM #IDArrivalSostav) 

--> Arrival_UZ_Document_Acts
	PRINT N'Удалить Arrival_UZ_Document_Acts'
	delete FROM [IDS].[Arrival_UZ_Document_Acts]
	where [id_document] in (SELECT id FROM [#IDArrivalUZDocument])
--> Arrival_UZ_Document_Docs
	PRINT N'Удалить Arrival_UZ_Document_Docs'
	delete 	FROM [IDS].[Arrival_UZ_Document_Docs]
	where [id_document] in (SELECT id FROM [#IDArrivalUZDocument])
--> Arrival_UZ_Document_Pay
	PRINT N'Удалить Arrival_UZ_Document_Pay'
	delete FROM [IDS].[Arrival_UZ_Document_Pay]
	where [id_document] in (SELECT id FROM [#IDArrivalUZDocument])
--> Arrival_UZ_Document
	PRINT N'Удалить Arrival_UZ_Document'
	delete FROM [IDS].[Arrival_UZ_Document]
	where id in (SELECT id FROM [#IDArrivalUZDocument])

	COMMIT TRANSACTION;
    PRINT N'ДАННЫЕ УСПЕШНО ОБНОВЛЕННЫ!'
END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION;
    PRINT N'ОШИБКА ' + CONVERT(VARCHAR, ERROR_NUMBER()) + ':' + ERROR_MESSAGE()
END CATCH