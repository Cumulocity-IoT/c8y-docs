---
weight: 50
title: Kubernetes Operator
layout: redirect
---

Kubernetes Operators are a powerful concept and pattern for managing complex applications and services within Kubernetes clusters. The operators are software extensions to Kubernetes that make use of [custom resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) to manage applications and their components. The operators follow Kubernetes principles, notably the [control loop](https://kubernetes.io/docs/concepts/architecture/controller/).

The integral part of the operator pattern is custom resource Definitions (CRDs), which allow you to define application-specific resources and its behavior. An operator uses these CRDs to understand how to manage and interact with the application.

The operators are particularly valuable for managing stateful applications, like {{< product-c8y-iot >}}. The operators automate best practices, routine tasks, and provide a consistent way to manage complex applications across different environments.
