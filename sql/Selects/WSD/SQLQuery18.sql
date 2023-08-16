/****** Script for SelectTopNRows command from SSMS  ******/
declare @date datetime = convert(datetime,'2023-08-05 20:00:00',120)
SELECT TOP (1) [id]
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
  where [id_wagon_internal_routes]=723662 
  and ((outer_way_start is null  and (([way_start]<=@date and way_end>=@date) OR ([way_start]<=@date and way_end is null))) or outer_way_start is not null and ((outer_way_start<=@date and outer_way_end>=@date) or (outer_way_start<=@date and outer_way_end is null)))
  order by [way_end]

  SELECT [id]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement]
  where [id_wagon_internal_routes]=723662 
  and ((outer_way_start is null  and (([way_start]<=@date and way_end>=@date) OR ([way_start]<=@date and way_end is null))) or outer_way_start is not null and ((outer_way_start<=@date and outer_way_end>=@date) or (outer_way_start<=@date and outer_way_end is null)))
  order by [way_end]




