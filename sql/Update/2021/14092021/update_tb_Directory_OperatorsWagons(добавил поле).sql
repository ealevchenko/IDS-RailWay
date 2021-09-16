USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Directory_OperatorsWagons]    Script Date: 14.09.2021 15:39:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Directory_OperatorsWagons](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[abbr_ru] [nvarchar](20) NOT NULL,
	[operators_ru] [nvarchar](100) NOT NULL,
	[abbr_en] [nvarchar](20) NOT NULL,
	[operators_en] [nvarchar](100) NOT NULL,
	[paid] [bit] NOT NULL,
	[rop] [bit] NOT NULL,
	[local_use] [bit] NOT NULL,
	[color] [nvarchar](10) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[monitoring_idle_time] [bit] NULL,
 CONSTRAINT [PK_Directory_OperatorsWagons] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


