---
weight: 30
title: Integrating Cumulocity DataHub with Microsoft Power BI
helpcontent:
  - label: configuring-powerbi-access
    title: Configuring access to Microsoft Power BI reports
    content: "Microsoft Power BI is a business intelligence tool which allows you to create and use interactive reports for data from various sources. In particular, the reports can consume your IoT data stored in a data lake using Dremio as query and data access layer.


    To view those reports in Cumulocity DataHub, you need an **Azure Active Directory tenant** with an application that can interact with Microsoft Power BI. You neither must sign in to Microsoft Power BI nor do you need a Microsoft Power BI license to access the reports. For access authentication an **Azure Active Directory service principal** object with an application secret is used.


    Once you have configured the Microsoft Power BI connection, you can access corresponding workspaces and published reports under **Microsoft Power BI** in the **Navigator**."
  - label: working-with-reports
    title: Working with reports
    content: "Once the Microsoft Power BI settings have been defined, you can work with published reports.


    Click **Add report** to list all available workspaces and reports. All workspaces which grant member or admin access to the service principal are listed. Select a workspace and then a report from that workspace. You can open multiple reports. To close a report click **Remove report**.


    The list of currently opened reports is not stored. It will be flushed when the browser is closed or settings are deleted."
---

Microsoft Power BI is a business intelligence tool which allows you to create and use interactive reports for data from various sources. These reports can also be built on your IoT data. Given your devices are connected with the {{< product-c8y-iot >}} platform, you can utilize {{< product-c8y-iot >}} DataHub to offload the data into a data lake of your choice. Then you can create a Microsoft Power BI report which is based on the data in the data lake. {{< product-c8y-iot >}} DataHub allows you to access and work with these reports from within the {{< product-c8y-iot >}} DataHub web frontend.

### Prerequisites {#prerequisites}

Before setting up the connection to Microsoft Power BI in {{< product-c8y-iot >}} DataHub, conduct the following steps.

#### Accessing data lakes in Microsoft Power BI reports {#accessing-data-lakes-in-microsoft-power-bi-reports}

{{< product-c8y-iot >}} DataHub leverages the native interaction between Microsoft Power BI and Dremio. Microsoft Power BI reports can consume data from data lakes using Dremio as query and data access layer. When creating a new report in Microsoft Power BI desktop, you can select [Dremio as a database](https://docs.dremio.com/current/sonar/client-applications/clients/microsoft-power-bi/) and establish a connection to the Dremio cluster, using the ODBC connection settings as provided on the homepage of the {{< product-c8y-iot >}} DataHub UI. With this connection you have access to the data lakes connected to Dremio.

{{< c8y-admon-info >}}
The Microsoft Power BI datasets should use the DirectQuery mode, which prevents replicating and caching the data from the data lake.
{{< /c8y-admon-info >}}

In contrast to versions prior to 10.18, it is no longer required to deploy a Microsoft Power BI gateway. A native connector from Power BI Web to Dremio is available now.

#### Configuring access to Microsoft Power BI reports {#configuring-access-to-microsoft-power-bi-reports}

To make reports available in its web frontend, {{< product-c8y-iot >}} DataHub embeds Microsoft Power BI content. Users neither must sign in to Microsoft Power BI nor need a Microsoft Power BI license to access the reports. For access authentication an Azure Active Directory service principal object with an application secret is used.

The following configuration steps are required, as discussed in detail in the corresponding [Microsoft documentation](https://docs.microsoft.com/en-us/power-bi/developer/embedded/embed-sample-for-customers).

As prerequisite you need an Azure Active Directory tenant. If you do not have an Azure Active Directory tenant, follow the instructions in the [Microsoft documentation](https://docs.microsoft.com/en-us/power-bi/developer/embedded/create-an-azure-active-directory-tenant).

Next you must register an Azure Active Directory application, which serves as service principal. You must configure the service principal application to access the REST APIs of Microsoft Power BI, following the instructions on the [Microsoft Power BI website](https://app.powerbi.com/embedsetup):

1. Select **Embed for your customers**.
2. Sign in to Microsoft Power BI.
3. Register an application with respective permissions.
4. Skip creating a workspace and importing content.
5. Grant permissions to the service principal.

{{< c8y-admon-info >}}
An application created with the wizard can be used as a service principal.
{{< /c8y-admon-info >}}

Alternatively, you can create a service principal application following the section *Creating an Azure AD app in the Microsoft Azure portal* in the [Microsoft documentation](https://docs.microsoft.com/en-us/power-bi/developer/embedded/embed-service-principal).

Additionally, you must add a client secret for the service principal application. You can do that via the [Azure portal](https://portal.azure.com/). Search for **App registrations**, select your application by its name under **All applications**, and click the link next to the **Client credentials** entry on the **Overview** page of the application.

Next you can define a workspace to organize your reports. By adding the service principal application as a member or admin to the workspace, it can access the reports of the workspace. Go to the [Microsoft Power BI website](https://app.powerbi.com) and conduct the following steps to grant the permissions:

1. Sign in to Microsoft Power BI.
2. Click **Workspaces**.
3. Select the context menu of the workspace to share with the service principal.
4. Select **Workspace access**.
5. Enter the name of your recently created service principal application and grant the *Member* or *Admin* permission.

Only workspaces granting access to the service principal application can be browsed from within {{< product-c8y-iot >}} DataHub. Once the workspace is available, you can publish reports to it and access it in {{< product-c8y-iot >}} DataHub.

### Setting up the connection in {{< product-c8y-iot >}} DataHub {#setting-up-the-connection-in-datahub}

In the navigator, select **Settings** and then **Microsoft Power BI** to define the connection settings.

|Settings|Description|
|:---|:---|
|Azure Active Directory tenant ID|The ID of the Azure Active Directory tenant. Within the tenant, an Azure Active Directory application must exist with a service principal that is allowed to access corresponding resources of Microsoft Power BI.|
|Client ID|The ID of the Azure Active Directory application which has permissions to call the REST APIs of Microsoft Power BI.|
|Client secret|The client secret, which is configured for the Azure Active Directory application.|

Once all settings are completed, click **Save** on the action bar to save the settings and establish the connection.

If you want to delete the settings, click **Delete** on the action bar. You cannot access reports afterwards.

### Working with reports {#working-with-reports}

Once the settings are defined, you can access and work with the reports.

1. In the navigator, select **Microsoft Power BI**. The menu entry is only shown if the connection settings are defined.

2. On the **Reports** page, click **Add report** in the action bar. A dialog opens with two dropdown boxes. The first dropdown box lists all workspaces which grant member or admin access to the service principal. Select the workspace you are interested in. The second dropdown box provides all reports of the selected workspace. Select a report from the dropdown box.

3. Click **Select** to open the report or **Cancel** to close the dialog without selecting a report.

The selected report is shown and can be interacted with. You can open multiple reports. For each opened report, a tab entry shows up in the action bar. To close the currently selected report, click **Remove report** in the action bar.

{{< c8y-admon-info >}}
The list of currently opened reports is not stored permanently. When closing the browser, the list will be flushed. It will also be flushed if the settings are deleted.
{{< /c8y-admon-info >}}
