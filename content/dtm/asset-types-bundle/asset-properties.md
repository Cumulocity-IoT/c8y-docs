---
weight: 40
layout: redirect
title: Property definitions

helpContent:
- label: asset-properties
  title: Property definitions
  content: "Property definitions are the parameters that define an asset definition. One or more property definitions are used to define an asset definition.


  Property definitions can be reused in multiple asset definitions. You can build your property definitions library by adding property definitions which can be used to define any asset definition.


  To add a new Property definition, click **Add property definition**."
---

Property definitions are the parameters that define an [asset definition](#asset-definitions). One or more property definitions are used to define an asset definition. Property definitions are created in the **Property definitions** page.

To reach the **Property definitions** page, navigate to **Libraries > Property definitions**.

In the **Property definitions** page, you see tabs for different contexts: **All**, **Asset**, **Alarm**, **Measurement**, **Operation**, and **Event**. The **All** tab displays property definitions applicable to all contexts, while each other tab displays property definitions specific to that context.

When you open the DTM application, default property definitions are readily available for use. See [Default property definitions](#default-property-definitions) to view the list of properties available.

In the overview you see the following categories:

* **Name**: Name of the property definition
* **Key**: Unique identifier for the property definition
* **Description**: Brief description of the property definition
* **Data type**: The data type of the property definition, for example, String, Number, or Complex
* **Default**: Default value for the property definition
* **Min-Max**: Minimum and maximum values allowed for the property definition
* **Applicable to**: The asset types, alarms, measurements, operations, or events contexts to which the property definition applies
* **Last updated**: Date and time of the last update
* **Actions**: Available actions for the property definition

Click **Configure columns** to configure the displayed columns.

Click **Reload** to reload the page.
The total number of property definitions is displayed on the bottom left of the page.

Use the **Export** and **Import** feature to transfer property definitions between tenants. This is useful for replicating property definitions in multiple tenants. By exporting and importing property definitions, you can ensure consistency and reduce the time and effort required for manual configuration. See [To export property definitions](#to-export-property-definitions) and [To import property definitions](#to-import-property-definitions) for details.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS

- To add/update/delete/import property definitions: CREATE/ADMIN permission for permission type "Inventory"
{{< /c8y-admon-req >}}

### To create a property definition {#to-create-a-property-definition}

When you navigate to the **Property definitions** page for the first time, there will be no property definitions present in the system except the default property definitions. See [Default property definitions](#default-property-definitions) to view the list of property definitions available.

To create an property definition, click **Add property definition** on the top menu bar. Enter the required data in the form (see description below) and click **Save**.

![Create a new property definiton](/images/dtm/custom-property/dtm-property-library-create-property.png)

Asset properties have the following parameters:

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
<td style="text-align:left">Refers to the name of the property definition. The property definition is further addressed using the information provided here.</td>
<td style="text-align:left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left"><b>Key</b></td>
<td style="text-align:left">Used to uniquely identify and store the property definition in the DTM application.<br/><br/>
Note that the key is automatically generated based on the label. You can modify the automatically generated key to suit to your needs only during property definition creation. You cannot edit the key after the definition is created.
</td>
<td style="text-align:left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left"><b>Description</b></td>
<td style="text-align:left">Provides a brief description of the property definition.</td>
<td style="text-align:left">Optional</td>
</tr>
<tr>
<td style="text-align:left"><b>Applicable to</b></td>
<td style="text-align:left">The context the property definition is applicable to.<br/> Available contexts: Asset, Alarm, Measurement, Operation and Event.</td>
<td style="text-align:left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left"><b>Type</b></td>
<td style="text-align:left">Defines the type of the property definition. It can be any of the following categories – <a href="#text" class="no-ajaxy">Text</a>, <a href="#number" class="no-ajaxy">Number</a>, <a href="#date-picker" class="no-ajaxy">Date picker</a>, <a href="#enumeration" class="no-ajaxy">Enumeration</a>, <a href="#boolean" class="no-ajaxy">Boolean</a>, <a href="#file-upload" class="no-ajaxy">File upload</a> or <a href="#complex" class="no-ajaxy">Complex</a>.</td>
<td style="text-align:left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left"><b>Default value</b></td>
<td style="text-align:left">Defines the default value for the property. You can modify this value when creating an asset.<br/>
If this field is left empty in the property defintion and marked as required in the asset definition, you must enter a value during the asset creation.</td>
<td style="text-align:left">Optional</td>
</tr>
<tr>
<td style="text-align:left"><b>Advanced validation rules</b></td>
<td style="text-align:left">When selected, displays validation rules to apply to validate the property value whenever it is created or updated.</td>
<td style="text-align:left">Optional</td>
</tr>
</tbody>
</table>

{{< c8y-admon-info>}}
The **Default value** field is only shown if the selected **Type** is either "Text" or "Number".<br/>
The default value must adhere to all validations provided beforehand.
{{< /c8y-admon-info>}}

Once you have defined all necessary property definitions for your project, you must define the [asset definitions](/dtm/asset-types/#asset-definitions).

### Property definition types {#property-definition-types}

To further define the type of content a property definition holds, you can select one of the following options listed under **Type**:

#### Text {#text}

Select **Text** if the value is a string, for example, a wind turbine manufacturer name. Enter a valid text.

 If you select **Advanced validation rules** for text, the following fields appear:

* **Min Length**:

If selected, enter the minimum length of the text that must be provided for this asset property during the asset creation. Any text below the minimum length is not accepted.

* **Max Length**:

If selected , enter the maximum length of the text that must be provided for this asset property during the asset creation. Any text above the maximum length is not accepted.

* **RegExp**:

If selected, enter a valid regular expression. During the asset creation, you must provide the asset property value, which adheres to the regular expression.

**Example:**

If the property definition is "Generator code" with a **Min length** of 8, a **Max length** of 20, and the **RegExp** defined as "^MCGEN[a-zA-Z0-9]*$", the value must fulfill all three criteria: it must start with "MCGEN", be at least 8 characters long, and not exceed 20 characters.

If you do not select any of the restrictions above, it is not applicable for the asset property during asset creation.

#### Number {#number}

For this type you must provide a numeric value during the asset creation, for example, the height of a wind turbine tower.

The type **Number** contains the following fields for additional validation rules:

* **Minimum**:

If selected, enter a number in the field **Minimum** on the right. When you create the asset, the asset property value cannot be lower or less than provided in the field.

* **Maximum**:

If selected, enter a number in the field on the right. When you create the asset, the asset property value cannot exceed the **Maximum** provided.

**Example:**

If the asset property is "Tower height" with a **Minimum** of 80 and a **Maximum** of 110, the property value must be between 80 and 110.

#### Date Picker {#date-picker}

If selected, you must select a date from the calendar displayed in the dialog window during the asset creation.

**Example:**

If "Installation date" is a property of the "Wind turbine" asset, then you must select the installation date of the wind turbine when creating the asset.

#### Enumeration {#enumeration}

Select **Enumeration** to list several values that apply to this property definition.

If selected, a second field appears below. Here, enter all desired information separated by a comma.

During asset creation, these values appear as options in the dropdown menu. Select one of the options to initialize the asset property with that option.

**Example:**

To create an asset property for a wind turbine "drivetrain type" and the type must be either Gearbox or Direct-drive, you must provide these options separated by a comma when creating the property definition.

![Property definition enumeration](/images/dtm/custom-property/dtm-property-library-type-enum.png)

#### Boolean {#boolean}

If selected, the value of the asset property can either be true or false during the asset creation.

An asset with this asset property shows a checkbox. Selecting this checkbox sets the asset property value to true.

**Example:**

If you create an asset property called "Yaw system" to identify wind turbines that rotate towards the wind direction during upwind conditions, the property definition must be created with the type "Boolean". When you create an asset for a wind turbine with a yaw system present, it is then initialized to "true". If there is no yaw system present, the asset is initialized to "false".

#### File upload {#file-upload}

This option allows you to upload a file during the asset creation.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS

- To add/update files: CREATE/ADMIN permission for permission type "Inventory"
{{< /c8y-admon-req >}}

If selected, enter the allowed file types separated by a comma in the **Allowed file types** field. Provide the maximum file size for uploads in the **Max file size in MB** field. When you create an asset with this property definition, you can only upload files that adhere to the allowed file types with their file size not exceeding the set limit.

{{< c8y-admon-info>}}

If there is a file size limit set for the tenant, you see the limit along with the field name for **Max file size in MB**.<br>
To prevent security threats, sanitize your files beforehand.

{{< /c8y-admon-info>}}

**Example:**

To upload the schematic diagram for a wind turbine, you name the property definition "Wind turbine schematic" and specify the file type of the schematic file. Then upload the respective file. Once the asset is created, you can view this file for future reference.

#### Complex {#complex}
A complex property definition consists of multiple key-value pairs, meaning, it contains a root object followed by one or more key-value pairs. You must define each key-value pair as well as providing a type for each pair. You can arrange the properties in the required order by dragging and dropping them. Hover over the row to see the drag icon. Click and drag the drag icon for reordering. On the right side of each key-value pair, you see an expand icon <i class="dlt-c8y-icon-expand-arrow text-muted icon-20"></i>. Click the expand icon <i class="dlt-c8y-icon-expand-arrow text-muted icon-20"></i> to see a specific property. Note that when you add a new key-value pair, it automatically expands. To hide it, click the collapse icon <i class="dlt-c8y-icon-collapse-arrow text-muted icon-20"></i>.

You see the preview of data model on the right side of properties section.

 **Example:**

If the asset property is called "Gearbox specifications" with the key "gearbox_specifications", then power, speed increasing ratio and weight are the multiple key-value pairs defining the property "Gearbox specifications". Select the type **Complex**, enter the required information for all key-value pairs and click **Save**.

![Complex property definition](/images/dtm/custom-property/dtm-property-library-complex-property.png)

### To edit a property definition {#to-edit-a-property-definition}

1. Click the name of the property definition to view or edit the details. Alternatively, click **Edit** option in the action menu to the right.
2. Edit any content of the definition.
3. Click **Save** to save your changes.


### To delete a property definition {#to-delete-a-property-definition}

In the **Property definitions** page to delete a definition individually, click the delete option from the actions menu on the right of the desired definition. Alternatively, click the name of the definition to view the details, then click **Delete**.

Select the checkboxes next to the desired asset definition, click **Delete** to delete the selected property definitions in bulk.

In the resulting confirmation dialog, click **Confirm** to continue.

{{< c8y-admon-info>}}

If the property definition you want to delete is part of an existing asset or an asset definition, you see an error notification and the property definition is not deleted.

{{< /c8y-admon-info>}}


### To export property definitions {#to-export-property-definitions}

Follow the steps below:

1. On the **Property definitions** page, click **Export**. In the resulting dialog box, you see the list of property definitions along with their description and type.
2. Select one or more desired definitions and click **Export**.
3. The dialog closes and a JSON file named 'Export-properties.json' downloads.

Use the downloaded file to import the property definitions into a DTM application on another tenant.

{{< c8y-admon-info>}}
Default property definitions are not listed under **Export**. See [Default property definitions](#default-property-definitions) to view the list of definitions available.
You can export a maximum of 500 property definitions at a time.
When exporting from a specific context tab, only definitions from that context are listed. To export definitions from all contexts, select the **All** tab.
{{< /c8y-admon-info>}}

![Export property definitions](/images/dtm/custom-property/dtm-property-library-export.png)

### To import property definitions {#to-import-property-definitions}

To import asset properties into the DTM application, follow the steps below:

1. On the **Property definitions** page, click **Import**.
2. Upload the JSON file in the drop file area of the resulting dialog. The JSON file is the file containing exported property definitions from a DTM application on another tenant.
3. Click **Next** to preview the property definitions before importing them.
4. Click **Import** to import the property definitions.
5. Alternatively, click **Back** to go to previous step. Hover over the file name and click the **Delete** icon to remove the current file and upload a different one.
6. View newly imported definitions in the **Property definitions** page.

![Import property definitions](/images/dtm/custom-property/dtm-property-library-import.png)

{{< c8y-admon-info>}}
When you upload the JSON file, it undergoes validation. If the validation fails, you see a corresponding message in the dialog. Click **Download log file** to view the errors.
Review the errors that are reported, resolve them, and attempt the upload again.

You can import a maximum of 500 property definitions at a time.
You can import property definitions from any context, regardless of which tab you are currently viewing.
{{</ c8y-admon-info>}}

### Default property definitions {#default-property-definitions}

### Characteristics {#characteristics-of-default-property-definitions}

* Default property defintions are readily available when you open the application.
* Default property defintions cannot be deleted.
* Only selected fields within a default property definition are editable and the editable fields vary depending on the specific property.
* Default properties cannot be exported.

### Location {#location}

The **Location** property definition enables you to assign location (latitude and longitude) to an asset. You can set the default values of the latitude and longitude by entering the corresponding values or alternatively using the map view.

To set the default values for the latitude and longitude using the map view, click anywhere on the map. Click the full screen icon <i class="dlt-c8y-icon-resize-expand text-muted icon-20"></i> at the top right corner of the map to view it in full screen. Without values for latitude and longitude, the marker is hidden. To see the marker, click anywhere on the map. Click or drag the marker to the preferred position to select the default value for latitude and longitude.

{{<c8y-admon-info>}}
The valid range for the latitude is -90 to +90 and valid range for the longitude is -180 to +180. <br>
The marker on the map is only visible when both values for latitude and longitude are provided.<br>
The default values of both latitude and longitude are automatically updated whenever a new location is selected on the map and vice-versa. The Altitude value is not represented on the map.
{{</c8y-admon-info>}}
