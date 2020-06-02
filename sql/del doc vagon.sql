declare @delid_vag int = 46

delete FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon_Pay] where id_vagon = @delid_vag
delete FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon_Cont] where id_vagon = @delid_vag
delete FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon_Acts] where id_vagon = @delid_vag

delete FROM [KRR-PA-CNT-Railway].[IDS].[Arrival_UZ_Vagon] where id = @delid_vag