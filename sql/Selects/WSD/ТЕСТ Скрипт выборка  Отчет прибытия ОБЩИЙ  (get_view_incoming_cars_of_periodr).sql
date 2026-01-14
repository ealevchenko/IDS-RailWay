declare @start datetime = convert(datetime,'2023-12-01',120);
declare @stop datetime = convert(datetime,'2023-12-31',120);

select * from[IDS].[get_view_incoming_cars_of_period](@start, @stop);