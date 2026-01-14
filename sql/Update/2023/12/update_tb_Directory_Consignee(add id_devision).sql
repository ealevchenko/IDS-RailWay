USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Directory_Consignee]    Script Date: 15.12.2023 16:04:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Directory_Consignee](
	[code] [int] NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[description] [nvarchar](200) NOT NULL,
	[auxiliary] [bit] NOT NULL,
	[id_division] [int] NULL,
 CONSTRAINT [PK_Directory_Consignee] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[Directory_Consignee]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Consignee_Directory_Divisions] FOREIGN KEY([id_division])
REFERENCES [IDS].[Directory_Divisions] ([id])
GO

ALTER TABLE [IDS].[Directory_Consignee] CHECK CONSTRAINT [FK_Directory_Consignee_Directory_Divisions]
GO


