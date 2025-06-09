USE [KRR-PA-CNT-Railway]
	declare @start datetime = '2025-05-01 00:01:00'
	declare @stop datetime = '2025-05-31 23:59:00'
	declare @IsActs bit = 1


		SELECT
		out_car.[id] as outgoing_car_id
		,out_car.[num]
		,out_car.[position] as outgoing_car_position
		--=============== �������� ������ �� ������ ������� ==================
		,wir.id as id_wir
		,wir.note as wir_note									-- ���������� �� ���� �������� ������
		,wir.note2 as wir_note2									-- ���������� �� ���� �������� ������
		--> ��������
		,dir_operation.[id] as current_id_operation
		,dir_operation.[operation_name_ru] as current_operation_name_ru
		,dir_operation.[operation_name_en] as current_operation_name_en
		,wio.[operation_start] as current_operation_start
		,wio.[operation_end] as current_operation_end
		--> ��������� ��������
		,load_status.[id] as current_id_loading_status
		,load_status.[loading_status_ru] as current_loading_status_ru
		,load_status.[loading_status_en] as current_loading_status_en
		--============================================================
		--> ��������
		--============================================================
		--> �������� ������� [IDS].[ArrivalCars]
		,arr_car.[id] as arrival_car_id
		,arr_car.[position] as arrival_car_position
		,arr_car.[position_arrival] as arrival_car_position_arrival
		,arr_car.[consignee] as arrival_car_consignee
		,arr_car.[num_doc] as arrival_car_num_doc
		,arr_car.[note] as arrival_car_note
		,arr_car.[date_adoption_act] as arrival_car_date_adoption_act
		,arr_car.[arrival] as arrival_car_arrival
		,arr_car.[arrival_user] as arrival_car_arrival_user
		,arr_car.[create] as arrival_car_create
		,arr_car.[create_user] as arrival_car_create_user
		,arr_car.[change] as arrival_car_change
		,arr_car.[change_user] as arrival_car_change_user
		--============================================================
		--> �������� ������� [IDS].[ArrivalSostav]
		,arr_sost.[id] as arrival_sostav_id
		,arr_sost.[id_arrived] as arrival_sostav_id_arrived
		,arr_sost.[id_sostav] as arrival_sostav_id_sostav
		,arr_sost.[train] as arrival_sostav_train
		,arr_sost.[composition_index] as arrival_sostav_composition_index
		,arr_sost.[date_arrival] as arrival_sostav_date_arrival
		,arrival_sostav_old_date_adoption = CASE  WHEN arr_doc_vag.[cargo_returns] = 1 THEN arr_sost_old.[date_adoption] ELSE arr_sost.[date_adoption] END
		,arrival_sostav_old_date_adoption_act = CASE  WHEN arr_doc_vag.[cargo_returns] = 1 THEN arr_sost_old.[date_adoption_act] ELSE arr_sost.[date_adoption_act] END
		,arr_sost.[date_adoption] as arrival_sostav_date_adoption
		,arr_sost.[date_adoption_act] as arrival_sostav_date_adoption_act
		,arr_sost.[numeration] as arrival_sostav_numeration
		,arr_sost.[num_doc] as arrival_sostav_num_doc
		,arr_sost.[count] as arrival_sostav_count
		,arr_sost.[status] as arrival_sostav_status
		,arr_sost.[note] as arrival_sostav_note
		,arr_sost.[create] as arrival_sostav_create
		,arr_sost.[create_user] as arrival_sostav_create_user
		,arr_sost.[change] as arrival_sostav_change
		,arr_sost.[change_user] as arrival_sostav_change_user
		-->IDS.Directory_Station
		,arr_sost.[id_station_from] as arrival_sostav_id_station_from
		,arr_dir_station_from.station_name_ru as arrival_sostav_station_from_name_ru
		,arr_dir_station_from.station_name_en as arrival_sostav_station_from_name_en
		,arr_dir_station_from.station_abbr_ru as arrival_sostav_station_from_abbr_ru
		,arr_dir_station_from.station_abbr_en as arrival_sostav_station_from_abbr_en
		-->IDS.Directory_Station
		,arr_sost.[id_station_on] as arrival_sostav_id_station_on
		,arr_dir_station_on.station_name_ru as arrival_sostav_station_on_name_ru
		,arr_dir_station_on.station_name_en as arrival_sostav_station_on_name_en
		,arr_dir_station_on.station_abbr_ru as arrival_sostav_station_on_abbr_ru
		,arr_dir_station_on.station_abbr_en as arrival_sostav_station_on_abbr_en
		--> [IDS].[Directory_Ways]
		,arr_sost.[id_way] as arrival_sostav_id_way
		,arr_dir_way_on.[id_park] as arrival_sostav_way_on_id_park
		,arr_dir_way_on.[way_num_ru] as arrival_sostav_way_on_num_ru
		,arr_dir_way_on.[way_num_en] as arrival_sostav_way_on_num_en
		,arr_dir_way_on.[way_name_ru] as arrival_sostav_way_on_name_ru
		,arr_dir_way_on.[way_name_en] as arrival_sostav_way_on_name_en
		,arr_dir_way_on.[way_abbr_ru] as arrival_sostav_way_on_abbr_ru
		,arr_dir_way_on.[way_abbr_en] as arrival_sostav_way_on_abbr_en
		--============================================================
		--> �������� �� ����� �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_doc_vag.[id] as arrival_uz_vagon_id
		,arr_doc_vag.[id_arrival] as arrival_uz_vagon_id_arrival
		--> �������� �� �������� [IDS].[Directory_ConditionArrival]
		,arr_doc_vag.[id_condition] as arrival_uz_vagon_id_condition
		,arr_dir_cond.condition_name_ru as arrival_uz_vagon_condition_name_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_name_en as arrival_uz_vagon_condition_name_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_ru as arrival_uz_vagon_condition_abbr_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.condition_abbr_en as arrival_uz_vagon_condition_abbr_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Arrival_UZ_Vagon]
		,arr_dir_cond.repairs as arrival_uz_vagon_condition_repairs						-- ���������� [IDS].[Directory_ConditionArrival] �� �������� ������� ������ [IDS].[Arrival_UZ_Vagon]
		--> IDS.Directory_TypeWagons
		,arr_doc_vag.[id_type] as arrival_uz_vagon_id_type
		,dir_type.type_ru as arrival_uz_vagon_type_ru
		,dir_type.type_en as arrival_uz_vagon_type_en
		,arr_doc_vag.[gruzp] as arrival_uz_vagon_gruzp
		,arr_doc_vag.[u_tara] as arrival_uz_vagon_u_tara
		,arr_doc_vag.[ves_tary_arc] as arrival_uz_vagon_ves_tary_arc
		,arr_doc_vag.[route] as arrival_uz_vagon_route
		,arr_doc_vag.[note_vagon] as arrival_uz_vagon_note_vagon
		--> IDS.Directory_Cargo
		,arr_doc_vag.[id_cargo] as arrival_uz_vagon_id_cargo
		,arr_dir_cargo.cargo_name_ru as arrival_uz_vagon_cargo_name_ru
		,arr_dir_cargo.cargo_name_en as arrival_uz_vagon_cargo_name_en
		--> ���������� ������ ����� [IDS].[Directory_CargoGroup]	
		,arr_dir_cargo.[id_group] as arrival_uz_vagon_id_group							-- id ������ ����� [IDS].[Directory_CargoGroup] �� �������� [IDS].[Arrival_UZ_Vagon]
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
		,arr_doc_vag.[kol_pac] as arrival_uz_vagon_kol_pac
		,arr_doc_vag.[pac] as arrival_uz_vagon_pac
		,arr_doc_vag.[vesg] as arrival_uz_vagon_vesg
		,arr_doc_vag.[vesg_reweighing] as arrival_uz_vagon_vesg_reweighing
		,arr_doc_vag.[nom_zpu] as arrival_uz_vagon_nom_zpu
		,arr_doc_vag.[danger] as arrival_uz_vagon_danger
		,arr_doc_vag.[danger_kod] as arrival_uz_vagon_danger_kod
		,arr_doc_vag.[cargo_returns] as arrival_uz_vagon_cargo_returns
		--> IDS.Directory_Station
		,arr_doc_vag.[id_station_on_amkr] as arrival_uz_vagon_id_station_on_amkr
		,arr_dir_station_amkr.station_name_ru as arrival_uz_vagon_station_amkr_name_ru
		,arr_dir_station_amkr.station_name_en as arrival_uz_vagon_tation_amkr_name_en
		,arr_dir_station_amkr.station_abbr_ru as arrival_uz_vagon_station_amkr_abbr_ru
		,arr_dir_station_amkr.station_abbr_en as arrival_uz_vagon_station_amkr_abbr_en
		--> [IDS].[Directory_Divisions] 
		,arr_doc_vag.[id_division_on_amkr] as arrival_uz_vagon_id_division_on_amkr
		,arr_dir_divis_amkr.[code] as arrival_uz_vagon_division_code					-- ��� ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_ru] as arrival_uz_vagon_name_division_ru	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_en] as arrival_uz_vagon_name_division_en	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_ru] as arrival_uz_vagon_division_abbr_ru	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_en] as arrival_uz_vagon_division_abbr_en	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[id_type_devision] as arrival_uz_vagon_id_type_devision	-- id ���� ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_doc_vag.[empty_car] as arrival_uz_vagon_empty_car
		,arr_doc_vag.[kol_conductor] as arrival_uz_vagon_kol_conductor
		,arr_doc_vag.[kol_os] as arrival_uz_vagon_kol_os
		,arr_doc_vag.[usl_tip] as arrival_uz_vagon_usl_tip
		,arr_doc_vag.[date_rem_uz] as arrival_uz_vagon_date_rem_uz
		,arr_doc_vag.[date_rem_vag] as arrival_uz_vagon_date_rem_vag
		,arr_doc_vag.[id_type_ownership] as arrival_uz_vagon_id_type_ownership
		,arr_doc_vag.[gruzp_uz] as arrival_uz_vagon_gruzp_uz
		,arr_doc_vag.[tara_uz] as arrival_uz_vagon_tara_uz
		,arr_doc_vag.[zayava] as arrival_uz_vagon_zayava
		,arr_doc_vag.[manual] as arrival_uz_vagon_manual
		,arr_doc_vag.[pay_summa] as arrival_uz_vagon_pay_summa
		,arr_doc_vag.[id_wagons_rent_arrival] as arrival_uz_vagon_id_wagons_rent_arrival
		,arr_doc_vag.[create] as arrival_uz_vagon_create
		,arr_doc_vag.[create_user] as arrival_uz_vagon_create_user
		,arr_doc_vag.[change] as arrival_uz_vagon_change
		,arr_doc_vag.[change_user] as arrival_uz_vagon_change_user
		--============================================================
		--> �������� �� ������ �� �������� [IDS].[Arrival_UZ_Document]
		,arr_doc_uz.[id]  as arrival_uz_document_id
		,arr_doc_uz.[id_doc_uz]  as arrival_uz_document_id_doc_uz
		,arr_doc_uz.[nom_doc]  as arrival_uz_document_nom_doc
		,arr_doc_uz.[nom_main_doc]  as arrival_uz_document_nom_main_doc
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
		--> [IDS].[Directory_ExternalStation]
		,arr_doc_uz.[code_stn_to]  as arrival_uz_document_code_stn_to
		,arr_ext_station_to.[station_name_ru] as arrival_uz_document_station_to_name_ru
		,arr_ext_station_to.[station_name_en] as arrival_uz_document_station_to_name_en
		--> [IDS].[Directory_InlandRailway]
		,arr_ext_station_to.[code_inlandrailway] as arrival_uz_document_to_code_inlandrailway
		,arr_ir_to.[inlandrailway_name_ru] as arrival_uz_document_to_inlandrailway_name_ru
		,arr_ir_to.[inlandrailway_name_en] as arrival_uz_document_to_inlandrailway_name_en
		,arr_ir_to.[inlandrailway_abbr_ru] as arrival_uz_document_to_inlandrailway_abbr_ru
		,arr_ir_to.[inlandrailway_abbr_en] as arrival_uz_document_to_inlandrailway_abbr_en
		,arr_ir_to.[code_railway] as arrival_uz_document_to_code_railway
		-->  [IDS].[Directory_BorderCheckpoint]
		,arr_doc_uz.[code_border_checkpoint]  as arrival_uz_document_code_border_checkpoint
		,arr_border_checkpoint.[station_name_ru] as arrival_uz_document_border_checkpoint_station_name_ru
		,arr_border_checkpoint.[station_name_en] as arrival_uz_document_border_checkpoint_station_name_en
		,arr_border_checkpoint.[code_inlandrailway] as arrival_uz_document_border_checkpoint_code_inlandrailway
		,arr_doc_uz.[cross_time]  as arrival_uz_document_cross_time
		--> [IDS].[Directory_Shipper]
		,arr_doc_uz.[code_shipper]  as arrival_uz_document_code_shipper
		,arr_shipper.[shipper_name_ru] as arrival_uz_document_shipper_name_ru
		,arr_shipper.[shipper_name_en] as arrival_uz_document_shipper_name_en
		--> [IDS].[Directory_Consignee]
		,arr_doc_uz.[code_consignee] as arrival_uz_document_code_consignee
		,arr_consignee.[name] as arrival_uz_document_name_consignee
		,arr_doc_uz.[klient]  as arrival_uz_document_klient
		--> [IDS].[Directory_PayerArrival]
		,arr_doc_uz.[code_payer_sender]  as arrival_uz_document_code_payer_sender
		,arr_payer_send.[payer_name_ru] as arrival_uz_document_payer_sender_name_ru
		,arr_payer_send.[payer_name_en] as arrival_uz_document_payer_sender_name_en
		--> [IDS].[Directory_PayerArrival]
		,arr_doc_uz.[code_payer_arrival]  as arrival_uz_document_code_payer_arrival
		,arr_payer_arr.[payer_name_ru] as arrival_uz_document_payer_arrival_name_ru
		,arr_payer_arr.[payer_name_en] as arrival_uz_document_payer_arriva_name_en
		--> [IDS].[Directory_PayerLocal]
		,arr_doc_uz.[code_payer_local] as arrival_uz_code_payer_local
		,arr_payer_local.[payer_name_ru] as arrival_uz_document_payer_local_name_ru
		,arr_payer_local.[payer_name_en] as arrival_uz_document_payer_local_name_en
        ,arr_doc_uz.[tariff_contract] as arrival_uz_tariff_contract
		,arr_doc_uz.[calc_payer] as arrival_uz_calc_payer
		,arr_doc_uz.[calc_payer_user] as arrival_uz_calc_payer_user
		,arr_doc_uz.[distance_way] as arrival_uz_document_distance_way
		,arr_doc_uz.[note] as arrival_uz_document_note
		,arr_doc_uz.[parent_id] as arrival_uz_document_parent_id
		--
		,arr_doc_uz.[manual] as arrival_uz_manual
		,arr_doc_uz.[date_otpr] as arrival_uz_date_otpr
		,arr_doc_uz.[srok_end] as arrival_uz_srok_end
		,arr_doc_uz.[date_grpol] as arrival_uz_date_grpol
		,arr_doc_uz.[date_pr] as arrival_uz_date_pr
		,arr_doc_uz.[date_vid] as arrival_uz_date_vid
		--
		,arr_doc_uz.[IdActServices1] as arrival_uz_IdActServices1
		,arr_doc_uz.[NumActServices1] as arrival_uz_NumActServices1
		,arr_doc_uz.[IdActServices2] as arrival_uz_IdActServices2
		,arr_doc_uz.[NumActServices2] as arrival_uz_NumActServices2
		,arr_doc_uz.[IdActServices3] as arrival_uz_IdActServices3
		,arr_doc_uz.[NumActServices3] as arrival_uz_NumActServices3
		,arr_doc_uz.[Verification] as arrival_uz_Verification
		,arr_doc_uz.[VerificationUser] as arrival_uz_VerificationUser
		,arr_doc_uz.[create] as arrival_uz_document_create
		,arr_doc_uz.[create_user] as arrival_uz_document_create_user
		,arr_doc_uz.[change] as arrival_uz_document_change
		,arr_doc_uz.[change_user] as arrival_uz_document_change_user
		--============================================================
		--> ��������
		--============================================================
		--> �������� ������� [IDS].[OutgoingCars]
		,out_car.[position_outgoing] as outgoing_car_position_outgoing
		,out_car.[num_doc] as outgoing_car_num_doc														-- ����� ���������(�� ��������)
		,out_car.[note] as outgoing_car_note															-- ���������� ������ �� ��������
		,out_car.[date_outgoing_act] as outgoing_car_date_outgoing_act									-- ���� �� ����
		,out_car.[outgoing] as outgoing_car_outgoing													-- ����� ��� ���� (���� � �����)
		,out_car.[outgoing_user] as outgoing_car_outgoing_user											-- ����� ��� ���� (������������)
		--> ������� ���������� [IDS].[OutgoingDetentionReturn]
		,out_car.[id_outgoing_detention] as outgoing_car_id_outgoing_detention							-- id ������ ���������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_detect_return.id_detention_return as outgoing_car_id_detention_return						-- id ������ �������� ���������� [IDS].[Directory_Reason_Discrepancy] �� ������ ���������� [IDS].[OutgoingDetentionReturn]
		,out_dir_dr.[cause_ru] as outgoing_car_detention_cause_ru										-- ���������� [IDS].[Directory_DetentionReturn] �� ������ ���������� [IDS].[OutgoingDetentionReturn]]
		,out_dir_dr.[cause_en] as outgoing_car_detention_cause_en										-- ���������� [IDS].[Directory_DetentionReturn] �� ������ ���������� [IDS].[OutgoingDetentionReturn]
		,out_detect_return.[type_detention_return] as outgoing_car_detention_type_detention_return		-- ��� ���������� [IDS].[OutgoingDetentionReturn] �� ������ ���������� [IDS].[OutgoingDetentionReturn]
		,out_detect_return.[date_start] as outgoing_car_detention_date_start							-- ���� ������ ���������� [IDS].[OutgoingDetentionReturn] �� ������ ���������� [IDS].[OutgoingDetentionReturn]
		,out_detect_return.[date_stop] as outgoing_car_detention_date_stop								-- ���� ����� ���������� [IDS].[OutgoingDetentionReturn] �� ������ ���������� [IDS].[OutgoingDetentionReturn]
		--> ������� ������������� [Directory_Reason_Discrepancy]
		,out_car.[id_reason_discrepancy_amkr] as outgoing_car_id_reason_discrepancy_amkr				-- id ������ ������������� ���� [IDS].[Directory_Reason_Discrepancy] �� �������� [IDS].[OutgoingCars]
		,out_dir_rd_amkr.[reason_discrepancy_name_ru] as outgoing_car_reason_discrepancy_amkr_name_ru	-- ������������� ���� [IDS].[Directory_Reason_Discrepancy] �� �������� [IDS].[OutgoingCars]
		,out_dir_rd_amkr.[reason_discrepancy_name_en] as outgoing_car_reason_discrepancy_amkr_name_en	-- ������������� ���� [IDS].[Directory_Reason_Discrepancy] �� �������� [IDS].[OutgoingCars]
		,out_car.[id_reason_discrepancy_uz] as outgoing_car_id_reason_discrepancy_uz					-- id ������ ������������� �� [IDS].[Directory_Reason_Discrepancy] �� �������� [IDS].[OutgoingCars]
		,out_dir_rd_uz.[reason_discrepancy_name_ru] as outgoing_car_reason_discrepancy_uz_name_ru		-- ������������� �� [IDS].[Directory_Reason_Discrepancy] �� �������� [IDS].[OutgoingCars]
		,out_dir_rd_uz.[reason_discrepancy_name_en] as outgoing_car_reason_discrepancy_uz_name_en		-- ������������� �� [IDS].[Directory_Reason_Discrepancy] �� �������� [IDS].[OutgoingCars]
		--> ������� ������ �� �������� [IDS].[OutgoingDetentionReturn]	
		,out_car.[id_outgoing_return_start] as outgoing_car_id_outgoing_return_start					-- id ������ ������ �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		--> ������� ������ [IDS].[Directory_DetentionReturn]
		,out_detect_return_start.[id_detention_return] as outgoing_car_id_detention_return_start		-- id ������ �������� [IDS].[Directory_DetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_dir_dr_start.[cause_ru] as outgoing_car_detention_cause_start_ru							-- ������� ������ [IDS].[Directory_DetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_dir_dr_start.[cause_en] as outgoing_car_detention_cause_start_en							-- ������� ������ [IDS].[Directory_DetentionReturn] �� �������� [IDS].[OutgoingCars]
		--
		,out_detect_return_start.[type_detention_return] as outgoing_car_return_start_type_detention_return -- ��� ������ �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_detect_return_start.[date_start] as outgoing_car_return_start_date_start						-- ���� ������ ������ �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_detect_return_start.[date_stop] as outgoing_car_return_start_date_stop							-- ���� ����� ������ �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_detect_return_start.[num_act] as outgoing_car_return_start_num_act								-- � ���� ������ �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_detect_return_start.[date_act] as outgoing_car_return_start_date_act							-- ���� ���� ������ �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_detect_return_start.[note] as outgoing_car_return_start_note									-- ���������� ������ �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		--> ������� ����� �� �������� [IDS].[OutgoingDetentionReturn]	
		,out_car.[id_outgoing_return_stop] as outgoing_car_id_outgoing_return_stop						-- id ����� �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		--> ������� ����� [IDS].[Directory_DetentionReturn]
		,out_detect_return_stop.[id_detention_return] as outgoing_car_id_detention_return_stop			-- id ����� �������� [IDS].[Directory_DetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_dir_dr_stop.[cause_ru] as outgoing_car_detention_cause_stop_ru								-- ������� ����� [IDS].[Directory_DetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_dir_dr_stop.[cause_en] as outgoing_car_detention_cause_stop_en								-- ������� ����� [IDS].[Directory_DetentionReturn] �� �������� [IDS].[OutgoingCars]
		--
		,out_detect_return_stop.[type_detention_return] as outgoing_car_return_stop_type_detention_return -- ��� ����� �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_detect_return_stop.[date_start] as outgoing_car_return_stop_date_start						-- ���� ����� ������ �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_detect_return_stop.[date_stop] as outgoing_car_return_stop_date_stop						-- ���� ����� ����� �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_detect_return_stop.[num_act] as outgoing_car_return_stop_num_act							-- � ���� ����� �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_detect_return_stop.[date_act] as outgoing_car_return_stop_date_act							-- ���� ���� ����� �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_detect_return_stop.[note] as outgoing_car_return_stop_note									-- ���������� ����� �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
		,out_car.[parent_wir_id] as outgoing_car_parent_wir_id											-- ������ �� ��������� ����������� ���� ������ "�������" �� �������� [IDS].[OutgoingCars]
		,out_car.[create] as outgoing_car_create														-- ������ �� ������������ ������ ������� (���� � �����) �� �������� [IDS].[OutgoingCars]
		,out_car.[create_user] as outgoing_car_create_user												-- ������ �� ������������ ������ ������� (������������) �� �������� [IDS].[OutgoingCars]
		,out_car.[change] as outgoing_car_change														-- ������ �� ������������ ������ ������� (���� � �����) �� �������� [IDS].[OutgoingCars]
		,out_car.[change_user] as outgoing_car_change_user												-- ������ �� ������������ ������ ������� (������������) �� �������� [IDS].[OutgoingCars]
		,out_car.[note_vagonnik] as outgoing_car_note_vagonnik											-- ���������� ��������� ���������� �� �������� [IDS].[OutgoingCars]
		,out_car.[vagonnik] as outgoing_car_vagonnik													-- �������� (���� � �����) �� �������� [IDS].[OutgoingCars]
		,out_car.[vagonnik_user] as outgoing_car_vagonnik_user											-- �������� (������������) �� �������� [IDS].[OutgoingCars]
				-->======================================================================================================
		--> �������� ������ [IDS].[OutgoingSostav]
		,out_sost.[id] as outgoing_sostav_id
		,out_sost.[num_doc] as outgoing_sostav_num_doc
		--> ������� ����������� ���� IDS.Directory_Station
		,out_sost.[id_station_from] as outgoing_sostav_id_station_from
		,out_dir_station_amkr.station_name_ru as outgoing_sostav_from_station_amkr_name_ru
		,out_dir_station_amkr.station_name_en as outgoing_sostav_from_station_amkr_name_en
		,out_dir_station_amkr.station_abbr_ru as outgoing_sostav_from_station_amkr_abbr_ru
		,out_dir_station_amkr.station_abbr_en as outgoing_sostav_from_station_amkr_abbr_en
		--> ���� ����������� ���� IDS.[Directory_Ways]
		,out_sost.[id_way_from] as outgoing_sostav_id_way_from
		,out_dir_way_amkr.[id_park] as outgoing_sostav_from_id_park
		,out_dir_way_amkr.[way_num_ru] as outgoing_sostav_from_way_num_ru
		,out_dir_way_amkr.[way_num_en] as outgoing_sostav_from_way_num_en
		,out_dir_way_amkr.[way_name_ru] as outgoing_sostav_from_way_name_ru
		,out_dir_way_amkr.[way_name_en] as outgoing_sostav_from_way_name_en
		,out_dir_way_amkr.[way_abbr_ru] as outgoing_sostav_from_way_abbr_ru
		,out_dir_way_amkr.[way_abbr_en] as outgoing_sostav_from_way_abbr_en
		--> ������� ���� ������������ ������ ���� IDS.Directory_Station
		,out_sost.[id_station_on] as outgoing_sostav_id_station_on
		,out_dir_station_on.station_name_ru as outgoing_sostav_on_station_amkr_name_ru
		,out_dir_station_on.station_name_en as outgoing_sostav_on_station_amkr_name_en
		,out_dir_station_on.station_abbr_ru as outgoing_sostav_on_station_amkr_abbr_ru
		,out_dir_station_on.station_abbr_en as outgoing_sostav_on_station_amkr_abbr_en
		,out_sost.[date_readiness_amkr] as outgoing_sostav_date_readiness_amkr
		,out_sost.[date_end_inspection_acceptance_delivery] as outgoing_sostav_date_end_inspection_acceptance_delivery
		,out_sost.[date_end_inspection_loader] as outgoing_sostav_date_end_inspection_loader
		,out_sost.[date_end_inspection_vagonnik] as outgoing_sostav_date_end_inspection_vagonnik
		,out_sost.[date_show_wagons] as outgoing_sostav_date_show_wagons
		,out_sost.[date_readiness_uz] as outgoing_sostav_date_readiness_uz
		,out_sost.[date_outgoing] as outgoing_sostav_date_outgoing
		,out_sost.[date_outgoing_act] as outgoing_sostav_date_outgoing_act
		,out_sost.[date_departure_amkr] as outgoing_sostav_date_departure_amkr
		,out_sost.[composition_index] as outgoing_sostav_composition_index
		,out_sost.[status] as outgoing_sostav_status
		,out_sost.[route_sign] as outgoing_sostav_route_sign
		,out_sost.[note] as outgoing_sostav_note
		,out_sost.[create] as outgoing_sostav_create
		,out_sost.[create_user] as outgoing_sostav_create_user
		,out_sost.[change] as outgoing_sostav_change
		,out_sost.[change_user] as outgoing_sostav_change_user
		,out_sost.[vagonnik_user] as outgoing_sostav_vagonnik_user
				-->======================================================================================================
		--> �������� �� ����� �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[id] as outgoing_uz_vagon_id										-- id ������ ��������� �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[id_condition] as outgoing_uz_vagon_id_condition					-- id ������ ���������� �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> �������� �� �������� [IDS].[Directory_ConditionArrival]
		,out_dir_cond.condition_name_ru as outgoing_uz_vagon_condition_name_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cond.condition_name_en as outgoing_uz_vagon_condition_name_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cond.condition_abbr_ru as outgoing_uz_vagon_condition_abbr_ru			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cond.condition_abbr_en as outgoing_uz_vagon_condition_abbr_en			-- ���������� [IDS].[Directory_ConditionArrival] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cond.repairs as outgoing_uz_vagon_condition_repairs						-- ���������� [IDS].[Directory_ConditionArrival] �� �������� ������� ������ [IDS].[Outgoing_UZ_Vagon]
		--> ������ �� �������� [IDS].[Directory_WagonsRent]
		,arr_wag_rent.[id] as outgoing_uz_vagon_arrival_id_wagons_rent							-- id ������ ������ [IDS].[Directory_WagonsRent] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> �������� �� �������� [IDS].[Directory_OperatorsWagons]
		,arr_wag_rent.[id_operator] as outgoing_uz_vagon_arrival_wagons_rent_id_operator			-- id ������ �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_operator.[operators_ru] as outgoing_uz_vagon_arrival_wagons_rent_operators_ru	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_operator.[operators_en] as outgoing_uz_vagon_arrival_wagons_rent_operators_en	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_operator.[abbr_ru] as outgoing_uz_vagon_arrival_wagons_rent_operator_abbr_ru		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_operator.[abbr_en] as outgoing_uz_vagon_arrival_wagons_rent_operator_abbr_en		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_wag_rent.[rent_start] as outgoing_uz_vagon_arrival_wagons_rent_start					-- ������ ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_wag_rent.[rent_end] as outgoing_uz_vagon_arrival_wagons_rent_end						-- ����� ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_operator.[paid] as outgoing_uz_vagon_arrival_wagons_rent_operator_paid			-- ������� ��������� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_operator.[color] as outgoing_uz_vagon_arrival_wagons_rent_operator_color			-- ���� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ����������� �� �������� [IDS].[Directory_LimitingLoading]
		,arr_wag_rent.[id_limiting] as outgoing_uz_vagon_arrival_wagons_rent_id_limiting			-- id ������ ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_limload.[limiting_name_ru] as outgoing_uz_vagon_arrival_wagons_rent_limiting_name_ru	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_limload.[limiting_name_en] as outgoing_uz_vagon_arrival_wagons_rent_limiting_name_en	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_limload.[limiting_abbr_ru] as outgoing_uz_vagon_arrival_wagons_rent_limiting_abbr_ru	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_limload.[limiting_abbr_en] as outgoing_uz_vagon_arrival_wagons_rent_limiting_abbr_en	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ������ �� �������� [IDS].[Directory_WagonsRent]
		,out_wag_rent.[id] as outgoing_uz_vagon_outgoing_id_wagons_rent					-- id ������ ������ [IDS].[Directory_WagonsRent] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> �������� �� �������� [IDS].[Directory_OperatorsWagons]
		,out_wag_rent.[id_operator] as outgoing_uz_vagon_outgoing_wagons_rent_id_operator			-- id ������ �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_operator.[operators_ru] as outgoing_uz_vagon_outgoing_wagons_rent_operators_ru	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_operator.[operators_en] as outgoing_uz_vagon_outgoing_wagons_rent_operators_en	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_operator.[abbr_ru] as outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_ru	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_operator.[abbr_en] as outgoing_uz_vagon_outgoing_wagons_rent_operator_abbr_en	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_wag_rent.[rent_start] as outgoing_uz_vagon_outgoing_wagons_rent_start				-- ������ ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_wag_rent.[rent_end] as outgoing_uz_vagon_outgoing_wagons_rent_end					-- ����� ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_operator.[paid] as outgoing_uz_vagon_outgoing_wagons_rent_operator_paid			-- ������� ��������� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_operator.[color] as outgoing_uz_vagon_outgoing_wagons_rent_operator_color		-- ���� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		 --> �������� �� �������� �������� [IDS].[Directory_OperatorsWagons]
		,out_group_dir_operator.[id] as outgoing_uz_vagon_outgoing_wagons_rent_group_id_operator			-- id ������ �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_group_dir_operator.[operators_ru] as outgoing_uz_vagon_outgoing_wagons_rent_group_operators_ru	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_group_dir_operator.[operators_en] as outgoing_uz_vagon_outgoing_wagons_rent_group_operators_en	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_group_dir_operator.[abbr_ru] as outgoing_uz_vagon_outgoing_wagons_rent_operator_group_abbr_ru	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_group_dir_operator.[abbr_en] as outgoing_uz_vagon_outgoing_wagons_rent_operator_group_abbr_en	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ����������� �� �������� [IDS].[Directory_LimitingLoading]
		,out_wag_rent.[id_limiting] as outgoing_uz_vagon_outgoing_wagons_rent_id_limiting					-- id ������ ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_limload.[limiting_name_ru] as outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_ru	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_limload.[limiting_name_en] as outgoing_uz_vagon_outgoing_wagons_rent_limiting_name_en	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_limload.[limiting_abbr_ru] as outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_ru	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_limload.[limiting_abbr_en] as outgoing_uz_vagon_outgoing_wagons_rent_limiting_abbr_en	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ������������� �� �������� [IDS].[Directory_Countrys]
		,out_doc_vag.[id_countrys] as outgoing_uz_vagon_id_countrys						-- id ������ ������������� [IDS].[Directory_Countrys] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_countrys.code_sng as outgoing_uz_vagon_wagon_adm						-- ��� ������������� [IDS].[Directory_Countrys] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_countrys.countrys_name_ru as outgoing_uz_vagon_adm_name_ru		-- ������������� [IDS].[Directory_Countrys] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_countrys.countrys_name_en as outgoing_uz_vagon_adm_name_en		-- ������������� [IDS].[Directory_Countrys] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_countrys.country_abbr_ru as outgoing_uz_vagon_adm_abbr_ru			-- ������������� [IDS].[Directory_Countrys] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_countrys.country_abbr_en as outgoing_uz_vagon_adm_abbr_en			-- ������������� [IDS].[Directory_Countrys] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ��� ������ �� �������� [IDS].[Directory_GenusWagons]
		,out_doc_vag.[id_genus]	 as outgoing_uz_vagon_id_genus							-- id ������ ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		-- ������ 13-02-2022
		,out_dir_rod.rod_uz as outgoing_uz_vagon_rod									-- ��� ���� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_rod.genus_ru as outgoing_uz_vagon_rod_name_ru							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_rod.genus_en as outgoing_uz_vagon_rod_name_en							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_rod.abbr_ru as outgoing_uz_vagon_rod_abbr_ru							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_rod.abbr_en as outgoing_uz_vagon_rod_abbr_en							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ����������� �� �� [IDS].[Directory_OwnersWagons]
		,out_doc_vag.[id_owner] as outgoing_uz_vagon_id_owner						-- id ������ �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		-- ��������� 10.02.2022
		,out_dir_owner.[owner_ru] as outgoing_uz_vagon_owner_wagon_ru					-- �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_owner.[owner_en] as outgoing_uz_vagon_owner_wagon_en					-- �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_owner.[abbr_ru] as outgoing_uz_vagon_owner_wagon_abbr_ru				-- �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_owner.[abbr_en] as outgoing_uz_vagon_owner_wagon_abbr_en				-- �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[gruzp_uz] as outgoing_uz_vagon_gruzp_uz						-- ���������������� �� ��������� �� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[tara_uz] as outgoing_uz_vagon_tara_uz						-- ���� �� ��������� �� �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[note_uz] as outgoing_uz_vagon_note_uz						-- ���������� �� ��������� �� �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[gruzp] as outgoing_uz_vagon_gruzp							-- ���������������� �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[u_tara] as outgoing_uz_vagon_u_tara							-- ���� ��������� �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[ves_tary_arc] as outgoing_uz_vagon_ves_tary_arc				-- ���� ��������� �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[id_warehouse] as outgoing_uz_vagon_id_warehouse				-- id ����� ��������� �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ���������� ������������� �� �������� [IDS].[Directory_Divisions]
		,out_doc_vag.[id_division] as outgoing_uz_vagon_id_division				-- id ������ ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis.[code] as outgoing_uz_vagon_division_code					-- ��� ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis.[name_division_ru] as outgoing_uz_vagon_name_division_ru	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis.[name_division_en] as outgoing_uz_vagon_name_division_en	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis.[division_abbr_ru] as outgoing_uz_vagon_division_abbr_ru	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis.[division_abbr_en] as outgoing_uz_vagon_division_abbr_en	-- ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis.[id_type_devision] as outgoing_uz_vagon_id_type_devision	-- id ���� ������������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[laden] as outgoing_uz_vagon_laden							-- �������� [IDS].[Directory_Divisions] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ���������� ����� [IDS].[Directory_Cargo]
		,out_doc_vag.[id_cargo] as outgoing_uz_vagon_id_cargo						-- id ����� [IDS].[Directory_Cargo] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo.cargo_name_ru as outgoing_uz_vagon_cargo_name_ru			-- ���� [IDS].[Directory_Cargo] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo.cargo_name_en as outgoing_uz_vagon_cargo_name_en			-- ���� [IDS].[Directory_Cargo] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ���������� ������ ����� [IDS].[Directory_CargoGroup]	
		,out_dir_cargo.[id_group] as outgoing_uz_vagon_id_group							-- id ������ ����� [IDS].[Directory_CargoGroup] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_group_cargo.cargo_group_name_ru as outgoing_uz_vagon_cargo_group_name_ru	-- ������ ������ [IDS].[Directory_CargoGroup] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_group_cargo.cargo_group_name_en as outgoing_uz_vagon_cargo_group_name_en	-- ������ ������ [IDS].[Directory_CargoGroup] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ���������� ������ ����� [IDS].[Directory_CargoOutGroup]	
		,out_dir_cargo.[id_out_group] as outgoing_uz_vagon_id_out_group								-- id ������ ����� [IDS].[Directory_CargoOutGroup] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_group_out_cargo.cargo_group_name_ru as outgoing_uz_vagon_cargo_out_group_name_ru	-- ������ ������ [IDS].[Directory_CargoOutGroup] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_group_out_cargo.cargo_group_name_en as outgoing_uz_vagon_cargo_out_group_name_en	-- ������ ������ [IDS].[Directory_CargoOutGroup] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ���������� ����� ����� [IDS].[Directory_CargoETSNG]
		,out_dir_cargo.[id_cargo_etsng] as outgoing_uz_vagon_id_cargo_etsng					-- id ����� ����� [IDS].[Directory_CargoETSNG] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo_etsng.[code] as outgoing_uz_vagon_cargo_etsng_code						-- ��� ����� ����� [IDS].[Directory_CargoETSNG] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo_etsng.[cargo_etsng_name_ru] as outgoing_uz_vagon_cargo_etsng_name_ru	-- ���� ����� [IDS].[Directory_CargoETSNG] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo_etsng.[cargo_etsng_name_en] as outgoing_uz_vagon_cargo_etsng_name_en	-- ���� ����� [IDS].[Directory_CargoETSNG] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ���������� ����� ��� [IDS].[Directory_CargoGNG]
		,out_doc_vag.[id_cargo_gng] as outgoing_uz_vagon_id_cargo_gng							-- id ����� ��� [IDS].[Directory_CargoGNG] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo_gng.[code] as outgoing_uz_vagon_cargo_gng_code							-- ��� ����� ��� [IDS].[Directory_CargoGNG] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo_gng.[cargo_gng_name_ru] as outgoing_uz_vagon_cargo_gng_name_ru			-- ���� ��� [IDS].[Directory_CargoGNG] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_dir_cargo_gng.[cargo_gng_name_en] as outgoing_uz_vagon_cargo_gng_name_en			-- ���� ��� [IDS].[Directory_CargoGNG] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[vesg] as outgoing_uz_vagon_vesg											-- ��� ����� ��� [IDS].[Directory_CargoGNG] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ���������� ������� �� �� �������� [UZ].[Directory_Stations]
		,out_doc_vag.[code_stn_to] as outgoing_uz_vagon_to_station_uz_code						-- ��� ������� �� [UZ].[Directory_Stations] �� �������� [IDS].[Outgoing_UZ_Vagon]
		-- ������� ��
		,out_vag_station_uz.[station_name_ru] as outgoing_uz_vagon_to_station_uz_name			-- ������� �� [IDS].[Directory_ExternalStation] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,out_doc_vag.[kol_conductor] as outgoing_uz_vagon_kol_conductor
		,out_doc_vag.[create] as outgoing_uz_vagon_create
		,out_doc_vag.[create_user] as outgoing_uz_vagon_create_user
		,out_doc_vag.[change] as outgoing_uz_vagon_change
		,out_doc_vag.[change_user] as outgoing_uz_vagon_change_user
		-->======================================================================================================
		--> �������� �� ������ �� �������� [IDS].[Outgoing_UZ_Document]
		,out_doc_sostav.[id] as outgoing_uz_document_id
		,out_doc_sostav.[id_doc_uz] as outgoing_uz_document_id_doc_uz
		,out_doc_sostav.[nom_doc] as outgoing_uz_document_nom_doc
		,out_doc_sostav.[code_stn_from] as outgoing_uz_document_code_stn_from
		--> [IDS].[Directory_ExternalStation]
		,out_doc_sostav.[code_stn_to] as outgoing_uz_document_code_stn_to
		,out_ext_station.[station_name_ru] as outgoing_uz_document_station_to_name_ru
		,out_ext_station.[station_name_en] as outgoing_uz_document_station_to_name_en
		-- ������� 10.02.2023
		,out_ext_station.[port] as outgoing_uz_document_station_to_port
		--> [IDS].[Directory_InlandRailway]
		,out_ext_station.[code_inlandrailway] as outgoing_uz_document_to_code_inlandrailway
		,out_ir_to.[inlandrailway_name_ru] as outgoing_uz_document_to_inlandrailway_name_ru
		,out_ir_to.[inlandrailway_name_en] as outgoing_uz_document_to_inlandrailway_name_en
		,out_ir_to.[inlandrailway_abbr_ru] as outgoing_uz_document_to_inlandrailway_abbr_ru
		,out_ir_to.[inlandrailway_abbr_en] as outgoing_uz_document_to_inlandrailway_abbr_en
		,out_ir_to.[code_railway] as outgoing_uz_document_to_code_railway
		--> [IDS].[Directory_Countrys]
		,out_doc_sostav.[country_nazn] as outgoing_uz_document_country_nazn
		--,out_countrys_to.[code_sng] as outgoing_uz_document_to_code_sng
		--,out_countrys_to.[code_europe] as outgoing_uz_document_to_code_europe
		--,out_countrys_to.[code_iso] as outgoing_uz_document_to_code_iso
		,out_countrys_to.[countrys_name_ru] as outgoing_uz_document_to_countrys_name_ru
		,out_countrys_to.[countrys_name_en] as outgoing_uz_document_to_countrys_name_en
		,out_countrys_to.[country_abbr_ru] as outgoing_uz_document_to_country_abbr_ru
		,out_countrys_to.[country_abbr_en] as outgoing_uz_document_to_country_abbr_en
		--> [IDS].[Directory_BorderCheckpoint]
		,out_doc_sostav.[code_border_checkpoint] as outgoing_uz_document_code_border_checkpoint
		,out_border_checkpoint.[station_name_ru] as outgoing_uz_document_border_checkpoint_station_name_ru
		,out_border_checkpoint.[station_name_en] as outgoing_uz_document_border_checkpoint_station_name_en
		,out_border_checkpoint.[code_inlandrailway] as outgoing_uz_document_border_checkpoint_code_inlandrailway
		,out_doc_sostav.[cross_date] as outgoing_uz_document_cross_date
		--> [IDS].[Directory_Consignee]
		,out_doc_sostav.[code_shipper] as outgoing_uz_document_code_shipper
		,out_consignee.[name] as outgoing_uz_document_name_shipper
		--> [IDS].[Directory_Shipper]
		,out_doc_sostav.[code_consignee] as outgoing_uz_document_code_consignee
		,out_shipper.[shipper_name_ru] as outgoing_uz_document_consignee_name_ru
		,out_shipper.[shipper_name_en] as outgoing_uz_document_consignee_name_en
		,out_doc_sostav.[vid] as outgoing_uz_document_vid
		--> [IDS].[Directory_PayerSender]
		,out_doc_sostav.[code_payer] as outgoing_uz_document_code_payer
		,out_payer_sender.[payer_name_ru] as outgoing_uz_document_payer_name_ru
		,out_payer_sender.[payer_name_en] as outgoing_uz_document_payer_name_en
		,out_doc_sostav.[distance_way] as outgoing_uz_document_distance_way
		,out_doc_sostav.[osum] as outgoing_uz_document_osum
		,out_doc_sostav.[date_sozdan] as outgoing_uz_document_date_sozdan
		,out_doc_sostav.[date_otpr] as outgoing_uz_document_date_otpr
		,out_doc_sostav.[date_pr] as outgoing_uz_document_date_pr
		,out_doc_sostav.[date_grpol] as outgoing_uz_document_date_grpol
		,out_doc_sostav.[date_vid] as outgoing_uz_document_date_vid
		,out_doc_sostav.[info_sht] as outgoing_uz_document_info_sht
		,out_doc_sostav.[name_gr] as outgoing_uz_document_name_gr
		,out_doc_sostav.[note] as outgoing_uz_document_note
		,out_doc_sostav.[tariff_contract] as outgoing_uz_document_tariff_contract
		,out_doc_sostav.[calc_payer] as outgoing_uz_document_calc_payer
		,out_doc_sostav.[calc_payer_user] as outgoing_uz_document_calc_payer_user
		,out_doc_sostav.[num_list] as outgoing_uz_document_num_list
		,out_doc_sostav.[date_list] as outgoing_uz_document_date_list
		,out_doc_sostav.[Verification] as outgoing_uz_document_Verification
		,out_doc_sostav.[VerificationUser] as outgoing_uz_document_VerificationUser
		,out_doc_sostav.[create] as outgoing_uz_document_create
		,out_doc_sostav.[create_user] as outgoing_uz_document_create_user
		,out_doc_sostav.[change] as outgoing_uz_document_change
		,out_doc_sostav.[change_user] as outgoing_uz_document_change_user
		-->======================================================================================================
		--> �������� �������� [IDS].[SAPIncomingSupply]
		,sap_is.[VBELN] as sap_incoming_supply_num
		,sap_is.[NUM_VBELN] as sap_incoming_supply_pos
		,sap_is.[ERDAT] as sap_incoming_supply_date
		,sap_is.[ETIME] as sap_incoming_supply_time
		,sap_is.[LGORT_10] as sap_incoming_supply_warehouse_code 
		,sap_is.[LGOBE_10] as sap_incoming_supply_warehouse_name
		,sap_is.[MATNR] as sap_incoming_supply_cargo_code 
		,sap_is.[MAKTX] as sap_incoming_supply_cargo_name
		--> ��������� �������� [IDS].[SAPOutgoingSupply]
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
		-- ������� ������� �����
		,account_balance = (CASE WHEN arr_doc_uz.[klient] = 1 THEN 0 ELSE [IDS].[get_count_account_balance_of_id_operator](out_wag_rent.[id_operator], out_dir_rod.rod_uz) END) -- or arr_doc_vag.[cargo_returns] = 1 
		--=============== ����� � ������ ===================================
		-- ����� �������  , ���
		,idle_time = CASE  WHEN arr_doc_vag.[cargo_returns] = 1 THEN (DATEDIFF(minute, arr_sost_old.[date_adoption] , out_sost.[date_outgoing])) ELSE ( DATEDIFF(minute, arr_sost.[date_adoption], out_sost.[date_outgoing])) END 
		-- ����� ������� ���, ���
		,idle_time_act = CASE  WHEN arr_doc_vag.[cargo_returns] = 1 THEN (DATEDIFF(minute, arr_sost_old.[date_adoption_act] , out_sost.[date_outgoing_act])) ELSE ( DATEDIFF(minute, arr_sost.[date_adoption_act], out_sost.[date_outgoing_act])) END 
		--=============== ����� �� ����������� ==================
		,wuf.derailment as wagon_usage_fee_derailment
		,wuf.[downtime] as wagon_usage_fee_downtime
		,wuf.[calc_time] as wagon_usage_fee_calc_time
		,wuf.[calc_fee_amount] as wagon_usage_fee_calc_fee_amount
		,wuf.[manual_time] as wagon_usage_fee_manual_time
		,wuf.[manual_fee_amount] as wagon_usage_fee_manual_fee_amount
		,wuf.[note] as wagon_usage_fee_note
		,wuf.[create] as wagon_usage_fee_create
        ,wuf.[create_user] as wagon_usage_fee_create_user
        ,wuf.[change] as wagon_usage_fee_change
        ,wuf.[change_user] as wagon_usage_fee_change_user
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
		,outgoing_uz_vagon_pay_001 = (SELECT sum(pay.[summa]) FROM  [IDS].[Outgoing_UZ_Vagon_Pay] as pay where pay.[id_vagon]=out_doc_vag.[id] and pay.[kod]='001')
		,outgoing_uz_vagon_pay_add = (SELECT sum(pay.[summa]) FROM  [IDS].[Outgoing_UZ_Vagon_Pay] as pay where pay.[id_vagon]=out_doc_vag.[id] and pay.[kod] <>'001')
		
		--into view_outgoing_cars
		FROM [IDS].[OutgoingCars] as out_car
		--==== ������� ����������� ================================================================
		--> ������� ��������� �����������
		Left JOIN IDS.WagonInternalRoutes as wir ON out_car.id = wir.[id_outgoing_car]
		--> ��������� �������
		Left JOIN [IDS].[WagonInternalMovement] as wim ON wim.id = (select top(1) wim_f.id from [IDS].[WagonInternalMovement] as wim_f where wim_f.id_wagon_internal_routes = wir.id order by wim_f.id desc)
		--Left JOIN [IDS].[WagonInternalMovement] as wim ON wim.id = (select max(wim_f.id) from [IDS].[WagonInternalMovement] as wim_f where wim_f.id_wagon_internal_routes = wir.id group by wim_f.id_wagon_internal_routes)
		
		--> ��������� ��������
		Left JOIN [IDS].[WagonInternalOperation] as wio ON wio.id = (select top(1) wio_f.id from [IDS].[WagonInternalOperation] as wio_f where wio_f.id_wagon_internal_routes = wir.id order by wio_f.id desc)
		--Left JOIN [IDS].[WagonInternalOperation] as wio ON wio.id = (select max(wio_f.id) from [IDS].[WagonInternalOperation] as wio_f where wio_f.id_wagon_internal_routes = wir.id group by wio_f.id_wagon_internal_routes)
		--> ���������� �������� ��� ������� (�� ������ �������)
		Left JOIN [IDS].[Directory_WagonOperations] as dir_operation ON dir_operation.id = wio.id_operation
		--> ���������� �������� �������� (�� ������ �������)
		Left JOIN [IDS].[Directory_WagonLoadingStatus] as load_status ON load_status.id = wio.id_loading_status
		--> ����� �� �����������
		Left JOIN [IDS].[WagonUsageFee] as wuf ON wir.id_usage_fee = wuf.id
		--==== �������� ������ =====================================================================
		--> �������� �������
		Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_sost.id = out_car.id_outgoing
		--> ��������� �� ����� �� �������� ������ �� ��
		Left JOIN [IDS].[Outgoing_UZ_Vagon] as out_doc_vag ON out_car.id_outgoing_uz_vagon = out_doc_vag.id
		--> ��������� �� ������ �� �������� ������ �� ��
		Left JOIN [IDS].[Outgoing_UZ_Document] as out_doc_sostav ON out_doc_vag.id_document = out_doc_sostav.id
		--> ��������� SAP ��������� ��������
		Left JOIN [IDS].[SAPOutgoingSupply] as sap_os ON wir.id_sap_outbound_supply = sap_os.id
		--> ���������� ���������� (��������)
		Left JOIN [IDS].[OutgoingDetentionReturn] as out_detect_return ON out_car.[id_outgoing_detention] = out_detect_return.id
		--> ���������� ������� ���������� 
		Left JOIN [IDS].[Directory_DetentionReturn] as out_dir_dr ON out_detect_return.[id_detention_return] = out_dir_dr.id
		--> ���������� ������������� ����		
		Left JOIN [IDS].[Directory_Reason_Discrepancy] as out_dir_rd_amkr ON out_car.id_reason_discrepancy_amkr = out_dir_rd_amkr.id
		--> ���������� ������������� ����		
		Left JOIN [IDS].[Directory_Reason_Discrepancy] as out_dir_rd_uz ON out_car.id_reason_discrepancy_uz = out_dir_rd_uz.id
		--> ���������� �������� ������ (��������)
		Left JOIN [IDS].[OutgoingDetentionReturn] as out_detect_return_start ON out_car.id_outgoing_return_start = out_detect_return_start.id
		--> ���������� �������� ���� (��������)
		Left JOIN [IDS].[OutgoingDetentionReturn] as out_detect_return_stop ON out_car.id_outgoing_return_stop = out_detect_return_stop.id
		--> ���������� �������� ������ 
		Left JOIN [IDS].[Directory_DetentionReturn] as out_dir_dr_start ON out_detect_return_start.id_detention_return = out_dir_dr_start.id
		--> ���������� �������� ������ 
		Left JOIN [IDS].[Directory_DetentionReturn] as out_dir_dr_stop ON out_detect_return_stop.id_detention_return = out_dir_dr_stop.id
		--> ���������� ������� ���� (������� �������� �� ����)
		Left JOIN IDS.Directory_Station as out_dir_station_amkr ON out_sost.id_station_from =  out_dir_station_amkr.id
		--> ���������� ���� ���� (���� �������� �� ����)
		Left JOIN [IDS].[Directory_Ways] as out_dir_way_amkr ON out_sost.[id_way_from] =  out_dir_way_amkr.id
		--> ���������� ������� ���� (�������� ������� �� ������� ��������� ������)
		Left JOIN IDS.Directory_Station as out_dir_station_on ON out_sost.id_station_on =  out_dir_station_on.id
		--> ���������� �������� �� ��������
		Left JOIN IDS.Directory_ConditionArrival as out_dir_cond ON out_doc_vag.id_condition = out_dir_cond.id
		--> ���������� ����� �� ��������
		Left JOIN [IDS].[Directory_WagonsRent] as arr_wag_rent ON out_doc_vag.id_wagons_rent_arrival = arr_wag_rent.id
		--> ���������� ����� �� ��������
		Left JOIN [IDS].[Directory_WagonsRent] as out_wag_rent ON out_doc_vag.id_wagons_rent_outgoing = out_wag_rent.id
		--> ���������� �������� ������ �� ��������
		Left JOIN IDS.Directory_OperatorsWagons as arr_dir_operator ON arr_dir_operator.id = arr_wag_rent.id_operator
		--> ���������� ����������� �������� �� ��������
		Left JOIN IDS.Directory_LimitingLoading as arr_dir_limload ON arr_dir_limload.id =  arr_wag_rent.id_limiting
		--> ���������� �������� ������ �� ���������
		Left JOIN IDS.Directory_OperatorsWagons as out_dir_operator ON out_wag_rent.id_operator =  out_dir_operator.id
		--> ���������� �������� ������ (��������) �� ��������
		Left JOIN IDS.Directory_OperatorsWagons as out_group_dir_operator ON out_group_dir_operator.id = (SELECT (case when parent_id is null then id else parent_id end) FROM [IDS].[Directory_OperatorsWagons] where [id]=out_wag_rent.id_operator)
		--> ���������� ����������� �������� �� ��������
		Left JOIN IDS.Directory_LimitingLoading as out_dir_limload ON out_wag_rent.id_limiting =  out_dir_limload.id
		--> ���������� ������ (������������� ������ �� ��������)
		Left JOIN IDS.Directory_Countrys as out_dir_countrys ON out_doc_vag.id_countrys = out_dir_countrys.id
		--> ���������� ��� ������ (�� ��������)
		Left JOIN IDS.Directory_GenusWagons as out_dir_rod ON out_doc_vag.id_genus = out_dir_rod.id
		--> ���������� ����������� ������ �� �� �� ��������
		Left JOIN [IDS].[Directory_OwnersWagons] as out_dir_owner ON out_doc_vag.id_owner = out_dir_owner.id
		--> ���������� ������������� ���� (�� ��������)
		--Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis_amkr ON arr_doc_vag.[id_division_on_amkr] = arr_dir_divis_amkr.id
		--> ���������� ������������� ���� (�� ��������)
		Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis ON out_doc_vag.id_division = arr_dir_divis.id
		--> ���������� ������ �� ��������
		Left JOIN IDS.Directory_Cargo as out_dir_cargo ON out_doc_vag.id_cargo =  out_dir_cargo.id
		--> ���������� ������ ������ �� ��������
		Left JOIN IDS.Directory_CargoGroup as out_dir_group_cargo ON out_dir_cargo.id_group =  out_dir_group_cargo.id
		--> ���������� ������ �� �������� ������ �� ��������
		Left JOIN IDS.Directory_CargoOutGroup as out_dir_group_out_cargo ON out_dir_cargo.id_out_group =  out_dir_group_out_cargo.id
		--> ���������� ������ ����� �� ��������
		Left JOIN [IDS].[Directory_CargoETSNG] as out_dir_cargo_etsng ON out_dir_cargo.id_cargo_etsng = out_dir_cargo_etsng.id
		--> ���������� ������ ��� �� ��������
		Left JOIN [IDS].[Directory_CargoGNG] as out_dir_cargo_gng ON out_doc_vag.id_cargo_gng = out_dir_cargo_gng.id
		--> ���������� ������� �������
		Left JOIN [IDS].[Directory_ExternalStation] as out_vag_station_uz ON  out_doc_vag.[code_stn_to] = out_vag_station_uz.code
		--> ���������� ������� ������� (�� ��������)
		Left JOIN [IDS].[Directory_ExternalStation] as out_ext_station ON out_doc_sostav.[code_stn_to] = out_ext_station.code
		--> ���������� �������� ����� (�� ��������)
		Left JOIN [IDS].[Directory_InlandRailway] as out_ir_to ON out_ext_station.[code_inlandrailway] = out_ir_to.code
		--> ���������� ����� (�� ��������)
		Left JOIN [IDS].[Directory_Countrys] as out_countrys_to ON out_doc_sostav.[country_nazn] = out_countrys_to.[code_iso]
		--> ���������� ������ ��������� (�� ��������)
		Left JOIN [IDS].[Directory_BorderCheckpoint] as out_border_checkpoint ON out_doc_sostav.[code_border_checkpoint] = out_border_checkpoint.[code]
		--> ���������� ���������������� (�� ��������)
		Left JOIN [IDS].[Directory_Consignee] as out_consignee ON out_doc_sostav.[code_shipper] = out_consignee.code
		--> ���������� ���������������� (�� ��������)
		Left JOIN [IDS].[Directory_Shipper] as out_shipper ON out_doc_sostav.[code_consignee] = out_shipper.code
		--> ���������� ���������� (�� ��������)
		Left JOIN [IDS].[Directory_PayerSender] as out_payer_sender ON out_doc_sostav.[code_payer] = out_payer_sender.[code]

		--==== �������� � ����� ������ =====================================================================
		--> �������� ������
		Left JOIN [IDS].[ArrivalCars] as arr_car ON arr_car.id = wir.id_arrival_car
		--> �������� �������
		Left JOIN [IDS].[ArrivalSostav] as arr_sost ON arr_sost.id = arr_car.id_arrival
		 --> ��������� �� ����� �� �������� ������ �� ����
		Left JOIN [IDS].[Arrival_UZ_Vagon] as arr_doc_vag ON arr_doc_vag.id = arr_car.id_arrival_uz_vagon
		 --> ��������� �� ������ ������� (������) �� �������� ��� ��� �� ����
		Left JOIN [IDS].[Arrival_UZ_Document] as arr_doc_uz ON arr_doc_uz.id = arr_doc_vag.id_document
		 --> ��������� SAP �������� ��������
		Left JOIN [IDS].[SAPIncomingSupply] as sap_is ON sap_is.id = wir.id_sap_incoming_supply
		--> ���������� �������� ������� c ������ ��������
		Left JOIN [IDS].[ArrivalSostav] as arr_sost_old ON arr_sost_old.id = [IDS].[get_old_id_arrival_of_wir_parent_id](wir.parent_id)
		--> ���������� ������� ���� (������� ������ �� ����)
		Left JOIN [IDS].[Directory_Station] as arr_dir_station_from ON arr_dir_station_from.id = arr_sost.[id_station_from] 
		--> ���������� ������� ���� (������� ������ �� ����)
		Left JOIN [IDS].[Directory_Station] as arr_dir_station_on ON arr_dir_station_on.id = arr_sost.id_station_on
		--> ���������� ���� ���� (���� �������� �� ����)
		Left JOIN [IDS].[Directory_Ways] as arr_dir_way_on ON arr_dir_way_on.id =  arr_sost.[id_way]

		--> ���������� �������� �� ��������
		Left JOIN [IDS].[Directory_ConditionArrival] as arr_dir_cond ON arr_dir_cond.id = arr_doc_vag.id_condition
		--> ���������� ��� ������
		Left JOIN [IDS].[Directory_TypeWagons] as dir_type ON dir_type.id =  arr_doc_vag.id_type
		--> ���������� ������ �� ��������
		Left JOIN [IDS].[Directory_Cargo] as arr_dir_cargo ON arr_dir_cargo.id =  arr_doc_vag.id_cargo
		--> ���������� ������ ������ �� ��������
		Left JOIN [IDS].[Directory_CargoGroup] as arr_dir_group_cargo ON arr_dir_group_cargo.id = arr_dir_cargo.id_group
		--> ���������� ������ ����� �� ��������
		Left JOIN [IDS].[Directory_CargoETSNG] as arr_dir_cargo_etsng ON arr_dir_cargo_etsng.id  =arr_dir_cargo.id_cargo_etsng
		--> ���������� ������ ��� �� ��������
		Left JOIN [IDS].[Directory_CargoGNG] as arr_dir_cargo_gng ON arr_dir_cargo_gng.id = arr_doc_vag.id_cargo_gng
		--> ���������� ���������� ������
		Left JOIN [IDS].[Directory_CertificationData] as arr_dir_certif ON arr_dir_certif.id =  arr_doc_vag.id_certification_data
		--> ���������� ����������� ���������
		Left JOIN [IDS].[Directory_CommercialCondition] as arr_comm_cond ON arr_comm_cond.id = arr_doc_vag.[id_commercial_condition]
		--> ���������� ������� ���� (������� �������� �� ����)
		Left JOIN [IDS].[Directory_Station] as arr_dir_station_amkr ON arr_dir_station_amkr.id =  arr_doc_vag.[id_station_on_amkr]
		--> ���������� ������������� ���� (�� ��������)
		Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis_amkr ON arr_dir_divis_amkr.id = arr_doc_vag.[id_division_on_amkr]
		--> ���������� ������� ������� (�� �������� from)
		Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON arr_doc_uz.[code_stn_from] = arr_ext_station_from.code
		--> ���������� �������� ����� (�� �������� from)
		Left JOIN [IDS].[Directory_InlandRailway] as arr_ir_from ON arr_ext_station_from.[code_inlandrailway] = arr_ir_from.code
		--> ���������� ������� ������� (�� �������� to)
		Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_to ON arr_doc_uz.[code_stn_to] = arr_ext_station_to.code
		--> ���������� �������� ����� (�� �������� from)
		Left JOIN [IDS].[Directory_InlandRailway] as arr_ir_to ON arr_ext_station_to.[code_inlandrailway] = arr_ir_to.code
		--> ���������� ������ ��������� (�� ��������)
		Left JOIN [IDS].[Directory_BorderCheckpoint] as arr_border_checkpoint ON arr_doc_uz.[code_border_checkpoint] = arr_border_checkpoint.[code]
		--> ���������� ���������������� (�� ��������)
		Left JOIN [IDS].[Directory_Shipper] as arr_shipper ON arr_doc_uz.[code_shipper] = arr_shipper.code
		--> ���������� ���������������� (�� ��������)
		Left JOIN [IDS].[Directory_Consignee] arr_consignee ON arr_doc_uz.[code_consignee] = arr_consignee.code	
		--> ���������� ���������� �� �������� (�� ��������)
		Left JOIN [IDS].[Directory_PayerSender] as arr_payer_send ON arr_doc_uz.[code_payer_sender] = arr_payer_send.[code]
		--> ���������� ���������� �� �������� (�� ��������)
		Left JOIN [IDS].[Directory_PayerArrival] as arr_payer_arr ON arr_doc_uz.[code_payer_arrival] = arr_payer_arr.[code]
		--> ���������� ���������� local (�� ��������)
		Left JOIN [IDS].[Directory_PayerSender] as arr_payer_local ON arr_payer_local.[code] = arr_doc_uz.[code_payer_local]
		--> ������ ���������
		Left JOIN [IDS].[WagonInternalMovement] as wim_unload ON wim_unload.id = [IDS].get_last_id_wim_filing_of_type(wir.id, wim.id, 1)
		Left JOIN [IDS].[WagonInternalMovement] as wim_load ON wim_load.id =  [IDS].get_last_id_wim_filing_of_type(wir.id, wim.id, 2)
		Left JOIN [IDS].[WagonInternalMovement] as wim_clear ON wim_clear.id =  [IDS].get_last_id_wim_filing_of_type(wir.id, wim.id, 3)

		WHERE out_car.id IN (SELECT out_car_w.id FROM [IDS].[OutgoingCars] as out_car_w
			Left JOIN [IDS].[OutgoingSostav] as out_sost_w ON out_sost_w.id = out_car_w.id_outgoing
			Left JOIN [IDS].[Outgoing_UZ_Vagon] as out_doc_vag_w ON out_doc_vag_w.id = out_car_w.id_outgoing_uz_vagon
			Left JOIN [IDS].[Directory_WagonsRent] as out_wag_rent_w ON out_wag_rent_w.id = out_doc_vag_w.id_wagons_rent_outgoing
			Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_owg_w ON dir_owg_w.[id_operator] = out_wag_rent_w.id_operator
			where (case when @IsActs=1 then (case when out_sost_w.[date_outgoing_act] is not null then out_sost_w.[date_outgoing_act] else out_sost_w.[date_outgoing] end) else out_sost_w.[date_outgoing]  end)>= @start and 
			(case when @IsActs=1 then (case when out_sost_w.[date_outgoing_act] is not null then out_sost_w.[date_outgoing_act] else out_sost_w.[date_outgoing] end) else out_sost_w.[date_outgoing]  end)<=@stop
			AND out_car_w.position_outgoing is not null AND (NOT dir_owg_w.[group] in ('amkr_vz') OR dir_owg_w.[group] is null))
			

		ORDER BY out_sost.num_doc, out_car.position_outgoing