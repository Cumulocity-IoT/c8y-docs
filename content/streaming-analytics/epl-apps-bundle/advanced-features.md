---
weight: 30
title: Advanced features
layout: redirect
---

### Custom fragments {#custom-fragments}

{{< product-c8y-iot >}} APIs let you structure your data freely. In Apama EPL, this is done by adding entries to `params`, which is of the type `dictionary<string, any>`. Each {{< product-c8y-iot >}} event in the `com.apama.cumulocity` package (such as `Alarm`, `Event`, `Measurement` or `Operation`) has a `params` field, which is translated to fragments or optional fields. Thus, when receiving events, your code must look up entries in the `params` field. When sending events, this can be done by defining event types, or you can use the `dictionary<string, any>` type. When receiving events, the EPL type is `dictionary<any, any>`. Note that EPL is strongly typed, so if you are creating an event with no fragments, a `new dictionary<string, any>` expression is required. If you are providing entries inline with a dictionary literal, then EPL determines the type based on the type of the first key-value pair - thus, for `dictionary<string, any>`, cast the first value to an `any` type with the `<any>` cast operator:

```java
send Event(..., new dictionary<string,any>) to Event.SEND_CHANNEL;
send Event(..., {"fragment":<any>"value"}) to Event.SEND_CHANNEL;
```

The `MeasurementValue` type is provided for the measurements in the `Measurement` type. `MeasurementValue` has `value` and `unit` fields and `params` for other fragments.

**Example 1**:

```java
send Measurement("", "c8y_TemperatureMeasurement", "12345", currentTime, {
	"c8y_TemperatureMeasurement":{
		"T1":MeasurementValue(1.0, "C", new dictionary<string,any>),
		"T2":MeasurementValue(2.0, "C", new dictionary<string,any>),
		"T3":MeasurementValue(3.0, "C", new dictionary<string,any>),
		"T4":MeasurementValue(4.0, "C", new dictionary<string,any>),
		"T5":MeasurementValue(5.0, "C", new dictionary<string,any>)
	}},
	new dictionary<string,any>) to Measurement.SEND_CHANNEL;
```

This will result in the following JSON structure:

```json
{
	"type": "c8y_TemperatureMeasurement",
	"time": "...",
	"source": {
		"id": "12345"
	},
	"c8y_TemperatureMeasurement": {
		"T1": {
			"value": 1,
			"unit": "C"
		},
		"T2": {
			"value": 1,
			"unit": "C"
		},
		"T3": {
			"value": 1,
			"unit": "C"
		},
		"T4": {
			"value": 1,
			"unit": "C"
		},
		"T5": {
			"value": 1,
			"unit": "C"
		},
	}
}
```


### Measurement fragments {#measurement-fragments-advanced}

