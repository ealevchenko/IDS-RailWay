USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_usage_fee_period_of_period]    Script Date: 10.06.2024 16:06:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






CREATE FUNCTION [IDS].[get_view_usage_fee_period_detali_of_id_period]
 (
	@id_usage_fee_period int
 )
	RETURNS 
	@view_ufpd TABLE  (
	[id] [int] NOT NULL,
	[id_usage_fee_period] [int] NULL,
	[code_stn_from] [int] NULL,
	[from_station_name_ru] [nvarchar](50) NULL,
	[from_station_name_en] [nvarchar](50) NULL,
	[id_cargo_arrival] [int] NULL,
	[arrival_cargo_name_ru] [nvarchar](50) NULL,
	[arrival_cargo_name_en] [nvarchar](50) NULL,
	[code_stn_to] [int] NULL,
	[to_station_name_ru] [nvarchar](50) NULL,
	[to_station_name_en] [nvarchar](50) NULL,
	[id_cargo_outgoing] [int] NULL,
	[outgoing_cargo_name_ru] [nvarchar](50) NULL,
	[outgoing_cargo_name_en] [nvarchar](50) NULL,
	[grace_time] [int] NULL
	)
	AS
	BEGIN

	insert @view_ufpd
	SELECT ufpd.[id]
		,ufpd.[id_usage_fee_period]
		,ufpd.[code_stn_from]
		,dir_stn_from.[station_name_ru] as from_station_name_ru
		,dir_stn_from.[station_name_en] as from_station_name_en
		,ufpd.[id_cargo_arrival]
		,dir_cargo_arrival.[cargo_name_ru] as arrival_cargo_name_ru
		,dir_cargo_arrival.[cargo_name_en] as arrival_cargo_name_en
		,ufpd.[code_stn_to]
		,dir_stn_to.[station_name_ru] as to_station_name_ru
		,dir_stn_to.[station_name_en] as to_station_name_en
		,ufpd.[id_cargo_outgoing]
		,dir_cargo_outgoing.[cargo_name_ru] as outgoing_cargo_name_ru
		,dir_cargo_outgoing.[cargo_name_en] as outgoing_cargo_name_en
		,ufpd.[grace_time]
		--into ufpds
	FROM [IDS].[Usage_Fee_Period_Detali] as ufpd
		--> Справочник станция отправки
		Left JOIN [IDS].[Directory_ExternalStation] as dir_stn_from ON ufpd.[code_stn_from] = dir_stn_from.code
		--> Справочник груз прибытия
		Left JOIN [IDS].[Directory_Cargo] as dir_cargo_arrival ON ufpd.[id_cargo_arrival] = dir_cargo_arrival.id
		--> Справочник станция прибытия
		Left JOIN [IDS].[Directory_ExternalStation] as dir_stn_to ON ufpd.[code_stn_to] = dir_stn_to.code
		--> Справочник груз отправки
		Left JOIN [IDS].[Directory_Cargo] as dir_cargo_outgoing ON ufpd.[id_cargo_outgoing] = dir_cargo_outgoing.id
	where [id_usage_fee_period] = @id_usage_fee_period
	RETURN
 END

GO


