USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[WagonFiling]    Script Date: 02.10.2024 14:58:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[WagonFiling](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[num_filing] [nvarchar](50) NOT NULL,
	[id_wio] [bigint] NOT NULL,
	[note] [nvarchar](250) NULL,
	[start_filing] [datetime] NOT NULL,
	[end_filing] [datetime] NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[close] [datetime] NULL,
	[close_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_WagonFiling] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[WagonFiling]  WITH CHECK ADD  CONSTRAINT [FK_WagonFiling_WagonInternalOperation] FOREIGN KEY([id_wio])
REFERENCES [IDS].[WagonInternalOperation] ([id])
GO

ALTER TABLE [IDS].[WagonFiling] CHECK CONSTRAINT [FK_WagonFiling_WagonInternalOperation]
GO


