---
weight: 30
title: "Step 2: Collecting necessary data"
layout: redirect
---

In the next step, we need the configuration of the geofence for the calculation and grab it.

	monitor.subscribe(FindManagedObjectResponse.CHANNEL);
	...
					integer reqId := integer.getUnique();
						send FindManagedObject(reqId, e.source, new dictionary<string,string>) to
							FindManagedObject.CHANNEL;
							on FindManagedObjectResponse(reqId = reqId) as resp 
					   			and not FindManagedObjectResponseAck(reqId) {
					   
					   ManagedObject dev := resp.managedObject;
					   
	
