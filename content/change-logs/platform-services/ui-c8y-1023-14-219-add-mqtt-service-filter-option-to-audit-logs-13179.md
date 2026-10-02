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
version: 1023.14.219
---
Audit logs help you track and monitor system activities for security and compliance purposes. Previously, when reviewing audit logs, you could not filter entries by the MQTT service that generated them, making it difficult to isolate and analyze MQTT-related activities. Now you can filter audit logs by MQTT service, allowing you to quickly find and review all audit log entries associated with a specific MQTT service. This improves your ability to troubleshoot MQTT-related issues, monitor service-specific activities, and maintain better visibility into your system's operations.