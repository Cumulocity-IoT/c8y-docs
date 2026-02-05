---
weight: 39
title: MongoDB credentials secret
layout: redirect
---

Specifies the Kubernetes secret containing the admin credentials with which the MongoDB server must be configured. The Edge operator retrieves this secret from the namespace **EDGE-CR-NAMESPACE**. It is important that this secret is created before initiating the Edge deployment or update process.

This secret should contain the fields described in the table below:

|<div style="width:150px">Field</div>|Required|<div style="width:70px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|MONGODB_DATABASE_ADMIN_USER|Yes|String||Database admin username with which the MongoDB server is configured.|
|MONGODB_DATABASE_ADMIN_PASSWORD|Yes|String||Database admin password with which the MongoDB server is configured.|