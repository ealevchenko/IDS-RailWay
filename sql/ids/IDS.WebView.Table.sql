USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[WebView]    Script Date: 05.03.2020 16:37:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[WebView](
	[name] [nvarchar](100) NOT NULL,
	[description] [nvarchar](100) NULL,
	[roles] [nvarchar](max) NULL,
	[users] [nvarchar](max) NULL,
 CONSTRAINT [PK_WebView] PRIMARY KEY CLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [IDS].[WebView] ([name], [description], [roles], [users]) VALUES (N'IDSMORS_Home_ElectronicCards_Edit', N'Доступ к правке электронных карточек', N'EUROPE\KRR-LG-PA-RailWay_Developers', N'EUROPE\iaglavatskiy,EUROPE\mpkulenko,EUROPE\vabelyaev,EUROPE\vabalbekin,EUROPE\lspolischuk,EUROPE\avshepeta,EUROPE\lvtverdohleb,EUROPE\tamalina,EUROPE\nnlavrenko')
