select * from [IDS].[get_outgoing_sostav]()
where id_way_from = 216 and status <3 and count_all <> count_return
order by 1 desc