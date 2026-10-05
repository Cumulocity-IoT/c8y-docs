---
weight: 16
title: Enabling Streaming Lake Ingestion on Microsoft Azure
layout: redirect
---

Streaming Lake Ingestion writes your data into an Azure Data Lake Storage Gen2 container in your Azure subscription. To enable it, you complete a one-time setup: you approve a {{< company-c8y >}} application in your Microsoft Entra directory and assign it two storage roles. Beyond this setup, the service needs no configuration.

{{< c8y-admon-req >}}
* Your {{< product-c8y-iot >}} user has the ROLE_OFFLOADING_ADMIN permission. The **OFFLOADING_ADMINISTRATOR** global role carries it. Assign it to a user in the Administration application under **Accounts** > **Roles**.
* In the Entra directory of your storage account, you have the **Cloud Application Administrator** or **Application Administrator** role to approve the application.
* On the storage account, you have the **Owner** or **User Access Administrator** role to assign the storage roles.
* In the subscription, you have permission to create a storage account, for example, with the **Contributor** role.
{{< /c8y-admon-req >}}

In many organizations, the Entra administrator and the storage administrator are different people. In this case, the Entra administrator signs in during the approval step.

You perform the setup in the Administration application under **Settings** > **Data Lake**. The page guides you through each step and fills in the values that apply to your environment, such as the name of the {{< company-c8y >}} application. Under **Instructions for**, select **Azure portal** or **Azure CLI**. If the page shows "You cannot complete the setup yet", contact [{{< company-c8y >}} support](/additional-resources/contacting-support/).

All steps take place in the Entra directory that the subscription of your storage account belongs to. An approval or role assignment in another directory does not work.

### To create the storage account and container {#to-create-the-storage-account-and-container}

You can also use an existing storage account that has the following settings.

1. In the Azure portal, go to **Storage accounts** > **Create**. Select the subscription and the resource group, and enter a name.
2. On the **Advanced** tab, select **Enable hierarchical namespace**. You cannot enable it later.
3. On the **Advanced** tab, leave **Allow enabling anonymous access on individual containers** cleared.
4. On the **Networking** tab, leave **Enable public network access from all networks** selected.
5. On the **Data protection** tab, select **Enable soft delete for blobs** and **Enable soft delete for containers**, and set a retention period for each.
6. Click **Review + create** and then **Create**.
7. Open the storage account, go to **Data storage** > **Containers**, and create a container with the anonymous access level **Private**.

Enter the names of the storage account and the container on the setup page. Under **Overview** > **Properties**, the storage account shows **Hierarchical namespace: Enabled**.

{{< c8y-admon-important >}}
The setup does not check hierarchical namespace or soft delete. Without hierarchical namespace, the setup succeeds, but ingestion fails later. Without soft delete, you cannot recover deleted data. The service level agreement requires soft delete for production use.
{{< /c8y-admon-important >}}

{{< c8y-admon-caution >}}
To restrict network access to selected networks, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/) first. Your network rules must allow access from the {{< product-c8y-iot >}} environment, and only support can provide the required value.
{{< /c8y-admon-caution >}}

### To approve the application {#to-approve-the-application}

The approval creates an enterprise application for {{< company-c8y >}} in your directory. The application requests no API permissions. It can access only what you grant with the storage roles in the next step.

1. In the Azure portal, go to **Microsoft Entra ID** > **Overview** in the directory of your storage account, and copy the **Tenant ID**.
2. On the setup page, enter the ID as **Entra tenant ID** and click **Consent**.
3. Sign in as an administrator of the directory, review the prompt, and click **Accept**.

