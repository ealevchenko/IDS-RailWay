USE [KRR-PA-CNT-Railway]
GO

--select * from [IDS].[get_view_park_state_of_station](6)
--select * from [IDS].[get_view_status_ways_park_state_of_station](12)
--select * from [IDS].[get_view_wagon_park_state_of_way](12)
select * from [IDS].[get_dislocation_wagon_of_date]('2020-12-18 07:00:00')
select * from [IDS].[get_dislocation_wagon_of_num](56163447)
