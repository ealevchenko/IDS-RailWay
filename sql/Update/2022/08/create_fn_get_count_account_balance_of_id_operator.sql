USE [KRR-PA-CNT-Railway]
GO
/****** Object:  UserDefinedFunction [IDS].[get_count_account_balance_of_id_operator]    Script Date: 16.08.2022 9:49:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER FUNCTION [IDS].[get_count_account_balance_of_id_operator](@id_operator int, @rod_uz int) 
	RETURNS bit
	AS
	BEGIN 
		declare @result bit;		
		declare @result1 int;
		declare @result2 int;
		SET @result = 0
		set @result1 = (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz') and [id_operator] = @id_operator)
		set @result2 = (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('cisterns') and [id_operator] = @id_operator and @rod_uz =70)
		if (@result1 is null and @result2 is null)
			begin 
				SET @result = 1;
			end
		RETURN @result;
	END
