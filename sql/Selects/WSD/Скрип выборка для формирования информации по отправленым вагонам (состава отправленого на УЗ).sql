use [KRR-PA-CNT-Railway]

select 
	out_car.[id] as id_outgoing_cars
	,out_car.[num]
	,out_car.[position]
	--================= ���������� �� ������ ==========================================
	-- ���������� ������
	,dir_wagon.tara as wagon_tara_uz
	,dir_wagon.note as wagon_ban_uz							-- ������� �� �� 
	,dir_wagon.[closed_route] as wagon_closed_route			--��������� ������� (������)
	----> ��������
	--,dir_operator.[id] as id_operator
	--,dir_operator.[operators_ru]
	--,dir_operator.[operators_en]
	--,dir_operator.[abbr_ru] as operator_abbr_ru
	--,dir_operator.[abbr_en] as operator_abbr_en
	--,dir_rent.[rent_start] as operator_rent_start
	--,dir_rent.[rent_end] as operator_rent_end
	--,dir_operator.[paid] as operator_paid
	--,dir_operator.[color] as operator_color
	--,dir_operator.monitoring_idle_time as operator_monitoring_idle_time
	----> �����������
	--,dir_limload.[id] as id_limiting_loading
	--,dir_limload.[limiting_name_ru]
	--,dir_limload.[limiting_name_en]
	--,dir_limload.[limiting_abbr_ru]
	--,dir_limload.[limiting_abbr_en]
	----> ����������� �� ��
	--,dir_owner.[id] as id_owner_wagon
	--,dir_owner.[owner_ru] as owner_wagon_ru
	--,dir_owner.[owner_en] as owner_wagon_en
	--,dir_owner.[abbr_ru] as owner_wagon_abbr_ru
	--,dir_owner.[abbr_en] as owner_wagon_abbr_en
	----> �������������
	--,dir_countrys.code_sng as wagon_adm
	--,dir_countrys.countrys_name_ru as wagon_adm_name_ru
	--,dir_countrys.countrys_name_en as wagon_adm_name_en
	--,dir_countrys.country_abbr_ru as wagon_adm_abbr_ru
	--,dir_countrys.country_abbr_en as wagon_adm_abbr_en
	----> ��� ������
	--,dir_rod.rod_uz as wagon_rod
	--,dir_rod.genus_ru as wagon_rod_name_ru
	--,dir_rod.genus_en as wagon_rod_name_en
	--,dir_rod.abbr_ru as wagon_rod_abbr_ru
	--,dir_rod.abbr_en as wagon_rod_abbr_en
	--> ��� ������
	,dir_type.type_ru as wagon_type_ru
	,dir_type.type_en as wagon_type_en
	-->======================================================================================================
	--> �������� ������� [IDS].[OutgoingCars]
	,out_car.[position_outgoing] as outgoing_car_position_outgoing
    ,out_car.[num_doc] as outgoing_car_num_doc							-- ����� ���������(�� ��������)
	,out_car.[note] as outgoing_car_note							-- ���������� ������ �� ��������
	,out_car.[date_outgoing_act] as outgoing_car_date_outgoing_act	-- ���� �� ����
	,out_car.[outgoing] as outgoing_car_outgoing					-- ����� ��� ���� (���� � �����)
	,out_car.[outgoing_user] as outgoing_car_outgoing_user			-- ����� ��� ���� (������������)
	--> ������� ���������� [IDS].[Directory_DetentionReturn]
	,out_car.[id_outgoing_detention] as outgoing_car_id_outgoing_detention	-- id ������ ���������� [IDS].[Directory_DetentionReturn] �� �������� [IDS].[OutgoingCars]
	,out_dir_dr.[cause_ru] as outgoing_car_detention_cause_ru				-- ���������� [IDS].[Directory_DetentionReturn] �� �������� [IDS].[OutgoingCars]
	,out_dir_dr.[cause_en] as outgoing_car_detention_cause_en				-- ���������� [IDS].[Directory_DetentionReturn] �� �������� [IDS].[OutgoingCars]
	--> ������� ������������� [Directory_Reason_Discrepancy]
	,out_car.[id_reason_discrepancy_amkr] as outgoing_car_id_reason_discrepancy_amkr				-- id ������ ������������� ���� [IDS].[Directory_Reason_Discrepancy] �� �������� [IDS].[OutgoingCars]
	,out_dir_rd_amkr.[reason_discrepancy_name_ru] as outgoing_car_reason_discrepancy_amkr_name_ru	-- ������������� ���� [IDS].[Directory_Reason_Discrepancy] �� �������� [IDS].[OutgoingCars]
	,out_dir_rd_amkr.[reason_discrepancy_name_en] as outgoing_car_reason_discrepancy_amkr_name_en	-- ������������� ���� [IDS].[Directory_Reason_Discrepancy] �� �������� [IDS].[OutgoingCars]
	,out_car.[id_reason_discrepancy_uz] as outgoing_car_id_reason_discrepancy_uz					-- id ������ ������������� �� [IDS].[Directory_Reason_Discrepancy] �� �������� [IDS].[OutgoingCars]
	,out_dir_rd_uz.[reason_discrepancy_name_ru] as outgoing_car_reason_discrepancy_uz_name_ru		-- ������������� �� [IDS].[Directory_Reason_Discrepancy] �� �������� [IDS].[OutgoingCars]
	,out_dir_rd_uz.[reason_discrepancy_name_en] as outgoing_car_reason_discrepancy_uz_name_en		-- ������������� �� [IDS].[Directory_Reason_Discrepancy] �� �������� [IDS].[OutgoingCars]
	--> ������� ������ �� �������� [IDS].[OutgoingDetentionReturn]	
	,out_car.[id_outgoing_return_start] as outgoing_car_id_outgoing_return_start		-- id ������ ������ �������� [IDS].[OutgoingDetentionReturn] �� �������� [IDS].[OutgoingCars]
	--> ������� ������ [IDS].[Directory_DetentionReturn]
	,out_detect_return_start.[id_detention_return] as outgoing_car_id_detention_return_start	-- id ������ �������� [IDS].[Directory_DetentionReturn] �� �������� [IDS].[OutgoingCars]
	,out_dir_dr_start.[cause_ru] as outgoing_car_detention_cause_start_ru						-- ������� ������ [IDS].[Directory_DetentionReturn] �� �������� [IDS].[OutgoingCars]
	,out_dir_dr_start.[cause_en] as outgoing_car_detention_cause_start_en						-- ������� ������ [IDS].[Directory_DetentionReturn] �� �������� [IDS].[OutgoingCars]
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
	-->*****************************************************************************************************************************
	--> �������� ������ [IDS].[OutgoingSostav]
	,out_sost.[id] as id_outgoing_sostav
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
	,out_sost.[id_station_on] as outgoing_sostav_id_station_from
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
	-->*****************************************************************************************************************************
	--> �������� �� ����� �� �������� [IDS].[Outgoing_UZ_Vagon]
	,out_doc_vag.[id] as id_outgoing_uz_vagon								-- id ������ ��������� �� �������� [IDS].[Outgoing_UZ_Vagon]
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
	,dir_rod.rod_uz as outgoing_uz_vagon_rod									-- ��� ���� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,dir_rod.genus_ru as outgoing_uz_vagon_rod_name_ru							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,dir_rod.genus_en as outgoing_uz_vagon_rod_name_en							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,dir_rod.abbr_ru as outgoing_uz_vagon_rod_abbr_ru							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,dir_rod.abbr_en as outgoing_uz_vagon_rod_abbr_en							-- ��� ������ [IDS].[Directory_GenusWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	--> ����������� �� �� [IDS].[Directory_OwnersWagons]
	,out_doc_vag.[id_owner] as outgoing_uz_vagon_id_owner						-- id ������ �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,dir_owner.[owner_ru] as outgoing_uz_vagon_owner_wagon_ru					-- �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,dir_owner.[owner_en] as outgoing_uz_vagon_owner_wagon_en					-- �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,dir_owner.[abbr_ru] as outgoing_uz_vagon_owner_wagon_abbr_ru				-- �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
	,dir_owner.[abbr_en] as outgoing_uz_vagon_owner_wagon_abbr_en				-- �������� [IDS].[Directory_OwnersWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
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
	,out_station_uz.[station] as outgoing_uz_vagon_to_station_uz_name						-- ������� �� [UZ].[Directory_Stations] �� �������� [IDS].[Outgoing_UZ_Vagon]
	--,out_doc_vag.[create]
	--,out_doc_vag.[create_user]
	--,out_doc_vag.[change]
	--,out_doc_vag.[change_user]
	-->*****************************************************************************************************************************
	--> �������� �� ������ �� �������� [IDS].[Outgoing_UZ_Document]
	,out_doc_sostav.[id_doc_uz] as outgoing_uz_document_id_doc_uz
	,out_doc_sostav.[nom_doc] as outgoing_uz_document_
	,out_doc_sostav.[code_stn_from] as outgoing_uz_document_
	,out_doc_sostav.[code_stn_to] as outgoing_uz_document_
	,out_doc_sostav.[country_nazn] as outgoing_uz_document_
	,out_doc_sostav.[code_border_checkpoint] as outgoing_uz_document_
	,out_doc_sostav.[cross_date] as outgoing_uz_document_
	,out_doc_sostav.[code_shipper] as outgoing_uz_document_
	,out_doc_sostav.[code_consignee] as outgoing_uz_document_
	,out_doc_sostav.[vid] as outgoing_uz_document_
	,out_doc_sostav.[code_payer] as outgoing_uz_document_
	,out_doc_sostav.[distance_way] as outgoing_uz_document_
	,out_doc_sostav.[osum] as outgoing_uz_document_
	,out_doc_sostav.[date_sozdan] as outgoing_uz_document_
	,out_doc_sostav.[date_otpr] as outgoing_uz_document_
	,out_doc_sostav.[date_pr] as outgoing_uz_document_
	,out_doc_sostav.[date_grpol] as outgoing_uz_document_
	,out_doc_sostav.[date_vid] as outgoing_uz_document_
	,out_doc_sostav.[info_sht] as outgoing_uz_document_
	,out_doc_sostav.[name_gr] as outgoing_uz_document_
	,out_doc_sostav.[note] as outgoing_uz_document_
	--,out_doc_sostav.[create]
	--,out_doc_sostav.[create_user]
	--,out_doc_sostav.[change]
	--,out_doc_sostav.[change_user]
	--========== ��������� �� �������� ==========================
	,arr_doc_uz.[nom_doc] as arrival_nom_doc						-- ����� ���������(�������)
	,arr_doc_uz.[nom_main_doc] as arrival_nom_main_doc				-- ����� ��������� ��������� (���� ��������)
	,arr_sost.composition_index as arrival_composition_index
	,arr_sost.date_adoption as arrival_date_adoption				-- ���� ������
	,arr_sost.date_adoption_act as arrival_date_adoption_act		-- ���� ������ (�� ����)
	,arr_car.date_adoption_act as arrival_car_date_adoption_act		-- ���� ������ ������ (�� ����)
	--> �������� �� ��������
	,arr_dir_cond.condition_name_ru as arrival_condition_name_ru
	,arr_dir_cond.condition_name_en as arrival_condition_name_en
	,arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru
	,arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en
	,arr_dir_cond.red as arrival_condition_red
	,arr_dir_cond.repairs as arrival_condition_repairs
	--> ���� ������� ��
	,dir_wagon.date_rem_uz as wagon_date_rem_uz
	--> ����������������
	,arr_doc_vag.gruzp as wagon_gruzp_doc
	,dir_wagon.gruzp as wagon_gruzp_uz
	--> ���� �� ��������
	,arr_dir_group_cargo.cargo_group_name_ru as arrival_cargo_group_name_ru
	,arr_dir_group_cargo.cargo_group_name_en as arrival_cargo_group_name_en
	,arr_dir_cargo.cargo_name_ru as arrival_cargo_name_ru
	,arr_dir_cargo.cargo_name_en as arrival_cargo_name_en
	--> ���������������� ������
	,arr_dir_certif.[id] as arrival_id_sertification_data
	,arr_dir_certif.[certification_data_ru] as arrival_sertification_data_ru
	,arr_dir_certif.[certification_data_en] as arrival_sertification_data_en
	--> ����������� ���������
	,arr_comm_cond.[id] as arrival_id_commercial_condition
	,arr_comm_cond.[commercial_condition_ru] as arrival_commercial_condition_ru
	,arr_comm_cond.[commercial_condition_en] as arrival_commercial_condition_en
	--> ������� �����������
	,arr_dir_ext_station.code as arrival_station_from_code
	,arr_dir_ext_station.station_name_ru as arrival_station_from_name_ru
	,arr_dir_ext_station.station_name_en as arrival_station_from_name_en
	,shipper.[code] as arrival_shipper_code
	,shipper.[shipper_name_ru] as arrival_shipper_name_ru
	,shipper.[shipper_name_en] as arrival_shipper_name_en
	--> ������� ������ ����
	,arr_sost.id_station_on as accepted_id_station_amkr
	,arr_dir_station_amkr.station_name_ru as accepted_station_amkr_name_ru
	,arr_dir_station_amkr.station_name_en as accepted_station_amkr_name_en
	,arr_dir_station_amkr.station_abbr_ru as accepted_station_amkr_abbr_ru
	,arr_dir_station_amkr.station_abbr_en as accepted_station_amkr_abbr_en
		--	--> ������� ����������
		--,arr_doc_vag.id_station_on_amkr as arrival_id_station_amkr
		--,arr_dir_station_amkr.station_name_ru as arrival_station_amkr_name_ru
		--,arr_dir_station_amkr.station_name_en as arrival_station_amkr_name_en
		--,arr_dir_station_amkr.station_abbr_ru as arrival_station_amkr_abbr_ru
		--,arr_dir_station_amkr.station_abbr_en as arrival_station_amkr_abbr_en
		----> ��� ����������
		--,arr_dir_division_amkr.code as arrival_division_amkr_code
		--,arr_dir_division_amkr.name_division_ru as arrival_division_amkr_name_ru
		--,arr_dir_division_amkr.name_division_en as arrival_division_amkr_name_en
		--,arr_dir_division_amkr.division_abbr_ru as arrival_division_amkr_abbr_ru
		--,arr_dir_division_amkr.division_abbr_en as arrival_division_amkr_abbr_en
	--================ ������� ��������� ========================================
	--> ��������� ��������
	,cur_load.[id] as current_id_loading_status
	,cur_load.[loading_status_ru] as current_loading_status_ru
	,cur_load.[loading_status_en] as current_loading_status_en
		--> ��������� �����
	,current_wagon_busy = CASE WHEN wio.[operation_end] is null THEN 1  ELSE 0 END
		--> ������� ��������
	,cur_dir_operation.[id] as current_id_operation
	,cur_dir_operation.[operation_name_ru] as current_operation_name_ru
	,cur_dir_operation.[operation_name_en] as current_operation_name_en
	,wio.[operation_start] as current_operation_start
	,wio.[operation_end] as current_operation_end
			--=============== ������� �� �������� ==================
		--,[arrival_duration] = DATEDIFF (minute, arr_sost.date_adoption, getdate())
		--,[arrival_idle_time] = @arrival_idle_time -- ����� �������
		--,[arrival_usage_fee] = 0.00
		--=============== ������� ������� ==================
		--,wim.id_station as current_id_station_amkr
		--,cur_dir_station_amkr.station_name_ru as current_station_amkr_name_ru
		--,cur_dir_station_amkr.station_name_en as current_station_amkr_name_en
		--,cur_dir_station_amkr.station_abbr_ru as current_station_amkr_abbr_ru
		--,cur_dir_station_amkr.station_abbr_en as current_station_amkr_abbr_en
		--=============== ������� �� ��. ������� ==================
		--,[current_station_duration] = DATEDIFF (minute, (select [IDS].[get_start_datetime_station_of_wim](wim.id)), getdate())
		--,[current_way_duration] = DATEDIFF (minute, wim.way_start, getdate())
		--,cur_dir_station_amkr.idle_time as current_station_idle_time
		--=============== ������� ���� ==================
		--,wim.[id_way] as current_id_way
		--,cur_dir_way.[id_park] as current_id_park
		--,cur_dir_way.[way_num_ru] as current_way_num_ru
		--,cur_dir_way.[way_num_en] as current_way_num_en
		--,cur_dir_way.[way_name_ru] as current_way_name_ru
		--,cur_dir_way.[way_name_en] as current_way_name_en
		--,cur_dir_way.[way_abbr_ru] as current_way_abbr_ru
		--,cur_dir_way.[way_abbr_en] as current_way_abbr_en
		--,wim.[way_start] as current_way_start
		--,wim.[way_end] as current_way_end
		--,wim.note as current_wim_note
		--=============== ������� ==================
		--,wim.[id_outer_way] as current_id_outer_way
		--,outer_ways.[name_outer_way_ru] as current_outer_way_name_ru
		--,outer_ways.[name_outer_way_en] as current_outer_way_name_en
		--,wim.[outer_way_start] as current_outer_way_start
		--,wim.[outer_way_end] as current_outer_way_end
		--=============== �������� �������� ==================
		,sap_is.[VBELN] as sap_incoming_supply_num
		,sap_is.[NUM_VBELN] as sap_incoming_supply_pos
		,sap_is.[ERDAT] as sap_incoming_supply_date
		,sap_is.[ETIME] as sap_incoming_supply_time
		,sap_is.[LGORT_10] as sap_incoming_supply_warehouse_code 
		,sap_is.[LGOBE_10] as sap_incoming_supply_warehouse_name
		,sap_is.[MATNR] as sap_incoming_supply_cargo_code 
		,sap_is.[MAKTX] as sap_incoming_supply_cargo_name
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
		--=============== ��� ===================================
		--> ....
		--=============== ������������� ������ ==================
		--> ������������� ������
		,il.num as instructional_letters_num
		,il.dt as instructional_letters_datetime
		,il.destination_station as instructional_letters_station_code
		,let_station_uz.station as instructional_letters_station_name
		,il.[note] as instructional_letters_note

FROM [IDS].[OutgoingSostav] as out_sost
		--> �������� ������
		Left JOIN [IDS].[OutgoingCars] as out_car ON out_sost.id = out_car.id_outgoing
		--==== ������� ����������� ================================================================
		--> ������� ��������� �����������
		Left JOIN IDS.WagonInternalRoutes as wir ON out_car.id = wir.[id_outgoing_car]
		--> ������� ��������
        Left JOIN IDS.WagonInternalOperation as wio ON wio.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= wir.id order by id desc)
		--==== ����� ������, ����������, ������� � ��������  ================================================================
		--> ��������� SAP ��������� ��������
		Left JOIN [IDS].[SAPOutgoingSupply] as sap_os ON wir.id_sap_outbound_supply = sap_os.id
		--> ��������� �� ����� �� �������� ������ �� ��
		Left JOIN [IDS].[Outgoing_UZ_Vagon] as out_doc_vag ON out_car.id_outgoing_uz_vagon = out_doc_vag.id
		--> ��������� �� ������ �� �������� ������ �� ��
		Left JOIN [IDS].[Outgoing_UZ_Document] as out_doc_sostav ON out_doc_vag.id_document = out_doc_sostav.id
		--==== �������� � ����� ������ =====================================================================
		--> �������� ������
		Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
		--> �������� �������
		Left JOIN IDS.ArrivalSostav as arr_sost ON arr_car.id_arrival = arr_sost.id
		 --> ��������� �� ����� �� �������� ������ �� ����
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		 --> ��������� �� ������ ������� (������) �� �������� ������ �� ����
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
		 --> ��������� SAP �������� ��������
		Left JOIN [IDS].[SAPIncomingSupply] as sap_is ON wir.id_sap_incoming_supply = sap_is.id
		 --==== ������������� ������ =====================================================================
		--> �������� ������� �� ������
		Left JOIN IDS.InstructionalLettersWagon as ilw  ON ilw.id = (SELECT TOP (1) [id] FROM [IDS].[InstructionalLettersWagon] where [num] =wir.num and [close] is null order by id desc)
		--> �������� �����
		Left JOIN IDS.InstructionalLetters as il ON ilw.id_instructional_letters = il.id
		--==== ����������� ===================================================================================
		--> ���������� �������
		Left JOIN IDS.Directory_Wagons as dir_wagon ON out_car.num = dir_wagon.num
		--> ���������� �����
		--Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = out_car.num and rent_end is null order by [id] desc)	
		--> ���������� ����� �� ��������
		Left JOIN [IDS].[Directory_WagonsRent] as arr_wag_rent ON out_doc_vag.id_wagons_rent_arrival = arr_wag_rent.id
		--> ���������� ����� �� ��������
		Left JOIN [IDS].[Directory_WagonsRent] as out_wag_rent ON out_doc_vag.id_wagons_rent_outgoing = out_wag_rent.id
		--> ���������� �������� ������ �� ��������
		Left JOIN IDS.Directory_OperatorsWagons as arr_dir_operator ON arr_wag_rent.id_operator =  arr_dir_operator.id
		--> ���������� ����������� �������� �� ��������
		Left JOIN IDS.Directory_LimitingLoading as arr_dir_limload ON arr_wag_rent.id_limiting =  arr_dir_limload.id
		--> ���������� �������� ������ �� ��������
		Left JOIN IDS.Directory_OperatorsWagons as out_dir_operator ON out_wag_rent.id_operator =  out_dir_operator.id
		--> ���������� ����������� �������� �� ��������
		Left JOIN IDS.Directory_LimitingLoading as out_dir_limload ON out_wag_rent.id_limiting =  out_dir_limload.id
		--> ���������� ����������� ������ �� ��
		Left JOIN [IDS].[Directory_OwnersWagons] as dir_owner ON dir_wagon.id_owner = dir_owner.id
		--> ���������� ������ (������������� ������ �� ��������)
		Left JOIN IDS.Directory_Countrys as out_dir_countrys ON out_doc_vag.id_countrys = out_dir_countrys.id
		--> ���������� ��� ������
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
		--> ���������� ��� ������
		Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
		--> ���������� �������� �� ��������
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> ���������� �������� �� ��������
		Left JOIN IDS.Directory_ConditionArrival as out_dir_cond ON out_doc_vag.id_condition = out_dir_cond.id
		--> ���������� ����������������
		Left JOIN [IDS].[Directory_Shipper] as shipper ON arr_doc_uz.[code_shipper] = shipper.[code]
		--> ���������� ������ �� ��������
		Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
		--> ���������� ������ �� ��������
		Left JOIN IDS.Directory_Cargo as out_dir_cargo ON out_doc_vag.id_cargo =  out_dir_cargo.id
		--> ���������� ������ ������ �� ��������
		Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		--> ���������� ������ ������ �� ��������
		Left JOIN IDS.Directory_CargoGroup as out_dir_group_cargo ON out_dir_cargo.id_group =  out_dir_group_cargo.id
		--> ���������� ������ ����� �� ��������
		Left JOIN [IDS].[Directory_CargoETSNG] as out_dir_cargo_etsng ON out_dir_cargo.id_cargo_etsng = out_dir_cargo_etsng.id
		--> ���������� ������ ��� �� ��������
		Left JOIN [IDS].[Directory_CargoGNG] as out_dir_cargo_gng ON out_doc_vag.id_cargo_gng = out_dir_cargo_gng.id

		--> ���������� ���������� 
		Left JOIN [IDS].[Directory_DetentionReturn] as out_dir_dr ON out_car.id_outgoing_detention = out_dir_dr.id
		--> ���������� ������������� ����		
		Left JOIN [IDS].[Directory_Reason_Discrepancy] as out_dir_rd_amkr ON out_car.id_reason_discrepancy_amkr = out_dir_rd_amkr.id
		--> ���������� ������������� ����		
		Left JOIN [IDS].[Directory_Reason_Discrepancy] as out_dir_rd_uz ON out_car.id_reason_discrepancy_uz = out_dir_rd_uz.id
		--> ���������� �������� ������
		Left JOIN [IDS].[OutgoingDetentionReturn] as out_detect_return_start ON out_car.id_reason_discrepancy_amkr = out_detect_return_start.id
		--> ���������� �������� ����
		Left JOIN [IDS].[OutgoingDetentionReturn] as out_detect_return_stop ON out_car.id_reason_discrepancy_uz = out_detect_return_stop.id

		--> ���������� �������� ������ 
		Left JOIN [IDS].[Directory_DetentionReturn] as out_dir_dr_start ON out_detect_return_start.id_detention_return = out_dir_dr_start.id
		--> ���������� �������� ������ 
		Left JOIN [IDS].[Directory_DetentionReturn] as out_dir_dr_stop ON out_detect_return_stop.id_detention_return = out_dir_dr_stop.id


		--> ���������� ���������� ������
		Left JOIN IDS.Directory_CertificationData as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
		--> ���������� ����������� ���������
		Left JOIN [IDS].[Directory_CommercialCondition] as arr_comm_cond ON arr_doc_vag.[id_commercial_condition] = arr_comm_cond.id
		--> ���������� ������� ����������� (������� �������)
		Left JOIN IDS.Directory_ExternalStation as arr_dir_ext_station ON arr_doc_uz.code_stn_from =  arr_dir_ext_station.code
		--> ���������� ������� ���� (������� ������ �� ����)
		Left JOIN IDS.Directory_Station as arr_dir_station_amkr ON arr_sost.id_station_on =  arr_dir_station_amkr.id
		--> ���������� ������� ���� (������� �������� �� ����)
		Left JOIN IDS.Directory_Station as out_dir_station_amkr ON out_sost.id_station_from =  out_dir_station_amkr.id
		--> ���������� ������� ���� (�������� ������� �� ������� ��������� ������)
		Left JOIN IDS.Directory_Station as out_dir_station_on ON out_sost.id_station_on =  out_dir_station_on.id
		--> ���������� ���� ���� (���� �������� �� ����)
		Left JOIN [IDS].[Directory_Ways] as out_dir_way_amkr ON out_sost.[id_way_from] =  out_dir_way_amkr.id

		--> ���������� ������������� ���� (�� ��������)
		Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis ON out_doc_vag.id_division = arr_dir_divis.id
		--..............

		--> ���������� �������� ��� ������� (������� ��������)
		Left JOIN IDS.Directory_WagonOperations as cur_dir_operation ON wio.id_operation =  cur_dir_operation.id
		--> ���������� �������� ��������
		Left JOIN [IDS].[Directory_WagonLoadingStatus] as cur_load ON wio.id_loading_status = cur_load.id
		--> ���������� ������� ������� ��
		Left JOIN UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs
		--> ���������� ������� ������� �� (�� ��������)
		Left JOIN [UZ].[Directory_Stations] as out_station_uz ON  out_doc_vag.[code_stn_to] = out_station_uz.code_cs

WHERE 

out_sost.id =127697 

order by out_car.position