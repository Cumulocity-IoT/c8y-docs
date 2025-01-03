---
weight: 30
title: EPL Apps
layout: redirect
---

The **EPL Apps** page of the Streaming Analytics application allows you to write business logic in Apama’s Event Processing Language \(Apama EPL\) which gives more power and flexibility in a text-based programming language. This is an alternative if more complex logic is required or the logic does not fit into the pattern of an analytic model.

You can develop EPL apps (that is, single \*.mon files) directly within {{< product-c8y-iot >}}, written in Apama EPL. You can also import existing \*.mon files as EPL apps into {{< product-c8y-iot >}}. When you activate an EPL app from the Streaming Analytics application, you deploy it to {{< product-c8y-iot >}}. See [EPL Apps](/streaming-analytics/epl-apps/) for detailed information, including examples.

A quick way to get started is to explore the code of the EPL samples that can be accessed from the EPL editor. See [Developing apps with the Streaming Analytics application](/streaming-analytics/epl-apps/#dev-apps-with-sa) for information on how to create an EPL app and access the samples. For a start, use one of the simpler samples with temperature measurements, such as "Create an alarm if a measurement exceeds a threshold value". You can immediately see results using this sample. Add your own EPL code to the sample and try out your changes.

You use the Apama API for interacting with {{< product-c8y-iot >}}. For detailed information, see the `com.apama.cumulocity` package in the  [API Reference for EPL (ApamaDoc)]({{< link-apamadoc-api >}}), which is part of the Apama documentation.
