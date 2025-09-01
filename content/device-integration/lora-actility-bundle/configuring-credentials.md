---
weight: 20
title: Configuring multiple ThingPark account connections
layout: redirect
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:39Z'
---
Before using LoRa devices with {{< product-c8y-iot >}}, you need to configure your ThingPark account details in the Administration application. Click the **Connectivity** tab in the **Settings** menu to create, edit, delete or update multiple Actility connections.

### To add a new connection {#to-add-a-new-connection}

If you select **Connectivity** for the first time, you are asked to create a connection. Click **Add Connection**.

Enter the following information:


| Setting name | Notes |
|--------------|--------|
| Name | The name of the Actility connection being created |
| Description | The description of the Actility connection being created |
| Actility ThingPark URL | Base URL of the corresponding Actility DX API being used |
| Profile ID | Your ThingPark account profile identifier |
| Application Server ID | Application server ID for TLS security between ThingPark platform and agent. Optional field. Leave empty to disable security. If enabled, agent will generate a token for all uplink and down-link messages |
| Application Server Key | Application server private key for TLS security between ThingPark platform and agent for uplink and downlink communications. Value should be in hex and 16 bytes. Optional field. Leave empty to disable security. If enabled, agent will generate a token for all uplink and down-link messages |
| Admin API version | Version that the ThingPark admin API uses. By-default set to "latest" |
| Core API version | Version that the ThingPark core API uses. By-default set to "latest" |
| Username | Your ThingPark account username |
| Password | Your ThingPark account password |
| Connection Type | The ThingPark account type that is being used (Enterprise or Wireless) |

#### Environment-specific information

The following settings vary depending on your ThingPark environment:

**ThingPark community:**
- URL: https://community.thingpark.io/thingpark/dx/
- Profile ID: community-api
- Application server ID and key: Leave empty (HTTPS used internally)
- Connection type: Choose Enterprise

**Other environments (Enterprise/Wireless):**
- URL: Contact ThingPark support
- Profile ID: Contact ThingPark support
- Application server ID and key:  Look up in your application server profile in Thingpark or contact Thingpark support
- Connection type: Choose based on your environment (Enterprise or Wireless)

{{< c8y-admon-info >}}
Do not use the same ThingPark login (username and password) for other tenants.
The profile ID, username and password are used to retrieve an access token to send further requests to the ThingPark platform. It is possible to renew the access token by replacing the account credentials for a particular connection.
{{< /c8y-admon-info >}}

![Setting provider credentials](/images/device-protocols/lora-actility/lora-admin-settings.png)

Click **Save**. If you have entered the correct information, you see the message "Connection created".

To add another connection, click **Add Connection** and follow the steps above.

### To update a connection {#to-update-a-connection}

Select the connection to be updated, make your edits, and save the connection.


If there are devices associated with the connection, an error message will appear, stating "Can not update the LNS Connection with `<name of LNS Connection>` as it's associated with `<number of devices>`. Click the link to download the file with the details of the associated devices: `/service/<agent-context-path>/lns-connection/<lns-connection-name>/device`".

![Update connection information](/images/device-protocols/lora-actility/lora-admin-settings-update.png)

### To delete a connection {#to-delete-a-connection}

Select the connection to be deleted and click **Delete**.

If there are devices associated with the connection, an error message will appear, stating "Can not delete the LNS Connection with `<name of LNS Connection>` as it's associated with `<number of devices>`. Click the link to download the file with the details of the associated devices: `/service/<agent-context-path>/lns-connection/<lns-connection-name>/device`".

![Delete connection](/images/device-protocols/lora-actility/lora-admin-settings-delete.png)
