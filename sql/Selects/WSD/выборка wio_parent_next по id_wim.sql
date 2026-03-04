use [KRR-PA-CNT-Railway-Test]

select * from [IDS].[get_view_operation_parent_next](12691510)

SELECT 
	   wim.[id]
      ,wim.[id_filing]
	  --
      ,wio.[parent_id] as wio_parent_id
	  ,wio_parent.id_operation as wio_parent_id_operation
	  ,wio_parent.[operation_start] as wio_parent_operation_start
      ,wio_parent.[operation_end] as wio_parent_operation_end
	  --
	  ,wio.[id] as wio_id
	  ,wio.id_operation as wio_id_operation
      ,wio.[operation_start] as wio_operation_start
      ,wio.[operation_end] as wio_operation_end
	  --
      ,wio_next.id as wio_next_id  
      ,wio_next.id_operation as wio_next_id_operation  
	  ,wio_next.[operation_start] as wio_next_operation_start
      ,wio_next.[operation_end] as wio_next_operation_end
	  --into wio_operation
  FROM [IDS].[WagonInternalMovement]  as wim
  		--> Операция подачи		
		LEFT JOIN IDS.WagonInternalOperation as wio ON wio.id = wim.[id_wio]
  		--> Операция подачи		
		LEFT JOIN IDS.WagonInternalOperation as wio_parent ON wio_parent.id = wio.[parent_id]
  		--> Операция подачи		
		LEFT JOIN IDS.WagonInternalOperation as wio_next ON wio_next.[parent_id] = wio.id

  where wim.id in (12691510,12691511)

--SELECT 
--	   wim.[id]
--      ,wim.[id_wagon_internal_routes]
--      ,wim.[filing_start]
--      ,wim.[filing_end]
--      ,wim.[id_filing]
--	  ,wf.num_filing
--	  ,wf.[num_filing]
--      ,wf.[type_filing]
--      ,wf.[id_division]
--      ,wf.[vesg]
--      ,wf.[note]
--      ,wf.[start_filing]
--      ,wf.[end_filing]
--      ,wf.[doc_received]
--	  --
--      ,wio.[parent_id] as wio_parent_id
--	  ,wio_parent.id_operation as wio_parent_id_operation
--	  --> Предыдущая операция
--	  ,parent_dir_operation.[operation_name_ru] as parent_operation_name_ru
--	  ,parent_dir_operation.[operation_name_en] as parent_operation_name_en
--	  ,wio_parent.[operation_start] as wio_parent_operation_start
--      ,wio_parent.[operation_end] as wio_parent_operation_end
--	  --
--	  ,wio.[id] as wio_id
--	  ,wio.id_operation as wio_id_operation
--	  --> Текущая операция
--	  ,dir_operation.[operation_name_ru] as current_operation_name_ru
--	  ,dir_operation.[operation_name_en] as current_operation_name_en
--      ,wio.[operation_start] as wio_operation_start
--      ,wio.[operation_end] as wio_operation_end
--	  --
--      ,wio_next.id as wio_next_id  
--      ,wio_next.id_operation as wio_next_id_operation  
--	  --> Предыдущая операция
--	  ,next_dir_operation.[operation_name_ru] as next_operation_name_ru
--	  ,next_dir_operation.[operation_name_en] as next_operation_name_en
--	  ,wio_next.[operation_start] as wio_next_operation_start
--      ,wio_next.[operation_end] as wio_next_operation_end


--  FROM [IDS].[WagonInternalMovement]  as wim
--  		 --> Текущая подача 23.10.2024
--		 Left JOIN IDS.WagonFiling as wf ON wf.id = wim.id_filing
--  		--> Операция подачи		
--		LEFT JOIN IDS.WagonInternalOperation as wio ON wio.id = wim.[id_wio]
--  		--> Операция подачи		
--		LEFT JOIN IDS.WagonInternalOperation as wio_parent ON wio_parent.id = wio.[parent_id]
--  		--> Операция подачи		
--		LEFT JOIN IDS.WagonInternalOperation as wio_next ON wio_next.[parent_id] = wio.id

--		--> Справочник Операции над вагоном (текущая операция)
--		Left JOIN IDS.Directory_WagonOperations as dir_operation ON dir_operation.id = wio.id_operation
--		Left JOIN IDS.Directory_WagonOperations as parent_dir_operation ON parent_dir_operation.id = wio_parent.id_operation
--		Left JOIN IDS.Directory_WagonOperations as next_dir_operation ON next_dir_operation.id = wio_next.id_operation

--  where wim.id in (12691510,12691511)
