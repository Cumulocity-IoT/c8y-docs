---
weight: 10
title: Overview
layout: bundle
---

## What are smart functions?

Smart functions are small Javascript programs that run within {{< product-c8y-iot >}} and extend its capabilities without requiring you to build and maintain a full microservice. Each smart function is a focused piece of logic designed to solve a specific problem: processing data, transforming messages, computing analytics, or customizing behavior.

Smart functions sit between two extremes. They are more powerful and flexible than static configuration, allowing you to apply custom logic to your data and workflows. At the same time, they are significantly simpler than microservices—you write a single function, deploy it as a file, and the system handles execution, security, and scaling automatically.

## When to use smart functions

Smart functions work well when you need to:

- Process or transform incoming device data before it reaches the database.
- Create computed metrics or analytics from raw device messages.
- Filter, enrich, or route data based on custom business logic.
- Customize behavior for specific tenants or use cases without deploying new code.
- Rapidly prototype or iterate on logic without complex DevOps workflows.

You do not need to deploy a full microservice for these scenarios. Smart functions let you achieve the same goals with much less operational overhead.

## Key advantages

**Lightweight and fast to deploy**
Write and upload a single Javascript file. There is no container orchestration, no dependency management, and no complex CI/CD pipelines. Your smart function is ready to use within seconds.

**Secure by design**
Smart functions run in a sandboxed environment that prevents access to the host filesystem, network sockets, other tenants' data, and uncontrolled resource consumption. Multi-tenant isolation is built in, not an afterthought.

**Consistent across the platform**
Whether you are preparing data in the Data Preparation service, building analytics in Streaming Analytics, or processing messages at the edge with thin-edge.io, smart functions follow the same principles and patterns. Learn once, use everywhere.

**Async-ready**
Smart functions support both synchronous and asynchronous operations, letting you handle long-running tasks, API calls, or complex workflows while keeping your code clean and readable.

**Developer-friendly**
Write in Javascript or TypeScript. Use familiar language features (ES2023 and later) and standard APIs. The system provides a lightweight standard library for common tasks like Base64 encoding, text conversion, and logging.

## How smart functions fit into {{< product-c8y-iot >}}

Different components of the platform use smart functions in different ways, tailored to their specific needs:

- **Data Preparation** uses smart functions to transform inbound device messages before they are stored, enabling data normalization, enrichment, and filtering at ingestion time.
- **Streaming Analytics** uses smart functions as custom processing blocks in analytics models, allowing you to apply business logic to real-time data streams.
- **thin-edge.io** uses smart functions to process messages at the edge, reducing bandwidth and enabling local processing before data reaches the cloud.
- Other components will add smart functions support over time, each applying the pattern to their domain.

## Next steps

To understand the technical details and universal features that all smart functions share, see [Common features](#common-features).

To learn how smart functions differ across implementations and which one suits your use case, see [Implementations](#implementations).

To get started developing your own smart function, see [Development](#development).
