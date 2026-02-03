---
date: 2024-05-16
title: Building microservice container images with Docker 25
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-rlV-4nEfO
    label: Microservice Hosting
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-58938
version: 10.18.308.0
---
{{< product-c8y-iot >}} allows you to extend the platform API with customer-specific functionality by deploying microservices. Technically, microservices are Docker containers hosted by {{< product-c8y-iot >}} and they follow specific conventions. When building the microservice container image with Docker version 25 it could happen that the microservice upload failed with the following error: config file does not have .json extension. This issue is now fixed.
