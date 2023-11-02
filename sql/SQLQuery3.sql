use [KRR-PA-CNT-Railway]
	SELECT
      rent.[id_operator]
	  ,dir_oper.[parent_id]
	  ,dir_wag.[id_genus]
      ,dir_oper.[operators_ru]
      ,dir_oper.[operators_en]
	  ,dir_oper.[abbr_ru] as operators_abbr_ru
      ,dir_oper.[abbr_en] as operators_abbr_en
      ,dir_genus.[rod_uz]
      ,dir_genus.[genus_ru]
      ,dir_genus.[genus_en]
	  ,dir_genus.[abbr_ru] as genus_abbr_ru
      ,dir_genus.[abbr_en] as genus_abbr_en
  FROM  [IDS].[Directory_WagonsRent] as rent
  	--> �������� �������
	Left JOIN [IDS].[Directory_Wagons] as dir_wag ON dir_wag.num = rent.num
	Left JOIN [IDS].[Directory_OperatorsWagons] as dir_oper ON dir_oper.id = rent.[id_operator]
	Left JOIN [IDS].[Directory_GenusWagons] as dir_genus ON dir_genus.id = dir_wag.[id_genus]
  where rent.[rent_end] is null and rent.[id_operator] is not null
  group by 
   dir_wag.[id_genus]
   	  ,dir_genus.[abbr_ru]
      ,dir_genus.[genus_ru]
      ,dir_genus.[abbr_en]
      ,dir_genus.[genus_en]
      ,dir_genus.[rod_uz]
      , rent.[id_operator]
	  ,dir_oper.[parent_id]
  	  ,dir_oper.[abbr_ru]
      ,dir_oper.[operators_ru]
      ,dir_oper.[abbr_en]
      ,dir_oper.[operators_en]
  order by 
  dir_oper.[abbr_ru], 
  rent.[id_operator],
  dir_wag.[id_genus]