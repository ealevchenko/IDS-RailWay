USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_adoption_sostav_of_period]    Script Date: 29.07.2022 10:16:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [IDS].[get_view_adoption_wagon_not_operation_of_period]
 (
   @start datetime, 
   @stop datetime
 )
	RETURNS 
	@wagons TABLE(
		[id_sostav] [bigint] NOT NULL,
		[sostav_date_adoption] [datetime] NULL,
		[sostav_num_doc] [int] NULL,
		[id_car] [bigint] NULL,
		[num] [int] NULL,
		[id_cargo] [int] NULL,
		[cargo_name_ru] [nvarchar](50) NULL,
		[cargo_name_en] [nvarchar](50) NULL,
		[nom_doc] [int] NULL,
		[nom_main_doc] [int] NULL,
		[code_stn_from] [int] NULL,
		[station_from_name_ru] [nvarchar](50) NULL,
		[station_from_name_en] [nvarchar](50) NULL,
		[id_division_on_amkr] [int] NULL,
		[division_code] [nvarchar](5) NULL,
		[name_division_ru] [nvarchar](250) NULL,
		[name_division_en] [nvarchar](250) NULL,
		[division_abbr_ru] [nvarchar](50) NULL,
		[division_abbr_en] [nvarchar](50) NULL
	)
	AS
	BEGIN
	insert @wagons
  SELECT 
		arr_sost.[id] as id_sostav
		,arr_sost.[date_adoption] as sostav_date_adoption
		,arr_sost.[num_doc] as sostav_num_doc
		,arr_car.[id] as id_car
		,arr_car.[num] as num
		,uz_doc_vag.[id_cargo] as id_cargo
		,arr_dir_cargo.cargo_name_ru as cargo_name_ru
		,arr_dir_cargo.cargo_name_en as cargo_name_en
		,uz_doc.[nom_doc]  as nom_doc
		,uz_doc.[nom_main_doc]  as nom_main_doc
		,uz_doc.[code_stn_from]  as code_stn_from
		,arr_ext_station_from.[station_name_ru] as station_from_name_ru
		,arr_ext_station_from.[station_name_en] as station_from_name_en
		,uz_doc_vag.[id_division_on_amkr] as id_division_on_amkr
		,arr_dir_divis_amkr.[code] as division_code								-- Код подразделения [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_ru] as name_division_ru				-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[name_division_en] as name_division_en				-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_ru] as division_abbr_ru				-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
		,arr_dir_divis_amkr.[division_abbr_en] as division_abbr_en				-- Подразделение [IDS].[Directory_Divisions] по отправке [IDS].[Outgoing_UZ_Vagon]
  FROM  [IDS].[ArrivalSostav] as arr_sost
	Left JOIN IDS.[ArrivalCars] as arr_car ON arr_sost.id = arr_car.id_arrival
	Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = arr_car.num and rent_end is null order by [id] desc)
	Left JOIN [IDS].[Arrival_UZ_Vagon] as uz_doc_vag ON arr_car.id_arrival_uz_vagon = uz_doc_vag.id
	Left JOIN [IDS].[Arrival_UZ_Document] as uz_doc ON uz_doc_vag.id_document = uz_doc.id
  	--> Справочник Грузов по прибытию
	Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON uz_doc_vag.id_cargo =  arr_dir_cargo.id
  	--> Справочник Внешних станций (по прибытию from)
	Left JOIN [IDS].[Directory_ExternalStation] as arr_ext_station_from ON uz_doc.[code_stn_from] = arr_ext_station_from.code
	--> Справочник Подразделений АМКР (по отправке)
	Left JOIN [IDS].[Directory_Divisions] as arr_dir_divis_amkr ON uz_doc_vag.[id_division_on_amkr] = arr_dir_divis_amkr.id
  where arr_car.arrival is not null and arr_sost.[date_adoption]>= @start and arr_sost.[date_adoption]<=@stop and (dir_rent.id_operator is null OR dir_rent.id_operator =0)
  RETURN
 END
 




GO


