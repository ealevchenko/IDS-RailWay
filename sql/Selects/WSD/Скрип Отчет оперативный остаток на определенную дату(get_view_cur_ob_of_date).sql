use [KRR-PA-CNT-Railway]
declare @date datetime = convert(datetime,'2023-09-01 20:00:00',120)

select 
	wir.num
	,arr_sost.date_adoption
	,dir_curr_owg.[group]
	,curr_wag_rent.id_operator
	,curr_dir_operator.[operators_ru] as current_wagons_rent_operators_ru	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
	,curr_dir_operator.[operators_en] as current_wagons_rent_operators_en	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
	,curr_dir_operator.[abbr_ru] as current_wagons_rent_operator_abbr_ru		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
	,curr_dir_operator.[abbr_en] as current_wagons_rent_operator_abbr_en		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
	,curr_dir_operator.paid as current_wagons_rent_operator_paid
FROM IDS.[WagonInternalRoutes] as wir
	--==== ����� ������ =====================================================================
	--> �������� ������
	Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
	--> �������� �������
	Left JOIN IDS.ArrivalSostav as arr_sost ON arr_car.id_arrival = arr_sost.id
	--> ��������� �� ����� �� �������� ������ �� ����
	Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
	--> ��������� �� ������ ������� (������) �� �������� ������ �� ����
	Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
	--==== �������� ������ =====================================================================
	--> �������� ������
	Left JOIN IDS.OutgoingCars as out_car ON wir.id_outgoing_car = out_car.id
	--> �������� �������
	Left JOIN IDS.OutgoingSostav as out_sost ON out_car.id_outgoing = out_sost.id
	--==== ����������� =====================================================================
	--> ���������� ��� ������ �� ��������
	Left JOIN IDS.Directory_GenusWagons as dir_rod ON arr_doc_vag.[id_genus] = dir_rod.id
	--> ���������� ����� �������
	Left JOIN [IDS].[Directory_WagonsRent] as curr_wag_rent ON curr_wag_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@date order by [id] desc)	
	--> ���������� �������� ������ �������
	Left JOIN IDS.Directory_OperatorsWagons as curr_dir_operator ON curr_wag_rent.id_operator =  curr_dir_operator.id
	--> ��������� ������ ����������	�������	
	Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_curr_owg ON curr_wag_rent.id_operator = dir_curr_owg.[id_operator]

where 
	-- �������� ����������
	(dir_rod.rod_uz <> 90 or dir_rod.rod_uz is null) AND NOT arr_doc_uz.[klient] = 1 AND (NOT dir_curr_owg.[group] in ('amkr_vz') OR dir_curr_owg.[group] is null)
	AND arr_sost.date_adoption <= @date
	AND (out_sost.[date_outgoing] is null OR out_sost.[date_outgoing] > @date) 
    AND wir.id in (SELECT max(id_wagon_internal_routes)
	FROM IDS.WagonInternalMovement 
	where  id_station <> 10 AND 
		((outer_way_start is null AND (([way_start]<=@date and way_end>=@date) OR ([way_start]<=@date and way_end is null))) OR
		(outer_way_start is not null AND ((outer_way_start<=@date and outer_way_end>=@date) OR (outer_way_start<=@date and outer_way_end is null))))
	Group by id_wagon_internal_routes )
	order by arr_sost.date_adoption desc
