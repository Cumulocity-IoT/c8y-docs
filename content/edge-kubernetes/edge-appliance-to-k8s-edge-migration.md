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

## Prerequisites

- Schedule a downtime.
- Clone your Edge 10.17 VM to prevent data loss.
- Get registry credentials with access to the `platform` repo.
- Configure MongoDB to allow connections without TLS.
- Assign the following Cumulocity roles to your migration user:
  - `ROLE_INVENTORY_READ`
  - `ROLE_OPTION_MANAGEMENT_READ`
  - `ROLE_OPTION_MANAGEMENT_ADMIN`
  - `ROLE_TENANT_MANAGEMENT_ADMIN`
  - `ROLE_APPLICATION_MANAGEMENT_SUBSCRIPTIONS_READ`

Ref: https://cumulocity.com/api/core/#operation/postGroupsRoleReferenceCollectionResource

## Step 1: Backup from Edge 10.17

Run these commands on Edge 10.17:

```shell
monit unmonitor all && \
systemctl stop installation-service opcua-mgmt-service opcua-device-gateway smartrule apama cumulocity-core-karaf
```

If DataHub is installed:

```shell
service cdh-console stop && \
service cdh-master stop && \
service cdh-executor stop
```

Backup MongoDB and relevant directories:

```shell
mongodump --uri="mongodb://c8y-root:mongodb-password@localhost:27017/edge?authSource=admin" --out=/path/to/mongo_bkp
tar -zcf /opt/edge-1017-backup.tar /opt/softwareag /path/to/mongo_bkp /var/lib/cumulocity-agent /usr/edge /opt/opcua
```

Copy the tar file to a network location accessible by the new Edge.

## Step 2: Deploy Edge on K8s

Refer to [Edge on K8s Introduction](/edge-kubernetes/k8-edge-introduction/) for installation details. Ensure K8s storage matches data requirements from the backup.

## Step 3: Restore Data to Edge 10.18

Transfer and extract the backup:

```shell
scp edge-1017-backup.tar <edge-10.18-ip>:/opt
tar -xf /opt/edge-1017-backup.tar -C /
```

Clean MongoDB before restore:

```shell
rm -rf /opt/mongodb/*
```

Restore MongoDB:

```shell
mongorestore \
  --username userAdmin \
  --password mongoPassword \
  --authenticationDatabase admin \
  --db edge \
  /tmp/mongo_bkp/edge/ \
  --drop
```

Restore specific collection (optional):

```shell
mongoimport \
  --host localhost \
  --port 27017 \
  --username userAdmin \
  --password mongoPassword \
  --authenticationDatabase admin \
  --db edge \
  --collection users \
  --file users.json
```

Restart the operator:

```shell
kubectl rollout restart deployment -n c8yedge c8yedge-operator-controller-manager
```

## Step 4: Migrate Time Series Data

### Option A: Helm Deployment on K8s

1. Create required secrets `timeseries-migration-mongo` and `timeseries-migration-bootstrap`.
2. Prepare `values.yaml`.

```yaml
imagePullSecrets:
  name: regcred
deployment:
  image:
    repository: registry.c8y.io/platform/timeseries-migration-server
  c8y:
    baseURL: "http://cumulocity.cumulocity-single-node.svc.cluster.local:8111"
  envFrom:
    mongo-credentials:
      type: secret
      nameSuffix: mongo
    bootstrap-credentials:
      type: secret
      nameSuffix: bootstrap
```

3. Install the Helm chart:

```shell
helm install timeseries-migration platform/timeseries-migration \
  -f ./values.yaml \
  --namespace cumulocity-single-node
```

### Option B: Docker Deployment

```shell
docker run -d \
  --name timeseries-migration \
  --network bridge \
  -p 8888:8080 -p 8001:8001 \
  -e C8Y_BASEURL=http://172.17.0.1:8111 \
  -e SPRING_DATA_MONGODB_URI=mongodb://c8y-root:mongodb-password@172.17.0.1:27017/admin \
  -e C8Y_BOOTSTRAP_USER=EDGE_USER \
  -e C8Y_BOOTSTRAP_PASSWORD=EDGE_PASSWORD \
  -e C8Y_BOOTSTRAP_TENANT=management \
  -e MICROSERVICE_URL=http://172.17.0.1:8888 \
  registry.c8y.io/platform/timeseries-migration-server:1.0.326
```

## Step 5: Trigger and Monitor Migration

Get migration status:

```shell
curl -X GET https://{tenantId}.cumulocity.com/service/timeseries-migration/migrations/{tenantId} \
  -H "authorization: Basic {auth}" \
  -H "accept: application/json"
```

Schedule migration:

```shell
curl -X PUT https://{tenantId}.cumulocity.com/service/timeseries-migration/migrations \
  -H "authorization: Basic {auth}" \
  -H "content-type: application/json" \
  -d '{ "state": "SCHEDULED", "tenants": [ "t123", "t321" ] }'
```

## Step 6: Post-Migration Configuration

After reboot, configure:

- **Time sync**: [Configuring time synchronization](/edge-kubernetes/configuring-time/)
- **Network**: [Network settings](/edge-kubernetes/configuring-network/)
- **Microservice hosting** (if needed)
- **DataHub ownership**:

```shell
chown -R systemd-coredump:systemd-coredump /opt/mongodb/cdh-*
```
