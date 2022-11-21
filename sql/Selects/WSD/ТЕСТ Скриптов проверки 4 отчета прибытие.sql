USE [KRR-PA-CNT-Railway]

declare @num int = 63530935

select * from [IDS].[get_view_wagons_rent_of_num](@num)
select * from [IDS].[get_current_operation_wagon_of_num](@num)