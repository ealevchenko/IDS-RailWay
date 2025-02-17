USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [METRANS].[ArrivalCars]    Script Date: 02.01.2020 16:54:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [METRANS].[ArrivalCars](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_sostav] [bigint] NOT NULL,
	[position] [int] NOT NULL,
	[num] [int] NOT NULL,
	[country_code] [int] NOT NULL,
	[wight] [real] NOT NULL,
	[cargo_code] [int] NOT NULL,
	[cargo] [nvarchar](50) NOT NULL,
	[station_code] [int] NOT NULL,
	[station] [nvarchar](50) NOT NULL,
	[consignee] [int] NOT NULL,
	[operation] [nvarchar](50) NOT NULL,
	[composition_index] [nvarchar](50) NOT NULL,
	[date_operation] [datetime] NOT NULL,
	[train] [int] NOT NULL,
	[num_doc_arrived] [int] NULL,
	[arrived] [datetime] NULL,
	[parent_id] [bigint] NULL,
	[user_name] [nvarchar](50) NULL,
 CONSTRAINT [PK_ArrivalCars] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [METRANS].[ArrivalCars]  WITH CHECK ADD  CONSTRAINT [FK_ArrivalCars_ArrivalCars] FOREIGN KEY([parent_id])
REFERENCES [METRANS].[ArrivalCars] ([id])
GO
ALTER TABLE [METRANS].[ArrivalCars] CHECK CONSTRAINT [FK_ArrivalCars_ArrivalCars]
GO
ALTER TABLE [METRANS].[ArrivalCars]  WITH CHECK ADD  CONSTRAINT [FK_ArrivalCars_ArrivalSostav] FOREIGN KEY([id_sostav])
REFERENCES [METRANS].[ArrivalSostav] ([id])
GO
ALTER TABLE [METRANS].[ArrivalCars] CHECK CONSTRAINT [FK_ArrivalCars_ArrivalSostav]
GO
