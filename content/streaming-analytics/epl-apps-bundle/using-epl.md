---
title: Using the Apama Event Processing Language (EPL)
layout: bundle
weight: 5
---

The Apama Event Processing Language has a syntax similar to Java. In addition to simple flow control statements such as `if`, `while`, `for`, users can write listeners with the `on` keyword to react to events.

Apama EPL is documented in the [Apama documentation]({{< link-apama-webhelp >}}).

As an example, the following statement listens for new temperature sensor readings greater than a particular temperature:

	on all Measurement(type="c8y_TemperatureMeasurement") as m {
		if m.measurements.getOrDefault("c8y_TemperatureMeasurement").getOrDefault("T").value > 100.0 {
			Alarm alarm    := new Alarm;
			alarm.type     := "c8y_TemperatureAlert";
			alarm.source   := m.source;
			alarm.time     := currentTime;
			alarm.text     := "Temperature too high";
			alarm.status   := "ACTIVE";
			alarm.severity := "CRITICAL";
			send alarm to Alarm.SEND_CHANNEL;
		}
	}

Here, `Measurement` is a pre-defined event containing the measurements. In this example, `m` is the `Measurement` event, the listener is filtering for measurements which are `c8y_TemperatureMeasurement` and the property is `c8y_TemperatureMeasurement.T.value` which is in degrees Celsius of a temperature sensor (see [Fragment library](/device-integration/fragment-library/)).

Listeners such as the above should be placed in a monitor in the `onload` statement, and the file must contain `using` statements for the types used by the listener - for most of the {{< product-c8y-iot >}} events, these are in the package *com.apama.cumulocity*. The full list is provided below - for the sake of brevity, we will omit these from further examples:

	using com.apama.cumulocity.ManagedObject;
	using com.apama.cumulocity.Operation;
	using com.apama.cumulocity.Event;
	using com.apama.cumulocity.Alarm;
	using com.apama.cumulocity.Error;
	using com.apama.cumulocity.Measurement;
	using com.apama.cumulocity.MeasurementValue;
	using com.apama.cumulocity.FindAlarm;
	using com.apama.cumulocity.FindAlarmResponse;
	using com.apama.cumulocity.FindAlarmResponseAck;
	using com.apama.cumulocity.FindManagedObject;
	using com.apama.cumulocity.FindManagedObjectResponse;
	using com.apama.cumulocity.FindManagedObjectResponseAck;
	using com.apama.cumulocity.FindMeasurement;
	using com.apama.cumulocity.FindMeasurementResponse;
	using com.apama.cumulocity.FindMeasurementResponseAck;
	using com.apama.cumulocity.FindOperation;
	using com.apama.cumulocity.FindOperationResponse;
	using com.apama.cumulocity.FindOperationResponseAck;
	using com.apama.cumulocity.FindEvent;
	using com.apama.cumulocity.FindEventResponse;
	using com.apama.cumulocity.FindEventResponseAck;
	using com.apama.cumulocity.SendEmail;
	using com.apama.cumulocity.SendSMS;
	using com.apama.cumulocity.Util;
	using com.apama.util.AnyExtractor;
	using com.apama.correlator.timeformat.TimeFormat;
	using com.softwareag.connectivity.httpclient.HttpOptions;
	using com.softwareag.connectivity.httpclient.Request;
	using com.softwareag.connectivity.httpclient.RequestType;
	using com.softwareag.connectivity.httpclient.Response;

	monitor ListenForHighTemperatures {
		action onload() {
			on all Measurement(type="c8y_TemperatureMeasurement") as e {
				if e.measurements.getOrDefault("c8y_TemperatureMeasurement").getOrDefault("T").value > 100.0 {
					// handle the measurement
				}
			}
		}
	}

### How can I create derived data from EPL? {#how-can-i-create-derived-data-from-epl}

