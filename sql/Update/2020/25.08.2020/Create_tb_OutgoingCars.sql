USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[OutgoingCars]    Script Date: 25.08.2020 13:25:35 ******/
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
	[note] [nvarchar](200) NULL,
	[date_outgoing_act] [datetime] NULL,
	[outgoing] [datetime] NULL,
	[outgoing_user] [nvarchar](50) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[id_outgoing_uz_vagon] [bigint] NULL,
 CONSTRAINT [PK_OutgoingCars] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[OutgoingCars]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingCars_Directory_Wagons] FOREIGN KEY([num])
REFERENCES [IDS].[Directory_Wagons] ([num])
GO

ALTER TABLE [IDS].[OutgoingCars] CHECK CONSTRAINT [FK_OutgoingCars_Directory_Wagons]
GO

ALTER TABLE [IDS].[OutgoingCars]  WITH CHECK ADD  CONSTRAINT [FK_OutgoingCars_OutgoingSostav] FOREIGN KEY([id_outgoing])
REFERENCES [IDS].[OutgoingSostav] ([id])
GO

ALTER TABLE [IDS].[OutgoingCars] CHECK CONSTRAINT [FK_OutgoingCars_OutgoingSostav]
GO


