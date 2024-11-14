---
weight: 30
title: Diagnostic utility
layout: bundle
sector:
  - edge_server
---

The diagnostic utility is a script to collect, for example, the journal logs and performance metrics of various components running on the Edge appliance, which are essential for you and the {{< company-sag >}} support team to troubleshoot the problems. The diagnostic utility is enabled by default and is scheduled to run periodically. However, you can also trigger it manually using the command line (below) or the [user interface](/edge/operating-edge/#diagnostic-report-through-ui).

	cd /opt/c8y/utilities/diagnostic-utility
	sudo ./run_data_collector.py

### Hardware information {#hardware-information}

The basic hardware information of the target system is captured.  These reports are placed under the 'hardware' directory.

The following hardware information is available:

|<div style="width:250px">Information</div>|Description|
|:----------------|:---|
|CPU|Reads and gathers CPU information from "/proc/cpuinfo"
|Memory|Reads and gathers memory information from "/proc/meminfo"
|Detailed system summary|Data is captured using the 'lswh' command. Data includes multiple components like network, display adapter, bridge, IDE, and so on. This command is executed as sudo to capture all available details.
|Short system summary|Data is captured using the 'lswh' command, here the data is in precise format. This command is executed as sudo to capture all available details.
|PCI|Data related to installed PCI devices is captured using the 'lspci' command
|Storage|Data is an aggregation of the output of the commands 'df' and 'lsblk'


### Software information {#software-information}

The basic software information of the target system is captured. These reports are placed under the 'software' directory.

The following software information is available:

|<div style="width:250px">Information</div>|Description|
|:----------------|:---|
|IP|Reads basic IP information from the target system using the 'ip' command
|OS|Collects various OS information like name, version, release, and so on, using the commands 'lsb_release' and 'uname'
|Installed package|A list of installed packages is prepared using the 'rpm' command
|Running processes|A list of running processes is prepared using the 'ps' command
|Top result|Captures the output of top command. This report is very informative as it holds information of running processes at argument level and their respective resource consumption.

### {{< product-c8y-iot >}} information {#cumulocity-iot-information}

This section contains information on the running {{< product-c8y-iot >}} processes, health endpoint check result, {{< product-c8y-iot >}} logs, and so on.

The following {{< product-c8y-iot >}} information is collected:

|<div style="width:250px">Information</div>|Description|
|:---------------------|:---|
|Health endpoint result|{{< product-c8y-iot >}} and its microservices provide health endpoints, from which the user can get the system status.
|Mongo command execution result|MongoDB supports commands execution, which can give the status of the MongoDB server. Currently 'ping', 'dbstats' and 'serverStatus' commands are executed on each of the MongoDB nodes (currently it is management and edge). The MongoDB commands give vital information about the MongoDB server like the db version, process-id, uptime information, and so on.
|Mongo top output|The output of mongo top command is captured here
|Thread dumps|Thread dumps of all the running java processes and mongo processes are captured. For java processes the 'jstack' command is executed to get the thread dumps. For non-java processes like MongoDB, the 'pstack' command is used. Furthermore the 'pstack' command is applied on java processes as well.
|Log files|Archive of the log files from {{< product-c8y-iot >}}, its microservices and Apama is created.
|Configuration files|Archive of {{< product-c8y-iot >}} configuration files from {{< product-c8y-iot >}} and its microservices is created.
|Jstat dumps|Jstat command provides performance statistics for a given JVM.

Jstat dumps can provide information on the following options:

* class - Statistics on the behavior of the class loader
* compiler - Statistics of the behavior of the HotSpot Just-in-Time compiler
* gc -  Statistics of the behavior of the garbage collected heap
* gccapacity -  Statistics of the capacities of the generations and their corresponding spaces
* gccause - Summary of garbage collection statistics (same as -gcutil), with the cause of the last and current (if applicable) garbage collection events
* gcnew – statistics of the behavior of the new generations
* gcnewcapacity  - Statistics of the sizes of the new generations and its corresponding spaces
* gcold - Statistics of the behavior of the old and permanent generations
* gcoldcapacity - Statistics of the sizes of the old generations
* gcpermcapacity - Statistics of the sizes of the permanent generations
* gcutil – Summary of garbage collection statistics
* printcompilations –  HotSpot compilation method statistics

As per the current implementation, the 5 statistics counts are collected at an interval of 50ms. To improve performance, this task is executed via threads.


### Optional startup parameters {#optional-startup-parameters}

Following are the supported startup parameters for the monitor and the data collector.

#### Data collector {#data-collector}

The data collector can be started by running the "run_data_collector.py" script located under "/opt/c8y/utilities/diagnostic-utility/".

Following are the supported command line arguments which can be used while invoking the script. More than one of the supported arguments can be used simultaneously.

* -hw or --hardware: Allows the script to collect only the hardware information
* -sw or --software: Allows the script to collect only the software information
* -c8y or --cumulocity: Allows the script to collect only the {{< product-c8y-iot >}} information
* -h: Displays the help message

### Microservices log file locations {#microservices-log-file-locations}

The logs of the Kubernetes components are captured at:
*/tmp/diagnostic-utility/diagnostic_report_XXXXX/cumulocity/log_archive/kubernetes_logs.zip.*

The kubernetes_logs.zip file contains the logs of all Kubernetes platform components at "kube-system" path in the archive. The components captured are:

* heapster-*XX*
* kube-apiserver-server
* kube-controller-manager-server
* kube-dns-*XX*
* kube-flannel-ds-*XX*
* kube-proxy-*XX*
* kube-scheduler-server

{{< c8y-admon-info >}}
The *XX* represents randomly generated alphanumeric sequences in these pod names and would vary in your environment.
{{< /c8y-admon-info >}}

The hosted microservices are captured at *cumulocity-single-node* path in the archive. The pre-installed component **kube-registry-persistent-secure-xx-xx** is already available in the archive. The logs of any additional microservices that are uploaded will also be available at this path.

### Utility configuration file {#utility-configuration-file}

The diagnostic utility can be customized using a properties file located under "/etc/diagnostic-utility/diagnostic_utility.properties".

{{< c8y-admon-important >}}
The SMTP properties in the table below are only for collecting diagnostics information. For configuring the email server, see [Email server](/enterprise-tenant/customization/#email-server).
{{< /c8y-admon-important >}}

Following are the available keys used in the configuration file:

|<div style="width:300px">Information</div>|Description|
|:----------------|:---|
|email.notification|Allows users to select whether they want to receive the diagnostic report via email
|recipient.email|Recipient email ID that receives the support email
|smtp.server.host|SMTP host for sending support email
|smtp.server.port|SMTP port to be used by the utility while sending support email
|smtp.username|SMTP username to be used by the utility while sending support email
|smtp.password|SMTP password to be used by the utility while sending support email
|components.for.log.backup|Components for which the log backup must be performed
|components.for.configuration.backup|Components for which the configuration backup must be performed
|report.directory|Report directory where the diagnostic reports must be placed
|{component-name}.log.path|Absolute log path of the components under "component.for.log.backup" which do not use /var/log as the logging directory
|containers.to.monitor|Containers for which log backup is required. The container names are separated by a comma. These log files are retrieved using `docker logs`.
|services.to.monitor|Services for which log backup is required. The service names are separated by a comma. These log files are retrieved using `journalctl`.
