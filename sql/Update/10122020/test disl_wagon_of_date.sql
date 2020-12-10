USE [KRR-PA-CNT-Railway]
declare @date datetime = convert(datetime, '2020-12-03 14:52:00.000',120)

select * from [IDS].[get_dislocation_wagon_of_date](@date);

select * from [IDS].[get_dislocation_wagon_of_date](Convert(datetime,'2020-12-03',120))