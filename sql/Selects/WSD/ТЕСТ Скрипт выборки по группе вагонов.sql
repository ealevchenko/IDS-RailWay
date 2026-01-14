use [KRR-PA-CNT-Railway]

--DECLARE @nums nchar(1000) = '61236972;63679914;62853650;64053002;64175037;4772;4838;56968837;62976337;58583949;68026632'; -- список вагонов
DECLARE @nums nchar(1000) = '61236972'; -- список вагонов

select * from [IDS].[get_view_wagons_of_list_nums](@nums)