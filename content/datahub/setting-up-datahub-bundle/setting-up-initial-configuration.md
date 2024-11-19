---
weight: 30
title: Setting up the initial configuration
layout: redirect
helpcontent:
  - label: setting-up-initial-configuration
    title: Setting up the initial configuration
    content: "The setup of Cumulocity DataHub requires you to configure a **Dremio API user** and access to a **data lake**. The Dremio API user is required for connecting to Dremio and letting you run queries against the data lake contents via JDBC, ODBC, or REST API.


    A data lake is required to store the data being offloaded from a Cumulocity base collection. You must specify the location in the data lake under which the offloaded data will reside."
---

The setup of {{< product-c8y-iot >}} DataHub requires you to configure a Dremio API user and access to a data lake. In the navigator, select **Initial configuration** under **Settings** to define those settings.

{{< c8y-admon-req >}}
You need administration permissions to define the settings. See [Defining {{< product-c8y-iot >}} DataHub permissions and roles](/datahub/setting-up-datahub#defining-permissions) for details.
{{< /c8y-admon-req >}}

### Defining the initial configuration {#defining-the-initial-configuration}

#### Dremio API user {#dremio-api-user}

In order to access the data lake contents, you can use ODBC, JDBC, Dremio REST API, or a proxy REST API. See [Querying offloaded {{< product-c8y-iot >}} data](/datahub/working-with-datahub/#querying-offloaded) for more details. The proxy REST API is served by the {{< product-c8y-iot >}} DataHub server, which acts as a proxy to Dremio. The proxy API requires a Dremio user for the interaction of {{< product-c8y-iot >}} DataHub server and Dremio. This Dremio API user can then also be used for data lake querying based on JDBC, ODBC, or Dremio REST API.

Therefore, you must configure in the initial configuration under **Dremio API user** the name and the password of that Dremio API user.

The name is composed of two parts, with the first part being fixed:

1. Tenant ID plus forward slash
2. String with a minimum length of three, starting with a character, and consisting of numbers, characters, dash, or underline

The password of the Dremio API user must have at least eight characters, including at least one character and one number.

{{< c8y-admon-info >}}
When using the proxy REST API, all queries are processed using the same Dremio API user. The queries are listed in the query log. Thus, the log shows all queries of all users having leveraged the proxy API.  
{{< /c8y-admon-info >}}

Your follow-up application might require more than one Dremio user for accessing the data lake. You can define additional Dremio users for that purpose, using the instructions in [Adding a Dremio user](/datahub/setting-up-datahub/#adding-a-dremio-user).

#### Data Lake {#data-lake}
Depending on the configuration of the environment, the data lake provider is either fixed or you can choose among different providers. For each data lake provider, you must specify corresponding settings to define the data lake to be used.

The following types of data lakes are currently supported:

##### Azure Storage {#azure-storage}
**Azure Storage** is a set of cloud storage services offered by Microsoft. {{< product-c8y-iot >}} DataHub supports Azure Data Lake Storage Gen2, which is part of these services. The following settings must be defined for this data lake:

|Settings|Description|
|:---|:---|
|Azure Storage account name|The name of the Azure storage account|
|Azure Storage container|The name of the storage container; it must be between 1 and 63 characters long and may contain alphanumeric characters (letters and numbers) as well as dashes (-)|
|Root path|The root path within your data lake for storing the offloaded data. With the default path /, data is stored top-level in your storage container. You can also store data in a subfolder, provided the folder already exists. For example, for storage container `myContainer` and subfolder `mySubFolder`, use `/myContainer/mySubFolder` as root path. This option is especially useful to hide other data inside the container from {{< product-c8y-iot >}} DataHub, for example, when the container is also used by other users or applications.|
|Azure Storage shared access key|The access key used for authentication if "Shared Access Key" is used as authentication type|
|Application ID|The application ID used for authentication if "Azure Active Directory" is used as authentication type|
|OAuth 2.0 Token Endpoint|The authentication endpoint if "Azure Active Directory" is used as authentication type|
|Client Secret|The client secret if "Azure Active Directory" is used as authentication type|

While the other settings are fixed once the initial configuration was saved, the authentication type as well as the values of the selected authentication type can be changed afterwards. Click **Edit**, set new values, and either click **Save credentials** to save the update or **Cancel** to keep the old values.

{{< c8y-admon-req >}}
Note that the account type must be **StorageV2**, and the **Hierarchical namespace** feature must be activated for the corresponding Azure Storage account. It is for performance reasons recommended to set the **Blob access tier** to **Hot**. Also note that in case IP white-listing is activated, {{< product-c8y-iot >}} DataHub might not be able to access the data lake if the data lake and {{< product-c8y-iot >}} DataHub reside in the same Azure region. See also the corresponding [documentation](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security?tabs=azure-portal#grant-access-from-an-internet-ip-range).
{{< /c8y-admon-req >}}

##### Amazon S3 {#amazon-s3}
**Amazon S3** is an object storage service offered by Amazon Web Services. The following settings must be defined for this data lake:

|Settings|Description|
|:---|:---|
|AWS access key|The access key|
|Access secret|The access secret|
|Bucket name|The name of the S3 bucket; it must be between 1 and 63 characters long and may contain alphanumeric characters (letters and numbers) as well as dashes (-)|
|Root path in bucket|The root path within the S3 bucket; default root path is /; setting a subfolder allows you to hide other data in the bucket from {{< product-c8y-iot >}} DataHub|

While the other settings are fixed once the initial configuration was saved, the **AWS access key** and the **Access secret** can be changed afterwards. Click **Edit**, set new values, and either click **Save credentials** to save the update or **Cancel** to keep the old values.

{{< c8y-admon-req >}}
An S3 bucket with default settings works. If specific security policies are applied, make sure that the minimum policy requirements listed in [https://docs.dremio.com/current/sonar/data-sources/object/s3](https://docs.dremio.com/current/sonar/data-sources/object/s3) are satisfied.
{{< /c8y-admon-req >}}

**Server-side encryption** is supported while client-side encryption is not. S3 offers three key management mechanisms:

**SSE-S3**: An AES256 key is generated in S3 and saved alongside the data. Enabling SSE-S3 requires to add the following key-value pair to the **Additional Properties** sector:\
Name: `fs.s3a.server-side-encryption-algorithm`\
Value: `AES256`

**SSE-KMS**: An AES256 key is generated in S3, and encrypted with a secret key provided by Amazon’s Key Management Service (KMS). The key must be referenced by name by {{< product-c8y-iot >}} DataHub. Enabling SSE-KMS requires to add the following key-value pairs to the **Additional Properties** sector:\
Name: `fs.s3a.server-side-encryption-algorithm`\
Value: `SSE-KMS`

Name: `fs.s3a.server-side-encryption.key` \
Value: Your key name, for example, `arn:aws:kms:eu-west-2:123456789012:key/071a86ff-8881-4ba0-9230-95af6d01ca01`

**SSE-C**: The client specifies an base64-encoded AES-256 key to be used to encrypt and decrypt the data. **{{< product-c8y-iot >}} DataHub does not support this option.**

##### NAS {#nas}
**NAS** is a storage system mounted (NFS, SMB) directly into the Dremio cluster. It is only available for {{< product-c8y-iot >}} Edge installations. The following settings must be defined for this data lake:

|Settings|Description|
|:---|:---|
|Mount path|The mount path refers to a path in the local Linux file system on both the coordinator and executor containers. By default, the file system of {{< product-c8y-iot >}} Edge is mounted into /datalake inside the containers. To use some other folder, you must map the folder into both containers, for example, to /datalake inside the containers.|

##### HDFS {#hdfs}
**HDFS** is the Hadoop Distributed File System, which is a distributed, scalable file system designed for running on commodity hardware. The following settings must be defined for this data lake:

|Settings|Description|
|:---|:---|
|Namenode host|The host name of the HDFS NameNode|
|Namenode port|The port of the HDFS NameNode|
|Root path|The root path within the HDFS filesystem for storing offloaded data; default root path is /; setting a subfolder allows you to hide other data in the filesystem from {{< product-c8y-iot >}} DataHub|
|Short-circuit local reads|If enabled, Dremio can directly open the HDFS block files; default is disabled|
|Enable impersonation|If disabled, all requests against HDFS will be made using the user *dremio*; if enabled, the tenant name will be used to access HDFS; prerequisite is that the user has rwx-permissions for the given root path. Note that the user *dremio* is used for some operations even when impersonation is enabled. Thus, it must have appropriate permissions in any case.|
|Allow VDS-based access delegation|If enabled, data used in virtual datasets (VDS) will be requested from HDFS using the username of the owner of the VDS; if disabled, the name of the user logged into Dremio is used|
|Impersonation user delegation|Defines whether an impersonated username is either *As is*, *Lowercase*, or *Uppercase*|

{{< c8y-admon-info >}}
Impersonation is supported and may be used. However, when impersonation is enabled, Dremio uses the tenant ID as username for querying HDFS, not the actual username. For example, if "t12345/user" is the logged in user, Dremio will use "t12345" for HDFS requests. Thus, granting file system permissions is only possible on a per-tenant basis and not on a per-user basis. Also note that the user *dremio* is used for some operations even when impersonation is enabled. Thus, it must have appropriate permissions in any case.
{{< /c8y-admon-info >}}

For **Azure Storage**, **Amazon S3**, and **HDFS** data lakes, you can also define additional connection properties. Click **Add property** and define an additional property consisting of a key/value pair.

#### Saving settings {#saving-settings}
Once all settings are defined, click **Save** in the action bar to the right. During the save process, the following steps are automatically conducted:

* A Dremio API user is created; the user has standard Dremio user privileges, not admin privileges.
* A data lake connection in Dremio is created using the provided data lake settings. For Dremio that connection is technically spoken a source. In our context we refer to it as **target table** as this data lake is used for storing the offloaded data.
* A source in Dremio is created which connects to the Operational Store of {{< product-c8y-iot >}}. That source is not visible to the Dremio API user.
* A space in Dremio is created which you can use to organize your custom Dremio entities such as views. The name of the space is your tenant ID concatenated with 'Space', for example, t12345Space.

### Editing settings {#editing-settings}
To edit the Dremio API user, click **Edit** in the **Dremio API user** section of the **Initial configuration** page. In the editor you can edit all user details, except for the username, which is fixed. In [Editing a Dremio user](/datahub/setting-up-datahub/#editing-a-dremio-user), all user details are described.

The data lake settings cannot be edited, except for the **Azure Storage** or **Amazon S3** credentials. For editing other values, you must delete the existing settings and define new settings. If you want to keep your offloading configurations, you must export the configurations to a backup file beforehand, delete the settings, define new settings, and import the configurations from the backup file. See [Importing/exporting offloading configurations](/datahub/working-with-datahub/#importingexporting-offloading-configurations) for details on import/export.

### Deleting settings {#deleting-settings}
Click **Delete** in the action bar to delete the settings. During deletion, all Dremio artifacts which were created when saving the settings are deleted, including the Dremio API user as well as additionally created Dremio users. Also the artifacts created by a corresponding Dremio user, like views, are deleted. All offloading pipelines and their histories are deleted; active pipelines are deleted after completing the current offloading. As mentioned in the previous section, you can use the import/export functionality to backup your offloading configurations. The data lake and its contents are not deleted, only the Dremio artefacts connecting to the data lake. To delete the data lake and its contents you must use the tooling of your data lake provider.
