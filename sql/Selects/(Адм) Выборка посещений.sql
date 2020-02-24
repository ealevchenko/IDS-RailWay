use [KRR-PA-CNT-Railway]
SELECT 
MAX(date_time) AS N'Последнее', 
user_name, 
COUNT(user_name) AS 'Посещений', 
areas, 
controller, 
action
FROM LOGS.WebVisit
GROUP BY user_name, areas, controller, action
ORDER BY [Последнее] DESC