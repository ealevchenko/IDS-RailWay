USE [KRR-PA-CNT-Railway]
GO

/****** Object:  Table [IDS].[InternalMovementCars]    Script Date: 08.09.2021 13:04:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [IDS].[InternalMovementCars](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_sostav] [int] NOT NULL,
	[id_wim] [bigint] NOT NULL,
	[note] [nvarchar](250) NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_InternalMovementCars] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [IDS].[InternalMovementCars]  WITH CHECK ADD  CONSTRAINT [FK_InternalMovementCars_InternalMovementSostav] FOREIGN KEY([id_sostav])
REFERENCES [IDS].[InternalMovementSostav] ([id])
GO

ALTER TABLE [IDS].[InternalMovementCars] CHECK CONSTRAINT [FK_InternalMovementCars_InternalMovementSostav]
GO

ALTER TABLE [IDS].[InternalMovementCars]  WITH CHECK ADD  CONSTRAINT [FK_InternalMovementCars_WagonInternalMovement] FOREIGN KEY([id_wim])
REFERENCES [IDS].[WagonInternalMovement] ([id])
GO

ALTER TABLE [IDS].[InternalMovementCars] CHECK CONSTRAINT [FK_InternalMovementCars_WagonInternalMovement]
GO


