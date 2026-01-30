---
weight: 20
title: Requirements and interactions
layout: redirect
---

The following requirements towards {{< product-c8y-iot >}} microservices must be met:

* A microservice must be a (linux/amd64) Docker image run.
* The Docker image must be packaged as _image.tar_ and must include a manifest file (_cumulocity.json_).
* A microservice must be stateless, that means, it must contain only ephemeral state. The reason is that a microservice must be able to survive (random) restarts due to hardware reasons (server failure) and operations reasons (upgrade, migration).
* All persistent states must be stored at the {{< product-c8y-iot >}} platform via inventory, binary, tenant options and other APIs. Persistent volumes are not supported.
* A microservice cannot access the database directly and must use the {{< product-c8y-iot >}} API.
* A microservice must provide one inbound REST API. Additional inbound ports are not supported.
* A microservice can use multiple outbound ports.
* The request lifetime must have the maximum. The infrastructure might terminate requests running to long.
* All log information must be sent to the standard output in order to be captured and persisted by the infrastructure.

Microservices interact with {{< product-c8y-iot >}} and the outside world as shown in the following diagram:

![Microservices interactions](/images/microservices-sdk/ms-interactions-diagram.png)

The Microservices' lifecycle is managed using the microservice subscription API. This allows registration and subscription of Microservices. External actors (for example web user interfaces, integrations or other microservices) can invoke a microservice by sending REST or Websocket requests to its endpoints <kbd>/service/&lt;microservice-name>/&lt;path></kbd>. A microservice can issue requests to external endpoints or to the {{< product-c8y-iot >}} REST APIs. Microservices can store logs and metrics in the associated developer tenant.
