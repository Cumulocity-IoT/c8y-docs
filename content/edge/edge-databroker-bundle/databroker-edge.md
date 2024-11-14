---
weight: 10
title: Installing the Messaging Service and the microservice-based data broker
layout: bundle
sector:
  - edge_server
---

The microservice-based data broker is an optional component of Edge. The data broker is a {{< product-c8y-iot >}} feature that allows a {{< product-c8y-iot >}} tenant to send data in motion (live measurements, events and alarms), using the standard {{< product-c8y-iot >}} REST API requests, to another tenant as that data arrives in the first tenant. It is often used to 'ship' data from remote Edge {{< product-c8y-iot >}} instances in the field to a central {{< product-c8y-iot >}} instance, where all data from all remote 'field' locations can be seen and handled together. Another use case is when devices are leased. The devices are managed by the leasing company in its tenant, and the devices' measurements and other data are sent to the leasing tenant via a data broker connection for application data processing.

The bundle for installing the Messaging Service and the microservice-based data broker comes as a `.tgz` file which contains the Messaging Service and data broker files, an install script and a digital signature. This bundle is unpacked, the signature verified and the install script executed by another script that is part of the standard Edge installation. The bundle can be downloaded from the [{{< company-sag >}} {{< sag-portal >}} ]({{< link-sag-portal >}}). The bundle is named "{{< product-c8y-iot >}} Data Broker Edge".

{{< c8y-admon-req >}}
Ensure that [microservice hosting feature is enabled](/edge/edge-configuration/#configuring-microservices) for Edge as both the Messaging Service and data broker run as Kubernetes pods. Running microservices on a basic Edge installation requires the number of CPU cores to be increased from 2 to 4 and the RAM to be increased from 6GB to 8GB. Running the Messaging Service and data broker requires an extra 4GB of RAM on top of this.

The Messaging Service microservice uses API version 1. To install the Messaging Service on Edge version 10.15, you must subscribe the "edge" tenant to the **Feature-privileged-microservice-hosting** application before uploading the Messaging Service microservice with API version 1. For more information, see [Deploying microservices with a lower manifest version](/edge/edge-configuration/#deploying-microservices-with-a-lower-manifest-version).

{{< /c8y-admon-req >}}

Using SCP, copy the bundle to the */tmp* directory on the Edge server. Enter the password for the Edge Linux administrative/login account when prompted. For example:

```bash
scp pulsar-edge-install-{{< c8y-edge-current-version >}}.0.0.tgz	 "<LOGIN_USERNAME>@<DNS_NAME_OF_SERVER>:/tmp/"
```

Substitute the relevant values of `<LOGIN_USERNAME>` and `<DNS_NAME_OF_SERVER>`. Then run:
```bash
ssh <LOGIN_USERNAME>@<DNS_NAME_OF_SERVER> -t "/bin/bash -c 'cd /tmp && sudo /opt/c8y/utilities/install_signed_package.sh /tmp/pulsar-edge-install-1015.0.0.tgz"
```

Enter the Edge Linux admin account password, again followed by the {{< product-c8y-iot >}} admin account password.

To confirm the Messaging Service and data broker are now running, log into the Edge VM using SSH with the connection details used previously and run:

```bash
sudo kubectl get pods -A
```

The command returns something like this:

```
NAMESPACE                NAME                                                             READY   STATUS      RESTARTS   AGE
c8y-messaging-service    pulsar-bookie-0                                                  1/1     Running     0          4m14s
c8y-messaging-service    pulsar-bookie-init-765k9                                         0/1     Completed   0          4m14s
c8y-messaging-service    pulsar-broker-0                                                  1/1     Running     0          4m14s
c8y-messaging-service    pulsar-pulsar-init-z97xs                                         0/1     Completed   0          4m14s
c8y-messaging-service    pulsar-zookeeper-0                                               1/1     Running     0          4m14s
calico-system            calico-kube-controllers-5ddcc6fc8f-sln6x                         1/1     Running     0          82m
calico-system            calico-node-bxm9b                                                1/1     Running     0          82m
calico-system            calico-typha-7fd9df674f-24zwz                                    1/1     Running     0          82m
cumulocity-single-node   databroker-agent-server-scope-edge-deployment-7dc4dbdc5f-wxh8l   1/1     Running     3          3m36s
cumulocity-single-node   device-simulator-scope-management-deployment-78d5c6694-rlpjx     1/1     Running     0          80m
cumulocity-single-node   kube-registry-persistent-secure-7db46f57b5-vhlbh                 1/1     Running     0          81m
kube-system              coredns-74ff55c5b-5zkps                                          1/1     Running     0          82m
kube-system              etcd-localhost                                                   1/1     Running     0          82m
kube-system              kube-apiserver-localhost                                         1/1     Running     0          82m
kube-system              kube-controller-manager-localhost                                1/1     Running     0          82m
kube-system              kube-proxy-92lm6                                                 1/1     Running     0          82m
kube-system              kube-scheduler-localhost                                         1/1     Running     0          82m
kube-system              metrics-server-5b78d5f9c6-7l45k                                  1/1     Running     0          82m
tigera-operator          tigera-operator-76bbbcbc85-6clrf                                 1/1     Running     0          82m
```
The key pods that should be running are `pulsar-bookie-0`, `pulsar-broker-0`, `pulsar-zookeeper-0` and `databroker-agent-server`, with a suffix for the pod name specific to the installation. It may take a few minutes for the Kubernetes pods to settle into a running state after the installation has been completed.

For more information on installing and troubleshooting the Messaging Service see the [Messaging Service Installation & operations guide]({{< link-sag-portal >}}sl24sec/SecuredServices/document/java/cumulocity_iot_platform/iot10-15-0/10-15-0_Messaging_Service_Installation_and_Operations_guide.pdf).

For more information on configuring and using the microservice-based data broker, see [Microservice-based data broker](/data-broker/ms-data-broker/).
