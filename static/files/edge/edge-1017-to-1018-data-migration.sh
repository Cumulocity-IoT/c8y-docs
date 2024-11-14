#!/bin/bash
set -e  # Exit script on failure
#set -x # debug mod

# RUN THIS SCRIPT USING BASH:  bash ./edge-1017-to-1018-data-migration.sh        

# Function Definitions
function stop_services_old_VM() {
    echo "Stopping services in 10.17 appliance"
    sshpass -p $edge_10_17_OS_ROOT_PASSWORD ssh root@$edge_10_17_VM_IP "monit unmonitor all; systemctl stop installation-service opcua-mgmt-service opcua-device-gateway smartrule apama cumulocity-core-karaf mongod"
    #always try to stop cdh services if cdh installed or not and ignore error.
    sshpass -p $edge_10_17_OS_ROOT_PASSWORD ssh root@$edge_10_17_VM_IP "service cdh-console stop || true"
    sshpass -p $edge_10_17_OS_ROOT_PASSWORD ssh root@$edge_10_17_VM_IP "service cdh-master stop || true"
    sshpass -p $edge_10_17_OS_ROOT_PASSWORD ssh root@$edge_10_17_VM_IP "service cdh-executor stop || true"
}

function perform_data_transfer() { 
    # Stop the services
    echo "Stopping services in 10.18 appliance"
    monit unmonitor all
    systemctl stop installation-service opcua-mgmt-service opcua-device-gateway smartrule apama cumulocity-core-karaf mongod

    # Perform all scp operations 
    echo "Copying data and configuration from 10.17 appliance."

    echo "Copying MongoDB data."
    rm -rf /opt/mongodb/*
    sshpass -p $edge_10_17_OS_ROOT_PASSWORD scp -r root@$edge_10_17_VM_IP:/opt/mongodb /opt

    echo "Copying cumulocity-agent configurations."
    sshpass -p $edge_10_17_OS_ROOT_PASSWORD scp -r root@$edge_10_17_VM_IP:/var/lib/cumulocity-agent /var/lib
    sshpass -p $edge_10_17_OS_ROOT_PASSWORD scp -r root@$edge_10_17_VM_IP:/usr/edge /usr

    echo "Copying OPCUA service and agent configurations."
    sshpass -p $edge_10_17_OS_ROOT_PASSWORD scp -r root@$edge_10_17_VM_IP:/opt/opcua /opt
   
    sshpass -p $edge_10_17_OS_ROOT_PASSWORD scp -r root@$edge_10_17_VM_IP:/opt/softwareag/  /opt

    # Update ownership and configurations
    echo "Updating folder/file ownerships."
    chown -R mongod:mongod /opt/mongodb
    chown -R root:root /opt/opcua
    chown -R root:root /var/lib/cumulocity-agent
    chown -R edge-agent:edge-agent /usr/edge
    chown -R  root:root /opt/softwareag

    if [ -d "/opt/mongodb/cdh-master" ]; then
        #It seems ,in rocky it using one of the systemd user
        chown -R systemd-coredump:systemd-coredump /opt/mongodb/cdh-*
    fi
}


function main() {
    # Check if the script is running as root
    if [ "$(id -u)" -ne 0 ]; then
        echo "This script must be run as root" 1>&2
        exit 1
    fi
    
    echo -e "\033[0;32m #########################################################\033[0m"
    read -p "IP Address of the Egde 10.17 appliance : " edge_10_17_VM_IP
    read -sp "root password of the Egde 10.17 appliance: " edge_10_17_OS_ROOT_PASSWORD
    echo

    sshpass -p $edge_10_17_OS_ROOT_PASSWORD ssh -o StrictHostKeyChecking=no root@$edge_10_17_VM_IP ls || (echo -e "\033[31mCheck provided root password is correct (or) root ssh enabled in Edge 10.17 appliance.\033[0m"; exit 1)
    
    stop_services_old_VM
    perform_data_transfer

    echo -e "\033[0;32m Successfully copied the data and configuration from Edge 10.17 appliance. \033[0m"
    echo -e "\033[0;32m Reboot the appliance and follow the instructions in the user guide to update and configure the Edge 10.18 appliance. \033[0m"
    if [ -d "/opt/mongodb/cdh-master" ]; then
        echo -e "\033[0;32m After Edge is updated and configured, follow the instructions in the user guide to install and configure DataHub.\033[0m"
    fi
}

# Call the main function
main
