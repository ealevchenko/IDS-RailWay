USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[ParkState_Wagon]    Script Date: 24.11.2020 17:28:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[ParkState_Wagon](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_park_state_way] [int] NOT NULL,
	[num] [int] NOT NULL,
	[position] [int] NOT NULL,
	[note] [nvarchar](100) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[delete] [datetime] NULL,
	[delete_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_ParkState_Wagon] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[ParkState_Wagon]  WITH CHECK ADD  CONSTRAINT [FK_ParkState_Wagon_ParkState_Way] FOREIGN KEY([id_park_state_way])
REFERENCES [IDS].[ParkState_Way] ([id])
GO

ALTER TABLE [IDS].[ParkState_Wagon] CHECK CONSTRAINT [FK_ParkState_Wagon_ParkState_Way]
GO


