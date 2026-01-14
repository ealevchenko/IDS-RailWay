use [KRR-PA-CNT-Railway]
SELECT Size/128.0, * from sys.database_files

SELECT Size/128.0
FROM sys.database_files (NOLOCK) where (sys.database_files.name='KRR-PA-CNT-Railcars-New')

declare @fsize bigint
--while datepart(hh,getdate())<22 
--begin -- only during day hous
  SELECT   @fsize = Size/128.0 --AS [TotalSize in MB]
  FROM sys.database_files  (NOLOCK) where (sys.database_files.name='KRR-PA-CNT-Railcars-New')
  OPTION (RECOMPILE)
  set @fsize=@fsize-1000
  print @fsize
  DBCC SHRINKFILE (N'KRR-PA-CNT-Railcars-New' , @fsize)
  print 'Ok';
  --waitfor delay '00:02:00' -- when commented, shrinks aggresively
  --end