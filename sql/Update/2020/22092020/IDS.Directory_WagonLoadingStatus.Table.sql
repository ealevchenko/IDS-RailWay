USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Directory_WagonLoadingStatus]    Script Date: 22.09.2020 17:11:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Directory_WagonLoadingStatus](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[loading_status_ru] [nvarchar](30) NOT NULL,
	[loading_status_en] [nvarchar](30) NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Directory_WagonLoadingStatus] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
