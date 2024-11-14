---
weight: 45
title: Log rotation
layout: redirect
---

The components for which log rotation is configured are as follows:

|Component|Log file location|Log file rotation|Max file size|Max backup index|
|:---|:---|:---|:---|:---|
|Karaf|${karaf.data}/log/error.log|Daily|50 MB|14|
|MQTT|${karaf.data}/log/mqtt.log|Daily|50 MB|14|
|Access|${karaf.data}/log/access.log|Daily|50 MB|14|
|DataBroker|${karaf.data}/log/databroker.log|Daily|50 MB|14|

Under */etc/* they are configured via *logrotate.conf* and the configuration files under */etc/logrotate.d*.

The components for which log rotation is configured are as follows:

|Component|Log file location|Log file rotation|Max file size|Max backup index|
|:---|:---|:---|:---|:---|
|MongoDB|/var/log/mongodb/*.log|Daily|50 MB|14|
|NginX|/var/log/nginx/*.log|Daily|50 MB|14|
|Apama|/var/log/apama/*.log|Daily|50 MB|14|

For microservices, there currently is no specific log rotation configured.
