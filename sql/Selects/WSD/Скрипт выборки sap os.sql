/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
use [KRR-PA-CNT-Railway]
SELECT top(1) wir.[id]
      ,wir.[num]
      ,wir.[id_arrival_car]
      ,wir.[id_sap_incoming_supply]
      ,wir.[doc_outgoing_car]
      ,wir.[id_outgoing_car]
      ,wir.[id_sap_outbound_supply]
      ,wir.[note]
      ,wir.[create]
      ,wir.[create_user]
      ,wir.[close]
      ,wir.[close_user]
      ,wir.[parent_id]
	  --,arr_car.*
	  --,arr_sost.*
	  ,arr_sost.date_adoption
	  ,sap_out.*
  FROM [IDS].[WagonInternalRoutes] as wir
  	--> Прибытие вагона
	Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
		--> Прибытие состава
	Left JOIN IDS.ArrivalSostav as arr_sost ON arr_car.id_arrival = arr_sost.id

	Left JOIN [SAP].[Out_Supply] as sap_out  ON sap_out.id = (SELECT top(1) [id] FROM [SAP].[Out_Supply]  where [TRAID] = wir.num and [ERDAT]>convert(date, arr_sost.date_adoption ,120) order by [ERDAT])



--  where wir.[num] = 54776406
--  order by 1 desc

--  /****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
--SELECT top(1) [id]
--      ,[TRAID]
--      ,[VBELN]
--      ,[ERDAT]
--      ,[ZBEZEI]
--      ,[STAWN]
--      ,[NAME1_AG]
--      ,[KUNNR_AG]
--      ,[ZRWNAME]
--      ,[ZENDSTAT]
--      ,[ZCRSTNAME]
--      ,[ZCROSSSTAT]
--      ,[ZZVES_NETTO]
--      ,[ABTNR]
--      ,[VTEXT]
--      ,[ZZDOLG]
--      ,[ZZFIO]
--      ,[ZZPLATEL]
--      ,[ZZNAME_PLATEL]
--      ,[create]
--      ,[processed]
--      ,[processed_user]
--  FROM [KRR-PA-CNT-Railway].[SAP].[Out_Supply]
--  where [TRAID] = 54776406 and [ERDAT]>convert(date, '2021-11-28 01:30:00.000',120) order by [ERDAT]