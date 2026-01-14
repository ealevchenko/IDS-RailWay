SELECT count([id_wim_load]), [id_wim_load]
  FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMoveCargo]
 group by [id_wim_load]
 HAVING count([id_wim_load])>1
