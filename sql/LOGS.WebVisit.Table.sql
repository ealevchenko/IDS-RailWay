USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [LOGS].[WebVisit]    Script Date: 02.01.2020 16:54:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [LOGS].[WebVisit](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[date_time] [datetime] NOT NULL,
	[user_name] [nvarchar](50) NULL,
	[authentication] [bit] NULL,
	[authentication_type] [nvarchar](50) NULL,
	[user_host_name] [nvarchar](50) NULL,
	[user_host_address] [nvarchar](50) NULL,
	[url] [nvarchar](1000) NULL,
	[physical_path] [nvarchar](1000) NULL,
	[action_name] [nvarchar](100) NULL,
	[controller_name] [nvarchar](100) NULL,
	[roles_access] [nvarchar](1000) NULL,
	[access] [bit] NULL,
 CONSTRAINT [PK_Log.LogWebVisit] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
