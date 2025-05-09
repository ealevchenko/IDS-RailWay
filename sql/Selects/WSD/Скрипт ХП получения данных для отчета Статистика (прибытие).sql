use [KRR-PA-CNT-Railway]
declare @start datetime = Convert(datetime, '2022-07-28 00:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-07-29 23:59:59', 120)

--SELECT arr_sost.[id]
--      ,arr_sost.[id_arrived]
--      ,arr_sost.[id_sostav]
--      ,arr_sost.[train]
--      ,arr_sost.[composition_index]
--      ,arr_sost.[date_arrival]
--      ,arr_sost.[date_adoption]
--      ,arr_sost.[date_adoption_act]
--      ,arr_sost.[id_station_from]
--      ,arr_sost.[id_station_on]
--      ,arr_sost.[id_way]
--      ,arr_sost.[numeration]
--      ,arr_sost.[num_doc]
--      ,arr_sost.[count]
--      ,arr_sost.[status]
--      ,arr_sost.[note]
--      ,arr_sost.[create]
--      ,arr_sost.[create_user]
--      ,arr_sost.[change]
--      ,arr_sost.[change_user]
--	  ,count_wagon = (SELECT count(ac.id) FROM  [IDS].[ArrivalCars] as ac where ac.[id_arrival]=arr_sost.id and ac.[arrival] is not null)
--	  ,count_account_balance = ([IDS].[get_count_account_balance_of_arrival_sostav](arr_sost.id))
--	  --into view_arrival_sostav
--  FROM  [IDS].[ArrivalSostav] as arr_sost
--  where arr_sost.[date_adoption]>= @start and arr_sost.[date_adoption]<=@stop

  --SELECT arr_sost.[id]
  --    ,arr_sost.[id_arrived]
  --    ,arr_sost.[id_sostav]
  --    ,arr_sost.[train]
  --    ,arr_sost.[composition_index]
  --    ,arr_sost.[date_arrival]
  --    ,arr_sost.[date_adoption]
  --    ,arr_sost.[date_adoption_act]
  --    ,arr_sost.[id_station_from]
  --    ,arr_sost.[id_station_on]
  --    ,arr_sost.[id_way]
  --    ,arr_sost.[numeration]
  --    ,arr_sost.[num_doc]
  --    ,arr_sost.[count]
  --    ,arr_sost.[status]
  --    ,arr_sost.[note]
  --    ,arr_sost.[create]
  --    ,arr_sost.[create_user]
  --    ,arr_sost.[change]
  --    ,arr_sost.[change_user]
	 -- ,count_wagon = (SELECT count(ac.id) FROM  [IDS].[ArrivalCars] as ac where ac.[id_arrival]=arr_sost.id and ac.[arrival] is not null)
	 -- ,count_account_balance = ([IDS].[get_count_account_balance_of_arrival_sostav](arr_sost.id))
  --FROM  [IDS].[ArrivalSostav] as arr_sost
  --where arr_sost.[num_doc] is not null and arr_sost.[num_doc] > 0; 

  SELECT 
		arr_sost.[id] as id_sostav
		,arr_sost.[date_adoption] as sostav_date_adoption
		,arr_sost.[num_doc] as sostav_num_doc
		,arr_car.[id] as id_car
		,arr_car.[num] as num
		,uz_doc_vag.[id_cargo] as id_cargo
		,arr_dir_cargo.cargo_name_ru as cargo_name_ru
		,arr_dir_cargo.cargo_name_en as cargo_name_en
		,uz_doc.[nom_doc]  as nom_doc
		,uz_doc.[nom_main_doc]  as nom_main_doc
		,uz_doc.[code_stn_from]  as code_stn_from
		,arr_ext_station_from.[station_name_ru] as station_from_name_ru
		,arr_ext_station_from.[station_name_en] as station_from_name_en
		,uz_doc_vag.[id_division_on_amkr] as id_division_on_amkr
		,arr_dir_divis_amkr.[code] as division_code								-- ��� ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_ru] as name_division_ru				-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_en] as name_division_en				-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_ru] as division_abbr_ru				-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_en] as division_abbr_en				-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
  --into adoption_wagon_not_operation
  FROM  [IDS].[ArrivalSostav] as arr_sost
	Left JOIN IDS.[ArrivalCars] as arr_car ON arr_sost.id = arr_car.id_arrival
	Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = arr_car.num and rent_end is null order by [id] desc)
	Left JOIN [IDS].[Arrival_UZ_Vagon] as uz_doc_vag ON arr_car.id_arrival_uz_vagon = uz_doc_vag.id
	Left JOIN [IDS].[Arrival_UZ_Document] as uz_doc ON uz_doc_vag.id_document = uz_doc.id
  	--> ���������� ������ �� ��������
	Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON uz_doc_vag.id_cargo =  arr_dir_cargo.id
  	--> ���������� ������� ������� (�� �������� from)
	Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON uz_doc.[code_stn_from] = arr_ext_station_from.code
	--> ���������� ������������� ���� (�� ��������)
	Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis_amkr ON uz_doc_vag.[id_division_on_amkr] = arr_dir_divis_amkr.id
  where arr_car.arrival is not null and arr_sost.[date_adoption]>= @start and arr_sost.[date_adoption]<=@stop and (dir_rent.id_operator is null OR dir_rent.id_operator =0)
