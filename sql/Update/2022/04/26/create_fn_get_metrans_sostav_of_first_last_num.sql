USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_arrival_sostav]    Script Date: 26.04.2022 11:08:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [IDS].[get_metrans_sostav_of_first_last_num]
 (
 	  @FirstNumber int,
      @LastNumber int,
	  @Count int
 )
	RETURNS 
	@ArrivalCars TABLE(
		[num] [int] NOT NULL,
		[position] [int] NOT NULL
	)
	AS
	BEGIN
	
  declare @id_sostav int = (SELECT top(1) cars.[id_sostav] FROM [METRANS].[ArrivalCars] as cars
	where cars.num in (@FirstNumber, @LastNumber)
	group by cars.[id_sostav]
	HAVING count(cars.[id_sostav])>1 
	and ABS((select cars_first.position FROM [METRANS].[ArrivalCars] as cars_first where cars_first.[id_sostav] = cars.[id_sostav] and cars_first.num = @FirstNumber)-(select cars_last.position FROM [METRANS].[ArrivalCars] as cars_last where cars_last.[id_sostav] = cars.[id_sostav] and cars_last.num = @LastNumber)) = @Count -1
	order by cars.[id_sostav] desc)

	declare @first_position int = (select cars_first.position FROM [METRANS].[ArrivalCars] as cars_first where cars_first.[id_sostav] = @id_sostav and cars_first.num = @FirstNumber)
	declare @last_position int = (select cars_last.position FROM [METRANS].[ArrivalCars] as cars_last where cars_last.[id_sostav] = @id_sostav and cars_last.num = @LastNumber)

	--select @id_sostav, @first_position, @last_position

	if (@first_position>@last_position) begin 
		insert @ArrivalCars
		select num, 
		ROW_NUMBER() OVER(ORDER BY position desc) AS pos
		FROM [METRANS].[ArrivalCars] as cars_list where cars_list.[id_sostav] = @id_sostav and cars_list.[position] >=@last_position and cars_list.[position]<=@first_position order by position desc
	end else begin 
		insert @ArrivalCars
		select num, 
        ROW_NUMBER() OVER(ORDER BY position asc) AS pos
		FROM [METRANS].[ArrivalCars] as cars_list where cars_list.[id_sostav] = @id_sostav and cars_list.[position] >=@first_position and cars_list.[position]<=@last_position order by position
	end
  RETURN
 END

GO


