USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_wagons_of_outer_way]    Script Date: 12.11.2020 9:44:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO








--use [ASU_AZSoperations]

CREATE FUNCTION [IDS].[get_view_wagons_of_outer_way]
 (
	@id_outer_way int
 )
		RETURNS 
		@view_wagons TABLE  (
	[wir_id] [bigint] NOT NULL,
	[wim_id] [bigint] NOT NULL,
	[wio_id] [bigint] NULL,
	[position] [int] NOT NULL,
	[num] [int] NOT NULL,
	[wagon_adm] [int] NULL,
	[wagon_adm_name_ru] [nvarchar](100) NULL,
	[wagon_adm_name_en] [nvarchar](100) NULL,
	[wagon_adm_abbr_ru] [nvarchar](10) NULL,
	[wagon_adm_abbr_en] [nvarchar](10) NULL,
	[wagon_rod] [int] NULL,
	[wagon_rod_name_ru] [nvarchar](50) NOT NULL,
	[wagon_rod_name_en] [nvarchar](50) NOT NULL,
	[wagon_rod_abbr_ru] [nvarchar](5) NOT NULL,
	[wagon_rod_abbr_en] [nvarchar](5) NOT NULL,
	[wagon_type_ru] [nvarchar](50) NULL,
	[wagon_type_en] [nvarchar](50) NULL,
	[wagon_operators_name_ru] [nvarchar](100) NULL,
	[wagon_operators_name_en] [nvarchar](100) NULL,
	[wagon_operators_abbr_ru] [nvarchar](20) NULL,
	[wagon_operators_abbr_en] [nvarchar](20) NULL,
	[wagon_operators_paid] [bit] NULL,
	[wagon_operators_color] [nvarchar](10) NULL,
	[wagon_operators_rent_start] [datetime] NULL,
	[wagon_limiting_name_ru] [nvarchar](100) NULL,
	[wagon_limiting_name_en] [nvarchar](100) NULL,
	[wagon_limiting_abbr_ru] [nvarchar](30) NULL,
	[wagon_limiting_abbr_en] [nvarchar](30) NULL,
	[wagon_gruzp_doc] [float] NULL,
	[wagon_gruzp_uz] [float] NOT NULL,
	[wagon_tara_doc] [int] NULL,
	[wagon_tara_arc_doc] [int] NULL,
	[wagon_tara_uz] [float] NULL,
	[wagon_date_rem_uz] [datetime] NULL,
	[arrival_datetime] [datetime] NOT NULL,
	[arrival_duration] [int] NULL,
	[arrival_condition_name_ru] [nvarchar](100) NOT NULL,
	[arrival_condition_name_en] [nvarchar](100) NOT NULL,
	[arrival_condition_abbr_ru] [nvarchar](20) NOT NULL,
	[arrival_condition_abbr_en] [nvarchar](20) NOT NULL,
	[arrival_condition_red] [bit] NULL,
	[arrival_cargo_group_name_ru] [nvarchar](50) NOT NULL,
	[arrival_cargo_group_name_en] [nvarchar](50) NOT NULL,
	[arrival_cargo_name_ru] [nvarchar](50) NOT NULL,
	[arrival_cargo_name_en] [nvarchar](50) NOT NULL,
	[arrival_certification_data_ru] [nvarchar](50) NULL,
	[arrival_certification_data_en] [nvarchar](50) NULL,
	[arrival_vesg_doc] [int] NULL,
	[arrival_vesg_reweighing] [float] NULL,
	[arrival_station_from_code] [int] NOT NULL,
	[arrival_station_from_name_ru] [nvarchar](50) NOT NULL,
	[arrival_station_from_name_en] [nvarchar](50) NOT NULL,
	[arrival_station_amkr_name_ru] [nvarchar](50) NULL,
	[arrival_station_amkr_name_en] [nvarchar](50) NULL,
	[arrival_station_amkr_abbr_ru] [nvarchar](50) NULL,
	[arrival_station_amkr_abbr_en] [nvarchar](50) NULL,
	[arrival_division_amkr_code] [nvarchar](5) NULL,
	[arrival_division_amkr_name_ru] [nvarchar](250) NULL,
	[arrival_division_amkr_name_en] [nvarchar](250) NULL,
	[arrival_division_amkr_abbr_ru] [nvarchar](50) NULL,
	[arrival_division_amkr_abbr_en] [nvarchar](50) NULL,
	[current_operation_wagon_name_ru] [nvarchar](20) NULL,
	[current_operation_wagon_name_en] [nvarchar](20) NULL,
	[current_operation_wagon_start] [datetime] NULL,
	[current_operation_wagon_end] [datetime] NULL,
	[current_operation_note] [nvarchar](250) NULL,
	[current_operation_wagon_busy] [bit] NULL,
	[current_operation_wagon_create] [datetime] NULL,
	[current_operation_wagon_create_user] [nvarchar](50) NULL,
	[current_operation_wagon_close] [datetime] NULL,
	[current_operation_wagon_close_user] [nvarchar](50) NULL,
	[current_loading_status_ru] [nvarchar](30) NULL,
	[current_loading_status_en] [nvarchar](30) NULL,
	[current_condition_name_ru] [nvarchar](100) NULL,
	[current_condition_name_en] [nvarchar](100) NULL,
	[current_condition_abbr_ru] [nvarchar](20) NULL,
	[current_condition_abbr_en] [nvarchar](20) NULL,
	[current_condition_red] [bit] NULL,
	[from_station_amkr_name_ru] [nvarchar](50) NULL,
	[from_station_amkr_name_en] [nvarchar](50) NULL,
	[from_station_amkr_abbr_ru] [nvarchar](50) NULL,
	[from_station_amkr_abbr_en] [nvarchar](50) NULL,
	[current_outer_way_name_ru] [nvarchar](150) NULL,
	[current_outer_way_name_en] [nvarchar](150) NULL,
	[current_outer_way_amkr_start] [datetime] NULL,
	[current_outer_way_note] [nvarchar](200) NULL,
	[current_outer_way_amkr_duration] [int] NULL,
	[on_station_amkr_name_ru] [nvarchar](50) NULL,
	[on_station_amkr_name_en] [nvarchar](50) NULL,
	[on_station_amkr_abbr_ru] [nvarchar](50) NULL,
	[on_station_amkr_abbr_en] [nvarchar](50) NULL,
	[current_wim_create] [datetime] NOT NULL,
	[current_wim_create_user] [nvarchar](50) NOT NULL,
	[usage_fee] [numeric](1, 1) NOT NULL,
	[instructional_letters_num] [nvarchar](20) NULL,
	[instructional_letters_datetime] [datetime] NULL,
	[instructional_letters_station] [int] NULL,
	[instructional_letters_station_name] [nvarchar](50) NULL,
	[sap_is_num] [nvarchar](10) NULL,
	[sap_is_create_date] [date] NULL,
	[sap_is_create_time] [time](7) NULL,
	[sap_os_doc_outgoing_car] [bit] NULL
		)
