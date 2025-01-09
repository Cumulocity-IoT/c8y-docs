---
weight: 20
title: Log files of the Apama-ctrl microservice
layout: redirect
---

There are two ways to get the logs of the Apama-ctrl microservice:

- You can download diagnostics information from the Streaming Analytics application as described in [Downloading diagnostics and logs](#diagnostics-download).
- In some cases, it is useful to view the log file of the Apama-ctrl microservice directly in {{< product-c8y-iot >}}.
  The log file is accessible via the Administration application. You can find it on the **Logs** tab of the Apama-ctrl microservice. You must subscribe to the microservice so that you can see the logs. For more information on microservices and log files, see [Managing microservices](/standard-tenant/ecosystem/#managing-microservices) and [Monitoring microservices](/standard-tenant/ecosystem/#monitoring-microservices).

    {{< c8y-admon-info >}}
  In case of {{< product-c8y-iot >}} Edge Applicance VM, since Apama-ctrl is not deployed as a microservice in the VM-based distribution, the log file can be retrieved using the diagnostic utility. For more details, see [Apama log file locations](https://cumulocity.com/guides/edge/operating-edge/#apama-log-file-locations) and [Diagnostic utility](https://cumulocity.com/guides/edge/operating-edge/#diagnostics).
    {{< /c8y-admon-info >}}

The correlator log is embedded in the log file of the Apama-ctrl microservice. See also [Descriptions of correlator status log fields]({{< link-apama-webhelp >}}/deploying-and-managing-apama-applications/overview-of-deploying-apama-applications/#descriptions-of-correlator-status-log-fields) in the Apama documentation.

Contact [product support](/additional-resources/contacting-support/) if needed.
