#!/bin/bash

#
# Copyright (c) 2018-2022 Software AG, Darmstadt, Germany and/or Software AG USA Inc., Reston, VA, USA, and/or its subsidiaries and/or its affiliates and/or their licensors.
# Use, reproduction, transfer, publication or disclosure is prohibited except as specifically provided for in your License Agreement with Software AG.
#

##################################
# INFO!!!
##################################
# This script uses /tmp as default path for operating on archive.
# Please make sure you have enough space in /tmp before executing.
##################################

##################################
# Example usage
##################################

# backup.sh # Without any arguments
# OUTPUT: /tmp/migration_data.tgz

# backup.sh /output
# OUTPUT: /output/migration_data.tgz

# backup.sh /output /tmp/migration_data.tgz
# OUTPUT: /tmp/migration_data.tgz
# DATA: /output

##################################
# Arg parse
##################################

function usage() {
    echo "Usage:"
    echo "    backup.sh [OUTPUT_DIRECTORY] [ARCHIVE_PATH]"
    echo "    OUTPUT_DIRECTORY by default is /tmp/migration_data"
    echo "    ARCHIVE_PATH by default is OUTPUT_DIRECTORY/migration_data.tgz"
}

OUTPUT=$1
ARCHIVE_PATH=$2

if [ -z "$OUTPUT" ]; then
    OUTPUT="/tmp/migration_data"
fi

if [ -z "$ARCHIVE_PATH" ]; then
    ARCHIVE_PATH="$OUTPUT/migration_data.tgz"
fi
echo "####################################"
echo $OUTPUT
echo "####################################"
echo $ARCHIVE_PATH
echo "####################################"

##################################
# MAIN
##################################

mkdir -p $OUTPUT

OUTPUT_DATA=$OUTPUT/data
OUTPUT_COLLECTIONS=$OUTPUT_DATA/collections
OUTPUT_CONFIGS=$OUTPUT_DATA/configs
OUTPUT_OPCUA=$OUTPUT_DATA/opcua_data
OUTPUT_CUMULO_AGENT=$OUTPUT_DATA/cumulocity-agent
mkdir -p $OUTPUT_COLLECTIONS
mkdir -p $OUTPUT_CONFIGS
mkdir -p $OUTPUT_OPCUA
mkdir -p $OUTPUT_CUMULO_AGENT

mongodump --db=management --out "$OUTPUT_COLLECTIONS"
mongodump --db=edge --out "$OUTPUT_COLLECTIONS"
mongodump --db=docker --out "$OUTPUT_COLLECTIONS"

cp -rp /usr/edge/properties/edge-agent/device-id $OUTPUT_CONFIGS/edge-agent_device-id

cp -rp /etc/opcua $OUTPUT_OPCUA

cp -rp /var/lib/cumulocity-agent/credentials $OUTPUT_CUMULO_AGENT/credentials

tar -C $OUTPUT_DATA -cvzf $ARCHIVE_PATH ./
# rm -rf $OUTPUT_DATA