AS
BEGIN
	insert @view_wagons
	SELECT
-- id �������� ������
wir.id as wir_id,
wim.id as wim_id,
cur_wio.id as wio_id,
--���������� ������
wim.position,
wir.num,
--> �������� ���������� �� ������
-- ������
dir_countrys.code_sng as wagon_adm,
dir_countrys.countrys_name_ru as wagon_adm_name_ru,
dir_countrys.countrys_name_en as wagon_adm_name_en,
dir_countrys.country_abbr_ru as wagon_adm_abbr_ru,
dir_countrys.country_abbr_en as wagon_adm_abbr_en,
-- ��� ������
dir_rod.rod_uz as wagon_rod,
dir_rod.genus_ru as wagon_rod_name_ru,
dir_rod.genus_en as wagon_rod_name_en,
dir_rod.abbr_ru as wagon_rod_abbr_ru,
dir_rod.abbr_en as wagon_rod_abbr_en,
-- ��� ������
dir_type.type_ru as wagon_type_ru,
dir_type.type_en as wagon_type_en,
-- �������� ������
dir_operator.operators_ru as wagon_operators_name_ru,
dir_operator.operators_en as wagon_operators_name_en,
dir_operator.abbr_ru as wagon_operators_abbr_ru,
dir_operator.abbr_en as wagon_operators_abbr_en,
dir_operator.paid as wagon_operators_paid,
dir_operator.color as wagon_operators_color,
cur_dir_rent.rent_start as wagon_operators_rent_start,
-- ����������� �������� ������
dir_limload.limiting_name_ru as wagon_limiting_name_ru,
dir_limload.limiting_name_en as wagon_limiting_name_en,
dir_limload.limiting_abbr_ru as wagon_limiting_abbr_ru,
dir_limload.limiting_abbr_en as wagon_limiting_abbr_en,
-- ���������������� � ����
ar_doc_vag.gruzp as wagon_gruzp_doc,
dir_wagon.gruzp as wagon_gruzp_uz,
-- ����
ar_doc_vag.u_tara as wagon_tara_doc,
ar_doc_vag.ves_tary_arc as wagon_tara_arc_doc,
dir_wagon.tara as wagon_tara_uz,
-- ���� �������
dir_wagon.date_rem_uz as wagon_date_rem_uz,
--> �������� � �������
ar_sost.date_arrival as arrival_datetime,
[arrival_duration] = DATEDIFF (hour, ar_sost.date_arrival, getdate()),
-- �������� �� ��������
arr_dir_cond.condition_name_ru as arrival_condition_name_ru,
arr_dir_cond.condition_name_en as arrival_condition_name_en,
arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru,
arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en,
arr_dir_cond.red as arrival_condition_red,
-- ���� �� ��������
arr_dir_group_cargo.cargo_group_name_ru as arrival_cargo_group_name_ru,
arr_dir_group_cargo.cargo_group_name_en as arrival_cargo_group_name_en,
arr_dir_cargo.cargo_name_ru as arrival_cargo_name_ru,
arr_dir_cargo.cargo_name_en as arrival_cargo_name_en,
-- ���������� ������
arr_dir_certif.certification_data_ru as arrival_certification_data_ru,
arr_dir_certif.certification_data_en as arrival_certification_data_en,
-- ���
ar_doc_vag.vesg as arrival_vesg_doc,
ar_doc_vag.vesg_reweighing as arrival_vesg_reweighing,
-- ������� �����������
arr_dir_ext_station.code as arrival_station_from_code,
arr_dir_ext_station.station_name_ru as arrival_station_from_name_ru,
arr_dir_ext_station.station_name_en as arrival_station_from_name_en,
-- ������� ����������
arr_dir_station_amkr.station_name_ru as arrival_station_amkr_name_ru,
arr_dir_station_amkr.station_name_en as arrival_station_amkr_name_en,
arr_dir_station_amkr.station_abbr_ru as arrival_station_amkr_abbr_ru,
arr_dir_station_amkr.station_abbr_en as arrival_station_amkr_abbr_en,
-- ��� ����������
arr_dir_division_amkr.code as arrival_division_amkr_code,
arr_dir_division_amkr.name_division_ru as arrival_division_amkr_name_ru,
arr_dir_division_amkr.name_division_en as arrival_division_amkr_name_en,
arr_dir_division_amkr.division_abbr_ru as arrival_division_amkr_abbr_ru,
arr_dir_division_amkr.division_abbr_en as arrival_division_amkr_abbr_en,
--> ������� ��������
-- �������� ��� �������
cur_dir_operation.operation_name_ru as current_operation_wagon_name_ru,
cur_dir_operation.operation_name_en as current_operation_wagon_name_en,
cur_wio.operation_start as current_operation_wagon_start,
cur_wio.operation_end as current_operation_wagon_end,
cur_wio.note as current_operation_note,
cur_dir_operation.busy as current_operation_wagon_busy,
cur_wio.[create] as current_operation_wagon_create,
cur_wio.create_user as current_operation_wagon_create_user,
cur_wio.[close] as current_operation_wagon_close,
cur_wio.close_user as current_operation_wagon_close_user,
--> ��������� ��������
cur_dir_load_status.loading_status_ru as current_loading_status_ru,
cur_dir_load_status.loading_status_en as current_loading_status_en,
-- ������� ��� ������
cur_dir_cond.condition_name_ru as current_condition_name_ru,
cur_dir_cond.condition_name_en as current_condition_name_en,
cur_dir_cond.condition_abbr_ru as current_condition_abbr_ru,
cur_dir_cond.condition_abbr_en as current_condition_abbr_en,
cur_dir_cond.red as current_condition_red,
--> ������� ����������
-- ������� �������
from_dir_station.station_name_ru as from_station_amkr_name_ru,
from_dir_station.station_name_en as from_station_amkr_name_en,
from_dir_station.station_abbr_ru as from_station_amkr_abbr_ru,
from_dir_station.station_abbr_en as from_station_amkr_abbr_en,
--> ������� ������� ����
cur_dir_ways.name_outer_way_ru as current_outer_way_name_ru,
cur_dir_ways.name_outer_way_ru as current_outer_way_name_en,
wim.outer_way_start as current_outer_way_amkr_start,
cur_dir_ways.note as current_outer_way_note,
[current_outer_way_amkr_duration] = DATEDIFF (hour, wim.outer_way_start, getdate()),
-- ������� ��������
on_dir_station.station_name_ru as on_station_amkr_name_ru,
on_dir_station.station_name_en as on_station_amkr_name_en,
on_dir_station.station_abbr_ru as on_station_amkr_abbr_ru,
on_dir_station.station_abbr_en as on_station_amkr_abbr_en,

