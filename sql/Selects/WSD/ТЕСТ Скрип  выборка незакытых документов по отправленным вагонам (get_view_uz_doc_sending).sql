select * from [IDS].[get_view_uz_doc_sending]()

select * from [IDS].[get_view_uz_doc_sending]() where status_sostav >=2 and  [position_outgoing] is not null and ([num_doc] is null or [status]<8)

select * from [IDS].[get_view_uz_doc_sending]() where status_sostav >=2 and  [position_outgoing] is not null and ([num_doc] is null or [status]<>8)