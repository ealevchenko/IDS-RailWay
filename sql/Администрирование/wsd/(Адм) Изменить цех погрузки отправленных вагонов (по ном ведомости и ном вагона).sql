declare @num_doc int =  221

SELECT id,[id_division] 
  FROM [KRR-PA-CNT-Railway].[IDS].[Outgoing_UZ_Vagon]
  where id in (select out_car.id_outgoing_uz_vagon FROM [IDS].[OutgoingSostav] as out_sost Left JOIN [IDS].[OutgoingCars] as out_car ON out_sost.id = out_car.id_outgoing where out_sost.[num_doc]=@num_doc  and  out_car.num in (60633278,61237012,60631611,60418084,52377322,60522125,59782185))

 -- UPDATE [IDS].[Outgoing_UZ_Vagon]
 --  SET [id_division] = 89

 --WHERE id in (555442,555443,555444,555445,555446,555447,555448)
GO

