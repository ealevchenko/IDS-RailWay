/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT count(id) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_way] =105 and [way_end] is null