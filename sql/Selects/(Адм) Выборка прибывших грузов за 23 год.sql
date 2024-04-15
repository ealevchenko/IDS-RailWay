SELECT  arr_doc_vag.[id]
      ,arr_doc_vag.[id_document]
      ,arr_doc_vag.[num]
      --,arr_doc_vag.[id_arrival]
      --,arr_doc_vag.[id_car]
      --,arr_doc_vag.[id_condition]
      --,arr_doc_vag.[id_type]
      --,arr_doc_vag.[gruzp]
      --,arr_doc_vag.[u_tara]
      --,arr_doc_vag.[ves_tary_arc]
      --,arr_doc_vag.[route]
      --,arr_doc_vag.[note_vagon]
      --,arr_doc_vag.[id_cargo]
      --,arr_doc_vag.[id_cargo_gng]
      --,arr_doc_vag.[id_certification_data]
      --,arr_doc_vag.[id_commercial_condition]
      --,arr_doc_vag.[kol_pac]
      --,arr_doc_vag.[pac]
      --,arr_doc_vag.[vesg]
      --,arr_doc_vag.[vesg_reweighing]
      --,arr_doc_vag.[nom_zpu]
      --,arr_doc_vag.[danger]
      --,arr_doc_vag.[danger_kod]
      --,arr_doc_vag.[cargo_returns]
      --,arr_doc_vag.[id_station_on_amkr]
      --,arr_doc_vag.[id_division_on_amkr]
      --,arr_doc_vag.[empty_car]
      --,arr_doc_vag.[kol_conductor]
      --,arr_doc_vag.[create]
      --,arr_doc_vag.[create_user]
      --,arr_doc_vag.[change]
      --,arr_doc_vag.[change_user]
      --,arr_doc_vag.[id_owner]
      --,arr_doc_vag.[id_countrys]
      --,arr_doc_vag.[id_genus]
      --,arr_doc_vag.[kol_os]
      --,arr_doc_vag.[usl_tip]
      --,arr_doc_vag.[date_rem_uz]
      --,arr_doc_vag.[date_rem_vag]
      --,arr_doc_vag.[id_type_ownership]
      --,arr_doc_vag.[gruzp_uz]
      --,arr_doc_vag.[tara_uz]
      --,arr_doc_vag.[zayava]
      --,arr_doc_vag.[manual]
      --,arr_doc_vag.[pay_summa]
      --,arr_doc_vag.[id_wagons_rent_arrival]
	  ,arr_cargo_etsng.code as code_etsng
	  ,arr_dir_cargo.*
	  ,arr_dir_group_cargo.*
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon] as arr_doc_vag
  		--> Справочник Грузов
		Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
		--> Справочник Группы Грузов
		Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		Left JOIN IDS.[Directory_CargoETSNG] as arr_cargo_etsng ON arr_dir_cargo.[id_cargo_etsng] =  arr_cargo_etsng.id

  where arr_doc_vag.[create] >='2023-01-01 00:00:00' and arr_doc_vag.[create] <='2024-01-01 00:00:00'