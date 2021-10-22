use [KRR-PA-CNT-Railway]

--select count(wim.id)
--FROM IDS.WagonInternalMovement as wim	--> ������� ���������
--where (wim.way_end IS NULL 
----and wim.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].Directory_Station where station_delete is null))
--) OR (wim.outer_way_start is not NULL and wim.outer_way_end is null)

--> ������� ������� ����� �������
declare @arrival_idle_time int = CAST((select [value] from [IDS].[Settings] where area=N'wsd' and name = N'arrival_idle_time') AS INT);

	select wir.id as wir_id
		,wim.id as wim_id
		,wio.id as wio_id
		--=============== �������� ���� ==================
		,wir.num
		,wim.position
		--> ��������
		,dir_operator.[id] as id_operator
		,dir_operator.[operators_ru]
		,dir_operator.[operators_en]
		,dir_operator.[abbr_ru] as operator_abbr_ru
		,dir_operator.[abbr_en] as operator_abbr_en
		,dir_rent.[rent_start] as operator_rent_start
		,dir_rent.[rent_end] as operator_rent_end
		,dir_operator.[paid] as operator_paid
		,dir_operator.[color] as operator_color
		,dir_operator.monitoring_idle_time as operator_monitoring_idle_time
		--> �����������
		,dir_limload.[id] as id_limiting_loading
		,dir_limload.[limiting_name_ru]
		,dir_limload.[limiting_name_en]
		,dir_limload.[limiting_abbr_ru]
		,dir_limload.[limiting_abbr_en]
		--> ����������� �� ��
		,dir_owner.[id] as id_owner_wagon
		,dir_owner.[owner_ru] as owner_wagon_ru
		,dir_owner.[owner_en] as owner_wagon_en
		,dir_owner.[abbr_ru] as owner_wagon_abbr_ru
		,dir_owner.[abbr_en] as owner_wagon_abbr_en
		--> �������������
		,dir_countrys.code_sng as wagon_adm
		,dir_countrys.countrys_name_ru as wagon_adm_name_ru
		,dir_countrys.countrys_name_en as wagon_adm_name_en
		,dir_countrys.country_abbr_ru as wagon_adm_abbr_ru
		,dir_countrys.country_abbr_en as wagon_adm_abbr_en
		--> ��� ������
		,dir_rod.rod_uz as wagon_rod
		,dir_rod.genus_ru as wagon_rod_name_ru
		,dir_rod.genus_en as wagon_rod_name_en
		,dir_rod.abbr_ru as wagon_rod_abbr_ru
		,dir_rod.abbr_en as wagon_rod_abbr_en
		--> ��� ������
		,dir_type.type_ru as wagon_type_ru
		,dir_type.type_en as wagon_type_en
		--> �������� �� ��������
		,arr_dir_cond.condition_name_ru as arrival_condition_name_ru
		,arr_dir_cond.condition_name_en as arrival_condition_name_en
		,arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru
		,arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en
		,arr_dir_cond.red as arrival_condition_red
		--> �������� �� ������� ��������
		,cur_dir_cond.condition_name_ru as current_condition_name_ru
		,cur_dir_cond.condition_name_en as current_condition_name_en
		,cur_dir_cond.condition_abbr_ru as current_condition_abbr_ru
		,cur_dir_cond.condition_abbr_en as current_condition_abbr_en
		,cur_dir_cond.red as current_condition_red
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
		--> ������� ����������
		,arr_dir_station_amkr.station_name_ru as arrival_station_amkr_name_ru
		,arr_dir_station_amkr.station_name_en as arrival_station_amkr_name_en
		,arr_dir_station_amkr.station_abbr_ru as arrival_station_amkr_abbr_ru
		,arr_dir_station_amkr.station_abbr_en as arrival_station_amkr_abbr_en
		--> ��� ����������
		,arr_dir_division_amkr.code as arrival_division_amkr_code
		,arr_dir_division_amkr.name_division_ru as arrival_division_amkr_name_ru
		,arr_dir_division_amkr.name_division_en as arrival_division_amkr_name_en
		,arr_dir_division_amkr.division_abbr_ru as arrival_division_amkr_abbr_ru
		,arr_dir_division_amkr.division_abbr_en as arrival_division_amkr_abbr_en
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
		,[arrival_duration] = DATEDIFF (minute, arr_sost.date_adoption, getdate())
		,[arrival_idle_time] = @arrival_idle_time -- ����� �������
		,[arrival_usage_fee] = 0.00
		--=============== ������� �� ��. ������� ==================
		,[current_station_duration] = DATEDIFF (minute, (select [IDS].[get_start_datetime_station_of_wim](wim.id)), getdate())
		,[current_way_duration] = DATEDIFF (minute, wim.way_start, getdate())
		,cur_dir_station_amkr.idle_time as current_station_idle_time
		--=============== ��������������� �����������( �/�) ==================
		--> ....
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
		--> ....
		--=============== ��� ===================================
		--> ....
		--=============== ������������� ������ ==================
		--> ������������� ������
		,il.num as instructional_letters_num
		,il.dt as instructional_letters_datetime
		,il.destination_station as instructional_letters_station_code
		,let_station_uz.station as instructional_letters_station_name
		,il.[note] as instructional_letters_note
		--=============== �������� ����������� ==================
		--> ������
		--,wagon_brutto_doc = (CASE WHEN arr_doc_vag.ves_tary_arc is not null AND arr_doc_vag.vesg is not null THEN arr_doc_vag.ves_tary_arc+arr_doc_vag.vesg ELSE null END)	--������ �� ���, ��
		,wagon_brutto_doc = (CASE WHEN arr_doc_vag.ves_tary_arc is not null AND arr_doc_vag.vesg is not null 
									THEN arr_doc_vag.ves_tary_arc+arr_doc_vag.vesg 
									ELSE (CASE WHEN arr_doc_vag.u_tara is not null AND arr_doc_vag.vesg is not null 
												THEN arr_doc_vag.u_tara+arr_doc_vag.vesg 
												ELSE null 
												END) 
								END)	--������ �� ���, ��
		,wagon_brutto_amkr = 0
		--> ����
		,arr_doc_vag.u_tara as wagon_tara_doc
		,dir_wagon.tara as wagon_tara_uz
		,arr_doc_vag.ves_tary_arc as wagon_tara_arc_doc		--���� �� ���, ��.
		--> ��� ����� (�����)	
		,arr_doc_vag.vesg as wagon_vesg_doc					--����� �� ���, ��
		,wagon_vesg_amkr = 0
		--> ��� ����� (�������)		
		,diff_vesg = 0
		--=============== ��������� ==================
		,wir.doc_outgoing_car as doc_outgoing_car				-- ������� ��������� ��� �����
		,arr_doc_uz.[nom_doc] as arrival_nom_doc			-- ����� ���������(�������)
		,arr_doc_uz.[nom_main_doc] as arrival_nom_main_doc		-- ����� ��������� ��������� (���� ��������)
		,arr_sost.composition_index as arrival_composition_index
		,arr_sost.date_adoption as arrival_date_adoption		-- ���� ������
		,out_car.[id_outgoing_return_start] as outgoing_id_return
		,dir_return.[cause_ru] as outgoing_return_cause_ru
		,dir_return.[cause_en] as outgoing_return_cause_en
		,out_sost.date_outgoing as outgoing_date				-- ���� ��������
		,out_sost.status as outgoing_sostav_status				-- ������ ������� ��� ��������
		,dir_wagon.note as wagon_ban_uz							-- ������� �� �� 
		,dir_wagon.[closed_route] as wagon_closed_route			--��������� ������� (������)
		,wir.note as wir_note									-- ���������� �� ���� �������� ������

	FROM IDS.WagonInternalMovement as wim	--> ������� ���������
		--> ������� ��������� �����������
		 INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
		 --> ������� ��������
		 Left JOIN IDS.WagonInternalOperation as wio ON wio.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= wim.id_wagon_internal_routes order by id desc)
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
		 --==== ����� ������ � ���������� ================================================================
		--> �������� ������
		Left JOIN [IDS].[OutgoingCars] as out_car ON wir.id_outgoing_car = out_car.id
		--> �������� �������
		Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_car.id_outgoing = out_sost.id

		 --==== ������������� ������ =====================================================================
		--> �������� ������� �� ������
		Left JOIN IDS.InstructionalLettersWagon as ilw  ON ilw.id = (SELECT TOP (1) [id] FROM [IDS].[InstructionalLettersWagon] where [num] =wir.num and [close] is null order by id desc)
		--> �������� �����
		Left JOIN IDS.InstructionalLetters as il ON ilw.id_instructional_letters = il.id
		--==== ����������� ===================================================================================
		--> ���������� �������
		Left JOIN IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num
		--> ���������� �����
		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
		--> ���������� �������� ������
		Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_rent.id_operator =  dir_operator.id
		--> ���������� ����������� ��������
		Left JOIN IDS.Directory_LimitingLoading as dir_limload ON dir_rent.id_limiting =  dir_limload.id
		--> ���������� ����������� ������ �� ��
		Left JOIN [IDS].[Directory_OwnersWagons] as dir_owner ON dir_wagon.id_owner = dir_owner.id
		--> ���������� ������ (������������� ������)
		Left JOIN IDS.Directory_Countrys as dir_countrys ON dir_wagon.id_countrys = dir_countrys.id
		--> ���������� ��� ������
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
		--> ���������� ��� ������
		Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
		--> ���������� �������� �� ��������
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> ���������� �������� �� ������� ��������
		Left JOIN IDS.Directory_ConditionArrival as cur_dir_cond ON wio.id_condition =  cur_dir_cond.id
		--> ���������� ����������������
		Left JOIN [IDS].[Directory_Shipper] as shipper ON arr_doc_uz.[code_shipper] = shipper.[code]
		--> ���������� ������
		Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
		--> ���������� ������ ������
		Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		--> ���������� ���������� ������
		Left JOIN IDS.Directory_CertificationData as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
		--> ���������� ����������� ���������
		Left JOIN [IDS].[Directory_CommercialCondition] as arr_comm_cond ON arr_doc_vag.[id_commercial_condition] = arr_comm_cond.id
		--> ���������� ������� ����������� (������� �������)
		Left JOIN IDS.Directory_ExternalStation as arr_dir_ext_station ON arr_doc_uz.code_stn_from =  arr_dir_ext_station.code
		--> ���������� ������� ���� (������� ���������� ����)
		Left JOIN IDS.Directory_Station as arr_dir_station_amkr ON arr_doc_vag.id_station_on_amkr =  arr_dir_station_amkr.id
		--> ���������� ������� ���� (������� ������� ����)
		Left JOIN IDS.Directory_Station as cur_dir_station_amkr ON wim.id_station =  cur_dir_station_amkr.id
		--> ���������� ������������� (��� ����������)
		Left JOIN IDS.Directory_Divisions as arr_dir_division_amkr ON arr_doc_vag.id_division_on_amkr =  arr_dir_division_amkr.id
		--> ���������� �������� ��� ������� (������� ��������)
		Left JOIN IDS.Directory_WagonOperations as cur_dir_operation ON wio.id_operation =  cur_dir_operation.id
		--> ���������� �������� ��������
		Left JOIN [IDS].[Directory_WagonLoadingStatus] as cur_load ON wio.id_loading_status = cur_load.id
		--> ���������� ������� ������� ��
		Left JOIN UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs
		--> ���������� ���������
		Left JOIN [IDS].[Directory_DetentionReturn] as dir_return ON out_car.id_outgoing_return_start = dir_return.id
		where (wim.way_end IS NULL and wim.id_way in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where [way_delete] is null and id_station in (SELECT [id] FROM [KRR-PA-CNT-Railway].[IDS].Directory_Station where station_delete is null))) 
		OR (wim.outer_way_start is not NULL and wim.outer_way_end is null)


----select wim.*
----FROM IDS.WagonInternalMovement as wim	--> ������� ���������
----where wim.outer_way_start is not NULL and wim.outer_way_end is null