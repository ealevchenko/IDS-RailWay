USE [KRR-PA-CNT-Railway-Archive]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[UZ_DOC_PDF](
	[num_doc] [nvarchar](50) NOT NULL,
	[revision] [int] NOT NULL,
	[num_nakl] [char](10) NULL,
	[output] [bit] NULL,
	[pdf_doc] VARBINARY(max) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_UZ_DOC_PDF] PRIMARY KEY CLUSTERED 
(
	[num_doc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


