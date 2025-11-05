---
weight: 80
title: Accessing Edge via an external IP
layout: redirect
---
To get the external IP to access Edge, run the command below:
```shell
kubectl get service cumulocity-ontoplb --namespace=c8yedge
```
{{< c8y-admon-info >}}
Substitute the namespace name *c8yedge* in the command above with the specific namespace name you have specified in your Edge CR.
{{< /c8y-admon-info >}}

Sample output of the `kubectl get service` command:

```text
NAME              	TYPE           CLUSTER-IP          EXTERNAL-IP         PORT(S)
cumulocity-ontoplb  LoadBalancer   X.X.X.X **REDACTED  X.X.X.X **REDACTED  443:32443/TCP,8443:32442/TCP,1883:32083/TCP,8883:32084/TCP ...
```
Sometimes the external IP displays as `<pending>` or `<none>`. The IP assignment process is dependent on the Kubernetes hosting environment. An external load balancer in the hosting environment handles the IP and port allocation, along with any other configurations necessary to route the external traffic to the Kubernetes service.

Most on-premise Kubernetes clusters do not have external load balancers that can dynamically allocate IPs. The most common solution is to manually assign an external IP to the service. This can be done in the service’s YAML configuration. You can use the following command to manually assign an external IP to the `cumulocity-ontoplb` service (replace `<EXTERNAL-IP>` in the command below with the IP address you want to assign).

```shell
kubectl patch service cumulocity-ontoplb --namespace=c8yedge -p '{"spec":{"type": "LoadBalancer", "externalIPs":["<EXTERNAL-IP>"]}}'
```
{{< c8y-admon-info >}}
Substitute the namespace name *c8yedge* in the command above with the specific namespace name you have specified in your Edge CR.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
When manually assigning the external IP, see the following Kubernetes API documentation:

"These IPs are not managed by Kubernetes. The user is responsible for ensuring that traffic arrives at a node with this IP."
{{< /c8y-admon-info >}}

Even if a load balancer is available, it may be that some of the ports required are already being monopolized by a Kubernetes Ingress provider. For example, Traefik will normally take over ports 80 and 443, and will need to be disabled or reconfigured.
