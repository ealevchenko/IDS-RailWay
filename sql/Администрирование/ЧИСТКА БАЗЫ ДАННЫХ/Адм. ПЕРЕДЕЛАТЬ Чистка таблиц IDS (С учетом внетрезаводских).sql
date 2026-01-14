use [KRR-PA-CNT-Railway]
declare @date datetime = '2022-01-01 00:00:00';

print('---============== Start ===============---')

if OBJECT_ID('#[NUMS]','U') is null drop table [#NUMS]
CREATE TABLE [#NUMS]( [num] [bigint] NOT NULL ) ON [PRIMARY]

--> временные таблицы ID 
if OBJECT_ID('#IDOutgoingSostav','U') is null drop table #IDOutgoingSostav
CREATE TABLE [#IDOutgoingSostav]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#IDOutgoingCars','U') is null drop table #IDOutgoingCars
CREATE TABLE [#IDOutgoingCars]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#IDOutgoingUzVagon','U') is null drop table #IDOutgoingUzVagon
CREATE TABLE [#IDOutgoingUzVagon]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#IDOutgoingUZDocument','U') is null drop table #IDOutgoingUZDocument
CREATE TABLE [#IDOutgoingUZDocument]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#IDWIR','U') is null drop table #IDWIR
CREATE TABLE [#IDWIR]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#IDArrivalSostav','U') is null drop table #IDArrivalSostav
CREATE TABLE [#IDArrivalSostav]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#IDArrivalCars','U') is null drop table #IDArrivalCars
CREATE TABLE [#IDArrivalCars]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#IDArrivalUZVagon','U') is null drop table #IDArrivalUZVagon
CREATE TABLE [#IDArrivalUZVagon]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#IDArrivalUZDocument','U') is null drop table #IDArrivalUZDocument
CREATE TABLE [#IDArrivalUZDocument]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#IDSapIncomingSupply','U') is null drop table #IDSapIncomingSupply
CREATE TABLE [#IDSapIncomingSupply]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#[IDSapOutboundSupply]','U') is null drop table #IDSapOutboundSupply
CREATE TABLE [#IDSapOutboundSupply]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#IDUsageFee','U') is null drop table #IDUsageFee
CREATE TABLE [#IDUsageFee]( [id] [bigint] NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#NumDoc','U') is null drop table #NumDoc
CREATE TABLE [#NumDoc]( [id_doc_uz] [nvarchar](50) NOT NULL ) ON [PRIMARY]

if OBJECT_ID('#NumDocOut','U') is null drop table #NumDocOut
CREATE TABLE [#NumDocOut]( [num_doc] [nvarchar](50) NOT NULL ) ON [PRIMARY]

print('--===== Start insert ======--')

	--> ¬агоны внутрезаводские
	INSERT INTO [#NUMS]
	SELECT distinct(wag_rent.[num]) FROM [IDS].[Directory_WagonsRent] as wag_rent 
	Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as wgroup ON wgroup.[id_operator] = wag_rent.id_operator
	where wag_rent.[rent_start] is not null and wag_rent.[rent_end] is null and wgroup.[group] = 'amkr_vz'

	INSERT INTO [#IDWIR]
	SELECT wir.[id] FROM [IDS].[WagonInternalRoutes] as wir 
	Left JOIN [IDS].[ArrivalCars] as arr_car ON arr_car.[id] = wir.id_arrival_car
	Left JOIN [IDS].[ArrivalSostav] as arr_sost ON arr_sost.[id] = arr_car.id_arrival
	where ((arr_sost.[date_adoption] < @date) OR (arr_sost.[date_adoption] is null and arr_sost.[date_arrival] < @date)) and not (wir.num in (select num from [#NUMS]) and [id_outgoing_car] is null and [close] is null)

	INSERT INTO [#IDArrivalCars]
	SELECT distinct ([id_arrival_car]) FROM [IDS].[WagonInternalRoutes] where id in (SELECT id FROM [#IDWIR]) and [id_arrival_car] is not null
	
	INSERT INTO [#IDArrivalSostav]
	SELECT distinct ([id_arrival]) FROM [IDS].[ArrivalCars] where id in (SELECT id FROM [#IDArrivalCars]) and [id_arrival] is not null

	INSERT INTO [#IDOutgoingCars]
	SELECT distinct ([id_outgoing_car]) FROM [IDS].[WagonInternalRoutes] where id in (SELECT id FROM [#IDWIR]) and [id_outgoing_car] is not null
	
	INSERT INTO [#IDOutgoingSostav]
	SELECT distinct ([id_outgoing]) FROM [IDS].[OutgoingCars] where id in (SELECT id FROM [#IDOutgoingCars]) and [id_outgoing] is not null

	INSERT INTO [#IDSapIncomingSupply]
	SELECT distinct ([id_sap_incoming_supply]) FROM [IDS].[WagonInternalRoutes] where id in (SELECT id FROM #IDWIR) and [id_sap_incoming_supply] is not null
  
	INSERT INTO [#IDSapOutboundSupply]
	SELECT distinct ([id_sap_outbound_supply]) FROM [IDS].[WagonInternalRoutes] where id in (SELECT id FROM #IDWIR) and [id_sap_outbound_supply] is not null

	INSERT INTO [#IDArrivalUZVagon]
	SELECT distinct ([id_arrival_uz_vagon]) FROM [IDS].[ArrivalCars] where [id] in (SELECT id FROM [#IDArrivalCars]) and [id_arrival_uz_vagon] is not null

	INSERT INTO [#IDArrivalUZDocument]
	SELECT distinct ([id_document]) FROM [IDS].[Arrival_UZ_Vagon] where [id] in (SELECT id FROM [#IDArrivalUZVagon]) and [id_document] is not null

	INSERT INTO [#IDOutgoingUzVagon]
	SELECT distinct ([id_outgoing_uz_vagon]) FROM [IDS].[OutgoingCars] where [id] in (select id from [#IDOutgoingCars]) and [id_outgoing_uz_vagon] is not null

	INSERT INTO [#IDOutgoingUZDocument]
	SELECT distinct ([id_document]) FROM [IDS].[Outgoing_UZ_Vagon] where id in (SELECT [id] FROM [#IDOutgoingUzVagon]) and [id_document] is not null

	--INSERT INTO [#IDUsageFee]
	--SELECT distinct ([id_usage_fee]) FROM [IDS].[WagonInternalRoutes] where id in (SELECT id FROM #IDWIR) and [id_usage_fee] is not null

	INSERT INTO [#NumDoc]
	SELECT distinct ([id_doc_uz]) FROM [IDS].[Arrival_UZ_Document] where id in (Select id from [#IDArrivalUZDocument]) and [id_doc_uz] is not null

	INSERT INTO [#NumDocOut]
	SELECT distinct ([num_doc]) FROM [IDS].[OutgoingCars] where id in (Select id from [#IDOutgoingCars]) and [num_doc] is not null

--+=================================================
--select * from [#NUMS]
--select * from [#IDWIR]
--select * from [#IDArrivalCars]
--select * from [#IDArrivalSostav]
--select * from [#IDOutgoingCars]
select * from [#IDOutgoingSostav]
--select * from [#IDSapIncomingSupply]
--select * from [#IDSapOutboundSupply]
--select * from [#IDArrivalUZVagon]
--select * from [#IDArrivalUZDocument]
--select * from [#IDOutgoingUzVagon]
--select * from [#IDOutgoingUZDocument]
--select * from [#IDUsageFee]
--select * from [#NumDoc]
--select * from [#NumDocOut]
--+=================================================
SELECT max([create]) as 'max', min([create]) as 'min' FROM [IDS].[WagonInternalRoutes] where id in (SELECT id FROM #IDWIR)
SELECT max([date_arrival]) as 'max', min([date_arrival]) as 'min' FROM [IDS].[ArrivalSostav] where id in (SELECT id FROM [#IDArrivalSostav])
SELECT max([date_outgoing]) as 'max', min([date_outgoing]) as 'min' FROM [IDS].[OutgoingSostav] where id in (SELECT id FROM [#IDOutgoingSostav])
SELECT * FROM [IDS].[OutgoingSostav] where id in (SELECT id FROM [#IDOutgoingSostav]) order by [date_outgoing] desc

--SELECT wir.[id]
--      ,wir.[num]
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
--      ,wir.[highlight_color]
--      ,wir.[id_usage_fee]
--	  ,arr_sost.[date_adoption]
--	  ,arr_sost.[date_arrival]
--  FROM [IDS].[WagonInternalRoutes] as wir 
--  Left JOIN [IDS].[ArrivalCars] as arr_car ON arr_car.[id] = wir.id_arrival_car
--  Left JOIN [IDS].[ArrivalSostav] as arr_sost ON arr_sost.[id] = arr_car.id_arrival
--  where ((arr_sost.[date_adoption] < @date) OR (arr_sost.[date_adoption] is null and arr_sost.[date_arrival] < @date)) and not (wir.num in (select num from [#NUMS]) and [id_outgoing_car] is null and [close] is null)
  
  --and (not wir.[num] in (select num from [#NUMS]))
  --order by arr_sost.[date_adoption] desc 
  --order by wir.[num] 