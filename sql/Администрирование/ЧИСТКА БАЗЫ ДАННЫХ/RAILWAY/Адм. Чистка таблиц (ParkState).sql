use [KRR-PA-CNT-Railway]
declare @date datetime = '2024-01-01 00:00:00';

	--  delete
 -- FROM [IDS].[ParkState_Wagon]
 -- where [id_park_state_way] in (SELECT id FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Way]
 -- where [id_park_state_station] in (select ID FROM [IDS].[ParkState_Station] where [state_on] < @date))

	--  delete
 -- FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Way]
 -- where [id_park_state_station] in (select ID FROM [IDS].[ParkState_Station] where [state_on] < @date)

	--delete
 -- FROM [IDS].[ParkState_Station]
 -- where [state_on] < @date

SELECT [id]
      ,[id_station]
      ,[state_on]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[delete]
      ,[delete_user]
      ,[applied]
      ,[applied_user]
  FROM [IDS].[ParkState_Station]
  where [state_on] < @date

  SELECT [id]
      ,[id_park_state_station]
      ,[id_way]
      ,[position]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[delete]
      ,[delete_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Way]
  where [id_park_state_station] in (select ID FROM [IDS].[ParkState_Station] where [state_on] < @date)

  SELECT [id]
      ,[id_park_state_way]
      ,[num]
      ,[position]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[delete]
      ,[delete_user]
  FROM [IDS].[ParkState_Wagon]
  where [id_park_state_way] in (SELECT id FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Way]
  where [id_park_state_station] in (select ID FROM [IDS].[ParkState_Station] where [state_on] < @date))
