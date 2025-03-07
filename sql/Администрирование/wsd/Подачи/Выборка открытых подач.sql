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
  where [end_filing] is null or [close] is null

  SELECT 
		wf.id as id_filing
        ,wf.[num_filing] as filing_num_filing
      ,wf.[type_filing] as filing_type_filing
      ,wf.[id_division] as filing_id_division
      ,wf.[vesg] as filing_vesg
      ,wf.[note] as filing_note
      ,wf.[start_filing] as filing_start_filing
      ,wf.[end_filing] as filing_end_filing
      ,wf.[doc_received] as filing_doc_received
      ,wf.[create] as filing_create
      ,wf.[create_user] as filing_create_user
      ,wf.[change] as filing_change
      ,wf.[change_user] as filing_change_user
      ,wf.[close] as filing_close
      ,wf.[close_user] as filing_close_user
	  ,wir.id as id_wir
	  ,wir.num 
	  ,wim.[id] as id_wim
      ,wim.[id_station] as wim_id_station
      ,wim.[id_way] as wim_id_way
      ,wim.[way_start] as wim_way_start
      ,wim.[way_end] as wim_way_end
      ,wim.[id_outer_way] as wim_id_outer_way
      ,wim.[outer_way_start] as wim_outer_way_start
      ,wim.[outer_way_end] as wim_outer_way_end
      ,wim.[position] as wim_position
      ,wim.[note] as wim_note
      ,wim.[create] as wim_create
      ,wim.[create_user] as wim_create_user
      ,wim.[close] as wim_close
      ,wim.[close_user] as wim_close_user
      ,wim.[parent_id] as wim_parent_id
      ,wim.[id_wio] as wim_id_wio
      ,wim.[num_sostav] as wim_num_sostav
      ,wim.[filing_start] as wim_filing_start
      ,wim.[filing_end] as wim_filing_end
      ,wim.[id_filing] as wim_id_filing
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
	INNER JOIN IDS.WagonInternalRoutes as wir ON wir.id =  wim.id_wagon_internal_routes
	INNER JOIN [IDS].[WagonFiling] as wf ON wf.id = wim.[id_filing]
where wim.[id_filing] in (select id FROM [KRR-PA-CNT-Railway].[IDS].[WagonFiling] where [end_filing] is null or [close] is null)
order by wf.id
		--> Текущее внетренее перемещение
		 