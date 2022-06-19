USE [KRR-PA-CNT-Railway]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE FUNCTION [IDS].[get_last_manual_epd]() 
	RETURNS int
	AS
	BEGIN 
		declare @number int = (SELECT TOP (1) [number] = CAST(SUBSTRING([num_doc], 3, LEN([num_doc])) AS bigint) FROM [IDS].[UZ_DOC] where [num_doc] like(N'%MA:%') order by CAST(SUBSTRING([num_doc], 4, LEN([num_doc])) AS bigint) desc)

		if (@number is null) 
			BEGIN
				SET @number = 1;
			END ELSE BEGIN 
				SET @number = @number + 1;
			END
			RETURN @number
	END
GO

