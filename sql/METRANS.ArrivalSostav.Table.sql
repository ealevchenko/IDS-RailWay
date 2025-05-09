USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [METRANS].[ArrivalSostav]    Script Date: 02.01.2020 16:54:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [METRANS].[ArrivalSostav](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_arrived] [bigint] NOT NULL,
	[file_name] [nvarchar](50) NOT NULL,
	[composition_index] [nvarchar](50) NOT NULL,
	[date_time] [datetime] NOT NULL,
	[operation] [int] NOT NULL,
	[create] [datetime] NOT NULL,
	[close] [datetime] NULL,
	[arrived] [datetime] NULL,
	[Parent_id] [bigint] NULL,
 CONSTRAINT [PK_ArrivalSostav] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [METRANS].[ArrivalSostav]  WITH CHECK ADD  CONSTRAINT [FK_ArrivalSostav_ArrivalSostav] FOREIGN KEY([Parent_id])
REFERENCES [METRANS].[ArrivalSostav] ([id])
GO
ALTER TABLE [METRANS].[ArrivalSostav] CHECK CONSTRAINT [FK_ArrivalSostav_ArrivalSostav]
GO
