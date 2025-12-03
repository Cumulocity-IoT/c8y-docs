---
weight: 10
title: Overview
layout: redirect
---

Edge is a cloud-native solution for the delivery, deployment, and management of the single-server variant of the {{< product-c8y-iot >}} platform. In contrast to the {{< product-c8y-iot >}} platform, which is available in the cloud (for example, using AWS, Azure, or other data centers), Edge is installed in factories, that is, in the same site ("onsite") in which the IoT assets are located.

Reasons for using an onsite installation of Edge include:

* **Autonomy**: Even if there is no cloud connection, tasks like data collection and data analysis can still be performed.
* **Data reduction**: Data is analyzed and aggregated close to assets, and thus less data needs to be sent to the cloud.
* **Reactivity**: Both Edge and the {{< product-c8y-iot >}} platform include real-time streaming analytics engines. However, placing the rule execution in Edge reduces latency, because the round-trip to cloud is omitted.

Features of Edge include:

* Edge Agent, which enables remote monitoring and management of an Edge instance from the {{< product-c8y-iot >}} tenant.
* Data broker to send IoT data to the cloud and receive operations from the cloud, with web-based UI to filter data.
* Streaming Analytics engine for real-time local data analysis including the {{< product-c8y-iot >}} Analytics Builder.
* Ready-to-use Cockpit and Device Management applications.
* Native protocol support for MQTT and REST.
* Edge database for operational data storage.
* [OPC UA](/device-integration/opcua/) with web-based UI for efficient connection management and seamless integration of industrial automation systems.
* Easy installation and upgrades.
* Microservice hosting, which allows to run server-side applications which may be used to extend the {{< product-c8y-iot >}} platform with customer-specific functionality (optional component).
* [DataHub](/datahub/datahub-overview/) for historical data storage and analytics (optional component).

Kubernetes offers an efficient platform for deploying, scaling, and managing containerized applications using a centralized control plane. Given this, containers orchestrated by Kubernetes have become standard in contemporary IT, fitting a broad spectrum of deployment contexts. Edge capitalizes on these orchestration and management benefits, streamlining the operations of the Edge servers with other containerized applications in your deployment landscape.

Edge captures all the highlighted advantages of a cloud-native deployment strategy by using a Kubernetes Operator, known as the Edge operator. This Edge operator serves as the central controller and facilitates the deployment and management of Edge on a Kubernetes cluster. This equips you with:

- **Unified Management**: Manage Edge through an Edge custom resource (CR) in accordance with standard Kubernetes resources. This approach provides a unified and familiar interface for administrators and operators.
- **Desired State Management**: Specify the desired state of Edge through Edge CR. The Edge operator then ensures that the actual state matches the desired state, simplifying operations and reducing the need for manual intervention.
- **GitOps Friendly**: The declarative nature of CR aligns seamlessly with GitOps workflows. The entire Edge deployment state, including configurations, can be stored and versioned in Git, promoting transparency and traceability.
- **Automation**: Edge CR empowers you to automate various operational aspects of Edge like scaling, upgrades, and configuration.
- **Distribution**: Distribute and replicate the Edge deployments using Edge CR. Simplify the deployment and accelerate the adoption of {{< product-c8y-iot >}} platform across diverse environments.

Although the features remain on par with the {{< product-c8y-iot >}} platform, the deployment is as illustrated in the diagram below:

<img src="/images/edge-k8s/edge-k8-overview.png" name="Edge overview" style="width:75%;"/>
