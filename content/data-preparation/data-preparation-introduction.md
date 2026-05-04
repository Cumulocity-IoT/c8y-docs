---
weight: 5
title: Introduction
layout: bundle
sector:
  - device_management
---

{{< c8y-admon-preview >}} Data Preparation is currently in Private Preview. This means it is not enabled by default and may be subject to change in the future. To enable this feature for your tenant, contact [product support](/additional-resources/contacting-support/). {{< /c8y-admon-preview >}}

**Introduction to Data Preparation**

The Data Preparation application provides a modern, **AI-first** environment for creating and managing data transformation logic to help you convert raw device data into the Cumulocity [data model](/concepts/domain-model). As IoT devices often communicate in various formats (from standard JSON to more complex structures), Data Preparation acts as a bridge that ensures your data is standardized, corrected, and ready for use across the platform and downstream.

Data Preparation uses Smart Functions - modular pieces of logic that independently process incoming messages to generate one or more Cumulocity-compliant outputs.

**Why use Data Preparation?**

Data Preparation empowers you to:

* Easily convert raw payloads into standard Cumulocity measurements, events, alarms, and inventory objects.
* Use a conversational AI chat interface to describe your business context and automatically generate the necessary transformation code in a Smart Function.
* Perform real-time calculations (e.g. converting Fahrenheit to Celsius) or correct values based on predefined normal ranges.
* Automatically map and create devices based on external IDs found in the payload, source client ID, or topic path.
* Scale with support for high-volume data ingestion, as Data Preparation is built on high-performant, horizontally scalable infrastructure.


**Key Capabilities**

* AI-First Experience – the primary user interface is an AI assistant that writes and optimizes JavaScript-based transformation logic based on your prompts (leveraging the [AI Agent Manager](/ai/aim-introduction/)).
* Build-in Code Editor – a simplified IDE is available to manually view, edit, or paste pre-written logic.
* Testing & Validation – run tests using sample data (either manually uploaded or captured live from an MQTT topic) with a visual comparison.
* Integrated Deployment – once a Rule is active, it runs continuously as data is posted to the subscribed [MQTT Service](/device-integration/mqtt-service/) topics.

**How does Data Preparation work?**

The Data Preparation application utilizes an Apama-based Data Plane and a Java-based Control Plane to manage the lifecycle of your data. Currently, the application supports data ingestion via the Cumulocity MQTT Service. Data Preparation allows you to write Rules in JavaScript. 


