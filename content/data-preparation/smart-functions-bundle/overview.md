---
weight: 10
title: Overview
layout: redirect
---

This section explains how to write smart functions for use within {{< product-c8y-iot >}} Data Preparation rules. It covers the function signatures you implement, the data types you receive and return, the runtime environment your code executes in, and the behavior guarantees the platform makes.

### What's covered here {#whats-covered}

This section focuses on **writing the function code itself** --- semantics, APIs, types, and runtime behavior. It assumes you have a rule in which to deploy the function, and that you understand the broader concept of smart functions.

You will find:

- The available functions and what each one is for
- The data types passed in and returned
- The context object and what it provides
- Standard libraries and importable libraries
- Runtime guarantees, limits, and sandboxing details specific to Data Preparation
- Practical examples
- Pointers to the full TypeScript API reference

### What's covered elsewhere {#whats-elsewhere}

The following topics are covered in their own sections:

- **General smart functions concept**: For background on smart functions across {{< product-c8y-iot >}}, see [Smart functions](/concepts/smart-function-concept/).
- **Authoring in the UI**: Writing and editing smart functions in the Data Preparation rule editor.
- **AI-assisted authoring**: Using AI to generate or refine smart functions.
- **External development**: Writing smart functions outside the platform, including TypeScript and transpilation, and uploading the result.
- **Rule management**: Creating, deploying, versioning, and monitoring Data Preparation rules.

### What is a Data Preparation smart function? {#what-is}

A Data Preparation smart function is a small Javascript function that runs inside a Data Preparation rule. The platform invokes the function at a defined point in the message lifecycle, passes it inputs, and uses the values you return to update the {{< product-c8y-iot >}} operational store or forward messages to other destinations.

You write the function in Javascript. The function has a fixed name and signature determined by its role within the rule. You implement the function body to perform the mapping or transformation you need.

You can also use TypeScript for type safety while developing externally. The platform itself runs Javascript only --- TypeScript must be transpiled before deployment.

### Why use smart functions in Data Preparation? {#why-use}

Within Data Preparation, smart functions let you:

- Parse arbitrary device payloads (binary, JSON, protobuf, CBOR, OPC UA structures, custom formats) into Cumulocity domain objects (measurements, events, alarms, operations).
- Apply per-message transformation, enrichment, validation, or filtering.
- Drop malformed or duplicate messages before they reach storage.
- Route messages to different destinations based on content.

This gives you full programmatic control over the mapping between device protocols and the Cumulocity domain model --- without building, deploying, or operating a separate microservice.

### Things to consider when writing the section {#section-considerations}

<!-- Notes for the documentation team — remove before publishing. -->

- Do we want to call out audience explicitly here (developers familiar with Javascript)?
- Should we set expectations about prior knowledge — for example, ECMAScript familiarity, awareness of the Cumulocity domain model?
- Worth including a short "your first smart function" pointer to the simplest example?
- Note future expansion: this section starts with one function (`onMessage` for inbound device messages) but will grow to cover other function types.
