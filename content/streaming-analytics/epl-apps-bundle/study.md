---
weight: 60
title: Study - Circular geofence alarms
layout: redirect
---

### Overview {#overview}

This section gives an in-depth example how you can create more complex rules. It uses multiple of the features explained before in the other sections of this guide.

If you are just starting with Apama EPL, take a look at [Examples](/streaming-analytics/epl-apps/#examples).

### Prerequisites {#prerequisites}

#### Goal {#goal}

We want our tracking devices that are continuously sending location events to automatically generate alarms if they move outside a geofence. This geofence will be a circle and should be configurable for each device separately. The alarm will be created at the moment the device moves outside the geofence. While it is moving outside, it should not create new alarms because the first one will remain active. As soon as the device moves back into the geofence, the alarm will be cleared.

#### {{< product-c8y-iot >}} data model {#platform-data-model}

Location event structure (the part we need):

    {
      "id": "...",
      "source": {"id": "..."},
      "text": "...",
      "time": "...",
      "type": "...",
      "c8y_Position": {"alt": ..., "lng": ..., "lat": ...}
    }

We store the geofence configuration in the device (the radius will be configured in meters):

    {
      "c8y_Geofence": {"lat": ..., "lng": ..., "radius": ...}
    }

Additionally, we want to enable/disable the geofence alarms for each device without removing the configuration entirely. We will do that by adding/removing "c8y_Geofence" to `c8y_SupportedOperations` in the device:

    {
      "c8y_SupportedOperations": [..., "c8y_Geofence", ...]
    }

#### Calculation {#calculation}

The device is outside of the geofence if the distance between the current position and the center is bigger than the configured radius of the geofence. What we need is a function that can calculate the difference between *two* geo-coordinates:

```java
action distance(float lat1, float lon1, float lat2, float lon2) returns float {
	float R := 6371000.0;
	float toRad := float.PI / 180.0;
	float lat1Rad := lat1 * toRad;
	float lat2Rad := lat2 * toRad;
	float deltaLatRad := (lat2-lat1) * toRad;
	float deltaLonRad := (lat2-lat1) * toRad;
	float a := (deltaLatRad/2.0).sin().pow(2.0) * lat1Rad.cos() * lat2Rad.cos() * (deltaLonRad/2.0).sin().pow(2.0);
	float c := 2.0 * a.sqrt().atan2((1.0-a).sqrt());
	return R * c;
}
```

The above action will return the distance in meters.

### Step 1: Filtering the input {#step-1-filtering-the-input}

The main input for this module will be events. To discard non-matching events as early as possible, we perform this as the first check in the listener:

```java
monitor.subscribe(Measurement.SUBSCRIBE_CHANNEL);
on all Event() as e {
	if e.params.hasKey("c8y_Position") {
		// we have an event
	}
}
```

### Step 2: Collecting necessary data {#step-2-collecting-necessary-data}

In the next step, we need the configuration of the geofence for the calculation and grab it.

```java
monitor.subscribe(FindManagedObjectResponse.SUBSCRIBE_CHANNEL);
...
integer reqId := integer.getUnique();
send FindManagedObject(reqId, e.source, new dictionary<string,string>) to FindManagedObject.SEND_CHANNEL;
on FindManagedObjectResponse(reqId = reqId) as resp
   and not FindManagedObjectResponseAck(reqId) {
	  ManagedObject dev := resp.managedObject;
   }
```

### Step 3: Checking if the device supports c8y_Geofence {#step-3-checking-if-the-device-supports-c8ygeofence}

With the device available we will now check if there is a geofence configured for the device and if it is activated (contains "c8y_Geofence" in `supportedOperations`). To check the `c8y_SupportedOperations` array, we can use the `indexOf()` function. This function will loop through all elements and return the index of that entry, or a negative number if the value is not present. For the configuration, we will just check if the device contains the fragment "c8y_Geofence".

Once we have an event and a device, we extract the data from the event's `c8y_Position` and the device's `c8y_Geofence`. These objects are mapped to `dictionary<any, any>` entries in the `params`. As the `params` hold values of type `any`, we must cast to a `dictionary<any, any>`.

```java
if(dev.params.hasKey("c8y_Geofence") and dev.supportedOperations.indexOf("c8y_Geofence") >= 0) {
	dictionary<any, any> evtPos := <dictionary<any, any> > e.params["c8y_Position"];
	float eventLat := <float> evtPos["lat"];
	float eventLng := <float> evtPos["lng"];

	dictionary<any,any> devGeofence := <dictionary<any,any> > dev.params["c8y_Geofence"];
	float centerLat := <float> devGeofence["lat"];
	float centerLng := <float> devGeofence["lng"];
	float maxDistance := <float> devGeofence["radius"];
}
```

### Step 4: Creating the trigger {#step-4-creating-the-trigger}

As mentioned earlier, the device is outside of the fence if the distance between the current device position and the geofence center is bigger than the configured geofence radius. To trigger the alarm, we need two events so we can check if the device entered or left the geofence within these two events.

In the first step, we calculate the distance with the function mentioned earlier:

```java
float d := distance(centerLat, centerLng, eventLat, eventLng);
```

Now we re-route this as an event with:

```java
event LocationEventWithDistance {
	string source;
	float distance;
	Event e;
	float maxDistance;
}

...

route LocationEventWithDistance(e.source, d, e, maxDistance);
```

We place the source in the event so we can easily match it in a listener.

We now set up a listener triggered by the event `LocationEventWithDistance`, listening for the next `LocationEventWithDistance` - for the same source:

```java
on all LocationEventWithDistance() as firstPos {
	on LocationEventWithDistance(source = firstPos.source) as secondPos {
		// now have two events with distances
	}
}
```

This pair of `LocationEventWithDistance` events now holds all data for checking if we should create the alarm or not. Note that we are filtering the `secondPos` event to be for the same source as the first - there will be an active listener for every device we have received an event from.

### Step 5: Creating the alarm {#step-5-creating-the-alarm}

To create the alarm, we now need two events where the first one has a distance smaller than the radius and the second one has a distance bigger than the radius. This would mean that the device just left the geofence.

```java
if firstPos.distance <= firstPos.maxDistance and
	secondPos.distance > secondPos.maxDistance {
	send Alarm("", "c8y_GeofenceAlarm", firstPos.source, currentTime,
					"Device moved out of circular geofence", "ACTIVE",
					"MAJOR", 1, new dictionary<string,any>) to Alarm.SEND_CHANNEL;
}
```

### Step 6: Clearing the alarm {#step-6-clearing-the-alarm}

To clear the alarm, we must just switch the condition at the bottom and additionally grab the currently active alarm to get its ID. We do not need to care about whether there is an existing alarm at this point. If there is none, the listener will trigger the `and not FindAlarmResponseAck`, terminating the listener:

	monitor.subscribe(FindAlarmResponse.SUBSCRIBE_CHANNEL);
	...
	if firstPos.distance > firstPos.maxDistance and
		secondPos.distance <= secondPos.maxDistance {
		integer reqId:= integer.getUnique();
		send FindAlarm(reqId, {"source": firstPos.source,
			"status": "ACTIVE", "type": "c8y_GeofenceAlarm"}) to FindAlarm.SEND_CHANNEL;
		on FindAlarmResponse(reqId=reqId) as alarmResponse
		   and not FindAlarmResponseAck(reqId=reqId) {
			send Alarm(alarmResponse.id, "c8y_GeofenceAlarm",
						firstPos.source, currentTime, "Device moved back into circular geofence",
						"CLEARED", alarmResponse.alarm.severity, 1, new dictionary<string, any>) to Alarm.SEND_CHANNEL;
		}
	}

### Putting everything together {#putting-everything-together}

We can now combine all the parts into one module. The order of the listeners does not matter.

```java
using com.apama.cumulocity.ManagedObject;
using com.apama.cumulocity.Measurement;
using com.apama.cumulocity.Event;
using com.apama.cumulocity.Alarm;
using com.apama.cumulocity.FindManagedObject;
using com.apama.cumulocity.FindManagedObjectResponse;
using com.apama.cumulocity.FindManagedObjectResponseAck;
using com.apama.cumulocity.FindAlarm;
using com.apama.cumulocity.FindAlarmResponse;
using com.apama.cumulocity.FindAlarmResponseAck;

monitor MonitorDevicesForCircularGeofence {

	event LocationEventWithDistance {
		string source;
		float distance;
		Event e;
		float maxDistance;
	}

	action onload {
		monitor.subscribe(Measurement.SUBSCRIBE_CHANNEL);
		monitor.subscribe(FindManagedObjectResponse.SUBSCRIBE_CHANNEL);
		monitor.subscribe(FindAlarmResponse.SUBSCRIBE_CHANNEL);
		on all Event() as e {
			if e.params.hasKey("c8y_Position") {
				// we have an event
				integer reqId := integer.getUnique();
				send FindManagedObject(reqId, e.source, new dictionary<string,string>) to FindManagedObject.SEND_CHANNEL;
				on FindManagedObjectResponse(reqId = reqId) as resp
				and not FindManagedObjectResponseAck(reqId) {
				ManagedObject dev := resp.managedObject;

				if(dev.params.hasKey("c8y_Geofence") and dev.supportedOperations.indexOf("c8y_Geofence") >= 0) {

						dictionary<any, any> evtPos := <dictionary<any, any> > e.params["c8y_Position"];
						float eventLat := <float> evtPos["lat"];
						float eventLng := <float> evtPos["lng"];

						dictionary<any,any> devGeofence := <dictionary<any,any> > dev.params["c8y_Geofence"];
						float centerLat := <float> devGeofence["lat"];
						float centerLng := <float> devGeofence["lng"];
						float maxDistance := <float> devGeofence["radius"];

						float d := distance(centerLat, centerLng, eventLat, eventLng);

						route LocationEventWithDistance(e.source, d, e, maxDistance);
					}
				}
			}
		}

		on all LocationEventWithDistance() as firstPos {
			on LocationEventWithDistance(source = firstPos.source) as secondPos {
				// now have two events with distances
				if firstPos.distance <= firstPos.maxDistance and
					secondPos.distance > secondPos.maxDistance {
					send Alarm("", "c8y_GeofenceAlarm", firstPos.source, currentTime,
							"Device moved out of circular geofence", "ACTIVE",
							"MAJOR", 1, new dictionary<string,any>) to Alarm.SEND_CHANNEL;
				}

				if firstPos.distance > firstPos.maxDistance and
					secondPos.distance <= secondPos.maxDistance {
					integer reqId:= integer.getUnique();
					send FindAlarm(reqId, {"source": firstPos.source,
						"status": "ACTIVE", "type": "c8y_GeofenceAlarm"}) to FindAlarm.SEND_CHANNEL;
					on FindAlarmResponse(reqId=reqId) as alarmResponse
					and not FindAlarmResponseAck(reqId=reqId) {
						send Alarm(alarmResponse.id, "c8y_GeofenceAlarm",
								firstPos.source, currentTime, "Device moved back into circular geofence",
								"CLEARED", alarmResponse.alarm.severity, 1, new dictionary<string, any>) to Alarm.SEND_CHANNEL;
					}
				}
			}
		}
	}

	action distance(float lat1, float lon1, float lat2, float lon2) returns float {
		float R := 6371000.0;
		float toRad := float.PI / 180.0;
		float lat1Rad := lat1 * toRad;
		float lat2Rad := lat2 * toRad;
		float deltaLatRad := (lat2-lat1) * toRad;
		float deltaLonRad := (lat2-lat1) * toRad;
		float a := (deltaLatRad/2.0).sin().pow(2.0) * lat1Rad.cos() * lat2Rad.cos() * (deltaLonRad/2.0).sin().pow(2.0);
		float c := 2.0 * a.sqrt().atan2((1.0-a).sqrt());
		return R * c;
	}
}
```
