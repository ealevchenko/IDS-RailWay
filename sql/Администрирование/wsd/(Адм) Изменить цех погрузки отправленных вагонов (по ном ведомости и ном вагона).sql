declare @num_doc int =  141

SELECT id,[id_division] 
  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon]
  where id in (select out_car.id_outgoing_uz_vagon FROM [IDS].[OutgoingSostav] as out_sost Left JOIN [IDS].[OutgoingCars] as out_car ON out_sost.id = out_car.id_outgoing where out_sost.[num_doc]=@num_doc  and  out_car.num in (63375968,63530463,63376446,63532659,56195522,63663082,63531545,63663520,63664114,63530083,63664148,63530901,63531370,63663421))

 -- UPDATE [IDS].[Outgoing_UZ_Vagon]
 --  SET [id_division] = 36

 --WHERE id in (545333,545334,545335,545336,545337,545338,545339,545340,545341,545342,545343,545344,545345,545346)
GO