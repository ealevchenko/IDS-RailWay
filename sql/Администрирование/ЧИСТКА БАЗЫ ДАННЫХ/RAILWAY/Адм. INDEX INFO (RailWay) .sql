use [KRR-PA-CNT-Railway]
-- �������� ��������� ��������:
--������������� �������, ���� ������� ������������ ��������� 30%. ���, �� ����, ������ ��������� ��������� ������� "� ����".
--������������� ������� ��� ������������ �� 5% �� 30%, ��� ���������� ���������� ������.
SELECT OBJECT_NAME(ind.OBJECT_ID) AS TableName,
    ind.name AS IndexName, indexstats.index_type_desc AS IndexType,
    indexstats.avg_fragmentation_in_percent
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, NULL) AS indexstats
INNER JOIN sys.indexes AS ind ON ind.object_id = indexstats.object_id
    AND ind.index_id = indexstats.index_id
WHERE indexstats.avg_fragmentation_in_percent > 5
ORDER BY indexstats.avg_fragmentation_in_percent DESC;