---
weight: 5
title: Introduction
layout: bundle
sector:
  - device_management
---

{{< c8y-admon-preview >}} Data Preparation is currently in Private Preview. This means it is not enabled by default and may be subject to change in the future. To enable this feature for your tenant, contact [product support](/additional-resources/contacting-support/). {{< /c8y-admon-preview >}}

**Introduction to Data Preparation**

The Data Preparation application provides a modern, AI-first environment for creating and managing data transformation logic to help you convert raw device data into the Cumulocity [data model](/concepts/domain-model). As IoT devices often communicate in various formats (from standard JSON to IoT-specific binary protocols), Data Preparation acts as a bridge that ensures your data is standardized, corrected, and ready for use across the platform and downstream.

Data Preparation uses smart functions - modular pieces of logic that independently process incoming messages to generate one or more Cumulocity-compliant outputs. For details, see the [Smart functions concept](/concepts/smart-function-concept/) and [Smart functions in Data Preparation](/data-preparation/smart-functions/).

**Why use Data Preparation?**

Data Preparation empowers you to:

* Easily convert raw payloads into standard Cumulocity measurements, events, alarms, and inventory objects.
* Use AI to describe your business context and automatically create the required transformation code in a smart function.
* Perform real-time calculations (e.g. converting Fahrenheit to Celsius) or correct values based on predefined normal ranges.
* Automatically map and create devices based on external IDs found in the payload, source client ID, or topic path.
* Scale with support for high-volume data ingestion, as Data Preparation is built on high-performant, scalable infrastructure.


**Key Capabilities**

* AI-First Experience – the primary user interface is an AI assistant that writes and optimizes JavaScript-based transformation logic based on your prompts (leveraging the [AI Agent Manager](/ai/aim-introduction/)).
* Built-in Code Editor – a simplified IDE is available to manually view, edit, or paste pre-written logic.
* Testing & Validation – run tests using sample data (either manually uploaded or captured live from an MQTT topic) with a visual comparison.
* Integrated Deployment – once a Rule is active, it runs continuously as data is posted to the subscribed [MQTT Service](/device-integration/mqtt-service/) topics.  

{{< c8y-admon-important >}}
Data Preparation handles data normalization only. For complex event processing, aggregations, or real-time analytics IoT use cases, use [Streaming Analytics](/streaming-analytics/introduction-analytics/) after Data Preparation has normalized your data.
{{< /c8y-admon-important >}}

### Architecture {#architecture}

The diagram below illustrates the Data Preparation service flows within a tenant.

<p align="center" width="100%">
    <img width="80%" src="/images/data-preparation/datprep_architecture.png" alt="Data Preparation Service architecture">
</p>

 Data Preparation receives raw device messages, applies user-defined transformation logic, and forwards the resulting Cumulocity objects to the platform for persistence and use by applications(e,g Streaming analytics).  

## How Data Preparation works {#how-it-works}

Data Preparation listens for incoming device messages on [MQTT Service](/device-integration/mqtt-service/) topics. When a message arrives, it evaluates all active rules subscribed to patterns that match the message topic. Each matching rule runs its smart functions against the payload and the resulting Cumulocity objects — measurements, events, alarms, or managed objects — are forwarded to the platform and persisted.

Multiple active rules can subscribe to patterns that match the same topic and execute independently. A single message can trigger multiple rules, and each rule can produce multiple output objects.

## Key concepts {#key-concepts}

### Smart functions {#smart-functions}
Smart functions provide a lightweight way to extend the functionality of Cumulocity across multiple components. They let you write small JavaScript functions that run in a secure, isolated environment, more powerful than configuration but much simpler than building a full microservice. For details, see [Smart functions](/data-preparation/smart-functions/) and [Smart functions concept](/concepts/smart-function-concept/).

### Rules {#rules}
A rule is the deployable unit in Data Preparation. It pairs a smart function with an MQTT topic subscription and an activation state. When active, a rule processes every message posted to its subscribed topic. Rules can be created, tested with sample data, activated, deactivated, and deleted through the Data Preparation application.

For details, see [Rule creation and management](/data-preparation/rule-creation-management/) and [Rule editor](/data-preparation/rule-editor/).

### Test data {#test-data}
Test data is sample device payload that you use to validate your smart function before activating a rule. Data Preparation runs an input payload in the device's native format through the smart function to compare the resulting Cumulocity output side by side. You can define multiple test cases per rule, capture live messages directly from an MQTT topic, or add payloads manually.

For details, see [Test data](data-preparation/rule-editor/#test-data).


