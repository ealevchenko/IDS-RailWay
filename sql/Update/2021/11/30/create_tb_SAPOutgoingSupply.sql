USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[SAPOutgoingSupply]    Script Date: 01.12.2021 11:22:20 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[SAPOutgoingSupply](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_out_supply] [int] NOT NULL,
	[id_outgoing_car] [bigint] NULL,
	[num] [int] NOT NULL,
	[VBELN] [char](10) NULL,
	[ERDAT] [date] NULL,
	[ZBEZEI] [nvarchar](160) NULL,
	[STAWN] [char](17) NULL,
	[NAME1_AG] [nvarchar](150) NULL,
	[KUNNR_AG] [char](10) NULL,
	[ZRWNAME] [nvarchar](30) NULL,
	[ZENDSTAT] [char](10) NULL,
	[ZCRSTNAME] [nvarchar](30) NULL,
	[ZCROSSSTAT] [char](10) NULL,
	[ZZVES_NETTO] [float] NULL,
	[ABTNR] [char](4) NULL,
	[VTEXT] [nvarchar](20) NULL,
	[ZZDOLG] [nvarchar](50) NULL,
	[ZZFIO] [nvarchar](50) NULL,
	[ZZPLATEL] [char](15) NULL,
	[ZZNAME_PLATEL] [nvarchar](50) NULL,
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

ALTER TABLE [IDS].[SAPOutgoingSupply]  WITH CHECK ADD  CONSTRAINT [FK_SAPOutgoingSupply_Out_Supply] FOREIGN KEY([id_out_supply])
REFERENCES [SAP].[Out_Supply] ([id])
GO

ALTER TABLE [IDS].[SAPOutgoingSupply] CHECK CONSTRAINT [FK_SAPOutgoingSupply_Out_Supply]
GO

ALTER TABLE [IDS].[SAPOutgoingSupply]  WITH CHECK ADD  CONSTRAINT [FK_SAPOutgoingSupply_OutgoingCars] FOREIGN KEY([id_outgoing_car])
REFERENCES [IDS].[OutgoingCars] ([id])
GO

ALTER TABLE [IDS].[SAPOutgoingSupply] CHECK CONSTRAINT [FK_SAPOutgoingSupply_OutgoingCars]
GO


