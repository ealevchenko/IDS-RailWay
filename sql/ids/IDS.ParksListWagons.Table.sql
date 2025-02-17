USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [IDS].[ParksListWagons]    Script Date: 05.03.2020 16:37:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IDS].[ParksListWagons](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_park_wagon] [int] NOT NULL,
	[num] [int] NOT NULL,
 CONSTRAINT [PK_ParksListWagons] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [IDS].[ParksListWagons] ON 

INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18393, 26, 51553360)
INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18394, 26, 51553402)
INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18395, 26, 51553550)
INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18396, 26, 51581031)
INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18397, 26, 51581155)
INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18398, 26, 51581247)
INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18400, 26, 51581809)
INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18401, 26, 51765196)
INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18402, 26, 51765212)
INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18403, 26, 51765220)
INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18404, 26, 51765261)
INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18405, 26, 51765279)
INSERT [IDS].[ParksListWagons] ([id], [id_park_wagon], [num]) VALUES (18406, 26, 51765303)
SET IDENTITY_INSERT [IDS].[ParksListWagons] OFF
ALTER TABLE [IDS].[ParksListWagons]  WITH CHECK ADD  CONSTRAINT [FK_ParksListWagons_CardsWagons] FOREIGN KEY([num])
REFERENCES [IDS].[CardsWagons] ([num])
GO
ALTER TABLE [IDS].[ParksListWagons] CHECK CONSTRAINT [FK_ParksListWagons_CardsWagons]
GO
ALTER TABLE [IDS].[ParksListWagons]  WITH CHECK ADD  CONSTRAINT [FK_ParksListWagons_ParksWagons] FOREIGN KEY([id_park_wagon])
REFERENCES [IDS].[ParksWagons] ([id])
GO
ALTER TABLE [IDS].[ParksListWagons] CHECK CONSTRAINT [FK_ParksListWagons_ParksWagons]
GO
