---
weight: 40
title: How is real-time processing implemented in Cumulocity?
layout: redirect
---

There are several processing modes for API requests in Cumulocity: *persistent*, *transient*, *quiescent* and *cep*. 

- The "persistent" mode is the default: It will store data in the Cumulocity database as well as send the data to the real-time engine. After both is done, Cumulocity returns the result of the request.
- The "transient" mode will only send the data to the real-time engine and immediately return asynchronously and not store it in Cumulocity's database. This mode saves storage and processing costs and is useful for example when tracking devices in real-time without requiring data to be stored.
- The "quiescent" processing mode behaves similarly to the "persistent" mode with the exception that no real-time notifications will be sent. The "quiescent" processing mode is applicable only for measurements and events.
- The "cep" processing mode behaves like the "transient" mode with the exception that no real-time notifications are sent. Currently it is applicable only for measurements and events.

![CEP architecture](/guides/images/concepts-guide/realtime.png)

### Examples

Assume that location updates from cars should be monitored every second while the car is driving, but only be stored once in a minute into the database for reporting purposes. This is done using the following Apama statement:

	using com.apama.cumulocity.Event;
	using com.apama.cumulocity.Measurement;

	monitor SendEveryMinute {

		dictionary<string, Event> latestUpdates;

		action onload() {

			monitor.subscribe(Measurement.CHANNEL);
			on all Event() as e {
				if e.params.hasKey("c8y_LocationUpdate") {
					latestUpdates[e.source] := e;
				}
			}

			on all wait(60.0) {
				Event e;
				for e in latestUpdates.values() {
					send e to Event.CHANNEL;
				}
				latestUpdates.clear();
			}
		}
	}

Another option is to output only every 60th update.

	using com.apama.cumulocity.Event;
	using com.apama.cumulocity.Measurement;

	monitor SendEverySixtyEvents {

		event UpdateAndCount {
			Event latest;
			integer count;
		}

		dictionary<string, UpdateAndCount> latestUpdates;

		action onload() {
			monitor.subscribe(Measurement.CHANNEL);
			on all Event() as e {
				if e.params.hasKey("c8y_LocationUpdate") {
					UpdateAndCount updateCount := latestUpdates.getOrAddDefault(e.source);
					updateCount.latest := e;
					updateCount.count := updateCount.count + 1;
					if updateCount.count = 60 {
						send e to Event.CHANNEL;
						latestUpdates.remove(e.source);
					}
				}
			}
		}
	}
