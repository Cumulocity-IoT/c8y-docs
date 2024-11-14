---
weight: 10
title: Starting and stopping services
layout: bundle
sector:
  - edge_server
---

{{< c8y-admon-important >}}
If the processes are monitored by **monit**, the processes restart after you run the *stop* command.
{{< /c8y-admon-important >}}

### Karaf processes {#karaf-processes}

In the Edge appliance, run the following commands as admin user.

|Process|Command|
|:---|:---
|Start|sudo service cumulocity-core-karaf start
|Stop|sudo service cumulocity-core-karaf stop


### opcua-mgmt-service {#opcuamgmtservice}

In the Edge appliance, run the following commands as admin user.

|Process|Command|
|:---|:---
|Start|sudo service opcua-mgmt-service start
|Stop|sudo service opcua-mgmt-service stop
|Restart|sudo service opcua-mgmt-service restart
|Status|sudo service opcua-mgmt-service status

### opcua-device-gateway {#opcuadevicegateway}

In the Edge appliance, run the following commands as admin user.

|Process|Command|
|:---|:---
|Start|sudo service opcua-device-gateway start
|Stop|sudo service opcua-device-gateway stop
|Restart|sudo service opcua-device-gateway restart
|Status|sudo service opcua-device-gateway status

### smartrule {#smartrule}

In the Edge appliance, run the following commands as admin user.

|Process|Command|
|:---|:---
|Start|sudo systemctl start smartrule
|Stop|sudo systemctl stop smartrule
|Restart|sudo systemctl restart smartrule

### Apama {#apama}

In the Edge appliance, run the following commands as admin user.

|Process|Command|
|:---|:---
|Start|sudo service apama start
|Stop|sudo service apama stop
|Restart|sudo service apama restart  
