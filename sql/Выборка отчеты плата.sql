use [KRR-PA-CNT-Railway]
--select * from [IDS].[get_view_outgoing_cars_of_period]('2025-10-15 20:01:00', '2025-10-16 20:00:00', 0) order by outgoing_sostav_date_outgoing
select * from [IDS].[get_view_remainder_wagons_of_date]('2025-10-17 00:00:00')
select * from [IDS].[get_view_remainder_wagons]()