declare @id_station int = 6 
declare @id_park int=71 
declare @id_way int= 109 


SELECT 
w.[id],
w.[id_station],
w.[id_park],
w.[position_park],
w.[position_way],
w.[way_num_ru],
w.[way_num_en],
w.[way_name_ru],
w.[way_name_en],
w.[way_abbr_ru],
w.[way_abbr_en],
w.[capacity],
count_wagon = (SELECT count([id]) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_way] =w.[id] and [id_outer_way] is null and [way_end] is null),
w.[deadlock],
w.[crossing_uz],
w.[crossing_amkr],
w.[id_devision], 
w.[dissolution], 
w.[output_dissolution], 
w.[note],
w.[create],
w.[create_user],
w.[change],
w.[change_user] 
--into view_ways_status
FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] as w 
--where [id_station]=@id_station AND [id_park]=@id_park 
--ORDER BY [position_way]
where [id] = @id_way
