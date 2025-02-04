---
weight: 10
title: Monitoring
layout: redirect
---
Edge on Kubernetes allows for monitoring of the Edge deployment using Prometheus, an open-source project that is used for monitoring application state. See https://prometheus.io/ for detailed information on Prometheus and how to use it.

The Edge operator exposes a Prometheus-compatible metrics endpoint, `https://\<domain>:3443/metrics`, where the domain is the one you specified in the Edge CR (or myown.iot.com if you followed the Quickstart installation steps).
You can monitor the recommended list of metrics below, with more available at the above endpoint.

### {{< product-c8y-iot >}} Core Metrics {#core-metrics}
Metrics related to {{< product-c8y-iot >}} Core, prefixed by **c8yedge_core**

|<div style="width:400px">Metric</div>|<div style="width:300px">Description</div>|Interpretation
|:---|:---|:---
|c8yedge_core_sag_c8y_process_cpu_usage|CPU usage percentage of {{< product-c8y-iot >}} Core process.|Key for monitoring the CPU demand of the {{< product-c8y-iot >}} Core process, helping in identifying high CPU consumption issues.
|c8yedge_core_sag_c8y_system_cpu_count|The total count of CPU cores available to the {{< product-c8y-iot >}} Core system.|Useful for understanding the computing capacity of the system and for scaling considerations.
|c8yedge_core_sag_c8y_system_load_average_1m|The 1-minute average system load.|Indicates the immediate demand placed on the system's resources, helping to identify spikes in usage.
|c8yedge_core_sag_c8y_process_files_open_files|The number of files currently open by {{< product-c8y-iot >}} Core process.|Important for monitoring resource utilization and preventing potential exhaustion of file descriptors.

### Apama Metrics {#apama-metrics}
Metrics related to the Apama Microservice, prefixed by **c8yedge_apama_ctrl**

For more details, see [Monitoring with Prometheus]({{< link-apama-webhelp >}}/deploying-and-managing-apama-applications/monitoring-with-prometheus/) in the Apama documentation.

|<div style="width:450px">Metric</div>|<div style="width:250px">Description</div>|Interpretation
|:---|:---|:---
|c8yedge_apama_ctrl_process_cpu_usage|CPU usage by Apama process.|Essential for understanding how Apama impacts overall system CPU resources.
|c8yedge_apama_ctrl_system_cpu_usage|The total CPU usage percentage by the system, including Apama and other process.|Helps gauge the overall CPU load and identify potential bottlenecks.
|c8yedge_apama_ctrl_system_load_average_1m|The system's 1-minute load average, including Apama's impact.|Gives an immediate view of system demand, useful for identifying sudden increases in load.
|c8yedge_apama_ctrl_sag_apama_in_c8y_uptime_secs|This metric measures the uptime of Apama and its correlator in seconds within the Edge deployment.|These are crucial for tracking the stability and reliability of the Apama service.
|c8yedge_apama_ctrl_process_uptime_seconds|Measures how long the Apama process has been running in seconds.|Similar to the uptime metrics above, this provides insights into Apama's process stability.
|c8yedge_apama_ctrl_sag_apama_correlator_uptime_seconds|metrics measure the uptime of Apama and its correlator in seconds within the Edge deployment.|These are crucial for tracking the stability and reliability of the Apama service.
|c8yedge_apama_ctrl_process_files_open_files|The number of files currently open by Apama process.|Critical for ensuring Apama does not run into file descriptor limits, affecting its ability to operate.
|c8yedge_apama_ctrl_jvm_threads_peak_threads|The peak thread count used by Apama's JVM (Java Virtual Machine).|Indicates the maximum concurrency level required by Apama, useful for JVM tuning and performance optimization.
|c8yedge_apama_ctrl_process_start_time_seconds|The start time of the Apama process, measured in seconds since the Unix epoch.|Can be used to determine the Apama process's age, correlating with other events or metrics.
|c8yedge_apama_ctrl_sag_apama_in_c8y_is_starter_mode|Indicates whether Apama is running in starter mode within Edge.|Starter mode may have different resource usage or limitations compared to full operation mode.
|c8yedge_apama_ctrl_sag_apama_in_c8y_is_safe_mode|Flags if Apama is operating in a safe mode within Edge.|Safe mode might restrict certain operations or functions to ensure stability or security.

