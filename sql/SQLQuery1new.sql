/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
declare @num int = 67515056 --67615401

SELECT [id]
      ,[id_outgoing]
      ,[num]
      ,[position]
      ,[position_outgoing]
      ,[num_doc]
      ,[note]
      ,[date_outgoing_act]
      ,[outgoing]
      ,[outgoing_user]
      ,[id_outgoing_uz_vagon]
      ,[id_outgoing_detention]
      ,[id_reason_discrepancy_amkr]
      ,[id_reason_discrepancy_uz]
      ,[id_outgoing_return_start]
      ,[id_outgoing_return_stop]
      ,[parent_wir_id]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[note_vagonnik]
      ,[vagonnik]
      ,[vagonnik_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars]
  where num = @num
  order by 1 desc

  SELECT [id]
      ,[num]
      ,[id_operator]
      ,[id_limiting]
      ,[rent_start]
      ,[rent_end]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[parent_id]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent]
  where [num]= @num
  order by 1 desc

  SELECT TOP (1000) [id]
      ,[num_doc]
      ,[id_station_from]
      ,[id_way_from]
      ,[id_station_on]
      ,[date_readiness_amkr]
      ,[date_end_inspection_acceptance_delivery]
      ,[date_end_inspection_loader]
      ,[date_end_inspection_vagonnik]
      ,[date_show_wagons]
      ,[date_readiness_uz]
      ,[date_outgoing]
      ,[date_outgoing_act]
      ,[date_departure_amkr]
      ,[composition_index]
      ,[status]
      ,[route_sign]
      ,[note]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[vagonnik_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingSostav]
  where [id] = (SELECT top(1) [id_outgoing] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] where num = @num order by 1 desc)

SELECT TOP (1000) [id]
      ,[id_document]
      ,[num]
      ,[id_outgoing]
      ,[id_car]
      ,[id_condition]
      ,[id_wagons_rent_arrival]
      ,[id_wagons_rent_outgoing]
      ,[id_countrys]
      ,[id_genus]
      ,[id_owner]
      ,[gruzp_uz]
      ,[tara_uz]
      ,[note_uz]
      ,[gruzp]
      ,[u_tara]
      ,[ves_tary_arc]
      ,[id_warehouse]
      ,[id_division]
      ,[laden]
      ,[id_cargo]
      ,[id_cargo_gng]
      ,[vesg]
      ,[code_stn_to]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon]
  --where num =@num
  where id = (SELECT top(1) [id_outgoing_uz_vagon] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] where num = @num order by 1 desc)