![The approval step on the setup page, with the Entra tenant ID field, the Consent button, and the application's display name and client ID](/images/datahub-guide/sli-own-lake-azure-consent.png)

Under **Microsoft Entra ID** > **Enterprise applications**, search for the display name of the application that the setup page shows. The **Application ID** of the entry matches the client ID on the setup page.

### To assign the two roles {#to-assign-the-two-roles}

The two roles need different scopes:

|Role|Scope|
|:---|:---|
|**Storage Blob Data Contributor**|The container|
|**Storage Blob Delegator**|The storage account|

1. In the storage account, go to **Data storage** > **Containers**, open your container, and click **Access control (IAM)** > **Add role assignment**.
2. Select **Storage Blob Data Contributor**. Under **Members**, select **User, group, or service principal** and search for the display name of the application. A search by client ID does not find it.
3. Go to **Access control (IAM)** of the storage account, not of the container, and click **Add role assignment**.
4. Select **Storage Blob Delegator** and add the application as a member in the same way.

On the **Role assignments** tab of the container, search for the display name. The **Scope** column shows **This resource** for **Storage Blob Data Contributor** and the storage account for **Storage Blob Delegator**. If the Delegator shows **This resource**, it is assigned to the container. Remove it and assign it to the storage account.

### To provision the tenant {#to-provision-the-tenant-on-azure}

1. On the setup page, enter a path in the container, or leave it empty to write to the root of the container.
2. In the **Review and provision** step, check the base location `abfss://<container>@<account>.dfs.core.windows.net/<path>`.
3. Select **These values are correct** and click **Save**.

{{< company-c8y >}} creates the Iceberg catalog of your tenant and tests a write and a delegation key request. When all checks pass, the **Setup status** shows "Provisioned", and your data arrives as described in [Using Streaming Lake Ingestion](#using).

{{< product-c8y-iot >}} stores your tables under `<base location>/<tenant-id>/`. Several of your tenants can therefore share one path. You cannot change the base location, the storage account, or the Entra directory after the setup. To change them, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/).

### If something fails {#if-something-fails-on-azure}

If a check fails, the setup page shows the reason. If the catalog was already created, the **Setup status** shows "Provisioning failed". Hover over the icon of a step to see its result. After you fix the cause, click **Retry provisioning**.

|Cause|Solution|
|:---|:---|
|The application cannot be found, or Azure asks for a single-tenant application.|Your account cannot approve applications. Sign in as **Cloud Application Administrator** or **Application Administrator** and approve again.|
|The application does not appear in the member search.|Search by display name. Check that you approved the application in the directory of the storage account.|
|The check for short-lived credentials fails.|**Storage Blob Delegator** is missing or assigned to the container. Assign it to the storage account.|
|The storage cannot be reached.|Check that **Storage Blob Data Contributor** is assigned to the container, and that the storage account allows public network access.|
|The directory is unknown, or authentication fails.|The Entra tenant ID belongs to another directory. Enter the ID of the directory that the subscription of the storage account belongs to.|
|The base location overlaps the location of another tenant.|Choose a path that neither contains nor is contained in the other location. Sharing the same path is allowed.|
|The setup fails right after you assigned the roles.|Role assignments take a few minutes to become effective. Wait and try again.|

If the cause is not listed, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/) with the reason that the setup page shows.

### Adding more tenants {#adding-more-tenants-on-azure}

You approve the application once per Entra directory. For each additional tenant, assign **Storage Blob Data Contributor** on its container and run the setup. **Storage Blob Delegator** is needed only once per storage account.

### Removing access {#removing-access-on-azure}

To stop the data flow, unsubscribe the tenant from Streaming Lake Ingestion. Afterwards, remove the **Storage Blob Data Contributor** assignment of the container. Keep **Storage Blob Delegator** while other tenants use the storage account. To remove access for all your tenants of the environment, delete the enterprise application under **Enterprise applications** and remove the remaining role assignments. The data already written stays in your storage account.

{{< c8y-admon-caution >}}
If you only remove the role assignments, the service treats this as a temporary failure state and still applies the service surcharge for Streaming Lake Ingestion.
{{< /c8y-admon-caution >}}
