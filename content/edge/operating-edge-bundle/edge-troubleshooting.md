---
weight: 50
title: Troubleshooting the system
layout: bundle
sector:
  - edge_server
---

In case of any issues, {{< company-sag >}} recommends you to follow these steps:

* Perform a health check, see [Health check](/edge/operating-edge/#health-check).
* Monitor the system processes, see [Monitoring](/edge/operating-edge/#monitoring).
* Check the log files, see [Logging](/edge/operating-edge/#logs-files).

These steps help you analyze the issue and provide a fix. If you need to contact {{< company-sag >}} support, include the output of the diagnostics dump. For more information about using the diagnostics, see [Diagnostic utility](#diagnostics).


### Troubleshooting Microservices {#troubleshooting-microservices}

In case of any microservices related issues, we recommend you to check if `_microservice_hosting_` is disabled using the command `sudo monit status microservice_hosting`

![Microservice Hosting Status](/images/edge/monit_status_microservice_hosting.png)
If it shows up as disabled, enable the microservice hosting feature through [the GUI](/edge/edge-configuration/#enabling-or-disabling-the-microservice-hosting-feature-using-the-ui) or [the REST API](https://{{< domain-c8y >}}/api/edge/{{< c8y-edge-current-version-alt >}}.0/#tag/Microservice-hosting-feature).
If enabling the microservice hosting feature fails, check the status of the Kubernetes system pods using the command below:
```shell
sudo kubectl get pods --namespace kube-system
```
If any pod in the list show its status as evicted, the most probable cause is that the system ran out of disk space. Expand the disk size through [the GUI](/edge/operating-edge/#expanding-the-disk-size) or [the REST API](https://{{< domain-c8y >}}/api/edge/{{< c8y-edge-current-version-alt >}}.0/#operation/expandDiskSize). Enable the microservice hosting feature after disk expansion.

When running any kubectl command (for example `sudo kubectl get pods --namespace kube-system`), if the message `-bash: kubectl: command not found` is seen then the microservice hosting feature has not been enabled or the process to enable the microservice hosting feature has failed. Attempt to enable the microservice hosting feature through [the GUI](/edge/edge-configuration/#enabling-or-disabling-the-microservice-hosting-feature-using-the-ui) or [the REST API](https://{{< domain-c8y >}}/api/edge/{{< c8y-edge-current-version-alt >}}.0/#tag/Microservice-hosting-feature).
