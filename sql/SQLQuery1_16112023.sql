use [KRR-PA-CNT-Railway]

/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [id]
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
  --WHERE id=231973
  where [num_doc]= 1149--1134--1161--1138--1191 --1140--1123--1127--15--1139--1137--1130--1128--1126--521--492--490--487--486--1175--1173--1176--1169--1170--1164--1163--525--522--523--524--521--520--1165--1160 --1161--1151--1158--1148--1156--1155--1149--1135--1139--1145--1142--1136--1133--1131--1126--1127--1124 --503--492--512--511--519--517--518--516--515--513--510--509--507--508--1165--507--
  order by 1 desc

  --SELECT TOP (1000) [id]
  --    ,[id_outgoing]
  --    ,[num]
  --    ,[position]
  --    ,[position_outgoing]
  --    ,[num_doc]
  --    ,[note]
  --    ,[date_outgoing_act]

  --    ,[outgoing]
  --    ,[outgoing_user]
  --    ,[id_outgoing_uz_vagon]
  --    ,[id_outgoing_detention]
  --    ,[id_reason_discrepancy_amkr]
  --    ,[id_reason_discrepancy_uz]
  --    ,[id_outgoing_return_start]
  --    ,[id_outgoing_return_stop]
  --    ,[parent_wir_id]
  --    ,[create]
  --    ,[create_user]
  --    ,[change]
  --    ,[change_user]
  --    ,[note_vagonnik]
  --    ,[vagonnik]
  --    ,[vagonnik_user]
  --FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars]
  --where [id_outgoing]=231967
  -- and [num_doc] != '89866297'

 -- UPDATE [IDS].[Outgoing_UZ_Vagon]
 -- SET [id_document] = null
	--WHERE id in (SELECT [id_outgoing_uz_vagon] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] where [id_outgoing]=231943 and num in (56628480,64055700,63859102,56624588,56610207,64056781))

 --UPDATE [IDS].[OutgoingCars]
 --  SET [num_doc] = null
 --WHERE id in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] where [id_outgoing]=231943 and num in (56628480,64055700,63859102,56624588,56610207,64056781))

 -- UPDATE [IDS].[Outgoing_UZ_Vagon]
 -- SET [id_document] = null
	--WHERE id in (SELECT [id_outgoing_uz_vagon] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] where [id_outgoing]=232006)

 --UPDATE [IDS].[OutgoingCars]
 --  SET [num_doc] = null
 --WHERE id in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] where [id_outgoing]=232006)

--231969
  SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] where [id_outgoing]=231969 and num in (55733018,55102172,56199953,66352576)
  SELECT [id_outgoing_uz_vagon] FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] where [id_outgoing]=231969 and num in (55733018,55102172,56199953,66352576)

  



