#!/bin/bash

#
# Imports MongoDB data into Edge 2025
#
# This script automates the process of:
#   1. Exporting the `users` collection from the `management` and `edge` tenant databases of Edge 2025.
#   2. Restoring the `management` and `edge` tenant databases of Edge 2025 from the backup file in the mounted directory.
#   3. Re-importing the `users` collection into the `management` and `edge` tenant databases of Edge 2025.
# 
# This script uses the TLS certificate and credentials fetched from the mongo secret.
#
# Prerequisites:
#   - Backup files should be present on the host path: /opt/appliance-edgedb-backup
#
# Notes:
#   - Namespace, MongoDB image, service, and secret are dynamically derived from the PSMDB CR.
#
#

set -euo pipefail

log() {
  echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

log "Detecting Edge namespace from edge-db resource"
NAMESPACE=$(kubectl get psmdb -A -o json | jq -r '.items[0].metadata.namespace')

if [[ -z "$NAMESPACE" ]]; then
  log "Error: Unable to determine Edge namespace."
  exit 1
fi

log "Using Edge namespace: $NAMESPACE"

POD_NAME="edge-appliance-migration"
MOUNT_PATH="/edgedb-backup"
HOST_PATH="/opt/appliance-edgedb-backup"

log "Extracting MongoDB info."
PSMDB_JSON=$(kubectl get psmdb -n "$NAMESPACE" -o json)
MONGO_IMAGE=$(echo "$PSMDB_JSON" | jq -r '.items[0].spec.image')
SECRET_NAME=$(echo "$PSMDB_JSON" | jq -r '.items[0].spec.secrets.users')
MONGO_SERVICE=$(echo "$PSMDB_JSON" | jq -r '.items[0].status.host')

if [[ -z "$MONGO_IMAGE" || -z "$SECRET_NAME" || -z "$MONGO_SERVICE" ]]; then
  log "Error: Failed to extract required MongoDB info."
  exit 1
fi

log "Mongo image: $MONGO_IMAGE"
log "Mongo hostname: $MONGO_SERVICE"
log "Credentials Secret: $SECRET_NAME"

log "Fetching credentials from secret"
SECRET_JSON=$(kubectl get secret "$SECRET_NAME" -n "$NAMESPACE" -o json)
ADMIN_USER=$(echo "$SECRET_JSON" | jq -r '.data.MONGODB_DATABASE_ADMIN_USER' | base64 -d)
ADMIN_PASSWORD=$(echo "$SECRET_JSON" | jq -r '.data.MONGODB_DATABASE_ADMIN_PASSWORD' | base64 -d)

log "Cleaning up existing pod if any."
kubectl delete pod "$POD_NAME" -n "$NAMESPACE" --ignore-not-found

log "Constructing Mongo shell command."
MONGO_COMMAND=$(cat <<EOF
set -eux; 
echo ">> Cumulocity Edge MongoDB restoration started." &&
echo ">> Exporting users collection from management tenant DB." && 
mongoexport \
  --host $MONGO_SERVICE:27017 \
  --authenticationDatabase admin \
  --username "$ADMIN_USER" \
  --password "$ADMIN_PASSWORD" \
  --ssl --tlsInsecure \
  --db management --collection users \
  --out $MOUNT_PATH/management-users-export.json && \

echo ">> Exporting users collection from edge tenant DB." && 
mongoexport \
  --host $MONGO_SERVICE:27017 \
  --authenticationDatabase admin \
  --username "$ADMIN_USER" \
  --password "$ADMIN_PASSWORD" \
  --ssl --tlsInsecure \
  --db edge --collection users \
  --out $MOUNT_PATH/edge-users-export.json && \

echo ">> Restoring management tenant DB from backup." && \
mongorestore \
  --host $MONGO_SERVICE:27017 \
  --authenticationDatabase admin \
  --username "$ADMIN_USER" \
  --password "$ADMIN_PASSWORD" \
  --ssl --tlsInsecure \
  --db management --drop \
  $MOUNT_PATH/management/ && \

echo ">> Re-importing users collection into management tenant DB." && \
mongoimport \
  --host $MONGO_SERVICE:27017 \
  --authenticationDatabase admin \
  --username "$ADMIN_USER" \
  --password "$ADMIN_PASSWORD" \
  --ssl --tlsInsecure \
  --db management --collection users \
  --mode=upsert \
  --file $MOUNT_PATH/management-users-export.json && \

echo ">> Restoring edge tenant DB from backup." && \
mongorestore \
  --host $MONGO_SERVICE:27017 \
  --authenticationDatabase admin \
  --username "$ADMIN_USER" \
  --password "$ADMIN_PASSWORD" \
  --ssl --tlsInsecure \
  --db edge --drop \
  $MOUNT_PATH/edge/ && \

echo ">> Re-importing users collection into edge tenant DB." && \
mongoimport \
  --host $MONGO_SERVICE:27017 \
  --authenticationDatabase admin \
  --username "$ADMIN_USER" \
  --password "$ADMIN_PASSWORD" \
  --ssl --tlsInsecure \
  --db edge --collection users \
  --mode=upsert \
  --file $MOUNT_PATH/edge-users-export.json && \

echo ">> Cumulocity Edge MongoDB restoration completed."
EOF
)

log "Launching pod for MongoDB restore."
kubectl run "$POD_NAME" --namespace="$NAMESPACE" \
  --image="$MONGO_IMAGE" \
  --restart=Never \
  --overrides="$(jq -n \
  --arg image "$MONGO_IMAGE" \
  --arg command "$MONGO_COMMAND" \
  --arg mountPath "$MOUNT_PATH" \
  --arg hostPath "$HOST_PATH" \
  --arg secretName "$SECRET_NAME" \
  ' {
    apiVersion: "v1",
    spec: {
      securityContext: {
        runAsUser: 0
      },
      containers: [
        {
          name: "db-restore",
          image: $image,
          command: ["/bin/sh"],
          args: ["-c", $command],
          volumeMounts: [
            { name: "backup-volume", mountPath: $mountPath }
          ]
        }
      ],
      volumes: [
        {
          name: "backup-volume",
          hostPath: { path: $hostPath, type: "Directory" }
        }
      ],
      restartPolicy: "Never"
    }
  }')"

log "Pod '$POD_NAME' created. Run 'kubectl logs -f pod/$POD_NAME -n $NAMESPACE' to watch output."
