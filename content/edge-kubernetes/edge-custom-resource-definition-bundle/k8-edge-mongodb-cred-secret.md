---
weight: 39
title: MongoDB credentials secret
layout: redirect
---

Specifies the Kubernetes secret containing the admin credentials with which the MongoDB managed by the Edge operator must be configured or the admin credentials of the externally hosted MongoDB server. The Edge operator retrieves this secret from the namespace **`EDGE-CR-NAMESPACE`**. It is important that this secret is created before initiating the Edge deployment or update process.

This secret should contain the fields described in the table below:

|<div style="width:150px">Field</div>|Required|<div style="width:70px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|MONGODB_DATABASE_ADMIN_USER|Yes|String||Database admin username with which the MongoDB managed by the Edge operator or the username of the externally hosted MongoDB server is configured.
|MONGODB_DATABASE_ADMIN_PASSWORD|Yes|String||Database admin password with which MongoDB managed by the Edge operator or the password for the externally hosted MongoDB server is configured.
|MONGODB_USER_ADMIN_USER|No|String|userAdmin|Only used when MongoDB is deployed and managed by the Edge operator.
|MONGODB_USER_ADMIN_PASSWORD|No|String|Password provided in the field `MONGODB_DATABASE_ADMIN_PASSWORD`|Only used when MongoDB is deployed and managed by the Edge operator.
|MONGODB_CLUSTER_ADMIN_USER|No|String|clusterAdmin|Only used when MongoDB is deployed and managed by the Edge operator.
|MONGODB_CLUSTER_ADMIN_PASSWORD|No|String|Password provided in the field `MONGODB_DATABASE_ADMIN_PASSWORD`|Only used when MongoDB is deployed and managed by the Edge operator.
|MONGODB_CLUSTER_MONITOR_USER|No|String|clusterMonitor|Only used when MongoDB is deployed and managed by the Edge operator.
|MONGODB_CLUSTER_MONITOR_PASSWORD|No|String|Password provided in the field `MONGODB_DATABASE_ADMIN_PASSWORD`|Only used when MongoDB is deployed and managed by the Edge operator.
|MONGODB_BACKUP_USER|No|String |backup|Only used when MongoDB is deployed and managed by the Edge operator.
|MONGODB_BACKUP_PASSWORD|No|String|Password provided in the field `MONGODB_DATABASE_ADMIN_PASSWORD`|Only used when MongoDB is deployed and managed by the Edge operator.
