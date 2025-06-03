---
weight: 20
title: Migrating Edge Appliance to Edge on K8s
layout: bundle
sector:
  - edge_server
---

This section describes how to migrate from **Edge 10.17** to **Edge 10.18 on Kubernetes**. The process includes installation of the new K8s-based version and the migration of data.

{{< c8y-admon-important >}}
If you're using an Edge version earlier than **10.17**, upgrade first to **10.13**, then to **10.17**, before proceeding to **10.18**.
{{< /c8y-admon-important >}}

## Time series conversion & Backing Up Data

### Pre Requisites

- Plan a downtime to avoid any loss due to data in transit
- Clone the VM to avoid data loss of source.
- Get credentials to the production registry with permissions to read platform repo
- Config MongoDB to allow connections without TLS.
- Required/Assign user roles:
  ```json
  [
    "ROLE_INVENTORY_READ",
    "ROLE_OPTION_MANAGEMENT_READ",
    "ROLE_OPTION_MANAGEMENT_ADMIN",
    "ROLE_TENANT_MANAGEMENT_ADMIN",
    "ROLE_APPLICATION_MANAGEMENT_SUBSCRIPTIONS_READ"
  ]
  ```
  Ref: https://cumulocity.com/api/core/#operation/postGroupsRoleReferenceCollectionResource

#### MongoDB TLS Requirement
Ensure MongoDB is configured with:
```yaml
net:
  tls:
    mode: preferTLS
    allowConnectionsWithoutCertificates: true
```

```sh
systemctl restart mongod
systemctl status mongod
```

### Timeseries Conversion of Edge Appliance Data

There are two approaches to convert data on Edge appliance:
1. Microservice deployment on Docker

### Docker Install

Ensure Docker is running on the system and healthy.

```sh
docker login registry.c8y.io
```

> **Note**: `172.17.0.1` is Docker gateway and assigned as host IP for appliance.

```sh
docker run -d   --name timeseries-migration   --network bridge   -p 8888:8080   -p 8001:8001   -e C8Y_BASEURL=http://172.17.0.1:8111   -e SPRING_DATA_MONGODB_URI=mongodb://c8y-root:mongodb-password@172.17.0.1:27017/admin   -e C8Y_BOOTSTRAP_USER=edgevm   -e C8Y_BOOTSTRAP_PASSWORD=Edgevmadmin@123   -e C8Y_BOOTSTRAP_TENANT=management   -e MICROSERVICE_URL=http://172.17.0.1:8888   registry.c8y.io/platform/timeseries-migration-server:1.0.326
```

Once the container is created, check logs for reference startup:

```sh
docker logs -f timeseries-migration
```

### Triggering Timeseries Conversion & Troubleshooting

#### Check migration status:

```sh
curl -X GET https://{tenantId}.cumulocity.com/service/timeseries-migration/migrations/{tenantId} -H "authorization: Basic {auth}" -H "accept: application/json"
```

#### Check readiness:

```sh
curl -X GET https://{tenantId}.cumulocity.com/service/timeseries-migration/actuator/health/readiness -H "accept: application/json" -H "authorization: Basic {auth}"
```

#### List migration statuses:

```sh
curl -X GET https://{tenantId}.cumulocity.com/service/timeseries-migration/migrations -H "accept: application/json" -H "authorization: Basic {auth}"
```

#### Schedule tenants for migration:

```sh
curl -X PUT https://{tenantId}.cumulocity.com/service/timeseries-migration/migrations -H "authorization: Basic {auth}" -H "content-type: application/json" -d '{ "state": "SCHEDULED", "tenants": [ "t123", "t321" ] }'
```

States:
- `SCHEDULED`
- `DISABLED`
- `APPROVED`

---

## Backing up Edge 10.17

```sh
monit unmonitor all && systemctl stop installation-service opcua-mgmt-service opcua-device-gateway smartrule apama cumulocity-core-karaf
```

If DataHub installed:

```sh
service cdh-console stop && service cdh-master stop && service cdh-executor stop
```

Backup:

```sh
mongodump --uri="mongodb://c8y-root:mongodb-password@localhost:27017/edge?authSource=admin" --out=/path/to/mongo_bkp

tar -zcf /opt/edge-1017-backup.tar /opt/softwareag /path/to/mongo_bkp /var/lib/cumulocity-agent /usr/edge /opt/opcua
```

Copy backup to accessible location. Shutdown Edge 10.17.

## Deploy Edge on K8s

Refer: https://cumulocity.com/docs/edge-kubernetes/k8-edge-introduction/

## Restore Data on K8s

### Export Users Collection

```sh
mongoexport   --host localhost   --port 27017   --username <user>   --password mongoPassword   --authenticationDatabase admin   --db edge   --collection users   --out users.json
```

### Restore MongoDB

```sh
mongorestore   --username userAdmin   --password mongoPassword   --authenticationDatabase admin   --db edge   /tmp/monog_bkp/edge/   --drop
```

### Import Users

```sh
mongoimport   --host localhost   --port 27017   --username userAdmin   --password mongoPassword   --authenticationDatabase admin   --db edge   --collection users   --file users.json
```

### Restart Operator

```sh
kubectl rollout restart deployment -n c8yedge c8yedge-operator-controller-manager
```

## WebApps and Custom Microservices

Get a copy of custom microservices in advance. And post migration upload the WebApps and MicroServices as needed.
