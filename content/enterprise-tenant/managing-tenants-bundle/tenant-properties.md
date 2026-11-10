---
weight: 25
title: Tenant properties
layout: redirect
---

{{< c8y-admon-req >}}
* Your tenant must be subscribed to the Dtm-plugins extension and the Dtm microservice.
* Your tenant must be the {{< management-tenant >}} or a tenant that can create subtenants.

ROLES & PERMISSIONS:

- To view the **Tenant properties** page: READ permission for the "Tenant management" permission type, and CREATE, UPDATE, or ADMIN permission for the "Digital twin definitions" permission type
- To add or import tenant property definitions: ADMIN permission for the "Tenant management" permission type, CREATE or ADMIN permission for the "Inventory" permission type, and CREATE or ADMIN permission for the "Digital twin definitions" permission type
- To edit tenant property definitions: ADMIN permission for the "Tenant management" permission type, CREATE or ADMIN permission for the "Inventory" permission type, and UPDATE or ADMIN permission for the "Digital twin definitions" permission type
- To delete tenant property definitions: ADMIN permission for the "Tenant management" permission type, CREATE or ADMIN permission for the "Inventory" permission type, and ADMIN permission for the "Digital twin definitions" permission type
{{< /c8y-admon-req >}}

On the **Tenant properties** page, you define the tenant custom properties for your subtenants. Click **Tenant properties** in the **Tenants** menu to open the page.

