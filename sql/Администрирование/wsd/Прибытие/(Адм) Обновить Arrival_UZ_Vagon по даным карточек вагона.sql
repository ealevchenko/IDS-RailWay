USE [KRR-PA-CNT-Railway]
GO

/****** ������ ��� ������� SelectTopNRows �� ����� SSMS  ******/
SELECT [id]
      ,[id_document]
      ,[num]
      ,[id_arrival]
      ,[id_car]
      ,[id_condition]
      ,[id_type]
      ,[gruzp]
      ,[u_tara]
      ,[ves_tary_arc]
      ,[route]
      ,[note_vagon]
      ,[id_cargo]
      ,[id_cargo_gng]
      ,[id_certification_data]
      ,[id_commercial_condition]
      ,[kol_pac]
      ,[pac]
      ,[vesg]
      ,[vesg_reweighing]
      ,[nom_zpu]
      ,[danger]
      ,[danger_kod]
      ,[cargo_returns]
      ,[id_station_on_amkr]
      ,[id_division_on_amkr]
      ,[empty_car]
      ,[kol_conductor]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[id_owner]
      ,[id_countrys]
      ,[id_genus]
      ,[kol_os]
      ,[usl_tip]
      ,[date_rem_uz]
      ,[date_rem_vag]
      ,[id_type_ownership]
      ,[gruzp_uz]
      ,[tara_uz]
      ,[zayava]
      ,[manual]
      ,[pay_summa]
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
  where  [id_owner] = 0 and num >50000000
  order by id desc
  go
--UPDATE [IDS].[Arrival_UZ_Vagon] 
--   SET [id_owner] =  (select [id_owner] from [IDS].[Directory_Wagons] where num = [IDS].[Arrival_UZ_Vagon].[num])
-- where  [id_owner] = 0
GO


