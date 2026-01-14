/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT[num]
,[vesg]
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
  where id in (SELECT [id_arrival_uz_vagon]
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars]
  where [id_arrival]=242664 and [num] in (94814175,94741964,94656568,94727773,94707130,94813466,94707239,94700325,94515863,94794351,94746047,94812963,94789989,94815248,94764628,94791324,94503984,94741584))