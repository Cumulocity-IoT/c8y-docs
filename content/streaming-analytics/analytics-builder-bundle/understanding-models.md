---
weight: 20
title: Understanding models
layout: redirect
---

### Models {#models}

A model is a container which can have a network of blocks connected to each other with wires.

The behavior of a block inside a model does not depend on other blocks. There can be multiple instances of the same block in a model where each instance may behave differently, depending on the configurable parameters or the inputs connected to the block.

You can create two different types of models: models without template parameters and models with template parameters.

#### Models without template parameters {#models-without-template-parameters}

All blocks in the model use defined input devices or ranges of devices and contain defined parameter values. Such a model can be activated immediately in the model manager.

#### Models with template parameters {#models-with-template-parameters}

A model in which one or more template parameters are defined is called a "template model". Template parameters can be bound to any number of block parameters, provided that the type of the block parameter is the same as that of the template parameter.

For example, you can define a template parameter for the device name and another for the threshold value. These template parameters can later be set individually in the different instances of the model. For example, one template parameter can specify a device which can then be used for several input and output blocks. Or one instance can use device ABC with a threshold value of 100, and another instance can use device XYZ with a threshold of 200. Models with template parameters are not activated directly in the model manager. You must create at least one instance of the model, and you can then activate each instance separately using the instance editor.

The scope of the template parameters is local to the model in which they are defined. In other words, template parameters defined in one model cannot be used in any other model that is deployed in same tenant or subtenant. The names of the template parameters must be unique within the scope of the model in which they are defined.

There are two relevant roles for this type of model, this can be the same person or different persons:

-   **Model author**.
    The model author creates the model and defines all of its blocks, parameters and wires. Most importantly, the model author creates the template parameters and binds them to the appropriate parameters in selected blocks.
-   **Instance maintainer**.
    The instance maintainer creates the instances of the model and assigns values to the template parameters that are to be used by each instance.

The model author has the following options to define a template parameter:

-   It can have default value which is provided as the default value in the instance editor. The instance maintainer may then leave it at the default value or change it to another value.
-   It can be optional. The instance maintainer then has the possibility to either provide a value or leave it blank.
-   It can be required. The instance maintainer must then provide a value. A required value is one that is not optional and has no default value.

### Template model instances {#template-model-instances}

Template model instances hold the values to be used in models with template parameters.

For example, two devices may have similar checks on data from the devices, but use different threshold values for those checks. In this case, you would configure an instance for each of the devices, specifying which device and what threshold to use.

Each instance can be activated, deactivated, or use different run modes, independently.

### Blocks {#blocks}

Blocks are the basic processing units of the model. Each block has some predefined functionality and processes data accordingly. A block can have a set of parameters and a set of input ports and output ports.

The palette of the model editor offers for selection the following types of blocks:

