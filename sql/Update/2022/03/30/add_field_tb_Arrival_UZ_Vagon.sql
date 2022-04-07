USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[Arrival_UZ_Vagon]    Script Date: 05.04.2022 14:16:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[Arrival_UZ_Vagon](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_document] [bigint] NOT NULL,
	[num] [int] NOT NULL,
	[id_arrival] [bigint] NOT NULL,
	[id_car] [int] NOT NULL,
	[id_condition] [int] NULL,
	[id_type] [int] NULL,
	[gruzp] [float] NULL,
	[u_tara] [int] NULL,
	[ves_tary_arc] [int] NULL,
	[route] [bit] NULL,
	[note_vagon] [nvarchar](200) NULL,
	[id_cargo] [int] NULL,
	[id_cargo_gng] [int] NULL,
	[id_certification_data] [int] NULL,
	[id_commercial_condition] [int] NULL,
	[kol_pac] [int] NULL,
	[pac] [nvarchar](3) NULL,
	[vesg] [int] NULL,
	[vesg_reweighing] [float] NULL,
	[nom_zpu] [nvarchar](20) NULL,
	[danger] [char](3) NULL,
	[danger_kod] [char](4) NULL,
	[cargo_returns] [bit] NULL,
	[id_station_on_amkr] [int] NULL,
	[id_division_on_amkr] [int] NULL,
	[empty_car] [bit] NULL,
	[kol_conductor] [int] NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
	--Добавил 03.2022
	[id_owner] [int] NULL,
	[id_countrys] [int] NULL,
	[id_genus] [int] NULL,
	[kol_os] [int] NULL,
	[usl_tip] [nvarchar](10) NULL,
	[date_rem_uz] [datetime] NULL,
	[date_rem_vag] [datetime] NULL,
 CONSTRAINT [PK_Arrival_UZ_Vagon] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Arrival_UZ_Document] FOREIGN KEY([id_document])
REFERENCES [IDS].[Arrival_UZ_Document] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Arrival_UZ_Document]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_ArrivalSostav] FOREIGN KEY([id_arrival])
REFERENCES [IDS].[ArrivalSostav] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_ArrivalSostav]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_Cargo] FOREIGN KEY([id_cargo])
REFERENCES [IDS].[Directory_Cargo] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_Cargo]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_CargoGNG] FOREIGN KEY([id_cargo_gng])
REFERENCES [IDS].[Directory_CargoGNG] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_CargoGNG]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_CertificationData] FOREIGN KEY([id_certification_data])
REFERENCES [IDS].[Directory_CertificationData] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_CertificationData]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_CommercialCondition] FOREIGN KEY([id_commercial_condition])
REFERENCES [IDS].[Directory_CommercialCondition] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_CommercialCondition]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_ConditionArrival] FOREIGN KEY([id_condition])
REFERENCES [IDS].[Directory_ConditionArrival] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_ConditionArrival]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_Divisions] FOREIGN KEY([id_division_on_amkr])
REFERENCES [IDS].[Directory_Divisions] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_Divisions]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_HazardClass] FOREIGN KEY([danger])
REFERENCES [IDS].[Directory_HazardClass] ([code])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_HazardClass]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_Station] FOREIGN KEY([id_station_on_amkr])
REFERENCES [IDS].[Directory_Station] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_Station]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_TypeWagons] FOREIGN KEY([id_type])
REFERENCES [IDS].[Directory_TypeWagons] ([id])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_TypeWagons]
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_Wagons] FOREIGN KEY([num])
REFERENCES [IDS].[Directory_Wagons] ([num])
GO

ALTER TABLE [IDS].[Arrival_UZ_Vagon] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Directory_Wagons]
GO


