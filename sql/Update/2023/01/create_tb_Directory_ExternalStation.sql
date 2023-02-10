USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Directory_ExternalStation]    Script Date: 10.02.2023 9:10:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Directory_ExternalStation](
	[code] [int] NOT NULL,
	[station_name_ru] [nvarchar](50) NOT NULL,
	[station_name_en] [nvarchar](50) NOT NULL,
	[code_inlandrailway] [int] NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[port] [bit] NULL,
 CONSTRAINT [PK_Directory_ExternalStation] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[Directory_ExternalStation]  WITH CHECK ADD  CONSTRAINT [FK_Directory_ExternalStation_Directory_InlandRailway] FOREIGN KEY([code_inlandrailway])
REFERENCES [IDS].[Directory_InlandRailway] ([code])
GO

ALTER TABLE [IDS].[Directory_ExternalStation] CHECK CONSTRAINT [FK_Directory_ExternalStation_Directory_InlandRailway]
GO


