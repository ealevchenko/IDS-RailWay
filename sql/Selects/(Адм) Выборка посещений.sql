use [KRR-PA-CNT-Railway]
SELECT 
MAX(date_time) AS N'���������', 
user_name, 
COUNT(user_name) AS '���������', 
areas, 
controller, 
action
FROM LOGS.WebVisit
GROUP BY user_name, areas, controller, action
ORDER BY [���������] DESC