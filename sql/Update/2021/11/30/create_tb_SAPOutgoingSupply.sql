USE [KRR-PA-CNT-Railway]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[SAPOutgoingSupply](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_out_supply] [int] NOT NULL,
	[id_outgoing_car] [bigint] NULL,
	[num] [int] NOT NULL,
	[VBELN] [char](10) NOT NULL,
	[ERDAT] [date] NOT NULL,
	[ZBEZEI] [nvarchar](160) NOT NULL,
	[STAWN] [char](17) NOT NULL,
	[NAME1_AG] [nvarchar](150) NOT NULL,
	[KUNNR_AG] [char](10) NOT NULL,
	[ZRWNAME] [nvarchar](30) NOT NULL,
	[ZENDSTAT] [char](10) NOT NULL,
	[ZCRSTNAME] [nvarchar](30) NOT NULL,
	[ZCROSSSTAT] [char](10) NOT NULL,
	[ZZVES_NETTO] [float] NOT NULL,
	[ABTNR] [char](4) NOT NULL,
	[VTEXT] [nvarchar](20) NOT NULL,
	[ZZDOLG] [nvarchar](50) NOT NULL,
	[ZZFIO] [nvarchar](50) NOT NULL,
	[ZZPLATEL] [char](15) NOT NULL,
	[ZZNAME_PLATEL] [nvarchar](50) NOT NULL,
	[note] [nvarchar](250) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[close] [datetime] NULL,
	[close_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_SAPOutgoingSupply] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO



