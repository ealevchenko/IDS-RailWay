
declare @num int = 63309801
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
  where num in (57599243) 
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
  where id=115942



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
  where [id_instructional_letters] = 44445 


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
  where [id]=44445
