/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT count(ac.id) FROM  [IDS].[ArrivalCars] as ac where ac.[id_arrival]=171826 and ac.[arrival] is not null

SELECT 
	   arr_car.[id]
      ,arr_car.[id_arrival]
      ,arr_car.[num]
      ,arr_car.[position]
      ,arr_car.[position_arrival]
      ,arr_car.[consignee]
      ,arr_car.[num_doc]
      ,arr_car.[id_transfer]
      ,arr_car.[note]
      ,arr_car.[date_adoption_act]
      ,arr_car.[arrival]
      ,arr_car.[arrival_user]
      ,arr_car.[create]
      ,arr_car.[create_user]
      ,arr_car.[change]
      ,arr_car.[change_user]
      ,arr_car.[id_arrival_uz_vagon]
	  ,arr_vag.*
	  ,uz_doc.*
FROM  [IDS].[ArrivalCars] as arr_car 
Left JOIN [IDS].[Arrival_UZ_Vagon] as arr_vag ON arr_vag.id = arr_car.[id_arrival_uz_vagon]
Left JOIN [IDS].[Arrival_UZ_Document] as uz_doc ON uz_doc.id = arr_vag.id_document
--> Справочник вагонов
Left JOIN IDS.Directory_Wagons as dir_wagon ON arr_car.num = dir_wagon.num
--> Справочник Род вагона
Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = arr_car.num and rent_end is null order by [id] desc)
where arr_car.[id_arrival]=171826 and arr_car.[arrival] is not null and uz_doc.klient <> 1
AND (dir_rent.id_operator is null OR (NOT (dir_rent.id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz'))) AND NOT (dir_rent.id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('cisterns')) and dir_rod.rod_uz = 70)))