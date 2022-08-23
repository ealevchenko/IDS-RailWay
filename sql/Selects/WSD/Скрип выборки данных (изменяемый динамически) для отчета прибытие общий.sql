use [KRR-PA-CNT-Railway]

declare @start datetime = Convert(datetime, '2022-08-14 00:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-08-14 10:59:59', 120)

--select
--		[arrival_car_id]
--      ,[num]
--      ,[arrival_car_position_arrival]
--      ,[id_wir]
--      ,[arrival_car_id_outgoing_car]
--      ,[arrival_car_id_outgoing_uz_vagon]
--      ,[arrival_car_wim_cur_id]
--      ,[arrival_car_wim_cur_id_wagon_internal_routes]
--      ,[arrival_car_wim_cur_id_station]
--      ,[arrival_car_wim_cur_station_name_ru]
--      ,[arrival_car_wim_cur_station_name_en]
--      ,[arrival_car_wim_cur_station_abbr_ru]
--      ,[arrival_car_wim_cur_station_abbr_en]
--      ,[arrival_car_wim_cur_id_way]
--      ,[arrival_car_wim_cur_way_on_id_park]
--      ,[arrival_car_wim_cur_way_num_ru]
--      ,[arrival_car_wim_cur_way_num_en]
--      ,[arrival_car_wim_cur_way_name_ru]
--      ,[arrival_car_wim_cur_way_name_en]
--      ,[arrival_car_wim_cur_way_abbr_ru]
--      ,[arrival_car_wim_cur_way_abbr_en]
--      ,[arrival_car_wim_cur_way_start]
--      ,[arrival_car_wim_cur_way_end]
--      ,[arrival_car_wim_cur_id_outer_way]
--      ,[arrival_car_wim_cur_name_outer_way_ru]
--      ,[arrival_car_wim_cur_name_outer_way_en]
--      ,[arrival_car_wim_cur_outer_way_start]
--      ,[arrival_car_wim_cur_outer_way_end]
--      ,[arrival_car_wim_cur_position]
--      ,[arrival_car_wim_cur_note]
--      ,[arrival_car_wim_cur_parent_id]
--      ,[arrival_car_wim_cur_id_wio]
--      ,[arrival_car_wim_cur_num_sostav]
--      ,[arrival_car_position]
--      ,[arrival_car_consignee]
--      ,[arrival_car_num_doc]
--      ,[arrival_car_id_transfer]
--      ,[arrival_car_note]
--      ,[arrival_car_date_adoption_act]
--      ,[arrival_car_arrival]
--      ,[arrival_car_arrival_user]
--      ,[arrival_car_create]
--      ,[arrival_car_create_user]
--      ,[arrival_car_change]
--      ,[arrival_car_change_user]
--      ,[arrival_sostav_id]
--      ,[arrival_sostav_id_arrived]
--      ,[arrival_sostav_id_sostav]
--      ,[arrival_sostav_train]
--      ,[arrival_sostav_composition_index]
--      ,[arrival_sostav_date_arrival]
--      ,[arrival_sostav_date_adoption]
--      ,[arrival_sostav_date_adoption_act]
--      ,[arrival_sostav_id_station_from]
--      ,[arrival_sostav_station_from_name_ru]
--      ,[arrival_sostav_station_from_name_en]
--      ,[arrival_sostav_station_from_abbr_ru]
--      ,[arrival_sostav_station_from_abbr_en]
--      ,[arrival_sostav_id_station_on]
--      ,[arrival_sostav_station_on_name_ru]
--      ,[arrival_sostav_station_on_name_en]
--      ,[arrival_sostav_station_on_abbr_ru]
--      ,[arrival_sostav_station_on_abbr_en]
--      ,[arrival_sostav_id_way]
--      ,[arrival_sostav_way_on_id_park]
--      ,[arrival_sostav_way_on_num_ru]
--      ,[arrival_sostav_way_on_num_en]
--      ,[arrival_sostav_way_on_name_ru]
--      ,[arrival_sostav_way_on_name_en]
--      ,[arrival_sostav_way_on_abbr_ru]
--      ,[arrival_sostav_way_on_abbr_en]
--      ,[arrival_sostav_numeration]
--      ,[arrival_sostav_num_doc]
--      ,[arrival_sostav_count]
--      ,[arrival_sostav_status]
--      ,[arrival_sostav_note]
--      ,[arrival_sostav_create]
--      ,[arrival_sostav_create_user]
--      ,[arrival_sostav_change]
--      ,[arrival_sostav_change_user]
--      ,[arrival_uz_vagon_id]
--      ,[arrival_uz_vagon_id_arrival]
--      ,[arrival_uz_vagon_id_owner]
--      ,[arrival_uz_vagon_owner_wagon_ru]
--      ,[arrival_uz_vagon_owner_wagon_en]
--      ,[arrival_uz_vagon_owner_wagon_abbr_ru]
--      ,[arrival_uz_vagon_owner_wagon_abbr_en]
--      ,[arrival_uz_vagon_id_type_ownership]
--      ,[arrival_uz_vagon_type_ownership_ru]
--      ,[arrival_uz_vagon_type_ownership_en]
--      ,[arrival_uz_vagon_id_countrys]
--      ,[arrival_uz_vagon_wagon_adm]
--      ,[arrival_uz_vagon_wagon_adm_name_ru]
--      ,[arrival_uz_vagon_wagon_adm_name_en]
--      ,[arrival_uz_vagon_wagon_adm_abbr_ru]
--      ,[arrival_uz_vagon_wagon_adm_abbr_en]
--      ,[arrival_uz_vagon_id_genus]
--      ,[arrival_uz_vagon_rod]
--      ,[arrival_uz_vagon_rod_name_ru]
--      ,[arrival_uz_vagon_rod_name_en]
--      ,[arrival_uz_vagon_rod_abbr_ru]
--      ,[arrival_uz_vagon_rod_abbr_en]
--      ,[arrival_uz_vagon_wagon_kol_os]
--      ,[arrival_uz_vagon_wagon_usl_tip]
--      ,[arrival_uz_vagon_wagon_date_rem_uz]
--      ,[arrival_uz_vagon_wagon_date_rem_vag]
--      ,[arrival_uz_vagon_id_condition]
--      ,[arrival_uz_vagon_condition_name_ru]
--      ,[arrival_uz_vagon_condition_name_en]
--      ,[arrival_uz_vagon_condition_abbr_ru]
--      ,[arrival_uz_vagon_condition_abbr_en]
--      ,[arrival_uz_vagon_condition_repairs]
--      ,[arrival_uz_vagon_id_wagons_rent_arrival]
--      ,[arrival_uz_vagon_arrival_wagons_rent_id_operator]
--      ,[arrival_uz_vagon_arrival_wagons_rent_operators_ru]
--      ,[arrival_uz_vagon_arrival_wagons_rent_operators_en]
--      ,[arrival_uz_vagon_arrival_wagons_rent_operator_abbr_ru]
--      ,[arrival_uz_vagon_arrival_wagons_rent_operator_abbr_en]
--      ,[arrival_uz_vagon_arrival_wagons_rent_start]
--      ,[arrival_uz_vagon_arrival_wagons_rent_end]
--      ,[arrival_uz_vagon_arrival_wagons_rent_operator_paid]
--      ,[arrival_uz_vagon_arrival_wagons_rent_operator_color]
--      ,[arrival_uz_vagon_arrival_wagons_rent_id_limiting]
--      ,[arrival_uz_vagon_arrival_wagons_rent_limiting_name_ru]
--      ,[arrival_uz_vagon_arrival_wagons_rent_limiting_name_en]
--      ,[arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_ru]
--      ,[arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_en]
--      ,[arrival_uz_vagon_id_type]
--      ,[arrival_uz_vagon_type_ru]
--      ,[arrival_uz_vagon_type_en]
--      ,[arrival_uz_vagon_gruzp]
--      ,[arrival_uz_vagon_u_tara]
--      ,[arrival_uz_vagon_ves_tary_arc]
--      ,[arrival_uz_vagon_gruzp_uz]
--      ,[arrival_uz_vagon_tara_uz]
--      ,[arrival_uz_vagon_route]
--      ,[arrival_uz_vagon_note_vagon]
--      ,[arrival_uz_vagon_id_cargo]
--      ,[arrival_uz_vagon_cargo_name_ru]
--      ,[arrival_uz_vagon_cargo_name_en]
--      ,[arrival_uz_vagon_id_group]
--      ,[arrival_uz_vagon_cargo_group_name_ru]
--      ,[arrival_uz_vagon_cargo_group_name_en]
--      ,[arrival_uz_vagon_id_cargo_etsng]
--      ,[arrival_uz_vagon_cargo_etsng_code]
--      ,[arrival_uz_vagon_cargo_etsng_name_ru]
--      ,[arrival_uz_vagon_cargo_etsng_name_en]
--      ,[arrival_uz_vagon_id_cargo_gng]
--      ,[arrival_uz_vagon_cargo_gng_code]
--      ,[arrival_uz_vagon_cargo_gng_name_ru]
--      ,[arrival_uz_vagon_cargo_gng_name_en]
--      ,[arrival_uz_vagon_id_certification_data]
--      ,[arrival_uz_vagon_sertification_data_ru]
--      ,[arrival_uz_vagon_sertification_data_en]
--      ,[arrival_uz_vagon_id_commercial_condition]
--      ,[arrival_uz_vagon_commercial_condition_ru]
--      ,[arrival_uz_vagon_commercial_condition_en]
--      ,[arrival_uz_vagon_zayava]
--      ,[arrival_uz_vagon_kol_pac]
--      ,[arrival_uz_vagon_pac]
--      ,[arrival_uz_vagon_vesg]
--      ,[arrival_uz_vagon_vesg_reweighing]
--      ,[arrival_uz_vagon_nom_zpu]
--      ,[arrival_uz_vagon_danger]
--      ,[arrival_uz_vagon_danger_kod]
--      ,[arrival_uz_vagon_cargo_returns]
--      ,[arrival_uz_vagon_id_station_on_amkr]
--      ,[arrival_uz_vagon_station_amkr_name_ru]
--      ,[arrival_uz_vagon_station_amkr_name_en]
--      ,[arrival_uz_vagon_station_amkr_abbr_ru]
--      ,[arrival_uz_vagon_station_amkr_abbr_en]
--      ,[arrival_uz_vagon_id_division_on_amkr]
--      ,[arrival_uz_vagon_division_code]
--      ,[arrival_uz_vagon_name_division_ru]
--      ,[arrival_uz_vagon_name_division_en]
--      ,[arrival_uz_vagon_division_abbr_ru]
--      ,[arrival_uz_vagon_division_abbr_en]
--      ,[arrival_uz_vagon_id_type_devision]
--      ,[arrival_uz_vagon_empty_car]
--      ,[arrival_uz_vagon_kol_conductor]
--      ,[arrival_uz_vagon_manual]
--      ,[arrival_uz_vagon_pay_summa]
--      ,[arrival_uz_vagon_create]
--      ,[arrival_uz_vagon_create_user]
--      ,[arrival_uz_vagon_change]
--      ,[arrival_uz_vagon_change_user]
--      ,[arrival_uz_document_id]
--      ,[arrival_uz_document_id_doc_uz]
--      ,[arrival_uz_document_nom_doc]
--      ,[arrival_uz_document_nom_main_doc]
--      ,[arrival_uz_document_code_stn_from]
--      ,[arrival_uz_document_station_from_name_ru]
--      ,[arrival_uz_document_station_from_name_en]
--      ,[arrival_uz_document_from_code_inlandrailway]
--      ,[arrival_uz_document_from_inlandrailway_name_ru]
--      ,[arrival_uz_document_from_inlandrailway_name_en]
--      ,[arrival_uz_document_from_inlandrailway_abbr_ru]
--      ,[arrival_uz_document_from_inlandrailway_abbr_en]
--      ,[arrival_uz_document_from_code_railway]
--      ,[arrival_uz_document_code_stn_to]
--      ,[arrival_uz_document_station_to_name_ru]
--      ,[arrival_uz_document_station_to_name_en]
--      ,[arrival_uz_document_to_code_inlandrailway]
--      ,[arrival_uz_document_to_inlandrailway_name_ru]
--      ,[arrival_uz_document_to_inlandrailway_name_en]
--      ,[arrival_uz_document_to_inlandrailway_abbr_ru]
--      ,[arrival_uz_document_to_inlandrailway_abbr_en]
--      ,[arrival_uz_document_to_code_railway]
--      ,[arrival_uz_document_code_border_checkpoint]
--      ,[arrival_uz_document_border_checkpoint_station_name_ru]
--      ,[arrival_uz_document_border_checkpoint_station_name_en]
--      ,[arrival_uz_document_border_checkpoint_code_inlandrailway]
--      ,[arrival_uz_document_cross_time]
--      ,[arrival_uz_document_code_shipper]
--      ,[arrival_uz_document_shipper_name_ru]
--      ,[arrival_uz_document_shipper_name_en]
--      ,[arrival_uz_document_code_consignee]
--      ,[arrival_uz_document_name_consignee]
--      ,[arrival_uz_document_klient]
--      ,[arrival_uz_document_code_payer_sender]
--      ,[arrival_uz_document_payer_sender_name_ru]
--      ,[arrival_uz_document_payer_sender_name_en]
--      ,[arrival_uz_document_code_payer_arrival]
--      ,[arrival_uz_document_payer_arrival_name_ru]
--      ,[arrival_uz_document_payer_arrival_name_en]
--      ,[arrival_uz_document_distance_way]
--      ,[arrival_uz_document_note]
--      ,[arrival_uz_document_parent_id]
--      ,[arrival_uz_document_manual]
--      ,[sap_incoming_supply_num]
--      ,[sap_incoming_supply_pos]
--      ,[sap_incoming_supply_date]
--      ,[sap_incoming_supply_time]
--      ,[sap_incoming_supply_warehouse_code]
--      ,[sap_incoming_supply_warehouse_name]
--      ,[sap_incoming_supply_warehouse_code_10]
--      ,[sap_incoming_supply_warehouse_name_10]
--      ,[sap_incoming_supply_cargo_code]
--      ,[sap_incoming_supply_cargo_name]
--      ,[sap_incoming_supply_works]
--      ,[sap_incoming_supply_ship]
--      ,[sap_incoming_supply_ban]
--      ,[instructional_letters_num]
--      ,[instructional_letters_datetime]
--      ,[instructional_letters_station_code]
--      ,[instructional_letters_station_name]
--      ,[instructional_letters_note]
--from [IDS].[get_view_incoming_cars_of_period](@start, @stop)

