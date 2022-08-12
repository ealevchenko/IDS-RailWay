USE [KRR-PA-CNT-Railway]
GO

/****** Object:  StoredProcedure [IDS].[get_arrival_sostav_of_period]    Script Date: 09.08.2022 13:11:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		Левченко Э.А
-- Create date: 09.08.2022
-- Description:	Показать принятые вагоны за указаный период с выбором
-- =============================================
CREATE PROCEDURE [IDS].[get_view_incoming_cars_of_where]
	@start datetime,
	@stop datetime,
	@laden bit = null,
    @accounting bit = null,
	@client bit = null,
	@not_client bit = null,
	@paid bit = null,
	@nums  sysname = null,
	@nom_main_docs  sysname = null,
	@nom_docs  sysname = null,
	@id_operator  sysname = null,
	@id_limiting   sysname = null,
	@id_owner   sysname = null,
	@code_stn_from   sysname = null,
	@id_cargo   sysname = null,
	@id_certification_data   sysname = null,
	@supply_cargo_code   sysname = null,
	@id_group_cargo   sysname = null,
	@code_consignee   sysname = null,
	@id_division   sysname = null,
	@id_genus   sysname = null,
	@id_condition   sysname = null,
	@code_payer_arrival   sysname = null,
	@code_payer_arrival_name   sysname = null,
	@id_station_on   sysname = null
AS
BEGIN
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

print(@SQLString);
SET @ParmDefinition = N'@start datetime, @stop datetime';  
  
EXECUTE sp_executesql @SQLString, @ParmDefinition, @start = @start, @stop=@stop;  
END



GO


