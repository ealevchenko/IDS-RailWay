USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[InstructionalLettersWagon]    Script Date: 15.09.2020 16:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[InstructionalLettersWagon](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_instructional_letters] [int] NOT NULL,
	[num] [int] NOT NULL,
	[close] [datetime] NULL,
	[close_status] [int] NULL,
	[note] [nvarchar](200) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_InstructionalLettersWagon] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[InstructionalLettersWagon] ON 

INSERT [IDS].[InstructionalLettersWagon] ([id], [id_instructional_letters], [num], [close], [close_status], [note], [create], [create_user], [change], [change_user]) VALUES (28, 6, 65287310, CAST(N'2020-09-01T09:49:03.353' AS DateTime), 1, N'Закрыт письмом №1 от 2020-09-01T00:00:00 id=7', CAST(N'2020-09-01T09:48:21.057' AS DateTime), N'EUROPE\ealevchenko', CAST(N'2020-09-01T09:49:03.353' AS DateTime), N'EUROPE\ealevchenko')
INSERT [IDS].[InstructionalLettersWagon] ([id], [id_instructional_letters], [num], [close], [close_status], [note], [create], [create_user], [change], [change_user]) VALUES (29, 6, 61769469, NULL, NULL, NULL, CAST(N'2020-09-01T09:48:21.057' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
INSERT [IDS].[InstructionalLettersWagon] ([id], [id_instructional_letters], [num], [close], [close_status], [note], [create], [create_user], [change], [change_user]) VALUES (30, 7, 65287310, NULL, NULL, NULL, CAST(N'2020-09-01T09:49:03.393' AS DateTime), N'EUROPE\ealevchenko', NULL, NULL)
SET IDENTITY_INSERT [IDS].[InstructionalLettersWagon] OFF
ALTER TABLE [IDS].[InstructionalLettersWagon]  WITH CHECK ADD  CONSTRAINT [FK_InstructionalLettersWagon_InstructionalLetters] FOREIGN KEY([id_instructional_letters])
REFERENCES [IDS].[InstructionalLetters] ([id])
GO
ALTER TABLE [IDS].[InstructionalLettersWagon] CHECK CONSTRAINT [FK_InstructionalLettersWagon_InstructionalLetters]
GO
