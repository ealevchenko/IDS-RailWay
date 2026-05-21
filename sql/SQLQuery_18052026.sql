
use [KRR-PA-CNT-Railway-Test]
select filing_wimc_id,
	[view_filing_division_from_abbr_ru],
	[view_filing_division_from_abbr_en],
	[view_filing_division_on_abbr_ru],
	[view_filing_division_on_abbr_en],
	[view_filing_external_station_on_name_ru],
	[view_filing_external_station_on_name_en],
	[view_filing_station_from_amkr_abbr_ru],
	[view_filing_station_from_amkr_abbr_en],
	[view_filing_station_on_amkr_abbr_ru],
	[view_filing_station_on_amkr_abbr_en],


* from [IDS].[get_view_wagons_filing_of_period_id_station]('2026-05-18 10:00:00.000','2026-05-18 11:00:00.000',2) 
where num = 73997637