Each property definition that you create on this page is available in the **Custom properties** tab of each subtenant, where you set its value for that subtenant. For details, see [Custom properties](/enterprise-tenant/managing-tenants/#custom-properties).

{{< c8y-admon-info >}}
The Dtm microservice automatically migrates the tenant properties defined in the former **Properties library** (**Settings > Properties library**). The **Tenant properties** page displays the migrated properties.
{{< /c8y-admon-info >}}

The list of tenant property definitions displays the following columns:

* **Name**: The name of the property definition.
* **Key**: The unique identifier of the property definition.
* **Description**: A brief description of the property definition.
* **Data type**: The data type of the property definition, for example, String, Number, or Complex.
* **Default**: The default value of the property definition.
* **Min-Max**: The minimum and maximum values allowed for the property definition.
* **Last updated**: The date and time of the last update.

Click **Configure columns** to select the columns that the list displays. Click **Reload** to reload the list.

### To create a tenant property definition {#to-create-a-tenant-property-definition}

1. Click **Add property definition** in the top menu bar.
2. Enter the data in the form. For details on the fields, see the table below.
3. Click **Save**.

The new property definition appears in the list and in the **Custom properties** tab of each subtenant.

A tenant property definition has the following fields:

<table>
<col width="20">
<col width="50">
<col width="30">
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Description</th>
<th style="text-align:left">Mandatory / Optional</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><b>Label</b></td>
<td style="text-align:left">The name of the property definition. The <b>Custom properties</b> tab of each subtenant displays this name.</td>
<td style="text-align:left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left"><b>Key</b></td>
<td style="text-align:left">The unique identifier that stores the property value.<br/><br/>
The platform creates the key from the label. You can change the key only while you create the property definition. After you save the property definition, you cannot edit the key.</td>
<td style="text-align:left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left"><b>Description</b></td>
<td style="text-align:left">A brief description of the property definition.</td>
<td style="text-align:left">Optional</td>
</tr>
<tr>
<td style="text-align:left"><b>Applicable to</b></td>
<td style="text-align:left">The context of the property definition. On the <b>Tenant properties</b> page, the context is always "Tenant options" and you cannot change it.</td>
<td style="text-align:left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left"><b>Type</b></td>
<td style="text-align:left">The type of the value. For details, see <a href="#tenant-property-definition-types" class="no-ajaxy">Tenant property definition types</a>.</td>
<td style="text-align:left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left"><b>Default value</b></td>
<td style="text-align:left">The value that the <b>Custom properties</b> tab displays until you enter a different value for a subtenant.</td>
<td style="text-align:left">Optional</td>
</tr>
<tr>
<td style="text-align:left"><b>Advanced validation rules</b></td>
<td style="text-align:left">When selected, displays the validation rules for the property value. The platform applies these rules every time you save a value for a subtenant.</td>
<td style="text-align:left">Optional</td>
</tr>
</tbody>
</table>

{{< c8y-admon-info >}}
The **Default value** field is only available for the types **Text** and **Number**. The default value must match all validation rules of the property definition.
{{< /c8y-admon-info >}}

### Tenant property definition types {#tenant-property-definition-types}

Select one of the following types in the **Type** field:

* **Text**: The value is a string, for example, a contract number. In **Advanced validation rules**, you can set a **Min Length**, a **Max Length**, and a **RegExp** (regular expression) that the value must match.
* **Number**: The value is a number, for example, a storage quota in GB. In **Advanced validation rules**, you can set a **Minimum** and a **Maximum** value. Select **Allow integers only** if the property accepts only whole numbers, for example, the number of licensed users. The property definition then uses the integer data type, and the **Default value**, **Minimum**, and **Maximum** fields accept only whole numbers.
* **Date picker**: The value is a date that you select from a calendar, for example, the start date of a contract.
* **Enumeration**: The value is one option from a list. Enter all options separated by a comma, for example, "Gold, Silver, Bronze" for a service level.
* **Multiselect list**: The value is one or more options from a list. In **Options are of type**, select whether the options are strings or numbers. In **Options**, enter the options and mark the options that are selected by default. In **Render as**, select whether the field displays the options as a **Combobox** or as a **Group of checkboxes**.
* **Boolean**: The value is "true" or "false", for example, whether a subtenant has premium support. The **Custom properties** tab displays a checkbox.
* **File upload**: The value is a file, for example, a signed contract. In **Allowed file types**, enter the allowed file types separated by a comma. In **Max file size in MB**, enter the maximum file size. To upload files in the **Custom properties** tab, you need CREATE or ADMIN permission for the "Inventory" permission type.
* **Complex**: The value is a group of key-value pairs, for example, a billing contact with a name, an email address, and a phone number. Define each key-value pair and select its type. To change the order of the pairs, drag a row by its drag icon. The **Properties** section displays a preview of the data model.

{{< c8y-admon-info >}}
If the tenant has a file size limit, the **Max file size in MB** field displays this limit. To prevent security threats, sanitize your files before you upload them.
{{< /c8y-admon-info >}}

### To edit a tenant property definition {#to-edit-a-tenant-property-definition}

1. Click the name of the property definition, or click **Edit** in the action menu of the property definition.
2. Change the fields that you want to edit.
3. Click **Save**.

### To delete tenant property definitions {#to-delete-tenant-property-definitions}

* To delete a single property definition, click **Delete** in the action menu of the property definition. Alternatively, click the name of the property definition and then click **Delete**.
* To delete several property definitions, select the checkboxes of the property definitions and click **Delete**.

In the confirmation dialog, click **Confirm**.

The **Custom properties** tab of each subtenant no longer displays the deleted property definitions. For details on how the platform handles the stored values, see [Custom properties](/enterprise-tenant/managing-tenants/#custom-properties).

### To export tenant property definitions {#to-export-tenant-property-definitions}

Export tenant property definitions to create the same tenant property definitions in another tenant.

1. Click **Export**. The dialog displays the list of property definitions with their description and type.
2. Select the property definitions that you want to export and click **Export**.

The dialog closes and the browser downloads a JSON file named *Export-properties.json*.

{{< c8y-admon-info >}}
You can export a maximum of 500 property definitions at a time. The **Export** dialog does not list default property definitions.
{{< /c8y-admon-info >}}

### To import tenant property definitions {#to-import-tenant-property-definitions}

1. Click **Import**.
2. Drop the exported JSON file in the upload area of the dialog.
3. Click **Next** to preview the property definitions. To upload a different file, click **Back**, hover over the file name, and click the **Delete** icon.
4. Click **Import**.

The imported property definitions appear in the list.

{{< c8y-admon-info >}}
The platform validates the JSON file when you upload it. If the validation fails, the dialog displays a message. Click **Download log file** to view the errors, resolve them, and upload the file again.

You can import a maximum of 500 property definitions at a time.
{{< /c8y-admon-info >}}

### Default tenant property definitions {#default-tenant-property-definitions}

The **Tenant properties** page includes the default property definition **Location**. With **Location**, you assign a latitude and a longitude to a subtenant.

Default property definitions have the following characteristics:

* You cannot delete or export them.
* You can edit only some of their fields.

To set the default latitude and longitude of **Location**, enter the values, or click the map to place the marker. Drag the marker to change the position. The valid range for the latitude is -90 to +90, and the valid range for the longitude is -180 to +180.
