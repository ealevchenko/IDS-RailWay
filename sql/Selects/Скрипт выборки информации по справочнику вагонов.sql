use [KRR-PA-CNT-Railway]

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

	where w.[bit_warning] = 1