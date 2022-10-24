---
title: Overview
layout: redirect
weight: 10
---

In this section, you will learn how to extend your code in the {{< product-c8y-iot >}} Linux agent as a Lua plugin. There is also a [C++ Device integration tutorial](/device-integration/cpp/#use) explaining how to integrate your device with the **{{< product-c8y-iot >}} C++ SDK**. You can also find a simple Lua example there.


|SECTION|CONTENT|
|---|---|
|[Lua plugin tutorial - Hello world](#hello-world)|A hello world tutorial that showcases log levels|
|[Lua plugin tutorial - Sending measurements](#sending-measurements)|How to get values from a configuration file, how to use a timer function and how to send values to the {{< product-c8y-iot >}} platform with a SmartREST1.0 template|
|[Lua plugin tutorial - Restart device](#restart)|A tutorial that showcases how to get real-time notifications and handle operations by restarting a device|
|[Lua plugin tutorial - Software management](#software)|Practical example on how to manage Debian packages with {{< product-c8y-iot >}}|
|[File-backed or memory-backed buffering](#buffer)|How to switch between two buffering methods in case of a lost connection|
