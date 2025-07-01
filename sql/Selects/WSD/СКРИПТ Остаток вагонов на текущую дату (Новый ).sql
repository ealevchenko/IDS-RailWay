use [KRR-PA-CNT-Railway]

declare @date datetime ='2025-06-24 15:05:25'

SELECT 
		 wir.id
		,wim.id as wim_id
		,wim.id_wio as wim_wio_id
		,wio.id as wio_id
		,wir.num
		--============================================================
		--> ��������
		--============================================================
		,arr_car.[id] as arrival_car_id
		,arr_sost.[id] as arrival_sostav_id
		,arr_doc_vag.[id] as arrival_uz_vagon_id
		,arr_doc_uz.[id]  as arrival_uz_document_id
		,arr_doc_uz.[nom_main_doc] as arrival_uz_document_nom_main_doc
		,arr_doc_uz.[nom_doc]   as arrival_uz_document_nom_doc
		--> ���� ������
		,arr_sost.[date_arrival] as arrival_sostav_date_arrival
		,arr_sost.[date_adoption] as arrival_sostav_date_adoption
		,arr_sost.[date_adoption_act] as arrival_sostav_date_adoption_act
		--> ���� ������ � ������ ��������
		,arrival_sostav_old_date_adoption = CASE  WHEN arr_doc_vag.[cargo_returns] = 1 THEN arr_sost_old.[date_adoption] ELSE arr_sost.[date_adoption] END
		,arrival_sostav_old_date_adoption_act = CASE  WHEN arr_doc_vag.[cargo_returns] = 1 THEN arr_sost_old.[date_adoption_act] ELSE arr_sost.[date_adoption_act] END
		--> �������� �� �������� [IDS].[Directory_OperatorsWagons]
		,arr_dir_owg.[group] as arrival_uz_vagon_operators_wagons_group
		,arr_wag_rent.[id_operator] as arrival_uz_vagon_arrival_wagons_rent_id_operator			-- id ������ �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[operators_ru] as arrival_uz_vagon_arrival_wagons_rent_operators_ru	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[operators_en] as arrival_uz_vagon_arrival_wagons_rent_operators_en	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[abbr_ru] as arrival_uz_vagon_arrival_wagons_rent_operator_abbr_ru		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[abbr_en] as arrival_uz_vagon_arrival_wagons_rent_operator_abbr_en		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_wag_rent.[rent_start] as arrival_uz_vagon_arrival_wagons_rent_start					-- ������ ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_wag_rent.[rent_end] as arrival_uz_vagon_arrival_wagons_rent_end						-- ����� ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[paid] as arrival_uz_vagon_arrival_wagons_rent_operator_paid			-- ������� ��������� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_operator.[color] as arrival_uz_vagon_arrival_wagons_rent_operator_color			-- ���� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> �������� �� �������� [IDS].[Directory_ConditionArrival]
		,arr_doc_vag.[id_condition] as arrival_uz_vagon_id_condition
		,arr_dir_cond.condition_name_ru as arrival_uz_vagon_condition_name_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_name_en as arrival_uz_vagon_condition_name_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_ru as arrival_uz_vagon_condition_abbr_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_en as arrival_uz_vagon_condition_abbr_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.repairs as arrival_uz_vagon_condition_repairs						-- ���������� [IDS].[Directory_ConditionArrival] �� �������� ������� ������ [IDS].[Arrival_UZ_Vagon]
		--> ��� ������ �� �������� [IDS].[Directory_GenusWagons]
		,arr_doc_vag.[id_genus]	 as arrival_uz_vagon_id_genus							-- id ������ ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.rod_uz as arrival_uz_vagon_rod											-- ��� ���� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_ru as arrival_uz_vagon_rod_name_ru								-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.genus_en as arrival_uz_vagon_rod_name_en								-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_ru as arrival_uz_vagon_rod_abbr_ru								-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_rod.abbr_en as arrival_uz_vagon_rod_abbr_en								-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> ��� ������
		,arr_doc_vag.[id_type] as arrival_uz_vagon_id_type
		,dir_type.type_ru as arrival_uz_vagon_type_ru
		,dir_type.type_en as arrival_uz_vagon_type_en
		,arr_doc_vag.[gruzp] as arrival_uz_vagon_gruzp
		--> IDS.Directory_Cargo
		,arr_doc_vag.[id_cargo] as arrival_uz_vagon_id_cargo
		,arr_dir_cargo.cargo_name_ru as arrival_uz_vagon_cargo_name_ru
		,arr_dir_cargo.cargo_name_en as arrival_uz_vagon_cargo_name_en
		--> ���������� ������ ����� [IDS].[Directory_CargoGroup]	
		,arr_dir_cargo.[id_group] as arrival_uz_vagon_id_group								-- id ������ ����� [IDS].[Directory_CargoGroup] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_ru as arrival_uz_vagon_cargo_group_name_ru	-- ������ ������ [IDS].[Directory_CargoGroup] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_group_cargo.cargo_group_name_en as arrival_uz_vagon_cargo_group_name_en	-- ������ ������ [IDS].[Directory_CargoGroup] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> ���������� ����� ����� [IDS].[Directory_CargoETSNG]
		,arr_dir_cargo.[id_cargo_etsng] as arrival_uz_vagon_id_cargo_etsng					-- id ����� ����� [IDS].[Directory_CargoETSNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_etsng.[code] as arrival_uz_vagon_cargo_etsng_code						-- ��� ����� ����� [IDS].[Directory_CargoETSNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_etsng.[cargo_etsng_name_ru] as arrival_uz_vagon_cargo_etsng_name_ru	-- ���� ����� [IDS].[Directory_CargoETSNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_etsng.[cargo_etsng_name_en] as arrival_uz_vagon_cargo_etsng_name_en	-- ���� ����� [IDS].[Directory_CargoETSNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> [IDS].[Directory_CargoGNG]
		,arr_doc_vag.[id_cargo_gng] as arrival_uz_vagon_id_cargo_gng
		,arr_dir_cargo_gng.[code] as arrival_uz_vagon_cargo_gng_code							-- ��� ����� ��� [IDS].[Directory_CargoGNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_gng.[cargo_gng_name_ru] as arrival_uz_vagon_cargo_gng_name_ru			-- ���� ��� [IDS].[Directory_CargoGNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cargo_gng.[cargo_gng_name_en] as arrival_uz_vagon_cargo_gng_name_en			-- ���� ��� [IDS].[Directory_CargoGNG] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> IDS.Directory_CertificationData
		,arr_doc_vag.[id_certification_data] as arrival_uz_vagon_id_certification_data
		,arr_dir_certif.[certification_data_ru] as arrival_uz_vagon_sertification_data_ru
		,arr_dir_certif.[certification_data_en] as arrival_uz_vagon_sertification_data_en
		--> [IDS].[Directory_CommercialCondition]
		,arr_doc_vag.[id_commercial_condition] as arrival_uz_vagon_id_commercial_condition
		,arr_comm_cond.[commercial_condition_ru] as arrival_uz_vagon_commercial_condition_ru
		,arr_comm_cond.[commercial_condition_en] as arrival_uz_vagon_commercial_condition_en
		--> [IDS].[Directory_ExternalStation]
		,arr_doc_uz.[code_stn_from]  as arrival_uz_document_code_stn_from
		,arr_ext_station_from.[station_name_ru] as arrival_uz_document_station_from_name_ru
		,arr_ext_station_from.[station_name_en] as arrival_uz_document_station_from_name_en
		--> [IDS].[Directory_InlandRailway]
		,arr_ext_station_from.[code_inlandrailway] as arrival_uz_document_from_code_inlandrailway
		,arr_ir_from.[inlandrailway_name_ru] as arrival_uz_document_from_inlandrailway_name_ru
		,arr_ir_from.[inlandrailway_name_en] as arrival_uz_document_from_inlandrailway_name_en
		,arr_ir_from.[inlandrailway_abbr_ru] as arrival_uz_document_from_inlandrailway_abbr_ru
		,arr_ir_from.[inlandrailway_abbr_en] as arrival_uz_document_from_inlandrailway_abbr_en
		,arr_ir_from.[code_railway] as arrival_uz_document_from_code_railway
		--> [IDS].[Directory_Divisions] 
		,arr_doc_vag.[id_division_on_amkr] as arrival_uz_vagon_id_division_on_amkr
		,arr_dir_division_amkr.[code] as arrival_uz_vagon_division_code					-- ��� ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_division_amkr.[name_division_ru] as arrival_uz_vagon_name_division_ru	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_division_amkr.[name_division_en] as arrival_uz_vagon_name_division_en	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_division_amkr.[division_abbr_ru] as arrival_uz_vagon_division_abbr_ru	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_division_amkr.[division_abbr_en] as arrival_uz_vagon_division_abbr_en	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_division_amkr.[id_type_devision] as arrival_uz_vagon_id_type_devision	-- id ���� ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--=============== �������� �������� ==================	
		,sap_is.[KOD_R_10] as sap_incoming_supply_kod_r_10
		--============================================================
		--> ���������� � ������ �� ����� �������
		--============================================================
		--> �������� �� ����� ������� [IDS].[Directory_OperatorsWagons]
		,dir_owg.[group] as operators_wagons_group
		,wag_rent.[id_operator] as wagons_rent_id_operator			-- id ������ �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_operator.[operators_ru] as wagons_rent_operators_ru	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_operator.[operators_en] as wagons_rent_operators_en	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_operator.[abbr_ru] as wagons_rent_operator_abbr_ru		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_operator.[abbr_en] as wagons_rent_operator_abbr_en		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,wag_rent.[rent_start] as wagons_rent_start					-- ������ ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Arrival_UZ_Vagon]
		,wag_rent.[rent_end] as wagons_rent_end						-- ����� ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_operator.[paid] as wagons_rent_operator_paid			-- ������� ��������� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_operator.[color] as wagons_rent_operator_color			-- ���� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		--> �������� �� ����� ������� [IDS].[Directory_ConditionArrival]
		,wio.[id_condition] as id_condition
		,dir_cond.condition_name_ru as condition_name_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_cond.condition_name_en as condition_name_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_cond.condition_abbr_ru as condition_abbr_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_cond.condition_abbr_en as condition_abbr_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,dir_cond.repairs as condition_repairs	

		--=============== ������� �� ����� ������� ==================
		,wim.id_station as id_station_amkr
		,dir_division_amkr.station_name_ru as station_amkr_name_ru
		,dir_division_amkr.station_name_en as station_amkr_name_en
		,dir_division_amkr.station_abbr_ru as station_amkr_abbr_ru
		,dir_division_amkr.station_abbr_en as station_amkr_abbr_en
		--=============== ���� �� ����� ������� ==================
		,wim.[id_way] as id_way
		,dir_way.[id_park] as id_park
		,dir_way.[way_num_ru] as way_num_ru
		,dir_way.[way_num_en] as way_num_en
		,dir_way.[way_name_ru] as way_name_ru
		,dir_way.[way_name_en] as way_name_en
		,dir_way.[way_abbr_ru] as way_abbr_ru
		,dir_way.[way_abbr_en] as way_abbr_en
		,wim.[way_start] as way_start
		,wim.[way_end] as way_end
		,wim.note as wim_note
		--=============== ������� �� ����� ������� ==================
		,wim.[id_outer_way] as id_outer_way
		,outer_ways.[name_outer_way_ru] as outer_way_name_ru
		,outer_ways.[name_outer_way_en] as outer_way_name_en
		,wim.[outer_way_start] as outer_way_start
		,wim.[outer_way_end] as outer_way_end
		--=============== �������� ������ �� ������ ������� ==================
		--> ��������
		,dir_operation.[id] as id_operation
		,dir_operation.[operation_name_ru] as operation_name_ru
		,dir_operation.[operation_name_en] as operation_name_en
		,wio.[operation_start] as operation_start
		,wio.[operation_end] as operation_end
		--> ��������� ��������
		,load_status.[id] as id_loading_status
		,load_status.[loading_status_ru] as loading_status_ru
		,load_status.[loading_status_en] as loading_status_en
		--> ����������� ����������� ��������
		,wio.[id_organization_service] as id_organization_service
		,dir_org_service.[organization_service_ru] as organization_service_ru
		,dir_org_service.[organization_service_en] as organization_service_en
		--> ��������� ���������� �� ����������� ����� �� ����
		,move_cargo.id as move_cargo_id		
		,move_cargo.[internal_doc_num] as move_cargo_internal_doc_num
		,move_cargo.[id_weighing_num] as move_cargo_id_weighing_num
		,move_cargo.[doc_received] as move_cargo_doc_received
		,move_cargo.[id_cargo] as move_cargo_id_cargo
		,move_cargo.[id_internal_cargo] as move_cargo_id_internal_cargo
		,move_cargo.[id_division_from] as move_cargo_id_division_from
		,move_cargo.[id_division_on] as move_cargo_id_division_on
		,move_cargo.[code_external_station] as move_cargo_code_external_station
		,move_cargo.[empty] as move_cargo_empty
		,move_cargo.[vesg] as move_cargo_vesg
		--> 
		,view_cargo_name_ru = (CASE 
		WHEN (move_cargo.id is not null) 
		THEN (CASE WHEN dir_cargo.id_group is not null THEN dir_cargo.cargo_name_ru ELSE dir_int_cargo.cargo_name_ru END)  
		ELSE arr_dir_cargo.cargo_name_ru 
		END)
		,view_cargo_name_en = (CASE 
		WHEN (move_cargo.id is not null) 
		THEN (CASE WHEN dir_cargo.id_group is not null THEN dir_cargo.cargo_name_en ELSE dir_int_cargo.cargo_name_en END)  
		ELSE arr_dir_cargo.cargo_name_en 
		END)
		,view_division_from_abbr_ru = (CASE 
		WHEN (move_cargo.id is not null and load_status.id not in (0, 3, 8)) 
		THEN dir_division_from.division_abbr_ru 
		ELSE null 
		END)
		,view_division_from_abbr_en = (CASE 
		WHEN (move_cargo.id is not null and load_status.id not in (0, 3, 8)) 
		THEN dir_division_from.division_abbr_en 
		ELSE null 
		END)
		,view_division_on_abbr_ru = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_division_on.division_abbr_ru ELSE arr_dir_division_amkr.division_abbr_ru END)  
		ELSE null
		END)
		,view_division_on_abbr_en = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_division_on.division_abbr_en ELSE arr_dir_division_amkr.division_abbr_en END)  
		ELSE null
		END)
		,view_external_station_on_name_ru = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_ext_station.station_name_ru ELSE arr_dir_ext_station.station_name_ru END)  
		ELSE null
		END)
		,view_external_station_on_name_en = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_ext_station.station_name_en ELSE arr_dir_ext_station.station_name_en END)  
		ELSE null
		END)
		,view_station_from_amkr_abbr_ru = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_station_from_amkr.[station_abbr_ru] ELSE null END)  
		ELSE null
		END)
		,view_station_from_amkr_abbr_en = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_station_from_amkr.[station_abbr_en] ELSE null END)  
		ELSE null
		END)
		,view_station_on_amkr_abbr_ru = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_station_on_amkr.[station_abbr_ru] ELSE arr_dir_station_amkr.station_abbr_ru END)  
		ELSE null
		END)
		,view_station_on_amkr_abbr_en = (CASE 
		WHEN (load_status.id not in (0, 3, 8)) 
		THEN (CASE WHEN move_cargo.id is not null THEN dir_station_on_amkr.[station_abbr_en] ELSE arr_dir_station_amkr.station_abbr_en END)  
		ELSE null
		END)
		--> ���������� �� ���������� ��������� (��������)
		,wim_unload.id as wim_unload_id
		,wim_unload.[id_filing] as wim_unload_id_filing
		,wim_unload.[filing_start] as wim_unload_filing_start
		,wim_unload.[filing_end] as wim_unload_filing_end
		,wim_unload.[id_wio] as wim_unload_id_wio
		--> ���������� �� ���������� ��������� (��������)
		,wim_load.id as wim_load_id
		,wim_load.[id_filing] as wim_load_id_filing
		,wim_load.[filing_start] as wim_load_filing_start
		,wim_load.[filing_end] as wim_load_filing_end
		,wim_load.[id_wio] as wim_load_id_wio
		--> ���������� �� ���������� ��������� (�������)
		,wim_clear.id as wim_clear_id
		,wim_clear.[id_filing] as wim_clear_id_filing
		,wim_clear.[filing_start] as wim_clear_filing_start
		,wim_clear.[filing_end] as wim_clear_filing_end
		,wim_clear.[id_wio] as wim_clear_id_wio
		--> ������������� ������
		,instructional_letters_num = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt) THEN il.num ELSE null END
		,instructional_letters_datetime = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN il.dt ELSE null END
		,instructional_letters_station_code = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN il.destination_station ELSE null END
		,instructional_letters_station_name = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN let_station_uz.station ELSE null END
		,instructional_letters_note = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN il.[note] ELSE null END
		--> ����� �������, ���
		,idle_time = CASE WHEN arr_doc_vag.[cargo_returns] = 1 THEN (DATEDIFF(minute, arr_sost_old.[date_adoption] , @date)) ELSE ( DATEDIFF(minute, arr_sost.[date_adoption], @date)) END 
		--> ����� ������� ���, ���
		,idle_time_act = CASE WHEN arr_doc_vag.[cargo_returns] = 1 THEN (DATEDIFF(minute, arr_sost_old.[date_adoption_act] , @date)) ELSE ( DATEDIFF(minute, arr_sost.[date_adoption_act], @date)) END 
		--> ����������
		,wir.note as wir_note									-- ���������� �� ���� �������� ������
		,wir.note2 as wir_note2									-- ���������� �� ���� �������� ������
		,wir.highlight_color as wir_highlight_color				-- ��������� ������
		--> ��������� ��������
		,old_out_car.id as old_arrival_car_id_outgoing_car
		,old_out_car.id_outgoing_uz_vagon as old_arrival_car_id_outgoing_uz_vagon
		,old_out_sostav.date_outgoing as old_date_outgoing
		,old_out_sostav.date_outgoing_act as old_date_outgoing_act
		,old_out_uz_vag.[id_cargo] as old_outgoing_uz_vagon_id_cargo
		,old_out_dir_cargo.cargo_name_ru as old_outgoing_uz_vagon_cargo_name_ru
		,old_out_dir_cargo.cargo_name_en as old_outgoing_uz_vagon_cargo_name_en
		,old_out_uz_doc.[code_stn_to]  as old_outgoingl_uz_document_code_stn_to
		,old_out_ext_station_to.[station_name_ru] as old_outgoing_uz_document_station_to_name_ru
		,old_out_ext_station_to.[station_name_en] as old_outgoing_uz_document_station_to_name_en
		--============================================================
		--> ��������
		--============================================================
		--,out_car.[id] as outgoing_car_id
		--,out_sost.[id] as outgoing_sostav_id
		--,out_doc_vag.[id] as outgoing_uz_vagon_id
		--,out_doc_uz.[id]  as outgoing_uz_document_id
		----> ���� ��������
		--,out_sost.[date_readiness_amkr] as outgoing_sostav_date_readiness_amkr
		--,out_sost.[date_end_inspection_acceptance_delivery] as outgoing_sostav_date_end_inspection_acceptance_delivery
		--,out_sost.[date_end_inspection_loader] as outgoing_sostav_date_end_inspection_loader
		--,out_sost.[date_end_inspection_vagonnik] as outgoing_sostav_date_end_inspection_vagonnik
		--,out_sost.[date_show_wagons] as outgoing_sostav_date_show_wagons
		--,out_sost.[date_readiness_uz] as outgoing_sostav_date_readiness_uz
		--,out_sost.[date_outgoing] as outgoing_sostav_date_outgoing
		--,out_sost.[date_outgoing_act] as outgoing_sostav_date_outgoing_act
		--,out_sost.[date_departure_amkr] as outgoing_sostav_date_departure_amkr
		--=============== ��������� �������� ==================
		,sap_os.[VBELN] as sap_outgoing_supply_num
		,sap_os.[ERDAT] as sap_outgoing_supply_date
		,sap_os.[ZBEZEI] as sap_outgoing_supply_cargo_name
		,sap_os.[STAWN] as sap_outgoing_supply_cargo_code
		,sap_os.[NAME1_AG] as sap_outgoing_supply_shipper_name
		,sap_os.[KUNNR_AG] as sap_outgoing_supply_shipper_code
		,sap_os.[ZRWNAME] as sap_outgoing_supply_destination_station_name
		,sap_os.[ZENDSTAT] as sap_outgoing_supply_destination_station_code
		,sap_os.[ZCRSTNAME] as sap_outgoing_supply_border_checkpoint_name
		,sap_os.[ZCROSSSTAT] as sap_outgoing_supply_border_checkpoint_code
		,sap_os.[ZZVES_NETTO] as sap_outgoing_supply_netto
		,sap_os.[ABTNR] as sap_outgoing_supply_warehouse_code
		,sap_os.[VTEXT] as sap_outgoing_supply_warehouse_name
		,sap_os.[ZZDOLG] as sap_outgoing_supply_responsible_post
		,sap_os.[ZZFIO] as sap_outgoing_supply_responsible_fio
		,sap_os.[ZZPLATEL] as sap_outgoing_supply_payer_code
		,sap_os.[ZZNAME_PLATEL] as sap_outgoing_supply_payer_name

    --into view_operating_balance
	FROM [IDS].[WagonInternalMovement] as wim
	Left JOIN [IDS].[WagonInternalRoutes] as wir ON wir.id = wim.[id_wagon_internal_routes]
	--> �������� �� ������ �������
	--Left JOIN [IDS].[WagonInternalOperation] as wio ON wio.id = (select top(1) [id] FROM [IDS].[WagonInternalOperation] WHERE [id_wagon_internal_routes] = wir.id AND ([operation_start] <= @date and ([operation_end] >= @date or [operation_end] is null)) order by [operation_end] desc)
	--Left JOIN [IDS].[WagonInternalOperation] as wio ON wio.id = (select top(1) [id] FROM [IDS].[WagonInternalOperation] WHERE [id_wagon_internal_routes] = wir.id AND [operation_end] <= @date order by [operation_end] desc)
	Left JOIN [IDS].[WagonInternalOperation] as wio ON wio.id = (select top(1) [id] FROM [IDS].[WagonInternalOperation] WHERE [id_wagon_internal_routes] = wir.id AND ([operation_start] <= @date) order by [operation_end] desc)

	--> �������� ������
	Left JOIN [IDS].[ArrivalCars] as arr_car ON arr_car.id = wir.id_arrival_car 
	--> �������� �������
	Left JOIN [IDS].[ArrivalSostav] as arr_sost ON arr_sost.id = arr_car.id_arrival
	--> ���������� �������� ������� c ������ ��������
	Left JOIN IDS.ArrivalSostav as arr_sost_old ON arr_sost_old.id = [IDS].[get_old_id_arrival_of_wir_parent_id](wir.parent_id)

	--> �������� �� ��������
	Left JOIN [IDS].[Arrival_UZ_Vagon] as arr_doc_vag ON arr_doc_vag.id = arr_car.id_arrival_uz_vagon
	--> ��������� �� ������ ������� (������) �� �������� ������ �� ����
	Left JOIN [IDS].[Arrival_UZ_Document] as arr_doc_uz ON arr_doc_uz.id = arr_doc_vag.id_document

	--> �������� ������
	Left JOIN [IDS].[OutgoingCars] as out_car ON out_car.id = wir.id_outgoing_car
	--> �������� �������
	Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_sost.id = out_car.id_outgoing
	----> �������� �� ��������
	--Left JOIN [IDS].[Outgoing_UZ_Vagon] as out_doc_vag ON out_doc_vag.id = out_car.id_outgoing_uz_vagon
	----> ��������� �� ������ ������� (������) �� �������� ������ �� ����
	--Left JOIN [IDS].[Outgoing_UZ_Document] as out_doc_uz ON out_doc_uz.id = out_doc_vag.id_document

	--> ��������� SAP �������� ��������
	Left JOIN [IDS].[SAPIncomingSupply] as sap_is ON sap_is.id = wir.id_sap_incoming_supply
	--> ��������� SAP ��������� ��������
	Left JOIN [IDS].[SAPOutgoingSupply] as sap_os ON sap_os.id = wir.id_sap_outbound_supply


	Left JOIN [IDS].[Directory_Wagons] as dir_wag ON dir_wag.num = wir.num
	--> ���������� �������
	Left JOIN [IDS].[Directory_GenusWagons] as dir_rod ON dir_rod.id = dir_wag.id_genus
	--> ���������� ��� ������
	Left JOIN [IDS].[Directory_TypeWagons] as dir_type ON dir_type.id = arr_doc_vag.id_type
	--> ���������� ������ �� ��������
	Left JOIN [IDS].[Directory_Cargo] as arr_dir_cargo ON arr_dir_cargo.id = arr_doc_vag.id_cargo
	--> ���������� ������ ������ �� ��������
	Left JOIN [IDS].[Directory_CargoGroup] as arr_dir_group_cargo ON arr_dir_group_cargo.id = arr_dir_cargo.id_group
	--> ���������� ������ ����� �� ��������
	Left JOIN [IDS].[Directory_CargoETSNG] as arr_dir_cargo_etsng ON arr_dir_cargo_etsng.id = arr_dir_cargo.id_cargo_etsng
	--> ���������� ������ ��� �� ��������
	Left JOIN [IDS].[Directory_CargoGNG] as arr_dir_cargo_gng ON arr_dir_cargo_gng.id = arr_doc_vag.id_cargo_gng
	--> ���������� ���������� ������
	Left JOIN [IDS].[Directory_CertificationData] as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
	--> ���������� ����������� ���������
	Left JOIN [IDS].[Directory_CommercialCondition] as arr_comm_cond ON arr_comm_cond.id = arr_doc_vag.[id_commercial_condition]
	--> ���������� ������� ������� (�� �������� from)
	Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON arr_ext_station_from.code = arr_doc_uz.[code_stn_from]
	--> ���������� �������� ����� (�� �������� from)
	Left JOIN [IDS].[Directory_InlandRailway] as arr_ir_from ON arr_ir_from.code = arr_ext_station_from.[code_inlandrailway]
	--> ���������� ������������� (��� ����������) ��������
	Left JOIN [IDS].[Directory_Divisions] as arr_dir_division_amkr ON arr_dir_division_amkr.id = arr_doc_vag.id_division_on_amkr
	--> ���������� ������� ����������� (������� �������) ��������
	Left JOIN IDS.Directory_ExternalStation as arr_dir_ext_station ON arr_dir_ext_station.code = arr_doc_uz.code_stn_from
	--> ���������� ������� ���� (������� ���������� ����) ��������
	Left JOIN IDS.Directory_Station as arr_dir_station_amkr ON arr_dir_station_amkr.id = arr_doc_vag.id_station_on_amkr

	--> ���������� ������� ���� (������� ������� ����)
	Left JOIN IDS.Directory_Station as dir_division_amkr ON dir_division_amkr.id =  wim.id_station
	--> ���������� ������� ����
	Left JOIN [IDS].[Directory_Ways] as dir_way ON dir_way.id = wim.[id_way]
	--> ���������� ������� ���� ��������
	Left JOIN [IDS].[Directory_OuterWays] as outer_ways ON outer_ways.id = wim.id_outer_way
	
	--> ���������� �������� ��� ������� (�� ������ �������)
	Left JOIN [IDS].[Directory_WagonOperations] as dir_operation ON dir_operation.id = wio.id_operation
	--> ���������� �������� �������� (�� ������ �������)
	Left JOIN [IDS].[Directory_WagonLoadingStatus] as load_status ON load_status.id = wio.id_loading_status
	--> ���������� ����������� (�� ������ �������)
	Left JOIN [IDS].[Directory_OrganizationService] as dir_org_service ON dir_org_service.id = wio.[id_organization_service]
	--> ���������� ��������� ����������� ������ (�� ������ �������)
	Left JOIN .[IDS].[WagonInternalMoveCargo] as move_cargo ON move_cargo.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalMoveCargo] where [id_wagon_internal_routes]=wir.id AND [id_wim_load]<=wim.id order by id desc)
	--> ���� (�� ������ �������)
	Left JOIN [IDS].[Directory_Cargo] as dir_cargo ON dir_cargo.id =  move_cargo.[id_cargo]
	--> ������ ����� (�� ������ �������)
	Left JOIN [IDS].[Directory_CargoGroup] as dir_group_cargo ON dir_group_cargo.id = dir_cargo.id_group
	--> ����(����������) (�� ������ �������)
	Left JOIN [IDS].[Directory_InternalCargo] as dir_int_cargo ON dir_int_cargo.id = move_cargo.[id_internal_cargo]
	--> ������ �����(�����������) (�� ������ �������)
	Left JOIN [IDS].[Directory_InternalCargoGroup] as dir_group_int_cargo ON dir_group_int_cargo.id = dir_int_cargo.[id_group]
	--> ���������� ������������� (��� �����������)(�� ������ �������)
	Left JOIN [IDS].[Directory_Divisions] as dir_division_from ON dir_division_from.id = move_cargo.[id_division_from]
	--> ���������� ������������� (��� ����������) (�� ������ �������)
	Left JOIN [IDS].[Directory_Divisions] as dir_division_on ON dir_division_on.id = move_cargo.[id_division_on]
	--> ���������� ������� ����������� (������� ������� ���������) (�� ������ �������)
	Left JOIN IDS.Directory_ExternalStation as dir_ext_station ON dir_ext_station.code = move_cargo.[code_external_station]
	-- ���������� ������� �������� �� ���� (�� ������ �������)
	Left JOIN [IDS].[Directory_Station] as dir_station_from_amkr ON dir_station_from_amkr.id = move_cargo.[id_station_from_amkr]
	-- ���������� ������� �������� �� ���� (�� ������ �������)
	Left JOIN [IDS].[Directory_Station] as dir_station_on_amkr ON dir_station_on_amkr.id = move_cargo.[id_station_on_amkr]

	--> ���������� ����� �� ��������		
	Left JOIN [IDS].[Directory_WagonsRent] as arr_wag_rent ON arr_wag_rent.id = arr_doc_vag.id_wagons_rent_arrival
	--> ���������� ����� (�� ������ �������)
	Left JOIN [IDS].[Directory_WagonsRent] as wag_rent ON wag_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@date order by [id] desc)
	--> ���������� �������� ������ �� ��������
	Left JOIN [IDS].[Directory_OperatorsWagons] as arr_dir_operator ON arr_dir_operator.id =  arr_wag_rent.id_operator 
	--> ���������� �������� ������ (�� ������ �������)
	Left JOIN [IDS].[Directory_OperatorsWagons] as dir_operator ON dir_operator.id  = wag_rent.id_operator
	--> ���������� �������� �� ��������
	Left JOIN [IDS].[Directory_ConditionArrival] as arr_dir_cond ON arr_dir_cond.id  = arr_doc_vag.id_condition
	--> ���������� ��������  (�� ������ �������)
	Left JOIN [IDS].[Directory_ConditionArrival] as dir_cond ON dir_cond.id = wio.id_condition
	--> ��������� ������ ����������	��������	
	Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as arr_dir_owg ON arr_dir_owg.[id_operator] = arr_wag_rent.id_operator	
	--> ��������� ������ ����������	(�� ������ �������)
	Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_owg ON wag_rent.id_operator = dir_owg.[id_operator]

	--> ������ ���������
	--Left JOIN [IDS].[WagonInternalMovement] as wim_unload ON wim_unload.id = [IDS].get_last_id_wim_filing_of_type(wir.id, wim.id, 1)
	--Left JOIN [IDS].[WagonInternalMovement] as wim_load ON wim_load.id =  [IDS].get_last_id_wim_filing_of_type(wir.id, wim.id, 2)
	--Left JOIN [IDS].[WagonInternalMovement] as wim_clear ON wim_clear.id =  [IDS].get_last_id_wim_filing_of_type(wir.id, wim.id, 3)
	
	Left JOIN [IDS].[WagonInternalMovement] as wim_unload ON wim_unload.id = (SELECT top(1) wim_f1.[id] FROM [IDS].[WagonInternalMovement] as wim_f1 Left JOIN [IDS].[WagonFiling] as wf ON wf.id = wim_f1.[id_filing]
		where wim_f1.[id_wagon_internal_routes]=wir.id and wim_f1.[id_filing] is not null and wim_f1.id <= wim.id and wf.type_filing = 1 
		order by wim_f1.id desc)

   Left JOIN [IDS].[WagonInternalMovement] as wim_load ON wim_load.id = (SELECT top(1) wim_f2.[id] FROM [IDS].[WagonInternalMovement] as wim_f2 Left JOIN [IDS].[WagonFiling] as wf ON wf.id = wim_f2.[id_filing]
		where wim_f2.[id_wagon_internal_routes]=wir.id and wim_f2.[id_filing] is not null and wim_f2.id <= wim.id and wf.type_filing = 2 
		order by wim_f2.id desc)

	Left JOIN [IDS].[WagonInternalMovement] as wim_clear ON wim_clear.id = (SELECT top(1) wim_f3.[id] FROM [IDS].[WagonInternalMovement] as wim_f3 Left JOIN [IDS].[WagonFiling] as wf ON wf.id = wim_f3.[id_filing]
		where wim_f3.[id_wagon_internal_routes]=wir.id and wim_f3.[id_filing] is not null and wim_f3.id <= wim.id and wf.type_filing = 3 
		order by wim_f3.id desc)



	--(SELECT top(1) wim_f.[id] FROM [IDS].[WagonInternalMovement] as wim_f Left JOIN [IDS].[WagonFiling] as wf ON wf.id = wim_f.[id_filing]
	--	where wim_f.[id_wagon_internal_routes]=wir.id and wim_f.[id_filing] is not null and wim_f.id < wim.id and wf.type_filing = 1
	--	order by wim_f.id desc)
	--Left JOIN [IDS].[WagonInternalMovement] as wim_load ON wim_load.id = (SELECT top(1) wim_f.[id] FROM [IDS].[WagonInternalMovement] as wim_f Left JOIN [IDS].[WagonFiling] as wf ON wf.id = wim_f.[id_filing]
	--	where wim_f.[id_wagon_internal_routes]=wir.id and wim_f.[id_filing] is not null and wim_f.id < wim.id and wf.type_filing = 2
	--	order by wim_f.id desc)
	--Left JOIN [IDS].[WagonInternalMovement] as wim_clear ON wim_clear.id = (SELECT top(1) wim_f.[id] FROM [IDS].[WagonInternalMovement] as wim_f Left JOIN [IDS].[WagonFiling] as wf ON wf.id = wim_f.[id_filing]
	--	where wim_f.[id_wagon_internal_routes]=wir.id and wim_f.[id_filing] is not null and wim_f.id < wim.id and wf.type_filing = 3
	--	order by wim_f.id desc)


	--==== ������������� ������ =====================================================================
	--> �������� ������� �� ������
	--Left JOIN [IDS].[InstructionalLettersWagon] as ilw  ON ilw.id = (SELECT TOP (1) [id] FROM [IDS].[InstructionalLettersWagon] where [num] =wir.num and [close] is null order by id desc)
	Left JOIN [IDS].[InstructionalLettersWagon] as ilw  ON ilw.id = (SELECT TOP (1) ilws.[id] FROM [IDS].[InstructionalLettersWagon] as ilws Left JOIN [IDS].[InstructionalLetters] as ils ON ils.id =  ilws.id_instructional_letters
	where ilws.[num]=wir.num and ilws.[close] is null order by ilws.[id] desc) -- and ils.dt >  DATEADD(day, -90, @date) 
	
	--> �������� �����
	Left JOIN [IDS].[InstructionalLetters] as il ON ilw.id_instructional_letters = il.id
	--> ���������� ������� ������� ��
	Left JOIN UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs	
	
	--> ���������� �� ��������� ��������
	Left JOIN [IDS].[WagonInternalRoutes] as wir_old ON wir_old.id = (select id from IDS.WagonInternalRoutes where id = wir.parent_id and num = wir.num)
	Left JOIN [IDS].[OutgoingCars] as old_out_car ON old_out_car.id = wir_old.id_outgoing_car
	Left JOIN [IDS].[OutgoingSostav] as old_out_sostav ON old_out_sostav.id = old_out_car.id_outgoing
	Left JOIN [IDS].[Outgoing_UZ_Vagon] as old_out_uz_vag ON old_out_uz_vag.id = old_out_car.id_outgoing_uz_vagon
	Left JOIN [IDS].[Outgoing_UZ_Document] as old_out_uz_doc ON old_out_uz_doc.id = old_out_uz_vag.id_document
	Left JOIN [IDS].[Directory_Cargo] as old_out_dir_cargo ON old_out_dir_cargo.id =  old_out_uz_vag.id_cargo
	Left JOIN [IDS].[Directory_ExternalStation] as old_out_ext_station_to ON old_out_uz_doc.[code_stn_to] = old_out_ext_station_to.code

	WHERE 
	wim.id IN (SELECT max(wim_s.id) FROM [IDS].[WagonInternalMovement] as wim_s
	WHERE wim_s.id_station <> 10 AND ((wim_s.[id_outer_way] is null and wim_s.[way_start]<=@date and (wim_s.[way_end] >= @date OR wim_s.[way_end] is null)) 
	OR (wim_s.[id_outer_way] is not null and wim_s.[outer_way_start] <=@date and (wim_s.[outer_way_end] >= @date OR wim_s.[outer_way_end] is null)))
	group by wim_s.id_wagon_internal_routes)
	and wir.num = 63285050 
	AND (dir_rod.rod_uz <> 90 OR dir_rod.rod_uz is null)
	AND (NOT dir_owg.[group] in ('amkr_vz') OR dir_owg.[group] is null)
	AND (NOT arr_doc_uz.[klient] = 1 OR arr_doc_uz.[klient] is null)
	AND arr_sost.[date_adoption] <= @date
	AND (out_sost.[date_outgoing] is null OR out_sost.[date_outgoing] > @date)
