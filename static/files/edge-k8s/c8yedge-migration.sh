#!/bin/bash
set -euo pipefail

log() {
  echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

log "Detecting namespace from PSMDB resource..."
NAMESPACE=$(kubectl get psmdb -A -o json | jq -r '.items[0].metadata.namespace')

if [[ -z "$NAMESPACE" ]]; then
  log "Error: Unable to determine namespace for PerconaServerMongoDB."
  exit 1
fi

log "Using detected namespace: $NAMESPACE"

POD_NAME="migration"
MOUNT_PATH="/mongo_backup"
HOST_PATH="/opt/appliance-edgedb-backup"
CA_CONTAINER_PATH="/etc/ssl/certs/ca.crt"

log "Extracting MongoDB service info from PerconaServerMongoDB..."
PSMDB_JSON=$(kubectl get psmdb -n "$NAMESPACE" -o json)
MONGO_IMAGE=$(echo "$PSMDB_JSON" | jq -r '.items[0].spec.image')
SECRET_NAME=$(echo "$PSMDB_JSON" | jq -r '.items[0].spec.secrets.users')
MONGO_SERVICE=$(echo "$PSMDB_JSON" | jq -r '.items[0].status.host')

if [[ -z "$MONGO_IMAGE" || -z "$SECRET_NAME" || -z "$MONGO_SERVICE" ]]; then
  log "Error: Failed to extract required info from PSMDB CR."
  exit 1
fi

log "Mongo image: $MONGO_IMAGE"
log "Mongo service: $MONGO_SERVICE"
log "Secret name: $SECRET_NAME"

log "Fetching credentials from secret..."
SECRET_JSON=$(kubectl get secret "$SECRET_NAME" -n "$NAMESPACE" -o json)
ADMIN_USER=$(echo "$SECRET_JSON" | jq -r '.data.MONGODB_DATABASE_ADMIN_USER' | base64 -d)
ADMIN_PASSWORD=$(echo "$SECRET_JSON" | jq -r '.data.MONGODB_DATABASE_ADMIN_PASSWORD' | base64 -d)

log "Cleaning up existing pod if any..."
kubectl delete pod "$POD_NAME" -n "$NAMESPACE" --ignore-not-found

log "Constructing Mongo shell command..."
MONGO_COMMAND=$(cat <<EOF
set -eux; 
echo ">> Exporting users collection..." && 
mongoexport \
  --host $MONGO_SERVICE \
  --port 27017 \
  --username "$ADMIN_USER" \
  --password "$ADMIN_PASSWORD" \
  --authenticationDatabase admin \
  --db edge \
  --collection users \
  --out $MOUNT_PATH/users.json \
  --ssl \
  --sslCAFile $CA_CONTAINER_PATH \
  --tlsInsecure && \

echo ">> Restoring edge DB from backup..." && \
mongorestore \
  --host $MONGO_SERVICE \
  --port 27017 \
  --username "$ADMIN_USER" \
  --password "$ADMIN_PASSWORD" \
  --authenticationDatabase admin \
  --db edge \
  $MOUNT_PATH/edge/ \
  --drop \
  --ssl \
  --sslCAFile $CA_CONTAINER_PATH \
  --tlsInsecure && \

echo ">> Re-importing users collection..." && \
mongoimport \
  --host $MONGO_SERVICE \
  --port 27017 \
  --username "$ADMIN_USER" \
  --password "$ADMIN_PASSWORD" \
  --authenticationDatabase admin \
  --db edge \
  --collection users \
  --file $MOUNT_PATH/users.json \
  --ssl \
  --sslCAFile $CA_CONTAINER_PATH \
  --tlsInsecure && \
echo ">> Done." && tail -f /dev/null
EOF
)

log "Launching pod for MongoDB backup/restore..."
kubectl run "$POD_NAME" \
  --image="$MONGO_IMAGE" \
  --namespace="$NAMESPACE" \
  --restart=Never \
  --overrides="$(jq -n \
  --arg image "$MONGO_IMAGE" \
  --arg command "$MONGO_COMMAND" \
  --arg mountPath "$MOUNT_PATH" \
  --arg hostPath "$HOST_PATH" \
  --arg secretName "$SECRET_NAME" \
  --arg caPath "$CA_CONTAINER_PATH" \
  ' {
    apiVersion: "v1",
    spec: {
      securityContext: {
        runAsUser: 0
      },
      containers: [
        {
          name: "mongod",
          image: $image,
          command: ["/bin/sh"],
          args: ["-c", $command],
          volumeMounts: [
            { name: "backup-volume", mountPath: $mountPath },
            { name: "ca-volume", mountPath: $caPath, subPath: "ca.crt" }
          ]
        }
      ],
      volumes: [
        {
          name: "backup-volume",
          hostPath: { path: $hostPath, type: "Directory" }
        },
        {
          name: "ca-volume",
          secret: {
            secretName: $secretName,
            items: [ { key: "ca.crt", path: "ca.crt" } ]
          }
        }
      ],
      restartPolicy: "Never"
    }
  }')"

log "Pod '$POD_NAME' created. Run 'kubectl logs -f pod/$POD_NAME -n $NAMESPACE' to watch output."
