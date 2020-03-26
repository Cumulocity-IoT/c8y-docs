---
weight: 20
title: Setting up DataHub Edge
layout: redirect
---

### Prerequisites

Before setting up DataHub Edge, you have to check the following prerequisites:

| Item | Details |
| -----   | -----   |
| Cumulocity IoT Edge | The local version of Cumulocity IoT is set up on a Virtual Machine (VM). See also section [Setting up Cumulocity IoT Edge](/edge/installation). |
| DataHub Edge archive | You have downloaded the archive with all installation artifacts from the [Software AG Empower portal](https://empower.softwareag.com/). |
| Internet access | Internet access is not required. |

### Setting up DataHub Edge

Copy the DataHub Edge archive to the Cumulocity IoT Edge.

```shell	
scp datahub-<version>.tgz admin@<edge_ip_address>:/tmp
```

Log in as admin into Cumulocity IoT Edge.

```shell	
ssh admin@<edge_ip_address>
```

Run the install script.

```shell	
sudo /opt/c8y/utilities/install_signed_package.sh /tmp/datahub-<version>.tar
```

It takes a few minutes to complete the installation. After completion you can delete the DataHub Edge archive.

The install script runs the following basic steps:
* Deploy the DataHub Edge UI as web application to Cumulocity IoT Core.
* Start a Docker container with the DataHub Edge backend and the database system for managing the backend state.
* Start a Docker container with the Dremio master and a ZooKeeper instance.
* Start a Docker container with the Dremio executor.
* Configure corresponding roles and permissions in Cumulocity IoT Core.

The Docker containers will be restarted automatically in case the container itself fails or the applications within are no more reachable.

The containers are configured to store their application state on the data disk under **/opt/mongodb**:
* **/cdh-server/data**: the state of the Dremio master
* **/cdh-executor/data**: the state of the Dremio executor
* **/cdh-console/db**: the state of the DataHub Edge backend
* **/cdh-server/datalake**: the data lake folder

>**Warning**: You must not modify the contents of these folders as this may corrupt your installation.

### Accessing DataHub Edge

The different DataHub Edge interfaces can be accessed in the same way as in a cloud deployment of DataHub.

| Interface | Description |
| -----   | -----   |
| DataHub Edge UI | The UI can be accessed in the **application switcher** after you have logged into the Cumulocity IoT Edge UI. Alternatively you can access it directly under *http://<edge_domain_name>/apps/datahub-ui* or *https://<edge_domain_name>/apps/datahub-ui*, depending on whether TLS/SSL is used or not. A login is required as well. |
| Dremio UI | On the DataHub Edge home page you will find a link to the Dremio UI. Alternatively you can access it directly under *http://datahub.<edge_domain_name>* or *https://datahub.<edge_domain_name>*, depending on whether TLS/SSL is used or not. You can log in as *admin* using password *'datahub4edge@customer!'*. |
| DataHub JDBC/ODBC | You find the connection settings for JDBC/ODBC in the DataHub Edge UI on the **Home** page. |
| DataHub REST API | The path of the microservice which hosts the API is *https://<edge_domain_name>/service/datahub*. |
| Dremio REST API | The Dremio URL to run REST API requests against is either *http://datahub.<edge_domain_name>* or *https://datahub.<edge_domain_name>*, depending on whether TLS/SSL is used or not. |

> **Info**: For JDBC/ODBC you have to configure Cumulocity IoT Edge so that port 31010 can be accessed from the host system. For instructions on port forwarding see section "Setting up port forwarding" under [Setting up the environment](/edge/installation/#setting-up-the-environment).

### Defining DataHub permissions and roles

The definition and assignment of permissions and roles is done in the same way as in a cloud deployment. See section [Defining DataHub permissions and roles](/datahub/setting-up-datahub/#defining-permissions) for details.

### Setting up Dremio account and data lake

The setup of the Dremio account and the data lake is done in the same way as in a cloud deployment. See section [Setting up Dremio account and data lake](/datahub/setting-up-datahub/#setting-up-dremio-datalake) for details.

DataHub Edge is configured to use an NAS as data lake. When configuring the NAS use as mount path */datalake*. This path is mounted to */opt/mongodb/cdh-master/datalake*.