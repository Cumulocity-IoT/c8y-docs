---
weight: 20
title: Setting up Cumulocity DataHub Edge on Kubernetes
layout: redirect
---

In this setup the DataHub is deployed into a Kubernetes environment using the Edge operator. The {{< product-c8y-iot >}} DataHub backend is run as a microservice within the {{< product-c8y-iot >}} platform. The Dremio master and executor are deployed as a set of the Kubernetes pods.

### Prerequisites

#### Resource requirements

The resource requirements for running a bare {{< product-c8y-iot >}} Edge instance are described in [Requirements](/edge-k8s/installing-edge-on-k8/#prerequisites).
When {{< product-c8y-iot >}} DataHub Edge on Kubernetes is deployed on top, the resource requirements change by following additional amount:

 * 100 GB of free disk space plus sufficient free disk space for the data lake contents
 * Recommended: 16 GB RAM, minimum: 10 GB RAM
 * Recommended: 10 logical CPU cores, minimum: 6 logical CPU cores

 Hardware requirements for the host OS are excluded.

### Setting up {{< product-c8y-iot >}} DataHub Edge on Kubernetes

Subsequently, it is assumed that {{< product-c8y-iot >}} Edge on Kubernetes has been installed using the default Kubernetes namespace ``c8yedge``. If another namespace has been chosen, you must adapt the commands and configuration files accordingly.

Extract the archive *datahub-edgek8s.tar* to a working folder of your choice.
```
tar -xvf datahub-edgek8s.tar
```  
The folder will contain the following files:

| File | Purpose | Adaptation required |
| -----   | -----   |-----   |
| install.sh | Installation script, which requires bash and jq command line tools for execution | | -
| datahub-config.json | Primary configuration file for DataHub installation | yes |
| dremio-values.yaml | Deployment configuration for Dremio | yes |
| dremio-helmchart.tar.gz | Helm chart used for Dremio deployment | - |
| mysql-values.yaml | Deployment configuration for MySQL database, which is used to store configuration data | yes |
| datahub-mysql-helmchart.tar.gz | Helm chart used for MySQL deployment  | - |
| datahub.zip | {{< product-c8y-iot >}} DataHub backend packaged as microservice | - |
| datahub-webapp.zip | {{< product-c8y-iot >}} DataHub web application | - |

{{< c8y-admon-info >}}
Internet connectivity is required as the MySQL image, the Dremio image and some auxiliary images (busybox) are downloaded during the installation.
{{< /c8y-admon-info >}}

#### Adapting datahub-config.json

You must apply the following changes:
* If your {{< product-c8y-iot >}} Edge on Kubernetes configuration does not use ``c8yedge`` as namespace, change the Kubernetes namespace accordingly.
* Specify the username and password for admin access to Dremio. The password must have at least 8 characters, including at least 1 letter and 1 digit.
* Set the password for the root user in MySQL.

#### Configuring Dremio deployment via dremio-values.yaml

The *dremio-values.yaml* file contains the configuration settings for the Dremio deployment. It needs to be adapted as follows:

The Dremio master uses a persistent volume to persist its metadata. The persistent volume claim is defined in the Dremio helm chart. You have to provide the name of the ``<CRITICAL_STORAGE_CLASS>`` used by that claim.

In addition, either a distributed storage and a datalake storage must be available as volumes mounted into the Dremio master and executor pods. They are mapped to a folder on the single worker node where these pods are running on.
The respective configuration in *dremio-values.yaml* looks as follows:
```
distStorage:
    type: nfs
    nfs:
        hostPath: /datahub/distributedStorage

datalakeNFS:
    enabled: true
    hostPath: /datahub/datalake
```
The host directories (here: /datahub/distributedStorage and /datahub/datalake) can be changed as needed.
The directories will be created by the installation.

The ``$DREMIO_USER`` and ``$DREMIO_PASSWORD`` credentials are substituted during installation based on the values provided in *datahub-config.json*.

In case you want to modify resource settings for Dremio master or executor, you must not exceed the following constraints:
* At maximum 48 GB RAM for each, master and executor
* Only one executor

These licensing constraints are checked during the installation procedure.

#### Configuring deployment of MySQL via mysql-values.yaml

The *mysql-values.yaml* file contains the configuration settings for the MySQL deployment. It needs to be adapted as follows:

The MySQL database uses a persistent volume to persist its data. The persistent volume claim is defined in the MySQL helm chart. You have to provide the name of the ``<STORAGE_CLASS>`` used by that claim.

The ``$MYSQL_PASSWORD`` is substituted during installation based on the value provided in *datahub-config.json*.

#### Running the installation script

Execute the following command to install {{< product-c8y-iot >}} DataHub Edge on Kubernetes:
```shell
./install.sh -a
```

#### Add entry to /etc/hosts

In order to access Dremio, the following entry needs to be added to ``/etc/hosts``:
```
<IP address>   datahub.<domain_name>
```
where ``domain_name`` is the domain name chosen during the installation of {{< product-c8y-iot >}} Edge on Kubernetes.

The IP address can be obtained using
```shell
kubectl get service -n c8yedge cumulocity-core -o jsonpath={.status.loadBalancer.ingress[*].ip}
```

#### Using {{< product-c8y-iot >}} DataHub Edge on Kubernetes

{{< product-c8y-iot >}} DataHub Edge on Kubernetes behaves like the Cloud and Edge appliance version.

### Validation of {{< product-c8y-iot >}} DataHub Installation

If the product doesn't work as intended after the installation, go through the validation steps described below.

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

When logged into {{< product-c8y-iot >}} UI, the {{< product-c8y-iot >}} DataHub microservice is available under *Administration > Ecosystem > Microservices*.

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

When logged into the {{< product-c8y-iot >}} UI, the {{< product-c8y-iot >}} DataHub web application is available under *Administration > Ecosystem > Applications*.
It should also be present in the usual {{< product-c8y-iot >}} application switcher.
