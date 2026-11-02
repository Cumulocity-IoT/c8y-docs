---
weight: 10
title: Overview
layout: redirect
---

This section explains how to write smart functions for use within {{< product-c8y-iot >}} Data Preparation rules. It covers the function signatures you implement, the data types you receive and return, the runtime environment your code executes in, and the behavior guarantees the platform makes.

### What is a Data Preparation smart function? {#what-is}

A Data Preparation smart function is a small Javascript function that implements a Data Preparation rule. The platform invokes the function when a message matching the rules filters arrives, with that message as the argument, and uses the values you return to update the {{< product-c8y-iot >}} operational store or forward messages to other destinations.

A rule can also define an optional second function, `onDeviceCreate`. The platform invokes it when an output names a device that does not exist yet, to decide what to create. For details, see [Device creation](#function-device-create).

Within the platform these smart functions use Javascript, but you can write your function in TypeScript for type safety while developing externally and then transpile the function before deployment.


