USE [KRR-PA-CNT-Railway]
GO

ALTER TABLE [IDS].[OutgoingDetentionReturn]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingDetentionReturn_Directory_DetentionReturn] FOREIGN KEY([id_detention_return])
REFERENCES [IDS].[Directory_DetentionReturn] ([id])
GO

ALTER TABLE [IDS].[OutgoingDetentionReturn] CHECK CONSTRAINT [FK_OutgoingDetentionReturn_Directory_DetentionReturn]
GO