DECLARE @laden bit-- = 1 -- Только с грузом
DECLARE @accounting bit --= 1 -- Учетные вагоны
DECLARE @client bit --= 1 -- Учетные вагоны
DECLARE @not_client bit --= 1 -- Учетные вагоны
DECLARE @paid bit --= 1 -- Учетные вагоны

DECLARE @nums  sysname
DECLARE @nom_main_docs  sysname
DECLARE @nom_docs  sysname

DECLARE @id_operator  sysname --= '1217, 1203'
DECLARE @id_limiting   sysname
DECLARE @id_owner   sysname
DECLARE @code_stn_from   sysname
DECLARE @id_cargo   sysname
DECLARE @id_certification_data   sysname
DECLARE @supply_cargo_code   sysname
DECLARE @id_group_cargo   sysname
DECLARE @code_consignee   sysname
DECLARE @id_division   sysname
DECLARE @id_genus   sysname
DECLARE @id_condition   sysname
DECLARE @code_payer_arrival   sysname
DECLARE @code_payer_arrival_name   sysname
DECLARE @id_station_on   sysname

DECLARE @SQLString NVARCHAR(max);  
DECLARE @ParmDefinition NVARCHAR(1000); 
DECLARE @laden_code  sysname = '11,16,20' -- список кодов групп грузов пустых вагонов


