USE [KRR-PA-CNT-Railway]
GO

DECLARE	@return_value int
declare @start datetime = Convert(datetime, '2022-08-01 00:00:00', 120)
declare @stop datetime = Convert(datetime, '2022-08-09 23:59:59', 120)

EXEC	@return_value = [IDS].[get_view_incoming_cars_of_where]
		@start = @start,
		@stop = @stop

SELECT	'Return Value' = @return_value

GO
