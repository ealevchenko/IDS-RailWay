declare @num_doc int =  162

SELECT id,[id_division] 
  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon]
  where id in (select out_car.id_outgoing_uz_vagon FROM [IDS].[OutgoingSostav] as out_sost Left JOIN [IDS].[OutgoingCars] as out_car ON out_sost.id = out_car.id_outgoing where out_sost.[num_doc]=@num_doc  and  out_car.num in (56256142,61241261,65569238))

--  UPDATE [IDS].[Outgoing_UZ_Vagon]
--   SET [id_division] = 36

-- WHERE id in (548537,548538,548539)
--GO