use [KRR-PA-CNT-Railway]

declare @id_park_state_station int = 12

SELECT
	   psw.[id]
      ,psw.[id_park_state_station]
	  ,dir_way.[id_park]
      ,psw.[id_way]
      ,psw.[position]
      -- Парк
	  ,dir_park.[park_name_ru]
      ,dir_park.[park_name_en]
      ,dir_park.[park_abbr_ru]
      ,dir_park.[park_abbr_en]
	  -- Путь
      ,dir_way.[way_num_ru]
      ,dir_way.[way_num_en]
      ,dir_way.[way_name_ru]
      ,dir_way.[way_name_en]
      ,dir_way.[way_abbr_ru]
      ,dir_way.[way_abbr_en]
      ,dir_way.[capacity]
	  ,[count_wagon] = (SELECT count(id) FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Wagon] where [id_park_state_way] =psw.[id])
      ,psw.[note]
      ,psw.[create]
      ,psw.[create_user]
      ,psw.[change]
      ,psw.[change_user]
      ,psw.[delete]
	  ,psw.[delete_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Way] as psw Left JOIN								
	IDS.[Directory_Ways] as dir_way ON dir_way.id = psw.id_way Left JOIN	
	IDS.[Directory_ParkWays] as dir_park ON dir_park.id = dir_way.id_park

  where psw.[id_park_state_station] = @id_park_state_station
  order by psw.[position] 