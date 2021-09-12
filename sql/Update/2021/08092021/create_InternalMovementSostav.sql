USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[InternalMovementSostav]    Script Date: 08.09.2021 13:04:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[InternalMovementSostav](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[num] [nvarchar](50) NULL,
	[note] [nvarchar](250) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_InternalMovementSostav] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


