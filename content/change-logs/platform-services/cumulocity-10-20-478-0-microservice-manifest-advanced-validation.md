---
date: 2024-07-11T14:53:24.832Z
title: Microservice manifest advanced user input validation
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Application enablement & solutions
component:
  - value: component-rlV-4nEfO
    label: Microservice Hosting
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-59087
version: 10.20.478.0    
---
Making {{< product-c8y-iot >}} more secure we have added a check on upload to ensure microservice settings do not contain any line feed characters such as HttpGet, exec, and TCPSocket of type Probe, aligned with items in the Kubernetes PodSpec.
