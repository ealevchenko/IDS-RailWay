USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[InstructionalLettersWagon]    Script Date: 20.08.2020 14:29:06 ******/
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

ALTER TABLE [IDS].[InstructionalLettersWagon]  WITH CHECK ADD  CONSTRAINT [FK_InstructionalLettersWagon_InstructionalLetters] FOREIGN KEY([id_instructional_letters])
REFERENCES [IDS].[InstructionalLetters] ([id])
GO

ALTER TABLE [IDS].[InstructionalLettersWagon] CHECK CONSTRAINT [FK_InstructionalLettersWagon_InstructionalLetters]
GO


