USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Directory_WagonsRent]    Script Date: 17.07.2020 12:34:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Directory_WagonsRent](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[num] [int] NOT NULL,
	[id_operator] [int] NULL,
	[id_limiting] [int] NULL,
	[rent_start] [datetime] NULL,
	[rent_end] [datetime] NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[parent_id] [int] NULL,
 CONSTRAINT [PK_Directory_WagonsRent] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[Directory_WagonsRent]  WITH CHECK ADD  CONSTRAINT [FK_Directory_WagonsRent_Directory_WagonsRent] FOREIGN KEY([parent_id])
REFERENCES [IDS].[Directory_WagonsRent] ([id])
GO

ALTER TABLE [IDS].[Directory_WagonsRent] CHECK CONSTRAINT [FK_Directory_WagonsRent_Directory_WagonsRent]
GO


