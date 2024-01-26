USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[GIVC_requests]    Script Date: 26.01.2024 9:27:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[GIVC_requests](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[dt_requests] [datetime] NOT NULL,
	[type_requests] [nvarchar](20) NOT NULL,
	[result_requests] [nvarchar](max) NULL,
	[count_line] [int] NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_GIVC_requests] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


