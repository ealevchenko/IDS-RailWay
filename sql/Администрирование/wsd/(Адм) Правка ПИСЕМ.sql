


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
  where num in (56151475) 
  --where [id_instructional_letters]=44148
--where id=114608


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
  where [id_instructional_letters] = 44436 


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
  where [id]=44436
