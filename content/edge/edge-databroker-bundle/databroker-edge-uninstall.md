---
weight: 50
title: Uninstalling the Messaging Service and the microservice-based data broker
layout: bundle
sector:
  - edge_server
---

The bundle for the Messaging Service and data broker microservice does not have an uninstall command.
If a mistake is made or an installation fails, the bundle components must be uninstalled manually.
Afterwards, the installation can be reattempted.

### To uninstall manually
1. Login to Edge using SSH.

2. Uninstall the Pulsar Helm chart.
```shell
sudo helm uninstall pulsar -n c8y-messaging-service
```
3. Wait for the pulsar pods to terminate.  
   This command updates its state every two seconds. When it reports that there are no resources, press Ctrl+C to return to the command line.

```shell
watch sudo kubectl get pods -n c8y-messaging-service
```
4. Delete Pulsar's persistent volume claims.
```shell
sudo kubectl delete pvc -n c8y-messaging-service --all
```
5. Find the names of the persistent volumes used by the Pulsar components.

   Here the grep command is used to filter the output. The names are in the output's leftmost column.

```shell
sudo kubectl get pv | grep pulsar
journal0     2Gi        RWO            Retain           Released    c8y-messaging-service/pulsar-bookie-journal-pulsar-bookie-0      local-storage            3h
ledgers0     10Gi       RWO            Retain           Released    c8y-messaging-service/pulsar-bookie-ledgers-pulsar-bookie-0      local-storage            3h
zookeeper0   2Gi        RWO            Retain           Released    c8y-messaging-service/pulsar-zookeeper-data-pulsar-zookeeper-0   local-storage            3h
```
6. Delete each of the persistent volumes found in the previous step.
```shell
sudo kubectl delete pv journal0 ledgers0 zookeeper0
```
7. Delete the directories used by the persistent volumes.
```shell
sudo rm -rf /opt/bookie/ledgers /opt/bookie/journal /opt/zookeeper
```
8. Unsubscribe the "edge" tenant from and delete, the databroker-agent-server microservice.

   The databroker-agent-server application ID is required for the HTTP requests used to do both of these.   
   To find its application ID, you can use a cURL command of the following form and redirect the output to a jq command to make it easier to read the JSON response.
   The general structure of the command is:
```shell
curl http://<EDGE-HOSTNAME>/application/applicationsByName/databroker-agent-server -su <TENANT>/<USERNAME> | jq --indent 2
```   
   The ID required is the value of the `id` field at the root level of the JSON response.
   In the following example, it has the value '19' (the penultimate JSON field).
```shell
curl http://myown.iot.com/application/applicationsByName/databroker-agent-server -su edge/admin | jq --indent 2
Enter host password for user 'edge/admin':
{
  "next": "https://myown.iot.com/application/applications?pageSize=5&currentPage=2",
  "self": "https://myown.iot.com/application/applications?pageSize=5&currentPage=1",
  "statistics": {
    "pageSize": 5,
    "currentPage": 1
  },
  "applications": [
    {
      "owner": { ... truncated ... },
      "requiredRoles": [ ... truncated ... ],
      "manifest": { ... truncated ... },
      "roles": [],
      "contextPath": "databroker-agent-server",
      "availability": "MARKET",
      "type": "MICROSERVICE",
      "activeVersionId": "1345",
      "name": "databroker-agent-server",
      "self": "https://myown.iot.com/application/applications/19",
      "id": "19",
      "key": "databroker-agent-server-key"
    }
  ]
}
```
   Use that ID value in the request to unsubscribe from the microservice and again when deleting it.

   To unsubscribe, use a command of the following form:
```shell
curl -X DELETE http://<EDGE-HOSTNAME>/tenant/tenants/<TENANT>/applications/<APP-ID> -u <TENANT>/<USERNAME> -v
```
   This returns an HTTP 204 (no content) response. For example:
```shell
curl -X DELETE http://myown.iot.com/tenant/tenants/edge/applications/19 -u edge/admin -v
Enter host password for user 'edge/admin':
* About to connect() to myown.iot.com port 80 (#0)
*   Trying 127.0.0.1...
* Connected to myown.iot.com (127.0.0.1) port 80 (#0)
* Server auth using Basic with user 'edge/admin'
> DELETE /tenant/tenants/edge/applications/19 HTTP/1.1
> Authorization: Basic ZWRnZS9hZG1pbjpFZGdlN184OV9fX19fX18=
> User-Agent: curl/7.29.0
> Host: myown.iot.com
> Accept: */*
>
< HTTP/1.1 204 No Content
< Date: Thu, 07 Sep 2023 16:27:32 GMT
< Connection: keep-alive
< X-Content-Type-Options: nosniff
< X-XSS-Protection: 1; mode=block
< Cache-Control: no-cache, no-store, max-age=0, must-revalidate
< Pragma: no-cache
< Expires: 0
< X-Frame-Options: DENY
<
* Connection #0 to host myown.iot.com left intact
```

   To delete, use a command of the following form:
```shell
curl -X DELETE http://<EDGE-HOSTNAME>/application/applications/<APP-ID> -su <TENANT>/<USERNAME> -v
```   
   This returns an HTTP 204 (no content) response. For example:
```shell
curl -X DELETE http://myown.iot.com/application/applications/19 -su edge/admin -v
Enter host password for user 'edge/admin':
* About to connect() to myown.iot.com port 80 (#0)
*   Trying 127.0.0.1...
* Connected to myown.iot.com (127.0.0.1) port 80 (#0)
* Server auth using Basic with user 'edge/admin'
> DELETE /application/applications/19 HTTP/1.1
> Authorization: Basic ZWRnZS9hZG1pbjpFZGdlN184OV9fX19fX18=
> User-Agent: curl/7.29.0
> Host: myown.iot.com
> Accept: */*
>
< HTTP/1.1 204 No Content
< Date: Thu, 07 Sep 2023 16:35:11 GMT
< Content-Type: application/vnd.com.nsn.cumulocity.error+json;charset=UTF-8;ver=0.9
< Connection: keep-alive
< X-Content-Type-Options: nosniff
< X-XSS-Protection: 1; mode=block
< Cache-Control: no-cache, no-store, max-age=0, must-revalidate
< Pragma: no-cache
< Expires: 0
< X-Frame-Options: DENY
<
* Connection #0 to host myown.iot.com left intact
```
