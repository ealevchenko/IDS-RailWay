USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[ParkState_Station]    Script Date: 24.11.2020 17:28:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[ParkState_Station](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_station] [int] NOT NULL,
	[state_on] [datetime] NOT NULL,
	[note] [nvarchar](100) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[delete] [datetime] NULL,
	[delete_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_ParkState_Station] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[ParkState_Station]  WITH CHECK ADD  CONSTRAINT [FK_ParkState_Station_Directory_Station] FOREIGN KEY([id_station])
REFERENCES [IDS].[Directory_Station] ([id])
GO

ALTER TABLE [IDS].[ParkState_Station] CHECK CONSTRAINT [FK_ParkState_Station_Directory_Station]
GO


