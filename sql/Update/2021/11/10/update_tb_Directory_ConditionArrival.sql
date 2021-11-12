USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Directory_ConditionArrival]    Script Date: 10.11.2021 16:44:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Directory_ConditionArrival](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[condition_name_ru] [nvarchar](100) NOT NULL,
	[condition_name_en] [nvarchar](100) NOT NULL,
	[condition_abbr_ru] [nvarchar](20) NOT NULL,
	[condition_abbr_en] [nvarchar](20) NOT NULL,
	[red] [bit] NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[delete] [datetime] NULL,
	[delete_user] [nvarchar](50) NULL,
	[repairs] [bit] NULL,
 CONSTRAINT [PK_Directory_ConditionArrival] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


