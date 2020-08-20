USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[InstructionalLetters]    Script Date: 20.08.2020 14:28:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[InstructionalLetters](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[num] [nvarchar](20) NOT NULL,
	[dt] [datetime] NOT NULL,
	[owner] [nvarchar](200) NOT NULL,
	[destination_station] [int] NOT NULL,
	[note] [nvarchar](500) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_InstructionalLetters] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


