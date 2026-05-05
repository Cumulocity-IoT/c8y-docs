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

Data Preparation uses smart functions - modular pieces of logic that independently process incoming messages to generate one or more Cumulocity-compliant outputs. see [smart functions](/concepts/smart-function-concept/) concept details.

**Why use Data Preparation?**

Data Preparation empowers you to:

* Easily convert raw payloads into standard Cumulocity measurements, events, alarms, and inventory objects.
* Use a conversational AI chat interface to describe your business context and automatically generate the necessary transformation code in a Smart Function.
* Perform real-time calculations (e.g. converting Fahrenheit to Celsius) or correct values based on predefined normal ranges.
* Automatically map and create devices based on external IDs found in the payload, source client ID, or topic path.
* Scale with support for high-volume data ingestion, as Data Preparation is built on high-performant, scalable infrastructure.


**Key Capabilities**

* AI-First Experience – the primary user interface is an AI assistant that writes and optimizes JavaScript-based transformation logic based on your prompts (leveraging the [AI Agent Manager](/ai/aim-introduction/)).
* Built-in Code Editor – a simplified IDE is available to manually view, edit, or paste pre-written logic.
* Testing & Validation – run tests using sample data (either manually uploaded or captured live from an MQTT topic) with a visual comparison.
* Integrated Deployment – once a Rule is active, it runs continuously as data is posted to the subscribed [MQTT Service](/device-integration/mqtt-service/) topics.

**How does Data Preparation work?**

The Data Preparation application utilizes an Apama-based Data Plane and a Java-based Control Plane to manage the lifecycle of your data. Currently, the application supports data ingestion via the Cumulocity MQTT Service. Data Preparation allows you to write Rules in JavaScript. 


### Architecture {#architecture}

The diagram below illustrates the Dataprep Service flows within a tenant.

<p align="center" width="100%">
    <img width="80%" src="/images/data-preparation/datprep_architecture.png" alt="Dataprep Service architecture">
</p>

 Data Preparation receives raw device messages, applies user-defined transformation logic, and forwards the resulting Cumulocity objects to the platform for persistence and use by applications.

 Internally, Data Preparation consists of two layers:

* **Data Plane** — an Apama-based high-throughput runtime that receives incoming messages, evaluates active Rules, and executes Smart Functions. It is designed for high-volume, low-latency processing and scales.

* **Control Plane** — a Java-based management layer that handles the full lifecycle of Rules and Smart Functions. Changes made in the application — such as activating or updating a Rule — are applied by the Control Plane to the Data Plane at runtime without requiring a restart.

## How Data Preparation works {#how-it-works}

Data Preparation listens for incoming device messages on [MQTT Service](/device-integration/mqtt-service/) topics. When a message arrives, it evaluates all active Rules subscribed to that topic. Each matching Rule runs its smart functions against the payload and the resulting Cumulocity objects — measurements, events, alarms, or managed objects — are forwarded to the platform and persisted.

Multiple active Rules can subscribe to the same topic and execute independently. A single message can trigger multiple Rules, and each Rule can produce multiple output objects.

## Key concepts {#key-concepts}

### Smart Functions {#smart-functions}

Smart functions provide a lightweight way to extend the functionality of Cumulocity across multiple components. They let you write small Javascript functions that run in a secure, isolated environment—more powerful than configuration but much simpler than building a full microservice. For details, see [Overview](/concepts/smart-function-concept/) and its Function signature etc.

### Rules {#rules}

A Rule is the deployable unit in Data Preparation. It pairs a Smart Function with an MQTT topic subscription and an activation state. When active, a Rule processes every message posted to its subscribed topic. Rules can be created, tested with sample data, activated, deactivated, and deleted through the Data Preparation application.

For details, see [Rules](#).


