use [KRR-PA-CNT-Railway]
go
SELECT * 
FROM sys.objects 
WHERE RIGHT(type_desc, 8) = 'FUNCTION'

SELECT * 
FROM sys.objects 
WHERE RIGHT(type_desc, 9) = 'PROCEDURE'