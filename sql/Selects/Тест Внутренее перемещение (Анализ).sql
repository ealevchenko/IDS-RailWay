
SELECT 
[num], count([num]) as count_num
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]
  group by [num]
  order by count_num desc

SELECT [id]
      ,[num]
      ,[id_arrival_car]
      ,[id_sap_incoming_supply]
      ,[doc_outgoing_car]
      ,[id_outgoing_car]
      ,[id_sap_outbound_supply]
      ,[note]
      ,[create]
      ,[create_user]
      ,[close]
      ,[close_user]
      ,[parent_id]
	  --delete
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes]

  where num = 56671860
  order by 1 desc

    SELECT 
	[id_way], count ([id_way]) as count_way ,max(position) as max_position
	--[id]
 --     ,[id_wagon_internal_routes]
 --     ,[id_station]
 --     ,[station_start]
 --     ,[station_end]
 --     ,[id_way]
 --     ,[way_start]
 --     ,[way_end]
 --     ,[position]
 --     ,[note]
 --     ,[create]
 --     ,[create_user]
 --     ,[close]
 --     ,[close_user]
 --     ,[parent_id]
	  --delete
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]
  group by [id_way]

  select 
	[id]
      ,[id_wagon_internal_routes]
      ,[id_station]
      ,[station_start]
      ,[station_end]
      ,[id_way]
      ,[way_start]
      ,[way_end]
      ,[position]
      ,[note]
      ,[create]
      ,[create_user]
      ,[close]
      ,[close_user]
      ,[parent_id]
FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]
where [id_way]= 113 and [way_end] is null

SELECT TOP (1000) [id]
      ,[num_doc]
      ,[id_station_from]
      ,[id_way_from]
      ,[id_station_on]
      ,[date_readiness_amkr]
      ,[date_show_wagons]
      ,[date_readiness_uz]
      ,[date_outgoing]
      ,[date_outgoing_act]
      ,[composition_index]
      ,[status]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingSostav] order by 1 desc

  SELECT TOP (1000) [id]
      ,[id_outgoing]
      ,[num]
      ,[position]
      ,[position_outgoing]
      ,[note]
      ,[date_outgoing_act]
      ,[outgoing]
      ,[outgoing_user]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[id_outgoing_uz_vagon]
  FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars]
  where [id_outgoing] = 469