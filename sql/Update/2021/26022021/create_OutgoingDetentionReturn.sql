USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[OutgoingDetentionReturn]    Script Date: 26.02.2021 15:58:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[OutgoingDetentionReturn](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[num] [int] NOT NULL,
	[id_detention_return] [int] NOT NULL,
	[type_detention_return] [int] NOT NULL,
	[date_start] [datetime] NOT NULL,
	[date_stop] [datetime] NULL,
	[num_act] [nvarchar](20) NULL,
	[date_act] [datetime] NULL,
	[note] [nvarchar](200) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_OutgoingDetentionReturn] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


