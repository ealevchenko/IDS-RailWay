USE [KRR-PA-CNT-Railway]
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_ExternalStation] FOREIGN KEY([code_stn_to])
REFERENCES [IDS].[Directory_ExternalStation] ([code])
GO

ALTER TABLE [IDS].[Outgoing_UZ_Vagon] CHECK CONSTRAINT [FK_Outgoing_UZ_Vagon_Directory_ExternalStation]
GO


