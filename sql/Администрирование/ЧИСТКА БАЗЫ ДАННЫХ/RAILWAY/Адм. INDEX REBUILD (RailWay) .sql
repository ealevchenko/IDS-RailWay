use [KRR-PA-CNT-Railway]
--select * from sys.indexes

DECLARE @SQL NVARCHAR(MAX) = '';
SELECT @SQL += 'ALTER INDEX ' + QUOTENAME(name) + ' ON ' + QUOTENAME(OBJECT_SCHEMA_NAME(object_id)) + '.' + QUOTENAME(OBJECT_NAME(object_id)) + ' REBUILD;' + CHAR(10)
FROM sys.indexes
WHERE index_id > 0 AND OBJECTPROPERTY(object_id, 'IsUserTable') = 1;

print @SQL
EXEC sp_executesql @SQL;

--EXEC sp_updatestats;