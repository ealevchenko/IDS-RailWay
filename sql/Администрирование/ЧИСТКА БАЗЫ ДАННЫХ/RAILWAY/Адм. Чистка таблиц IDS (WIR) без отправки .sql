--use [KRR-PA-CNT-Railway-Archive]
use [KRR-PA-CNT-Railway]
declare @date datetime = '2023-01-01 00:00:00';

BEGIN TRY
BEGIN TRANSACTION;
print('---============== START ===============---')

if OBJECT_ID('tempdb..#IDWIR') is not null drop table #IDWIR
CREATE TABLE [#IDWIR]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('tempdb..#IDArrivalCars') is not null drop table #IDArrivalCars
CREATE TABLE [#IDArrivalCars]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('tempdb..#IDArrivalCars_delete') is not null drop table #IDArrivalCars_delete
CREATE TABLE [#IDArrivalCars_delete]( [id] [bigint] NOT NULL ) ON [PRIMARY]


if OBJECT_ID('tempdb..#IDArrivalSostav') is not null drop table #IDArrivalSostav
CREATE TABLE [#IDArrivalSostav]( [id] [bigint] NOT NULL ) ON [PRIMARY]
if OBJECT_ID('tempdb..#IDArrivalSostav_delete') is not null drop table #IDArrivalSostav_delete
CREATE TABLE [#IDArrivalSostav_delete]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('tempdb..#IDArrivalUZVagon') is not null drop table #IDArrivalUZVagon
CREATE TABLE [#IDArrivalUZVagon]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('tempdb..#IDArrivalUZDocument') is not null drop table #IDArrivalUZDocument
CREATE TABLE [#IDArrivalUZDocument]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('tempdb..#IDArrivalUZDocument_delete') is not null drop table #IDArrivalUZDocument_delete
CREATE TABLE [#IDArrivalUZDocument_delete]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('tempdb..#IDSapIncomingSupply') is not null drop table #IDSapIncomingSupply
CREATE TABLE [#IDSapIncomingSupply]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('tempdb..#IDUsageFee') is not null drop table #IDUsageFee
CREATE TABLE [#IDUsageFee]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('tempdb..#NumDoc') is not null drop table #NumDoc
CREATE TABLE [#NumDoc]( [id_doc_uz] [nvarchar](50) NOT NULL ) ON [PRIMARY]

if OBJECT_ID('tempdb..#NumDoc_delete') is not null drop table #NumDoc_delete
CREATE TABLE [#NumDoc_delete]( [id_doc_uz] [nvarchar](50) NOT NULL ) ON [PRIMARY]

print('---============== INSERT ===============---')

	--> Добавил все отправленные или со статусом в работе но закрытые WIR
	PRINT N'Добавим IDWIR'
	INSERT INTO #IDWIR
	SELECT wir.[id]
	FROM [IDS].[WagonInternalRoutes] as wir
  		--> Прибытие вагона
	Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
	Left JOIN IDS.[ArrivalSostav] as arr_sost ON arr_car.[id_arrival] = arr_sost.id
	where wir.[close] is not null and wir.[id_outgoing_car] is null and arr_sost.[date_adoption] < @date
	order by arr_sost.[date_adoption] desc
	
	--1
	PRINT N'Добавим IDArrivalCars'
	INSERT INTO #IDArrivalCars
	SELECT distinct ([id_arrival_car]) FROM [IDS].[WagonInternalRoutes] WHERE ([id] in (SELECT [id] FROM [#IDWIR])) AND [id_arrival_car] is not null
	--2
	--PRINT N'Добавим IDArrivalUZVagon'
	--INSERT INTO #IDArrivalUZVagon
	--SELECT distinct ([id_arrival_uz_vagon]) FROM [IDS].[ArrivalCars] WHERE ([id] in (SELECT [id] FROM #IDArrivalCars)) AND [id_arrival_uz_vagon] is not null

	--PRINT N'Добавим IDArrivalSostav'
	--INSERT INTO #IDArrivalSostav
	--SELECT distinct ([id_arrival]) FROM [IDS].[ArrivalCars] WHERE ([id] in (SELECT [id] FROM #IDArrivalCars)) AND [id_arrival] is not null
	
	PRINT N'Добавим IDSapIncomingSupply'
	INSERT INTO #IDSapIncomingSupply	
	SELECT distinct (id) FROM [IDS].[SAPIncomingSupply]	where id_arrival_car in (SELECT id FROM #IDArrivalCars) and id is not null

	--PRINT N'Добавим IDArrivalUZDocument'
	--INSERT INTO [#IDArrivalUZDocument]
	--SELECT distinct ([id_document]) FROM [IDS].[Arrival_UZ_Vagon] where [id] in (SELECT id FROM #IDArrivalUZVagon) and [id_document] is not null
	
	--PRINT N'Добавим #NumDoc'
	--INSERT INTO [#NumDoc]
	--SELECT distinct ([id_doc_uz]) FROM [IDS].[Arrival_UZ_Document] where id in (Select id from [#IDArrivalUZDocument]) and [id_doc_uz] is not null

	--select * from [#NUMS]
	select count(id) as 'IDWIR' from [#IDWIR]
	select count(id) as 'IDArrivalCars'  from [#IDArrivalCars]
	select count(id) as 'IDSapIncomingSupply'  from [#IDSapIncomingSupply]

	--select count(id) as 'IDArrivalUZVagon' from [#IDArrivalUZVagon]
	--select count(id) as 'IDArrivalSostav' from [#IDArrivalSostav]
	--select count(id) as 'IDArrivalUZVagon' from [#IDArrivalUZVagon]
	--select count(id) as 'IDArrivalUZDocument' from [#IDArrivalUZDocument]
	--select count(id) as 'IDUsageFee' from [#IDUsageFee]
	--select count([id_doc_uz]) as 'NumDoc' from [#NumDoc]

print('---==============START DELETE  ===============---')
---------------------- Удалить WIR.. --------------------------------
print('---------Start delete WIR')
--> [WagonInternalMovement]
	PRINT N'Удалить WagonInternalMovement'
	delete
	FROM [IDS].[WagonInternalMovement]
	where [id_wagon_internal_routes] in (SELECT id FROM #IDWIR)
--> [WagonInternalOperation]
	PRINT N'Удалить WagonInternalOperation'
	delete
	FROM [IDS].[WagonInternalOperation]
	where [id_wagon_internal_routes] in (SELECT id FROM #IDWIR)
-- Обнулить ссылки WIR
	PRINT N'Сбросим ссылки [parent_id] WagonInternalRoutes'
	UPDATE [IDS].[WagonInternalRoutes]
	SET [parent_id] = NULL
	WHERE [parent_id] in (SELECT id FROM #IDWIR)
-- Удалить WIR
	PRINT N'Удалить WagonInternalRoutes'
	delete
	FROM [IDS].[WagonInternalRoutes] where id in (SELECT id FROM #IDWIR)
--> [WagonUsageFee]
	--PRINT N'Удалить WagonUsageFee'
	 ---- delete
	--FROM [IDS].[WagonUsageFee] 
	--where id in (SELECT id FROM #IDUsageFee)
---------------------- Удалить SAP --------------------------------

SELECT * FROM [IDS].[WagonInternalRoutes] where [id_sap_incoming_supply] in (SELECT id FROM #IDSapIncomingSupply);
UPDATE [IDS].[WagonInternalRoutes] SET [id_sap_incoming_supply] = null WHERE [id_sap_incoming_supply] in (SELECT id FROM #IDSapIncomingSupply);

print('---------Start delete SAP')
-->[SAPIncomingSupply]
	PRINT N'Удалить SAPIncomingSupply'
	delete
	FROM [IDS].[SAPIncomingSupply]
	where [id] in (SELECT id FROM #IDSapIncomingSupply)

--------------------- УДАЛИТЬ ПРИБЫТИЕ -------------------
print('---------Start delete Arrival')

	SELECT [id_arrival_car] FROM [IDS].[WagonInternalRoutes] where id_arrival_car in (SELECT id FROM [#IDArrivalCars]);

	PRINT N'Добавим IDArrivalCars_delete' 
	INSERT INTO #IDArrivalCars_delete
	SELECT [id] FROM [IDS].[ArrivalCars] where [id] in (SELECT id FROM [#IDArrivalCars]) and [id] not in (SELECT [id_arrival_car] FROM [IDS].[WagonInternalRoutes] where id_arrival_car in (SELECT id FROM [#IDArrivalCars]));

	--select count(id) as 'IDArrivalCars'  from [#IDArrivalCars]
	--select count(id) as 'IDArrivalCars_delete'  from [#IDArrivalCars_delete]

	PRINT N'Добавим IDArrivalUZVagon'
	INSERT INTO #IDArrivalUZVagon
	SELECT distinct ([id_arrival_uz_vagon]) FROM [IDS].[ArrivalCars] WHERE ([id] in (SELECT [id] FROM #IDArrivalCars_delete)) AND [id_arrival_uz_vagon] is not null

	PRINT N'Добавим IDArrivalSostav'
	INSERT INTO #IDArrivalSostav
	SELECT distinct ([id_arrival]) FROM [IDS].[ArrivalCars] WHERE ([id] in (SELECT [id] FROM #IDArrivalCars_delete)) AND [id_arrival] is not null
    
	PRINT N'Добавим IDArrivalUZDocument'
	INSERT INTO [#IDArrivalUZDocument]
	SELECT distinct ([id_document]) FROM [IDS].[Arrival_UZ_Vagon] where [id] in (SELECT id FROM #IDArrivalUZVagon) and [id_document] is not null
	
	PRINT N'Добавим #NumDoc'
	INSERT INTO [#NumDoc]
	SELECT distinct ([id_doc_uz]) FROM [IDS].[Arrival_UZ_Document] where id in (Select id from [#IDArrivalUZDocument]) and [id_doc_uz] is not null

	select count(id) as 'IDArrivalUZVagon' from [#IDArrivalUZVagon]
	select count(id) as 'IDArrivalSostav' from [#IDArrivalSostav]
	select count(id) as 'IDArrivalUZVagon' from [#IDArrivalUZVagon]
	select count(id) as 'IDArrivalUZDocument' from [#IDArrivalUZDocument]
	select count(id) as 'IDUsageFee' from [#IDUsageFee]
	select count([id_doc_uz]) as 'NumDoc' from [#NumDoc]

--> ArrivalCars
	PRINT N'Удалить ArrivalCars'
	delete
	FROM [IDS].[ArrivalCars]
	where [id] in (SELECT id FROM [#IDArrivalCars_delete])

----------------------------------------------------
--> (Arrival_UZ_Cont_Pay)
	PRINT N'Удалить Arrival_UZ_Cont_Pay'
	delete
	FROM [IDS].[Arrival_UZ_Cont_Pay]
	where [id_cont] in (SELECT id FROM [IDS].[Arrival_UZ_Vagon_Cont] where [id_vagon] in (SELECT id FROM [#IDArrivalUZVagon]))
--> Arrival_UZ_Vagon_Cont
	PRINT N'Удалить Arrival_UZ_Vagon_Cont'
	delete
	FROM [IDS].[Arrival_UZ_Vagon_Cont]
	where [id_vagon] in (SELECT id FROM [#IDArrivalUZVagon])
-->Arrival_UZ_Vagon_Acts
	PRINT N'Удалить Arrival_UZ_Vagon_Acts'
	delete
	FROM [IDS].[Arrival_UZ_Vagon_Acts]
	where [id_vagon] in (SELECT id FROM [#IDArrivalUZVagon])
--> Arrival_UZ_Vagon_Pay
	PRINT N'Удалить Arrival_UZ_Vagon_Pay'
	delete
	FROM [IDS].[Arrival_UZ_Vagon_Pay]
	where [id_vagon] in (SELECT id FROM [#IDArrivalUZVagon])
--> Arrival_UZ_Vagon

	--SELECT * FROM [IDS].[ArrivalCars] where [id_arrival_uz_vagon] in (SELECT id FROM [#IDArrivalUZVagon])
	PRINT N'Обновим сылки [id_arrival_uz_vagon] = null from [ArrivalCars]'
	UPDATE [IDS].[ArrivalCars] SET [id_arrival_uz_vagon] = null WHERE [id_arrival_uz_vagon] in (SELECT id FROM [#IDArrivalUZVagon])

	PRINT N'Удалить Arrival_UZ_Vagon'
	delete
	FROM [IDS].[Arrival_UZ_Vagon]
	where [id] in (SELECT id FROM [#IDArrivalUZVagon])

--> ArrivalSostav
	--select *, (SELECT count (id) FROM  [IDS].[ArrivalCars] as car where car.id_arrival =[id])
	--FROM [IDS].[ArrivalSostav]
	--where [id] in (SELECT id FROM [#IDArrivalSostav]) and (SELECT count (id) FROM  [IDS].[ArrivalCars] as car where car.id_arrival =[id]) = 0

	PRINT N'Определим и добавим IDArrivalSostav_delete'
	INSERT INTO #IDArrivalSostav_delete
	select distinct (sost1.[id]) FROM [IDS].[ArrivalSostav] as sost1 where sost1.[id] in (SELECT sost.id FROM [#IDArrivalSostav] as sost) and ((SELECT count (car.id) FROM  [IDS].[ArrivalCars] as car where car.id_arrival =sost1.[id]) = 0)
	and sost1.[id] not in (select id_arrival FROM [IDS].[Arrival_UZ_Vagon] where id_arrival in(SELECT id FROM #IDArrivalSostav))
	
	select count(id) as 'IDArrivalSostav_delete' from [#IDArrivalSostav_delete]

	--select distinct ([id_arrival]) from [IDS].[Arrival_UZ_Vagon] where id_arrival in(SELECT id FROM #IDArrivalSostav_delete) order by [id_arrival]
	--select id as 'IDArrivalSostav'   from #IDArrivalSostav_delete order by id

	PRINT N'Удалить ArrivalSostav'
	delete
	FROM [IDS].[ArrivalSostav] where id in(SELECT id FROM #IDArrivalSostav_delete) 

	PRINT N'Определим и добавим IDArrivalUZDocument_delete'
	INSERT INTO #IDArrivalUZDocument_delete
    select distinct (doc1.[id]) FROM [IDS].[Arrival_UZ_Document] as doc1 where doc1.[id] in (SELECT doc.id FROM [#IDArrivalUZDocument] as doc) and ((SELECT count (vag.id) FROM  [IDS].[Arrival_UZ_Vagon] as vag where vag.id_document =doc1.[id]) = 0)

	select count(id) as 'IDArrivalSostav_delete' from [#IDArrivalSostav_delete]

--> Arrival_UZ_Document_Acts
	PRINT N'Удалить Arrival_UZ_Document_Acts'
	delete
	FROM [IDS].[Arrival_UZ_Document_Acts]
	where [id_document] in (SELECT id FROM [#IDArrivalUZDocument_delete])
--> Arrival_UZ_Document_Docs
	PRINT N'Удалить Arrival_UZ_Document_Docs'
	delete
	FROM [IDS].[Arrival_UZ_Document_Docs]
	where [id_document] in (SELECT id FROM [#IDArrivalUZDocument_delete])
--> Arrival_UZ_Document_Pay
	PRINT N'Удалить Arrival_UZ_Document_Pay'
	delete
	FROM [IDS].[Arrival_UZ_Document_Pay]
	where [id_document] in (SELECT id FROM [#IDArrivalUZDocument_delete])
--> Arrival_UZ_Document
	PRINT N'Удалить Arrival_UZ_Document'
	delete
	FROM [IDS].[Arrival_UZ_Document]
	where id in (SELECT id FROM [#IDArrivalUZDocument_delete])
----------------------------------------------------
-- Удалим документы [UZ_DOC]
	PRINT N'Удалить [UZ_DOC]'

  --SELECT [num_doc]
  --FROM [IDS].[ArrivalCars]
  --where [num_doc] in (Select [id_doc_uz] from [#NumDoc]) 

	delete
	FROM [IDS].[UZ_DOC]
	Where [num_doc] in (Select [id_doc_uz] from [#NumDoc]) and [num_doc] not in (Select [id_doc_uz] from [#NumDoc]) 
	
	COMMIT TRANSACTION;
    PRINT N'ДАННЫЕ УСПЕШНО ОБНОВЛЕННЫ!'
END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION;
    PRINT N'ОШИБКА ' + CONVERT(VARCHAR, ERROR_NUMBER()) + ':' + ERROR_MESSAGE()
END CATCH

--SELECT wir.[id]
--      ,wir.[num]
--	  ,arr_sost.[date_arrival]
--      ,arr_sost.[date_adoption]
--      ,wir.[id_arrival_car]
--      ,wir.[id_sap_incoming_supply]
--      ,wir.[doc_outgoing_car]
--      ,wir.[id_outgoing_car]
--      ,wir.[id_sap_outbound_supply]
--      ,wir.[note]
--      ,wir.[create]
--      ,wir.[create_user]
--      ,wir.[close]
--      ,wir.[close_user]
--      ,wir.[parent_id]
--  FROM [IDS].[WagonInternalRoutes] as wir
--  		--> Прибытие вагона
--	Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
--	Left JOIN IDS.[ArrivalSostav] as arr_sost ON arr_car.[id_arrival] = arr_sost.id
--  where wir.[close] is not null and wir.[id_outgoing_car] is null and arr_sost.[date_adoption] < @date
--  order by arr_sost.[date_adoption] desc
