#!/bin/bash
#
# Copyright (c) 2018-2022 Software AG, Darmstadt, Germany and/or Software AG USA Inc., Reston, VA, USA, and/or its subsidiaries and/or its affiliates and/or their licensors.
# Use, reproduction, transfer, publication or disclosure is prohibited except as specifically provided for in your License Agreement with Software AG.
#


##################################
# Examples
##################################
#
# ./restore_analytics.sh user password /tmp/streaming-analytics-app.zip
# 
# ./restore_analytics.sh user password # This will assume streaming apps to be in /tmp


##################################
# Arg parse
##################################

function usage() {
    echo "Usage:"
    echo "    restore_analytics.sh USER PASSWORD SAPPS"
    echo "    USER is management tenant user"
    echo "    PASSWORD is management tenant password"
    echo "    SAPPS is path to streaming analytics zip"
}

USER=$1
PASSWORD=$2
STREAMING_ANALYTICS_PATH="/tmp/streaming-analytics-app.zip"

if [ -z "$USER" ]; then
   echo "No username given!!!"
   usage
   exit 1;
fi

if [ -z "$PASSWORD" ]; then
   echo "No password given!!!"
   usage
   exit 1;
fi

if [ -z "$STREAMING_ANALYTICS_PATH" ]; then
   STREAMING_ANALYTICS_PATH="/tmp/streaming-analytics-app.zip"
fi

##################################
# Main
##################################

# Get apama analytics builder app id
AAB=$(curl -u "management/${USER}:${PASSWORD}" --location --request GET "localhost:/application/applications?pageSize=100" | jq -r '.applications[]| select(.key == "apamaanalyticsbuilder-key").id')
# Get amapa epl app id
AEPL=$(curl -u "management/${USER}:${PASSWORD}" --location --request GET "localhost:/application/applications?pageSize=100" | jq -r '.applications[]| select(.key == "apamaepl-key").id')

# Remove analytics builder app
echo "Removing analytics builder"
curl  -u "management/${USER}:${PASSWORD}" --location --request DELETE "localhost/application/applications/$AAB?force=true"

# Remove epl app
echo "Removing apama epl"
curl  -u "management/${USER}:${PASSWORD}" --location --request DELETE "localhost/application/applications/$AEPL?force=true"

UNPACK_DIR=/tmp/saa
# Unpack streaming analytics app to /tmp
mkdir $UNPACK_DIR
unzip $STREAMING_ANALYTICS_PATH -d $UNPACK_DIR

NAME=$(cat $UNPACK_DIR/cumulocity.json | jq .name)
CONTEXT_PATH=$(cat $UNPACK_DIR/cumulocity.json | jq .contextPath)
KEY=$(cat $UNPACK_DIR/cumulocity.json | jq .key)
TYPE='"HOSTED"'

# Create streaming analytics app
curl -H "Content-Type: application/json" -v -u "management/${USER}:${PASSWORD}" --location --request POST "localhost/application/applications" -d "{\"name\":$NAME,\"contextPath\":$CONTEXT_PATH,\"type\":$TYPE,\"key\":$KEY,\"resourceUrl\":\"/\"}"

# Get app id of created app
SAAPP_ID=$(curl -u "management/${USER}:${PASSWORD}" --location --request GET "localhost:/application/applications?pageSize=100" | jq -r '.applications[]| select(.key == "streaminganalytics-key").id')

# Add to market
curl -v -u "management/${USER}:${PASSWORD}" --location --request POST "localhost/tenant/tenants/management/applications" --header "Content-Type: application/json" -d "{\"application\":{\"id\":\"$SAAPP_ID\"}}"

# Upload streaming analytics binary (zip)
curl -v -u "management/${USER}:${PASSWORD}" --location --request POST "localhost/application/applications/$SAAPP_ID/binaries" --header "Content-Type: multipart/form-data" --form "file=@$STREAMING_ANALYTICS_PATH"
echo "Waiting for upload of streaming app"
sleep 1

# Get id of binary
BIN_ID=$(curl -v -u "management/${USER}:${PASSWORD}" --location --request GET "localhost/application/applications/$SAAPP_ID/binaries" | jq -r '.attachments[0].id')

# Set current version of streaming analytics to the binary id
curl -v -u "management/${USER}:${PASSWORD}" -H "Content-Type: application/vnd.com.nsn.cumulocity.application+json" --location --request PUT "localhost/application/applications/$SAAPP_ID" -d "{\"id\":\"$SAAPP_ID\", \"activeVersionId\":\"$BIN_ID\"}"

curl -v -u "management/${USER}:${PASSWORD}" -H "Content-Type: application/vnd.com.nsn.cumulocity.application+json" --location --request PUT "localhost/application/applications/$SAAPP_ID" -d @${UNPACK_DIR}/cumulocity.json

curl -v -u "management/${USER}:${PASSWORD}" --location --request POST "localhost/tenant/tenants/management/applications" --header "Content-Type: application/json" -d "{\"application\":{\"id\":\"$SAAPP_ID\"}}"

# Subscribe edge tenant
curl -v -u "management/${USER}:${PASSWORD}" --location --request POST "localhost/tenant/tenants/edge/applications" --header "Content-Type: application/json" -d "{\"application\": {\"id\":\"$SAAPP_ID\"}}"