USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[Arrival_UZ_Vagon_Cont]    Script Date: 15.09.2020 16:43:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[Arrival_UZ_Vagon_Cont](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_vagon] [bigint] NOT NULL,
	[nom_cont] [nvarchar](11) NOT NULL,
	[kod_tiporazmer] [nvarchar](4) NULL,
	[gruzp] [int] NULL,
	[ves_tary_arc] [int] NULL,
	[id_cargo] [int] NULL,
	[id_cargo_gng] [int] NULL,
	[kol_pac] [int] NULL,
	[pac] [nvarchar](3) NULL,
	[vesg] [int] NULL,
	[vesg_reweighing] [float] NULL,
	[nom_zpu] [nvarchar](20) NULL,
 CONSTRAINT [PK_Arrival_UZ_Vagon_Cont] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[Arrival_UZ_Vagon_Cont] ON 

INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10021, 34574, N'MRSU0188358', N'22G1', 32, 2250, 10, NULL, 14, N'PX', 27944, NULL, N'CN8143686')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10022, 34574, N'MSKU5155042', N'22G1', 32, 2250, 10, NULL, 14, N'PX', 27944, NULL, N'CN8143697')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10023, 34575, N'MRKU8710213', N'22G1', 32, 2250, 10, NULL, 14, N'PX', 27944, NULL, N'CN8143683')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10024, 34575, N'MSKU7630619', N'22G1', 32, 2250, 10, NULL, 14, N'PX', 27944, NULL, N'CN8143654')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10025, 34576, N'SUDU1301986', N'22G1', 32, 2250, 10, NULL, 14, N'PX', 27944, NULL, N'CN8143694')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10026, 34576, N'TEMU1358972', N'22G1', 32, 2250, 10, NULL, 14, N'PX', 27944, NULL, N'CN8143687')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10027, 34577, N'MRKU9626350', N'22G1', 32, 2250, 10, NULL, 14, N'PX', 27944, NULL, N'CN8143696')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10028, 34577, N'PONU0325655', N'22G1', 32, 2250, 10, NULL, 14, N'PX', 27944, NULL, N'CN8143692')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10029, 34578, N'IPXU3671933', N'22G1', 32, 2250, 19, NULL, 14, N'PX', 27944, NULL, N'CN8143688')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10030, 34578, N'MSKU4098502', N'22G1', 32, 2250, 10, NULL, 14, N'PX', 27944, NULL, N'CN8143685')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10031, 34580, N'MSKU3954800', N'22G1', 32, 2250, 10, NULL, 14, N'PX', 27944, NULL, N'CN8143681')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10032, 34580, N'SUDU1410631', N'22G1', 32, 2250, 10, NULL, 14, N'PX', 27944, NULL, N'CN8143695')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10033, 34797, N'MEDU1170684', N'22G1', 28, 2100, 10, NULL, 21, N'8A', 25767, NULL, N'FX12980641')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10034, 34797, N'TCLU2571250', N'22G1', 28, 2100, 10, NULL, 22, N'8A', 25355, NULL, N'FX12980648')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10035, 34798, N'MEDU1363852', N'22G1', 28, 2100, 10, NULL, 21, N'8A', 25767, NULL, N'FX12980642')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10036, 34798, N'MEDU3748848', N'22G1', 28, 2100, 10, NULL, 18, N'8A', 25143, NULL, N'FX12980644')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10037, 34799, N'TGCU2125454', N'22G1', 28, 2100, 10, NULL, 24, N'8A', 25829, NULL, N'DYW00486182')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10038, 34799, N'TTNU1043371', N'22G1', 28, 2100, 10, NULL, 17, N'8A', 19727, NULL, N'FX12980650')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10039, 34800, N'FTAU1250792', N'22G1', 28, 2100, 10, NULL, 19, N'8A', 25885, NULL, N'FX12980594')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10040, 34800, N'MEDU2915215', N'22G1', 28, 2100, 10, NULL, 19, N'8A', 25595, NULL, N'FX12980643')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10041, 34801, N'CAXU6238140', N'22G1', 28, 2100, 10, NULL, 21, N'8A', 25758, NULL, N'FX12980591')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10042, 34801, N'MEDU5561619', N'22G1', 28, 2100, 10, NULL, 18, N'8A', 25846, NULL, N'FX12980645')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10043, 34802, N'FSCU3708625', N'22G1', 28, 2100, 10, NULL, 17, N'8A', 25053, NULL, N'FX12980593')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10044, 34802, N'TCKU3985679', N'22G1', 28, 2100, 10, NULL, 23, N'8A', 25366, NULL, N'DYW00486036')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10045, 34803, N'DRYU2497291', N'22G1', 28, 2050, 19, NULL, 19, N'8A', 25948, NULL, N'FX12980592')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10046, 34803, N'MEDU6735211', N'22G1', 28, 2100, 10, NULL, 22, N'8A', 25662, NULL, N'FX12980646')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10047, 39733, N'CAIU6296000', N'22G1', 31, 2150, 10, NULL, 14, N'PX', 27944, NULL, N'CN0672577')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10048, 39733, N'MSKU3131144', N'22G1', 31, 2280, 10, NULL, 14, N'PX', 27944, NULL, N'CN0672571')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10049, 39734, N'MRKU6653460', N'22G1', 31, 2170, 10, NULL, 31, N'PX', 27944, NULL, N'CN0672572')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10050, 39734, N'MSKU3781480', N'22G1', 31, 2280, 10, NULL, 14, N'PX', 27944, NULL, N'CN0672580')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10051, 39735, N'MRKU9146406', N'22G1', 31, 2170, 10, NULL, 14, N'PX', 27944, NULL, N'CN0672575')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10052, 39735, N'MSKU3852829', N'22G1', 31, 2290, 10, NULL, 14, N'PX', 27944, NULL, N'CN0672565')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10053, 39736, N'MRKU7812910', N'22G1', 31, 2170, 19, NULL, 14, N'PX', 27944, NULL, N'CN0672579')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10054, 39736, N'MSKU5004827', N'22G1', 31, 2170, 10, NULL, 14, N'PX', 27944, NULL, N'CN0672570')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10055, 39738, N'HASU1128219', N'22G1', 31, 2220, 10, NULL, 14, N'PX', 27944, NULL, N'CN0672576')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10056, 39738, N'MRKU8138936', N'22G1', 31, 2170, 10, NULL, 14, N'PX', 27944, NULL, N'CN0672573')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10057, 41767, N'MSKU5090044', N'22G1', 31, 2170, 19, NULL, 14, N'PX', 27944, NULL, N'CN8081296')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10058, 41767, N'PONU0251491', N'22G1', 31, 2300, 10, NULL, 14, N'PX', 27944, NULL, N'CN8081294')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10059, 41768, N'MSKU4257353', N'22G1', 31, 2170, 10, NULL, 14, N'PX', 27944, NULL, N'CN8081288')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10060, 41768, N'TCLU1399640', N'22G1', 31, 2320, 10, NULL, 14, N'PX', 27944, NULL, N'CN8081291')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10061, 41769, N'MRKU8247958', N'22G1', 31, 2170, 10, NULL, 14, N'PX', 27944, NULL, N'CN8081295')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10062, 41769, N'MRKU8897629', N'22G1', 31, 2170, 10, NULL, 14, N'PX', 27944, NULL, N'CN8081285')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10063, 41770, N'MSKU2448725', N'22G1', 31, 2280, 10, NULL, 14, N'PX', 27944, NULL, N'CN8081298')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10064, 41770, N'MSKU3470169', N'22G1', 31, 2290, 10, NULL, 14, N'PX', 27944, NULL, N'CN8081286')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10065, 41771, N'HASU1408647', N'22G1', 31, 2220, 10, NULL, 14, N'PX', 27944, NULL, N'CN8081281')
INSERT [IDS].[Arrival_UZ_Vagon_Cont] ([id], [id_vagon], [nom_cont], [kod_tiporazmer], [gruzp], [ves_tary_arc], [id_cargo], [id_cargo_gng], [kol_pac], [pac], [vesg], [vesg_reweighing], [nom_zpu]) VALUES (10066, 41771, N'CAIU6267824', N'22G1', 31, 2150, 10, NULL, 14, N'PX', 27944, NULL, N'CN8081287')
SET IDENTITY_INSERT [IDS].[Arrival_UZ_Vagon_Cont] OFF
ALTER TABLE [IDS].[Arrival_UZ_Vagon_Cont]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Cont_Arrival_UZ_Vagon] FOREIGN KEY([id_vagon])
REFERENCES [IDS].[Arrival_UZ_Vagon] ([id])
GO
ALTER TABLE [IDS].[Arrival_UZ_Vagon_Cont] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Cont_Arrival_UZ_Vagon]
GO
ALTER TABLE [IDS].[Arrival_UZ_Vagon_Cont]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Cont_Directory_Cargo] FOREIGN KEY([id_cargo])
REFERENCES [IDS].[Directory_Cargo] ([id])
GO
ALTER TABLE [IDS].[Arrival_UZ_Vagon_Cont] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Cont_Directory_Cargo]
GO
ALTER TABLE [IDS].[Arrival_UZ_Vagon_Cont]  WITH CHECK ADD  CONSTRAINT [FK_Arrival_UZ_Vagon_Cont_Directory_CargoGNG] FOREIGN KEY([id_cargo_gng])
REFERENCES [IDS].[Directory_CargoGNG] ([id])
GO
ALTER TABLE [IDS].[Arrival_UZ_Vagon_Cont] CHECK CONSTRAINT [FK_Arrival_UZ_Vagon_Cont_Directory_CargoGNG]
GO
