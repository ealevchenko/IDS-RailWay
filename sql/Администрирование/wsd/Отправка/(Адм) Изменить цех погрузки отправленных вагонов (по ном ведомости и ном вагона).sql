use [KRR-PA-CNT-Railway]
declare @num_doc int =  1291   

SELECT id,[id_division] 
  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon]
  where id in (select out_car.id_outgoing_uz_vagon 
  FROM [IDS].[OutgoingSostav] as out_sost Left JOIN [IDS].[OutgoingCars] as out_car ON out_sost.id = out_car.id_outgoing 
  where out_sost.[num_doc]=@num_doc  
  --where out_sost.id = 231989
  and  out_car.num in (67638023  ))
  
--  UPDATE [IDS].[Outgoing_UZ_Vagon]
--   SET [id_division] = 35

-- WHERE id in (633935)
--GO

SELECT TOP (1000) [id]
      ,[position]
      ,[name_division_ru]
      ,[name_division_en]
      ,[division_abbr_ru]
      ,[division_abbr_en]
      ,[id_type_devision]
      ,[code]
      ,[old]
      ,[parent_id]
  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Divisions]