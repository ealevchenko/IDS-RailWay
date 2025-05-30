USE [KRR-PA-CNT-Railway]
GO

/****** Получить id_wim первого вхождения необходимой подачи ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_last_id_wim_filing_of_type](@id_wir bigint, @id_wim bigint, @type int) 
	RETURNS bigint
	AS
	BEGIN 
	RETURN (SELECT top(1) wim_f.[id] FROM [IDS].[WagonInternalMovement] as wim_f Left JOIN [IDS].[WagonFiling] as wf ON wf.id = wim_f.[id_filing]
		where wim_f.[id_wagon_internal_routes]=@id_wir and wim_f.[id_filing] is not null and wim_f.id < @id_wim and wf.type_filing = @type)
	END
GO


