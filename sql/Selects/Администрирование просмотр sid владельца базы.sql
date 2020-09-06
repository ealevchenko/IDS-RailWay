
--EXEC sp_change_users_login 'Update_One', 'dbo', 'dbo'; 

SELECT p.name, p.sid, p.type_desc FROM
sys.databases AS d LEFT OUTER JOIN sys.server_principals AS p ON
d.owner_sid = p.sid 
WHERE d.name = N'dp9'

SELECT p.name, p.sid, p.type_desc FROM
sys.databases AS d LEFT OUTER JOIN sys.server_principals AS p ON
d.owner_sid = p.sid 
WHERE d.name = N'KRR-PA-CNT-Railway'

--SELECT p.name, p.type_desc FROM
--sys.databases AS d

SELECT CAST(owner_sid as uniqueidentifier) AS Owner_SID   
FROM sys.databases   
WHERE name = 'KRR-PA-CNT-Railway';  
--WHERE name = 'dp9';  