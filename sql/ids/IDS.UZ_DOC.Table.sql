USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[UZ_DOC]    Script Date: 05.03.2020 16:37:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[UZ_DOC](
	[num_doc] [nvarchar](50) NOT NULL,
	[revision] [int] NOT NULL,
	[status] [int] NULL,
	[code_from] [nvarchar](4) NOT NULL,
	[code_on] [nvarchar](4) NOT NULL,
	[dt] [datetime] NULL,
	[xml_doc] [xml] NULL,
 CONSTRAINT [PK_UZ_DOC] PRIMARY KEY CLUSTERED 
(
	[num_doc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
