---
weight: 80
title: SmartREST templates
layout: bundle
outputs:
  - html
  - json
sector:
  - device_management
helpcontent:
  - label: smartrest-templates
    title: SmartREST templates
    content: "SmartREST templates are a collection of request and response templates used to convert CSV data and Cumulocity IoT REST API calls. For example, you can use SmartREST templates to easily add devices to the platform instead of manually writing the requests each time. To add a new template, you may either import an existing template or create a new one.


    To import a template, click **Import template** at the top right, select a file to be uploaded and provide a name and unique ID.


    To create a new template, click **Create template** at the top right, provide a name and unique ID and add the required messages or responses as described in the user documentation."
---

SmartREST templates are a collection of request and response templates used to convert CSV data and {{< product-c8y-iot >}} REST API calls. For example, you can use SmartREST templates to easily add devices to the platform instead of manually writing the requests each time.

To ease the device integration, {{< product-c8y-iot >}} supports static templates that can be used without the need for creating your own templates. These templates focus only on the most commonly used messages for device management. For further information on static templates, refer to the [MQTT static templates](/smartrest/mqtt-static-templates).

{{< c8y-admon-related >}}
* [Device management & connectivity > SmartREST > SmartREST 2.0](/smartrest/smartrest-two/) for details on the SmartREST protocol, the data format used, as well as the anatomy and registration of SmartREST templates.
* [Device management & connectivity > Device integration > Device integration using MQTT](/device-integration/mqtt/) for information on integrating devices via MQTT.
{{< /c8y-admon-related >}}

Open the **SmartREST template** page from the **Device Types** menu in the navigator.

![SmartREST template view](/images/users-guide/DeviceManagement/devmgmt-devicetypes-smartrest.png)

For each template, the following information is provided:

* Template name
* Template ID
* Number of send messages
* Number of responses

There are two ways to add a SmartREST template:

- Import an already existing template
- Create a new template

### To import an existing SmartREST template {#to-import-an-existing-smartrest-template}

1. Click **Import template** at the right of the top menu bar.
2. In the resulting dialog box, select a file to upload by browsing for it.
3. Enter a template name and a unique template ID (both mandatory fields).
4. Click **Import** to import the template.

### To create a new SmartREST template {#to-create-a-new-smartrest-template}

1. Click **Create template** at the right of the top menu bar.
2. In the resulting dialog box, enter a template name and a unique template ID (both mandatory fields).
3. Click **Continue** to proceed adding messages or responses.


#### To add a message {#to-add-a-message}

The message template contains all necessary information to convert the SmartREST request into a corresponding REST API call which is then sent to the platform.

1. To add a new message, navigate to the **Messages** tab in your desired SmartREST template and click **Add message**.

1. Complete the following fields:

	|Field|Description|
|:---|:---|
|Message ID|Unique integer that will be used as a message identifier. It must be unique among all message and response templates.
|Name|Name for the message. Mandatory.
|Target REST API|REST API for the target. Dropdown list. May be one of Measurement, Inventory, Alarm, Event, Operation.
|Method|Request method. May be one of POST, PUT, GET, depending on the selected Target REST API.
|Include Responses|Select this checkbox if you want to process the results of the request with response templates.
|REST API built-in fields|These fields are optional and vary depending on the target REST API selected. In case no value is provided, a device will be able to set it when sending an actual message.
|REST API custom fields|Additional fields can be added by clicking **Add field**. Enter the API key and select the desired data type.

	![Add message](/images/users-guide/DeviceManagement/devmgmt-devicetypes-smartrest-addmessage.png)

	Under **Preview** you can see a preview of your request message.

3. Click **Save**.

The message will be added to the SmartREST template.

#### To remove a message {#to-remove-a-message}

To remove a message, open it and click **Remove** at the bottom.

The message will be removed from the SmartREST template.

#### To add a response {#to-add-a-response}

A response template contains the necessary information to extract data values from a platform REST API call response, which is then sent back to the client in a CSV data format.

1. To add a new response, navigate to the **Response** tab in your desired SmartREST template and click **Add response**.

2. Complete the following fields:

<table>
<col style="width: 10%;">
<col style="width: 90%;">
<thead>
<tr>
<th align="left">Field</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Response ID</td>
<td align="left">A unique string that will be used as a response identifier.</td>
</tr>
<tr>
<td align="left">Base Pattern</td>
<td align="left">Path in a JSON document. The base pattern acts as a prefix to all patterns. You can enter either a base pattern here and add patterns with only the subpath below the base pattern, or leave this field empty and provide patterns with the full path.</td>
</tr>
<tr>
<td align="left">Condition</td>
<td align="left">Condition value of the response.</td>
</tr>
<tr>
<td align="left">Pattern</td>
<td align="left">At least one pattern is required. Click <b>Add pattern</b> and enter a pattern value.</td>
</tr>
</tbody>
</table>

![Add template with filled out response](/images/users-guide/DeviceManagement/devmgmt-devicetypes-smartrest-addresponse.png)

3. Click **Save**.

The response will be added to the SmartREST template.

For further information see [Response templates](/smartrest/smartrest-one/#response-templates).

#### To remove a response {#to-remove-a-response}

To remove a response, open it and click **Remove** at the bottom.

### To edit a SmartREST template {#to-edit-a-smartrest-template}

Either click the desired template or click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the top right of the respective template card and then click **Edit**.

After editing the template, click **Save** to save your settings.

### To delete a SmartREST template {#to-delete-a-smartrest-template}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the top right of the respective template card and then click **Remove**.


### To export a SmartREST template {#to-export-a-smartrest-template}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the top right of the respective template card and then click **Export**.

The template will automatically be downloaded to your file system.

To export a SmartREST template as CSV file follow these steps:

1. Open the template you want to export and select the **CSV preview** tab.
2. In the resulting dialog box, specify the preferred options for the field separator, decimal separator and character set.
3. In the **CSV preview** tab, which provides additional information on messages and responses, click **Copy to clipboard**.

The SmartREST template will be exported as CSV file.
