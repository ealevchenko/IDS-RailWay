use [KRR-PA-CNT-Railway]

declare @num int = 63530935

  SELECT 
		dir_rent.[id]
		,dir_rent.[num]
	  	--> �������� �� �������� [IDS].[Directory_OperatorsWagons]
		,dir_rent.[id_operator] as curr_wagons_rent_id_operator			-- id ������ �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,curr_dir_operator.[operators_ru] as curr_wagons_rent_operators_ru	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,curr_dir_operator.[operators_en] as curr_wagons_rent_operators_en	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,curr_dir_operator.[abbr_ru] as curr_wagons_rent_operator_abbr_ru		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,curr_dir_operator.[abbr_en] as curr_wagons_rent_operator_abbr_en		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,dir_rent.[rent_start] as curr_wagons_rent_start					-- ������ ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,dir_rent.[rent_end] as curr_wagons_rent_end						-- ����� ������ ��������� [IDS].[Directory_WagonsRent] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,curr_dir_operator.[paid] as curr_wagons_rent_operator_paid			-- ������� ��������� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,curr_dir_operator.[color] as curr_wagons_rent_operator_color			-- ���� ��������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Outgoing_UZ_Vagon]
		--> ����������� �� �������� [IDS].[Directory_LimitingLoading]
		,dir_rent.[id_limiting] as curr_wagons_rent_id_limiting			-- id ������ ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,curr_dir_limload.[limiting_name_ru] as curr_wagons_rent_limiting_name_ru	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,curr_dir_limload.[limiting_name_en] as curr_wagons_rent_limiting_name_en	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,curr_dir_limload.[limiting_abbr_ru] as curr_wagons_rent_limiting_abbr_ru	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,curr_dir_limload.[limiting_abbr_en] as curr_wagons_rent_limiting_abbr_en	-- ���������� [IDS].[Directory_LimitingLoading] �� �������� [IDS].[Outgoing_UZ_Vagon]
		,dir_rent.[id_operator]
		,dir_rent.[id_limiting]
		,dir_rent.[rent_start]
		,dir_rent.[rent_end]
		,dir_rent.[create]
		,dir_rent.[create_user]
		,dir_rent.[change]
		,dir_rent.[change_user]
		,dir_rent.[parent_id]
  FROM [IDS].[Directory_WagonsRent] as dir_rent
    	--> ���������� �������� ������ �� ��������
		Left JOIN IDS.Directory_OperatorsWagons as curr_dir_operator ON dir_rent.id_operator =  curr_dir_operator.id
		--> ���������� ����������� �������� �� ��������
		Left JOIN IDS.Directory_LimitingLoading as curr_dir_limload ON dir_rent.id_limiting =  curr_dir_limload.id
   where [num] = @num