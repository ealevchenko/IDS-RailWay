USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [LOGS].[Services]    Script Date: 02.01.2020 16:54:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [LOGS].[Services](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[service] [int] NULL,
	[event_id] [int] NULL,
	[description] [nvarchar](100) NULL,
	[start] [datetime] NOT NULL,
	[stop] [datetime] NOT NULL,
	[duration] [int] NOT NULL,
	[code_return] [int] NULL,
 CONSTRAINT [PK_Services] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
