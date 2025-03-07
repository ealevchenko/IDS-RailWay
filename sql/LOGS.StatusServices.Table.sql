USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [LOGS].[StatusServices]    Script Date: 02.01.2020 16:54:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [LOGS].[StatusServices](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[service] [int] NOT NULL,
	[start] [datetime] NULL,
	[execution] [datetime] NULL,
	[current] [int] NULL,
	[max] [int] NULL,
	[min] [int] NULL,
 CONSTRAINT [PK_StatusServices] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
