USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Directory_Wagons]    Script Date: 17.07.2020 12:34:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Directory_Wagons](
	[num] [int] NOT NULL,
	[id_countrys] [int] NOT NULL,
	[id_genus] [int] NOT NULL,
	[id_owner] [int] NOT NULL,
	[id_operator] [int] NULL,
	[change_operator] [datetime] NULL,
	[gruzp] [float] NOT NULL,
	[kol_os] [int] NOT NULL,
	[usl_tip] [nvarchar](10) NULL,
	[date_rem_uz] [datetime] NULL,
	[date_rem_vag] [datetime] NULL,
	[id_type_ownership] [int] NULL,
	[sign] [int] NULL,
	[note] [nvarchar](1000) NOT NULL,
	[sobstv_kis] [int] NULL,
	[bit_warning] [bit] NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_Directory_Wagons] PRIMARY KEY CLUSTERED 
(
	[num] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


