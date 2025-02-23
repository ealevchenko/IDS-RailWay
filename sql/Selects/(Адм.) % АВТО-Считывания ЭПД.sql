/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/

declare @start datetime = CONVERT(datetime, '2021-01-06 00:00:00')

SELECT [id]
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
  FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] 
  where [consignee] = 7932 and [position_arrival] is null and [create]>= @start
  order by 1 desc

  declare @all_count_arrival_7932 int = ( SELECT count([id]) FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] where [consignee] = 7932 and [create]>= @start)
  declare @count_arrival_7932 int = ( SELECT count([id]) FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] where [consignee] = 7932 and [position_arrival] is null and [create]>= @start)
  declare @count_arrival_doc_7932 int = ( SELECT count([id]) FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalCars] where [consignee] = 7932 and [position_arrival] is null and [create]>= @start and num_doc is not null)
  select
  @all_count_arrival_7932 as 'Зашло с кодом 7932'
  ,@count_arrival_7932 as 'Уже приняли с кодом 7932'
  ,[Не приняли] = @all_count_arrival_7932-@count_arrival_7932
  ,@count_arrival_doc_7932 as 'Автоматом прочло документы из не принятых'
  ,[Процент считывания от не принятых]= (@count_arrival_doc_7932 * 100)/(@all_count_arrival_7932-@count_arrival_7932)
