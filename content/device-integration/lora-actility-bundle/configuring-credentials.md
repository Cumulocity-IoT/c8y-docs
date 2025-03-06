---
weight: 20
title: Configuring multiple ThingPark account connections
layout: redirect
---



Before using LoRa devices with {{< product-c8y-iot >}}, you need to configure your ThingPark account details in the Administration application. Click the **Connectivity** tab in the **Settings** menu to create, edit, delete or update multiple Actility connections.

### To add a new connection {#to-add-a-new-connection}

If you select **Connectivity** for the first time, you are asked to create a connection. Click **Add Connection**.

Enter the following information:

- **Name**: The name of the Actility connection being created.
- **Description**: The description of the Actility connection being created.
- **Actility ThingPark URL**: The Actility ThingPark URL may change based on the type of the Actility ThingPark account we use (for example, Wireless, Community or Enterprise edition).
- **Profile ID**: This depends on your ThingPark account and environment. If you are using, for example, the Dev1 ThingPark environment your profile ID will be "dev1-api". Multiple tenants can have the same profile ID.
- **Application Server ID**: Application server ID that will be used for TLS security between the ThingPark platform and the agent. This is an optional field. Leave empty to disable security. If it's enabled, then the agent will generate a token and use it for all the uplink and down-link messages.  
- **Application Server Key**: Application server private key that will be used for TLS security between the ThingPark platform and the agent for the uplink and downlink communications. Value should be in hex and 16 bytes. This is an optional field. Leave empty to disable security. If it's enabled, then the agent will generate a token and use it for all the uplink and down-link messages.
- **Admin API version**: The version that the ThingPark admin API uses. By-default it will be set to "latest".
- **Core API version**:  The version that the ThingPark core API uses. By-default it will be set to "latest".
- **Username**: Your ThingPark account username.
- **Password**: Your ThingPark account password.
- **Connection Type**: The ThingPark account type that is being used. It can be either Enterprise or Wireless.

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
