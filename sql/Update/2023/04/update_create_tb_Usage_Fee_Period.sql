USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Usage_Fee_Period]    Script Date: 13.04.2023 12:45:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Usage_Fee_Period](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_operator] [int] NOT NULL,
	[id_genus] [int] NOT NULL,
	[start] [datetime] NOT NULL,
	[stop] [datetime] NOT NULL,
	[id_currency] [int] NULL,
	[rate] [money] NULL,
	[id_currency_derailment] [int] NULL,
	[rate_derailment] [money] NULL,
	[coefficient_route] [real] NULL,
	[coefficient_not_route] [real] NULL,
	[grace_time_1] [int] NULL,
	[grace_time_2] [int] NULL,
	[note] [nvarchar](100) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[close] [datetime] NULL,
	[close_user] [nvarchar](50) NULL,
	[parent_id] [int] NULL,
	[hour_after_30] [bit] NULL,
 CONSTRAINT [PK_Usage_Fee_Period] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[Usage_Fee_Period]  WITH CHECK ADD  CONSTRAINT [FK_Usage_Fee_Period_Directory_Currency] FOREIGN KEY([id_currency_derailment])
REFERENCES [IDS].[Directory_Currency] ([id])
GO

ALTER TABLE [IDS].[Usage_Fee_Period] CHECK CONSTRAINT [FK_Usage_Fee_Period_Directory_Currency]
GO

ALTER TABLE [IDS].[Usage_Fee_Period]  WITH CHECK ADD  CONSTRAINT [FK_Usage_Fee_Period_Directory_Currency1] FOREIGN KEY([id_currency])
REFERENCES [IDS].[Directory_Currency] ([id])
GO

ALTER TABLE [IDS].[Usage_Fee_Period] CHECK CONSTRAINT [FK_Usage_Fee_Period_Directory_Currency1]
GO

ALTER TABLE [IDS].[Usage_Fee_Period]  WITH CHECK ADD  CONSTRAINT [FK_Usage_Fee_Period_Directory_GenusWagons] FOREIGN KEY([id_genus])
REFERENCES [IDS].[Directory_GenusWagons] ([id])
GO

ALTER TABLE [IDS].[Usage_Fee_Period] CHECK CONSTRAINT [FK_Usage_Fee_Period_Directory_GenusWagons]
GO

ALTER TABLE [IDS].[Usage_Fee_Period]  WITH CHECK ADD  CONSTRAINT [FK_Usage_Fee_Period_Directory_OperatorsWagons] FOREIGN KEY([id_operator])
REFERENCES [IDS].[Directory_OperatorsWagons] ([id])
GO

ALTER TABLE [IDS].[Usage_Fee_Period] CHECK CONSTRAINT [FK_Usage_Fee_Period_Directory_OperatorsWagons]
GO

ALTER TABLE [IDS].[Usage_Fee_Period]  WITH CHECK ADD  CONSTRAINT [FK_Usage_Fee_Period_Usage_Fee_Period] FOREIGN KEY([parent_id])
REFERENCES [IDS].[Usage_Fee_Period] ([id])
GO

ALTER TABLE [IDS].[Usage_Fee_Period] CHECK CONSTRAINT [FK_Usage_Fee_Period_Usage_Fee_Period]
GO


