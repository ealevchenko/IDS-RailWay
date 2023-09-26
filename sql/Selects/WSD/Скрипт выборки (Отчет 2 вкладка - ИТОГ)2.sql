use [KRR-PA-CNT-Railway]
declare @start datetime = convert(datetime,'2023-09-01 20:00:00',120)
declare @stop datetime = convert(datetime,'2023-09-30 20:00:00',120)
declare @date datetime = convert(datetime,'2023-07-28 20:00:00',120)

--select * from [IDS].[get_view_operator_ob_of_period](@start, @stop)

--select * from [IDS].[get_view_cur_ob_of_date](@date)


	select 
	[total]=(select Count(num) from [IDS].[get_view_cur_ob_of_date](@date))
	,[external] = (select Count(num) from [IDS].[get_view_cur_ob_of_date](@date) where [current_wagons_rent_operator_paid] = 1 OR ([group] is null and [current_wagons_rent_operator_paid] = 0))
	,[paid] = (select Count(num) from [IDS].[get_view_cur_ob_of_date](@date)e where [current_wagons_rent_operator_paid] = 1)
	,[accounting] = (select Count(num) from [IDS].[get_view_cur_ob_of_date](@date) where [group] is null and [current_wagons_rent_operator_paid] = 0)
	,[amkr] = (select Count(num) from [IDS].[get_view_cur_ob_of_date](@date) where [group] IN (N'amkr', N'cisterns'))
