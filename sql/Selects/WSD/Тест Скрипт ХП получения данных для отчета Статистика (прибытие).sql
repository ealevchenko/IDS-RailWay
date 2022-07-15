use [KRR-PA-CNT-Railway]
declare @start datetime = Convert(datetime, '2022-05-01 00:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-07-11 23:59:59', 120)

select * from [IDS].[get_view_adoption_sostav_of_period](@start, @stop)