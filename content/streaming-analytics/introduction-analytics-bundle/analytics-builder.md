---
weight: 20
title: Analytics Builder
layout: redirect
---
The **Analytics Builder** page of the Streaming Analytics application allows you to build analytic models that transform or analyze streaming data in order to generate new data or output events. The models are capable of processing data in real time.

The models interact with the devices and sensor measurements. Models can receive `Measurement` and `Event` objects from devices, which provide the inputs to calculations or pattern detection performed within a model. Models can create new `Measurement` objects which can represent derived values from sensors \(for example, an average temperature\) or the measurements can be used as an input to other analytic models \(see [Connections between models](/streaming-analytics/analytics-builder/#connections-between-models)\). Models can create new `Operation` objects which are sent to devices to control the devices \(for example, to sound an alarm bell, display a message on a screen, or switch a device off\). The models are also stored in the {{< product-c8y-iot >}} inventory, but can be uploaded or downloaded via the model manager.

You build the models in a graphical environment by combining pre-built *blocks* into *models*. The blocks in a model package up small bits of logic, and have a number of inputs, outputs and parameters. Each block implements a specific piece of functionality, such as receiving data from a sensor, performing a calculation, detecting a condition, or generating an output signal. You define the configuration of the blocks and connect the blocks using *wires*. You can edit the models, simulate deployment with historic data, or run them against live systems. See [Analytics Builder](/streaming-analytics/analytics-builder/) for detailed information.

It is also possible to build custom blocks if none of the blocks delivered with Analytics Builder implement the logic required; see [Creating your own blocks](/streaming-analytics/analytics-builder/#creating-your-own-blocks).

You can customize several aspects of Analytics Builder by setting various tenant options. See [Configuration](/streaming-analytics/analytics-builder/#configuration) for detailed information.
