use [KRR-PA-CNT-Railway]
declare @num_doc int =  835      

SELECT id,[id_division] 
  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon]
  where id in (select out_car.id_outgoing_uz_vagon 
  FROM [IDS].[OutgoingSostav] as out_sost Left JOIN [IDS].[OutgoingCars] as out_car ON out_sost.id = out_car.id_outgoing 
  where out_sost.[num_doc]=@num_doc  
  --where out_sost.id = 231989
  and  out_car.num in (56969751,56356538,63552772,56471022,52179876,61838819,56103716,63868335,61573861,55635429,65001927,62891700,63821029,64243462,64227044,63867964,56348675,64978737,64054331,60638228,56357940,63116545,64550049,64236755))
  
--  UPDATE [IDS].[Outgoing_UZ_Vagon]
--   SET [id_division] = 31

-- WHERE id in (748056,748057,748058,748059,748060,748061,748062,748063,748064,748065,748066,748067,748068,748069,748070,748071,748072,748073,748074,748075,748076,748077,748078,748079)
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