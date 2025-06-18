---
weight: 30
title: Bulk device registration
layout: redirect
---

To connect larger amounts of devices, {{< product-c8y-iot >}} offers the option to bulk-register devices, that means, to register larger amounts of devices by uploading a CSV file.

{{< c8y-admon-info >}}
There is no restriction on the number of devices that you can bulk-register but the more devices you add the slower the creation and operation gets.
{{< /c8y-admon-info >}}

### To bulk-register devices {#to-bulk-register-devices}

1. Click **Registration** in the **Devices** menu of the navigator.

2. In the **Device registration** page, click **Register device** at the right of the top bar and from the dropdown menu select **Bulk registration** > **General**. The **Bulk device registration** dialog box will be displayed.

3. Click the Plus button to select or drag-and-drop the CSV file you want to upload.

Depending on the format of the uploaded CSV file, one of the following registration types will be processed:

* Simple registration
* Full registration

{{< c8y-admon-info >}}
Bulk registration creates an elementary representation of the device. Then, the device must update it to a full representation with its own status.
{{< /c8y-admon-info >}}

A separator is automatically obtained from the CSV file. Valid separator values are: `\t` (tabulation mark), `;` (semicolon) and `,` (comma).

**Simple registration**

The CSV file contains two columns: ID;PATH, where ID is the device identifier, for example, serial number, and PATH is a slash-separated list of group names (path to the group where the device should be assigned to after registration).

```
ID;PATH
Device1;Group A
Device2;Group A/Group B			
```


After the file is uploaded, all required new groups will be created, new registrations will be created with status "Waiting for connection", and the normal registration process must be continued (see above).

**Full registration**

The CSV files must contain at least the IDs as device identifier and the credentials of the devices.

In addition to these columns the file can also contain other columns like ICCID, NAME, TYPE as shown in the following example:

```
ID;CREDENTIALS;TYPE;NAME;ICCID;IDTYPE;PATH;SHELL;AUTH_TYPE
006064ce800a;LF2PWJoLG1Fz;c8y_Device;Sample_Device1;+491555555;c8y_Serial;bulk group/subgroup1;1;BASIC
006064ce8077;OowoGKAbiNJs;c8y_Device;Sample_Device2;+491555555;c8y_Serial;bulk group/subgroup2;1;BASIC
```

To connect the devices, they must be pre-configured with the relevant information provided in the CSV file. More specific, each device will be configured as follows:

* Username - the username for accessing {{< product-c8y-iot >}} must have the format &lt;tenant&gt;/device_&lt;id&gt;, where &lt;tenant&gt; refers to the tenant from which the CSV file is imported and &lt;id&gt; refers to the respective value in the CSV file.
* Password - the unique password for each device to access {{< product-c8y-iot >}} equals the value "Credentials" in the CSV file.
* Device in managed object representation - fields TYPE, NAME, ICCID, IDTYPE, PATH, SHELL in the CSV file.

After the data is imported, you will get feedback on the number of devices that were pre-registered as well as on any potential errors that may have occurred.

For your convenience, we provide CSV template files for both bulk registration types (simple/full) which you can download from the registration wizard to view or copy the structure.

{{< c8y-admon-info >}}
If the device with the given identifier already exists, it will be updated with the data from the CSV file.
{{< /c8y-admon-info >}}

### To import CSV data in Microsoft Excel {#to-import-csv-data-in-microsoft-excel}

1. In Microsoft Excel, switch to the **Data** tab.
2. In the **Data** tab, select **From Text** in the top menu bar.
3. Select the CSV file you want to import by browsing for it (in this case the template file that you have downloaded from the {{< product-c8y-iot >}} platform).
4. In Step 1 of the **Text Import Wizard**, leave the default settings and click **Next**.
5. In Step 2 of the **Text Import Wizard**, select **Semicolon** as delimiter and click **Finish**.

For further information on the file format and accepted CSV variants, also refer to
[Create a bulk device credentials request](https://{{< domain-c8y >}}/api/core/#operation/postBulkNewDeviceRequestCollectionResource) in the {{< openapi >}}.

{{< c8y-admon-info >}}
In an {{< enterprise-tenant >}} you may also register devices across multiple tenants by adding a **Tenant** column to the spreadsheet and importing the CSV file from the {{< management-tenant >}}. Contact your Operations team for further support.
{{< /c8y-admon-info >}}
