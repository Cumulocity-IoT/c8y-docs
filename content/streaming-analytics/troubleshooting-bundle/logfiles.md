---
weight: 20
title: Log files of the Apama-ctrl microservice
layout: redirect
---

There are three ways to get the logs of the Apama-ctrl microservice:

- You can view the log messages of your tenant on the **Logs** page of the Streaming Analytics application, as described in [Viewing logs in the Streaming Analytics application](#logs-view). This needs no access to the Administration application, and also works for multi-tenant microservices. It shows only Streaming Analytics messages for your own tenant, not the whole log file.
- You can download diagnostics information from the Streaming Analytics application as described in [Downloading diagnostics and logs](#diagnostics-download).
- In some cases, it is useful to view the log file of the Apama-ctrl microservice directly in {{< product-c8y-iot >}}.
  The log file is accessible via the Administration application. It contains the complete output of the microservice, including the output of EPL apps, which the **Logs** page does not show. You can find it on the **Logs** tab of the Apama-ctrl microservice. You must subscribe to the microservice so that you can see the logs. For more information on microservices and log files, see [Managing microservices](/standard-tenant/ecosystem/#managing-microservices) and [Monitoring microservices](/standard-tenant/ecosystem/#monitoring-microservices).

The correlator log is embedded in the log file of the Apama-ctrl microservice. See also [Descriptions of correlator status log fields]({{< link-apama-webhelp >}}/command-line-tools/correlator/#correlator-status-log-fields) in the Apama documentation.

Contact [product support](/additional-resources/contacting-support/) if needed.
