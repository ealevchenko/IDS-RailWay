USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [UZ].[Directory_InternalRailroad]    Script Date: 02.01.2020 16:57:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [UZ].[Directory_InternalRailroad](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_state] [int] NOT NULL,
	[internal_railroad] [nvarchar](250) NOT NULL,
	[code] [int] NOT NULL,
	[abbr] [nvarchar](10) NOT NULL,
	[list_code_station] [nvarchar](300) NOT NULL,
 CONSTRAINT [PK_Directory_InternalRailroad] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [UZ].[Directory_InternalRailroad] ON 

INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (1, 26, N'Эстонская', 8, N'Эст', N'080005–086209;086228–086232;086800–086800;088308–089315;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (2, 25, N'Латвийская', 9, N'Лат', N'086213–086213;086302–088223;089320–099800;110003–110732;112314–114703;116917–117801;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (3, 24, N'Литовские', 12, N'Лит', N'104106–108766;110802–112302;114714–116724;120005–125206;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (4, 21, N'Белорусская', 13, N'Бел', N'130007–169100;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (5, 23, N'Молдовы', 39, N'Млд', N'390001–399907;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (6, 22, N'Юго-Западная', 32, N'Ю-Зап', N'320007–349912;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (7, 22, N'Львовская', 35, N'Льв', N'350002–389801;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (8, 22, N'Одесская', 40, N'Од', N'400004–424846;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (9, 22, N'Южная', 43, N'Южн', N'425001–432109;432804–433506;434104–434208;435906–436105;436810–437102;440001–449720;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (10, 22, N'Приднепровская', 45, N'Придн', N'450003–478507;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (11, 22, N'Донецкая', 48, N'Дон', N'480009–509264;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (12, 57, N'Азербайджанская', 55, N'Азерб', N'545006–559704;569617–569621;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (13, 58, N'Армянская', 56, N'Арм', N'563108–563108;564702–569602;569706–569903;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (14, 28, N'Грузинская', 57, N'Грз', N'560006–563080;563201–564613;570008–576904;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (15, 59, N'Кыргызская', 70, N'Кырг', N'677402–677807;705015–706906;735203–735203;735307–735307;736704–736808;737904–738112;738339–738606;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (16, 27, N'Казахстан Темір Жолы', 68, N'КТЖ', N'660011–671092;671162;673806–677309;671105–671158;671209–673793;705000;707107–707218;720000–720087;720208–724020;724904;707307–718208;719003;712771–712841;713308–718208;700007–704900;680000-697509;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (17, 29, N'Узбекистон Темир Йуллари', 73, N'Узбк', N'725004–733000;733513–733528;734003–735114;735218–735237;735400–736600;736901–737800;738127–738324;738705–742724;743017–743017;743708–744607;745008–745718;746805–747111;747200–747709;747906–747906;749009–749403;750504–750504;751600–752213;752603–753822;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (18, 66, N'Таджикская', 74, N'Тадж', N'733104–733509;733602–733903;744611–744908;745722–746509;747802–747802;748006–748701;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (19, 67, N'Туркмен-демирел-лары', 75, N'Трк', N'678000–378706;742809–743002;743106–743618;747126–747126;750006–750400;750608–751507;752302–752504;753907–759903;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (20, 20, N'Октябрьская', 1, N'Окт', N'010002–078503;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (21, 20, N'Калининградская', 10, N'Клг', N'100001–104036;108802–109932;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (22, 20, N'Московская', 17, N'Моск', N'170004–239125;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (23, 20, N'Горьковская', 24, N'Горьк', N'240000–278100;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (24, 20, N'Северная', 28, N'Сев', N'280007–319419;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (25, 20, N'Северо-Кавказская', 51, N'С-Кав', N'510007–541448;541734–544906;580003–580404;586203–589502;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (26, 20, N'Юго-Восточная', 58, N'Ю-Вост', N'432113–432363;433510–434000;434227–435817;436114–436805;437206–439803;580512–586114;590001–608421;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (27, 20, N'Приволжская', 61, N'Прив', N'541503–541724;608506–628508;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (28, 20, N'Куйбышевская', 63, N'Кбш', N'630001–659974;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (29, 20, N'Свердловская', 76, N'Сверд', N'760008–799402;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (30, 20, N'Южно-Уральская', 80, N'Ю-Ур', N'800008–829720;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (31, 20, N'Западно-Сибирская', 83, N'З-Сиб', N'830003–876524;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (32, 20, N'Красноярская', 88, N'Крас.', N'880002–896123;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (33, 20, N'Восточно-Сибирская', 92, N'В-Сиб', N'902201–903914;904300–904616;904758–904762;904781–904781;905708–906541;920002–938311;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (34, 20, N'Забайкальская', 94, N'Заб', N'940006–957030;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (35, 20, N'Дальневосточная', 96, N'Д-Вост', N'904003–904003;904601–904601;904705–904743;904777–904777;904809–905002;908000–919804;960007–989402;')
INSERT [UZ].[Directory_InternalRailroad] ([id], [id_state], [internal_railroad], [code], [abbr], [list_code_station]) VALUES (36, 20, N'Сахалинская', 99, N'Сах', N'990005–999902;')
SET IDENTITY_INSERT [UZ].[Directory_InternalRailroad] OFF
ALTER TABLE [UZ].[Directory_InternalRailroad]  WITH CHECK ADD  CONSTRAINT [FK_Directory_InternalRailroad_Directory_States] FOREIGN KEY([id_state])
REFERENCES [UZ].[Directory_States] ([id])
GO
ALTER TABLE [UZ].[Directory_InternalRailroad] CHECK CONSTRAINT [FK_Directory_InternalRailroad_Directory_States]
GO
