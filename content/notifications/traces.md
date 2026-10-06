---
title: Traces
layout: bundle
sector:
  - app_enablement
weight: 30
---

The following is a sample of a trace of messages. The dashed lines are not a part of the message, they are a visual aid to separate the messages in the trace.
```
------------------------
CJ1eEAAgADAB
/tenant-a170/managedobjects/111
CREATE

{"additionParents":{"references":[],"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111/additionParents"},"owner":"admin","childDevices":{"references":[],"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111/childDevices"},"childAssets":{"references":[],"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111/childAssets"},"creationTime":"2021-09-03T12:28:58.692Z","lastUpdated":"2021-09-03T12:28:58.692Z","childAdditions":{"references":[],"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111/childAdditions"},"name":"a switch","assetParents":{"references":[],"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111/assetParents"},"deviceParents":{"references":[],"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111/deviceParents"},"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111","id":"111","com_cumulocity_model_BinarySwitch":{"state":"ON"}}
------------------------
CKReEAAgADAB
/tenant-a170/measurements/111
CREATE

{"self":"http://cumulocity.default.svc.cluster.local/measurement/measurements/117","time":"2021-09-03T12:29:01.664Z","id":"117","source":{"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111","id":"111"},"type":"c8y_TenantUsageStatisticsMeasurement","resourcesUsage":{"memory":0,"cpu":0,"usedBy":[]}}
------------------------
CI9eEAAgADAB
/tenant-a170/events/111
CREATE

{"creationTime":"2021-09-03T12:29:01.932Z","source":{"name":"a switch","self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111","id":"111"},"type":"com_cumulocity_model_DoorSensorEvent","self":"http://cumulocity.default.svc.cluster.local/event/events/118","time":"2021-09-03T12:29:01.664Z","id":"118","text":"Door sensor was triggered"}
------------------------
CAAQACAAMAE=
/tenant-a170/eventsWithChildren/111
CREATE

{"creationTime":"2021-09-03T12:29:01.932Z","source":{"name":"a switch","self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111","id":"111"},"type":"com_cumulocity_model_DoorSensorEvent","self":"http://cumulocity.default.svc.cluster.local/event/events/118","time":"2021-09-03T12:29:01.664Z","id":"118","text":"Door sensor was triggered"}
------------------------
CLJeEAAgADAB
/tenant-a170/managedobjects/111
UPDATE

{"additionParents":{"references":[],"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111/additionParents"},"owner":"admin","childDevices":{"references":[],"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111/childDevices"},"childAssets":{"references":[],"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111/childAssets"},"creationTime":"2021-09-03T12:28:58.692Z","lastUpdated":"2021-09-03T12:28:58.692Z","childAdditions":{"references":[],"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111/childAdditions"},"name":"a switch","assetParents":{"references":[],"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111/assetParents"},"deviceParents":{"references":[],"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111/deviceParents"},"self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111","id":"111","c8y_ActiveAlarmsStatus":{"major":1},"com_cumulocity_model_BinarySwitch":{"state":"ON"}}
------------------------
CMFeEAAgADAB
/tenant-a170/alarms/111
CREATE

{"severity":"MAJOR","creationTime":"2021-09-03T12:29:02.092Z","count":1,"history":{"auditRecords":[],"self":"http://cumulocity.default.svc.cluster.local/audit/auditRecords"},"source":{"name":"a switch","self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111","id":"111"},"type":"com_cumulocity_events_TamperEvent","self":"http://cumulocity.default.svc.cluster.local/alarm/alarms/119","time":"2021-09-03T12:29:01.664Z","id":"119","text":"Tamper sensor triggered","status":"ACTIVE","com_mycorp_MyProp":{"key1":"value1"}}
------------------------
CLxdEBQgADAB
/tenant-a170/alarms/111
CREATE

{"severity":"MAJOR","creationTime":"2021-09-03T12:29:02.092Z","count":1,"history":{"auditRecords":[],"self":"http://cumulocity.default.svc.cluster.local/audit/auditRecords"},"source":{"name":"a switch","self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111","id":"111"},"type":"com_cumulocity_events_TamperEvent","self":"http://cumulocity.default.svc.cluster.local/alarm/alarms/119","time":"2021-09-03T12:29:01.664Z","id":"119","text":"Tamper sensor triggered","status":"ACTIVE","com_mycorp_MyProp":{"key1":"value1"}}
------------------------
CMJdEAAgADAB
/tenant-a170/alarmsWithChildren/111
CREATE

{"severity":"MAJOR","creationTime":"2021-09-03T12:29:02.092Z","count":1,"history":{"auditRecords":[],"self":"http://cumulocity.default.svc.cluster.local/audit/auditRecords"},"source":{"name":"a switch","self":"http://cumulocity.default.svc.cluster.local/inventory/managedObjects/111","id":"111"},"type":"com_cumulocity_events_TamperEvent","self":"http://cumulocity.default.svc.cluster.local/alarm/alarms/119","time":"2021-09-03T12:29:01.664Z","id":"119","text":"Tamper sensor triggered","status":"ACTIVE","com_mycorp_MyProp":{"key1":"value1"}}
```
