---
weight: 15
title: Containerization and orchestration
layout: redirect
---


### Images and containers {#images-and-containers}

Docker is a platform to develop, deploy and run applications with containers. An image is an executable package that includes everything needed to run an application (that is, the code, a runtime, libraries and configuration files). A container is a runtime instance of an image (that is, what the image becomes in memory when executed). Refer to the [Docker documentation](https://docs.Docker.com/get-started/) for more information about Docker.

{{< product-c8y-iot >}} microservices are based on Docker. Hence, a microservice must be packaged as a Docker image in order to run on the {{< product-c8y-iot >}} platform. A microservice is executed in a Docker container during runtime. The Docker container ensures that a microservice does not harm other microservices running in {{< product-c8y-iot >}}.

Containers have an upper thread limit of 10240 for microservices.

### Pods {#pods}

Kubernetes is the container orchestration engine for automating deployment, scaling and management of containerized applications. A Pod is the basic building block of Kubernetes and it represents a running process on your cluster. A Pod encapsulates an application container, storage resources, a unique network IP and options that govern how the container should run.

Docker is the most common container runtime used in a Kubernetes Pod. Moreover, Kubernetes is used to orchestrate Docker containers and it provides many enterprise-grade features for hosting Docker containers such as auto-scaling and load balancing. Refer to the [Kubernetes documentation](https://kubernetes.io/docs/home/) for more information about Kubernetes.

When Docker faces some issues, for example, a Pod synchronization error, an alarm is created and can be seen in **Alarms** in the Cockpit application. Refer to [Troubleshooting](#ga-troubleshooting) in this section to learn about common issues.
