USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_view_uz_doc_arrival]    Script Date: 26.11.2021 11:15:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






CREATE FUNCTION [IDS].[get_view_uz_doc_sending] ()
	RETURNS 
	@uz_doc_sending TABLE(
		[id_sostav] [bigint] NOT NULL,
		[date_outgoing] [datetime] NULL,
		[date_departure_amkr] [datetime] NULL,
		[status_sostav] [int] NOT NULL,
		[id_car] [bigint] NULL,
		[num] [int] NULL,
		[position_outgoing] [int] NULL,
		[num_doc] [nvarchar](50) NULL,
		[revision] [int] NULL,
		[status] [int] NULL,
		[code_from] [nvarchar](4) NULL,
		[code_on] [nvarchar](4) NULL,
		[dt] [datetime] NULL,
		[num_uz] [int] NULL)
	AS
	BEGIN
	insert @uz_doc_sending
	SELECT 
		-- Состав
		out_sost.[id] as id_sostav
		,out_sost.[date_outgoing]
		,out_sost.[date_departure_amkr]
		,out_sost.[status] as status_sostav
		-- Вагоны
		,out_car.[id] as id_car
		,out_car.[num]
		,out_car.[position_outgoing]
		-- Документы
		,doc_uz.[num_doc]
		,doc_uz.[revision]
		,doc_uz.[status]
		,doc_uz.[code_from]
		,doc_uz.[code_on]
		,doc_uz.[dt]
		--,doc_uz.[xml_doc]
		,doc_uz.[num_uz]
		--into uz_doc_sending
	FROM [IDS].[OutgoingSostav] as out_sost
		Left JOIN [IDS].[OutgoingCars] as out_car ON out_sost.[id] = out_car.[id_outgoing]
  		--> Прибытие вагона
		Left JOIN [IDS].[UZ_DOC_OUT] as doc_uz ON out_car.[num_doc] = doc_uz.[num_doc]
  RETURN
 END
 
GO


