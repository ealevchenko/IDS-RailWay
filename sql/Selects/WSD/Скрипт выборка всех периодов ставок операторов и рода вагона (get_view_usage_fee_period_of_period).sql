use [KRR-PA-CNT-Railway]

declare @start datetime = convert(datetime, '2023-04-01 00:00:00');
declare @stop datetime = convert(datetime, '2023-04-29 23:59:59');


SELECT	ufp.[id] as id_usage_fee_period
		,ufp.[id_operator] as usage_fee_period_id_operator
		,dir_oper.[abbr_ru] as usage_fee_period_operator_abbr_ru
		,dir_oper.[operators_ru] as usage_fee_period_operator_ru
		,dir_oper.[abbr_en] as usage_fee_period_operator_abbr_en
		,dir_oper.[operators_en] as usage_fee_period_operator_en
		,dir_oper.[paid] as usage_fee_period_operators_paid
		,dir_oper.[rop] as usage_fee_period_operators_rop
		,dir_oper.[local_use] as usage_fee_period_operators_local_use
		,dir_oper.[color] as usage_fee_period_operators_color
		,ufp.[id_genus] as usage_fee_period_id_genus
		,dir_rod.[genus_ru] as usage_fee_period_genus_ru
		,dir_rod.[genus_en] as usage_fee_period_genus_en
		,dir_rod.[abbr_ru] as usage_fee_period_genus_abbr_ru
		,dir_rod.[abbr_en] as usage_fee_period_genus_abbr_en
		,dir_rod.[rod_uz] as usage_fee_period_rod_uz
		,ufp.[start] as usage_fee_period_start
		,ufp.[stop] as usage_fee_period_stop
		,ufp.[id_currency] as usage_fee_period_id_currency
		,dir_cur.[currency_ru] as usage_fee_period_currency_ru
		,dir_cur.[currency_en] as usage_fee_period_currency_en
		,dir_cur.[code] as usage_fee_period_code
		,dir_cur.[code_cc] as usage_fee_period_code_cc
		,ufp.[rate] as usage_fee_period_rate
		,ufp.[id_currency_derailment] as usage_fee_period_id_currency_derailment
		,dir_cur_derailment.[currency_ru] as usage_fee_period_derailment_currency_ru
		,dir_cur_derailment.[currency_en] as usage_fee_period_derailment_currency_en
		,dir_cur_derailment.[code] as usage_fee_period_derailment_code
		,dir_cur_derailment.[code_cc] as usage_fee_period_derailment_code_cc
		,ufp.[rate_derailment] as usage_fee_period_rate_derailment
		,ufp.[coefficient_route] as usage_fee_period_coefficient_route
		,ufp.[coefficient_not_route] as usage_fee_period_coefficient_not_route
		,ufp.[grace_time_1] as usage_fee_period_grace_time_1
		,ufp.[grace_time_2] as usage_fee_period_grace_time_2
		,ufp.[note] as usage_fee_period_note
		,ufp.[create] as usage_fee_period_create
		,ufp.[create_user] as usage_fee_period_create_user
		,ufp.[change] as usage_fee_period_change
		,ufp.[change_user] as usage_fee_period_change_user
		,ufp.[close] as usage_fee_period_close
		,ufp.[close_user] as usage_fee_period_close_user
		,ufp.[parent_id] as usage_fee_period_parent_id
		,ufp.[hour_after_30] as usage_fee_period_hour_after_30
		--into ufp
  FROM	[IDS].[Usage_Fee_Period] as ufp
	--> Справочник Операторов
	Left JOIN [IDS].[Directory_OperatorsWagons] as dir_oper ON ufp.[id_operator] = dir_oper.id
	--> Справочник Род вагона
	Left JOIN IDS.Directory_GenusWagons as dir_rod ON ufp.[id_genus] = dir_rod.id
	--> Справочник валют
	Left JOIN [IDS].[Directory_Currency] as dir_cur ON ufp.[id_currency] = dir_cur.id
	--> Справочник валют
	Left JOIN [IDS].[Directory_Currency] as dir_cur_derailment ON ufp.[id_currency] = dir_cur_derailment.id

  where ufp.[start] <= @start and ufp.[stop] >= @stop