### MongoDB Metrics {#mongodb-metrics}
Metrics related to MongoDB, prefixed by **c8yedge_db**
|<div style="width:350px">Metric</div>|<div style="width:300px">Description</div>|Interpretation
|:---|:---|:---
|c8yedge_db_mongodb_up|Indicates whether the MongoDB database instance is up and running.|A binary metric where 1 means the database is operational, and 0 indicates it is down. This metric is crucial for alerting on database availability.
|c8yedge_db_process_cpu_seconds_total|Cumulative CPU time used by the database process, measured in seconds.|This helps in understanding the total CPU time the MongoDB process has consumed since it started, allowing for analysis of CPU usage trends over time.
|c8yedge_db_process_resident_memory_bytes|The amount of RAM currently being used by the database process, in bytes.|This metric is vital for understanding the database's memory footprint, helping to ensure that the database does not exceed available memory resources and to plan for scaling or optimization if necessary.
|c8yedge_db_process_virtual_memory_bytes|The total virtual memory used by the database process, in bytes.|Virtual memory includes all memory that the process can access, including what is in RAM and on disk (swap). Monitoring this helps in understanding the database's overall memory demand, which is crucial for performance and stability.
|c8yedge_db_process_virtual_memory_max_bytes|The maximum amount of virtual memory the database process can use.|This metric often reflects a system or process-level limit on memory usage. While not all systems enforce a maximum virtual memory size, when present, this metric can help identify configurations that may limit database performance or scalability.
|c8yedge_db_process_open_fds|The current number of open file descriptors by the database process.|Monitoring this metric alongside c8yedge_db_process_max_fds can warn of potential resource exhaustion if the number of open file descriptors approaches the maximum limit.
|c8yedge_db_process_max_fds|The maximum number of file descriptors the database process can open.|File descriptors are used by process to access files and network sockets. This metric indicates the upper limit set for these resources, helping to anticipate and prevent resource exhaustion issues.
|c8yedge_db_process_start_time_seconds|The start time of the database process, measured in seconds since the Unix epoch.|This metric can be used to determine how long the database has been running since its last restart. It's useful for tracking uptime and correlating with other events or metrics.

### StatefulSets Metrics {#statefulset-metrics}
This metric tracks the health status of StatefulSets in the Edge deployment. StatefulSets are Kubernetes workloads that manage stateful applications, ensuring that the deployment and scaling of the application are handled properly, and that the application maintains its state across restarts and migrations.
<br>The _c8yedge_statefulset_ metric can be qualified by the StatefulSet name, such as `statefulset="c8ycore-sts"`, `statefulset="edge-db-rs0"`, and so on, for monitoring different StatefulSets in the Edge deployment. A gauge value of 1 for a StatefulSet indicates that it is healthy, meaning all desired replicas are up and serving without issues. A value of 0 indicates a failure, such as one or more replicas not running as expected.

|Metrics|Label Options
|:---|:---
|c8yedge_statefulset{statefulset="c8ycore-sts"}|- `statefulset="c8ycore-sts"`<br> - `statefulset="edge-db-rs0"`<br> - `statefulset="logging-fluentd"`<br> - `statefulset="event-tailer-event-tailer"`<br>

### Deployments Metrics {#deployment-metrics}
These metrics represent the health status of Deployments in Edge. Deployments are another type of Kubernetes workload that manage stateless applications, ensuring that a specified number of replicas of the application are running at any given time.
<br>The _c8yedge_deployment_ metric can be qualified by the Deployment name, such as `deployment="c8yedge-operator-controller-manager"`, `deployment="apama-ctrl-scope-edge-deployment"`, and so on, for monitoring different Deployments in Edge. A gauge value of 1 for a Deployment indicates that it is healthy, meaning all desired replicas are up and serving without issues. A value of 0 indicates a failure, such as one or more replicas not running as expected.

|Metrics|Label Options
|:---|:---
|c8yedge_deployment{deployment="microservices-registry"}|- `deployment="c8yedge-operator-controller-manager"`<br> - `deployment="logging-operator-c8yedge-edge-sample"`<br> - `deployment="psmdb-operator-c8yedge-edge-sample"`<br> - `deployment="microservices-registry"`<br> - `deployment="thin-edge"`<br> - `deployment="smartrule-scope-management-deployment"`<br> - `deployment="apama-ctrl-scope-edge-deployment"`<br> - `deployment="opcua-mgmt-service-scope-management-deployment"`<br>

