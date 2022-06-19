/****** Script for SelectTopNRows command from SSMS  ******/

declare @number bigint = (SELECT TOP (1) [number] = CAST(SUBSTRING([num_doc], 3, LEN([num_doc])) AS bigint) FROM [KRR-PA-Test-Railway].[IDS].[UZ_DOC] where [num_doc] like(N'%M:%') order by CAST(SUBSTRING([num_doc], 3, LEN([num_doc])) AS bigint) desc)
select @number


SELECT * FROM [KRR-PA-Test-Railway].[IDS].[UZ_DOC] where [num_doc] like(N'%MNL%')