To create a new alarm or operation, create an instance of the relevant event type and use the `send` statement to send it to the relevant channel (defined with a constant on the event type). Assume that an alarm should be generated immediately if the temperature of a sensor exceeds a defined value. This is done with the following statement:

	on all Measurement(type="c8y_TemperatureMeasurement") as m {
		if m.measurements.getOrDefault("c8y_TemperatureMeasurement").getOrDefault("T").value > 100.0 {
			send Alarm("","c8y_TemperatureAlert",m.source,currentTime,"Temperature too high","ACTIVE","CRITICAL",1,new dictionary<string,any>) to Alarm.SEND_CHANNEL;
		}
	}

Technically, this statement produces a new alarm event each time a temperature sensor reads more than 100 degrees Celsius and sends it to {{< product-c8y-iot >}}.

### How can I control devices from EPL? {#how-can-i-control-devices-from-epl}

Remote control with EPL is done by sending an operation event. Remote operations are targeted to a specific device. The following example illustrates switching a relay based on temperature readings:

	on all Measurement(type="c8y_TemperatureMeasurement") as m {
		if m.measurements.getOrDefault("c8y_TemperatureMeasurement").getOrDefault("T").value > 100.0 {
			send Operation("",m.source,"PENDING",{"c8y_Relay":<any>{"relayState":"CLOSED"}}) to Operation.SEND_CHANNEL;
		}
	}


* `m.source` is a placeholder for the ID of the heating that should be triggered.

* The *params* field (the last field) defines the nested content of the operation. In this example we create a `c8y_Relay` operation and set the `relayState` to CLOSED. Note that the top-level fields must be `dictionary<string, any>`, thus the use of the `<any>` cast operation.

### How can I query data from EPL? {#how-can-i-query-data-from-epl}

It may be required to query information from the {{< product-c8y-iot >}} database as part of the ongoing event processing. This is supported by sending events and using listeners to wait for responses. Here is an example that shows how to summarize total sales for vending machines every hour. The sales report data created after a purchase is retrieved from the {{< product-c8y-iot >}} database.

	using com.apama.aggregates.count;

	monitor SalesReport {
		event SalesReport {
			Event e;
			ManagedObject customer;
		}
		event SalesOutput {
			integer count;
			string customerId;
		}

		action onload() {

			monitor.subscribe(Measurement.SUBSCRIBE_CHANNEL);

			on all Event() as e {
				monitor.subscribe(FindManagedObjectResponse.SUBSCRIBE_CHANNEL);
				integer reqId := integer.getUnique();
				on all FindManagedObjectResponse(reqId=reqId) as mor and not FindManagedObjectResponseAck(reqId=reqId) {
					route SalesReport(e, mor.managedObject);
				}
				on FindManagedObjectResponseAck(reqId=reqId) {
					monitor.unsubscribe(FindManagedObjectResponse.SUBSCRIBE_CHANNEL);
				}
				send FindManagedObject(reqId,"",{"childAssetId":e.source}) to FindManagedObject.SEND_CHANNEL;
			}

			from sr in all SalesReport() within 3600.0 every 3600.0
				group by sr.customer.id
				select SalesOutput(count(), sr.customer.id) as sales {
				send Measurement("", "total_cust_trx", "customer_trx_counterId", currentTime,
					{
						"total_cust_trx":{
							"total":MeasurementValue(sales.count.toFloat(), "COUNT", new dictionary<string,any>)
						}
					}, {"customer_id":<any> sales.customerId}) to Measurement.SEND_CHANNEL;
			}
		}
	}

In the above example we start by creating definitions for `SalesReport` and `SaleOutput` events. These hold the `SalesReport` (the `Event` and `ManagedObject` that identifies a sale) and the information we want to derive from a set of sales: the `count` and `customerId`. We listen for `Event` objects, and send a `FindManagedObject` request to look up the `ManagedObject` that the event came from. These `SalesReport` objects are sent, via the route statement, into a stream query. The stream query fires every hour (3,600 seconds) and selects an aggregate of the sales data per customer, and sends a new measurement representing the sales for that vending machine.
