---
weight: 90
title: Model simulation
layout: redirect
---

### About simulation mode {#about-simulation-mode}

You can deploy a model in simulation mode to run it against historical input data \(such as {{< product-c8y-iot >}} measurements\). This allows testing the behavior of a newly developed model against historical data or fine-tuning an existing model. Or it allows testing a model against a set of historical data with known properties.

You use the model manager to deploy a model in simulation mode. See [Deploying a model](/streaming-analytics/analytics-builder/#deploying-a-model) for more details.

{{< c8y-admon-info>}}
Simulation mode is only permitted for models using specific devices. If you wish to simulate a model using a range of devices, then use the model editor to modify it to apply to a single device within the range, and then activate the model in simulation mode.
{{< /c8y-admon-info>}}

When a model is deployed in simulation mode, it uses data from a virtual device \(see also [Virtual devices](/streaming-analytics/analytics-builder/#virtual-devices)\). Thus, a simulated model can run alongside other non-simulated models without interfering with them.

A simulated model runs as if it is running at the time of the historical data. The input data are processed in the order of their historical time. The simulated model also uses the historical time for the timestamps of the generated output.

Events, alarms and operations are created with a timestamp. However, with time there can be updates to these objects. For example, an alarm can be cleared or the status of an operation can be changed. As a history of changes to event, alarm and operation objects is not maintained, the object is only replayed at its initial timestamp, with the latest version of its properties. Thus, changes to these objects are not replayed and simulation mode is of limited use if your models depend on changes to objects.

{{< c8y-admon-info>}}
Simulation mode is not permitted for models with **Managed Object Input** blocks.
{{< /c8y-admon-info>}}

When running a simulation, historical data is replayed into the Apama correlator from the {{< product-c8y-iot >}} database. If there is a significant delay in the data being queried from the database or high load in the system, this can lead to dropping the input in exceptional circumstances. A simulated model processes input data at normal speed. For example, if the historical data entries are separated by one second, they are processed one second apart. This means that simulating a model with one hour of historical data will take approximately one hour of simulation time.

### Simulation parameters {#simulation-parameters}

To deploy a model in simulation mode, you must provide values for two parameters in the model manager: start time and end time. These values determine the time range for which historical data is to be sent into the simulated model.

-   The start time from which historical data is to be sent into the model.
-   The end time until which historical data is to be sent into the model.

Sending of data into the simulated model is stopped when all historical data from the specified time range has been sent.

### Configuring the maximum number of simulation models {#configuring-the-maximum-number-of-simulation-models}

By default, a maximum of 3 simulation models can be deployed at a time.

If you want to change this default value \(to deploy either more or fewer simulation models at a time\), you must change the tenant options. That is, you must send a `POST /tenant/options` request. For detailed information, see the information on the [tenant options](https://{{< domain-c8y >}}/api/core/#tag/Options) in the {{< openapi >}}.

For example, specify the following to set the value to 5:

```
{
    "category": "analytics.builder",
    "key": "simulation.maxInstances",
    "value": "5"
}
```

See also [Configuration](/streaming-analytics/analytics-builder/#configuration).

### Monitoring dropped inputs {#monitoring-dropped-inputs}

The simulated model may drop delayed input events in exceptional cases. The number of input events dropped across all the models is exposed as a user-defined status with the name `user-analytics-oldEventsDropped`. See also [Monitoring dropped events](/streaming-analytics/analytics-builder/#monitoring-dropped-events).