A measurement can be broken into individual measurement fragments. This can be done for each fragment and series present in the measurement.
See [{{< product-c8y-iot >}}'s domain model](/concepts/domain-model/) for more information on measurement fragments.

Listen for events of type `com.apama.cumulocity.MeasurementFragment` when you require filtering based on measurement fragments or series,
instead of listening for `com.apama.cumulocity.Measurement` events and looking inside the `measurements` dictionary.
For more information, see [Using measurement fragments]({{< link-apama-webhelp >}}/standard-connectivity-plugins/the-cumulocity-iot-transport-connectivity-plug-in/#using-measurement-fragments) in the Apama documentation.

### Listeners {#listeners}

Triggering a statement by an arriving event is not the only possibility. The following sections cover other ways to combine listeners. Refer to [Defining Event Listeners]({{< link-apama-webhelp >}}/developing-apama-applications-in-epl/defining-event-listeners/) in the Apama documentation for full details.

#### Filters {#filters}

Filters enable you to trigger by combinations or sequences of other triggers. If you have a trigger like this

```java
on all Event() as e { ... }
```
it is also possible to add filters in the pattern.

```java
on all Event(type = "c8y_EntranceEvent") as e { ... }
```
You can listen for more than one event:

```java
on Event() as e and Alarm() as a { ... }
```
This will trigger on receiving an Event and an Alarm event - the first of each will be captured.

You can also trigger by sequences:

```java
on all (Event() as e -> Alarm() as a) { ... }
```
This will trigger for every pair "Event followed by Alarm". On receiving an event, it will stop listening for further events and start listening for alarms instead. Once an alarm is received, it will start listening for events again.

#### Timers {#timers}

You can also trigger listeners based on time. You can either trigger in a certain interval, for example, fire every 5 minutes (300 seconds):

```java
on all wait(300.0) { ... }
```
Or you can have a listener fire at certain times of the day, with similar functionality to Unix's cron scheduler:

```java
// timer:at(minutes, hours, daysOfMonth, month, daysOfWeek, (optional) seconds)
// minutes: 0-59
// hours: 0-23
// daysOfMonth: 1-31
// month: 1-12
// daysOfWeek: 0 (Sunday) - 6 (Saturday)
// seconds: 0-59

on all at(*, *, *, *, *) {} // trigger every minute

on all at(*/10, *, *, *, *) {} // trigger every 10 minutes
on all at(0, 1, *, *, [1,3,5]) {} // trigger at 1am every monday, wednesday and friday
on all at(0, */2, 1:7, *, *) {} // trigger every 2 hours on every day in the first week of every month
```
You can also combine timer patterns with other patterns. For example, you can check if there was an event within a certain time after another event:

```java
on Event() -> wait(600.0) and not Alarm() { ... }
```
This will trigger if there is an event and within 10 minutes (600 seconds) there is no alarm. Note the use of `not` which terminates the listener if the event occurs.

You can use a tenant option to set the time zone used for `on all at` timers. To set the tenant option, specify the `microservice.runtime` category and the `timezone` key.
For example:

```
{
    "category" : "microservice.runtime",
    "key" : "timezone",
    "value" : "Europe/Warsaw"
}
```

See also [Timezone variable](/microservice-sdk/general-aspects/#timezone-variable) in this documentation and [Supported time zones]({{< link-apama-webhelp >}}/developing-apama-applications-in-epl/using-epl-plug-ins/#supported-time-zones) in the Apama documentation.


{{< c8y-admon-info >}}
This tenant option is only read when the microservice starts.
If the tenant option is changed, the microservice only picks this up on the next microservice subscription.
{{< /c8y-admon-info >}}

#### Streams - windows {#streams---windows}

Streams give you the possibility to operate on windows of events. Streams use the `from` keyword instead of `on ` and define a window to operate over, and select what output they want from that window using aggregates. Windows can be restricted by two means:

1. Windows for a certain time - use the `within` keyword.

    ```java
	from m in all Measurement(type="c8y_TemperatureMeasurement") within 3600.0 select avg(m.measurements	["c8y_TemperatureMeasurement"]["T"].value) as avgValue { }
    ```

2. Windows with a certain amount of events - use the `retain` keyword.  

    ```java
	from m in all Measurement(type="c8y_TemperatureMeasurement") retain 100 select avg(m.measurements["c8y_TemperatureMeasurement"]["T"].value) as avgValue { }
    ```

#### Streams - outputting periodically {#streams---outputting-periodically}

Streams can also control how frequently they evaluate, using the `every` specifier.

```java
// will output the last measurement arrived every 1 minute
from m in all Measurement(type="c8y_TemperatureMeasurement") within 60.0 every 60.0 select last(m.measurements["c8y_TemperatureMeasurement"]["T"].value) as lastValue { }

// will output the first of every 20 measurements arriving
from m in all Measurement(type="c8y_TemperatureMeasurement") retain 20 every 20 select first(m.measurements["c8y_TemperatureMeasurement"]["T"].value) as firstValue { }

// will output the average of all 20 measurements after the 20th arrived
from m in all Measurement(type="c8y_TemperatureMeasurement") retain 20 every 20 select avg(m.measurements["c8y_TemperatureMeasurement"]["T"].value) as avgValue { }
```

See the Apama documentation for [built-in aggregate functions]({{< link-apama-webhelp >}}/epl-reference/aggregate-functions/#built-in-aggregate-functions).


### Creating own event types {#creating-own-event-types}

As well as the predefined event types, you can define your own event types. These can be useful to detect patterns of events occurring which trigger other parts of the same module.

```java
event MyEvent {
	Measurement m1;
	Measurement m2;
}

...

on Measurement() as m1 -> Measurement() as m2 {
	route MyEvent(m1, m2);
}
```

{{< c8y-admon-info >}}
{{< product-c8y-iot >}} deploys each module into its own namespace, so event definitions from one module cannot be used in other modules. This prevents dependencies between modules.
{{< /c8y-admon-info >}}


### Creating own actions {#creating-own-actions}

Typically, you will structure a monitor using actions (much like functions in Java), as shown in the following examples.

Increasing the given severity:

```java
action upgradeSeverity(string old) returns string {
	if old = "WARNING" { return "MINOR"; }
	if old = "MINOR"   { return "MAJOR"; }
	if old = "MAJOR"   { return "CRITICAL"; }
	return old;
}
```

Calculating the distance between two geo-coordinates:

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

### Variables {#variables}

You can define variables in your modules.

```java
string myEmailText := "Hello World";
sequence<string> supportedOperationsList := ["c8y_Restart", "c8y_Relay"];
```

If you define a monitor-scope variable (that is, inside a monitor but not within any actions on that monitor), then that can be used in a listener if you use a colon (:) instead of `as` for the event co-assignment in the listener. Thus, the example below logs the latest event every 10 seconds:

```java
monitor MyMonitor {
    // monitor scope:
    Event e;
    action onload() {
        monitor.subscribe(Measurement.SUBSCRIBE_CHANNEL);
        on all Event():e {}
        on all wait(10.0) {
            log e.toString();
        }
    }
}
```
When a listener starts, it takes a copy of all of the local variables. The example below thus logs each event after a 10 second delay, even if other events come in between.

```java
monitor MyMonitor {
    // monitor scope:
    Event e;
    action onload() {
      monitor.subscribe(Measurement.SUBSCRIBE_CHANNEL);
      on all Event():e {
            on all wait(10.0) {
                log e.toString();
            }
        }
    }
}
```

### Spawning monitor instances and contexts {#spawning-monitor-instances-and-contexts}

While it is possible to handle multiple devices in a single monitor (for example, using `group by` and `partition by` in streams, or maintaining a dictionary keyed on the device ID for other state), it is often useful to separate processing of different devices into separate monitor instances.

New monitor instances can be created using the `spawn` statement. This takes a copy of the monitor's monitor scope variables and runs the named action in a new monitor instance. No listeners are copied into the new monitor. It is also possible to specify a context to spawn the new monitor instance in. Different contexts can run concurrently with each other, and also help isolate different monitors from each other. When constructing a context, supply a name to identify the context, and a Boolean to control if the context is public - that is, it receives the {{< product-c8y-iot >}} events by default (sent to the default channel).

This pattern is often used with the unmatched keyword to identify events that are not matched by any other listeners in that context. By using a separate context for each monitor, the unmatched behavior is scoped to that monitor. For example:

```java
monitor PerDeviceMeasurementTracker {
	action onload() {
		spawn factory to context("PerDeviceMeasurementTracker", true);
	}
	action factory() {
		monitor.subscribe(Measurement.SUBSCRIBE_CHANNEL);
		on all unmatched Measurement() as m {
			spawn perDevice(m);
		}
	}

	dictionary<string, Measurement> latestMeasurementByType; // measurements for this device

	action perDevice(Measurement m) {
		processMeasurement(m);
		on all Measurement(source = m.source) as m {
			processMeasurement(m);
		}
	}
	action processMeasurement(Measurement m) {
		latestMeasurementByType[m.type] := m;
	}
}
```
