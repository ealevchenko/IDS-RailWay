use [KRR-PA-CNT-Railway]
declare @num int = 57582702

SELECT wir.[id] as id_wir
      ,wir.[num]
      ,wir.[id_arrival_car]
      ,wir.[id_sap_incoming_supply]
      ,wir.[doc_outgoing_car]
      ,wir.[id_outgoing_car]
      ,wir.[id_sap_outbound_supply]
      ,wir.[note] as note_wir
      ,wir.[create] as create_wir
      ,wir.[create_user] as create_user_wir
      ,wir.[close] as close_wir
      ,wir.[close_user] as close_user_wir
      ,wir.[parent_id] as parent_id_wir
	  ,wim.[id] as id_wim
      ,wim.[id_wagon_internal_routes]
      ,wim.[id_station]
	  ,dir_station.[station_name_ru]
      ,dir_station.[station_name_en]
      ,dir_station.[station_abbr_ru]
      ,dir_station.[station_abbr_en]
      ,wim.[id_way]
	  ,dir_way.[way_num_ru]
      ,dir_way.[way_num_en]
      ,dir_way.[way_name_ru]
      ,dir_way.[way_name_en]
      ,dir_way.[way_abbr_ru]
      ,dir_way.[way_abbr_en]
      ,wim.[way_start]
      ,wim.[way_end]
      ,wim.[id_outer_way]
	  ,dir_oway.[name_outer_way_ru]
      ,dir_oway.[name_outer_way_en]
      ,wim.[outer_way_start]
      ,wim.[outer_way_end]
      ,wim.[position]
      ,wim.[note] as note_wim
      ,wim.[create] as create_wim
      ,wim.[create_user] as create_user_wim
      ,wim.[close] as close_wim
      ,wim.[close_user] as close_user_wim
      ,wim.[parent_id] as parent_id_wim
	  		--> ТЕКУЩАЯ ОПЕРАЦИЯ
		-- операция над вагоном
		,wio.id_operation as id_operation_wagon
		,dir_operation.operation_name_ru as operation_wagon_name_ru
		,dir_operation.operation_name_en as operation_wagon_name_en
		,wio.operation_start as operation_wagon_start
		,wio.operation_end as operation_wagon_end
		,dir_operation.busy as operation_wagon_busy
		,wio.[create] as operation_wagon_create
		,wio.create_user as operation_wagon_create_user
		,wio.[close] as operation_wagon_close
		,wio.close_user as operation_wagon_close_user
		--> Отправка вагонов
		,out_sost.date_outgoing
		,out_sost.date_outgoing_act
		,out_sost.date_departure_amkr
	  --into wagon_dislocation
  FROM [IDS].[WagonInternalRoutes] AS wir Left JOIN
	[IDS].[OutgoingCars] as out_car ON out_car.id = wir.id_outgoing_car Left JOIN
	[IDS].[OutgoingSostav] as out_sost ON out_sost.id = out_car.id_outgoing Left JOIN
  	IDS.[WagonInternalMovement] as wim ON wim.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalMovement] where [id_wagon_internal_routes]= wir.[id] order by id desc) Left JOIN
	IDS.[WagonInternalOperation] as wio ON wio.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= wir.[id] order by id desc)  Left JOIN
	[IDS].[Directory_Station] as dir_station ON dir_station.id = wim.[id_station] Left JOIN
	[IDS].[Directory_Ways] as dir_way ON dir_way.id = wim.[id_way] Left JOIN
	[IDS].[Directory_OuterWays] as dir_oway ON dir_oway.id = wim.[id_outer_way] Left JOIN
	IDS.Directory_WagonOperations as dir_operation ON wio.id_operation =  dir_operation.id     
  where wir.[num]=@num
  order by wir.[id] desc