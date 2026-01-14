
SELECT max([id])
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  where num in (61765152,53420709,61709655,66180019,62920244,63149124,56156623,54615877,68132265,63682884,62532221,67883504,60407517,62924071,60228301,63263867,60412616,61635579,61765871,67874685,61815916,68002963,55007983,63397673,63029144,67902858,60434008)
  group by num 

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
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]
  where [id_wagon_internal_routes] in (SELECT max([id]) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where num in (61765152,53420709,61709655,66180019,62920244,63149124,56156623,54615877,68132265,63682884,62532221,67883504,60407517,62924071,60228301,63263867,60412616,61635579,61765871,67874685,61815916,68002963,55007983,63397673,63029144,67902858,60434008) group by num) and [note] = N'Перенесен для предъявления'
  order by position


	-->Переопределим IDWeb
		--Declare @ID int
		--Declare @ID_WIR int
		--declare cur1 cursor local static for
		--  SELECT [id] ,[id_wagon_internal_routes] 
		--	  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]
		--	  where [id_wagon_internal_routes] in (SELECT max([id]) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where num in (61765152,53420709,61709655,66180019,62920244,63149124,56156623,54615877,68132265,63682884,62532221,67883504,60407517,62924071,60228301,63263867,60412616,61635579,61765871,67874685,61815916,68002963,55007983,63397673,63029144,67902858,60434008) group by num) and [note] = N'Перенесен для предъявления'
		--	  order by position
		--open cur1
		--fetch first from cur1 into @ID, @ID_WIR
		--	while @@FETCH_STATUS=0
		--	BEGIN
		--		select @ID, @ID_WIR

		--		DELETE FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_wagon_internal_routes]=747162 and [id]> @ID

		--		UPDATE [IDS].[WagonInternalMovement]
		--		   SET [close] = null
		--			  ,[close_user] = null
		--		WHERE id = @ID

		--		fetch from cur1 into @ID, @ID_WIR
		--	END
		--close cur1
		--deallocate cur1

