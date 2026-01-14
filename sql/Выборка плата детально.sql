SELECT TOP (1000) [id]
      ,[id_usage_fee_period]
      ,[code_stn_from]
      ,[id_cargo_arrival]
      ,[code_stn_to]
      ,[id_cargo_outgoing]
      ,[grace_time]
      ,[id_currency]
      ,[rate]
  FROM [KRR-PA-CNT-Railway-Test].[IDS].[Usage_Fee_Period_Detali]

 select * from[IDS].[get_view_usage_fee_period_detali_of_id_period](2350);
