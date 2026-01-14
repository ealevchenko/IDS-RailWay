USE [KRR-PA-CNT-Railway]
GO

/****** Object:  UserDefinedFunction [IDS].[get_last_wms]    Script Date: 23.03.2023 9:39:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







CREATE FUNCTION [IDS].[get_operators_and_genus] 
 (

 )
RETURNS 
@operators_genus Table (
	[id_operator] [int] NULL,
	[id_genus] [int] NULL,
	[operators_ru] [nvarchar](100) NULL,
	[operators_en] [nvarchar](100) NULL,
	[operators_abbr_ru] [nvarchar](20) NULL,
	[operators_abbr_en] [nvarchar](20) NULL,
	[rod_uz] [int] NULL,
	[genus_ru] [nvarchar](50) NULL,
	[genus_en] [nvarchar](50) NULL,
	[genus_abbr_ru] [nvarchar](5) NULL,
	[genus_abbr_en] [nvarchar](5) NULL
)
AS
BEGIN
	insert @operators_genus
	SELECT
      rent.[id_operator]
	  ,dir_wag.[id_genus]
      ,dir_oper.[operators_ru]
      ,dir_oper.[operators_en]
	  ,dir_oper.[abbr_ru] as operators_abbr_ru
      ,dir_oper.[abbr_en] as operators_abbr_en
      ,dir_genus.[rod_uz]
      ,dir_genus.[genus_ru]
      ,dir_genus.[genus_en]
	  ,dir_genus.[abbr_ru] as genus_abbr_ru
      ,dir_genus.[abbr_en] as genus_abbr_en
  FROM  [IDS].[Directory_WagonsRent] as rent
  	--> Прибытие состава
	Left JOIN [IDS].[Directory_Wagons] as dir_wag ON dir_wag.num = rent.num
	Left JOIN [IDS].[Directory_OperatorsWagons] as dir_oper ON dir_oper.id = rent.[id_operator]
	Left JOIN [IDS].[Directory_GenusWagons] as dir_genus ON dir_genus.id = dir_wag.[id_genus]
  where rent.[rent_end] is null and rent.[id_operator] is not null
  group by 
   dir_wag.[id_genus]
   	  ,dir_genus.[abbr_ru]
      ,dir_genus.[genus_ru]
      ,dir_genus.[abbr_en]
      ,dir_genus.[genus_en]
      ,dir_genus.[rod_uz]
  , rent.[id_operator]
  	  ,dir_oper.[abbr_ru]
      ,dir_oper.[operators_ru]
      ,dir_oper.[abbr_en]
      ,dir_oper.[operators_en]
  order by rent.[id_operator], dir_wag.[id_genus]
  RETURN
 END




GO


