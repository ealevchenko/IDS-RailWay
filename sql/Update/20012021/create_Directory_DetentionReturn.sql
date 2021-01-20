USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Directory_Countrys]    Script Date: 20.01.2021 13:32:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Directory_DetentionReturn](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[cause_ru] [nvarchar](150) NOT NULL,
	[cause_en] [nvarchar](150) NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Directory_DetentionReturn] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


