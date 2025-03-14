USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[InstructionalLetters]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[InstructionalLetters](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[num] [nvarchar](20) NOT NULL,
	[dt] [datetime] NOT NULL,
	[owner] [nvarchar](200) NOT NULL,
	[destination_station] [int] NOT NULL,
	[note] [nvarchar](500) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_InstructionalLetters] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[InstructionalLetters] ON 

INSERT [IDS].[InstructionalLetters] ([id], [num], [dt], [owner], [destination_station], [note], [create], [create_user], [change], [change_user]) VALUES (6, N'1', CAST(N'2020-09-01T00:00:00.000' AS DateTime), N'тестовый', 467004, N'тест', CAST(N'2020-09-01T09:48:20.557' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[InstructionalLetters] ([id], [num], [dt], [owner], [destination_station], [note], [create], [create_user], [change], [change_user]) VALUES (7, N'1', CAST(N'2020-09-01T00:00:00.000' AS DateTime), N'тестовый 2', 467004, N'тест2', CAST(N'2020-09-01T09:48:59.873' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
SET IDENTITY_INSERT [IDS].[InstructionalLetters] OFF
