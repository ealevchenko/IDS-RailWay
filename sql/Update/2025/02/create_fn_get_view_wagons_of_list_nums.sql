USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_wagons_of_list_nums]    Script Date: 06.03.2025 14:08:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_view_wagons_of_list_nums]
 (
	@nums nchar(1000) 
 )
		RETURNS 
	@view_wagons TABLE  (
	[wir_id] [bigint] NOT NULL,
	[wim_id] [bigint] NULL,
	[wio_id] [bigint] NULL,
	[num] [int] NOT NULL,
	[id_filing] [bigint] NULL,
	[num_filing] [nvarchar](50) NULL,
	[type_filing] [int] NULL,
	[id_division_filing] [int] NULL,
	[vesg_filing] [int] NULL,
	[note_filing] [nvarchar](250) NULL,
	[start_filing] [datetime] NULL,
	[end_filing] [datetime] NULL,
	[doc_received_filing] [datetime] NULL,
	[create_filing] [datetime] NULL,
	[create_user_filing] [nvarchar](50) NULL,
	[change_filing] [datetime] NULL,
	[change_user_filing] [nvarchar](50) NULL,
	[close_filing] [datetime] NULL,
	[close_user_filing] [nvarchar](50) NULL,
	[id_previous_filing] [bigint] NULL,
	[num_previous_filing] [nvarchar](50) NULL,
	[type_previous_filing] [int] NULL,
	[id_previous_division_filing] [int] NULL,
	[vesg_previous_filing] [int] NULL,
	[note_previous_filing] [nvarchar](250) NULL,
	[start_previous_filing] [datetime] NULL,
	[end_previous_filing] [datetime] NULL,
	[doc_received_previous_filing] [datetime] NULL,
	[create_previous_filing] [datetime] NULL,
	[create_user_previous_filing] [nvarchar](50) NULL,
	[change_previous_filing] [datetime] NULL,
	[change_user_previous_filing] [nvarchar](50) NULL,
	[close_previous_filing] [datetime] NULL,
	[close_user_previous_filing] [nvarchar](50) NULL,
	[id_station] [int] NULL,
	[station_name_ru] [nvarchar](50) NULL,
	[station_name_en] [nvarchar](50) NULL,
	[station_abbr_ru] [nvarchar](50) NULL,
	[station_abbr_en] [nvarchar](50) NULL,
	[id_way] [int] NULL,
	[way_num_ru] [nvarchar](20) NULL,
	[way_num_en] [nvarchar](20) NULL,
	[way_name_ru] [nvarchar](100) NULL,
	[way_name_en] [nvarchar](100) NULL,
	[way_abbr_ru] [nvarchar](50) NULL,
	[way_abbr_en] [nvarchar](50) NULL,
	[way_start] [datetime] NULL,
	[way_end] [datetime] NULL,
	[id_outer_way] [int] NULL,
	[name_outer_way_ru] [nvarchar](150) NULL,
	[name_outer_way_en] [nvarchar](150) NULL,
	[outer_way_start] [datetime] NULL,
	[outer_way_end] [datetime] NULL,
	[position] [int] NULL,
	[note_wim] [nvarchar](250) NULL,
	[create_wim] [datetime] NULL,
	[create_user_wim] [nvarchar](50) NULL,
	[close_wim] [datetime] NULL,
	[close_user_wim] [nvarchar](50) NULL,
	[parent_id_wim] [bigint] NULL,
	[way_filing_start] [datetime] NULL,
	[way_filing_end] [datetime] NULL,
	[id_operator] [int] NULL,
	[operators_ru] [nvarchar](100) NULL,
	[operators_en] [nvarchar](100) NULL,
	[operator_abbr_ru] [nvarchar](20) NULL,
	[operator_abbr_en] [nvarchar](20) NULL,
	[operator_rent_start] [datetime] NULL,
	[operator_rent_end] [datetime] NULL,
	[operator_paid] [bit] NULL,
	[operator_color] [nvarchar](10) NULL,
	[operator_monitoring_idle_time] [bit] NULL,
	[operator_group] [nvarchar](20) NULL,
	[id_limiting_loading] [int] NULL,
	[limiting_name_ru] [nvarchar](100) NULL,
	[limiting_name_en] [nvarchar](100) NULL,
	[limiting_abbr_ru] [nvarchar](30) NULL,
	[limiting_abbr_en] [nvarchar](30) NULL,
	[id_owner_wagon] [int] NULL,
	[owner_wagon_ru] [nvarchar](100) NULL,
	[owner_wagon_en] [nvarchar](100) NULL,
	[owner_wagon_abbr_ru] [nvarchar](20) NULL,
	[owner_wagon_abbr_en] [nvarchar](20) NULL,
	[wagon_adm] [int] NULL,
	[wagon_adm_name_ru] [nvarchar](100) NULL,
	[wagon_adm_name_en] [nvarchar](100) NULL,
	[wagon_adm_abbr_ru] [nvarchar](10) NULL,
	[wagon_adm_abbr_en] [nvarchar](10) NULL,
	[wagon_rod] [int] NULL,
	[wagon_rod_name_ru] [nvarchar](50) NULL,
	[wagon_rod_name_en] [nvarchar](50) NULL,
	[wagon_rod_abbr_ru] [nvarchar](5) NULL,
	[wagon_rod_abbr_en] [nvarchar](5) NULL,
	[wagon_type_ru] [nvarchar](50) NULL,
	[wagon_type_en] [nvarchar](50) NULL,
	[arrival_condition_name_ru] [nvarchar](100) NULL,
	[arrival_condition_name_en] [nvarchar](100) NULL,
	[arrival_condition_abbr_ru] [nvarchar](20) NULL,
	[arrival_condition_abbr_en] [nvarchar](20) NULL,
	[arrival_condition_red] [bit] NULL,
	[current_condition_name_ru] [nvarchar](100) NULL,
	[current_condition_name_en] [nvarchar](100) NULL,
	[current_condition_abbr_ru] [nvarchar](20) NULL,
	[current_condition_abbr_en] [nvarchar](20) NULL,
	[current_condition_red] [bit] NULL,
	[wagon_date_rem_uz] [datetime] NULL,
	[wagon_gruzp_doc] [float] NULL,
	[wagon_gruzp_uz] [float] NULL,
	[arrival_cargo_group_name_ru] [nvarchar](50) NULL,
	[arrival_cargo_group_name_en] [nvarchar](50) NULL,
	[arrival_cargo_name_ru] [nvarchar](50) NULL,
	[arrival_cargo_name_en] [nvarchar](50) NULL,
	[arrival_id_sertification_data] [int] NULL,
	[arrival_sertification_data_ru] [nvarchar](50) NULL,
	[arrival_sertification_data_en] [nvarchar](50) NULL,
	[arrival_id_commercial_condition] [int] NULL,
	[arrival_commercial_condition_ru] [nvarchar](50) NULL,
	[arrival_commercial_condition_en] [nvarchar](50) NULL,
	[arrival_station_from_code] [int] NULL,
	[arrival_station_from_name_ru] [nvarchar](50) NULL,
	[arrival_station_from_name_en] [nvarchar](50) NULL,
	[arrival_shipper_code] [int] NULL,
	[arrival_shipper_name_ru] [nvarchar](100) NULL,
	[arrival_shipper_name_en] [nvarchar](100) NULL,
	[arrival_station_amkr_name_ru] [nvarchar](50) NULL,
	[arrival_station_amkr_name_en] [nvarchar](50) NULL,
	[arrival_station_amkr_abbr_ru] [nvarchar](50) NULL,
	[arrival_station_amkr_abbr_en] [nvarchar](50) NULL,
	[arrival_division_amkr_code] [nvarchar](5) NULL,
	[arrival_division_amkr_name_ru] [nvarchar](250) NULL,
	[arrival_division_amkr_name_en] [nvarchar](250) NULL,
	[arrival_division_amkr_abbr_ru] [nvarchar](50) NULL,
	[arrival_division_amkr_abbr_en] [nvarchar](50) NULL,
	[current_id_loading_status] [int] NULL,
	[current_loading_status_ru] [nvarchar](30) NULL,
	[current_loading_status_en] [nvarchar](30) NULL,
	[current_wagon_busy] [int] NOT NULL,
	[current_move_busy] [int] NOT NULL,
	[current_load_busy] [int] NOT NULL,
	[current_unload_busy] [int] NOT NULL,
	[exist_load_document] [int] NOT NULL,
	[current_processing_busy] [int] NOT NULL,
	[current_id_operation] [int] NULL,
	[current_operation_name_ru] [nvarchar](50) NULL,
	[current_operation_name_en] [nvarchar](50) NULL,
	[current_operation_start] [datetime] NULL,
	[current_operation_end] [datetime] NULL,
	[current_id_organization_service] [int] NULL,
	[current_organization_service_ru] [nvarchar](50) NULL,
	[current_organization_service_en] [nvarchar](50) NULL,
	[view_current_cargo_name_ru] [nvarchar](50) NULL,
	[view_current_cargo_name_en] [nvarchar](50) NULL,
	[view_current_division_from_abbr_ru] [nvarchar](50) NULL,
	[view_current_division_from_abbr_en] [nvarchar](50) NULL,
	[view_current_division_on_abbr_ru] [nvarchar](50) NULL,
	[view_current_division_on_abbr_en] [nvarchar](50) NULL,
	[view_current_external_station_on_name_ru] [nvarchar](50) NULL,
	[view_current_external_station_on_name_en] [nvarchar](50) NULL,
	[view_current_station_from_amkr_abbr_ru] [nvarchar](50) NULL,
	[view_current_station_from_amkr_abbr_en] [nvarchar](50) NULL,
	[view_current_station_on_amkr_abbr_ru] [nvarchar](50) NULL,
	[view_current_station_on_amkr_abbr_en] [nvarchar](50) NULL,
	[internal_doc_num] [nvarchar](20) NULL,
	[id_weighing_num] [int] NULL,
	[move_cargo_doc_received] [datetime] NULL,
	[current_cargo_id_group] [int] NULL,
	[current_cargo_group_name_ru] [nvarchar](50) NULL,
	[current_cargo_group_name_en] [nvarchar](50) NULL,
	[current_cargo_id_cargo] [int] NULL,
	[current_cargo_name_ru] [nvarchar](50) NULL,
	[current_cargo_name_en] [nvarchar](50) NULL,
	[current_internal_cargo_id_group] [int] NULL,
	[current_internal_cargo_group_name_ru] [nvarchar](50) NULL,
	[current_internal_cargo_group_name_en] [nvarchar](50) NULL,
	[current_internal_cargo_id_internal_cargo] [int] NULL,
	[current_internal_cargo_name_ru] [nvarchar](50) NULL,
	[current_internal_cargo_name_en] [nvarchar](50) NULL,
	[current_vesg] [int] NULL,
	[id_station_from_amkr] [int] NULL,
	[current_station_from_amkr_name_ru] [nvarchar](50) NULL,
	[current_station_from_amkr_name_en] [nvarchar](50) NULL,
	[current_station_from_amkr_abbr_ru] [nvarchar](50) NULL,
	[current_station_from_amkr_abbr_en] [nvarchar](50) NULL,
	[id_division_from] [int] NULL,
	[current_division_from_code] [nvarchar](5) NULL,
	[current_division_from_name_ru] [nvarchar](250) NULL,
	[current_division_from_name_en] [nvarchar](250) NULL,
	[current_division_from_abbr_ru] [nvarchar](50) NULL,
	[current_division_from_abbr_en] [nvarchar](50) NULL,
	[id_wim_load] [bigint] NULL,
	[id_wim_redirection] [bigint] NULL,
	[code_external_station] [int] NULL,
	[current_external_station_on_name_ru] [nvarchar](50) NULL,
	[current_external_station_on_name_en] [nvarchar](50) NULL,
	[id_station_on_amkr] [int] NULL,
	[current_station_on_amkr_name_ru] [nvarchar](50) NULL,
	[current_station_on_amkr_name_en] [nvarchar](50) NULL,
	[current_station_on_amkr_abbr_ru] [nvarchar](50) NULL,
	[current_station_on_amkr_abbr_en] [nvarchar](50) NULL,
	[id_division_on] [int] NULL,
	[current_division_on_code] [nvarchar](5) NULL,
	[current_division_on_name_ru] [nvarchar](250) NULL,
	[current_division_on_name_en] [nvarchar](250) NULL,
	[current_division_on_abbr_ru] [nvarchar](50) NULL,
	[current_division_on_abbr_en] [nvarchar](50) NULL,
	[move_cargo_create] [datetime] NULL,
	[move_cargo_create_user] [nvarchar](50) NULL,
	[move_cargo_change] [datetime] NULL,
	[move_cargo_change_user] [nvarchar](50) NULL,
	[move_cargo_close] [datetime] NULL,
	[move_cargo_close_user] [nvarchar](50) NULL,
	[arrival_duration] [int] NULL,
	[arrival_idle_time] [int] NULL,
	[arrival_usage_fee] [numeric](2, 2) NOT NULL,
	[current_station_duration] [int] NULL,
	[current_way_duration] [int] NULL,
	[current_station_idle_time] [int] NULL,
	[sap_incoming_supply_num] [nvarchar](10) NULL,
	[sap_incoming_supply_pos] [nvarchar](10) NULL,
	[sap_incoming_supply_date] [date] NULL,
	[sap_incoming_supply_time] [time](7) NULL,
	[sap_incoming_supply_warehouse_code] [nvarchar](4) NULL,
	[sap_incoming_supply_warehouse_name] [nvarchar](16) NULL,
	[sap_incoming_supply_cargo_code] [nvarchar](18) NULL,
	[sap_incoming_supply_cargo_name] [nvarchar](40) NULL,
	[sap_incoming_supply_cargo_ban] [nvarchar](4) NULL,
	[sap_outgoing_supply_num] [char](10) NULL,
	[sap_outgoing_supply_date] [date] NULL,
	[sap_outgoing_supply_cargo_name] [nvarchar](160) NULL,
	[sap_outgoing_supply_cargo_code] [char](17) NULL,
	[sap_outgoing_supply_shipper_name] [nvarchar](150) NULL,
	[sap_outgoing_supply_shipper_code] [char](10) NULL,
	[sap_outgoing_supply_destination_station_name] [nvarchar](30) NULL,
	[sap_outgoing_supply_destination_station_code] [char](10) NULL,
	[sap_outgoing_supply_border_checkpoint_name] [nvarchar](30) NULL,
	[sap_outgoing_supply_border_checkpoint_code] [char](10) NULL,
	[sap_outgoing_supply_netto] [float] NULL,
	[sap_outgoing_supply_warehouse_code] [char](4) NULL,
	[sap_outgoing_supply_warehouse_name] [nvarchar](20) NULL,
	[sap_outgoing_supply_responsible_post] [nvarchar](50) NULL,
	[sap_outgoing_supply_responsible_fio] [nvarchar](50) NULL,
	[sap_outgoing_supply_payer_code] [char](15) NULL,
	[sap_outgoing_supply_payer_name] [nvarchar](50) NULL,
	[instructional_letters_num] [nvarchar](20) NULL,
	[instructional_letters_datetime] [datetime] NULL,
	[instructional_letters_station_code] [int] NULL,
	[instructional_letters_station_name] [nvarchar](50) NULL,
	[instructional_letters_note] [nvarchar](500) NULL,
	[wagon_brutto_doc] [int] NULL,
	[wagon_brutto_amkr] [int] NOT NULL,
	[wagon_tara_doc] [int] NULL,
	[wagon_tara_uz] [float] NULL,
	[wagon_tara_arc_doc] [int] NULL,
	[wagon_vesg_doc] [int] NULL,
	[wagon_vesg_amkr] [int] NOT NULL,
	[diff_vesg] [int] NOT NULL,
	[doc_outgoing_car] [bit] NULL,
	[arrival_nom_doc] [int] NULL,
	[arrival_nom_main_doc] [int] NULL,
	[arrival_klient] [bit] NULL,
	[arrival_composition_index] [nvarchar](50) NULL,
	[arrival_date_adoption] [datetime] NULL,
	[outgoing_id_return] [int] NULL,
	[outgoing_return_cause_ru] [nvarchar](150) NULL,
	[outgoing_return_cause_en] [nvarchar](150) NULL,
	[outgoing_date] [datetime] NULL,
	[outgoing_sostav_status] [int] NULL,
	[wagon_ban_uz] [nvarchar](1000) NULL,
	[wagon_closed_route] [bit] NULL,
	[wir_note] [nvarchar](250) NULL,
	[wir_note2] [nvarchar](250) NULL,
	[wir_highlight_color] [nchar](10) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[close] [datetime] NULL,
	[close_user] [nvarchar](50) NULL,
	[old_arrival_car_id_outgoing_car] [bigint] NULL,
	[old_arrival_car_id_outgoing_uz_vagon] [bigint] NULL,
	[old_date_outgoing] [datetime] NULL,
	[old_date_outgoing_act] [datetime] NULL,
	[old_outgoing_uz_vagon_id_cargo] [int] NULL,
	[old_outgoing_uz_vagon_cargo_name_ru] [nvarchar](50) NULL,
	[old_outgoing_uz_vagon_cargo_name_en] [nvarchar](50) NULL,
	[old_outgoingl_uz_document_code_stn_to] [int] NULL,
	[old_outgoing_uz_document_station_to_name_ru] [nvarchar](50) NULL,
	[old_outgoing_uz_document_station_to_name_en] [nvarchar](50) NULL
	)
		AS
		BEGIN

		DECLARE @index int
		--= CHARINDEX(';', @nums);
		set @index = 1;
		DECLARE @list nchar(1000) = @nums;
		DECLARE @tnums TABLE (num int primary key)
		-- Заполним таблицу
		WHILE @index>0
		BEGIN
			set @index = CHARINDEX(';', @list); 
			if (@index>0)
			begin
				insert into @tnums
				select CAST(substring(@list, 1, @index-1) AS INT)
			end else begin
				insert into @tnums
				select CAST(@list AS INT)
			end
			set @list = substring(@list,@index+1,LEN(@list))  
		END

	--> Получим уставку норма простоя
	declare @arrival_idle_time int = CAST((select [value] from [IDS].[Settings] where area=N'wsd' and name = N'arrival_idle_time') AS INT);

	insert @view_wagons
		select 
	     wir.id as wir_id
		,wim.id as wim_id
		,wio.id as wio_id
		--=============== ОСНОВНОЕ ОКНО ==================
		,wir.num
		,wf.id as id_filing
		,wf.num_filing
		,wf.type_filing
		,wf.id_division as id_division_filing
		,wf.vesg as vesg_filing
		,wf.note as note_filing
		,wf.start_filing
		,wf.end_filing
		,wf.doc_received as doc_received_filing
		,wf.[create] as create_filing
		,wf.[create_user] as create_user_filing
		,wf.[change] as change_filing
		,wf.[change_user] as change_user_filing
		,wf.[close] as close_filing
		,wf.[close_user] as close_user_filing
		,wf_pre.id as id_previous_filing 
		,wf_pre.num_filing as num_previous_filing 
		,wf_pre.type_filing as type_previous_filing 
		,wf_pre.id_division as id_previous_division_filing
		,wf_pre.vesg as vesg_previous_filing
		,wf_pre.note as note_previous_filing
		,wf_pre.start_filing as start_previous_filing
		,wf_pre.end_filing as end_previous_filing
		,wf_pre.doc_received as doc_received_previous_filing
		,wf_pre.[create] as create_previous_filing
		,wf_pre.[create_user] as create_user_previous_filing
		,wf_pre.[change] as change_previous_filing
		,wf_pre.[change_user] as change_user_previous_filing
		,wf_pre.[close] as close_previous_filing
		,wf_pre.[close_user] as close_user_previous_filing
		,wim.[id_station]
		  ,dir_station.[station_name_ru]
		  ,dir_station.[station_name_en]
		  ,dir_station.[station_abbr_ru]
		  ,dir_station.[station_abbr_en]
		  ,wim.[id_way]
		  ,dir_way.[way_num_ru]
		  ,dir_way.[way_num_en]
		  ,dir_way.[way_name_ru]
		  ,dir_way.[way_name_en]
		  ,dir_way.[way_abbr_ru]
		  ,dir_way.[way_abbr_en]
		  ,wim.[way_start]
		  ,wim.[way_end]
		  ,wim.[id_outer_way]
		  ,dir_oway.[name_outer_way_ru]
		  ,dir_oway.[name_outer_way_en]
		  ,wim.[outer_way_start]
		  ,wim.[outer_way_end]
		  ,wim.[position]
		  ,wim.[note] as note_wim
		  ,wim.[create] as create_wim
		  ,wim.[create_user] as create_user_wim
		  ,wim.[close] as close_wim
		  ,wim.[close_user] as close_user_wim
		  ,wim.[parent_id] as parent_id_wim
		,wim.filing_start as way_filing_start
		,wim.filing_end as way_filing_end
		--> Оператор
		,dir_operator.[id] as id_operator
		,dir_operator.[operators_ru]
		,dir_operator.[operators_en]
		,dir_operator.[abbr_ru] as operator_abbr_ru
		,dir_operator.[abbr_en] as operator_abbr_en
		,dir_rent.[rent_start] as operator_rent_start
		,dir_rent.[rent_end] as operator_rent_end
		,dir_operator.[paid] as operator_paid
		,dir_operator.[color] as operator_color
		,dir_operator.monitoring_idle_time as operator_monitoring_idle_time
		,dir_operator_group.[group] as operator_group
		--> Ограничение
		,dir_limload.[id] as id_limiting_loading
		,dir_limload.[limiting_name_ru]
		,dir_limload.[limiting_name_en]
		,dir_limload.[limiting_abbr_ru]
		,dir_limload.[limiting_abbr_en]
		--> Собственник по УЗ
		,dir_owner.[id] as id_owner_wagon
		,dir_owner.[owner_ru] as owner_wagon_ru
		,dir_owner.[owner_en] as owner_wagon_en
		,dir_owner.[abbr_ru] as owner_wagon_abbr_ru
		,dir_owner.[abbr_en] as owner_wagon_abbr_en
		--> Администрация
		,dir_countrys.code_sng as wagon_adm
		,dir_countrys.countrys_name_ru as wagon_adm_name_ru
		,dir_countrys.countrys_name_en as wagon_adm_name_en
		,dir_countrys.country_abbr_ru as wagon_adm_abbr_ru
		,dir_countrys.country_abbr_en as wagon_adm_abbr_en
		--> Род вагона
		,dir_rod.rod_uz as wagon_rod
		,dir_rod.genus_ru as wagon_rod_name_ru
		,dir_rod.genus_en as wagon_rod_name_en
		,dir_rod.abbr_ru as wagon_rod_abbr_ru
		,dir_rod.abbr_en as wagon_rod_abbr_en
		--> Тип вагона
		,dir_type.type_ru as wagon_type_ru
		,dir_type.type_en as wagon_type_en
		--> Разметка по прибытию
		,arr_dir_cond.condition_name_ru as arrival_condition_name_ru
		,arr_dir_cond.condition_name_en as arrival_condition_name_en
		,arr_dir_cond.condition_abbr_ru as arrival_condition_abbr_ru
		,arr_dir_cond.condition_abbr_en as arrival_condition_abbr_en
		,arr_dir_cond.red as arrival_condition_red
		--> Разметка по текущей операции
		,cur_dir_cond.condition_name_ru as current_condition_name_ru
		,cur_dir_cond.condition_name_en as current_condition_name_en
		,cur_dir_cond.condition_abbr_ru as current_condition_abbr_ru
		,cur_dir_cond.condition_abbr_en as current_condition_abbr_en
		,cur_dir_cond.red as current_condition_red
		--> Дата ремонта УЗ
		,dir_wagon.date_rem_uz as wagon_date_rem_uz
		--> Грузоподъемность
		,arr_doc_vag.gruzp as wagon_gruzp_doc
		,dir_wagon.gruzp as wagon_gruzp_uz
		--> груз по прибытию
		,arr_dir_group_cargo.cargo_group_name_ru as arrival_cargo_group_name_ru
		,arr_dir_group_cargo.cargo_group_name_en as arrival_cargo_group_name_en
		,arr_dir_cargo.cargo_name_ru as arrival_cargo_name_ru
		,arr_dir_cargo.cargo_name_en as arrival_cargo_name_en
		--> Сертификационные данные
		,arr_dir_certif.[id] as arrival_id_sertification_data
		,arr_dir_certif.[certification_data_ru] as arrival_sertification_data_ru
		,arr_dir_certif.[certification_data_en] as arrival_sertification_data_en
		--> Комерчиское состояние
		,arr_comm_cond.[id] as arrival_id_commercial_condition
		,arr_comm_cond.[commercial_condition_ru] as arrival_commercial_condition_ru
		,arr_comm_cond.[commercial_condition_en] as arrival_commercial_condition_en
		--> Станция отправитель
		,arr_dir_ext_station.code as arrival_station_from_code
		,arr_dir_ext_station.station_name_ru as arrival_station_from_name_ru
		,arr_dir_ext_station.station_name_en as arrival_station_from_name_en
		,shipper.[code] as arrival_shipper_code
		,shipper.[shipper_name_ru] as arrival_shipper_name_ru
		,shipper.[shipper_name_en] as arrival_shipper_name_en
		--> Станция назначения
		,arr_dir_station_amkr.station_name_ru as arrival_station_amkr_name_ru
		,arr_dir_station_amkr.station_name_en as arrival_station_amkr_name_en
		,arr_dir_station_amkr.station_abbr_ru as arrival_station_amkr_abbr_ru
		,arr_dir_station_amkr.station_abbr_en as arrival_station_amkr_abbr_en
		--> Цех получатель
		,arr_dir_division_amkr.code as arrival_division_amkr_code
		,arr_dir_division_amkr.name_division_ru as arrival_division_amkr_name_ru
		,arr_dir_division_amkr.name_division_en as arrival_division_amkr_name_en
		,arr_dir_division_amkr.division_abbr_ru as arrival_division_amkr_abbr_ru
		,arr_dir_division_amkr.division_abbr_en as arrival_division_amkr_abbr_en
		--> Состояние загрузки
		,cur_load.[id] as current_id_loading_status
		,cur_load.[loading_status_ru] as current_loading_status_ru
		,cur_load.[loading_status_en] as current_loading_status_en
		--> Состояние занят 17.12.2024
	    ,current_wagon_busy = CASE 
		WHEN (wio.operation_start is not null and wio.[operation_end] is null) or (wf.[create] is not null and wf.[close] is null and (wim.filing_start is null  or wim.filing_end is null)) 
		THEN 1  
		ELSE 0 
		END	
	    ,current_move_busy = CASE 
		WHEN (out_sost.status > 0 OR cur_dir_operation.id in (9) OR (wio.operation_start is not null and wio.[operation_end] is null) OR (wf.[create] is not null and wf.[close] is null and (wim.filing_start is null  or wim.filing_end is null))) 
		THEN 1  
		ELSE 0 
		END		
	    ,current_load_busy = CASE 
		WHEN ((cur_load.id in (1,2,4,5,6,7)) OR (cur_dir_operation.id in (15,16) AND wimc_curr.[doc_received] is null AND cur_load.id not in (0,3))) 
		THEN 1  
		ELSE 0 
		END			
	    ,current_unload_busy = CASE 
		WHEN ((cur_load.id in (0, 3, 8)) OR (cur_load.id in (1,2,4,5,6,7) AND wf_pre.id is not null AND wf_pre.[close] is null)) --OR (cur_dir_operation.id in (15,16) AND wimc_curr.[doc_received] is null)
		THEN 1  
		ELSE 0 
		END
		,exist_load_document = CASE 
		WHEN (cur_load.id not in (0, 3) AND  wf_pre.id is not null AND wf_pre.type_filing = 2 AND (wimc_curr.[doc_received] is not null OR wf_pre.doc_received is not null))
		THEN 1  
		ELSE 0 
		END
		,current_processing_busy = CASE 
		--WHEN ((wio.operation_start is not null and wio.[operation_end] is null and wf.type_filing <> 3) OR (wf.[create] is not null and wf.[close] is null and wf.type_filing <> 3))
		WHEN ((wio.operation_start is not null and wio.[operation_end] is null AND wio.id_operation <> 9) OR (wf.[create] is not null and wf.[close] is null))		THEN 1  
		ELSE 0 
		END	
		--> Текущая операция
		,cur_dir_operation.[id] as current_id_operation
		,cur_dir_operation.[operation_name_ru] as current_operation_name_ru
		,cur_dir_operation.[operation_name_en] as current_operation_name_en
		,wio.[operation_start] as current_operation_start
		,wio.[operation_end] as current_operation_end
		,wio.[id_organization_service] as  current_id_organization_service
		,curr_dir_org_service.[organization_service_ru] as current_organization_service_ru
		,curr_dir_org_service.[organization_service_en] as current_organization_service_en
		--++++++++++++++++++++++++++++++++++++++++++++++++++++++
		,view_current_cargo_name_ru = (CASE 
		WHEN (wimc_curr.[create] is not null and wimc_curr.[close] is null) 
		THEN (CASE WHEN curr_dir_cargo.id_group is not null THEN curr_dir_cargo.cargo_name_ru ELSE curr_dir_int_cargo.cargo_name_ru END)  
		ELSE arr_dir_cargo.cargo_name_ru 
		END)
		,view_current_cargo_name_en = (CASE 
		WHEN (wimc_curr.[create] is not null and wimc_curr.[close] is null) 
		THEN (CASE WHEN curr_dir_cargo.id_group is not null THEN curr_dir_cargo.cargo_name_en ELSE curr_dir_int_cargo.cargo_name_en END)  
		ELSE arr_dir_cargo.cargo_name_en 
		END)
		,view_current_division_from_abbr_ru = (CASE 
		WHEN (wimc_curr.[create] is not null and wimc_curr.[close] is null and cur_load.id not in (0, 3, 8)) 
		THEN dir_division_on.division_abbr_ru 
		ELSE null 
		END)
		,view_current_division_from_abbr_en = (CASE 
		WHEN (wimc_curr.[create] is not null and wimc_curr.[close] is null and cur_load.id not in (0, 3, 8)) 
		THEN dir_division_on.division_abbr_en 
		ELSE null 
		END)
		,view_current_division_on_abbr_ru = (CASE 
		WHEN (cur_load.id not in (0, 3, 8)) 
		THEN (CASE WHEN wimc_curr.[create] is not null and wimc_curr.[close] is null THEN dir_division_on.division_abbr_ru ELSE arr_dir_division_amkr.division_abbr_ru END)  
		ELSE null
		END)
		,view_current_division_on_abbr_en = (CASE 
		WHEN (cur_load.id not in (0, 3, 8)) 
		THEN (CASE WHEN wimc_curr.[create] is not null and wimc_curr.[close] is null THEN dir_division_on.division_abbr_en ELSE arr_dir_division_amkr.division_abbr_en END)  
		ELSE null
		END)
		,view_current_external_station_on_name_ru = (CASE 
		WHEN (cur_load.id not in (0, 3, 8)) 
		THEN (CASE WHEN wimc_curr.[create] is not null and wimc_curr.[close] is null THEN curr_dir_ext_station.station_name_ru ELSE arr_dir_ext_station.station_name_ru END)  
		ELSE null
		END)
		,view_current_external_station_on_name_en = (CASE 
		WHEN (cur_load.id not in (0, 3, 8)) 
		THEN (CASE WHEN wimc_curr.[create] is not null and wimc_curr.[close] is null THEN curr_dir_ext_station.station_name_en ELSE arr_dir_ext_station.station_name_en END)  
		ELSE null
		END)
		,view_current_station_from_amkr_abbr_ru = (CASE 
		WHEN (cur_load.id not in (0, 3, 8)) 
		THEN (CASE WHEN wimc_curr.[create] is not null and wimc_curr.[close] is null THEN dir_station_from_amkr.[station_abbr_ru] ELSE null END)  
		ELSE null
		END)
		,view_current_station_from_amkr_abbr_en = (CASE 
		WHEN (cur_load.id not in (0, 3, 8)) 
		THEN (CASE WHEN wimc_curr.[create] is not null and wimc_curr.[close] is null THEN dir_station_from_amkr.[station_abbr_en] ELSE null END)  
		ELSE null
		END)
		,view_current_station_on_amkr_abbr_ru = (CASE 
		WHEN (cur_load.id not in (0, 3, 8)) 
		THEN (CASE WHEN wimc_curr.[create] is not null and wimc_curr.[close] is null THEN dir_station_on_amkr.[station_abbr_ru] ELSE arr_dir_station_amkr.station_abbr_ru END)  
		ELSE null
		END)
		,view_current_station_on_amkr_abbr_en = (CASE 
		WHEN (cur_load.id not in (0, 3, 8)) 
		THEN (CASE WHEN wimc_curr.[create] is not null and wimc_curr.[close] is null THEN dir_station_on_amkr.[station_abbr_en] ELSE arr_dir_station_amkr.station_abbr_en END)  
		ELSE null
		END)
		--++++++++++++++++++++++++++++++++++++++++++++++++++++++
		--> Текушая информация по перемещению груза на АМКР
		,wimc_curr.[internal_doc_num]
		,wimc_curr.[id_weighing_num]
		,wimc_curr.[doc_received] as move_cargo_doc_received
		--> Текущий груз перемещения
		,curr_dir_cargo.id_group as current_cargo_id_group
		,curr_dir_group_cargo.cargo_group_name_ru as current_cargo_group_name_ru
		,curr_dir_group_cargo.cargo_group_name_en as current_cargo_group_name_en
		,wimc_curr.[id_cargo] as current_cargo_id_cargo
		,curr_dir_cargo.cargo_name_ru as current_cargo_name_ru
		,curr_dir_cargo.cargo_name_en as current_cargo_name_en
		-->
		,curr_dir_int_cargo.id_group as current_internal_cargo_id_group
		,curr_dir_group_int_cargo.cargo_group_name_ru as current_internal_cargo_group_name_ru
		,curr_dir_group_int_cargo.cargo_group_name_en as current_internal_cargo_group_name_en
		,wimc_curr.[id_internal_cargo] as current_internal_cargo_id_internal_cargo
		,curr_dir_int_cargo.cargo_name_ru as current_internal_cargo_name_ru
		,curr_dir_int_cargo.cargo_name_en as current_internal_cargo_name_en
		-->
		,wimc_curr.[vesg] as current_vesg
		--> Текущая станция отправления
		,wimc_curr.[id_station_from_amkr]
		,dir_station_from_amkr.[station_name_ru] as current_station_from_amkr_name_ru
		,dir_station_from_amkr.[station_name_en] as current_station_from_amkr_name_en
		,dir_station_from_amkr.[station_abbr_ru] as current_station_from_amkr_abbr_ru
		,dir_station_from_amkr.[station_abbr_en] as current_station_from_amkr_abbr_en
		--> Текущий цех погрузки
		,wimc_curr.[id_division_from]
		,dir_division_from.code as current_division_from_code
		,dir_division_from.name_division_ru as current_division_from_name_ru
		,dir_division_from.name_division_en as current_division_from_name_en
		,dir_division_from.division_abbr_ru as current_division_from_abbr_ru
		,dir_division_from.division_abbr_en as current_division_from_abbr_en
		,wimc_curr.[id_wim_load]
		--> Текущая переодресация
		,wimc_curr.[id_wim_redirection]
		--> Текущая внешняя станция
		,wimc_curr.[code_external_station]
		,curr_dir_ext_station.station_name_ru as current_external_station_on_name_ru
		,curr_dir_ext_station.station_name_en as current_external_station_on_name_en
		,wimc_curr.[id_station_on_amkr]
		,dir_station_on_amkr.[station_name_ru] as current_station_on_amkr_name_ru
		,dir_station_on_amkr.[station_name_en] as current_station_on_amkr_name_en
		,dir_station_on_amkr.[station_abbr_ru] as current_station_on_amkr_abbr_ru
		,dir_station_on_amkr.[station_abbr_en] as current_station_on_amkr_abbr_en
		--> Текущий внещний цех
		,wimc_curr.[id_division_on]
		,dir_division_on.code as current_division_on_code
		,dir_division_on.name_division_ru as current_division_on_name_ru
		,dir_division_on.name_division_en as current_division_on_name_en
		,dir_division_on.division_abbr_ru as current_division_on_abbr_ru
		,dir_division_on.division_abbr_en as current_division_on_abbr_en
		-->
		--,wimc_curr.[id_wim_unload]
		--> 
		,wimc_curr.[create] as move_cargo_create
		,wimc_curr.[create_user] as move_cargo_create_user
		,wimc_curr.[change] as move_cargo_change
		,wimc_curr.[change_user] as move_cargo_change_user
		,wimc_curr.[close] as move_cargo_close
		,wimc_curr.[close_user] as move_cargo_close_user
		------------------------------------------------
		,[arrival_duration] = (CASE WHEN dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null THEN DATEDIFF (minute, arr_sost.date_adoption, getdate()) ELSE null END)
		,[arrival_idle_time] = (CASE WHEN dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null THEN @arrival_idle_time ELSE null END)		
		,[arrival_usage_fee] = 0.00
		--=============== ПРОСТОЙ НА ЖД. СТАНЦИИ ==================
		,[current_station_duration] = (CASE WHEN dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null THEN DATEDIFF (minute, (select [IDS].[get_start_datetime_station_of_wim](wim.id)), getdate()) ELSE null END)
		,[current_way_duration] = (CASE WHEN dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null THEN DATEDIFF (minute, wim.way_start, getdate()) ELSE null END)
		,[current_station_idle_time] = (CASE WHEN dir_operator_group.[group] != 'amkr_vz' OR dir_operator_group.[group] is null THEN cur_dir_station_amkr.idle_time ELSE null END)
		-- Переделал 15-04-2022
		--,[current_station_duration] = DATEDIFF (minute, (select [IDS].[get_start_datetime_station_of_wim](wim.id)), getdate())
		--,[current_way_duration] = DATEDIFF (minute, wim.way_start, getdate())
		--,cur_dir_station_amkr.idle_time as current_station_idle_time
		--=============== ВНУТРИЗАВОДСКОЕ ПЕРЕМЕЩЕНИЕ( В/З) ==================
		--> ....
		--=============== ВХОДЯЩАЯ ПОСТАВКА ==================
		,sap_is.[VBELN] as sap_incoming_supply_num
		,sap_is.[NUM_VBELN] as sap_incoming_supply_pos
		,sap_is.[ERDAT] as sap_incoming_supply_date
		,sap_is.[ETIME] as sap_incoming_supply_time
		,sap_is.[LGORT_10] as sap_incoming_supply_warehouse_code 
		,sap_is.[LGOBE_10] as sap_incoming_supply_warehouse_name
		,sap_is.[MATNR] as sap_incoming_supply_cargo_code 
		,sap_is.[MAKTX] as sap_incoming_supply_cargo_name
		,sap_is.[KOD_R_10] as sap_incoming_supply_cargo_ban
		--=============== ИСХОДЯЩАЯ ПОСТАВКА ==================
		,sap_os.[VBELN] as sap_outgoing_supply_num
		,sap_os.[ERDAT] as sap_outgoing_supply_date
		,sap_os.[ZBEZEI] as sap_outgoing_supply_cargo_name
		,sap_os.[STAWN] as sap_outgoing_supply_cargo_code
		,sap_os.[NAME1_AG] as sap_outgoing_supply_shipper_name
		,sap_os.[KUNNR_AG] as sap_outgoing_supply_shipper_code
		,sap_os.[ZRWNAME] as sap_outgoing_supply_destination_station_name
		,sap_os.[ZENDSTAT] as sap_outgoing_supply_destination_station_code
		,sap_os.[ZCRSTNAME] as sap_outgoing_supply_border_checkpoint_name
		,sap_os.[ZCROSSSTAT] as sap_outgoing_supply_border_checkpoint_code
		,sap_os.[ZZVES_NETTO] as sap_outgoing_supply_netto
		,sap_os.[ABTNR] as sap_outgoing_supply_warehouse_code
		,sap_os.[VTEXT] as sap_outgoing_supply_warehouse_name
		,sap_os.[ZZDOLG] as sap_outgoing_supply_responsible_post
		,sap_os.[ZZFIO] as sap_outgoing_supply_responsible_fio
		,sap_os.[ZZPLATEL] as sap_outgoing_supply_payer_code
		,sap_os.[ZZNAME_PLATEL] as sap_outgoing_supply_payer_name
		--=============== ГТД ===================================
		--> ....
		--=============== ИНСТРУКТИВНЫЕ ПИСЬМИ ==================
		--> Инструктивные письма
		,instructional_letters_num = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN il.num ELSE null END
		,instructional_letters_datetime = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN il.dt ELSE null END
		,instructional_letters_station_code = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN il.destination_station ELSE null END
		,instructional_letters_station_name = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN let_station_uz.station ELSE null END
		,instructional_letters_note = CASE WHEN old_out_sostav.date_outgoing is null OR (old_out_sostav.date_outgoing is not null AND old_out_sostav.date_outgoing < il.dt)
			THEN il.[note] ELSE null END
		--=============== ВХОДЯЩЕЕ ВЗВЕШИВАНИЕ ==================
		--> Брутто
		--,wagon_brutto_doc = (CASE WHEN arr_doc_vag.ves_tary_arc is not null AND arr_doc_vag.vesg is not null THEN arr_doc_vag.ves_tary_arc+arr_doc_vag.vesg ELSE null END)	--Брутто по ЭПД, тн
		,wagon_brutto_doc = (CASE WHEN arr_doc_vag.ves_tary_arc is not null AND arr_doc_vag.vesg is not null 
									THEN arr_doc_vag.ves_tary_arc+arr_doc_vag.vesg 
									ELSE (CASE WHEN arr_doc_vag.u_tara is not null AND arr_doc_vag.vesg is not null 
												THEN arr_doc_vag.u_tara+arr_doc_vag.vesg 
												ELSE null 
												END) 
								END)	--Брутто по ЭПД, тн
		,wagon_brutto_amkr = 0
		--> Тара
		,arr_doc_vag.u_tara as wagon_tara_doc
		,dir_wagon.tara as wagon_tara_uz
		,arr_doc_vag.ves_tary_arc as wagon_tara_arc_doc		--Тара по ЭПД, тн.
		--> Вес груза (Нетто)	
		,arr_doc_vag.vesg as wagon_vesg_doc					--Нетто по ЭПД, тн
		,wagon_vesg_amkr = 0
		--> Вес груза (Разница)		
		,diff_vesg = 0
		--=============== ОСТАЛЬНОЕ ==================
		,wir.doc_outgoing_car as doc_outgoing_car				-- Наличие документа для сдачи
		,arr_doc_uz.[nom_doc] as arrival_nom_doc			-- Номер документа(досылки)
		-- заменил 12-01-2024
		,arrival_nom_main_doc = CASE WHEN arr_doc_uz.[nom_main_doc] is not null AND arr_doc_uz.[nom_main_doc]>0 THEN arr_doc_uz.[nom_main_doc] ELSE null END
		--,arr_doc_uz.[nom_main_doc] as arrival_nom_main_doc		-- Номер основного документа (если заполнен)
		,arr_doc_uz.[klient] as arrival_klient					-- Признак контр-агента
		,arr_sost.composition_index as arrival_composition_index
		,arr_sost.date_adoption as arrival_date_adoption		-- дата приема
		,out_car.[id_outgoing_return_start] as outgoing_id_return
		-- заменил 12-01-2024 (возврат по отправке или текущий)
		,outgoing_return_cause_ru = CASE WHEN out_car.[id_outgoing_return_start] is not null THEN dir_out_return.[cause_ru] ELSE dir_curr_return.[cause_ru] END
		,outgoing_return_cause_en = CASE WHEN out_car.[id_outgoing_return_start] is not null THEN dir_out_return.[cause_en] ELSE dir_curr_return.[cause_en] END
		--,dir_return.[cause_ru] as outgoing_return_cause_ru
		--,dir_return.[cause_en] as outgoing_return_cause_en
		,out_sost.date_outgoing as outgoing_date				-- дата отправки
		,out_sost.status as outgoing_sostav_status				-- статус состава для отправки
		,dir_wagon.note as wagon_ban_uz							-- Запреты по УЗ 
		,dir_wagon.[closed_route] as wagon_closed_route			--Замкнутый маршрут (кольцо)
		,wir.note as wir_note									-- Примечание по ходу движения вагона
		,wir.note2 as wir_note2									-- Примечание по ходу движения вагона
		,wir.highlight_color as wir_highlight_color				-- Подсветка строки
		,wir.[create]
		,wir.[create_user]
		,wir.[close]
		,wir.[close_user]
		 -- Добавил последнюю отправку 26-03-2024
		,old_out_car.id as old_arrival_car_id_outgoing_car
		,old_out_car.id_outgoing_uz_vagon as old_arrival_car_id_outgoing_uz_vagon
		,old_out_sostav.date_outgoing as old_date_outgoing
		,old_out_sostav.date_outgoing_act as old_date_outgoing_act
		,old_out_uz_vag.[id_cargo] as old_outgoing_uz_vagon_id_cargo
		,old_out_dir_cargo.cargo_name_ru as old_outgoing_uz_vagon_cargo_name_ru
		,old_out_dir_cargo.cargo_name_en as old_outgoing_uz_vagon_cargo_name_en
		,old_out_uz_doc.[code_stn_to]  as old_outgoingl_uz_document_code_stn_to
		,old_out_ext_station_to.[station_name_ru] as old_outgoing_uz_document_station_to_name_ru
		,old_out_ext_station_to.[station_name_en] as old_outgoing_uz_document_station_to_name_en
				--into wagons_nums
  FROM  [IDS].[WagonInternalRoutes] as wir
	Left JOIN IDS.WagonInternalMovement as wim ON wim.id = (SELECT top (1) id FROM IDS.WagonInternalMovement where [id_wagon_internal_routes] = wir.id order by 1 desc)
		 Left JOIN IDS.WagonFiling as wf ON wf.id = wim.id_filing
		 --> Предыдущая подача 23.10.2024
		 Left JOIN IDS.WagonFiling as wf_pre ON wf_pre.id = (SELECT top(1) [id_filing] FROM [IDS].[WagonInternalMovement] where [id_wagon_internal_routes] = wir.id and [id_filing] is not null order by [id_filing] desc)
		 -- Добавил 10.12.2024
		 --> Текущая строка перевозки грузов 	
		 LEFT JOIN [IDS].[WagonInternalMoveCargo] as wimc_curr  ON wimc_curr.[id] = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalMoveCargo] where [id_wagon_internal_routes]= wir.id order by id desc) 
		 --> Текущая операция
		 Left JOIN IDS.WagonInternalOperation as wio ON wio.id = (SELECT TOP (1) [id] FROM [IDS].[WagonInternalOperation] where [id_wagon_internal_routes]= wim.id_wagon_internal_routes order by id desc)
		 --> Последнее отправление (обновил 26.03.2024)
		--Left JOIN IDS.WagonInternalRoutes as wir_old ON wir_old.id = wir.parent_id
		-- Правил 30-05-2024 (появились сылки на разные номера вагонов)
		Left JOIN IDS.WagonInternalRoutes as wir_old ON wir_old.id = (select id from IDS.WagonInternalRoutes where id = wir.parent_id and num = wir.num)

		Left JOIN [IDS].[OutgoingCars] as old_out_car ON old_out_car.id = wir_old.id_outgoing_car
		Left JOIN [IDS].[OutgoingSostav] as old_out_sostav ON old_out_sostav.id = old_out_car.id_outgoing
		Left JOIN [IDS].[Outgoing_UZ_Vagon] as old_out_uz_vag ON old_out_uz_vag.id = old_out_car.id_outgoing_uz_vagon
		Left JOIN [IDS].[Outgoing_UZ_Document] as old_out_uz_doc ON old_out_uz_doc.id = old_out_uz_vag.id_document
		Left JOIN IDS.Directory_Cargo as old_out_dir_cargo ON old_out_dir_cargo.id =  old_out_uz_vag.id_cargo
		Left JOIN [IDS].[Directory_ExternalStation] as old_out_ext_station_to ON old_out_uz_doc.[code_stn_to] = old_out_ext_station_to.code
		 --==== ПРИБЫТИЕ И ПРИЕМ ВАГОНА =====================================================================
		--> Прибытие вагона
		Left JOIN IDS.ArrivalCars as arr_car ON wir.id_arrival_car = arr_car.id
		--> Прибытие состава
		Left JOIN IDS.ArrivalSostav as arr_sost ON arr_car.id_arrival = arr_sost.id
		 --> Документы на вагон по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Vagon as arr_doc_vag ON arr_car.id_arrival_uz_vagon = arr_doc_vag.id
		 --> Документы на группу вагонов (состав) по принятию вагона на АМКР
		Left JOIN IDS.Arrival_UZ_Document as arr_doc_uz ON arr_doc_vag.id_document = arr_doc_uz.id
		 --> Документы SAP Входящая поставка
		Left JOIN [IDS].[SAPIncomingSupply] as sap_is ON wir.id_sap_incoming_supply = sap_is.id
		 --==== СДАЧА ВАГОНА И ЗАДЕРЖАНИЯ ================================================================
		--> Отправка вагона
		Left JOIN [IDS].[OutgoingCars] as out_car ON wir.id_outgoing_car = out_car.id
		--> Отправка состава
		Left JOIN [IDS].[OutgoingSostav] as out_sost ON out_car.id_outgoing = out_sost.id
				 --> Документы SAP Исходящая поставка
		Left JOIN [IDS].[SAPOutgoingSupply] as sap_os ON wir.id_sap_outbound_supply = sap_os.id
		 --==== ИНСТРУКТИВНЫЕ ПИСЬМА =====================================================================
		--> Перечень вагонов по письма
		Left JOIN IDS.InstructionalLettersWagon as ilw  ON ilw.id = (SELECT TOP (1) [id] FROM [IDS].[InstructionalLettersWagon] where [num] =wir.num and [close] is null order by id desc)
		--> Перечень писем
		Left JOIN IDS.InstructionalLetters as il ON ilw.id_instructional_letters = il.id
		--==== СПРАВОЧНИКИ ===================================================================================
		--> Справочник вагонов
		Left JOIN IDS.Directory_Wagons as dir_wagon ON wir.num = dir_wagon.num
		--> Справочник аренд
		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = wir.num and rent_end is null order by [id] desc)	
		--> Справочник группы Операторов вагона
		Left JOIN IDS.Directory_OperatorsWagonsGroup as dir_operator_group ON dir_rent.id_operator =  dir_operator_group.id_operator
		--> Справочник Оператор вагона
		Left JOIN IDS.Directory_OperatorsWagons as dir_operator ON dir_rent.id_operator =  dir_operator.id
		--> Справочник Ограничение погрузки
		Left JOIN IDS.Directory_LimitingLoading as dir_limload ON dir_rent.id_limiting =  dir_limload.id
		--> Справочник Собственник вагона по УЗ
		Left JOIN [IDS].[Directory_OwnersWagons] as dir_owner ON dir_wagon.id_owner = dir_owner.id
		--> Справочник строна (Администрация вагона)
		Left JOIN IDS.Directory_Countrys as dir_countrys ON dir_wagon.id_countrys = dir_countrys.id
		--> Справочник Род вагона
		Left JOIN IDS.Directory_GenusWagons as dir_rod ON dir_wagon.id_genus = dir_rod.id
		--> Справочник Тип вагона
		Left JOIN IDS.Directory_TypeWagons as dir_type ON arr_doc_vag.id_type =  dir_type.id
		--> Справочник Разметка по прибытию
		Left JOIN IDS.Directory_ConditionArrival as arr_dir_cond ON arr_doc_vag.id_condition = arr_dir_cond.id
		--> Справочник Разметка по текущей операции
		Left JOIN IDS.Directory_ConditionArrival as cur_dir_cond ON wio.id_condition =  cur_dir_cond.id
		--> Справочник Грузоотправитель
		Left JOIN [IDS].[Directory_Shipper] as shipper ON arr_doc_uz.[code_shipper] = shipper.[code]
		--> Справочник Грузов
		Left JOIN IDS.Directory_Cargo as arr_dir_cargo ON arr_doc_vag.id_cargo =  arr_dir_cargo.id
		--> Справочник Группы Грузов
		Left JOIN IDS.Directory_CargoGroup as arr_dir_group_cargo ON arr_dir_cargo.id_group =  arr_dir_group_cargo.id
		--> Справочник Сертификат данные
		Left JOIN IDS.Directory_CertificationData as arr_dir_certif ON arr_doc_vag.id_certification_data =  arr_dir_certif.id
		--> Справочник комерческое состояние
		Left JOIN [IDS].[Directory_CommercialCondition] as arr_comm_cond ON arr_doc_vag.[id_commercial_condition] = arr_comm_cond.id
		--> Справочник Станция отправления (Внешняя станция)
		Left JOIN IDS.Directory_ExternalStation as arr_dir_ext_station ON arr_doc_uz.code_stn_from =  arr_dir_ext_station.code
		--> Справочник Станции АМКР (станция назначения АМКР)
		Left JOIN IDS.Directory_Station as arr_dir_station_amkr ON arr_doc_vag.id_station_on_amkr =  arr_dir_station_amkr.id
		--> Справочник Станции АМКР (текущая станция АМКР)
		Left JOIN IDS.Directory_Station as cur_dir_station_amkr ON wim.id_station =  cur_dir_station_amkr.id
		--> Справочник Подразделения (цех получатель)
		Left JOIN IDS.Directory_Divisions as arr_dir_division_amkr ON arr_doc_vag.id_division_on_amkr =  arr_dir_division_amkr.id
		--> Справочник Операции над вагоном (текущая операция)
		Left JOIN IDS.Directory_WagonOperations as cur_dir_operation ON wio.id_operation =  cur_dir_operation.id
		--> Справочник Сотояния загрузки
		Left JOIN [IDS].[Directory_WagonLoadingStatus] as cur_load ON wio.id_loading_status = cur_load.id
		--> Справочник Внешних станций УЗ
		Left JOIN UZ.Directory_Stations as let_station_uz ON  il.destination_station = let_station_uz.code_cs
		-- заменил 12-01-2024 (возврат по отправке или текущий)
		--> Возврат по отправке
		Left JOIN [IDS].[OutgoingDetentionReturn] as out_dr ON out_dr.id = out_car.id_outgoing_return_start
		--> Справочник Возвратов
		Left JOIN [IDS].[Directory_DetentionReturn] as dir_out_return ON out_dr.id_detention_return = dir_out_return.id		
		--> Возврат текущий открытый
		Left JOIN [IDS].[OutgoingDetentionReturn] as curr_dr ON curr_dr.id = (SELECT top(1) [id] FROM [IDS].[OutgoingDetentionReturn] where [num]=wir.num and [date_stop] is null order by 1 desc)	
		--> Справочник Возвратов
		Left JOIN [IDS].[Directory_DetentionReturn] as dir_curr_return ON curr_dr.id_detention_return = dir_curr_return.id
		-- Добавил 10.12.2024
		--> Груз текущий
		Left JOIN IDS.Directory_Cargo as curr_dir_cargo ON curr_dir_cargo.id =  wimc_curr.[id_cargo]
		--> Группа текущего груза.
		Left JOIN IDS.Directory_CargoGroup as curr_dir_group_cargo ON curr_dir_group_cargo.id = curr_dir_cargo.id_group
		--> Груз(внутренний) текущий
		Left JOIN IDS.[Directory_InternalCargo] as curr_dir_int_cargo ON curr_dir_int_cargo.id = wimc_curr.[id_internal_cargo]
		--> Группа груза(внутреннего) текущий
		Left JOIN IDS.[Directory_InternalCargoGroup] as curr_dir_group_int_cargo ON curr_dir_group_int_cargo.id = curr_dir_int_cargo.[id_group]
		-- Справочник Станция отправки
		Left JOIN [IDS].[Directory_Station] as dir_station_from_amkr ON dir_station_from_amkr.id = wimc_curr.[id_station_from_amkr]
		--> Справочник Подразделения (цех отправитель)
		Left JOIN IDS.Directory_Divisions as dir_division_from ON dir_division_from.id = wimc_curr.[id_division_from]
		--> Справочник Станция отправления (Внешняя станция получения)
		Left JOIN IDS.Directory_ExternalStation as curr_dir_ext_station ON curr_dir_ext_station.code = wimc_curr.[code_external_station]
		-- Справочник Станция отправки
		Left JOIN [IDS].[Directory_Station] as dir_station_on_amkr ON dir_station_on_amkr.id = wimc_curr.[id_station_on_amkr]
		--> Справочник Подразделения (цех отправитель)
		Left JOIN IDS.Directory_Divisions as dir_division_on ON dir_division_on.id = wimc_curr.[id_division_on]
		--> Справочник Организация
		Left JOIN [IDS].[Directory_OrganizationService] as curr_dir_org_service ON curr_dir_org_service.id = wio.[id_organization_service]
		Left JOIN [IDS].[Directory_Station] as dir_station ON dir_station.id = wim.[id_station] 
		Left JOIN [IDS].[Directory_Ways] as dir_way ON dir_way.id = wim.[id_way] 
		Left JOIN [IDS].[Directory_OuterWays] as dir_oway ON dir_oway.id = wim.[id_outer_way] 
	where wir.[id] in (SELECT max(wir_grp.[id]) FROM [IDS].[WagonInternalRoutes] as wir_grp where wir_grp.num in (select num from @tnums) group by  wir_grp.[num])	RETURN
 END

GO


