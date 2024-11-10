---
weight: 80
title: Models and devices
layout: redirect
---

### Model execution for different devices {#model-execution-for-different-devices}

Models are executed independently of each other. That is, models for specific devices can execute in parallel, making use of hardware parallelism where possible, if models are processing data \(such as `Measurement`, `Event`, or `Operation` objects\) for a different set of devices. When defining a model, you can configure it to use data from a set of specific devices or from a range of devices, with each device being handled independently.

Each model must either:

-   receive input from a set of specific devices and send output to a set of specific devices, or
-   receive input from each device within a range of devices and send output to the trigger device or an asset. Note that asset output can only be used for sending cross-device aggregates.

    A range of devices can include a {{< product-c8y-iot >}} device group, a smart group, an asset, or all input sources on the tenant. When a model uses a range of devices, the model acts on all devices referred to by the range, either directly or indirectly through members of the group that are themselves groups and have device members \(or even "grand-children" group members\). A device can be a member of zero, one or many groups. For more information, see [Grouping devices](/device-management-application/grouping-devices/) and [Managing assets](/cockpit/managing-assets/).

    {{< c8y-admon-info>}}
A model that acts on a range of devices only determines the group membership when the model is activated. If the membership of a group changes while a model is running, the model will not behave any differently for any new or removed members of the group. If a group membership is changed, then models that refer to that group should be de-activated and re-activated.
    {{< /c8y-admon-info>}}

