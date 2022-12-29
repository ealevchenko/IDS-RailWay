use [KRR-PA-CNT-Railway]

declare @start datetime = Convert(datetime, '2022-12-01 00:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-12-29 23:59:59', 120)

	declare @laden bit = null
	declare @accounting bit = null
	declare @client bit = null
	declare @not_client bit = null
	declare @paid bit = null
	declare @nums  sysname = null
	declare @nom_main_docs  sysname = null --'47314117'
	declare @id_operator  sysname = null --'38' 
	declare @id_limiting   sysname = null --'54'
	declare @id_owner   sysname = null --'15,92'
	declare @id_genus   sysname = null
	declare @id_out_division sysname = null -- '1'
	declare @id_out_cargo   sysname = null -- '85,32'
	declare @id_out_cargo_group sysname = null -- '26,9'
	declare @out_sap_cargo_code sysname = null -- '311065'
	declare @out_code_ext_station_to sysname = null -- '344707,410400' 
	declare @out_code_inlandrailway_to sysname = null -- '103,40'
	declare @out_code_border_checkpoint sysname = null -- '352609'
	declare @id_arr_cargo sysname = null -- '28'
	declare @id_certification_data sysname = null -- '175'
	declare @id_arr_cargo_group sysname = null -- '11'
	declare @id_arr_condition sysname = null -- '70,71'
	declare @id_arr_division sysname = null -- '8'
	declare @id_station_from sysname = null -- '27'
	declare @code_payer_sender_name sysname = null -- '8134292'
	declare @code_payer_sender sysname = null -- '8134292'
-----------------------------------------------------------------------------

DECLARE @SQLString NVARCHAR(max);  
DECLARE @ParmDefinition NVARCHAR(1000); 
DECLARE @laden_code  sysname = '11,16,20' -- список кодов групп грузов пустых вагонов

-- !Выборка без возвратов (arrival_uz_vagon_cargo_returns is null)
SET @SQLString = N'SELECT * from [IDS].[get_view_outgoing_cars_of_period](@start, @stop) WHERE num is not null '
-- только груженные
if (@laden = 1) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_id_group not in ('+ @laden_code +')';  
end
-- учетные
if (@accounting = 1) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_document_klient <> 1 AND (outgoing_uz_vagon_outgoing_wagons_rent_id_operator is null OR (NOT (outgoing_uz_vagon_outgoing_wagons_rent_id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in (''amkr'', ''amkr_vz''))) AND NOT (outgoing_uz_vagon_outgoing_wagons_rent_id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in (''cisterns'')) and outgoing_uz_vagon_rod = 70)))';  
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
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_outgoing_wagons_rent_operator_paid = 1';  
end
-- Номера вагонов
if (@nums is not null) begin
	SET @SQLString = @SQLString + ' AND num in ('+ @nums +')';  
end
-- Номера накладных
if (@nom_main_docs is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_document_nom_doc in ('+ @nom_main_docs +')';  
end
-- Операторы вагонов по отправке
if (@id_operator is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_outgoing_wagons_rent_id_operator in ('+ @id_operator +')';  
end
-- Ограничение по отправке
if (@id_limiting is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_outgoing_wagons_rent_id_limiting in ('+ @id_limiting +')';  
end
-- Владелцы по отправке
if (@id_owner is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_id_owner in ('+ @id_owner +')';  
end
-- Род вагона
if (@id_genus is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_id_genus in ('+ @id_genus +')';  
end
--Цех погрузки
if (@id_out_division is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_id_division in ('+ @id_out_division +')';  
end
--Груз ОТПР
if (@id_out_cargo is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_id_cargo in ('+ @id_out_cargo +')';  
end
-- Группа ОТПР
if (@id_out_cargo_group is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_id_group in ('+ @id_out_cargo_group +')';  
end
-- Груз ОТПР SAP
if (@out_sap_cargo_code is not null) begin
	SET @SQLString = @SQLString + ' AND sap_outgoing_supply_cargo_code in ('+ @out_sap_cargo_code +')';  
end
-- Станция назначения
if (@out_code_ext_station_to is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_document_code_stn_to in ('+ @out_code_ext_station_to +')';  
end
-- Дорога
if (@out_code_inlandrailway_to is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_document_to_code_inlandrailway in ('+ @out_code_inlandrailway_to +')';  
end
-- Погран.переход
if (@out_code_border_checkpoint is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_document_code_border_checkpoint in ('+ @out_code_border_checkpoint +')';  
end
-- Груз ПРИБ
if (@id_arr_cargo is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_cargo in ('+ @id_arr_cargo +')';  
end
-- Сертификатные данные
if (@id_certification_data is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_certification_data in ('+ @id_certification_data +')';  
end
-- Группа ПРИБ.
if (@id_arr_cargo_group is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_group in ('+ @id_arr_cargo_group +')';  
end
-- Разметка по прибытию
if (@id_arr_condition is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_condition in ('+ @id_arr_condition +')';  
end
-- Цех-получатель
if (@id_arr_division is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_division_on_amkr in ('+ @id_arr_division +')';  
end
-- Станция примыкания ОТПР
if (@id_station_from is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_sostav_id_station_from in ('+ @id_station_from +')';  
end
-- Плательщик ОТПР
if (@code_payer_sender_name is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_document_code_payer in ('+ @code_payer_sender_name +')';  
end
-- Код плат.ОТПР
if (@code_payer_sender is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_document_code_payer in ('+ @code_payer_sender +')';  
end

SET @SQLString = @SQLString + ' order by outgoing_sostav_date_readiness_uz';  

--print(@SQLString);
SET @ParmDefinition = N'@start datetime, @stop datetime';  
  
EXECUTE sp_executesql @SQLString, @ParmDefinition, @start = @start, @stop=@stop;  