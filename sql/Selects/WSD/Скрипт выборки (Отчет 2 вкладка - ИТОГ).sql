use [KRR-PA-CNT-Railway]
declare @start datetime = convert(datetime,'2023-09-01 20:00:00',120)
declare @stop datetime = convert(datetime,'2023-09-30 20:00:00',120)
--declare @date datetime = convert(datetime,'2023-09-01 20:00:00',120)

if OBJECT_ID(N'TempDB..#operating_balance', N'U')  IS NOT NULL
	DROP TABLE #operating_balance
CREATE TABLE #operating_balance(
	[dt] [datetime] not null,
	[num] [int] NOT NULL,
	[group] [nvarchar](20) NULL,
	[id_operator] [int] NULL,
	[paid] [bit] NULL
) --ON [PRIMARY]

--insert into #operating_balance
--select @date , [num], [group], [id_operator], [current_wagons_rent_operator_paid]
--from [IDS].[get_view_cur_ob_of_date](@date)

	--select 
	--[total]=(select Count(num) from #operating_balance)
	--,[external] = (select Count(num) from #operating_balance where [paid] = 1 OR ([group] is null and [paid] = 0))
	--,[paid] = (select Count(num) from #operating_balance where [paid] = 1)
	--,[accounting] = (select Count(num) from #operating_balance where [group] is null and [paid] = 0)
	--,[amkr] = (select Count(num) from #operating_balance where [group] IN (N'amkr', N'cisterns'))

	declare @date datetime = @start
	insert into #operating_balance
	select @date , [num], [group], [id_operator], [current_wagons_rent_operator_paid]
	from [IDS].[get_view_cur_ob_of_date](@date)

	select 
	[total]=(select Count(num) from #operating_balance)
	,[external] = (select Count(num) from #operating_balance where [paid] = 1 OR ([group] is null and [paid] = 0))
	,[paid] = (select Count(num) from #operating_balance where [paid] = 1)
	,[accounting] = (select Count(num) from #operating_balance where [group] is null and [paid] = 0)
	,[amkr] = (select Count(num) from #operating_balance where [group] IN (N'amkr', N'cisterns'))

	--WHILE @date <= @stop
 --   BEGIN
 --       --select @date
	--	insert into #operating_balance
	--	select @date, [num], [group], [id_operator], [current_wagons_rent_operator_paid]
	--	from [IDS].[get_view_cur_ob_of_date](@date)
 --       SET @date = DATEADD(day,1,@date)
 --   END;

		select * from [IDS].[get_view_cur_ob_of_date](@date)
