
--EXEC sp_change_users_login 'Update_One', 'HP_EDIK\edik', 'HP_EDIK\edik'; 

-- Смотрим кто владелец базы
SELECT p.name, p.sid, p.type_desc FROM
sys.databases AS d LEFT OUTER JOIN sys.server_principals AS p ON
d.owner_sid = p.sid 
WHERE d.name = N'KRR-PA-CNT-Railway'

-- Смотрим кто владелец базы
SELECT CAST(owner_sid as uniqueidentifier) AS Owner_SID   
FROM sys.databases   
WHERE name = 'KRR-PA-CNT-Railway';  
--WHERE name = 'dp9';  

--SELECT SUSER_SID('sa');
--SELECT SUSER_SID('HP_EDIK\edik');
--SELECT SUSER_SID('dbo');
SELECT SUSER_SID('DESKTOP-KHSSI53\user');

--> Этой командой привязываем нового
--ALTER AUTHORIZATION ON DATABASE ::[KRR-PA-CNT-Railway] TO [DESKTOP-KHSSI53\user]