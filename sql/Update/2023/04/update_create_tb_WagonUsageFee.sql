USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[WagonUsageFee]    Script Date: 21.04.2023 11:19:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[WagonUsageFee](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_wir] [bigint] NOT NULL,
	[num] [int] NOT NULL,
	[id_operator] [int] NOT NULL,
	[id_genus] [int] NOT NULL,
	[date_adoption] [datetime] NOT NULL,
	[date_outgoing] [datetime] NOT NULL,
	[route] [bit] NOT NULL,
	[inp_cargo] [bit] NOT NULL,
	[out_cargo] [bit] NOT NULL,
	[derailment] [bit] NOT NULL,
	[count_stage] [int] NOT NULL,
	[id_currency] [int] NOT NULL,
	[rate] [money] NOT NULL,
	[exchange_rate] [money] NOT NULL,
	[coefficient] [float] NOT NULL,
	[use_time] [int] NOT NULL,
	[grace_time] [int] NOT NULL,
	[calc_time] [int] NOT NULL,
	[calc_fee_amount] [money] NOT NULL,
	[manual_time] [int] NULL,
	[manual_fee_amount] [money] NULL,
	[note] [nvarchar](100) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_WagonUsageFee] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


