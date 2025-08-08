
declare @num int = 62104435
--declare @num_letters int = 20102

SELECT TOP (1000) [id]
      ,[id_instructional_letters]
      ,[num]
      ,[close]
      ,[close_status]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[InstructionalLettersWagon]
  where num in (62232558) 
  order by 1 desc


SELECT TOP (1000) [id]
      ,[id_instructional_letters]
      ,[num]
      ,[close]
      ,[close_status]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
	  --delete
  FROM [KRR-PA-CNT-Railway].[IDS].[InstructionalLettersWagon]
  where id in (117221)



SELECT TOP (1000) [id]
      ,[id_instructional_letters]
      ,[num]
      ,[close]
      ,[close_status]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
	  --delete
  FROM [KRR-PA-CNT-Railway].[IDS].[InstructionalLettersWagon]
  where [id_instructional_letters] = 44741 


  SELECT TOP (1000) [id]
      ,[num]
      ,[dt]
      ,[owner]
      ,[destination_station]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
	  --delete
  FROM [KRR-PA-CNT-Railway].[IDS].[InstructionalLetters]
  where [id]=44741