-   **Input blocks**, which receive data from external sources. An input block normally represents a device that has been registered in the {{< product-c8y-iot >}} inventory, a device group, a smart group, an asset, or all input sources. See also [Input blocks](/streaming-analytics/analytics-builder/#input-blocks).
-   **Output blocks**, which send data to external sources. An output block normally represents a device that has been registered in the {{< product-c8y-iot >}} inventory. But there are also blocks for sending an email or SMS to specified receivers. See also [Output blocks](/streaming-analytics/analytics-builder/#output-blocks).
-   **Processing blocks**, which receive data from the input blocks and send the resulting data to the output blocks. See also [Processing blocks](/streaming-analytics/analytics-builder/#processing-blocks).

{{< c8y-admon-info>}}
For detailed information on each block, see [Overview of all blocks](/streaming-analytics/block-reference/#overview-of-all-blocks) which provides links to the descriptions of all the blocks in the block reference.
{{< /c8y-admon-info>}}

A block can receive data from another block through its input ports. A block can send data to another block through its output ports. Different blocks will have different numbers of input or output ports, and some blocks have only input ports or only output ports. For most blocks, it is not required to connect all of the input or output ports.

A block can have configurable parameters that define the behavior of the block. These parameters are either optional or mandatory, depending on the requirement of the block. A parameter can be configured with a value or a template parameter.

When using the same block multiple times, you can specify different values for the same parameter. For example, the **Threshold** block has a configurable parameter named **Threshold Value**. If you are using two instances of the **Threshold** block and configure this parameter differently for each block, the blocks will report different breaches of the threshold.

{{< c8y-admon-info>}}
Two output ports cannot be connected to the same input port, whereas one output port can be connected to multiple input ports.
{{< /c8y-admon-info>}}

#### Input blocks {#input-blocks}

An input block is a special type of block that receives data from an external source. It converts the data into a format understandable to wires and transfers the data to the connected blocks. For example, when an input block receives a `Measurement` event from {{< product-c8y-iot >}}, it extracts the required information from the event and then transfers the information to the connected blocks for further processing.

Models can process data from multiple devices, and scale up \(using multiple cores\) when doing so. For detailed information, see [Model execution for different devices](/streaming-analytics/analytics-builder/#model-execution-for-different-devices).

{{< c8y-admon-info>}}
By default, the **All Inputs** option is selected, which means that the input block is listening to all input sources.
{{< /c8y-admon-info>}}

In addition, Analytics Builder supports input devices that are referred to as "broadcast devices". Signals from these devices are available to all models across all devices. For detailed information, see [Broadcast devices](/streaming-analytics/analytics-builder/#broadcast-devices).

#### Output blocks {#output-blocks}

An output block is a special type of block that receives data from a connected processing block. It converts the data into a format understandable to an external source and transfers the data to the external source. For example, when an output block receives data from a connected processing block, it packages the data into an `Operation` object and then sends the operation to {{< product-c8y-iot >}}.

You can specify a **Trigger Device** for an output block. This is a special device which can be used to send the output back to the device which triggered the output. Models can process data from multiple devices, and scale up \(using multiple cores\) when doing so. For detailed information, see [Model execution for different devices](/streaming-analytics/analytics-builder/#model-execution-for-different-devices).

{{< c8y-admon-info>}}
If you use the default option of **All Inputs** as the input source for an input block, you must set the output destination of the output block to **Trigger Device**.
{{< /c8y-admon-info>}}

Other output blocks are **Send Email** and **Send SMS** to send emails and text messages. These blocks depend on the tenant environment being correctly configured to be able to deliver the emails and text messages, see also [SMS provider](/standard-tenant/changing-settings/#sms-provider). Unlike the other blocks, these are not associated with devices within the {{< product-c8y-iot >}} platform.

#### Processing blocks {#processing-blocks}

There are different types of processing blocks. They are grouped into different categories in the palette in the model editor, depending on their functionality.

|This category        |includes blocks that|
|---------------------|--------------------|
|**Logic**            |perform logical operations on the data. Blocks such as **AND** and **OR** are in this category.|
|**Calculation**      |perform mathematical operations on the data. Blocks such as **Difference**, **Threshold**, **Direction Detection**, **Delta** and **Expression** are in this category.|
|**Aggregate**        |perform aggregation of the data over a window of values. Blocks such as **Average \(Mean\)** and **Integral** are in this category.|
|**Flow Manipulation**|manipulate the flow of the data. Blocks such as **Time Delay**, **Gate**, **Pulse** and **Latch Values** are in this category.|
|**Utility**          |provide miscellaneous utility functions. Blocks such as **Toggle** and **Missing Data** are in this category.|

**Example of a processing block - the Threshold block**

The following example shows what a block looks like in the model editor, together with the block parameter editor. It shows the **Threshold** block, which detects whether the input value breaches the threshold or whether it crosses the threshold.

![Example of the block parameter editor for the Threshold block](/images/streaming-analytics/analytics-builder/threshold-block-example.png)

The parameters are:

-   **Threshold Value**. `float` type. This value is compared against the input value.
-   **Direction**. The direction in which to look: whether the input value is above or below the defined threshold, or whether it crosses the threshold.

The input ports are:

-   **Value**. `float` type. The input value to the block, to be compared against the defined threshold value.
-   **Reset**. `pulse` type. When a signal is received, the state of the block is reset so that any previously received input values are no longer used.

The output ports are:

-   **Breached Threshold**. `boolean` type. Is set to `true` when the threshold has been breached. That is, the input value is beyond the range of the defined threshold value.
-   **Within Threshold**. `boolean` type. Is set to `true` when the threshold has not been breached. That is, the input value is within the range of the defined threshold value.
-   **Crossed Threshold**. `pulse` type. Sends a signal when the input value crosses the threshold, going from one side of the threshold to the other.

#### Creating your own blocks {#creating-your-own-blocks}

You can use the Analytics Builder Block SDK to write, test, and package custom blocks and to upload these blocks into Analytics Builder.

The Block SDK is available from GitHub at [https://github.com/Cumulocity-IoT/apama-analytics-builder-block-sdk](https://github.com/Cumulocity-IoT/apama-analytics-builder-block-sdk). See the documentation in GitHub for detailed information.

You write the custom blocks in Apama's Event Processing Language \(EPL\). Once you have written a block, you can package it into an extension and upload it. An example command line to build and upload an extension is:

```
analytics_builder build extension --input path --cumulocity_url $C8Y_URL --username $C8Y_USERNAME --password $C8Y_PASSWORD --name customBlocks --restart
```

To upload an extension, the user specified in the `--username` argument must have CREATE permission for "Inventory" in {{< product-c8y-iot >}}, in addition to the permissions listed in [Prerequisites](/streaming-analytics/introduction-analytics/#prerequisites).

The Apama-ctrl microservice is restarted after running the above command. The user must have the ADMIN permission for "CEP management" to request a restart.

### Wires {#wires}

One block is connected to another block with the help of wires. All data transfer between the output port of one block and the input port of another block is done using wires. All connections must be made between compatible types. See [Wires and blocks](/streaming-analytics/analytics-builder/#wires-and-blocks) for detailed information.

{{< c8y-admon-info>}}
The network of blocks in a model cannot contain any kind of cycles. See [Wire restrictions](/streaming-analytics/analytics-builder/#wire-restrictions) for more information.
{{< /c8y-admon-info>}}

### Sample use case {#sample-use-case}

Consider a situation where you are getting real-time sensor data and you want to analyze this data. For the sake of simplicity, let us assume that there is only one sensor and that you are interested in the following:

-   You want to know the average value of the sensor readings over a period of time.
-   You want to detect sudden changes in the sensor readings using a defined threshold value.
-   You want to ensure that the sensor readings are within a certain range and that an alert is created if the readings go beyond that range. For example, you are getting pressure readings and you want to ensure that the maximum pressure does not go beyond the range that the device can handle.

The model for this example has the following blocks:

![Example model with several blocks](/images/streaming-analytics/analytics-builder/sample-use-case.png)

-   The input block shows **Input Device** as the device name.
    The incoming data is in real time and continuous. The input block receives the data from the sensor. It passes the data to the **Average \(Mean\)**, **Delta** and **Threshold** blocks. The input ports of these blocks are connected to the output port of the input block.

-   The **Average \(Mean\)** block finds the average \(or mean\) of the readings that it receives over a period of time and passes this to the connected output block.

-   The **Delta** block calculates the difference between successive input values and passes the calculated value to the connected **Threshold** block.

-   The model has two different instances of a **Threshold** block.
    A **Threshold** block compares the input value against the defined threshold value to detect whether the input breaches the threshold or not.
    The first instance is connected to the **Delta** block and reports a breach if the delta value goes beyond the threshold.
    The second instance is connected to the input block and reports a breach if the input value is not within the threshold.

-   The model has three instances of an output block which show **Output Device** as the device name.
    The first instance sends the average of the sensor reading.
    The second instance generates an output if the values of successive sensor readings change by more than the configured threshold.
    The third instance generates an output if the sensor value goes beyond the configured threshold.