It is not possible to mix the two types of input blocks above \(but see [Broadcast devices](/streaming-analytics/analytics-builder/#broadcast-devices)\). However, data from a model processing specific devices can be sent to and received from other models, including models for ranges of devices, and vice versa \(see [Connections between models](/streaming-analytics/analytics-builder/#connections-between-models)\).

When a model consumes data from a range, the model behaves as if multiple instances of the model are running, as illustrated below, each one processing data from each device independently. Each instance processes data for a different device, but all share the same blocks and block parameters. The values of the wires are independent for different instances. Any blocks that are stateful, such as the **Average \(Mean\)** block, operate independently of the data from other devices. As with models using specific devices, if any block causes a runtime error or exception, then the entire model goes into a failed state - it stops processing data for all devices.

![Illustration of a model which behaves as if multiple instances of the model are running](/images/streaming-analytics/analytics-builder/model-execution-for-different-devices.png)

Typically, when using ranges of devices for inputs, all input blocks would use the same group. It is possible to use different groups. If there are devices in one group but not in another, those blocks will never generate a signal for devices that are not in that group. For some blocks, such as the **Expression** block, this is not useful - an **Expression** block will only generate an output if all of the required inputs have received a value, but it may be useful for `pulse` inputs of a **Gate** block.

When a model has inputs that are consuming data from specific devices, then the output blocks generating outputs can specify the same or different specific devices.

When a model has inputs that are consuming data from a range of devices, all synchronous output blocks must specify the trigger device or asset. The trigger device generates data \(`Measurement`, `Event` or `Operation`\) for whichever device that instance applies to - or whichever device sent the data to trigger that instance. Asynchronous output blocks in such models can specify the trigger device, asset or any other specific device.

When a model has inputs that are consuming data from each device belonging to an asset, the output blocks can send the output to a specific asset or trigger device. Keep in mind that asset output can only be used for sending cross-device aggregates.

When a template parameter is used for an output block, then if the parameter's value is a range of devices, then this is treated the same as if it were set to the trigger device. The output goes to whichever device triggered the model's evaluation, with each device within a range being treated independently. Typically, the same template parameter will be used for both input and output, so these will refer to the same range, and each device is processed independently.

You can use the model editor to change input and output blocks from one input source or output destination to another. When changing between a range of devices and a device or asset, output blocks will switch between the trigger device and the device or asset specified, so that the model is kept in a usable state. See also [Replacing sources or destinations](/streaming-analytics/analytics-builder/#replacing-sources-or-destinations).

The test and simulation modes are only permitted for models using specific devices. If you wish to test or simulate a model using a range of devices, then use the model editor to modify it to apply to a single device within the range, and then activate the model in test or simulation mode. See [Deploying a model](/streaming-analytics/analytics-builder/#deploying-a-model) for more information on these modes.

#### Configuring the concurrency level {#configuring-the-concurrency-level}

By default, the Analytics Builder runtime uses 1 CPU core to execute models. If you want to change the number of CPU cores, send a `POST` request to {{< product-c8y-iot >}} that changes the value for the `numWorkerThreads` key. See [Configuration](/streaming-analytics/analytics-builder/#configuration) for detailed information.

Typically, this configuration value would be set to the number of CPU cores available for the system, but it may be useful to configure this either higher or lower according to what resources are available. It does not need to scale to the number of devices \(that is, it is quite reasonable to have 4 worker threads with hundreds of devices, assuming a moderate event rate per device\).

With the concurrency level set to 1, it is still possible to create models which use ranges of devices as inputs, but these continue to operate independently for each device within the range, and it is still not possible to mix range and single device input or output.

{{< c8y-admon-info>}}
Using multiple specific devices in a model with the concurrency level set to more than 1 can lead to connections between models which are deployed across multiple workers. Chains of models using multiple specific devices with high throughput usually scale less well than chains of models all using a single specific device.
{{< /c8y-admon-info>}}

### Broadcast devices {#broadcast-devices}

It is sometimes useful to have signals that can apply to all models. These may be signals from devices, or from other systems that are presented as if they were signals from a device. Analytics Builder thus supports devices that are referred to as broadcast devices and signals from these devices are available to all models across all devices.

Broadcast devices can be used as inputs in any model, together with either inputs from a specific device or a range of devices. The diagram below illustrates how a broadcast device applies to all devices within a range of devices. It is possible to combine signals from devices in a range of devices with signals from a broadcast device by providing them as different inputs into a processing block such as the **Expression** block.

![Illustrates how a broadcast device applies to all devices within a range of devices](/images/streaming-analytics/analytics-builder/broadcast-devices.png)

Unlike other devices, a broadcast device can only be used for synchronous output of a model that only consumes data from broadcast devices. Broadcast output of the asynchronous type can be generated by a model consuming non-broadcast inputs.

It is also not possible to connect models together using synchronous data from a broadcast device output \(that is, no model may use a measurement from a broadcast device that is the output of a different model\). Models can be connected together using asynchronous outputs from a broadcast device \(that is, models may use an operation from a broadcast device that is the output of a different model\).

#### Identifying broadcast devices {#identifying-broadcast-devices}

Broadcast devices are identified by the presence of a property on the device object in the inventory for that device; the presence of either the `pas_broadcastDevice` or `c8y_Kpi` property. Thus, whether a device is considered a broadcast device or not is global for that device across all models. It is not permitted to use a range of devices that contains a broadcast device. `c8y_Kpi` objects are typically used with the [KPI](/streaming-analytics/block-reference/#kpi) block. Thus, it is possible to use a KPI object to compare measurements from a range of devices - one KPI object is used for all devices in the range.

### Virtual devices {#virtual-devices}

A virtual device is used when a model is deployed in test or simulation mode. See also [Deploying a model](/streaming-analytics/analytics-builder/#deploying-a-model).

Virtual devices are objects in the {{< product-c8y-iot >}} inventory with a `c8y_VirtualDevice` property. This property refers to the identifier of the real device of which the virtual device is a copy.

Use the `creationDate` to find out what `virtualDevice` was created for a model activation and which measurements have that device as their source.

By default, the virtual devices are kept for 30 days. If you want to change this default, you must change the tenant options. That is, you must send a `POST /tenant/options` request. For detailed information, see the information on the [tenant options](https://{{< domain-c8y >}}/api/core/#tag/Options) in the {{< openapi >}}. For example, specify the following to set the retention period for the virtual devices to 1 day:

```
{
    "category": "analytics.builder",
    "key": "retention.virtualDevicesMaxDays",
    "value": "1"
}
```

See also [Configuration](/streaming-analytics/analytics-builder/#configuration).

Virtual devices are not shown in the Device Management application. Use [REST](/smartrest/smartrest-introduction/) operations to find these entries.

### Connections between models {#connections-between-models}

You can connect multiple models together using output blocks and input blocks. A model that contains an output block such as **Measurement Output** \(for `Measurement` objects of {{< product-c8y-iot >}}\) will generate a series of events, and this can be consumed by a suitable input block \(such as **Measurement Input**\) in another model. For more details, see [Keys for identifying a series of events](/streaming-analytics/analytics-builder/#keys-for-identifying-a-series-of-events).

When models are connected together using inputs and outputs for the same stream of events, the term “chain” is used to refer to all of the models that are connected to each other in this way. There may be multiple chains if there are separate groups of models that are connected to each other.

{{< c8y-admon-info>}}
The events from one model can only be consumed by another model when all involved models are deployed in production mode. When the models are deployed in test or simulation mode, virtual devices are used and the events from one model can therefore not be consumed by another model.
{{< /c8y-admon-info>}}

When one model has a synchronous output block generating a series of events for a given key and a second model has an input block consuming from that same series of events \(that is, with the same key parameters\), then this forms a connection from the first model to the second. When the first model triggers the output block, this causes the second model to be evaluated with a new input on its input block.

It is also possible to form connections between models using the output from an asynchronous output block. In this case, when the first model triggers the asynchronous output block, the output is generated and sent to the external system \(such as {{< product-c8y-iot >}}\). The data is received back from the external system at some later point in time and causes the evaluation of any other models consuming the data.

Similar to the processing order of wires within a model \(see also [Processing order of wires](/streaming-analytics/analytics-builder/#processing-order-of-wires)\), the following applies when an output block in one model generates a series of events that an input block in another model consumes:

-   A single model can send the same events to more than one other model. This means, it is possible to have a single model perform some common pre-processing, such as unit conversion or calculating an average \(with the **Average \(Mean\)** block\), and that value to be used by multiple other models.
-   Models are executed in order with respect to the connections between models formed using synchronous output so that the source of a connection is always evaluated before the target of a connection. If a model has connections from multiple blocks all triggered from the same initial event, then they will all evaluate first, and the receiving model will evaluate with all of the inputs once.

    Connections formed using asynchronous output do not have a specific execution order. A model consuming the output is executed only when the output is received back from the external system.


Similar to the wire restrictions within a model \(see also [Wire restrictions](/streaming-analytics/analytics-builder/#wire-restrictions)\), there are restrictions on how output blocks and input blocks can be used to connect models together:

-   One block across all models is permitted to generate a series of synchronous events for a given key. See also [Keys for identifying a series of events](/streaming-analytics/analytics-builder/#keys-for-identifying-a-series-of-events). Multiple output blocks generating asynchronous events can be used within a single model or across multiple models.

-   No cycles can be created between models using synchronous output. A model that receives events via an input block synchronously generated from another model cannot include an output block that generates synchronous events that the other model would consume. This applies even if one of the models contains two separate parts, such that there is no actual cycle in terms of wires and connections between models. Cycles among models can be created because of asynchronous outputs. Therefore, care must be taken not to introduce indefinite cyclic executions of models.

Any model that does not meet these restrictions when used in combination with the already activated models will cause an error on trying to activate it. This will count for the last element in a cycle of models. For such errors, the problem may be in interactions between models rather than a problem specific to a single model, but existing models that have already been activated will not automatically be deactivated. For example, if multiple models all generate the same series of synchronous events \(with the same key\), then the first model to be activated can be deployed, but all subsequent models will report an error upon trying to activate them.

For example, there are three models: Model1, Model2, and Model3. A cycle may exist if:

-   An output block of Model1 produces a series of synchronous events that is consumed by an input block in Model2, and Model2 contains an output block that generates a second series of synchronous events, and
-   Model3 contains an input block that consumes a series of events from Model2, and Model3 also contains an output block that generates a series of synchronous events used by an input block in Model1.

Note that only activating any two of these models can be done without error. If activated in order, only Model3 would have an error. But if Model1 or Model2 were deactivated, then Model3 could be activated. The error will occur even if one of the models does not contain a link from the input block that is part of the chain to the output block that forms part of the chain, such as the example for Model3 below: the events from Model2 do not form a cycle to the **To Model1 Measurement** output block, but they count as a cycle as they are both in the same model. \(In this case, the issue could be resolved by splitting that model into two models, thus removing the cycle\).

![Example for Model3](/images/streaming-analytics/analytics-builder/connections-between-models-example.png)

{{< c8y-admon-info>}}
Using multiple specific devices in a model with the concurrency level set to more than 1 can lead to connections between models which are deployed across multiple workers. Chains of models using multiple specific devices with high throughput usually scale less well than chains of models all using a single specific device.
{{< /c8y-admon-info>}}

### Configuring the number of shown input sources and output destinations {#configuring-the-number-of-shown-input-sources-and-output-destinations}

By default, a maximum of 10 items are shown in the following cases:

-   When you select a different input source or output destination \(see [Editing the parameters of a block](/streaming-analytics/analytics-builder/#editing-the-parameters-of-a-block)\).
-   When you replace devices, groups or assets \(see [Replacing sources or destinations](/streaming-analytics/analytics-builder/#replacing-sources-or-destinations)\).

When you use the search box in the above cases, this default also applies to the maximum number of items that are shown in the search result. When you click **Load more**, up to 10 more items are shown.

If you want to change this default value \(to show either more or less items\), you must change the tenant options. That is, you must send a `POST /tenant/options` request. For detailed information, see the information on the [tenant options](https://{{< domain-c8y >}}/api/core/#tag/Options) in the {{< openapi >}}.

For example, specify the following to set the value to 20:

```
{
    "category": "analytics.builder",
    "key": "c8yAnalyticsBlocks.queryInventoryPageSize",
    "value": "20"
}
```

See also [Configuration](/streaming-analytics/analytics-builder/#configuration).

### Searching for devices, groups and/or assets {#searching-for-devices-groups-andor-assets}

By default, only devices, groups and assets are shown in the following cases:

-   When you select a different input source or output destination \(see [Editing the parameters of a block](/streaming-analytics/analytics-builder/#editing-the-parameters-of-a-block)\).
-   When you replace devices or groups \(see [Replacing sources or destinations](/streaming-analytics/analytics-builder/#replacing-sources-or-destinations)\).

When you use the search box in the above cases, all managed objects in the {{< product-c8y-iot >}} inventory which match the search and filter criteria are shown, grouped by type. You can thus build analytic models by defining any managed objects in the inventory as input blocks or output blocks.

If you want to restrict the search to show only managed objects of a specific type \(for example, to show only devices\), you must change the tenant options. That is, you must send a `POST /tenant/options` request. For detailed information, see the information on the [tenant options](https://{{< domain-c8y >}}/api/core/#tag/Options) in the {{< openapi >}}.

For example, specify the following if you only want to show devices:

```
{
    "category": "analytics.builder",
    "key": "c8yAnalyticsBlocks.queryInventoryNameSearchAdditionalFilter",
    "value": "has(c8y_IsDevice)"
}
```

The `c8y_IsDevice` in the value is a so-called fragment. You can specify any fragment that is known to {{< product-c8y-iot >}}, including any fragments that you have created yourself.

You can combine several values. For example, specify the following if you only want to show devices and device groups:

```
{
    "category": "analytics.builder",
    "key": "c8yAnalyticsBlocks.queryInventoryNameSearchAdditionalFilter",
    "value": "has(c8y_IsDevice) or has(c8y_IsDeviceGroup)"
}
```

The default value of this tenant option is `not has(c8y_IsVirtualDevice)`. As long as you do not change this tenant option, virtual devices are not shown as they would not make sense in an analytic model. If you change the value for this tenant option, make sure to specify all managed objects that you want to see in the search result.

See also [Configuration](/streaming-analytics/analytics-builder/#configuration).
