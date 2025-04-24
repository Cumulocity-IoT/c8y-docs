---
weight: 20
title: Managing the connectivity settings
layout: redirect
---


Before you register a device, you must configure the Sigfox Cloud credentials in the **Connectivity** page in the Administration application. You must set up these Sigfox Cloud credentials in Sigfox.

Before you create API access to {{< product-c8y-iot >}}, you must have an "Associated user" which is added to the {{< product-c8y-iot >}} group in Sigfox Cloud and has the following profiles:

- Customer [R]
- Device Manager [W]

{{< c8y-admon-important >}}
Without the profiles described below, the required Sigfox API access can not be set up.
{{< /c8y-admon-important >}}

### Step 1 {#step-1}

If you already have an associated user make sure it has the profiles mentioned below and proceed to step 2.

The group name is not constrained. "Cumulocity" is used as a sample group name throughout the remaining steps.

First, enter into your Sigfox Cloud account and create a new user. Add the user to the group and select the "Customer [R]" and "Device Manager [W]" profiles.

![New user](/images/device-protocols/sigfox/sigfox-newuser.png)

### Step 2 {#step-2}

After creating an "Associated user" with the proper group and profiles navigate to the **Groups** page. In the **API access** tab, create a new entry and add the following profiles:

- Customer [R]
- Device Manager [W]

![API access page](/images/device-protocols/sigfox/sigfox-api-access.png)

### Step 3 {#step-3}

After the API access entry has been created, you can connect your Sigfox Cloud account to {{< product-c8y-iot >}} via the **Connectivity** page in the Administration application. Navigate to the **Connectivity** page and switch to the **Sigfox provider settings** tab.

The **Connectivity** tab facilitates creating, updating, and deleting multiple Sigfox connections.

The following information must be provided in order to create a connection:

- **Name**: Name of the Sigfox connection being created.
- **Description**: Description of the Sigfox connection being created.
- **Login:** The login token is located in the API access entry in the Sigfox Cloud.
- **Password:** The password token is located in the API access entry in the Sigfox Cloud next to **Password**.
- **Parent Group ID:** This ID is written in your URL when you are logged into your Sigfox account and you have selected the "{{< company-c8y >}}" group. For example, *https://backend.sigfox.com/group/**9823ruj29j9d2j9828hd8**/info*.
- **Base URL:** URL that points to the Sigfox Cloud account.

{{< c8y-admon-info >}}
The group name in the screenshot below is only an example. It does not necessarily have to be "{{< company-c8y >}}".
{{< /c8y-admon-info >}}

![Sigfox group ID](/images/device-protocols/sigfox/sigfox-parentgroupid.png)

![Sigfox connectivity update](/images/device-protocols/sigfox/sigfox-connectivity-update.png)

Click **Save**. If you have entered the correct information, the message "Credentials successfully saved" will be displayed.

To add another connection, click **Add Connection** and follow the steps above.

### To update a connection {#to-update-a-connection}

Select the connection to be updated, make your edits, and save the connection.

If there are devices associated with the connection, an error message will appear, stating "Can not update the LNS Connection with `<name of LNS Connection>` as it's associated with `<number of devices>`. Click the link to download the file with the details of the associated devices: `/service/<agent-context-path>/lns-connection/<lns-connection-name>/device`".
![Update connection information](/images/device-protocols/sigfox/sigfox-connectivity-update.png)

###  To delete a connection {#-to-delete-a-connection}

Select the connection to be deleted and click **Delete**.

If there are devices associated with the connection, an error message will appear, stating "Can not delete the LNS Connection with `<name of LNS Connection>` as it's associated with `<number of devices>`. Click the link to download the file with the details of the associated devices: `/service/<agent-context-path>/lns-connection/<lns-connection-name>/device`".
![Delete connection information](/images/device-protocols/sigfox/sigfox-admin-settings-delete.png)

#### Authentication to the Sigfox platform failed {#authentication-to-the-sigfox-platform-failed}

Authentication to the Sigfox platform failed. Check if the Parent group ID and/or the credentials are correct.

To resolve this, provide a correct baseUrl or parent group ID or username or password and try again.
