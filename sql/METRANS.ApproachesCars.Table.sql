USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [METRANS].[ApproachesCars]    Script Date: 02.01.2020 16:54:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [METRANS].[ApproachesCars](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[id_sostav] [bigint] NOT NULL,
	[composition_index] [nvarchar](50) NOT NULL,
	[num] [int] NOT NULL,
	[country_code] [int] NOT NULL,
	[weight] [real] NOT NULL,
	[cargo_code] [int] NOT NULL,
	[train_number] [int] NOT NULL,
	[operation] [nvarchar](50) NOT NULL,
	[date_operation] [datetime] NOT NULL,
	[code_station_from] [int] NOT NULL,
	[code_station_on] [int] NOT NULL,
	[code_station_current] [int] NOT NULL,
	[count_wagons] [int] NOT NULL,
	[sum_weight] [int] NOT NULL,
	[flag_cargo] [int] NOT NULL,
	[route] [int] NOT NULL,
	[owner] [int] NOT NULL,
	[num_doc_arrived] [int] NULL,
	[arrived] [datetime] NULL,
	[parent_id] [bigint] NULL,
	[user_name] [nvarchar](50) NULL,
 CONSTRAINT [PK_ApproachesCars] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [METRANS].[ApproachesCars]  WITH CHECK ADD  CONSTRAINT [FK_ApproachesCars_ApproachesCars] FOREIGN KEY([parent_id])
REFERENCES [METRANS].[ApproachesCars] ([id])
GO
ALTER TABLE [METRANS].[ApproachesCars] CHECK CONSTRAINT [FK_ApproachesCars_ApproachesCars]
GO
ALTER TABLE [METRANS].[ApproachesCars]  WITH CHECK ADD  CONSTRAINT [FK_ApproachesCars_ApproachesSostav] FOREIGN KEY([id_sostav])
REFERENCES [METRANS].[ApproachesSostav] ([id])
GO
ALTER TABLE [METRANS].[ApproachesCars] CHECK CONSTRAINT [FK_ApproachesCars_ApproachesSostav]
GO
