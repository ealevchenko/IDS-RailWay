USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Directory_BankRate]    Script Date: 30.06.2023 16:54:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Directory_BankRate](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[date] [datetime] NOT NULL,
	[code] [int] NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[rate] [real] NOT NULL,
	[cc] [nvarchar](3) NOT NULL,
 CONSTRAINT [PK_Directory_BankRate] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


