---
weight: 10
title: Overview
layout: redirect
---

### What are smart functions? {#what-are-smart-functions}

Smart functions are a common extension mechanism built into {{< product-c8y-iot >}}. They let you embed custom Javascript logic directly into platform components—without building or deploying a custom microservice.

Think of them as function-as-a-service for the IoT: each smart function is a focused piece of logic that runs inside a platform component, triggered by the component at the right moment. You write the function, configure it in the UI, and the platform handles execution, security, and scaling.

Smart functions sit between two extremes. They are more powerful and flexible than static configuration, letting you apply custom logic to your data and workflows. At the same time, they are far simpler than microservices—there is no container to build, no infrastructure to manage, and no separate deployment pipeline.

### How smart functions are deployed {#how-smart-functions-are-deployed}

Smart functions do not exist in isolation. Each component has its own object type that you create, configure, and manage, and smart functions are embedded within it.

In **Data Preparation**, the object is a **rule**. Each rule contains exactly one smart function, which is applied to every inbound device message that the rule matches.

In **Streaming Analytics**, the object is a **model**. A model defines a processing pipeline made up of connected blocks. Smart functions appear as one type of block within that pipeline, alongside built-in blocks for filtering, aggregation, and output. A model can contain any number of blocks, including multiple smart function blocks.

In **thin-edge.io**, the object is a **flow**. A flow defines a message-processing pipeline on the edge device and can include one or more smart functions at different stages.

You create and manage rules, models, and flows through each component's UI or API. The smart functions inside them are written in Javascript and executed by the platform.

### Key advantages {#key-advantages}

**A consistent extension mechanism across the platform**
Smart functions follow the same concepts and patterns wherever they appear. Learn the model once, and apply it across Data Preparation, Streaming Analytics, thin-edge.io, and future components. This consistency also reduces the learning required to build end-to-end solutions: the same mental model, tooling, and development workflow applies whether you are writing logic for the cloud or the edge.

**Easy movement of logic between cloud and edge**
Because smart functions share the same language and API patterns across components, it is straightforward to move business logic between environments. A transformation written for Data Preparation in the cloud can be adapted for a thin-edge.io flow on the device, without switching languages or development tools.

**Common tooling for development and packaging**
Smart functions use standard Javascript tooling. You can write them in any editor, use TypeScript for type safety, and bundle external libraries using any standard Javascript build tool. The same workflow and packaging approach applies regardless of which component you are targeting.

**Lighter weight than custom microservices**
Microservices are the right tool when you need a fully independent service with its own lifecycle. Smart functions are the right tool when you need targeted custom logic embedded in an existing component. There is no container orchestration, no dependency management, and no complex CI/CD pipeline—just a Javascript function deployed as part of a rule, model, or flow.

**Integrated into platform components and UI**
Smart functions are first-class citizens of each component. You write and manage them through the component's own UI, not through a separate development or deployment tool.

**AI-assisted development**
Smart functions are designed to work well with AI code generation. The function signatures are simple and well-typed, which makes them easy to describe to an AI tool and easy to review. Where components provide an in-platform editing experience, AI assistance is integrated directly into the editor, allowing you to generate, refine, and explain smart functions without leaving the platform.

**Secure by design**
Smart functions run in a sandboxed environment. They cannot access the host filesystem, open network connections, or read another tenant's data. Resource consumption is bounded by the platform. For details, see [Sandbox and limits](#sandbox-and-limits).

### How smart functions fit into {{< product-c8y-iot >}} {#how-smart-functions-fit}

- **Data Preparation** uses smart functions inside rules to transform inbound device messages before they are stored, enabling data normalization, enrichment, and filtering at ingestion time.
- **Streaming Analytics** uses smart functions as custom blocks inside models, allowing you to apply business logic to real-time data streams.
- **thin-edge.io** uses smart functions inside flows to process messages at the edge, reducing bandwidth and enabling local processing before data reaches the cloud.
- Other components will add smart functions support over time, each applying the pattern to their domain.
