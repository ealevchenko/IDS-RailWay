USE [KRR-PA-CNT-Railway]
GO
/****** Object:  UserDefinedFunction [IDS].[get_view_operator_ob_of_period]    Script Date: 26.09.2023 13:59:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER FUNCTION [IDS].[get_view_operator_ob_of_period]
 (
   @start datetime, 
   @stop datetime
 )
	RETURNS 
	@operating_balance TABLE(
	[type] [varchar](8) NOT NULL,
	[num] [int] NULL,
	[group] [nvarchar](20) NULL,
	[id_operator] [int] NULL,
	[current_wagons_rent_operators_ru] [nvarchar](100) NULL,
	[current_wagons_rent_operators_en] [nvarchar](100) NULL,
	[current_wagons_rent_operator_abbr_ru] [nvarchar](20) NULL,
	[current_wagons_rent_operator_abbr_en] [nvarchar](20) NULL,
	[current_wagons_rent_operator_paid] [bit] NULL
	)
	AS
	BEGIN
	insert @operating_balance
	SELECT 'start' as type, * FROM [IDS].[get_view_cur_ob_of_date](@start)
	UNION
	SELECT 'arrival' as type, * FROM [IDS].[get_view_arr_ob_of_period](@start, @stop)
	UNION
	SELECT 'outgoing' as type, * FROM [IDS].[get_view_out_ob_of_period](@start, @stop)
	UNION
	SELECT 'stop' as type, * FROM [IDS].[get_view_cur_ob_of_date](@stop)
		RETURN
 END

