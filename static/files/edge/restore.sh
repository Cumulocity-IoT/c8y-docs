#!/bin/bash
#
# Copyright (c) 2018-2022 Software AG, Darmstadt, Germany and/or Software AG USA Inc., Reston, VA, USA, and/or its subsidiaries and/or its affiliates and/or their licensors.
# Use, reproduction, transfer, publication or disclosure is prohibited except as specifically provided for in your License Agreement with Software AG.
#

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

##################################
# Example usage
##################################

# restore.sh # Without any arguments
# "No archive path given!!!"

# restore.sh /migration_data.tgz
# Archive path set to /migration_data.tgz
# Data extracted at /tmp/migration_data

# restore.sh /tmp/migration_data.tgz /output
# Archive path is set to /tmp/migration_data.tgz
# Data extracted at /output

##################################
# Arg parse
##################################

function usage() {
    echo "Usage:"
    echo "    restore.sh ARCHIVE_PATH [EXTRACTED_PATH]"
    echo "    ARCHIVE_PATH is the path to archive created by backup.sh script"
    echo "    EXTRACTED_PATH is the path to where archive will be extracted before applying"
}

ARCHIVE=$1
EXTRACTED_PATH=$2
UI_VERSION=1009.6.0

if [ -z "$ARCHIVE" ]; then
   echo "No archive path given!!!"
   usage
   exit 1;
fi

if [ -z "$EXTRACTED_PATH" ]; then
   EXTRACTED_PATH="/tmp/migration_data/"
fi

##################################
# Main
##################################

echo "Installing zip package needed for restore procedure"
# This will install zip package which is needed to install ui
rpm -ivh http://mirror.centos.org/centos/7/os/x86_64/Packages/zip-3.0-11.el7.x86_64.rpm

echo "Getting application zips from 10.9"
# Create temp dir to get 10.9 apps from mongo
mkdir -p /tmp/apps
out=$(mongo management --quiet --eval 'db.cmdata.files.find({},{"_id":false, "metadata.id":true,"metadata.name":true})' | jq)
csv=$(echo $out | jq -r ".metadata | [.[]] | @csv")
zip_names=""
for l in $csv; do
    id=$(echo $l | cut -f1 -d,)
    name=$(echo $l | cut -f2 -d,)
    mongofiles -d management --prefix cmdata get $(echo "$id" | sed -e 's/^"//' -e 's/"$//') -l /tmp/apps/$(echo "$name" | sed -e 's/^"//' -e 's/"$//')
    chown karaf:karaf /tmp/apps/$(echo "$name" | sed -e 's/^"//' -e 's/"$//')
    zip_names="$zip_names $(echo "$name" | sed -e 's/^"//' -e 's/"$//')"
done
echo "Done downloading application zips from 10.9"

echo "Packaging apps to be visible by karaf"
CPWD=$PWD
cd /tmp/apps
mv /tmp/apps/*streaming-analytics-app* /tmp
zip package-cumulocity-$UI_VERSION.zip $zip_names
chown karaf:karaf package-cumulocity-$UI_VERSION.zip
zip $UI_VERSION.zip package-cumulocity-$UI_VERSION.zip
chown karaf:karaf $UI_VERSION.zip
cd $CPWD

mkdir -p $EXTRACTED_PATH
tar -C $EXTRACTED_PATH -xvzf $ARCHIVE

echo "Started archive restore procedure"
echo "Restoring device-id from 10.7"
DEVICE_ID=$(cat $EXTRACTED_PATH/configs/edge-agent_device-id)
curl -v --header "Content-Type: application/json" --request POST --data '{"device_id":"'$DEVICE_ID'"}' 127.0.0.1:3032/configuration/edge-agent
systemctl restart edge-agent

collections=$(ls $EXTRACTED_PATH/collections)

for c in $collections; do
    mongorestore --drop --db $c $EXTRACTED_PATH/collections/$c
done

echo "Restoring back 10.9 ui components"
chown -R karaf:karaf /webapps/
chown nginx:karaf /webapps
cp -a /tmp/apps/$UI_VERSION.zip /webapps/2Install/

echo "Waiting for webapps to install. If this takes too long please look at /webapps/2Install"
while [ ! -f /webapps/2Install/$UI_VERSION.zip.installed ]; do sleep 1; done

echo "Restoring opcua"
rm -rf /etc/opcua
cp -rp $EXTRACTED_PATH/opcua_data/opcua /etc/

echo "Restoring cumulocity-agent credentials"
cp -rp $EXTRACTED_PATH/cumulocity-agent/credentials /var/lib/cumulocity-agent/credentials

echo "Restarting services"
systemctl restart cumulocity-agent
systemctl restart nginx
systemctl restart cumulocity-core-karaf
monit restart opcua_device_gateway_proc
monit restart opcua_mgmt_service_proc
