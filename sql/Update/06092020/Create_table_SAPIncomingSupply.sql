USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [RW].[CarInboundDelivery]    Script Date: 06.09.2020 9:43:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[SAPIncomingSupply](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_arrival_car] [bigint] NOT NULL,
	[num] [int] NOT NULL,
	[num_doc_uz] [char] (35) NOT NULL,
	[date_doc_uz] [datetime] NOT NULL,
	[code_border_checkpoint] [char] (6) NULL,
	[name_border_checkpoint] [char] (35) NULL,
	[cross_time] [datetime] NULL,
	[VBELN] [char] (10) NULL,
	[NUM_VBELN] [char] (3) NULL,
	[WERKS] [char] (4) NULL,
	[LGORT] [char] (4) NULL,
	[LGOBE] [char] (16) NULL,
	[ERDAT] date NULL,
	[ETIME] time NULL,
	[LGORT_10] [char] (4) NULL,
	[LGOBE_10] [char] (16) NULL,
	[MATNR] [char] (18) NULL,
	[MAKTX] [char] (40) NULL,
	[NAME_SH] [char] (35) NULL,
	[KOD_R_10] [char] (4) NULL,
	[note] [nvarchar](250) NULL,
	[term] [datetime] NULL,
	[attempt] [int] NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[close] [datetime] NULL,
	[close_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_SAPIncomingSupply] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



