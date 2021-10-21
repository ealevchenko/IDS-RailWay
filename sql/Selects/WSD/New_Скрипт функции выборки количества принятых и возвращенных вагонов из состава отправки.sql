use [KRR-PA-Test-Railway]
declare @num_sostav nvarchar(50) = '51-29092021110900'

select count(wim_from.id) FROM IDS.WagonInternalMovement as wim_from --> Дислокация отправка на станцию
	--> Дислокация прибыл на станцию	
Left JOIN IDS.WagonInternalMovement as wim_on ON wim_from.id = wim_on.parent_id
	--> Операция прибыл на станцию
Left JOIN IDS.WagonInternalOperation as wio_on ON wim_on.[id_wio]=wio_on.id 

WHERE wim_from.[num_sostav] = @num_sostav and wio_on.id_operation = 6

