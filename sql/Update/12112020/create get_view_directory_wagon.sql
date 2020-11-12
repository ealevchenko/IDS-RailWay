USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_directory_wagon]    Script Date: 12.11.2020 12:30:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






CREATE FUNCTION [IDS].[get_view_directory_wagon]
 (
 )
	RETURNS 
	@view_directory_wagon TABLE(
		[num] [int] NOT NULL,
		[id_countrys] [int] NOT NULL,
		[code_sng] [int] NULL,
		[countrys_name_ru] [nvarchar](100) NULL,
		[countrys_name_en] [nvarchar](100) NULL,
		[country_abbr_ru] [nvarchar](10) NULL,
		[country_abbr_en] [nvarchar](10) NULL,
		[id_genus] [int] NOT NULL,
		[rod_uz] [int] NULL,
		[genus_ru] [nvarchar](50) NULL,
		[genus_en] [nvarchar](50) NULL,
		[genus_abbr_ru] [nvarchar](5) NULL,
		[genus_abbr_en] [nvarchar](5) NULL,
		[id_owner] [int] NOT NULL,
		[owner_ru] [nvarchar](100) NULL,
		[owner_en] [nvarchar](100) NULL,
		[owner_abbr_ru] [nvarchar](20) NULL,
		[owner_abbr_en] [nvarchar](20) NULL,
		[id_operator_uz] [int] NULL,
		[operators_uz_ru] [nvarchar](100) NULL,
		[operators_uz_en] [nvarchar](100) NULL,
		[operators_uz_abbr_ru] [nvarchar](20) NULL,
		[operators_uz_abbr_en] [nvarchar](20) NULL,
		[change_operator_uz] [datetime] NULL,
		[gruzp] [float] NOT NULL,
		[tara] [float] NULL,
		[kol_os] [int] NOT NULL,
		[usl_tip] [nvarchar](10) NULL,
		[date_rem_uz] [datetime] NULL,
		[date_rem_vag] [datetime] NULL,
		[id_type_ownership] [int] NULL,
		[type_ownership_ru] [nvarchar](50) NULL,
		[type_ownership_en] [nvarchar](50) NULL,
		[sign] [int] NULL,
		[factory_number] [nvarchar](10) NULL,
		[inventory_number] [nvarchar](10) NULL,
		[year_built] [int] NULL,
		[exit_ban] [bit] NULL,
		[note] [nvarchar](1000) NOT NULL,
		[sobstv_kis] [int] NULL,
		[bit_warning] [bit] NULL,
		[create_wagons] [datetime] NOT NULL,
		[create_user_wagons] [nvarchar](50) NOT NULL,
		[change_wagons] [datetime] NULL,
		[change_user_wagons] [nvarchar](50) NULL,
		[id_wagons_rent] [int] NULL,
		[id_operator_amkr] [int] NULL,
		[operators_amkr_ru] [nvarchar](100) NULL,
		[operators_amkr_en] [nvarchar](100) NULL,
		[operators_uz_amkr_ru] [nvarchar](20) NULL,
		[operators_uz_amkr_en] [nvarchar](20) NULL,
		[rent_start] [datetime] NULL,
		[rent_end] [datetime] NULL,
		[id_limiting] [int] NULL,
		[limiting_name_ru] [nvarchar](100) NULL,
		[limiting_name_en] [nvarchar](100) NULL,
		[limiting_abbr_ru] [nvarchar](30) NULL,
		[limiting_abbr_en] [nvarchar](30) NULL,
		[create_wagons_rent] [datetime] NULL,
		[create_user_wagons_rent] [nvarchar](50) NULL,
		[change_wagons_rent] [datetime] NULL,
		[change_user_wagons_rent] [nvarchar](50) NULL,
		[parent_id_wagons_rent] [int] NULL
		)
	AS
	BEGIN
	insert @view_directory_wagon
	SELECT w.[num]
      ,w.[id_countrys]
	  ,dir_countrys.[code_sng]
	  ,dir_countrys.[countrys_name_ru]
      ,dir_countrys.[countrys_name_en]
      ,dir_countrys.[country_abbr_ru]
      ,dir_countrys.[country_abbr_en]
      ,w.[id_genus]
      ,dir_rod.[rod_uz]
      ,dir_rod.[genus_ru]
      ,dir_rod.[genus_en]
	  ,dir_rod.[abbr_ru] as genus_abbr_ru
      ,dir_rod.[abbr_en] as genus_abbr_en
      ,w.[id_owner]
      ,dir_owner.[owner_ru]
      ,dir_owner.[owner_en]
	  ,dir_owner.[abbr_ru] as owner_abbr_ru
      ,dir_owner.[abbr_en] as owner_abbr_en
      ,w.[id_operator] as id_operator_uz
      ,dir_oper_uz.[operators_ru] as operators_uz_ru
      ,dir_oper_uz.[operators_en] as operators_uz_en
	  ,dir_oper_uz.[abbr_ru] as operators_uz_abbr_ru
      ,dir_oper_uz.[abbr_en] as operators_uz_abbr_en
      ,w.[change_operator] as change_operator_uz
      ,w.[gruzp]
      ,w.[tara]
      ,w.[kol_os]
      ,w.[usl_tip]
      ,w.[date_rem_uz]
      ,w.[date_rem_vag]
      ,w.[id_type_ownership]
	  ,dir_tos.[type_ownership_ru]
      ,dir_tos.[type_ownership_en]
      ,w.[sign]
      ,w.[factory_number]
      ,w.[inventory_number]
      ,w.[year_built]
      ,w.[exit_ban]
      ,w.[note]
      ,w.[sobstv_kis]
      ,w.[bit_warning]
      ,w.[create] as create_wagons
      ,w.[create_user] as create_user_wagons
      ,w.[change] as change_wagons
      ,w.[change_user] as change_user_wagons
	  ,wr.[id] as id_wagons_rent
	  ,wr.[id_operator] as id_operator_amkr
      ,dir_oper_amkr.[operators_ru] as operators_amkr_ru
      ,dir_oper_amkr.[operators_en] as operators_amkr_en
	  ,dir_oper_amkr.[abbr_ru] as operators_uz_amkr_ru
      ,dir_oper_amkr.[abbr_en] as operators_uz_amkr_en
      ,wr.[rent_start]
      ,wr.[rent_end]
      ,wr.[id_limiting]
	  ,dir_limit.[limiting_name_ru]
      ,dir_limit.[limiting_name_en]
      ,dir_limit.[limiting_abbr_ru]
      ,dir_limit.[limiting_abbr_en]
      ,wr.[create] as create_wagons_rent
      ,wr.[create_user] as create_user_wagons_rent
      ,wr.[change] as change_wagons_rent
      ,wr.[change_user] as change_user_wagons_rent
      ,wr.[parent_id] as  parent_id_wagons_rent
  FROM .[IDS].[Directory_Wagons] as w Left JOIN
	IDS.[Directory_WagonsRent] as wr ON wr.id = (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent] where [num]= w.num and rent_end is null order by id desc)  Left JOIN
	IDS.[Directory_Countrys] as dir_countrys ON dir_countrys.id = w.[id_countrys] Left JOIN								--> Страна вагона
	IDS.[Directory_GenusWagons] as dir_rod ON dir_rod.id = w.id_genus Left JOIN			
	IDS.[Directory_OwnersWagons] as dir_owner ON dir_owner.id = w.id_owner Left JOIN		
	IDS.[Directory_OperatorsWagons] as dir_oper_uz ON dir_oper_uz.id = w.id_operator Left JOIN
	IDS.[Directory_TypeOwnerShip] as dir_tos ON dir_tos.id = w.id_type_ownership Left JOIN
	IDS.[Directory_OperatorsWagons] as dir_oper_amkr ON dir_oper_amkr.id = wr.id_operator Left JOIN
	IDS.[Directory_LimitingLoading] as dir_limit ON dir_limit.id = wr.id_limiting
  RETURN
 END
 


GO


