USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[ParkState_Way]    Script Date: 24.11.2020 17:29:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[ParkState_Way](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_park_state_station] [int] NOT NULL,
	[id_way] [int] NOT NULL,
	[position] [int] NOT NULL,
	[note] [nvarchar](100) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[delete] [datetime] NULL,
	[delete_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_ParkState_Way] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[ParkState_Way]  WITH CHECK ADD  CONSTRAINT [FK_ParkState_Way_Directory_Ways] FOREIGN KEY([id_way])
REFERENCES [IDS].[Directory_Ways] ([id])
GO

ALTER TABLE [IDS].[ParkState_Way] CHECK CONSTRAINT [FK_ParkState_Way_Directory_Ways]
GO

ALTER TABLE [IDS].[ParkState_Way]  WITH CHECK ADD  CONSTRAINT [FK_ParkState_Way_ParkState_Station] FOREIGN KEY([id_park_state_station])
REFERENCES [IDS].[ParkState_Station] ([id])
GO

ALTER TABLE [IDS].[ParkState_Way] CHECK CONSTRAINT [FK_ParkState_Way_ParkState_Station]
GO


