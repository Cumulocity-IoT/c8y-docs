---
date: ""
title: Filter audit logs by MQTT service
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66370
version: 1024.19.1
---
Audit logs help you track system activities and changes for compliance and troubleshooting purposes. Previously, when reviewing audit logs, you could not filter entries by MQTT service, making it difficult to isolate MQTT-related activities in systems with multiple services. Now you can filter audit logs by MQTT service, allowing you to quickly find and review all MQTT-related audit entries. This improves your ability to monitor MQTT service activities, troubleshoot issues specific to MQTT operations, and maintain better visibility into service-specific changes in your installation.