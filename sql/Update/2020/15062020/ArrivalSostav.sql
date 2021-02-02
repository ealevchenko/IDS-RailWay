USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[ArrivalSostav]    Script Date: 15.06.2020 14:15:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[ArrivalSostav](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_arrived] [bigint] NULL,
	[id_sostav] [bigint] NULL,
	[train] [int] NOT NULL,
	[composition_index] [nvarchar](50) NOT NULL,
	[date_arrival] [datetime] NOT NULL,
	[date_adoption] [datetime] NULL,
	[date_adoption_act] [datetime] NULL,
	[id_station_from] [int] NULL,
	[id_station_on] [int] NULL,
	[id_way] [int] NULL,
	[numeration] [bit] NULL,
	[num_doc] [int] NULL,
	[count] [int] NULL,
	[status] [int] NOT NULL,
	[note] [nvarchar](200) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_ArrivalSostav1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[ArrivalSostav]  WITH CHECK ADD  CONSTRAINT [FK_ArrivalSostav_Directory_Station] FOREIGN KEY([id_station_from])
REFERENCES [IDS].[Directory_Station] ([id])
GO

ALTER TABLE [IDS].[ArrivalSostav] CHECK CONSTRAINT [FK_ArrivalSostav_Directory_Station]
GO

ALTER TABLE [IDS].[ArrivalSostav]  WITH CHECK ADD  CONSTRAINT [FK_ArrivalSostav_Directory_Station1] FOREIGN KEY([id_station_on])
REFERENCES [IDS].[Directory_Station] ([id])
GO

ALTER TABLE [IDS].[ArrivalSostav] CHECK CONSTRAINT [FK_ArrivalSostav_Directory_Station1]
GO

ALTER TABLE [IDS].[ArrivalSostav]  WITH CHECK ADD  CONSTRAINT [FK_ArrivalSostav_Directory_Ways] FOREIGN KEY([id_way])
REFERENCES [IDS].[Directory_Ways] ([id])
GO

ALTER TABLE [IDS].[ArrivalSostav] CHECK CONSTRAINT [FK_ArrivalSostav_Directory_Ways]
GO


