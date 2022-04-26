/****** Script for SelectTopNRows command from SSMS  ******/
	  declare @FirstNumber int = 53550521--53436440	тест если начинается не первым			-- First wagon from shipment 
      declare @LastNumber	int	= 56267057				-- Last  wagon from shipment
	  declare @Count int = 39--40 тест если начинается не первым

	----SELECT top(1) 
	----cars.[id_sostav]
	----,first_position = (select cars_first.position FROM [METRANS].[ArrivalCars] as cars_first where cars_first.[id_sostav] = cars.[id_sostav] and cars_first.num = @FirstNumber)
	----,last_position = (select cars_last.position FROM [METRANS].[ArrivalCars] as cars_last where cars_last.[id_sostav] = cars.[id_sostav] and cars_last.num = @LastNumber)
	----FROM [METRANS].[ArrivalCars] as cars
	----where cars.num in (@FirstNumber, @LastNumber)
	----group by cars.[id_sostav]
	----HAVING count(cars.[id_sostav])>1 
	----and ABS((select cars_first.position FROM [METRANS].[ArrivalCars] as cars_first where cars_first.[id_sostav] = cars.[id_sostav] and cars_first.num = @FirstNumber)-(select cars_last.position FROM [METRANS].[ArrivalCars] as cars_last where cars_last.[id_sostav] = cars.[id_sostav] and cars_last.num = @LastNumber)) = @Count -1
	------(select count(cars1.[num]) FROM [METRANS].[ArrivalCars] as cars1 where cars1.[id_sostav] = cars.[id_sostav]) = @Count
	----order by cars.[id_sostav] desc
 -- --select cars_first.position FROM [METRANS].[ArrivalCars] as cars_first where cars_first.[id_sostav] = 30213 and cars_first.num = @FirstNumber
 -- --select cars_last.position FROM [METRANS].[ArrivalCars] as cars_last where cars_last.[id_sostav] = 30213 and cars_last.num = @LastNumber

 -- --select abs(-30)
  
 ---- select num, position FROM [METRANS].[ArrivalCars] as cars_list where cars_list.[id_sostav] = (	SELECT top(1) cars.[id_sostav] 
	----FROM [METRANS].[ArrivalCars] as cars
	----where cars.num in (@FirstNumber, @LastNumber)
	----group by cars.[id_sostav]
	----HAVING count(cars.[id_sostav])>1 and (select count(cars1.[num]) FROM [METRANS].[ArrivalCars] as cars1 where cars1.[id_sostav] = cars.[id_sostav]) = @Count
	----order by cars.[id_sostav] desc)

  declare  @ArrivalCars TABLE(
			[num] [int] NOT NULL,
			[position] [int] NOT NULL)

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
		select num, 
		ROW_NUMBER() OVER(ORDER BY position desc) AS pos
		FROM [METRANS].[ArrivalCars] as cars_list where cars_list.[id_sostav] = @id_sostav and cars_list.[position] >=@last_position and cars_list.[position]<=@first_position order by position desc
	end else begin 
		select num, 
        ROW_NUMBER() OVER(ORDER BY position asc) AS pos
		FROM [METRANS].[ArrivalCars] as cars_list where cars_list.[id_sostav] = @id_sostav and cars_list.[position] >=@first_position and cars_list.[position]<=@last_position order by position
	end
	
	




