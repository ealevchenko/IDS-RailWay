USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [METRANS].[WagonsTracking]    Script Date: 02.01.2020 16:54:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [METRANS].[WagonsTracking](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[nvagon] [int] NOT NULL,
	[st_disl] [int] NULL,
	[nst_disl] [nvarchar](50) NULL,
	[kodop] [int] NULL,
	[nameop] [nvarchar](50) NULL,
	[full_nameop] [nvarchar](100) NULL,
	[dt] [datetime] NULL,
	[st_form] [int] NULL,
	[nst_form] [nvarchar](50) NULL,
	[idsost] [int] NULL,
	[nsost] [nvarchar](50) NULL,
	[st_nazn] [int] NULL,
	[nst_nazn] [nvarchar](50) NULL,
	[ntrain] [int] NULL,
	[st_end] [int] NULL,
	[nst_end] [nvarchar](50) NULL,
	[kgr] [int] NULL,
	[nkgr] [nvarchar](500) NULL,
	[id_cargo] [int] NOT NULL,
	[kgrp] [int] NULL,
	[ves] [numeric](18, 3) NULL,
	[updated] [datetime] NULL,
	[kgro] [int] NULL,
	[km] [int] NULL,
 CONSTRAINT [PK_WagonsTracking] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
