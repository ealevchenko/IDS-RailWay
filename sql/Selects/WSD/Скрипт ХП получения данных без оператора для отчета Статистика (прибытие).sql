		declare @id_sostav int = 181969

		--SELECT count(arr_car.[id])
		select 
		arr_car.*
		,dir_wagon.*
		,dir_rent.*

		FROM  [IDS].[ArrivalCars] as arr_car 
		--> Справочник вагонов
		Left JOIN IDS.Directory_Wagons as dir_wagon ON arr_car.num = dir_wagon.num
		Left JOIN IDS.Directory_WagonsRent as dir_rent ON dir_rent.id = (SELECT top(1) [id] FROM [IDS].[Directory_WagonsRent] where [num] = arr_car.num and rent_end is null order by [id] desc)
		where arr_car.[id_arrival]=@id_sostav and arr_car.[arrival] is not null 
		AND (dir_rent.id_operator is null or dir_rent.id_operator = 0)
		--and dir_rent.id_operator = 0