---
title: Best practices
layout: bundle
sector:
  - app_enablement
weight: 80
---

The following list is a collection of best practices you should take into consideration before you start developing and deploying microservices on top of {{< product-c8y-iot >}}.


#### Microservice SDK {#microservice-sdk}

Whenever possible, use the {{< product-c8y-iot >}} Microservice SDK as it builds a lot of functionality. It is fully open source and can be extended as required. The {{< product-c8y-iot >}} Microservice SDK can be found [here]({{< link-c8y-github >}}/cumulocity-clients-java/tree/develop/microservice). See also [Microservice SDK for Java](/microservice-sdk/java/) for further instructions.


#### Disk I/O and local disk {#disk-io-and-local-disk}

Do not use a local disk, store everything in {{< product-c8y-iot >}}. You do not have a guaranteed amount of bandwidth for disk I/O and also not guaranteed capacity.


#### Liveness probes {#liveness-probes}

Liveness probes should be exposed to Kubernetes as well, only having a health endpoint is not sufficient. Moreover, take special attention on implementing liveness probes properly. Kubernetes will restart or undeploy the service if the liveness probe is not reliable. Never check 3rd parties in the liveness probe - this can prevent the service from working.


#### Network traffic {#network-traffic}

It is not recommended to build a microservice that loads most of the functionality as well as external content on start.


#### Resource consumption {#resource-consumption}

Resource consumption should be defined as necessary in the [microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest). Resource consumption has an impact on billing. Also consider carefully how many resources you will need in a production scenario per microservice started.


#### Scaling {#scaling}

There is currently no way to influence load balancer behaviour for scaled microservices, for details on scaling see [Isolation and scaling](/microservice-sdk/general-aspects/#isolation-scaling). The behaviour is round-robin. Refer to [Microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest) for further information on how to configure scaling in the manifest file *cumulocity.json*.


#### Shared microservices {#shared-microservices}

When building microservices for multiple tenants, try to build them in the multi-tenant isolation level, see [Isolation and scaling](/microservice-sdk/general-aspects/#isolation-scaling).


#### Statefulness {#statefulness}

Avoid statefulness wherever possible, rather write data via REST requests or DB to a persistent shared storage. You can actually find statelessness as one of the requirements listed under [Requirements and interactions](/microservice-sdk/general-aspects/#requirements-interactions).


#### Testing of microservices {#testing-of-microservices}

* Do not develop or test on a production platform.
* You should develop in a local environment before even deploying something in a development or test cluster.
* Use existing development platforms to test your microservices before rolling them out to any production system.
