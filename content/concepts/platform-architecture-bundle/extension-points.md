---
weight: 30
title: Extension points
layout: redirect
---

Both architectures share a consistent set of extension points, so you can adapt the platform to your solution without modifying it. The same building blocks appear wherever they apply:

| Stage or layer | Extension points |
|----------------|------------------|
| Device integration | Microservice |
| Data Preparation | Microservice, smart function |
| Analytics and lake ingestion | Microservice, smart function, smart rules |
| Business logic | Microservice |
| IoT applications | Web application, HTML widget, AI agent |

**[Microservices](/microservice-sdk/microservice-sdk-introduction/)** are fully independent services with their own lifecycle. Use one when you need a long-running, self-contained component — a custom protocol, a complex integration, or dedicated server-side logic.

**[Smart functions](/concepts/smart-function-concept/)** embed lightweight Javascript logic directly inside a component, such as a Data Preparation rule or a Streaming Analytics model. There is no container to build or deploy — use them for targeted transformation, enrichment, or analytics logic.

**[Smart rules](/cockpit/smart-rules/)** provide no-code automation for common real-time reactions, configured directly in the UI.

**[Web applications](/web/introduction/) and HTML widgets** customize the user-facing layer, from an individual dashboard widget to a complete application.

**[AI agents](/ai/agents/)** bring generative and agentic AI into applications, grounded in your platform data.

For a deeper look at the lightweight options that work the same way across components, see [Smart functions](/concepts/smart-function-concept/).
