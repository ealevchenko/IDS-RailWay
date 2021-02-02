USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Directory_Wagons]    Script Date: 17.11.2020 13:28:01 ******/
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
	[tara] [float] NULL,
	[kol_os] [int] NOT NULL,
	[usl_tip] [nvarchar](10) NULL,
	[date_rem_uz] [datetime] NULL,
	[date_rem_vag] [datetime] NULL,
	[id_type_ownership] [int] NULL,
	[sign] [int] NULL,
	[factory_number] [nvarchar](10) NULL,
	[inventory_number] [nvarchar](10) NULL,
	[year_built] [int] NULL,
	[exit_ban] [bit] NULL,
	[note] [nvarchar](1000) NOT NULL,
	[sobstv_kis] [int] NULL,
	[bit_warning] [bit] NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	[closed_route] [bit] NULL,
	[new_construction] [nchar](200) NULL,
 CONSTRAINT [PK_Directory_Wagons] PRIMARY KEY CLUSTERED 
(
	[num] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[Directory_Wagons]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Wagons_Directory_Countrys] FOREIGN KEY([id_countrys])
REFERENCES [IDS].[Directory_Countrys] ([id])
GO

ALTER TABLE [IDS].[Directory_Wagons] CHECK CONSTRAINT [FK_Directory_Wagons_Directory_Countrys]
GO

ALTER TABLE [IDS].[Directory_Wagons]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Wagons_Directory_GenusWagons] FOREIGN KEY([id_genus])
REFERENCES [IDS].[Directory_GenusWagons] ([id])
GO

ALTER TABLE [IDS].[Directory_Wagons] CHECK CONSTRAINT [FK_Directory_Wagons_Directory_GenusWagons]
GO

ALTER TABLE [IDS].[Directory_Wagons]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Wagons_Directory_OperatorsWagons] FOREIGN KEY([id_operator])
REFERENCES [IDS].[Directory_OperatorsWagons] ([id])
GO

ALTER TABLE [IDS].[Directory_Wagons] CHECK CONSTRAINT [FK_Directory_Wagons_Directory_OperatorsWagons]
GO

ALTER TABLE [IDS].[Directory_Wagons]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Wagons_Directory_OwnersWagons] FOREIGN KEY([id_owner])
REFERENCES [IDS].[Directory_OwnersWagons] ([id])
GO

ALTER TABLE [IDS].[Directory_Wagons] CHECK CONSTRAINT [FK_Directory_Wagons_Directory_OwnersWagons]
GO

ALTER TABLE [IDS].[Directory_Wagons]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Wagons_Directory_TypeOwnerShip] FOREIGN KEY([id_type_ownership])
REFERENCES [IDS].[Directory_TypeOwnerShip] ([id])
GO

ALTER TABLE [IDS].[Directory_Wagons] CHECK CONSTRAINT [FK_Directory_Wagons_Directory_TypeOwnerShip]
GO


