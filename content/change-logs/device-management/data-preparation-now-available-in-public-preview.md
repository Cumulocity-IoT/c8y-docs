---
date: "2026-06-01"
title: "Data Preparation now available in Public Preview"
product_area: "Device management & connectivity"
change_type:
  - value: "change-pXAlHAWka"
    label: "Preview"
component:
  - value: "component-dPrp1xK9z"
    label: "Data Preparation"
build_artifact:
  - value: "tc-QHwMfWtBk7"
    label: "cumulocity"
ticket: ""
version: ""
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it may be subject to change in the future.
{{< /c8y-admon-preview >}}

Data Preparation is a new application that lets you transform incoming device messages before they are stored in {{< product-c8y-iot >}}. You create rules that receive raw payloads over MQTT, process them with custom code, and produce standard {{< product-c8y-iot >}} measurements—for example, converting proprietary sensor data from a device into a format the platform can store and display.

Each rule targets a specific MQTT topic or client ID filter and runs a Smart function—a Javascript snippet—that processes the incoming message. The built-in AI assistant (powered by the AI Agent Manager) helps you generate the transformation code from a sample payload and a plain-language description of your goal.

Key capabilities include:

- A guided wizard for creating rules with topic and client ID filters.
- An AI assistant that generates Smart function code from sample payloads.
- A rule editor with live testing against sample data before deployment.
- Draft and deployed states for safe iteration without affecting live traffic.

To enable Data Preparation, open the right drawer (by clicking on your username initials) in the **Administration** application and select **Manage preview features**. Then activate the toggle next to **Data Preparation**.

For details, see [Data Preparation](/data-preparation/).
