use [KRR-PA-Test-Railway]--[KRR-PA-CNT-Railway]
go
SELECT * 
FROM sys.objects 
WHERE RIGHT(type_desc, 8) = 'FUNCTION'