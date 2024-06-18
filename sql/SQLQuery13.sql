use [KRR-PA-CNT-Railway]
declare @start datetime = '2024-05-14 20:01:00'
declare @stop datetime = '2024-05-15 20:00:00'
declare @date datetime = '2024-05-15'

declare @id_wir int = 857323

select * from [IDS].[get_view_incoming_cars_of_id_sostav](315400)
select * from [IDS].[get_view_outgoing_cars_of_id_car]((select [id_outgoing_car] from [IDS].[WagonInternalRoutes] where [id]= (select [parent_id] FROM [IDS].[WagonInternalRoutes] where [id]= @id_wir) and num = 68070408))


--select * from [IDS].[get_view_adoption_sostav_of_period](@start,@stop)
--select * from [IDS].[get_view_outgoing_sostav_of_period](@start,@stop)
--select current_wagons_rent_operator_abbr_ru, * from [IDS].[get_view_operating_balance_of_date](@date)
--select * from [IDS].[get_view_operator_ob_of_period](@start, @stop)

--SELECT 'start' as type, * FROM [IDS].[get_view_cur_ob_of_date](@start) where current_wagons_rent_operator_abbr_ru Like(N'%оп%')
--SELECT 'outgoing' as type, * FROM [IDS].[get_view_out_ob_of_period](@start, @stop) where current_wagons_rent_operator_abbr_ru Like(N'%оп%')
--SELECT 'stop' as type, * FROM [IDS].[get_view_cur_ob_of_date](@stop) where current_wagons_rent_operator_abbr_ru Like(N'%оп%')