wim.[create] as current_wim_create,
wim.create_user as current_wim_create_user,
-- ������
[usage_fee] = 0.0,
--> �����������
-- ������������� ������
il.num as instructional_letters_num,
il.dt as instructional_letters_datetime,
il.destination_station as instructional_letters_station,
let_station_uz.station as instructional_letters_station_name,
--> �������� SAP �� ��������
sap_is.VBELN as sap_is_num,
sap_is.ERDAT as sap_is_create_date,
sap_is.ETIME as sap_is_create_time,
-- �������� SAP �� ��������
wir.doc_outgoing_car as sap_os_doc_outgoing_car
--......
--into view_wagon_outer_way
FROM IDS.WagonInternalMovement as wim INNER JOIN
	IDS.WagonInternalRoutes as wir ON wim.id_wagon_internal_routes = wir.id Left JOIN
	IDS.WagonInternalOperation as cur_wio ON cur_wio.id = (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= wim.id_wagon_internal_routes order by id desc)  INNER JOIN
	--> ��������
	IDS.ArrivalCars as ar_car ON wir.id_arrival_car = ar_car.id INNER JOIN -- ��������
	IDS.ArrivalSostav as ar_sost ON ar_car.id_arrival = ar_sost.id INNER JOIN
	--> ��������� �� ��������
	IDS.Arrival_UZ_Vagon as ar_doc_vag ON ar_car.id_arrival_uz_vagon = ar_doc_vag.id Left JOIN
	IDS.Arrival_UZ_Document as ar_doc_uz ON ar_doc_vag.id_document = ar_doc_uz.id Left JOIN
	-- ���������� �������
	IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num  Left JOIN
	IDS.Directory_WagonsRent as cur_dir_rent ON cur_dir_rent.id = (SELECT top(1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc) Left JOIN
	-- ������
	IDS.InstructionalLettersWagon as ilw  ON ilw.id = (SELECT TOP (1) [id] FROM [KRR-PA-CNT-Railway].[IDS].[InstructionalLettersWagon] where [num] =wir.num and [close] is null order by id desc)  left JOIN	
	IDS.InstructionalLetters as il ON ilw.id_instructional_letters = il.id  Left JOIN	
	-- SAP �������� ��������
	IDS.SAPIncomingSupply as sap_is ON wir.id_sap_incoming_supply = sap_is.id  Left JOIN	
	-- ����������� 
	IDS.Directory_Countrys as dir_countrys ON dir_wagon.id_countrys = dir_countrys.id Left JOIN								--> ������ ������
	IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id Left JOIN											--> ��� ������
	IDS.Directory_TypeWagons as dir_type ON ar_doc_vag.id_type =  dir_type.id Left JOIN											--> ��� ������
	IDS.Directory_OperatorsWagons as dir_operator ON cur_dir_rent.id_operator =  dir_operator.id  Left JOIN                     --> ������� �������� ������
	IDS.Directory_LimitingLoading as dir_limload ON cur_dir_rent.id_limiting =  dir_limload.id Left JOIN                       --> ������� ����������� ��������
	IDS.Directory_ConditionArrival as arr_dir_cond ON ar_doc_vag.id_condition =  arr_dir_cond.id Left JOIN                     --> ����������� �������� �� ��������
	IDS.Directory_Cargo as arr_dir_cargo ON ar_doc_vag.id_cargo =  arr_dir_cargo.id  Left JOIN                                 --> ���� �� ��������
	IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id Left JOIN               --> ������ ����� �� ��������
	IDS.Directory_CertificationData as arr_dir_certif ON ar_doc_vag.id_certification_data =  arr_dir_certif.id Left JOIN       --> ���������� ������ �� ��������
	IDS.Directory_ExternalStation as arr_dir_ext_station ON ar_doc_uz.code_stn_from =  arr_dir_ext_station.code Left JOIN       --> ������� ����������� �� ��������
	IDS.Directory_Station as arr_dir_station_amkr ON ar_doc_vag.id_station_on_amkr =  arr_dir_station_amkr.id Left JOIN         --> ������� ���������� ���� �� ��������
	IDS.Directory_Divisions as arr_dir_division_amkr ON ar_doc_vag.id_division_on_amkr =  arr_dir_division_amkr.id Left JOIN    --> ��� ���������� ���� �� ��������
	IDS.Directory_WagonOperations as cur_dir_operation ON cur_wio.id_operation =  cur_dir_operation.id Left JOIN                --> ������� �������� ��� �������
	IDS.Directory_WagonLoadingStatus as cur_dir_load_status ON cur_wio.id_loading_status =  cur_dir_load_status.id Left JOIN    --> ������� ��������� �������� ������
	IDS.Directory_Station as from_dir_station ON wim.id_station =  from_dir_station.id Left JOIN                                  --> ������� ������� ���������� ������
	IDS.Directory_ConditionArrival as cur_dir_cond ON cur_wio.id_condition =  cur_dir_cond.id  Left JOIN						--> ������� ����������� ��������
	IDS.Directory_OuterWays as cur_dir_ways ON wim.id_outer_way =  cur_dir_ways.id Left JOIN
	IDS.Directory_Station as on_dir_station ON cur_dir_ways.id_station_on =  on_dir_station.id Left JOIN 

	UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs									--> ������� �� �� ������

WHERE (wim.id_outer_way = @id_outer_way) AND (wim.outer_way_end IS NULL)
order by wim.outer_way_start, wim.position
	RETURN
END


GO


