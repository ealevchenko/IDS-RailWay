use [KRR-PA-CNT-Railway]
declare @id_way int = 225


-- ���� ������� ������� �� �� ���� ��������
select * from [IDS].[get_view_wagons_of_way](@id_way) order by position
