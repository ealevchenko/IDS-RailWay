USE [KRR-PA-CNT-Railway]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		�������� �.�
-- Create date: 29.12.2022
-- Description:	�������� ������������ ������ �� �������� ������ � �������
-- =============================================
CREATE PROCEDURE [IDS].[get_view_outgoing_cars_of_where]
		@start datetime,
		@stop datetime,
		@laden bit,
		@accounting bit,
		@client bit,
		@not_client bit,
		@paid bit,
		@nums  sysname,
		@nom_main_docs  sysname,
		@id_operator  sysname,
		@id_limiting   sysname,
		@id_owner   sysname,
		@id_genus   sysname,
		@id_out_division sysname,
		@id_out_cargo   sysname,
		@id_out_cargo_group sysname,
		@out_sap_cargo_code sysname,
		@out_code_ext_station_to sysname,
		@out_code_inlandrailway_to sysname,
		@out_code_border_checkpoint sysname,
		@id_arr_cargo sysname,
		@id_certification_data sysname,
		@id_arr_cargo_group sysname,
		@id_arr_condition sysname,
		@id_arr_division sysname,
		@id_station_from sysname,
		@code_payer_sender_name sysname,
		@code_payer_sender sysname
AS
BEGIN
DECLARE @SQLString NVARCHAR(max);  
DECLARE @ParmDefinition NVARCHAR(1000); 
DECLARE @laden_code  sysname = '11,16,20' -- ������ ����� ����� ������ ������ �������

-- !������� ��� ��������� (arrival_uz_vagon_cargo_returns is null)
SET @SQLString = N'SELECT * from [IDS].[get_view_outgoing_cars_of_period](@start, @stop) WHERE num is not null '
-- ������ ���������
if (@laden = 1) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_id_group not in ('+ @laden_code +')';  
end
-- �������
if (@accounting = 1) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_document_klient <> 1 AND (outgoing_uz_vagon_outgoing_wagons_rent_id_operator is null OR (NOT (outgoing_uz_vagon_outgoing_wagons_rent_id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in (''amkr'', ''amkr_vz''))) AND NOT (outgoing_uz_vagon_outgoing_wagons_rent_id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in (''cisterns'')) and outgoing_uz_vagon_rod = 70)))';  
end
-- ���������
if (@client = 1 AND (@not_client <>1 or @not_client is null)) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_document_klient = 1';  
end
-- ��� ����� ���������
if ((@client <> 1 or @client is null)  AND @not_client = 1) begin
  SET @SQLString = @SQLString + ' AND arrival_uz_document_klient <> 1'; 
end
-- �������
if (@paid = 1) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_outgoing_wagons_rent_operator_paid = 1';  
end
-- ������ �������
if (@nums is not null) begin
	SET @SQLString = @SQLString + ' AND num in ('+ @nums +')';  
end
-- ������ ���������
if (@nom_main_docs is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_document_nom_doc in ('+ @nom_main_docs +')';  
end
-- ��������� ������� �� ��������
if (@id_operator is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_outgoing_wagons_rent_id_operator in ('+ @id_operator +')';  
end
-- ����������� �� ��������
if (@id_limiting is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_outgoing_wagons_rent_id_limiting in ('+ @id_limiting +')';  
end
-- �������� �� ��������
if (@id_owner is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_id_owner in ('+ @id_owner +')';  
end
-- ��� ������
if (@id_genus is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_id_genus in ('+ @id_genus +')';  
end
--��� ��������
if (@id_out_division is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_id_division in ('+ @id_out_division +')';  
end
--���� ����
if (@id_out_cargo is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_id_cargo in ('+ @id_out_cargo +')';  
end
-- ������ ����
if (@id_out_cargo_group is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_vagon_id_group in ('+ @id_out_cargo_group +')';  
end
-- ���� ���� SAP
if (@out_sap_cargo_code is not null) begin
	SET @SQLString = @SQLString + ' AND sap_outgoing_supply_cargo_code in ('+ @out_sap_cargo_code +')';  
end
-- ������� ����������
if (@out_code_ext_station_to is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_document_code_stn_to in ('+ @out_code_ext_station_to +')';  
end
-- ������
if (@out_code_inlandrailway_to is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_document_to_code_inlandrailway in ('+ @out_code_inlandrailway_to +')';  
end
-- ������.�������
if (@out_code_border_checkpoint is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_document_code_border_checkpoint in ('+ @out_code_border_checkpoint +')';  
end
-- ���� ����
if (@id_arr_cargo is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_cargo in ('+ @id_arr_cargo +')';  
end
-- ������������� ������
if (@id_certification_data is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_certification_data in ('+ @id_certification_data +')';  
end
-- ������ ����.
if (@id_arr_cargo_group is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_group in ('+ @id_arr_cargo_group +')';  
end
-- �������� �� ��������
if (@id_arr_condition is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_condition in ('+ @id_arr_condition +')';  
end
-- ���-����������
if (@id_arr_division is not null) begin
	SET @SQLString = @SQLString + ' AND arrival_uz_vagon_id_division_on_amkr in ('+ @id_arr_division +')';  
end
-- ������� ���������� ����
if (@id_station_from is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_sostav_id_station_from in ('+ @id_station_from +')';  
end
-- ���������� ����
if (@code_payer_sender_name is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_document_code_payer in ('+ @code_payer_sender_name +')';  
end
-- ��� ����.����
if (@code_payer_sender is not null) begin
	SET @SQLString = @SQLString + ' AND outgoing_uz_document_code_payer in ('+ @code_payer_sender +')';  
end

SET @SQLString = @SQLString + ' order by outgoing_sostav_date_readiness_uz';  

--print(@SQLString);
SET @ParmDefinition = N'@start datetime, @stop datetime';  
  
EXECUTE sp_executesql @SQLString, @ParmDefinition, @start = @start, @stop=@stop;   
END



GO


