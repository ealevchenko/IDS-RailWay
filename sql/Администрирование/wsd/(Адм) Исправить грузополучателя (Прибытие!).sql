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
      ,[id_wagons_rent_arrival]
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
    where [num] in (64569908   )
  order by 1 desc

  SELECT [id]
      ,[id_doc_uz]
      ,[nom_doc]
      ,[nom_main_doc]
      ,[code_stn_from]
      ,[code_stn_to]
      ,[code_border_checkpoint]
      ,[cross_time]
      ,[code_shipper]
      ,[code_consignee]
      ,[klient]
      ,[code_payer_sender]
      ,[code_payer_arrival]
      ,[distance_way]
      ,[note]
      ,[parent_id]
      ,[create]
      ,[create_user]
      ,[change]
      ,[change_user]
      ,[manual]
      ,[date_otpr]
      ,[srok_end]
      ,[date_grpol]
      ,[date_pr]
      ,[date_vid]
      ,[code_payer_local]
      ,[tariff_contract]
      ,[calc_payer]
      ,[calc_payer_user]
      ,[IdActServices1]
      ,[NumActServices1]
      ,[IdActServices2]
      ,[NumActServices2]
      ,[IdActServices3]
      ,[NumActServices3]
      ,[Verification]
      ,[VerificationUser]
  FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document]
  where id in (select max([id_document])
   FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
  where [num] in (64569908  )
  group by [num])


--0		Чужой УЗ	На дорогу											0	102
--659	ООО "Керамет-Украина"	Основной код Керамет					0	103
--2348	«Техноэксперт»			Основной код							0	104
--6302	Досылка АМКР			Досылочные грузы (добавлен в регламент)	1	NULL
--7321	ПМК						Основной код							0	98
--7932	АМКР					Основной код АМКР						0	NULL
--9200	«Промбудресурс КР»		Основной код							0	99

-- Исправить грузополучателя 
--UPDATE [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Document]
--   SET [code_consignee] = 0
--   , [klient] = 1
--	WHERE id in (select max([id_document])
--   FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon]
--	where [num] in (64569908  )
--	group by [num])
   
