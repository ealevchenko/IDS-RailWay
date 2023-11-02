use [KRR-PA-CNT-Railway]
/****** Script for SelectTopNRows command from SSMS  ******/
declare @code int = 423010;

SELECT TOP (1000) [id]
      ,[code]
      ,[cargo_etsng_name_ru]
      ,[cargo_etsng_name_en]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_CargoETSNG]
  where [code]=@code

  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[id_group]
      ,[id_cargo_etsng]
      ,[cargo_name_ru]
      ,[cargo_name_en]
      ,[code_sap]
      ,[sending]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[id_out_group]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Cargo]
  where [id_cargo_etsng] = (select id FROM [IDS].[Directory_CargoETSNG] where [code]=@code)

  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[cargo_group_name_ru]
      ,[cargo_group_name_en]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_CargoGroup]
  where [id] = (select [id_group] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Cargo] where [id_cargo_etsng] = (select id FROM [IDS].[Directory_CargoETSNG] where [code]=@code) )

  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[cargo_group_name_ru]
      ,[cargo_group_name_en]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_CargoOutGroup] 
  where [id] = (select [id_out_group] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Cargo] where [id_cargo_etsng] = (select id FROM [IDS].[Directory_CargoETSNG] where [code]=@code) )
