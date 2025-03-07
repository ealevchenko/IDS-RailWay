use [KRR-PA-CNT-Railway]
declare @num_doc int =  866          

SELECT id,[id_division],[vesg] 
  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon]
  where id in (select out_car.id_outgoing_uz_vagon 
  FROM [IDS].[OutgoingSostav] as out_sost Left JOIN [IDS].[OutgoingCars] as out_car ON out_sost.id = out_car.id_outgoing 
  where out_sost.[num_doc]=@num_doc  
  --where out_sost.id = 231989
  and  out_car.num in (63531321, 63530620, 63532063, 63664775, 63530547, 63531305, 63664361, 63664684, 63532337, 63531685, 63664551, 63532543, 63531842, 63532022, 63662951, 63664346, 63530919, 63530380, 63532410, 63530570, 63532642, 63531925, 63530315, 63531602, 63663108, 63662464, 63531453, 63664627, 63662308, 63376453, 63530943, 63530406, 63664882, 63531404, 63665038, 63531982, 63530232, 63663157, 63531784, 63664635, 63530174, 63664338, 63532352, 63376487, 63663728, 63664510, 63532634, 63532105, 63662738, 63532386, 63532212, 63662720, 63531677, 63376305, 63531487 ))
  
--  UPDATE [IDS].[Outgoing_UZ_Vagon]
--   SET [id_division] = 31

-- WHERE id in (749452,749453,749454,749455,749456,749457,749458,749459,749460,749461,749462,749463,749464,749465,749466,749467,749468,749469,749470,749471,749472,749473,749474,749475,749476,749477,749478,749479,749480,749481,749482,749483,749484,749485,749486,749487,749488,749489,749490,749491,749492,749493,749494,749495,749496,749497,749498,749499,749500,749501,749502,749503,749504,749505,749506)
--GO

--  UPDATE [IDS].[Outgoing_UZ_Vagon]
--   SET [vesg] = 55600

-- WHERE id in (776269)
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
  order by code