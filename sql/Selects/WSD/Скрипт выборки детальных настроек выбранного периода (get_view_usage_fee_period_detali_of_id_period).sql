use [KRR-PA-CNT-Railway] 

declare @id_usage_fee_period int = 2350

select * from [IDS].[get_view_usage_fee_period_detali_of_id_period](@id_usage_fee_period)

--SELECT ufpd.[id]
--		,ufpd.[id_usage_fee_period]
--		,ufpd.[code_stn_from]
--		,dir_stn_from.[station_name_ru] as from_station_name_ru
--		,dir_stn_from.[station_name_en] as from_station_name_en
--		,ufpd.[id_cargo_arrival]
--		,dir_cargo_arrival.[cargo_name_ru] as arrival_cargo_name_ru
--		,dir_cargo_arrival.[cargo_name_en] as arrival_cargo_name_en
--		,ufpd.[code_stn_to]
--		,dir_stn_to.[station_name_ru] as to_station_name_ru
--		,dir_stn_to.[station_name_en] as to_station_name_en
--		,ufpd.[id_cargo_outgoing]
--		,dir_cargo_outgoing.[cargo_name_ru] as outgoing_cargo_name_ru
--		,dir_cargo_outgoing.[cargo_name_en] as outgoing_cargo_name_en
--		,ufpd.[grace_time]
--		--into ufpds
--  FROM [IDS].[Usage_Fee_Period_Detali] as ufpd
--	--> Справочник станция отправки
--	Left JOIN [IDS].[Directory_ExternalStation] as dir_stn_from ON ufpd.[code_stn_from] = dir_stn_from.code
--	--> Справочник груз прибытия
--	Left JOIN [IDS].[Directory_Cargo] as dir_cargo_arrival ON ufpd.[id_cargo_arrival] = dir_cargo_arrival.id
--	--> Справочник станция прибытия
--	Left JOIN [IDS].[Directory_ExternalStation] as dir_stn_to ON ufpd.[code_stn_to] = dir_stn_to.code
--	--> Справочник груз отправки
--	Left JOIN [IDS].[Directory_Cargo] as dir_cargo_outgoing ON ufpd.[id_cargo_outgoing] = dir_cargo_outgoing.id
--  where [id_usage_fee_period] = @id_usage_fee_period
