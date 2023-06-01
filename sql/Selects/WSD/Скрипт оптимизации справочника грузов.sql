/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[code]
      ,[cargo_etsng_name_ru]
      ,[cargo_etsng_name_en]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_CargoETSNG]
  where [code] =324116
order by [code] desc

  SELECT Count([code]), [code]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_CargoETSNG]
  group by [code]
HAVING Count([code])>1
  order by Count([code]) desc

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
  where [id_cargo_etsng] in (SELECT id FROM [KRR-PA-CNT-Railway].[IDS].[Directory_CargoETSNG] where [code] =324116)

  SELECT [id_cargo] 
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
  where [id_cargo] in (86)
SELECT [id_cargo] 
  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon]
  where [id_cargo] in (86)

  
--UPDATE [IDS].[Arrival_UZ_Vagon]
--   SET [id_cargo] = 48
-- where [id_cargo] in (86)
--GO

--UPDATE [IDS].[Outgoing_UZ_Vagon]
--   SET [id_cargo] = 48
-- where [id_cargo] in (86)
--GO