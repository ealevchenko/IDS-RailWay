USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Directory_Station]    Script Date: 06.09.2021 16:12:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Directory_Station](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[station_name_ru] [nvarchar](50) NOT NULL,
	[station_name_en] [nvarchar](50) NOT NULL,
	[station_abbr_ru] [nvarchar](50) NOT NULL,
	[station_abbr_en] [nvarchar](50) NOT NULL,
	[exit_uz] [bit] NOT NULL,
	[station_uz] [bit] NOT NULL,
	[default_side] [bit] NULL,
	[code] [int] NULL,
	[idle_time] [int] NULL,
	[station_delete] [datetime] NULL,
 CONSTRAINT [PK_Directory_Station] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


