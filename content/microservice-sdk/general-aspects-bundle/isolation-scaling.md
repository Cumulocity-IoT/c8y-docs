---
weight: 40
title: Isolation and scaling
layout: redirect
---

The following isolation levels are available for microservices:

* Multi-tenant: Single microservice Docker container instantiated for all subscribed tenants, unless the microservice is scaled.
* Single-tenant: Dedicated microservice Docker container instantiated for each subscribed tenant.

See [Settings](#settings) for the `isolation` setting.

In case the `scale` setting is set to NONE, the platform guarantees that there is one instance of the service per isolation level by default. The number of guaranteed instances can be increased by defining the `replicas` setting in the manifest. If scaling is enabled (set to AUTO), the microservice will be horizontally auto-scaled (creating more instances of the microservice) in case of high CPU usage.
Auto-scaling monitors the microservices to make sure that they are operating at the desired performance levels, and it will automatically scale up your cluster as soon as you need it and scale it back down when you don’t.

See [Settings](#settings) for the `scale` and `replicas` setting.
