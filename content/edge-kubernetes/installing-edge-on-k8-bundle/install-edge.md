---
weight: 20
title: Installing Edge
layout: redirect
---

Before you start the installation, ensure that you have fulfilled the [prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites) and configured the storage as described in [Configuring storage](/edge-kubernetes/installing-edge-on-k8/#configuring-storage).

Download and edit the Edge CR ([c8yedge.yaml](/files/edge-k8s/c8yedge.yaml)), before applying it to your Kubernetes cluster by running the command below:

```bash
kubectl apply -f c8yedge.yaml
```
For more information about the structure and configuration options available in the Edge CR, see [Edge Custom Resource](/edge-kubernetes/edge-custom-resource-definition/).

### Verifying the Edge installation {#verifying-the-edge-installation}

To monitor the installation progress, run the command below:

```shell
kubectl describe edge c8yedge -n c8yedge
```
This command allows you to view the details about the installation of *c8yedge* in the *c8yedge* namespace.

{{< c8y-admon-info >}}
Substitute the Edge name and namespace name, which is currently *c8yedge* in the command, with the specific Edge name and namespace name you have specified in your Edge CR.
{{< /c8y-admon-info >}}

You can also follow the events raised for the Edge CR by running the command below:

```shell
kubectl get events -n c8yedge --field-selector involvedObject.name=c8yedge --watch
```

The **Events** section in the output of the `describe edge` command specifies the installation progress and the **Status** section displays the generation of the Edge CR which is being installed and its current state. Once the installation succeeds, the **Status** section also displays the generation of the CR which is deployed, Edge version, last deployed time/age, validation warnings, if any and some help commands for downloading the diagnostic logs, extracting the Root CA of the Edge operator generated TLS/SSL certificates.

A sample status output:
```yaml
Name:         c8yedge
Namespace:    c8yedge
Kind:         CumulocityIoTEdge

Metadata:
  Creation Timestamp:  2023-08-11T00:00:01Z
  Generation:          1

Spec:
  Version:             {{< c8y-edge-current-version >}}.0.1
  License Key:         ***************
  Company:             IoT Company
  Domain:              myown.iot.com
  Email:               myown@iot.com
  ....
  ....

Status:
  Deployed Generation:  1
  Last Deployed Time:  2023-08-11T00:15:00Z
  State:               Ready
  Version:             {{< c8y-edge-current-version >}}.0.1-XXXX

  Help Commands:
    Download Logs:   
FILE_NAME="edge-diagnostic-archive-$(date +%Y%m%d%H%M%S).tar.gz" && \
kubectl exec -n edge-sample-logging logging-fluentd-0 -c fluentd -- tar -czvf /var/log/$FILE_NAME /var/log/edge && \
kubectl cp edge-sample-logging/logging-fluentd-0:/var/log/$FILE_NAME -c fluentd ./$FILE_NAME && \
kubectl exec -n edge-sample-logging logging-fluentd-0 -c fluentd -- rm /var/log/$FILE_NAME
```
A sample set of installation events:
```text
Events:
  Type     Reason            Age    From               Message
  ----     ------            ----   ----               -------
  Normal   Validating        15m    cumulocityiotedge  validating
  Normal   ValidationPassed  15m    cumulocityiotedge  validation passed
  Normal   Installing        15m    cumulocityiotedge  installing
…………
…………
  Normal   Installing        12m    cumulocityiotedge  finished installing mongo server
…………
…………
  Normal   Installing        8m     cumulocityiotedge  finished installing core
…………
…………
  Normal   Installing        5m     cumulocityiotedge  finished installing and updating microservices
…………
…………
  Normal   Installing        2m     cumulocityiotedge  finished installing thin-edge
…………
  Normal   Ready             1m     cumulocityiotedge  Cumulocity IoT Edge installation is complete, and it's now running version {{< c8y-edge-current-version >}}.0.1-XXXX
```
Before you continue, wait for the Edge CR status to reach the **Ready** state.
