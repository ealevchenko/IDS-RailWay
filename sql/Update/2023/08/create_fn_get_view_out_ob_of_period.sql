USE [KRR-PA-CNT-Railway]
GO

/****** �������� ������� �� ������������ ������ (����� �������-��������)******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [IDS].[get_view_out_ob_of_period]
 (
   @start datetime, 
   @stop datetime
 )
	RETURNS 
	@operating_balance TABLE(
	[num] [int] NULL,
	[group] [nvarchar](20) NULL,
	[id_operator] [int] NULL,
	[current_wagons_rent_operators_ru] [nvarchar](100) NULL,
	[current_wagons_rent_operators_en] [nvarchar](100) NULL,
	[current_wagons_rent_operator_abbr_ru] [nvarchar](20) NULL,
	[current_wagons_rent_operator_abbr_en] [nvarchar](20) NULL
	)
	AS
	BEGIN
	insert @operating_balance
	select
		out_car.num
		,dir_curr_owg.[group]
		,curr_wag_rent.id_operator
		,curr_dir_operator.[operators_ru] as current_wagons_rent_operators_ru	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.[operators_en] as current_wagons_rent_operators_en	-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.[abbr_ru] as current_wagons_rent_operator_abbr_ru		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
		,curr_dir_operator.[abbr_en] as current_wagons_rent_operator_abbr_en		-- �������� [IDS].[Directory_OperatorsWagons] �� �������� [IDS].[Arrival_UZ_Vagon]
	FROM [IDS].[OutgoingSostav] as out_sost
		--> �������� ������
		Left JOIN IDS.[OutgoingCars] as out_car ON out_sost.id = out_car.id_outgoing
		--> ��������� �� ����� �� �������� ������ �� ����
		Left JOIN IDS.[Outgoing_UZ_Vagon] as out_doc_vag ON out_car.id_outgoing_uz_vagon = out_doc_vag.id
		--> ��������� �� ������ ������� (������) �� �������� ������ �� ����
		Left JOIN IDS.Outgoing_UZ_Document as out_doc_uz ON out_doc_uz.id = out_doc_vag.id_document
		--> ���������� ��� ������ �� ��������
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON out_doc_vag.[id_genus] = dir_rod.id
			--> ���������� ����� �������
		Left JOIN [IDS].[Directory_WagonsRent] as curr_wag_rent ON curr_wag_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = out_car.num and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@stop order by [id] desc)	
		--> ���������� �������� ������ �������
		Left JOIN IDS.Directory_OperatorsWagons as curr_dir_operator ON curr_wag_rent.id_operator =  curr_dir_operator.id
		--> ��������� ������ ����������	�������	
		Left JOIN [IDS].[Directory_OperatorsWagonsGroup] as dir_curr_owg ON curr_wag_rent.id_operator = dir_curr_owg.[id_operator]
where out_car.position_outgoing is not null
	-- �������� ����������
	AND (dir_rod.rod_uz <> 90 or dir_rod.rod_uz is null) AND (NOT dir_curr_owg.[group] in ('amkr_vz') OR dir_curr_owg.[group] is null)
	--and curr_dir_operator.[abbr_ru] = N'���'
	AND out_sost.[date_outgoing] >= @start and out_sost.[date_outgoing] <= @stop
		RETURN
 END

GO