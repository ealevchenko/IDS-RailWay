USE [KRR-PA-CNT-Railway]
GO
/****** Object:  Table [METRANS].[ApproachesSostav]    Script Date: 02.01.2020 16:54:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [METRANS].[ApproachesSostav](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[file_name] [nvarchar](50) NOT NULL,
	[composition_index] [nvarchar](50) NOT NULL,
	[date_time] [datetime] NOT NULL,
	[create] [datetime] NOT NULL,
	[close] [datetime] NULL,
	[approaches] [datetime] NULL,
	[parent_id] [bigint] NULL,
 CONSTRAINT [PK_ApproachesSostav] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [METRANS].[ApproachesSostav]  WITH CHECK ADD  CONSTRAINT [FK_ApproachesSostav_ApproachesSostav] FOREIGN KEY([parent_id])
REFERENCES [METRANS].[ApproachesSostav] ([id])
GO
ALTER TABLE [METRANS].[ApproachesSostav] CHECK CONSTRAINT [FK_ApproachesSostav_ApproachesSostav]
GO
