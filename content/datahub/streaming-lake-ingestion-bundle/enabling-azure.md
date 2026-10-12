---
weight: 16
title: Enabling Streaming Lake Ingestion on Microsoft Azure
layout: redirect
---

Streaming Lake Ingestion writes your data into an Azure Data Lake Storage Gen2 container in your Azure subscription. To enable it, you complete a one-time setup in which you approve a {{< product-c8y-iot >}} application in your Microsoft Entra directory and grant it access to the container. Beyond this setup, Streaming Lake Ingestion needs no configuration.

You perform the setup on the **Data Lake configuration** page. In the Administration application, click **Settings** > **Data Lake**. The page guides you through each step, with instructions for the Azure portal and the Azure CLI, and fills in the values for your environment. If the page shows "You cannot complete the setup yet", contact [{{< company-c8y >}} support](/additional-resources/contacting-support/).

### Before you start {#before-you-start-on-azure}

{{< c8y-admon-req >}}
* Your {{< product-c8y-iot >}} user has the ROLE_OFFLOADING_ADMIN permission. The OFFLOADING_ADMINISTRATOR global role carries it. Assign it to a user in the Administration application under **Accounts** > **Roles**.
* In the Entra directory of your storage account, you have the **Cloud Application Administrator** or **Application Administrator** role to approve the application.
* On the storage account, you have the **Owner** or **User Access Administrator** role to assign roles.
* In the subscription, you have permission to create a storage account, for example, with the **Contributor** role.
{{< /c8y-admon-req >}}

The storage account must meet the following requirements:

* Hierarchical namespace is enabled. You cannot enable it later. The setup does not check it: without it, the setup succeeds, but ingestion fails later.
* The account kind is StorageV2.
* Public network access is enabled from all networks. To restrict access to selected networks, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/) first, because only support can provide the value that your network rules need.
* Anonymous access is disabled.
* Soft delete is enabled for blobs and for containers. The service level agreement requires it for production use.

All steps take place in the Entra directory that the subscription of your storage account belongs to. An approval or role assignment in another directory does not work.

### Setting up the tenant {#setting-up-the-tenant-on-azure}

The **Data Lake configuration** page leads you through the following steps:

1. **Create the storage account and container**: Create a storage account and a container that meet the requirements above, and enter their names.
2. **Approve the Streaming Lake Ingestion application**: Enter the ID of your Entra directory as **Entra tenant ID**, click **Consent**, and accept the prompt as an administrator of the directory. The approval creates an enterprise application for {{< product-c8y-iot >}} in your directory. The application requests no API permissions.
3. **Assign the two roles**: Assign the application the **Storage Blob Data Contributor** role on the container and the **Storage Blob Delegator** role on the storage account. Optionally, assign it the **Reader** role on the storage account, so that the setup can check soft delete.
4. **Provision the tenant**: Enter a path in the container, or leave it empty to use the root of the container.
5. **Review and provision**: Check the base location `abfss://<container>@<account>.dfs.core.windows.net/<path>`, select **These values are correct**, and click **Save**.

When you click **Save**, {{< product-c8y-iot >}} creates the Iceberg catalog of your tenant and tests a write and a delegation key request. If you assigned **Reader**, it also checks soft delete. If soft delete is off, the setup completes and your data arrives, but the page shows a warning and the **Setup status** shows "Provisioning failed" until you enable it and click **Retry provisioning**. When all checks pass, the **Setup status** shows "Provisioned", and your data arrives as described in [Using Streaming Lake Ingestion](#using).

{{< product-c8y-iot >}} stores your tables under `<base location>/<tenant-id>/`. Several of your tenants can therefore share one path. You cannot change the base location, the storage account, or the Entra directory after the setup. To change them, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/).

### What the access consists of {#what-the-access-consists-of-on-azure}

After the setup, the following objects give {{< product-c8y-iot >}} access. If you delete them or reduce what they allow, ingestion stops:

* The enterprise application of {{< product-c8y-iot >}} in your Entra directory, created by the approval.
* The **Storage Blob Data Contributor** role of the application on the container.
* The **Storage Blob Delegator** role of the application on the storage account. Assigned on the container, it does not work.
* Optionally, the **Reader** role of the application on the storage account.

### If something fails {#if-something-fails-on-azure}

If a check fails, the **Data Lake configuration** page shows the reason. If the catalog was already created, the **Setup status** shows "Provisioning failed". Hover over the icon of a step to see its result. After you fix the cause, click **Retry provisioning**.

|Cause|Solution|
|:---|:---|
|The application cannot be found, or Azure asks for a single-tenant application.|Your account cannot approve applications. Sign in as **Cloud Application Administrator** or **Application Administrator** and approve again.|
|The application does not appear in the member search.|Search by display name. Check that you approved the application in the directory of the storage account.|
|The check for short-lived credentials fails.|**Storage Blob Delegator** is missing or assigned to the container. Assign it to the storage account.|
|The storage cannot be reached.|Check that **Storage Blob Data Contributor** is assigned to the container, and that the storage account allows public network access.|
|The directory is unknown, or authentication fails.|The Entra tenant ID belongs to another directory. Enter the ID of the directory that the subscription of the storage account belongs to.|
|The base location overlaps the location of another tenant.|Choose a path that neither contains nor is contained in the other location. Sharing the same path is allowed.|
|The page warns that data loss protection is off.|Soft delete is off for blobs or for containers. Enable both, then click **Retry provisioning**.|
|The setup fails right after you assigned the roles.|Role assignments take a few minutes to become effective. Wait and try again.|

If the cause is not listed, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/) with the reason that the **Data Lake configuration** page shows.

### Adding more tenants {#adding-more-tenants-on-azure}

You approve the application once per Entra directory. For each additional tenant, assign **Storage Blob Data Contributor** on its container and run the setup. **Storage Blob Delegator**, and **Reader** if you use it, are needed only once per storage account.

### Removing access {#removing-access-on-azure}

To stop the data flow, unsubscribe the tenant from Streaming Lake Ingestion. Afterwards, remove the **Storage Blob Data Contributor** assignment of the container. Keep **Storage Blob Delegator** while other tenants use the storage account. To remove access for all your tenants of the environment, delete the enterprise application under **Enterprise applications** and remove the remaining role assignments. The data already written stays in your storage account.

{{< c8y-admon-caution >}}
If you only remove the role assignments, Streaming Lake Ingestion treats this as a temporary failure state and still applies the service surcharge.
{{< /c8y-admon-caution >}}
