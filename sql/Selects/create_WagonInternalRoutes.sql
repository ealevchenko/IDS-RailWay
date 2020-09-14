USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [RW].[CarsInternal]    Script Date: 14.09.2020 9:26:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[WagonInternalRoutes](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[num] [nvarchar](10) NOT NULL,
	--[local] [bit] NOT NULL,
	[id_arrival_car] [bigint] NULL,
	[id_sap_incoming_supply] [bigint] NULL,

	[id_outgoing_car] [bigint] NULL,
	[id_sap_outbound_supply] [bigint] NULL,

	[note] [nvarchar](250) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	--[change] [datetime] NULL,
	--[change_user] [nvarchar](50) NULL,
	[close] [datetime] NULL,
	[close_user] [nvarchar](50) NULL,
	[parent_id] [int] NULL,

	--[id_sostav] [int] NOT NULL,
	--[id_arrival] [int] NOT NULL,
	--[num] [int] NOT NULL,
	--[dt_uz] [datetime] NULL,
	--[dt_inp_amkr] [datetime] NULL,
	--[dt_out_amkr] [datetime] NULL,
	--[natur_kis_inp] [int] NULL,
	--[natur_kis_out] [int] NULL,
	--[natur_rw] [int] NULL,
	--[user_create] [nvarchar](50) NULL,
	--[dt_create] [datetime] NOT NULL,
	--[user_close] [nvarchar](50) NULL,
	--[dt_close] [datetime] NULL,
	--[parent_id] [int] NULL,
 CONSTRAINT [PK_WagonInternalRoutes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO



