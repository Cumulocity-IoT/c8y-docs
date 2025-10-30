#!/bin/bash
set -euo pipefail
trap 'echo "Error on line $LINENO"; exit 1' ERR

# ------- Configuration (no manual inputs) -------
NAMESPACE="c8yedge"
SOURCE_NAME="c8y_source"
MONGO_SECRET="internal-edge-db-users"
DREMIO_SECRET="dremio-admin-credentials"
MONGO_SVC="edge-db-rs0"
DREMIO_SVC="cumulocity-ontoplb"
DREMIO_PORT=9047

# ------- Fetch Dremio admin credentials -------
DREMIO_USER=$(kubectl get secret -n "$NAMESPACE" "$DREMIO_SECRET" -o jsonpath='{.data.DREMIO_ADMIN_USER}' | base64 -d)
DREMIO_PASS=$(kubectl get secret -n "$NAMESPACE" "$DREMIO_SECRET" -o jsonpath='{.data.DREMIO_ADMIN_PASSWORD}' | base64 -d)

# ------- Resolve Dremio endpoint (LoadBalancer IP or ClusterIP fallback) -------
DREMIO_IP=$(kubectl get svc -n "$NAMESPACE" "$DREMIO_SVC" -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || true)
if [[ -z "$DREMIO_IP" || "$DREMIO_IP" == "null" ]]; then
  DREMIO_IP=$(kubectl get svc -n "$NAMESPACE" "$DREMIO_SVC" -o jsonpath='{.spec.clusterIP}')
fi
if [[ -z "$DREMIO_IP" ]]; then
  echo "Failed to locate Dremio service IP for $DREMIO_SVC in namespace $NAMESPACE"
  exit 1
fi
DREMIO_URL="https://${DREMIO_IP}:${DREMIO_PORT}"

# ------- Login to Dremio and build Authorization header -------
LOGIN_JSON=$(curl -sk -X POST "$DREMIO_URL/apiv2/login" \
  -H "Content-Type: application/json" \
  -d "{\"userName\":\"$DREMIO_USER\",\"password\":\"$DREMIO_PASS\"}")

AUTH_TOKEN=$(echo "$LOGIN_JSON" | jq -r '.token')
if [[ -z "$AUTH_TOKEN" || "$AUTH_TOKEN" == "null" ]]; then
  echo "Failed to obtain Dremio auth token. Response:"
  echo "$LOGIN_JSON" | jq .
  exit 1
fi
AUTH_HEADER="_dremio${AUTH_TOKEN}"

# ------- Fetch Mongo credentials -------
MONGO_USER=$(kubectl get secret -n "$NAMESPACE" "$MONGO_SECRET" -o jsonpath='{.data.MONGODB_DATABASE_ADMIN_USER}' | base64 -d)
MONGO_PASS=$(kubectl get secret -n "$NAMESPACE" "$MONGO_SECRET" -o jsonpath='{.data.MONGODB_DATABASE_ADMIN_PASSWORD}' | base64 -d)

# ------- Resolve Mongo service host and port -------
MONGO_HOSTNAME=$(kubectl get svc -n "$NAMESPACE" "$MONGO_SVC" -o jsonpath='{.metadata.name}' 2>/dev/null || true)
if [[ -z "$MONGO_HOSTNAME" ]]; then
  echo "Failed to find MongoDB service $MONGO_SVC in namespace $NAMESPACE"
  exit 1
fi
MONGO_PORT=$(kubectl get svc -n "$NAMESPACE" "$MONGO_SVC" -o jsonpath='{.spec.ports[0].port}')
MONGO_FQDN="${MONGO_HOSTNAME}.${NAMESPACE}.svc.cluster.local"

# ------- Fetch existing source JSON from Dremio -------
SOURCE_JSON=$(curl -sk -H "Authorization: ${AUTH_HEADER}" "$DREMIO_URL/apiv2/source/$SOURCE_NAME")
SOURCE_ID=$(echo "$SOURCE_JSON" | jq -r '.id // empty')
SOURCE_TAG=$(echo "$SOURCE_JSON" | jq -r '.tag // empty')

if [[ -z "$SOURCE_ID" ]]; then
  echo "Source '$SOURCE_NAME' not found in Dremio at $DREMIO_URL"
  exit 1
fi

# ------- Enable keep_metadata_on_replace (true) -------
curl -sk -X PUT "$DREMIO_URL/apiv2/settings/store.plugin.keep_metadata_on_replace" \
  -H "Authorization: ${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  --data '{"type":"BOOLEAN","id":"store.plugin.keep_metadata_on_replace","value":true}' >/dev/null

# ------- Build minimal update payload based on requested layout -------
# Layout:
# {
#   "config": { hostList:[{hostname,port}], useSsl:true, authenticationType, authDatabase, ... }
# }
UPDATE_PAYLOAD=$(jq -n \
  --arg id "$SOURCE_ID" \
  --arg tag "$SOURCE_TAG" \
  --arg name "$SOURCE_NAME" \
  --arg type "MONGO" \
  --arg host "$MONGO_FQDN" \
  --argjson port "$MONGO_PORT" \
  --arg user "$MONGO_USER" \
  --arg pass "$MONGO_PASS" \
  '{
    id: $id,
    tag: $tag,
    type: $type,
    name: $name,
    config: {
      hostList: [{ hostname: $host, port: $port }],
      useSsl: true,
      authenticationType: "MASTER",
      username: $user,
      password: $pass,
      authDatabase: "admin",
      authenticationTimeoutMillis: 2000,
      secondaryReadsOnly: false,
      subpartitionSize: 0,
      sampleSize: 4095,
      sampleMethod: "FIRST",
      propertyList: [{ name: "maxPoolSize", value: "100" }],
      useCaseInsensitiveFieldNames: false
    }
  }')

# ------- PUT update to Dremio -------
UPDATE_RESPONSE=$(curl -sk -X PUT "$DREMIO_URL/apiv2/source/$SOURCE_NAME/?nocache=$(date +%s)" \
  -H "Authorization: ${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  --data "$UPDATE_PAYLOAD")

# If Dremio returned an errorMessage, show and exit
if echo "$UPDATE_RESPONSE" | jq -e 'has("errorMessage")' >/dev/null 2>&1; then
  echo "Dremio returned error while updating source:"
  echo "$UPDATE_RESPONSE" | jq .
  # Attempt to restore the keep_metadata flag to false before exiting
  curl -sk -X PUT "$DREMIO_URL/apiv2/settings/store.plugin.keep_metadata_on_replace" \
    -H "Authorization: ${AUTH_HEADER}" \
    -H "Content-Type: application/json" \
    --data '{"type":"BOOLEAN","id":"store.plugin.keep_metadata_on_replace","value":false}' >/dev/null || true
  exit 1
fi

# ------- Restore keep_metadata_on_replace (false) -------
curl -sk -X PUT "$DREMIO_URL/apiv2/settings/store.plugin.keep_metadata_on_replace" \
  -H "Authorization: ${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  --data '{"type":"BOOLEAN","id":"store.plugin.keep_metadata_on_replace","value":false}' >/dev/null

# ------- Verify connection/status -------
VERIFY_JSON=$(curl -sk -H "Authorization: ${AUTH_HEADER}" "$DREMIO_URL/apiv2/source/$SOURCE_NAME")
STATUS=$(echo "$VERIFY_JSON" | jq -r '.state.status // empty')
MSG=$(echo "$VERIFY_JSON" | jq -r '.state.messages[0].message // empty')

if [[ "$STATUS" == "good" ]]; then
  echo "SUCCESS: Dremio source '$SOURCE_NAME' updated and MongoDB is connected."
  echo "Message: $MSG"
  exit 0
else
  echo "WARNING: Dremio source updated but status is not 'good'."
  echo "Status: $STATUS"
  echo "Message: $MSG"
  exit 2
fi
