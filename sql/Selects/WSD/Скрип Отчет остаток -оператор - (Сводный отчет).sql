USE [KRR-PA-CNT-Railway]

declare @start datetime = convert(datetime,'2023-08-26 20:01:00',120)
declare @stop datetime = convert(datetime,'2023-08-27 20:00:00',120)

--SELECT 'start' as type, * FROM [IDS].[get_view_cur_ob_of_date](@start)
--UNION
--SELECT 'arrival' as type, * FROM [IDS].[get_view_arr_ob_of_period](@start, @stop)
--UNION
--SELECT 'outgoing' as type, * FROM [IDS].[get_view_out_ob_of_period](@start, @stop)
--UNION
--SELECT 'stop' as type, * FROM [IDS].[get_view_cur_ob_of_date](@stop)

select * from [IDS].get_view_operator_ob_of_period(@start, @stop)
