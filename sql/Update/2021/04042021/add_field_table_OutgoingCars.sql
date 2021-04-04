USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[OutgoingCars]    Script Date: 04.04.2021 22:29:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[OutgoingCars](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_outgoing] [bigint] NULL,
	[num] [int] NOT NULL,
	[position] [int] NOT NULL,
	[position_outgoing] [int] NULL,
	[num_doc] [nvarchar](50) NULL,
	[note] [nvarchar](200) NULL,
	[date_outgoing_act] [datetime] NULL,
	[outgoing] [datetime] NULL,
	[outgoing_user] [nvarchar](50) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[id_outgoing_uz_vagon] [bigint] NULL,
	[id_outgoing_detention] [int] NULL,
	[id_reason_discrepancy_amkr] [int] NULL,
	[id_reason_discrepancy_uz] [int] NULL,
	[id_outgoing_return_start] [int] NULL,
	[id_outgoing_return_stop] [int] NULL,
	[parent_wir_id] [bigint] NULL,
	[note_vagonnik] [nvarchar](100) NULL,
	[vagonnik] [datetime] NULL,
	[vagonnik_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_OutgoingCars] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[OutgoingCars]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingCars_OutgoingDetentionReturn1] FOREIGN KEY([id_outgoing_detention])
REFERENCES [IDS].[OutgoingDetentionReturn] ([id])
GO

ALTER TABLE [IDS].[OutgoingCars] CHECK CONSTRAINT [FK_OutgoingCars_OutgoingDetentionReturn1]
GO

ALTER TABLE [IDS].[OutgoingCars]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingCars_OutgoingDetentionReturn2] FOREIGN KEY([id_outgoing_return_start])
REFERENCES [IDS].[OutgoingDetentionReturn] ([id])
GO

ALTER TABLE [IDS].[OutgoingCars] CHECK CONSTRAINT [FK_OutgoingCars_OutgoingDetentionReturn2]
GO

ALTER TABLE [IDS].[OutgoingCars]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingCars_OutgoingDetentionReturn3] FOREIGN KEY([id_outgoing_return_stop])
REFERENCES [IDS].[OutgoingDetentionReturn] ([id])
GO

ALTER TABLE [IDS].[OutgoingCars] CHECK CONSTRAINT [FK_OutgoingCars_OutgoingDetentionReturn3]
GO

ALTER TABLE [IDS].[OutgoingCars]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingCars_OutgoingSostav] FOREIGN KEY([id_outgoing])
REFERENCES [IDS].[OutgoingSostav] ([id])
GO

ALTER TABLE [IDS].[OutgoingCars] CHECK CONSTRAINT [FK_OutgoingCars_OutgoingSostav]
GO

ALTER TABLE [IDS].[OutgoingCars]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingCars_UZ_DOC_OUT] FOREIGN KEY([num_doc])
REFERENCES [IDS].[UZ_DOC_OUT] ([num_doc])
GO

ALTER TABLE [IDS].[OutgoingCars] CHECK CONSTRAINT [FK_OutgoingCars_UZ_DOC_OUT]
GO


