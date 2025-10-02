
declare @num int = 55070650  
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
  where num in (56596802    ) 
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
  where id in (118708)



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
  where [id_instructional_letters] = 45106 


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
  where [id]=45106



  --Удалить пустые письма
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
  where id in (SELECT il.[id] FROM [KRR-PA-CNT-Railway].[IDS].[InstructionalLetters] as il Left JOIN [KRR-PA-CNT-Railway].[IDS].[InstructionalLettersWagon] as ilw ON ilw.id_instructional_letters = il.id group by il.[id] HAVING count(ilw.id) =0 )

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
      ,[status]
      ,[id_wir]
	  --delete
  FROM [KRR-PA-CNT-Railway].[IDS].[InstructionalLettersWagon]
  where [status] = 5