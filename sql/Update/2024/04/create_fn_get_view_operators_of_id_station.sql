USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_operators_of_id_station]    Script Date: 18.04.2024 11:17:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_view_operators_of_id_station]
 (
   @id_station int
 )
	RETURNS 
	@operators_of_station TABLE(
	[id_way] [int] NULL,
	[current_way_amkr_num_ru] [nvarchar](20) NULL,
	[current_way_amkr_num_en] [nvarchar](20) NULL,
	[current_way_amkr_abbr_ru] [nvarchar](50) NULL,
	[current_way_amkr_abbr_en] [nvarchar](50) NULL,
	[id_operator] [int] NULL,
	[operator_abbr_ru] [nvarchar](20) NULL,
	[operator_abbr_en] [nvarchar](20) NULL,
	[operator_color] [nvarchar](10) NULL,
	[count_operators] [int] NULL
	)
	AS
	BEGIN
	insert into @operators_of_station
	SELECT 
		cur_dir_ways.id as id_way
		,cur_dir_ways.way_num_ru as current_way_amkr_num_ru
		,cur_dir_ways.way_num_en as current_way_amkr_num_en
		,cur_dir_ways.way_abbr_ru as current_way_amkr_abbr_ru
		,cur_dir_ways.way_abbr_en as current_way_amkr_abbr_en
		,dir_operator.[id] as id_operator 
		,dir_operator.[abbr_ru] as operator_abbr_ru
		,dir_operator.[abbr_en] as operator_abbr_en
		,dir_operator.color as operator_color
		,Count (wim.id) as count_operators
	FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim
  		--> Текущее внетренее перемещение
		 INNER JOIN IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id
		 --> Справочник аренд
		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
		--> Справочник группы Операторов вагона
		Left JOIN IDS.Directory_OperatorsWagonsGroup as dir_operator_group ON dir_rent.id_operator =  dir_operator_group.id_operator
		--> Справочник Оператор вагона
		Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_rent.id_operator =  dir_operator.id
		--> Справочник Оператор вагона
		Left JOIN IDS.Directory_Ways as cur_dir_ways ON wim.id_way =  cur_dir_ways.id
	WHERE wim.id_station = @id_station and wim.[way_start] is not null and wim.[way_end] is null
	group by 
		cur_dir_ways.id, 
		cur_dir_ways.way_num_ru,
		cur_dir_ways.way_num_en,
		cur_dir_ways.way_abbr_ru,
		cur_dir_ways.way_abbr_en,
		dir_operator.[id], 
		dir_operator.[abbr_ru], 
		dir_operator.[abbr_en],
		dir_operator.color
	order by cur_dir_ways.id, dir_operator.[id]
	RETURN
 END

GO


