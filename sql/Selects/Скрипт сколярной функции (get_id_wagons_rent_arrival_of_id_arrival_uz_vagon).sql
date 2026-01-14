/****** get_id_wagons_rent_arrival_of_id_arrival_uz_vagon  ******/
SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
  where id = 814202

declare @num int = (SELECT [num] FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon] where id = 814202)

declare @date_arrival datetime = (SELECT [date_arrival] FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav] where [id] = (select [id_arrival] FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon] where id = 814202))

declare @date_adoption datetime = (SELECT [date_adoption] FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav] where [id] = (select [id_arrival] FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon] where id = 814202))

select @num,@date_arrival,@date_adoption


SELECT top(1) id FROM [IDS].[Directory_WagonsRent] where [num] = @num 
and (
(@date_adoption is null and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@date_arrival) 
OR 
(@date_adoption is not null and convert(datetime, convert(varchar(15), [rent_start], 102)) <=@date_adoption)
) order by [id] desc


select [IDS].get_id_wagons_rent_arrival_of_id_arrival_uz_vagon(814202)