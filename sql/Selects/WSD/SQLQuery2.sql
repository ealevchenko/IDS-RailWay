use [KRR-PA-CNT-Railway]

declare @start datetime = convert(datetime,'2023-08-01 20:01:00',120)
declare @stop datetime = convert(datetime,'2023-08-02 20:00:00',120)

SELECT arr_car.num
	  ,arr_sost.[id]
      ,arr_sost.[id_arrived]
      ,arr_sost.[id_sostav]
      ,arr_sost.[train]
      ,arr_sost.[composition_index]
      ,arr_sost.[date_arrival]
      ,arr_sost.[date_adoption]
      ,arr_sost.[date_adoption_act]
      ,arr_sost.[id_station_from]
      ,arr_sost.[id_station_on]
      ,arr_sost.[id_way]
      ,arr_sost.[numeration]
      ,arr_sost.[num_doc]
      ,arr_sost.[count]
      ,arr_sost.[status]
      ,arr_sost.[note]
      ,arr_sost.[create]
      ,arr_sost.[create_user]
      ,arr_sost.[change]
      ,arr_sost.[change_user]

  FROM [IDS].[ArrivalSostav] as arr_sost
  		--> �������� ������
		Left JOIN IDS.ArrivalCars as arr_car ON arr_sost.id = arr_car.id_arrival
				--> ��������� �����������
		Left JOIN [IDS].[WagonInternalRoutes] as wir ON wir.id_arrival_car = arr_car.id
		Left JOIN [IDS].[WagonInternalOperation] as wio ON wio.id = (select top(1) [id] FROM [IDS].[WagonInternalOperation] WHERE [id_wagon_internal_routes] = wir.id)



		--> ���������� �������� ������� c ������ ��������
		Left JOIN IDS.ArrivalSostav as arr_sost_old ON arr_sost_old.id = [IDS].[get_old_id_arrival_of_wir_parent_id](wir.parent_id)
		--> ��������� �� ����� �� �������� ������ �� ����
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		 --> ��������� �� ������ ������� (������) �� �������� ������ �� ����
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
		--> ��������� SAP �������� ��������
		Left JOIN [IDS].[SAPIncomingSupply] as sap_is ON wir.id_sap_incoming_supply = sap_is.id
		--> ��������� SAP ��������� ��������
		Left JOIN [IDS].[SAPOutgoingSupply] as sap_os ON wir.id_sap_outbound_supply = sap_os.id
	  	--==== �������� ������ =====================================================================
		--> �������� ������
		Left JOIN IDS.OutgoingCars as out_car ON wir.id_outgoing_car = out_car.id
		--> �������� �������
		Left JOIN IDS.OutgoingSostav as out_sost ON out_car.id_outgoing = out_sost.id
		--==== ������������� ������ =====================================================================
		--> �������� ������� �� ������
		Left JOIN IDS.InstructionalLettersWagon as ilw  ON ilw.id = (SELECT TOP (1) [id] FROM [IDS].[InstructionalLettersWagon] where [num] =wir.num and [close] is null order by id desc)
		--> �������� �����
		Left JOIN IDS.InstructionalLetters as il ON ilw.id_instructional_letters = il.id
		--==== ����������� ===================================================================================
		--> ���������� ����� �������
		Left JOIN [IDS].[Directory_WagonsRent] as curr_wag_rent ON curr_wag_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@stop order by [id] desc)	
		--> ���������� ����� �� ��������		
		Left JOIN [IDS].[Directory_WagonsRent] as arr_wag_rent ON arr_wag_rent.id = arr_doc_vag.id_wagons_rent_arrival
		--> ���������� �������� ������ �� ��������
		Left JOIN IDS.Directory_OperatorsWagons as arr_dir_operator ON arr_wag_rent.id_operator =  arr_dir_operator.id
		--> ���������� �������� ������ �������
		Left JOIN IDS.Directory_OperatorsWagons as curr_dir_operator ON curr_wag_rent.id_operator =  curr_dir_operator.id
		--> ���������� �������� �� ��������
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> ���������� ������� ��������
		Left JOIN IDS.Directory_ConditionArrival as cur_dir_cond ON wio.id_condition = cur_dir_cond.id
		--> ���������� ��� ������ �� ��������
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON arr_doc_vag.[id_genus] = dir_rod.id
		--> ���������� ��� ������
		Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
		--> ���������� ������ �� ��������
		Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
		--> ���������� ������ ������ �� ��������
		Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		--> ���������� ������ ����� �� ��������
		Left JOIN [IDS].[Directory_CargoETSNG] as arr_dir_cargo_etsng ON arr_dir_cargo.id_cargo_etsng = arr_dir_cargo_etsng.id
		--> ���������� ������ ��� �� ��������
		Left JOIN [IDS].[Directory_CargoGNG] as arr_dir_cargo_gng ON arr_doc_vag.id_cargo_gng = arr_dir_cargo_gng.id
		--> ���������� ���������� ������
		Left JOIN IDS.Directory_CertificationData as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
		--> ���������� ����������� ���������
		Left JOIN [IDS].[Directory_CommercialCondition] as arr_comm_cond ON arr_doc_vag.[id_commercial_condition] = arr_comm_cond.id
		--> ���������� ������� ������� (�� �������� from)
		Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON arr_doc_uz.[code_stn_from] = arr_ext_station_from.code
		--> ���������� �������� ����� (�� �������� from)
		Left JOIN [IDS].[Directory_InlandRailway] as arr_ir_from ON arr_ext_station_from.[code_inlandrailway] = arr_ir_from.code
		--> ���������� ������������� ���� (�� ��������)
		Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis_amkr ON arr_doc_vag.[id_division_on_amkr] = arr_dir_divis_amkr.id
		--> ���������� ������� ���� (������� ������� ����)
		Left JOIN IDS.Directory_Station as cur_dir_station_amkr ON wim.id_station =  cur_dir_station_amkr.id
		--> ���������� ������� ����
	    Left JOIN [IDS].[Directory_Ways] as cur_dir_way ON wim.[id_way] = cur_dir_way.id
		--> ���������� ������� ���� ��������
		Left JOIN IDS.Directory_OuterWays as outer_ways ON wim.id_outer_way = outer_ways.id 
		--> ���������� ������� ������� ��
		Left JOIN UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs
		--> ��������� ������ ����������	��������	
		Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_owg ON arr_wag_rent.id_operator = dir_owg.[id_operator]
		--> ��������� ������ ����������	�������	
		Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_curr_owg ON curr_wag_rent.id_operator = dir_curr_owg.[id_operator]

		where arr_sost.[date_adoption] >= @start and arr_sost.[date_adoption] <= @stop
