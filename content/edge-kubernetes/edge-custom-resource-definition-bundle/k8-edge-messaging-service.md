---
weight: 36
title: Messaging Service
layout: redirect
---

Configures the installation of the Messaging Service component, which is essential for enabling the microservice-based data broker and Notifications 2.0.
Enabling the Messaging Service requires additional system resources—specifically, the Kubernetes node must have at least 2 additional CPU cores and 4 GB of RAM to ensure optimal performance and stability.
This field is optional, and if omitted, the Messaging Service component will not be installed.

|<div style="width:170px">Field</div>|Required|<div style="width:115px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|enabled|Yes|Boolean||Set to `true` to install the Messaging Service component.