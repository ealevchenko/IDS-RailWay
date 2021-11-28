use [KRR-PA-CNT-Railway]

select * from [IDS].[get_view_uz_doc_sending]() where status_sostav >=2 and  [position_outgoing] is not null and ([num_doc] is null or [status]<8)-- and [date_outgoing] > CONVERT(datetime,'2021-09-26 00:00:00',120) --[id_outgoing] = 107442 and 

  order by [date_outgoing], [id_sostav], [position_outgoing]
