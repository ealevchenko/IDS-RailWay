USE [KRR-PA-CNT-Railway]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [IDS].[get_view_wagons_rent_of_num]
 (
	@num int
 )
	RETURNS 
	@wagons_rent TABLE(
		[id] [int] NOT NULL,
		[num] [int] NOT NULL,
		[curr_wagons_rent_id_operator] [int] NULL,
		[curr_wagons_rent_operators_ru] [nvarchar](100) NULL,
		[curr_wagons_rent_operators_en] [nvarchar](100) NULL,
		[curr_wagons_rent_operator_abbr_ru] [nvarchar](20) NULL,
		[curr_wagons_rent_operator_abbr_en] [nvarchar](20) NULL,
		[curr_wagons_rent_start] [datetime] NULL,
		[curr_wagons_rent_end] [datetime] NULL,
		[curr_wagons_rent_operator_paid] [bit] NULL,
		[curr_wagons_rent_operator_color] [nvarchar](10) NULL,
		[curr_wagons_rent_id_limiting] [int] NULL,
		[curr_wagons_rent_limiting_name_ru] [nvarchar](100) NULL,
		[curr_wagons_rent_limiting_name_en] [nvarchar](100) NULL,
		[curr_wagons_rent_limiting_abbr_ru] [nvarchar](30) NULL,
		[curr_wagons_rent_limiting_abbr_en] [nvarchar](30) NULL,
		[id_operator] [int] NULL,
		[id_limiting] [int] NULL,
		[rent_start] [datetime] NULL,
		[rent_end] [datetime] NULL,
		[create] [datetime] NOT NULL,
		[create_user] [nvarchar](50) NOT NULL,
		[change] [datetime] NULL,
		[change_user] [nvarchar](50) NULL,
		[parent_id] [int] NULL
		)
	AS
	BEGIN
	insert @wagons_rent
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
  RETURN
 END


GO


