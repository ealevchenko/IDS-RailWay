USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[WebAccess]    Script Date: 05.03.2020 16:37:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[WebAccess](
	[areas] [nvarchar](100) NOT NULL,
	[controller] [nvarchar](100) NOT NULL,
	[action] [nvarchar](100) NOT NULL,
	[description] [nvarchar](100) NULL,
	[roles] [nvarchar](max) NULL,
	[users] [nvarchar](max) NULL,
 CONSTRAINT [PK_WebAccess] PRIMARY KEY CLUSTERED 
(
	[areas] ASC,
	[controller] ASC,
	[action] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [IDS].[WebAccess] ([areas], [controller], [action], [description], [roles], [users]) VALUES (N'IDSMORS', N'Home', N'ElectronicCards', N'Электронные карточки собственных вагонов', N'EUROPE\KRR-LG-PA-RailWay_Developers', N'EUROPE\iaglavatskiy,EUROPE\avzaytsev,EUROPE\nashidlovskiy,EUROPE\mpkulenko,EUROPE\vabelyaev,EUROPE\vabalbekin,EUROPE\lspolischuk,EUROPE\avshepeta,EUROPE\lvtverdohleb,EUROPE\tamalina,EUROPE\nnlavrenko,EUROPE\igarih,EUROPE\rvpopov,EUROPE\anrybalkin,EUROPE\vvkisel,EUROPE\osnechaeva,EUROPE\anvalekseenko,EUROPE\tfivashina,EUROPE\yaradko;EUROPE\anvshepeta')
INSERT [IDS].[WebAccess] ([areas], [controller], [action], [description], [roles], [users]) VALUES (N'IDSMORS', N'Home', N'ParksWagons', N'Парки подвижного состава', N'EUROPE\KRR-LG-PA-RailWay_Developers', N'EUROPE\iaglavatskiy,EUROPE\avzaytsev,EUROPE\nashidlovskiy,EUROPE\mpkulenko,EUROPE\vabelyaev,EUROPE\vabalbekin,EUROPE\lspolischuk,EUROPE\avshepeta,EUROPE\lvtverdohleb,EUROPE\tamalina,EUROPE\nnlavrenko,EUROPE\igarih,EUROPE\rvpopov,EUROPE\anrybalkin,EUROPE\vvkisel,EUROPE\osnechaeva,EUROPE\anvalekseenko,EUROPE\tfivashina,EUROPE\yaradko;EUROPE\anvshepeta')
