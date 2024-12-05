---
weight: 20
title: SNMP agent
layout: redirect
---

### Introduction {#introduction}

The SNMP agent is a stand-alone Java program that communicates with SNMP-enabled device(s) and the {{< product-c8y-iot >}} platform. It receives SNMP data from the devices, converts the data to {{< product-c8y-iot >}}-based objects based on the device protocol mapping, persists the data locally, and forwards the data to {{< product-c8y-iot >}}. The agent must be registered in {{< product-c8y-iot >}} before serving the device request.

{{< c8y-admon-info >}}
If you are using one of the {{< company-c8y >}} public cloud instances, you must ensure that your tenant is subscribed to the Mibparser microservice.

To add the Mibparser microservice to the {{< product-c8y-iot >}} platform,

* download the file *snmp-mib-parser-&lt;ga-version&gt;.zip* (for example *snmp-mib-parser-1005.7.0.zip*) from [http://resources.cumulocity.com/examples/snmp/](http://resources.cumulocity.com/examples/snmp/).
* Upload this ZIP file as a microservice into the platform. Refer to [Managing microservices](/standard-tenant/ecosystem/#managing-microservices) for details on how to upload microservices into {{< product-c8y-iot >}}.
{{< /c8y-admon-info >}}

### Installation {#installation}

#### Prerequisites {#prerequisites}

|               |              |
| ------------- |:-------------|
| Java version  | Java Runtime Environment 8 or newer version.|
| Heap memory   | The agent Java application can run on as little as 200MB of heap space. <br>However, based on the number of devices and the load, this must be adjusted.   |
| Disk space    | The {{< product-c8y-iot >}} representation of the SNMP message will be persisted before forwarding to the platform. <br>Based on the load, sufficient disk space should be available to store the objects.     |
| Hardware and OS    | Linux environment, can run on laptops or industrial PCs.     |

#### To install the agent {#to-install-the-agent}

1. Download the latest SNMP agent RPM:

		wget -nv http://resources.cumulocity.com/examples/snmp/snmp-agent-gateway-<ga-version>-1.noarch.rpm

	The `<ga-version>` must be provided in the format `1005.7.0`, `1006.0.0`, and so on. A sample command would look like this:

 		wget -nv http://resources.cumulocity.com/examples/snmp/snmp-agent-gateway-1006.0.0-1.noarch.rpm

2. Verify the signature of the RPM package:

		rpm --checksig snmp-agent-gateway-<ga-version>.rpm

3. Install the SNMP agent RPM package:

		sudo rpm -ivh snmp-agent-gateway-<ga-version>.rpm

4. Check the installed RPM package:

		rpm -q snmp-agent-gateway

5. Configure the agent:
   * Create a .snmp folder in the user home directory:

   			mkdir -p $HOME/.snmp

   * Copy the snmp properties file into the .snmp folder:

   				cp /etc/snmp-agent-gateway/snmp-agent-gateway.properties $HOME/.snmp

   * Change the properties according to the {{< product-c8y-iot >}} environment (for example gateway.identifier, {{< product-c8y-iot >}} bootstrap details, SNMP Community target).

6. Start the service:

		systemctl start snmp-agent-gateway

7. Check if the service started properly by checking the status:

		systemctl status snmp-agent-gateway

8. Make sure that the agent process is running without any issues. To do so, check the agent log file:

		$HOME/.snmp/log/snmp-agent-gateway-server.log

{{< c8y-admon-info >}}
The agent uses the following location as persistent storage:
{{< /c8y-admon-info >}}

		$HOME/.snmp/{gateway.identifier}/chronicle


### Upgrading a GA version {#upgrading-a-ga-version}

{{< c8y-admon-info >}}
This upgrade procedure is only for GA releases. If you have installed any previous release prior to GA release, follow the migration procedure described below.
{{< /c8y-admon-info >}}

1. Make sure that the load to the SNMP agent is zero. This can be done by gracefully disconnecting all SNMP devices from the SNMP agent or redirect the traffic to a different endpoint.
2. If there are pending messages in the SNMP agent to be sent to the platform, wait for the processing to complete.
3. Once the message processing is complete, stop the agent process:

		systemctl stop snmp-agent-gateway

4. Upgrade the SNMP agent RPM package:

		rpm -Uvh snmp-agent-gateway-<new-ga-version>.rpm

5. Start the service:

		systemctl start snmp-agent-gateway

6. Check if the service started properly by checking the status:

		systemctl status snmp-agent-gateway

7. Make sure that the agent process is running without any issues. To do so, check the agent log file:

		$HOME/.snmp/log/snmp-agent-gateway-server.log


### Migration {#migration}

Between version 10.4.x and 10.5.x, the SNMP agent has undergone a major revamp regarding persistence storage mechanism, robustness, performance improvements and more. If the current running version of SNMP is 10.4.x or earlier then follow the steps below to migrate to a GA version.

{{< c8y-admon-info >}}
The migration is equivalent to a fresh installation, as the GA release uses a different persistent store compared to earlier releases. This requires a down time for installation and configuration.
{{< /c8y-admon-info >}}

1. Make sure that load to the SNMP agent is zero. This can be done by gracefully disconnecting all SNMP devices from the SNMP agent or redirect the traffic to a different endpoint.
2. If there are pending messages in the SNMP agent to be sent to the platform, wait for the processing to complete.
3. Once the message processing is complete, stop the agent process.
4. Take a backup of the *$HOME/.snmp* folder, the configuration file in */etc/snmp* (if present) and the agent JAR file (if a JAR file is used for starting the agent).
5. If the SNMP agent was installed as RPM package, uninstall it:

		rpm -e <snmp-package-name>

6. Delete the contents inside *$HOME/.snmp/* and */etc/snmp* folder (if present).
7. Delete the snmp-agent device in {{< product-c8y-iot >}} which was registered as part of the installation and all its child SNMP devices. This can be done from the user interface or by using REST endpoints.
8. Follow the installation procedure described above, to install/move to GA version.

{{< c8y-admon-info >}}
SNMP device protocol/s can be retained (unless there are no changes in the SNMP device configuration).
{{< /c8y-admon-info >}}
