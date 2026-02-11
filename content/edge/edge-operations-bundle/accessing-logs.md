---
weight: 10
title: Accessing logs
layout: redirect
---

The Edge operator deploys and configures a Fluent Bit daemonset on the Kubernetes node to collect the container and application logs from the node file system. Fluent Bit queries the Kubernetes API, enriches the logs with metadata about the pods (in the Edge namespace), and transfers both the logs and metadata to Fluentd. Fluentd receives, filters, and persists the logs in the persistent volume claim configured for logging.

To download the diagnostic log archive, run the command below. It generates a file named *c8yedge-logs-{current date}.tar.gz* in the current directory.

```shell
kubectl get edge c8yedge -n c8yedge --output jsonpath='{.status.helpCommands.downloadLogs}' | sh
```

{{< c8y-admon-info >}}
Substitute the Edge name and namespace name *c8yedge* in the command above with the specific Edge name and namespace name you have specified in your Edge CR.
{{< /c8y-admon-info >}}

Download the log archives remotely from your cloud tenant. For more information, see [Downloading diagnostics remotely](/edge/connecting-edge-to-cloud/#downloading-diagnostics-remotely).
