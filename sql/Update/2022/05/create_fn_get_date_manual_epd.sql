USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_last_manual_epd]    Script Date: 19.05.2022 16:02:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE FUNCTION [IDS].[get_date_manual_epd](@num_uz int) 
	RETURNS Datetime
	AS
	BEGIN 
		declare @dt datetime = (SELECT top(1) [dt] FROM [IDS].[UZ_DOC] where [num_uz] = @num_uz and [num_doc] like(N'M%') order by dt desc)
		RETURN @dt
	END
GO