---
weight: 30
title: Platform architecture
layout: bundle
sector:
  - getting_started
---

{{< product-c8y-iot >}} is made up of several components, each handling a distinct part of the flow from device data to applications. Where the [domain model](/concepts/domain-model/) describes the data the platform manages, this section describes those components: how data moves through the system, and what each part is responsible for.

Two views make up the picture. The **data flow architecture** follows data in real time, from a device through ingestion, preparation, storage, and analytics — and back again to close the loop. The **application architecture** shows how applications and business logic build on top of the platform core and its stores to deliver value to users. A consistent set of [extension points](#extension-points) spans both, so you can adapt the platform to your solution without modifying it.
