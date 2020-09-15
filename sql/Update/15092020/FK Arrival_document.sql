USE [KRR-PA-CNT-Railway]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Arrival_UZ_Document] FOREIGN KEY([id_document])
REFERENCES [IDS].[Arrival_UZ_Document] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Arrival_UZ_Document]
GO


ALTER TABLE [IDS].[Arrival_UZ_Document_Pay]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Document_Pay_Arrival_UZ_Document] FOREIGN KEY([id_document])
REFERENCES [IDS].[Arrival_UZ_Document] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Document_Pay] CHECK CONSTRAINT [FK_Arrival_UZ_Document_Pay_Arrival_UZ_Document]
GO


ALTER TABLE [IDS].[Arrival_UZ_Document_Docs]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Document_Docs_Arrival_UZ_Document] FOREIGN KEY([id_document])
REFERENCES [IDS].[Arrival_UZ_Document] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Document_Docs] CHECK CONSTRAINT [FK_Arrival_UZ_Document_Docs_Arrival_UZ_Document]
GO


ALTER TABLE [IDS].[Arrival_UZ_Document_Acts]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Document_Acts_Arrival_UZ_Document] FOREIGN KEY([id_document])
REFERENCES [IDS].[Arrival_UZ_Document] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Document_Acts] CHECK CONSTRAINT [FK_Arrival_UZ_Document_Acts_Arrival_UZ_Document]
GO