### Pod Metrics (CPU and Memory Usage) {#cpu-metrics}
These metrics track the CPU and memory usage of the workloads in your Edge deployment. CPU usage is a critical performance metric, indicating how much of the allocated CPU resources are being utilized by a container. Monitoring memory usage helps in managing application scalability, optimizing resource allocation, and preventing out-of-memory (OOM) issues that could lead to application downtime.
<br>The _c8yedge_pod_cpu_usage_ and _c8yedge_pod_memory_usage_ metrics can be qualified by the Pod and Container names, such as `container="cumulocity-core", pod="c8ycore-sts-0"` and so on for monitoring the CPU and memory usage of different containers in the Edge deployment.

<br>Pod names often contain a unique hash or a set of alphanumeric characters that change every time the pod is restarted, redeployed, or rescheduled on a different node. To continuously monitor the CPU usage of a container across pod restarts, you can use regular expressions (regex) in your monitoring queries to match only the static part of the pod name. For example, if you want to monitor the `apama-ctrl-scope-edge-pod` container regardless of pod restarts, you must construct a query that matches any pod name starting with `apama-ctrl-scope-edge-deployment` without specifying the unique hash, like `container="apama-ctrl-scope-edge-pod",pod=~"apama-ctrl-scope-edge-deployment.*"`.

|Metrics|Label Options
|:---|:---|:---
|c8yedge_pod_cpu_usage{container="cumulocity-core", pod="c8ycore-sts-0"}|- `container="cumulocity-core", pod="c8ycore-sts-0"`<br> - `container="openresty", pod="c8ycore-sts-0"`<br> - `container="smartrule-scope-management-pod", pod=~"smartrule-scope-management-deployment-*"`<br> - `container="apama-ctrl-scope-edge-pod", pod=~"apama-ctrl-scope-edge-deployment-*"`<br> - `container="opcua-mgmt-service-scope-management-pod", pod=~"opcua-mgmt-service-scope-management-deployment-*"`<br> - `container="mongod", pod="edge-db-rs0-0"`<br> - `container="mongodb-exporter", pod="edge-db-rs0-0"`<br> - `container="psmdb-operator", pod=~"psmdb-operator-c8yedge-edge-sample-*"`<br> - `container="kedge-agent", pod=~"thin-edge-*"`<br> - `container="mosquitto", pod=~"thin-edge-*"`<br> - `container="microservices-registry", pod=~"microservices-registry-*"`<br> - `container="microservices-registry", pod=~"microservices-registry-garbage-collector-*"`<br> - `container="microservices-registry-config", pod=~"microservices-registry-config-*"`<br> - `container="fluentd", pod="logging-fluentd-0"`<br> - `container="config-reloader", pod="logging-fluentd-0"`<br> - `container="fluent-bit", pod=~"logging-fluentbit-*"`<br> - `container="event-tailer", pod="event-tailer-event-tailer-0"`<br> - `container="logging-operator", pod="logging-operator-c8yedge-edge-sample-*"`<br> - `container="manager", pod=~"c8yedge-operator-controller-manager-*"`<br>
|c8yedge_pod_memory_usage{container="cumulocity-core", pod="c8ycore-sts-0"}|- `container="cumulocity-core", pod="c8ycore-sts-0"`<br> - `container="openresty", pod="c8ycore-sts-0"`<br> - `container="smartrule-scope-management-pod", pod=~"smartrule-scope-management-deployment-*"`<br> - `container="apama-ctrl-scope-edge-pod", pod=~"apama-ctrl-scope-edge-deployment-*"`<br> - `container="opcua-mgmt-service-scope-management-pod", pod=~"opcua-mgmt-service-scope-management-deployment-*"`<br> - `container="mongod", pod="edge-db-rs0-0"`<br> - `container="mongodb-exporter", pod="edge-db-rs0-0"`<br> - `container="psmdb-operator", pod=~"psmdb-operator-c8yedge-edge-sample-*"`<br> - `container="kedge-agent", pod=~"thin-edge-*"`<br> - `container="mosquitto", pod=~"thin-edge-*"`<br> - `container="microservices-registry", pod=~"microservices-registry-*"`<br> - `container="microservices-registry", pod=~"microservices-registry-garbage-collector-*"`<br> - `container="microservices-registry-config", pod=~"microservices-registry-config-*"`<br> - `container="fluentd", pod="logging-fluentd-0"`<br> - `container="config-reloader", pod="logging-fluentd-0"`<br> - `container="fluent-bit", pod=~"logging-fluentbit-*"`<br> - `container="event-tailer", pod="event-tailer-event-tailer-0"`<br> - `container="logging-operator", pod="logging-operator-c8yedge-edge-sample-*"`<br> - `container="manager", pod=~"c8yedge-operator-controller-manager-*"`<br>
