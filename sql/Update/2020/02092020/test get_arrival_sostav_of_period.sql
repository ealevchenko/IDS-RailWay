USE [KRR-PA-CNT-Railway]
GO

declare @start datetime = CONVERT(datetime, '2020-06-01 00:00:00',120)
declare @stop datetime = CONVERT(datetime, '2020-07-01 00:00:00',120)

DECLARE	@return_value int

EXEC	@return_value = [IDS].[get_arrival_sostav_of_period]
		@start = @start,
		@stop = @stop

SELECT	'Return Value' = @return_value

GO
