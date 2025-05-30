use [KRR-PA-CNT-Railway]

declare @date datetime ='2025-05-01'
--select * from [IDS].[get_view_operating_balance_of_date](@date)

select * from [IDS].get_view_remainder_wagons_of_date(@date)