SET @SQLString = N'SELECT * from [IDS].[get_view_incoming_cars_of_period](@start, @stop) WHERE num is not null'
-- только груженные
if (@laden = 1) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_group not in ('+ @laden_code +')';  
end
-- учетные
if (@accounting = 1) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_document_klient <> 1 AND (arrival_uz_vagon_arrival_wagons_rent_id_operator is null OR (NOT (arrival_uz_vagon_arrival_wagons_rent_id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in (''amkr'', ''amkr_vz''))) AND NOT (arrival_uz_vagon_arrival_wagons_rent_id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in (''cisterns'')) and arrival_uz_vagon_rod = 70)))';  
end
-- Клиентура
if (@client = 1 AND (@not_client <>1 or @not_client is null)) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_document_klient = 1';  
end
-- Без учета клиентуры
if ((@client <> 1 or @client is null)  AND @not_client = 1) begin
  SET @SQLString = @SQLString + ' AND arrival_uz_document_klient <> 1'; 
end
-- Платные
if (@paid = 1) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_arrival_wagons_rent_operator_paid = 1';  
end

if (@nums is not null) begin
	SET @SQLString = @SQLString + ' AND num in ('+ @nums +')';  
end
if (@nom_main_docs is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_document_nom_main_doc in ('+ @nom_main_docs +')';  
end
if (@nom_docs is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_document_nom_doc in ('+ @nom_docs +')';  
end

if (@id_operator is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_arrival_wagons_rent_id_operator in ('+ @id_operator +')';  
end

if (@id_limiting is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_arrival_wagons_rent_id_limiting in ('+ @id_limiting +')';  
end

if (@id_owner is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_owner in ('+ @id_owner +')';  
end

if (@code_stn_from is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_document_code_stn_from in ('+ @code_stn_from +')';  
end

if (@id_cargo is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_cargo in ('+ @id_cargo +')';  
end

if (@id_certification_data is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_certification_data in ('+ @id_certification_data +')';  
end

if (@supply_cargo_code is not null) begin
	SET @SQLString = @SQLString + ' AND sap_incoming_supply_cargo_code in ('+ @supply_cargo_code +')';  
end

if (@id_group_cargo is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_group in ('+ @id_group_cargo +')';  
end

if (@code_consignee is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_document_code_consignee in ('+ @code_consignee +')';  
end

if (@id_division is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_division_on_amkr in ('+ @id_division +')';  
end

if (@id_genus is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_genus in ('+ @id_genus +')';  
end

if (@id_condition is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_condition in ('+ @id_condition +')';  
end

if (@code_payer_arrival is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_document_code_payer_arrival in ('+ @code_payer_arrival +')';  
end

if (@code_payer_arrival_name is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_document_code_payer_arrival in ('+ @code_payer_arrival_name +')';  
end

if (@id_station_on is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_sostav_id_station_on in ('+ @id_station_on +')';  
end

	SET @SQLString = @SQLString + ' order by arrival_sostav_date_adoption';  

print(@SQLString);
SET @ParmDefinition = N'@start datetime, @stop datetime';  
  
EXECUTE sp_executesql @SQLString, @ParmDefinition, @start = @start, @stop=@stop;  
