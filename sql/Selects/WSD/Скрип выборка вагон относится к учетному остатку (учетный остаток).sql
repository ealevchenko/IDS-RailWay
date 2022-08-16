declare @id_operator int = 111;
declare @rod_uz int = 70;


declare @result int;
declare @result1 int;

set @result = (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr', 'amkr_vz') and [id_operator] = @id_operator)
set @result1 = (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('cisterns') and [id_operator] = @id_operator and @rod_uz =70)

if (@result is null and @result1 is null)
begin 
 select 1;
end else begin
 select 0;
end


--

--)) AND NOT (dir_rent.id_operator IN (SELECT [id_operator]  FROM [IDS].[Directory_OperatorsWagonsGroup] where [group] in ('cisterns')) and dir_rod.rod_uz = 70)))