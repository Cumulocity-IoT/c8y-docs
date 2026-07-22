---
weight: 30
title: Platform architecture
layout: bundle
sector:
  - getting_started
---

{{< product-c8y-iot >}} is a single, coherent platform built from a set of components, each with a clear responsibility. Where the [domain model](/concepts/domain-model/) describes the data the platform manages, this section shows how that data moves through the system and how the parts fit together.

Two views make up the picture. The **data flow architecture** follows data in real time, from a device through ingestion, preparation, storage, and analytics — and back again to close the loop. The **application architecture** shows how applications and business logic build on top of the platform core and its stores to deliver value to users. Both are tailored through a consistent set of [extension points](#extension-points), so you can adapt the platform to your solution without modifying it.
