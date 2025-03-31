---
weight: 20
title: Setting up Cumulocity DataHub Edge on Kubernetes
layout: redirect
---

In this setup the DataHub is deployed into a Kubernetes environment using the Edge operator. The {{< product-c8y-iot >}} DataHub backend is run as a microservice within the {{< product-c8y-iot >}} platform. The Dremio master and executor are deployed as a set of Kubernetes pods.

### Prerequisites

#### Resource requirements

The resource requirements for running a bare {{< product-c8y-iot >}} Edge instance are described in [Requirements](/edge-kubernetes/installing-edge-on-k8/#prerequisites).
When {{< product-c8y-iot >}} DataHub Edge on Kubernetes is deployed on top, the resource requirements change by the following additional amounts:

 * Recommended: 16 GB RAM, minimum: 10 GB RAM
 * Recommended: 10 logical CPU cores, minimum: 6 logical CPU cores
 * 100 GB of free disk space plus sufficient free disk space for the data lake contents. For more information about configuring the storage, see [Configuring storage](/edge-kubernetes/installing-edge-on-k8/#configuring-storage).

 Hardware requirements for the host OS are excluded.

### Setting up {{< product-c8y-iot >}} DataHub Edge on Kubernetes
To install and configure DataHub Edge on Kubernetes, update the `spec.dataHub` field in the Edge Custom Resource (CR) with the necessary configuration details for the Edge operator. After making the changes, apply the updated CR to deploy DataHub Edge.

For more details on the `spec.dataHub` field, refer to [Edge Custom Resource - DataHub](/edge-kubernetes/edge-custom-resource-definition/#dataHub).

For additional guidance, see the [Install Edge](/edge-kubernetes/installing-edge-on-k8/#install-edge) and [Modify Edge](/edge-kubernetes/manage-edge/#modify-edge) sections in the Edge on Kubernetes documentation.

In order to access Dremio, you must also make the domain ``datahub-<domain_name>`` resolvable, just as the configured domain name and ``management-<domain_name>`` were made resolvable in [Accessing Edge](/edge-kubernetes/installing-edge-on-k8/#accessing-edge).

#### Using {{< product-c8y-iot >}} DataHub Edge on Kubernetes

{{< product-c8y-iot >}} DataHub Edge on Kubernetes behaves like the Cloud and Edge appliance version.

### Validation of {{< product-c8y-iot >}} DataHub installation

If the product doesn't work as intended after the installation, go through the validation steps described below.

{{< c8y-admon-info >}}
Substitute the namespace name *c8yedge* in the subsequent commands with the specific namespace name into which you installed Edge.
{{< /c8y-admon-info >}}

#### MySQL

You can monitor the startup of the MySQL pod ``datahub-mysql-0`` using
```shell
kubectl get pods -n c8yedge datahub-mysql-0 --watch
```
The result will be similar to:
```
NAME              READY   STATUS    RESTARTS   AGE
datahub-mysql-0   1/1     Running   0          4m55s
```

When running the command:
```shell
kubectl get svc -n c8yedge
```
The output will be similar to:
```
NAME          TYPE          CLUSTER-IP          EXTERNAL-IP          PORT(S)          AGE
mysql-client  ClusterIP     XXX.XXX.XXX.XXX     <none>               3306/TCP         10m
```

#### Dremio

You can monitor the state of the Dremio pods "zk-0", "dremio-executor-0", and "dremio-master-0" using
```shell
kubectl get pods -n c8yedge --watch
```

The status "Running" indicates that the pods have started successfully:

```
NAME              READY          STATUS          RESTARTS         AGE
...
zk-0              1/1            Running         0                6m34s
dremio-executor-0 1/1            Running         0                6m34s
dremio-master-0   1/1            Running         0                6m34s
```

When running the command:
```shell
kubectl get svc -n c8yedge
```

The output will be similar to:

```
NAME              TYPE              CLUSTER-IP              EXTERNAL-IP               PORT(S)                                         AGE
dremio-client     LoadBalancer      XXX.XXX.XXX.XXX         XXX.XXX.XXX.XXX           31010:XXXXX/TCP,9047:XXXXX/TCP,32010:XXXXX/TCP  9m33s
```

#### {{< product-c8y-iot >}} DataHub microservice

When logged into the {{< product-c8y-iot >}} UI, the {{< product-c8y-iot >}} DataHub microservice is available under **Administration > Ecosystem > Microservices**.

You can monitor the startup of the microservice pod "datahub-scope-edge-deployment-...." using
```shell
kubectl get pods -n c8yedge --watch
```

The status "Running" indicates that the pod has started successfully:
```
NAMESPACE     NAME                                            READY   STATUS      RESTARTS    AGE
...
c8yedge       datahub-scope-edge-deployment-XXXXXXXXXX-YYYYY  1/1     Running     0           16m
```

#### DataHub web application

When logged into the {{< product-c8y-iot >}} UI, the {{< product-c8y-iot >}} DataHub web application is available under **Administration > Ecosystem > Applications**.
It should also be present in the usual {{< product-c8y-iot >}} application switcher.
