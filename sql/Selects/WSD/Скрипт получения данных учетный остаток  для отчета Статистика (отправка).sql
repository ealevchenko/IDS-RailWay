/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
declare @id_sostav int = 149636;

SELECT count(ac.id) FROM  [IDS].[OutgoingCars] as ac where ac.[id_outgoing]=@id_sostav and ac.[outgoing] is not null

SELECT out_car.[id]
      ,out_car.[id_outgoing]
      ,out_car.[num]
      ,out_car.[position]
      ,out_car.[position_outgoing]
      ,out_car.[num_doc]
      ,out_car.[note]
      ,out_car.[date_outgoing_act]
      ,out_car.[outgoing]
      ,out_car.[outgoing_user]
      ,out_car.[id_outgoing_uz_vagon]
      ,out_car.[id_outgoing_detention]
      ,out_car.[id_reason_discrepancy_amkr]
      ,out_car.[id_reason_discrepancy_uz]
      ,out_car.[id_outgoing_return_start]
      ,out_car.[id_outgoing_return_stop]
      ,out_car.[parent_wir_id]
      ,out_car.[create]
      ,out_car.[create_user]
      ,out_car.[change]
      ,out_car.[change_user]
      ,out_car.[note_vagonnik]
      ,out_car.[vagonnik]
      ,out_car.[vagonnik_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] as out_car
	Left JOIN [IDS].[Outgoing_UZ_Vagon] as out_vag ON out_vag.id = out_car.[id_outgoing_uz_vagon]
	Left JOIN [IDS].[Outgoing_UZ_Document] as uz_doc ON uz_doc.id = out_vag.id_document
	--> Справочник вагонов
	Left JOIN IDS.Directory_Wagons as dir_wagon ON out_car.num = dir_wagon.num
	--> Справочник Род вагона
	Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
	Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = out_car.num and rent_end is null order by [id] desc)
	where out_car.[id_outgoing]=@id_sostav and out_car.[outgoing] is not null
	AND (dir_rent.id_operator is null OR (NOT (dir_rent.id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz'))) AND NOT (dir_rent.id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('cisterns')) and dir_rod.rod_uz = 70)))