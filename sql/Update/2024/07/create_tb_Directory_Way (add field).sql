USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Directory_Ways]    Script Date: 17.07.2024 11:47:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Directory_Ways](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_station] [int] NOT NULL,
	[id_park] [int] NOT NULL,
	[position_park] [int] NOT NULL,
	[position_way] [int] NOT NULL,
	[way_num_ru] [nvarchar](20) NOT NULL,
	[way_num_en] [nvarchar](20) NOT NULL,
	[way_name_ru] [nvarchar](100) NOT NULL,
	[way_name_en] [nvarchar](100) NOT NULL,
	[way_abbr_ru] [nvarchar](50) NOT NULL,
	[way_abbr_en] [nvarchar](50) NOT NULL,
	[capacity] [int] NULL,
	[deadlock] [bit] NULL,
	[crossing_uz] [bit] NULL,
	[crossing_amkr] [bit] NULL,
	[id_devision] [int] NULL,
	[dissolution] [bit] NULL,
	[output_dissolution] [bit] NULL,
	[way_close] [datetime] NULL,
	[way_delete] [datetime] NULL,
	[note] [nvarchar](100) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[station_dissolution] [int] NULL,
 CONSTRAINT [PK_Directory_Ways] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[Directory_Ways]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Ways_Directory_Divisions] FOREIGN KEY([id_devision])
REFERENCES [IDS].[Directory_Divisions] ([id])
GO

ALTER TABLE [IDS].[Directory_Ways] CHECK CONSTRAINT [FK_Directory_Ways_Directory_Divisions]
GO

ALTER TABLE [IDS].[Directory_Ways]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Ways_Directory_ParkWays] FOREIGN KEY([id_park])
REFERENCES [IDS].[Directory_ParkWays] ([id])
GO

ALTER TABLE [IDS].[Directory_Ways] CHECK CONSTRAINT [FK_Directory_Ways_Directory_ParkWays]
GO

ALTER TABLE [IDS].[Directory_Ways]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Ways_Directory_Station] FOREIGN KEY([id_station])
REFERENCES [IDS].[Directory_Station] ([id])
GO

ALTER TABLE [IDS].[Directory_Ways] CHECK CONSTRAINT [FK_Directory_Ways_Directory_Station]
GO


