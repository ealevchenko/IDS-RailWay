use [KRR-PA-CNT-Railway]
declare @date datetime = '2024-08-01 00:00:00';
delete FROM [LOGS].[Errors]
delete FROM [LOGS].[Events] where [date_time] < @date
delete FROM [LOGS].[WebVisit] where [date_time] < @date
delete FROM [LOGS].[Services] where [start] < @date
delete FROM [LOGS].[WebErrors]
delete FROM [LOGS].[WebVisit] where [date_time] < @date

