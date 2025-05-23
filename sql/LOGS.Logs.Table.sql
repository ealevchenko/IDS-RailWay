USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [LOGS].[Logs]    Script Date: 02.01.2020 16:54:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [LOGS].[Logs](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[date_time] [datetime] NOT NULL,
	[user_name] [nvarchar](50) NULL,
	[user_host_name] [nvarchar](50) NULL,
	[user_host_address] [nvarchar](50) NULL,
	[physical_path] [nvarchar](1000) NULL,
	[service] [int] NULL,
	[event_id] [int] NULL,
	[level] [int] NULL,
	[message] [nvarchar](max) NULL,
 CONSTRAINT [PK_Logs] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
