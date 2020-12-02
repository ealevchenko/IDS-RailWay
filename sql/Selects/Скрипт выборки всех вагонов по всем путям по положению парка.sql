use [KRR-PA-CNT-Railway]

declare @id_park_state_station int = 14

SELECT psw.[id]
      ,psw.[id_park_state_station]
      ,psw.[id_way]
      ,psw.[position]
      --,psw.[note]
      --,psw.[create]
      --,psw.[create_user]
      --,psw.[change]
      --,psw.[change_user]
      --,psw.[delete]
      --,psw.[delete_user]
	  --
	  ,ps_wag.[id]
      --,ps_wag.[id_park_state_way]
      ,ps_wag.[num]
      ,ps_wag.[position]
      --,ps_wag.[note]
      --,ps_wag.[create]
      --,ps_wag.[create_user]
      --,ps_wag.[change]
      --,ps_wag.[change_user]
      --,ps_wag.[delete]
      --,ps_wag.[delete_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[ParkState_Way] as psw Left JOIN								
	IDS.[ParkState_Wagon] as ps_wag ON ps_wag.[id_park_state_way] = psw.[id]


  where [id_park_state_station] = @id_park_state_station
  