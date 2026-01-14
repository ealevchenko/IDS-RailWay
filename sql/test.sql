


declare @datetime datetime = '2025-09-10' 

SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[WagonFiling] where [id] in 
(SELECT distinct([id_filing]) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_wagon_internal_routes] in (SELECT id FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null OR [close] >=@datetime)) 
and [id_filing] is not null)


--		SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim 
--		where [id_wagon_internal_routes] in (SELECT distinct(id) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null or [close] >=@datetime))
	  





--SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null or [close] >=@datetime) --and (id_outgoing_car is not null or id_sap_outbound_supply is not null)


--SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[WagonFiling] where [id] in 
--(SELECT distinct([id_filing]) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_wagon_internal_routes] in (SELECT id FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null OR [close] >=@datetime)) 
--and [id_filing] is not null)






--SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] as wim 
--where [id_wagon_internal_routes] in (SELECT distinct(id) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null or [close] >=@datetime))

--SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalOperation] 
--where [id_wagon_internal_routes] in (SELECT id FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null OR [close] >=@datetime))


--SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMoveCargo]
--where [id_wagon_internal_routes] in (SELECT distinct(id) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null or [close] >=@datetime))



--SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null or [close] >=@datetime) and (id_outgoing_car is not null or id_sap_outbound_supply is not null)

--SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] 
--where id in 
--(
--SELECT distinct(id_outgoing_car) FROM [KRR-PA-CNT-Railway].[IDS].[SAPOutgoingSupply] 
--where id in (SELECT distinct(id_sap_outbound_supply) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null or [close] >=@datetime) and (id_outgoing_car is not null or id_sap_outbound_supply is not null))
--union
--SELECT distinct(id_outgoing_car) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null or [close] >=@datetime) and (id_outgoing_car is not null or id_sap_outbound_supply is not null)
--)

--SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[SAPOutgoingSupply] 
--where id in 
--(SELECT distinct(id_sap_outbound_supply) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null or [close] >=@datetime) and (id_outgoing_car is not null or id_sap_outbound_supply is not null))





--SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] 
--where id in 
--(SELECT distinct(id_outgoing_car) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null or [close] >=@datetime) and (id_outgoing_car is not null or id_sap_outbound_supply is not null))

--SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] 
--where id in 
--(SELECT distinct(id_outgoing_car) FROM [KRR-PA-CNT-Railway].[IDS].[SAPOutgoingSupply] 
--where id in 
--(SELECT distinct(id_sap_outbound_supply) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null or [close] >=@datetime) and (id_outgoing_car is not null or id_sap_outbound_supply is not null))
--)




--SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[SAPOutgoingSupply] 
--where id in (SELECT distinct(id_sap_outbound_supply) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null or [close] >=@datetime) and (id_outgoing_car is not null or id_sap_outbound_supply is not null))


--where id in (SELECT distinct([id_sap_outbound_supply]) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] 
--where ([close] is null) or ([close] >=@datetime) and [id_sap_outbound_supply] is not null)




--declare @datetime datetime = '2025-09-10' 
--SELECT * FROM [KRR-PA-CNT-Railway].[IDS].[OutgoingCars] 
--where id in (SELECT distinct(id_outgoing_car) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null) or ([close] >=@datetime) and id_outgoing_car is not null)



--declare @datetime datetime = '2025-09-10'

--SELECT * FROM [KRR-PA-CNT-Railway].[SAP].[Out_Supply]
--where id in (SELECT distinct(id_out_supply) FROM [KRR-PA-CNT-Railway].[IDS].[SAPOutgoingSupply]
--where id in (SELECT distinct([id_sap_outbound_supply]) 
--FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalRoutes] where ([close] is null) or ([close] >=@datetime) and [id_sap_outbound_supply] is not null	))

