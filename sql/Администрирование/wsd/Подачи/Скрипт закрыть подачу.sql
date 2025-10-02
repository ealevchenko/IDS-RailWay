use [KRR-PA-CNT-Railway]
declare @id int = 162885 --  162952                                                                                                                    
 select max([filing_end])  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_filing] = @id
declare @date_close datetime = (select max([filing_end])  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_filing] = @id)
--declare @date_close datetime = '2025-07-05 13:45:00.000'
declare @date_start datetime = '2025-09-21 11:20:00.000';
declare @date_end datetime = '2025-09-21 13:50:00.000';

--=====================================================================================================
--> Удалить вагон с подачи (!!! смотри WagonInternalMoveCargo там ссызка на wim + ссылка на операцию)
--UPDATE [IDS].[WagonInternalMovement]
--	SET [id_filing] = null,
--	[filing_start] = null,
--	[filing_end] = null
--where [id_filing] = @id
--=====================================================================================================
--> Удалить вагоны с подачи (!!! даты начало иконца +смотри WagonInternalMoveCargo там ссызка на wim + ссылка на операцию)
--UPDATE [IDS].[WagonInternalMovement]
--	SET [id_filing] = null
--where [id] in (13297453,13297454,13297455,13297456,13297457)
--=====================================================================================================
-->!!!!! -->ИСПРАВИТЬ ЦЕХ ПО И ПОГРУЗКИ
	--update [IDS].[WagonInternalMoveCargo]
	--set [id_division_from] = 64
	--where [id_wim_load] in (select [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]  where [id_filing] = @id)

	--UPDATE [IDS].[WagonFiling]
	--   SET [id_division] = 64
	-- WHERE [id] = @id
--=====================================================================================================
-->!!!! ЗАКРЫТЬ ПОДАЧУ
--UPDATE [IDS].[WagonFiling]
--   SET [end_filing] = @date_close
--	  --,[doc_received] = @date_close
--      ,[close] = @date_close
--      ,[close_user] = 'EUROPE\ealevchenko'
-- WHERE [id] = @id

--13	Выгрузка с УЗ	
--14	Выгрузка В/З	
--15	Погрузка на УЗ	
--16	Погрузка В/З	
--17	Очистка	
--18	Обработка

-->!!!!! Исправить операцию (НЕЗАБЫВАЙ ПРАВИТЬ СТАТУС !!!!!)
--UPDATE [IDS].[WagonInternalOperation]
--   SET [id_operation] = 15
-- where id in (select [id_wio] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_filing] = @id)

---->!!!!! Исправить цех получатель
	--update [IDS].[WagonInternalMoveCargo]
	--set [id_division_on] = 84
	--where [id_wim_load] in (select [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]  where [id_filing] = @id)

---->!!!!! Исправить станции отпраки и прибытия
	--update [IDS].[WagonInternalMoveCargo]
	--set 
	--[id_station_from_amkr] = 28
	----,	
	----[id_station_on_amkr] = 30
	--where [id_wim_load] in (select [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]  where [id_filing] = @id)

-->!!!!! Исправить цех получатель
	--update [IDS].[WagonInternalMoveCargo]
	--set [id_internal_cargo] = 234
	--where [id_wim_load] in (select [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]  where [id_filing] = @id)

-->!!!!! Исправить Внешнюю станцию назначения
	--UPDATE [IDS].[WagonInternalMoveCargo]
	--SET [code_external_station] = 13538
	--where [id_wim_load] in (select [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]  where [id_filing] = @id)

-->!!!!! Исправить время начала и конца
--UPDATE [IDS].[WagonInternalOperation]
--   SET	[operation_start] = @date_start
--		,[operation_end] = @date_end
-- where id in (select [id_wio] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_filing] = @id)

--UPDATE [IDS].[WagonInternalMovement]
--	SET [filing_start] = @date_start
--		,[filing_end] = @date_end
--where [id_filing] = @id 

--UPDATE [IDS].[WagonFiling]
--   SET [start_filing] = @date_start
--		,[end_filing] = @date_end
-- WHERE [id] = @id

	SELECT N'=================WF==========================='
	SELECT TOP (1000) [id]
		  ,[num_filing]
		  ,[type_filing]
		  ,[id_division]
		  ,[vesg]
		  ,[note]
		  ,[start_filing]
		  ,[end_filing]
		  ,[doc_received]
		  ,[create]
		  ,[create_user]
		  ,[change]
		  ,[change_user]
		  ,[close]
		  ,[close_user]
	  FROM [KRR-PA-CNT-Railway].[IDS].[WagonFiling]
	  where [id] = @id
	SELECT N'=================WIR==========================='
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
		  ,[note2]
	  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
	  where id in (SELECT [id_wagon_internal_routes] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_filing] = @id)
	  order by id 
	SELECT N'=================WIM==========================='
	SELECT TOP (1000) [id]
		  ,[id_wagon_internal_routes]
		  ,[id_station]
		  ,[id_way]
		  ,[way_start]
		  ,[way_end]
		  ,[id_outer_way]
		  ,[outer_way_start]
		  ,[outer_way_end]
		  ,[position]
		  ,[note]
		  ,[create]
		  ,[create_user]
		  ,[close]
		  ,[close_user]
		  ,[parent_id]
		  ,[id_wio]
		  ,[num_sostav]
		  ,[filing_start]
		  ,[filing_end]
		  ,[id_filing]
	  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]
	  where [id_filing] = @id
	  order by [id_wagon_internal_routes]

	SELECT N'=================WIO==========================='
	SELECT TOP (1000) [id]
		  ,[id_wagon_internal_routes]
		  ,[id_operation]
		  ,[operation_start]
		  ,[operation_end]
		  ,[id_condition]
		  ,[id_loading_status]
		  ,[locomotive1]
		  ,[locomotive2]
		  ,[note]
		  ,[create]
		  ,[create_user]
		  ,[close]
		  ,[close_user]
		  ,[parent_id]
		  ,[con_change]
		  ,[con_change_user]
		  ,[id_organization_service]
	  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation]
	  where id in (select [id_wio] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_filing] = @id)
	SELECT N'=================WagonInternalMoveCargo==========================='
	SELECT [id]
      ,[id_wagon_internal_routes]
      ,[internal_doc_num]
      ,[id_weighing_num]
      ,[doc_received]
      ,[id_cargo]
      ,[id_internal_cargo]
      ,[empty]
      ,[vesg]
      ,[id_station_from_amkr]
      ,[id_division_from]
      ,[id_wim_load]
      ,[id_wim_redirection]
      ,[code_external_station]
      ,[id_station_on_amkr]
      ,[id_division_on]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[close]
      ,[close_user]
      ,[parent_id]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMoveCargo]
  where [id_wim_load] in (select [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]  where [id_filing] = @id)
  order by [id_wagon_internal_routes]
	
	
	SELECT [id]
      ,[id_wagon_internal_routes]
      ,[internal_doc_num]
      ,[id_weighing_num]
      ,[doc_received]
      ,[id_cargo]
      ,[id_internal_cargo]
      ,[empty]
      ,[vesg]
      ,[id_station_from_amkr]
      ,[id_division_from]
      ,[id_wim_load]
      ,[id_wim_redirection]
      ,[code_external_station]
      ,[id_station_on_amkr]
      ,[id_division_on]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[close]
      ,[close_user]
      ,[parent_id]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMoveCargo]
  where [id_wagon_internal_routes] in (select [id_wagon_internal_routes] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_filing] = @id ) --and [close] is null
  order by [id_wagon_internal_routes], [id] desc
